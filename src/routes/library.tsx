import { createFileRoute } from "@tanstack/react-router";
import { useLibrary } from "@/hooks/useLibrary";
import { BookMarked, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";

// @ts-ignore
export const Route = createFileRoute("/library")({
  component: LibraryPage,
});

function LibraryPage() {
  const { library, isLoading } = useLibrary();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-white">Loading your library...</div>;
  }

  const reading = library.filter(b => b.status === "reading");
  const wantToRead = library.filter(b => b.status === "want_to_read");
  const completed = library.filter(b => b.status === "completed");

  return (
    <div className="min-h-screen bg-background text-foreground dark pb-12" id="library">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
            <BookMarked className="h-6 w-6 text-white" />
          </div>
          <div>
             <h1 className="text-4xl font-display font-semibold text-gradient-brand">Your Library</h1>
             <p className="text-muted-foreground mt-2">{library.length} books stored in your reading DNA.</p>
          </div>
        </div>

        {library.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-3xl mt-12">
             <Sparkles className="h-8 w-8 text-brand-3 mb-4 opacity-50" />
             <div className="text-lg text-muted-foreground">Your library is empty</div>
             <Link to="/search" className="text-sm text-brand mt-2 hover:underline">Find books to read</Link>
          </div>
        ) : (
          <div className="space-y-12">
            <LibrarySection title="Currently Reading" books={reading} />
            <LibrarySection title="Want to Read" books={wantToRead} />
            <LibrarySection title="Completed" books={completed} />
          </div>
        )}
      </div>
    </div>
  );
}

function LibrarySection({ title, books }: { title: string, books: any[] }) {
  if (books.length === 0) return null;
  return (
    <div>
      <h2 className="text-xl font-display font-medium text-white mb-6">{title} ({books.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
         {books.map(book => (
           <Link key={book.book_id} to={`/book/${book.book_id}`} className="group relative flex flex-col gap-2">
             <div className="aspect-[2/3] w-full rounded-xl overflow-hidden glass shadow-glow group-hover:-translate-y-1 transition-transform duration-300">
                {book.cover_url ? (
                  <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand-3/20 flex items-center justify-center p-2 text-center">
                     <span className="text-[10px] text-muted-foreground">{book.title}</span>
                  </div>
                )}
             </div>
             <div>
                <div className="font-medium text-xs line-clamp-1 group-hover:text-brand-3 transition-colors">{book.title}</div>
             </div>
           </Link>
         ))}
      </div>
    </div>
  )
}
