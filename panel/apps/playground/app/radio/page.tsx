"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Radio } from "@servicecore/ui/wraps";
import styles from "./radio.module.css";

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

function ViewSelectorMock() {
  const [view, setView] = useState("list");
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <span className={styles.toolbarLabel}>Görünüm</span>
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          value={view}
          onChange={(e) => setView(e.target.value)}
          options={[
            { label: "Liste", value: "list" },
            { label: "Kanban", value: "kanban" },
            { label: "Takvim", value: "calendar" },
          ]}
        />
      </div>
      <span className={styles.toolbarPreview}>view: {view}</span>
    </div>
  );
}

const PRIORITY_META: Record<string, { label: string; fg: string; bg: string }> = {
  p1: { label: "P1 — Kritik", fg: "var(--sc-color-state-danger-fg)", bg: "var(--sc-color-state-danger-bg)" },
  p2: { label: "P2 — Yüksek", fg: "var(--sc-color-state-warning-fg)", bg: "var(--sc-color-state-warning-bg)" },
  p3: { label: "P3 — Orta", fg: "var(--sc-color-state-info-fg)", bg: "var(--sc-color-state-info-bg)" },
  p4: { label: "P4 — Düşük", fg: "var(--sc-color-text-tertiary)", bg: "var(--sc-color-bg-muted)" },
};

