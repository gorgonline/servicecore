import {
  AlertOctagon,
  Bell,
  CloudLightning,
  Flame,
  Server,
  Shield,
  Users,
  Volume2,
  VolumeX,
  Waves,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface StormCluster {
  id: string;
  service: string;
  icon: ReactNode;
  alarmCount: number;
  windowMin: number;
  topAsset: string;
  team: string;
  severity: "kritik" | "yüksek" | "orta";
  active?: boolean;
}

const CLUSTERS: StormCluster[] = [
  {
    id: "STORM-A",
    service: "SRV-MAIL kümesi",
    icon: <Server className="w-3.5 h-3.5" />,
    alarmCount: 52,
    windowMin: 6,
    topAsset: "SRV-MAIL-01 + 8 bağlı",
    team: "Mesajlaşma Ekibi",
    severity: "kritik",
    active: true,
  },
  {
    id: "STORM-B",
    service: "Edge / WAN ağı",
    icon: <Waves className="w-3.5 h-3.5" />,
    alarmCount: 28,
    windowMin: 4,
    topAsset: "FW-EDGE-03 + DNS-INT-01",
    team: "Ağ Operasyon",
    severity: "yüksek",
  },
  {
    id: "STORM-C",
    service: "VPN Gateway",
    icon: <Shield className="w-3.5 h-3.5" />,
    alarmCount: 14,
    windowMin: 2,
    topAsset: "VPN-GW-02",
    team: "Kimlik & Erişim",
    severity: "orta",
  },
];

const HEATMAP_SERVICES = ["Posta", "WAN/Edge", "VPN", "Çekirdek DB", "Yedekleme"];

const HEATMAP: number[][] = [
  [0, 1, 2, 4, 5, 4, 3, 2, 2, 1, 1, 0],
  [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 1, 0],
  [0, 0, 0, 1, 1, 2, 3, 4, 3, 2, 1, 0],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
];

const SUPPRESSED = [
  { source: "Posta", correlated: 184, kind: "queue/cpu kombinasyonu" },
  { source: "WAN/Edge", correlated: 96, kind: "BGP flap zinciri" },
  { source: "VPN", correlated: 41, kind: "auth retry kümeleri" },
];

function heatColor(v: number): string {
  if (v === 0) return "bg-white/4";
  if (v === 1) return "bg-amber-500/20";
  if (v === 2) return "bg-amber-500/35";
  if (v === 3) return "bg-amber-500/55";
  if (v === 4) return "bg-orange-500/65";
  return "bg-red-500/75";
}

export function StormMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const totalAlarms = CLUSTERS.reduce((sum, c) => sum + c.alarmCount, 0);
  const totalSuppressed = SUPPRESSED.reduce((sum, s) => sum + s.correlated, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<CloudLightning className="w-3.5 h-3.5" />}
          title="StormAI · Operasyon Konsolu"
          meta="Birikim · son 12 dk"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-amber-500/8 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-red-400/55 bg-red-500/22 text-[10px] font-mono font-semibold text-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {trUpper("aktif fırtına")}
          </span>
          <span className="text-xs text-white/85">
            <span className="font-semibold tabular-nums">{totalAlarms}</span> alarm ·{" "}
            <span className="font-semibold tabular-nums">3</span> küme · 12 dakikalık pencere
          </span>
          <AiBadge label="canlı korele" accent={accent} />
          <button className="ml-auto text-[11px] font-mono px-2 py-1 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5">
            <VolumeX className="w-3 h-3" />
            Geçici sustur
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
              {trUpper("Yoğunluk Haritası · Servis × Dakika")}
            </span>
            <div className="flex items-center gap-1 text-[9px] font-mono text-(--color-text-muted)">
              <span>az</span>
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <span key={v} className={`w-3 h-3 rounded-sm ${heatColor(v)}`} />
              ))}
              <span>çok</span>
            </div>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
            {HEATMAP_SERVICES.map((svc, rowIdx) => (
              <div key={svc} className="contents">
                <div className="text-[10px] font-mono text-white/85 truncate text-right pr-1">
                  {svc}
                </div>
                <div className="grid grid-cols-12 gap-0.5">
                  {HEATMAP[rowIdx].map((v, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm ${heatColor(v)} border border-white/4`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1.5 grid grid-cols-[80px_1fr] gap-2 items-center">
            <div />
            <div className="grid grid-cols-12 text-[8px] font-mono text-(--color-text-muted) tabular-nums">
              <span>−12</span>
              <span />
              <span>−10</span>
              <span />
              <span>−8</span>
              <span />
              <span>−6</span>
              <span />
              <span>−4</span>
              <span />
              <span>−2</span>
              <span className={accent.text}>şimdi</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
              {trUpper("Aktif Fırtına Kümeleri")}
            </span>
            <Chip>{trUpper("3 paralel")}</Chip>
          </div>
          <div className="space-y-2.5">
            {CLUSTERS.map((c) => (
              <ClusterCard key={c.id} cluster={c} accent={accent} />
            ))}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Volume2 className="w-3.5 h-3.5" />}
            title="Gürültü Bastırma"
            meta={`${totalSuppressed} alarm filtrelendi`}
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                {trUpper("Gerçek vs. Korele")}
              </span>
              <div className="flex items-baseline gap-2 text-xs">
                <span className="font-mono text-white tabular-nums">{totalAlarms}</span>
                <span className="text-(--color-text-muted)">/</span>
                <span className={`font-mono ${accent.text} tabular-nums`}>
                  {totalAlarms + totalSuppressed}
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/8 overflow-hidden flex">
              <div className={`h-full ${accent.dot}`} style={{ width: `${(totalAlarms / (totalAlarms + totalSuppressed)) * 100}%` }} />
              <div className="h-full bg-emerald-500/50" style={{ width: `${(totalSuppressed / (totalAlarms + totalSuppressed)) * 100}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className={accent.text}>{totalAlarms} işleme alındı</span>
              <span className="text-emerald-300">{totalSuppressed} korele edildi (sessizleştirildi)</span>
            </div>
          </div>
          <div className="border-t border-white/8 divide-y divide-white/6">
            {SUPPRESSED.map((s) => (
              <div key={s.source} className="px-5 py-2.5 flex items-center gap-3">
                <span className="text-xs font-medium text-white/85 w-20 shrink-0 truncate">
                  {s.source}
                </span>
                <span className="text-[10px] font-mono text-(--color-text-muted) flex-1 truncate">
                  {s.kind}
                </span>
                <span className="text-xs font-semibold text-emerald-300 tabular-nums shrink-0">
                  −{s.correlated}
                </span>
              </div>
            ))}
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Users className="w-3.5 h-3.5" />}
            title="Önerilen Ekip Rotası"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            <RouteRow team="Mesajlaşma Ekibi" cluster="STORM-A" lead="Mert Kaya" load="2 P1 yüklü" priority="kritik" accent={accent} />
            <RouteRow team="Ağ Operasyon" cluster="STORM-B" lead="Burak Aslan" load="boşta" priority="yüksek" accent={accent} />
            <RouteRow team="Kimlik & Erişim" cluster="STORM-C" lead="Selin Yıldız" load="boşta" priority="orta" accent={accent} />
            <div className="pt-2 mt-1 border-t border-white/8 flex items-center gap-2 text-[11px] font-mono text-(--color-text-muted)">
              <Flame className={`w-3 h-3 ${accent.text}`} />
              Üç kümeye paralel devam edilirse fırtına 14 dakikada kapanır.
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Zap className="w-3.5 h-3.5" />} title="Bu Çeyrek · Storm" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Fırtına" value="38" trend="korele edildi" trendTone="up" />
            <KpiTile label="Bastırılan" value="12.4K" trend="alarm gürültüsü" trendTone="down" />
            <KpiTile label="Ort. Süre" value="−42%" trend="kapanış" trendTone="down" />
            <KpiTile label="Kontrolsüz" value="0" trend="bu çeyrek" trendTone="flat" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface ClusterCardProps {
  cluster: StormCluster;
  accent: AccentClasses;
}

function ClusterCard({ cluster, accent }: ClusterCardProps) {
  const sevTone =
    cluster.severity === "kritik"
      ? "border-red-400/45 bg-red-500/10"
      : cluster.severity === "yüksek"
        ? "border-amber-400/45 bg-amber-500/10"
        : "border-blue-400/35 bg-blue-500/8";
  const sevText =
    cluster.severity === "kritik"
      ? "text-red-200"
      : cluster.severity === "yüksek"
        ? "text-amber-200"
        : "text-blue-200";

  return (
    <div
      className={`rounded-xl border ${
        cluster.active ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/2"
      } p-3.5`}
    >
      <div className="flex items-center gap-3">
        <span className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border ${sevTone} ${sevText}`}>
          {cluster.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums">
              {cluster.id}
            </span>
            <span className="text-sm font-semibold text-white truncate">{cluster.service}</span>
            <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-md border text-[9px] font-mono font-semibold ${sevTone} ${sevText}`}>
              {trUpper(cluster.severity)}
            </span>
          </div>
          <div className="text-[10px] font-mono text-(--color-text-muted) flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Bell className="w-2.5 h-2.5" />
              {cluster.alarmCount} alarm
            </span>
            <span>·</span>
            <span>{cluster.windowMin} dakika içinde</span>
            <span>·</span>
            <span>{cluster.topAsset}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[10px] font-mono text-(--color-text-muted)">{trUpper("önerilen")}</div>
          <div className="text-xs font-medium text-white">{cluster.team}</div>
        </div>
      </div>
      {cluster.active && (
        <div className="mt-3 pt-3 border-t border-white/8 flex items-center gap-2">
          <button
            className={`text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center gap-1.5`}
          >
            <AlertOctagon className="w-3 h-3" />
            Major incident aç
          </button>
          <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            Ekibe rota gönder
          </button>
        </div>
      )}
    </div>
  );
}

interface RouteRowProps {
  team: string;
  cluster: string;
  lead: string;
  load: string;
  priority: "kritik" | "yüksek" | "orta";
  accent: AccentClasses;
}

function RouteRow({ team, cluster, lead, load, priority, accent }: RouteRowProps) {
  const tone =
    priority === "kritik" ? "danger" : priority === "yüksek" ? "warn" : "info";
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${accent.border} ${accent.bg}/60`}>
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 w-16">
        {cluster}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-white truncate">{team}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">
          {lead} · {load}
        </div>
      </div>
      <Chip tone={tone}>{trUpper(priority)}</Chip>
    </div>
  );
}
