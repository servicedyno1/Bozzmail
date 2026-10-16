import { Lock, KeyRound, Code2, MousePointerClick, ShieldHalf, AtSign } from "lucide-react";
import { Reveal, MixedHeading } from "./Reveal";

const features = [
  {
    icon: Lock,
    title: "Zero-knowledge architecture",
    body: "We can't read your data — by design, not by promise.",
  },
  {
    icon: KeyRound,
    title: "End-to-end encryption",
    body: "Quantum-resistant cryptography protects mail, calendar and contacts.",
  },
  {
    icon: Code2,
    title: "Open source",
    body: "Every client is fully open source and auditable by security experts.",
  },
  {
    icon: MousePointerClick,
    title: "Ease of use",
    body: "Intuitive apps for Android, iOS, Windows, macOS and Linux.",
  },
  {
    icon: ShieldHalf,
    title: "Focus on security",
    body: "Protection that goes beyond encryption, from signup to storage.",
  },
  {
    icon: AtSign,
    title: "Your own domain",
    body: "Custom domains with unlimited aliases for a professional identity.",
  },
];

export const FeatureGrid = () => {
  return (
    <section id="security" className="bg-paper py-24 md:py-32" data-testid="security-section">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <MixedHeading light="Welcome to" bold="post-quantum security." />
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[#e6e4dc] bg-[#e6e4dc] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group bg-white p-8 transition-colors duration-300 hover:bg-[#faf9f6]"
              data-testid={`feature-${i}`}
            >
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f3ee] transition-colors duration-300 group-hover:bg-[#fdf0f2]">
                <f.icon className="h-6 w-6 text-ink transition-colors duration-300 group-hover:text-[#850122]" strokeWidth={2} />
              </span>
              <h3 className="font-display text-lg font-extrabold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
