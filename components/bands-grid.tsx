import Link from "next/link";
import Image from "next/image";
import { Music, Plus, MapPin } from "lucide-react";
import { bands } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export function BandsGrid() {
  return (
    <section id="bands" className="mx-auto max-w-7xl px-5 py-16 scroll-mt-24">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <SectionHeading
          eyebrow="The Sound"
          title="Local Bands"
          description="The artists powering Traverse City's live music scene."
          glow="purple"
        />
        <Link
          href="/bands/submit"
          className="mb-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-[rgb(220,38,90)] to-[rgb(168,85,247)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(220,38,90,0.4)] hover:scale-105 transition-transform"
        >
          <Plus className="h-4 w-4" /> Add Your Band
        </Link>
      </div>
      <AiDisclaimer
        text="These bands and photos are AI-generated demo content, not real local acts (yet). Are you in a TC band?"
        ctaLabel="Add your real band"
        ctaHref="/bands/submit"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bands.map((b) => (
          <Link
            key={b.slug}
            href={`/bands/${b.slug}`}
            className="group relative rounded-2xl overflow-hidden glass card-glow"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={b.image}
                alt={b.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-3 py-1 text-[11px] font-semibold text-[rgb(220,38,90)] uppercase tracking-wide">
                <Music className="h-3 w-3" /> {b.genre}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-700 text-lg text-white group-hover:text-glow-purple group-hover:text-[rgb(168,85,247)] transition-colors">
                {b.name}
              </h3>
              <p className="text-sm text-white/50 mt-1 line-clamp-2">{b.bio}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/40 mt-3">
                <MapPin className="h-3.5 w-3.5" /> {b.basedIn}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
