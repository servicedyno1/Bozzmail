export const LogoMark = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    role="img"
    aria-label="Bozzmail logo"
    className={className}
    data-testid="bozzmail-logo-mark"
  >
    <rect width="48" height="48" rx="13" fill="#850122" />
    <rect x="12.5" y="10.5" width="6" height="27" rx="3" fill="#ffffff" />
    <circle cx="27.5" cy="28" r="9.5" stroke="#ffffff" strokeWidth="6" />
    <circle cx="27.5" cy="28" r="3.6" fill="#35d99a" />
  </svg>
);

export const Logo = ({ dark = false }) => (
  <span className="flex items-center gap-2.5">
    <LogoMark size={32} />
    <span
      className={`font-display text-[22px] leading-none tracking-tight ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      <span className="font-extrabold">Bozz</span>
      <span className="font-light">mail</span>
    </span>
  </span>
);
