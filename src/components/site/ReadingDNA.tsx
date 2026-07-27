import { SectionHeader } from "./Features";

const traits = [
  { label: "Fantasy", value: 92 },
  { label: "Adventure", value: 78 },
  { label: "Mystery", value: 64 },
  { label: "Sci-Fi", value: 88 },
  { label: "Romance", value: 40 },
  { label: "Self Help", value: 55 },
];

const personalities = ["Explorer", "Dreamer", "Thinker", "Innovator", "Scholar", "Creator"];

export function ReadingDNA() {
  return (
    <section id="dna" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          tag="Reading DNA"
          title={<>Your profile, decoded like a genome.</>}
          subtitle="Not a boring settings page. A living portrait of who you are as a reader."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Radar */}
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-brand-3/30 blur-3xl" />

            <Radar />

            <div className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {traits.map((t) => (
                <div key={t.label} className="glass rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t.label}</span>
                    <span className="font-medium text-foreground">{t.value}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3"
                      style={{ width: `${t.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personality */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl glass-strong p-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Personality signature
              </div>
              <div className="mt-4 font-display text-5xl font-semibold text-gradient-brand">
                The Explorer
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                You chase big ideas across worlds — fantasy, sci-fi, and boundary-pushing
                non-fiction. You'd rather be uncomfortable than bored.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {personalities.map((p) => (
                  <span
                    key={p}
                    className={`rounded-full px-3 py-1 text-xs ${
                      p === "Explorer"
                        ? "bg-gradient-to-r from-brand via-brand-2 to-brand-3 text-white shadow-glow"
                        : "glass text-muted-foreground"
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Streak", v: "47d" },
                { k: "Books", v: "128" },
                { k: "Hours", v: "612" },
              ].map((s) => (
                <div key={s.k} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl font-semibold text-gradient-brand">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Radar() {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 130;
  const n = traits.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, val: number) => {
    const rr = (val / 100) * r;
    return [cx + Math.cos(angle(i)) * rr, cy + Math.sin(angle(i)) * rr];
  };
  const poly = traits.map((t, i) => point(i, t.value).join(",")).join(" ");
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.68 0.2 275)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.85 0.18 210)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <circle
            key={f}
            cx={cx}
            cy={cy}
            r={r * f}
            fill="none"
            stroke="oklch(0.99 0 0 / 0.08)"
          />
        ))}
        {traits.map((_, i) => {
          const [x, y] = point(i, 100);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="oklch(0.99 0 0 / 0.06)"
            />
          );
        })}
        <polygon points={poly} fill="url(#rg)" stroke="oklch(0.85 0.18 210)" strokeWidth="1.5" />
        {traits.map((t, i) => {
          const [x, y] = point(i, 116);
          return (
            <text
              key={t.label}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="oklch(0.75 0.03 260)"
            >
              {t.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
