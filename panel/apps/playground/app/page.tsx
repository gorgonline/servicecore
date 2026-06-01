import Link from "next/link";
import {
  Catalog,
  ColorPalette,
  SettingsAdjust,
  Idea,
  ArrowRight,
} from "@carbon/icons-react";
import {
  Display,
  Heading,
  Text,
  Eyebrow,
  Code,
  VERSION,
} from "@servicecoreui/ui";
import { componentCount } from "./_components/nav";
import styles from "./home.module.css";

/* ────────────────────────────────────────────────
 * İçerik verisi
 * ──────────────────────────────────────────────── */

const principles = [
  {
    icon: <Catalog />,
    title: "AntD 5.7 üstüne wrap",
    desc: "shadcn değil, AntD bileşenlerine ServiceCore imzası giydirilmiş standart bir katman. Backend ekibi AntD doc'unda ne okuduysa burada aynı çalışır.",
  },
  {
    icon: <ColorPalette />,
    title: "Tek accent — #0070F3",
    desc: "12 renkli palet yok. Tek accent, nötr gri skalası ve durum renkleri. Tutarlı, sakin, kurumsal.",
  },
  {
    icon: <SettingsAdjust />,
    title: "OKLCH token sistemi",
    desc: "Renk, spacing, radius, type — hepsi var(--sc-*) CSS değişkeni. Hardcoded hex/px yok; değişim tek yerden.",
  },
  {
    icon: <Idea />,
    title: "Carbon ikon + açık tema",
    desc: "İkonlar @carbon/icons-react. Tek tema: açık. Layout CSS Modules ile — Tailwind yok.",
  },
];

const quickLinks = [
  { name: "Tokens", href: "/tokens", desc: "Renk, radius, spacing, type" },
  { name: "Typography", href: "/typography", desc: "Heading, Display, Text, Eyebrow" },
  { name: "Button", href: "/buttons", desc: "İlk wrap — type hiyerarşisi" },
  { name: "Table", href: "/table", desc: "ITSM omurgası — sort/filter/pagination" },
  { name: "Shell — Panel Önizleme", href: "/shell", desc: "Gerçek panel iskeleti, uçtan uca" },
];

const installSnippet = `# npm.js (public) — kurulum
npm install @servicecoreui/ui`;

const usageSnippet = `import { Button, Table } from "@servicecoreui/ui/wraps";
import { Heading, Text } from "@servicecoreui/ui";

// app entry'sinde bir kez:
import "@servicecoreui/ui/tokens.css";
import "@servicecoreui/ui/styles.css";`;

const themeSnippet = `import { ConfigProvider } from "antd";
import { servicecoreTheme } from "@servicecoreui/ui/theme";

// Tüm AntD'yi ServiceCore diline çevirir (opsiyonel):
<ConfigProvider theme={servicecoreTheme}>{children}</ConfigProvider>`;

const mcpSnippet = `# AI editöründe (Cursor/Claude/Continue) kütüphane sözlüğü:
npx -y @servicecoreui/mcp

# Tool'lar: list_components · get_component_spec ·
#           find_component · get_design_rules · get_tokens`;

/* ────────────────────────────────────────────────
 * Sayfa
 * ──────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <header className={styles.hero}>
        <Eyebrow tone="accent">@servicecoreui/ui v{VERSION}</Eyebrow>
        <Display size="lg">ServiceCore UI</Display>
        <Text size="lg" color="secondary" className={styles.lead}>
          ServiceCore'un mevcut paneli için bileşen kütüphanesi. AntD 5.7 wrap +
          Carbon ikon + OKLCH token sistemi. Her bileşenin rehber sayfasında{" "}
          <strong>ne zaman kullan</strong>, <strong>ne zaman değil</strong> ve
          ServiceCore'a özel mock'lar var. Sol menüden bir bileşen seç.
        </Text>
        <div className={styles.metaRow}>
          <span className={styles.metaChip}>
            <span className={styles.metaChipStrong}>{componentCount}</span> bileşen
          </span>
          <span className={styles.metaChip}>6 kategori</span>
          <span className={styles.metaChip}>AntD 5.7 wrap</span>
          <span className={styles.metaChip}>React 18 · TypeScript</span>
        </div>
      </header>

      {/* ── Kurulum ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>Kurulum</Heading>
          <Text size="md" color="secondary">
            Paket npm.js'te public. Backend ekibi kendi AntD 5.7 + React 18
            codebase'inde drop-in kurar.
          </Text>
        </div>
        <Code block>{installSnippet}</Code>
        <Code block>{usageSnippet}</Code>
        <Code block>{themeSnippet}</Code>
      </section>

      {/* ── İlkeler ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>İlkeler</Heading>
          <Text size="md" color="secondary">
            Kütüphanenin değişmez kuralları — her bileşen bunlara uyar.
          </Text>
        </div>
        <div className={styles.principleGrid}>
          {principles.map((p) => (
            <div key={p.title} className={styles.principle}>
              <span className={styles.principleIcon}>{p.icon}</span>
              <Heading level={5}>{p.title}</Heading>
              <Text size="sm" color="secondary">
                {p.desc}
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI ile çalışma (MCP) ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>AI ile çalışma — MCP</Heading>
          <Text size="md" color="secondary">
            AI editörü <code>@servicecoreui/mcp</code> sunucusuyla kataloğu okur;
            rastgele AntD veya kendi HTML'ini yazmak yerine bu kütüphaneyi kullanır.
          </Text>
        </div>
        <Code block>{mcpSnippet}</Code>
      </section>

      {/* ── Nereden başlamalı ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>Nereden başlamalı</Heading>
        </div>
        <div className={styles.quickGrid}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.quickLink}>
              <span className={styles.quickLinkBody}>
                <span className={styles.quickLinkName}>{link.name}</span>
                <span className={styles.quickLinkDesc}>{link.desc}</span>
              </span>
              <ArrowRight size={16} className={styles.quickLinkArrow} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
