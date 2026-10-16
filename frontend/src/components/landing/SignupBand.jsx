import { Lock } from "lucide-react";
import { Section, SectionTitle } from "./Section";
import { ReserveForm } from "./ReserveForm";

export const SignupBand = () => (
  <Section bg="bg-nota" testid="signup-band">
    <SectionTitle className="text-white" testid="signup-band-title">
      Turn OFF <strong>Surveillance</strong>
    </SectionTitle>
    <div className="mx-auto -mt-4 mb-8 flex max-w-xl flex-col items-center text-center text-white">
      <Lock className="h-8 w-8" strokeWidth={2.4} />
      <p className="mt-2 text-sm">Built for people who refuse to be tracked:</p>
      <p className="mt-1 text-[length:var(--text-m)] font-bold italic">"Encrypted email. Zero tracking. Forever."</p>
    </div>
    <div className="flex justify-center">
      <ReserveForm idPrefix="band-reserve" variant="dark" />
    </div>
  </Section>
);
