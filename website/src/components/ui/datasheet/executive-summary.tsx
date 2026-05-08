import type { DatasheetExecutiveSummary } from "./types";

interface ExecutiveSummaryProps {
  summary: DatasheetExecutiveSummary;
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <section className="relative py-24 print:py-14 print:break-inside-avoid border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-10">
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
      </div>
    </section>
  );
}
