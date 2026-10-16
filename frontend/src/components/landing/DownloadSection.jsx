import { FaAndroid, FaApple, FaLinux, FaWindows, FaGlobe } from "react-icons/fa";
import { Section, SectionTitle } from "./Section";

const IosIcon = (props) => (
  <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
    <rect x="6" y="6" width="52" height="52" rx="12" stroke="currentColor" strokeWidth="4" />
    <text x="32" y="41" textAnchor="middle" fontFamily="var(--sans)" fontWeight="700" fontSize="22" fill="currentColor">iOS</text>
  </svg>
);

const platforms = [
  { label: "Android", Icon: FaAndroid },
  { label: "iOS", Icon: IosIcon },
  { label: "Linux", Icon: FaLinux },
  { label: "Windows", Icon: FaWindows },
  { label: "macOS", Icon: FaApple },
  { label: "Browser", Icon: FaGlobe },
];

export const DownloadSection = () => (
  <Section id="download" bg="bg-peach" testid="download-section">
    <SectionTitle className="text-tutao" testid="download-title">
      <strong>Download</strong> Bozzmail
    </SectionTitle>
    <p className="-mt-4 mb-10 text-center text-[length:var(--text-m)] font-bold text-tutao">Encrypted email always by your side.</p>
    <ul className="mx-auto grid max-w-4xl grid-cols-3 gap-y-10 md:grid-cols-6" data-testid="platform-list">
      {platforms.map(({ label, Icon }) => (
        <li key={label} className="group flex flex-col items-center gap-2 text-dunkel" data-testid={`platform-${label.toLowerCase()}`}>
          <span className="flex h-16 w-16 items-center justify-center transition-transform duration-200 group-hover:-translate-y-1">
            <Icon className="h-14 w-14" />
          </span>
          <span className="text-base font-semibold">{label}</span>
          <span className="rounded-sm bg-candy px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tutao">Soon</span>
        </li>
      ))}
    </ul>
  </Section>
);
