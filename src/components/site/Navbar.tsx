import { useEffect, useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#engine", label: "Engine" },
  { href: "#dna", label: "Reading DNA" },
  { href: "#galaxy", label: "Galaxy" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

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
          <a href="#top" className="group flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
              <BookOpen className="h-4 w-4 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 opacity-60 blur-md transition-opacity group-hover:opacity-100" />
            </div>
            <span className="font-display text-base font-semibold tracking-tight">
              BookMatch <span className="text-gradient-brand">AI</span>
            </span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-brand via-brand-2 to-brand-3 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="#cta"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              Login
            </a>
            <a
              href="#cta"
              className="group relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Get started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
