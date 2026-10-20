import { useEffect, useRef, useState } from 'react';
import { finePointer, gsap, reduced } from '../lib/motion';

/**
 * Bolinha neon que segue o mouse e mostra um rótulo sobre o que é clicável e importante
 * (elementos com data-cursor="Ver"). Só com mouse; no toque não existe.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled] = useState(() => finePointer() && !reduced());

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      setLabel(target?.dataset.cursor ?? '');
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className={`cursor${label ? ' is-on' : ''}`} aria-hidden="true">
      {label}
    </div>
  );
}
