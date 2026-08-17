import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SectionHeader } from "./Features";
import { Smile, Frown, Zap, Coffee, Compass, Heart, CloudRain, Sparkles, Check, Loader2 } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { GoogleBook, searchGoogleBooks } from "@/lib/googleBooks";

const moods = [
  { key: "happy", label: "Happy", icon: Smile, q: "feel good uplifting" },
  { key: "sad", label: "Sad", icon: Frown, q: "emotional tearjerker" },
  { key: "motivated", label: "Motivated", icon: Zap, q: "productivity self improvement" },
  { key: "relaxed", label: "Relaxed", icon: Coffee, q: "cozy calm" },
  { key: "curious", label: "Curious", icon: Compass, q: "fascinating science history" },
  { key: "romantic", label: "Romantic", icon: Heart, q: "romantic romance" },
  { key: "stressed", label: "Stressed", icon: CloudRain, q: "mindfulness stress relief" },
];

export function Mood() {
  const [active, setActive] = useState("curious");
  const [book, setBook] = useState<GoogleBook | null>(null);
  const [loading, setLoading] = useState(false);
  const { library, addToLibrary } = useLibrary();

  const pick = moods.find((m) => m.key === active)!;

  useEffect(() => {
    let activeEffect = true;
    const fetchBook = async () => {
      setLoading(true);
      const res = await searchGoogleBooks(`subject:${pick.q}`, 3);
      if (activeEffect) {
        setBook(res[Math.floor(Math.random() * res.length)] || null);
        setLoading(false);
      }
    };
    fetchBook();
    return () => { activeEffect = false; };
  }, [active]);

  const saved = book ? library.some(l => l.book_id === book.id) : false;

  return (
    <section id="mood" className="relative py-32">
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
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 flex flex-col justify-center min-h-[300px]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
            <div className="text-xs uppercase tracking-widest text-muted-foreground z-10">
              AI recommends for "{pick.label}"
            </div>
            
            {loading ? (
               <div className="mt-6 flex items-center justify-center h-40">
                  <Loader2 className="animate-spin text-brand h-8 w-8" />
               </div>
            ) : book ? (
              <div className="mt-6 flex items-start gap-5 z-10 relative">
                {book.thumbnail ? (
                  <img src={book.highResCover || book.thumbnail} alt="" className="h-40 w-28 shrink-0 object-cover rounded-lg shadow-glow" />
                ) : (
                  <div className="h-40 w-28 shrink-0 rounded-lg bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow" />
                )}
                <div>
                  <div className="font-display text-2xl font-semibold text-gradient line-clamp-2">
                    {book.title}
                  </div>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground line-clamp-3">
                    {book.description || `A perfectly-tuned pick based on your mood, reading DNA, and the sentiment fingerprint of your last 20 books.`}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="glass rounded-full px-3 py-1 text-[11px]">97% match</span>
                    {book.pageCount && <span className="glass rounded-full px-3 py-1 text-[11px]">{book.pageCount} pages</span>}
                    {book.averageRating && <span className="glass rounded-full px-3 py-1 text-[11px]">{book.averageRating}★</span>}
                  </div>
                  <button
                    onClick={() => {
                      if (!saved) {
                         addToLibrary.mutate(book, {
                           onSuccess: () => toast.success(`Added "${book.title}" to your shelf`)
                         });
                      } else {
                         toast(`"${book.title}" is already on your shelf`);
                      }
                    }}
                    disabled={addToLibrary.isPending}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    {saved ? <Check className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    {saved ? "On your shelf" : "Add to shelf"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-sm text-muted-foreground">Could not find a book.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
