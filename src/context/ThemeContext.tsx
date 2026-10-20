import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { byId, type Collection } from '../data/collections';
import { currentCollection } from '../lib/calendar';

interface ThemeState {
  /** coleção do mês, pela data de hoje */
  current: Collection;
  /** coleção que o site está vestindo (a do mês, ou a que o visitante escolheu) */
  worn: Collection;
  wear: (id: string | null) => void;
}

const Ctx = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [current] = useState(() => {
    // ?hoje=2026-12-10 mostra o site numa outra data
    const param = new URLSearchParams(window.location.search).get('hoje');
    const t = param ? Date.parse(param) : NaN;
    return currentCollection(Number.isNaN(t) ? Date.now() : t);
  });
  const [wornId, setWornId] = useState<string | null>(null);
  const worn = (wornId && byId(wornId)) || current;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', worn.accent);
    root.dataset.collection = worn.id;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', worn.accent);
  }, [worn]);

  const value = useMemo(() => ({ current, worn, wear: setWornId }), [current, worn]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTheme fora do ThemeProvider');
  return v;
}
