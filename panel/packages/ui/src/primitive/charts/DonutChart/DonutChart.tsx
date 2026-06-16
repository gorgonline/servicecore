"use client";

import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart as RPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { LabelProps } from "recharts";
import {
  CHART_AXIS,
  CHART_FONT,
  CHART_FONT_SIZE,
  CHART_SERIES,
  CHART_TOOLTIP_STYLE,
} from "../chartTokens";
import styles from "./DonutChart.module.css";

export interface DonutChartDatum {
  name: string;
  value: number;
  /** Renk override (vars. palet sırası). */
  color?: string;
}

export interface DonutChartProps {
  data: DonutChartDatum[];
  /** Yükseklik px (vars. 280). */
  height?: number;
  /** donut (ortası boş) veya pie (dolu). Vars. donut. */
  variant?: "donut" | "pie";
  /** Legend göster (vars. true). */
  legend?: boolean;
  /** Donut ortası etiketi (ör. "Toplam"). */
  centerLabel?: string;
  /** Donut ortası değeri (vars. değerlerin toplamı). */
  centerValue?: string | number;
}

/** Donut ortasına SVG metin — pie'nin gerçek merkezine oturur (legend-aware). */
function centerContent(value: string | number, label?: string) {
  return function CenterLabel(props: LabelProps) {
    const vb = props.viewBox as { cx?: number; cy?: number } | undefined;
    const cx = vb?.cx ?? 0;
    const cy = vb?.cy ?? 0;
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
        <tspan
          x={cx}
          dy={label ? "-0.2em" : "0"}
          fill="var(--sc-color-text-primary)"
          fontFamily="var(--sc-font-sans)"
          fontSize={22}
          fontWeight={600}
        >
          {value}
        </tspan>
        {label ? (
          <tspan
            x={cx}
            dy="1.6em"
            fill="var(--sc-color-text-tertiary)"
            fontFamily="var(--sc-font-sans)"
            fontSize={12}
          >
            {label}
          </tspan>
        ) : null}
      </text>
    );
  };
}

/**
 * DonutChart — token-temalı donut/pie grafiği (Recharts wrap).
 *
 * Dağılım gösterimi (durum/kanal/kategori payı). Donut ortasında opsiyonel
 * toplam/etiket. Dilim renkleri kategorik chart paletinden (var(--sc-chart-*)).
 *
 * @example
 * <DonutChart
 *   data={[{ name: "Açık", value: 12 }, { name: "Çözüldü", value: 30 }]}
 *   centerLabel="Toplam"
 * />
 */
export function DonutChart({
  data,
  height = 280,
  variant = "donut",
  legend = true,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const isDonut = variant === "donut";
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const showCenter = isDonut && (centerLabel !== undefined || centerValue !== undefined);

  return (
    <div className={styles.root} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={isDonut ? "62%" : 0}
            outerRadius="84%"
            paddingAngle={isDonut ? 2 : 0}
            stroke="var(--sc-color-bg-base)"
            strokeWidth={2}
          >
            {data.map((d, i) => (
              <Cell key={d.name} fill={d.color ?? CHART_SERIES[i % CHART_SERIES.length]} />
            ))}
            {showCenter ? <Label content={centerContent(centerValue ?? total, centerLabel)} /> : null}
          </Pie>
          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} itemStyle={{ color: "var(--sc-color-text-primary)" }} />
          {legend ? (
            <Legend
              wrapperStyle={{ fontFamily: CHART_FONT, fontSize: CHART_FONT_SIZE, color: CHART_AXIS }}
            />
          ) : null}
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
}
