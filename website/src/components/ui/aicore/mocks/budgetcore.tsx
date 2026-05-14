import {
  AlertTriangle,
  ArrowDownRight,
  Banknote,
  Cloud,
  CreditCard,
  PiggyBank,
  Server,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface CategoryRow {
  label: string;
  icon: ReactNode;
  planned: number;
  actual: number;
  forecast: number;
  status: "over" | "ok" | "under";
}

const CATEGORIES: CategoryRow[] = [
  {
    label: "Yazılım Lisansı",
    icon: <CreditCard className="w-3 h-3" />,
    planned: 9.2,
    actual: 3.4,
    forecast: 10.6,
    status: "over",
  },
  {
    label: "Cloud / Egress",
    icon: <Cloud className="w-3 h-3" />,
    planned: 6.4,
    actual: 2.9,
    forecast: 9.1,
    status: "over",
  },
  {
    label: "Donanım",
    icon: <Server className="w-3 h-3" />,
    planned: 7.0,
    actual: 2.1,
    forecast: 6.4,
    status: "under",
  },
  {
    label: "Bakım & Destek",
    icon: <Wrench className="w-3 h-3" />,
    planned: 3.2,
    actual: 0.9,
    forecast: 2.8,
    status: "ok",
  },
  {
    label: "Eğitim & Diğer",
    icon: <Banknote className="w-3 h-3" />,
    planned: 2.2,
    actual: 0.5,
    forecast: 2.3,
    status: "ok",
  },
];

const MONTHLY_PLAN = [2.0, 2.0, 2.4, 2.4, 2.4, 2.6, 2.6, 2.6, 2.4, 2.4, 2.4, 2.0];
const MONTHLY_ACTUAL = [3.1, 3.4, 3.3, null, null, null, null, null, null, null, null, null];
const MONTHLY_FORECAST = [null, null, 3.3, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2];

const MONTHS = ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"];

interface Saving {
  icon: ReactNode;
  title: string;
  detail: string;
  amount: string;
  link: string;
  selected?: boolean;
}

const SAVINGS: Saving[] = [
  {
    icon: <CreditCard className="w-3 h-3" />,
    title: "Microsoft 365 lisans temizliği",
    detail: "340 atıl lisans · 90 günde 0 oturum",
    amount: "₺ 840K",
    link: "ReportCoreAI: kullanım raporu",
    selected: true,
  },
  {
    icon: <Cloud className="w-3 h-3" />,
    title: "Cloud egress optimize",
    detail: "Stratos · cross-region trafik %38 ↑",
    amount: "₺ 620K",
    link: "DisCoreAI: bağımlılık haritası",
  },
  {
    icon: <Server className="w-3 h-3" />,
    title: "SRV-MAIL-01 değiştirme öncesi bakım",
    detail: "8 ay erken yenileme yerine bakım pencere",
    amount: "₺ 410K",
    link: "AssetCoreAI: ömür tahmini",
  },
];

interface Anomaly {
  title: string;
  detail: string;
  amount: string;
}

const ANOMALIES: Anomaly[] = [
  {
    title: "Cloud egress tek günde +%62",
    detail: "9 Mart · Stratos Cloud · saatlik 8.4K → 13.6K",
    amount: "+₺ 34K",
  },
  {
    title: "Lisans satın alma çift tetiklendi",
    detail: "REQ-9217 ve REQ-9224 aynı paketi yenilemiş",
    amount: "+₺ 18K",
  },
];

const BUDGET_TOTAL = 28.0; // ₺M
const BUDGET_SPENT = 9.8;
const BUDGET_FORECAST = 31.2;

export function BudgetCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const spentPct = (BUDGET_SPENT / BUDGET_TOTAL) * 100;
  const forecastPct = (BUDGET_FORECAST / BUDGET_TOTAL) * 100;
  const overrunPct = ((BUDGET_FORECAST - BUDGET_TOTAL) / BUDGET_TOTAL) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Wallet className="w-3.5 h-3.5" />}
          title="BT Bütçe Konsolu · 2026"
          meta="Birikim · Mart sonu"
          accent={accent}
        />

        <div className="px-5 py-4 border-b border-white/8 bg-white/2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
            <div>
              <SectionLabel accent={accent}>Yıllık Bütçe</SectionLabel>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tabular-nums tracking-tight">
                  ₺ 28.0M
                </span>
                <span className="text-xs font-mono text-(--color-text-muted)">2026 onaylı</span>
              </div>
              <div className="mt-3 relative h-3 rounded-full bg-white/8 overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full ${accent.dot}`}
                  style={{ width: `${spentPct}%` }}
                />
                <div
                  className="absolute top-0 left-0 h-full bg-amber-400/40"
                  style={{ width: `${forecastPct}%`, mixBlendMode: "screen" }}
                />
                <div
                  className="absolute top-0 bottom-0 w-px bg-white border-x border-white/40"
                  style={{ left: "100%" }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono">
                <span className={accent.text}>
                  ₺ {BUDGET_SPENT.toFixed(1)}M harcandı · %{spentPct.toFixed(0)}
                </span>
                <span className="text-amber-300">
                  Yıl sonu tahmini ₺ {BUDGET_FORECAST.toFixed(1)}M
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-right">
              <div className="text-[9px] font-mono font-semibold tracking-[0.18em] text-red-200">
                {trUpper("öngörülen sapma")}
              </div>
              <div className="mt-1 flex items-baseline gap-1.5 justify-end">
                <TrendingUp className="w-3.5 h-3.5 text-red-300" />
                <span className="text-3xl font-bold text-red-200 tabular-nums">
                  +{overrunPct.toFixed(0)}
                </span>
                <span className="text-lg font-semibold text-red-200/70">%</span>
              </div>
              <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">
                ₺ {(BUDGET_FORECAST - BUDGET_TOTAL).toFixed(1)}M üzeri
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Kategori Kırılımı</SectionLabel>
            <span className="text-[10px] font-mono text-(--color-text-muted)">5 kalem</span>
          </div>
          <div className="space-y-2">
            {CATEGORIES.map((c) => (
              <CategoryBar key={c.label} cat={c} budgetTotal={BUDGET_TOTAL} accent={accent} />
            ))}
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Aylık Akış · Gerçekleşen + Tahmin</SectionLabel>
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="inline-flex items-center gap-1">
                <span className={`w-2 h-2 rounded-sm ${accent.dot}`} />
                <span className="text-white/70">gerçekleşen</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-amber-400/70" />
                <span className="text-white/70">tahmin</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-white/15" />
                <span className="text-white/70">plan</span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-1.5 h-24 items-end">
            {MONTHS.map((m, i) => {
              const plan = MONTHLY_PLAN[i];
              const actual = MONTHLY_ACTUAL[i];
              const forecast = MONTHLY_FORECAST[i];
              const value = actual ?? forecast ?? plan;
              const isActual = actual !== null;
              return (
                <div key={i} className="flex flex-col items-center gap-1 relative">
                  <div className="flex items-end gap-px h-full w-full">
                    <div
                      className="flex-1 rounded-sm bg-white/12"
                      style={{ height: `${(plan / 4) * 100}%` }}
                    />
                    <div
                      className={`flex-1 rounded-sm ${
                        isActual ? accent.dot : "bg-amber-400/65"
                      }`}
                      style={{ height: `${((value ?? 0) / 4) * 100}%` }}
                    />
                  </div>
                  <span className={`text-[9px] font-mono ${i === 2 ? accent.text : "text-(--color-text-muted)"}`}>
                    {m}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<PiggyBank className="w-3.5 h-3.5" />}
            title="Tasarruf Senaryoları"
            meta="3 öneri · ₺ 1.87M"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            {SAVINGS.map((s) => (
              <SavingCard key={s.title} saving={s} accent={accent} />
            ))}
            <div className="pt-2 mt-1 border-t border-white/8 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/85">
                3 senaryo uygulanırsa öngörülen sapma:
              </span>
              <span className={`text-[11px] font-mono font-semibold ${accent.text}`}>
                +%11 → +%4
              </span>
            </div>
            <button
              className={`w-full text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
            >
              <Sparkles className="w-3 h-3" />
              Hepsini iş planına ekle
            </button>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
            title="Anormallikler · Bu Ay"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {ANOMALIES.map((a, i) => (
              <AnomalyRow key={i} anomaly={a} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="AI Komutu · Senaryo"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="rounded-lg border border-white/8 bg-white/2 p-3">
              <span className="text-[10px] font-mono tracking-wider text-(--color-text-muted)">
                {trUpper("sor")}
              </span>
              <p className="mt-1 text-xs text-white/85 italic leading-snug">
                &ldquo;Eğer M365 lisans temizliği yapılırsa ve cloud autoscaling sıkılaşırsa, yıl
                sonu tahmini ne olur?&rdquo;
              </p>
            </div>
            <div className="mt-2 rounded-lg border border-emerald-400/30 bg-emerald-500/8 p-3">
              <span className="text-[10px] font-mono tracking-wider text-emerald-300">
                {trUpper("yanıt · scoreAI ile")}
              </span>
              <p className="mt-1 text-xs text-white/85 leading-snug">
                Yıl sonu tahmini ₺ 31.2M → ₺ 29.6M&apos;e iner; sapma %11 → %5.7&apos;ye düşer.
                M365 ve cloud beraber uygulanırsa Donanım&apos;da serbest kalan ₺ 600K, 2027
                önleyici değiştirme bütçesine eklenebilir.
              </p>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Wallet className="w-3.5 h-3.5" />} title="Bu Çeyrek · Budget" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="İzlenen" value="142" trend="kalem" trendTone="up" />
            <KpiTile label="Sapma alarmı" value="11" trend="erken uyarı" trendTone="down" />
            <KpiTile label="Tasarruf" value="₺ 3.4M" trend="bu yıl" trendTone="down" />
            <KpiTile label="Anormallik" value="38" trend="otomatik" trendTone="up" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface CategoryBarProps {
  cat: CategoryRow;
  budgetTotal: number;
  accent: AccentClasses;
}

function CategoryBar({ cat, budgetTotal, accent }: CategoryBarProps) {
  const planPct = (cat.planned / budgetTotal) * 100;
  const actualPct = (cat.actual / budgetTotal) * 100;
  const forecastPct = (cat.forecast / budgetTotal) * 100;
  const statusTone =
    cat.status === "over"
      ? { color: "text-red-300", icon: <TrendingUp className="w-3 h-3" /> }
      : cat.status === "under"
        ? { color: "text-emerald-300", icon: <TrendingDown className="w-3 h-3" /> }
        : { color: "text-(--color-text-muted)", icon: <ArrowDownRight className="w-3 h-3" /> };
  const forecastDelta = cat.forecast - cat.planned;
  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md ${accent.bg} ${accent.text}`}>
          {cat.icon}
        </span>
        <span className="text-xs font-medium text-white/85">{cat.label}</span>
        <span className={`ml-auto inline-flex items-center gap-1 text-[10px] font-mono ${statusTone.color}`}>
          {statusTone.icon}
          {forecastDelta >= 0 ? "+" : ""}
          ₺{forecastDelta.toFixed(1)}M
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-white/12"
          style={{ width: `${planPct}%` }}
        />
        <div
          className={`absolute top-0 left-0 h-full ${accent.dot}`}
          style={{ width: `${actualPct}%` }}
        />
        <div
          className="absolute top-0 left-0 h-full bg-amber-400/55"
          style={{
            left: `${actualPct}%`,
            width: `${Math.max(forecastPct - actualPct, 0)}%`,
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-white/60"
          style={{ left: `${planPct}%` }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-(--color-text-muted)">
        <span>
          plan ₺{cat.planned.toFixed(1)}M · gerçek ₺{cat.actual.toFixed(1)}M
        </span>
        <span className="text-amber-300">tahmin ₺{cat.forecast.toFixed(1)}M</span>
      </div>
    </div>
  );
}

interface SavingCardProps {
  saving: Saving;
  accent: AccentClasses;
}

function SavingCard({ saving, accent }: SavingCardProps) {
  return (
    <div
      className={`rounded-xl border ${
        saving.selected ? accent.border : "border-white/8"
      } ${saving.selected ? accent.bg : "bg-white/2"} p-3 flex items-start gap-3`}
    >
      <span
        className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md ${accent.bg} ${accent.text} mt-0.5`}
      >
        {saving.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-white truncate">{saving.title}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">
          {saving.detail}
        </div>
        <div className={`text-[10px] font-mono ${accent.text} mt-0.5`}>{saving.link}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className={`text-sm font-semibold tabular-nums ${accent.text}`}>{saving.amount}</div>
        <div className="text-[9px] font-mono text-(--color-text-muted)">tasarruf</div>
      </div>
    </div>
  );
}

function AnomalyRow({ anomaly }: { anomaly: Anomaly }) {
  return (
    <div className="px-4 py-3 flex items-center gap-3">
      <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-white truncate">{anomaly.title}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{anomaly.detail}</div>
      </div>
      <span className="text-sm font-semibold text-red-300 tabular-nums shrink-0">
        {anomaly.amount}
      </span>
    </div>
  );
}
