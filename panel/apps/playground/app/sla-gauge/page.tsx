"use client";

import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { SlaGauge } from "@servicecoreui/ui";
import { Card } from "@servicecoreui/ui";
import styles from "./sla-gauge.module.css";

export default function SlaGaugePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Grafikler</Eyebrow>
        <Display size="md">SlaGauge</Display>
        <Text size="lg" color="secondary">
          SLA % halkası (gauge). Recharts <strong>değil</strong> — mevcut{" "}
          <code>Progress</code> (type="dashboard") wrap'ini saran ince bileşen.
          Eşiğe göre renk: ≥95 success, ≥85 warning, altı danger (state
          token'ları). Ortada değer + etiket.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Eşik durumları</Heading>
        <div className={styles.grid}>
          <Card title="İyi (≥95)">
            <SlaGauge value={97} label="SLA uyumu" />
          </Card>
          <Card title="Uyarı (≥85)">
            <SlaGauge value={89} label="SLA uyumu" />
          </Card>
          <Card title="Kritik (&lt;85)">
            <SlaGauge value={72} label="SLA uyumu" />
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <Heading level={2}>API</Heading>
        <table className={styles.props}>
          <thead>
            <tr><th>Prop</th><th>Tip</th><th>Açıklama</th></tr>
          </thead>
          <tbody>
            <tr><td><code>value</code></td><td><code>number</code></td><td>SLA değeri (0–100).</td></tr>
            <tr><td><code>label</code></td><td><code>string</code></td><td>Orta etiket (ör. "SLA uyumu").</td></tr>
            <tr><td><code>thresholds</code></td><td><code>{`{ ok, warn }`}</code></td><td>Renk eşikleri (vars. {`{ ok: 95, warn: 85 }`}).</td></tr>
            <tr><td><code>size</code></td><td><code>number</code></td><td>Boyut px (vars. 160).</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`import { SlaGauge } from "@servicecoreui/ui";

<SlaGauge value={94} label="SLA uyumu" />
<SlaGauge value={72} label="SLA uyumu" thresholds={{ ok: 90, warn: 80 }} />`}</Code>
      </section>
    </main>
  );
}
