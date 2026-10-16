import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Reveal, MixedHeading } from "./Reveal";
import { MailMockup } from "./mockups/MailMockup";
import { CalendarMockup } from "./mockups/CalendarMockup";

const mailFeatures = [
  {
    title: "End-to-end encryption guarantees your privacy",
    body: "Quantum-safe encryption protects every message by default — only you can read your mail.",
  },
  {
    title: "Intuitive design for a fast workflow",
    body: "Clean, focused apps that keep your inbox organized and out of your way.",
  },
  {
    title: "Stay connected, wherever you are",
    body: "Apps for Android, iOS, desktop and browser — online and offline.",
  },
  {
    title: "Best value custom domain accounts",
    body: "Use your own domain for a professional identity, without the enterprise price tag.",
  },
];

const calendarFeatures = [
  {
    title: "Zero-knowledge calendar that respects your privacy",
    body: "Built-in encryption guarantees that your schedule belongs to you alone.",
  },
  {
    title: "Perfectly integrated into your email app",
    body: "Accept invites and manage meetings without ever leaving your inbox.",
  },
  {
    title: "Never miss an event — no tracking push services",
    body: "Private reminders on Android and iOS, with no Google Push in between.",
  },
  {
    title: "Organization is key, personal or business",
    body: "Appointments, meetings and repeating tasks in one clear view.",
  },
];

const FeatureList = ({ features, testidPrefix }) => (
  <ul className="space-y-8">
    {features.map((f, i) => (
      <Reveal key={f.title} delay={i * 0.06}>
        <li data-testid={`${testidPrefix}-feature-${i}`}>
          <h3 className="font-display text-lg font-bold text-ink md:text-xl">{f.title}</h3>
          <p className="mt-2 max-w-md leading-relaxed text-ink-muted">{f.body}</p>
        </li>
      </Reveal>
    ))}
  </ul>
);

export const ProductShowcase = () => {
  return (
    <section id="showcase" className="bg-paper-warm py-24 md:py-32" data-testid="showcase-section">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <MixedHeading light="Secure" bold="at a touch." />
        </Reveal>

        <Tabs defaultValue="mail" className="mt-12">
          <Reveal delay={0.1}>
            <TabsList
              className="h-auto gap-2 rounded-full border border-[#e6e4dc] bg-white p-1.5"
              data-testid="showcase-tabs"
            >
              <TabsTrigger
                value="mail"
                className="rounded-full px-6 py-2.5 font-display text-sm font-bold data-[state=active]:bg-[#850122] data-[state=active]:text-white"
                data-testid="showcase-tab-mail"
              >
                Bozz Mail
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="rounded-full px-6 py-2.5 font-display text-sm font-bold data-[state=active]:bg-[#850122] data-[state=active]:text-white"
                data-testid="showcase-tab-calendar"
              >
                Bozz Calendar
              </TabsTrigger>
            </TabsList>
          </Reveal>

          <TabsContent value="mail" className="mt-14">
            <motion.div
              key="mail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
            >
              <FeatureList features={mailFeatures} testidPrefix="mail" />
              <div className="pb-6">
                <MailMockup />
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="calendar" className="mt-14">
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
            >
              <FeatureList features={calendarFeatures} testidPrefix="calendar" />
              <div className="pb-6">
                <CalendarMockup />
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
