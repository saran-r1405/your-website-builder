import { ArrowRight, Play, Search, Sparkles, Mic, X, Plus, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import heroImg from "@/assets/hero-library.jpg";
import { AI_SUGGESTIONS, searchBooks } from "@/lib/books";
import { useShelf, scrollToId } from "@/lib/shelf";

const words = ["Discover", "Your", "Next", "Favorite", "Book", "Using", "Artificial", "Intelligence"];

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section id="top" className="relative min-h-screen pt-32 pb-20">
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
            <button
              onClick={() => scrollToId("cta")}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-6 py-3 text-sm font-medium text-white shadow-glow transition-all hover:scale-[1.03] hover:shadow-glow-cyan"
            >
              Start reading
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollToId("features")}
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/10"
            >
              Explore books
            </button>
            <button
              onClick={() => setDemoOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full glass transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
              Watch demo
            </button>
          </div>

          <AISearch />

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

      <FloatingBooks />
      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}

function AISearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { items, add } = useShelf();
  const results = searchBooks(query);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto mt-14 max-w-2xl animate-fade-up"
      style={{ animationDelay: "1200ms" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!query.trim()) {
            toast("Type a book, author, or genre to search");
            return;
          }
          setOpen(true);
          toast.success(`${results.length} matches for "${query}"`);
        }}
        className="glass-strong group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all focus-within:glow-ring"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Search books, genres, authors…"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            const s = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
            setQuery(s.split(" ").slice(0, 2).join(" "));
            setOpen(true);
            toast("AI suggestion", { description: s });
          }}
          className="hidden items-center gap-1 rounded-full glass px-3 py-1 text-xs text-muted-foreground hover:text-foreground sm:inline-flex"
        >
          <Sparkles className="h-3 w-3 text-brand-3" /> AI suggest
        </button>
        <button
          type="button"
          aria-label="Voice search"
          onClick={() => {
            setListening(true);
            toast("Listening…", { description: "Say a title, author, or mood." });
            setTimeout(() => {
              setListening(false);
              setQuery("sci-fi");
              setOpen(true);
              toast.success('Heard: "sci-fi"');
            }, 1600);
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow ${
            listening ? "animate-pulse" : ""
          }`}
        >
          <Mic className="h-3.5 w-3.5" />
        </button>
      </form>

      {open && query.trim() && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl glass-strong text-left shadow-glow">
          {results.length === 0 ? (
            <div className="px-4 py-4 text-sm text-muted-foreground">
              No matches for "{query}". Try a genre like Fantasy or Mystery.
            </div>
          ) : (
            results.map((b) => {
              const saved = items.includes(b.title);
              return (
                <div
                  key={b.title}
                  className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium">{b.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {b.author} · {b.genre} · {b.rating}★ · {b.match}% match
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (add(b.title)) toast.success(`Added "${b.title}" to your shelf`);
                      else toast(`"${b.title}" is already on your shelf`);
                    }}
                    className="flex items-center gap-1 rounded-full glass px-3 py-1.5 text-xs hover:bg-white/10"
                  >
                    {saved ? <Check className="h-3 w-3 text-brand-3" /> : <Plus className="h-3 w-3" />}
                    {saved ? "Saved" : "Add"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const steps = [
    "Rate a handful of books you loved",
    "The hybrid engine builds your Reading DNA",
    "Semantic search finds titles that match your intent",
    "The AI Librarian explains every recommendation",
  ];
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl glass-strong p-8 shadow-glow">
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Product demo</div>
        <h2 className="mt-2 font-display text-2xl font-semibold text-gradient">
          How BookMatch AI works
        </h2>
        <ol className="mt-6 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-3 rounded-xl glass px-4 py-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-3 text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <button
          onClick={() => {
            onClose();
            scrollToId("cta");
          }}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-4 py-3 text-sm font-medium text-white shadow-glow"
        >
          Try it yourself
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function FloatingBooks() {
  const items = [
    { title: "Dune", author: "Frank Herbert", grad: "from-brand to-brand-2", pos: "left-4 top-1/3", delay: "0s", rot: "-8deg" },
    { title: "Project Hail Mary", author: "Andy Weir", grad: "from-brand-3 to-brand", pos: "right-6 top-1/4", delay: "1s", rot: "10deg" },
    { title: "The Midnight Library", author: "Matt Haig", grad: "from-brand-2 to-brand-3", pos: "left-10 bottom-24", delay: "2s", rot: "6deg" },
    { title: "Klara and the Sun", author: "K. Ishiguro", grad: "from-brand-3 to-brand-2", pos: "right-10 bottom-32", delay: "1.5s", rot: "-6deg" },
  ];
  const { add } = useShelf();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {items.map((it, i) => (
        <div
          key={i}
          className={`absolute ${it.pos} animate-float-slow`}
          style={{ animationDelay: it.delay, transform: `rotate(${it.rot})` }}
        >
          <button
            onClick={() => {
              if (add(it.title)) toast.success(`Added "${it.title}" to your shelf`);
              else toast(`"${it.title}" is already on your shelf`);
            }}
            className="glass-strong pointer-events-auto flex w-44 flex-col gap-2 rounded-xl p-3 text-left shadow-glow transition-transform hover:scale-105"
          >
            <div className={`h-24 w-full rounded-lg bg-gradient-to-br ${it.grad} shadow-inner`} />
            <div className="text-xs font-semibold text-foreground">{it.title}</div>
            <div className="text-[10px] text-muted-foreground">{it.author}</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-brand-3">
              <Sparkles className="h-2.5 w-2.5" /> 97% match
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
