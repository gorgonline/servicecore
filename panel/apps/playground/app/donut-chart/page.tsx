"use client";

import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { DonutChart } from "@servicecoreui/ui/charts";
import { Card } from "@servicecoreui/ui/wraps";
import styles from "./donut-chart.module.css";

const DURUM = [
  { name: "Açık", value: 42 },
  { name: "İşlemde", value: 28 },
  { name: "Beklemede", value: 13 },
  { name: "Çözüldü", value: 67 },
  { name: "Kapatıldı", value: 35 },
];

const KANAL = [
  { name: "Portal", value: 120 },
  { name: "E-posta", value: 86 },
  { name: "Telefon", value: 54 },
  { name: "Sohbet", value: 31 },
];

export default function DonutChartPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Grafikler</Eyebrow>
        <Display size="md">DonutChart</Display>
        <Text size="lg" color="secondary">
          Token-temalı donut/pie grafiği (Recharts wrap). Dağılım gösterimi
          (durum/kanal/kategori payı); donut ortasında opsiyonel toplam/etiket.
          Dilim renkleri kategorik chart paletinden (<code>var(--sc-chart-*)</code>).
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Donut + ortada toplam</Heading>
        <Card title="Duruma göre kayıtlar">
          <DonutChart data={DURUM} centerLabel="Toplam" />
        </Card>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Pie (dolu)</Heading>
        <Card title="Kanala göre talepler">
          <DonutChart data={KANAL} variant="pie" />
        </Card>
      </section>

      <section className={styles.section}>
        <Heading level={2}>API</Heading>
        <table className={styles.props}>
          <thead>
            <tr><th>Prop</th><th>Tip</th><th>Açıklama</th></tr>
          </thead>
          <tbody>
            <tr><td><code>data</code></td><td><code>{`{ name, value, color? }[]`}</code></td><td>Dilim verisi.</td></tr>
            <tr><td><code>variant</code></td><td><code>"donut" | "pie"</code></td><td>Ortası boş / dolu (vars. donut).</td></tr>
            <tr><td><code>centerLabel</code></td><td><code>string</code></td><td>Donut ortası etiketi (ör. "Toplam").</td></tr>
            <tr><td><code>centerValue</code></td><td><code>string | number</code></td><td>Ortadaki değer (vars. toplam).</td></tr>
            <tr><td><code>legend</code></td><td><code>boolean</code></td><td>Legend göster (vars. true).</td></tr>
            <tr><td><code>height</code></td><td><code>number</code></td><td>Yükseklik px (vars. 280).</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`import { DonutChart } from "@servicecoreui/ui/charts";

<DonutChart
  data={[
    { name: "Açık", value: 42 },
    { name: "Çözüldü", value: 67 },
  ]}
  centerLabel="Toplam"
/>`}</Code>
      </section>
    </main>
  );
}
