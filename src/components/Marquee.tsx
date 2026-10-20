import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, reduced, scrollVelocity } from '../lib/motion';

export function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
    </svg>
  );
}

interface Props {
  items: ReactNode[];
  accent?: boolean;
  reverse?: boolean;
  speed?: number;
  className?: string;
}

/** Faixa que corre sozinha e acelera/inclina conforme a velocidade da rolagem. */
export default function Marquee({ items, accent, reverse, speed = 60, className = '' }: Props) {
  const belt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = belt.current;
    if (!el || reduced()) return;
    const half = el.scrollWidth / 2;
    let x = reverse ? -half : 0;
    const dir = reverse ? 1 : -1;
    const skew = gsap.quickTo(el, 'skewX', { duration: 0.4, ease: 'power3' });
    const tick = (_: number, dt: number) => {
      const v = scrollVelocity();
      x += dir * (speed + Math.abs(v) * 14) * (dt / 1000);
      if (x <= -half) x += half;
      if (x >= 0) x -= half;
      gsap.set(el, { x });
      skew(Math.max(-12, Math.min(12, v * -0.6)));
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [reverse, speed]);

  const track = (hidden: boolean) => (
    <div className="mq-track" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span key={i} className="mq-item">
          {it}
          <Star />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`mq${accent ? ' mq-accent' : ''} ${className}`}>
      <div className="mq-belt" ref={belt}>
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
