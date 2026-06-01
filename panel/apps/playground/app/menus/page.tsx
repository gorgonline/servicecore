"use client";

import Link from "next/link";
import { useState } from "react";
import type { MenuProps } from "@servicecoreui/ui/wraps";
import {
  Dashboard,
  Analytics,
  Notification as NotificationIcon,
  Phone,
  WarningAlt,
  Catalog,
  Book,
  Time,
  Asset,
  Document,
  UserMultiple,
  Locked,
  Settings,
  Home,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Menu } from "@servicecoreui/ui/wraps";
import styles from "./menus.module.css";

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

function badge(count: number, alert?: boolean): React.ReactNode {
  return (
    <span className={`${styles.itemBadge} ${alert ? styles.itemBadgeAlert : ""}`}>
      {count}
    </span>
  );
}

function rowLabel(text: string, b?: React.ReactNode): React.ReactNode {
  return (
    <span className={styles.itemRow}>
      <span className={styles.itemLabel}>{text}</span>
      {b}
    </span>
  );
}

/* ────────────────────────────────────────────────
 * Item sets
 * ──────────────────────────────────────────────── */

const siderItems: MenuProps["items"] = [
  {
    key: "g1",
    type: "group",
    label: "Çalışma Alanı",
    children: [
      { key: "home", icon: <Dashboard />, label: "Ana sayfa" },
      { key: "pano", icon: <Analytics />, label: "Pano" },
      { key: "gorev", icon: <NotificationIcon />, label: rowLabel("Görev", badge(8)) },
      { key: "cagri", icon: <Phone />, label: rowLabel("Çağrı", badge(12, true)) },
      { key: "olay", icon: <WarningAlt />, label: rowLabel("Olay", badge(148)) },
    ],
  },
  {
    key: "g2",
    type: "group",
    label: "Hizmet",
    children: [
      { key: "katalog", icon: <Catalog />, label: "Katalog" },
      { key: "kb", icon: <Book />, label: "Bilgi Tabanı" },
      { key: "sla", icon: <Time />, label: "SLA" },
    ],
  },
  {
    key: "g3",
    type: "group",
    label: "Varlıklar",
    children: [
      { key: "asset", icon: <Asset />, label: "Varlık" },
      { key: "kontrat", icon: <Document />, label: "Kontrat" },
    ],
  },
  { type: "divider" },
  {
    key: "g4",
    type: "group",
    label: "Yönetim",
    children: [
      { key: "kullanicilar", icon: <UserMultiple />, label: "Kullanıcılar" },
      { key: "roller", icon: <Locked />, label: "Roller" },
      { key: "ayarlar", icon: <Settings />, label: "Ayarlar" },
    ],
  },
];

const submenuItems: MenuProps["items"] = [
  { key: "home", icon: <Dashboard />, label: "Ana sayfa" },
  {
    key: "tickets",
    icon: <Phone />,
    label: "Bilet Yönetimi",
    children: [
      { key: "t-cagri", label: "Çağrılar" },
      { key: "t-olay", label: "Olaylar" },
      { key: "t-problem", label: "Problemler" },
      { key: "t-istek", label: "İstekler" },
    ],
  },
  {
    key: "config",
    icon: <Settings />,
    label: "Yapılandırma",
    children: [
      { key: "c-katalog", label: "Hizmet kataloğu" },
      { key: "c-sla", label: "SLA tanımları" },
      { key: "c-workflow", label: "Workflow'lar" },
    ],
  },
  { type: "divider" },
  { key: "asset", icon: <Asset />, label: "Varlıklar" },
  { key: "kb", icon: <Book />, label: "Bilgi Tabanı" },
];

