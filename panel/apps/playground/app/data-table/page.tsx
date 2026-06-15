"use client";

import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { DataTable } from "@servicecoreui/ui";
import type { DataTableColumn } from "@servicecoreui/ui";
import { Tag } from "@servicecoreui/ui";
import type { TagProps } from "@servicecoreui/ui";
import styles from "./data-table.module.css";

interface Bilet {
  key: string;
  id: string;
  konu: string;
  durum: string;
  durumTone: NonNullable<TagProps["tone"]>;
  atanan: string;
  grup: string;
}

const VERI: Bilet[] = [
  { key: "1", id: "INC-211", konu: "Hesap şifre hatası", durum: "Açık", durumTone: "info", atanan: "Mehmet Kaya", grup: "Güvenlik Destek" },
  { key: "2", id: "INC-210", konu: "VPN bağlantısı yavaş", durum: "İşlemde", durumTone: "accent", atanan: "Ayşe Tan", grup: "Ağ Destek" },
  { key: "3", id: "INC-209", konu: "Outlook senkron hatası", durum: "Çözüldü", durumTone: "success", atanan: "Burak Demir", grup: "Sistem Destek" },
  { key: "4", id: "INC-208", konu: "Yazıcı toner bitti", durum: "SLA Aşıldı", durumTone: "danger", atanan: "Can Erdem", grup: "Donanım Destek" },
  { key: "5", id: "SR-1162", konu: "Kulaklık isteği", durum: "Açık", durumTone: "info", atanan: "Demo Admin", grup: "Donanım Destek" },
];

const DURUM_OPTS = ["Açık", "İşlemde", "Çözüldü", "SLA Aşıldı"].map((v) => ({ label: v, value: v }));
const GRUP_OPTS = ["Donanım Destek", "Güvenlik Destek", "Sistem Destek", "Ağ Destek"].map((v) => ({ label: v, value: v }));

const COLUMNS: DataTableColumn<Bilet>[] = [
  { key: "id", title: "Id", dataIndex: "id", width: 120, sortable: true, filter: { type: "text" }, render: (r) => (
    <Text size="sm" weight="medium" color="accent" style={{ fontFamily: "var(--sc-font-mono)" }}>{r.id}</Text>
  ) },
  { key: "konu", title: "Konu", dataIndex: "konu", ellipsis: true, sortable: true, filter: { type: "text" }, render: (r) => <Text size="sm">{r.konu}</Text> },
  { key: "durum", title: "Durum", dataIndex: "durum", width: 170, sortable: true, filter: { type: "enum", options: DURUM_OPTS }, render: (r) => (
    <Tag tone={r.durumTone} dot size="small">{r.durum}</Tag>
  ) },
  { key: "atanan", title: "Atanan", dataIndex: "atanan", width: 180, sortable: true, filter: { type: "text" }, render: (r) => <Text size="sm">{r.atanan}</Text> },
  { key: "grup", title: "Destek Grubu", dataIndex: "grup", width: 180, defaultHidden: true, sortable: true, filter: { type: "enum", options: GRUP_OPTS }, render: (r) => <Text size="sm">{r.grup}</Text> },
];

export default function DataTablePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">DataTable</Display>
        <Text size="lg" color="secondary">
          ITSM kayıt tarayıcısı (records browser) composite'i. Deklaratif kolon
          spec'inden <strong>sort</strong> + kolon-başı <strong>huni filtre</strong>{" "}
          (metin/enum) + <strong>"Sütunlar"</strong> görünürlüğü + <strong>aktif
          filtre chip'leri</strong> + sayfalama üretir. Her modülde (Olay/Çağrı/
          Problem/İstek…) aynı liste deseni için tek bileşen.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Demo</Heading>
        <Text color="secondary">
          Başlığa tıkla → sırala. Huniye tıkla → filtrele (metin/checkbox).
          "Sütunlar" → kolon aç/kapat (Destek Grubu varsayılan gizli). Uygulanan
          filtreler üstte chip olarak çıkar.
        </Text>
        <div className={styles.demo}>
          <DataTable<Bilet> rowKey="key" data={VERI} columns={COLUMNS} pageSize={5} />
        </div>
      </section>

      <section className={styles.section}>
        <Heading level={2}>DataTableProps</Heading>
        <table className={styles.props}>
          <thead>
            <tr><th>Prop</th><th>Tip</th><th>Açıklama</th></tr>
          </thead>
          <tbody>
            <tr><td><code>rowKey</code></td><td><code>keyof T</code></td><td>Satır anahtarı alanı.</td></tr>
            <tr><td><code>data</code></td><td><code>T[]</code></td><td>Satır verisi.</td></tr>
            <tr><td><code>columns</code></td><td><code>DataTableColumn&lt;T&gt;[]</code></td><td>Deklaratif kolon spec'i.</td></tr>
            <tr><td><code>pageSize</code></td><td><code>number</code></td><td>Sayfa boyutu (vars. 10).</td></tr>
            <tr><td><code>columnToggle</code></td><td><code>boolean</code></td><td>"Sütunlar" kontrolü (vars. true).</td></tr>
            <tr><td><code>showFilterChips</code></td><td><code>boolean</code></td><td>Aktif filtre chip çubuğu (vars. true).</td></tr>
            <tr><td><code>toolbar</code></td><td><code>ReactNode</code></td><td>Sağ üstte ek araçlar (Dışa aktar vb.).</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>DataTableColumn</Heading>
        <table className={styles.props}>
          <thead>
            <tr><th>Alan</th><th>Tip</th><th>Açıklama</th></tr>
          </thead>
          <tbody>
            <tr><td><code>key</code></td><td><code>string</code></td><td>Benzersiz kolon anahtarı.</td></tr>
            <tr><td><code>title</code></td><td><code>string</code></td><td>Başlık (Sütunlar + chip etiketi).</td></tr>
            <tr><td><code>dataIndex</code></td><td><code>keyof T</code></td><td>Veri alanı.</td></tr>
            <tr><td><code>sortable</code></td><td><code>boolean | (a,b)=&gt;number</code></td><td>true → Türkçe metin sırala; fn → özel.</td></tr>
            <tr><td><code>filter</code></td><td><code>{`{type:"text"} | {type:"enum",options}`}</code></td><td>Kolon-başı huni filtre.</td></tr>
            <tr><td><code>defaultHidden</code></td><td><code>boolean</code></td><td>Sütunlar'da varsayılan gizli.</td></tr>
            <tr><td><code>render</code></td><td><code>(record: T) =&gt; ReactNode</code></td><td>Hücre içeriği (satırdan).</td></tr>
            <tr><td><code>width / ellipsis / align</code></td><td><code>—</code></td><td>Görünüm ayarları.</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`const COLUMNS: DataTableColumn<Bilet>[] = [
  { key: "id", title: "Id", dataIndex: "id", sortable: true,
    filter: { type: "text" }, render: (r) => <Code>{r.id}</Code> },
  { key: "durum", title: "Durum", dataIndex: "durum",
    filter: { type: "enum", options: DURUM_OPTS },
    render: (r) => <Tag tone={r.durumTone} dot>{r.durum}</Tag> },
  { key: "grup", title: "Destek Grubu", dataIndex: "grup",
    defaultHidden: true, filter: { type: "enum", options: GRUP_OPTS },
    render: (r) => <Text>{r.grup}</Text> },
];

<DataTable rowKey="key" data={biletler} columns={COLUMNS} />`}</Code>
      </section>
    </main>
  );
}
