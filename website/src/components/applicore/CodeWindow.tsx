interface CodeLine {
  text: string;
  muted?: boolean;
}

interface CodeWindowProps {
  title: string;
  lines: CodeLine[];
}

export default function CodeWindow({ title, lines }: CodeWindowProps) {
  return (
    <div lang="en" className="overflow-hidden rounded-2xl border border-white/10 bg-(--color-surface-base-dark)">
      <p className="border-b border-white/10 px-5 py-3 font-mono text-xs text-(--color-text-muted)">{title}</p>
      <pre tabIndex={0} className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-(--color-text-overline) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-border-active)">
        <code>
          {lines.map((line, i) => (
            <span key={i} className={`block min-h-[1.5em] ${line.muted ? "text-(--color-text-muted)" : ""}`}>
              {line.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
