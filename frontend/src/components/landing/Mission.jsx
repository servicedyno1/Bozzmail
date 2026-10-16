import { Leaf, Flag, Users } from "lucide-react";
import { Reveal, MixedHeading } from "./Reveal";

const cards = [
  {
    icon: Leaf,
    title: "Sustainability for a better future",
    body: "We put ethics before profit. Green energy, support for non-profits and a commitment to a freer web guide every decision we make.",
    image:
      "https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Modern green data center",
  },
  {
    icon: Flag,
    title: "Our privacy mission",
    body: "Big tech companies use your personal information for profit. We started Enclave so everyone can have a safe space online — free from tracking and surveillance.",
  },
  {
    icon: Users,
    title: "Built with our community",
    body: "Enclave is being shaped by the people on our waitlist. Join early, tell us what privacy means to you, and help build it.",
    cta: true,
  },
];

export const Mission = () => {
  return (
    <section id="mission" className="bg-paper-warm py-24 md:py-32" data-testid="mission-section">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <MixedHeading light="Freedom" bold="fighters." />
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#e6e4dc] bg-white"
                data-testid={`mission-card-${i}`}
              >
                {c.image ? (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-8">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fdf0f2]">
                    <c.icon className="h-5 w-5 text-[#850122]" strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-ink">{c.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                  {c.cta ? (
                    <a
                      href="#waitlist"
                      className="mt-6 font-display text-sm font-bold text-[#850122] underline-offset-4 hover:underline"
                      data-testid="mission-cta-link"
                    >
                      Join the waitlist →
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
