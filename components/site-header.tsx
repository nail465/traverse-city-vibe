"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#events", label: "Events" },
  { href: "/#bands", label: "Bands" },
  { href: "/#venues", label: "Venues" },
  { href: "/map", label: "Map" },
  { href: "/bands/submit", label: "Add Your Band" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(220,38,90)] shadow-[0_0_12px_rgba(220,38,90,0.9)] animate-pulse" />
          <span className="font-display font-800 text-lg md:text-xl tracking-tight text-white">
            TRAVERSE CITY <span className="text-glow-purple text-[rgb(168,85,247)]">VIBE</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <Link
            href="/map"
            className="flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm font-semibold text-white hover:border-[rgb(168,85,247)]/60 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-[rgb(60,180,255)]" />
            Tonight
          </Link>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass mt-3 mx-5 rounded-2xl p-5 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
