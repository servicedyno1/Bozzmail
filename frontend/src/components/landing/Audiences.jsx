import { Building2, BriefcaseMedical, User, Megaphone, Newspaper } from "lucide-react";
import { Section, SectionTitle, Reveal } from "./Section";

const audiences = [
  { icon: Building2, title: "Business", text: "Protect your data the easy way.", image: "/illustrations/aud_business.webp" },
  { icon: BriefcaseMedical, title: "Medical", text: "End-to-end encrypted & GDPR-compliant.", image: "/illustrations/aud_medical.webp" },
  { icon: User, title: "Personal", text: "Free secure email for everyone.", image: "/illustrations/aud_personal.webp" },
  { icon: Megaphone, title: "Activists", text: "Privacy, anonymity, security: all in one place.", image: "/illustrations/aud_activists.webp" },
  { icon: Newspaper, title: "Journalists", text: "Protect your emails and your sources.", image: "/illustrations/aud_journalists.webp" },
];

export const Audiences = () => (
  <Section id="audiences" bg="bg-white" testid="audiences-section">
    <SectionTitle className="text-tutao" testid="audiences-title">
      For all your <strong>email needs</strong>
    </SectionTitle>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
      {audiences.map((a, i) => (
        <Reveal
          key={a.title}
          delay={i * 0.06}
          className="flex flex-col overflow-hidden rounded-[6px] bg-peach pt-6 text-center last:col-span-2 last:mx-auto last:w-[calc(50%-0.5rem)] md:last:col-span-1 md:last:w-auto"
          data-testid={`audience-card-${a.title.toLowerCase()}`}
        >
          <a.icon className="mx-auto h-9 w-9 text-fighter" strokeWidth={2} />
          <h3 className="mt-2 text-[length:var(--text-ml)] font-bold text-dunkel">{a.title}</h3>
          <p className="mx-auto mt-2 min-h-[3.25rem] max-w-[200px] px-3 text-sm text-dunkel md:text-base">{a.text}</p>
          <img src={a.image} alt={`Illustration representing ${a.title.toLowerCase()} users.`} loading="lazy" className="mt-5 aspect-[4/5] w-full object-cover object-top" />
        </Reveal>
      ))}
    </div>
  </Section>
);