const horizontalItems: MenuProps["items"] = [
  { key: "panolar", label: "Panolar" },
  { key: "biletler", label: "Biletler" },
  { key: "varliklar", label: "Varlıklar" },
  { key: "katalog", label: "Katalog" },
  { key: "kb", label: "Bilgi Tabanı" },
  {
    key: "yonetim",
    label: "Yönetim",
    children: [
      { key: "k-users", label: "Kullanıcılar", icon: <UserMultiple /> },
      { key: "k-roles", label: "Roller", icon: <Locked /> },
      { key: "k-settings", label: "Ayarlar", icon: <Settings /> },
    ],
  },
];

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function MenusPage() {
  const [horizontalKey, setHorizontalKey] = useState("panolar");
  const [verticalKey, setVerticalKey] = useState("pano");
  const [submenuKeys, setSubmenuKeys] = useState(["tickets"]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Menu</Display>
        <Text size="lg" color="secondary">
          Kalıcı navigasyon. Sider (inline), top nav (horizontal), popup nav (vertical).
          25 modüllü ITSM panel'in iskeleti — group ile kategorize et, badge ile
          alarm sayısı göster, submenu ile alt bölümlere indir. AntD 4.20+
          modern API: <code>items[]</code> (<code>Menu.Item</code> children deprecated).
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Basic</a>
        <a href="#inline">Inline</a>
        <a href="#horizontal">Horizontal</a>
        <a href="#vertical">Vertical</a>
        <a href="#group">Group + Divider</a>
        <a href="#submenu">Submenu</a>
        <a href="#dark">Dark Theme</a>
        <a href="#controlled">Controlled</a>
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
          AntD 4.20+ <code>items</code> prop'u tercih edilen yöntem (
          <code>Menu.Item</code> / <code>Menu.SubMenu</code> children API'sı deprecated).
          Item objesi: <code>{`{ key, label, icon?, disabled?, danger?, title? }`}</code>.
        </Text>
        <div className={styles.showcase}>
          <Menu
            mode="inline"
            style={{ maxWidth: 280 }}
            defaultSelectedKeys={["home"]}
            items={[
              { key: "home", icon: <Home />, label: "Ana sayfa" },
              { key: "pano", icon: <Analytics />, label: "Pano" },
              { key: "asset", icon: <Asset />, label: "Varlıklar" },
              { key: "kb", icon: <Book />, label: "Bilgi Tabanı" },
              { type: "divider" },
              { key: "ayarlar", icon: <Settings />, label: "Ayarlar" },
            ]}
          />
        </div>
        <CodeBlock>{`<Menu
  mode="inline"
  defaultSelectedKeys={["home"]}
  items={[
    { key: "home", icon: <Home />, label: "Ana sayfa" },
    { key: "pano", icon: <Analytics />, label: "Pano" },
    { type: "divider" },
    { key: "ayarlar", icon: <Settings />, label: "Ayarlar" },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── INLINE ── */}
      <section id="inline" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>mode=&quot;inline&quot;</span>
          <Heading level={2}>Inline — sider için varsayılan</Heading>
        </div>
        <Text size="md" color="secondary">
          Submenu'ler dikey olarak <strong>yerinde</strong> açılır. ServiceCore
          sider'ının default mode'u. 25 modüllü ITSM panel iskeleti için ideal.
        </Text>
        <div className={styles.showcase}>
          <Menu
            mode="inline"
            style={{ maxWidth: 280 }}
            defaultSelectedKeys={["pano"]}
            items={siderItems?.slice(0, 3)}
          />
        </div>
      </section>

      {/* ── HORIZONTAL ── */}
      <section id="horizontal" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>mode=&quot;horizontal&quot;</span>
          <Heading level={2}>Horizontal — top navigation</Heading>
        </div>
        <Text size="md" color="secondary">
          Header'da kategori navigation'ı. Submenu'ler popup olarak aşağı açılır.
          Selected item'da alt kenarda 2px accent bar. Ekran daralınca otomatik
          overflow indicator (3-dot) gözükür.
        </Text>
        <div className={styles.showcase}>
          <Menu
            mode="horizontal"
            selectedKeys={[horizontalKey]}
            onClick={({ key }) => setHorizontalKey(key)}
            items={horizontalItems}
          />
        </div>
        <Text size="sm" color="tertiary">
          Aktif: <code>{horizontalKey}</code>
        </Text>
      </section>

      {/* ── VERTICAL ── */}
      <section id="vertical" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>mode=&quot;vertical&quot;</span>
          <Heading level={2}>Vertical — popup submenu</Heading>
        </div>
        <Text size="md" color="secondary">
          Inline ile aynı görünür ama submenu'ler <strong>popup</strong> olarak sağa
          açılır. Daraltılmış sider veya hover-driven menü için.
        </Text>
        <div className={styles.showcase}>
          <Menu
            mode="vertical"
            style={{ maxWidth: 240 }}
            selectedKeys={[verticalKey]}
            onClick={({ key }) => setVerticalKey(key)}
            items={submenuItems}
          />
        </div>
      </section>

      {/* ── GROUP + DIVIDER ── */}
      <section id="group" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>type</span>
          <Heading level={2}>Group + Divider</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>type: &quot;group&quot;</code> başlık + children — 25 modülü
          kategorize et: Çalışma Alanı / Hizmet / Varlıklar / Yönetim.{" "}
          <code>type: &quot;divider&quot;</code> kategoriler arası ince hairline.
        </Text>
        <div className={styles.showcase}>
          <Menu
            mode="inline"
            style={{ maxWidth: 280 }}
            defaultSelectedKeys={["pano"]}
            items={siderItems}
          />
        </div>
      </section>

      {/* ── SUBMENU ── */}
      <section id="submenu" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>children[]</span>
          <Heading level={2}>Submenu — children</Heading>
        </div>
        <Text size="md" color="secondary">
          Item objesine <code>children</code> ver → submenu. Inline mode'da yerinde
          açılır, vertical/horizontal mode'da popup. <strong>2 seviyeden derinleşme</strong>{" "}
          — kullanıcı yolunu kaybeder, Tree veya Anchor TOC'a geçir.
        </Text>
        <div className={styles.showcase}>
          <Menu
            mode="inline"
            style={{ maxWidth: 280 }}
            openKeys={submenuKeys}
            onOpenChange={(keys) => setSubmenuKeys(keys)}
            defaultSelectedKeys={["t-cagri"]}
            items={submenuItems}
          />
        </div>
        <Text size="sm" color="tertiary">
          Açık submenu'ler: <code>{JSON.stringify(submenuKeys)}</code>
        </Text>
      </section>

      {/* ── DARK THEME ── */}
      <section id="dark" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>theme=&quot;dark&quot;</span>
          <Heading level={2}>Dark Theme</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore default light, ama power-user sider'ı (24/7 NOC monitör
          başında çalışan operatörler) için koyu tema. Selected item solid accent
          + accent-on-accent text.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.darkSiderFrame}>
            <div className={styles.darkSider}>
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={["cagri"]}
                items={[
                  {
                    key: "g1",
                    type: "group",
                    label: "Çalışma Alanı",
                    children: [
                      { key: "home", icon: <Dashboard />, label: "Ana sayfa" },
                      { key: "pano", icon: <Analytics />, label: "Pano" },
                      { key: "cagri", icon: <Phone />, label: "Çağrı" },
                      { key: "olay", icon: <WarningAlt />, label: "Olay" },
                    ],
                  },
                  { type: "divider" },
                  {
                    key: "g2",
                    type: "group",
                    label: "Yönetim",
                    children: [
                      { key: "users", icon: <UserMultiple />, label: "Kullanıcılar" },
                      { key: "settings", icon: <Settings />, label: "Ayarlar" },
                    ],
                  },
                ]}
              />
            </div>
            <div className={styles.fakeContent} style={{ background: "var(--sc-color-neutral-50)" }}>
              İçerik alanı (light)
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTROLLED ── */}
      <section id="controlled" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>open/selected</span>
          <Heading level={2}>Controlled — state ile sürmek</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>selectedKeys</code> + <code>onClick</code> ile route eşle.{" "}
          <code>openKeys</code> + <code>onOpenChange</code> ile submenu state.
          ServiceCore'da Next.js router ile entegre çalışır — current pathname'i
          selectedKeys'e yansıt.
        </Text>
        <CodeBlock>{`import { usePathname, useRouter } from "next/navigation";

function Sider() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      onClick={({ key }) => router.push(key)}
      items={[
        { key: "/panolar", icon: <Dashboard />, label: "Panolar" },
        { key: "/cagrilar", icon: <Phone />, label: "Çağrılar" },
      ]}
    />
  );
}`}</CodeBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="ServiceCore sider — 5 grup × badge'li item (Inline, Light)">
          <div className={styles.siderFrame}>
            <div className={styles.sider}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["pano"]}
                items={siderItems}
              />
            </div>
            <div className={styles.fakeContent}>İçerik alanı (PageHeader + dashboard)</div>
          </div>
        </MockBlock>

        <MockBlock caption="Top nav — Header altında kategori bar (Horizontal)">
          <div className={styles.headerFrame}>
            <div className={styles.brandRow}>
              <span className={styles.brandMark}>SC</span>
              <span className={styles.brandName}>ServiceCore</span>
            </div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["panolar"]}
              items={horizontalItems}
              style={{ paddingInline: "var(--sc-space-3)" }}
            />
          </div>
        </MockBlock>

        <CodeBlock>{`// ServiceCore sider — 5 grup × 25 modül iskeleti
<Menu
  mode="inline"
  defaultSelectedKeys={["pano"]}
  items={[
    {
      key: "g1",
      type: "group",
      label: "Çalışma Alanı",
      children: [
        { key: "home", icon: <Dashboard />, label: "Ana sayfa" },
        { key: "cagri", icon: <Phone />, label: <span>Çağrı{badge(12, true)}</span> },
        { key: "olay", icon: <WarningAlt />, label: <span>Olay{badge(148)}</span> },
      ],
    },
    { type: "divider" },
    { key: "g2", type: "group", label: "Yönetim", children: [...] },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── API NOTU ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>not</span>
          <Heading level={2}>API Notu — 5.7 baseline farkları</Heading>
        </div>

        <Alert
          type="warning"
          showIcon
          message="Menu.Item / Menu.SubMenu / Menu.ItemGroup — 4.20+ DEPRECATED"
          description={
            <>
              JSX children API'sı deprecated. Modern: <code>items</code> array'i —
              data-driven, refactor kolay, async load edilebilir.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="popupRender — 6.0+ özelliği"
          description={
            <>
              AntD 6.0'da gelen <code>popupRender</code> (submenu popup'unu sarmak)
              5.7'de yok. Custom popup için <code>popupClassName</code> ile CSS
              override yap.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="tooltip prop — 6.3+ özelliği"
          description={
            <>
              Collapsed mode'da custom tooltip <code>tooltip</code> prop'u 6.3+.
              5.7'de item.title kullanılır (string only). Custom tooltip için
              wrapper Tooltip ile sar.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="extra field — 5.21+ özelliği"
          description={
            <>
              Item'da <code>extra</code> field (shortcut keys gibi sağda ek
              içerik) 5.21+. 5.7'de yok — <code>label</code> içine inline span ile
              yerleştir (badge pattern'i gibi).
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="Flex container'da auto-collapse"
          description={
            <>
              Menu, Flex parent'da otomatik daralmaz —{" "}
              <code>style={`{{ minWidth: 0, flex: "auto" }}`}</code> ekle, yoksa
              overflow taşar.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="Double render — by design"
          description={
            <>
              Menu children'ı 2 kez render eder (HOC support için structural info
              toplama). Bug değil, side effect'lerin idempotent olmasına dikkat.
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
            "Persistent navigation — sider, top nav, app shell",
            "ServiceCore'un 25 modül iskeleti (5 grup × 4-9 item)",
            "Submenu ile 2 seviyeli hiyerarşi (Bilet › Çağrı/Olay)",
            "Horizontal — header kategori bar (Panolar/Biletler/...)",
            "Dark theme — 24/7 NOC operatör panel",
          ]}
          dontItems={[
            "Tek-tetik aksiyon menüsü — Dropdown kullan",
            "Form input seçim — Select kullan",
            "Sayfa içi section navigation — Anchor kullan",
            "3+ seviye derin hiyerarşi — Tree veya Drawer kullan",
            "Tab değişimi — Tabs kullan",
            "Modal içinde — yer kısıtlı, basit liste yeter",
          ]}
        />
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Menu.Item children API (deprecated)">
          <code>&lt;Menu&gt;&lt;Menu.Item key=&quot;1&quot;&gt;...&lt;/Menu.Item&gt;&lt;/Menu&gt;</code>{" "}
          eski yöntem. AntD 4.20+ <code>items</code> array kullan — JSON
          serializable, route-driven, test edilebilir.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Dropdown yerine Menu ile aksiyon menüsü">
          Menu <strong>persistent navigation</strong> bileşeni. Bir butona tıklayınca
          açılan aksiyon menüsü için <code>Dropdown</code> kullan — trigger,
          placement, arrow, contextMenu hepsi orada hazır.
        </AntiPattern>

        <AntiPattern title="Hata 3 — 3+ seviyeli submenu nesting">
          3 seviye derin submenu (Yönetim › Kullanıcılar › Roller › Yetkiler)
          kullanıcıyı kaybeder, hover yanlış item'a kayar. 2 seviye yeter;
          derin hiyerarşi için Drawer + Tree kullan.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Flex parent'ta minWidth ayarsız">
          Menu, Flex container'da auto-collapse yapmaz. Header'da{" "}
          <code>{`<Flex><Menu /></Flex>`}</code> kurarsan{" "}
          <code>style={`{{ minWidth: 0, flex: "auto" }}`}</code> ekle, yoksa
          overflow taşar veya kardeş öğelerin yerini yer.
        </AntiPattern>

        <AntiPattern title="Hata 5 — Route eşleme yapmamak">
          Sider Menu'sünü URL ile eşlemezsen sayfa yenilenince selected state
          kaybolur. <code>selectedKeys={`{[pathname]}`}</code> +{" "}
          <code>onClick={`{({ key }) => router.push(key)}`}</code> ile bağla.
        </AntiPattern>

        <AntiPattern title="Hata 6 — Section navigation için Menu">
          Tek sayfa içinde section'lar arası kaydırma için <code>Anchor</code>{" "}
          kullan — scroll spy, offsetTop, bounds tracking hepsi orada.
          Menu sayfalar arası içindir.
        </AntiPattern>

        <AntiPattern title="Hata 7 — Item key'leri unique değil">
          Tüm item key'leri benzersiz olmalı (group içindekiler dahil). Aynı
          key olursa selected state random davranır, console warning verir.
        </AntiPattern>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
