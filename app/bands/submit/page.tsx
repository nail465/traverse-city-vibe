"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, Upload, ShieldCheck } from "lucide-react";

interface ProfilePreview {
  headline: string;
  tagline: string;
  bio: string;
}

export default function SubmitBandPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<ProfilePreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    bandName: "",
    genre: "",
    bio: "",
    contact: "",
    instagram: "",
    spotify: "",
  });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setError("Please confirm you own the rights to your photo/media and agree to let us use it before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submit-band", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed");
      setPreview(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong submitting your band. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-20 px-5 mx-auto max-w-3xl">
      <Link href="/#bands" className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Bands
      </Link>

      <h1 className="font-display font-800 text-4xl md:text-5xl text-white mb-2">
        Add Your <span className="text-[rgb(220,38,90)]">Band</span>
      </h1>
      <p className="text-white/50 mb-8">
        Join the Traverse City Vibe lineup. We'll auto-generate a profile preview from your submission.
      </p>

      {preview ? (
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-4 text-[rgb(60,180,255)]">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Submitted for review!</span>
          </div>
          <h3 className="font-display font-700 text-2xl text-white">{preview.headline}</h3>
          <p className="text-white/60 mt-2 italic">{preview.tagline}</p>
          <p className="text-white/70 mt-4 leading-relaxed">{preview.bio}</p>
          <p className="text-xs text-white/40 mt-6">
            This is an auto-generated preview. Our team will review your submission before your profile goes live.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Band Name *</label>
            <input
              required
              value={form.bandName}
              onChange={update("bandName")}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="The Neon Pines"
            />
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Genre *</label>
            <input
              required
              value={form.genre}
              onChange={update("genre")}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="Indie Rock, Acoustic, Funk..."
            />
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Short Bio</label>
            <textarea
              value={form.bio}
              onChange={update("bio")}
              rows={3}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="Tell us about your sound..."
            />
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Band Photo</label>
            <div className="rounded-xl border border-dashed border-white/15 px-4 py-8 flex flex-col items-center gap-2 text-white/40 text-sm">
              <Upload className="h-5 w-5" />
              Drag & drop or click to upload (coming soon)
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/70 block mb-1.5">Instagram</label>
              <input
                value={form.instagram}
                onChange={update("instagram")}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
                placeholder="@yourband"
              />
            </div>
            <div>
              <label className="text-sm text-white/70 block mb-1.5">Spotify</label>
              <input
                value={form.spotify}
                onChange={update("spotify")}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
                placeholder="Link to your Spotify"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Contact Email *</label>
            <input
              required
              type="email"
              value={form.contact}
              onChange={update("contact")}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="you@band.com"
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-[rgb(168,85,247)]"
              />
              <span className="text-xs sm:text-sm text-white/70 leading-relaxed">
                <ShieldCheck className="inline h-3.5 w-3.5 mb-0.5 mr-1 text-[rgb(60,180,255)]" />
                I confirm I own or have permission to use this band's photo and media, and I grant
                Traverse City Vibe a non-exclusive license to publish and display it on the website
                and associated social media. I can request removal at any time. *
              </span>
            </label>
          </div>

          {error && <p className="text-sm text-[rgb(220,38,90)]">{error}</p>}

          <button
            type="submit"
            disabled={loading || !consent}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Submitting..." : "Submit Your Band"}
          </button>
        </form>
      )}
    </main>
  );
}
