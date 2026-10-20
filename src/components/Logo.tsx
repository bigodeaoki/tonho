import { STACKED, TAG, WORDMARK } from '../brand/logos';

interface Props {
  className?: string;
  /** sem rótulo, o logo fica escondido de leitores de tela (use quando o link ao redor já tem nome) */
  title?: string;
}

const a11y = (title?: string) => (title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true as const });

/** Logo horizontal: TONHO E GABI com o E vazado. `solid` preenche o E, pra tamanhos abaixo de 120 px. */
export function Wordmark({ className, title, solid = false }: Props & { solid?: boolean }) {
  const { w, h, body, e, stroke } = WORDMARK;
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} {...a11y(title)}>
      <path fill="currentColor" d={body} />
      {solid ? (
        <path fill="currentColor" d={e} />
      ) : (
        <path fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" d={e} />
      )}
    </svg>
  );
}

/** Logo empilhado: TONHO / E GABI. */
export function StackedMark({ className, title }: Props) {
  const { w, h, body, e, stroke } = STACKED;
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} {...a11y(title)}>
      <path fill="currentColor" d={body} />
      <path fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" d={e} />
    </svg>
  );
}

/** Símbolo: a etiqueta de roupa com T&G vazado. */
export function TagMark({ className, title }: Props) {
  return (
    <svg className={className} viewBox={`0 0 ${TAG.w} ${TAG.h}`} {...a11y(title)}>
      <path fill="currentColor" fillRule="evenodd" d={TAG.d} />
    </svg>
  );
}
