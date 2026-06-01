"use client";

import {
  Search,
  User,
  Email,
  Phone,
  Locked,
  Information,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Card, Input } from "@servicecoreui/ui/wraps";
import styles from "./inputs.module.css";

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

export default function InputsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Input</Display>
        <Text size="lg" color="secondary">
          Metin girişi. 4 ana varyant: <strong>Input</strong>, <strong>Input.Search</strong>, <strong>Input.Password</strong>, <strong>Input.TextArea</strong>. AntD 5.7 baseline — `Input.OTP` (5.16+) ve `variant` prop (5.13+) yok.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Input</a>
        <a href="#sizes">Boyutlar</a>
        <a href="#prefix">Prefix/Suffix</a>
        <a href="#status">Status</a>
        <a href="#search">Search</a>
        <a href="#password">Password</a>
        <a href="#textarea">TextArea</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Input</span>
          <Heading level={2}>Temel Input</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek satırlık metin girişi. Form alanları, filtre kutuları, basit veri girişi için.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>default</span>
            <Input placeholder="Ad Soyad" />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>disabled</span>
            <Input placeholder="Pasif alan" disabled />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>allowClear</span>
            <Input placeholder="X ile temizle" defaultValue="Silinebilir metin" allowClear />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>showCount</span>
            <Input placeholder="Açıklama" maxLength={50} showCount />
          </div>
        </div>
        <DoDontGrid
          doItems={[
            "Tek satır girişler — isim, e-posta, telefon, ID",
            "Filtre kutuları (tablo üstünde)",
            "Hızlı arama (Search variant tercih)",
            "Form içinde Form.Item ile",
          ]}
          dontItems={[
            "Çok satır içerik için (TextArea kullan)",
            "Şifre için (Password kullan)",
            "Arama için ana submit ile (Search kullan)",
            "Karmaşık select için (Select kullan)",
          ]}
        />
      </section>

      {/* ── SIZES ── */}
      <section id="sizes" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>size</span>
          <Heading level={2}>Boyutlar</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>small (28px)</strong> · <strong>middle (36px, default)</strong> · <strong>large (44px)</strong> — controlHeight token'larına bağlı.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>small</span>
            <Input size="small" placeholder="Yoğun tablo / kompakt filtre" />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>middle</span>
            <Input size="middle" placeholder="Default — çoğu form alanı" />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>large</span>
            <Input size="large" placeholder="Prominent — login, hero arama" />
          </div>
        </div>
      </section>

      {/* ── PREFIX/SUFFIX ── */}
      <section id="prefix" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>prefix / suffix</span>
          <Heading level={2}>Prefix &amp; Suffix</Heading>
        </div>
        <Text size="md" color="secondary">
          İkon veya kısa metin <strong>border'ın içinde</strong>. <code>prefix</code> sol, <code>suffix</code> sağ. Carbon ikon ideal.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>prefix</span>
            <Input prefix={<Search />} placeholder="Talep ara..." />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>prefix + suffix</span>
            <Input
              prefix={<User />}
              suffix={<Information />}
              placeholder="Kullanıcı adı"
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>text prefix</span>
            <Input prefix="https://" placeholder="domain.com" />
          </div>
        </div>
        <Text size="sm" color="secondary">
          NOT: AntD'nin <code>addonBefore</code> / <code>addonAfter</code> prop'ları{" "}
          <strong>deprecated</strong>. Yerine <code>Space.Compact</code> + ikon kullan (anti-pattern bölümüne bak).
        </Text>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>status</span>
          <Heading level={2}>Validation Status</Heading>
        </div>
        <Text size="md" color="secondary">
          Form validation feedback'i. <code>error</code> (kırmızı) ve <code>warning</code> (sarı). Mesajla birlikte göster — sadece renk yetersiz.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.formField}>
            <span className={styles.formLabel}>E-posta</span>
            <Input status="error" prefix={<Email />} defaultValue="ayse@gorgo" />
            <span className={styles.formError}>Geçerli bir e-posta adresi girin</span>
          </div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Telefon (opsiyonel)</span>
            <Input status="warning" prefix={<Phone />} defaultValue="0555 123" />
            <span className={styles.formHint}>11 haneli numara girin (eksik)</span>
          </div>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section id="search" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Input.Search</span>
          <Heading level={2}>Arama</Heading>
        </div>
        <Text size="md" color="secondary">
          Submit button'lı arama. Enter veya butona basınca <code>onSearch</code> çağırılır.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basic</span>
            <Input.Search placeholder="Talep, asset, kullanıcı ara..." />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>enterButton</span>
            <Input.Search placeholder="Bilgi tabanında ara" enterButton="Ara" />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>loading</span>
            <Input.Search placeholder="Sonuçlar yükleniyor..." enterButton loading />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>large</span>
            <Input.Search size="large" placeholder="Hero arama" enterButton="Ara" />
          </div>
        </div>
        <DoDontGrid
          doItems={[
            "Liste/tablo üstünde ana arama bar (büyük)",
            "Bilgi tabanı arama (enterButton ile)",
            "Submit gerekenler — onSearch callback",
          ]}
          dontItems={[
            "Anlık filtre için (basic Input + onChange daha temiz)",
            "Sayfa içinde 2+ arama yan yana (kafa karıştırıcı)",
            "Form içinde (form submit'i ezer)",
          ]}
        />
      </section>

      {/* ── PASSWORD ── */}
      <section id="password" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Input.Password</span>
          <Heading level={2}>Şifre</Heading>
        </div>
        <Text size="md" color="secondary">
          Maskelenmiş giriş + göz ikonu ile gizle/göster.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basic</span>
            <Input.Password placeholder="Şifre" />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>+ prefix icon</span>
            <Input.Password prefix={<Locked />} placeholder="Mevcut şifre" />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>no toggle</span>
            <Input.Password placeholder="Sadece maskeli" visibilityToggle={false} />
          </div>
        </div>
      </section>

      {/* ── TEXTAREA ── */}
      <section id="textarea" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Input.TextArea</span>
          <Heading level={2}>TextArea</Heading>
        </div>
        <Text size="md" color="secondary">
          Çok satır metin. <code>autoSize</code> ile içeriğe göre boy ayarlanır.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Talep açıklaması</span>
            <Input.TextArea
              placeholder="Sorunu detaylı anlat — ne oldu, ne zaman, hangi ekranlarda..."
              autoSize={{ minRows: 3, maxRows: 8 }}
              showCount
              maxLength={500}
            />
          </div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Yorum</span>
            <Input.TextArea placeholder="Yorum ekle..." rows={3} />
          </div>
        </div>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Login form — large boyut, prefix ikonları, status göstergesi">
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
              <Heading level={3}>ServiceCore'a giriş</Heading>
              <div className={styles.formField}>
                <span className={styles.formLabel}>E-posta</span>
                <Input size="large" prefix={<Email />} placeholder="ad.soyad@sirket.com" />
              </div>
              <div className={styles.formField}>
                <span className={styles.formLabel}>Şifre</span>
                <Input.Password size="large" prefix={<Locked />} placeholder="••••••••" />
              </div>
              <Button type="primary" size="large" block>
                Giriş yap
              </Button>
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Tablo üstünde filtre arama — small boyut, prefix icon">
          <Card>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Input
                size="small"
                prefix={<Search />}
                placeholder="Talep no, başlık veya kategori..."
                allowClear
                style={{ maxWidth: 400 }}
              />
              <Text size="sm" color="tertiary">
                12 sonuç bulundu
              </Text>
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Ticket yorum kutusu — TextArea auto-size + showCount">
          <Card title="Yorum ekle">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Input.TextArea
                placeholder="Bu talepte ilerleme veya geri bildirim..."
                autoSize={{ minRows: 3, maxRows: 6 }}
                showCount
                maxLength={500}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Button type="default">Vazgeç</Button>
                <Button type="primary">Yorum gönder</Button>
              </div>
            </div>
          </Card>
        </MockBlock>

        <CodeBlock>{`<Input
  size="large"
  prefix={<Email />}
  placeholder="ad.soyad@sirket.com"
  status={isInvalid ? "error" : ""}
/>

<Input.Search
  enterButton="Ara"
  loading={searching}
  onSearch={(value) => fetchResults(value)}
/>

<Input.TextArea
  autoSize={{ minRows: 3, maxRows: 8 }}
  showCount
  maxLength={500}
/>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — addonBefore / addonAfter kullanmak">
          AntD'de bu prop'lar <strong>deprecated</strong>. Yerine{" "}
          <code>prefix</code> / <code>suffix</code> (içeride) veya{" "}
          <code>Space.Compact</code> (yan yana kontrol) kullan.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Dynamic prefix/suffix değişimi">
          Prefix veya suffix runtime'da değişirse focus kaybolur. State'e bağlı{" "}
          switching gerekiyorsa boş <code>{`<span />`}</code> placeholder ile DOM yapısını sabit tut.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Status renk yetersiz">
          Sadece <code>status=&quot;error&quot;</code> kırmızı border yetmez — altına{" "}
          <strong>hata mesajı</strong> ekle. Renk körü kullanıcılar için aria-describedby kullan.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Input.Search'ü form içinde kullanmak">
          Search'ün kendi submit'i var, form submit'i ile çakışır. Form'da{" "}
          basic <code>Input</code> + Form button kullan.
        </AntiPattern>

        <AntiPattern title="Hata 5 — Çok satır için Input">
          Açıklama, yorum, bio gibi alanlar için <code>Input</code> yerine{" "}
          <code>Input.TextArea</code> kullan — yatay scroll oluşur.
        </AntiPattern>
      </section>
    </main>
  );
}
