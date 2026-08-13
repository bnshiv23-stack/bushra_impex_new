"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Product } from "@/data/products";

const MAX = 3;

interface CompareCtx {
  items: Product[];
  add: (p: Product) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const Ctx = createContext<CompareCtx | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const add = useCallback((p: Product) => {
    setItems((prev) => {
      if (prev.length > 0 && prev[0].category !== p.category) {
        const ok = window.confirm(
          `You can only compare products in the same category.\nClear current selection (${prev[0].categoryName}) and add this ${p.categoryName} product?`
        );
        if (!ok) return prev;
        return [p];
      }
      if (prev.length >= MAX) {
        window.alert(`You can compare up to ${MAX} products at a time.`);
        return prev;
      }
      if (prev.some((x) => x.slug === p.slug)) return prev;
      return [...prev, p];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((slug: string) => items.some((p) => p.slug === slug), [items]);

  return <Ctx.Provider value={{ items, add, remove, clear, has }}>{children}</Ctx.Provider>;
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be inside CompareProvider");
  return ctx;
}