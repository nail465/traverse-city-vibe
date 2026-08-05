"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface Pin {
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  href?: string;
  kind: "event" | "venue";
}

const MapImpl = dynamic(() => import("./venue-map-impl"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-white/40 text-sm">
      Loading map…
    </div>
  ),
});

export function VenueMap({ pins, center, zoom = 14 }: { pins: Pin[]; center: [number, number]; zoom?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full" />;
  return <MapImpl pins={pins} center={center} zoom={zoom} />;
}

export type { Pin };
