import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import type { Collection } from '../data/collections';
import { brl, cutSrc, productsOf } from '../data/products';
import { useNow } from '../hooks/useNow';
import { statusLabel, statusOf } from '../lib/calendar';
import { gsap, reduced } from '../lib/motion';

const AUTO_MS = 6000;
const pad2 = (n: number) => String(n).padStart(2, '0');

/** Mistura a cor do drop com branco, pra alternar o fundo de peça em peça. */
function tint(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * amount));
  return `rgb(${ch.join(' ')})`;
}

/** Onde cada peça fica em relação à que está na frente: a do meio grande, a próxima espiando à direita. */
function slot(rel: number) {
  if (rel === 0) return { xPercent: 0, yPercent: 0, scale: 1, rotationY: 0, autoAlpha: 1, zIndex: 3 };
  if (rel === 1) return { xPercent: 58, yPercent: -6, scale: 0.5, rotationY: -32, autoAlpha: 0.5, zIndex: 2 };
  if (rel === -1) return { xPercent: -64, yPercent: -6, scale: 0.5, rotationY: 32, autoAlpha: 0, zIndex: 1 };
  return { xPercent: rel > 0 ? 110 : -110, yPercent: -8, scale: 0.4, rotationY: rel > 0 ? -40 : 40, autoAlpha: 0, zIndex: 0 };
}

interface Props {
  collection: Collection;
  titleTag?: 'h1' | 'h2';
}

/**
 * Vitrine do drop: a peça recortada grande sobre a cor da coleção, o nome gigante atrás
 * e o painel de compra ao lado. Trocar de peça vira a vitrine como página de revista;
 * sozinha, ela avança a cada 6 segundos enquanto está na tela.
 */
