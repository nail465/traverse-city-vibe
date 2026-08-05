import Link from "next/link";
import { Instagram, Music, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#05050a] px-5 py-14 mt-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-800 text-xl text-white">
            TRAVERSE CITY <span className="text-[rgb(168,85,247)]">VIBE</span>
          </span>
          <p className="mt-3 text-sm text-white/50 max-w-xs">
            The live pulse of Northwest Michigan's music, food & nightlife scene.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="glass rounded-full p-2.5 hover:border-[rgb(60,180,255)]/60">
              <Instagram className="h-4 w-4 text-white/80" />
            </a>
            <a href="#" className="glass rounded-full p-2.5 hover:border-[rgb(60,180,255)]/60">
              <Music className="h-4 w-4 text-white/80" />
            </a>
            <a href="/map" className="glass rounded-full p-2.5 hover:border-[rgb(60,180,255)]/60">
              <MapPin className="h-4 w-4 text-white/80" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/#events" className="hover:text-white">Events</Link></li>
            <li><Link href="/#bands" className="hover:text-white">Local Bands</Link></li>
            <li><Link href="/#venues" className="hover:text-white">Venues</Link></li>
            <li><Link href="/map" className="hover:text-white">Interactive Map</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/bands/submit" className="hover:text-white">Add Your Band</Link></li>
            <li><a href="#" className="hover:text-white">Advertise a Venue</a></li>
            <li><a href="#" className="hover:text-white">Submit an Event</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Northwest Michigan</h4>
          <p className="text-sm text-white/50">
            Traverse City, MI — recognized as one of America's top small food & drink destinations.
          </p>
        </div>
      </div>
      <p className="mx-auto max-w-7xl text-xs text-white/30 mt-10 pt-6 border-t border-white/5">
        © 2026 Traverse City Vibe. Sample content for demo purposes.
      </p>
    </footer>
  );
}
