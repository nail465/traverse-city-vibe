import Link from "next/link";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { venues, mapsUrl } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export function VenuesGrid() {
  return (
    <section id="venues" className="mx-auto max-w-7xl px-5 py-16 scroll-mt-24">
      <SectionHeading
        eyebrow="Where To Go"
        title="Local Venues"
        description="Bars, breweries, and stages that make up the Traverse City scene."
        glow="red"
      />
      <AiDisclaimer
        text="Venue photos shown here are AI-generated placeholders, not real photography from these locations."
        ctaLabel="Send us your venue photos"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((v) => (
          <div key={v.slug} className="group relative rounded-2xl overflow-hidden glass card-glow">
            <Link href={`/venues/${v.slug}`} className="block">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-black/60 border border-white/10 px-3 py-1 text-[11px] font-semibold text-[rgb(60,180,255)] uppercase tracking-wide">
                  {v.type}
                </span>
              </div>
              <div className="p-5 pb-3">
                <h3 className="font-display font-700 text-lg text-white group-hover:text-glow-purple group-hover:text-[rgb(168,85,247)] transition-colors">
                  {v.name}
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-white/50 mt-1">
                  <MapPin className="h-3.5 w-3.5" /> {v.address}
                </p>
              </div>
            </Link>
            <div className="px-5 pb-5 flex items-center gap-3">
              <a
                href={mapsUrl(v.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[rgb(60,180,255)] hover:underline"
              >
                <Navigation className="h-3.5 w-3.5" /> Directions
              </a>
              <span className="text-white/20">•</span>
              <a
                href={v.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white hover:underline"
              >
                Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
