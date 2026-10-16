import { useState } from "react";
import axios from "axios";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const variants = {
  // Yellow action button on red backgrounds (Tuta hero / "Forever free")
  yellow: {
    input: "bg-white text-dunkel placeholder:text-dunkel/50 border border-white focus-visible:ring-yellow-action",
    button: "bg-yellow-action text-tutao border-2 border-yellow-action",
  },
  // Bright red button once the hero has switched to "OFF" (dark background)
  fighter: {
    input: "bg-white text-dunkel placeholder:text-dunkel/50 border border-white focus-visible:ring-fighter",
    button: "bg-fighter text-white border-2 border-fighter",
  },
  // Burgundy button on the red-nota band
  dark: {
    input: "bg-white text-dunkel placeholder:text-dunkel/50 border border-white focus-visible:ring-white",
    button: "bg-tutao text-white border-2 border-tutao",
  },
  // On light sections
  light: {
    input: "bg-white text-dunkel placeholder:text-dunkel/50 border border-dark-peach focus-visible:ring-nota",
    button: "bg-nota text-white border-2 border-nota",
  },
};

export const WaitlistForm = ({ idPrefix = "waitlist", variant = "yellow", buttonLabel = "Join the waitlist", className = "" }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const v = variants[variant];

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, { email: email.trim() });
      setDone(true);
      toast.success("You're on the list. Welcome to Bozzmail.");
    } catch (err) {
      if (err.response?.status === 409) {
        setDone(true);
        toast.info("This email is already on the waitlist.");
      } else if (err.response?.status === 422) {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={`flex w-full max-w-[520px] flex-col gap-2 sm:flex-row ${className}`}
      data-testid={`${idPrefix}-form`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className={`h-12 flex-1 rounded-[6px] px-4 text-base outline-none focus-visible:ring-2 ${v.input}`}
        data-testid={`${idPrefix}-email-input`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`btn-tuta h-12 shrink-0 disabled:opacity-70 ${v.button}`}
        data-testid={`${idPrefix}-submit-button`}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : done ? <Check className="h-4 w-4" /> : null}
        {done ? "You're on the list" : buttonLabel}
      </button>
    </form>
  );
};
