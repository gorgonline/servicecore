"use client";

import { Settings, UserMultiple, Plug, Flow } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { NavCard } from "@servicecoreui/ui/custom";
import styles from "./nav-card.module.css";

export default function NavCardPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">NavCard</Display>
        <Text size="lg" color="secondary">
          İkon + başlık + açıklama taşıyan tıklanabilir tile. Ayarlar gibi
          grid'lerde modül/sayfa kartı — "ikon + başlık + açıklama, tıklanabilir"
          tekrar eden deseni (DRY). <code>href</code> verilirse <code>{"<a>"}</code>,{" "}
          <code>onClick</code> verilirse <code>{"<button>"}</code>, hiçbiri yoksa
          statik. Hover'da accent kenarlık + gölge.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Örnekler</Heading>
        <div className={styles.grid}>
          <NavCard
            icon={<Settings size={24} />}
            title="Genel Ayarlar"
            description="Genel Uygulama Ayarları"
            onClick={() => {}}
          />
          <NavCard
            icon={<UserMultiple size={24} />}
            title="Teknisyen Grupları"
            description="Destek Gruplarını Yönet"
            onClick={() => {}}
          />
          <NavCard
            icon={<Plug size={24} />}
            title="Entegrasyonlar"
            description="Dış Sistemlerle Entegrasyonlar"
            onClick={() => {}}
          />
          <NavCard
            icon={<Flow size={24} />}
            title="İş Akışı"
            description="Süreçlere Özel Dinamik İş Akışları"
            href="#"
          />
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
              <td>Sol ikon (accent renkli).</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td>Başlık (accent).</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td><code>ReactNode?</code></td>
              <td>İkincil açıklama.</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>() =&gt; void</code></td>
              <td>Verilirse <code>{"<button>"}</code> olur.</td>
            </tr>
            <tr>
              <td><code>href</code></td>
              <td><code>string?</code></td>
              <td>Verilirse <code>{"<a>"}</code> olur (Next'te client routing için onClick+router tercih et).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<NavCard
  icon={<Settings size={24} />}
  title="Genel Ayarlar"
  description="Genel Uygulama Ayarları"
  onClick={() => router.push("/ayarlar/genel")}
/>`}</Code>
      </section>
    </main>
  );
}
