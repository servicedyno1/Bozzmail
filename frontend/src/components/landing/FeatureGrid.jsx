import { KeyRound, MousePointerClick, Gem, ShieldCheck, Globe, ArrowRight } from "lucide-react";
import { Section, SectionTitle } from "./Section";

const Link = ({ href, children, light = true }) => (
  <a href={href} className={`link-arrow mt-auto inline-flex items-center gap-1 text-sm ${light ? "text-white" : "text-dunkel"}`}>
    {children} <ArrowRight className="h-3.5 w-3.5" />
  </a>
);

const IconBox = ({ Icon, border, color }) => (
  <div className={`flex min-h-[200px] flex-1 items-center justify-center rounded-[6px] border-2 ${border}`}>
    <Icon className={`h-24 w-24 ${color}`} strokeWidth={1.4} />
  </div>
);

export const FeatureGrid = () => (
  <Section id="security" bg="bg-peach" testid="security-section">
    <SectionTitle className="text-fighter" testid="security-title">
      Welcome to <strong>post-quantum security</strong>
    </SectionTitle>

    <div
      className="grid gap-6 lg:grid-cols-3 lg:[grid-template-areas:'a_b_c'_'d_b_e'_'d_f_f']"
      data-testid="security-grid"
    >
      {/* a — zero knowledge */}
      <div className="relative flex flex-col rounded-[6px] bg-nota p-5 text-white lg:[grid-area:a]" data-testid="feature-zero-knowledge">
        <div className="absolute right-6 top-0 flex w-[76px] flex-col items-center bg-navy pb-3 pt-2 text-center text-[9px] font-black uppercase leading-tight tracking-wide text-white [clip-path:polygon(0_0,100%_0,100%_100%,50%_85%,0_100%)]" aria-hidden="true">
          Privacy by design
          <span className="mt-1 flex gap-0.5 text-sonne">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</span>
        </div>
        <h3 className="pr-24 text-[length:var(--text-ml)] font-bold">Zero-knowledge</h3>
        <p className="mt-3 pr-20 text-base">Our zero-knowledge architecture means not even we can read your mail, calendar or contacts.</p>
        <Link href="#product">Bozzmail and privacy</Link>
      </div>

      {/* b — encryption (tall) */}
      <div className="flex flex-col gap-5 rounded-[6px] bg-nota p-5 text-white lg:[grid-area:b]" data-testid="feature-encryption">
        <IconBox Icon={KeyRound} border="border-white" color="text-white" />
        <h3 className="text-[length:var(--text-ml)] font-bold">End-to-end encryption</h3>
        <p className="text-base">Choose a truly end-to-end encrypted email service with quantum-resistant cryptography.</p>
        <Link href="#product">Explore Bozzmail's encryption</Link>
      </div>

      {/* c — open standards */}
      <div className="flex flex-col rounded-[6px] bg-tutao p-5 text-white lg:[grid-area:c]" data-testid="feature-open">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[length:var(--text-ml)] font-bold">Open standards</h3>
          <Globe className="h-14 w-14 shrink-0" strokeWidth={1.4} />
        </div>
        <p className="mt-3 text-base">Built on open protocols so security experts can audit how your data is protected.</p>
        <Link href="#freedom-fighters">Bozzmail and openness</Link>
      </div>

      {/* d — ease of use (tall, pink) */}
      <div className="flex flex-col gap-5 rounded-[6px] bg-candy p-5 text-dunkel lg:[grid-area:d]" data-testid="feature-ease">
        <IconBox Icon={MousePointerClick} border="border-dunkel" color="text-dunkel" />
        <h3 className="text-[length:var(--text-ml)] font-bold">Ease of use</h3>
        <p className="text-base">Enjoy the ease and simplicity of our intuitive apps for Android, iOS, Windows, macOS and Linux.</p>
        <Link href="#download" light={false}>Explore Bozzmail Mail</Link>
      </div>

      {/* e — focus on security */}
      <div className="flex flex-col rounded-[6px] bg-nota p-5 text-white lg:[grid-area:e]" data-testid="feature-security">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[length:var(--text-ml)] font-bold">Focus on security</h3>
          <ShieldCheck className="h-14 w-14 shrink-0" strokeWidth={1.4} />
        </div>
        <p className="mt-3 text-base">We focus on protecting your data, which goes well beyond encryption: 2FA, session control and more.</p>
        <Link href="#better-web">Our focus on security</Link>
      </div>

      {/* f — best value (wide, yellow) */}
      <div className="grid gap-5 rounded-[6px] bg-sonne p-5 text-dunkel md:grid-cols-2 lg:[grid-area:f]" data-testid="feature-value">
        <IconBox Icon={Gem} border="border-dunkel" color="text-dunkel" />
        <div className="flex flex-col">
          <h3 className="text-[length:var(--text-ml)] font-bold">Best value for your domain</h3>
          <p className="mt-3 text-base">Use Bozzmail with your own custom domain and an unlimited number of alias email addresses.</p>
          <Link href="#pricing" light={false}>Check Bozzmail's plans</Link>
        </div>
      </div>
    </div>
  </Section>
);
