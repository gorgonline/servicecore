interface PillItem {
  label: string;
  value: string;
}

const PILLS: PillItem[] = [
  { label: "MODÜL SAYISI", value: "17" },
  { label: "STANDART", value: "ITIL4 UYUMLU" },
  { label: "SEVİYE", value: "KURUMSAL" },
  { label: "DİL", value: "TR + EN" },
];

export function ColophonStrip() {
  return (
    <section className="relative border-y border-white/5 py-6 print:py-3 print:break-inside-avoid">
      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {PILLS.map((p) => (
            <div
              key={p.label}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/3"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-(--color-text-muted)">
                {p.label}
              </span>
              <span className="text-xs font-mono font-semibold text-white tracking-wider">
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
