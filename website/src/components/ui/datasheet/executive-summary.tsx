import type { DatasheetExecutiveSummary, DatasheetModule } from "./types";

interface ExecutiveSummaryProps {
  summary: DatasheetExecutiveSummary;
  modules: DatasheetModule[];
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <section className="relative py-24 print:py-10 print:break-inside-avoid border-b border-white/5">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
          Yönetici Özeti
        </div>

        <div className="space-y-6">
          {summary.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[17px] leading-[1.8] text-(--color-text-secondary) font-light print:text-[11pt] print:leading-[1.7]"
            >
              {p}
            </p>
          ))}
        </div>

        {summary.highlight && (
          <p className="mt-10 pt-6 border-t border-white/10 text-sm italic text-(--color-brand-accent) font-light leading-relaxed">
            {summary.highlight}
          </p>
        )}
      </div>
    </section>
  );
}
