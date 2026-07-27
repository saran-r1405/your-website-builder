import { SectionHeader } from "./Features";
import { User, BookOpen, Tags, Star, MessageSquare, Cpu, Filter, Users, Sparkles, Layers, Wand2 } from "lucide-react";
import brainImg from "@/assets/ai-brain.jpg";

const steps = [
  { icon: User, label: "User" },
  { icon: BookOpen, label: "Reading History" },
  { icon: Tags, label: "Favorite Genres" },
  { icon: Star, label: "Ratings" },
  { icon: MessageSquare, label: "Book Reviews" },
  { icon: Cpu, label: "AI Processing" },
  { icon: Filter, label: "Content Filtering" },
  { icon: Users, label: "Collaborative Filtering" },
  { icon: Sparkles, label: "NLP Semantic Search" },
  { icon: Layers, label: "Hybrid Engine" },
  { icon: Wand2, label: "Personalized Books" },
];

export function Engine() {
  return (
    <section id="engine" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          tag="How the AI works"
          title={<>A pipeline that thinks like a reader.</>}
          subtitle="Signals flow through content-based filtering, collaborative filtering, and semantic embeddings — merged in a hybrid engine tuned to you."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* pipeline */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-brand/60 to-transparent" />
            <ul className="space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="group relative flex items-center gap-4">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl glass-strong transition-all group-hover:glow-ring">
                    <s.icon className="h-5 w-5 text-brand-3" />
                    <span className="absolute inset-0 rounded-xl bg-brand/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="flex-1 rounded-xl glass px-4 py-3 text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">step {i + 1}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* brain visual */}
          <div className="relative aspect-square overflow-hidden rounded-3xl glass-strong">
            <img
              src={brainImg}
              alt="Glowing AI brain of interconnected book pages"
              loading="lazy"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 mix-blend-overlay opacity-40 bg-noise" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
              {["Embeddings", "Cosine sim", "Transformer", "Hybrid", "Cold-start"].map((c) => (
                <span key={c} className="glass rounded-full px-3 py-1 text-[11px] text-foreground/80">
                  {c}
                </span>
              ))}
            </div>
            <div className="absolute inset-4 rounded-2xl border border-white/10 animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}
