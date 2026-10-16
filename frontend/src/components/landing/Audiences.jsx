import { motion } from "framer-motion";
import { Reveal, MixedHeading } from "./Reveal";

const audiences = [
  {
    title: "Business",
    tagline: "Protect your data the easy way.",
    image:
      "https://images.pexels.com/photos/7580707/pexels-photo-7580707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Business professional at a desk",
  },
  {
    title: "Medical",
    tagline: "End-to-end encrypted & GDPR-ready.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwZG9jdG9yJTIwbGFib3JhdG9yeXxlbnwwfHx8fDE3OTIxODI4NzF8MA&ixlib=rb-4.1.0&q=85",
    alt: "Medical professional in a laboratory",
  },
  {
    title: "Personal",
    tagline: "Free secure email for everyone.",
    image:
      "https://images.pexels.com/photos/1467564/pexels-photo-1467564.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Person at home using a laptop",
  },
  {
    title: "Journalists",
    tagline: "Protect your emails — and your sources.",
    image:
      "https://images.unsplash.com/photo-1596801129861-8592c97db6ad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwxfHxqb3VybmFsaXN0JTIwcmVwb3J0ZXIlMjB3b3JraW5nJTIwY2FtZXJhfGVufDB8fHx8MTc5MjE4Mjg3MXww&ixlib=rb-4.1.0&q=85",
    alt: "Journalist working with a camera",
  },
];

export const Audiences = () => {
  return (
    <section id="audiences" className="bg-paper-warm py-24 md:py-32" data-testid="audiences-section">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <MixedHeading light="For all your" bold="email needs." />
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-80 overflow-hidden rounded-3xl"
              data-testid={`audience-card-${a.title.toLowerCase()}`}
            >
              <img
                src={a.image}
                alt={a.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16111f]/90 via-[#16111f]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-extrabold text-white">{a.title}</h3>
                <p className="mt-1 text-sm text-white/70">{a.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
