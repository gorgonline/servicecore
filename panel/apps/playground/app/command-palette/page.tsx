"use client";

import { useState } from "react";
import { Search } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui/typography";
import { CommandPalette } from "@servicecoreui/ui/custom";
import { Button } from "@servicecoreui/ui/wraps";
import styles from "./command-palette.module.css";

const RECENT = [
  { key: "1", label: "SC-4127 — Print server bağlanamıyor" },
  { key: "2", label: "VPN yavaş — ev ofisi" },
  { key: "3", label: "Yeni kullanıcı AD entegrasyonu" },
];

const FILTERS = [
  { key: "desc", label: "Açıklamada da ara" },
  { key: "closed", label: "Kapalı kayıtları dahil et" },
];

export default function CommandPalettePage() {
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">CommandPalette</Display>
        <Text size="lg" color="secondary">
          Global arama / komut paleti. Modal (üst-orta, backdrop) + arama kutusu +
          filtreler + boş durum (son aramalar) + klavye ipucu footer'ı. Tamamen
          veri-güdümlü (props) — sayfaya gömülü ad-hoc kod değil. İçeride{" "}
          <code>Modal · Input · Checkbox · Kbd · Eyebrow · Text</code> kullanır.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Demo</Heading>
        <Button type="primary" leadingIcon={<Search size={16} />} onClick={() => setOpen(true)}>
          Aramayı aç
        </Button>
        <Text size="sm" color="tertiary">
          Shell'de Search butonu ve ⌘K ile açılır; bu demoda buton tetikler.
        </Text>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          placeholder="Olay, istek, varlık, kişi ara…"
          recent={RECENT}
          filters={FILTERS}
        />
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
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td>Açık/kapalı (controlled).</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() =&gt; void</code></td>
              <td>ESC / dış tık / kapatma.</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string?</code></td>
              <td>Arama kutusu placeholder'ı.</td>
            </tr>
            <tr>
              <td><code>recent</code></td>
              <td><code>CommandItem[]?</code></td>
              <td>Boş durumda gösterilen öğeler ({"{"} key, label, icon?, meta? {"}"}).</td>
            </tr>
            <tr>
              <td><code>recentLabel</code></td>
              <td><code>string?</code></td>
              <td>Boş durum başlığı. Default "Son aramalar".</td>
            </tr>
            <tr>
              <td><code>filters</code></td>
              <td><code>CommandFilter[]?</code></td>
              <td>Arama altı checkbox'lar ({"{"} key, label, defaultChecked? {"}"}).</td>
            </tr>
            <tr>
              <td><code>onSelect</code></td>
              <td><code>(item) =&gt; void</code></td>
              <td>Bir öğeye tıklanınca. Yoksa query'e yazılır.</td>
            </tr>
            <tr>
              <td><code>onSearch</code></td>
              <td><code>(q, filters) =&gt; void</code></td>
              <td>Query/filtre değişince (canlı sonuç bağlamak için — Adım 2).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`const [open, setOpen] = useState(false);

<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  placeholder="Olay, istek, varlık ara…"
  recent={[{ key: "1", label: "SC-4127 — Print server" }]}
  filters={[{ key: "desc", label: "Açıklamada da ara" }]}
/>`}</Code>
      </section>
    </main>
  );
}
