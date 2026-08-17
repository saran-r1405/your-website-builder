import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { BookOpen } from 'lucide-react'

export const Route = createFileRoute('/categories')({
  component: Categories,
})

const categories = [
  "Fantasy", "Romance", "Mystery", "Thriller", "Science Fiction", 
  "Biography", "History", "Self Improvement", "Psychology", 
  "Business", "Technology", "Programming", "Education", 
  "Young Adult", "Children", "Classics"
]

function Categories() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Categories</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to="/search"
              search={{ q: cat }}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl glass p-6 transition-all hover:bg-white/5 active:scale-95"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-brand-3/20 text-brand">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="font-semibold text-center text-sm">{cat}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
