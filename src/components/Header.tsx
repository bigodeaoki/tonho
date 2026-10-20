import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNow } from '../hooks/useNow';
import { countdown, formatCountdown, nextDrop } from '../lib/calendar';
import { TagMark, Wordmark } from './Logo';

export default function Header() {
  const { count, setOpen, bump } = useCart();
  const [hidden, setHidden] = useState(false);
  const [jump, setJump] = useState(false);
  const now = useNow(1000);
  const next = nextDrop(now);

  // some ao descer, volta ao subir
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last + 2);
      if (y < last - 2 || y < 240) setHidden(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!bump) return;
    setJump(true);
    const t = window.setTimeout(() => setJump(false), 520);
    return () => window.clearTimeout(t);
  }, [bump]);

  return (
    <header className={`hd${hidden ? ' is-hidden' : ''}`}>
      <Link to="/" className="hd-logo" aria-label="Tonho e Gabi, página inicial">
        <TagMark className="hd-tag" />
        <Wordmark className="hd-word" />
        <Wordmark className="hd-word-sm" solid />
      </Link>
      <nav className="hd-nav" aria-label="Principal">
        <NavLink to="/loja" className="link-line">
          Loja
        </NavLink>
        <a href="/#colecoes" className="link-line">
          Coleções
        </a>
        <a href="/#calendario" className="link-line hd-hide-sm">
          Calendário
        </a>
      </nav>
      <div className="hd-right">
        {next && (
          <a className="chip hd-drop" href={`/#${next.id}`}>
            <span className="blink">●</span> {next.name} <span className="tabular">{formatCountdown(countdown(next.launch, now))}</span>
          </a>
        )}
        <button type="button" className={`chip hd-bag${jump ? ' is-jumping' : ''}`} onClick={() => setOpen(true)}>
          Sacola <b>{count}</b>
        </button>
      </div>
    </header>
  );
}
