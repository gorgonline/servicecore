"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TrashCan, Edit, Send } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Checkbox } from "@servicecoreui/ui/wraps";
import type { CheckboxValueType } from "@servicecoreui/ui/wraps";
import styles from "./checkboxes.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  tight,
}: {
  caption: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={`${styles.mockFrame} ${tight ? styles.mockFrameTight : ""}`}>
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
 * Mocks
 * ──────────────────────────────────────────────── */

type TicketRow = { id: string; title: string; priority: string; assignee: string };

const TICKETS: TicketRow[] = [
  { id: "SC-4127", title: "Print server bağlanamıyor — Muhasebe katı", priority: "P1", assignee: "Mehmet K." },
  { id: "SC-4128", title: "VPN bağlantısı yavaş — Ofis 3", priority: "P2", assignee: "Ayşe T." },
  { id: "SC-4129", title: "Outlook senkronizasyon hatası", priority: "P3", assignee: "—" },
  { id: "SC-4130", title: "Yeni kullanıcı AD hesabı talebi", priority: "P3", assignee: "Burak D." },
];

function FilterSidebarMock() {
  const [categories, setCategories] = useState<CheckboxValueType[]>(["network", "hardware"]);
  const [priorities, setPriorities] = useState<CheckboxValueType[]>(["p1"]);

  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Kategori</span>
        <Checkbox.Group
          value={categories}
          onChange={setCategories}
          options={[
            { label: "Network", value: "network" },
            { label: "Donanım", value: "hardware" },
            { label: "Yazılım", value: "software" },
            { label: "Erişim", value: "access" },
          ]}
          style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-2)" }}
        />
      </div>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Öncelik</span>
        <Checkbox.Group
          value={priorities}
          onChange={setPriorities}
          options={[
            { label: "P1 — Kritik", value: "p1" },
            { label: "P2 — Yüksek", value: "p2" },
            { label: "P3 — Orta", value: "p3" },
            { label: "P4 — Düşük", value: "p4" },
          ]}
          style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-2)" }}
        />
      </div>
    </div>
  );
}

