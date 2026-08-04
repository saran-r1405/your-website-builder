import { SectionHeader } from "./Features";
import { Flame, BookMarked, Timer, Target, Trophy, Sparkles } from "lucide-react";

export function Dashboard() {
  return (
    <section id="dashboard" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          tag="AI Dashboard"
          title={<>Your reading cockpit.</>}
          subtitle="Widgets that feel like a Tesla dashboard, not a spreadsheet."
        />

        <div className="mt-16 rounded-[2rem] glass-strong p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[140px]">
            <Stat icon={Flame} label="Reading streak" value="47d" grad="from-brand to-brand-2" span="md:col-span-2" />
            <Stat icon={BookMarked} label="Completed" value="128" grad="from-brand-2 to-brand-3" span="md:col-span-2" />
            <Stat icon={Timer} label="Hours" value="612" grad="from-brand-3 to-brand" span="md:col-span-2" />

            <div className="glass col-span-1 rounded-2xl p-5 md:col-span-3 md:row-span-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Reading activity
                </div>
                <span className="text-[11px] text-brand-3">Last 12 weeks</span>
              </div>
              <Heatmap />
            </div>

            <div className="glass col-span-1 rounded-2xl p-5 md:col-span-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Monthly goal
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="font-display text-4xl font-semibold text-gradient-brand">14</div>
                <div className="text-sm text-muted-foreground">/ 20 books</div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3" />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Target className="h-3.5 w-3.5 text-brand-3" /> On pace to finish 3 days early
              </div>
            </div>

            <div className="glass col-span-1 rounded-2xl p-5 md:col-span-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Achievements
                </div>
                <Trophy className="h-4 w-4 text-brand-3" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Night Owl", "Genre Hopper", "Series Slayer", "First 100", "Marathoner"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-gradient-to-r from-white/10 to-white/[0.02] px-3 py-1 text-xs text-foreground/90 shadow-inner"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Level 12 · Scholar</span>
                <span className="inline-flex items-center gap-1 text-brand-3">
                  <Sparkles className="h-3 w-3" />
                  1,240 XP to next
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  grad,
  span,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  grad: string;
  span?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl glass p-5 ${span ?? ""}`}>
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${grad} opacity-25 blur-2xl`} />
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${grad} shadow-glow`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="mt-4 font-display text-3xl font-semibold text-gradient">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Heatmap() {
  const weeks = 12;
  const days = 7;
  const cells = Array.from({ length: weeks * days }).map((_, i) => {
    const v = ((i * 37) % 5); // 0..4
    return v;
  });
  const colors = [
    "bg-white/5",
    "bg-brand/30",
    "bg-brand/60",
    "bg-brand-2/70",
    "bg-brand-3/80",
  ];
  return (
    <div className="mt-3 grid grid-flow-col grid-rows-7 gap-1.5">
      {cells.map((v, i) => (
        <div
          key={i}
          className={`h-4 w-4 rounded-[3px] ${colors[v]} transition-all hover:scale-125`}
          title={`${v * 15}m`}
        />
      ))}
    </div>
  );
}
