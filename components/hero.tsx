"use client";

import { ChevronDown } from "lucide-react";
import { heroVideoUrl } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideoUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#08080e]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.25),transparent_60%)]" />

      <div className="relative z-10 text-center px-5">
        <p className="font-mono-tight text-sm md:text-base text-[rgb(60,180,255)] tracking-[0.3em] uppercase mb-4">
          Northern Michigan Nightlife
        </p>
        <h1 className="font-display font-800 text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95]">
          TRAVERSE CITY
          <br />
          <span className="text-glow-purple text-[rgb(168,85,247)]">VIBE</span>
        </h1>
        <p className="mt-6 text-white/70 text-base md:text-lg tracking-wide font-medium">
          Music &nbsp;•&nbsp; Events &nbsp;•&nbsp; Nightlife &nbsp;•&nbsp; Local Scene
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#events"
            className="rounded-full bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-transform"
          >
            See What's On Tonight
          </a>
          <a
            href="/map"
            className="rounded-full glass px-7 py-3 text-sm font-semibold text-white hover:border-[rgb(60,180,255)]/60 transition-colors"
          >
            Open the Map
          </a>
        </div>
      </div>

      <div className="absolute bottom-24 left-0 right-0 overflow-hidden border-y border-white/10 glass py-2">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8 text-sm text-white/70 font-medium">
              <span className="text-[rgb(220,38,90)]">● HAPPENING TONIGHT</span>
              Live Band Night @ The Little Fleet — 8PM
              <span className="text-white/30">/</span>
              Acoustic Sessions @ 7 Monks Taproom — 7PM
              <span className="text-white/30">/</span>
              Rooftop DJ Night @ Low Bar — 10PM
              <span className="text-white/30">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float-slow">
        <ChevronDown className="h-6 w-6 text-white/50" />
      </div>
    </section>
  );
}
