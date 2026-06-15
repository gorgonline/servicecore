"use client";

import Link from "next/link";
import {
  Home,
  Asset,
  Settings,
  Book,
  Catalog,
  ChevronDown,
  Phone,
  WarningAlt,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Breadcrumb, Button, Card } from "@servicecoreui/ui";
import styles from "./breadcrumbs.module.css";

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

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function BreadcrumbsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Breadcrumb</Display>
        <Text size="lg" color="secondary">
          Sayfa içinde konum göstergesi. 3+ seviye hiyerarşi olan sayfalarda
          kullanıcıya nerede olduğunu söyle, üst seviyelere dönmesini sağla.
          Default separator: Carbon <code>ChevronRight</code>.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Basic</a>
        <a href="#icons">İkonlu</a>
        <a href="#separator">Custom Separator</a>
        <a href="#per-item">Per-item Separator</a>
        <a href="#menu">Dropdown Menu</a>
        <a href="#item-render">itemRender (Next/Router)</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#api-notu">API Notu</a>
        <a href="#do-dont">Ne zaman</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>items</span>
          <Heading level={2}>Basic — items prop</Heading>
        </div>
        <Text size="md" color="secondary">
          AntD 5.3+ <code>items</code> prop'u tercih edilen yöntem (
          <code>routes</code> deprecated, <code>Breadcrumb.Item</code> children API'sı da).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basit</span>
            <Breadcrumb
              items={[
                { title: "Ana sayfa" },
                { title: "Panolar" },
                { title: "IKD PANO" },
              ]}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>href ile</span>
            <Breadcrumb
              items={[
                { title: "Ana sayfa", href: "/" },
                { title: "Çağrılar", href: "/cagrilar" },
                { title: "SC-4127" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── ICONS ── */}
      <section id="icons" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>title + icon</span>
          <Heading level={2}>İkonlu (Carbon)</Heading>
        </div>
        <Text size="md" color="secondary">
          İlk item'a <code>Home</code> ikonu yaygın pattern. <code>title</code>{" "}
          ReactNode kabul eder — icon + text birlikte.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>Home ikonu</span>
            <Breadcrumb
              items={[
                {
                  title: (
                    <>
                      <Home /> Ana sayfa
                    </>
                  ),
                  href: "/",
                },
                { title: "Varlıklar", href: "/varliklar" },
                { title: "ASSET-9032" },
              ]}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>her item ikonlu</span>
            <Breadcrumb
              items={[
                { title: <><Home /> Ana sayfa</>, href: "/" },
                { title: <><Asset /> Varlıklar</>, href: "/varliklar" },
                { title: "Donanım" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── SEPARATOR ── */}
      <section id="separator" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>separator</span>
          <Heading level={2}>Custom Separator</Heading>
        </div>
        <Text size="md" color="secondary">
          Default: Carbon <code>ChevronRight</code>. <code>separator</code> prop'u ile değiştir.
          AntD default'u <code>/</code> idi, biz daha modern bir ok seçtik.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>default (›)</span>
            <Breadcrumb
              items={[
                { title: "Bilgi Tabanı" },
                { title: "Donanım" },
                { title: "Print" },
              ]}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>slash (/)</span>
            <Breadcrumb
              separator="/"
              items={[
                { title: "Bilgi Tabanı" },
                { title: "Donanım" },
                { title: "Print" },
              ]}
            />
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>bullet (·)</span>
            <Breadcrumb
              separator="·"
              items={[
                { title: "Bilgi Tabanı" },
                { title: "Donanım" },
                { title: "Print" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── PER-ITEM SEPARATOR (5.3+) ── */}
      <section id="per-item" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>type: separator</span>
          <Heading level={2}>Per-item Separator (5.3+)</Heading>
        </div>
        <Text size="md" color="secondary">
          Her item arasına farklı bir separator koymak için <code>SeparatorType</code> kullan —{" "}
          <code>{`{ type: "separator", separator: "X" }`}</code>.
        </Text>
        <div className={styles.showcase}>
          <Breadcrumb
            items={[
              { title: "Ana sayfa" },
              { type: "separator", separator: ">" },
              { title: "Varlıklar" },
              { type: "separator", separator: "→" },
              { title: "ASSET-9032" },
            ]}
          />
        </div>
      </section>

      {/* ── DROPDOWN MENU ── */}
      <section id="menu" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>menu (4.24+)</span>
          <Heading level={2}>Dropdown Menu</Heading>
        </div>
        <Text size="md" color="secondary">
          Item'a dropdown ekle — kullanıcı kardeş sayfalara hızlı atlasın.
          ServiceCore'da pano seçicide kullanılır (Panolar &gt; IKD PANO ▾).
        </Text>
        <div className={styles.showcase}>
          <Breadcrumb
            items={[
              { title: "Ana sayfa", href: "/" },
              {
                title: "Panolar",
                href: "/panolar",
              },
              {
                title: "IKD PANO",
                menu: {
                  items: [
                    { key: "ikd", label: "IKD PANO" },
                    { key: "esk", label: "ESK PANO" },
                    { key: "ops", label: "Operatör Genel" },
                    { key: "exec", label: "Yönetim Özeti" },
                  ],
                },
              },
            ]}
          />
        </div>
        <Text size="sm" color="secondary">
          NOT: Last item'a tıklayınca dropdown açılır — pano değiştirme gibi
          kardeş öğeler için. Ana item olarak kullanma.
        </Text>
      </section>

      {/* ── itemRender ── */}
      <section id="item-render" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>itemRender</span>
          <Heading level={2}>itemRender — Next/Link Entegrasyonu</Heading>
        </div>
        <Text size="md" color="secondary">
          Default'ta items <code>&lt;a href&gt;</code> render eder → tarayıcı full page
          reload yapar. SPA navigation için (Next.js, React Router){" "}
          <code>itemRender</code> ile custom Link component'i ver.
        </Text>
        <CodeBlock>{`import Link from "next/link";

<Breadcrumb
  items={[
    { title: "Ana sayfa", path: "/" },
    { title: "Çağrılar", path: "/cagrilar" },
    { title: "SC-4127" },
  ]}
  itemRender={(item, _params, items, paths) => {
    const last = items[items.length - 1]?.path === item.path;
    return last || !item.path ? (
      <span>{item.title}</span>
    ) : (
      <Link href={\`/\${paths.join("/")}\`}>{item.title}</Link>
    );
  }}
/>`}</CodeBlock>
        <Alert
          type="info"
          showIcon
          message="path vs href"
          description={
            <>
              <code>path</code> kullanılırsa <code>itemRender</code>'a{" "}
              <code>paths[]</code> birleşik geçer (her segment önceki ile bağlı).{" "}
              <code>href</code> direct URL — <code>path</code> ile birlikte
              çalışmaz. SPA için <code>path</code> tercih et.
            </>
          }
        />
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Header PageHeader — 3 seviye breadcrumb + sayfa başlığı">
          <div className={styles.pageHeader}>
            <Breadcrumb
              items={[
                { title: <><Home /> Ana sayfa</>, href: "/" },
                { title: "Panolar", href: "/panolar" },
                { title: "IKD PANO" },
              ]}
            />
            <Heading level={3}>IKD PANO</Heading>
          </div>
        </MockBlock>

        <MockBlock caption="Ticket detay — 4 seviye + son item dropdown ile pano arasında geç">
          <div className={styles.pageHeader}>
            <Breadcrumb
              items={[
                { title: <><Home /> Ana sayfa</>, href: "/" },
                { title: "Çağrılar", href: "/cagrilar" },
                { title: "Açık", href: "/cagrilar/acik" },
                {
                  title: "SC-4127",
                  menu: {
                    items: [
                      { key: "p", label: "← Önceki: SC-4126" },
                      { key: "n", label: "→ Sonraki: SC-4128" },
                      { key: "l", label: "Liste'ye dön" },
                    ],
                  },
                },
              ]}
            />
            <Heading level={3}>Print server bağlanamıyor</Heading>
            <Text size="sm" color="secondary">
              Donanım · Yüksek öncelik · 2 saat önce açıldı
            </Text>
          </div>
        </MockBlock>

        <MockBlock caption="Settings — 3 seviye derin tree">
          <div className={styles.pageHeader}>
            <Breadcrumb
              items={[
                { title: <><Settings /> Ayarlar</>, href: "/ayarlar" },
                { title: "Kullanıcı Yönetimi", href: "/ayarlar/kullanicilar" },
                { title: "Roller & Yetkiler" },
              ]}
            />
            <Heading level={3}>Roller & Yetkiler</Heading>
          </div>
        </MockBlock>

        <MockBlock caption="Asset hiyerarşisi — 4 seviye">
          <div className={styles.pageHeader}>
            <Breadcrumb
              items={[
                { title: <><Asset /> Varlıklar</>, href: "/varliklar" },
                { title: "Donanım", href: "/varliklar/donanim" },
                { title: "Yazıcılar", href: "/varliklar/donanim/yazicilar" },
                { title: "ASSET-9032" },
              ]}
            />
            <Heading level={3}>HP LaserJet Pro M404 (ASSET-9032)</Heading>
          </div>
        </MockBlock>

        <MockBlock caption="KB makale — bilgi tabanı kategorisi">
          <div className={styles.pageHeader}>
            <Breadcrumb
              items={[
                { title: <><Book /> Bilgi Tabanı</>, href: "/kb" },
                { title: "Donanım", href: "/kb/donanim" },
                { title: "Print", href: "/kb/donanim/print" },
                { title: "Print Server Bağlantı Hatalarını Çözme" },
              ]}
            />
            <Heading level={3}>Print Server Bağlantı Hatalarını Çözme</Heading>
            <Text size="sm" color="secondary">
              5 dk okuma · 12 görüntülenme · 3 oy
            </Text>
          </div>
        </MockBlock>

        <CodeBlock>{`<Breadcrumb
  items={[
    { title: <><Home /> Ana sayfa</>, href: "/" },
    { title: "Çağrılar", href: "/cagrilar" },
    {
      title: "SC-4127",
      menu: {
        items: [
          { key: "p", label: "← Önceki" },
          { key: "n", label: "→ Sonraki" },
        ],
      },
    },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── API NOTU ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>not</span>
          <Heading level={2}>API Notu — Deprecated</Heading>
        </div>

        <Alert
          type="warning"
          showIcon
          message="routes prop'u — 5.3+ deprecated"
          description={
            <>
              Eski <code>routes</code> prop'u (<code>breadcrumbName</code> field
              kullanan) artık deprecated. <code>items</code> kullan.
              <br />
              Aynı şekilde <code>&lt;Breadcrumb.Item&gt;</code> children API'sı da
              deprecated.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="dropdownIcon — 6.2+ özelliği"
          description={
            <>
              <code>dropdownIcon</code> custom prop'u AntD 6.2+ ile geldi, biz
              5.7 baseline'dayız — yok. Caret default AntD <code>DownOutlined</code>{" "}
              kullanıyor. Backend AntD upgrade ederse Carbon{" "}
              <code>ChevronDown</code> ile değiştirilebilir.
            </>
          }
        />
      </section>

      {/* ── DO/DONT ── */}
      <section id="do-dont" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>kural</span>
          <Heading level={2}>Ne Zaman Kullan</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Sistem 3+ hiyerarşi seviyesine sahipse",
            "Kullanıcının nerede olduğunu açıkça göstermek için",
            "Üst seviyelere hızlı dönüş (klik ile parent'a)",
            "Detay sayfaları, settings tree, asset hierarchy",
          ]}
          dontItems={[
            "Sayfa tek seviyede (Ana sayfa) — gereksiz",
            "Modal/Drawer içinde — yer kısıtlı",
            "Aşırı uzun item title'lar (kes veya kısalt)",
            "Tek bir seviye fark için (örn. Ana sayfa › Bu sayfa)",
          ]}
        />
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — 7+ seviye derinlik">
          Çok derin breadcrumb okunamaz. 4-5 seviyeyi geçerse hiyerarşi mimarisi
          yanlış olabilir. Orta seviyeleri{" "}
          <code>... &gt; (4 seviye gizli) &gt;</code> ile özetle veya bilgi
          mimarisini düzelt.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Current item link gibi davranmak">
          Son item (bulunduğun sayfa) tıklanamaz olmalı — kullanıcı zaten orada.
          Default davranış doğru ama <code>href</code> verirsen bozulur. Son
          item'a sadece <code>title</code> ver.
        </AntiPattern>

        <AntiPattern title="Hata 3 — routes prop'u kullanmak (deprecated)">
          AntD 5.3+ <code>routes</code> + <code>breadcrumbName</code>{" "}
          deprecated. Yeni kodda hep <code>items</code> + <code>title</code>{" "}
          kullan.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Breadcrumb.Item children API (deprecated)">
          <code>&lt;Breadcrumb.Item&gt;</code> children olarak vermek eski yöntem.{" "}
          <code>items</code> array'i daha data-driven, refactor kolay.
        </AntiPattern>

        <AntiPattern title="Hata 5 — Next/Link entegrasyonsuz">
          Default <code>&lt;a href&gt;</code> tarayıcı full reload yapar — SPA'da
          state kaybı.{" "}
          <code>itemRender</code> ile Next/Link veya React Router Link sar.
        </AntiPattern>

        <AntiPattern title="Hata 6 — Custom nav yerine kullanmamak">
          Custom <code>{`<nav>`}</code> + <code>›</code> separator ile manuel
          yazma — Breadcrumb hover state, separator, dropdown menu, link
          rendering hepsi hazır geliyor.
        </AntiPattern>
      </section>
    </main>
  );
}
