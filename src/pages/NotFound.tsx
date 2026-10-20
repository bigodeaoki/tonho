import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="nf-title">
      <p className="mono">[ 404 ]</p>
      <h1 id="nf-title" className="display">
        Esgotou
        <br />
        ou nunca existiu
      </h1>
      <Link className="btn btn-accent" to="/loja">
        Voltar pra loja <span className="arrow">→</span>
      </Link>
    </section>
  );
}
