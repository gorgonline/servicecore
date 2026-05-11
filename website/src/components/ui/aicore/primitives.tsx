import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export type AicoreAccent =
  | "blue"
  | "red"
  | "amber"
  | "cyan"
  | "purple"
  | "orange"
  | "sky"
  | "pink"
  | "emerald"
  | "indigo";

export interface AccentClasses {
  text: string;
  bg: string;
  border: string;
  chip: string;
  dot: string;
  glow: string;
  ring: string;
}

export const ACCENT_MAP: Record<AicoreAccent, AccentClasses> = {
  blue: {
    text: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    chip: "bg-blue-500/12 border-blue-500/35 text-blue-200",
    dot: "bg-blue-400",
    glow: "shadow-[0_0_40px_-12px_rgba(59,130,246,0.55)]",
    ring: "ring-blue-500/40",
  },
  red: {
    text: "text-red-300",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    chip: "bg-red-500/12 border-red-500/35 text-red-200",
    dot: "bg-red-400",
    glow: "shadow-[0_0_40px_-12px_rgba(239,68,68,0.55)]",
    ring: "ring-red-500/40",
  },
  amber: {
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    chip: "bg-amber-500/12 border-amber-500/35 text-amber-200",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_40px_-12px_rgba(245,158,11,0.55)]",
    ring: "ring-amber-500/40",
  },
  cyan: {
    text: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    chip: "bg-cyan-500/12 border-cyan-500/35 text-cyan-200",
    dot: "bg-cyan-400",
    glow: "shadow-[0_0_40px_-12px_rgba(34,211,238,0.55)]",
    ring: "ring-cyan-500/40",
  },
  purple: {
    text: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    chip: "bg-purple-500/12 border-purple-500/35 text-purple-200",
    dot: "bg-purple-400",
    glow: "shadow-[0_0_40px_-12px_rgba(168,85,247,0.55)]",
    ring: "ring-purple-500/40",
  },
  orange: {
    text: "text-orange-300",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    chip: "bg-orange-500/12 border-orange-500/35 text-orange-200",
    dot: "bg-orange-400",
    glow: "shadow-[0_0_40px_-12px_rgba(249,115,22,0.55)]",
    ring: "ring-orange-500/40",
  },
  sky: {
    text: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    chip: "bg-sky-500/12 border-sky-500/35 text-sky-200",
    dot: "bg-sky-400",
    glow: "shadow-[0_0_40px_-12px_rgba(56,189,248,0.55)]",
    ring: "ring-sky-500/40",
  },
  pink: {
    text: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    chip: "bg-pink-500/12 border-pink-500/35 text-pink-200",
    dot: "bg-pink-400",
    glow: "shadow-[0_0_40px_-12px_rgba(236,72,153,0.55)]",
    ring: "ring-pink-500/40",
  },
  emerald: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    chip: "bg-emerald-500/12 border-emerald-500/35 text-emerald-200",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_40px_-12px_rgba(16,185,129,0.55)]",
    ring: "ring-emerald-500/40",
  },
  indigo: {
    text: "text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    chip: "bg-indigo-500/12 border-indigo-500/35 text-indigo-200",
    dot: "bg-indigo-400",
    glow: "shadow-[0_0_40px_-12px_rgba(99,102,241,0.55)]",
    ring: "ring-indigo-500/40",
  },
};

export function resolveAccent(accent: string): AccentClasses {
  if (accent in ACCENT_MAP) return ACCENT_MAP[accent as AicoreAccent];
  return ACCENT_MAP.purple;
}

export function trUpper(value: ReactNode): ReactNode {
  return typeof value === "string" ? value.toLocaleUpperCase("tr-TR") : value;
}

interface FrameProps {
  children: ReactNode;
  className?: string;
}

export function MockFrame({ children, className = "" }: FrameProps) {
  return (
    <div
      className={`relative rounded-2xl border border-white/8 bg-(--color-surface-elevated)/80 backdrop-blur-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

interface TitleBarProps {
  icon: ReactNode;
  title: string;
  meta?: string;
  accent: AccentClasses;
}

export function TitleBar({ icon, title, meta, accent }: TitleBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/8 bg-white/3">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg ${accent.bg} ${accent.text} ring-1 ${accent.ring}`}>
          {icon}
        </span>
        <span className="text-[11px] font-mono font-semibold tracking-[0.18em] text-white truncate">
          {trUpper(title)}
        </span>
      </div>
      {meta && (
        <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0">{meta}</span>
      )}
    </div>
  );
}

