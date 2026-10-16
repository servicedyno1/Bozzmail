import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Mail", href: "#showcase" },
  { label: "Calendar", href: "#showcase" },
  { label: "Security", href: "#security" },
  { label: "Mission", href: "#mission" },
  { label: "Who it's for", href: "#audiences" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_0_#e6e4dc] backdrop-blur-md"
          : "bg-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-12">
        <a href="#top" data-testid="nav-brand-link" aria-label="Bozzmail home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" data-testid="nav-links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-ink-muted transition-colors duration-200 hover:text-ink"
              data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden rounded-full bg-[#850122] px-6 py-2.5 font-display text-sm font-bold tracking-wide text-white transition-colors duration-200 hover:bg-[#6d011b] sm:inline-block"
            data-testid="nav-cta-button"
          >
            Join waitlist
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-testid="nav-menu-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-[#e6e4dc] bg-white px-6 py-4 lg:hidden"
          data-testid="nav-mobile-menu"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-[#850122] px-6 py-3 text-center font-display text-sm font-bold text-white"
          >
            Join waitlist
          </a>
        </nav>
      )}
    </header>
  );
};
