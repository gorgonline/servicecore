import {
  AlertTriangle,
  Award,
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileSignature,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  KpiTile,
  MockFrame,
  SectionLabel,
  Sparkline,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface VendorEntry {
  id: string;
  name: string;
  category: string;
  score: number;
  delta: number;
  risk: "düşük" | "orta" | "yüksek";
  renewalIn: string;
  active?: boolean;
}

const VENDORS: VendorEntry[] = [
  {
    id: "VND-014",
    name: "Aurora Datacom",
    category: "Network · Datacom",
    score: 62,
    delta: -14,
    risk: "yüksek",
    renewalIn: "4 ay",
    active: true,
  },
  {
    id: "VND-021",
    name: "Stratos Cloud",
    category: "IaaS · Bulut",
    score: 87,
    delta: +2,
    risk: "düşük",
    renewalIn: "11 ay",
  },
  {
    id: "VND-007",
    name: "Northwind Bilişim",
    category: "İstemci · Donanım",
    score: 78,
    delta: -3,
    risk: "orta",
    renewalIn: "2 ay",
  },
  {
    id: "VND-031",
    name: "Granit Güvenlik",
    category: "Güvenlik · MSSP",
    score: 91,
    delta: +5,
    risk: "düşük",
    renewalIn: "18 ay",
  },
  {
    id: "VND-018",
    name: "Veridian Yazılım",
    category: "ERP · Yazılım",
    score: 71,
    delta: -2,
    risk: "orta",
    renewalIn: "7 ay",
  },
  {
    id: "VND-042",
    name: "Atlas Lojistik",
    category: "Saha · Kurulum",
    score: 84,
    delta: +1,
    risk: "düşük",
    renewalIn: "14 ay",
  },
];

const DIMENSIONS = [
  { label: "SLA Uyumu", value: 58, tone: "danger" as const },
  { label: "Yanıt Süresi", value: 64, tone: "warn" as const },
  { label: "Maliyet Tutarlılığı", value: 71, tone: "warn" as const },
  { label: "İletişim Kalitesi", value: 56, tone: "danger" as const },
];

const RISK_SIGNALS = [
  {
    label: "SLA ihlali tırmanıyor",
    detail: "Son 90 günde 12 P1 ihlali · 3'ünde ceza kaleminin sınırı aşıldı.",
    tone: "danger" as const,
  },
  {
    label: "Tek temas noktası",
    detail: "Account Manager 6 hafta önce değişti, ikinci kişi atanmadı.",
    tone: "warn" as const,
  },
  {
    label: "Yenileme penceresi yaklaşıyor",
    detail: "Mevcut sözleşme 4 ay sonra dolacak; alternatif tedarikçi değerlendirmesi yok.",
    tone: "warn" as const,
  },
];

export function VendorMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const active = VENDORS.find((v) => v.active) ?? VENDORS[0];
  const sparklineData = [82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 63, 62];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Briefcase className="w-3.5 h-3.5" />}
          title="Tedarikçi Karne Tablosu"
          meta="Birikim · 12 tedarikçi"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <button className={`text-[11px] font-mono px-2 py-1 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}>
            Tümü · 12
          </button>
          <button className="text-[11px] font-mono px-2 py-1 rounded-md text-white/60 hover:bg-white/5 cursor-pointer">
            Risk · 3
          </button>
          <button className="text-[11px] font-mono px-2 py-1 rounded-md text-white/60 hover:bg-white/5 cursor-pointer">
            Yenileme &lt; 6 ay · 4
          </button>
          <AiBadge label="2 uyarı" accent={accent} pulse={false} />
        </div>

        <div className="divide-y divide-white/6">
          {VENDORS.map((v) => (
            <VendorRow key={v.id} vendor={v} accent={accent} />
          ))}
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={accent.glow}>
          <TitleBar
            icon={<Building2 className="w-3.5 h-3.5" />}
            title={active.name}
            meta={`${active.id} · ${active.category}`}
            accent={accent}
          />

          <div className="px-5 py-4 grid grid-cols-[1fr_auto] gap-4 items-start border-b border-white/8 bg-white/2">
            <div>
              <SectionLabel accent={accent}>Tedarikçi Skoru</SectionLabel>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white tabular-nums tracking-tight">
                  {active.score}
                </span>
                <span className="text-lg font-semibold text-white/60">/ 100</span>
                <span className="ml-auto inline-flex items-center text-[11px] font-mono text-red-300">
                  <ChevronDown className="w-3 h-3" />
                  {active.delta} / çeyrek
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-red-400/45 bg-red-500/12 text-[10px] font-mono font-semibold text-red-200">
                <AlertTriangle className="w-3 h-3" />
                {trUpper(`risk: ${active.risk}`)}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-end gap-2">
                <Sparkline values={sparklineData} accent={accent} width={120} height={32} />
              </div>
              <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">12 ay trend</div>
            </div>
          </div>

          <div className="px-5 py-4">
            <SectionLabel>Skor Kırılımı</SectionLabel>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {DIMENSIONS.map((d) => (
                <DimensionPill key={d.label} dim={d} accent={accent} />
              ))}
            </div>
          </div>

          <div className="px-5 py-4 border-t border-white/8">
            <SectionLabel accent={accent}>Risk Sinyalleri</SectionLabel>
            <div className="mt-2 space-y-2">
              {RISK_SIGNALS.map((s, i) => (
                <RiskSignal key={i} signal={s} />
              ))}
            </div>
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Yenileme Önerisi"
            meta="4 ay sonra"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/85 leading-snug">
                Mevcut sözleşmeyi olduğu gibi yenilemek riskli — son 12 ayda skor 14 puan düştü.
                Alternatif tedarikçi keşfi başlatılması önerilir.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <ActionTile
                accent={accent}
                icon={<FileSignature className="w-3 h-3" />}
                label="Madde revize"
                detail="ceza eşiği ↑"
              />
              <ActionTile
                accent={accent}
                icon={<Building2 className="w-3 h-3" />}
                label="Alternatif RFP"
                detail="3 aday"
              />
              <ActionTile
                accent={accent}
                icon={<Calendar className="w-3 h-3" />}
                label="Üst yönetici"
                detail="görüşme planla"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/8">
              <ContractStat label="Sözleşme" value="₺ 4.8M" sub="yıllık" />
              <ContractStat label="Ceza kalemi" value="↑ %52" sub="çeyrek" tone="warn" />
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Award className="w-3.5 h-3.5" />} title="Bu Çeyrek · Vendor" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Tedarikçi" value="12" trend="izlenen" trendTone="flat" />
            <KpiTile label="Risk altında" value="3" trend="dün 1" trendTone="up" />
            <KpiTile label="Yenileme" value="4" trend="6 ay içinde" trendTone="flat" />
            <KpiTile label="Tasarruf" value="₺ 1.8M" trend="yenileme pazarlığı" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface VendorRowProps {
  vendor: VendorEntry;
  accent: AccentClasses;
}

function VendorRow({ vendor, accent }: VendorRowProps) {
  const riskColor =
    vendor.risk === "yüksek" ? "bg-red-400" : vendor.risk === "orta" ? "bg-amber-400" : "bg-emerald-400";
  const scoreColor =
    vendor.score >= 85
      ? "text-emerald-200"
      : vendor.score >= 70
        ? "text-amber-200"
        : "text-red-200";
  const trendColor = vendor.delta >= 0 ? "text-emerald-300" : "text-red-300";
  return (
    <div
      className={`px-4 py-3 flex items-center gap-3 ${vendor.active ? `${accent.bg}/50` : ""}`}
    >
      <span className={`shrink-0 w-1.5 h-10 rounded-full ${riskColor}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
            {vendor.id}
          </span>
          <span className="text-xs font-semibold text-white truncate">{vendor.name}</span>
          {vendor.active && (
            <span className={`text-[9px] font-mono ${accent.text} shrink-0`}>● seçili</span>
          )}
        </div>
        <div className="text-[10px] font-mono text-(--color-text-muted) flex items-center gap-2">
          <span className="truncate">{vendor.category}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <Calendar className="w-2.5 h-2.5" />
            yenileme {vendor.renewalIn}
          </span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="flex items-baseline gap-1">
          <span className={`text-lg font-bold tabular-nums ${scoreColor}`}>{vendor.score}</span>
          <span className="text-[9px] font-mono text-(--color-text-muted)">/100</span>
        </div>
        <div className={`text-[10px] font-mono ${trendColor} tabular-nums flex items-center justify-end gap-0.5`}>
          {vendor.delta >= 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {vendor.delta >= 0 ? "+" : ""}
          {vendor.delta}
        </div>
      </div>
    </div>
  );
}

