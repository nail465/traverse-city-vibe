interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  glow?: "blue" | "purple" | "red";
}

export function SectionHeading({ eyebrow, title, description, glow = "purple" }: SectionHeadingProps) {
  const glowClass =
    glow === "blue" ? "text-glow-blue text-[rgb(60,180,255)]" :
    glow === "red" ? "text-glow-red text-[rgb(220,38,90)]" :
    "text-glow-purple text-[rgb(168,85,247)]";

  return (
    <div className="mb-10 max-w-2xl">
      <p className="font-mono-tight text-xs md:text-sm tracking-[0.3em] uppercase text-white/40 mb-2">
        {eyebrow}
      </p>
      <h2 className="font-display font-800 text-3xl md:text-5xl text-white">
        {title.split(" ").slice(0, -1).join(" ")}{" "}
        <span className={glowClass}>{title.split(" ").slice(-1)}</span>
      </h2>
      {description && <p className="mt-3 text-white/50 text-sm md:text-base">{description}</p>}
    </div>
  );
}
