import { Building2 } from "lucide-react";
import { Section, Reveal } from "./Section";

export const Business = () => (
  <Section id="business" bg="bg-lavender" testid="business-section">
    <div className="mb-[var(--size-l)] flex items-center justify-center gap-5">
      <h2 className="text-center text-[length:var(--text-xl)] font-normal leading-tight text-navy" data-testid="business-title">
        <strong className="font-bold text-teal">Privacy</strong> for your organization
      </h2>
      <span className="relative hidden h-[72px] w-[68px] items-center justify-center text-teal sm:flex" aria-hidden="true">
        <svg viewBox="0 0 68 72" className="absolute inset-0 h-full w-full drop-shadow-md">
          <path d="M0 0 H68 V40 Q68 60 34 72 Q0 60 0 40 Z" fill="#fff" />
        </svg>
        <Building2 className="relative h-8 w-8 -translate-y-1" />
      </span>
    </div>

    <Reveal className="grid items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-6">
      <img src="/illustrations/biz_photo.webp" alt="A professional in a red blazer working on a laptop in a bright office." loading="lazy" className="w-full rounded-[6px] object-cover" />
      <div className="text-base text-navy">
        <p>Bozzmail is built for businesses — from small studios to financial institutions and human-rights organizations — that need to protect their professional emails and calendars.</p>
        <p className="mt-5">Save time and money by storing all your business emails end-to-end encrypted and protected by strong data-protection laws. Benefit from cost-efficiency, high availability, flexibility and automatic backup — without compromising on security or digital sovereignty.</p>
        <p className="mt-5 font-bold">Be among the first organizations to choose Bozzmail to safeguard their data.</p>
        <a href="#waitlist" className="btn-tuta mt-5 bg-tutao text-white" data-testid="business-cta">Bozzmail for business</a>
      </div>
    </Reveal>
  </Section>
);
