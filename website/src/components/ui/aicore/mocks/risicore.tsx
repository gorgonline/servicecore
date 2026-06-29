import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  History,
  Server,
  ShieldAlert,
  Sparkles,
  TrendingDown,
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

type Band = "critical" | "high" | "medium" | "low";
type ChipTone = "neutral" | "success" | "warn" | "danger" | "info";

interface HeatCellData {
  l: number;
  i: number;
  band: Band;
  count: number;
  selected?: boolean;
  riskId?: string;
}

interface BandLegend {
  key: Band;
  label: string;
  total: number;
}

interface VulnMatch {
  cve: string;
  cvss: string;
  cvssTone: "danger" | "warn";
  ci: string;
  dependency: string;
  confidence: number;
  risk: number;
  current?: boolean;
}

interface RegisterEntry {
  id: string;
  ci: string;
  title: string;
  lxi: string;
  score: number;
  state: string;
  stateTone: ChipTone;
  selected?: boolean;
}

interface MatchedAsset {
  id: string;
  name: string;
  matchNote: string;
  score: number;
}

interface RiskStat {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
}

interface ImprovementStep {
  icon: "CheckCircle2" | "AlertTriangle";
  text: string;
}

interface RiskKpi {
  label: string;
  value: string;
  trend: string;
  trendTone: "up" | "down" | "flat";
}

const HEADER = {
  badge: "342 varlık tarandı",
  chips: [
    { tone: "info" as ChipTone, label: "CVE/NVD senkron · 11 Mar" },
    { tone: "neutral" as ChipTone, label: "ISO 27001 risk kütüphanesi" },
  ],
  live: "son senkron 12 dk",
};

const AXES = {
  yTicks: ["Çok Yüksek", "Yüksek", "Orta", "Düşük", "Çok Düşük"],
  xTicks: ["Çok Düşük", "Düşük", "Orta", "Yüksek", "Çok Yüksek"],
};

const HEAT_CELLS: HeatCellData[] = [
  { l: 5, i: 1, band: "medium", count: 2 },
  { l: 5, i: 2, band: "high", count: 3 },
  { l: 5, i: 3, band: "high", count: 5 },
  { l: 5, i: 4, band: "critical", count: 4 },
  { l: 5, i: 5, band: "critical", count: 1, selected: true, riskId: "RISK-0184" },
  { l: 4, i: 1, band: "low", count: 6 },
  { l: 4, i: 2, band: "medium", count: 9 },
  { l: 4, i: 3, band: "high", count: 7 },
  { l: 4, i: 4, band: "high", count: 6, riskId: "RISK-0162" },
  { l: 4, i: 5, band: "critical", count: 3, riskId: "RISK-0177" },
  { l: 3, i: 1, band: "low", count: 18 },
  { l: 3, i: 2, band: "low", count: 22 },
  { l: 3, i: 3, band: "medium", count: 31 },
  { l: 3, i: 4, band: "medium", count: 12, riskId: "RISK-0151" },
  { l: 3, i: 5, band: "high", count: 4 },
  { l: 2, i: 1, band: "low", count: 29 },
  { l: 2, i: 2, band: "low", count: 34 },
  { l: 2, i: 3, band: "low", count: 21 },
  { l: 2, i: 4, band: "medium", count: 8 },
  { l: 2, i: 5, band: "medium", count: 3 },
  { l: 1, i: 1, band: "low", count: 41 },
  { l: 1, i: 2, band: "low", count: 24 },
  { l: 1, i: 3, band: "low", count: 9, riskId: "RISK-0140" },
  { l: 1, i: 4, band: "low", count: 3 },
  { l: 1, i: 5, band: "low", count: 1 },
];

const BANDS: BandLegend[] = [
  { key: "critical", label: "Kritik", total: 11 },
  { key: "high", label: "Yüksek", total: 34 },
  { key: "medium", label: "Orta", total: 96 },
  { key: "low", label: "Düşük", total: 201 },
];

