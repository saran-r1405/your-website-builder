import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Sparkles, Bot, LineChart, Library, Search } from 'lucide-react'

export const Route = createFileRoute('/features')({
  component: FeaturesPage,
})

function FeaturesPage() {
  const features = [
    { title: "AI Librarian", icon: Bot, desc: "Get intelligent, personalized book recommendations." },
    { title: "Reading DNA", icon: Sparkles, desc: "Our engine analyzes your reading habits to find your perfect match." },
    { title: "Reading Tracker", icon: LineChart, desc: "Track pages read, set daily goals, and view your history." },
    { title: "Global Search", icon: Search, desc: "Instantly search millions of books via Google Books API." },
    { title: "Digital Library", icon: Library, desc: "Organize your reading list, favorites, and completed books." },
  ]

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24">
        <h1 className="text-4xl font-display font-semibold text-gradient-brand mb-12 text-center">App Features</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass rounded-3xl p-6 flex flex-col gap-4">
               <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
                 <f.icon className="h-6 w-6 text-white" />
               </div>
               <h3 className="text-xl font-bold">{f.title}</h3>
               <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
