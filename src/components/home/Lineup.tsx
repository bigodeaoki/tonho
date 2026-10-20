import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { byId } from '../../data/collections';
import { brl, cutSrc, productBySlug } from '../../data/products';
import { gsap, reduced } from '../../lib/motion';

const LOOKS = [
  { cut: '041', slug: 'moletom-rosa-oversized' },
  { cut: '068', slug: 'cargo-laranja' },
  { cut: '009', slug: 'jaqueta-varsity' },
  { cut: '025', slug: 'moletom-branco' },
  { cut: '040', slug: 'camiseta-preta-vivo' },
  { cut: '035', slug: 'camiseta-cinza-oversized' },
];

/** Fila de looks recortados: passa o mouse num, ele cresce e os outros apagam. */
export default function Lineup() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced()) return;
      gsap.fromTo('.lu-look img', { yPercent: 40, opacity: 0 }, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.lu-row', start: 'top 80%' },
      });
      gsap.fromTo('.lu-head .split-line > span', { yPercent: 110 }, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.lu-head', start: 'top 80%' },
      });
      gsap.to('.lu-ghost', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section className="lu" ref={root} aria-labelledby="lu-title">
      <p className="lu-ghost display" aria-hidden="true">
        Lookbook Lookbook
      </p>
      <div className="lu-head">
        <p className="mono">[ Looks da temporada ]</p>
        <h2 id="lu-title" className="display lu-title">
          <span className="split-line">
            <span>Seis drops,</span>
          </span>
          <span className="split-line">
            <span>seis looks</span>
          </span>
        </h2>
        <p className="mono lu-hint">Passa o mouse. Clica pra comprar a peça.</p>
      </div>
      <ol className="lu-row">
        {LOOKS.map((l, i) => {
          const p = productBySlug(l.slug)!;
          const c = byId(p.collectionId)!;
          return (
            <li key={l.cut} className="lu-look" style={{ ['--c' as string]: c.accent }}>
              <Link to={`/loja/${p.slug}`} data-cursor="Comprar">
                <span className="lu-disc" aria-hidden="true" />
                <img src={cutSrc(l.cut)} alt={`${p.name}, coleção ${c.name}`} decoding="async" />
                <span className="lu-label mono">
                  <span>
                    {String(i + 1).padStart(2, '0')} / {c.name}
                  </span>
                  <b>{p.name}</b>
                  <span className="tabular">{brl(p.price)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
