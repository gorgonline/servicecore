import {
  Activity,
  AlertTriangle,
  Calendar,
  Cpu,
  Gauge,
  History,
  Package,
  Server,
  ShoppingCart,
  Sparkles,
  TrendingDown,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  Sparkline,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface TimelineEvent {
  date: string;
  label: string;
  detail: string;
  status: "done" | "current" | "future";
}

const TIMELINE: TimelineEvent[] = [
  { date: "Eyl 2022", label: "Satın alma", detail: "PO-4012 · garanti 36 ay", status: "done" },
  { date: "Ekm 2022", label: "Kurulum & Üretim", detail: "Konum: İstanbul DC · Rack 4", status: "done" },
  { date: "Şub 2024", label: "RAM yükseltme", detail: "+128 GB · CHG-0734", status: "done" },
  { date: "May 2026", label: "Sağlık eşik altı", detail: "AI tetikledi · CPU %84 ort.", status: "current" },
  { date: "Oca 2027", label: "Değiştirme önerisi", detail: "AI tahmini · 8 ay sonra", status: "future" },
];

interface MetricRow {
  label: string;
  icon: ReactNode;
  value: string;
  unit?: string;
  values: number[];
  trend: "up" | "down" | "flat";
}

const METRICS: MetricRow[] = [
  {
    label: "CPU ortalaması",
    icon: <Cpu className="w-3 h-3" />,
    value: "84",
    unit: "%",
    values: [42, 48, 51, 55, 58, 62, 68, 72, 75, 78, 81, 84],
    trend: "up",
  },
  {
    label: "Bellek baskısı",
    icon: <Activity className="w-3 h-3" />,
    value: "71",
    unit: "%",
    values: [38, 42, 45, 49, 53, 56, 58, 61, 63, 66, 68, 71],
    trend: "up",
  },
  {
    label: "Disk IOps",
    icon: <Gauge className="w-3 h-3" />,
    value: "32K",
    values: [48, 46, 44, 42, 40, 38, 37, 35, 34, 33, 32, 32],
    trend: "down",
  },
  {
    label: "Tekrar incident",
    icon: <AlertTriangle className="w-3 h-3" />,
    value: "11",
    unit: "ay",
    values: [1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 10, 11],
    trend: "up",
  },
];

interface SimilarAsset {
  id: string;
  name: string;
  health: number;
  remaining: string;
}

const SIMILAR: SimilarAsset[] = [
  { id: "SRV-MAIL-02", name: "Posta Yedek · İstanbul", health: 58, remaining: "14 ay" },
  { id: "SRV-WEB-04", name: "Web Front · İstanbul", health: 38, remaining: "6 ay" },
  { id: "SRV-DB-09", name: "Çekirdek DB · İzmir", health: 71, remaining: "22 ay" },
  { id: "SRV-LOG-02", name: "Log toplayıcı · DR", health: 84, remaining: "30 ay" },
];

export function AssetLifecycleMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Server className="w-3.5 h-3.5" />}
          title="Varlık · Yaşam Döngüsü"
          meta="Birikim · SRV-MAIL-01"
          accent={accent}
        />

        <div className="px-5 py-4 border-b border-white/8 bg-white/2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums">
                  SRV-MAIL-01
                </span>
                <Chip tone="warn">Kritik servis</Chip>
                <Chip>Üretim · 4 yıl</Chip>
              </div>
              <h4 className="text-sm font-semibold text-white tracking-tight">
                Posta Sunucusu Birincil · Dell R750 / 2× Xeon 6338
              </h4>
              <div className="mt-1 text-[11px] font-mono text-(--color-text-muted)">
                İstanbul DC · Rack 4 · Garanti 7 ay kaldı
              </div>
            </div>
            <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5">
              <div className="text-[9px] font-mono font-semibold tracking-[0.18em] text-amber-200">
                {trUpper("sağlık skoru")}
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-amber-200 tabular-nums">42</span>
                <span className="text-base font-semibold text-amber-200/70">%</span>
                <span className="ml-1 inline-flex items-center text-[10px] font-mono text-red-300">
                  <TrendingDown className="w-3 h-3" />
                  −18 / 90 gün
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel accent={accent}>Yaşam Çizelgesi</SectionLabel>
            <span className="text-[10px] font-mono text-(--color-text-muted)">
              5 olay · 2022 → 2027
            </span>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-3 bottom-3 w-px bg-white/12" />
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <TimelineRow key={i} event={t} accent={accent} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Performans Trendi · Son 12 Ay</SectionLabel>
            <Chip>aylık</Chip>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {METRICS.map((m) => (
              <MetricCard key={m.label} metric={m} accent={accent} />
            ))}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="AI Tahmini"
            meta="güven %91"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3.5">
            <div className="flex items-baseline justify-between">
              <SectionLabel accent={accent}>Kalan Verimli Ömür</SectionLabel>
              <AiBadge label="riskli" accent={accent} pulse={false} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white tabular-nums tracking-tight">8</span>
              <span className="text-lg font-semibold text-white/60">ay</span>
              <span className={`ml-auto text-[10px] font-mono ${accent.text}`}>
                Ocak 2027
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: "30%" }} />
              <div className="h-full bg-amber-400 -mt-1.5" style={{ width: "55%", marginLeft: "30%" }} />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-(--color-text-muted) -mt-1">
              <span>Eyl 2022</span>
              <span className={accent.text}>şimdi · 4y 5a</span>
              <span>5y 1a (öneri)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/8">
              <SmallStat icon={<Calendar className="w-3 h-3" />} label="Garanti" value="7 ay" sub="kaldı" />
              <SmallStat icon={<Wrench className="w-3 h-3" />} label="Bakım maliyeti" value="↑ %38" sub="6 ay" />
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<ShoppingCart className="w-3.5 h-3.5" />}
            title="Değiştirme Önerisi"
            meta="2 alternatif"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            <ReplacementOption
              accent={accent}
              model="Dell R760 · 2× Xeon 6438Y"
              vendor="Mevcut tedarikçi · 12 hafta"
              cost="~₺ 1.4M · TCO 5 yıl"
              recommended
            />
            <ReplacementOption
              accent={accent}
              model="HPE DL380 Gen11"
              vendor="Alternatif tedarikçi · 9 hafta"
              cost="~₺ 1.3M · TCO 5 yıl"
            />
            <button
              className={`w-full mt-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
            >
              <Calendar className="w-3 h-3" />
              Değiştirme CHG&apos;si oluştur
            </button>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<History className="w-3.5 h-3.5" />}
            title="Sağlık Skoru Düşen Diğer Varlıklar"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {SIMILAR.map((s) => (
              <SimilarRow key={s.id} row={s} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Package className="w-3.5 h-3.5" />} title="Bu Çeyrek · Lifecycle" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="İzlenen" value="4.812" trend="varlık" trendTone="up" />
            <KpiTile label="Riskli" value="118" trend="sağlık < 50" trendTone="down" />
            <KpiTile label="Önleyici" value="62" trend="değiştirme" trendTone="up" />
            <KpiTile label="Bakım maliyeti" value="−18%" trend="öncesine göre" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface TimelineRowProps {
  event: TimelineEvent;
  accent: AccentClasses;
}

function TimelineRow({ event, accent }: TimelineRowProps) {
  const dotClass =
    event.status === "current"
      ? `${accent.dot} ring-2 ${accent.ring} animate-pulse`
      : event.status === "done"
        ? "bg-emerald-400"
        : "bg-white/25";
  const titleColor =
    event.status === "current" ? "text-white" : event.status === "future" ? "text-white/55" : "text-white/85";
  return (
    <div className="relative flex items-start gap-4 pl-1">
      <span className={`relative z-10 mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${dotClass}`} />
      <div className="flex-1 flex items-start justify-between gap-3">
        <div>
          <div className={`text-xs font-medium ${titleColor}`}>{event.label}</div>
          <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">{event.detail}</div>
        </div>
        <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0">{event.date}</span>
      </div>
    </div>
  );
}

interface MetricCardProps {
  metric: MetricRow;
  accent: AccentClasses;
}

function MetricCard({ metric, accent }: MetricCardProps) {
  const trendColor =
    metric.trend === "up" ? "text-red-300" : metric.trend === "down" ? "text-amber-300" : "text-(--color-text-muted)";
  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md ${accent.bg} ${accent.text}`}>
          {metric.icon}
        </span>
        <span className="text-xs font-medium text-white/85">{metric.label}</span>
        <span className="ml-auto text-sm font-semibold text-white tabular-nums">
          {metric.value}
          {metric.unit && <span className="text-[10px] text-(--color-text-muted) ml-0.5">{metric.unit}</span>}
        </span>
      </div>
      <Sparkline values={metric.values} accent={accent} width={200} height={28} />
      <div className={`mt-1 text-[10px] font-mono ${trendColor}`}>
        {metric.trend === "up" ? "↑ kötüleşiyor" : metric.trend === "down" ? "↓ azalıyor" : "sabit"}
      </div>
    </div>
  );
}

