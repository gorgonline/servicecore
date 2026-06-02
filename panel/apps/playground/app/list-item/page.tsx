"use client";

import { Task, WarningAlt, Notification } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { ListItem } from "@servicecoreui/ui/custom";
import styles from "./list-item.module.css";

export default function ListItemPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">ListItem</Display>
        <Text size="lg" color="secondary">
          İkon + başlık + açıklama (+ meta) satırı. NotificationCenter, UserMenu gibi
          listelerin ortak satır deseni (DRY). <code>onClick</code> verilirse
          tıklanabilir buton, yoksa statik satır olur.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Örnekler</Heading>
        <div className={styles.demo}>
          <ListItem
            icon={<Task size={20} />}
            title="Görevlerim"
            description="Görev Detaylarım"
            onClick={() => {}}
          />
          <ListItem
            icon={<WarningAlt size={20} />}
            title="SC-4127"
            description="Print server bağlanamıyor"
            meta="5 dk"
            onClick={() => {}}
          />
          <ListItem icon={<Notification size={20} />} title="Statik satır (onClick yok)" />
        </div>
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
              <td><code>icon</code></td>
              <td><code>ReactNode?</code></td>
              <td>Sol ikon.</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td>Ana metin.</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td><code>ReactNode?</code></td>
              <td>İkincil açıklama (alt satır).</td>
            </tr>
            <tr>
              <td><code>meta</code></td>
              <td><code>ReactNode?</code></td>
              <td>Sağda hizalı küçük meta (zaman vb.).</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>() =&gt; void</code></td>
              <td>Verilirse satır tıklanabilir buton olur (hover + cursor).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<ListItem
  icon={<Task size={20} />}
  title="Görevlerim"
  description="Görev Detaylarım"
  meta="5 dk"
  onClick={() => open(id)}
/>`}</Code>
      </section>
    </main>
  );
}
