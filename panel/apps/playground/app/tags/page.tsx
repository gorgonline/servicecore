"use client";

import {
  CheckmarkOutline,
  WarningAlt,
  Time,
  Close,
  ArrowRight,
  Information,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Card, Tag } from "@servicecoreui/ui/wraps";
import styles from "./tags.module.css";

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

export default function TagsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Tag</Display>
        <Text size="lg" color="secondary">
          Durum, kategori, etiket için küçük renkli çip. ITSM panelinde <strong>her ticket, asset, change request bir tag taşır</strong>. AntD Tag wrap, ServiceCore'un 6 anlam tonuyla.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#tonlar">Tonlar</a>
        <a href="#taxonomy">ITSM Taksonomisi</a>
        <a href="#dot">Dot</a>
        <a href="#solid">Solid</a>
        <a href="#icon">Icon</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── TONLAR ── */}
      <section id="tonlar" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>tone</span>
          <Heading level={2}>Tonlar</Heading>
        </div>
        <Text size="md" color="secondary">
          AntD'nin 13 renkli paletini kullanmıyoruz. 6 anlam tonu:{" "}
          <strong>neutral, info, success, warning, danger, accent</strong>. Her ton bir mesaj taşır.
        </Text>
        <div className={styles.tagShowcase}>
          <Tag tone="neutral">Neutral</Tag>
          <Tag tone="info">Info</Tag>
          <Tag tone="success">Success</Tag>
          <Tag tone="warning">Warning</Tag>
          <Tag tone="danger">Danger</Tag>
          <Tag tone="accent">Accent</Tag>
        </div>
        <DoDontGrid
          doItems={[
            "Anlama göre seç — &quot;Çözüldü&quot; success, &quot;Aşıldı&quot; danger",
            "Aynı tipteki tüm tag'lerde aynı ton (tutarlılık)",
            "Az ton kullan — bir ekranda 3-4'ten fazla farklı ton kafa karıştırır",
            "Default = neutral (renk yokken)",
          ]}
          dontItems={[
            "Estetik için renk seçme — danger sadece danger için",
            "Aynı statüye farklı sayfalarda farklı ton verme",
            "Random renk (AntD'nin 13 preset'i panel kimliğini bozar)",
          ]}
        />
      </section>

      {/* ── TAXONOMY ── */}
      <section id="taxonomy" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>ITSM</span>
          <Heading level={2}>ITSM Status Taksonomisi</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore'da hangi statü hangi ton — referans tablo. Backend bunu birebir uygular.
        </Text>
        <div className={styles.taxonomy}>
          <div className={styles.taxonomyRow}>
            <Tag tone="info" dot>Açık</Tag>
            <div className={styles.taxonomyLabel}>
              <span className={styles.taxonomyName}>Açık / Open</span>
              <span className={styles.taxonomyDesc}>Yeni oluşturulmuş, henüz işlem yapılmadı</span>
            </div>
          </div>
          <div className={styles.taxonomyRow}>
            <Tag tone="warning" dot>Beklemede</Tag>
            <div className={styles.taxonomyLabel}>
              <span className={styles.taxonomyName}>Beklemede / Pending</span>
              <span className={styles.taxonomyDesc}>Kullanıcı veya 3. taraf bekleniyor</span>
            </div>
          </div>
          <div className={styles.taxonomyRow}>
            <Tag tone="accent" dot>İşlemde</Tag>
            <div className={styles.taxonomyLabel}>
              <span className={styles.taxonomyName}>İşlemde / In Progress</span>
              <span className={styles.taxonomyDesc}>Operatör aktif çalışıyor</span>
            </div>
          </div>
          <div className={styles.taxonomyRow}>
            <Tag tone="success" dot>Çözüldü</Tag>
            <div className={styles.taxonomyLabel}>
              <span className={styles.taxonomyName}>Çözüldü / Resolved</span>
              <span className={styles.taxonomyDesc}>Çözüm uygulandı, kapatma onayı bekliyor</span>
            </div>
          </div>
          <div className={styles.taxonomyRow}>
            <Tag tone="neutral" dot>Kapatıldı</Tag>
            <div className={styles.taxonomyLabel}>
              <span className={styles.taxonomyName}>Kapatıldı / Closed</span>
              <span className={styles.taxonomyDesc}>Final, değiştirilemez</span>
            </div>
          </div>
          <div className={styles.taxonomyRow}>
            <Tag tone="danger" dot>SLA Aşıldı</Tag>
            <div className={styles.taxonomyLabel}>
              <span className={styles.taxonomyName}>SLA Aşıldı / Breached</span>
              <span className={styles.taxonomyDesc}>Hedef süre geçti, dikkat gerekir</span>
            </div>
          </div>
        </div>
        <Text size="sm" color="secondary">
          NOT: <strong>İptal</strong> statüsü → neutral (final, hata değil).{" "}
          <strong>Reddedildi</strong> → danger (sorunlu son).
        </Text>
      </section>

      {/* ── DOT ── */}
      <section id="dot" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>dot</span>
          <Heading level={2}>Dot Indicator</Heading>
        </div>
        <Text size="md" color="secondary">
          Önündeki yuvarlak nokta. Statüyü <strong>tarama-okuma</strong> kolaylaştırır — operatör listeye bakınca rengi hemen yakalar.
        </Text>
        <div className={styles.tagShowcase}>
          <Tag tone="info" dot>Açık</Tag>
          <Tag tone="warning" dot>Beklemede</Tag>
          <Tag tone="accent" dot>İşlemde</Tag>
          <Tag tone="success" dot>Çözüldü</Tag>
          <Tag tone="neutral" dot>Kapatıldı</Tag>
          <Tag tone="danger" dot>SLA Aşıldı</Tag>
        </div>
        <DoDontGrid
          doItems={[
            "Tablo satırlarında status sütununda — dot okumayı hızlandırır",
            "Liste filter chip'lerinde",
            "Detay sayfasında ana statü göstergesinde",
          ]}
          dontItems={[
            "Kategori/etiket için (orada dot anlamsız)",
            "Closable tag'lerde (kalabalık görünür)",
          ]}
        />
      </section>

      {/* ── SOLID ── */}
      <section id="solid" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>solid</span>
          <Heading level={2}>Solid (Yoğun)</Heading>
        </div>
        <Text size="md" color="secondary">
          Daha yüksek dikkat çeker. <strong>Yıkıcı veya kritik durumlar</strong> için.{" "}
          Çok kullanma — bütün tag'leri solid yaparsan vurgu kaybolur.
        </Text>
        <div className={styles.tagShowcase}>
          <Tag tone="danger" solid>Kritik</Tag>
          <Tag tone="warning" solid>Acil</Tag>
          <Tag tone="success" solid>Onaylandı</Tag>
          <Tag tone="accent" solid>Yeni</Tag>
        </div>
        <Text size="sm" color="secondary">
          Tek bir sayfada en fazla 1-2 solid tag. Genel kullanım sade (subtle/default).
        </Text>
      </section>

      {/* ── ICON ── */}
      <section id="icon" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>leadingIcon</span>
          <Heading level={2}>Icon ile</Heading>
        </div>
        <Text size="md" color="secondary">
          Carbon icon prefix. Görsel sinyali güçlendirir — özellikle danger/warning için.
        </Text>
        <div className={styles.tagShowcase}>
          <Tag tone="success" leadingIcon={<CheckmarkOutline />}>Çözüldü</Tag>
          <Tag tone="warning" leadingIcon={<Time />}>2 saat kaldı</Tag>
          <Tag tone="danger" leadingIcon={<WarningAlt />}>SLA Aşıldı</Tag>
          <Tag tone="info" leadingIcon={<Information />}>Bilgi gerekli</Tag>
        </div>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Ticket listesi — her satırda status tag">
          <Card>
            <div className={styles.ticketTable}>
              <div className={`${styles.ticketRow} ${styles.ticketRowHeader}`}>
                <span>ID</span>
                <span>Başlık</span>
                <span>Öncelik</span>
                <span>Durum</span>
              </div>
              {[
                { id: "SC-4127", title: "Print server bağlanamıyor", pri: "danger", priLabel: "Yüksek", status: "warning", statusLabel: "Beklemede" },
                { id: "SC-4126", title: "VPN yavaş, ev ofisi etkileniyor", pri: "warning", priLabel: "Orta", status: "accent", statusLabel: "İşlemde" },
                { id: "SC-4125", title: "Yeni kullanıcı AD entegrasyonu", pri: "neutral", priLabel: "Düşük", status: "success", statusLabel: "Çözüldü" },
                { id: "SC-4124", title: "Outlook kalibrasyon sorunu", pri: "danger", priLabel: "Yüksek", status: "danger", statusLabel: "SLA Aşıldı" },
                { id: "SC-4123", title: "Yazıcı kartuş değişimi", pri: "neutral", priLabel: "Düşük", status: "neutral", statusLabel: "Kapatıldı" },
              ].map((t) => (
                <div key={t.id} className={styles.ticketRow}>
                  <span className={styles.ticketId}>{t.id}</span>
                  <span className={styles.ticketTitle}>{t.title}</span>
                  <Tag tone={t.pri as "danger" | "warning" | "neutral"} size="small">{t.priLabel}</Tag>
                  <Tag tone={t.status as "warning" | "accent" | "success" | "danger" | "neutral"} dot size="small">
                    {t.statusLabel}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Detay sayfası header — büyük statü tag'i ile dot">
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Text size="xs" color="tertiary" style={{ fontFamily: "var(--sc-font-mono)" }}>
                  SC-4127
                </Text>
                <Tag tone="warning" dot leadingIcon={<Time />}>
                  Beklemede — 2 saat kaldı
                </Tag>
                <Tag tone="danger" size="small">Yüksek Öncelik</Tag>
              </div>
              <Heading level={3}>Print server bağlanamıyor — Muhasebe katı</Heading>
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Filter bar — closable tag'ler aktif filtreyi gösterir">
          <Card subtle size="small">
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <Text size="sm" color="secondary">Filtreler:</Text>
              <Tag tone="accent" closable>Durum: Açık</Tag>
              <Tag tone="accent" closable>Öncelik: Yüksek</Tag>
              <Tag tone="accent" closable>Kategori: Donanım</Tag>
              <Tag tone="neutral" closable>Atanan: Ben</Tag>
            </div>
          </Card>
        </MockBlock>

        <CodeBlock>{`<Tag tone="warning" dot>Beklemede</Tag>
<Tag tone="danger" leadingIcon={<WarningAlt />}>SLA Aşıldı</Tag>
<Tag tone="accent" closable onClose={removeFilter}>Durum: Açık</Tag>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Aynı statüye farklı ton">
          &quot;Çözüldü&quot; bir sayfada success, başka sayfada info olamaz. Taksonomi sabit.
        </AntiPattern>

        <AntiPattern title="Hata 2 — AntD'nin renkli preset'lerini kullanmak">
          <code>{`<Tag color="magenta">`}</code>,{" "}
          <code>{`<Tag color="lime">`}</code>,{" "}
          <code>{`<Tag color="purple">`}</code> — panel kimliğini bozar. Sadece tone prop'u.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Tag yerine renkli metin">
          Statü için renkli yazı yazma (örn. yeşil &quot;Çözüldü&quot; metin). Tag bir{" "}
          <strong>kapsayıcı</strong>; tarama hızını arttırır. Sadece metin gözden kaçar.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Bir satırda 5+ tag">
          Tablo satırında en fazla 2-3 tag (öncelik + statü). Daha fazlası gürültü olur — diğerlerini detay sayfasına bırak.
        </AntiPattern>
      </section>
    </main>
  );
}