interface SmallStatProps {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
}

function SmallStat({ icon, label, value, sub }: SmallStatProps) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
        {icon}
        <span>{trUpper(label)}</span>
      </div>
      <div className="mt-0.5 text-sm font-semibold text-white">{value}</div>
      <div className="text-[10px] font-mono text-(--color-text-muted)">{sub}</div>
    </div>
  );
}

interface ReplacementOptionProps {
  accent: AccentClasses;
  model: string;
  vendor: string;
  cost: string;
  recommended?: boolean;
}

function ReplacementOption({ accent, model, vendor, cost, recommended = false }: ReplacementOptionProps) {
  return (
    <div
      className={`rounded-xl border ${
        recommended ? accent.border : "border-white/8"
      } ${recommended ? accent.bg : "bg-white/2"} p-3`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Server className={`w-3 h-3 ${recommended ? accent.text : "text-(--color-text-muted)"} shrink-0`} />
        <span className="text-xs font-semibold text-white truncate">{model}</span>
        {recommended && <Chip tone="success">önerilen</Chip>}
      </div>
      <div className="text-[10px] font-mono text-(--color-text-muted) ml-5 space-y-0.5">
        <div>{vendor}</div>
        <div className={recommended ? accent.text : ""}>{cost}</div>
      </div>
    </div>
  );
}

function SimilarRow({ row }: { row: SimilarAsset }) {
  const tone = row.health >= 70 ? "text-emerald-300" : row.health >= 50 ? "text-amber-300" : "text-red-300";
  const barColor = row.health >= 70 ? "bg-emerald-400" : row.health >= 50 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="px-4 py-2.5 flex items-center gap-3">
      <Server className="w-3 h-3 text-(--color-text-muted) shrink-0" />
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 w-20">
        {row.id}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-white/85 truncate">{row.name}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">kalan: {row.remaining}</div>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        <div className="w-14 h-1 rounded-full bg-white/8 overflow-hidden">
          <div className={`h-full ${barColor}`} style={{ width: `${row.health}%` }} />
        </div>
        <span className={`text-[10px] font-mono tabular-nums w-8 text-right ${tone}`}>
          %{row.health}
        </span>
      </div>
    </div>
  );
}
