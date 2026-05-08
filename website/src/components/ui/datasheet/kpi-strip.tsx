import type { DatasheetKpi } from "./types";

interface KpiStripProps {
  kpis: DatasheetKpi[];
}

export function KpiStrip({ kpis }: KpiStripProps) {
  return (
    <section className="relative py-24 print:py-12 print:break-inside-avoid border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12 print:grid-cols-4 print:gap-x-6">
          {kpis.map((k, i) => (
            <div key={`${k.label}-${i}`} className="break-inside-avoid">
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl lg:text-5xl font-mono font-medium tracking-tight text-white print:text-[28pt]">
                  {k.value}
                </span>
                {k.suffix && (
                  <span className="text-xl font-mono font-medium text-(--color-text-secondary) print:text-[14pt]">
                    {k.suffix}
                  </span>
                )}
              </div>
              <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-2">
                {k.label}
              </div>
              <div className="text-xs font-light text-(--color-text-secondary) leading-relaxed">
                {k.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
