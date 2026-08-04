import { useEffect, useState } from "react";
import { BookOpen, Sparkles, Menu, X, Library } from "lucide-react";
import { useShelf, scrollToId } from "@/lib/shelf";
import { AuthDialog } from "./AuthDialog";
import { ShelfPanel } from "./ShelfPanel";

const links = [
  { id: "features", label: "Features" },
  { id: "engine", label: "Engine" },
  { id: "dna", label: "Reading DNA" },
  { id: "galaxy", label: "Galaxy" },
  { id: "about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [shelfOpen, setShelfOpen] = useState(false);
  const { items } = useShelf();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`glass flex items-center justify-between rounded-2xl px-4 transition-all duration-500 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <button onClick={() => go("top")} className="group flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
              <BookOpen className="h-4 w-4 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 opacity-60 blur-md transition-opacity group-hover:opacity-100" />
            </div>
            <span className="font-display text-base font-semibold tracking-tight">
              BookMatch <span className="text-gradient-brand">AI</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="group relative rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-brand via-brand-2 to-brand-3 transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShelfOpen(true)}
              aria-label="Open my shelf"
              className="relative flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground transition-colors hover:text-foreground"
            >
              <Library className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-3 px-1 text-[10px] font-semibold text-white">
                  {items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              Login
            </button>
            <button
              onClick={() => go("cta")}
              className="group relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Get started
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mt-2 space-y-1 rounded-2xl glass-strong p-3 md:hidden">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="block w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setAuthOpen(true);
              }}
              className="block w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              Login
            </button>
          </div>
        )}
      </div>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
      <ShelfPanel open={shelfOpen} onClose={() => setShelfOpen(false)} />
    </header>
  );
}
