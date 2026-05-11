import {
  AlertCircle,
  Award,
  Calendar,
  CheckCircle2,
  ChevronUp,
  FileCheck,
  History,
  Scale,
  ShieldAlert,
  ShieldCheck,
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
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface PracticeScore {
  practice: string;
  scope: string;
  score: number;
  delta: number;
  findings: { critical: number; high: number; medium: number };
}

const PRACTICES: PracticeScore[] = [
  {
    practice: "Olay Yönetimi",
    scope: "ITIL4 · ISO 20000-1 §8.6",
    score: 78,
    delta: -4,
    findings: { critical: 3, high: 2, medium: 1 },
  },
  {
    practice: "Problem Yönetimi",
    scope: "ITIL4 · ISO 20000-1 §8.7",
    score: 84,
    delta: +6,
    findings: { critical: 0, high: 1, medium: 2 },
  },
  {
    practice: "Değişiklik Yönetimi",
    scope: "ITIL4 · ISO 20000-1 §8.5",
    score: 92,
    delta: +2,
    findings: { critical: 0, high: 0, medium: 1 },
  },
  {
    practice: "Bilgi Yönetimi",
    scope: "ITIL4 · ISO 20000-1 §8.4",
    score: 86,
    delta: +1,
    findings: { critical: 0, high: 1, medium: 2 },
  },
  {
    practice: "Hizmet Seviyesi",
    scope: "ISO 20000-1 §8.3",
    score: 91,
    delta: -1,
    findings: { critical: 0, high: 0, medium: 2 },
  },
  {
    practice: "Bilgi Güvenliği",
    scope: "ISO 27001 A.5/A.8",
    score: 88,
    delta: +3,
    findings: { critical: 0, high: 1, medium: 1 },
  },
];

interface Finding {
  id: string;
  severity: "critical" | "high" | "medium";
  practice: string;
  standard: string;
  title: string;
  detail: string;
  detectedAt: string;
}

const FINDINGS: Finding[] = [
  {
    id: "AUD-2118",
    severity: "critical",
    practice: "Olay Yönetimi",
    standard: "ITIL4 · post-incident review",
    title: "7 P1 olayında post-mortem dokümantasyonu yok",
    detail: "Son 90 gün · INC-2847 dahil 7 büyük olayda post-incident review eksik.",
    detectedAt: "Sürekli izleme · 11 Mar 14:08",
  },
  {
    id: "AUD-2117",
    severity: "critical",
    practice: "Olay Yönetimi",
    standard: "ISO 20000-1 §8.6.2",
    title: "Major incident kapanış komünikasyonu kanıtlanmamış",
    detail: "3 vakada müşteri bilgilendirmesi kanıtı (kayıt/atıf) tutulmamış.",
    detectedAt: "Sürekli izleme · 11 Mar 14:08",
  },
  {
    id: "AUD-2112",
    severity: "high",
    practice: "Bilgi Yönetimi",
    standard: "ISO 20000-1 §8.4.1",
    title: "Known Error veritabanı güncel değil",
    detail: "RootCore tarafından üretilen 4 known error 7 günden uzun süredir yayına alınmamış.",
    detectedAt: "11 Mar 09:32",
  },
];

const SEV_TONE = {
  critical: { chip: "danger", color: "text-red-300", dot: "bg-red-400", bg: "bg-red-500/12", border: "border-red-400/45" },
  high: { chip: "warn", color: "text-amber-300", dot: "bg-amber-400", bg: "bg-amber-500/10", border: "border-amber-400/35" },
  medium: { chip: "info", color: "text-blue-300", dot: "bg-blue-400", bg: "bg-blue-500/10", border: "border-blue-400/30" },
} as const;

export function AuditCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const totalCritical = PRACTICES.reduce((s, p) => s + p.findings.critical, 0);
  const totalHigh = PRACTICES.reduce((s, p) => s + p.findings.high, 0);
  const totalMedium = PRACTICES.reduce((s, p) => s + p.findings.medium, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<ShieldCheck className="w-3.5 h-3.5" />}
          title="AuditCoreAI · Uyumluluk Konsolu"
          meta="Birikim · sürekli izleme"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <AiBadge label="canlı denetim" accent={accent} />
          <Chip>ITIL4</Chip>
          <Chip>ISO 20000-1</Chip>
          <Chip>ISO 27001</Chip>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-300">
            <Calendar className="w-3 h-3" />
            Dış denetim: 22 gün
          </span>
        </div>

        <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-5">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-4 flex flex-col">
            <SectionLabel accent={accent}>Genel Uyum Skoru</SectionLabel>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white tabular-nums tracking-tight">87</span>
              <span className="text-xl font-semibold text-white/60">%</span>
              <span className="ml-auto text-[10px] font-mono text-emerald-300 inline-flex items-center gap-0.5">
                <ChevronUp className="w-3 h-3" />
                +3 çeyrek
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/8 overflow-hidden">
              <div className={`h-full ${accent.dot}`} style={{ width: "87%" }} />
            </div>
            <div className="mt-1 flex justify-between text-[9px] font-mono text-(--color-text-muted)">
              <span>0</span>
              <span className="text-amber-300">70 hedef</span>
              <span className={accent.text}>87 şimdi</span>
              <span>100</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/8 grid grid-cols-3 gap-2">
              <FindingChip count={totalCritical} severity="critical" label="kritik" />
              <FindingChip count={totalHigh} severity="high" label="yüksek" />
              <FindingChip count={totalMedium} severity="medium" label="orta" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Standart × Practice Skorları</SectionLabel>
              <span className="text-[10px] font-mono text-(--color-text-muted)">6 alan</span>
            </div>
            <div className="space-y-2">
              {PRACTICES.map((p) => (
                <PracticeRow key={p.practice} item={p} accent={accent} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
              {trUpper("Aktif Bulgular · son 7 gün")}
            </span>
            <Chip tone="warn">{trUpper("eylem bekliyor")}</Chip>
          </div>
          <div className="space-y-2">
            {FINDINGS.map((f) => (
              <FindingCard key={f.id} finding={f} accent={accent} />
            ))}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Önerilen Düzeltmeler"
            meta="öncelikli 3"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            <Remediation
              accent={accent}
              icon={<FileCheck className="w-3 h-3" />}
              title="7 P1 olayı için KnowCore taslakları aç"
              link="AUD-2118 → KnowCoreAI"
              effort="2 saat"
              impact="−3 kritik bulgu"
            />
            <Remediation
              accent={accent}
              icon={<Target className="w-3 h-3" />}
              title="Müşteri bilgilendirme şablonu zorunluya al"
              link="AUD-2117 → CallCoreAI iz"
              effort="iş akışı ek adımı"
              impact="kanıtlanabilir kapanış"
            />
            <Remediation
              accent={accent}
              icon={<FileCheck className="w-3 h-3" />}
              title="Known Error yayın akışını sıkılaştır"
              link="AUD-2112 → KBCoreAI"
              effort="şablon güncelle"
              impact="−1 yüksek bulgu"
            />
            <button
              className={`w-full mt-2 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
            >
              <CheckCircle2 className="w-3 h-3" />
              3 düzeltmeyi düzeltme planına ekle
            </button>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<History className="w-3.5 h-3.5" />} title="Çeyreklik Trend" accent={accent} />
          <div className="px-5 py-4">
            <div className="flex items-end gap-2 h-20">
              {[72, 76, 81, 79, 84, 87].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className={`w-full rounded-sm ${i === 5 ? accent.dot : "bg-white/15"}`}
                    style={{ height: `${v}%` }}
                  />
                  <span className={`text-[9px] font-mono ${i === 5 ? accent.text : "text-(--color-text-muted)"} tabular-nums`}>
                    {v}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-6 text-[9px] font-mono text-(--color-text-muted) text-center">
              <span>Ç1-25</span>
              <span>Ç2-25</span>
              <span>Ç3-25</span>
              <span>Ç4-25</span>
              <span>Ç1-26</span>
              <span className={accent.text}>Ç2-26</span>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Award className="w-3.5 h-3.5" />} title="Bu Çeyrek · Audit" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Bulgu" value="48" trend="otomatik" trendTone="up" />
            <KpiTile label="Kapatıldı" value="36" trend="iyileştirme" trendTone="up" />
            <KpiTile label="Yeniden uyum" value="3.4 gün" trend="ortalama" trendTone="down" />
            <KpiTile label="Hazırlık" value="22 gün" trend="dış denetime" trendTone="flat" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface FindingChipProps {
  count: number;
  severity: keyof typeof SEV_TONE;
  label: string;
}

function FindingChip({ count, severity, label }: FindingChipProps) {
  const tone = SEV_TONE[severity];
  return (
    <div className={`rounded-lg border ${tone.border} ${tone.bg} px-2.5 py-1.5`}>
      <div className={`text-base font-semibold tabular-nums ${tone.color}`}>{count}</div>
      <div className="text-[9px] font-mono text-(--color-text-muted) tracking-wider">
        {trUpper(label)}
      </div>
    </div>
  );
}

interface PracticeRowProps {
  item: PracticeScore;
  accent: AccentClasses;
}

function PracticeRow({ item, accent }: PracticeRowProps) {
  const trendColor = item.delta >= 0 ? "text-emerald-300" : "text-red-300";
  const barColor = item.score >= 90 ? "bg-emerald-400" : item.score >= 80 ? accent.dot : "bg-amber-400";
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 p-2.5">
      <div className="flex items-center gap-3">
        <Scale className={`w-3 h-3 text-(--color-text-muted) shrink-0`} />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-white truncate">{item.practice}</div>
          <div className="text-[10px] font-mono text-(--color-text-muted) truncate">{item.scope}</div>
        </div>
        <div className="shrink-0 flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-white tabular-nums">%{item.score}</span>
          <span className={`text-[10px] font-mono tabular-nums ${trendColor}`}>
            {item.delta >= 0 ? "+" : ""}
            {item.delta}
          </span>
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
          <div className={`h-full ${barColor}`} style={{ width: `${item.score}%` }} />
        </div>
        <div className="shrink-0 flex items-center gap-1 text-[9px] font-mono">
          {item.findings.critical > 0 && (
            <span className="text-red-300">{item.findings.critical}K</span>
          )}
          {item.findings.high > 0 && (
            <span className="text-amber-300">{item.findings.high}Y</span>
          )}
          {item.findings.medium > 0 && (
            <span className="text-blue-300">{item.findings.medium}O</span>
          )}
        </div>
      </div>
    </div>
  );
}

interface FindingCardProps {
  finding: Finding;
  accent: AccentClasses;
}

function FindingCard({ finding, accent }: FindingCardProps) {
  const tone = SEV_TONE[finding.severity];
  const sevLabel = finding.severity === "critical" ? "kritik" : finding.severity === "high" ? "yüksek" : "orta";
  return (
    <div className={`rounded-xl border ${tone.border} ${tone.bg} p-3.5`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${tone.border} ${tone.bg} text-[10px] font-mono font-semibold ${tone.color}`}>
          {finding.severity === "critical" ? <ShieldAlert className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
          {trUpper(sevLabel)}
        </span>
        <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums">
          {finding.id}
        </span>
        <span className="text-[10px] font-mono text-(--color-text-muted)">·</span>
        <span className="text-[10px] font-mono text-white/80">{finding.practice}</span>
        <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
          {finding.detectedAt}
        </span>
      </div>
      <div className="text-sm font-semibold text-white mt-0.5">{finding.title}</div>
      <div className="mt-1 text-[11px] text-white/75 leading-snug">{finding.detail}</div>
      <div className={`mt-2 text-[10px] font-mono ${accent.text}`}>{finding.standard}</div>
    </div>
  );
}

interface RemediationProps {
  accent: AccentClasses;
  icon: ReactNode;
  title: string;
  link: string;
  effort: string;
  impact: string;
}

function Remediation({ accent, icon, title, link, effort, impact }: RemediationProps) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 p-3">
      <div className="flex items-start gap-2.5">
        <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md ${accent.bg} ${accent.text} mt-0.5`}>
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-white leading-snug">{title}</div>
          <div className={`mt-0.5 text-[10px] font-mono ${accent.text}`}>{link}</div>
          <div className="mt-1 flex items-center gap-3 text-[10px] font-mono text-(--color-text-muted)">
            <span>efor: {effort}</span>
            <span>·</span>
            <span>etki: {impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
