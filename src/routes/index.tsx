import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Engine } from "@/components/site/Engine";
import { ReadingDNA } from "@/components/site/ReadingDNA";
import { Galaxy } from "@/components/site/Galaxy";
import { Mood } from "@/components/site/Mood";
import { Dashboard } from "@/components/site/Dashboard";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BookMatch AI — Discover your next favorite book with AI" },
      {
        name: "description",
        content:
          "BookMatch AI understands your reading personality and recommends books you'll love using ML, NLP, and hybrid recommendation engines.",
      },
      { property: "og:title", content: "BookMatch AI — Personalized book recommendations powered by AI" },
      {
        property: "og:description",
        content:
          "Reading DNA, semantic search, and an AI Librarian in one premium reading experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="dark relative min-h-screen text-foreground">
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Engine />
        <ReadingDNA />
        <Galaxy />
        <Mood />
        <Dashboard />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
