import { Section, SectionTitle } from "./Section";
import { WaitlistForm } from "./WaitlistForm";

export const CTABand = () => (
  <Section bg="bg-nota" className="!pb-0" testid="cta-band">
    <SectionTitle className="text-white" testid="cta-band-title">
      Forever <strong>free</strong>
    </SectionTitle>
    <p className="mx-auto -mt-4 mb-8 max-w-xl text-center text-base text-white">
      Privacy is a fundamental right and we are here to protect it.
      <br />
      That's why Bozzmail Mail will be free, forever.
    </p>
    <div className="flex justify-center">
      <WaitlistForm idPrefix="cta-waitlist" variant="yellow" buttonLabel="Reserve your free account" className="justify-center" />
    </div>
    <img
      src="/illustrations/free_phone.webp"
      alt="Illustration of a hand holding a phone protected by a shield, surrounded by app icons."
      loading="lazy"
      className="mx-auto mt-8 w-full max-w-[420px] pb-10"
    />
  </Section>
);
