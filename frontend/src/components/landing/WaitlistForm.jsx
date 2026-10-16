import { useState } from "react";
import axios from "axios";
import { Loader2, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const WaitlistForm = ({ idPrefix = "waitlist", dark = false }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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

  const inputClasses = dark
    ? "h-[52px] flex-1 rounded-full border-white/25 bg-white/10 px-5 py-3.5 text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    : "h-[52px] flex-1 rounded-full border-[#e6e4dc] bg-white px-5 py-3.5 text-ink placeholder:text-[#9a95a3] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#850122]/40";

  const buttonClasses = dark
    ? "rounded-full bg-white text-[#850122] hover:bg-white/90 px-7 py-3.5 h-[52px] font-display font-bold tracking-wide transition-colors duration-200"
    : "rounded-full bg-[#850122] text-white hover:bg-[#6d011b] px-7 py-3.5 h-[52px] font-display font-bold tracking-wide transition-colors duration-200";

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center"
      data-testid={`${idPrefix}-form`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className={inputClasses}
        data-testid={`${idPrefix}-email-input`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`${buttonClasses} flex shrink-0 items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70`}
        data-testid={`${idPrefix}-submit-button`}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : done ? (
          <Check className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
        {done ? "You're in" : "Join the waitlist"}
      </button>
    </form>
  );
};
