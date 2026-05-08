import type { DatasheetModule } from "./types";

interface TableOfContentsProps {
  modules: DatasheetModule[];
}

export function TableOfContents({ modules }: TableOfContentsProps) {
  return (
    <section className="relative py-24 print:py-14 print:break-after-page print:break-before-page border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-10">
          İçindekiler
        </div>

        <ol className="divide-y divide-white/5 border-y border-white/5">
          {modules.map((m, i) => {
            const num = String(i + 1).padStart(2, "0");
            const startPage = m.pages?.[0];
            const endPage = m.pages?.[m.pages.length - 1];
            const pageRef =
              startPage !== undefined && endPage !== undefined && endPage !== startPage
                ? `${String(startPage).padStart(2, "0")}–${String(endPage).padStart(2, "0")}`
                : startPage !== undefined
                  ? `${String(startPage).padStart(2, "0")}`
                  : "";

            return (
              <li key={m.id} className="break-inside-avoid">
                <a
                  href={`#${m.id}`}
                  className="group flex items-baseline gap-6 py-4 text-sm transition-colors"
                >
                  <span className="shrink-0 w-8 text-[11px] font-mono font-medium text-(--color-text-muted) tabular-nums">
                    {num}
                  </span>
                  <span className="flex-1 min-w-0 truncate font-light text-white/90 group-hover:text-(--color-brand-accent) transition-colors">
                    {m.title_tr || m.title}
                  </span>
                  <span className="shrink-0 text-[11px] font-mono text-(--color-text-muted) tabular-nums">
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
