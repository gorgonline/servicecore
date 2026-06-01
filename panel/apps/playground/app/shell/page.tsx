"use client";

/* ════════════════════════════════════════════════════════════════════════
 * ServiceCore — App Shell BLUEPRINT
 *
 * Developer referansı: "Bir panel sayfası NASIL kurulur." Kural:
 *   • SADECE @servicecoreui/ui + /wraps bileşenleri kullanılır.
 *   • İkonlar Carbon (@carbon/icons-react).
 *   • Renk/boşluk/radius YALNIZCA var(--sc-*) token'larından.
 *   • Hardcoded hex/px YOK (yalnız frame layout ölçüleri token).
 *   • antd DOĞRUDAN import edilmez. (Frame L-şekli için Layout wrap'i henüz yok
 *     → semantic HTML + CSS Module ile kuruldu; gerisi tamamen bileşen.)
 *
 * KPI → Statistic+Card · kategori/SLA → Progress · liste → Table ·
 * header aksiyonları → Button/Badge/Dropdown/Avatar · arama → Input · nav → Menu.
 * ════════════════════════════════════════════════════════════════════════ */

import {
  Add,
  Analytics,
  ArrowDown,
  ArrowUp,
  Asset,
  Book,
  Catalog,
  ChevronDown,
  Dashboard,
  Document,
  Export,
  Filter,
  Help,
  Idea,
  Locked,
  Notification as NotificationIcon,
  OverflowMenuVertical,
  Phone,
  Renew,
  Rocket,
  Search,
  Settings,
  ShoppingCart,
  Time,
  User,
  UserMultiple,
  Logout,
  WarningAlt,
} from "@carbon/icons-react";
import type { ReactNode } from "react";
import { Heading, Text } from "@servicecoreui/ui";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  Input,
  Menu,
  Progress,
  Statistic,
  Table,
  Tag,
} from "@servicecoreui/ui/wraps";
import type { MenuProps, TagProps } from "@servicecoreui/ui/wraps";
import styles from "./shell.module.css";

/* ────────────────────────────────────────────────
 * Tipler
 * ──────────────────────────────────────────────── */

interface Ticket {
  key: string;
  kod: string;
  konu: string;
  atanan: string;
  durum: string;
  tone: NonNullable<TagProps["tone"]>;
  guncelleme: string;
}

/* ────────────────────────────────────────────────
 * Nav — 5 grup ITSM modülleri
 * ──────────────────────────────────────────────── */

function navBadge(count: number, alert?: boolean): ReactNode {
  return (
    <span className={`${styles.menuBadge} ${alert ? styles.menuBadgeAlert : ""}`}>
      {count}
    </span>
  );
}

function navLabel(label: string, count: number, alert?: boolean): ReactNode {
  return (
    <span className={styles.menuItemRow}>
      <span className={styles.menuItemLabel}>{label}</span>
      {navBadge(count, alert)}
    </span>
  );
}

const menuItems: MenuProps["items"] = [
  {
    key: "g1",
    type: "group",
    label: "Çalışma Alanı",
    children: [
      { key: "home", icon: <Dashboard />, label: "Ana sayfa" },
      { key: "pano", icon: <Analytics />, label: "Pano" },
      { key: "gorev", icon: <NotificationIcon />, label: navLabel("Görev", 8) },
      { key: "cagri", icon: <Phone />, label: navLabel("Çağrı", 12, true) },
      { key: "olay", icon: <WarningAlt />, label: navLabel("Olay", 148) },
      { key: "problem", icon: <Idea />, label: "Problem" },
      { key: "istek", icon: <ShoppingCart />, label: "İstek" },
      { key: "degisiklik", icon: <Renew />, label: "Değişiklik" },
      { key: "yayin", icon: <Rocket />, label: "Yayın" },
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
      { key: "cmdb", icon: <Analytics />, label: "Yapılandırma (CMDB)" },
      { key: "kontrat", icon: <Document />, label: "Kontrat" },
      { key: "tedarikci", icon: <UserMultiple />, label: "Tedarikçi" },
    ],
  },
  {
    key: "g4",
    type: "group",
    label: "Otomasyon",
    children: [
      { key: "workflow", icon: <Renew />, label: "Workflow" },
      { key: "otomasyon", icon: <Settings />, label: "Otomasyon" },
    ],
  },
  {
    key: "g5",
    type: "group",
    label: "Yönetim",
    children: [
      { key: "rapor", icon: <Analytics />, label: "Rapor" },
      { key: "kullanicilar", icon: <UserMultiple />, label: "Kullanıcılar" },
      { key: "roller", icon: <Locked />, label: "Roller / Yetkiler" },
      { key: "ayarlar", icon: <Settings />, label: "Ayarlar" },
    ],
  },
];

