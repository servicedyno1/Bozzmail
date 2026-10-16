import { useState } from "react";
import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { Reveal } from "./Reveal";

const PrivacyToggle = () => {
  const [on, setOn] = useState(true);

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        aria-label="Toggle privacy"
        data-testid="hero-privacy-toggle"
        className={`relative h-28 w-56 cursor-pointer rounded-full border-4 transition-colors duration-500 sm:h-36 sm:w-72 ${
          on ? "border-[#015f47] bg-[#015f47]" : "border-[#d8d5cc] bg-[#e9e7e0]"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={`absolute top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-white shadow-[0_6px_20px_rgba(27,21,38,0.25)] sm:h-28 sm:w-28 ${
            on ? "right-2" : "left-2"
          }`}
        >
          <span
            className={`absolute inset-0 m-auto h-8 w-8 rounded-full border-4 transition-colors duration-500 sm:h-10 sm:w-10 ${
              on ? "border-[#015f47]" : "border-[#b9b5ab]"
            }`}
          />
        </motion.span>
        <span
          className={`absolute top-1/2 -translate-y-1/2 font-display text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 sm:text-base ${
            on ? "left-5 text-white/90 sm:left-7" : "right-5 text-[#8f8a80] sm:right-7"
          }`}
        >
          {on ? "ON" : "OFF"}
        </span>
      </button>
      <p
        className="font-display text-xs font-bold uppercase tracking-[0.3em] text-ink-muted"
        data-testid="hero-toggle-caption"
      >
        {on ? "Privacy: enabled" : "Tap to turn privacy on"}
      </p>
    </div>
  );
};

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-paper pb-24 pt-32 md:pb-32 md:pt-44"
      data-testid="hero-section"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#f4f3ee]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-52 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#f4f3ee]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6e4dc] bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-[#015f47]" />
              Encrypted email, calendar &amp; contacts
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.02] tracking-tight text-ink">
              Turn ON{" "}
              <span className="font-extrabold text-brand">Privacy.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              Take back your data with Enclave's encrypted email, calendar and
              contacts. No tracking, no ads, no compromise.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-9">
            <div id="waitlist" className="scroll-mt-32">
              <WaitlistForm idPrefix="hero-waitlist" />
              <p className="mt-4 text-xs text-ink-muted" data-testid="hero-waitlist-note">
                Free forever. Be first in line when Enclave launches.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex justify-center lg:justify-end">
          <PrivacyToggle />
        </Reveal>
      </div>
    </section>
  );
};
