import {
  AlertTriangle,
  Briefcase,
  Calendar,
  CalendarClock,
  CheckCircle2,
  Flag,
  GitBranch,
  Layers,
  ListChecks,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface Milestone {
  id: string;
  label: string;
  start: number;
  plannedEnd: number;
  actualPct: number;
  forecastEnd: number;
  status: "done" | "current" | "risk" | "future";
}

const MILESTONES: Milestone[] = [
  { id: "M1", label: "Mimari & Tasarım", start: 0, plannedEnd: 14, actualPct: 100, forecastEnd: 16, status: "done" },
  { id: "M2", label: "Kimlik / OAuth", start: 14, plannedEnd: 38, actualPct: 100, forecastEnd: 42, status: "done" },
  { id: "M3", label: "Çekirdek API katmanı", start: 38, plannedEnd: 76, actualPct: 72, forecastEnd: 92, status: "current" },
  { id: "M4", label: "Veri migrasyonu", start: 76, plannedEnd: 110, actualPct: 18, forecastEnd: 132, status: "risk" },
  { id: "M5", label: "Şube uçları + UAT", start: 110, plannedEnd: 152, actualPct: 0, forecastEnd: 168, status: "future" },
  { id: "M6", label: "Canlıya alma", start: 152, plannedEnd: 180, actualPct: 0, forecastEnd: 202, status: "future" },
];

const TOTAL_DAYS = 210;
const PLAN_END = 180;
const FORECAST_END = 202;
const TODAY = 88;

interface Risk {
  title: string;
  detail: string;
  weight: number;
  tone: "danger" | "warn";
}

const RISKS: Risk[] = [
  {
    title: "Velocity son 3 sprintte −%24",
    detail: "Çekirdek API ekibi · 42 → 32 storypoint",
    weight: 38,
    tone: "danger",
  },
  {
    title: "Veri migrasyonu önkoşulu eksik",
    detail: "DB-CORE-01 şema sürümü uyumsuz · CHG-1156 bekliyor",
    weight: 28,
    tone: "danger",
  },
  {
    title: "Bağımlı ekip değişikliği",
    detail: "Network ekibinde Account Manager rotasyonu",
    weight: 18,
    tone: "warn",
  },
  {
    title: "Tatil dönemi",
    detail: "Bayram pencereleri ile 9 iş günü düşüş",
    weight: 16,
    tone: "warn",
  },
];

interface Action {
  icon: ReactNode;
  title: string;
  detail: string;
  delta: string;
}

const ACTIONS: Action[] = [
  {
    icon: <Layers className="w-3 h-3" />,
    title: "M3 kapsamını parçala",
    detail: "Şube uçlarına bağlı olmayan endpoint'leri ayrı sprint'e al",
    delta: "−8 gün",
  },
  {
    icon: <GitBranch className="w-3 h-3" />,
    title: "CHG-1156'yı bu sprint'e çek",
    detail: "Şema sürümünü erken hizala, M4'ün önkoşulu kalkar",
    delta: "−6 gün",
  },
  {
    icon: <Target className="w-3 h-3" />,
    title: "+2 backend developer",
    detail: "Stratos Cloud ekibinden 2 hafta köprü atama",
    delta: "−5 gün",
  },
];

interface PastProject {
  id: string;
  name: string;
  outcome: "zamanında" | "geç" | "iptal";
  delta: string;
}

const PAST: PastProject[] = [
  { id: "PRJ-0212", name: "Mobil bankacılık v3", outcome: "geç", delta: "+18 gün" },
  { id: "PRJ-0184", name: "BES portal yenileme", outcome: "zamanında", delta: "−2 gün" },
  { id: "PRJ-0167", name: "Şube ATM ağı upgrade", outcome: "geç", delta: "+26 gün" },
  { id: "PRJ-0142", name: "Çağrı merkezi modernleşme", outcome: "iptal", delta: "kapsam değişti" },
];

export function ProjectplanpredictMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Briefcase className="w-3.5 h-3.5" />}
          title="Proje · Çekirdek Bankacılık API v2"
          meta="Birikim · PRJ-0247"
          accent={accent}
        />

        <div className="px-5 py-4 border-b border-white/8 bg-white/2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Chip>Çekirdek bankacılık</Chip>
                <Chip>4 ekip · 23 kişi</Chip>
                <Chip tone="warn">Stratejik · CTO sponsoru</Chip>
              </div>
              <h4 className="text-sm font-semibold text-white tracking-tight">
                API v1 → v2 Migrasyonu · 6 milestone
              </h4>
              <div className="mt-1 text-[11px] font-mono text-(--color-text-muted)">
                Başlangıç 1 Ocak · 4. ayın 28. günü · Sprint 12/26
              </div>
            </div>
            <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-right">
              <div className="text-[9px] font-mono font-semibold tracking-[0.18em] text-red-200">
                {trUpper("öngörülen gecikme")}
              </div>
              <div className="mt-1 flex items-baseline gap-1.5 justify-end">
                <TrendingUp className="w-3.5 h-3.5 text-red-300" />
                <span className="text-3xl font-bold text-red-200 tabular-nums">+22</span>
                <span className="text-base font-semibold text-red-200/70">gün</span>
              </div>
              <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">
                tahmini bitiş 22 Tem 2026
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel accent={accent}>Milestone Zaman Çizelgesi</SectionLabel>
            <span className="text-[10px] font-mono text-(--color-text-muted)">6 kilometre taşı</span>
          </div>

          <div className="space-y-2.5">
            {MILESTONES.map((m) => (
              <MilestoneBar key={m.id} milestone={m} total={TOTAL_DAYS} accent={accent} />
            ))}
          </div>

          <div className="mt-4 relative h-6">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center">
              <div className="w-full border-t border-dashed border-white/15" />
            </div>
            <div
              className="absolute top-0 bottom-0 w-px bg-white"
              style={{ left: `${(TODAY / TOTAL_DAYS) * 100}%` }}
            >
              <span
                className={`absolute -top-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${accent.bg} ${accent.text} text-[9px] font-mono border ${accent.border}`}
              >
                bugün · gün 88
              </span>
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-px bg-emerald-400"
              style={{ left: `${(PLAN_END / TOTAL_DAYS) * 100}%` }}
            />
            <span
              className="absolute -bottom-1 text-[9px] font-mono text-emerald-300"
              style={{ left: `${(PLAN_END / TOTAL_DAYS) * 100}%`, transform: "translateX(-50%)" }}
            >
              plan · 30 Haz
            </span>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-px bg-red-400"
              style={{ left: `${(FORECAST_END / TOTAL_DAYS) * 100}%` }}
            />
            <span
              className="absolute -bottom-1 text-[9px] font-mono text-red-300"
              style={{ left: `${(FORECAST_END / TOTAL_DAYS) * 100}%`, transform: "translateX(-50%)" }}
            >
              tahmin · 22 Tem
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[10px] font-mono">
            <span className="text-(--color-text-muted)">{trUpper("renk anahtarı")}</span>
            <LegendChip color="bg-emerald-400/70" label="tamamlandı" />
            <LegendChip color={accent.dot} label="devam ediyor" />
            <LegendChip color="bg-amber-400/70" label="planlanmış" />
            <LegendChip color="bg-red-400/70" label="gecikme tampan" />
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4 grid grid-cols-3 gap-2">
          <KpiTile label="Sprint" value="12/26" trend="46% tamamlandı" trendTone="up" />
          <KpiTile label="Velocity" value="32 SP" trend="−24% 3 sprint" trendTone="down" />
          <KpiTile label="Burndown" value="ideal +9" trend="gün ardı" trendTone="up" />
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
            title="Gecikme Risk Faktörleri"
            meta="4 sinyal"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            {RISKS.map((r) => (
              <RiskRow key={r.title} risk={r} />
            ))}
            <div className="pt-2 mt-1 border-t border-white/8 text-[11px] font-mono text-(--color-text-muted) flex items-center gap-2">
              <Sparkles className={`w-3 h-3 ${accent.text}`} />
              <span>
                Toplam ağırlık 4 sinyalin gecikmeye katkı yüzdesini gösterir; başlıca etken{" "}
                <span className={accent.text}>Velocity düşüşü</span>.
              </span>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Telafi Aksiyonları"
            meta="−19 gün toplam"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            {ACTIONS.map((a) => (
              <ActionRow key={a.title} action={a} accent={accent} />
            ))}
            <div className="pt-2 mt-1 border-t border-white/8 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/85">3 aksiyon uygulanırsa:</span>
              <span className={`text-[11px] font-mono font-semibold ${accent.text}`}>
                +22 gün → +3 gün
              </span>
            </div>
            <button
              className={`w-full text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
            >
              <CheckCircle2 className="w-3 h-3" />
              Hepsini sprint planına ekle
            </button>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<ListChecks className="w-3.5 h-3.5" />}
            title="Benzer Projeler · 24 ay"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {PAST.map((p) => (
              <PastProjectRow key={p.id} project={p} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<CalendarClock className="w-3.5 h-3.5" />} title="Bu Çeyrek · ProjectPredict" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="İzlenen" value="18" trend="proje" trendTone="up" />
            <KpiTile label="Risk altında" value="6" trend="erken uyarı" trendTone="down" />
            <KpiTile label="Telafi" value="42 gün" trend="çeyrek kazancı" trendTone="down" />
            <KpiTile label="Doğruluk" value="91%" trend="tahmin / sonuç" trendTone="up" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface MilestoneBarProps {
  milestone: Milestone;
  total: number;
  accent: AccentClasses;
}

function MilestoneBar({ milestone, total, accent }: MilestoneBarProps) {
  const leftPct = (milestone.start / total) * 100;
  const plannedWidth = ((milestone.plannedEnd - milestone.start) / total) * 100;
  const forecastExtra = ((milestone.forecastEnd - milestone.plannedEnd) / total) * 100;
  const completedWidth = (plannedWidth * milestone.actualPct) / 100;

  const statusTone =
    milestone.status === "done"
      ? "bg-emerald-400/70"
      : milestone.status === "current"
        ? accent.dot
        : milestone.status === "risk"
          ? "bg-amber-400/70"
          : "bg-white/15";

  const statusLabel =
    milestone.status === "done"
      ? "tamamlandı"
      : milestone.status === "current"
        ? "devam ediyor"
        : milestone.status === "risk"
          ? "riskli"
          : "planlanmış";

  const statusColor =
    milestone.status === "done"
      ? "text-emerald-300"
      : milestone.status === "current"
        ? accent.text
        : milestone.status === "risk"
          ? "text-amber-300"
          : "text-(--color-text-muted)";

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums w-6 shrink-0">
          {milestone.id}
        </span>
        <span className="text-[11px] font-medium text-white truncate">{milestone.label}</span>
        <span className={`ml-auto text-[10px] font-mono ${statusColor} shrink-0`}>
          {statusLabel} · %{milestone.actualPct}
        </span>
      </div>
      <div className="relative h-3 rounded-md bg-white/4 overflow-hidden">
        <div
          className={`absolute top-0 h-full ${statusTone}`}
          style={{ left: `${leftPct}%`, width: `${plannedWidth}%`, opacity: milestone.status === "future" ? 0.5 : 1 }}
        />
        {milestone.status !== "done" && completedWidth > 0 && (
          <div
            className={`absolute top-0 h-full ${accent.dot}`}
            style={{ left: `${leftPct}%`, width: `${completedWidth}%` }}
          />
        )}
        {forecastExtra > 0 && (
          <div
            className="absolute top-0 h-full bg-red-400/55 border-l-2 border-red-400/85"
            style={{
              left: `${leftPct + plannedWidth}%`,
              width: `${forecastExtra}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}

