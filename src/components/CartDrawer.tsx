import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { byId } from '../data/collections';
import { brl, productBySlug, shotSrc } from '../data/products';
import { stopScroll } from '../lib/motion';

const CONTATO = 'pedidos@tonhoegabi.com.br';

export default function CartDrawer() {
  const { items, total, open, setOpen, setQty } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const frete = total >= 299 || total === 0 ? 0 : 24;
  const tab = open ? 0 : -1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    panel.current?.focus();
    stopScroll(true);
    return () => {
      document.removeEventListener('keydown', onKey);
      stopScroll(false);
    };
  }, [open, setOpen]);

  // Ainda sem checkout: o pedido sai por e-mail já preenchido. Ligar um pagamento antes do lançamento.
  const pedido = encodeURIComponent(
    [
      'Oi! Quero fechar este pedido:',
      '',
      ...items.map((i) => {
        const p = productBySlug(i.slug);
        return `${i.qty}x ${p?.name} (${i.size}): ${brl((p?.price ?? 0) * i.qty)}`;
      }),
      '',
      `Frete: ${frete ? brl(frete) : 'grátis'}`,
      `Total: ${brl(total + frete)}`,
      '',
      'Meu CEP:',
    ].join('\n'),
  );

  return (
    <div className={`drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="drawer-scrim" aria-label="Fechar sacola" tabIndex={tab} onClick={() => setOpen(false)} />
      <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Sacola" tabIndex={-1} ref={panel} data-lenis-prevent>
        <div className="drawer-head">
          <h2 className="drawer-title display">Sacola</h2>
          <button type="button" className="drawer-close mono" onClick={() => setOpen(false)} tabIndex={tab}>
            Fechar ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>Tá vazia. O drop do mês ainda tá no ar.</p>
            <Link to="/loja" className="btn" onClick={() => setOpen(false)} tabIndex={tab}>
              Ir pra loja <span className="arrow">→</span>
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer-list">
              {items.map((i) => {
                const p = productBySlug(i.slug);
                if (!p) return null;
                return (
                  <li key={`${i.slug}-${i.size}`} className="drawer-item">
                    <div className="drawer-thumb">
                      <img src={shotSrc(p.main)} alt="" style={{ objectPosition: p.main.focus }} />
                    </div>
                    <div>
                      <p className="drawer-name">{p.name}</p>
                      <p className="drawer-meta mono">
                        {byId(p.collectionId)?.name}, tam. {i.size}
                      </p>
                      <div className="qty mono" role="group" aria-label={`Quantidade de ${p.name}`}>
                        <button type="button" onClick={() => setQty(i.slug, i.size, i.qty - 1)} aria-label="Tirar um" tabIndex={tab}>
                          −
                        </button>
                        <span aria-live="polite">{i.qty}</span>
                        <button type="button" onClick={() => setQty(i.slug, i.size, i.qty + 1)} aria-label="Pôr mais um" tabIndex={tab}>
                          +
                        </button>
                      </div>
                    </div>
                    <p className="mono tabular">{brl(p.price * i.qty)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="drawer-foot">
              <p className="drawer-row mono">
                <span>Frete</span>
                <span>{frete ? brl(frete) : 'grátis'}</span>
              </p>
              <p className="drawer-row drawer-total">
                <span>Total</span>
                <span className="tabular">{brl(total + frete)}</span>
              </p>
              {frete > 0 && <p className="drawer-note mono">Faltam {brl(299 - total)} pro frete grátis</p>}
              <a className="btn btn-accent btn-wide" href={`mailto:${CONTATO}?subject=${encodeURIComponent('Pedido pelo site')}&body=${pedido}`} tabIndex={tab}>
                Fechar pedido <span className="arrow">→</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