const VULN_ROWS: VulnMatch[] = [
  {
    cve: "CVE-2024-3185",
    cvss: "9.1",
    cvssTone: "danger",
    ci: "CMDB CI-4471 · SRV-MAIL-01",
    dependency: "bağımlılık: Mobil Bankacılık 2FA",
    confidence: 91,
    risk: 92,
    current: true,
  },
  {
    cve: "CVE-2026-2840",
    cvss: "8.1",
    cvssTone: "danger",
    ci: "CMDB CI-3391 · SRV-DB-09",
    dependency: "bağımlılık: Çekirdek Bankacılık",
    confidence: 89,
    risk: 84,
  },
  {
    cve: "CVE-2026-5108",
    cvss: "7.5",
    cvssTone: "warn",
    ci: "CMDB CI-2207 · SRV-WEB-04",
    dependency: "bağımlılık: API Gateway",
    confidence: 86,
    risk: 76,
  },
  {
    cve: "CVE-2026-1779",
    cvss: "6.4",
    cvssTone: "warn",
    ci: "CMDB CI-1190 · NET-FW-02",
    dependency: "telafi edici kontrol: WAF",
    confidence: 82,
    risk: 64,
  },
];

const REGISTER_ROWS: RegisterEntry[] = [
  {
    id: "RISK-0184",
    ci: "SRV-MAIL-01",
    title: "Exchange 2019 yetkisiz kod yürütme zafiyeti",
    lxi: "5 × 5",
    score: 92,
    state: "Açık",
    stateTone: "danger",
    selected: true,
  },
  {
    id: "RISK-0177",
    ci: "SRV-DB-09",
    title: "TLS 1.0 hâlâ açık · çekirdek DB",
    lxi: "4 × 5",
    score: 84,
    state: "Açık",
    stateTone: "danger",
  },
  {
    id: "RISK-0162",
    ci: "SRV-WEB-04",
    title: "Yama gecikmesi · 38 gün",
    lxi: "4 × 4",
    score: 76,
    state: "İyileştirmede",
    stateTone: "warn",
  },
  {
    id: "RISK-0151",
    ci: "NET-FW-02",
    title: "Eski firmware · destek sonu",
    lxi: "3 × 4",
    score: 64,
    state: "Eşik sınırında",
    stateTone: "warn",
  },
  {
    id: "RISK-0140",
    ci: "SRV-LOG-02",
    title: "Disk doluluk eğilimi · DR",
    lxi: "3 × 3",
    score: 48,
    state: "İzlemede",
    stateTone: "info",
  },
];

const EVIDENCE = {
  selectedTitle: "SRV-MAIL-01 · Exchange 2019 yetkisiz kod yürütme",
  selectedSub: "CVE-2024-3185 · CVSS 9.1 · NVD eşleşti · yama yok",
  chips: [
    { tone: "info" as ChipTone, label: "CVE-2024-3185" },
    { tone: "danger" as ChipTone, label: "CVSS 9.1" },
  ],
  items: [
    "NVD/CVE-2024-3185 bu varlığın yazılım sürümüyle %100 eşleşti; resmî yama henüz yok.",
    "Bu CI son 90 günde 4 P1 incident'e karıştı (INC-2847 dahil), tekrar paterni belirgin.",
    "Servis topolojisi: 14 şube + Mobil Bankacılık 2FA OTP akışı bu sunucudan geçiyor.",
    "Sözleşme: garanti 7 ay sonra bitiyor, CTR-2207 yenileme kaydı henüz açık değil.",
  ],
};

const RESIDUAL = {
  inherent: 92,
  residualValue: 71,
  threshold: 40,
  badge: "eşik üstü",
  trend: [92, 92, 90, 88, 84, 80, 76, 71],
  caption: "yama döngüsünce residual düşüşü",
  stats: [
    {
      icon: <Activity className="w-3 h-3" />,
      label: "Likelihood",
      value: "Çok Yüksek",
      sub: "5 / 5 · KEV benzeri",
    },
    {
      icon: <AlertTriangle className="w-3 h-3" />,
      label: "Impact",
      value: "Çok Yüksek",
      sub: "5 / 5 · 2FA + ödeme",
    },
  ] satisfies RiskStat[],
};

const IMPROVEMENT = {
  headline: "CVE-2024-3185 yaması için acil CHG planla + 2FA OTP yedek SMS kanalını öne al",
  rationale:
    "Son 6 ayda 3 kritik risk aynı yama gecikmesinden doğdu; köprü Sürekli İyileştirme'de açılır.",
  steps: [
    { icon: "CheckCircle2", text: "SRV-MAIL-01 yamasını acil CHG ile planla (CHG-1148)" },
    { icon: "CheckCircle2", text: "2FA OTP yedek SMS kanalını bakım penceresinde öne al" },
    { icon: "AlertTriangle", text: "Telafi edici kontrol: WAF kuralı WAF-RULE-77 etkinleştir" },
  ] satisfies ImprovementStep[],
  chips: [
    { tone: "warn" as ChipTone, label: "known error: KE-0188" },
    { tone: "neutral" as ChipTone, label: "CHG-1148" },
  ],
  cta: "Sürekli İyileştirme önerisi oluştur",
};

