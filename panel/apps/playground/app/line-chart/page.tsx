"use client";

import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui/typography";
import { LineChart } from "@servicecoreui/ui/charts";
import { Card } from "@servicecoreui/ui/wraps";
import styles from "./line-chart.module.css";

const TREND = [
  { ay: "Oca", acilan: 64, cozulen: 58 },
  { ay: "Şub", acilan: 72, cozulen: 61 },
  { ay: "Mar", acilan: 58, cozulen: 66 },
  { ay: "Nis", acilan: 81, cozulen: 70 },
  { ay: "May", acilan: 69, cozulen: 74 },
  { ay: "Haz", acilan: 77, cozulen: 80 },
];

const SLA_TREND = [
  { hafta: "1. Hafta", ihlal: 6 },
  { hafta: "2. Hafta", ihlal: 4 },
  { hafta: "3. Hafta", ihlal: 7 },
  { hafta: "4. Hafta", ihlal: 3 },
  { hafta: "5. Hafta", ihlal: 2 },
];

export default function LineChartPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Grafikler</Eyebrow>
        <Display size="md">LineChart</Display>
        <Text size="lg" color="secondary">
          Token-temalı trend grafiği (Recharts wrap). Zaman serisi / trend
          (ticket akışı, SLA ihlali trendi). <code>line</code> veya{" "}
          <code>area</code> varyantı, çoklu seri. Renkler kategorik chart
          paletinden (<code>var(--sc-chart-*)</code>).
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Çoklu seri (trend)</Heading>
        <Card title="Açılan / çözülen kayıt (aylık)">
          <LineChart
            data={TREND}
            categoryKey="ay"
            series={[
              { key: "acilan", label: "Açılan" },
              { key: "cozulen", label: "Çözülen" },
            ]}
          />
        </Card>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Alan (area)</Heading>
        <Card title="SLA ihlali trendi (haftalık)">
          <LineChart
            data={SLA_TREND}
            categoryKey="hafta"
            series={[{ key: "ihlal", label: "SLA ihlali" }]}
            variant="area"
          />
        </Card>
      </section>

      <section className={styles.section}>
        <Heading level={2}>API</Heading>
        <table className={styles.props}>
          <thead>
            <tr><th>Prop</th><th>Tip</th><th>Açıklama</th></tr>
          </thead>
          <tbody>
            <tr><td><code>data</code></td><td><code>Record&lt;string, string|number&gt;[]</code></td><td>Satır verisi.</td></tr>
            <tr><td><code>categoryKey</code></td><td><code>string</code></td><td>X ekseni alanı (genelde zaman).</td></tr>
            <tr><td><code>series</code></td><td><code>{`{ key, label?, color? }[]`}</code></td><td>Çizilecek seriler.</td></tr>
            <tr><td><code>variant</code></td><td><code>"line" | "area"</code></td><td>Çizgi / dolgulu (vars. line).</td></tr>
            <tr><td><code>curve</code></td><td><code>"monotone" | "linear"</code></td><td>Eğri tipi (vars. monotone).</td></tr>
            <tr><td><code>height</code></td><td><code>number</code></td><td>Yükseklik px (vars. 280).</td></tr>
            <tr><td><code>legend</code></td><td><code>boolean</code></td><td>Legend göster (vars. seri &gt; 1).</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`import { LineChart } from "@servicecoreui/ui/charts";

<LineChart
  data={[{ ay: "Oca", acilan: 64, cozulen: 58 }]}
  categoryKey="ay"
  series={[
    { key: "acilan", label: "Açılan" },
    { key: "cozulen", label: "Çözülen" },
  ]}
  variant="area"
/>`}</Code>
      </section>
    </main>
  );
}
