"use client";

import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Legend,
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
import styles from "./BarChart.module.css";

export interface BarChartSeries {
  /** Veri alanı (data nesnesindeki anahtar). */
  key: string;
  /** Legend/tooltip etiketi (vars. key). */
  label?: string;
  /** Renk override (vars. palet sırası). */
  color?: string;
}

export interface BarChartProps {
  data: Array<Record<string, string | number>>;
  /** Kategori ekseni alanı (dikeyde X, yatayda Y). */
  categoryKey: string;
  series: BarChartSeries[];
  /** Çoklu seride: yan yana (grouped) veya yığılı (stacked). */
  variant?: "grouped" | "stacked";
  /** Yatay bar (sıralama/top-N için). */
  horizontal?: boolean;
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
 * BarChart — token-temalı bar grafiği (Recharts wrap).
 *
 * Dikey/yatay, gruplu/yığılı. Renkler kategorik chart paletinden (var(--sc-chart-*)).
 * ITSM dashboard'un en sık widget'ı: kategori bazlı hacim, öncelik/durum dağılımı.
 *
 * @example
 * <BarChart
 *   data={[{ ay: "Oca", acik: 12, kapali: 30 }]}
 *   categoryKey="ay"
 *   series={[{ key: "acik", label: "Açık" }, { key: "kapali", label: "Kapalı" }]}
 *   variant="grouped"
 * />
 */
export function BarChart({
  data,
  categoryKey,
  series,
  variant = "grouped",
  horizontal = false,
  height = 280,
  legend,
}: BarChartProps) {
  const showLegend = legend ?? series.length > 1;
  const stackId = variant === "stacked" ? "sc-stack" : undefined;

  return (
    <div className={styles.root} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          barGap={4}
          barCategoryGap={horizontal ? "20%" : "24%"}
        >
          <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" horizontal vertical={horizontal} />
          {horizontal ? (
            <>
              <XAxis type="number" {...axisProps} />
              <YAxis type="category" dataKey={categoryKey} width={120} {...axisProps} />
            </>
          ) : (
            <>
              <XAxis type="category" dataKey={categoryKey} {...axisProps} />
              <YAxis type="number" {...axisProps} />
            </>
          )}
          <Tooltip
            cursor={{ fill: "var(--sc-color-bg-muted)" }}
            contentStyle={CHART_TOOLTIP_STYLE}
            labelStyle={{ color: "var(--sc-color-text-secondary)", marginBottom: 4 }}
            itemStyle={{ color: "var(--sc-color-text-primary)" }}
          />
          {showLegend ? (
            <Legend
              wrapperStyle={{ fontFamily: CHART_FONT, fontSize: CHART_FONT_SIZE, color: CHART_AXIS }}
            />
          ) : null}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label ?? s.key}
              fill={s.color ?? CHART_SERIES[i % CHART_SERIES.length]}
              stackId={stackId}
              radius={stackId ? 0 : horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              maxBarSize={48}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}
