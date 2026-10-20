import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { useTheme } from '../../context/ThemeContext';
import { COLLECTIONS } from '../../data/collections';
import { brl, cutSrc, productsOf } from '../../data/products';
import { useNow } from '../../hooks/useNow';
import { statusLabel } from '../../lib/calendar';
import { gsap, reduced } from '../../lib/motion';

const ORDER = [...COLLECTIONS].sort((a, b) => Date.parse(b.launch) - Date.parse(a.launch));

/**
 * As coleções numa esteira horizontal: a seção fica presa e a rolagem vertical
 * empurra os painéis pro lado. No celular vira uma pilha vertical.
 */
export default function CollectionsScroll() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const { worn, wear, current } = useTheme();
  const now = useNow(60_000);

  useGSAP(
    () => {
      if (reduced()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar.current && gsap.set(bar.current, { scaleX: self.progress }),
          },
        });
        // dentro de cada painel: o look anda mais devagar que o nome
        gsap.utils.toArray<HTMLElement>('.cs-panel').forEach((panel) => {
          const st = { trigger: panel, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true };
          gsap.fromTo(panel.querySelector('.cs-model'), { xPercent: 22 }, { xPercent: -22, ease: 'none', scrollTrigger: st });
          gsap.fromTo(panel.querySelector('.cs-name'), { xPercent: -10 }, { xPercent: 10, ease: 'none', scrollTrigger: st });
          gsap.fromTo(panel.querySelector('.cs-place'), { rotate: -10, yPercent: 10 }, { rotate: 6, yPercent: -10, ease: 'none', scrollTrigger: st });
        });
      });
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray<HTMLElement>('.cs-panel').forEach((panel) => {
          gsap.fromTo(panel.querySelector('.cs-model'), { yPercent: 20, opacity: 0 }, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: panel, start: 'top 75%' },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="cs" id="colecoes" ref={root} aria-labelledby="cs-title">
      <div className="cs-track" ref={track}>
        <div className="cs-intro">
          <p className="mono">[ Coleções ]</p>
          <h2 id="cs-title" className="display">
            Um ano
            <br />
            em drops
          </h2>
          <p className="cs-intro-text">Seis coleções em doze meses. Rola pro lado, escolhe uma, ou veste o site com a cor dela.</p>
          <span className="cs-arrow display" aria-hidden="true">
            →
          </span>
        </div>

        {ORDER.map((c) => {
          const items = productsOf(c.id);
          const min = Math.min(...items.map((p) => p.price));
          const isWorn = c.id === worn.id;
          return (
            <article key={c.id} id={c.id} className="cs-panel" style={{ ['--c' as string]: c.accent }} aria-labelledby={`cs-${c.id}`}>
              <header className="cs-top mono">
                <span>{c.drop} / 06</span>
                <span>{c.when}</span>
                <span className="cs-status">[ {statusLabel(c, now)} ]</span>
              </header>
              <h3 id={`cs-${c.id}`} className="cs-name display">
                {c.name}
              </h3>
              <figure className="cs-place">
                <img src={c.place.src} alt={c.place.alt} loading="lazy" decoding="async" />
                <figcaption className="mono">{c.place.caption}</figcaption>
              </figure>
              <img className="cs-model" src={cutSrc(c.cut)} alt={`Look da coleção ${c.name}`} loading="lazy" decoding="async" />
              <div className="cs-foot">
                <p className="cs-tagline">{c.tagline}</p>
                <p className="cs-blurb">{c.blurb}</p>
                <p className="mono">
                  {items.length} {items.length === 1 ? 'peça' : 'peças'}, a partir de {brl(min)}
                </p>
                <div className="cs-ctas">
                  <Link className="btn" to={`/loja?colecao=${c.id}`}>
                    Ver coleção <span className="arrow">→</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-light"
                    aria-pressed={isWorn}
                    onClick={() => wear(isWorn && c.id !== current.id ? null : c.id)}
                  >
                    {isWorn ? (c.id === current.id ? 'Cor do mês' : 'Voltar pro mês') : 'Vestir o site'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="cs-progress" aria-hidden="true">
        <span ref={bar} />
      </div>
    </section>
  );
}
