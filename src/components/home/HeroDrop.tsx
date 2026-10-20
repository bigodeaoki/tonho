import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { useTheme } from '../../context/ThemeContext';
import { brl, cutSrc, productBySlug } from '../../data/products';
import { useNow } from '../../hooks/useNow';
import { countdown, longDate, nextDrop, statusOf } from '../../lib/calendar';
import { finePointer, gsap, reduced } from '../../lib/motion';
import Chars from '../Chars';

const pad = (n: number) => String(n).padStart(2, '0');

export default function HeroDrop() {
  const { worn } = useTheme();
  const now = useNow(1000);
  const next = nextDrop(now);
  const cd = next ? countdown(next.launch, now) : null;
  const root = useRef<HTMLElement>(null);
  const status = statusOf(worn, now);
  const statusText =
    status === 'em-breve' ? `chega ${longDate(worn.launch)}` : status === 'no-ar' ? `no ar até ${longDate(worn.end)}` : status === 'esgotada' ? 'esgotada' : 'na loja';

  useGSAP(
    () => {
      if (reduced()) return;
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('.hx-title .char', { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: 0.04 })
        .fromTo('.hx-arch', { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'expo.inOut' }, 0.05)
        .fromTo('.hx-model', { yPercent: 16, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3 }, 0.35)
        .fromTo('.hotspot', { scale: 0 }, { scale: 1, duration: 0.7, stagger: 0.14, ease: 'back.out(2.6)' }, 1)
        .fromTo('.hx-meta > *, .hx-bar > *', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 }, 0.6);

      // ao rolar: o nome se abre pros lados e o look sobe
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hx-row-1', { xPercent: -22, ease: 'none', scrollTrigger: st });
      gsap.to('.hx-row-2', { xPercent: 22, ease: 'none', scrollTrigger: st });
      gsap.to('.hx-stage', { yPercent: -10, scale: 1.08, ease: 'none', scrollTrigger: st });
      gsap.to('.hx-arch', { scaleX: 1.35, ease: 'none', scrollTrigger: st });

      // o look segue o mouse de leve, o nome vai ao contrário
      if (!finePointer()) return;
      const mx = gsap.quickTo('.hx-model-wrap', 'x', { duration: 0.9, ease: 'power3' });
      const my = gsap.quickTo('.hx-model-wrap', 'y', { duration: 0.9, ease: 'power3' });
      const t1 = gsap.quickTo('.hx-row-1 .char', 'x', { duration: 1.2, ease: 'power3' });
      const t2 = gsap.quickTo('.hx-row-2 .char', 'x', { duration: 1.4, ease: 'power3' });
      const move = (e: PointerEvent) => {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        mx(dx * 36);
        my(dy * 18);
        t1(dx * -40);
        t2(dx * 30);
      };
      root.current?.addEventListener('pointermove', move);
      return () => root.current?.removeEventListener('pointermove', move);
    },
    { scope: root, dependencies: [worn.id], revertOnUpdate: true },
  );

  return (
    <section className="hx" ref={root} aria-labelledby="hx-title">
      <div className="hx-meta mono">
        <span>
          [ {worn.drop} ] {worn.name} — {statusText}
        </span>
        <span className="hx-meta-mid">Roupa de rua brasileira em drops</span>
        <span>São Paulo — BR</span>
      </div>

      <div className="hx-scene">
      <h1 id="hx-title" className="hx-title display" aria-label="Tonho e Gabi: roupa de rua brasileira em drops">
        <span className="hx-row hx-row-1 split-line">
          <Chars text="Tonho" />
        </span>
        <span className="hx-row hx-row-2 split-line">
          <Chars text="e Gabi" />
        </span>
      </h1>

      <div className="hx-stage">
        <div className="hx-arch" />
        <div className="hx-model-wrap">
          <img className="hx-model" src={cutSrc(worn.cut)} alt={`Look da coleção ${worn.name}`} fetchPriority="high" />
          {worn.hotspots.map((h) => {
            const p = productBySlug(h.slug);
            if (!p) return null;
            return (
              <Link key={h.slug} className="hotspot" to={`/loja/${p.slug}`} style={{ left: `${h.x}%`, top: `${h.y}%` }} data-cursor="Comprar">
                <span className="hotspot-dot" />
                <span className="hotspot-tag mono">
                  <span className="hotspot-name">{p.name}</span>
                  <b className="tabular">{brl(p.price)}</b>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      </div>

      <div className="hx-bar">
        <div className="hx-copy">
          <p>Uma coleção por estação, uma por causa. Tiragem curta: quando acaba, não volta.</p>
          <div className="hx-ctas">
            <Link className="btn btn-accent" to={`/loja?colecao=${worn.id}`}>
              Comprar o drop <span className="arrow">→</span>
            </Link>
            <a className="btn btn-light" href="#colecoes">
              Ver coleções
            </a>
          </div>
        </div>
        {next && cd && (
          <a className="hx-count" href={`#${next.id}`}>
            <span className="mono">
              <span className="blink">●</span> Próximo drop: {next.name}
            </span>
            <span className="hx-count-num display tabular">
              {cd.days}D {pad(cd.hours)}:{pad(cd.minutes)}:{pad(cd.seconds)}
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
