import { BookOpen, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="relative border-t border-white/5 py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-base font-semibold">
                BookMatch <span className="text-gradient-brand">AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A personalized book recommendation platform powered by hybrid AI —
              content-based filtering, collaborative signals, and semantic embeddings.
            </p>
          </div>
          <FooterCol title="Product" links={["Features", "Engine", "Reading DNA", "Galaxy", "Dashboard"]} />
          <FooterCol title="Company" links={["About", "Mission", "Contact", "Privacy", "Terms"]} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BookMatch AI. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            {[Github, Linkedin, Twitter].map((I, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground transition-all hover:text-foreground hover:glow-ring"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
