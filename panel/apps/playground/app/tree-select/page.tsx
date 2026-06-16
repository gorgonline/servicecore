"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, TreeSelect } from "@servicecoreui/ui/wraps";
import type { TreeSelectNode } from "@servicecoreui/ui/wraps";
import styles from "./tree-select.module.css";

/* ────────────────────────────────────────────────
 * Mock veri — bilet kategorisi hiyerarşisi
 * ──────────────────────────────────────────────── */

const CATEGORIES: TreeSelectNode[] = [
  {
    title: "Network",
    value: "network",
    children: [
      {
        title: "VPN",
        value: "network.vpn",
        children: [
          { title: "Bağlantı sorunu", value: "network.vpn.connection" },
          { title: "Yavaşlık", value: "network.vpn.slow" },
          { title: "Hesap kilidi", value: "network.vpn.lock" },
        ],
      },
      {
        title: "WiFi",
        value: "network.wifi",
        children: [
          { title: "Erişim noktası kapalı", value: "network.wifi.ap" },
          { title: "Sinyal zayıf", value: "network.wifi.signal" },
        ],
      },
      { title: "DNS", value: "network.dns" },
    ],
  },
  {
    title: "Donanım",
    value: "hardware",
    children: [
      { title: "Bilgisayar", value: "hardware.pc" },
      { title: "Yazıcı", value: "hardware.printer" },
      { title: "Telefon", value: "hardware.phone" },
    ],
  },
  {
    title: "Yazılım",
    value: "software",
    children: [
      { title: "Office", value: "software.office" },
      { title: "ERP", value: "software.erp" },
      { title: "Tarayıcı", value: "software.browser" },
    ],
  },
  {
    title: "Erişim",
    value: "access",
    children: [
      { title: "Yeni hesap", value: "access.new" },
      { title: "Şifre sıfırlama", value: "access.password" },
      { title: "Yetki talebi", value: "access.permission", disabled: true },
    ],
  },
];

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

