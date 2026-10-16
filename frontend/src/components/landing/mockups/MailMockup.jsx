import { ShieldCheck, Inbox, Send, FileText, Star, Search } from "lucide-react";

const mails = [
  { name: "Mara Jensen", subject: "Q3 report — final draft", time: "09:41", unread: true, color: "#850122" },
  { name: "Jonas Weber", subject: "Re: source protection", time: "08:17", unread: true, color: "#015f47" },
  { name: "Clinic Nord", subject: "Appointment confirmation", time: "Yesterday", unread: false, color: "#1b1526" },
  { name: "Ledger Weekly", subject: "Your encrypted digest", time: "Tuesday", unread: false, color: "#6b6575" },
];

export const MailMockup = () => (
  <div
    className="relative mx-auto w-full max-w-xl rounded-2xl border border-[#e6e4dc] bg-white shadow-[0_30px_60px_-20px_rgba(27,21,38,0.18)]"
    data-testid="mail-mockup"
  >
    <div className="flex items-center gap-1.5 border-b border-[#f0efe9] px-5 py-3.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#e4a1a1]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ecd9a8]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#b8d8c4]" />
      <div className="ml-4 flex flex-1 items-center gap-2 rounded-md bg-[#f7f6f2] px-3 py-1.5 text-xs text-[#9a95a3]">
        <Search className="h-3 w-3" /> Search encrypted mail
      </div>
    </div>
    <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr]">
      <div className="border-r border-[#f0efe9] p-3">
        {[
          { icon: Inbox, label: "Inbox", count: 2, active: true },
          { icon: Star, label: "Starred" },
          { icon: Send, label: "Sent" },
          { icon: FileText, label: "Drafts" },
        ].map((f) => (
          <div
            key={f.label}
            className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium sm:text-xs ${
              f.active ? "bg-[#fdf0f2] text-[#850122]" : "text-[#6b6575]"
            }`}
          >
            <f.icon className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{f.label}</span>
            {f.count ? (
              <span className="ml-auto rounded-full bg-[#850122] px-1.5 py-0.5 text-[9px] font-bold text-white">
                {f.count}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="divide-y divide-[#f4f3ee]">
        {mails.map((m) => (
          <div key={m.subject} className="flex items-center gap-3 px-4 py-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: m.color }}
            >
              {m.name.split(" ").map((w) => w[0]).join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-xs sm:text-sm ${m.unread ? "font-bold text-ink" : "font-medium text-[#454050]"}`}>
                {m.name}
              </p>
              <p className="truncate text-[11px] text-[#9a95a3] sm:text-xs">{m.subject}</p>
            </div>
            <span className="shrink-0 text-[10px] text-[#9a95a3]">{m.time}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#16111f] px-5 py-2.5 text-xs font-medium text-white shadow-xl">
      <ShieldCheck className="h-4 w-4 text-[#7ddcb2]" />
      Sent with quantum-safe encryption
    </div>
  </div>
);
