import { BookOpen, Github, Linkedin, Twitter } from "lucide-react";
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const productLinks: { label: string; id: string }[] = [
  { label: "Features", id: "features" },
  { label: "Engine", id: "engine" },
  { label: "Reading DNA", id: "dna" },
  { label: "Galaxy", id: "galaxy" },
  { label: "Dashboard", id: "dashboard" },
];

const companyLinks: { label: string; id?: string; href?: string }[] = [
  { label: "About", id: "about" },
  { label: "Mission", id: "engine" },
  { label: "Contact", href: "mailto:hello@bookmatch.ai" },
  { label: "Privacy", id: "cta" },
  { label: "Terms", id: "cta" },
];

const socials = [
  { Icon: Github, href: "https://github.com", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

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

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Product
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a
                      href={l.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToId(l.id!)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BookMatch AI. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground transition-all hover:text-foreground hover:glow-ring"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
