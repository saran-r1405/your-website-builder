import { useState } from "react";
import { SectionHeader } from "./Features";
import galaxyImg from "@/assets/book-galaxy.jpg";
import { Sparkles } from "lucide-react";
import { booksByGenre } from "@/lib/books";
import { scrollToId } from "@/lib/shelf";

const planets = [
  { l: "Fantasy", x: "18%", y: "40%", s: 3 },
  { l: "Sci-Fi", x: "48%", y: "55%", s: 4 },
  { l: "Mystery", x: "72%", y: "36%", s: 2 },
  { l: "Romance", x: "34%", y: "72%", s: 2 },
  { l: "Non-Fiction", x: "82%", y: "62%", s: 3 },
];

export function Galaxy() {
  const [sector, setSector] = useState("Sci-Fi");
  const books = booksByGenre(sector);

  return (
    <section id="galaxy" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          tag="Book Galaxy"
          title={<>Travel through a universe made of stories.</>}
          subtitle="Books become planets. Genres become galaxies. Your recommendations light up as stars."
        />

        <div className="relative mt-16 overflow-hidden rounded-[2rem] glass-strong">
          <img
            src={galaxyImg}
            alt="Galaxy of glowing books"
            loading="lazy"
            width={1600}
            height={1000}
            className="h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {planets.map((p) => (
            <button
              key={p.l}
              onClick={() => setSector(p.l)}
              aria-label={`Explore ${p.l}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              <div className="group relative flex flex-col items-center gap-2">
                <div
                  className={`animate-pulse-glow rounded-full bg-gradient-to-br from-brand-3 to-brand transition-transform group-hover:scale-125 ${
                    sector === p.l ? "ring-2 ring-white/70" : ""
                  }`}
                  style={{ width: p.s * 8, height: p.s * 8 }}
                />
                <span className="glass rounded-full px-2 py-0.5 text-[10px] text-white/90">
                  {p.l}
                </span>
              </div>
            </button>
          ))}

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Now exploring
              </div>
              <div className="font-display text-2xl font-semibold text-gradient">
                Sector · {sector}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {books.slice(0, 4).map((b) => (
                  <span key={b.title} className="glass rounded-full px-3 py-1 text-[11px] text-white/90">
                    {b.title}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollToId("cta")}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-3" />
              Enter the galaxy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
