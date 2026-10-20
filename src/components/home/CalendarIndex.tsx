import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { COLLECTIONS, type Collection } from '../../data/collections';
import { cutSrc } from '../../data/products';
import { useNow } from '../../hooks/useNow';
import { statusLabel, statusOf } from '../../lib/calendar';
import { finePointer, gsap } from '../../lib/motion';

/** O calendário como índice: cada linha é um drop; o look aparece colado no mouse. */
export default function CalendarIndex() {
  const now = useNow(60_000);
  const { worn, wear, current } = useTheme();
  const [hover, setHover] = useState<Collection | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = preview.current;
    const ol = list.current;
    if (!el || !ol || !finePointer()) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    ol.addEventListener('pointermove', move);
    return () => ol.removeEventListener('pointermove', move);
  }, []);

  return (
    <section className="ci" id="calendario" aria-labelledby="ci-title">
      <header className="ci-head">
        <p className="mono">[ Calendário 26/27 ]</p>
        <h2 id="ci-title" className="display">
          Seis drops
          <br />
          em doze meses
        </h2>
        <p className="ci-intro">Passa o mouse pra ver o look de cada drop. “Vestir” troca a cor do site inteiro.</p>
      </header>

      <ol className="ci-list" ref={list} onPointerLeave={() => setHover(null)}>
        {COLLECTIONS.map((c) => {
          const s = statusOf(c, now);
          const isWorn = c.id === worn.id;
          return (
            <li key={c.id} className={`ci-row status-${s}`} style={{ ['--c' as string]: c.accent }} onPointerEnter={() => setHover(c)}>
              <span className="ci-drop mono">{c.drop}</span>
              <Link to={s === 'esgotada' ? '/loja' : `/loja?colecao=${c.id}`} className="ci-name display">
                {c.name}
              </Link>
              <span className="ci-when mono">{c.when}</span>
              <span className="ci-status mono">[ {statusLabel(c, now)} ]</span>
              <button
                type="button"
                className={`chip ci-wear${isWorn ? ' is-active' : ''}`}
                aria-pressed={isWorn}
                onClick={() => wear(isWorn && c.id !== current.id ? null : c.id)}
              >
                <span className="dot" style={{ ['--dot' as string]: c.accent }} />
                {isWorn ? 'Vestindo' : 'Vestir'}
              </button>
            </li>
          );
        })}
      </ol>

      <div ref={preview} className={`ci-preview${hover ? ' is-on' : ''}`} aria-hidden="true">
        {COLLECTIONS.map((c) => (
          <img key={c.id} src={cutSrc(c.cut)} alt="" className={hover?.id === c.id ? 'is-active' : undefined} style={{ ['--c' as string]: c.accent }} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
