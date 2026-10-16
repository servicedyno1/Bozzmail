import { useState } from "react";
import { ShieldCheck, Leaf, Hand } from "lucide-react";
import { Section, SectionTitle, Reveal } from "./Section";

const usps = [
  {
    icon: ShieldCheck,
    title: "Secure",
    text: "Bozzmail automatically encrypts all your data end-to-end with post-quantum cryptography, which makes it the safest way to email.",
    image: "/illustrations/usp_secure.webp",
    alt: "Illustration of a woman working on a laptop next to a large shield with a padlock.",
    quotes: [
      "Mail, calendar and contacts are encrypted on your device before anything is sent.",
      "Your private keys are generated locally and never leave your device unencrypted.",
      "Hybrid post-quantum algorithms protect today's mail against tomorrow's computers.",
    ],
  },
  {
    icon: Leaf,
    title: "Green",
    text: "We take our responsibility seriously and only use renewable energy to power your emails, calendars and contacts.",
    image: "/illustrations/usp_green.webp",
    alt: "Illustration of a wind turbine, solar panels and an enlarged light bulb symbolizing renewable energy.",
    quotes: [
      "Our infrastructure is powered by renewable energy.",
      "No ad-tech means no data warehouses crunching your behaviour around the clock.",
      "Lean, efficient apps move less data — and burn less energy on every device.",
    ],
  },
  {
    icon: Hand,
    title: "Ad-free",
    text: "We give you the freedom to communicate confidentially, without any tracking or personalized ads.",
    image: "/illustrations/usp_adfree.webp",
    alt: "Illustration of a man with a clipboard next to an enlarged shield with a stop hand symbol.",
    quotes: [
      "Bozzmail is funded by paid plans, not by advertisers — so you are the customer, never the product.",
      "No tracking pixels, no profiling, no 'personalised' anything — in the app or in our emails to you.",
      "Remote images and trackers in incoming mail are blocked by default.",
    ],
  },
];

const Bubble = ({ quotes, prefix }) => {
  const [i, setI] = useState(0);
  return (
    <div className="mt-2 flex flex-col items-center" data-testid={`${prefix}-bubble`}>
      <div className="relative w-full max-w-[330px] rounded-[6px] border border-tutao bg-white px-5 py-4 text-center text-sm italic text-tutao">
        <p data-testid={`${prefix}-quote`}>{quotes[i]}</p>
        <svg className="absolute left-1/2 top-full -ml-3 -mt-px" width="24" height="64" viewBox="0 0 24 64" aria-hidden="true">
          <path d="M1 0 L12 62 L23 0" fill="#fff" stroke="#850122" strokeWidth="1" />
        </svg>
      </div>
      <p className="mt-[72px] text-sm uppercase tracking-wide text-dunkel">How it works</p>
      <div className="mt-3 flex gap-2.5" role="tablist">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show statement ${idx + 1}`}
            aria-selected={idx === i}
            role="tab"
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${idx === i ? "bg-tutao" : "bg-candy hover:bg-dark-peach"}`}
            data-testid={`${prefix}-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Values = () => (
  <Section id="better-web" bg="bg-white" testid="values-section">
    <SectionTitle className="text-fighter" testid="values-title">
      A better <strong>web</strong>
    </SectionTitle>
    <div className="grid gap-6 md:grid-cols-3">
      {usps.map((u, idx) => (
        <Reveal key={u.title} delay={idx * 0.08} className="rounded-[6px] bg-peach px-5 pb-10 pt-8 text-center" data-testid={`value-card-${u.title.toLowerCase()}`}>
          <u.icon className="mx-auto h-10 w-10 text-fighter" strokeWidth={2.2} />
          <h3 className="mt-3 text-[length:var(--text-l)] font-bold text-dunkel">{u.title}</h3>
          <p className="mx-auto mt-4 max-w-sm text-base text-tutao">{u.text}</p>
          <img src={u.image} alt={u.alt} loading="lazy" className="mx-auto mt-6 w-full max-w-[340px]" />
          <Bubble quotes={u.quotes} prefix={`value-${u.title.toLowerCase()}`} />
        </Reveal>
      ))}
    </div>
  </Section>
);
