import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap, reduced } from '../../lib/motion';

const NOTES = [
  { x: 30, y: 30, title: 'Moletom 3 cabos', text: 'Felpado por dentro, ombro caído' },
  { x: 66, y: 46, title: 'Rosa choque', text: 'Tingido na peça, não desbota' },
  { x: 44, y: 76, title: 'Pantalona', text: 'Cordão aparente, bolso fundo' },
];

/**
 * A roupa abre de uma janelinha até a tela inteira enquanto as palavras
 * se afastam; no fim aparecem as notas sobre cada parte da peça.
 */
export default function ZoomStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced()) return;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      });
      tl.fromTo('.zs-frame', { clipPath: 'inset(32% 36% 32% 36% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 }, 0)
        .fromTo('.zs-frame img', { scale: 1.5 }, { scale: 1, duration: 1 }, 0)
        .to('.zs-w1', { xPercent: -60, opacity: 0, duration: 0.7 }, 0)
        .to('.zs-w2', { xPercent: 60, opacity: 0, duration: 0.7 }, 0)
        .fromTo('.zs-note', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, stagger: 0.12, ease: 'back.out(2)' }, 0.95)
        .fromTo('.zs-cta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, 1.15)
        .to({}, { duration: 0.35 });
    },
    { scope: root },
  );

  return (
    <section className="zs" ref={root} aria-labelledby="zs-title">
      <div className="zs-sticky">
        <div className="zs-frame">
          <img src="/img/looks/042.webp" alt="Conjunto de moletom rosa choque num fundo rosa" loading="lazy" decoding="async" />
        </div>
        <h2 id="zs-title" className="zs-words display">
          <span className="zs-w1">Feito pra</span>
          <span className="zs-w2">ser visto</span>
        </h2>
        <ul className="zs-notes">
          {NOTES.map((n) => (
            <li key={n.title} className="zs-note" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <span className="hotspot-dot" />
              <span className="zs-note-text">
                <b className="mono">{n.title}</b>
                <span className="mono">{n.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <Link className="btn btn-accent zs-cta" to="/loja?colecao=outubro-rosa-26">
          Comprar o rosa <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
