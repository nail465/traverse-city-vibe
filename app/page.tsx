import { Hero } from "@/components/hero";
import { TrendingStrip } from "@/components/trending-strip";
import { EventsGrid } from "@/components/events-grid";
import { BandsGrid } from "@/components/bands-grid";
import { VenuesGrid } from "@/components/venues-grid";
import { PhotoFeed } from "@/components/photo-feed";

export default function HomePage() {
  return (
    <main className="pt-0">
      <Hero />
      <TrendingStrip />
      <EventsGrid />
      <BandsGrid />
      <VenuesGrid />
      <PhotoFeed />
    </main>
  );
}
