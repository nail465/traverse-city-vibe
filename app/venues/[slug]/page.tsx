import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Instagram, ExternalLink, Navigation } from "lucide-react";
import { venues, events, mapsUrl } from "@/lib/data";
import { VenueMap } from "@/components/venue-map";

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

const socialIcon = (label: string) => (label.toLowerCase().includes("insta") ? Instagram : ExternalLink);

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = venues.find((v) => v.slug === slug);
  if (!venue) notFound();

  const linkedEvents = events.filter((e) => e.venueSlug === venue.slug);

  return (
    <main className="pt-28 pb-20 px-5 mx-auto max-w-5xl">
      <Link href="/#venues" className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Venues
      </Link>

      <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden mb-8">
        <Image src={venue.image} alt={venue.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs font-semibold text-[rgb(60,180,255)] uppercase tracking-wide">
          {venue.type}
        </span>
      </div>

      <h1 className="font-display font-800 text-4xl md:text-5xl text-white">{venue.name}</h1>
      <a
        href={mapsUrl(venue.address)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-2 text-white/60 hover:text-[rgb(60,180,255)] transition-colors text-sm"
      >
        <MapPin className="h-4 w-4" /> {venue.address}
        <Navigation className="h-3.5 w-3.5" />
      </a>
      <p className="mt-6 text-white/70 leading-relaxed max-w-2xl">{venue.description}</p>

      {linkedEvents.length > 0 && (
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="font-display font-700 text-white text-lg mb-3">Upcoming Events Here</h3>
          <ul className="space-y-2 text-sm">
            {linkedEvents.map((e) => (
              <li key={e.slug}>
                <Link href={`/events/${e.slug}`} className="text-white/70 hover:text-white">
                  • {e.name} — {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} @ {e.time}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={venue.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] px-4 py-2 text-sm font-semibold text-white hover:scale-105 transition-transform"
        >
          <ExternalLink className="h-4 w-4" /> Visit Website
        </a>
        <a
          href={mapsUrl(venue.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-[rgb(60,180,255)]/60 transition-colors"
        >
          <Navigation className="h-4 w-4" /> Get Directions
        </a>
        {venue.socials.map((s) => {
          const Icon = socialIcon(s.label);
          return (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-[rgb(60,180,255)]/60 transition-colors"
            >
              <Icon className="h-4 w-4" /> {s.label}
            </a>
          );
        })}
      </div>

      <div className="mt-10">
        <h3 className="font-display font-700 text-white text-lg mb-3">Location</h3>
        <div className="h-80 rounded-2xl overflow-hidden glass">
          <VenueMap
            center={[venue.lat, venue.lng]}
            pins={[{ lat: venue.lat, lng: venue.lng, title: venue.name, subtitle: venue.address, kind: "venue" }]}
          />
        </div>
      </div>
    </main>
  );
}