function PriorityPickerMock() {
  const [priority, setPriority] = useState("p3");
  const meta = PRIORITY_META[priority];
  return (
    <div className={styles.priorityForm}>
      <span className={styles.priorityLabel}>Bilet önceliği</span>
      <Radio.Group
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        options={[
          { label: "P1 — Kritik", value: "p1" },
          { label: "P2 — Yüksek", value: "p2" },
          { label: "P3 — Orta", value: "p3" },
          { label: "P4 — Düşük", value: "p4" },
        ]}
      />
      <div>
        <span className={styles.priorityHint}>Seçili: </span>
        {meta && (
          <span
            className={styles.priorityPreview}
            style={{ background: meta.bg, color: meta.fg, border: `1px solid ${meta.fg}` }}
          >
            {meta.label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function RadioPage() {
  const [single, setSingle] = useState("email");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Radio</Display>
        <Text size="lg" color="secondary">
          <strong>Tek seçim.</strong> 2–6 mutually exclusive seçenek için.
          Çoklu seçim → Checkbox; binary on/off → Switch; 7+ seçenek → Select.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#group">Group</a>
        <a href="#options">Options</a>
        <a href="#button">Button Mode</a>
        <a href="#vertical">Vertical</a>
        <a href="#size">Size</a>
        <a href="#disabled">Disabled</a>
        <a href="#mock">Mocklar</a>
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
              <strong>Radio:</strong> <code>checked</code>,{" "}
              <code>defaultChecked</code>, <code>value</code>,{" "}
              <code>disabled</code>, <code>autoFocus</code>,{" "}
              <code>onChange</code>.
              <br />
              <strong>Radio.Group:</strong> <code>value</code>,{" "}
              <code>defaultValue</code>, <code>options</code>, <code>name</code>,{" "}
              <code>disabled</code>, <code>buttonStyle</code>,{" "}
              <code>optionType</code> (4.4+), <code>size</code>,{" "}
              <code>vertical</code> (boolean), <code>onChange</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>block</code> (5.21+) — full width yapmak için manuel{" "}
              <code>style={`{{ width: "100%" }}`}</code> veya CSS,{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+),{" "}
              <code>variant</code> (yok).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — event imzası"
          description={
            <>
              Radio/Group <code>onChange</code> her ikisinde de event döner:{" "}
              <code>(e: RadioChangeEvent) =&gt; void</code>. Değeri{" "}
              <code>e.target.value</code> okursun.
              <br />
              Form.Item ile kullanırken <strong>valuePropName eklemen{" "}
              GEREKMEZ</strong> — Radio default <code>value</code>'yu okur.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="options vs children — options'ı tercih et"
          description={
            <>
              Modern: <code>options={`[{ label, value }]`}</code>.
              <br />
              Backward compat: <code>{`<Radio.Group><Radio value="..." />...</Radio.Group>`}</code>.
              <br />
              Dinamik liste, perf, daha az JSX için options.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Tek Radio — nadir kullanılır</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek başına Radio ender. Genelde Radio.Group içinde kullanılır.{" "}
          Form'da <code>name</code>'i Form.Item'dan miras alır, manuel ver
          gerekmez.
        </Text>
        <MockBlock caption="Tek Radio">
          <Radio defaultChecked>Bildirim aç</Radio>
        </MockBlock>
      </section>

      {/* ── GROUP ── */}
      <section id="group" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Radio.Group</span>
          <Heading level={2}>Group — tek state, birden fazla radio</Heading>
        </div>
        <Text size="md" color="secondary">
          Tüm radio'ları aynı state'e bağlar. Bir tane seçildiğinde diğeri
          otomatik bırakılır (Checkbox'tan farkı — exclusive).
        </Text>

        <DoDontGrid
          doItems={[
            "2–6 mutually exclusive seçenek (Erkek/Kadın, Müşteri/Tedarikçi)",
            "Form'da kategori, görünüm tipi, izin seviyesi seçimi",
            "Toggle yerine 3+ seçenek var (List/Kanban/Calendar)",
            "Kullanıcı seçimi açıkça görmek istediği yerlerde (Select gibi gizli değil)",
          ]}
          dontItems={[
            "Çoklu seçim (Checkbox)",
            "Binary açık/kapalı (Switch)",
            "7+ seçenek (Select — yer israfı + scan zor)",
            "Tek seçenek (gereksiz)",
          ]}
        />

        <MockBlock caption="Group + children pattern">
          <Radio.Group value={single} onChange={(e) => setSingle(e.target.value)}>
            <Radio value="email">E-posta</Radio>
            <Radio value="sms">SMS</Radio>
            <Radio value="push">Push bildirim</Radio>
            <Radio value="none">Hiçbiri</Radio>
          </Radio.Group>
        </MockBlock>

        <CodeBlock>{`const [v, setV] = useState("email");

<Radio.Group value={v} onChange={e => setV(e.target.value)}>
  <Radio value="email">E-posta</Radio>
  <Radio value="sms">SMS</Radio>
  <Radio value="push">Push</Radio>
</Radio.Group>`}</CodeBlock>
      </section>

      {/* ── OPTIONS ── */}
      <section id="options" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>options</span>
          <Heading level={2}>Options Array — modern API</Heading>
        </div>
        <MockBlock caption="options ile tek satırlık tanım">
          <Radio.Group
            defaultValue="customer"
            options={[
              { label: "Müşteri", value: "customer" },
              { label: "Tedarikçi", value: "vendor" },
              { label: "İç kullanıcı", value: "internal" },
              { label: "Arşiv", value: "archived", disabled: true },
            ]}
          />
        </MockBlock>
        <CodeBlock>{`<Radio.Group
  defaultValue="customer"
  options={[
    { label: "Müşteri",      value: "customer" },
    { label: "Tedarikçi",    value: "vendor" },
    { label: "İç kullanıcı", value: "internal" },
    { label: "Arşiv",        value: "archived", disabled: true },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── BUTTON MODE ── */}
      <section id="button" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>optionType="button"</span>
          <Heading level={2}>Button Mode — segmented control</Heading>
        </div>
        <Text size="md" color="secondary">
          Radio'lar yan yana button gibi durur. View selector, sort order,
          filter kategorisi gibi yer kazandıran durumlarda.
          <code>buttonStyle="solid"</code> seçili olanı doldurur,{" "}
          <code>"outline"</code> sadece border'da accent kalır.
        </Text>

        <MockBlock caption='buttonStyle="outline" (default)'>
          <Radio.Group
            optionType="button"
            defaultValue="list"
            options={[
              { label: "Liste", value: "list" },
              { label: "Kanban", value: "kanban" },
              { label: "Takvim", value: "calendar" },
            ]}
          />
        </MockBlock>

        <MockBlock caption='buttonStyle="solid"'>
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            defaultValue="all"
            options={[
              { label: "Tümü", value: "all" },
              { label: "Açık", value: "open" },
              { label: "Bekleyen", value: "pending" },
              { label: "Kapalı", value: "closed" },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Radio.Group
  optionType="button"
  buttonStyle="solid"
  defaultValue="all"
  options={[
    { label: "Tümü",     value: "all" },
    { label: "Açık",     value: "open" },
    { label: "Bekleyen", value: "pending" },
    { label: "Kapalı",   value: "closed" },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── VERTICAL ── */}
      <section id="vertical" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>vertical</span>
          <Heading level={2}>Vertical — uzun label'lar için alt alta</Heading>
        </div>
        <Text size="md" color="secondary">
          Default yatay. Her option uzun (cümle) ise <code>vertical</code> ver,
          okunaklılık artar.
        </Text>
        <MockBlock caption="vertical={true}">
          <Radio.Group
            vertical
            defaultValue="full"
            options={[
              { label: "Tam erişim — tüm kayıtları görür ve düzenler", value: "full" },
              { label: "Düzenleme — sadece kendi kayıtlarını değiştirir", value: "edit" },
              { label: "Okuma — kayıt değiştiremez, sadece görüntüler", value: "view" },
              { label: "Yok — bu modülü göremez", value: "none" },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — button mode için</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>size</code> sadece <code>optionType="button"</code>'da etkili.
          Default mode'da daire boyutu sabit.
        </Text>
        <MockBlock caption="3 boyut">
          <div className={styles.stack}>
            <Radio.Group
              optionType="button"
              size="small"
              defaultValue="a"
              options={[
                { label: "A", value: "a" },
                { label: "B", value: "b" },
                { label: "C", value: "c" },
              ]}
            />
            <Radio.Group
              optionType="button"
              size="middle"
              defaultValue="a"
              options={[
                { label: "A", value: "a" },
                { label: "B", value: "b" },
                { label: "C", value: "c" },
              ]}
            />
            <Radio.Group
              optionType="button"
              size="large"
              defaultValue="a"
              options={[
                { label: "A", value: "a" },
                { label: "B", value: "b" },
                { label: "C", value: "c" },
              ]}
            />
          </div>
        </MockBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled — neden disable olduğu açık olmalı</Heading>
        </div>
        <Text size="md" color="secondary">
          Item bazlı veya tüm group disabled. Disabled tek başına yetmez —
          yanında neden ("Pro plan gerekir") söyle.
        </Text>
        <MockBlock caption="Item bazlı + grup bazlı">
          <div className={styles.stack}>
            <Radio.Group
              defaultValue="basic"
              options={[
                { label: "Basic plan", value: "basic" },
                { label: "Pro plan (yakında)", value: "pro", disabled: true },
                { label: "Enterprise (satış ile görüş)", value: "ent", disabled: true },
              ]}
            />
            <Radio.Group
              disabled
              defaultValue="b"
              options={[
                { label: "Tümü disabled — readonly state", value: "a" },
                { label: "Seçenek 2", value: "b" },
              ]}
            />
          </div>
        </MockBlock>
      </section>

      {/* ── MOCKS ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <MockBlock caption="View selector — toolbar'da button mode + solid">
          <ViewSelectorMock />
        </MockBlock>

        <MockBlock caption="Bilet önceliği — default mode + canlı preview">
          <PriorityPickerMock />
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
          message="Hata 1 — Çoklu seçim için Radio"
          description={
            <>
              "İlgi alanlarınız" gibi <strong>birden fazla seçilebilir</strong>{" "}
              alanda Radio kullanma — kullanıcı tek seçim yapabilir.{" "}
              <strong>Çözüm:</strong> Checkbox.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Binary on/off için Radio"
          description={
            <>
              "Bildirimleri aç (Açık/Kapalı)" gibi 2 seçenekli binary toggle
              için Switch kullan — anında uygulanan ayar sinyali verir. Radio
              "form alanı" sinyali — submit'e kadar bekler.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — 7+ seçenek için Radio"
          description={
            <>
              "İl seçin" gibi 81 seçenek Radio listesi → yer israfı + scan zor.{" "}
              <strong>Çözüm:</strong> Select (search + virtualization).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Uzun label'lı 4+ seçeneği yatay"
          description={
            <>
              "Tam erişim — tüm kayıtları..." gibi cümle uzun ise yatay
              taşar, scan zor. <strong>Çözüm:</strong>{" "}
              <code>vertical={`{true}`}</code> ver, alt alta dizilir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message={`Hata 5 — block prop'u beklemek (5.21+ → 5.7'de yok)`}
          description={
            <>
              <code>{`block={true}`}</code> 5.21+'da geldi. 5.7'de yok.{" "}
              <strong>Çözüm:</strong> <code>{`style={{ width: "100%" }}`}</code>{" "}
              veya CSS'de width:100% — segmented buttonların container'ı doldurmasını
              istiyorsan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Radio default değeri vermemek"
          description={
            <>
              Form açılışında hiçbiri seçili değilse → kullanıcı zorunlu bir
              kararı her seferinde tekrarlar. <strong>Çözüm:</strong>{" "}
              <code>defaultValue</code> veya Form'da{" "}
              <code>initialValues</code> ile sensible default ver (örn.{" "}
              <code>"P3"</code> öncelik için).
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
