import { Section, SectionTitle } from "./Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Keep in sync with the FAQPage JSON-LD in public/index.html
export const faqs = [
  { q: "Is reserving an address free?", a: "Yes. Reserving your @bozzmail.com address costs nothing and needs no payment details. It simply holds the handle for you until launch." },
  { q: "Is the reservation binding?", a: "No. You are not committing to anything. When Bozzmail launches you will receive an invite to activate the address; if you decide not to, the reservation simply lapses." },
  { q: "When does Bozzmail launch?", a: "We will email your launch invite to the contact address you gave us as soon as your encrypted mailbox is ready. Early reservations are invited first." },
  { q: "Can I change my handle later?", a: "Yes. You can pick a different available handle before activation. The address becomes permanent only once you activate it at launch." },
  { q: "What do you do with my contact email?", a: "We use it only to confirm your reservation and send your launch invite. No newsletters, no third parties, no tracking pixels." },
  { q: "How is my data protected?", a: "Bozzmail is built on end-to-end, zero-knowledge encryption: mail, calendar and contacts are encrypted on your device so only you can read them, and we never show ads or profile you." },
];

export const FAQ = () => (
  <Section id="faq" bg="bg-peach" testid="faq-section">
    <SectionTitle className="text-tutao" testid="faq-title">
      Questions, <strong>answered</strong>
    </SectionTitle>
    <Accordion type="single" collapsible className="mx-auto max-w-3xl rounded-[6px] bg-white px-6 shadow-tuta" data-testid="faq-accordion">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className="border-peach" data-testid={`faq-item-${i}`}>
          <AccordionTrigger className="py-5 text-left text-[length:var(--text-m)] font-bold text-dunkel hover:no-underline hover:text-nota" data-testid={`faq-trigger-${i}`}>
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-[65ch] pb-5 text-base text-dunkel/85" data-testid={`faq-content-${i}`}>
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </Section>
);
