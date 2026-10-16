import { Eye, Megaphone, Database } from "lucide-react";
import { Section, Reveal } from "./Section";

const pains = [
  { icon: Eye, title: "Your inbox is being read", text: "Big-tech mail scans every message to build a profile of you — your purchases, your health, your relationships." },
  { icon: Megaphone, title: "You are the product", text: "“Free” email is paid for with ads targeted at your private conversations and trackers that follow you across the web." },
  { icon: Database, title: "Your data outlives your consent", text: "Decades of mail sit on servers you don't control, readable by anyone who gains access — lawfully or otherwise." },
];

export const ProblemBeat = () => (
  <Section id="problem" bg="bg-white" className="!pb-8 md:!pb-10" testid="problem-section">
    <h2 className="section-title text-dunkel" data-testid="problem-title">
      Email was never <strong>built for privacy</strong>
    </h2>
    <div className="grid gap-6 md:grid-cols-3">
      {pains.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.08} className="flex gap-4 rounded-[6px] border border-dark-peach/60 p-5 md:flex-col md:p-6" data-testid={`pain-${i}`}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-candy text-fighter">
            <p.icon className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <div>
            <h3 className="text-[length:var(--text-m)] font-bold text-tutao">{p.title}</h3>
            <p className="mt-2 max-w-[60ch] text-base text-dunkel/85">{p.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <p className="mx-auto mt-10 max-w-[65ch] text-center text-[length:var(--text-m)] font-bold text-tutao" data-testid="problem-bridge">
      Bozzmail flips the switch: everything is encrypted on your device, so nobody — not even us — can read it.
    </p>
  </Section>
);
