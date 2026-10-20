import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { byId } from '../../data/collections';
import { PRODUCTS } from '../../data/products';
import { useNow } from '../../hooks/useNow';
import { statusOf } from '../../lib/calendar';
import { gsap, reduced } from '../../lib/motion';
import ProductCard from '../ProductCard';

export default function NewIn() {
  const root = useRef<HTMLElement>(null);
  const now = useNow(60_000);
  const list = PRODUCTS.filter((p) => !p.soldOut && statusOf(byId(p.collectionId)!, now) !== 'esgotada')
    .sort((a, b) => Date.parse(byId(b.collectionId)!.launch) - Date.parse(byId(a.collectionId)!.launch))
    .slice(0, 8);

  useGSAP(
    () => {
      if (reduced()) return;
      gsap.fromTo('.pc', { y: 80, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: { each: 0.07, grid: 'auto' },
        scrollTrigger: { trigger: '.ni-grid', start: 'top 85%' },
      });
      gsap.fromTo('.ni-title .split-line > span', { yPercent: 110 }, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.ni-head', start: 'top 85%' },
      });
    },
    { scope: root },
  );

  return (
    <section className="ni" ref={root} aria-labelledby="ni-title">
      <div className="ni-head">
        <h2 id="ni-title" className="display ni-title">
          <span className="split-line">
            <span>Pega antes</span>
          </span>
          <span className="split-line">
            <span>que acabe</span>
          </span>
        </h2>
        <div className="ni-side">
          <p className="mono">[ Novidades ] Passa o mouse na foto pra ver a peça no corpo. Compra rápida pelo tamanho.</p>
          <Link className="btn" to="/loja">
            Ver a loja toda <span className="arrow">→</span>
          </Link>
        </div>
      </div>
      <ul className="ni-grid pc-grid">
        {list.map((p, i) => (
          <ProductCard key={p.slug} p={p} now={now} index={i} />
        ))}
      </ul>
    </section>
  );
}
