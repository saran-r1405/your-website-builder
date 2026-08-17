import { useEffect, useState } from "react";
import { BookOpen, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
              <BookOpen className="h-4 w-4 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 opacity-60 blur-md transition-opacity group-hover:opacity-100" />
            </div>
            <span className="font-display text-base font-semibold tracking-tight">
              BookMatch <span className="text-gradient-brand">AI</span>
            </span>
          </Link>

          <Link
            to="/menu"
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground transition-colors hover:text-foreground"
          >
            <Menu className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
