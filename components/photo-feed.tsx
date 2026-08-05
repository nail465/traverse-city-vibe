import Image from "next/image";
import { Instagram } from "lucide-react";
import { feedImages } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export function PhotoFeed() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SectionHeading
          eyebrow="#TraverseCityVibe"
          title="Live From The Scene"
          description="A snapshot feed styled after what's tagged around town right now."
          glow="blue"
        />
        <a
          href="#"
          className="mb-10 flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
        >
          <Instagram className="h-4 w-4" /> Follow along
        </a>
      </div>
      <AiDisclaimer
        text="This feed uses AI-generated sample images, not real Instagram posts. Got real shots from a night out in TC?"
        ctaLabel="Submit your photos"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {feedImages.map((src, i) => (
          <div
            key={i}
            className="group relative aspect-square rounded-xl overflow-hidden glass card-glow"
          >
            <Image
              src={src}
              alt="Traverse City vibe"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <Instagram className="h-4 w-4 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
