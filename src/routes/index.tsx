import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Chatbot } from "@/components/site/Chatbot";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useProfile } from "@/hooks/useProfile";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { profile, isLoading, isError } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !profile && !isError) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [profile, isLoading, isError, navigate]);

  if (isLoading || !profile) {
    return (
      <div className="flex flex-col gap-4 h-screen items-center justify-center bg-background text-white">
        <Loader2 className="h-8 w-8 text-brand animate-spin" />
        <div className="text-sm text-muted-foreground animate-pulse">Loading your personalized experience...</div>
      </div>
    );
  }

  return (
    <div className="dark relative min-h-screen text-foreground bg-background flex flex-col">
      <AmbientBackground />
      <Navbar />
      
      <main className="flex-1 w-full pt-16 px-4 md:px-8">
        <Chatbot />
      </main>
    </div>
  );
}
