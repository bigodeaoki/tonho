import { useEffect, useState } from 'react';

function initialNow() {
  const param = new URLSearchParams(window.location.search).get('hoje');
  const t = param ? Date.parse(param) : NaN;
  return Number.isNaN(t) ? null : t;
}

/** Relógio que anda a cada `ms`. Com ?hoje=AAAA-MM-DD na URL, parte daquela data. */
export function useNow(ms = 1000) {
  const [offset] = useState(() => {
    const fixed = initialNow();
    return fixed === null ? 0 : fixed - Date.now();
  });
  const [now, setNow] = useState(() => Date.now() + offset);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!document.hidden) setNow(Date.now() + offset);
    }, ms);
    return () => window.clearInterval(id);
  }, [ms, offset]);
  return now;
}
