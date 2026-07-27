import { useEffect, useRef } from "react";

/** Ambient AI-library universe: parallax spotlight, drifting orbs, particle field, grid. */
export function AmbientBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!spotRef.current) return;
        spotRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, oklch(0.7 0.2 275 / 0.15), transparent 60%)`;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 aurora-bg" />
      {/* grid */}
      <div className="absolute inset-0 bg-grid" />
      {/* orbs */}
      <div className="absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-brand/30 blur-[120px] animate-drift" />
      <div className="absolute right-[-100px] top-[40%] h-[600px] w-[600px] rounded-full bg-brand-2/25 blur-[140px] animate-float-slower" />
      <div className="absolute bottom-[-100px] left-[30%] h-[500px] w-[500px] rounded-full bg-brand-3/20 blur-[130px] animate-float-slow" />
      {/* stars */}
      <Stars />
      {/* mouse spotlight */}
      <div ref={spotRef} className="absolute inset-0 transition-[background] duration-200" />
      {/* noise */}
      <div className="absolute inset-0 opacity-[0.35] bg-noise mix-blend-overlay" />
    </div>
  );
}

function Stars() {
  // deterministic star positions
  const stars = Array.from({ length: 60 }).map((_, i) => {
    const x = (i * 97) % 100;
    const y = (i * 53) % 100;
    const s = ((i * 13) % 3) + 1;
    const d = ((i * 7) % 6) + 2;
    return { x, y, s, d, i };
  });
  return (
    <div className="absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.i}
          className="absolute rounded-full bg-white/70"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: 0.5,
            animation: `pulse-glow ${s.d}s ease-in-out ${s.i * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
