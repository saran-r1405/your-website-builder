import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { useLibrary } from '@/hooks/useLibrary'
import { History as HistoryIcon, Star } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/history')({
  component: HistoryPage,
})

function HistoryPage() {
  const { completed } = useLibrary()

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
            <HistoryIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-semibold text-gradient-brand">Reading History</h1>
            <p className="text-muted-foreground mt-2">Books you have finished reading ({completed.length})</p>
          </div>
        </div>

        {completed.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-3xl mt-12">
             <HistoryIcon className="h-8 w-8 text-brand-3 mb-4 opacity-50" />
             <div className="text-lg text-muted-foreground">You haven't completed any books yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {completed.map(book => (
              <Link key={book.book_id} to={`/book/${book.book_id}`} className="group relative flex flex-col gap-3">
                <div className="aspect-[2/3] w-full rounded-xl overflow-hidden glass shadow-glow group-hover:-translate-y-1 transition-all duration-300">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand-3/20 flex items-center justify-center p-4 text-center">
                       <span className="text-xs text-muted-foreground">{book.title}</span>
                    </div>
                  )}
                  {book.rating && (
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 text-xs font-bold text-yellow-400">
                      <Star className="h-3 w-3 fill-current" /> {book.rating}
                    </div>
                  )}
                </div>
                <div>
                   <div className="font-medium text-sm line-clamp-1 group-hover:text-brand-3 transition-colors">{book.title}</div>
                   <div className="text-xs text-muted-foreground line-clamp-1">{book.author || "Unknown"}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
