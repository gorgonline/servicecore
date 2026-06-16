/**
 * @servicecoreui/ui/charts — Recharts tabanlı, token-temalı grafik bileşenleri.
 *
 * Neden ayrı kova: recharts ~100KB+; yalnız grafik kullanan tüketici çeksin
 * (bundle izolasyonu — sadece Button kullanan bu yükü almaz). recharts build'de
 * external; tüketici @servicecoreui/ui'nin dependency'si olarak kurar.
 *
 * NOT: Bu bundle "use client" banner'lı (build.mjs) — Recharts ResponsiveContainer
 * client-only render eder.
 */

export * from "../primitive/charts/BarChart";
export * from "../primitive/charts/DonutChart";
export * from "../primitive/charts/LineChart";
export * from "../feature/sla/SlaGauge";
