"use client";

import { useState } from "react";
import { ChevronDown } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, ColorPicker, Input } from "@servicecoreui/ui/wraps";
import styles from "./color-picker.module.css";

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
 * Mocks
 * ──────────────────────────────────────────────── */

function CategoryFormMock() {
  const [name, setName] = useState("Network");
  const [color, setColor] = useState("#0070F3");

  return (
    <div className={styles.stack}>
      <div className={styles.categoryForm}>
        <div className={styles.formField}>
          <span className={styles.formLabel}>Kategori adı</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="örn. Network" />
        </div>
        <div className={styles.formField}>
          <span className={styles.formLabel}>Etiket rengi</span>
          <ColorPicker
            value={color}
            format="hex"
            showText
            onChangeComplete={(c) => setColor(c.toHexString())}
          />
        </div>
      </div>
      <div className={styles.formField}>
        <span className={styles.formHint}>Önizleme:</span>
        <span className={styles.previewTag} style={{ color }}>
          <span className={styles.previewDot} />
          {name || "Kategori"}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function ColorPickerPage() {
  const [controlled, setControlled] = useState("#0070F3");
  const [customTriggerColor, setCustomTriggerColor] = useState("#16A34A");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">ColorPicker</Display>
        <Text size="lg" color="secondary">
          Renk seçim alanı. <strong>Kullanıcı içeriği</strong> için: tag rengi,
          kategori rengi, dashboard widget customization. ServiceCore'un
          <strong> ana accent'i tek</strong> (<code>#0070F3</code>) — brand
          rengi kullanıcıya değiştirilmez.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#controlled">Controlled</a>
        <a href="#format">Format</a>
        <a href="#size">Size</a>
        <a href="#show-text">showText</a>
        <a href="#clear">Clear</a>
        <a href="#presets">Presets</a>
        <a href="#custom-trigger">Custom Trigger</a>
        <a href="#mock">Kategori Formu</a>
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
              <code>value</code>, <code>defaultValue</code>, <code>format</code>,{" "}
              <code>onChange</code>, <code>onChangeComplete</code> (5.7),{" "}
              <code>onFormatChange</code>, <code>onClear</code>,{" "}
              <code>allowClear</code>, <code>disabled</code>, <code>arrow</code>,{" "}
              <code>trigger</code>, <code>open</code>, <code>onOpenChange</code>,{" "}
              <code>placement</code>, <code>children</code>,{" "}
              <code>showText</code> (5.7), <code>size</code> (5.7),{" "}
              <code>presets</code>, <code>panelRender</code> (5.7).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>defaultFormat</code> (5.9+),{" "}
              <code>disabledAlpha</code> (5.8+),{" "}
              <code>disabledFormat</code> (5.22+),{" "}
              <code>mode=&quot;gradient&quot;</code> (5.20+),{" "}
              <code>destroyOnHidden</code> (5.25+),{" "}
              <code>color.toCssString()</code> (5.20+). Bunları yazsan{" "}
              build geçer ama runtime'da etkisiz olur veya yeni sürümde kırılır.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange vs onChangeComplete — state'i hangisiyle tut?"
          description={
            <>
              <strong><code>onChange</code></strong>: kullanıcı kaydırdıkça her
              piksel için fire eder. Anlık preview için kullan, state için DEĞİL.
              <br />
              <strong><code>onChangeComplete</code></strong>: kullanıcı mouse'u
              bıraktığında bir kez fire eder. <strong>State'i bununla tut</strong>{" "}
              — yoksa her hareket her saniye 30 setState'e yol açar, gereksiz
              re-render.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="Color objesinden string'e — toHexString() / toRgbString() / toHsbString()"
          description={
            <>
              Callback'ler <code>Color</code> objesi verir. String saklamak için:{" "}
              <code>c.toHexString()</code> → <code>&quot;#0070F3&quot;</code>,{" "}
              <code>c.toRgbString()</code> → <code>&quot;rgb(0, 112, 243)&quot;</code>,{" "}
              <code>c.toHsbString()</code> → <code>&quot;hsb(212, 100%, 95%)&quot;</code>.
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
          En sade hâli — <code>defaultValue</code> verirsin, AntD kendi state'ini
          tutar. Quick prototyping için uygun, gerçek formda controlled tercih
          edilir.
        </Text>
        <MockBlock caption="Uncontrolled — defaultValue ile">
          <div className={styles.row}>
            <ColorPicker defaultValue="#0070F3" />
            <ColorPicker defaultValue="#16A34A" />
            <ColorPicker defaultValue="#F59E0B" />
            <ColorPicker defaultValue="#EF4444" />
          </div>
        </MockBlock>
        <CodeBlock>{`<ColorPicker defaultValue="#0070F3" />`}</CodeBlock>
      </section>

      {/* ── CONTROLLED ── */}
      <section id="controlled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>controlled</span>
          <Heading level={2}>Controlled — state'i sen yönet</Heading>
        </div>
        <Text size="md" color="secondary">
          Form gönderiminde değer lazım, başka UI'ya bağlı preview göstereceksin,
          değeri API'ya yazacaksın → controlled kullan. Mutlaka{" "}
          <code>onChangeComplete</code> ile bağla, <code>onChange</code> ile
          değil.
        </Text>
        <MockBlock caption="Controlled — onChangeComplete + state">
          <div className={styles.stack}>
            <div className={styles.row}>
              <ColorPicker
                value={controlled}
                showText
                onChangeComplete={(c) => setControlled(c.toHexString())}
              />
              <Code>{controlled}</Code>
            </div>
            <div
              style={{
                width: "100%",
                height: 48,
                background: controlled,
                borderRadius: "var(--sc-radius-md)",
                border: "1px solid var(--sc-color-border-default)",
              }}
            />
          </div>
        </MockBlock>
        <CodeBlock>{`const [color, setColor] = useState("#0070F3");

<ColorPicker
  value={color}
  showText
  onChangeComplete={c => setColor(c.toHexString())}
/>`}</CodeBlock>
      </section>

      {/* ── FORMAT ── */}
      <section id="format" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>format</span>
          <Heading level={2}>Format — hex / rgb / hsb</Heading>
        </div>
        <Text size="md" color="secondary">
          Picker'ın value'yu hangi notasyonda göstereceği. ServiceCore default{" "}
          <code>hex</code> — developer dostu, kısa. CSS direkt kabul eder.
        </Text>
        <MockBlock caption="Format değiştir — panel açıp HEX/RGB/HSB dropdown'una bak">
          <div className={styles.row}>
            <ColorPicker defaultValue="#0070F3" format="hex" showText />
            <ColorPicker defaultValue="#0070F3" format="rgb" showText />
            <ColorPicker defaultValue="#0070F3" format="hsb" showText />
          </div>
        </MockBlock>
        <CodeBlock>{`<ColorPicker defaultValue="#0070F3" format="hex" showText />
<ColorPicker defaultValue="#0070F3" format="rgb" showText />
<ColorPicker defaultValue="#0070F3" format="hsb" showText />`}</CodeBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — small / middle / large</Heading>
        </div>
        <Text size="md" color="secondary">
          Aynı form içindeki Input/Button ile boy uyumu için. Default{" "}
          <code>middle</code> (36px).
        </Text>
        <MockBlock caption="3 boyut yan yana">
          <div className={styles.row}>
            <ColorPicker defaultValue="#0070F3" size="small" showText />
            <ColorPicker defaultValue="#0070F3" size="middle" showText />
            <ColorPicker defaultValue="#0070F3" size="large" showText />
          </div>
        </MockBlock>
      </section>

      {/* ── SHOW TEXT ── */}
      <section id="show-text" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showText</span>
          <Heading level={2}>showText — yanına HEX yazısı</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>showText=true</code> mono font ile renk değerini yanına yazar.
          Settings ekranlarında "şu an seçili" değeri kullanıcıya açıkça
          göstermek için.{" "}
          <code>{`showText={c => "Özel etiket"}`}</code> fonksiyon olarak da
          verilebilir.
        </Text>
        <MockBlock caption="Variants">
          <div className={styles.row}>
            <ColorPicker defaultValue="#0070F3" />
            <ColorPicker defaultValue="#0070F3" showText />
            <ColorPicker
              defaultValue="#0070F3"
              showText={(c) => <span>Renk · {c.toHexString().toUpperCase()}</span>}
            />
          </div>
        </MockBlock>
        <CodeBlock>{`<ColorPicker defaultValue="#0070F3" showText />

// Custom render
<ColorPicker
  defaultValue="#0070F3"
  showText={c => <span>Renk · {c.toHexString().toUpperCase()}</span>}
/>`}</CodeBlock>
      </section>

      {/* ── CLEAR ── */}
      <section id="clear" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>allowClear</span>
          <Heading level={2}>Clear — renk temizleme</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>allowClear</code> panel'in sağ üstüne "temizle" butonu ekler.
          Renk opsiyonel ise (boş bırakılabiliyorsa) bu prop'u aç, yoksa
          gizli kalsın.
        </Text>
        <MockBlock caption="Panel açıp sağ üstteki Clear butonuna bak">
          <ColorPicker defaultValue="#0070F3" allowClear showText />
        </MockBlock>
        <CodeBlock>{`<ColorPicker defaultValue="#0070F3" allowClear showText />`}</CodeBlock>
      </section>

      {/* ── PRESETS ── */}
      <section id="presets" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>presets</span>
          <Heading level={2}>Presets — hazır renk grupları</Heading>
        </div>
        <Text size="md" color="secondary">
          En kritik özellik. Kullanıcıyı sınırsız palete bırakmak{" "}
          <strong>anti-pattern</strong>. ServiceCore'a uygun renkleri preset
          olarak sun, kullanıcı çoğu zaman bunlardan seçer; bilenler özelleştirir.
        </Text>

        <DoDontGrid
          doItems={[
            "ServiceCore brand renkleri (accent + variantlar)",
            "Status: success / warning / danger / info",
            "Kategori paleti: 8-12 ayırt edilebilir renk",
            "Material veya Tailwind palette'i (kanıtlanmış kombinasyonlar)",
          ]}
          dontItems={[
            "Preset yok — kullanıcı seçim yorgunluğuna girer",
            "30+ renk tek grup — paradox of choice",
            "Düşük kontrastlı pastel renkler tek başına (okunmaz tag)",
            "Brand accent'ini preset olarak vermek (o sayfa-seviye karar, kullanıcı değil)",
          ]}
        />

        <MockBlock caption="ServiceCore preset grupları — Marka, Durum, Kategori paleti">
          <ColorPicker
            defaultValue="#0070F3"
            showText
            presets={[
              {
                label: "Marka",
                colors: ["#0070F3", "#5856D6", "#FF2D55"],
              },
              {
                label: "Durum",
                colors: ["#16A34A", "#F59E0B", "#EF4444", "#0EA5E9"],
              },
              {
                label: "Kategori paleti",
                colors: [
                  "#EF4444",
                  "#F59E0B",
                  "#EAB308",
                  "#16A34A",
                  "#0EA5E9",
                  "#0070F3",
                  "#8B5CF6",
                  "#EC4899",
                ],
              },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<ColorPicker
  defaultValue="#0070F3"
  presets={[
    { label: "Marka",            colors: ["#0070F3", "#5856D6", "#FF2D55"] },
    { label: "Durum",            colors: ["#16A34A", "#F59E0B", "#EF4444", "#0EA5E9"] },
    { label: "Kategori paleti",  colors: ["#EF4444", "#F59E0B", "#EAB308", "#16A34A", "#0EA5E9", "#0070F3", "#8B5CF6", "#EC4899"] },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── CUSTOM TRIGGER ── */}
      <section id="custom-trigger" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>children</span>
          <Heading level={2}>Custom Trigger — children prop'u</Heading>
        </div>
        <Text size="md" color="secondary">
          Default trigger uymuyorsa <code>children</code> içine kendi
          görünümünü ver — picker o element'e tıklanınca açılır.
        </Text>
        <MockBlock caption="Kendi trigger butonu — swatch + label">
          <ColorPicker
            value={customTriggerColor}
            onChangeComplete={(c) => setCustomTriggerColor(c.toHexString())}
          >
            <button type="button" className={styles.customTrigger}>
              <span
                className={styles.customSwatch}
                style={{ background: customTriggerColor }}
              />
              Etiket rengi
              <ChevronDown size={14} />
            </button>
          </ColorPicker>
        </MockBlock>
        <CodeBlock>{`<ColorPicker
  value={color}
  onChangeComplete={c => setColor(c.toHexString())}
>
  <button type="button" className={styles.customTrigger}>
    <span className={styles.swatch} style={{ background: color }} />
    Etiket rengi
    <ChevronDown size={14} />
  </button>
</ColorPicker>`}</CodeBlock>
      </section>

      {/* ── REAL MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Kategori Formu — gerçek senaryo</Heading>
        </div>
        <Text size="md" color="secondary">
          Admin paneli — yeni bilet kategorisi oluşturma. İsim + etiket rengi.
          Form değiştikçe önizleme tag güncellenir.
        </Text>
        <MockBlock caption="Yeni kategori — interactive form">
          <CategoryFormMock />
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
          message="Hata 1 — Brand accent'ini kullanıcıya değiştirmek"
          description={
            <>
              ServiceCore'da accent <strong>tek</strong> (<code>#0070F3</code>).
              "Tema renginiz" diye ColorPicker koymak tutarlılığı yok eder.
              Kullanıcı içeriği (tag, kategori, widget) için kullan — sistem
              chrome'u için DEĞİL.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Preset yok, sınırsız palet"
          description={
            <>
              Kullanıcı seçim yorgunluğuna girer; rastgele renkler seçer; panel
              kakofonik hâle gelir. <strong>Çözüm:</strong> 8-12 renkli kanıtlı
              palet preset olarak sun. Bilenler özelleştirir, çoğunluk
              preset'ten seçer.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — onChange ile state tutmak"
          description={
            <>
              <code>onChange</code> kullanıcı kaydırırken her piksel fire eder
              → her saniye 30+ re-render, list ağırsa lag. <strong>Çözüm:</strong>{" "}
              State <code>onChangeComplete</code>'te yaz, anlık preview için
              ayrı bir local state veya CSS variable kullan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Kontrast kontrolü yok"
          description={
            <>
              Kullanıcı beyaz üzerine açık sarı seçti — tag okunmaz. ColorPicker
              alanı varsa, <strong>preview göster</strong> (tıpkı yukarıdaki
              kategori formundaki gibi) → kullanıcı sonucu canlı görür ve
              kendisi düzeltir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Color objesini state'te tutmak"
          description={
            <>
              <code>setColor(c)</code> yapma — Color objesini state'te tutmak
              serialize edilemez, JSON'a yazamazsın, API'ya gönderemezsin.{" "}
              <strong>Her zaman string'e dönüştür:</strong>{" "}
              <code>setColor(c.toHexString())</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — disabledAlpha veya gradient mode beklemek (5.7'de yok)"
          description={
            <>
              <code>disabledAlpha</code> (5.8+) ve <code>mode=&quot;gradient&quot;</code>{" "}
              (5.20+) AntD'de var ama biz 5.7 baseline'dayız.{" "}
              <strong>Backend ekibi bu prop'ları yazarsa runtime'da etkisiz.</strong>{" "}
              Library upgrade konuşulmadan kullanma.
            </>
          }
        />
      </section>
    </main>
  );
}
