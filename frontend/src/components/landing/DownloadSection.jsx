import { Smartphone, Apple, Terminal, Monitor, Globe } from "lucide-react";
import { Reveal, MixedHeading } from "./Reveal";

const platforms = [
  { icon: Smartphone, label: "Android" },
  { icon: Apple, label: "iOS" },
  { icon: Terminal, label: "Linux" },
  { icon: Monitor, label: "Windows" },
  { icon: Monitor, label: "macOS" },
  { icon: Globe, label: "Browser" },
];

export const DownloadSection = () => {
  return (
    <section className="bg-paper py-24 md:py-32" data-testid="download-section">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <MixedHeading light="Download" bold="Enclave." />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-lg text-ink-muted">
            Encrypted email, always by your side. Apps for every platform arrive
            with launch — waitlist members get first access.
          </p>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-4">
          {platforms.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <div
                className="flex items-center gap-3 rounded-full border border-[#e6e4dc] bg-white px-6 py-3.5 transition-shadow duration-300 hover:shadow-[0_12px_30px_-12px_rgba(27,21,38,0.2)]"
                data-testid={`platform-${p.label.toLowerCase()}`}
              >
                <p.icon className="h-5 w-5 text-ink" />
                <span className="font-display text-sm font-bold text-ink">{p.label}</span>
                <span className="rounded-full bg-[#f4f3ee] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ink-muted">
                  Soon
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
