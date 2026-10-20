import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { productBySlug } from '../data/products';

export interface CartItem {
  slug: string;
  size: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  /** contador que muda a cada item adicionado, para a sacola dar o "pulo" */
  bump: number;
}

const Ctx = createContext<CartState | null>(null);
const KEY = 'tg-sacola';

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return parsed.filter((i) => productBySlug(i.slug));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* sem armazenamento: a sacola vale só nesta visita */
    }
  }, [items]);

  const add = useCallback((slug: string, size: string) => {
    setItems((prev) => {
      const hit = prev.find((i) => i.slug === slug && i.size === size);
      if (hit) return prev.map((i) => (i === hit ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { slug, size, qty: 1 }];
    });
    setBump((b) => b + 1);
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const total = items.reduce((n, i) => n + (productBySlug(i.slug)?.price ?? 0) * i.qty, 0);
    return { items, count, total, open, setOpen, add, setQty, clear, bump };
  }, [items, open, add, setQty, clear, bump]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart fora do CartProvider');
  return v;
}
