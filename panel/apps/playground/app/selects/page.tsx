"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Card, Flex, Select } from "@servicecoreui/ui";
import styles from "./selects.module.css";

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
 * Mock data
 * ──────────────────────────────────────────────── */

const KATEGORI_OPTIONS = [
  { label: "Donanım", value: "donanim" },
  { label: "Yazılım", value: "yazilim" },
  { label: "Ağ", value: "ag" },
  { label: "Hesap & Erişim", value: "hesap" },
  { label: "Diğer", value: "diger" },
];

const ONCELIK_OPTIONS = [
  { label: "Düşük", value: "low" },
  { label: "Orta", value: "mid" },
  { label: "Yüksek", value: "high" },
  { label: "Kritik", value: "critical" },
];

const ATANAN_OPTIONS = [
  { label: "Ayşe Yıldız", value: "ay" },
  { label: "Mehmet Demir", value: "md" },
  { label: "Selin Kaya", value: "sk" },
  { label: "Burak Türk", value: "bt" },
  { label: "Ekin Karadağ", value: "ek" },
  { label: "Fatma Ay", value: "fa" },
];

const ETIKET_OPTIONS = [
  { label: "Acil", value: "acil" },
  { label: "Yinelenen", value: "yinelenen" },
  { label: "VIP", value: "vip" },
  { label: "Müşteri-tarafı", value: "musteri" },
];

