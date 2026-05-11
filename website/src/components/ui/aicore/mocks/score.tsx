import {
  BarChart3,
  Database,
  Filter,
  Search,
  Send,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
} from "../primitives";

const BARS = [
  { label: "Kadıköy Şubesi", value: 14 },
  { label: "Maslak Genel Md.", value: 11 },
  { label: "Bakırköy Şubesi", value: 9 },
  { label: "İzmir Bölge", value: 7 },
  { label: "Ankara Bölge", value: 6 },
  { label: "Kozyatağı Şubesi", value: 4 },
];

const TIMESERIES = [22, 19, 17, 14, 16, 18, 14, 11, 9, 7, 8, 6, 5];

const PIVOT_HEADERS = ["H-13", "H-10", "H-7", "H-4", "H-1"];
const PIVOT_ROWS: Array<{ branch: string; cells: number[] }> = [
  { branch: "Kadıköy", cells: [4, 3, 2, 3, 2] },
  { branch: "Maslak", cells: [3, 3, 2, 2, 1] },
  { branch: "Bakırköy", cells: [2, 2, 2, 2, 1] },
  { branch: "İzmir", cells: [2, 1, 1, 2, 1] },
  { branch: "Ankara", cells: [1, 2, 1, 1, 1] },
];

export function ScoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const maxBar = Math.max(...BARS.map((b) => b.value));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<BarChart3 className="w-3.5 h-3.5" />}
          title="ScoreAI · Üretilen Dashboard"
          meta="Birikim · son 90 gün"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2">
          <div className="flex items-center gap-2 mb-2">
            <SectionLabel accent={accent}>Doğal Dil Komutu</SectionLabel>
            <AiBadge label="yorumlandı" accent={accent} pulse={false} />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/4">
            <Search className="w-3.5 h-3.5 text-(--color-text-muted) shrink-0" />
            <span className="text-xs text-white/85 leading-snug flex-1">
              Son 90 günde posta servisi P0/P1 incident&apos;lerini şubelere göre kır, çözüm
              sürelerinin trendini de göster.
            </span>
            <button
              className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md ${accent.bg} ${accent.text} ring-1 ${accent.ring} cursor-pointer`}
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="px-5 py-4 space-y-5">
          <div className="grid grid-cols-3 gap-2">
            <KpiTile label="Toplam P0/P1" value="51" trend="−%34 ç/ç" trendTone="down" />
            <KpiTile label="Etkilenen Şube" value="6" trend="14 toplamda" trendTone="flat" />
            <KpiTile label="Ort. Çözüm" value="2:48" trend="dk · −22dk" trendTone="down" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Şubelere Göre P0/P1</SectionLabel>
              <span className="text-[10px] font-mono text-(--color-text-muted)">olay sayısı</span>
            </div>
            <div className="space-y-1.5">
              {BARS.map((b) => {
                const pct = (b.value / maxBar) * 100;
                return (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="w-32 text-[11px] text-white/85 truncate shrink-0">
                      {b.label}
                    </span>
                    <div className="flex-1 h-2.5 rounded-md bg-white/8 overflow-hidden relative">
                      <div
                        className={`h-full ${accent.dot} rounded-md`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-[11px] font-mono tabular-nums text-white/85 shrink-0">
                      {b.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Çözüm Süresi · Haftalık Trend</SectionLabel>
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-300">
                <TrendingDown className="w-3 h-3" />
                İyileşme
              </div>
            </div>
            <AreaChart values={TIMESERIES} accent={accent} />
            <div className="mt-1.5 flex justify-between text-[9px] font-mono text-(--color-text-muted)">
              <span>13 hafta</span>
              <span>10 hafta</span>
              <span>7 hafta</span>
              <span>4 hafta</span>
              <span>1 hafta</span>
              <span className={accent.text}>bu hafta</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Şube × Hafta · Yoğunluk</SectionLabel>
              <Chip>pivot</Chip>
            </div>
            <div className="rounded-lg border border-white/8 overflow-hidden">
              <table className="w-full text-[10px] font-mono">
                <thead>
                  <tr className="bg-white/3 border-b border-white/8">
                    <th className="text-left px-3 py-1.5 text-(--color-text-muted) uppercase tracking-wider font-medium">
                      Şube
                    </th>
                    {PIVOT_HEADERS.map((h) => (
                      <th
                        key={h}
                        className="text-right px-3 py-1.5 text-(--color-text-muted) uppercase tracking-wider font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PIVOT_ROWS.map((row) => (
                    <tr key={row.branch} className="border-b border-white/6 last:border-b-0">
                      <td className="px-3 py-1.5 text-white/85">{row.branch}</td>
                      {row.cells.map((v, i) => (
                        <td
                          key={i}
                          className="text-right px-3 py-1.5 tabular-nums"
                          style={{
                            background: `rgba(99,102,241,${0.06 + (v / 4) * 0.18})`,
                            color: v >= 3 ? "#c7d2fe" : "rgba(255,255,255,0.7)",
                          }}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Yorumlama"
            meta="güven %94"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-4">
            <div>
              <SectionLabel accent={accent}>Algılanan Niyet</SectionLabel>
              <p className="mt-1.5 text-xs text-white/85 leading-relaxed">
                Posta servisinde son 90 gün içinde yaşanmış P0 ve P1 olayların şubelere göre
                dağılımı + ortalama çözüm süresi trendi.
              </p>
            </div>

            <div>
              <SectionLabel>Çıkarılan Filtreler</SectionLabel>
              <div className="mt-2 space-y-1.5">
                <FilterRow icon={<Filter className="w-3 h-3" />} label="Servis" value="Posta · Exchange" accent={accent} />
                <FilterRow icon={<Filter className="w-3 h-3" />} label="Öncelik" value="P0, P1" accent={accent} />
                <FilterRow icon={<Filter className="w-3 h-3" />} label="Aralık" value="Son 90 gün · haftalık" accent={accent} />
                <FilterRow icon={<Filter className="w-3 h-3" />} label="Kuruluş" value="Birikim Holding" accent={accent} />
              </div>
            </div>

            <div>
              <SectionLabel>Kaynak Veri</SectionLabel>
              <div className="mt-2 space-y-1.5">
                <DataSource label="Olay Yönetimi · 9.482 kayıt" />
                <DataSource label="CMDB · servis kataloğu" />
                <DataSource label="SLA · çözüm süreleri" />
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<BarChart3 className="w-3.5 h-3.5" />} title="İlgili Sorgular" accent={accent} />
          <div className="px-5 py-4 space-y-1.5">
            <RelatedQuery accent={accent}>
              Aynı şubelerde değişiklik yönetimi başarı oranı?
            </RelatedQuery>
            <RelatedQuery accent={accent}>
              P0/P1 sırasında en yoğun teknisyenler kim?
            </RelatedQuery>
            <RelatedQuery accent={accent}>
              Trend devam ederse 30 gün sonra tahmin?
            </RelatedQuery>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Sparkles className="w-3.5 h-3.5" />} title="Bu Hafta · Score" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Sorgu" value="412" trend="+%52" trendTone="up" />
            <KpiTile label="Yayınlanan" value="38" trend="dashboard" trendTone="up" />
            <KpiTile label="Ort. Süre" value="1.4s" trend="sorgu" trendTone="flat" />
            <KpiTile label="Doğruluk" value="94%" trend="onaylı" trendTone="flat" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface AreaChartProps {
  values: number[];
  accent: AccentClasses;
}

function AreaChart({ values, accent }: AreaChartProps) {
  const W = 520;
  const H = 96;
  const pad = 4;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = (W - pad * 2) / (values.length - 1);

  const points = values
    .map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + (1 - (v - min) / range) * (H - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const areaPath =
    `M ${pad},${H - pad} L ` +
    points.split(" ").join(" L ") +
    ` L ${W - pad},${H - pad} Z`;

  const last = values[values.length - 1];
  const lastX = pad + (values.length - 1) * stepX;
  const lastY = pad + (1 - (last - min) / range) * (H - pad * 2);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24">
      <defs>
        <linearGradient id="score-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.30" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} className={accent.text} fill="url(#score-area)" />
      <polyline
        points={points}
        fill="none"
        className={accent.text}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r={3} className={accent.text} fill="currentColor" />
      <circle
        cx={lastX}
        cy={lastY}
        r={7}
        className={accent.text}
        fill="currentColor"
        opacity={0.2}
      />
    </svg>
  );
}

interface FilterRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: AccentClasses;
}

function FilterRow({ icon, label, value, accent }: FilterRowProps) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-md ${accent.bg} ${accent.text}`}>
        {icon}
      </span>
      <span className="text-(--color-text-muted) w-16 shrink-0">{label}</span>
      <span className="text-white/85 truncate">{value}</span>
    </div>
  );
}

function DataSource({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <Database className="w-3 h-3 text-(--color-text-muted) shrink-0" />
      <span className="text-white/75 truncate">{label}</span>
    </div>
  );
}

function RelatedQuery({ accent, children }: { accent: AccentClasses; children: React.ReactNode }) {
  return (
    <button className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md border border-white/8 bg-white/2 hover:bg-white/5 transition-colors cursor-pointer group">
      <Search className={`w-3 h-3 text-(--color-text-muted) group-hover:${accent.text} shrink-0`} />
      <span className="text-[11px] text-white/80 group-hover:text-white truncate flex-1">
        {children}
      </span>
    </button>
  );
}
