import { COLLECTIONS, type Collection } from '../data/collections';

export type Status = 'em-breve' | 'no-ar' | 'na-loja' | 'ultimas' | 'esgotada';

export function statusOf(c: Collection, now: number): Status {
  const launch = Date.parse(c.launch);
  const end = Date.parse(c.end);
  if (now < launch) return 'em-breve';
  if (c.soldOut) return 'esgotada';
  if (now <= end) return 'no-ar';
  return c.lastPieces ? 'ultimas' : 'na-loja';
}

/** A coleção "do mês": a que está no ar e foi lançada por último. */
export function currentCollection(now: number): Collection {
  const live = COLLECTIONS.filter((c) => statusOf(c, now) === 'no-ar').sort(
    (a, b) => Date.parse(b.launch) - Date.parse(a.launch),
  );
  if (live[0]) return live[0];
  const launched = COLLECTIONS.filter((c) => Date.parse(c.launch) <= now).sort(
    (a, b) => Date.parse(b.launch) - Date.parse(a.launch),
  );
  return launched[0] ?? COLLECTIONS[0];
}

/** O próximo drop ainda por vir. */
export function nextDrop(now: number): Collection | undefined {
  return COLLECTIONS.filter((c) => Date.parse(c.launch) > now).sort(
    (a, b) => Date.parse(a.launch) - Date.parse(b.launch),
  )[0];
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

export function countdown(target: string, now: number): Countdown {
  const ms = Math.max(0, Date.parse(target) - now);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: ms === 0,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export function formatCountdown(c: Countdown): string {
  return `${c.days}d ${pad(c.hours)}:${pad(c.minutes)}:${pad(c.seconds)}`;
}

export function statusLabel(c: Collection, now: number): string {
  const s = statusOf(c, now);
  switch (s) {
    case 'em-breve': {
      const d = countdown(c.launch, now).days;
      return d === 0 ? 'chega hoje' : d === 1 ? 'chega amanhã' : `chega em ${d} dias`;
    }
    case 'no-ar':
      return 'no ar agora';
    case 'na-loja':
      return 'na loja';
    case 'ultimas':
      return 'últimas peças';
    case 'esgotada':
      return 'esgotada';
  }
}

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export function longDate(iso: string): string {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: 'numeric', month: 'numeric' }).formatToParts(d);
  const day = Number(parts.find((p) => p.type === 'day')?.value ?? 1);
  const month = Number(parts.find((p) => p.type === 'month')?.value ?? 1);
  return `${day} de ${MESES[month - 1]}`;
}

export function dropTime(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' })
    .format(new Date(iso))
    .replace(':00', 'h');
}