const MATCHED_ROWS: MatchedAsset[] = [
  { id: "SRV-DB-09", name: "TLS 1.0 açık · çekirdek DB", matchNote: "CVE eşleşme: 2", score: 84 },
  { id: "SRV-WEB-04", name: "Yama gecikmesi · web front", matchNote: "CVE eşleşme: 1", score: 76 },
  { id: "NET-FW-02", name: "Eski firmware · sınır", matchNote: "CVE eşleşme: 1", score: 64 },
  { id: "SRV-VDI-02", name: "Telafi edici kontrol var", matchNote: "CVE eşleşme: 1", score: 33 },
];

const KPIS: RiskKpi[] = [
  { label: "Taranan", value: "342", trend: "varlık", trendTone: "up" },
  { label: "Eşik üstü", value: "11", trend: "skor > eşik", trendTone: "down" },
  { label: "Kapatılan", value: "47", trend: "iyileştirme", trendTone: "up" },
  { label: "Residual", value: "−38%", trend: "çeyrek başına", trendTone: "down" },
];

const BAND_CELL: Record<Band, string> = {
  critical: "bg-red-500/20 border-red-400/40 text-red-100",
  high: "bg-orange-500/18 border-orange-400/35 text-orange-100",
  medium: "bg-amber-500/14 border-amber-400/30 text-amber-100",
  low: "bg-emerald-500/10 border-emerald-400/25 text-emerald-100/80",
};

const BAND_DOT: Record<Band, string> = {
  critical: "bg-red-400",
  high: "bg-orange-400",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
};

function scoreText(score: number): string {
  return score >= 80 ? "text-red-300" : score >= 60 ? "text-amber-300" : "text-emerald-300";
}

function scoreBar(score: number): string {
  return score >= 80 ? "bg-red-400" : score >= 60 ? "bg-amber-400" : "bg-emerald-400";
}

