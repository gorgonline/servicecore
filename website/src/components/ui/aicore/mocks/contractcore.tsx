import {
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileSignature,
  Highlighter,
  Scale,
  Search,
  ShieldAlert,
  Sparkles,
  Timer,
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

type HighlightKind = "sla" | "penalty" | "renewal" | "risk" | "party";

const HIGHLIGHT_TONE: Record<HighlightKind, string> = {
  sla: "bg-blue-500/22 text-blue-100 border-b-2 border-blue-400/70",
  penalty: "bg-red-500/22 text-red-100 border-b-2 border-red-400/70",
  renewal: "bg-amber-500/22 text-amber-100 border-b-2 border-amber-400/70",
  risk: "bg-purple-500/22 text-purple-100 border-b-2 border-purple-400/70",
  party: "bg-emerald-500/18 text-emerald-100 border-b-2 border-emerald-400/65",
};

const HIGHLIGHT_LABEL: Record<HighlightKind, string> = {
  sla: "SLA",
  penalty: "Ceza",
  renewal: "Yenileme",
  risk: "Risk",
  party: "Taraf",
};

interface SlaItem {
  metric: string;
  target: string;
  measure: string;
}

const SLA_ITEMS: SlaItem[] = [
  { metric: "Servis erişilebilirlik", target: "99.9%", measure: "ayık takvim, aylık" },
  { metric: "P1 yanıt süresi", target: "≤ 30 dk", measure: "iş saatleri" },
  { metric: "P1 çözüm süresi", target: "≤ 4 saat", measure: "iş saatleri" },
];

interface PenaltyItem {
  trigger: string;
  threshold: string;
  amount: string;
  active?: boolean;
}

const PENALTIES: PenaltyItem[] = [
  {
    trigger: "Erişilebilirlik < %99.5",
    threshold: "aylık kümülatif",
    amount: "%5 fatura kesintisi",
    active: true,
  },
  {
    trigger: "P1 yanıt > 30 dk",
    threshold: "vakaya göre",
    amount: "₺ 12.500 / olay",
    active: true,
  },
  {
    trigger: "Çözüm > 4 saat",
    threshold: "vakaya göre",
    amount: "₺ 18.000 / olay",
  },
];

interface KeyDate {
  date: string;
  label: string;
  daysLeft: number;
  status: "soon" | "future" | "passed";
}

const DATES: KeyDate[] = [
  { date: "30 Haz 2026", label: "Yenileme penceresi açılır", daysLeft: 51, status: "soon" },
  { date: "31 Tem 2026", label: "İhbar son gün (otomatik yenilenir)", daysLeft: 82, status: "soon" },
  { date: "15 Eyl 2026", label: "Mevcut dönem sonu", daysLeft: 128, status: "future" },
];

const RISK_CLAUSES = [
  {
    title: "Otomatik yenileme · 30 gün ihbar",
    detail:
      "Madde 14.3 — Yazılı ihbar 30 günden az ise sözleşme aynı koşullarda 12 ay daha uzar.",
    severity: "yüksek" as const,
  },
  {
    title: "Ceza üst sınırı %15",
    detail: "Madde 11.7 — Ceza kalemleri yıllık fatura tutarının %15'ini geçemez.",
    severity: "orta" as const,
  },
];

export function ContractCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<FileSignature className="w-3.5 h-3.5" />}
          title="Sözleşme Tarayıcı · CTR-2118"
          meta="Aurora Datacom · 24 sayfa"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <AiBadge label="42 madde ayıklandı" accent={accent} />
          <Chip>Türkçe + İngilizce</Chip>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-mono text-(--color-text-muted)">
            <Search className="w-3 h-3" />
            tam metin OCR
          </span>
        </div>

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <Highlighter className="w-3 h-3 text-(--color-text-muted)" />
          <span className="text-[10px] font-mono text-(--color-text-muted) mr-1">
            {trUpper("renk anahtarı")}
          </span>
          {(["sla", "penalty", "renewal", "risk", "party"] as HighlightKind[]).map((k) => (
            <LegendBadge key={k} kind={k} />
          ))}
        </div>

        <div className="px-5 py-4">
          <div className="rounded-xl border border-white/10 bg-white/3 p-5 font-mono text-[11px] leading-relaxed text-white/85 space-y-3 min-h-96">
            <div className="flex items-center justify-between text-[10px] text-(--color-text-muted) tracking-wider">
              <span>{trUpper("sayfa 7 / 24")}</span>
              <span>{trUpper("madde 8 — hizmet seviyesi taahhütleri")}</span>
            </div>

            <p>
              8.1 <Mark kind="party">Sağlayıcı</Mark>, sözleşme süresince{" "}
              <Mark kind="sla">Servis Erişilebilirliği</Mark> için{" "}
              <Mark kind="sla">aylık ortalama %99,9 (dokuz dokuz dokuz) erişilebilirlik</Mark>{" "}
              taahhüt eder. Bu değerin altında kalan her ay için aşağıdaki tabloya göre{" "}
              <Mark kind="penalty">ceza kalemi</Mark> uygulanır.
            </p>

            <p>
              8.2 <Mark kind="party">Sağlayıcı</Mark>, P1 önceliği ile bildirilen olaylara{" "}
              <Mark kind="sla">en geç otuz (30) dakika</Mark> içinde yanıt verecek ve{" "}
              <Mark kind="sla">en geç dört (4) saat içinde çözüm</Mark> üretecektir. Yanıt
              veya çözüm sürelerinin aşıldığı her bir olay için{" "}
              <Mark kind="penalty">ilgili ceza tutarı kesilir</Mark>.
            </p>

            <p>
              8.3 Toplam ceza kalemleri, ilgili dönemin yıllık fatura tutarının{" "}
              <Mark kind="risk">%15 üst sınırını</Mark> aşamaz.
            </p>

            <div className="border-t border-white/10 pt-3" />

            <div className="flex items-center justify-between text-[10px] text-(--color-text-muted) tracking-wider">
              <span>{trUpper("sayfa 14 / 24")}</span>
              <span>{trUpper("madde 14 — yenileme ve fesih")}</span>
            </div>

            <p>
              14.1 Sözleşmenin yürürlük tarihi <Mark kind="renewal">16 Eylül 2025</Mark>, ilk
              dönem süresi 12 aydır.
            </p>

            <p>
              14.3 <Mark kind="risk">Sözleşme, taraflarca en az 30 gün öncesinden yazılı ihbar
              edilmediği takdirde aynı koşullarla 12 ay süre ile otomatik olarak yenilenir.</Mark>{" "}
              İhbar e-posta veya KEP yoluyla yapılabilir.
            </p>

            <p>
              14.4 Yenileme penceresi <Mark kind="renewal">30 Haziran 2026</Mark> tarihinde
              açılır ve <Mark kind="renewal">31 Temmuz 2026</Mark> tarihinde sona erer.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
              <ChevronLeft className="w-3 h-3" />
              Önceki
            </button>
            <span className="text-[10px] font-mono text-(--color-text-muted)">
              sayfa 7-14 atlamalı (madde 8 & 14)
            </span>
            <button className="ml-auto inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
              Sonraki
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Scale className="w-3.5 h-3.5" />}
            title="Ayıklanan SLA Maddeleri"
            meta="3 madde"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {SLA_ITEMS.map((s) => (
              <SlaRow key={s.metric} item={s} accent={accent} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
            title="Ceza Kalemleri"
            meta="2 aktif"
            accent={accent}
          />
          <div className="px-1 py-1">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-(--color-text-muted) text-[9px] font-mono tracking-wider border-b border-white/8">
                  <th className="text-left px-3 py-1.5">{trUpper("Tetikleyici")}</th>
                  <th className="text-left px-2 py-1.5">{trUpper("Tutar")}</th>
                  <th className="text-right px-3 py-1.5">{trUpper("Durum")}</th>
                </tr>
              </thead>
              <tbody>
                {PENALTIES.map((p) => (
                  <tr key={p.trigger} className="border-b border-white/6 last:border-b-0">
                    <td className="px-3 py-2 align-top">
                      <div className="text-white/85 font-medium">{p.trigger}</div>
                      <div className="text-[9px] font-mono text-(--color-text-muted)">
                        {p.threshold}
                      </div>
                    </td>
                    <td className="px-2 py-2 align-top">
                      <span className="text-red-300 font-mono">{p.amount}</span>
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      {p.active ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-red-300">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          {trUpper("aktif")}
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-(--color-text-muted)">
                          {trUpper("eşik aşılmadı")}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Calendar className="w-3.5 h-3.5" />}
            title="Önemli Tarihler"
            meta="yenileme"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            {DATES.map((d) => (
              <DateRow key={d.label} date={d} accent={accent} />
            ))}
            <div className="pt-2 mt-1 border-t border-white/8 flex items-center gap-2 text-[11px]">
              <Sparkles className={`w-3 h-3 ${accent.text}`} />
              <span className="text-white/80">
                Otomatik yenileme klozu nedeniyle ihbarı{" "}
                <span className={`${accent.text} font-semibold`}>en geç 31 Temmuz&apos;a</span>{" "}
                kadar göndermek zorunlu.
              </span>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<ShieldAlert className="w-3.5 h-3.5" />}
            title="Riskli Maddeler"
            meta="2 işaretli"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {RISK_CLAUSES.map((c, i) => (
              <RiskClause key={i} clause={c} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<FileSignature className="w-3.5 h-3.5" />} title="Bu Çeyrek · Contract" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Sözleşme" value="284" trend="taranan" trendTone="up" />
            <KpiTile label="Riskli madde" value="38" trend="işaretli" trendTone="flat" />
            <KpiTile label="İhbar kaçırma" value="0" trend="bu çeyrek" trendTone="down" />
            <KpiTile label="Hazırlık" value="−61%" trend="yenileme süresi" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface MarkProps {
  kind: HighlightKind;
  children: ReactNode;
}

function Mark({ kind, children }: MarkProps) {
  return <span className={`${HIGHLIGHT_TONE[kind]} rounded-sm px-0.5`}>{children}</span>;
}

function LegendBadge({ kind }: { kind: HighlightKind }) {
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono ${HIGHLIGHT_TONE[kind]}`}>
      {HIGHLIGHT_LABEL[kind]}
    </span>
  );
}

interface SlaRowProps {
  item: SlaItem;
  accent: AccentClasses;
}

function SlaRow({ item, accent }: SlaRowProps) {
  return (
    <div className="px-5 py-3 flex items-center gap-3">
      <Timer className={`w-3.5 h-3.5 ${accent.text} shrink-0`} />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-white">{item.metric}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{item.measure}</div>
      </div>
      <span className={`text-sm font-semibold tabular-nums ${accent.text}`}>{item.target}</span>
    </div>
  );
}

interface DateRowProps {
  date: KeyDate;
  accent: AccentClasses;
}

function DateRow({ date, accent }: DateRowProps) {
  const tone =
    date.status === "soon" ? "text-amber-300" : date.status === "passed" ? "text-(--color-text-muted)" : "text-white/85";
  return (
    <div className="flex items-center gap-3">
      <span
        className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md ${accent.bg} ${accent.text}`}
      >
        <Calendar className="w-3 h-3" />
      </span>
      <div className="min-w-0 flex-1">
        <div className={`text-xs font-medium ${tone}`}>{date.label}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{date.date}</div>
      </div>
      <span className={`text-[10px] font-mono tabular-nums shrink-0 ${tone}`}>{date.daysLeft} gün</span>
    </div>
  );
}

interface RiskClauseProps {
  clause: { title: string; detail: string; severity: "yüksek" | "orta" };
}

function RiskClause({ clause }: RiskClauseProps) {
  const tone =
    clause.severity === "yüksek"
      ? { border: "border-red-400/45", bg: "bg-red-500/10", color: "text-red-300" }
      : { border: "border-amber-400/40", bg: "bg-amber-500/10", color: "text-amber-300" };

  return (
    <div className="px-5 py-3">
      <div className="flex items-center gap-2 mb-1">
        <ShieldAlert className={`w-3 h-3 ${tone.color}`} />
        <span className="text-xs font-semibold text-white">{clause.title}</span>
        <span
          className={`ml-auto inline-flex items-center px-1.5 py-0.5 rounded-md border text-[9px] font-mono font-semibold ${tone.border} ${tone.bg} ${tone.color}`}
        >
          {trUpper(clause.severity)}
        </span>
      </div>
      <p className="text-[11px] text-white/75 leading-snug pl-5">{clause.detail}</p>
    </div>
  );
}

