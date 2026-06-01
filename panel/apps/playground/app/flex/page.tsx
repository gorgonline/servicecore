"use client";

import Link from "next/link";
import {
  Add,
  CheckmarkOutline,
  TrashCan,
  Edit,
  Filter,
  ArrowUp,
  ArrowDown,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Card, Flex, Tag } from "@servicecoreui/ui/wraps";
import styles from "./flex.module.css";

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

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

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <Code block>{children}</Code>;
}

function AntiPattern({ title, children }: { title: string; children: React.ReactNode }) {
  return <Alert type="error" showIcon message={title} description={children} />;
}

function Box({ label, outline }: { label: string; outline?: boolean }) {
  return (
    <div className={outline ? `${styles.demoBox} ${styles.demoBoxOutline}` : styles.demoBox}>
      {label}
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function FlexPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Flex</Display>
        <Text size="lg" color="secondary">
          Block-level flex layout helper. AntD 5.10+&apos;ın Flex&apos;i ile{" "}
          <strong>API uyumlu</strong> — bizim 5.7 baseline'ında çalışsın diye
          custom yazıldı. Inline style, wrapper'sız, performant.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Yatay/Dikey</a>
        <a href="#align">Align</a>
        <a href="#justify">Justify</a>
        <a href="#gap">Gap</a>
        <a href="#wrap">Wrap</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>vertical</span>
          <Heading level={2}>Yatay (Default) ve Dikey</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>flex-direction: row</code>. <code>vertical</code> prop column'a çevirir.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>horizontal</span>
            <Flex gap="middle" className={styles.demoFrame}>
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>vertical</span>
            <Flex vertical gap="small" className={styles.demoFrame}>
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Flex>
          </div>
        </div>
      </section>

      {/* ── ALIGN ── */}
      <section id="align" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>align</span>
          <Heading level={2}>Align (Cross axis)</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>align-items</code>. flex-start / center / flex-end / baseline / stretch.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>flex-start</span>
            <Flex gap="middle" align="flex-start" className={`${styles.demoFrame} ${styles.demoFrameTall}`}>
              <Box label="A" />
              <Box label="B" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>center</span>
            <Flex gap="middle" align="center" className={`${styles.demoFrame} ${styles.demoFrameTall}`}>
              <Box label="A" />
              <Box label="B" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>flex-end</span>
            <Flex gap="middle" align="flex-end" className={`${styles.demoFrame} ${styles.demoFrameTall}`}>
              <Box label="A" />
              <Box label="B" />
            </Flex>
          </div>
        </div>
      </section>

      {/* ── JUSTIFY ── */}
      <section id="justify" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>justify</span>
          <Heading level={2}>Justify (Main axis)</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>justify-content</code>. flex-start / center / flex-end /
          space-between / space-around / space-evenly.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>space-between</span>
            <Flex justify="space-between" className={styles.demoFrame}>
              <Box label="Sol" />
              <Box label="Orta" />
              <Box label="Sağ" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>center</span>
            <Flex justify="center" gap="middle" className={styles.demoFrame}>
              <Box label="A" />
              <Box label="B" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>flex-end</span>
            <Flex justify="flex-end" gap="small" className={styles.demoFrame}>
              <Box label="A" />
              <Box label="B" />
            </Flex>
          </div>
        </div>
      </section>

      {/* ── GAP ── */}
      <section id="gap" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gap</span>
          <Heading level={2}>Gap (Spacing)</Heading>
        </div>
        <Text size="md" color="secondary">
          Preset'ler ServiceCore space token'larına bağlı:{" "}
          <strong>small=8px</strong>, <strong>middle=16px</strong>,{" "}
          <strong>large=24px</strong>. Veya direkt <code>number</code> /{" "}
          <code>string</code> (px, rem, vs.) ver.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>small (8px)</span>
            <Flex gap="small" className={styles.demoFrame}>
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>middle (16px)</span>
            <Flex gap="middle" className={styles.demoFrame}>
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>large (24px)</span>
            <Flex gap="large" className={styles.demoFrame}>
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Flex>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>custom (40)</span>
            <Flex gap={40} className={styles.demoFrame}>
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Flex>
          </div>
        </div>
      </section>

      {/* ── WRAP ── */}
      <section id="wrap" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>wrap</span>
          <Heading level={2}>Wrap</Heading>
        </div>
        <Text size="md" color="secondary">
          Alt satıra geçme. <code>true</code> = wrap, <code>false</code> = nowrap. Default: nowrap.
        </Text>
        <div className={styles.showcase}>
          <Flex wrap gap="small" className={styles.demoFrame}>
            <Box label="1" />
            <Box label="2" />
            <Box label="3" />
            <Box label="4" />
            <Box label="5" />
            <Box label="6" />
            <Box label="7" />
            <Box label="8" />
            <Box label="9" />
            <Box label="10" />
          </Flex>
        </div>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Form footer — sol Sil, sağ Vazgeç + Onayla (justify space-between)">
          <Card>
            <Flex justify="space-between" align="center">
              <Button type="text" danger leadingIcon={<TrashCan />}>
                Sil
              </Button>
              <Flex gap="small">
                <Button type="default">Vazgeç</Button>
                <Button type="primary" leadingIcon={<CheckmarkOutline />}>
                  Onayla
                </Button>
              </Flex>
            </Flex>
          </Card>
        </MockBlock>

        <MockBlock caption="Toolbar — sol filtre, sağ aksiyonlar">
          <Card>
            <Flex justify="space-between" align="center">
              <Flex gap="small" align="center">
                <Button type="default" size="small" leadingIcon={<Filter />}>
                  Filtre
                </Button>
                <Tag tone="accent" size="small">Durum: Açık</Tag>
                <Tag tone="accent" size="small">Öncelik: Yüksek</Tag>
              </Flex>
              <Flex gap="small">
                <Button type="default" size="small" leadingIcon={<Edit />}>
                  Düzenle
                </Button>
                <Button type="primary" size="small" leadingIcon={<Add />}>
                  Yeni
                </Button>
              </Flex>
            </Flex>
          </Card>
        </MockBlock>

        <MockBlock caption="KPI strip — wrap ile responsive (4 kart yan yana, dar ekranda alt satır)">
          <Flex gap="middle" wrap>
            <div className={styles.kpiCard} style={{ flex: "1 1 200px" }}>
              <Text size="xs" color="tertiary">Açık Çağrı</Text>
              <Flex align="baseline" gap="small">
                <Heading level={2}>12</Heading>
                <Text size="sm" color="success">
                  <ArrowUp size={12} /> +3
                </Text>
              </Flex>
            </div>
            <div className={styles.kpiCard} style={{ flex: "1 1 200px" }}>
              <Text size="xs" color="tertiary">SLA Aşıldı</Text>
              <Flex align="baseline" gap="small">
                <Heading level={2}>3</Heading>
                <Text size="sm" color="success">
                  <ArrowDown size={12} /> -1
                </Text>
              </Flex>
            </div>
            <div className={styles.kpiCard} style={{ flex: "1 1 200px" }}>
              <Text size="xs" color="tertiary">Bekleyen</Text>
              <Heading level={2}>148</Heading>
            </div>
            <div className={styles.kpiCard} style={{ flex: "1 1 200px" }}>
              <Text size="xs" color="tertiary">Kapanan</Text>
              <Flex align="baseline" gap="small">
                <Heading level={2}>47</Heading>
                <Text size="sm" color="success">
                  <ArrowUp size={12} /> %12
                </Text>
              </Flex>
            </div>
          </Flex>
        </MockBlock>

        <MockBlock caption="Header utility — Flex vertical=false, justify=space-between">
          <Card>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap="small">
                <Heading level={4}>Açık çağrılar</Heading>
                <Tag tone="info" size="small" dot>12 aktif</Tag>
              </Flex>
              <Flex gap="small">
                <Text size="xs" color="tertiary">5 dk önce</Text>
                <Button type="text" size="small">Yenile</Button>
              </Flex>
            </Flex>
          </Card>
        </MockBlock>

        <CodeBlock>{`<Flex justify="space-between" align="center">
  <Button type="text" danger>Sil</Button>
  <Flex gap="small">
    <Button type="default">Vazgeç</Button>
    <Button type="primary">Onayla</Button>
  </Flex>
</Flex>

<Flex gap="middle" wrap>
  {kpis.map((k) => <KpiCard {...k} style={{ flex: "1 1 200px" }} />)}
</Flex>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Form içinde Flex">
          Form alanları için Flex kullanma — alanlar arası dikey gap zaten
          Form layout'ında. Sadece form footer'da (button satırı) kullan.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Inline style ile manuel flex">
          <code>{`<div style={{ display: "flex", gap: 12 }}>`}</code> yazma.{" "}
          <code>{`<Flex gap="small">`}</code> kullan — token uyumlu, okunaklı.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Üst üste 5+ nested Flex">
          Çok seviyeli iç içe Flex kafa karıştırır. 2-3 seviye yeterli.
          Daha karmaşık layout için Grid (CSS) veya Row/Col düşün.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Tek child için Flex">
          Tek bir child için Flex kullanma — sadece <code>div</code> yetiyor.
          Flex iki+ child'ı düzenlemek için.
        </AntiPattern>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