/* ────────────────────────────────────────────────
 * Dropdown menüleri
 * ──────────────────────────────────────────────── */

const profileMenu: MenuProps = {
  items: [
    { key: "profil", icon: <User />, label: "Profil" },
    { key: "ayarlar", icon: <Settings />, label: "Ayarlar" },
    { type: "divider" },
    { key: "cikis", icon: <Logout />, label: "Çıkış", danger: true },
  ],
};

const widgetMenu: MenuProps = {
  items: [
    { key: "yenile", icon: <Renew />, label: "Yenile" },
    { key: "disa", icon: <Export />, label: "Dışa aktar" },
  ],
};

const panoMenu: MenuProps = {
  selectable: true,
  selectedKeys: ["ikd"],
  items: [
    { key: "ikd", label: "IKD PANO" },
    { key: "sla", label: "SLA PANO" },
    { key: "ops", label: "Operasyon PANO" },
  ],
};

/* ────────────────────────────────────────────────
 * Mock veri
 * ──────────────────────────────────────────────── */

const kpis = [
  { label: "Açık Çağrı", value: 12, trend: "+3", tone: "success" as const, dir: "up" as const, sub: "düne göre" },
  { label: "SLA Aşıldı", value: 3, trend: "−1", tone: "success" as const, dir: "down" as const, sub: "düne göre (iyi)" },
  { label: "Bekleyen Olay", value: 148, trend: null, tone: "neutral" as const, dir: null, sub: "toplam aktif" },
  { label: "Bu Hafta Kapanan", value: 47, trend: "%12", tone: "success" as const, dir: "up" as const, sub: "geçen haftaya göre" },
];

const categories = [
  { label: "Donanım", value: 47 },
  { label: "Yazılım", value: 32 },
  { label: "Ağ", value: 18 },
  { label: "Hesap", value: 14 },
  { label: "Diğer", value: 9 },
];
const maxCategory = Math.max(...categories.map((c) => c.value));

