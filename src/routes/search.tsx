import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search as SearchIcon, Loader2, Sparkles, X, AlertTriangle } from "lucide-react";
import { GoogleBook, searchGoogleBooks } from "@/lib/googleBooks";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";

// @ts-ignore
export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || "",
    }
  },
  component: SearchPage,
});

function SearchPage() {
  const searchParams = Route.useSearch();
  const [query, setQuery] = useState(searchParams.q || "");
  const [results, setResults] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<'NETWORK_ERROR' | 'API_ERROR' | 'NO_RESULTS' | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 2) {
        setLoading(true);
        setErrorState(null);
        searchGoogleBooks(query, 20).then(res => {
          setResults(res.data);
          setErrorState(res.error);
          setLoading(false);
        });
      } else {
        setResults([]);
        setErrorState(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground dark pb-12" id="search">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-12">
          <div>
             <h1 className="text-4xl font-display font-semibold text-gradient-brand">Global Search</h1>
             <p className="text-muted-foreground mt-2">Search millions of books instantly.</p>
          </div>
          <div className="w-full md:w-1/2 relative group">
             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
               <SearchIcon className="h-5 w-5 text-muted-foreground" />
             </div>
             <input 
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Title, author, ISBN..."
                className="w-full glass-strong border-white/10 text-white placeholder:text-muted-foreground h-14 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand"
             />
             {query && (
               <button onClick={() => setQuery("")} className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-white">
                 <X className="h-5 w-5" />
               </button>
             )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
             <Loader2 className="animate-spin h-8 w-8 text-brand" />
          </div>
        ) : errorState === 'NETWORK_ERROR' ? (
          <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-3xl">
             <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
             <div className="text-lg text-white font-medium">Connection Failed</div>
             <div className="text-sm text-muted-foreground mt-1">We couldn't connect to the book service. Check your connection and try again.</div>
          </div>
        ) : errorState === 'API_ERROR' ? (
          <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-3xl">
             <AlertTriangle className="h-8 w-8 text-orange-500 mb-4" />
             <div className="text-lg text-white font-medium">Service Unavailable</div>
             <div className="text-sm text-muted-foreground mt-1">The book service is temporarily unavailable. Please try again later.</div>
          </div>
        ) : errorState === 'NO_RESULTS' ? (
          <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-3xl">
             <Sparkles className="h-8 w-8 text-brand-3 mb-4 opacity-50" />
             <div className="text-lg text-white font-medium">No matches</div>
             <div className="text-sm text-muted-foreground mt-1">No books matched "{query}". Try a different title, author, or topic.</div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
             {results.map(book => (
               <Link key={book.id} to={`/book/${book.id}`} className="group relative flex flex-col gap-3">
                 <div className="aspect-[2/3] w-full rounded-xl overflow-hidden glass shadow-glow group-hover:-translate-y-1 transition-all duration-300">
                    {book.thumbnail ? (
                      <img src={book.highResCover || book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand-3/20 flex items-center justify-center p-4 text-center">
                         <span className="text-xs text-muted-foreground">{book.title}</span>
                      </div>
                    )}
                 </div>
                 <div>
                    <div className="font-medium text-sm line-clamp-1 group-hover:text-brand-3 transition-colors">{book.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{book.authors?.[0] || "Unknown"}</div>
                 </div>
               </Link>
             ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-3xl">
             <SearchIcon className="h-8 w-8 text-brand/50 mb-4" />
             <div className="text-lg text-muted-foreground">Start typing to explore the library...</div>
          </div>
        )}
      </div>
    </div>
  );
}
