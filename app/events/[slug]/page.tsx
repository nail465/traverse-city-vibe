import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { events } from "@/lib/data";
import { AddToCalendar } from "@/components/add-to-calendar";
import { VenueMap } from "@/components/venue-map";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <main className="pt-28 pb-20 px-5 mx-auto max-w-5xl">
      <Link href="/#events" className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>

      <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden mb-8">
        <Image src={event.image} alt={event.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs font-semibold text-[rgb(60,180,255)] uppercase tracking-wide">
          {event.tag}
        </span>
      </div>

      <h1 className="font-display font-800 text-4xl md:text-5xl text-white">{event.name}</h1>
      <p className="mt-2 text-white/60 flex items-center gap-2">
        <MapPin className="h-4 w-4" /> {event.venue}
      </p>

      <div className="flex flex-wrap items-center gap-6 mt-6 text-white/70 text-sm">
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[rgb(60,180,255)]" />
          {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[rgb(60,180,255)]" /> {event.time}
        </span>
      </div>

      <p className="mt-6 text-white/70 leading-relaxed max-w-2xl">{event.description}</p>

      <div className="mt-8 glass rounded-2xl p-6">
        <h3 className="font-display font-700 text-white text-lg mb-3">Lineup</h3>
        <ul className="space-y-1 text-white/70 text-sm">
          {event.lineup.map((l) => (
            <li key={l}>• {l}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <AddToCalendar event={event} />
      </div>

      <div className="mt-10">
        <h3 className="font-display font-700 text-white text-lg mb-3">Location</h3>
        <div className="h-80 rounded-2xl overflow-hidden glass">
          <VenueMap
            center={[event.lat, event.lng]}
            pins={[{ lat: event.lat, lng: event.lng, title: event.venue, subtitle: event.name, kind: "event" }]}
          />
        </div>
      </div>
    </main>
  );
}
