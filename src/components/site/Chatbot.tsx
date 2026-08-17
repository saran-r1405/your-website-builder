import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, ExternalLink, BookOpen, Star, Loader2 } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { GoogleBook } from "@/lib/googleBooks";
import { Link } from "@tanstack/react-router";

// Extended book type to include Gemini's specific reason for recommending
type Recommendation = GoogleBook & { reason?: string };

type Msg = { 
  id: number; 
  role: "bot" | "user"; 
  text: string; 
  recommendations?: Recommendation[];
  isError?: boolean;
  retryAction?: () => void;
};

const GREETING: Msg = {
  id: 0,
  role: "bot",
  text: "Hey! I'm your AI Librarian. What would you like to read?",
};

export function Chatbot() {
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  
  const { library, addToLibrary } = useLibrary();

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [msgs, typing]);

  const send = async (text: string, isRetry: boolean = false) => {
    const value = text.trim();
    if (!value) return;
    
    let newMsgs = [...msgs];

    if (!isRetry) {
      newMsgs = [...msgs, { id: Date.now(), role: "user" as const, text: value }];
      setMsgs(newMsgs);
      setInput("");
    } else {
      // Remove the last error message if we are retrying
      newMsgs = newMsgs.filter(m => !m.isError);
      setMsgs(newMsgs);
    }
    
    setTyping(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('recommend', {
        body: {
          message: value,
          conversation: newMsgs.map(m => ({ role: m.role, text: m.text }))
        }
      });

      if (error) {
        throw new Error(error.message || 'API request failed');
      }
      
      if (data && data.success === false) {
        throw new Error(data.message || 'API error');
      }

      setMsgs((m) => [...m, { 
        id: Date.now() + 1, 
        role: "bot", 
        text: data.message || "Here are some books I found.", 
        recommendations: data.recommendations 
      }]);
    } catch (e: any) {
      console.error("Chatbot Edge Function Error:", e);
      setMsgs((m) => [...m, { 
        id: Date.now() + 1, 
        role: "bot", 
        text: "I couldn't complete your recommendation right now.",
        isError: true,
        retryAction: () => send(value, true)
      }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] pt-6 pb-2">
        <div className="flex-1 w-full overflow-hidden rounded-3xl glass-strong shadow-glow flex flex-col relative bg-background/50 backdrop-blur-md border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-center border-b border-white/10 px-6 py-5 shrink-0 bg-gradient-to-r from-brand/10 via-background to-brand-2/10">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-display font-bold text-white tracking-wide">FIND YOUR NEXT BOOK</h1>
                <div className="text-xs font-medium text-brand-3">POWERED BY AI LIBRARIAN</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-6 overflow-y-auto px-4 md:px-8 py-6 text-sm scrollbar-thin">
            {msgs.map((m) =>
              m.role === "bot" ? (
                <div key={m.id} className="flex flex-col gap-3 max-w-[95%]">
                  <div className={`glass-strong w-fit rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-white/5 ${m.isError ? 'text-red-400' : 'text-white'}`}>
                    <Sparkles className={`mr-2 inline h-4 w-4 ${m.isError ? 'text-red-400' : 'text-brand-3'}`} />
                    <span className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: m.text }} />
                    {m.isError && m.retryAction && (
                      <button 
                        onClick={m.retryAction}
                        className="mt-3 block glass rounded-full px-4 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors border border-white/10"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                  
                  {/* Rich Book Cards */}
                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {m.recommendations.map(book => {
                        return (
                          <div key={book.id} className="glass flex flex-col gap-3 p-5 rounded-2xl shadow-glow overflow-hidden relative group hover:bg-white/5 transition-colors border border-white/10">
                             <div className="flex gap-4">
                               {/* Cover */}
                               <div className="w-24 h-36 shrink-0 rounded-lg overflow-hidden shadow-md">
                                 {book.thumbnail ? (
                                   <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center bg-brand/10 text-xs text-center p-2 text-muted-foreground border border-white/5">No Cover</div>
                                 )}
                               </div>
                               
                               {/* Details */}
                               <div className="flex-1 flex flex-col justify-start">
                                 <h4 className="font-display font-semibold text-white text-lg leading-tight mb-1 group-hover:text-brand-3 transition-colors">{book.title}</h4>
                                 <p className="text-brand-100 text-sm font-medium mb-2">{book.authors?.join(", ") || "Unknown Author"}</p>
                                 
                                 <div className="flex flex-wrap gap-2 text-[10px] mb-3">
                                   {book.categories?.[0] && <span className="bg-white/10 px-2 py-0.5 rounded-full text-white/90">{book.categories[0]}</span>}
                                   {book.publishedDate && <span className="text-muted-foreground">{book.publishedDate.substring(0, 4)}</span>}
                                   {book.averageRating && (
                                     <span className="flex items-center text-yellow-500 font-medium bg-yellow-500/10 px-2 py-0.5 rounded-full">
                                       <Star className="h-3 w-3 fill-current mr-1" /> {book.averageRating}
                                     </span>
                                   )}
                                 </div>
                                 
                                 {book.description && (
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: book.description }} />
                                 )}
                               </div>
                             </div>

                             {/* AI Reason */}
                             {book.reason && (
                               <div className="bg-brand/10 border border-brand/20 rounded-xl p-3 mt-1">
                                 <p className="text-xs text-brand-50 font-medium leading-relaxed"><span className="text-brand-3 font-semibold">Why it matches:</span> {book.reason}</p>
                               </div>
                             )}

                             {/* Actions */}
                             <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                               {book.previewLink && (
                                 <a href={book.previewLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 glass rounded-full py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors">
                                   <ExternalLink className="h-4 w-4 text-brand-3" /> Preview
                                 </a>
                               )}
                               <Link to={`/book/${book.id}`} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-brand-2 rounded-full py-2.5 text-xs font-medium text-white shadow-glow hover:scale-[1.02] transition-transform">
                                 <BookOpen className="h-4 w-4" /> View Book
                               </Link>
                             </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={m.id}
                  className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-brand via-brand-2 to-brand-3 px-5 py-4 text-white shadow-glow text-base"
                >
                  {m.text}
                </div>
              ),
            )}
            {typing && (
              <div className="glass-strong w-fit rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-brand-3 flex items-center gap-3 font-medium shadow-sm border border-white/5">
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing millions of books...
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Prompts */}
          {msgs.length < 3 && !typing && (
            <div className="flex flex-wrap justify-center gap-2 px-4 pb-4 shrink-0">
              {["Fantasy with magic", "Books like Harry Potter", "Best mystery novels", "Beginner psychology books"].map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="glass rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:border-brand-3/50 hover:bg-white/5 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 md:p-6 shrink-0 bg-background/80 backdrop-blur-md border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-3 max-w-3xl mx-auto relative"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={typing}
                className="flex-1 bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-4 text-base placeholder:text-muted-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-white shadow-inner disabled:opacity-50"
                placeholder="Tell me what you're looking for..."
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={typing || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow disabled:opacity-50 hover:scale-105 transition-transform"
              >
                <Send className="h-5 w-5 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}