export default function CollectionViewer({ collection: c, titleTag: Title = 'h2' }: Props) {
  const items = productsOf(c.id);
  const n = items.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const root = useRef<HTMLElement>(null);
  const first = useRef(true);
  const swipe = useRef<number | null>(null);
  const { add, setOpen } = useCart();
  const { worn, wear, current } = useTheme();
  const now = useNow(60_000);
  const p = items[i];
  const status = statusOf(c, now);
  const out = !!p?.soldOut || status === 'esgotada';
  const pre = status === 'em-breve';
  const isWorn = worn.id === c.id;
  const auto = n > 1 && inView && !hover && !reduced();

  const go = useCallback(
    (to: number, d: number) => {
      setDir(d);
      setI(((to % n) + n) % n);
      setAdded(false);
    },
    [n],
  );

  useEffect(() => {
    setSize(p && p.sizes.length === 1 ? p.sizes[0] : null);
  }, [p]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>('.cv-item');
      const instant = first.current || reduced();
      els.forEach((el, k) => {
        let rel = k - i;
        if (rel > n / 2) rel -= n;
        if (rel < -n / 2) rel += n;
        if (n === 2 && rel === -1) rel = 1;
        const props = slot(rel);
        if (instant) gsap.set(el, props);
        else gsap.to(el, { ...props, duration: 1, ease: 'expo.inOut', overwrite: 'auto' });
      });
      if (!instant) {
        gsap.fromTo('.cv-ghost-text', { xPercent: dir * 22, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out' });
        gsap.fromTo('.cv-panel [data-anim]', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05, delay: 0.12 });
      }
      first.current = false;
    },
    { scope: root, dependencies: [i] },
  );

  if (!p) return null;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(i + 1, 1);
    if (e.key === 'ArrowLeft') go(i - 1, -1);
  };
  const down = (e: PointerEvent) => {
    swipe.current = e.clientX;
  };
  const up = (e: PointerEvent) => {
    if (swipe.current === null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  };
  const buy = () => {
    if (!size) return;
    add(p.slug, size);
    setAdded(true);
    setOpen(true);
  };

  const bg = i % 2 === 0 ? c.accent : tint(c.accent, 0.38);

  return (
    <section
      ref={root}
      className="cv"
      style={{ ['--bg' as string]: bg, ['--c' as string]: c.accent } as CSSProperties}
      aria-roledescription="vitrine"
      aria-label={`Peças da coleção ${c.name}`}
      onKeyDown={onKey}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <p className="cv-ghost display" aria-hidden="true">
        <span key={p.slug} className="cv-ghost-text">
          {p.name}
        </span>
      </p>

      <div className="cv-head">
        <p className="mono">
          [ {c.drop} ] {c.when} — {statusLabel(c, now)}
        </p>
        <Title className="cv-title display">{c.name}</Title>
        <button
          type="button"
          className="chip cv-wear"
          aria-pressed={isWorn}
          onClick={() => wear(isWorn && c.id !== current.id ? null : c.id)}
        >
          <span className="dot" style={{ ['--dot' as string]: c.accent }} />
          {isWorn ? (c.id === current.id ? 'Cor do mês no site' : 'Voltar pra cor do mês') : 'Vestir o site'}
        </button>
      </div>

      <div className="cv-stage" onPointerDown={down} onPointerUp={up} data-cursor={n > 1 ? 'Arrasta' : undefined}>
        {items.map((it, k) => (
          <div key={it.slug} className="cv-item" aria-hidden={k !== i}>
            <img src={cutSrc(it.cut ?? it.main.id)} alt={k === i ? `${it.name}, ${it.kind.toLowerCase()} da coleção ${c.name}` : ''} draggable={false} decoding="async" />
          </div>
        ))}
      </div>

      {n > 1 && (
        <div className="cv-controls">
          <button type="button" className="cv-arrow" onClick={() => go(i - 1, -1)} aria-label="Peça anterior">
            ←
          </button>
          <div className={`cv-progress${auto ? '' : ' is-paused'}`} style={{ ['--dur' as string]: `${AUTO_MS}ms` }} aria-hidden="true">
            {items.map((it, k) => (
              <span key={it.slug} className={k < i ? 'is-done' : undefined}>
                {k === i && <i key={`${p.slug}-${auto}`} onAnimationEnd={() => go(i + 1, 1)} />}
              </span>
            ))}
          </div>
          <button type="button" className="cv-arrow cv-arrow-next" onClick={() => go(i + 1, 1)} aria-label="Próxima peça">
            →
          </button>
        </div>
      )}

      <aside className="cv-panel" aria-live="polite">
        <p className="mono cv-count" data-anim>
          {pad2(i + 1)} / {pad2(n)} — {p.kind}
        </p>
        <h3 className="display cv-name" data-anim>
          {p.name}
        </h3>
        <p className="cv-desc" data-anim>
          {p.description}
        </p>

        {n > 1 && (
          <div className="cv-thumbs" data-anim role="group" aria-label="Escolher peça">
            {items.map((it, k) => (
              <button
                key={it.slug}
                type="button"
                className={k === i ? 'is-active' : undefined}
                aria-pressed={k === i}
                aria-label={it.name}
                onClick={() => k !== i && go(k, k > i ? 1 : -1)}
              >
                <img src={cutSrc(it.cut ?? it.main.id)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <fieldset className="cv-sizes" data-anim disabled={out}>
          <legend className="mono">Tamanho</legend>
          <div>
            {p.sizes.map((z) => (
              <button key={z} type="button" className={size === z ? 'is-active' : undefined} aria-pressed={size === z} onClick={() => setSize(z)}>
                <span className="mono">{z}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="cv-buy" data-anim>
          <span className="cv-price display tabular">{brl(p.price)}</span>
          <button type="button" className="btn btn-accent" onClick={buy} disabled={out || !size}>
            {out ? 'Esgotado' : added ? 'Na sacola ✓' : !size ? 'Escolhe o tamanho' : pre ? 'Garantir na pré-venda' : 'Pôr na sacola'}
            <span className="arrow">→</span>
          </button>
        </div>
        <Link className="mono link-line cv-more" to={`/loja/${p.slug}`} data-anim>
          Ver fotos e detalhes da peça →
        </Link>
      </aside>
    </section>
  );
}
