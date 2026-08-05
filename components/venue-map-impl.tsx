"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Pin } from "./venue-map";

const eventIcon = new L.DivIcon({
  html: `<div style="width:16px;height:16px;border-radius:50%;background:radial-gradient(circle,#dc264a,#a855f7);box-shadow:0 0 12px 3px rgba(220,38,90,0.8);border:2px solid white;"></div>`,
  className: "",
  iconSize: [16, 16],
});

const venueIcon = new L.DivIcon({
  html: `<div style="width:16px;height:16px;border-radius:50%;background:radial-gradient(circle,#3cb4ff,#a855f7);box-shadow:0 0 12px 3px rgba(60,180,255,0.8);border:2px solid white;"></div>`,
  className: "",
  iconSize: [16, 16],
});

export default function VenueMapImpl({
  pins,
  center,
  zoom,
}: {
  pins: Pin[];
  center: [number, number];
  zoom: number;
}) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {pins.map((p, i) => (
        <Marker key={i} position={[p.lat, p.lng]} icon={p.kind === "event" ? eventIcon : venueIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{p.title}</p>
              {p.subtitle && <p className="text-xs opacity-70">{p.subtitle}</p>}
              {p.href && (
                <a href={p.href} className="text-xs underline text-[#3cb4ff]">
                  View details
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
