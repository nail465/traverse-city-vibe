import Link from "next/link";
import { Sparkles, Camera } from "lucide-react";

interface AiDisclaimerProps {
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function AiDisclaimer({
  text = "Photos on this page are AI-generated placeholders for demo purposes, not real event photography.",
  ctaLabel = "Send us your photos",
  ctaHref = "/submit-photos",
}: AiDisclaimerProps) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-4">
      <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-[rgb(168,85,247)]" />
        <span>{text}</span>
      </div>
      <Link
        href={ctaHref}
        className="sm:ml-auto flex items-center gap-1.5 shrink-0 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white hover:border-[rgb(60,180,255)]/60 hover:text-[rgb(60,180,255)] transition-colors"
      >
        <Camera className="h-3.5 w-3.5" /> {ctaLabel}
      </Link>
    </div>
  );
}
