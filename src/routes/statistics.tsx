import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { useLibrary } from '@/hooks/useLibrary'
import { BarChart2, BookOpen, Clock, Star } from 'lucide-react'

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
})

function StatisticsPage() {
  const { library, completed } = useLibrary()
  
  const totalPages = completed.reduce((sum, book) => sum + (book.total_pages || 0), 0)
  const avgRating = completed.length > 0 
    ? (completed.reduce((sum, book) => sum + (book.rating || 0), 0) / completed.length).toFixed(1)
    : "0.0"

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
            <BarChart2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-semibold text-gradient-brand">Statistics</h1>
            <p className="text-muted-foreground mt-2">Your reading lifecycle in numbers</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           <div className="glass rounded-3xl p-6 flex flex-col items-center text-center">
             <BookOpen className="h-8 w-8 text-brand mb-3" />
             <div className="text-3xl font-display font-bold text-white mb-1">{library.length}</div>
             <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Books</div>
           </div>
           
           <div className="glass rounded-3xl p-6 flex flex-col items-center text-center">
             <BarChart2 className="h-8 w-8 text-green-500 mb-3" />
             <div className="text-3xl font-display font-bold text-white mb-1">{completed.length}</div>
             <div className="text-xs text-muted-foreground uppercase tracking-wider">Completed</div>
           </div>
           
           <div className="glass rounded-3xl p-6 flex flex-col items-center text-center">
             <Clock className="h-8 w-8 text-blue-500 mb-3" />
             <div className="text-3xl font-display font-bold text-white mb-1">{totalPages}</div>
             <div className="text-xs text-muted-foreground uppercase tracking-wider">Pages Read</div>
           </div>
           
           <div className="glass rounded-3xl p-6 flex flex-col items-center text-center">
             <Star className="h-8 w-8 text-yellow-500 mb-3" />
             <div className="text-3xl font-display font-bold text-white mb-1">{avgRating}</div>
             <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg Rating</div>
           </div>
        </div>
      </div>
    </div>
  )
}
