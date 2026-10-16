import { Reveal } from "./Reveal";

export const DarkBand = () => {
  return (
    <section className="bg-night py-24 md:py-32" data-testid="surveillance-band">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 md:px-12">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-white">
            Turn OFF{" "}
            <span className="font-extrabold text-[#ff5c7a]">Surveillance.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg leading-relaxed text-white/60">
            Big Tech reads your inbox to sell ads. Enclave can't — mathematically.
            End-to-end encryption means your data is yours, full stop.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <a
            href="#waitlist"
            className="inline-block rounded-full bg-white px-8 py-3.5 font-display text-sm font-bold tracking-wide text-[#16111f] transition-colors duration-200 hover:bg-white/85"
            data-testid="surveillance-cta-button"
          >
            Join the waitlist
          </a>
        </Reveal>
      </div>
    </section>
  );
};
