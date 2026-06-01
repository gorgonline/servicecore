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
  ArrowDown,
  ArrowUp,
  Book,
  Catalog,
  ChevronDown,
  Cloud,
  DataBase,
  Debug,
  DocumentSigned,
  Export,
  Filter,
  Help,
  Logout,
  Notification as NotificationIcon,
  OverflowMenuVertical,
  Phone,
  Renew,
  RequestQuote,
  Roadmap,
  Search,
  Settings,
  SidePanelClose,
  SidePanelOpen,
  Task,
  User,
  UserMultiple,
  WarningAlt,
} from "@carbon/icons-react";
import { useState } from "react";
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
 * Nav — ServiceCore'un gerçek üst-menü modülleri (mevcut panelden birebir).
 * Düz liste; uydurma grup / sahte rozet-sayı YOK. Her item'da `title` →
 * collapsed (icon-only) modda AntD hover tooltip'i bu string'den üretir.
 * İkonlar Carbon (@carbon/icons-react).
 * ──────────────────────────────────────────────── */

const menuItems: MenuProps["items"] = [
  { key: "gorev", icon: <Task />, label: "Görev", title: "Görev" },
  { key: "cagri", icon: <Phone />, label: "Çağrı", title: "Çağrı" },
  { key: "olay", icon: <WarningAlt />, label: "Olay", title: "Olay" },
  { key: "problem", icon: <Debug />, label: "Problem", title: "Problem" },
  { key: "istek", icon: <RequestQuote />, label: "İstek", title: "İstek" },
  { key: "katalog", icon: <Catalog />, label: "Katalog", title: "Katalog" },
  { key: "degisiklik", icon: <Renew />, label: "Değişiklik", title: "Değişiklik" },
  { key: "kb", icon: <Book />, label: "KB", title: "KB" },
  { key: "si", icon: <Cloud />, label: "SI", title: "SI" },
  { key: "cmdb", icon: <DataBase />, label: "CMDB", title: "CMDB" },
  { key: "sozlesme", icon: <DocumentSigned />, label: "Sözleşme", title: "Sözleşme" },
  { key: "proje", icon: <Roadmap />, label: "Proje", title: "Proje" },
  { key: "musteriler", icon: <UserMultiple />, label: "Müşteriler", title: "Müşteriler" },
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
 * ServiceCore sembolü — brand/assets/logo.svg (iki renkli mark).
 * Renkler token'a bağlı: koyu kısım → text-primary, mavi kısım → accent.
 * Hardcoded hex yok; light/dark zemine göre token üzerinden uyum sağlar.
 * ──────────────────────────────────────────────── */

function ServiceCoreSymbol({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 9.11 8.542 L 11.967 8.543 L 14.823 3.379 L 11.14 6.708 Z M 13.101 10.063 L 13.689 11.125 L 19.991 11.125 L 15.559 3.113 L 12.408 8.809 Z M 9.11 14.238 L 5.958 19.934 L 15.117 19.934 L 11.967 14.238 Z M 19.991 11.656 L 13.689 11.656 L 13.048 12.814 L 12.408 13.972 L 15.559 19.668 Z"
        fill="var(--sc-color-text-primary)"
      />
      <path
        d="M 7.583 5.962 L 4.432 0.266 L 0 8.277 L 6.302 8.277 Z M 8.025 11.391 L 5.168 16.553 L 10.882 11.391 Z M 7.583 11.125 L 6.302 8.809 L 0 8.809 L 4.433 16.819 Z M 10.882 5.696 L 14.033 0 L 4.874 0 L 8.023 5.695 Z"
        fill="var(--sc-color-accent)"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────
 * Sayfa
 * ──────────────────────────────────────────────── */

export default function ShellPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.page}>
      {/* ── Top bar ── */}
      <header className={styles.header}>
        {/* Toggle, collapsed sidebar (64px) ile aynı kolonda ortalı —
            alttaki ikon koloyla hizalı. */}
        <div className={styles.headerToggle}>
          <Button
            type="text"
            onClick={() => setCollapsed((c) => !c)}
            leadingIcon={
              collapsed ? <SidePanelOpen size={18} /> : <SidePanelClose size={18} />
            }
            aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          />
        </div>
        <div className={styles.brand}>
          <ServiceCoreSymbol size={24} />
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
        {/* Sidebar — collapsed'da 80px ikon rayı. Genişlik INLINE veriliyor:
            sınıf cascade'ine güvenmeden kesin uygulansın (AntD 5.7 specificity +
            stale CSS'e karşı). Daralma animasyonu .sider'daki transition'dan gelir. */}
        <aside
          className={`${styles.sider} ${collapsed ? styles.siderCollapsed : ""}`}
          style={{ width: collapsed ? 64 : 240 }}
        >
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={["olay"]}
            items={menuItems}
          />
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
