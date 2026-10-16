import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader2, Check, X, Copy, Share2, Lock } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const DOMAIN = "bozzmail.com";

const variants = {
  yellow: { button: "bg-yellow-action text-tutao border-2 border-yellow-action", text: "text-peach", card: "bg-white text-dunkel" },
  fighter: { button: "bg-fighter text-white border-2 border-fighter", text: "text-peach", card: "bg-white text-dunkel" },
  dark: { button: "bg-tutao text-white border-2 border-tutao", text: "text-white", card: "bg-white text-dunkel" },
};

const inputCls = "h-12 w-full rounded-[6px] border border-white bg-white px-4 text-base text-dunkel outline-none placeholder:text-dunkel/50 focus-visible:ring-2 focus-visible:ring-white/80";

const useAvailability = (handle) => {
  const [state, setState] = useState({ status: "idle" });
  const seq = useRef(0);
  useEffect(() => {
    const h = handle.trim().toLowerCase();
    if (!h) { setState({ status: "idle" }); return; }
    setState({ status: "checking" });
    const id = ++seq.current;
    const t = setTimeout(async () => {
      try {
        const { data } = await axios.get(`${API}/reservations/check`, { params: { handle: h } });
        if (id === seq.current) setState({ status: data.available ? "available" : data.reason, message: data.message });
      } catch {
        if (id === seq.current) setState({ status: "error", message: "Couldn't check availability. Try again." });
      }
    }, 350);
    return () => clearTimeout(t);
  }, [handle]);
  return state;
};

const Status = ({ state, prefix, light }) => {
  if (state.status === "idle") return <p className={`text-sm ${light}`} data-testid={`${prefix}-status`}>Pick the address you want to own at launch.</p>;
  if (state.status === "checking") return <p className={`flex items-center justify-center gap-1.5 text-sm ${light}`} data-testid={`${prefix}-status`} data-status="checking"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking availability…</p>;
  const ok = state.status === "available";
  return (
    <p className={`flex items-center justify-center gap-1.5 text-sm font-semibold ${ok ? "text-green-candy" : "text-sonne"}`} data-testid={`${prefix}-status`} data-status={state.status}>
      {ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} {state.message}
    </p>
  );
};

const Success = ({ res, variant, prefix }) => {
  const share = async () => {
    const text = `I just reserved ${res.address} — encrypted email with zero tracking. Claim yours at bozzmail.com`;
    if (navigator.share) {
      try { await navigator.share({ title: "Bozzmail", text, url: "https://bozzmail.com" }); return; } catch { /* cancelled */ }
    }
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard.");
  };
  const copy = async () => { await navigator.clipboard.writeText(res.address); toast.success("Address copied."); };
  return (
    <div className={`w-full max-w-[560px] rounded-[6px] p-5 text-center shadow-tuta-strong ${variants[variant].card}`} data-testid={`${prefix}-success`}>
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-fighter text-white"><Lock className="h-6 w-6" /></span>
      <p className="mt-3 text-sm uppercase tracking-wide text-dunkel/70">Reserved for you</p>
      <p className="mt-1 break-all text-[length:var(--text-ml)] font-bold text-tutao" data-testid={`${prefix}-success-address`}>{res.address}</p>
      <p className="mt-2 text-sm text-dunkel/80">You're <strong>#{res.position}</strong> in line. We'll email <strong>{res.email}</strong> when your inbox is ready.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={copy} className="btn-tuta border border-dark-peach bg-white text-dunkel" data-testid={`${prefix}-copy-button`}><Copy className="h-4 w-4" /> Copy address</button>
        <button type="button" onClick={share} className="btn-tuta bg-nota text-white" data-testid={`${prefix}-share-button`}><Share2 className="h-4 w-4" /> Share</button>
      </div>
    </div>
  );
};

export const ReserveForm = ({ idPrefix = "reserve", variant = "yellow", buttonLabel = "Reserve my address", className = "" }) => {
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const avail = useAvailability(handle);
  const v = variants[variant];

  if (result) return <Success res={result} variant={variant} prefix={idPrefix} />;

  const submit = async (e) => {
    e.preventDefault();
    if (loading || avail.status !== "available") return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/reservations`, { handle: handle.trim().toLowerCase(), email: email.trim() });
      setResult(data);
      toast.success(`${data.address} is yours.`);
    } catch (err) {
      const msg = err.response?.data?.detail;
      toast.error(typeof msg === "string" ? msg : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={`flex w-full max-w-[560px] flex-col gap-2 ${className}`} data-testid={`${idPrefix}-form`} noValidate>
      <div className="relative">
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value.replace(/\s/g, "").toLowerCase())}
          placeholder="yourname"
          aria-label="Desired address"
          autoComplete="off"
          spellCheck="false"
          maxLength={30}
          className={`${inputCls} pr-[8.5rem]`}
          data-testid={`${idPrefix}-handle-input`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-base font-semibold text-tutao">@{DOMAIN}</span>
      </div>
      <Status state={avail} prefix={idPrefix} light={v.text} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Contact email (for your launch invite)"
          aria-label="Contact email"
          className={`${inputCls} flex-1`}
          data-testid={`${idPrefix}-email-input`}
        />
        <button
          type="submit"
          disabled={loading || avail.status !== "available" || !email.trim()}
          className={`btn-tuta h-12 shrink-0 disabled:cursor-not-allowed disabled:opacity-60 ${v.button}`}
          data-testid={`${idPrefix}-submit-button`}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {buttonLabel}
        </button>
      </div>
    </form>
  );
};
