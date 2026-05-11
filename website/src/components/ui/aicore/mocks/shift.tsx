import {
  AlertTriangle,
  ArrowRightLeft,
  Calendar,
  Clock,
  Coffee,
  Moon,
  Sparkles,
  Sun,
  TrendingUp,
  UserCheck,
  Users,
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

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

interface ShiftCell {
  staffed: number;
  load: number;
  capacity: number;
  warning?: boolean;
  active?: boolean;
}

const SHIFTS: { id: string; icon: ReactNode; label: string; range: string; cells: ShiftCell[] }[] = [
  {
    id: "gunduz",
    label: "Gündüz",
    range: "06:00–14:00",
    icon: <Sun className="w-3 h-3" />,
    cells: [
      { staffed: 6, load: 60, capacity: 8 },
      { staffed: 6, load: 92, capacity: 8, warning: true, active: true },
      { staffed: 7, load: 71, capacity: 8 },
      { staffed: 7, load: 64, capacity: 8 },
      { staffed: 6, load: 78, capacity: 8 },
      { staffed: 3, load: 24, capacity: 4 },
      { staffed: 2, load: 18, capacity: 4 },
    ],
  },
  {
    id: "aksam",
    label: "Akşam",
    range: "14:00–22:00",
    icon: <Coffee className="w-3 h-3" />,
    cells: [
      { staffed: 5, load: 58, capacity: 6 },
      { staffed: 5, load: 81, capacity: 6, warning: true },
      { staffed: 5, load: 64, capacity: 6 },
      { staffed: 5, load: 60, capacity: 6 },
      { staffed: 6, load: 72, capacity: 6 },
      { staffed: 3, load: 32, capacity: 4 },
      { staffed: 2, load: 22, capacity: 4 },
    ],
  },
  {
    id: "gece",
    label: "Gece",
    range: "22:00–06:00",
    icon: <Moon className="w-3 h-3" />,
    cells: [
      { staffed: 3, load: 22, capacity: 4 },
      { staffed: 3, load: 28, capacity: 4 },
      { staffed: 3, load: 24, capacity: 4 },
      { staffed: 2, load: 18, capacity: 4 },
      { staffed: 3, load: 26, capacity: 4 },
      { staffed: 2, load: 14, capacity: 3 },
      { staffed: 2, load: 16, capacity: 3 },
    ],
  },
];

interface FatigueRow {
  initials: string;
  name: string;
  role: string;
  consecutive: number;
  fatigue: number;
  warn?: boolean;
}

const FATIGUE: FatigueRow[] = [
  { initials: "MK", name: "Mert Kaya", role: "L2 Mesajlaşma", consecutive: 6, fatigue: 82, warn: true },
  { initials: "BA", name: "Burak Aslan", role: "Saha Mühendisi", consecutive: 4, fatigue: 58 },
  { initials: "SY", name: "Selin Yıldız", role: "L1 Çağrı", consecutive: 3, fatigue: 41 },
  { initials: "KD", name: "Kerem Doğan", role: "Ağ Yöneticisi", consecutive: 2, fatigue: 28 },
];

function loadColor(pct: number, warn?: boolean): string {
  if (warn || pct >= 90) return "bg-red-500/25 border-red-400/50";
  if (pct >= 75) return "bg-amber-500/20 border-amber-400/45";
  if (pct >= 50) return "bg-emerald-500/14 border-emerald-400/30";
  return "bg-white/4 border-white/12";
}

function loadText(pct: number, warn?: boolean): string {
  if (warn || pct >= 90) return "text-red-200";
  if (pct >= 75) return "text-amber-200";
  if (pct >= 50) return "text-emerald-200";
  return "text-white/65";
}

export function ShiftMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Calendar className="w-3.5 h-3.5" />}
          title="Vardiya Planı · Hafta 11"
          meta="Birikim · L1/L2 ekibi"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <button className="text-[11px] font-mono px-2 py-1 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            ←
          </button>
          <span className="text-xs text-white font-semibold">10 — 16 Mart 2026</span>
          <button className="text-[11px] font-mono px-2 py-1 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            →
          </button>
          <AiBadge label="2 öneri" accent={accent} />
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <Users className="w-3 h-3" />
            14 teknisyen aktif
          </span>
        </div>

        <div className="px-5 py-4">
          <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-1.5 items-stretch">
            <div />
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={`text-center text-[10px] font-mono font-semibold tracking-wider ${
                  i === 1 ? accent.text : "text-(--color-text-muted)"
                }`}
              >
                {trUpper(d)}
                {i === 1 && (
                  <span className="block text-[9px] font-mono text-(--color-text-muted) mt-0.5">
                    11 Mar
                  </span>
                )}
              </div>
            ))}

            {SHIFTS.map((shift) => (
              <div key={shift.id} className="contents">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/85 px-2">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md ${accent.bg} ${accent.text}`}>
                    {shift.icon}
                  </span>
                  <div>
                    <div className="font-semibold">{shift.label}</div>
                    <div className="text-(--color-text-muted) text-[9px]">{shift.range}</div>
                  </div>
                </div>
                {shift.cells.map((c, i) => (
                  <ShiftCellBox key={i} cell={c} accent={accent} />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-mono">
            <span className="text-(--color-text-muted)">{trUpper("yük yüzdesi")}</span>
            <LegendChip label="< %50" color="bg-white/15" />
            <LegendChip label="50–75" color="bg-emerald-400/60" />
            <LegendChip label="75–90" color="bg-amber-400/70" />
            <LegendChip label="> %90 (uyarı)" color="bg-red-400/75" />
          </div>
        </div>

        <div className={`mx-5 mb-5 rounded-xl border ${accent.border} ${accent.bg} p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className={`w-3.5 h-3.5 ${accent.text}`} />
            <span className="text-[10px] font-mono font-semibold tracking-[0.18em] text-white/85">
              {trUpper("Salı Gündüz · Uyarı")}
            </span>
            <Chip tone="warn">tahmini %92 yük</Chip>
          </div>
          <p className="text-[12px] text-white/85 leading-relaxed">
            Pazartesi gece biriken posta sorunları nedeniyle Salı sabahları{" "}
            <span className={`${accent.text} font-medium`}>+28% ticket akışı</span> bekleniyor.
            Mevcut 6 teknisyen mevcut kapasiteyi aşar — önerilen değişiklik aşağıda.
          </p>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<TrendingUp className="w-3.5 h-3.5" />}
            title="Tahmini İş Yükü"
            meta="önümüzdeki hafta"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <SectionLabel>Günlük Beklenti</SectionLabel>
                <span className={`text-[10px] font-mono ${accent.text}`}>+12% hafta öncesine</span>
              </div>
              <div className="grid grid-cols-7 gap-1 h-16 items-end">
                {[64, 92, 71, 64, 78, 28, 24].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-sm ${
                        i === 1 ? "bg-red-400/85" : v >= 75 ? "bg-amber-400/70" : "bg-emerald-400/55"
                      }`}
                      style={{ height: `${Math.max(v, 10)}%` }}
                    />
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      {DAYS[i].charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <KpiTile label="Pik gün" value="Sal" trend="11 Mar" trendTone="flat" />
              <KpiTile label="Pik saat" value="09:14" trend="ticket kuyruğu" trendTone="up" />
              <KpiTile label="Kapasite" value="86%" trend="ortalama" trendTone="flat" />
            </div>
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<ArrowRightLeft className="w-3.5 h-3.5" />}
            title="Önerilen Değişiklik · Salı Gündüz"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="rounded-xl border border-white/8 bg-white/2 p-3">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <div className="text-[10px] font-mono text-(--color-text-muted)">
                    {trUpper("Cuma Gece")}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/8 text-[10px] font-mono">
                      KD
                    </span>
                    <span className="text-xs text-white/85 font-medium">Kerem Doğan</span>
                  </div>
                  <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">
                    yük 26% · fazla
                  </div>
                </div>
                <ArrowRightLeft className={`w-4 h-4 ${accent.text}`} />
                <div className="text-right">
                  <div className={`text-[10px] font-mono ${accent.text}`}>
                    {trUpper("Salı Gündüz")}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1.5">
                    <span className="text-xs text-white/85 font-medium">+1 teknisyen</span>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${accent.bg} ${accent.text} text-[10px] font-mono ring-1 ${accent.ring}`}>
                      KD
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">
                    yük 92% → 78%
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-2 text-[11px] text-white/80 leading-snug">
              <Sparkles className={`w-3 h-3 ${accent.text} shrink-0 mt-0.5`} />
              <span>
                Kerem Cuma gece düşük yükte. Salı gündüz vardiyasının ağ becerisi gerektiren
                kuyruğunu üstlenebilir; haftalık yasal çalışma sınırı aşılmıyor.
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
                Düzelt
              </button>
              <button
                className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
              >
                <UserCheck className="w-3 h-3" />
                Uygula &amp; Bildir
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
            title="Tükenme Sinyali"
            meta="son 14 gün"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {FATIGUE.map((f) => (
              <FatigueLine key={f.initials} row={f} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Clock className="w-3.5 h-3.5" />} title="Bu Çeyrek · Shift" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Plan" value="36" trend="hafta · otomatik" trendTone="up" />
            <KpiTile label="SLA uyum" value="+8%" trend="vardiya bazlı" trendTone="up" />
            <KpiTile label="Tükenme" value="−42%" trend="uyarı sonrası" trendTone="down" />
            <KpiTile label="Fazla mesai" value="−24%" trend="çeyrek" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface ShiftCellBoxProps {
  cell: ShiftCell;
  accent: AccentClasses;
}

function ShiftCellBox({ cell, accent }: ShiftCellBoxProps) {
  const color = loadColor(cell.load, cell.warning);
  const textColor = loadText(cell.load, cell.warning);
  return (
    <div
      className={`relative rounded-md border ${color} px-2 py-1.5 ${
        cell.active ? `ring-2 ${accent.ring} shadow-[0_0_20px_-6px_rgba(245,158,11,0.6)]` : ""
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span className={`text-sm font-semibold tabular-nums ${textColor}`}>{cell.staffed}</span>
        <span className="text-[8px] font-mono text-(--color-text-muted)">/{cell.capacity}</span>
      </div>
      <div className={`text-[9px] font-mono ${textColor}`}>%{cell.load}</div>
      {cell.warning && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-(--color-surface-elevated)">
          <AlertTriangle className="w-2 h-2 text-white" />
        </span>
      )}
    </div>
  );
}

function FatigueLine({ row }: { row: FatigueRow }) {
  const barColor = row.fatigue >= 75 ? "bg-red-400" : row.fatigue >= 55 ? "bg-amber-400" : "bg-emerald-400";
  const textColor = row.fatigue >= 75 ? "text-red-300" : row.fatigue >= 55 ? "text-amber-300" : "text-emerald-300";
  return (
    <div className="px-4 py-2.5 flex items-center gap-3">
      <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/8 text-[10px] font-mono text-white/85">
        {row.initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-white truncate">{row.name}</span>
          {row.warn && <AlertTriangle className="w-3 h-3 text-red-300 shrink-0" />}
        </div>
        <div className="text-[10px] font-mono text-(--color-text-muted) flex items-center gap-1.5">
          <span>{row.role}</span>
          <span>·</span>
          <span>{row.consecutive} ardışık gün</span>
        </div>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        <div className="w-16 h-1 rounded-full bg-white/8 overflow-hidden">
          <div className={`h-full ${barColor}`} style={{ width: `${row.fatigue}%` }} />
        </div>
        <span className={`text-[10px] font-mono tabular-nums w-8 text-right ${textColor}`}>
          %{row.fatigue}
        </span>
      </div>
    </div>
  );
}

interface LegendChipProps {
  label: string;
  color: string;
}

function LegendChip({ label, color }: LegendChipProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`w-2 h-2 rounded-sm ${color}`} />
      <span className="text-(--color-text-muted)">{label}</span>
    </span>
  );
}
