import { useState, type FormEvent } from 'react';
import { useNow } from '../../hooks/useNow';
import { countdown, nextDrop } from '../../lib/calendar';
import Marquee from '../Marquee';

const AVISO = 'oi@tonhoegabi.com.br';

/** Lista do drop. Sem servidor de e-mail ainda: abre o app de e-mail com a mensagem pronta. */
export default function DropAlert() {
  const now = useNow(60_000);
  const next = nextDrop(now);
  const [email, setEmail] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(next ? `Me avisa do ${next.name}` : 'Me avisa do próximo drop');
    const body = encodeURIComponent(`Quero ser avisado do próximo drop neste e-mail: ${email}`);
    window.location.href = `mailto:${AVISO}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="da" aria-labelledby="da-title">
      <Marquee accent items={['Entra na lista', next ? `${next.name} em ${countdown(next.launch, now).days} dias` : 'Próximo drop', 'Tiragem curta', 'Sem spam']} />
      <div className="da-body">
        <h2 id="da-title" className="display">
          Avisa quando
          <br />
          dropar
        </h2>
        <form className="da-form" onSubmit={submit}>
          <label className="mono" htmlFor="da-email">
            Seu e-mail
          </label>
          <div className="da-field">
            <input id="da-email" type="email" required placeholder="voce@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <button type="submit" className="btn btn-accent">
              Me avisa <span className="arrow">→</span>
            </button>
          </div>
          <p className="mono da-note">Abre seu app de e-mail com o pedido pronto. A gente avisa só de drop.</p>
        </form>
      </div>
    </section>
  );
}