export default function TreeSelectPage() {
  const [single, setSingle] = useState<string | undefined>("network.vpn.connection");
  const [multi, setMulti] = useState<string[]>(["network.wifi.ap", "software.office"]);
  const [parent, setParent] = useState<string[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">TreeSelect</Display>
        <Text size="lg" color="secondary">
          Hiyerarşik select. Asset kategorisi (Network &gt; VPN &gt; Connection),
          organizasyon (Şirket &gt; Departman &gt; Takım), location, permission tree.
          Düz Select multiple yetersiz olduğunda — parent seçince child'lar
          otomatik takip etmeli veya hiyerarşi görselde dursun istiyorsan.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">TreeSelect vs ?</a>
        <a href="#temel">Temel</a>
        <a href="#multi">Multi + Checkbox</a>
        <a href="#strategy">CheckedStrategy</a>
        <a href="#search">Search</a>
        <a href="#expand">Expand</a>
        <a href="#disabled">Disabled</a>
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
              <code>value</code>, <code>defaultValue</code>,{" "}
              <code>multiple</code>, <code>treeCheckable</code>,{" "}
              <code>treeCheckStrictly</code>, <code>treeData</code>,{" "}
              <code>fieldNames</code> (custom key/label/children),{" "}
              <code>placeholder</code>, <code>disabled</code>,{" "}
              <code>allowClear</code>, <code>showSearch</code>,{" "}
              <code>filterTreeNode</code>, <code>treeNodeFilterProp</code>,{" "}
              <code>treeNodeLabelProp</code>,{" "}
              <code>treeDefaultExpandAll</code>,{" "}
              <code>treeDefaultExpandedKeys</code>,{" "}
              <code>showCheckedStrategy</code> (SHOW_ALL/PARENT/CHILD),{" "}
              <code>maxTagCount</code>, <code>maxTagPlaceholder</code>,{" "}
              <code>tagRender</code>, <code>labelInValue</code>,{" "}
              <code>loadData</code>, <code>status</code>, <code>size</code>,{" "}
              <code>virtual</code>, <code>popupClassName</code>,{" "}
              <code>onChange</code>, <code>onSelect</code>,{" "}
              <code>onSearch</code>, <code>onTreeExpand</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>variant</code> (5.13+), <code>prefix</code> (5.22+),{" "}
              <code>maxCount</code> (5.23+),{" "}
              <code>onPopupScroll</code> (5.17+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — (value, label, extra)"
          description={
            <>
              Single: <code>{`(value: string, label: ReactNode[], extra: {triggerNode, ...}) => void`}</code>
              <br />
              Multiple: <code>{`(value: string[], label: ReactNode[][], extra) => void`}</code>
              <br />
              Sadece value lazımsa ilk parametreyi al, gerisi ignore.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="treeCheckable vs multiple — fark"
          description={
            <>
              <strong>multiple:</strong> tag chip'leriyle çoklu seçim,
              checkbox YOK.
              <br />
              <strong>treeCheckable:</strong> her node'da checkbox, parent
              seçince child'lar otomatik takip eder.
              <br />
              Çoğu zaman ikisini birlikte kullanırsın:{" "}
              <code>{`multiple treeCheckable`}</code>.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>TreeSelect vs Select vs Cascader</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "TreeSelect: hiyerarşi VAR + leaf seçimi her seviyeden olabilir",
            "TreeSelect: parent seçimi tüm child'ı kapsayacak (treeCheckable)",
            "Cascader: hiyerarşi VAR + sadece leaf seçilebilir (zorunlu sıralı)",
            "Select multiple: hiyerarşi YOK, düz liste",
          ]}
          dontItems={[
            "TreeSelect'i 2 seviyeli az veri için (Select grup yeter)",
            "TreeSelect'i sıralı zorunlu seçim için (o Cascader)",
            "Select multiple'ı 50+ nested kategori için (kullanıcı bağlam kaybeder)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Tek seçim — leaf node</Heading>
        </div>
        <MockBlock caption="Bilet kategorisi seç">
          <div className={styles.row}>
            <TreeSelect
              value={single}
              onChange={(v) => setSingle(v as string | undefined)}
              treeData={CATEGORIES}
              treeDefaultExpandAll
              placeholder="Kategori seç"
              style={{ width: 320 }}
            />
            <span className={styles.previewPill}>value: {single ?? "—"}</span>
          </div>
        </MockBlock>
        <CodeBlock>{`const [cat, setCat] = useState<string>();

<TreeSelect
  value={cat}
  onChange={setCat}
  treeData={categories}
  treeDefaultExpandAll
  placeholder="Kategori seç"
/>`}</CodeBlock>
      </section>

      {/* ── MULTI ── */}
      <section id="multi" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>multiple + treeCheckable</span>
          <Heading level={2}>Çoklu seçim + checkbox</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>multiple</code> tag chip'leri, <code>treeCheckable</code>{" "}
          her node'da checkbox. Parent seçince tüm child'lar otomatik
          işaretlenir.
        </Text>
        <MockBlock caption='multiple + treeCheckable + showCheckedStrategy="SHOW_CHILD"'>
          <TreeSelect
            multiple
            treeCheckable
            value={multi}
            onChange={(v) => setMulti(v as string[])}
            treeData={CATEGORIES}
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            placeholder="Kategorileri seç"
            style={{ width: 480 }}
          />
        </MockBlock>
        <CodeBlock>{`<TreeSelect
  multiple
  treeCheckable
  value={cats}
  onChange={setCats}
  treeData={categories}
  showCheckedStrategy={TreeSelect.SHOW_CHILD}  // default
/>`}</CodeBlock>
      </section>

      {/* ── STRATEGY ── */}
      <section id="strategy" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showCheckedStrategy</span>
          <Heading level={2}>SHOW_CHILD vs SHOW_PARENT vs SHOW_ALL</Heading>
        </div>
        <Text size="md" color="secondary">
          Seçili node'lar selector input'unda nasıl gösterilsin? Network &gt;
          VPN'in 3 child'ı varsa hepsini işaretledin diyelim:
          <br />
          <strong>SHOW_CHILD</strong> (default): 3 leaf chip görünür
          (Bağlantı, Yavaşlık, Hesap kilidi).
          <br />
          <strong>SHOW_PARENT</strong>: sadece VPN chip'i görünür (compact).
          <br />
          <strong>SHOW_ALL</strong>: VPN + 3 child = 4 chip (verbose).
        </Text>
        <MockBlock caption="SHOW_PARENT — parent dolu seçilirse sadece parent göster">
          <TreeSelect
            multiple
            treeCheckable
            value={parent}
            onChange={(v) => setParent(v as string[])}
            treeData={CATEGORIES}
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            placeholder='Tüm "Network" alt kategorilerini seçince sadece "Network" chip'
            style={{ width: 480 }}
          />
        </MockBlock>
        <CodeBlock>{`<TreeSelect
  showCheckedStrategy={TreeSelect.SHOW_PARENT}
  // veya: "SHOW_PARENT" string
/>`}</CodeBlock>
      </section>

      {/* ── SEARCH ── */}
      <section id="search" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showSearch · filterTreeNode</span>
          <Heading level={2}>Search — node filtreleme</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>showSearch</code> ile input'a tıklayınca search aktifleşir.
          Default'ta value'da arar; title'da aratmak için{" "}
          <code>treeNodeFilterProp="title"</code>.
        </Text>
        <MockBlock caption='showSearch + treeNodeFilterProp="title"'>
          <TreeSelect
            showSearch
            value={search}
            onChange={(v) => setSearch(v as string | undefined)}
            treeData={CATEGORIES}
            treeDefaultExpandAll
            treeNodeFilterProp="title"
            placeholder="VPN yaz, alt kategori filtrelenir"
            style={{ width: 320 }}
            allowClear
          />
        </MockBlock>
        <CodeBlock>{`<TreeSelect
  showSearch
  treeNodeFilterProp="title"     // default value, title'da arasın
  allowClear
  treeData={...}
/>

// Custom filter:
<TreeSelect
  showSearch
  filterTreeNode={(input, node) =>
    (node.title as string).toLowerCase().includes(input.toLowerCase())
  }
/>`}</CodeBlock>
      </section>

      {/* ── EXPAND ── */}
      <section id="expand" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>treeDefaultExpandAll · treeLine</span>
          <Heading level={2}>Expand davranışı</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>treeDefaultExpandAll</code> tüm node'ları açar (küçük tree
          için).{" "}
          <code>treeDefaultExpandedKeys=[...]</code> belirli node'ları açar.{" "}
          <code>treeLine</code> dikey çizgilerle hiyerarşi görselleştirir
          (eski masaüstü uygulamaları stili).
        </Text>
        <MockBlock caption="treeLine + treeDefaultExpandAll">
          <TreeSelect
            treeData={CATEGORIES}
            treeDefaultExpandAll
            treeLine
            placeholder="Hiyerarşi çizgileri ile"
            style={{ width: 320 }}
          />
        </MockBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled node</Heading>
        </div>
        <Text size="md" color="secondary">
          Item'da <code>disabled: true</code> ile o node tıklanamaz. Yetki
          gerektiren kategoriler için.
        </Text>
        <MockBlock caption='"Erişim &gt; Yetki talebi" disabled (yetki gerektirir)'>
          <TreeSelect
            treeData={CATEGORIES}
            treeDefaultExpandedKeys={["access"]}
            placeholder='"Erişim" altındaki "Yetki talebi" devre dışı'
            style={{ width: 320 }}
          />
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
          message="Hata 1 — 2 seviyeli az veri için TreeSelect"
          description={
            <>
              "Aktif/Pasif" altında 5-10 alt option varsa Select grup yeter.
              Tree görselinin maliyeti yüksek — 3+ seviye veya 30+ node
              olunca anlamlı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Search'siz 50+ node"
          description={
            <>
              Tree expand/collapse ile bulması zor. <strong>Çözüm:</strong>{" "}
              <code>showSearch</code> + <code>treeNodeFilterProp="title"</code>{" "}
              — kullanıcı "VPN" yazınca filtrelensin.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message={`Hata 3 — multiple + treeCheckable'da showCheckedStrategy düşünmemek`}
          description={
            <>
              Default SHOW_CHILD ile parent seçince 20+ leaf chip patlar.{" "}
              <strong>Çözüm:</strong> SHOW_PARENT — Network seçince sadece
              "Network" tek chip.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Hiyerarşi olmadan TreeSelect"
          description={
            <>
              Düz 20 option için TreeSelect kullanmak gereksiz API yükü.
              Select multiple yeter.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — variant/prefix/maxCount beklemek (5.13+/5.22+/5.23+)"
          description={
            <>
              Hiçbiri 5.7'de yok. Tasarım override için CSS module'da yap.
            </>
          }
        />
      </section>
    </main>
  );
}
