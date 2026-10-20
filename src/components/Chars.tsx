/** Quebra um texto em letras (cada uma num span .char) para animar uma por uma. */
export default function Chars({ text }: { text: string }) {
  return (
    <span aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="char" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {ch}
        </span>
      ))}
    </span>
  );
}
