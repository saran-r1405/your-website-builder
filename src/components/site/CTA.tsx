import { useState } from "react";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export function CTA() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <section id="cta" className="relative py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-10 text-center md:p-16">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-brand-3/40 blur-3xl" />

          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-brand-3" />
            Free for the first 10,000 readers
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-gradient sm:text-6xl">
            Your next favorite book is waiting.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Join the private beta and let BookMatch AI build your Reading DNA in under a minute.
          </p>

          {joined ? (
            <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-2 rounded-full glass px-5 py-3 text-sm">
              <Check className="h-4 w-4 text-brand-3" />
              You're on the list — we'll email {email} with your invite.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  toast.error("Please enter a valid email address");
                  return;
                }
                setJoined(true);
                toast.success("You're on the early access list!", {
                  description: `Invite heading to ${email}.`,
                });
              }}
              className="mx-auto mt-8 flex max-w-lg flex-col items-stretch gap-2 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@bookworm.com"
                className="glass-strong flex-1 rounded-full px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:glow-ring"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
              >
                Get early access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
