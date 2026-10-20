import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { byId } from '../data/collections';
import { brl, shotSrc, type Product, type Shot } from '../data/products';
import { statusOf } from '../lib/calendar';

export const shotStyle = (s: Shot): CSSProperties => ({
  objectPosition: s.focus,
  transformOrigin: s.focus,
  ['--z' as string]: s.zoom ?? 1,
});

/** Card de produto: foto que troca e dá zoom no hover, e compra rápida por tamanho. */
export default function ProductCard({ p, now, index = 0 }: { p: Product; now: number; index?: number }) {
  const { add, setOpen } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const c = byId(p.collectionId)!;
  const s = statusOf(c, now);
  const out = p.soldOut || s === 'esgotada';
  const tag = out ? 'Esgotado' : s === 'em-breve' ? 'Pré-venda' : s === 'no-ar' ? 'Novo drop' : null;

  const quick = (size: string) => {
    add(p.slug, size);
    setAdded(size);
    window.setTimeout(() => setAdded(null), 1600);
  };

  return (
    <li className={`pc${out ? ' is-out' : ''}`} style={{ ['--accent-c' as string]: c.accent, ['--i' as string]: index }}>
      <div className="pc-frame">
      <Link to={`/loja/${p.slug}`} className="pc-media" data-cursor="Ver">
        <img className="pc-img pc-img-1" src={shotSrc(p.main)} alt={`${p.name}, ${c.name}`} style={shotStyle(p.main)} loading="lazy" decoding="async" />
        {p.alt && <img className="pc-img pc-img-2" src={shotSrc(p.alt)} alt="" aria-hidden="true" style={shotStyle(p.alt)} loading="lazy" decoding="async" />}
        {tag && <span className="pc-tag mono">[ {tag} ]</span>}
      </Link>
      {!out && (
        <div className="pc-quick" role="group" aria-label={`Compra rápida de ${p.name}`}>
          {added ? (
            <button type="button" className="pc-added mono" onClick={() => setOpen(true)}>
              ✓ Tam. {added} na sacola. Ver
            </button>
          ) : (
            <>
              <span className="mono">+ Rápido</span>
              {p.sizes.map((z) => (
                <button key={z} type="button" className="mono" onClick={() => quick(z)} aria-label={`Pôr ${p.name} tamanho ${z} na sacola`}>
                  {z === 'Único' ? 'Ún.' : z}
                </button>
              ))}
            </>
          )}
        </div>
      )}
      </div>
      <div className="pc-info">
        <Link to={`/loja/${p.slug}`} className="pc-name">
          {p.name}
        </Link>
        <span className="pc-price mono tabular">{brl(p.price)}</span>
      </div>
      <p className="pc-meta mono">
        <span className="pc-dot" /> {c.name}
      </p>
    </li>
  );
}
