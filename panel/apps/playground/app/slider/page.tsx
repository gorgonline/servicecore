"use client";

import { useEffect, useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, InputNumber, Slider } from "@servicecoreui/ui/wraps";
import styles from "./slider.module.css";

/* ────────────────────────────────────────────────
 * ClientOnly — SSR'da render etme, sadece mount sonrası
 * (AntD Tooltip open=true portal'da SSR/CSR mismatch'i yapar)
 * ──────────────────────────────────────────────── */

function ClientOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : <>{fallback ?? null}</>;
}

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
 * Real mock — threshold form (Slider + InputNumber sync)
 * ──────────────────────────────────────────────── */

function ThresholdFormMock() {
  const [cpu, setCpu] = useState(75);
  const [mem, setMem] = useState(80);
  const [retention, setRetention] = useState(30);

  return (
    <div className={styles.thresholdForm}>
      <div className={styles.fieldWrap}>
        <span className={styles.thresholdLabel}>CPU kullanım uyarı eşiği</span>
        <div className={styles.thresholdField}>
          <Slider
            min={0}
            max={100}
            value={cpu}
            onChange={(v) => setCpu(v as number)}
            tooltip={{ formatter: (v) => `${v}%` }}
            marks={{ 0: "0", 50: "50", 80: "80", 100: "100" }}
          />
          <InputNumber
            min={0}
            max={100}
            value={cpu}
            onChange={(v) => setCpu(Number(v) || 0)}
            formatter={(v) => (v == null ? "" : `${v}%`)}
            parser={(v) => Number((v ?? "").replace("%", ""))}
            style={{ width: "100%" }}
          />
        </div>
        <span className={styles.thresholdHint}>
          Bu yüzdenin üstüne çıktığında uyarı tetiklenir.
        </span>
      </div>

      <div className={styles.fieldWrap}>
        <span className={styles.thresholdLabel}>Bellek kullanım eşiği</span>
        <div className={styles.thresholdField}>
          <Slider
            min={0}
            max={100}
            value={mem}
            onChange={(v) => setMem(v as number)}
            tooltip={{ formatter: (v) => `${v}%` }}
          />
          <InputNumber
            min={0}
            max={100}
            value={mem}
            onChange={(v) => setMem(Number(v) || 0)}
            formatter={(v) => (v == null ? "" : `${v}%`)}
            parser={(v) => Number((v ?? "").replace("%", ""))}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className={styles.fieldWrap}>
        <span className={styles.thresholdLabel}>Log retention süresi</span>
        <div className={styles.thresholdField}>
          <Slider
            min={1}
            max={365}
            value={retention}
            onChange={(v) => setRetention(v as number)}
            tooltip={{ formatter: (v) => `${v} gün` }}
            marks={{ 1: "1g", 30: "30g", 90: "90g", 180: "180g", 365: "1yıl" }}
          />
          <InputNumber
            min={1}
            max={365}
            value={retention}
            onChange={(v) => setRetention(Number(v) || 1)}
            prefix="gün"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function SliderPage() {
  const [single, setSingle] = useState(50);
  const [range, setRange] = useState<[number, number]>([20, 80]);
  const [nps, setNps] = useState(8);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Slider</Display>
        <Text size="lg" color="secondary">
          Sürekli değer veya aralık seçimi. Threshold, yüzde, opacity, NPS,
          fiyat aralığı, retention. Tam değer hassasiyeti gerekiyorsa{" "}
          <strong>InputNumber + Slider</strong> kombinasyonu — biri görsel,
          diğeri kesin.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#range">Range</a>
        <a href="#marks">Marks/Dots</a>
        <a href="#tooltip">Tooltip</a>
        <a href="#step">Step</a>
        <a href="#vertical">Vertical</a>
        <a href="#disabled">Disabled</a>
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
              <code>max</code>, <code>step</code>, <code>range</code> (boolean),{" "}
              <code>vertical</code>, <code>disabled</code>, <code>marks</code>,{" "}
              <code>dots</code>, <code>included</code>, <code>reverse</code>,{" "}
              <code>keyboard</code> (5.2+),{" "}
              <code>tooltip</code> config (open/placement/formatter/
              getPopupContainer — 4.23+),{" "}
              <code>onChange</code>, <code>onChangeComplete</code> (4.23+) /{" "}
              <code>onAfterChange</code> (deprecated ama çalışır).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>{`range={{ draggableTrack, editable, minCount, maxCount }}`}</code>{" "}
              object form (5.20+) — boolean form yeterli,{" "}
              <code>tooltip.autoAdjustOverflow</code> (5.8+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange her piksel — state'i onChangeComplete'te tut"
          description={
            <>
              <code>onChange</code> kullanıcı sürüklerken her piksel için fire
              eder. Backend'e POST etmek/store yazmak için{" "}
              <strong><code>onChangeComplete</code></strong> kullan (4.23+,
              5.7'de var). UI preview için onChange OK.
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
          <div className={styles.stack}>
            <div className={styles.row}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <Slider value={single} onChange={(v) => setSingle(v as number)} />
              </div>
              <span className={styles.preview}>value: {single}</span>
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`const [v, setV] = useState(50);

<Slider value={v} onChange={setV} />`}</CodeBlock>
      </section>

      {/* ── RANGE ── */}
      <section id="range" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>range</span>
          <Heading level={2}>Range — iki uçlu aralık</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>range={`{true}`}</code> ver, value tuple olur (<code>[min, max]</code>).
          Fiyat aralığı, retention, "şu yıldan şu yıla", "şu yüzdeden şu
          yüzdeye" senaryoları için.
        </Text>
        <MockBlock caption="Range slider — fiyat aralığı">
          <div className={styles.stack}>
            <div className={styles.row}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <Slider
                  range
                  min={0}
                  max={10000}
                  step={100}
                  value={range}
                  onChange={(v) => setRange(v as [number, number])}
                  tooltip={{ formatter: (v) => `₺${v}` }}
                />
              </div>
              <span className={styles.preview}>
                ₺{range[0]} — ₺{range[1]}
              </span>
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`const [range, setRange] = useState<[number, number]>([20, 80]);

<Slider
  range
  min={0}
  max={10000}
  step={100}
  value={range}
  onChange={setRange}
  tooltip={{ formatter: v => \`₺\${v}\` }}
/>`}</CodeBlock>
      </section>

      {/* ── MARKS ── */}
      <section id="marks" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>marks / dots</span>
          <Heading level={2}>Marks &amp; Dots — etiketli noktalar</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>marks</code> belirli değerlere etiket koyar (record:{" "}
          <code>{`{0: "Düşük", 50: "Orta", 100: "Yüksek"}`}</code>).{" "}
          <code>dots={`{true}`}</code> ile sadece step'lerde nokta gösterirsin
          (snap-to-step görseli).
        </Text>

        <MockBlock caption="Marks ile etiketler">
          <Slider
            min={0}
            max={100}
            defaultValue={50}
            marks={{
              0: "Düşük",
              25: "25%",
              50: "Orta",
              75: "75%",
              100: "Yüksek",
            }}
          />
        </MockBlock>

        <MockBlock caption="Dots — sadece step'lerde nokta">
          <Slider min={0} max={10} step={1} defaultValue={5} dots marks={{ 0: "0", 5: "5", 10: "10" }} />
        </MockBlock>

        <CodeBlock>{`<Slider
  min={0} max={100} defaultValue={50}
  marks={{
    0:   "Düşük",
    25:  "25%",
    50:  "Orta",
    75:  "75%",
    100: "Yüksek",
  }}
/>

// Snap-to-step nokta görseli
<Slider min={0} max={10} step={1} dots />`}</CodeBlock>
      </section>

      {/* ── TOOLTIP ── */}
      <section id="tooltip" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>tooltip</span>
          <Heading level={2}>Tooltip — formatter ve görünürlük</Heading>
        </div>
        <Text size="md" color="secondary">
          Handle'a hover'da çıkan tooltip. <code>formatter</code> ile değeri
          biçimlendir (yüzde, para, "gün" vs.). <code>open={`{true}`}</code>{" "}
          her zaman göstermek, <code>formatter={`{null}`}</code> tamamen
          gizlemek için.
        </Text>

        <MockBlock caption='formatter — yüzde işareti'>
          <Slider min={0} max={100} defaultValue={75} tooltip={{ formatter: (v) => `${v}%` }} />
        </MockBlock>

        <MockBlock caption='Her zaman açık (open=true)'>
          <ClientOnly
            fallback={<Slider min={0} max={100} defaultValue={40} tooltip={{ formatter: (v) => `${v}%` }} />}
          >
            <Slider min={0} max={100} defaultValue={40} tooltip={{ open: true, formatter: (v) => `${v}%` }} />
          </ClientOnly>
        </MockBlock>

        <MockBlock caption='Tooltip gizle (formatter={null})'>
          <Slider min={0} max={100} defaultValue={50} tooltip={{ formatter: null }} />
        </MockBlock>

        <CodeBlock>{`<Slider tooltip={{ formatter: v => \`\${v}%\` }} />
<Slider tooltip={{ open: true, formatter: v => \`\${v} gün\` }} />
<Slider tooltip={{ formatter: null }} />              // Tooltip kapalı
<Slider tooltip={{ placement: "bottom" }} />          // Alt'tan çıksın`}</CodeBlock>
      </section>

      {/* ── STEP ── */}
      <section id="step" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>step</span>
          <Heading level={2}>Step — adım hassasiyeti</Heading>
        </div>
        <Text size="md" color="secondary">
          Default 1. NPS için 1, yüzde için 5, tarih için 7 (haftalık). Çok
          küçük step (0.001) kullanıcıya zor — hassasiyet için yanına
          InputNumber koy.
        </Text>
        <MockBlock caption="NPS 0–10, step=1 + marks">
          <div className={styles.row}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <Slider
                min={0}
                max={10}
                step={1}
                value={nps}
                onChange={(v) => setNps(v as number)}
                marks={{ 0: "0", 5: "5", 10: "10" }}
              />
            </div>
            <span className={styles.preview}>NPS: {nps}</span>
          </div>
        </MockBlock>
      </section>

      {/* ── VERTICAL ── */}
      <section id="vertical" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>vertical</span>
          <Heading level={2}>Vertical — dikey slider</Heading>
        </div>
        <Text size="md" color="secondary">
          Mixer/volume control gibi yer kazandıran durumlarda. Default yatay.
        </Text>
        <MockBlock caption="3 vertical slider">
          <div className={styles.verticalDemo}>
            <Slider vertical min={0} max={100} defaultValue={30} />
            <Slider vertical min={0} max={100} defaultValue={60} marks={{ 0: "0", 50: "50", 100: "100" }} />
            <Slider vertical range min={0} max={100} defaultValue={[20, 80]} />
          </div>
        </MockBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled — değiştirilemez gösterim</Heading>
        </div>
        <MockBlock caption="Disabled value">
          <Slider disabled defaultValue={65} marks={{ 0: "0", 50: "50", 100: "100" }} />
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Threshold Form — Slider + InputNumber sync</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore'un en sık gördüğü pattern. Slider <strong>görsel
          hissi</strong>, InputNumber <strong>kesin değer</strong>. İkisi
          aynı state'e bağlı — kullanıcı hangisini değiştirirse diğeri senkron.
        </Text>
        <MockBlock caption="Monitoring threshold konfigürasyonu — slider ↔ inputnumber">
          <ThresholdFormMock />
        </MockBlock>
        <CodeBlock>{`const [cpu, setCpu] = useState(75);

<Slider
  min={0} max={100}
  value={cpu}
  onChange={setCpu}                  // anlık preview
  tooltip={{ formatter: v => \`\${v}%\` }}
/>
<InputNumber
  min={0} max={100}
  value={cpu}
  onChange={v => setCpu(Number(v) || 0)}
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
          message="Hata 1 — Range için iki ayrı Slider"
          description={
            <>
              <code>{`<Slider />` + ` <Slider />`}</code> yan yana yerine{" "}
              <code>range={`{true}`}</code> kullan. Min{">"}max validation'ı
              AntD halleder, tek state, tek tooltip.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Çok büyük aralık, mark/tooltip yok"
          description={
            <>
              <code>min=0 max=1000000</code> ve mark yoksa kullanıcı değeri
              bilemez. <strong>Çözüm:</strong> <code>marks</code> ile anchor
              değerler + <code>tooltip.formatter</code> ile birim. Çok büyük
              aralık genelde slider için uygun değil — InputNumber tek başına
              daha iyi.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — onChange'de backend isteği"
          description={
            <>
              Drag esnasında <code>onChange</code> 50+ kez fire eder. Backend'e
              5 saniyede 50 POST atarsın → rate limit, lag.{" "}
              <strong>Çözüm:</strong> Anlık preview için <code>onChange</code>,
              kalıcı kayıt için <code>onChangeComplete</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Slider tek başına hassas form alanı"
          description={
            <>
              Kullanıcının <strong>tam</strong> bir değer girmesi gereken
              senaryoda (ör. 27.5%) sadece Slider zor.{" "}
              <strong>Çözüm:</strong> InputNumber + Slider birlikte — biri
              görsel, diğeri kesin. State paylaşılır.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — step çok küçük (kullanıcı hassasiyetinin altında)"
          description={
            <>
              <code>{`step={0.001}`}</code> kullanıcı 1 piksel hareketle 0.01
              değiştirir → kontrol zor. <strong>Çözüm:</strong> Slider'da
              kullanıcı dostu step (1, 5, 10), kesin değer için yanında
              InputNumber.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — range object form'u beklemek (5.20+, 5.7'de yok)"
          description={
            <>
              <code>{`range={{ draggableTrack: true }}`}</code> 5.20+'da geldi.
              5.7'de runtime'da çalışmaz. <strong>Çözüm:</strong>{" "}
              <code>{`range={true}`}</code> boolean form yeterli.
            </>
          }
        />
      </section>
    </main>
  );
}
