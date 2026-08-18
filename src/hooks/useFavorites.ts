import { useCallback, useEffect, useState } from "react";

const KEY = "verity:favorites";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

// Simple cross-component sync: a tiny pub/sub so every hook instance
// re-renders when any of them writes to localStorage.
const listeners = new Set<() => void>();

export function useFavorites() {
  const [ids, setIds] = useState<string[]>(() => read());

  useEffect(() => {
    const listener = () => setIds(read());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l());
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isFavorite };
}
