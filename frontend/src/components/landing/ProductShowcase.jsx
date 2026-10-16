import { useState } from "react";
import { EyeOff, BellOff, Smartphone, Wallet, Lock, Calendar, Repeat, ListChecks } from "lucide-react";
import { Section, SectionTitle } from "./Section";
import { Logo } from "./Logo";
import { DeviceMockups } from "./DeviceMockups";

const products = {
  mail: {
    label: "mail",
    heading: "Email to feel good about: private and easy to use.",
    usps: [
      { icon: EyeOff, title: "End-to-end encryption guarantees your privacy", body: "We protect your data to the maximum with quantum-safe encryption." },
      { icon: BellOff, title: "Intuitive design for a fast workflow", body: "The ease and simplicity of our apps lead to an organized workflow." },
      { icon: Smartphone, title: "Stay connected, wherever you are", body: "Use the free Bozzmail apps for Android or iPhone on the go, online and offline." },
      { icon: Wallet, title: "Best value custom domain accounts", body: "Use your custom email address for a professional look." },
    ],
  },
  calendar: {
    label: "calendar",
    heading: "A calendar that keeps your plans to yourself.",
    usps: [
      { icon: Lock, title: "Zero-knowledge calendar that respects your privacy", body: "Built-in encryption guarantees your schedule belongs to you alone." },
      { icon: Calendar, title: "Perfectly integrated into your email app", body: "Accept invites and manage meetings without leaving your inbox." },
      { icon: BellOff, title: "Never miss an event — no tracking push services", body: "Private reminders on Android and iOS, with no Google Push in between." },
      { icon: Repeat, title: "Organization is key, personal or business", body: "Appointments, meetings and repeating tasks in one clear view." },
    ],
  },
};

const UspList = ({ usps, active, onSelect, prefix }) => (
  <ul className="relative" data-testid={`${prefix}-usp-list`}>
    <span className="absolute bottom-10 left-[35px] top-10 w-px bg-candy" aria-hidden="true" />
    {usps.map((u, i) => {
      const isActive = i === active;
      return (
        <li key={u.title} className="relative mb-2">
          <button
            type="button"
            onClick={() => onSelect(i)}
            className="flex w-full items-start gap-5 rounded-[6px] px-0 py-4 text-left transition-colors hover:bg-peach/60"
            data-testid={`${prefix}-usp-${i}`}
            aria-pressed={isActive}
          >
            <span className="flex w-[72px] shrink-0 justify-center pt-0.5">
              <span
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-14 w-14 bg-fighter text-white outline-dashed outline-2 outline-offset-4 outline-candy"
                    : "h-10 w-10 bg-candy text-nota/70"
                }`}
              >
                <u.icon className={isActive ? "h-6 w-6" : "h-5 w-5"} />
              </span>
            </span>
            <span className="min-w-0">
              <span className={`block text-[length:var(--text-m)] font-bold leading-snug ${isActive ? "text-fighter" : "text-tutao"}`}>{u.title}</span>
              <span className="mt-1 block text-base text-dunkel/85">{u.body}</span>
            </span>
          </button>
        </li>
      );
    })}
  </ul>
);

export const ProductShowcase = () => {
  const [tab, setTab] = useState("mail");
  const [active, setActive] = useState(0);
  const p = products[tab];

  return (
    <Section id="product" bg="bg-peach" testid="product-section">
      <SectionTitle testid="product-title">
        <strong>Secure</strong> at a touch
      </SectionTitle>

      <div className="grid grid-cols-2 gap-3 md:gap-4" role="tablist" data-testid="product-tabs">
        {Object.keys(products).map((k) => {
          const selected = k === tab;
          return (
            <button
              key={k}
              role="tab"
              aria-selected={selected}
              onClick={() => { setTab(k); setActive(0); }}
              className={`flex items-center justify-center rounded-t-[6px] px-3 py-5 transition-colors md:py-7 ${
                selected ? "bg-white" : "bg-candy-light opacity-60 hover:opacity-90"
              }`}
              data-testid={`product-tab-${k}`}
            >
              <Logo product={products[k].label} size="md" />
            </button>
          );
        })}
      </div>

      <div className="rounded-b-[6px] bg-white px-5 py-8 md:px-10 md:py-12" role="tabpanel" data-testid={`product-panel-${tab}`}>
        <h3 className="mb-6 text-[length:var(--text-l)] font-bold leading-tight text-dunkel" data-testid="product-heading">{p.heading}</h3>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <UspList usps={p.usps} active={active} onSelect={setActive} prefix={tab} />
          <div className="lg:pt-6">
            <DeviceMockups kind={tab} />
          </div>
        </div>
      </div>
    </Section>
  );
};
