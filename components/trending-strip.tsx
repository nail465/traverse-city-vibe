import { Flame, TrendingUp } from "lucide-react";
import { events, venues } from "@/lib/data";

export function TrendingStrip() {
  const hot = events.slice(0, 4);
  const popularVenue = venues[5];

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex items-center gap-3 md:w-64 shrink-0">
          <Flame className="h-6 w-6 text-[rgb(220,38,90)]" />
          <div>
            <h3 className="font-display font-700 text-white text-lg leading-tight">
              Tonight's Hot Spots
            </h3>
            <p className="text-xs text-white/50">Updated live</p>
          </div>
        </div>
        <div className="flex-1 flex flex-wrap gap-3">
          {hot.map((e) => (
            <span
              key={e.slug}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 font-medium"
            >
              {e.venue} <span className="text-white/40">·</span> {e.time}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 md:w-64 shrink-0 md:justify-end">
          <TrendingUp className="h-4 w-4 text-[rgb(60,180,255)]" />
          <span className="text-xs text-white/60">
            Most popular this week: <span className="text-white font-semibold">{popularVenue.name}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