export function RisiCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<ShieldAlert className="w-3.5 h-3.5" />}
          title="Risk Register · Likelihood × Impact"
          meta="Birikim · 11 Mar · canlı"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2 flex-wrap">
          <AiBadge label={HEADER.badge} accent={accent} />
          {HEADER.chips.map((c) => (
            <Chip key={c.label} tone={c.tone}>
              {c.label}
            </Chip>
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
            {HEADER.live}
          </span>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel accent={accent}>Olasılık × Etki</SectionLabel>
            <span className="text-[10px] font-mono text-(--color-text-muted)">342 varlık · 4 band</span>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center shrink-0">
              <span className="text-[9px] font-mono text-(--color-text-muted) tracking-[0.18em] -rotate-90 whitespace-nowrap">
                {trUpper("Olasılık (Likelihood)")}
              </span>
            </div>

            <div className="flex flex-col shrink-0 pt-0.5">
              {AXES.yTicks.map((t) => (
                <div
                  key={t}
                  className="flex-1 flex items-center justify-end pr-1.5 text-[9px] font-mono text-(--color-text-muted) text-right"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <div className="relative grid grid-cols-5 gap-1.5">
                {HEAT_CELLS.map((cell) => (
                  <HeatCell key={`${cell.l}-${cell.i}`} cell={cell} accent={accent} />
                ))}
                <div
                  className="pointer-events-none absolute inset-0 border-b border-l border-dashed border-white/20 rounded-md"
                  style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
                />
                <span className="pointer-events-none absolute bottom-1 right-1.5 text-[8px] font-mono text-white/40 tracking-[0.14em]">
                  {trUpper("Risk İştahı Eşiği")}
                </span>
              </div>

              <div className="mt-1.5 grid grid-cols-5 gap-1.5">
                {AXES.xTicks.map((t) => (
                  <div
                    key={t}
                    className="text-center text-[9px] font-mono text-(--color-text-muted) truncate"
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="mt-1 text-right text-[9px] font-mono text-(--color-text-muted) tracking-[0.18em]">
                {trUpper("Etki (Impact)")}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 flex-wrap text-[10px] font-mono">
            {BANDS.map((b) => (
              <span key={b.key} className="inline-flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-sm ${BAND_DOT[b.key]}`} />
                <span className="text-white/80">{b.label}</span>
                <span className="text-(--color-text-muted) tabular-nums">{b.total}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel accent={accent}>Zafiyet → Varlık · Akıllı Eşleştirme</SectionLabel>
            <Chip tone="info">NVA-2026-118 · gece senkron</Chip>
          </div>
          <div className="space-y-2">
            {VULN_ROWS.map((row) => (
              <VulnMatchRow key={row.cve} row={row} accent={accent} />
            ))}
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel accent={accent}>Risk Register</SectionLabel>
            <span className="text-[10px] font-mono text-(--color-text-muted)">5 kayıt · skor sıralı</span>
          </div>
          <div className="divide-y divide-white/6">
            {REGISTER_ROWS.map((row) => (
              <RegisterRow key={row.id} row={row} accent={accent} />
            ))}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Seçili Risk · Kanıt Zinciri"
            meta="%91 güven"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="text-xs font-semibold text-white mb-1">{EVIDENCE.selectedTitle}</div>
            <div className="text-[10px] font-mono text-(--color-text-muted) mb-2">
              {EVIDENCE.selectedSub}
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              {EVIDENCE.chips.map((c) => (
                <Chip key={c.label} tone={c.tone}>
                  {c.label}
                </Chip>
              ))}
            </div>
            <div className="space-y-2">
              {EVIDENCE.items.map((item, i) => (
                <EvidenceItem key={i} index={i + 1} text={item} accent={accent} />
              ))}
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Gauge className="w-3.5 h-3.5" />}
            title="Inherent → Residual + Risk İştahı"
            meta="güven %91"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3.5">
            <div className="flex items-baseline justify-between">
              <SectionLabel accent={accent}>Mitigasyon Etkisi</SectionLabel>
              <AiBadge label={RESIDUAL.badge} accent={accent} pulse={false} />
            </div>

            <div className="flex items-end gap-6">
              <div>
                <div className="text-4xl font-bold text-red-300 tabular-nums">{RESIDUAL.inherent}</div>
                <div className="text-[10px] font-mono text-(--color-text-muted)">{trUpper("Inherent")}</div>
              </div>
              <TrendingDown className="w-5 h-5 text-(--color-text-muted) mb-3" />
              <div>
                <div className="text-4xl font-bold text-amber-300 tabular-nums">
                  {RESIDUAL.residualValue}
                </div>
                <div className="text-[10px] font-mono text-(--color-text-muted)">{trUpper("Residual")}</div>
              </div>
            </div>

            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden relative">
              <div className="h-full bg-red-400" style={{ width: `${RESIDUAL.inherent}%` }} />
              <div
                className="h-full bg-amber-400 -mt-1.5"
                style={{ width: `${RESIDUAL.residualValue}%` }}
              />
              <div
                className="absolute top-0 bottom-0 border-l border-dashed border-white/40"
                style={{ left: `${RESIDUAL.threshold}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-(--color-text-muted) -mt-1">
              <span>0</span>
              <span className="text-white/50">eşik {RESIDUAL.threshold}</span>
              <span>100</span>
            </div>

            <Sparkline
              values={RESIDUAL.trend}
              accent={accent}
              width={260}
              height={36}
              showThreshold={RESIDUAL.threshold}
            />
            <div className="text-[10px] font-mono text-(--color-text-muted) -mt-1">{RESIDUAL.caption}</div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/8">
              {RESIDUAL.stats.map((s) => (
                <SmallStat key={s.label} icon={s.icon} label={s.label} value={s.value} sub={s.sub} />
              ))}
            </div>
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<ShieldAlert className="w-3.5 h-3.5" />}
            title="Önerilen İyileştirme"
            meta="CSI-0461 · taslak"
            accent={accent}
          />
          <div className="px-5 py-4">
            <SectionLabel accent={accent}>Sürekli İyileştirme · Öneri</SectionLabel>
            <div className="mt-2 text-xs font-semibold text-white leading-snug">{IMPROVEMENT.headline}</div>
            <div className="mt-1 text-[11px] text-(--color-text-muted) leading-snug">
              {IMPROVEMENT.rationale}
            </div>
            <div className="mt-3 space-y-1.5">
              {IMPROVEMENT.steps.map((step) => (
                <div key={step.text} className="flex items-start gap-2">
                  {step.icon === "CheckCircle2" ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                  )}
                  <span className="text-[11px] text-white/80 leading-snug">{step.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {IMPROVEMENT.chips.map((c) => (
                <Chip key={c.label} tone={c.tone}>
                  {c.label}
                </Chip>
              ))}
            </div>
            <button
              className={`w-full mt-3 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
            >
              <ArrowUpRight className="w-3 h-3" />
              {IMPROVEMENT.cta}
            </button>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<History className="w-3.5 h-3.5" />}
            title="Risk Register'a Eklenen Diğer Varlıklar"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {MATCHED_ROWS.map((row) => (
              <MatchedRow key={row.id} row={row} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<ShieldAlert className="w-3.5 h-3.5" />} title="Bu Çeyrek · Risk" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            {KPIS.map((k) => (
              <KpiTile
                key={k.label}
                label={k.label}
                value={k.value}
                trend={k.trend}
                trendTone={k.trendTone}
              />
            ))}
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface HeatCellProps {
  cell: HeatCellData;
  accent: AccentClasses;
}

function HeatCell({ cell, accent }: HeatCellProps) {
  const base =
    cell.count === 0 ? "bg-white/3 border-white/8 text-white/20" : BAND_CELL[cell.band];
  return (
    <div
      className={`aspect-square rounded-md border flex items-center justify-center relative ${base} ${
        cell.selected ? `ring-2 ${accent.ring} ${accent.border}` : ""
      }`}
    >
      <span className="text-xs font-mono tabular-nums">{cell.count}</span>
      {cell.selected && (
        <span
          className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`}
        />
      )}
    </div>
  );
}

interface VulnMatchRowProps {
  row: VulnMatch;
  accent: AccentClasses;
}

function VulnMatchRow({ row, accent }: VulnMatchRowProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
        row.current ? `${accent.border} ${accent.bg} ring-1 ${accent.ring}` : "border-white/8 bg-white/2"
      }`}
    >
      <div className="shrink-0">
        <div className="text-[11px] font-mono font-semibold text-white">{row.cve}</div>
        <span
          className={`text-[10px] font-mono ${
            row.cvssTone === "danger" ? "text-red-300" : "text-amber-300"
          }`}
        >
          CVSS {row.cvss}
        </span>
      </div>
      <ArrowRight className={`w-4 h-4 shrink-0 ${accent.text}`} />
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-mono text-white/85 truncate">{row.ci}</div>
        <Chip>{row.dependency}</Chip>
      </div>
      <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0 hidden sm:inline">
        eşleşme %{row.confidence}
      </span>
      <span className={`text-sm font-semibold tabular-nums shrink-0 ${scoreText(row.risk)}`}>
        {row.risk}
      </span>
      {row.current && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot} animate-pulse`} />
      )}
    </div>
  );
}

interface RegisterRowProps {
  row: RegisterEntry;
  accent: AccentClasses;
}

function RegisterRow({ row, accent }: RegisterRowProps) {
  return (
    <div className={`relative flex items-center gap-3 px-1 py-2.5 ${row.selected ? "bg-white/5" : ""}`}>
      {row.selected && (
        <span className={`absolute left-0 top-1 bottom-1 w-0.5 rounded-full ${accent.dot}`} />
      )}
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums w-20 shrink-0 pl-2">
        {row.id}
      </span>
      <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0 w-24 truncate">
        {row.ci}
      </span>
      <span className="text-xs text-white/90 truncate flex-1">{row.title}</span>
      <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0 hidden sm:inline">
        L×I {row.lxi}
      </span>
      <span className={`text-sm font-semibold tabular-nums w-8 text-right shrink-0 ${scoreText(row.score)}`}>
        {row.score}
      </span>
      <Chip tone={row.stateTone}>{row.state}</Chip>
    </div>
  );
}

interface EvidenceItemProps {
  index: number;
  text: string;
  accent: AccentClasses;
}

function EvidenceItem({ index, text, accent }: EvidenceItemProps) {
  return (
    <div className="flex items-start gap-2">
      <span
        className={`shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold mt-0.5`}
      >
        {index}
      </span>
      <p className="text-[11px] text-white/85 leading-snug">{text}</p>
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

function MatchedRow({ row }: { row: MatchedAsset }) {
  return (
    <div className="px-4 py-2.5 flex items-center gap-3">
      <Server className="w-3 h-3 text-(--color-text-muted) shrink-0" />
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 w-20">
        {row.id}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-white/85 truncate">{row.name}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{row.matchNote}</div>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        <div className="w-14 h-1 rounded-full bg-white/8 overflow-hidden">
          <div className={`h-full ${scoreBar(row.score)}`} style={{ width: `${row.score}%` }} />
        </div>
        <span className={`text-[10px] font-mono tabular-nums w-6 text-right ${scoreText(row.score)}`}>
          {row.score}
        </span>
      </div>
    </div>
  );
}
