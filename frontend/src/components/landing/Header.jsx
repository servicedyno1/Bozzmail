import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Mail", href: "#product" },
  { label: "Calendar", href: "#product" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "Download", href: "#download" },
  { label: "Business", href: "#business" },
  { label: "Mission", href: "#freedom-fighters" },
];

export const AnnouncementBar = () => (
  <div
    className="relative z-40 bg-green-tutao px-4 py-1.5 text-center text-xs font-semibold text-white sm:text-[13px]"
    data-testid="announcement-bar"
  >
    Bozzmail is launching soon<span className="hidden sm:inline"> — reserve your @bozzmail.com address before someone else does</span>.
  </div>
);

export const Header = () => {
  const [top, setTop] = useState(44);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 24 ? 16 : 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-1/2 z-50 w-[calc(100%-20px)] max-w-[1286px] -translate-x-1/2 rounded-[6px] bg-white text-dunkel shadow-tuta-black transition-[top] duration-500 ease-in-out"
      style={{ top }}
      data-testid="site-header"
    >
      <div className="flex items-center justify-between px-3 py-2 lg:px-5 lg:py-3">
        <a href="#top" data-testid="nav-brand-link" aria-label="Bozzmail home" className="flex items-center">
          <Logo />
        </a>

        <nav className="hidden items-center lg:flex" data-testid="nav-links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-[6px] px-4 py-2 text-base font-semibold leading-5 transition-colors duration-100 hover:bg-peach"
              data-testid={`nav-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#better-web"
            className="rounded-[6px] border border-nota px-3 py-1.5 font-semibold text-nota transition-colors hover:bg-candy-light"
            data-testid="nav-secondary-button"
          >
            Why Bozzmail
          </a>
          <a
            href="#reserve"
            className="rounded-[6px] border border-nota bg-nota px-3 py-1.5 font-semibold text-white transition-[filter] hover:brightness-110"
            data-testid="nav-cta-button"
          >
            Reserve address
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-[6px] text-dunkel lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          data-testid="nav-menu-toggle"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-peach px-4 pb-4 pt-3 lg:hidden" data-testid="nav-mobile-menu">
          <div className="mb-3 flex flex-col gap-2 border-b border-peach pb-3">
            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              className="rounded-[6px] bg-nota px-3 py-2 text-center font-semibold text-white"
              data-testid="nav-mobile-cta"
            >
              Reserve address
            </a>
            <a
              href="#better-web"
              onClick={() => setOpen(false)}
              className="rounded-[6px] border border-nota px-3 py-2 text-center font-semibold text-nota"
            >
              Why Bozzmail
            </a>
          </div>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-[6px] px-3 py-2.5 font-semibold hover:bg-peach"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
