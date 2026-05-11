import {
  Activity,
  AlertTriangle,
  Bell,
  Bug,
  Database,
  FileText,
  GitBranch,
  History,
  Search,
  Server,
  Sparkles,
  Target,
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

type SignalSource = "alarm" | "log" | "incident" | "change" | "cmdb";

interface Signal {
  time: string;
  source: SignalSource;
  asset?: string;
  title: string;
  detail: string;
  current?: boolean;
}

const SIGNALS: Signal[] = [
  {
    time: "08:54",
    source: "alarm",
    asset: "SRV-MAIL-01",
    title: "CPU eşik üstü",
    detail: "5 dakikalık ortalama %85 → uyarı seviyesi",
  },
  {
    time: "09:00",
    source: "log",
    asset: "Exchange Transport",
    title: "Queue depth tırmanıyor",
    detail: "7.512 mesaj · 60 sn'de +1.200",
  },
  {
    time: "09:07",
    source: "alarm",
    asset: "SRV-MAIL-01",
    title: "Failover eşiği aşıldı (8.000)",
    detail: "Otomatik yedeğe geçiş bekleniyordu ama tetiklenmedi",
  },
  {
    time: "09:11",
    source: "cmdb",
    asset: "queue_threshold",
    title: "Konfigürasyon kaydı eski",
    detail: "Son güncelleme CHG-1102 · 3 gün önce",
  },
  {
    time: "09:14",
    source: "incident",
    asset: "INC-2847",
    title: "Posta sunucusu yanıt vermiyor",
    detail: "Şube ekipleri etkilendi · Selin Yıldız L1",
    current: true,
  },
  {
    time: "09:16",
    source: "incident",
    asset: "+6 dublike",
    title: "MergeAI 6 kaydı INC-2847'ye bağladı",
    detail: "13 dk içinde 7 şube",
  },
];

interface Candidate {
  title: string;
  asset: string;
  confidence: number;
  evidence: string[];
  primary?: boolean;
}

const CANDIDATES: Candidate[] = [
  {
    title: "Kuyruk geçiş eşiği yanlış konfigüre",
    asset: "queue_threshold = 8000 · CHG-1102 sonrası",
    confidence: 87,
    primary: true,
    evidence: [
      "Aktif kuyruk ortalaması 12.000 mesaja yakın seyrediyor — eşik bunun çok altında.",
      "CHG-1102 (3 gün önce) bu parametreyi 5000 → 8000'e çıkardı, gerekçesi 'gürültü azaltma'.",
      "Failover alarmı tam eşik anında 09:07'de tetiklendi ama yedek geçiş tetikleyici çalışmadı.",
      "Aynı parametre ile son 7 günde 4 incident yaşandı (INC-2847 + 3 önceki).",
    ],
  },
  {
    title: "SRV-MAIL-01 disk I/O kontentüsü",
    asset: "STORE-IST-12",
    confidence: 34,
    evidence: [],
  },
  {
    title: "DNS çözümleme gecikmesi",
    asset: "DNS-INT-01",
    confidence: 18,
    evidence: [],
  },
];

const SOURCE_META: Record<SignalSource, { label: string; icon: ReactNode; color: string }> = {
  alarm: { label: "Alarm", icon: <Bell className="w-3 h-3" />, color: "text-red-300 bg-red-500/12 border-red-400/30" },
  log: { label: "Log", icon: <FileText className="w-3 h-3" />, color: "text-amber-300 bg-amber-500/12 border-amber-400/30" },
  incident: { label: "Incident", icon: <Bug className="w-3 h-3" />, color: "text-orange-300 bg-orange-500/12 border-orange-400/30" },
  change: { label: "Change", icon: <GitBranch className="w-3 h-3" />, color: "text-purple-300 bg-purple-500/12 border-purple-400/30" },
  cmdb: { label: "CMDB", icon: <Database className="w-3 h-3" />, color: "text-cyan-300 bg-cyan-500/12 border-cyan-400/30" },
};

export function RootCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const primary = CANDIDATES.find((c) => c.primary) ?? CANDIDATES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Activity className="w-3.5 h-3.5" />}
          title="Korelasyon Çizelgesi · INC-2847"
          meta="Birikim · 20 dk pencere"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <AiBadge label="6 sinyal korele edildi" accent={accent} />
          <Chip tone="info">5 kaynak</Chip>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
            canlı
          </span>
        </div>

        <div className="relative px-5 py-4">
          <div className="absolute top-4 bottom-4 left-12 w-px bg-white/12" />
          <div className="space-y-3.5">
            {SIGNALS.map((s) => {
              const meta = SOURCE_META[s.source];
              return (
                <div key={s.time + s.title} className="relative flex items-start gap-3">
                  <div className="w-7 text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 pt-1">
                    {s.time}
                  </div>
                  <div className="relative shrink-0">
                    <span
                      className={`relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full border ${meta.color} ${
                        s.current ? `ring-2 ${accent.ring}` : ""
                      }`}
                    >
                      {meta.icon}
                    </span>
                    {s.current && (
                      <span className={`absolute inset-0 rounded-full ${accent.dot} opacity-30 animate-ping`} />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-lg border ${
                      s.current ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/2"
                    } px-3 py-2`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[9px] font-mono font-semibold ${meta.color}`}
                      >
                        {trUpper(meta.label)}
                      </span>
                      {s.asset && (
                        <span className="text-[10px] font-mono text-(--color-text-muted)">{s.asset}</span>
                      )}
                      {s.current && (
                        <span className={`ml-auto text-[10px] font-mono font-semibold ${accent.text}`}>
                          {trUpper("incelenen olay")}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-white/90 font-medium">{s.title}</div>
                    <div className="text-[11px] text-(--color-text-muted)">{s.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={accent.glow}>
          <TitleBar
            icon={<Target className="w-3.5 h-3.5" />}
            title="Kök Neden Adayları"
            meta="3 aday"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            {CANDIDATES.map((c) => (
              <CandidateCard key={c.title} candidate={c} accent={accent} />
            ))}
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Kanıt Zinciri"
            meta={`${primary.confidence}% güven`}
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="text-xs font-semibold text-white mb-1">{primary.title}</div>
            <div className="text-[10px] font-mono text-(--color-text-muted) mb-3">
              {primary.asset}
            </div>
            <div className="space-y-2">
              {primary.evidence.map((e, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold mt-0.5`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[11px] text-white/85 leading-snug">{e}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/8 flex items-center gap-2">
              <button
                className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
              >
                <AlertTriangle className="w-3 h-3" />
                Known Error olarak kaydet
              </button>
              <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
                CHG aç
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<History className="w-3.5 h-3.5" />}
            title="Bu Çeyrek · RootCore"
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Korelasyon" value="2.184" trend="sinyal" trendTone="up" />
            <KpiTile label="Kök Neden" value="471" trend="otomatik" trendTone="up" />
            <KpiTile label="MTTR Kazancı" value="38%" trend="↓ 22 dk" trendTone="down" />
            <KpiTile label="Tekrar" value="−54%" trend="known error" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface CandidateCardProps {
  candidate: Candidate;
  accent: AccentClasses;
}

function CandidateCard({ candidate, accent }: CandidateCardProps) {
  return (
    <div
      className={`rounded-xl border ${
        candidate.primary ? accent.border : "border-white/8"
      } ${candidate.primary ? accent.bg : "bg-white/2"} p-3`}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            {candidate.primary && (
              <Search className={`w-3 h-3 ${accent.text} shrink-0`} />
            )}
            <div className={`text-xs font-semibold ${candidate.primary ? "text-white" : "text-white/85"}`}>
              {candidate.title}
            </div>
          </div>
          <div className="text-[10px] font-mono text-(--color-text-muted) flex items-center gap-1.5">
            <Server className="w-2.5 h-2.5" />
            {candidate.asset}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div
            className={`text-base font-semibold tabular-nums ${
              candidate.primary ? accent.text : "text-(--color-text-muted)"
            }`}
          >
            {candidate.confidence}%
          </div>
        </div>
      </div>
      <div className="mt-2 h-1 rounded-full bg-white/8 overflow-hidden">
        <div
          className={`h-full rounded-full ${candidate.primary ? accent.dot : "bg-white/25"}`}
          style={{ width: `${candidate.confidence}%` }}
        />
      </div>
    </div>
  );
}