const tickets: Ticket[] = [
  { key: "1", kod: "SC-4127", konu: "Print server bağlanamıyor", atanan: "Deniz Aktaş", durum: "Beklemede", tone: "warning", guncelleme: "5 dk önce" },
  { key: "2", kod: "SC-4126", konu: "VPN yavaş — ev ofisi", atanan: "Mert Yıldız", durum: "İşlemde", tone: "accent", guncelleme: "22 dk önce" },
  { key: "3", kod: "SC-4125", konu: "Yeni kullanıcı AD entegrasyonu", atanan: "Selin Koç", durum: "Çözüldü", tone: "success", guncelleme: "1 saat önce" },
  { key: "4", kod: "SC-4124", konu: "Outlook kalibrasyon sorunu", atanan: "Can Erdem", durum: "SLA Aşıldı", tone: "danger", guncelleme: "2 saat önce" },
  { key: "5", kod: "SC-4123", konu: "Yazıcı toner değişimi talebi", atanan: "Selin Koç", durum: "Açık", tone: "info", guncelleme: "3 saat önce" },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ────────────────────────────────────────────────
 * Sayfa
 * ──────────────────────────────────────────────── */

export default function ShellPage() {
  return (
    <div className={styles.page}>
      {/* ── Top bar ── */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>SC</div>
          <span className={styles.brandName}>ServiceCore</span>
        </div>

        <div className={styles.search}>
          <Input
            prefix={<Search size={16} />}
            suffix={<kbd className={styles.kbd}>⌘K</kbd>}
            placeholder="Hızlı arama"
            aria-label="Hızlı arama"
          />
        </div>

        <div className={styles.spacer} />

        <div className={styles.utilities}>
          <Badge dot>
            <Button
              type="text"
              leadingIcon={<NotificationIcon size={18} />}
              aria-label="Bildirimler"
            />
          </Badge>
          <Button type="text" leadingIcon={<Help size={18} />} aria-label="Yardım" />
          <Dropdown menu={profileMenu} trigger={["click"]} placement="bottomRight">
            <button type="button" className={styles.profile}>
              <Avatar size="small" tone="accent">
                AY
              </Avatar>
              <span className={styles.profileName}>Ayşe Y.</span>
              <ChevronDown size={14} />
            </button>
          </Dropdown>
        </div>
      </header>

      {/* ── Body: sidebar + content ── */}
      <div className={styles.body}>
        <aside className={styles.sider}>
          <Menu mode="inline" selectedKeys={["pano"]} items={menuItems} />
        </aside>

        <main className={styles.content}>
          {/* ── Page header ── */}
          <div className={styles.pageHeader}>
            <Breadcrumb
              items={[{ title: "Ana sayfa" }, { title: "Panolar" }, { title: "IKD PANO" }]}
            />
            <div className={styles.pageHeaderTopRow}>
              <div className={styles.pageHeaderTitle}>
                <Heading level={2}>Panolar</Heading>
                <Dropdown menu={panoMenu} trigger={["click"]}>
                  <Button trailingIcon={<ChevronDown size={14} />}>IKD PANO</Button>
                </Dropdown>
              </div>
              <div className={styles.pageHeaderActions}>
                <span className={styles.refreshMeta}>
                  <span className={styles.refreshDot} />
                  Otomatik: 5 dk
                </span>
                <Button leadingIcon={<Filter />}>Filtre</Button>
                <Button type="primary" leadingIcon={<Add />}>
                  Yeni Pano
                </Button>
              </div>
            </div>
          </div>

          {/* ── Content body ── */}
          <div className={styles.contentBody}>
            {/* KPI strip */}
            <div className={styles.kpiStrip}>
              {kpis.map((k) => (
                <Card key={k.label}>
                  <Statistic title={k.label} value={k.value} />
                  <div className={styles.kpiTrendRow}>
                    {k.trend ? (
                      <Tag
                        tone={k.tone}
                        size="small"
                        leadingIcon={k.dir === "up" ? <ArrowUp /> : <ArrowDown />}
                      >
                        {k.trend}
                      </Tag>
                    ) : null}
                    <Text size="xs" color="tertiary">
                      {k.sub}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>

            {/* Widget grid */}
            <div className={styles.widgetGrid}>
              <Card
                title="Açık çağrılar (kategori)"
                extra={
                  <Dropdown menu={widgetMenu} trigger={["click"]} placement="bottomRight">
                    <Button
                      type="text"
                      size="small"
                      leadingIcon={<OverflowMenuVertical size={16} />}
                      aria-label="Widget menüsü"
                    />
                  </Dropdown>
                }
              >
                <div className={styles.catList}>
                  {categories.map((c) => (
                    <div key={c.label} className={styles.catRow}>
                      <Text size="sm">{c.label}</Text>
                      <Progress
                        percent={Math.round((c.value / maxCategory) * 100)}
                        showInfo={false}
                        size="small"
                        status="normal"
                        strokeColor="var(--sc-color-accent)"
                      />
                      <Text size="sm" color="tertiary" className={styles.catValue}>
                        {c.value}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                title="SLA uyumu (bu ay)"
                extra={
                  <Dropdown menu={widgetMenu} trigger={["click"]} placement="bottomRight">
                    <Button
                      type="text"
                      size="small"
                      leadingIcon={<OverflowMenuVertical size={16} />}
                      aria-label="Widget menüsü"
                    />
                  </Dropdown>
                }
              >
                <div className={styles.slaWidget}>
                  <Progress type="circle" percent={94} size={132} />
                  <div className={styles.slaMeta}>
                    <Statistic title="Hedef" value={95} suffix="%" />
                    <Text size="sm" color="tertiary">
                      318 / 338 talep süresinde kapandı
                    </Text>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent tickets */}
            <Card
              title="Son açılan çağrılar"
              extra={
                <Button type="link" size="small">
                  Tümünü gör →
                </Button>
              }
            >
              <Table<Ticket>
                rowKey="key"
                dataSource={tickets}
                pagination={false}
                columns={[
                  {
                    title: "Kod",
                    dataIndex: "kod",
                    width: 110,
                    render: (kod: string) => (
                      <Text
                        size="sm"
                        weight="medium"
                        color="accent"
                        style={{ fontFamily: "var(--sc-font-mono)" }}
                      >
                        {kod}
                      </Text>
                    ),
                  },
                  {
                    title: "Konu",
                    dataIndex: "konu",
                    ellipsis: true,
                    render: (konu: string) => <Text size="sm">{konu}</Text>,
                  },
                  {
                    title: "Atanan",
                    dataIndex: "atanan",
                    width: 190,
                    render: (atanan: string) => (
                      <span className={styles.assignee}>
                        <Avatar size="small" tone="neutral">
                          {initials(atanan)}
                        </Avatar>
                        <Text size="sm">{atanan}</Text>
                      </span>
                    ),
                  },
                  {
                    title: "Durum",
                    dataIndex: "durum",
                    width: 150,
                    render: (_durum: string, row: Ticket) => (
                      <Tag tone={row.tone} dot size="small">
                        {row.durum}
                      </Tag>
                    ),
                  },
                  {
                    title: "Güncelleme",
                    dataIndex: "guncelleme",
                    width: 130,
                    align: "right",
                    render: (guncelleme: string) => (
                      <Text size="sm" color="tertiary">
                        {guncelleme}
                      </Text>
                    ),
                  },
                ]}
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
