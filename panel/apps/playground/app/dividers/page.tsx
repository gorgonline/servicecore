"use client";

import Link from "next/link";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Card, Divider } from "@servicecoreui/ui/wraps";
import styles from "./dividers.module.css";

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

function DoDontGrid({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  const renderList = (items: string[]) => (
    <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
  return (
    <div className={styles.subgrid}>
      <Alert type="success" showIcon message="Ne zaman kullan" description={renderList(doItems)} />
      <Alert type="error" showIcon message="KULLANMA" description={renderList(dontItems)} />
    </div>
  );
}

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <Code block>{children}</Code>;
}

function AntiPattern({ title, children }: { title: string; children: React.ReactNode }) {
  return <Alert type="error" showIcon message={title} description={children} />;
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function DividersPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Divider</Display>
        <Text size="lg" color="secondary">
          Bölüm ayırıcı çizgi. Yatay (default) — sayfa/section bölümleme. Dikey — satır içi link/operation ayırıcı. AntD 5.7 baseline.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Yatay</a>
        <a href="#title">Başlıklı</a>
        <a href="#dashed">Dashed</a>
        <a href="#vertical">Dikey</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── BASIC HORIZONTAL ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>horizontal</span>
          <Heading level={2}>Yatay Divider</Heading>
        </div>
        <Text size="md" color="secondary">
          Default. Section'ları görsel olarak ayırır. <code>margin: 24px 0</code> default boşluk.
        </Text>
        <div className={styles.showcase}>
          <Text size="sm">Üst içerik — talep özeti</Text>
          <Divider />
          <Text size="sm">Alt içerik — yorum bölümü</Text>
        </div>
      </section>

      {/* ── WITH TITLE ── */}
      <section id="title" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>children + orientation</span>
          <Heading level={2}>Başlıklı Divider</Heading>
        </div>
        <Text size="md" color="secondary">
          Bölüm başlığını çizginin ortasına/sağına/soluna yerleştir.{" "}
          <code>plain</code> ile heading stilinden çıkarılır.
        </Text>
        <div className={styles.showcase}>
          <Divider>Center (default)</Divider>
          <Divider orientation="left">Left orientation</Divider>
          <Divider orientation="right">Right orientation</Divider>
          <Divider plain>plain (heading değil)</Divider>
        </div>
      </section>

      {/* ── DASHED ── */}
      <section id="dashed" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>dashed</span>
          <Heading level={2}>Dashed (Kesik)</Heading>
        </div>
        <Text size="md" color="secondary">
          Daha yumuşak ayrım — "ekleme alanı", "daha az kritik bölünme" sinyali.
        </Text>
        <div className={styles.showcase}>
          <Text size="sm">Üst</Text>
          <Divider dashed />
          <Text size="sm">Alt</Text>
          <Divider dashed orientation="left">Opsiyonel alanlar</Divider>
          <Text size="sm" color="tertiary">Aşağıdaki alanlar zorunlu değil...</Text>
        </div>
      </section>

      {/* ── VERTICAL ── */}
      <section id="vertical" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>type=&quot;vertical&quot;</span>
          <Heading level={2}>Dikey Divider</Heading>
        </div>
        <Text size="md" color="secondary">
          Satır içi öğeler arası (link, operation, metadata). Inline element.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.inlineOps}>
            <Button type="link" size="small">Düzenle</Button>
            <Divider type="vertical" />
            <Button type="link" size="small">Sil</Button>
            <Divider type="vertical" />
            <Button type="link" size="small">Detay</Button>
          </div>
          <div className={styles.inlineOps}>
            <Text size="sm" color="secondary">
              SC-4127
              <Divider type="vertical" />
              Donanım · Yazıcı
              <Divider type="vertical" />
              2 saat önce açıldı
            </Text>
          </div>
        </div>
        <DoDontGrid
          doItems={[
            "Tablo satırında 2-3 link operasyonu arası",
            "Breadcrumb-stil meta bilgileri",
            "Toolbar'da grup ayırma",
          ]}
          dontItems={[
            "Form alanları arası (gap ile boşluk yeter)",
            "Buton'lar arası (gap yeter, daha temiz)",
            "Çok yoğun listelerde (gürültü)",
          ]}
        />
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Detay sayfası — Card içinde grup başlıkları">
          <Card>
            <Heading level={4}>SC-4127</Heading>
            <Text size="sm" color="secondary">Print server bağlanamıyor — Muhasebe katı</Text>

            <Divider orientation="left">Bilgiler</Divider>
            <div className={styles.formGroup}>
              <div className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Durum</span>
                <span className={styles.fieldValue}>Beklemede</span>
              </div>
              <div className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Öncelik</span>
                <span className={styles.fieldValue}>Yüksek</span>
              </div>
              <div className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Kategori</span>
                <span className={styles.fieldValue}>Donanım · Yazıcı</span>
              </div>
            </div>

            <Divider orientation="left">SLA</Divider>
            <div className={styles.formGroup}>
              <div className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Yanıt</span>
                <span className={styles.fieldValue}>4 saat içinde</span>
              </div>
              <div className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Çözüm</span>
                <span className={styles.fieldValue}>1 iş günü</span>
              </div>
            </div>

            <Divider dashed orientation="left">Ek bilgiler (opsiyonel)</Divider>
            <Text size="sm" color="tertiary">
              Henüz ek bilgi eklenmedi.
            </Text>
          </Card>
        </MockBlock>

        <MockBlock caption="Tablo satır — satır içi action linkleri dikey divider ile">
          <Card>
            <div className={styles.ticketRow}>
              <span className={styles.ticketId}>SC-4127</span>
              <span className={styles.ticketTitle}>Print server bağlanamıyor</span>
              <div className={styles.inlineOps}>
                <Button type="link" size="small">Aç</Button>
                <Divider type="vertical" />
                <Button type="link" size="small">Ata</Button>
                <Divider type="vertical" />
                <Button type="link" size="small" danger>Sil</Button>
              </div>
            </div>
            <Divider style={{ margin: "0" }} />
            <div className={styles.ticketRow}>
              <span className={styles.ticketId}>SC-4126</span>
              <span className={styles.ticketTitle}>VPN yavaş, ev ofisi</span>
              <div className={styles.inlineOps}>
                <Button type="link" size="small">Aç</Button>
                <Divider type="vertical" />
                <Button type="link" size="small">Ata</Button>
                <Divider type="vertical" />
                <Button type="link" size="small" danger>Sil</Button>
              </div>
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Meta bilgi satırı — inline dikey divider ile">
          <Card>
            <Heading level={5}>Açık çağrılar — son güncelleme</Heading>
            <Text size="sm" color="secondary">
              5 dk önce
              <Divider type="vertical" />
              12 sonuç
              <Divider type="vertical" />
              Sayfa 1/3
              <Divider type="vertical" />
              Filtre: 2 aktif
            </Text>
          </Card>
        </MockBlock>

        <CodeBlock>{`<Divider />                              // yatay sade
<Divider orientation="left">Bilgiler</Divider>   // sol başlıklı
<Divider dashed orientation="left">Opsiyonel</Divider>  // dashed
<Divider type="vertical" />              // dikey (satır içi)
<Divider plain>küçük başlık</Divider>    // heading değil`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Her şey için divider">
          Form alanları arasına divider koymak gereksiz — gap (boşluk) yeter.
          Divider güçlü bir görsel sinyaldir, sadece <strong>anlamlı bölünme</strong>{" "}
          için kullan.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Card içinde nested + Divider">
          Card'lar zaten görsel kapsayıcı. İç içe gruplar için{" "}
          <code>Divider orientation=&quot;left&quot;</code> başlıklı kullan,
          yeni Card açma.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Vertical divider'ı flex/gap yerine">
          Button'lar arası dikey divider gürültülü. Aralarına{" "}
          <code>gap</code> ver, divider'a gerek yok. Vertical sadece linkler ve
          meta bilgi için.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Solid + dashed karışık">
          Aynı bölgede solid ve dashed divider karışırsa hiyerarşi bozulur.
          Dashed sadece <strong>ikincil/opsiyonel</strong> bölünme — gerekirse
          tek dashed olsun, gerisi solid.
        </AntiPattern>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
