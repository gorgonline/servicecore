"use client";

import { Time } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { RecentPanels } from "@servicecoreui/ui";
import { Button } from "@servicecoreui/ui";
import styles from "./recent-panels.module.css";

const PANELS = [
  { key: "ornek", title: "Örnek Pano", path: "Genel · /panolar/ornek", lastViewed: "şimdi", lastViewedTitle: "2 Haziran 2026, 14:30", current: true },
  { key: "sla", title: "SLA Genel Bakış", path: "Raporlama · /panolar/sla", lastViewed: "22 dk önce", lastViewedTitle: "2 Haziran 2026, 14:08" },
  { key: "ops", title: "Operasyon Panosu", path: "Operasyon Yönetimi · /panolar/ops", lastViewed: "2 sa önce", lastViewedTitle: "2 Haziran 2026, 12:30" },
  { key: "admin", title: "Erişim Yönetimi", path: "Yönetim › Erişim · /panolar/admin", lastViewed: "Dün", lastViewedTitle: "1 Haziran 2026, 17:45" },
  { key: "cmdb", title: "Donanım Envanteri", path: "CMDB · /panolar/cmdb", lastViewed: "2 gün önce", lastViewedTitle: "31 Mayıs 2026, 09:12" },
];

export default function RecentPanelsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">RecentPanels</Display>
        <Text size="lg" color="secondary">
          "Son Panolar" hızlı erişim listesi — saat ikonuna bağlı bir{" "}
          <code>Popover</code>. Ana pano seçiciden ayrıdır: son görüntülenen panolara
          gider ve listeyi yönetir. Satır omurgası paylaşılan <code>ListItem</code>
          (DRY). Silme yıkıcı değil — anında çıkar + "Geri al" toast.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Demo</Heading>
        <Text color="secondary">
          Saate tıkla. Bir satırın üzerine gel → × belirir; tıkla → çıkar + "Geri al".
          ↑/↓ ile gez, ↵ ile aç. "Tümünü temizle" onay ister.
        </Text>
        <div className={styles.demo}>
          <RecentPanels
            panels={PANELS}
            onNavigate={() => {}}
            onViewAll={() => {}}
          >
            <Button
              type="text"
              leadingIcon={<Time size={18} />}
              aria-label="Son panolar"
              title="Son panolar"
            />
          </RecentPanels>
        </div>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Boş durum</Heading>
        <Text color="secondary">
          Liste boşsa Empty + CTA ("Tüm panolara göz at"); sayaç, "Tümünü temizle" ve
          footer gizlenir.
        </Text>
        <div className={styles.demo}>
          <RecentPanels panels={[]} onViewAll={() => {}}>
            <Button
              type="text"
              leadingIcon={<Time size={18} />}
              aria-label="Son panolar"
              title="Son panolar"
            />
          </RecentPanels>
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
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>Tetikleyici — popover'ı açan eleman (saat butonu).</td>
            </tr>
            <tr>
              <td><code>panels</code></td>
              <td><code>RecentPanel[]</code></td>
              <td>Başlangıç listesi; çıkar/geri al/temizle içeride yönetilir.</td>
            </tr>
            <tr>
              <td><code>onNavigate</code></td>
              <td><code>(p) =&gt; void</code></td>
              <td>Bir panoya gidilince (panel kapanır).</td>
            </tr>
            <tr>
              <td><code>onViewAll</code></td>
              <td><code>() =&gt; void</code></td>
              <td>"Tüm panolar" çıkışı (panel kapanır).</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(panels) =&gt; void</code></td>
              <td>Liste değişince (çıkar / geri al / temizle).</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>Başlık (vars. "Son Panolar").</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>RecentPanel</Heading>
        <table className={styles.props}>
          <thead>
            <tr>
              <th>Alan</th>
              <th>Tip</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>key</code></td>
              <td><code>string</code></td>
              <td>Benzersiz anahtar.</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>Pano adı — ana satır.</td>
            </tr>
            <tr>
              <td><code>path</code></td>
              <td><code>string?</code></td>
              <td>Modül/yol — ikincil satır.</td>
            </tr>
            <tr>
              <td><code>lastViewed</code></td>
              <td><code>ReactNode?</code></td>
              <td>Son görüntülenme — sağa hizalı sessiz meta.</td>
            </tr>
            <tr>
              <td><code>lastViewedTitle</code></td>
              <td><code>string?</code></td>
              <td>Tam tarih — meta'nın <code>title</code> attribute'u.</td>
            </tr>
            <tr>
              <td><code>current</code></td>
              <td><code>boolean?</code></td>
              <td>Şu an açık pano — sol accent şerit + SR işareti.</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode?</code></td>
              <td>Satır ikonu (vars. Dashboard).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<RecentPanels
  panels={recent}
  onNavigate={(p) => router.push(p.path)}
  onViewAll={() => router.push("/panolar")}
>
  {/* overlay tetikleyicisi Tooltip ile sarılmaz — hover ipucu native title */}
  <Button
    type="text"
    leadingIcon={<Time size={18} />}
    aria-label="Son panolar"
    title="Son panolar"
  />
</RecentPanels>`}</Code>
      </section>
    </main>
  );
}
