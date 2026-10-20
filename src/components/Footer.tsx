import { Link } from 'react-router-dom';
import { COLLECTIONS } from '../data/collections';

const AVISO = 'oi@tonhoegabi.com.br';

export default function Footer() {
  const newest = [...COLLECTIONS].sort((a, b) => Date.parse(b.launch) - Date.parse(a.launch)).slice(0, 4);
  return (
    <footer className="ft">
      <div className="ft-cols">
        <div className="ft-pitch">
          <h2 className="mono">Tonho e Gabi®</h2>
          <p>Roupa de rua brasileira, lançada em drops. Quando acaba, não volta.</p>
        </div>
        <div>
          <h2 className="mono">Loja</h2>
          <ul className="mono">
            <li>
              <Link className="link-line" to="/loja">
                Tudo
              </Link>
            </li>
            {newest.map((c) => (
              <li key={c.id}>
                <Link className="link-line" to={`/loja?colecao=${c.id}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mono">Ajuda</h2>
          <ul className="mono">
            <li>Frete grátis +R$ 299</li>
            <li>Troca em 30 dias</li>
            <li>
              <a className="link-line" href={`mailto:${AVISO}`}>
                {AVISO}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mono">Siga</h2>
          <ul className="mono">
            <li>
              <a className="link-line" href="https://instagram.com/" rel="noopener">
                Instagram
              </a>
            </li>
            <li>
              <a className="link-line" href="https://tiktok.com/" rel="noopener">
                TikTok
              </a>
            </li>
            <li>
              <a className="link-line" href="https://wa.me/" rel="noopener">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="ft-word display" aria-hidden="true">
        Tonho e Gabi
      </p>
      <div className="ft-legal mono">
        <span>© 2026 Tonho e Gabi. Feito no Brasil.</span>
        <Link className="link-line" to="/creditos">
          Créditos de fotos e vídeo
        </Link>
      </div>
    </footer>
  );
}