interface AiBadgeProps {
  label: string;
  accent: AccentClasses;
  pulse?: boolean;
}

export function AiBadge({ label, accent, pulse = true }: AiBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${accent.border} ${accent.bg} text-[10px] font-mono font-semibold tracking-[0.14em] ${accent.text}`}
    >
      <Sparkles className={`w-2.5 h-2.5 ${pulse ? "animate-pulse" : ""}`} />
      {trUpper(label)}
    </span>
  );
}

interface ChipProps {
  children: ReactNode;
  tone?: "neutral" | "success" | "warn" | "danger" | "info";
  className?: string;
}

export function Chip({ children, tone = "neutral", className = "" }: ChipProps) {
  const styles: Record<NonNullable<ChipProps["tone"]>, string> = {
    neutral: "bg-white/8 text-white/80 border-white/10",
    success: "bg-emerald-500/12 text-emerald-200 border-emerald-500/30",
    warn: "bg-amber-500/12 text-amber-200 border-amber-500/30",
    danger: "bg-red-500/12 text-red-200 border-red-500/30",
    info: "bg-blue-500/12 text-blue-200 border-blue-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono font-medium tracking-[0.08em] ${styles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

interface PriorityChipProps {
  priority: string;
}

export function PriorityChip({ priority }: PriorityChipProps) {
  const tone = priority === "P1" ? "danger" : priority === "P2" ? "warn" : "info";
  return <Chip tone={tone}>{priority}</Chip>;
}

interface SparklineProps {
  values: number[];
  accent: AccentClasses;
  width?: number;
  height?: number;
  showThreshold?: number;
}

export function Sparkline({
  values,
  accent,
  width = 160,
  height = 40,
  showThreshold,
}: SparklineProps) {
  if (values.length < 2) return null;
  const min = Math.min(...values, showThreshold ?? Infinity);
  const max = Math.max(...values, showThreshold ?? -Infinity);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const points = values
    .map((v, i) => `${(i * stepX).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`)
    .join(" ");
  const last = values[values.length - 1];
  const lastY = height - ((last - min) / range) * height;
  const lastX = width;
  const thresholdY =
    showThreshold !== undefined ? height - ((showThreshold - min) / range) * height : null;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {thresholdY !== null && (
        <line
          x1={0}
          x2={width}
          y1={thresholdY}
          y2={thresholdY}
          strokeDasharray="3 3"
          className="stroke-white/20"
          strokeWidth={1}
        />
      )}
      <polyline
        points={points}
        fill="none"
        className={accent.text}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r={3} className={accent.text} fill="currentColor" />
      <circle
        cx={lastX}
        cy={lastY}
        r={6}
        className={accent.text}
        fill="currentColor"
        opacity={0.25}
      />
    </svg>
  );
}

interface KpiTileProps {
  label: string;
  value: string;
  trend?: string;
  trendTone?: "up" | "down" | "flat";
}

export function KpiTile({ label, value, trend, trendTone = "flat" }: KpiTileProps) {
  const trendColor =
    trendTone === "up"
      ? "text-emerald-300"
      : trendTone === "down"
        ? "text-red-300"
        : "text-(--color-text-muted)";
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
      <div className="text-[9px] font-mono font-semibold tracking-[0.18em] text-(--color-text-muted)">
        {trUpper(label)}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-lg font-semibold text-white tabular-nums tracking-tight">{value}</span>
        {trend && (
          <span className={`text-[10px] font-mono ${trendColor}`}>{trend}</span>
        )}
      </div>
    </div>
  );
}

interface TicketRowProps {
  id: string;
  title: string;
  priority: string;
  meta?: string;
  active?: boolean;
  rightSlot?: ReactNode;
}

export function TicketRow({ id, title, priority, meta, active = false, rightSlot }: TicketRowProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-b border-white/6 last:border-b-0 ${
        active ? "bg-white/5" : "hover:bg-white/3"
      }`}
    >
      <PriorityChip priority={priority} />
      <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
        {id}
      </span>
      <span className="text-sm text-white/90 truncate flex-1">{title}</span>
      {meta && (
        <span className="text-[11px] font-mono text-(--color-text-muted) shrink-0">{meta}</span>
      )}
      {rightSlot}
    </div>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  accent?: AccentClasses;
}

export function SectionLabel({ children, accent }: SectionLabelProps) {
  return (
    <div
      className={`text-[9px] font-mono font-semibold tracking-[0.22em] ${
        accent?.text ?? "text-(--color-text-muted)"
      }`}
    >
      {trUpper(children)}
    </div>
  );
}