function BulkSelectMock() {
  const [selected, setSelected] = useState<string[]>([]);

  const allChecked = selected.length === TICKETS.length;
  const someChecked = selected.length > 0 && selected.length < TICKETS.length;

  const toggleAll = (e: { target: { checked: boolean } }) => {
    setSelected(e.target.checked ? TICKETS.map((t) => t.id) : []);
  };

  const toggleOne = (id: string) => (e: { target: { checked: boolean } }) => {
    setSelected((prev) => (e.target.checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  return (
    <div>
      {selected.length > 0 && (
        <div className={styles.bulkBar}>
          <span className={styles.bulkBarCount}>{selected.length} seçildi</span>
          <span className={styles.bulkBarSpacer} />
          <Button size="small" type="default" leadingIcon={<Edit />}>
            Toplu ata
          </Button>
          <Button size="small" type="default" leadingIcon={<Send />}>
            Yanıt gönder
          </Button>
          <Button size="small" type="primary" danger leadingIcon={<TrashCan />}>
            Sil
          </Button>
        </div>
      )}

      <div className={styles.bulkTable}>
        <div className={`${styles.bulkRow} ${styles.bulkRowHeader}`}>
          <Checkbox
            indeterminate={someChecked}
            checked={allChecked}
            onChange={toggleAll}
            aria-label="Tümünü seç"
          />
          <span>Bilet</span>
          <span>Öncelik</span>
          <span>Atanan</span>
        </div>
        {TICKETS.map((t) => {
          const isSelected = selected.includes(t.id);
          return (
            <div
              key={t.id}
              className={`${styles.bulkRow} ${isSelected ? styles.bulkRowSelected : ""}`}
            >
              <Checkbox
                checked={isSelected}
                onChange={toggleOne(t.id)}
                aria-label={`${t.id} seç`}
              />
              <div>
                <Text size="sm" weight="medium">
                  {t.id}
                </Text>{" "}
                <Text size="sm" color="secondary">
                  — {t.title}
                </Text>
              </div>
              <Text size="sm" color="secondary">
                {t.priority}
              </Text>
              <Text size="sm" color="secondary">
                {t.assignee}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function CheckboxesPage() {
  /* Indeterminate "tümünü seç" demo state */
  const ALL_OPTIONS = useMemo(
    () => [
      { label: "Network", value: "network" },
      { label: "Donanım", value: "hardware" },
      { label: "Yazılım", value: "software" },
      { label: "Erişim", value: "access" },
    ],
    [],
  );
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(["network"]);

  const allChecked = checkedList.length === ALL_OPTIONS.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < ALL_OPTIONS.length;

  const onMasterChange = (e: { target: { checked: boolean } }) => {
    setCheckedList(e.target.checked ? ALL_OPTIONS.map((o) => o.value) : []);
  };

  /* Controlled tek checkbox */
  const [agreed, setAgreed] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Checkbox</Display>
        <Text size="lg" color="secondary">
          Çok-seçimli alan. Filter sidebar, bulk-select, "tümünü seç" pattern'i,
          consent checkbox'ları. <strong>Tek seçim</strong> için Radio veya
          Switch — Checkbox çoklu seçim içindir.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#controlled">Controlled</a>
        <a href="#disabled">Disabled</a>
        <a href="#indeterminate">Indeterminate</a>
        <a href="#group">Group</a>
        <a href="#filter">Filter Sidebar</a>
        <a href="#bulk">Bulk Select</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── API Notu ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>not</span>
          <Heading level={2}>API: AntD ile birebir</Heading>
        </div>
        <Alert
          type="success"
          showIcon
          message="Tüm prop'lar AntD 5.7 ile aynı"
          description={
            <>
              <code>checked</code>, <code>defaultChecked</code>,{" "}
              <code>disabled</code>, <code>indeterminate</code>,{" "}
              <code>autoFocus</code>, <code>name</code>, <code>value</code>,{" "}
              <code>onChange</code>, <code>onBlur</code>, <code>onFocus</code> —
              hepsi AntD native. Group: <code>value</code>,{" "}
              <code>defaultValue</code>, <code>options</code>, <code>name</code>,{" "}
              <code>disabled</code>, <code>onChange</code>.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange signature — Checkbox vs Group farklı"
          description={
            <>
              <strong>Tek Checkbox:</strong>{" "}
              <code>(e: CheckboxChangeEvent) =&gt; void</code> — event-based,{" "}
              <code>e.target.checked</code> okursun.
              <br />
              <strong>Group:</strong>{" "}
              <code>(checkedValues: (string | number | boolean)[]) =&gt; void</code>{" "}
              — değer dizisi alırsın. AntD'nin tek tutarsız yeri burası — Group
              event geçmez.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="Form.Item ile kullanırken — valuePropName='checked'"
          description={
            <>
              AntD Form Checkbox'u <code>value</code> değil <code>checked</code>{" "}
              prop'uyla bağlar. Form.Item'a{" "}
              <code>valuePropName=&quot;checked&quot;</code> ekle yoksa state
              senkron olmaz. Group için bu gerekmez — array value döndürdüğü için.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel kullanım</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek checkbox. Uncontrolled (kendi state'i AntD'de) veya controlled
          (sen yönetirsin). Çoğu zaman controlled olsun — state akışı net olur.
        </Text>

        <MockBlock caption="Uncontrolled (defaultChecked)">
          <div className={styles.stack}>
            <Checkbox defaultChecked>E-posta bildirimlerini al</Checkbox>
            <Checkbox>SMS bildirimlerini al</Checkbox>
            <Checkbox>Slack bildirimlerini al</Checkbox>
          </div>
        </MockBlock>

        <CodeBlock>{`<Checkbox defaultChecked>E-posta bildirimlerini al</Checkbox>
<Checkbox>SMS bildirimlerini al</Checkbox>`}</CodeBlock>
      </section>

      {/* ── CONTROLLED ── */}
      <section id="controlled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>controlled</span>
          <Heading level={2}>Controlled — kendi state'in</Heading>
        </div>
        <Text size="md" color="secondary">
          Submit butonunu enable/disable etmek, başka bir kondisyona bağlı UI
          çıkartmak veya form library ile bağlanmak için controlled kullan.
        </Text>

        <MockBlock caption="Onay → Submit butonu aktifleşir">
          <div className={styles.consentBox}>
            <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)}>
              <Text size="sm">
                <strong>Kullanım koşullarını</strong> okudum ve kabul ediyorum.
              </Text>
            </Checkbox>
            <Button type="primary" disabled={!agreed}>
              Devam et
            </Button>
          </div>
        </MockBlock>

        <CodeBlock>{`const [agreed, setAgreed] = useState(false);

<Checkbox
  checked={agreed}
  onChange={e => setAgreed(e.target.checked)}
>
  Kullanım koşullarını kabul ediyorum
</Checkbox>

<Button type="primary" disabled={!agreed}>Devam et</Button>`}</CodeBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled — neden disable olduğu açık olmalı</Heading>
        </div>
        <Text size="md" color="secondary">
          Disabled checkbox kullanıcıya "tıklayamazsın" der ama{" "}
          <strong>nedeni</strong> söylemez. Disabled tek başına yetmez —
          yanında "Premium plan gerekir" gibi context lazım, ya da Tooltip ile
          neden ver.
        </Text>

        <MockBlock caption="Disabled — context'li">
          <div className={styles.stack}>
            <Checkbox defaultChecked disabled>
              E-posta bildirimleri (zorunlu)
            </Checkbox>
            <Checkbox disabled>
              <Text size="sm">
                Webhook entegrasyonu{" "}
                <Text size="xs" color="tertiary" as="span">
                  · Pro plan gerekir
                </Text>
              </Text>
            </Checkbox>
          </div>
        </MockBlock>

        <CodeBlock>{`<Checkbox defaultChecked disabled>
  E-posta bildirimleri (zorunlu)
</Checkbox>

<Checkbox disabled>
  Webhook entegrasyonu · Pro plan gerekir
</Checkbox>`}</CodeBlock>
      </section>

      {/* ── INDETERMINATE ── */}
      <section id="indeterminate" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>indeterminate</span>
          <Heading level={2}>Indeterminate — "tümünü seç" pattern'i</Heading>
        </div>
        <Text size="md" color="secondary">
          Bazıları seçili, hepsi değil → master checkbox <code>indeterminate</code>{" "}
          olur (içinde yatay çizgi). Hepsi seçildiğinde <code>checked</code>,
          hiçbiri seçili değilse boş. Bulk-select ekranlarının olmazsa olmazı.
        </Text>

        <MockBlock caption="Master + alt seçenekler — checkboxları değiştir, master'a bak">
          <div className={styles.stack}>
            <Checkbox
              indeterminate={indeterminate}
              checked={allChecked}
              onChange={onMasterChange}
            >
              <Text size="md" weight="semibold">
                Tüm kategoriler
              </Text>
            </Checkbox>
            <div style={{ paddingInlineStart: "var(--sc-space-6)" }}>
              <Checkbox.Group
                value={checkedList}
                onChange={setCheckedList}
                options={ALL_OPTIONS}
                style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-2)" }}
              />
            </div>
          </div>
        </MockBlock>

        <CodeBlock>{`const ALL = ["network", "hardware", "software", "access"];
const [checked, setChecked] = useState<string[]>([]);

const allChecked     = checked.length === ALL.length;
const indeterminate  = checked.length > 0 && checked.length < ALL.length;

<Checkbox
  indeterminate={indeterminate}
  checked={allChecked}
  onChange={e => setChecked(e.target.checked ? ALL : [])}
>
  Tüm kategoriler
</Checkbox>

<Checkbox.Group value={checked} onChange={setChecked} options={ALL.map(...)} />`}</CodeBlock>
      </section>

      {/* ── GROUP ── */}
      <section id="group" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Checkbox.Group</span>
          <Heading level={2}>Group — değer-array state'i tek state'le yönet</Heading>
        </div>
        <Text size="md" color="secondary">
          Birden fazla checkbox'ı tek state ile bağlamak. <code>options</code>{" "}
          prop'u en pratik. Karmaşık layout (yan ikon, badge, vs.) gerekiyorsa
          children pattern'ine geç.
        </Text>

        <DoDontGrid
          doItems={[
            "Form'da çoklu kategori/etiket seçimi",
            "Filter sidebar — kategori, durum, atanan",
            "Bulk action — tablo satır seçimi",
            "Permission matrix — modül × eylem checkbox'ları",
          ]}
          dontItems={[
            "Tek seçim için (o Radio)",
            "Açık/kapalı toggle için (o Switch)",
            "20+ seçenek tek liste — search/filter ekle",
            "Aynı zamanda hem checked'i hem value'yu controlled tutmaya çalışma — biri yeter",
          ]}
        />

        <MockBlock caption="options array — en pratik">
          <Checkbox.Group
            defaultValue={["it", "hr"]}
            options={[
              { label: "BT (IT)", value: "it" },
              { label: "İnsan Kaynakları", value: "hr" },
              { label: "Finans", value: "finance" },
              { label: "Operasyon", value: "ops" },
              { label: "Pazarlama", value: "marketing", disabled: true },
            ]}
          />
        </MockBlock>

        <MockBlock caption="children pattern — özel layout (yatay)">
          <Checkbox.Group defaultValue={["network"]}>
            <div className={styles.row}>
              <Checkbox value="network">Network</Checkbox>
              <Checkbox value="hardware">Donanım</Checkbox>
              <Checkbox value="software">Yazılım</Checkbox>
              <Checkbox value="access">Erişim</Checkbox>
            </div>
          </Checkbox.Group>
        </MockBlock>

        <CodeBlock>{`// options ile
<Checkbox.Group
  value={selected}
  onChange={setSelected}
  options={[
    { label: "BT",        value: "it" },
    { label: "İK",        value: "hr" },
    { label: "Pazarlama", value: "marketing", disabled: true },
  ]}
/>

// children ile (özel layout için)
<Checkbox.Group value={selected} onChange={setSelected}>
  <Checkbox value="network">Network</Checkbox>
  <Checkbox value="hardware">Donanım</Checkbox>
</Checkbox.Group>`}</CodeBlock>
      </section>

      {/* ── FILTER SIDEBAR ── */}
      <section id="filter" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Filter Sidebar — bilet listesi filtresi</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore'un en sık görülen pattern'i. Sayfa solunda sticky filter
          paneli; Group'ları kategori bazlı bölersin. Etiketleri caps-eyebrow
          stilinde verirsin.
        </Text>

        <MockBlock caption="Bilet listesi — sol filter sidebar" tight>
          <FilterSidebarMock />
        </MockBlock>
      </section>

      {/* ── BULK SELECT ── */}
      <section id="bulk" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Bulk Select — toplu eylem barı</Heading>
        </div>
        <Text size="md" color="secondary">
          Header'da master checkbox (indeterminate state'li), satırlarda satır
          checkbox'ı. Bir veya daha fazla satır seçilince <strong>bulk action
          bar</strong> görünür. Toplu sil, ata, durum değiştir.
        </Text>

        <MockBlock caption="Tıklayarak deneyin — satır seç, master indeterminate olur, bar çıkar">
          <BulkSelectMock />
        </MockBlock>

        <CodeBlock>{`const [selected, setSelected] = useState<string[]>([]);

const allChecked     = selected.length === rows.length;
const indeterminate  = selected.length > 0 && selected.length < rows.length;

<Checkbox
  indeterminate={indeterminate}
  checked={allChecked}
  onChange={e => setSelected(e.target.checked ? rows.map(r => r.id) : [])}
  aria-label="Tümünü seç"
/>

// her satırda:
<Checkbox
  checked={selected.includes(row.id)}
  onChange={e => setSelected(prev =>
    e.target.checked ? [...prev, row.id] : prev.filter(x => x !== row.id)
  )}
  aria-label={\`\${row.id} seç\`}
/>`}</CodeBlock>
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
          message="Hata 1 — Tek seçim için Checkbox kullanmak"
          description={
            <>
              "Erkek / Kadın" gibi <strong>mutually exclusive</strong> seçimde
              Checkbox kullanma → kullanıcı ikisini de işaretler.{" "}
              <strong>Çözüm:</strong> Radio kullan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Açık/kapalı toggle için Checkbox"
          description={
            <>
              "Bildirimleri aç" gibi binary toggle'lar Switch'in işi. Checkbox
              "form alanı" sinyali verir, Switch "anında uygulanan ayar"
              sinyali. Setting sayfasında Switch kullan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — 20+ seçenek tek liste"
          description={
            <>
              Yatay/dikey 20+ checkbox kullanıcıyı boğar. <strong>Çözüm:</strong>{" "}
              search input + sanal liste, veya kategoriye böl (eyebrow + Group +
              ayraç).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 4 — Check-all\\u0027a indeterminate eklememek'
          description={
            <>
              Kullanıcı 3 satır seçti, master ne göstermeli? "Bazısı seçili"
              durumu indeterminate'tir — yatay çizgi. Onsuz master ya tam dolu
              ya tam boş görünür → kullanıcı yanlış varsayım yapar.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Disabled checkbox'ın nedeni belirsiz"
          description={
            <>
              Sadece soluk bir checkbox göstermek yetmez. Yan tarafa kısa açıklama
              ("Pro plan gerekir") veya <code>Tooltip</code> ekle. Kullanıcı
              "neden tıklayamıyorum?" sorusunu sormamalı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Label'ı tıklanır yapmamak"
          description={
            <>
              Checkbox'ın label'ına tıklayınca checkbox toggle olmalı. AntD
              Checkbox bunu otomatik yapar — <strong>label'ı Checkbox'ın
              children'ı olarak ver</strong>, ayrı bir{" "}
              <code>&lt;span&gt;</code> dışında bırakma.
            </>
          }
        />
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
