import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 w-[320px] overflow-hidden rounded-2xl glass-strong shadow-glow">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand via-brand-2 to-brand-3">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium">AI Librarian</div>
                <div className="text-[10px] text-brand-3">Online · always reading</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 px-4 py-4 text-sm">
            <div className="glass w-fit max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-foreground/90">
              Hey! Want a recommendation like Project Hail Mary but shorter?
            </div>
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-brand to-brand-2 px-3 py-2 text-white">
              Yes please 🚀
            </div>
            <div className="glass w-fit max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-foreground/90">
              <Sparkles className="mr-1 inline h-3 w-3 text-brand-3" />
              Try <b>The Martian</b> — same voice, tighter arc, 94% match.
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-2">
            <input
              className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
              placeholder="Ask the AI Librarian…"
            />
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand via-brand-2 to-brand-3 text-white shadow-glow transition-transform hover:scale-105"
        aria-label="Open AI Librarian"
      >
        <Bot className="h-6 w-6" />
        <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />
      </button>
    </div>
  );
}
