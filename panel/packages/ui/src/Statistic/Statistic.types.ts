import type { ComponentProps } from "react";
import type { Statistic as AntStatistic } from "antd";

/** ServiceCore Statistic — AntD Statistic 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value (string | number), title, prefix, suffix,
 *   groupSeparator (default ","), decimalSeparator (default "."),
 *   precision, formatter, loading (4.8+),
 *   classNames, styles
 *
 * 5.7'de YOK:
 *   Statistic.Timer (5.25+) — Countdown ile sınırlı.
 */
export type StatisticProps = ComponentProps<typeof AntStatistic>;

/** Statistic.Countdown props — geri sayım sayacı. */
export type StatisticCountdownProps = ComponentProps<
  typeof AntStatistic.Countdown
>;
