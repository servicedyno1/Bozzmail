import { BellOff, ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13"];
const events = [
  { day: 0, top: "18%", height: "20%", label: "Team sync", color: "#850122" },
  { day: 1, top: "42%", height: "16%", label: "Dentist", color: "#015f47" },
  { day: 2, top: "10%", height: "26%", label: "Offsite", color: "#1b1526" },
  { day: 3, top: "55%", height: "14%", label: "Call w/ source", color: "#850122" },
  { day: 4, top: "30%", height: "22%", label: "Deep work", color: "#015f47" },
];

export const CalendarMockup = () => (
  <div
    className="relative mx-auto w-full max-w-xl rounded-2xl border border-[#e6e4dc] bg-white shadow-[0_30px_60px_-20px_rgba(27,21,38,0.18)]"
    data-testid="calendar-mockup"
  >
    <div className="flex items-center justify-between border-b border-[#f0efe9] px-5 py-3.5">
      <p className="font-display text-sm font-bold text-ink">February 2026</p>
      <div className="flex items-center gap-2 text-[#6b6575]">
        <ChevronLeft className="h-4 w-4" />
        <span className="rounded-md bg-[#fdf0f2] px-2.5 py-1 text-[11px] font-bold text-[#850122]">Week</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
    <div className="grid grid-cols-5 border-b border-[#f0efe9]">
      {days.map((d) => (
        <div key={d} className="py-2.5 text-center text-[11px] font-medium text-[#6b6575]">
          {d}
        </div>
      ))}
    </div>
    <div className="relative grid h-64 grid-cols-5 sm:h-72">
      {[25, 50, 75].map((p) => (
        <div
          key={p}
          className="absolute inset-x-0 border-t border-dashed border-[#f0efe9]"
          style={{ top: `${p}%` }}
        />
      ))}
      {events.map((e) => (
        <div
          key={e.label}
          className="absolute mx-1 rounded-lg px-2 py-1.5 text-[10px] font-bold leading-tight text-white sm:text-[11px]"
          style={{
            left: `${e.day * 20}%`,
            width: "calc(20% - 8px)",
            top: e.top,
            height: e.height,
            backgroundColor: e.color,
          }}
        >
          {e.label}
        </div>
      ))}
    </div>
    <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#16111f] px-5 py-2.5 text-xs font-medium text-white shadow-xl">
      <BellOff className="h-4 w-4 text-[#7ddcb2]" />
      Private reminders — no Google Push
    </div>
  </div>
);