interface DimensionPillProps {
  dim: { label: string; value: number; tone: "ok" | "warn" | "danger" };
  accent: AccentClasses;
}

function DimensionPill({ dim }: DimensionPillProps) {
  const barColor = dim.tone === "danger" ? "bg-red-400" : dim.tone === "warn" ? "bg-amber-400" : "bg-emerald-400";
  const textColor = dim.tone === "danger" ? "text-red-300" : dim.tone === "warn" ? "text-amber-300" : "text-emerald-300";
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 p-2.5">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11px] text-white/85">{dim.label}</span>
        <span className={`text-xs font-semibold tabular-nums ${textColor}`}>%{dim.value}</span>
      </div>
      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
        <div className={`h-full ${barColor}`} style={{ width: `${dim.value}%` }} />
      </div>
    </div>
  );
}

interface RiskSignalProps {
  signal: { label: string; detail: string; tone: "warn" | "danger" };
}

function RiskSignal({ signal }: RiskSignalProps) {
  const dotColor = signal.tone === "danger" ? "bg-red-400" : "bg-amber-400";
  const iconColor = signal.tone === "danger" ? "text-red-300" : "text-amber-300";
  return (
    <div className="flex items-start gap-2.5">
      <span className="shrink-0 mt-1">
        <span className={`block w-1.5 h-1.5 rounded-full ${dotColor}`} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-white">{signal.label}</span>
          {signal.tone === "danger" && <AlertTriangle className={`w-3 h-3 ${iconColor}`} />}
        </div>
        <p className="text-[11px] text-white/70 leading-snug mt-0.5">{signal.detail}</p>
      </div>
    </div>
  );
}

interface ActionTileProps {
  accent: AccentClasses;
  icon: ReactNode;
  label: string;
  detail: string;
}

function ActionTile({ accent, icon, label, detail }: ActionTileProps) {
  return (
    <button className={`text-left rounded-lg border ${accent.border} ${accent.bg} p-2.5 hover:brightness-110 transition-all cursor-pointer`}>
      <div className={`inline-flex items-center justify-center w-5 h-5 rounded-md bg-white/10 ${accent.text} mb-1.5`}>
        {icon}
      </div>
      <div className="text-[11px] font-medium text-white">{label}</div>
      <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">{detail}</div>
    </button>
  );
}

interface ContractStatProps {
  label: string;
  value: string;
  sub: string;
  tone?: "ok" | "warn";
}

function ContractStat({ label, value, sub, tone = "ok" }: ContractStatProps) {
  const valColor = tone === "warn" ? "text-amber-300" : "text-white";
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2">
      <div className="text-[10px] font-mono text-(--color-text-muted) tracking-wider">
        {trUpper(label)}
      </div>
      <div className={`text-sm font-semibold ${valColor} mt-0.5`}>{value}</div>
      <div className="text-[10px] font-mono text-(--color-text-muted)">{sub}</div>
    </div>
  );
}

