import { WaitlistForm } from "./WaitlistForm";
import { Reveal } from "./Reveal";

export const CTABand = () => {
  return (
    <section className="bg-brand py-24 md:py-32" data-testid="cta-band">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 md:px-12">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-white">
            Forever <span className="font-extrabold">free.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-lg text-lg leading-relaxed text-white/75">
            Privacy is a fundamental right, and we're here to protect it.
            Secure your spot on the waitlist today.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <WaitlistForm idPrefix="cta-waitlist" dark />
        </Reveal>
      </div>
    </section>
  );
};
