import { useCallback, useSyncExternalStore } from "react";

const KEY = "bookmatch-shelf";

let shelf: string[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(shelf));
  } catch {
    /* ignore */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) shelf = JSON.parse(raw) as string[];
  } catch {
    /* ignore */
  }
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  emit();
  return () => listeners.delete(listener);
}

export function useShelf() {
  const items = useSyncExternalStore(
    subscribe,
    () => shelf,
    () => shelf,
  );

  const add = useCallback((title: string) => {
    if (shelf.includes(title)) return false;
    shelf = [...shelf, title];
    persist();
    emit();
    return true;
  }, []);

  const remove = useCallback((title: string) => {
    shelf = shelf.filter((t) => t !== title);
    persist();
    emit();
  }, []);

  const clear = useCallback(() => {
    shelf = [];
    persist();
    emit();
  }, []);

  return { items, add, remove, clear, has: (t: string) => items.includes(t) };
}

export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
