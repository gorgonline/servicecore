"use client";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { Kbd } from "@servicecoreui/ui";
import styles from "./kbd.module.css";

export default function KbdPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">Kbd</Display>
        <Text size="lg" color="secondary">
          Klavye tuşu rozeti. Kısayol ipuçları (komut paleti, tooltip, yardım) için
          tek standart — tekrarlanan <code>&lt;kbd&gt;</code> + inline stil yerine.
          Stil token'lardan gelir.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Örnekler</Heading>
        <div className={styles.demoRow}>
          <span className={styles.group}>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
          <span className={styles.group}>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> gez
          </span>
          <span className={styles.group}>
            <Kbd>↵</Kbd> aç
          </span>
          <span className={styles.group}>
            <Kbd>esc</Kbd> kapat
          </span>
          <span className={styles.group}>
            <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> kaydet
          </span>
        </div>
        <Code block>{`<Kbd>⌘</Kbd>
<Kbd>K</Kbd>`}</Code>
      </section>

      <section className={styles.section}>
        <Heading level={2}>API</Heading>
        <Text size="md" color="secondary">
          Standart <code>&lt;kbd&gt;</code> prop'larını alır (<code>children</code>,{" "}
          <code>className</code>, …). Ekstra prop yok — sade bir token'lı primitif.
        </Text>
      </section>
    </main>
  );
}
