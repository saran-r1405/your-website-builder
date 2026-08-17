import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// @ts-ignore
export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const steps = [
  { id: "name", title: "What should we call you?" },
  { id: "goal", title: "What is your main reading goal?" },
  { id: "genres", title: "Select your favorite genres" },
  { id: "mood", title: "What is your usual reading mood?" },
];

const GENRES = [
  "Fantasy", "Sci-Fi", "Romance", "Mystery", "Thriller", 
  "Adventure", "Biography", "History", "Business", 
  "Programming", "Psychology", "Self Help", "Classic", "Young Adult"
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  
  const { createProfile } = useProfile();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      console.log("[ONBOARDING] Button clicked - Submitting Onboarding");
      console.log("[ONBOARDING] Mood selected:", mood);
      console.log("[ONBOARDING] Saving preferences...");
      try {
        await createProfile.mutateAsync({
          profile: {
            name,
            reading_goal: goal,
            mood,
            language: 'en'
          },
          prefs: {
            favorite_genres: selectedGenres
          }
        });
        console.log("[ONBOARDING] Supabase success");
        console.log("[ONBOARDING] Navigation starting");
        
        await navigate({ to: "/" });
        console.log("[ONBOARDING] Navigation completed");
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : JSON.stringify(err);
        console.error("[ONBOARDING ERROR] Profile Creation Failed:", err);
        alert(`Failed to save preferences! \n\nExact Error: ${errMsg}`);
      }
    }
  };

  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => 
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground dark">
      <div className="w-full max-w-lg rounded-2xl glass p-8 shadow-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Step {step + 1} of {steps.length}</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold font-display text-gradient-brand">
            {steps[step].title}
          </h1>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <Input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Your name" 
              className="h-14 text-lg bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
            />
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {["Entertainment", "Study", "Career", "Self Improvement", "Research"].map(g => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`rounded-xl border p-4 text-left transition-all ${goal === g ? 'border-brand bg-brand/20 text-white' : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
              >
                {g}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-wrap gap-2">
            {GENRES.map(g => {
              const isSel = selectedGenres.includes(g);
              return (
                <button
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`rounded-full border px-4 py-2 transition-all ${isSel ? 'border-brand bg-brand/20 text-white' : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                >
                  {g}
                </button>
              )
            })}
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["Happy", "Sad", "Relaxed", "Motivated", "Curious", "Romantic", "Adventurous"].map(m => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`rounded-xl border p-4 text-center transition-all ${mood === m ? 'border-brand bg-brand/20 text-white' : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-end">
          <Button 
            onClick={handleNext} 
            className="rounded-full bg-brand hover:bg-brand-2 text-white px-8"
            disabled={
              (step === 0 && !name) || 
              (step === 1 && !goal) || 
              (step === 2 && selectedGenres.length === 0) || 
              (step === 3 && !mood) ||
              createProfile.isPending
            }
          >
            {step === steps.length - 1 ? (createProfile.isPending ? "Saving..." : "Start Reading") : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
