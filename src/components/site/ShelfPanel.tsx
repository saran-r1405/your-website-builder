import { X, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useShelf, scrollToId } from "@/lib/shelf";

export function ShelfPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, clear } = useShelf();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col glass-strong p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-3" />
            <h2 className="font-display text-lg font-semibold">My shelf ({items.length})</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close shelf"
            className="rounded-full p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex-1 space-y-2 overflow-y-auto">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Your shelf is empty. Add books from the mood picker or search results.
            </p>
          )}
          {items.map((t) => (
            <div key={t} className="flex items-center justify-between gap-3 rounded-xl glass px-4 py-3">
              <span className="text-sm">{t}</span>
              <button
                onClick={() => {
                  remove(t);
                  toast(`Removed "${t}" from your shelf`);
                }}
                aria-label={`Remove ${t}`}
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              clear();
              toast("Shelf cleared");
            }}
            disabled={items.length === 0}
            className="glass flex-1 rounded-full px-4 py-2 text-sm disabled:opacity-40"
          >
            Clear all
          </button>
          <button
            onClick={() => {
              onClose();
              scrollToId("cta");
            }}
            className="flex-1 rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-4 py-2 text-sm font-medium text-white shadow-glow"
          >
            Get early access
          </button>
        </div>
      </aside>
    </div>
  );
}
