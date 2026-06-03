"use client";

import {
  Area,
  AreaChart as RAreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart as RLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CHART_AXIS,
  CHART_AXIS_LINE,
  CHART_FONT,
  CHART_FONT_SIZE,
  CHART_GRID,
  CHART_SERIES,
  CHART_TOOLTIP_STYLE,
} from "../chartTokens";
import styles from "./LineChart.module.css";

export interface LineChartSeries {
  key: string;
  label?: string;
  color?: string;
}

export interface LineChartProps {
  data: Array<Record<string, string | number>>;
  /** X ekseni alanı (genelde zaman). */
  categoryKey: string;
  series: LineChartSeries[];
  /** line (çizgi) veya area (dolgulu). Vars. line. */
  variant?: "line" | "area";
  /** Eğri tipi (vars. monotone — yumuşak). */
  curve?: "monotone" | "linear";
  /** Yükseklik px (vars. 280). */
  height?: number;
  /** Legend göster (vars. seri > 1 ise). */
  legend?: boolean;
}

const axisProps = {
  tick: { fill: CHART_AXIS, fontFamily: CHART_FONT, fontSize: CHART_FONT_SIZE },
  axisLine: { stroke: CHART_AXIS_LINE },
  tickLine: false as const,
};

/**
 * LineChart — token-temalı trend grafiği (Recharts wrap).
 *
 * Zaman serisi / trend (ticket akışı, SLA ihlali trendi). line veya area
 * varyantı, çoklu seri. Renkler kategorik chart paletinden (var(--sc-chart-*)).
 *
 * @example
 * <LineChart
 *   data={[{ ay: "Oca", acik: 12, cozulen: 30 }]}
 *   categoryKey="ay"
 *   series={[{ key: "acik", label: "Açık" }, { key: "cozulen", label: "Çözülen" }]}
 *   variant="area"
 * />
 */
export function LineChart({
  data,
  categoryKey,
  series,
  variant = "line",
  curve = "monotone",
  height = 280,
  legend,
}: LineChartProps) {
  const showLegend = legend ?? series.length > 1;
  const isArea = variant === "area";

  const common = [
    <CartesianGrid key="grid" stroke={CHART_GRID} strokeDasharray="3 3" vertical={false} />,
    <XAxis key="x" type="category" dataKey={categoryKey} {...axisProps} />,
    <YAxis key="y" type="number" {...axisProps} />,
    <Tooltip
      key="tt"
      contentStyle={CHART_TOOLTIP_STYLE}
      labelStyle={{ color: "var(--sc-color-text-secondary)", marginBottom: 4 }}
      itemStyle={{ color: "var(--sc-color-text-primary)" }}
    />,
    showLegend ? (
      <Legend
        key="lg"
        wrapperStyle={{ fontFamily: CHART_FONT, fontSize: CHART_FONT_SIZE, color: CHART_AXIS }}
      />
    ) : null,
  ];

  return (
    <div className={styles.root} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {isArea ? (
          <RAreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            {common}
            {series.map((s, i) => {
              const color = s.color ?? CHART_SERIES[i % CHART_SERIES.length];
              return (
                <Area
                  key={s.key}
                  type={curve}
                  dataKey={s.key}
                  name={s.label ?? s.key}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.15}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              );
            })}
          </RAreaChart>
        ) : (
          <RLineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            {common}
            {series.map((s, i) => {
              const color = s.color ?? CHART_SERIES[i % CHART_SERIES.length];
              return (
                <Line
                  key={s.key}
                  type={curve}
                  dataKey={s.key}
                  name={s.label ?? s.key}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              );
            })}
          </RLineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