interface LegendChipProps {
  color: string;
  label: string;
}

function LegendChip({ color, label }: LegendChipProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`w-2 h-2 rounded-sm ${color}`} />
      <span className="text-(--color-text-muted)">{label}</span>
    </span>
  );
}

function RiskRow({ risk }: { risk: Risk }) {
  const tone = risk.tone === "danger" ? "text-red-300" : "text-amber-300";
  const barColor = risk.tone === "danger" ? "bg-red-400" : "bg-amber-400";
  const Icon = risk.tone === "danger" ? AlertTriangle : Flag;
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-3 h-3 ${tone}`} />
        <span className="text-xs font-medium text-white">{risk.title}</span>
        <span className={`ml-auto text-[10px] font-mono tabular-nums ${tone}`}>%{risk.weight}</span>
      </div>
      <div className="flex items-center gap-2 pl-5">
        <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
          <div className={`h-full ${barColor}`} style={{ width: `${risk.weight}%` }} />
        </div>
      </div>
      <div className="pl-5 mt-1 text-[10px] font-mono text-(--color-text-muted)">{risk.detail}</div>
    </div>
  );
}

interface ActionRowProps {
  action: Action;
  accent: AccentClasses;
}

function ActionRow({ action, accent }: ActionRowProps) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 p-2.5 flex items-start gap-2.5">
      <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md ${accent.bg} ${accent.text} mt-0.5`}>
        {action.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-white">{action.title}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">
          {action.detail}
        </div>
      </div>
      <span className={`shrink-0 text-[11px] font-mono tabular-nums ${accent.text} font-semibold`}>
        {action.delta}
      </span>
    </div>
  );
}

function PastProjectRow({ project }: { project: PastProject }) {
  const tone =
    project.outcome === "zamanında"
      ? { text: "text-emerald-300", icon: <CheckCircle2 className="w-3 h-3" /> }
      : project.outcome === "geç"
        ? { text: "text-amber-300", icon: <AlertTriangle className="w-3 h-3" /> }
        : { text: "text-(--color-text-muted)", icon: <Calendar className="w-3 h-3" /> };

  return (
    <div className="px-4 py-2.5 flex items-center gap-3">
      <span className={tone.text}>{tone.icon}</span>
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 w-16">
        {project.id}
      </span>
      <span className="text-[11px] text-white/85 truncate flex-1">{project.name}</span>
      <span className={`text-[10px] font-mono tabular-nums shrink-0 ${tone.text}`}>
        {project.delta}
      </span>
    </div>
  );
}

