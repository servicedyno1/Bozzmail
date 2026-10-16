import { ShieldCheck, Leaf, EyeOff, Quote } from "lucide-react";
import { Reveal, MixedHeading } from "./Reveal";

const values = [
  {
    icon: ShieldCheck,
    title: "Secure",
    color: "#850122",
    bg: "#fdf0f2",
    body: "Everything you store is encrypted end-to-end with post-quantum cryptography — before it ever leaves your device.",
    placeholder: "Your story about security could be here.",
  },
  {
    icon: Leaf,
    title: "Green",
    color: "#015f47",
    bg: "#eef5f1",
    body: "We take responsibility seriously: Enclave runs on renewable energy, so privacy never costs the planet.",
    placeholder: "Your story about sustainability could be here.",
  },
  {
    icon: EyeOff,
    title: "Ad-free",
    color: "#1b1526",
    bg: "#f4f3ee",
    body: "Freedom to communicate confidentially — no tracking, no profiling, no personalized ads. Ever.",
    placeholder: "Your story about an ad-free inbox could be here.",
  },
];

export const Values = () => {
  return (
    <section className="bg-paper py-24 md:py-32" data-testid="values-section">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <MixedHeading light="A better" bold="web." />
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div
                className="flex h-full flex-col rounded-3xl border border-[#e6e4dc] bg-white p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(27,21,38,0.15)]"
                data-testid={`value-card-${v.title.toLowerCase().replace(/[^a-z]/g, "-")}`}
              >
                <span
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: v.bg }}
                >
                  <v.icon className="h-6 w-6" style={{ color: v.color }} strokeWidth={2.2} />
                </span>
                <h3 className="font-display text-2xl font-extrabold text-ink">{v.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{v.body}</p>
                <div className="mt-8 rounded-2xl border border-dashed border-[#d8d5cc] bg-[#faf9f6] p-5">
                  <Quote className="mb-2 h-4 w-4 text-[#b9b5ab]" />
                  <p className="text-sm italic text-[#9a95a3]">{v.placeholder}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-widest text-[#c5c2b8]">
                    Early member spotlight — soon
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
