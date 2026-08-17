import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { useLibrary } from '@/hooks/useLibrary'
import { BookOpen, Plus, Minus, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/reading')({
  component: ReadingTracker,
})

function ReadingTracker() {
  const { currentlyReading, updateBook } = useLibrary()

  const handleProgress = (book: any, pages: number) => {
    const newPages = Math.max(0, Math.min((book.pages_read || 0) + pages, book.total_pages || 1000))
    const progress = Math.round((newPages / (book.total_pages || 1000)) * 100)
    
    updateBook.mutate({
      bookId: book.book_id,
      updates: {
        pages_read: newPages,
        progress_percent: progress,
        status: newPages >= (book.total_pages || 1000) ? 'completed' : 'reading'
      }
    })
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reading Tracker</h1>
        </div>
        
        {currentlyReading.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-3xl">
             <BookOpen className="h-8 w-8 text-brand-3 mb-4 opacity-50" />
             <div className="text-lg text-muted-foreground">You aren't reading any books right now.</div>
          </div>
        ) : (
          <div className="space-y-6">
            {currentlyReading.map((book) => (
              <div key={book.book_id} className="glass rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <img 
                  src={book.cover_url || ''} 
                  alt={book.title} 
                  className="w-24 h-36 object-cover rounded-xl shadow-lg shrink-0" 
                />
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-xl">{book.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{book.author}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>{book.pages_read || 0} / {book.total_pages || '?'} pages</span>
                    <span>{book.progress_percent || 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full bg-gradient-to-r from-brand to-brand-3 transition-all duration-500" 
                      style={{ width: `${book.progress_percent || 0}%` }}
                    />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => handleProgress(book, -10)}
                      className="flex h-10 items-center justify-center rounded-xl bg-white/5 px-4 hover:bg-white/10"
                    >
                      <Minus className="h-4 w-4 mr-1" /> 10
                    </button>
                    <button 
                      onClick={() => handleProgress(book, 1)}
                      className="flex h-10 items-center justify-center rounded-xl bg-white/5 px-4 hover:bg-white/10"
                    >
                      <Plus className="h-4 w-4 mr-1" /> 1
                    </button>
                    <button 
                      onClick={() => handleProgress(book, 10)}
                      className="flex h-10 items-center justify-center rounded-xl bg-brand/20 px-4 text-brand hover:bg-brand/30"
                    >
                      <Plus className="h-4 w-4 mr-1" /> 10
                    </button>
                    <button 
                      onClick={() => handleProgress(book, book.total_pages || 1000)}
                      className="flex h-10 items-center justify-center rounded-xl bg-green-500/20 px-4 text-green-500 hover:bg-green-500/30 ml-auto"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Finish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
