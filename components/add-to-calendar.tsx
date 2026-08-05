"use client";

import { CalendarPlus } from "lucide-react";
import type { EventItem } from "@/lib/data";

export function AddToCalendar({ event }: { event: EventItem }) {
  const handleClick = () => {
    const start = new Date(`${event.date}T00:00:00`);
    const [time, meridian] = event.time.split(" ");
    let [hh, mm] = time.split(":").map(Number);
    if (meridian === "PM" && hh !== 12) hh += 12;
    start.setHours(hh, mm || 0);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${event.name} @ ${event.venue}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `DESCRIPTION:${event.description.replace(/\n/g, " ")}`,
      `LOCATION:${event.venue}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform"
    >
      <CalendarPlus className="h-4 w-4" /> Add to Calendar
    </button>
  );
}
