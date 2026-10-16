import { Inbox, Send, FileText, Trash2, Archive, Folder, Lock, RefreshCw, Search, Users, Mail, Calendar, Bell } from "lucide-react";

const mails = [
  { name: "Alice", subject: "Invitation: Kick-off", time: "yesterday", tag: null },
  { name: "Alice", subject: "Oakhill invoice", time: "yesterday", tag: { label: "To Do", cls: "bg-nota text-white" } },
  { name: "Marc", subject: "Publisher conference 2026", time: "yesterday", tag: null },
  { name: "Jane", subject: "Meeting notes", time: "yesterday", tag: { label: "Family", cls: "bg-candy text-tutao" } },
  { name: "Alice", subject: "Financial report Q2", time: "Mon", tag: { label: "Work", cls: "bg-sonne text-dunkel" } },
  { name: "Bozzmail Team", subject: "Discover the power of your secure inbox", time: "Mon", tag: null },
];

const folders = [
  { icon: Inbox, label: "Inbox", active: true },
  { icon: FileText, label: "Drafts" },
  { icon: Send, label: "Sent" },
  { icon: Trash2, label: "Trash" },
  { icon: Archive, label: "Archive" },
  { icon: Folder, label: "Private" },
  { icon: Folder, label: "Subscriptions" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const events = [
  { day: 0, top: 12, h: 18, label: "Team sync", cls: "bg-nota" },
  { day: 1, top: 40, h: 14, label: "Dentist", cls: "bg-tutao" },
  { day: 2, top: 8, h: 26, label: "Offsite", cls: "bg-dunkel" },
  { day: 3, top: 52, h: 16, label: "Call", cls: "bg-nota" },
  { day: 4, top: 28, h: 22, label: "Deep work", cls: "bg-tutao" },
  { day: 5, top: 60, h: 14, label: "Hike", cls: "bg-green-nota" },
];

const Row = ({ m }) => (
  <div className="flex items-start justify-between gap-2 border-b border-peach px-3 py-2">
    <div className="min-w-0">
      <p className="truncate text-[11px] font-bold text-dunkel">{m.name}</p>
      <p className="truncate text-[10px] text-dunkel/70">{m.subject}</p>
    </div>
    <div className="flex shrink-0 flex-col items-end gap-1">
      {m.tag ? <span className={`rounded-sm px-1 text-[8px] font-bold ${m.tag.cls}`}>{m.tag.label}</span> : null}
      <span className="text-[9px] text-dunkel/50">{m.time}</span>
    </div>
  </div>
);

const Desktop = ({ kind }) => (
  <div className="absolute left-0 top-6 w-[78%] overflow-hidden rounded-xl border border-dark-peach/60 bg-white shadow-tuta-strong" data-testid={`${kind}-desktop-mockup`}>
    <div className="flex items-center gap-2 border-b border-peach px-3 py-2 text-[10px] text-dunkel/60">
      <span className="h-2 w-2 rounded-full bg-nota" />
      <span className="h-2 w-2 rounded-full bg-sonne" />
      <span className="h-2 w-2 rounded-full bg-green-nota" />
      <span className="ml-3 flex flex-1 items-center gap-1 rounded bg-peach px-2 py-1">
        <Search className="h-3 w-3" /> Search
      </span>
    </div>
    <div className="grid h-[320px] grid-cols-1 sm:grid-cols-[96px_1fr]">
      <aside className="hidden border-r border-peach p-2 sm:block">
        {folders.map((f) => (
          <div key={f.label} className={`mb-0.5 flex items-center gap-1.5 rounded px-1.5 py-1 text-[10px] font-semibold ${f.active ? "bg-nota text-white" : "text-dunkel/70"}`}>
            <f.icon className="h-3 w-3 shrink-0" />
            {f.label}
          </div>
        ))}
      </aside>
      {kind === "mail" ? (
        <div>{mails.map((m, i) => <Row key={i} m={m} />)}</div>
      ) : (
        <div className="relative p-2">
          <div className="mb-1 grid grid-cols-7 text-center text-[9px] font-semibold text-dunkel/60">
            {days.map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="relative h-[270px] rounded border border-peach">
            {[25, 50, 75].map((p) => <span key={p} className="absolute inset-x-0 border-t border-dashed border-peach" style={{ top: `${p}%` }} />)}
            {events.map((e) => (
              <span key={e.label} className={`absolute rounded px-1 text-[8px] font-bold text-white ${e.cls}`} style={{ left: `calc(${e.day * 14.28}% + 2px)`, width: "calc(14.28% - 4px)", top: `${e.top}%`, height: `${e.h}%` }}>
                {e.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const Phone = ({ kind }) => (
  <div className="absolute bottom-0 right-0 w-[38%] max-w-[190px] overflow-hidden rounded-[22px] border-[6px] border-dunkel bg-white shadow-tuta-strong" data-testid={`${kind}-phone-mockup`}>
    <div className="flex items-center justify-between px-3 pt-2 text-[9px] font-semibold text-dunkel">
      <span>13:36</span>
      <span className="h-2 w-5 rounded-sm bg-dunkel/80" />
    </div>
    <div className="flex items-center justify-between px-3 py-2">
      <p className="text-[11px] font-bold text-dunkel">{kind === "mail" ? "Inbox" : "July 2026"}</p>
      <Lock className="h-3 w-3 text-nota" />
    </div>
    <div className="h-[230px] overflow-hidden">
      {kind === "mail" ? mails.slice(0, 5).map((m, i) => <Row key={i} m={m} />) : (
        <div className="grid grid-cols-7 gap-px px-2 text-center text-[8px] text-dunkel/70">
          {Array.from({ length: 35 }, (_, i) => (
            <span key={i} className={`aspect-square rounded-full leading-[18px] ${i === 16 ? "bg-nota font-bold text-white" : [3, 9, 22, 27].includes(i) ? "bg-candy" : ""}`}>{(i % 31) + 1}</span>
          ))}
        </div>
      )}
    </div>
    <div className="flex justify-around border-t border-peach py-1.5 text-dunkel/60">
      <Mail className={`h-3.5 w-3.5 ${kind === "mail" ? "text-nota" : ""}`} />
      <Search className="h-3.5 w-3.5" />
      <Users className="h-3.5 w-3.5" />
      <Calendar className={`h-3.5 w-3.5 ${kind === "calendar" ? "text-nota" : ""}`} />
    </div>
  </div>
);

export const DeviceMockups = ({ kind = "mail" }) => (
  <div className="relative mx-auto aspect-[520/470] w-full max-w-[520px]" data-testid={`${kind}-mockups`}>
    <Desktop kind={kind} />
    <Phone kind={kind} />
    <div className="absolute left-[14%] top-[44%] z-10 w-[62%] rounded-lg border border-peach bg-white px-4 py-3 text-center text-dunkel shadow-tuta-strong" data-testid={`${kind}-floating-card`}>
      {kind === "mail" ? <RefreshCw className="mx-auto mb-1 h-5 w-5 text-nota" /> : <Bell className="mx-auto mb-1 h-5 w-5 text-nota" />}
      <p className="text-sm font-semibold leading-snug md:text-base">
        {kind === "mail" ? <>Your message is sent<br />with quantum-safe encryption</> : <>Private reminders<br />without Google Push</>}
      </p>
    </div>
    <span className="absolute bottom-[12%] right-[30%] z-10 flex h-14 w-14 items-center justify-center rounded-full bg-fighter text-white shadow-tuta">
      <Lock className="h-6 w-6" />
    </span>
  </div>
);
