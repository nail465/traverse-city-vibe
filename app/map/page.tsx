"use client";

import { useMemo, useState } from "react";
import { events, venues } from "@/lib/data";
import { VenueMap, type Pin } from "@/components/venue-map";

type Filter = "all" | "live-music" | "food" | "late-night";

export default function MapPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const pins: Pin[] = useMemo(() => {
    const eventPins: Pin[] = events
      .filter((e) => {
        if (filter === "all") return true;
        if (filter === "live-music") return e.tag === "Live Music" || e.tag === "Festival";
        if (filter === "late-night") return e.tag === "Late-Night";
        if (filter === "food") return e.tag === "Food";
        return true;
      })
      .map((e) => ({
        lat: e.lat,
        lng: e.lng,
        title: e.name,
        subtitle: `${e.venue} — ${e.time}`,
        href: `/events/${e.slug}`,
        kind: "event" as const,
      }));

    const venuePins: Pin[] =
      filter === "all" || filter === "food"
        ? venues.map((v) => ({
            lat: v.lat,
            lng: v.lng,
            title: v.name,
            subtitle: v.type,
            href: `/venues/${v.slug}`,
            kind: "venue" as const,
          }))
        : [];

    return [...eventPins, ...venuePins];
  }, [filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "live-music", label: "Live Music" },
    { key: "food", label: "Food" },
    { key: "late-night", label: "Late-Night" },
  ];

  return (
    <main className="pt-28 pb-20 px-5 mx-auto max-w-6xl">
      <h1 className="font-display font-800 text-4xl md:text-5xl text-white mb-2">
        Interactive <span className="text-[rgb(168,85,247)]">Map</span>
      </h1>
      <p className="text-white/50 mb-6">Pins for tonight's events, bars, and venues around Traverse City.</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              filter === f.key
                ? "bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] text-white border-transparent"
                : "border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="h-[560px] rounded-3xl overflow-hidden glass">
        <VenueMap center={[44.7631, -85.6206]} zoom={13} pins={pins} />
      </div>
    </main>
  );
}
