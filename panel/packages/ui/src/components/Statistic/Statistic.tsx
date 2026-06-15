import { Statistic as AntStatistic } from "antd";
import clsx from "clsx";
import styles from "./Statistic.module.css";
import type {
  StatisticProps,
  StatisticCountdownProps,
} from "./Statistic.types";

/** ServiceCore Statistic — AntD Statistic wrap.
 *
 * Dashboard KPI, SLA istatistik, ticket count, response time, MRR/ARR
 * gibi sayısal göstergeler. Title + value (büyük rakam) + prefix/suffix
 * (sembol/birim) yapısı.
 *
 * AntD API'sini 1:1 korur. <code>Statistic.Countdown</code> geri sayım için
 * (maintenance başlangıç, deadline).
 *
 * @example KPI
 * ```tsx
 * <Statistic title="Açık Bilet" value={127} suffix="adet" />
 * ```
 *
 * @example Para
 * ```tsx
 * <Statistic
 *   title="Aylık Gelir"
 *   value={45230.50}
 *   precision={2}
 *   prefix="₺"
 *   groupSeparator="."
 *   decimalSeparator=","
 * />
 * ```
 *
 * @example Countdown
 * ```tsx
 * <Statistic.Countdown
 *   title="Maintenance başlıyor"
 *   value={Date.now() + 1000 * 60 * 60 * 2}
 *   onFinish={() => alert("Başladı")}
 * />
 * ```
 */
function StatisticRoot({ className, ...rest }: StatisticProps) {
  return (
    <AntStatistic {...rest} className={clsx(styles.statistic, className)} />
  );
}

/** Statistic.Countdown — geri sayım. */
function StatisticCountdown({ className, ...rest }: StatisticCountdownProps) {
  return (
    <AntStatistic.Countdown
      {...rest}
      className={clsx(styles.statistic, className)}
    />
  );
}

StatisticRoot.Countdown = StatisticCountdown;

export const Statistic = StatisticRoot;
