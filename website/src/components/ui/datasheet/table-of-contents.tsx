import type { DatasheetModule } from "./types";

interface TableOfContentsProps {
  modules: DatasheetModule[];
}

export function TableOfContents({ modules }: TableOfContentsProps) {
  return (
    <section className="relative py-24 print:py-10 print:break-after-page print:break-before-page border-b border-white/5">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
          İçindekiler
        </div>

        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-12">
          17 modül, tek platform
        </h2>

        <ol className="space-y-1">
          {modules.map((m, i) => {
            const num = String(i + 1).padStart(2, "0");
            const startPage = m.pages?.[0];
            const endPage = m.pages?.[m.pages.length - 1];
            const pageRef =
              startPage !== undefined && endPage !== undefined && endPage !== startPage
                ? `s.${String(startPage).padStart(2, "0")}-${String(endPage).padStart(2, "0")}`
                : startPage !== undefined
                  ? `s.${String(startPage).padStart(2, "0")}`
                  : "";

            return (
              <li
                key={m.id}
                className="break-inside-avoid border-b border-dashed border-white/10 last:border-b-0"
              >
                <a
                  href={`#${m.id}`}
                  className="group flex items-baseline gap-4 py-3 text-sm hover:text-white transition-colors"
                >
                  <span className="shrink-0 w-7 text-[11px] font-mono font-semibold text-(--color-brand-accent)">
                    {num}
                  </span>
                  <span className="flex-1 min-w-0 truncate font-medium text-white/90 group-hover:text-(--color-brand-accent) transition-colors">
                    {m.title_tr || m.title}
                  </span>
                  <span className="shrink-0 text-[10px] font-mono text-(--color-text-muted) tabular-nums">
                    {pageRef}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
