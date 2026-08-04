import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function AuthDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-3xl glass-strong p-7 shadow-glow">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 className="font-display text-2xl font-semibold text-gradient">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login"
            ? "Sign in to sync your Reading DNA."
            : "Start building your Reading DNA in under a minute."}
        </p>
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              toast.error("Please enter a valid email address");
              return;
            }
            if (password.length < 6) {
              toast.error("Password must be at least 6 characters");
              return;
            }
            toast.success(
              mode === "login" ? `Signed in as ${email}` : `Account created for ${email}`,
              { description: "Demo mode — no data leaves your browser." },
            );
            setEmail("");
            setPassword("");
            onClose();
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@bookworm.com"
            className="glass w-full rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:glow-ring"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="glass w-full rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:glow-ring"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-4 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "No account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
