import { Shield } from "lucide-react";

const columns = [
  {
    heading: "Product",
    links: ["Enclave Mail", "Enclave Calendar", "Pricing", "Custom domains"],
  },
  {
    heading: "Security",
    links: ["Encryption", "Open source", "Zero-knowledge", "Security focus"],
  },
  {
    heading: "Company",
    links: ["Mission", "Sustainability", "Team", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy policy", "Terms", "Imprint", "GDPR"],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-night py-16 md:py-20" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2" data-testid="footer-brand-link">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#850122]">
                <Shield className="h-[18px] w-[18px] text-white" strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Enclave
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Turn ON privacy. Encrypted email, calendar and contacts — free
              forever, without ads or tracking.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                {col.heading}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
                      data-testid={`footer-link-${l.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40" data-testid="footer-copyright">
            © 2026 Enclave. A privacy-first concept — waitlist open now.
          </p>
          <p className="text-xs text-white/40">
            No trackers on this page. Obviously.
          </p>
        </div>
      </div>
    </footer>
  );
};
