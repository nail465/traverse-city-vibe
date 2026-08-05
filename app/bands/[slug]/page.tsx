import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mic2, MapPin, Instagram, Music2, Youtube, ExternalLink } from "lucide-react";
import { bands, venues, mapsUrl } from "@/lib/data";

export function generateStaticParams() {
  return bands.map((b) => ({ slug: b.slug }));
}

const socialIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("insta")) return Instagram;
  if (l.includes("spotify")) return Music2;
  if (l.includes("youtube")) return Youtube;
  return ExternalLink;
};

export default async function BandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const band = bands.find((b) => b.slug === slug);
  if (!band) notFound();

  const homeVenue = venues.find((v) => v.slug === band.homeVenueSlug);

  return (
    <main className="pt-28 pb-20 px-5 mx-auto max-w-5xl">
      <Link href="/#bands" className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Bands
      </Link>

      <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden mb-8">
        <Image src={band.image} alt={band.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs font-semibold text-[rgb(220,38,90)] uppercase tracking-wide">
          <Mic2 className="h-3 w-3" /> {band.genre}
        </span>
      </div>

      <h1 className="font-display font-800 text-4xl md:text-5xl text-white">{band.name}</h1>
      <p className="mt-2 flex items-center gap-2 text-white/60 text-sm">
        <MapPin className="h-4 w-4 text-[rgb(60,180,255)]" /> Based in {band.basedIn}
      </p>
      <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">{band.fullBio}</p>

      {band.youtubeId && (
        <div className="mt-8 aspect-video w-full rounded-2xl overflow-hidden glass">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${band.youtubeId}`}
            title={`${band.name} video`}
            allowFullScreen
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-700 text-white text-lg mb-3">Upcoming Shows</h3>
          <ul className="space-y-1 text-white/70 text-sm">
            {band.upcomingShows.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
          {homeVenue && (
            <a
              href={mapsUrl(homeVenue.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[rgb(60,180,255)] hover:underline"
            >
              <MapPin className="h-3.5 w-3.5" /> Get directions to {homeVenue.name}
            </a>
          )}
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-700 text-white text-lg mb-3">Follow</h3>
          <div className="flex flex-wrap gap-3">
            {band.socials.map((s) => {
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
        </div>
      </div>

      <div className="mt-8">
        <a
          href={`mailto:booking@traversecityvibe.com?subject=${encodeURIComponent(`Booking inquiry: ${band.name}`)}`}
          className="inline-flex rounded-full bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform"
        >
          Book This Band
        </a>
      </div>
    </main>
  );
}
