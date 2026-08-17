import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { BookCard } from '@/components/site/Chatbot' // I will extract this or rebuild a simpler one
import { Navbar } from '@/components/site/Navbar'

export const Route = createFileRoute('/discover')({
  component: Discover,
})

function Discover() {
  const { data: trending, isLoading } = useQuery({
    queryKey: ['discover', 'trending'],
    queryFn: async () => {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=10&langRestrict=en`)
      const data = await res.json()
      return data.items || []
    }
  })

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Discover Books</h1>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Trending Now</h2>
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <span className="text-muted-foreground animate-pulse">Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {trending?.map((item: any) => {
                const book = {
                  id: item.id,
                  title: item.volumeInfo.title,
                  authors: item.volumeInfo.authors,
                  description: item.volumeInfo.description,
                  thumbnail: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:'),
                  categories: item.volumeInfo.categories,
                  averageRating: item.volumeInfo.averageRating,
                }
                return (
                  <div key={book.id} className="glass rounded-2xl p-4 flex flex-col gap-3">
                    {book.thumbnail && (
                      <img src={book.thumbnail} alt="cover" className="w-full h-48 object-cover rounded-xl shadow-lg" />
                    )}
                    <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{book.authors?.join(', ')}</p>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
