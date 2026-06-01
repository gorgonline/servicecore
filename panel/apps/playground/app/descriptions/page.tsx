"use client";

import { Edit, Download } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Descriptions } from "@servicecoreui/ui/wraps";
import styles from "./descriptions.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={styles.mockFrame}>{children}</div>
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

export default function DescriptionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Descriptions</Display>
        <Text size="lg" color="secondary">
          Tek bir nesnenin key-value detayları. Ticket meta, asset bilgileri,
          user profile, server info. <strong>Tablo</strong> birden fazla
          nesneyi karşılaştırır; <strong>Descriptions</strong> tek nesnenin
          alanlarını listeler.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Descriptions vs Table</a>
        <a href="#temel">Temel</a>
        <a href="#bordered">Bordered</a>
        <a href="#column-span">Column + Span</a>
        <a href="#layout">Layout</a>
        <a href="#extra">Extra</a>
        <a href="#size">Size</a>
        <a href="#mock">Asset Detail</a>
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
              <code>bordered</code>, <code>colon</code>,{" "}
              <code>column</code> (number | responsive object),{" "}
              <code>extra</code> (4.5+), <code>layout</code> (horizontal /
              vertical), <code>size</code> (default / middle / small),{" "}
              <code>title</code>, <code>contentStyle</code>,{" "}
              <code>labelStyle</code>, <code>Descriptions.Item</code>{" "}
              children pattern.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — children pattern zorunlu"
          description={
            <>
              <code>items</code> prop (5.8+) — <strong>5.7'de YOK</strong>,{" "}
              children <code>&lt;Descriptions.Item&gt;</code> kullan,
              <br />
              <code>span="filled"</code> (5.22+) — sayı değer kullan,
              <br />
              <code>classNames</code>/<code>styles</code> semantic DOM (modern
              variant 6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="column — responsive breakpoint object"
          description={
            <>
              <code>{`column={{ xs: 1, sm: 2, md: 3, lg: 4 }}`}</code> ile
              mobile'da 1 kolon, desktop'ta 4 kolon. Bütçe kayıt için tutarlı
              grid lazımsa <code>column={`{3}`}</code> sabit yeter.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Descriptions vs Table</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Descriptions: TEK nesnenin alanları (ticket detay, asset info, server config)",
            "Descriptions: 4-20 key-value çift (form sonuç gösterimi)",
            "Table: çoklu kayıt listesi (bilet listesi, asset envanteri)",
            "Table: sortable/filterable kolonlar gerekli",
          ]}
          dontItems={[
            "Descriptions: çoklu kayıt göstermek (o Table)",
            "Table: tek kayıt göstermek (yer israfı, scan zor)",
            "Descriptions: 50+ alan (kullanıcı boğulur — Tabs ile böl)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — borderless (default)</Heading>
        </div>
        <MockBlock caption="Ticket meta — 3 kolon, borderless">
          <Descriptions title="SC-4127 — Bilet bilgileri" column={3}>
            <Descriptions.Item label="Açıldı">12:14 · 23 May</Descriptions.Item>
            <Descriptions.Item label="Atanan">Mehmet K.</Descriptions.Item>
            <Descriptions.Item label="Öncelik">
              <span className={`${styles.statusPill} ${styles.priorityP1}`}>P1 — Kritik</span>
            </Descriptions.Item>
            <Descriptions.Item label="Kategori">Network / VPN</Descriptions.Item>
            <Descriptions.Item label="SLA">3 sa 12 dk kaldı</Descriptions.Item>
            <Descriptions.Item label="Durum">
              <span className={`${styles.statusPill} ${styles.statusInProgress}`}>İşleniyor</span>
            </Descriptions.Item>
          </Descriptions>
        </MockBlock>
        <CodeBlock>{`<Descriptions title="SC-4127 — Bilet bilgileri" column={3}>
  <Descriptions.Item label="Açıldı">12:14 · 23 May</Descriptions.Item>
  <Descriptions.Item label="Atanan">Mehmet K.</Descriptions.Item>
  <Descriptions.Item label="Öncelik">P1</Descriptions.Item>
</Descriptions>`}</CodeBlock>
      </section>

      {/* ── BORDERED ── */}
      <section id="bordered" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>bordered</span>
          <Heading level={2}>Bordered — table tarzı kart</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>bordered</code> ile label sol kolon bg-subtle, ayraç line'lar
          görünür. Sade panel'de borderless tercih edilir; rapor/export
          görünümünde bordered.
        </Text>
        <MockBlock caption="bordered + 2 kolon">
          <Descriptions title="DELL-LAT-7420" bordered column={2}>
            <Descriptions.Item label="Asset ID">
              <span className={styles.mono}>ASSET-9032</span>
            </Descriptions.Item>
            <Descriptions.Item label="Tip">Laptop</Descriptions.Item>
            <Descriptions.Item label="Marka / Model">Dell Latitude 7420</Descriptions.Item>
            <Descriptions.Item label="Seri No">
              <span className={styles.mono}>1H8DK53</span>
            </Descriptions.Item>
            <Descriptions.Item label="Sahibi">Ayşe T. (Finans)</Descriptions.Item>
            <Descriptions.Item label="Garanti">2027-05-12 (2 yıl kaldı)</Descriptions.Item>
            <Descriptions.Item label="IP" span={2}>
              <span className={styles.mono}>10.0.34.127</span>
            </Descriptions.Item>
            <Descriptions.Item label="Notlar" span={2}>
              Garanti yenilemesi gerekiyor; bilgisayar 2 yıl önce alındı,
              klavye tuşları aşınmaya başladı.
            </Descriptions.Item>
          </Descriptions>
        </MockBlock>
        <CodeBlock>{`<Descriptions title="..." bordered column={2}>
  <Descriptions.Item label="Asset ID">ASSET-9032</Descriptions.Item>
  <Descriptions.Item label="Notlar" span={2}>
    Tam satırı kapla...
  </Descriptions.Item>
</Descriptions>`}</CodeBlock>
      </section>

      {/* ── COLUMN + SPAN ── */}
      <section id="column-span" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>column · span</span>
          <Heading level={2}>Column + Span — responsive grid</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>column</code> root'ta toplam kolon sayısı.{" "}
          <code>span</code> item'da kaç kolon kaplayacağı (default 1).{" "}
          <code>column</code> responsive object alabilir.
        </Text>
        <MockBlock caption="Responsive — xs:1 sm:2 md:3 lg:4">
          <Descriptions
            title="Server INFO"
            bordered
            column={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          >
            <Descriptions.Item label="Host">srv-app-01</Descriptions.Item>
            <Descriptions.Item label="OS">Ubuntu 22.04</Descriptions.Item>
            <Descriptions.Item label="CPU">16 vCPU</Descriptions.Item>
            <Descriptions.Item label="RAM">64 GB</Descriptions.Item>
            <Descriptions.Item label="Disk">2 TB SSD</Descriptions.Item>
            <Descriptions.Item label="Network">10 Gbps</Descriptions.Item>
            <Descriptions.Item label="Uptime">142 gün</Descriptions.Item>
            <Descriptions.Item label="Load">0.42</Descriptions.Item>
          </Descriptions>
        </MockBlock>
        <CodeBlock>{`<Descriptions column={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
  ...
</Descriptions>

// span ile geniş alan:
<Descriptions.Item label="Açıklama" span={3}>
  Uzun metin tüm 3 kolonu kaplar...
</Descriptions.Item>`}</CodeBlock>
      </section>

      {/* ── LAYOUT ── */}
      <section id="layout" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>layout</span>
          <Heading level={2}>Layout — horizontal / vertical</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>horizontal</code> (label solda, content sağda).{" "}
          <code>vertical</code> label üstte, content altta — mobile veya uzun
          label'larda daha okunaklı.
        </Text>
        <MockBlock caption='layout="vertical"'>
          <Descriptions layout="vertical" column={3}>
            <Descriptions.Item label="Atanan ekip">Network Engineering Team</Descriptions.Item>
            <Descriptions.Item label="Etki seviyesi">Yüksek — 50+ kullanıcı</Descriptions.Item>
            <Descriptions.Item label="Tahmini çözüm süresi">2 saat (P1 SLA)</Descriptions.Item>
          </Descriptions>
        </MockBlock>
      </section>

      {/* ── EXTRA ── */}
      <section id="extra" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>extra</span>
          <Heading level={2}>Extra — header'da action area</Heading>
        </div>
        <Text size="md" color="secondary">
          Title'ın sağında ek slot. "Düzenle" / "Dışa aktar" gibi page-level
          eylemler için.
        </Text>
        <MockBlock caption="Title + extra (Edit / Export butonları)">
          <Descriptions
            title="Kullanıcı profili"
            bordered
            column={2}
            extra={
              <>
                <Button type="default" size="small" leadingIcon={<Edit />}>
                  Düzenle
                </Button>
                &nbsp;
                <Button type="default" size="small" leadingIcon={<Download />}>
                  Dışa aktar
                </Button>
              </>
            }
          >
            <Descriptions.Item label="İsim">Mehmet Karaca</Descriptions.Item>
            <Descriptions.Item label="E-posta">mehmet.k@firma.com</Descriptions.Item>
            <Descriptions.Item label="Rol">Network Engineer</Descriptions.Item>
            <Descriptions.Item label="Departman">BT / Network</Descriptions.Item>
            <Descriptions.Item label="Son giriş" span={2}>
              <span className={styles.mono}>2026-05-23 09:42 from 10.0.0.42</span>
            </Descriptions.Item>
          </Descriptions>
        </MockBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — small / middle / default</Heading>
        </div>
        <MockBlock caption='size="small" + bordered (yoğun kullanım, sidebar)'>
          <Descriptions size="small" bordered column={2}>
            <Descriptions.Item label="Type">VPN</Descriptions.Item>
            <Descriptions.Item label="Status">UP</Descriptions.Item>
            <Descriptions.Item label="Latency">12ms</Descriptions.Item>
            <Descriptions.Item label="Loss">0%</Descriptions.Item>
          </Descriptions>
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Change Request Detail — extra + bordered</Heading>
        </div>
        <MockBlock caption="CR-1145 — change request detay">
          <Descriptions
            title="CR-1145 — Production firewall update"
            bordered
            column={3}
            extra={
              <Button type="primary" size="small" leadingIcon={<Edit />}>
                Düzenle
              </Button>
            }
          >
            <Descriptions.Item label="Talep eden">Ayşe T.</Descriptions.Item>
            <Descriptions.Item label="Onaylayan">Selin Y.</Descriptions.Item>
            <Descriptions.Item label="Tip">Standard</Descriptions.Item>
            <Descriptions.Item label="Risk">Düşük</Descriptions.Item>
            <Descriptions.Item label="Etki">Orta — 2 sunucu</Descriptions.Item>
            <Descriptions.Item label="CAB onayı">
              <span className={`${styles.statusPill} ${styles.statusInProgress}`}>Bekliyor</span>
            </Descriptions.Item>
            <Descriptions.Item label="Planlanan başlangıç">2026-05-26 22:00</Descriptions.Item>
            <Descriptions.Item label="Tahmini süre">2 saat</Descriptions.Item>
            <Descriptions.Item label="Rollback">Otomatik (30dk)</Descriptions.Item>
            <Descriptions.Item label="Açıklama" span={3}>
              Firewall rule güncellenecek — yeni VPN segment için 10.1.0.0/16
              alt ağı eklenecek. Doğrulama: ping testi + smoke test.
            </Descriptions.Item>
          </Descriptions>
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
          message="Hata 1 — items prop'u beklemek (5.8+, 5.7'de YOK)"
          description={
            <>
              <code>{`items={[{ label, children }]}`}</code> 5.8+'da geldi. 5.7'de
              <strong> tek seçenek</strong> children pattern:{" "}
              <code>{`<Descriptions.Item label="...">...</Descriptions.Item>`}</code>
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Çoklu kayıt için Descriptions"
          description={
            <>
              5 bilet, 10 asset listesi gibi koleksiyon Descriptions ile
              gösterilmez — her biri kendi Descriptions'ı olur, sayfa
              patlar. <strong>Çözüm:</strong> Table.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — 50+ alan"
          description={
            <>
              Bir nesnenin 50 alanı varsa kullanıcı boğulur, scan zorlaşır.{" "}
              <strong>Çözüm:</strong> Tabs ile kategorize et (Genel /
              Network / Güvenlik), her tab'ta 8-12 alan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 4 — span="filled" beklemek (5.22+, yok)'
          description={
            <>
              <code>span="filled"</code> 5.22+'da geldi. 5.7'de sayı kullan:{" "}
              <code>span={`{3}`}</code> üç kolonu kapla.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — column responsive vermemek"
          description={
            <>
              Sabit <code>column={`{4}`}</code> ile mobilde 4 kolon sıkışır.{" "}
              <code>{`column={{ xs: 1, sm: 2, md: 3, lg: 4 }}`}</code> ile
              responsive davransın.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — bordered'ı her yerde kullanmak"
          description={
            <>
              Bordered table-stilini ekrana getirir, yoğun görünür. Sadece
              <strong> rapor / export / form summary</strong> gibi vurgu gereken
              yerlerde. Sayfa içi inline detay için borderless yeter.
            </>
          }
        />
      </section>
    </main>
  );
}
