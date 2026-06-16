"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, InputNumber } from "@servicecoreui/ui/wraps";
import styles from "./input-number.module.css";

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
 * Real mock — Threshold/alert configuration
 * ──────────────────────────────────────────────── */

function ThresholdMock() {
  const [cpu, setCpu] = useState<number | string | null>(80);
  const [mem, setMem] = useState<number | string | null>(75);
  const [responseMs, setResponseMs] = useState<number | string | null>(500);
  const [downtimeMin, setDowntimeMin] = useState<number | string | null>(5);

  return (
    <div className={styles.thresholdForm}>
      <div className={styles.field}>
        <span className={styles.fieldLabel}>CPU kullanım eşiği (%)</span>
        <InputNumber
          min={0}
          max={100}
          step={5}
          value={cpu}
          onChange={setCpu}
          formatter={(v) => (v === undefined || v === null ? "" : `${v}%`)}
          parser={(v) => Number((v ?? "").replace("%", ""))}
          style={{ width: "100%" }}
        />
        <span className={styles.fieldHint}>0–100 aralığında, %5 adımlarla</span>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Bellek kullanım eşiği (%)</span>
        <InputNumber
          min={0}
          max={100}
          step={5}
          value={mem}
          onChange={setMem}
          formatter={(v) => (v === undefined || v === null ? "" : `${v}%`)}
          parser={(v) => Number((v ?? "").replace("%", ""))}
          style={{ width: "100%" }}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Yanıt süresi limiti</span>
        <InputNumber
          min={0}
          max={60000}
          step={50}
          value={responseMs}
          onChange={setResponseMs}
          prefix="ms"
          style={{ width: "100%" }}
        />
        <span className={styles.fieldHint}>Bunu aşan istekler alert tetikler</span>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Downtime tolerans süresi</span>
        <InputNumber
          min={1}
          max={60}
          step={1}
          value={downtimeMin}
          onChange={setDowntimeMin}
          prefix="dk"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function InputNumberPage() {
  const [basic, setBasic] = useState<number | string | null>(3);
  const [price, setPrice] = useState<number | string | null>(12500.75);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">InputNumber</Display>
        <Text size="lg" color="secondary">
          Sayısal değer girişi. SLA hedef saatleri, port, threshold, fiyat,
          adet. Plain Input + manuel <code>parseInt</code> kullanma —
          InputNumber min/max/step/format işini doğru yapar.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#range">Min/Max/Step</a>
        <a href="#precision">Precision</a>
        <a href="#prefix">Prefix</a>
        <a href="#controls">Controls</a>
        <a href="#formatter">Formatter</a>
        <a href="#size">Size</a>
        <a href="#status">Status</a>
        <a href="#mock">Threshold Form</a>
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
              <code>value</code>, <code>defaultValue</code>, <code>min</code>,{" "}
              <code>max</code>, <code>step</code>, <code>precision</code>,{" "}
              <code>decimalSeparator</code>, <code>formatter</code>,{" "}
              <code>parser</code>, <code>placeholder</code>,{" "}
              <code>disabled</code>, <code>readOnly</code>, <code>size</code>,{" "}
              <code>status</code>, <code>prefix</code>, <code>controls</code>{" "}
              (boolean | <code>{`{ upIcon, downIcon }`}</code>),{" "}
              <code>keyboard</code>, <code>stringMode</code>,{" "}
              <code>onChange</code>, <code>onPressEnter</code>,{" "}
              <code>onStep</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>variant</code> (5.13+), <code>suffix</code> (5.20+ →{" "}
              <strong>yüzde için formatter kullan</strong>),{" "}
              <code>changeOnWheel</code> (5.14+),{" "}
              <code>changeOnBlur</code> (5.11+),{" "}
              <code>nativeElement</code> (5.17+),{" "}
              <code>focus({`{ cursor }`})</code> (5.22+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — number | string | null"
          description={
            <>
              <code>{`(value: number | string | null) => void`}</code> — string
              dönmesi <code>stringMode=true</code> ise (high-precision için).
              Backend'e göndermeden önce <code>Number(v)</code> ile cast et,
              veya backend zaten string kabul ediyorsa direkt geç.
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
        <MockBlock caption="Controlled — onChange ile state">
          <div className={styles.row}>
            <InputNumber value={basic} onChange={setBasic} />
            <span className={styles.previewPill}>value: {basic === null ? "null" : String(basic)}</span>
          </div>
        </MockBlock>
        <CodeBlock>{`const [val, setVal] = useState<number | string | null>(3);

<InputNumber value={val} onChange={setVal} />`}</CodeBlock>
      </section>

      {/* ── RANGE ── */}
      <section id="range" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>min / max / step</span>
          <Heading level={2}>Aralık ve adım</Heading>
        </div>
        <Text size="md" color="secondary">
          Her zaman <code>min</code> ve <code>max</code> ver — kullanıcı negatif
          SLA saati veya 99999 port girmesin. <code>step</code> stepper
          butonunun hassasiyeti.
        </Text>
        <MockBlock caption="0–100 arası, 5'er adımla">
          <InputNumber min={0} max={100} step={5} defaultValue={20} />
        </MockBlock>
        <MockBlock caption="Negatif aralık, 0.5 adım (örn: enlem/boylam, sıcaklık)">
          <InputNumber min={-90} max={90} step={0.5} defaultValue={41} />
        </MockBlock>
        <CodeBlock>{`<InputNumber min={0}   max={100}   step={5}   defaultValue={20} />
<InputNumber min={-90} max={90}   step={0.5} defaultValue={41} />
<InputNumber min={1}   max={65535} step={1}  defaultValue={443} />  // port`}</CodeBlock>
      </section>

      {/* ── PRECISION ── */}
      <section id="precision" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>precision</span>
          <Heading level={2}>Precision — ondalık sayı kontrolü</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>precision</code> ondalık basamak sayısını sabitler. Para birimi
          için <code>2</code>, oran için <code>4</code>. Aksi halde JS{" "}
          <code>0.1 + 0.2 = 0.30000000000000004</code> şovuna açar.
        </Text>
        <MockBlock caption="precision=2 (para)">
          <InputNumber min={0} step={0.01} precision={2} defaultValue={99.99} />
        </MockBlock>
        <MockBlock caption="precision=0 (integer zorla — Float gelmez)">
          <InputNumber min={1} step={1} precision={0} defaultValue={42} />
        </MockBlock>
      </section>

      {/* ── PREFIX ── */}
      <section id="prefix" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>prefix</span>
          <Heading level={2}>Prefix — birim/sembol</Heading>
        </div>
        <Text size="md" color="secondary">
          Para sembolü, birim (ms, dk, kg) için. <strong>5.7'de{" "}
          <code>suffix</code> yok</strong> — sağa birim koyman gerekiyorsa{" "}
          <code>formatter</code> ile yap (aşağıda örnek).
        </Text>
        <MockBlock caption="Prefix örnekleri">
          <div className={styles.row}>
            <InputNumber min={0} step={0.01} precision={2} prefix="₺" defaultValue={1500} />
            <InputNumber min={0} prefix="ms" defaultValue={250} />
            <InputNumber min={0} max={100} prefix="#" defaultValue={3} />
          </div>
        </MockBlock>
        <CodeBlock>{`<InputNumber prefix="₺"  precision={2} step={0.01} />
<InputNumber prefix="ms" min={0} />
<InputNumber prefix="#"  min={1} max={999} />`}</CodeBlock>
      </section>

      {/* ── CONTROLS ── */}
      <section id="controls" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>controls</span>
          <Heading level={2}>Controls — stepper'ı gizle veya özelleştir</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>controls=false</code> ile yukarı/aşağı butonları gizlenir.
          Tablo hücresi gibi yer kısıtlı alanlarda. Kullanıcı klavyeyle (↑/↓)
          yine değiştirebilir (<code>keyboard=true</code> default).
        </Text>
        <MockBlock caption="Karşılaştırma">
          <div className={styles.row}>
            <InputNumber defaultValue={50} />
            <InputNumber controls={false} defaultValue={50} />
          </div>
        </MockBlock>
        <CodeBlock>{`<InputNumber controls={false} />    // butonsuz
<InputNumber keyboard={false} />     // ok tuşlarını da kapat`}</CodeBlock>
      </section>

      {/* ── FORMATTER ── */}
      <section id="formatter" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>formatter / parser</span>
          <Heading level={2}>Formatter — para, yüzde, binlik ayraç</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>formatter</code> input'ta nasıl gösterileceği,{" "}
          <code>parser</code> hangi karakterlerin sayıya çevrilmek üzere
          atılacağı. Tersi tersinedir — kaçırırsan değer kaybolur.
        </Text>

        <MockBlock caption="Currency — ₺12,500.75">
          <div className={styles.row}>
            <InputNumber
              value={price}
              onChange={setPrice}
              prefix="₺"
              precision={2}
              step={0.01}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              parser={(v) => Number((v ?? "").replace(/\./g, ""))}
              style={{ width: 200 }}
            />
            <span className={styles.previewPill}>raw: {String(price)}</span>
          </div>
        </MockBlock>

        <MockBlock caption="Yüzde — sağa % işareti (suffix yok diye formatter)">
          <InputNumber
            min={0}
            max={100}
            defaultValue={75}
            formatter={(v) => (v === undefined || v === null ? "" : `${v}%`)}
            parser={(v) => Number((v ?? "").replace("%", ""))}
            style={{ width: 120 }}
          />
        </MockBlock>

        <CodeBlock>{`// TR para — binlik nokta ayraç (1.234.567,89)
<InputNumber
  prefix="₺"
  precision={2}
  step={0.01}
  formatter={v => \`\${v}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".")}
  parser={v => Number((v ?? "").replace(/\\./g, ""))}
/>

// Yüzde (5.7'de suffix yok → formatter ile sağa %)
<InputNumber
  min={0} max={100}
  formatter={v => v == null ? "" : \`\${v}%\`}
  parser={v => Number((v ?? "").replace("%", ""))}
/>`}</CodeBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — small / middle / large</Heading>
        </div>
        <MockBlock caption="3 boyut">
          <div className={styles.row}>
            <InputNumber size="small" defaultValue={5} />
            <InputNumber size="middle" defaultValue={5} />
            <InputNumber size="large" defaultValue={5} />
          </div>
        </MockBlock>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>status</span>
          <Heading level={2}>Status — error / warning</Heading>
        </div>
        <MockBlock caption="Validation states">
          <div className={styles.row}>
            <InputNumber status="error" defaultValue={-5} placeholder="Negatif olamaz" />
            <InputNumber status="warning" defaultValue={150} placeholder="Limit üstü" />
          </div>
        </MockBlock>
      </section>

      {/* ── REAL MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Threshold/Alert Form — gerçek senaryo</Heading>
        </div>
        <Text size="md" color="secondary">
          Monitoring alert konfigürasyonu. CPU/Memory yüzde (formatter +
          %), response süresi (prefix ms), downtime toleransı (prefix dk).
        </Text>
        <MockBlock caption="Alert thresholds — interactive">
          <ThresholdMock />
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
          message="Hata 1 — Sayı için plain Input + parseInt"
          description={
            <>
              <code>{`<Input onChange={e => setN(parseInt(e.target.value))} />`}</code>{" "}
              → kullanıcı harf girer, NaN olur, formdan submit'lenir.{" "}
              <strong>Çözüm:</strong> InputNumber — harf kabul etmez, min/max
              uygular.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — min/max vermemek"
          description={
            <>
              SLA için <code>min=0</code>, port için <code>min=1 max=65535</code>,
              yüzde için <code>min=0 max=100</code> ver. Aksi halde kullanıcı{" "}
              <code>-5 saat</code> veya <code>9999999 port</code> girer.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Float değerde precision yok"
          description={
            <>
              JS floating point hatası: <code>0.1 + 0.2 = 0.30000000000000004</code>.{" "}
              Para için <code>precision=2</code>, oran için{" "}
              <code>precision=4</code> ver. precision yoksa kullanıcı 12 hane
              ondalıklı sayı görür.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message={`Hata 4 — Yüzde için suffix beklemek (5.7'de yok)`}
          description={
            <>
              <code>{`suffix="%"`}</code> 5.20+'da geldi. 5.7'de{" "}
              <strong>çalışmaz</strong>.{" "}
              <strong>Çözüm:</strong> <code>formatter</code> ile sağa% koy,{" "}
              <code>parser</code> ile temizle. Yukarıdaki Yüzde örneği.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Currency için her sayfada elle binlik ayraç yazmak"
          description={
            <>
              Formatter/parser'ı sayfalar arası kopyalama — bir helper{" "}
              <code>{`<MoneyInput />`}</code> wrap'ı oluştur (InputNumber +
              prefix + formatter + parser preset). DRY.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — stringMode'u her zaman açmak"
          description={
            <>
              <code>stringMode=true</code> sadece <strong>high precision
              decimal</strong> (kripto, bilimsel) için. Normal kullanımda
              kapalı bırak — değer number döner, JS Number ile uyumlu kalır.
            </>
          }
        />
      </section>
    </main>
  );
}
