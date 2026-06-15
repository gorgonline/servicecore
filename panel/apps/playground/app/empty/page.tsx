"use client";

import { Add, Search, DocumentBlank, NotificationOff, Filter } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Empty } from "@servicecoreui/ui";
import styles from "./empty.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  table,
}: {
  caption: string;
  children: React.ReactNode;
  table?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={`${styles.mockFrame} ${table ? styles.mockFrameTable : ""}`}>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <Code block>{children}</Code>;
}

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

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function EmptyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Empty</Display>
        <Text size="lg" color="secondary">
          Boş durum (empty state). Bilet listesi boş, arama sonucu yok, filter
          sonuç yok, henüz yorum yok. Sade bir görsel + tek cümle açıklama +{" "}
          <strong>tek CTA button</strong> — kullanıcı bir sonraki adımı net
          bilmeli.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Empty vs Loading vs Error</a>
        <a href="#default">Default</a>
        <a href="#simple">Simple</a>
        <a href="#custom-icon">Custom Icon</a>
        <a href="#with-action">With Action</a>
        <a href="#no-desc">No Description</a>
        <a href="#mock">Real Scenarios</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── API Notu ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>not</span>
          <Heading level={2}>API: AntD 5.7 baseline</Heading>
        </div>
        <Alert
          type="success"
          showIcon
          message="5.7'de mevcut tüm temel API"
          description={
            <>
              <code>description</code> (ReactNode | false),{" "}
              <code>image</code> (ReactNode | URL string),{" "}
              <code>imageStyle</code>, <code>children</code> (footer/action
              area).
              <br />
              <strong>Sabitler:</strong>{" "}
              <code>Empty.PRESENTED_IMAGE_DEFAULT</code> (gri çizgi sanatı),{" "}
              <code>Empty.PRESENTED_IMAGE_SIMPLE</code> (sade küçük üçgen —
              tablo footer için).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>classNames</code>/<code>styles</code> semantic DOM
              elements (5.23+, modern variant 6.0+) — özelleştirme için CSS
              module ile <code>.ant-empty-image</code>,{" "}
              <code>.ant-empty-description</code>,{" "}
              <code>.ant-empty-footer</code> override et.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="description={false} — sadece görsel"
          description={
            <>
              Çok dar yerde (table footer) sadece sembolle göster. Ama metin
              olmadan kullanıcı "ne anlama geliyor" düşünür — sadece tablo
              dışında düşün.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Empty vs Loading vs Error</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Empty: veri YOK (hiç bilet, sonuç yok, draft yok)",
            "Loading: veri geliyor (Skeleton veya Spin)",
            "Error: veri yüklenemedi (Result + retry button)",
            "Empty'de her zaman CTA — 'Ne yapayım?' sorusuna cevap",
          ]}
          dontItems={[
            "Loading yerine Empty göstermek (kullanıcı 'data yok' sanır)",
            "Error'u Empty'le karıştırmak (Result error variant kullan)",
            "Empty + CTA olmaması (boşluk anlamsız kalır)",
            "Empty'de uzun roman yazmak — tek cümle yeter",
          ]}
        />
      </section>

      {/* ── DEFAULT ── */}
      <section id="default" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>default</span>
          <Heading level={2}>Default — varsayılan illüstrasyon</Heading>
        </div>
        <MockBlock caption="Default — gri çizgi sanatı + 'No data'">
          <Empty />
        </MockBlock>
        <CodeBlock>{`<Empty />
// veya açıkça:
<Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="Henüz veri yok" />`}</CodeBlock>
      </section>

      {/* ── SIMPLE ── */}
      <section id="simple" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>PRESENTED_IMAGE_SIMPLE</span>
          <Heading level={2}>Simple — kompakt (tablo footer için)</Heading>
        </div>
        <Text size="md" color="secondary">
          Daha sade ve küçük illüstrasyon. Tablo "no data" footer'ı, dropdown,
          search no result için.
        </Text>
        <MockBlock caption="Simple variant — dar alan için">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sonuç yok"
          />
        </MockBlock>
        <CodeBlock>{`<Empty
  image={Empty.PRESENTED_IMAGE_SIMPLE}
  description="Sonuç yok"
/>`}</CodeBlock>
      </section>

      {/* ── CUSTOM ICON ── */}
      <section id="custom-icon" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>image — Carbon icon</span>
          <Heading level={2}>Custom Icon — Carbon ikonu</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>image</code> ReactNode kabul eder — Carbon icon vererek
          bağlama özel görsel. Default'tan daha bağlamsal: doküman icon
          (boş KB), arama icon (no result), bildirim icon (no notification).
        </Text>
        <MockBlock caption="Carbon icon — DocumentBlank">
          <Empty
            image={<DocumentBlank size={48} />}
            description="Henüz doküman eklenmedi"
          />
        </MockBlock>
        <CodeBlock>{`<Empty
  image={<DocumentBlank size={48} />}
  description="Henüz doküman eklenmedi"
/>`}</CodeBlock>
      </section>

      {/* ── WITH ACTION ── */}
      <section id="with-action" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>children — action</span>
          <Heading level={2}>With Action — CTA button</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>children</code> footer/action area. <strong>Her empty
          state'de CTA olmalı</strong> — kullanıcının ne yapacağı belirsiz
          kalmasın.
        </Text>
        <MockBlock caption="Empty + primary CTA">
          <Empty description="Henüz bilet açılmadı">
            <Button type="primary" leadingIcon={<Add />}>
              İlk bileti aç
            </Button>
          </Empty>
        </MockBlock>
        <CodeBlock>{`<Empty description="Henüz bilet açılmadı">
  <Button type="primary" leadingIcon={<Add />}>
    İlk bileti aç
  </Button>
</Empty>`}</CodeBlock>
      </section>

      {/* ── NO DESCRIPTION ── */}
      <section id="no-desc" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>description={`{false}`}</span>
          <Heading level={2}>No Description — sadece görsel</Heading>
        </div>
        <Text size="md" color="secondary">
          Çok dar yerde (dropdown, autocomplete) sadece sembol. Ama metin
          olmadan kullanıcı bağlamı kaybedebilir — sadece tablo/dropdown gibi
          context net olan yerlerde.
        </Text>
        <MockBlock caption='description={false} + simple'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <MockBlock caption="Bilet listesi — hiç bilet açılmamış (default + CTA)">
          <Empty description="Henüz bilet açılmadı">
            <Button type="primary" leadingIcon={<Add />}>
              İlk bileti aç
            </Button>
            <Button type="default">Şablon kullan</Button>
          </Empty>
        </MockBlock>

        <MockBlock
          table
          caption="Tablo footer — filter sonucu yok (simple + clear filter)"
        >
          <div className={styles.fakeTable}>
            <div className={styles.fakeHeader}>
              <span>Bilet</span>
              <span>Öncelik</span>
              <span>Atanan</span>
            </div>
            <div className={styles.fakeBody}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Bu filtreyle eşleşen bilet yok"
              >
                <Button type="default" size="small" leadingIcon={<Filter />}>
                  Filtreyi temizle
                </Button>
              </Empty>
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="Bildirimler dropdown — boş">
          <Empty
            image={<NotificationOff size={48} />}
            description="Bildirim yok"
          />
        </MockBlock>

        <MockBlock caption="Search no result — Carbon icon">
          <Empty
            image={<Search size={48} />}
            description={
              <>
                <strong>&quot;mehmet&quot;</strong> için sonuç bulunamadı
                <br />
                <span style={{ fontSize: "var(--sc-font-size-xs)" }}>
                  Yazımı kontrol et veya farklı anahtar kelime dene
                </span>
              </>
            }
          >
            <Button type="default" size="small">Tüm kullanıcıları göster</Button>
          </Empty>
        </MockBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <Alert
          type="error"
          showIcon
          message="Hata 1 — CTA yok"
          description={
            <>
              Empty state'de "Henüz bilet yok" demek + boşluk → kullanıcı ne
              yapacağını bilmez. <strong>Çözüm:</strong>{" "}
              <code>{`<Button type="primary">İlk bileti aç</Button>`}</code>{" "}
              gibi tek CTA.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Loading sırasında Empty"
          description={
            <>
              Data fetch sürüyor → Empty göstermek "veri yok" yanılgısı yaratır.
              <strong>Çözüm:</strong> <code>loading</code> state'i ayrı tut
              (Skeleton/Spin), <code>!loading && !data.length && &lt;Empty /&gt;</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Error durumunu Empty ile karıştırmak"
          description={
            <>
              "API 500 döndü" Empty değil, error. Empty {" "}
              <strong>başarılı response + boş data</strong> içindir. Error için
              Result error variant + retry button.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Empty'de uzun açıklama / paragraf"
          description={
            <>
              "Sistem yeni kurulduysa, ilk bileti açmak için yukarıdaki + butona
              tıklayın veya menüden..." gibi paragraf → kullanıcı okumaz.{" "}
              <strong>Çözüm:</strong> Tek kısa cümle: "Henüz bilet yok" → CTA.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Filter empty'sinde 'clear filter' yok"
          description={
            <>
              Filtre sonuç boşsa kullanıcı stuck olur. <strong>Çözüm:</strong>{" "}
              "Filtreyi temizle" butonu — kullanıcı tüm veriye dönebilir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Default illüstrasyonu her yerde"
          description={
            <>
              "Doküman ekle", "Bildirim yok", "Mesaj yok" gibi bağlamlarda
              default gri kutu çok genel. Carbon icon ile bağlama özel görsel
              (DocumentBlank, NotificationOff, Chat) daha anlamlı.
            </>
          }
        />
      </section>
    </main>
  );
}
