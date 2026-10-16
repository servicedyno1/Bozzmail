import { Wind, Heart, Server } from "lucide-react";
import { Section, SectionTitle, Reveal } from "./Section";

const RoundBadge = ({ text, bg, fg, Icon, className = "" }) => (
  <div className={`absolute flex h-[108px] w-[108px] items-center justify-center rounded-full shadow-tuta ${bg} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
      <defs>
        <path id={`arc-${text.replace(/\s/g, "")}`} d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
      </defs>
      <text fontSize="11.5" fontWeight="800" letterSpacing="2" fill={fg} fontFamily="var(--sans)">
        <textPath href={`#arc-${text.replace(/\s/g, "")}`} startOffset="2%">{text}</textPath>
      </text>
    </svg>
    <Icon className="h-9 w-9" style={{ color: fg }} strokeWidth={1.8} />
  </div>
);

const ShieldBadge = () => (
  <div className="absolute -top-[150px] right-0 w-[112px] drop-shadow-md" aria-hidden="true">
    <svg viewBox="0 0 112 150" className="w-full">
      <path d="M0 14 L112 14 L112 108 Q112 134 56 150 Q0 134 0 108 Z" fill="#410002" />
      <path d="M0 14 L8 10 L14 14 L20 6 L28 12 L36 4 L44 12 L52 8 L60 14 L68 6 L76 12 L84 4 L92 12 L100 6 L106 14 L112 10 L112 14 Z" fill="#410002" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center px-2 pt-2 text-center leading-tight text-white">
      <span className="text-[11px] font-black">secure</span>
      <span className="text-[11px] font-black">communication</span>
      <span className="text-[10px]">made with care</span>
    </div>
  </div>
);

const Story = ({ image, alt, title, children, badge, testid }) => (
  <Reveal className="relative" data-testid={testid}>
    <img src={image} alt={alt} loading="lazy" className="h-[420px] w-full rounded-[6px] object-cover md:h-[480px]" />
    <div className="relative z-10 -mt-24 ml-6 mr-4 md:-mr-6 md:ml-14">
      {badge}
      <div className="rounded-[6px] bg-peach p-6 md:p-8">
        <h3 className="text-[length:var(--text-ml)] font-bold text-tutao">{title}</h3>
        <p className="mt-3 text-base text-tutao">{children}</p>
      </div>
    </div>
  </Reveal>
);

export const Mission = () => (
  <Section id="freedom-fighters" bg="bg-white" testid="mission-section">
    <SectionTitle testid="mission-title">
      <strong>Freedom</strong> fighters
    </SectionTitle>

    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <Story
        image="/illustrations/story_servers.webp"
        alt="Server racks bathed in warm red light."
        title="Sustainability for a better future"
        testid="story-sustainability"
        badge={<RoundBadge text="GREEN ENERGY •" bg="bg-green-candy" fg="#015f47" Icon={Wind} className="-top-[116px] right-0" />}
      >
        We put ethics before profits, which makes Bozzmail a partner you can trust. We are committed to a more environmentally friendly future. By using green energy, supporting non-profits, freedom of speech and strong privacy laws, Bozzmail fights for a better web.
      </Story>
      <Story
        image="/illustrations/story_founders.webp"
        alt="Two founders looking upward in warm light."
        title="Our privacy revolution"
        testid="story-revolution"
        badge={<ShieldBadge />}
      >
        Big tech companies use your personal information for their own profit. Now is the time to break free and take back what belongs to you: your data. Bozzmail was founded on one conviction — that privacy is a right, not a premium feature — and every line of code we ship serves it.
      </Story>
    </div>

    <Reveal className="relative mt-16 grid items-center lg:grid-cols-[1.1fr_1fr]" data-testid="story-team">
      <img src="/illustrations/story_team.webp" alt="Mosaic of smiling team members in red duotone." loading="lazy" className="h-[300px] w-full rounded-[6px] object-cover lg:h-[360px]" />
      <div className="relative z-10 mx-4 -mt-16 rounded-[6px] bg-peach p-6 md:p-8 lg:-ml-24 lg:mt-0">
        <RoundBadge text="WE LOVE PRIVACY •" bg="bg-candy" fg="#850122" Icon={Heart} className="-top-14 right-4 hidden md:flex" />
        <h3 className="text-[length:var(--text-ml)] font-bold text-tutao">Join the Bozzmail team</h3>
        <p className="mt-3 text-base text-tutao">
          Hi, we are the Bozzmail team. We build the most secure email, calendar and contacts service so you can take control of your data. Our mission is to bring privacy to everyone, with freedom and zero tracking. Be part of it.
        </p>
        <div className="mt-6 flex justify-end">
          <a href="#reserve" className="btn-tuta bg-fighter text-white" data-testid="jobs-button">
            <Server className="h-4 w-4" /> Get early access
          </a>
        </div>
      </div>
    </Reveal>
  </Section>
);
