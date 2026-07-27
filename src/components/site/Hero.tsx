import { ArrowRight, Play, Search, Sparkles, Mic } from "lucide-react";
import heroImg from "@/assets/hero-library.jpg";

const words = ["Discover", "Your", "Next", "Favorite", "Book", "Using", "Artificial", "Intelligence"];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-32 pb-20">
      {/* hero backdrop image */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-3 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-3" />
            </span>
            Now in private beta · v2.0
            <Sparkles className="h-3 w-3 text-brand-3" />
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {words.map((w, i) => (
              <span
                key={i}
                className={`mr-3 inline-block animate-fade-up ${
                  ["Favorite", "Artificial", "Intelligence"].includes(w) ? "text-gradient-brand" : "text-gradient"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {w}
              </span>
            ))}
          </h1>

          <p
            className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg animate-fade-up"
            style={{ animationDelay: "800ms" }}
          >
            BookMatch AI understands your reading personality and recommends books
            you'll love using Machine Learning, Natural Language Processing, and
            hybrid recommendation engines trained on millions of stories.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "1000ms" }}
          >
            <a
              href="#cta"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-6 py-3 text-sm font-medium text-white shadow-glow transition-all hover:scale-[1.03] hover:shadow-glow-cyan"
            >
              Start reading
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#features"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/10"
            >
              Explore books
            </a>
            <a
              href="#engine"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full glass transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
              Watch demo
            </a>
          </div>

          {/* AI Search */}
          <div
            className="mx-auto mt-14 max-w-2xl animate-fade-up"
            style={{ animationDelay: "1200ms" }}
          >
            <div className="glass-strong group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all focus-within:glow-ring">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                placeholder="Search books, genres, authors…"
              />
              <button
                type="button"
                className="hidden items-center gap-1 rounded-full glass px-3 py-1 text-xs text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                <Sparkles className="h-3 w-3 text-brand-3" /> AI suggest
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow"
              >
                <Mic className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-up"
            style={{ animationDelay: "1400ms" }}
          >
            {[
              { v: "100K+", l: "Readers" },
              { v: "50K+", l: "Books" },
              { v: "95%", l: "Accuracy" },
              { v: "2M+", l: "Recommendations" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 text-left">
                <div className="font-display text-2xl font-semibold text-gradient-brand sm:text-3xl">
                  {s.v}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating book cards */}
      <FloatingBooks />
    </section>
  );
}

function FloatingBooks() {
  const items = [
    { title: "Dune", author: "Frank Herbert", grad: "from-brand to-brand-2", pos: "left-4 top-1/3", delay: "0s", rot: "-8deg" },
    { title: "Project Hail Mary", author: "Andy Weir", grad: "from-brand-3 to-brand", pos: "right-6 top-1/4", delay: "1s", rot: "10deg" },
    { title: "The Midnight Library", author: "Matt Haig", grad: "from-brand-2 to-brand-3", pos: "left-10 bottom-24", delay: "2s", rot: "6deg" },
    { title: "Klara and the Sun", author: "K. Ishiguro", grad: "from-brand-3 to-brand-2", pos: "right-10 bottom-32", delay: "1.5s", rot: "-6deg" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {items.map((it, i) => (
        <div
          key={i}
          className={`absolute ${it.pos} animate-float-slow`}
          style={{ animationDelay: it.delay, transform: `rotate(${it.rot})` }}
        >
          <div className="glass-strong flex w-44 flex-col gap-2 rounded-xl p-3 shadow-glow">
            <div
              className={`h-24 w-full rounded-lg bg-gradient-to-br ${it.grad} shadow-inner`}
            />
            <div className="text-xs font-semibold text-foreground">{it.title}</div>
            <div className="text-[10px] text-muted-foreground">{it.author}</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-brand-3">
              <Sparkles className="h-2.5 w-2.5" /> 97% match
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
