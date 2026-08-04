import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader } from "./Features";
import { Smile, Frown, Zap, Coffee, Compass, Heart, CloudRain, Sparkles, Check } from "lucide-react";
import { useShelf } from "@/lib/shelf";

const moods = [
  { key: "happy", label: "Happy", icon: Smile, book: "The House in the Cerulean Sea" },
  { key: "sad", label: "Sad", icon: Frown, book: "A Little Life" },
  { key: "motivated", label: "Motivated", icon: Zap, book: "Atomic Habits" },
  { key: "relaxed", label: "Relaxed", icon: Coffee, book: "Before the Coffee Gets Cold" },
  { key: "curious", label: "Curious", icon: Compass, book: "Sapiens" },
  { key: "romantic", label: "Romantic", icon: Heart, book: "Beach Read" },
  { key: "stressed", label: "Stressed", icon: CloudRain, book: "Wintering" },
];

export function Mood() {
  const [active, setActive] = useState("curious");
  const pick = moods.find((m) => m.key === active)!;
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          tag="Mood recommendation"
          title={<>Tell it how you feel. Get the perfect next chapter.</>}
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {moods.map((m) => {
              const isActive = m.key === active;
              return (
                <button
                  key={m.key}
                  onClick={() => setActive(m.key)}
                  className={`group relative flex flex-col items-start gap-3 rounded-2xl p-5 text-left transition-all ${
                    isActive
                      ? "glass-strong glow-ring"
                      : "glass hover:-translate-y-0.5 hover:bg-white/[0.08]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow"
                        : "glass"
                    }`}
                  >
                    <m.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-brand-3"}`} />
                  </div>
                  <div className="text-sm font-medium">{m.label}</div>
                </button>
              );
            })}
          </div>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              AI recommends for "{pick.label}"
            </div>
            <div className="mt-6 flex items-start gap-5">
              <div className="h-40 w-28 shrink-0 rounded-lg bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow" />
              <div>
                <div className="font-display text-2xl font-semibold text-gradient">
                  {pick.book}
                </div>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  A perfectly-tuned pick based on your mood, reading DNA, and the
                  sentiment fingerprint of your last 20 books.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["97% match", "Uplifting", "260 pages", "4.6★"].map((t) => (
                    <span key={t} className="glass rounded-full px-3 py-1 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-4 py-2 text-sm font-medium text-white shadow-glow">
                  <Sparkles className="h-3.5 w-3.5" />
                  Add to shelf
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
