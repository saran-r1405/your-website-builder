import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Compass, Search, Library, Star, Bookmark, Book, History, Target, BarChart2, StarIcon } from 'lucide-react'

export const Route = createFileRoute('/menu')({
  component: Menu,
})

const menuItems = [
  { icon: Compass, label: "Discover", to: "/discover" },
  { icon: Search, label: "Search", to: "/search" },
  { icon: BookOpen, label: "Categories", to: "/categories" },
  { icon: Library, label: "My Library", to: "/library" },
  { icon: Star, label: "Favorites", to: "/favorites" },
  { icon: Bookmark, label: "Reading List", to: "/reading-list" },
  { icon: Book, label: "Currently Reading", to: "/reading" },
  { icon: History, label: "History", to: "/history" },
  { icon: Target, label: "Goals", to: "/goals" },
  { icon: BarChart2, label: "Statistics", to: "/statistics" },
  { icon: StarIcon, label: "Features", to: "/features" },
]

function Menu() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Menu</h1>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Close
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="group flex items-center gap-4 rounded-2xl glass p-4 transition-all hover:bg-white/5 active:scale-95"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand-3/20 text-brand">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-brand transition-colors">
                  {item.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
