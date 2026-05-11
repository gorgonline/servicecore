import { Building2, Crosshair, Target, TrendingUp, Users, Zap } from "lucide-react";
import {
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface MatrixSlot {
  x: number;
  y: number;
  priority: "P0" | "P1" | "P2" | "P3" | "P4";
  count: number;
  active?: boolean;
}

const MATRIX: MatrixSlot[] = [
  { x: 1, y: 4, priority: "P3", count: 0 },
  { x: 2, y: 4, priority: "P2", count: 1 },
  { x: 3, y: 4, priority: "P1", count: 1 },
  { x: 4, y: 4, priority: "P0", count: 1, active: true },

  { x: 1, y: 3, priority: "P3", count: 2 },
  { x: 2, y: 3, priority: "P2", count: 3 },
  { x: 3, y: 3, priority: "P2", count: 2 },
  { x: 4, y: 3, priority: "P1", count: 1 },

  { x: 1, y: 2, priority: "P4", count: 4 },
  { x: 2, y: 2, priority: "P3", count: 5 },
  { x: 3, y: 2, priority: "P2", count: 1 },
  { x: 4, y: 2, priority: "P2", count: 2 },

  { x: 1, y: 1, priority: "P4", count: 6 },
  { x: 2, y: 1, priority: "P4", count: 4 },
  { x: 3, y: 1, priority: "P3", count: 2 },
  { x: 4, y: 1, priority: "P3", count: 1 },
];

function priorityTone(p: MatrixSlot["priority"]): {
  bg: string;
  border: string;
  text: string;
} {
  if (p === "P0") return { bg: "bg-red-500/22", border: "border-red-400/55", text: "text-red-200" };
  if (p === "P1") return { bg: "bg-red-500/14", border: "border-red-400/40", text: "text-red-200" };
  if (p === "P2") return { bg: "bg-amber-500/14", border: "border-amber-400/40", text: "text-amber-200" };
  if (p === "P3") return { bg: "bg-cyan-500/12", border: "border-cyan-400/30", text: "text-cyan-200" };
  return { bg: "bg-white/4", border: "border-white/10", text: "text-white/60" };
}

export function PriorityCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Crosshair className="w-3.5 h-3.5" />}
          title="PriorityCore · Etki × Aciliyet Matriksi"
          meta="Birikim · 84 açık kayıt"
          accent={accent}
        />

        <div className="px-5 py-4">
          <div className="flex items-center gap-3 mb-3">
            <SectionLabel accent={accent}>Aktif Atama</SectionLabel>
            <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums">
              INC-2847
            </span>
            <span className="text-xs text-white/85 truncate">Posta sunucusu yanıt vermiyor</span>
            <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-red-400/55 bg-red-500/22 text-[10px] font-mono font-semibold text-red-200">
              P0 · KRİTİK
            </span>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-2 items-stretch">
            <div className="flex items-center justify-center">
              <div
                className="text-[9px] font-mono tracking-[0.18em] text-(--color-text-muted) whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {trUpper("Aciliyet ↑")}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {[4, 3, 2, 1].map((y) =>
                [1, 2, 3, 4].map((x) => {
                  const slot = MATRIX.find((m) => m.x === x && m.y === y);
                  if (!slot) return null;
                  const tone = priorityTone(slot.priority);
                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`relative rounded-lg border ${tone.border} ${tone.bg} ${
                        slot.active ? "ring-2 ring-red-400/70 shadow-[0_0_30px_-8px_rgba(239,68,68,0.6)]" : ""
                      } px-2.5 py-3 flex flex-col items-center justify-center gap-1`}
                    >
                      <span className={`text-[10px] font-mono font-semibold tracking-wider ${tone.text}`}>
                        {slot.priority}
                      </span>
                      {slot.count > 0 && (
                        <span className="text-base font-semibold text-white tabular-nums">
                          {slot.count}
                        </span>
                      )}
                      {slot.active && (
                        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-400 ring-2 ring-(--color-surface-elevated) animate-pulse" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-2 grid grid-cols-[auto_1fr] gap-2 items-center">
            <div className="w-3" />
            <div className="grid grid-cols-4 gap-1.5">
              {["Düşük", "Orta", "Yüksek", "Kritik"].map((label) => (
                <div
                  key={label}
                  className="text-center text-[9px] font-mono tracking-[0.18em] text-(--color-text-muted)"
                >
                  {trUpper(label)}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-1 text-center text-[9px] font-mono tracking-[0.18em] text-(--color-text-muted)">
            {trUpper("Etki →")}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <KpiTile label="P0/P1" value="4" trend="kritik kuyrukta" trendTone="down" />
            <KpiTile label="P2" value="9" trend="hedef <12s" trendTone="flat" />
            <KpiTile label="P3/P4" value="22" trend="planlı" trendTone="flat" />
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Target className="w-3.5 h-3.5" />}
            title="Skor Kırılımı · INC-2847"
            meta="P0 · 09:14"
            accent={accent}
          />

          <div className="px-5 py-4 space-y-3.5">
            <ScoreRow
              accent={accent}
              icon={<Building2 className="w-3 h-3" />}
              label="Etki"
              value={9.4}
              note="14 şube · 2.400 kullanıcı"
              tier="Kritik"
            />
            <ScoreRow
              accent={accent}
              icon={<Zap className="w-3 h-3" />}
              label="Aciliyet"
              value={9.2}
              note="SLA 1s 46d · mali risk"
              tier="Kritik"
            />
            <ScoreRow
              accent={accent}
              icon={<Users className="w-3 h-3" />}
              label="Servis Kritikliği"
              value={10}
              note="Posta · Tier-0 servis"
              tier="Tier-0"
            />
            <ScoreRow
              accent={accent}
              icon={<TrendingUp className="w-3 h-3" />}
              label="Tırmanış"
              value={7.8}
              note="124 yeni etki/saat"
              tier="Yüksek"
            />

            <div className="pt-3 border-t border-white/8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                    {trUpper("Sonuç")}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white tabular-nums tracking-tight">
                      P0
                    </span>
                    <span className="text-xs font-mono text-red-300">kritik</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                    {trUpper("Manuel atama")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white/40 line-through">P2</div>
                  <div className="text-[10px] font-mono text-(--color-text-muted)">
                    AI yükseltti
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Crosshair className="w-3.5 h-3.5" />}
            title="Bugün · Önceliklendirme"
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Atandı" value="124" trend="+%9 hafta" trendTone="up" />
            <KpiTile label="Doğru" value="94%" trend="manuel onaylı" trendTone="flat" />
            <KpiTile label="Yükseltti" value="11" trend="P↑ AI" trendTone="up" />
            <KpiTile label="Düşürdü" value="7" trend="P↓ AI" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface ScoreRowProps {
  accent: ReturnType<typeof resolveAccent>;
  icon: React.ReactNode;
  label: string;
  value: number;
  note: string;
  tier: string;
}

function ScoreRow({ accent, icon, label, value, note, tier }: ScoreRowProps) {
  const pct = Math.min((value / 10) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md ${accent.bg} ${accent.text}`}>
            {icon}
          </span>
          <span className="text-xs font-medium text-white/85">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white tabular-nums">
            {value.toFixed(1)}
          </span>
          <span className="text-[10px] font-mono text-(--color-text-muted)">/ 10</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div
          className={`h-full rounded-full ${pct >= 80 ? "bg-red-400" : pct >= 60 ? "bg-amber-400" : "bg-cyan-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between text-[10px] font-mono">
        <span className="text-(--color-text-muted)">{note}</span>
        <Chip tone={pct >= 80 ? "danger" : pct >= 60 ? "warn" : "info"}>{tier}</Chip>
      </div>
    </div>
  );
}
