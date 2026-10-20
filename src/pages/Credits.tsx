import { useEffect } from 'react';
import { CREDITS } from '../data/credits';

export default function Credits() {
  useEffect(() => {
    document.title = 'Créditos | Tonho e Gabi';
  }, []);

  const groups = [
    { title: 'Fotos de modelos (provisórias, Unsplash)', items: CREDITS.filter((c) => c.via === 'Unsplash') },
    { title: 'Lugares e vídeo (Wikimedia Commons)', items: CREDITS.filter((c) => c.via === 'Wikimedia Commons') },
  ];

  return (
    <section className="cr" aria-labelledby="cr-title">
      <h1 id="cr-title" className="display cr-title">
        Créditos
      </h1>
      <p className="cr-lede">
        As fotos de modelos são provisórias, até o ensaio da marca ficar pronto. As fotos de lugares e o vídeo mostram o que
        inspirou cada coleção. Nenhuma delas é da marca.
      </p>
      {groups.map((g) => (
        <div key={g.title} className="cr-group">
          <h2 className="mono">[ {g.title} ]</h2>
          <ol>
            {g.items.map((c) => (
              <li key={c.file}>
                <a className="link-line" href={c.page} rel="noopener">
                  {c.title}
                </a>
                <span className="mono">
                  {c.creator} —{' '}
                  <a className="link-line" href={c.licenseUrl} rel="noopener license">
                    {c.license}
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
