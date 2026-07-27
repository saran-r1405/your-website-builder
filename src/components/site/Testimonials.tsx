import { SectionHeader } from "./Features";
import { Star } from "lucide-react";

const quotes = [
  {
    q: "It's like Spotify Discover Weekly but for books. I've found more favorites in a month than in the last three years.",
    n: "Amara Okafor",
    r: "Product designer",
  },
  {
    q: "The Reading DNA is genuinely uncanny. It nailed my taste and pushed me toward books I would never have picked.",
    n: "Rohan Mehta",
    r: "ML engineer",
  },
  {
    q: "Finally a book app that doesn't look like a library catalogue from 2008. It feels like a real product.",
    n: "Sofía Alvarez",
    r: "Founder, Palindrome",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Loved by readers" title={<>What early users say.</>} />
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure
              key={i}
              className="group relative flex h-full flex-col justify-between rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:glow-ring"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-brand-3 text-brand-3" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                "{q.q}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow" />
                <div>
                  <div className="text-sm font-medium">{q.n}</div>
                  <div className="text-xs text-muted-foreground">{q.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
