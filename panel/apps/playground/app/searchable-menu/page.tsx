"use client";

import { useState } from "react";
import { ChevronDown } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { SearchableMenu } from "@servicecoreui/ui";
import { Button } from "@servicecoreui/ui";
import styles from "./searchable-menu.module.css";

const PANOLAR = [
  { key: "ornek", label: "Örnek Pano" },
  { key: "ikd", label: "IKD PANO" },
  { key: "sla", label: "SLA PANO" },
  { key: "ops", label: "Operasyon Panosu" },
  { key: "cmdb", label: "CMDB Panosu" },
  { key: "kb", label: "Bilgi Tabanı Panosu" },
  { key: "degisiklik", label: "Değişiklik Yönetimi" },
  { key: "problem", label: "Problem Analizi" },
  { key: "varlik", label: "Varlık Envanteri" },
  { key: "katalog", label: "Hizmet Kataloğu" },
  { key: "csat", label: "Müşteri Memnuniyeti" },
  { key: "ekip", label: "Ekip Performansı" },
  { key: "trend", label: "Olay Trendleri" },
];

export default function SearchableMenuPage() {
  const [selected, setSelected] = useState("ornek");
  const current = PANOLAR.find((p) => p.key === selected)?.label ?? "Seç";

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">SearchableMenu</Display>
        <Text size="lg" color="secondary">
          Üstünde arama olan dropdown menü. Tetikleyicinin etiket/buton görünümünü
          korur, açılınca üstte bir <code>Input</code> (filtre) + filtrelenmiş öğe
          listesi gelir. Header pano/tenant switcher gibi çok öğeli seçimlerde
          aranabilirlik gerektiğinde — <code>Select</code>'in form-kutusu görünümüne
          karşı doğru tercih.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Demo</Heading>
        <Text color="secondary">
          Tetikleyiciye tıkla, yaz → liste filtrelenir. Seçim panel'i kapatır,
          dışarı tıklayınca arama sıfırlanır.
        </Text>
        <div className={styles.demo}>
          <SearchableMenu
            items={PANOLAR}
            selectedKey={selected}
            onSelect={setSelected}
            placeholder="Pano ara"
          >
            <Button trailingIcon={<ChevronDown size={14} />}>{current}</Button>
          </SearchableMenu>
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
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>Tetikleyici — menüyü açan eleman (buton/etiket).</td>
            </tr>
            <tr>
              <td><code>items</code></td>
              <td><code>SearchableMenuItem[]</code></td>
              <td><code>{`{ key, label, icon? }`}</code> — label aynı zamanda arama metni.</td>
            </tr>
            <tr>
              <td><code>selectedKey</code></td>
              <td><code>string?</code></td>
              <td>Seçili öğe — işaretlenir (✓).</td>
            </tr>
            <tr>
              <td><code>onSelect</code></td>
              <td><code>(key) =&gt; void</code></td>
              <td>Bir öğe seçilince (panel kapanır).</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td>Arama input placeholder'ı (vars. "Ara").</td>
            </tr>
            <tr>
              <td><code>emptyText</code></td>
              <td><code>string</code></td>
              <td>Sonuç yoksa metin (vars. "Sonuç yok").</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td><code>DropdownProps["placement"]</code></td>
              <td>Açılma yönü (vars. "bottomLeft").</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<SearchableMenu
  items={panolar}
  selectedKey={current}
  onSelect={(key) => switchPano(key)}
  placeholder="Pano ara"
>
  <Button trailingIcon={<ChevronDown size={14} />}>Örnek Pano</Button>
</SearchableMenu>`}</Code>
      </section>
    </main>
  );
}
