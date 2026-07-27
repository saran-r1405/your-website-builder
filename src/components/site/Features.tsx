import {
  Brain,
  History,
  Heart,
  Search,
  MessageSquareText,
  Layers,
  LayoutDashboard,
  TrendingUp,
  Star,
  UserRound,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Recommendations",
    desc: "Hybrid engine blending content-based and collaborative signals with continuous learning.",
    span: "md:col-span-2 md:row-span-2",
    accent: "from-brand to-brand-2",
  },
  {
    icon: History,
    title: "Reading History",
    desc: "A living timeline of everything you've read, rated, and returned to.",
    accent: "from-brand-2 to-brand-3",
  },
  {
    icon: Heart,
    title: "Wishlist",
    desc: "Save titles for later with mood, priority, and reading windows.",
    accent: "from-brand-3 to-brand",
  },
  {
    icon: Search,
    title: "AI Search",
    desc: "Semantic search understands intent — not just keywords.",
    accent: "from-brand to-brand-3",
    span: "md:col-span-2",
  },
  {
    icon: MessageSquareText,
    title: "NLP Analysis",
    desc: "Sentence transformers extract themes, tone, and emotional arc.",
    accent: "from-brand-2 to-brand",
  },
  {
    icon: Layers,
    title: "Book Similarity",
    desc: "Cosine similarity in embedding space maps books like galaxies.",
    accent: "from-brand-3 to-brand-2",
  },
  {
    icon: LayoutDashboard,
    title: "Personal Dashboard",
    desc: "Streaks, goals, XP, and reading DNA in one calm cockpit.",
    accent: "from-brand to-brand-2",
    span: "md:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "Trending",
    desc: "What the world is reading, right now.",
    accent: "from-brand-2 to-brand-3",
  },
  {
    icon: Star,
    title: "Ratings",
    desc: "Weighted, personalized, and confidence-scored.",
    accent: "from-brand-3 to-brand",
  },
  {
    icon: UserRound,
    title: "Author Insights",
    desc: "Deep-dive pages on every author, generated on demand.",
    accent: "from-brand to-brand-3",
    span: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          tag="Features"
          title={<>A complete reading intelligence layer.</>}
          subtitle="Every surface designed as a first-class product. No dashboards that feel like admin panels."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[180px]">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:glow-ring ${f.span ?? ""}`}
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${f.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
              />
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} shadow-glow`}>
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{f.desc}</p>
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),oklch(0.99_0_0/0.06),transparent_60%)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  center = true,
}: {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : ""}>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-3" />
        {tag}
      </div>
      <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-gradient sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
