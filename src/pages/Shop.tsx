import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import ProductCard from '../components/ProductCard';
import CollectionViewer from '../components/CollectionViewer';
import Chars from '../components/Chars';
import { COLLECTIONS, byId } from '../data/collections';
import { CATEGORY_LABEL, PRODUCTS, type Category, type Product } from '../data/products';
import { useNow } from '../hooks/useNow';
import { countdown, nextDrop, statusOf } from '../lib/calendar';
import { gsap, reduced } from '../lib/motion';

type Sort = 'novidades' | 'menor' | 'maior';
const NEWEST = [...COLLECTIONS].sort((a, b) => Date.parse(b.launch) - Date.parse(a.launch));

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const now = useNow(1000);
  const root = useRef<HTMLDivElement>(null);
  const colecao = params.get('colecao') ?? 'tudo';
  const tipo = (params.get('tipo') ?? 'tudo') as Category | 'tudo';
  const ordem = (params.get('ordem') ?? 'novidades') as Sort;
  const next = nextDrop(now);
  const chosen = byId(colecao);

  useEffect(() => {
    document.title = chosen ? `${chosen.name} | Loja Tonho e Gabi` : 'Loja | Tonho e Gabi';
  }, [chosen]);

  const set = (key: string, value: string, fallback: string) => {
    const p = new URLSearchParams(params);
    if (value === fallback) p.delete(key);
    else p.set(key, value);
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const list = useMemo(() => {
    const out = PRODUCTS.filter((p) => (colecao === 'tudo' || p.collectionId === colecao) && (tipo === 'tudo' || p.category === tipo));
    const gone = (p: Product) => (p.soldOut || statusOf(byId(p.collectionId)!, now) === 'esgotada' ? 1 : 0);
    return [...out].sort((a, b) => {
      if (gone(a) !== gone(b)) return gone(a) - gone(b);
      if (ordem === 'menor') return a.price - b.price;
      if (ordem === 'maior') return b.price - a.price;
      return Date.parse(byId(b.collectionId)!.launch) - Date.parse(byId(a.collectionId)!.launch);
    });
    // a ordem só muda com os filtros; o relógio não reordena a cada segundo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colecao, tipo, ordem]);

  useGSAP(
    () => {
      if (reduced()) return;
      if (!document.querySelector('.sh-title')) return;
      gsap.fromTo('.sh-title .char', { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.03 });
    },
    { scope: root, dependencies: [colecao], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (reduced()) return;
      gsap.fromTo('.pc', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.05, clearProps: 'transform,opacity' });
    },
    { scope: root, dependencies: [colecao, tipo, ordem], revertOnUpdate: true },
  );

  const count = (id: string) => PRODUCTS.filter((p) => p.collectionId === id).length;

  return (
    <div className="sh" ref={root} style={chosen ? { ['--c' as string]: chosen.accent } : undefined}>
      {chosen ? (
        <CollectionViewer key={chosen.id} collection={chosen} titleTag="h1" />
      ) : (
        <section className="sh-head" aria-labelledby="sh-title">
          <div className="sh-head-copy">
            <p className="mono">[ {PRODUCTS.length} peças ] Todas as coleções</p>
            <h1 id="sh-title" className="sh-title display" aria-label="Loja">
              <span className="split-line">
                <Chars text="Loja" />
              </span>
            </h1>
            <p className="sh-lede">Camisetas, moletons, calças e acessórios dos drops do ano. Entrega pra todo o Brasil, troca em 30 dias.</p>
            {next && (
              <p className="mono sh-next">
                <span className="blink">●</span> Pré-venda do {next.name} aberta. Drop em {countdown(next.launch, now).days} dias.
              </p>
            )}
          </div>
        </section>
      )}

      <div className="sh-filters" role="group" aria-label="Filtrar produtos">
        <div className="sh-chips">
          <button type="button" className={`chip${colecao === 'tudo' ? ' is-active' : ''}`} onClick={() => set('colecao', 'tudo', 'tudo')} aria-pressed={colecao === 'tudo'}>
            Tudo <span>{PRODUCTS.length}</span>
          </button>
          {NEWEST.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip${colecao === c.id ? ' is-active' : ''}`}
              onClick={() => set('colecao', c.id, 'tudo')}
              aria-pressed={colecao === c.id}
            >
              <span className="dot" style={{ ['--dot' as string]: c.accent }} />
              {c.name} <span>{count(c.id)}</span>
            </button>
          ))}
        </div>
        <div className="sh-selects mono">
          <label>
            Peça
            <select value={tipo} onChange={(e) => set('tipo', e.target.value, 'tudo')}>
              <option value="tudo">Todas</option>
              {(Object.keys(CATEGORY_LABEL) as Category[]).map((k) => (
                <option key={k} value={k}>
                  {CATEGORY_LABEL[k]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ordem
            <select value={ordem} onChange={(e) => set('ordem', e.target.value, 'novidades')}>
              <option value="novidades">Mais novas</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </select>
          </label>
        </div>
      </div>

      {list.length ? (
        <ul className="pc-grid sh-grid">
          {list.map((p, i) => (
            <ProductCard key={p.slug} p={p} now={now} index={i} />
          ))}
        </ul>
      ) : (
        <div className="sh-empty">
          <p className="display">Nada aqui</p>
          <button type="button" className="btn" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
