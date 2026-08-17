import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GoogleBook, getGoogleBookById } from "@/lib/googleBooks";
import { useLibrary } from "@/hooks/useLibrary";
import { Loader2, ArrowLeft, Star, Plus, Check, ExternalLink, Heart, Bookmark, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";

// @ts-ignore
export const Route = createFileRoute("/book/$id")({
  component: BookDetails,
});

function BookDetails() {
  const { id } = Route.useParams();
  const [book, setBook] = useState<GoogleBook | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { library, addToLibrary, updateBook, removeBook, trackView } = useLibrary();
  
  useEffect(() => {
    let active = true;
    setLoading(true);
    getGoogleBookById(id).then(res => {
      if (active) {
        setBook(res);
        setLoading(false);
        if (res) trackView.mutate(res);
      }
    });
    return () => { active = false; };
  }, [id]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-background text-white"><Loader2 className="animate-spin h-8 w-8 text-brand" /></div>
  }

  if (!book) {
     return <div className="min-h-screen flex items-center justify-center bg-background text-white">Book not found.</div>
  }

  const saved = library.find(l => l.book_id === book.id);

  const toggleFavorite = () => {
    if (!saved) {
      addToLibrary.mutate({ ...book, is_favorite: true }, {
        onSuccess: () => toast.success("Added to favorites!")
      });
    } else {
      updateBook.mutate({
        bookId: book.id,
        updates: { is_favorite: !saved.is_favorite }
      }, {
        onSuccess: () => toast.success(saved.is_favorite ? "Removed from favorites" : "Added to favorites!")
      });
    }
  }

  const handleStatus = (status: string) => {
    if (!saved) {
      addToLibrary.mutate({ ...book, status: status as any }, {
        onSuccess: () => toast.success(`Saved to library`)
      });
    } else {
      updateBook.mutate({
        bookId: book.id,
        updates: { status: status as any }
      }, {
        onSuccess: () => toast.success(`Updated status`)
      });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark pb-12">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex-shrink-0 relative group">
             {book.highResCover || book.thumbnail ? (
               <img src={book.highResCover || book.thumbnail} alt={book.title} className="w-full rounded-2xl shadow-glow object-cover aspect-[2/3]" />
             ) : (
               <div className="w-full aspect-[2/3] rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow" />
             )}
             
             <button 
               onClick={toggleFavorite}
               className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors"
             >
               <Heart className={`h-6 w-6 ${saved?.is_favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
             </button>
          </div>
          
          <div className="flex-1 space-y-6">
             <div>
                <h1 className="text-4xl font-display font-bold text-gradient-brand leading-tight">{book.title}</h1>
                {book.subtitle && <h2 className="text-xl text-muted-foreground mt-2">{book.subtitle}</h2>}
                <div className="text-lg text-white/90 mt-2">{book.authors?.join(", ") || "Unknown Author"}</div>
             </div>
             
             <div className="flex flex-wrap gap-3">
                {book.categories?.map(c => (
                  <span key={c} className="glass rounded-full px-3 py-1 text-xs text-white/80">{c}</span>
                ))}
                {book.pageCount && <span className="glass rounded-full px-3 py-1 text-xs text-brand-3">{book.pageCount} pages</span>}
                {book.averageRating && <span className="glass rounded-full px-3 py-1 text-xs text-yellow-500 flex items-center gap-1"><Star className="h-3 w-3 fill-current" /> {book.averageRating} ({book.ratingsCount})</span>}
             </div>
             
             <div className="glass-strong rounded-2xl p-6 space-y-4">
                <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: book.description || "No description available." }} />
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <button
                  onClick={() => handleStatus("want_to_read")}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    saved?.status === "want_to_read" 
                      ? "bg-brand/20 text-brand border border-brand/50" 
                      : "glass hover:bg-white/10"
                  }`}
                >
                  <Bookmark className="h-4 w-4" /> Want to Read
                </button>
                <button
                  onClick={() => handleStatus("reading")}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    saved?.status === "reading" 
                      ? "bg-brand/20 text-brand border border-brand/50" 
                      : "glass hover:bg-white/10"
                  }`}
                >
                  <BookOpen className="h-4 w-4" /> Reading
                </button>
                <button
                  onClick={() => handleStatus("completed")}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    saved?.status === "completed" 
                      ? "bg-green-500/20 text-green-500 border border-green-500/50" 
                      : "glass hover:bg-white/10"
                  }`}
                >
                  <Check className="h-4 w-4" /> Completed
                </button>
             </div>
             
             {book.previewLink && (
               <div className="pt-2">
                 <a
                   href={book.previewLink}
                   target="_blank"
                   rel="noreferrer"
                   className="glass w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-medium hover:bg-white/10 transition-colors"
                 >
                    <ExternalLink className="h-4 w-4 text-brand-3" /> Preview on Google Books
                 </a>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
