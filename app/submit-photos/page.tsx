"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, Upload, Sparkles, ShieldCheck } from "lucide-react";

export default function SubmitPhotosPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", eventOrVenue: "", message: "" });
  const [consent, setConsent] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setError("Please confirm you own these photos and agree to let us use them before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submit-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong submitting your photos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-20 px-5 mx-auto max-w-3xl">
      <Link href="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back Home
      </Link>

      <h1 className="font-display font-800 text-4xl md:text-5xl text-white mb-2">
        Share Your <span className="text-[rgb(168,85,247)]">Photos</span>
      </h1>
      <div className="flex items-start gap-2 text-white/50 text-sm mb-8 max-w-xl">
        <Sparkles className="h-4 w-4 mt-0.5 shrink-0 text-[rgb(168,85,247)]" />
        <p>
          Right now, the event, band, and venue photos across this site are AI-generated placeholders
          used for demo purposes. If you were at a show, a bar night, or a festival in Traverse City,
          send us your real photos — we'll feature the best ones and swap out the placeholders.
        </p>
      </div>

      {done ? (
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-3 text-[rgb(60,180,255)]">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Thanks for sending those in!</span>
          </div>
          <p className="text-white/70 text-sm">
            Our team will review your photos and reach out if we'd like to feature them on the site.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Your Name *</label>
            <input
              required
              value={form.name}
              onChange={update("name")}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={update("email")}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Event or Venue</label>
            <input
              value={form.eventOrVenue}
              onChange={update("eventOrVenue")}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="e.g. Live Band Night @ The Little Fleet"
            />
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Photos</label>
            <div className="rounded-xl border border-dashed border-white/15 px-4 py-8 flex flex-col items-center gap-2 text-white/40 text-sm">
              <Upload className="h-5 w-5" />
              Drag & drop or click to upload (coming soon)
            </div>
          </div>
          <div>
            <label className="text-sm text-white/70 block mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={update("message")}
              rows={3}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white outline-none focus:border-[rgb(60,180,255)]/60"
              placeholder="Anything we should know?"
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
                I confirm these photos are my own, I have the right to share them, and I grant
                Traverse City Vibe a non-exclusive license to publish and display them on the
                website and associated social media. I understand I'll be credited when possible
                and can request removal at any time. *
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
            {loading ? "Sending..." : "Send Your Photos"}
          </button>
        </form>
      )}
    </main>
  );
}
