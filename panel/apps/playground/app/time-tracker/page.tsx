"use client";

import { Time } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { TimeTracker } from "@servicecoreui/ui";
import { Button } from "@servicecoreui/ui";
import styles from "./time-tracker.module.css";

const TIMERS = [
  { key: "telefon", name: "Telefon", seconds: 0, running: false },
  { key: "toplanti", name: "Toplantı", seconds: 5872878, running: true },
  { key: "test", name: "test", seconds: 60, running: false },
];

export default function TimeTrackerPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">TimeTracker</Display>
        <Text size="lg" color="secondary">
          "Zaman Makinesi" — isimli sayaçları başlat / duraklat / tamamla / sil.
          Çalışan sayaçlar saniyede bir tikler (popover kapalıyken de). Popover'a
          bağlı, veri-güdümlü (initialTimers + onChange). İçeride{" "}
          <code>Popover · Input · Button · Text</code> kullanır.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Demo</Heading>
        <TimeTracker initialTimers={TIMERS}>
          <Button type="primary" leadingIcon={<Time size={16} />}>
            Zaman Makinesi
          </Button>
        </TimeTracker>
        <Text size="sm" color="tertiary">
          Butona tıkla — "Toplantı" sayacı tikliyor; yeni sayaç ekleyebilir,
          başlat/durdur/tamamla/sil deneyebilirsin.
        </Text>
      </section>

      <section className={styles.section}>
        <Heading level={2}>API</Heading>
        <table className={styles.props}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tip</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>Tetikleyici — popover'ı açan eleman (ör. saat ikonu butonu).</td>
            </tr>
            <tr>
              <td><code>initialTimers</code></td>
              <td><code>TimerEntry[]?</code></td>
              <td>Başlangıç sayaçları ({"{"} key, name, seconds, running? {"}"}).</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string?</code></td>
              <td>Popover başlığı. Default "Zaman Makinesi".</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string?</code></td>
              <td>Yeni sayaç adı girişi placeholder'ı.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(timers) =&gt; void</code></td>
              <td>Liste değişince (ekle/başlat/durdur/tamamla/sil).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<TimeTracker initialTimers={[{ key: "1", name: "Telefon", seconds: 0 }]}>
  <Button type="text" leadingIcon={<Time size={18} />} aria-label="Zaman Makinesi" />
</TimeTracker>`}</Code>
      </section>
    </main>
  );
}
