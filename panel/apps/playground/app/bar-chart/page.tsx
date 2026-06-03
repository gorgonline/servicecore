"use client";

import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { BarChart } from "@servicecoreui/ui/charts";
import { Card } from "@servicecoreui/ui/wraps";
import styles from "./bar-chart.module.css";

const AYLIK = [
  { ay: "Oca", acik: 24, kapali: 40 },
  { ay: "Şub", acik: 18, kapali: 52 },
  { ay: "Mar", acik: 30, kapali: 44 },
  { ay: "Nis", acik: 22, kapali: 60 },
  { ay: "May", acik: 27, kapali: 48 },
  { ay: "Haz", acik: 15, kapali: 55 },
];

const KATEGORI = [
  { kategori: "Donanım", adet: 47 },
  { kategori: "Yazılım", adet: 32 },
  { kategori: "Ağ", adet: 18 },
  { kategori: "Hesap", adet: 14 },
  { kategori: "Diğer", adet: 9 },
];

const TEKNISYEN = [
  { ad: "Jack Bauer", adet: 42 },
  { ad: "Ayşe Tan", adet: 31 },
  { ad: "Mehmet Kaya", adet: 27 },
  { ad: "Selin Koç", adet: 19 },
  { ad: "Can Erdem", adet: 11 },
];

export default function BarChartPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Grafikler</Eyebrow>
        <Display size="md">BarChart</Display>
        <Text size="lg" color="secondary">
          Token-temalı bar grafiği (Recharts wrap). Dikey/yatay, gruplu/yığılı.
          Renkler kategorik chart paletinden (<code>var(--sc-chart-*)</code>) —
          SVG fill'e doğrudan CSS değişkeni geçer, JS tema köprüsü yok. ITSM
          dashboard'un en sık widget'ı.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Tek seri (kategori dağılımı)</Heading>
        <Card title="Kategoriye göre olaylar">
          <BarChart data={KATEGORI} categoryKey="kategori" series={[{ key: "adet", label: "Adet" }]} />
        </Card>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Gruplu (çoklu seri)</Heading>
        <Card title="Aylık açık / kapalı">
          <BarChart
            data={AYLIK}
            categoryKey="ay"
            series={[
              { key: "acik", label: "Açık" },
              { key: "kapali", label: "Kapalı" },
            ]}
            variant="grouped"
          />
        </Card>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Yığılı (stacked)</Heading>
        <Card title="Aylık açık / kapalı (yığılı)">
          <BarChart
            data={AYLIK}
            categoryKey="ay"
            series={[
              { key: "acik", label: "Açık" },
              { key: "kapali", label: "Kapalı" },
            ]}
            variant="stacked"
          />
        </Card>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Yatay (top-N sıralama)</Heading>
        <Card title="Teknisyene göre çağrılar">
          <BarChart
            data={TEKNISYEN}
            categoryKey="ad"
            series={[{ key: "adet", label: "Adet" }]}
            horizontal
            height={240}
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
            <tr><td><code>categoryKey</code></td><td><code>string</code></td><td>Kategori ekseni alanı (dikeyde X, yatayda Y).</td></tr>
            <tr><td><code>series</code></td><td><code>{`{ key, label?, color? }[]`}</code></td><td>Çizilecek seriler.</td></tr>
            <tr><td><code>variant</code></td><td><code>"grouped" | "stacked"</code></td><td>Çoklu seride yan yana / yığılı (vars. grouped).</td></tr>
            <tr><td><code>horizontal</code></td><td><code>boolean</code></td><td>Yatay bar (sıralama/top-N).</td></tr>
            <tr><td><code>height</code></td><td><code>number</code></td><td>Yükseklik px (vars. 280).</td></tr>
            <tr><td><code>legend</code></td><td><code>boolean</code></td><td>Legend göster (vars. seri &gt; 1).</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`import { BarChart } from "@servicecoreui/ui/charts";

<BarChart
  data={[{ ay: "Oca", acik: 24, kapali: 40 }]}
  categoryKey="ay"
  series={[
    { key: "acik", label: "Açık" },
    { key: "kapali", label: "Kapalı" },
  ]}
  variant="grouped"
/>`}</Code>
      </section>
    </main>
  );
}