const PANO_OPTIONS = [
  { label: "IKD PANO", value: "ikd" },
  { label: "ESK PANO", value: "esk" },
  { label: "Operatör Genel", value: "ops" },
  { label: "Yönetim Özeti", value: "exec" },
];

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function SelectsPage() {
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Select</Display>
        <Text size="lg" color="secondary">
          Dropdown seçici. Form, dashboard selector, filter — her yerde.{" "}
          <strong>4 mode</strong>: single (default), multiple, tags, combobox.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Single</a>
        <a href="#multiple">Multiple</a>
        <a href="#tags">Tags</a>
        <a href="#search">Search</a>
        <a href="#sizes">Boyutlar</a>
        <a href="#status">Status</a>
        <a href="#optgroup">OptGroup</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── SINGLE ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>default</span>
          <Heading level={2}>Single Select</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek değer seçimi. Form alanları için default kullanım.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basic</span>
            <Select
              placeholder="Kategori seç"
              options={KATEGORI_OPTIONS}
              style={{ width: 280 }}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>defaultValue</span>
            <Select
              defaultValue="mid"
              options={ONCELIK_OPTIONS}
              style={{ width: 280 }}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>allowClear</span>
            <Select
              placeholder="Kategori"
              options={KATEGORI_OPTIONS}
              allowClear
              style={{ width: 280 }}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>disabled</span>
            <Select
              defaultValue="low"
              options={ONCELIK_OPTIONS}
              disabled
              style={{ width: 280 }}
            />
          </div>
        </div>
        <DoDontGrid
          doItems={[
            "Form içinde 5+ option olan tek değerli alanlar",
            "Dashboard selector — IKD PANO ▼",
            "Filter dropdown — Durum ▼",
            "Atanan kişi, kategori, öncelik",
          ]}
          dontItems={[
            "5'ten az option için — Radio kullan",
            "Hiyerarşik veri için — TreeSelect/Cascader",
            "Serbest input için — AutoComplete veya tags mode",
            "Boolean için — Switch",
          ]}
        />
      </section>

      {/* ── MULTIPLE ── */}
      <section id="multiple" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>mode=&quot;multiple&quot;</span>
          <Heading level={2}>Multiple</Heading>
        </div>
        <Text size="md" color="secondary">
          Birden fazla değer seçimi — etiket olarak görünür.{" "}
          <code>maxTagCount</code> ile fazlasını "+N" yapar.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basic</span>
            <Select
              mode="multiple"
              placeholder="Etiket(ler) seç"
              options={ETIKET_OPTIONS}
              style={{ width: 360 }}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>defaultValue</span>
            <Select
              mode="multiple"
              defaultValue={["ay", "md", "sk"]}
              options={ATANAN_OPTIONS}
              style={{ width: 360 }}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>maxTagCount=2</span>
            <Select
              mode="multiple"
              defaultValue={["ay", "md", "sk", "bt", "ek"]}
              options={ATANAN_OPTIONS}
              maxTagCount={2}
              maxTagPlaceholder={(rest) => `+${rest.length} daha`}
              style={{ width: 360 }}
            />
          </div>
        </div>
      </section>

      {/* ── TAGS ── */}
      <section id="tags" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>mode=&quot;tags&quot;</span>
          <Heading level={2}>Tags (Serbest Giriş)</Heading>
        </div>
        <Text size="md" color="secondary">
          Multiple + kullanıcı yeni değer yazabilir. Etiket sistemi için.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>tags</span>
            <Select
              mode="tags"
              placeholder="Etiket yaz veya seç (Enter ile ekle)"
              options={ETIKET_OPTIONS}
              style={{ width: 420 }}
              tokenSeparators={[",", ";"]}
            />
          </div>
          <Text size="sm" color="secondary">
            NOT: tokenSeparators ile virgül/noktalı virgül auto-split — paste'ten çoklu ekleme.
          </Text>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section id="search" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>showSearch</span>
          <Heading level={2}>Arama (showSearch)</Heading>
        </div>
        <Text size="md" color="secondary">
          Default'ta single mode'da kapalı, multiple'da açık. 10+ option varsa
          aç. Loading prop ile async durumu göster.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>showSearch</span>
            <Select
              showSearch
              placeholder="Kullanıcı ara..."
              options={ATANAN_OPTIONS}
              optionFilterProp="label"
              style={{ width: 360 }}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>async + loading</span>
            <Select
              showSearch
              placeholder="Asset ID veya ad yaz..."
              loading={searchLoading}
              filterOption={false}
              onSearch={(value) => {
                if (value.length > 1) {
                  setSearchLoading(true);
                  setTimeout(() => setSearchLoading(false), 800);
                }
              }}
              notFoundContent={searchLoading ? "Aranıyor..." : "Sonuç yok"}
              options={[
                { label: "DELL Latitude 7420 (ASSET-9032)", value: "9032" },
                { label: "HP EliteBook 840 (ASSET-9033)", value: "9033" },
                { label: "Lenovo T14 (ASSET-9034)", value: "9034" },
              ]}
              style={{ width: 420 }}
            />
          </div>
        </div>
      </section>

      {/* ── SIZES ── */}
      <section id="sizes" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>size</span>
          <Heading level={2}>Boyutlar</Heading>
        </div>
        <Text size="md" color="secondary">
          small (28px), middle (36px, default), large (44px) — controlHeight token'larına bağlı.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>small</span>
            <Select size="small" placeholder="Kompakt" options={KATEGORI_OPTIONS} style={{ width: 280 }} />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>middle</span>
            <Select size="middle" placeholder="Default" options={KATEGORI_OPTIONS} style={{ width: 280 }} />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>large</span>
            <Select size="large" placeholder="Prominent" options={KATEGORI_OPTIONS} style={{ width: 280 }} />
          </div>
        </div>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>status</span>
          <Heading level={2}>Validation Status</Heading>
        </div>
        <Text size="md" color="secondary">
          error / warning — Form validation feedback. Mesajla birlikte göster.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Kategori</span>
            <Select
              status="error"
              placeholder="Seç"
              options={KATEGORI_OPTIONS}
              style={{ width: 280 }}
            />
            <span className={styles.formError}>Kategori seçimi zorunludur</span>
          </div>
        </div>
      </section>

      {/* ── OPTGROUP ── */}
      <section id="optgroup" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>OptGroup</span>
          <Heading level={2}>OptGroup (Kategorili)</Heading>
        </div>
        <Text size="md" color="secondary">
          Option'ları grupla. Çok sayıda kullanıcıyı role göre, kategoriyi alt-kategoriye göre.
        </Text>
        <div className={styles.showcase}>
          <Select
            placeholder="Atanan seç"
            style={{ width: 360 }}
            showSearch
            optionFilterProp="label"
          >
            <Select.OptGroup label="L1 Destek">
              <Select.Option value="ay">Ayşe Yıldız</Select.Option>
              <Select.Option value="bt">Burak Türk</Select.Option>
            </Select.OptGroup>
            <Select.OptGroup label="L2 Destek">
              <Select.Option value="md">Mehmet Demir</Select.Option>
              <Select.Option value="ek">Ekin Karadağ</Select.Option>
            </Select.OptGroup>
            <Select.OptGroup label="Network">
              <Select.Option value="sk">Selin Kaya</Select.Option>
            </Select.OptGroup>
          </Select>
        </div>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Dashboard selector — IKD PANO ▼ (PageHeader içinde)">
          <Card>
            <Flex align="center" gap="middle">
              <Heading level={3}>Panolar</Heading>
              <Select
                defaultValue="ikd"
                options={PANO_OPTIONS}
                style={{ width: 200 }}
              />
              <Flex gap="small" style={{ marginInlineStart: "auto" }}>
                <Button type="default" size="small">Yenile</Button>
                <Button type="primary" size="small">Yeni Pano</Button>
              </Flex>
            </Flex>
          </Card>
        </MockBlock>

        <MockBlock caption="Toolbar filter — small boyut, çoklu select'ler yan yana">
          <Card>
            <div className={styles.toolbar}>
              <Text size="sm" weight="medium">Filtre:</Text>
              <Select size="small" placeholder="Durum" options={[
                { label: "Açık", value: "open" },
                { label: "Beklemede", value: "pending" },
                { label: "İşlemde", value: "in_progress" },
                { label: "Çözüldü", value: "resolved" },
              ]} style={{ width: 140 }} allowClear />
              <Select size="small" placeholder="Öncelik" options={ONCELIK_OPTIONS} style={{ width: 140 }} allowClear />
              <Select size="small" mode="multiple" placeholder="Atanan" options={ATANAN_OPTIONS} style={{ width: 220 }} maxTagCount={1} maxTagPlaceholder={(rest) => `+${rest.length}`} />
              <Button type="text" size="small">Temizle</Button>
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Form — yeni talep oluştur (Kategori, Öncelik, Atanan)">
          <Card title="Yeni Talep">
            <Flex vertical gap="middle">
              <div className={styles.formField}>
                <span className={styles.formLabel}>Kategori *</span>
                <Select placeholder="Kategori seç" options={KATEGORI_OPTIONS} style={{ width: "100%" }} />
              </div>
              <div className={styles.formField}>
                <span className={styles.formLabel}>Öncelik *</span>
                <Select placeholder="Öncelik seç" options={ONCELIK_OPTIONS} style={{ width: "100%" }} />
              </div>
              <div className={styles.formField}>
                <span className={styles.formLabel}>Atanan kişi</span>
                <Select
                  placeholder="Kişi ara veya seç"
                  options={ATANAN_OPTIONS}
                  showSearch
                  optionFilterProp="label"
                  allowClear
                  style={{ width: "100%" }}
                />
                <span className={styles.formHint}>Atama yapmazsan otomatik dağıtılır</span>
              </div>
              <div className={styles.formField}>
                <span className={styles.formLabel}>Etiketler</span>
                <Select
                  mode="tags"
                  placeholder="Etiket yaz veya seç"
                  options={ETIKET_OPTIONS}
                  style={{ width: "100%" }}
                  tokenSeparators={[","]}
                />
              </div>
            </Flex>
          </Card>
        </MockBlock>

        <CodeBlock>{`<Select placeholder="Kategori seç" options={KATEGORI_OPTIONS} />

<Select
  mode="multiple"
  options={ATANAN_OPTIONS}
  maxTagCount={2}
  maxTagPlaceholder={(rest) => \`+\${rest.length}\`}
/>

<Select
  showSearch
  filterOption={false}
  onSearch={fetchAssets}
  loading={loading}
  notFoundContent={loading ? "Aranıyor..." : "Sonuç yok"}
  options={results}
/>

<Select mode="tags" tokenSeparators={[","]} placeholder="Etiket yaz" />`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — 2-3 option için Select">
          &quot;Evet/Hayır&quot;, &quot;Düşük/Orta/Yüksek&quot; gibi 5'ten az option için Radio
          kullan. Dropdown bir click daha fazla.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Hiyerarşik veri için Select">
          &quot;Şehir → İlçe → Mahalle&quot; gibi bağımlı seçim için Cascader,
          tree-yapılı veri için TreeSelect kullan. Düz Select hiyerarşiyi gizler.
        </AntiPattern>

        <AntiPattern title="Hata 3 — 50+ option arama olmadan">
          Uzun listede <code>showSearch</code> şart. Kullanıcı 50 option arasından
          tıklayarak değer bulamaz.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Multi-select 50+ seçim için">
          Multi-select 10-20 seçim için pratik. 50+ seçim gerekirse Transfer
          component kullan (sol liste → sağ liste UI).
        </AntiPattern>

        <AntiPattern title="Hata 5 — Tags mode'da validation yok">
          Kullanıcı her şeyi tag yapabilir. Etiket sistemi varsa <code>tags</code>{" "}
          yerine <code>multiple</code> kullan + ayrı &quot;Etiket ekle&quot; buton'u.
        </AntiPattern>
      </section>
    </main>
  );
}
