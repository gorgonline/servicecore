"use client";

import { Progress } from "../../../primitive/Progress";
import styles from "./SlaGauge.module.css";

export interface SlaGaugeProps {
  /** SLA değeri (0–100). */
  value: number;
  /** Orta etiket (ör. "SLA", "Uyum"). */
  label?: string;
  /** Boyut px (vars. 160). */
  size?: number;
  /**
   * Renk eşikleri: value ≥ ok → success, ≥ warn → warning, altı → danger.
   * Vars. { ok: 95, warn: 85 }.
   */
  thresholds?: { ok: number; warn: number };
}

/**
 * SlaGauge — SLA % halkası (gauge). Recharts DEĞİL: mevcut Progress
 * (type="dashboard") wrap'ini saran ince bileşen. Eşiğe göre renk
 * (success/warning/danger token'ları) + ortada değer/etiket.
 *
 * @example
 * <SlaGauge value={94} label="SLA uyumu" />
 */
export function SlaGauge({ value, label, size = 160, thresholds }: SlaGaugeProps) {
  const ok = thresholds?.ok ?? 95;
  const warn = thresholds?.warn ?? 85;
  const color =
    value >= ok
      ? "var(--sc-color-state-success-fg)"
      : value >= warn
        ? "var(--sc-color-state-warning-fg)"
        : "var(--sc-color-state-danger-fg)";

  return (
    <div className={styles.root}>
      <Progress
        type="dashboard"
        percent={value}
        size={size}
        gapDegree={90}
        gapPosition="bottom"
        strokeColor={color}
        trailColor="var(--sc-color-border-subtle)"
        format={() => (
          <span className={styles.center}>
            <span className={styles.value} style={{ color }}>
              {value}%
            </span>
            {label ? <span className={styles.label}>{label}</span> : null}
          </span>
        )}
      />
    </div>
  );
}
