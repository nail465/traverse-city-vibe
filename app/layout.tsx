import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VibeGuideChat } from "@/components/vibe-guide-chat";

export const metadata: Metadata = {
  title: "Traverse City Vibe — Music, Events & Nightlife",
  description:
    "The live pulse of Traverse City's nightlife: local bands, events, bars, and venues in Northwest Michigan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#08080e]">
        <div className="noise-overlay" />
        <SiteHeader />
        {children}
        <SiteFooter />
        <VibeGuideChat />
      </body>
    </html>
  );
}
