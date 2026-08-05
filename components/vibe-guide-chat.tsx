"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Zap } from "lucide-react";
import { events, venues, bands } from "@/lib/data";

interface Msg {
  role: "bot" | "user";
  text: string;
}

function answer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("tonight") || q.includes("today")) {
    const list = events.slice(0, 3).map((e) => `• ${e.name} @ ${e.venue} — ${e.time}`).join("\n");
    return `Here's what's happening tonight:\n${list}`;
  }
  if (q.includes("weekend") || q.includes("live music") || q.includes("show")) {
    const list = events.map((e) => `• ${e.name} @ ${e.venue} (${new Date(e.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })})`).join("\n");
    return `Best live music coming up:\n${list}`;
  }
  if (q.includes("bar") || q.includes("open now") || q.includes("drink") || q.includes("cocktail")) {
    const list = venues.filter((v) => v.type === "Bar").map((v) => `• ${v.name} — ${v.address}`).join("\n");
    return `Top bars around town:\n${list}`;
  }
  if (q.includes("brewery") || q.includes("beer") || q.includes("cider")) {
    const list = venues.filter((v) => v.type === "Brewery" || v.name.includes("Cider")).map((v) => `• ${v.name}`).join("\n");
    return `For beer & cider, try:\n${list}`;
  }
  if (q.includes("band") || q.includes("artist")) {
    const list = bands.slice(0, 4).map((b) => `• ${b.name} (${b.genre})`).join("\n");
    return `Some local bands worth checking out:\n${list}`;
  }
  if (q.includes("venue") || q.includes("place")) {
    const list = venues.slice(0, 4).map((v) => `• ${v.name} — ${v.type}`).join("\n");
    return `Popular venues right now:\n${list}`;
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return "Hey! I'm the Vibe Guide 🎸 Ask me what's happening tonight, the best live music this weekend, or the top bars open now.";
  }
  return "I've got you — try asking \"what's happening tonight?\", \"best live music this weekend?\", or \"top bars open now?\"";
}

export function VibeGuideChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hey, I'm the Vibe Guide 🎸 Ask me what's happening tonight in Traverse City." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    const botMsg: Msg = { role: "bot", text: answer(input) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[320px] sm:w-[380px] h-[440px] glass rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-[rgba(60,180,255,0.15)] to-[rgba(168,85,247,0.15)]">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[rgb(60,180,255)]" />
              <span className="font-display font-700 text-sm text-white">Vibe Guide</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm whitespace-pre-line rounded-xl px-3 py-2 max-w-[85%] ${
                  m.role === "bot"
                    ? "bg-white/8 text-white/85"
                    : "bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] text-white ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="What's happening tonight?"
              className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[rgb(60,180,255)]/60"
            />
            <button
              onClick={send}
              className="rounded-full bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] p-2.5 text-white"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-gradient-to-r from-[rgb(60,180,255)] to-[rgb(168,85,247)] p-4 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-transform"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
