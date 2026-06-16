"use client";

import { useState } from "react";
import { List, Grid, Calendar } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Segmented } from "@servicecoreui/ui/wraps";
import styles from "./segmented.module.css";

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

export default function SegmentedPage() {
  const [view, setView] = useState<string | number>("list");
  const [range, setRange] = useState<string | number>("week");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Segmented</Display>
        <Text size="lg" color="secondary">
          Segmented control — Radio.Group button mode'una benzer ama daha
          rafine ve animated. View switcher, time range, priority filter, status
          filter için ideal. 2-5 mutually exclusive seçenek.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Segmented vs Radio.Group</a>
        <a href="#temel">Temel</a>
        <a href="#options">Options Object</a>
        <a href="#icon">Icon</a>
        <a href="#block">Block</a>
        <a href="#size">Size</a>
        <a href="#disabled">Disabled</a>
        <a href="#mock">Real Scenarios</a>
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
          message="5.7'de mevcut tüm temel API (4.20+'dan)"
          description={
            <>
              <code>options</code> (string[] | number[] | SegmentedOption[]),{" "}
              <code>defaultValue</code>, <code>value</code>,{" "}
              <code>block</code> (full width), <code>disabled</code>,{" "}
              <code>onChange</code>, <code>size</code>{" "}
              (small/middle/large), <code>name</code>.
              <br />
              <strong>Option:</strong> <code>label</code>, <code>value</code>,{" "}
              <code>icon</code>, <code>disabled</code>, <code>className</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>vertical</code> (5.21+) — dikey segmented,{" "}
              <code>shape='round'</code> (5.24+) — yuvarlak köşeli items,{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — (value) => void"
          description={
            <>
              <code>{`(value: string | number) => void`}</code> — Radio.Group
              event tabanlı, Segmented direkt value gönderir.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Segmented vs Radio.Group button mode vs Tabs</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Segmented: kompakt filter/view switcher (2-5 seçenek)",
            "Segmented: dashboard time range (Bugün/Bu hafta/Bu ay)",
            "Radio.Group button: form alanında — submit ile gönderilecekse",
            "Tabs: sayfa içinde içerik kolonu değiştirme (Detay/Yorum/Geçmiş)",
          ]}
          dontItems={[
            "Segmented: 6+ seçenek (kalabalık, Tabs/Select kullan)",
            "Segmented: form submit value için (animasyon UX'i bozar, Radio.Group)",
            "Tabs: kompakt toolbar control için (yer kaplar)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic · string[]</span>
          <Heading level={2}>Temel — string array</Heading>
        </div>
        <MockBlock caption="String options">
          <div className={styles.row}>
            <Segmented options={["Liste", "Kanban", "Takvim"]} defaultValue="Liste" />
          </div>
        </MockBlock>
        <CodeBlock>{`<Segmented options={["Liste", "Kanban", "Takvim"]} defaultValue="Liste" />`}</CodeBlock>
      </section>

      {/* ── OPTIONS OBJECT ── */}
      <section id="options" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>options object</span>
          <Heading level={2}>Options Object — label vs value ayrı</Heading>
        </div>
        <Text size="md" color="secondary">
          Label görünür, value backend'e gider — i18n için ideal.
        </Text>
        <MockBlock caption="Object options">
          <div className={styles.row}>
            <Segmented
              options={[
                { label: "Liste", value: "list" },
                { label: "Kanban", value: "kanban" },
                { label: "Takvim", value: "calendar" },
              ]}
              value={view}
              onChange={setView}
            />
            <span className={styles.preview}>value: {view}</span>
          </div>
        </MockBlock>
        <CodeBlock>{`const [view, setView] = useState("list");

<Segmented
  options={[
    { label: "Liste",  value: "list" },
    { label: "Kanban", value: "kanban" },
    { label: "Takvim", value: "calendar" },
  ]}
  value={view}
  onChange={setView}
/>`}</CodeBlock>
      </section>

      {/* ── ICON ── */}
      <section id="icon" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>icon</span>
          <Heading level={2}>Icon — Carbon icon</Heading>
        </div>
        <Text size="md" color="secondary">
          Her option'a icon ekle. <strong>label + icon</strong> birlikte daha
          okunaklı; icon-only mode'da accessibility için <code>title</code>{" "}
          ekle.
        </Text>
        <MockBlock caption="Label + icon">
          <div className={styles.row}>
            <Segmented
              options={[
                { label: "Liste", value: "list", icon: <List /> },
                { label: "Grid", value: "grid", icon: <Grid /> },
                { label: "Takvim", value: "calendar", icon: <Calendar /> },
              ]}
              defaultValue="list"
            />
          </div>
        </MockBlock>
        <MockBlock caption="Icon-only (kompakt — title ile a11y)">
          <div className={styles.row}>
            <Segmented
              options={[
                { label: "", value: "list", icon: <List /> },
                { label: "", value: "grid", icon: <Grid /> },
                { label: "", value: "calendar", icon: <Calendar /> },
              ]}
              defaultValue="list"
            />
          </div>
        </MockBlock>
        <CodeBlock>{`<Segmented
  options={[
    { label: "Liste",  value: "list",     icon: <List /> },
    { label: "Grid",   value: "grid",     icon: <Grid /> },
    { label: "Takvim", value: "calendar", icon: <Calendar /> },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── BLOCK ── */}
      <section id="block" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>block</span>
          <Heading level={2}>Block — tam genişlik</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>block</code> ile container genişliğini doldurur. Mobile veya
          sidebar full-width nav için ideal.
        </Text>
        <MockBlock caption='block={true}'>
          <Segmented
            block
            options={["Bugün", "Bu hafta", "Bu ay", "Bu yıl"]}
            defaultValue="Bu hafta"
          />
        </MockBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — small / middle / large</Heading>
        </div>
        <MockBlock caption="3 boyut">
          <div className={styles.stack}>
            <Segmented size="small" options={["A", "B", "C"]} defaultValue="A" />
            <Segmented size="middle" options={["A", "B", "C"]} defaultValue="A" />
            <Segmented size="large" options={["A", "B", "C"]} defaultValue="A" />
          </div>
        </MockBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled — item + group</Heading>
        </div>
        <MockBlock caption="Item bazlı + group bazlı">
          <div className={styles.stack}>
            <Segmented
              options={[
                { label: "Basic", value: "basic" },
                { label: "Pro", value: "pro", disabled: true },
                { label: "Enterprise", value: "ent", disabled: true },
              ]}
              defaultValue="basic"
            />
            <Segmented disabled options={["A", "B", "C"]} defaultValue="B" />
          </div>
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <MockBlock caption="View selector + time range — toolbar pattern">
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.toolbarLabel}>Görünüm</span>
              <Segmented
                options={[
                  { label: "Liste", value: "list", icon: <List /> },
                  { label: "Kanban", value: "kanban", icon: <Grid /> },
                  { label: "Takvim", value: "calendar", icon: <Calendar /> },
                ]}
                value={view}
                onChange={setView}
              />
            </div>
            <div className={styles.toolbarLeft}>
              <span className={styles.toolbarLabel}>Aralık</span>
              <Segmented
                options={[
                  { label: "Bugün", value: "today" },
                  { label: "Bu hafta", value: "week" },
                  { label: "Bu ay", value: "month" },
                ]}
                value={range}
                onChange={setRange}
                size="small"
              />
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="Bilet öncelik filter">
          <Segmented
            options={[
              { label: "Tümü", value: "all" },
              { label: "P1", value: "p1" },
              { label: "P2", value: "p2" },
              { label: "P3", value: "p3" },
              { label: "P4", value: "p4" },
            ]}
            defaultValue="all"
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
          message="Hata 1 — 6+ seçenek"
          description={
            <>
              Yatay yer dolar, scan zorlaşır. <strong>Çözüm:</strong> Tabs,
              Select multiple veya Dropdown menu.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Form value için Segmented + submit"
          description={
            <>
              Segmented animated transition ile <strong>anında uygulanır</strong>{" "}
              hissi verir; form submit'e bekletmek UX kötü. <strong>Çözüm:</strong>{" "}
              Form'da Radio.Group, toolbar filter'da Segmented.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Icon-only mode'da title yok"
          description={
            <>
              Icon-only erişilebilirlik için zor. <code>label=""</code> bırak ama{" "}
              <code>className</code> ile <code>title</code> attribute ekleyebilirsin.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — vertical / shape='round' beklemek (5.21+/5.24+, yok)"
          description={
            <>
              5.7'de yok. Vertical layout için Radio.Group{" "}
              <code>vertical</code> kullan; round shape için CSS module
              border-radius override.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Tabs yerine Segmented"
          description={
            <>
              İçerik kolonu değiştirme (Detay/Yorum/Geçmiş) Tabs'in işi. Segmented
              kompakt toolbar control için.
            </>
          }
        />
      </section>
    </main>
  );
}
