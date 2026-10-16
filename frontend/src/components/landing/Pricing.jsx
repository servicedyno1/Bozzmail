import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Section, SectionTitle, Reveal } from "./Section";

const plans = [
  {
    key: "free",
    name: "Free",
    tagline: "Private email for everyone.",
    monthly: 0,
    yearly: 0,
    features: ["1 GB storage", "1 @bozzmail.com address", "Encrypted mail, calendar & contacts", "Apps for all platforms", "No ads, no tracking"],
    missing: ["Custom domains", "Priority support"],
    cta: "Reserve for free",
    theme: "bg-peach text-dunkel",
    btn: "bg-tutao text-white",
  },
  {
    key: "revolutionary",
    name: "Revolutionary",
    tagline: "For people who mean it.",
    monthly: 3.6,
    yearly: 3,
    popular: true,
    features: ["20 GB storage", "15 extra addresses", "3 custom domains", "Unlimited calendars", "Priority support", "Everything in Free"],
    missing: [],
    cta: "Reserve Revolutionary",
    theme: "bg-nota text-white",
    btn: "bg-yellow-action text-tutao",
  },
  {
    key: "legend",
    name: "Legend",
    tagline: "Room for your whole life.",
    monthly: 9.6,
    yearly: 8,
    features: ["500 GB storage", "30 extra addresses", "Unlimited custom domains", "Unlimited calendars", "Priority support", "Everything in Revolutionary"],
    missing: [],
    cta: "Reserve Legend",
    theme: "bg-tutao text-white",
    btn: "bg-yellow-action text-tutao",
  },
];

const fmt = (n) => (n === 0 ? "€0" : `€${n.toFixed(n % 1 ? 2 : 0).replace(".", ",")}`);

export const Pricing = () => {
  const [yearly, setYearly] = useState(true);
  return (
    <Section id="pricing" bg="bg-white" testid="pricing-section">
      <SectionTitle className="text-tutao" testid="pricing-title">
        Planned <strong>pricing</strong>
      </SectionTitle>
      <p className="mx-auto -mt-4 mb-8 max-w-xl text-center text-base text-dunkel">
        Lock in launch pricing by reserving your address now. Plans are billed in euros; prices may be adjusted before launch.
      </p>

      <div className="mb-10 flex items-center justify-center gap-3 text-sm font-semibold text-dunkel" data-testid="billing-toggle">
        <span className={yearly ? "opacity-60" : ""}>Monthly</span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          onClick={() => setYearly(!yearly)}
          className={`relative h-7 w-12 rounded-full transition-colors ${yearly ? "bg-nota" : "bg-dark-peach"}`}
          data-testid="billing-toggle-switch"
        >
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] ${yearly ? "left-6" : "left-1"}`} />
        </button>
        <span className={yearly ? "" : "opacity-60"}>
          Yearly <span className="ml-1 rounded-sm bg-green-candy px-1.5 py-0.5 text-[11px] font-bold uppercase text-green-tutao">Save 17%</span>
        </span>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((p, i) => {
          const price = yearly ? p.yearly : p.monthly;
          return (
            <Reveal key={p.key} delay={i * 0.08} className={`relative flex flex-col rounded-[6px] p-7 ${p.theme} ${p.popular ? "shadow-tuta-strong lg:-mt-4 lg:mb-[-1rem]" : ""}`} data-testid={`plan-${p.key}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-yellow-action px-3 py-1 text-[11px] font-black uppercase tracking-wide text-tutao" data-testid="plan-popular-badge">
                  Most popular
                </span>
              )}
              <h3 className="text-[length:var(--text-ml)] font-bold">{p.name}</h3>
              <p className={`mt-1 text-sm ${p.popular || p.key === "legend" ? "text-white/85" : "text-dunkel/75"}`}>{p.tagline}</p>
              <p className="mt-6 flex items-end gap-1.5" data-testid={`plan-${p.key}-price`}>
                <span className="text-5xl font-bold leading-none">{fmt(price)}</span>
                <span className="pb-1 text-sm opacity-80">/ month</span>
              </p>
              <p className="mt-1 text-xs opacity-75">{price === 0 ? "Free forever" : yearly ? `Billed yearly (${fmt(price * 12)} / year)` : "Billed monthly"}</p>
              <ul className="mt-6 space-y-2.5 text-base">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={3} /> {f}</li>
                ))}
                {p.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 opacity-50"><Minus className="mt-1 h-4 w-4 shrink-0" /> {f}</li>
                ))}
              </ul>
              <a href="#reserve" className={`btn-tuta mt-8 ${p.btn}`} data-testid={`plan-${p.key}-cta`}>{p.cta}</a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
};
