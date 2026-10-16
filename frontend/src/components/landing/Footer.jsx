import { Rss, Github, AtSign, Leaf, ShieldCheck } from "lucide-react";
import { FaXTwitter, FaMastodon } from "react-icons/fa6";
import { Logo } from "./Logo";

const columns = [
  { title: "Products", links: [["Bozzmail Mail", "#product"], ["Bozzmail Calendar", "#product"], ["Bozzmail Contacts", "#product"]] },
  { title: "Company", links: [["Community", "#freedom-fighters"], ["Team", "#freedom-fighters"], ["Jobs", "#freedom-fighters"], ["Terms", "#"], ["Privacy", "#"], ["Legal notice", "#"]] },
  { title: "Development", links: [["Roadmap", "#security"], ["Security", "#security"], ["Encryption", "#security"], ["Open standards", "#security"]] },
  { title: "Needs", links: [["Personal", "#audiences"], ["Business", "#business"]] },
  { title: "Support", links: [["Forum", "#"], ["Press", "#"], ["Support", "mailto:hello@bozzmail.com"]] },
];

const socials = [
  { label: "X", Icon: FaXTwitter },
  { label: "Mastodon", Icon: FaMastodon },
  { label: "GitHub", Icon: Github },
  { label: "RSS", Icon: Rss },
];

export const Footer = () => (
  <footer className="bg-white py-16 text-dunkel" data-testid="site-footer">
    <div className="container-tuta">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <Logo size="lg" />
        <div className="flex items-center gap-5" data-testid="footer-socials">
          {socials.map(({ label, Icon }) => (
            <a key={label} href="#top" aria-label={label} className="text-dunkel transition-colors hover:text-nota">
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 font-bold">{c.title}</h4>
            <ul className="space-y-3">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-base hover:underline">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="mb-4 font-bold">Language</h4>
          <select className="rounded-[6px] border border-dark-peach bg-white px-2 py-1 text-sm" defaultValue="en" aria-label="Language" data-testid="footer-language">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
          <a href="#" className="mt-4 block text-base hover:underline">Translate</a>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          <a href="mailto:hello@bozzmail.com" className="rounded-[6px] border border-dark-peach px-4 py-2 text-sm font-semibold hover:bg-peach">Contact us</a>
          <a href="#waitlist" className="rounded-[6px] border border-dark-peach px-4 py-2 text-sm font-semibold hover:bg-peach">Join waitlist</a>
        </div>
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-candy px-4 py-2 text-xs font-black uppercase tracking-wide text-green-tutao"><Leaf className="h-4 w-4" /> 100% green energy</span>
          <span className="inline-flex items-center gap-2 bg-navy px-4 py-2 text-xs font-black uppercase tracking-wide text-white [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%)] pr-7"><ShieldCheck className="h-4 w-4 text-sonne" /> Privacy by design</span>
        </div>
      </div>

      <p className="mt-10 flex items-center gap-1.5 text-sm text-dunkel/70">
        <AtSign className="h-3.5 w-3.5" /> © {new Date().getFullYear()} Bozzmail · bozzmail.com · Encrypted email, calendar and contacts.
      </p>
    </div>
  </footer>
);
