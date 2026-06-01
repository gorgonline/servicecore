"use client";

import { Layout } from "antd";
import {
  Dashboard,
  Notification as NotificationIcon,
  Phone,
  WarningAlt,
  Idea,
  ShoppingCart,
  Catalog,
  Rocket,
  Asset,
  Book,
  Time,
  Document,
  Analytics,
  UserMultiple,
  Locked,
  Settings,
  Search,
  Help,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Add,
  Filter,
  Renew,
  OverflowMenuVertical,
} from "@carbon/icons-react";
import { Heading, Text } from "@servicecoreui/ui";
import { Breadcrumb, Button, Card, Menu, Tag } from "@servicecoreui/ui/wraps";
import type { MenuProps } from "@servicecoreui/ui/wraps";
import styles from "./shell.module.css";

const { Header, Sider, Content } = Layout;

/* ────────────────────────────────────────────────
 * Menu items — 5 grup × 25 modül
 * ──────────────────────────────────────────────── */

function badge(count: number, alert?: boolean): React.ReactNode {
  return (
    <span className={`${styles.menuBadge} ${alert ? styles.menuBadgeAlert : ""}`}>{count}</span>
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
      { key: "gorev", icon: <NotificationIcon />, label: <span className={styles.menuItemRow}><span className={styles.menuItemLabel}>Görev</span>{badge(8)}</span> },
      { key: "cagri", icon: <Phone />, label: <span className={styles.menuItemRow}><span className={styles.menuItemLabel}>Çağrı</span>{badge(12, true)}</span> },
      { key: "olay", icon: <WarningAlt />, label: <span className={styles.menuItemRow}><span className={styles.menuItemLabel}>Olay</span>{badge(148)}</span> },
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
      { key: "lisans", icon: <Document />, label: "Lisans" },
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
 * Mock data
 * ──────────────────────────────────────────────── */

const kpis = [
  { label: "Açık Çağrı", value: 12, trend: { value: "+3", dir: "up" as const }, sub: "Düne göre" },
  { label: "SLA Aşıldı", value: 3, trend: { value: "-1", dir: "up" as const }, sub: "Düne göre (iyi)" },
  { label: "Bekleyen Olay", value: 148, trend: null, sub: "Toplam aktif" },
  { label: "Bu Hafta Kapanan", value: 47, trend: { value: "%12", dir: "up" as const }, sub: "Geçen haftaya göre" },
];

const openTicketsByCategory = [
  { label: "Donanım", value: 47 },
  { label: "Yazılım", value: 32 },
  { label: "Ağ", value: 18 },
  { label: "Hesap", value: 14 },
  { label: "Diğer", value: 9 },
];
const maxCategoryValue = Math.max(...openTicketsByCategory.map((c) => c.value));

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function ShellPage() {
  return (
    <Layout className={styles.page}>
      {/* ── Header (top utility) — outer Layout vertical, Header en üstte ── */}
      <Header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>SC</div>
          <span className={styles.brandName}>ServiceCore</span>
        </div>

        <div className={styles.search}>
          <Search size={16} />
          <span>Hızlı arama (⌘ K)</span>
        </div>

        <div className={styles.spacer} />

        <div className={styles.utilities}>
          <button className={styles.iconBtn} aria-label="Bildirimler" data-notify="true">
            <NotificationIcon size={18} />
          </button>
          <button className={styles.iconBtn} aria-label="Yardım">
            <Help size={18} />
          </button>
          <div className={styles.profile}>
            <div className={styles.avatar}>AY</div>
            <span className={styles.profileName}>Ayşe Y.</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </Header>

      {/* ── Body: Sider + Content — inner Layout horizontal ── */}
      <Layout hasSider>
        <Sider width={240} theme="light" className={styles.sider}>
          <Menu
            mode="inline"
            theme="light"
            selectedKeys={["pano"]}
            items={menuItems}
            style={{ paddingBottom: 24 }}
          />
        </Sider>

        <Content className={styles.content}>
          {/* ── PageHeader ── */}
          <div className={styles.pageHeader}>
            <Breadcrumb
              items={[
                { title: "Ana sayfa" },
                { title: "Panolar" },
                { title: "IKD PANO" },
              ]}
            />
            <div className={styles.pageHeaderTopRow}>
              <div className={styles.pageHeaderTitle}>
                <Heading level={2}>Panolar</Heading>
                <button className={styles.pageSelector}>
                  IKD PANO <ChevronDown size={14} />
                </button>
                <Tag
                  size="small"
                  className={styles.placeholderTag}
                  style={{ fontFamily: "var(--sc-font-mono)" }}
                >
                  Select placeholder
                </Tag>
              </div>
              <div className={styles.pageHeaderActions}>
                <span className={styles.refreshMeta}>
                  <span className={styles.refreshDot} />
                  <strong>Otomatik:</strong> 5 dk
                </span>
                <Button type="default" leadingIcon={<Filter />}>Filtre</Button>
                <Button type="primary" leadingIcon={<Add />}>Yeni Pano</Button>
              </div>
            </div>
          </div>

          {/* ── Content body ── */}
          <div className={styles.contentBody}>
            {/* KPI strip */}
            <div className={styles.kpiStrip}>
              {kpis.map((k) => (
                <div key={k.label} className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>{k.label}</span>
                  <div className={styles.kpiValueRow}>
                    <span className={styles.kpiValue}>{k.value}</span>
                    {k.trend ? (
                      <span
                        className={`${styles.kpiTrend} ${
                          k.trend.dir === "up" ? styles.kpiTrendUp : styles.kpiTrendDown
                        }`}
                      >
                        {k.trend.dir === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        {k.trend.value}
                      </span>
                    ) : null}
                  </div>
                  <span className={styles.kpiSub}>{k.sub}</span>
                </div>
              ))}
            </div>

            {/* Widget grid */}
            <div className={styles.widgetGrid}>
              <Card
                title="Açık çağrılar (kategori)"
                extra={
                  <button className={styles.iconBtn} aria-label="Menü">
                    <OverflowMenuVertical size={16} />
                  </button>
                }
              >
                <div className={styles.chartFrame}>
                  <div className={styles.chartBars}>
                    {openTicketsByCategory.map((c) => (
                      <div
                        key={c.label}
                        className={styles.chartBar}
                        data-label={c.label}
                        data-value={c.value}
                        style={{ height: `${(c.value / maxCategoryValue) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
                <Text size="xs" color="tertiary" align="end" style={{ marginTop: 12 }}>
                  5 dk önce güncellendi
                </Text>
              </Card>

              <Card
                title="Olay trendi (7 gün)"
                extra={
                  <button className={styles.iconBtn} aria-label="Menü">
                    <OverflowMenuVertical size={16} />
                  </button>
                }
              >
                <div className={styles.linePlaceholder}>
                  [Line chart placeholder · Pzt 18, Salı 22, Çarş 31, Per 28, Cuma 24, Cmt 9, Paz 6]
                </div>
                <Text size="xs" color="tertiary" align="end" style={{ marginTop: 12 }}>
                  5 dk önce güncellendi
                </Text>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { id: "SC-4127", title: "Print server bağlanamıyor", tone: "warning" as const, status: "Beklemede" },
                  { id: "SC-4126", title: "VPN yavaş — ev ofisi", tone: "accent" as const, status: "İşlemde" },
                  { id: "SC-4125", title: "Yeni kullanıcı AD entegrasyonu", tone: "success" as const, status: "Çözüldü" },
                  { id: "SC-4124", title: "Outlook kalibrasyon sorunu", tone: "danger" as const, status: "SLA Aşıldı" },
                ].map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr auto",
                      gap: 16,
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid var(--sc-color-border-subtle)",
                    }}
                  >
                    <Text size="xs" color="tertiary" style={{ fontFamily: "var(--sc-font-mono)" }}>
                      {t.id}
                    </Text>
                    <Text size="sm">{t.title}</Text>
                    <Tag tone={t.tone} dot size="small">
                      {t.status}
                    </Tag>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
