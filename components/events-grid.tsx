import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { events } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export function EventsGrid() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-16 scroll-mt-24">
      <SectionHeading
        eyebrow="Coming Up"
        title="Coming Events"
        description="Live music, festivals, and late nights across Traverse City — updated all summer long."
        glow="blue"
      />
      <AiDisclaimer
        text="Event photos shown here are AI-generated placeholders, not real photography from these venues."
        ctaLabel="Send us your event photos"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <Link
            key={e.slug}
            href={`/events/${e.slug}`}
            className="group relative rounded-2xl overflow-hidden glass card-glow"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={e.image}
                alt={e.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-black/60 border border-white/10 px-3 py-1 text-[11px] font-semibold text-[rgb(60,180,255)] uppercase tracking-wide">
                {e.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-700 text-lg text-white group-hover:text-glow-purple group-hover:text-[rgb(168,85,247)] transition-colors">
                {e.name}
              </h3>
              <p className="text-sm text-white/50 mt-1">{e.venue}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {e.time}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
