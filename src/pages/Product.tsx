import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import ProductCard, { shotStyle } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { byId } from '../data/collections';
import { brl, productBySlug, productsOf, shotSrc, type Shot } from '../data/products';
import { useNow } from '../hooks/useNow';
import { dropTime, longDate, statusOf } from '../lib/calendar';
import { finePointer, gsap, reduced } from '../lib/motion';
import NotFound from './NotFound';

/** Foto com lupa: passando o mouse, a roupa amplia no ponto onde o cursor está. */
function ZoomShot({ shot, alt, priority }: { shot: Shot; alt: string; priority?: boolean }) {
  const img = useRef<HTMLImageElement>(null);
  const [on, setOn] = useState(false);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!finePointer() || !img.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    img.current.style.transformOrigin = `${x}% ${y}%`;
  };
  return (
    <div className={`pd-shot${on ? ' is-zoom' : ''}`} onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onPointerMove={move} data-cursor="Zoom">
      <img ref={img} src={shotSrc(shot)} alt={alt} style={shotStyle(shot)} loading={priority ? 'eager' : 'lazy'} decoding="async" />
    </div>
  );
}

export default function Product() {
  const { slug = '' } = useParams();
  const p = productBySlug(slug);
  const now = useNow(60_000);
  const { add, setOpen } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [openInfo, setOpenInfo] = useState<string | null>('detalhes');
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSize(p && p.sizes.length === 1 ? p.sizes[0] : null);
    if (p) document.title = `${p.name} | Tonho e Gabi`;
  }, [p]);

  useGSAP(
    () => {
      if (reduced() || !p) return;
      gsap.fromTo('.pd-shot', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut', stagger: 0.12 });
      gsap.fromTo('.pd-info > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.3 });
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true },
  );

  if (!p) return <NotFound />;
  const c = byId(p.collectionId)!;
  const s = statusOf(c, now);
  const out = p.soldOut || s === 'esgotada';
  const pre = s === 'em-breve';
  const others = productsOf(c.id).filter((o) => o.slug !== p.slug).slice(0, 4);

  const onAdd = () => {
    if (!size) return;
    add(p.slug, size);
    setOpen(true);
  };

  const info = [
    { id: 'detalhes', title: 'Detalhes', body: p.description },
    { id: 'tecido', title: 'Tecido e cuidados', body: `${p.fabric}. Lavar do avesso, água fria, não usar secadora.` },
    { id: 'entrega', title: 'Entrega e troca', body: 'Correios pra todo o Brasil, motoboy em São Paulo. Frete grátis a partir de R$ 299. Troca em 30 dias.' },
  ];

  return (
    <div className="pd" ref={root} style={{ ['--c' as string]: c.accent }}>
      <nav className="pd-crumbs mono" aria-label="Você está em">
        <Link className="link-line" to="/loja">
          Loja
        </Link>
        <span>/</span>
        <Link className="link-line" to={`/loja?colecao=${c.id}`}>
          {c.name}
        </Link>
        <span>/</span>
        <span aria-current="page">{p.name}</span>
      </nav>

      <div className="pd-main">
        <div className="pd-gallery">
          <ZoomShot shot={p.main} alt={`${p.name}, foto da peça`} priority />
          {p.alt && <ZoomShot shot={{ ...p.alt, zoom: 1 }} alt={`${p.name} no corpo`} priority />}
        </div>

        <aside className="pd-info">
          <p className="mono pd-drop">
            [ {c.drop} ] {c.name}
            {pre && ` — pré-venda, drop ${longDate(c.launch)} às ${dropTime(c.launch)}`}
            {out && ' — esgotado'}
          </p>
          <h1 className="pd-title display">{p.name}</h1>
          <p className="pd-kind">{p.kind} da coleção {c.name}.</p>
          <div className="pd-price">
            <span className="display tabular">{brl(p.price)}</span>
            <span className="mono">ou 3x de {brl(Math.ceil(p.price / 3))} sem juros</span>
          </div>

          <fieldset className="pd-sizes" disabled={out}>
            <legend className="mono">Tamanho</legend>
            <div>
              {p.sizes.map((z) => (
                <label key={z} className={`pd-size${size === z ? ' is-active' : ''}`}>
                  <input type="radio" name="tamanho" value={z} checked={size === z} onChange={() => setSize(z)} />
                  <span className="mono">{z}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="button" className="btn btn-accent btn-wide pd-add" onClick={onAdd} disabled={out || !size}>
            {out ? 'Esgotado' : !size ? 'Escolhe o tamanho' : pre ? 'Garantir na pré-venda' : 'Pôr na sacola'} <span className="arrow">→</span>
          </button>

          <div className="pd-acc">
            {info.map((it) => {
              const open = openInfo === it.id;
              return (
                <div key={it.id} className={`pd-acc-item${open ? ' is-open' : ''}`}>
                  <button type="button" className="mono" aria-expanded={open} onClick={() => setOpenInfo(open ? null : it.id)}>
                    {it.title}
                    <span aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                  <div className="pd-acc-body">
                    <p>{it.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="pd-more" aria-labelledby="pd-more-title">
          <h2 id="pd-more-title" className="display">
            Combina com
          </h2>
          <ul className="pc-grid">
            {others.map((o, i) => (
              <ProductCard key={o.slug} p={o} now={now} index={i} />
            ))}
          </ul>
        </section>
      )}

      <section className="pd-craft" aria-labelledby="pd-craft-title">
        <div className="pd-craft-copy">
          <p className="mono">[ Como é feita ]</p>
          <h2 id="pd-craft-title" className="display">
            Tinta puxada
            <br />à mão
          </h2>
          <p>Estampa em serigrafia, uma tela por cor, peça por peça. Por isso cada drop tem tiragem curta.</p>
        </div>
        <video className="pd-craft-video" muted loop playsInline autoPlay={!reduced()} preload="metadata" poster="/video/serigrafia-poster.jpg" aria-label="Mãos puxando tinta com um rodo sobre uma tela de serigrafia">
          <source src="/video/serigrafia.webm" type="video/webm" />
          <source src="/video/serigrafia.mp4" type="video/mp4" />
        </video>
      </section>
    </div>
  );
}
