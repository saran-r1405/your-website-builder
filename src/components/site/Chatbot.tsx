import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { BOOKS } from "@/lib/books";

type Msg = { id: number; role: "bot" | "user"; text: string };

const GREETING: Msg = {
  id: 0,
  role: "bot",
  text: "Hey! I'm your AI Librarian. Tell me a genre, a mood, or a book you loved.",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  const genre = ["sci-fi", "fantasy", "mystery", "romance", "non-fiction", "fiction"].find((g) =>
    q.includes(g),
  );
  if (genre) {
    const picks = BOOKS.filter((b) => b.genre.toLowerCase() === genre).slice(0, 2);
    return `For ${genre}, try ${picks.map((p) => `${p.title} by ${p.author} (${p.match}% match)`).join(" or ")}.`;
  }
  const known = BOOKS.find((b) => q.includes(b.title.toLowerCase().split(" ")[0]));
  if (known) {
    const similar = BOOKS.find((b) => b.genre === known.genre && b.title !== known.title);
    return `Loved ${known.title}? ${similar?.title} by ${similar?.author} hits the same notes — ${similar?.match}% match.`;
  }
  if (q.includes("short") || q.includes("quick")) {
    const shortest = [...BOOKS].sort((a, b) => a.pages - b.pages)[0];
    return `Something short: ${shortest.title} — only ${shortest.pages} pages.`;
  }
  if (q.includes("hi") || q.includes("hello")) return "Hi! What mood are you reading in today?";
  return "Got it. Based on your Reading DNA I'd start with Project Hail Mary — fast, warm, and 96% match.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [msgs, typing]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMsgs((m) => [...m, { id: Date.now(), role: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: Date.now() + 1, role: "bot", text: reply(value) }]);
    }, 700);
  };

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
              aria-label="Close chat"
              className="rounded-full p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {msgs.map((m) =>
              m.role === "bot" ? (
                <div
                  key={m.id}
                  className="glass w-fit max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-foreground/90"
                >
                  <Sparkles className="mr-1 inline h-3 w-3 text-brand-3" />
                  {m.text}
                </div>
              ) : (
                <div
                  key={m.id}
                  className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-brand to-brand-2 px-3 py-2 text-white"
                >
                  {m.text}
                </div>
              ),
            )}
            {typing && (
              <div className="glass w-fit rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-muted-foreground">
                typing…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-1 px-3 pb-2">
            {["Sci-fi picks", "Something short", "Surprise me"].map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="glass rounded-full px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
              placeholder="Ask the AI Librarian…"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
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
