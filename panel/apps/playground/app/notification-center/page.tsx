"use client";

import { Notification } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { NotificationCenter } from "@servicecoreui/ui";
import { Button, Badge } from "@servicecoreui/ui";
import styles from "./notification-center.module.css";

const ACTIVITIES = [
  { key: "1", title: "SC-4127 güncellendi", description: "Durum: Beklemede → İşlemde", time: "5 dk" },
  { key: "2", title: "Yeni yorum — SC-4125", description: "Selin Koç: AD entegrasyonu tamam", time: "1 sa" },
  { key: "3", title: "SLA uyarısı — SC-4124", description: "Yanıt süresi aşıldı", time: "2 sa" },
];

export default function NotificationCenterPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">NotificationCenter</Display>
        <Text size="lg" color="secondary">
          Bildirim merkezi — bell ikonuna bağlı popover; iki sekme
          (Etkinlikler / Aktivite Kayıtları), sekme doluysa liste, boşsa Empty.
          Veri-güdümlü. İçeride <code>Popover · Tabs · Empty · Badge · Text</code>{" "}
          kullanır.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Demo</Heading>
        <NotificationCenter activities={ACTIVITIES}>
          <Badge dot>
            <Button type="primary" leadingIcon={<Notification size={16} />}>
              Bildirimler
            </Button>
          </Badge>
        </NotificationCenter>
        <Text size="sm" color="tertiary">
          Etkinlikler sekmesi boş (Empty), Aktivite Kayıtları dolu (liste).
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
              <td>Tetikleyici — popover'ı açan eleman (bell butonu).</td>
            </tr>
            <tr>
              <td><code>events</code></td>
              <td><code>NotificationItem[]?</code></td>
              <td>Etkinlikler sekmesi ({"{"} key, title, description?, time?, unread? {"}"}).</td>
            </tr>
            <tr>
              <td><code>activities</code></td>
              <td><code>NotificationItem[]?</code></td>
              <td>Aktivite Kayıtları sekmesi.</td>
            </tr>
            <tr>
              <td><code>eventsLabel / activitiesLabel</code></td>
              <td><code>string?</code></td>
              <td>Sekme başlıkları.</td>
            </tr>
            <tr>
              <td><code>emptyText</code></td>
              <td><code>string?</code></td>
              <td>Boş durum metni. Default "Henüz bir bildirim yok".</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<NotificationCenter activities={[{ key: "1", title: "SC-4127 güncellendi", time: "5 dk" }]}>
  <Badge dot>
    <Button type="text" leadingIcon={<Notification size={18} />} aria-label="Bildirimler" />
  </Badge>
</NotificationCenter>`}</Code>
      </section>
    </main>
  );
}
