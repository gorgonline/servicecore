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
  Calendar,
  Catalog,
  ChartColumn,
  ChevronDown,
  Cloud,
  DataBase,
  Debug,
  DocumentSigned,
  Export,
  Filter,
  Earth,
  Help,
  Logout,
  Notification as NotificationIcon,
  OverflowMenuVertical,
  Phone,
  RecentlyViewed,
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
import { useEffect, useState } from "react";
import { Heading, Text } from "@servicecoreui/ui";
import { Brand, CommandPalette } from "@servicecoreui/ui/custom";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Dropdown,
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
 * Komut paleti mock verisi
 * ──────────────────────────────────────────────── */

const SEARCH_RECENT = [
  { key: "1", label: "SC-4127 — Print server bağlanamıyor" },
  { key: "2", label: "VPN yavaş — ev ofisi" },
  { key: "3", label: "Yeni kullanıcı AD entegrasyonu" },
];

const SEARCH_FILTERS = [
  { key: "desc", label: "Açıklamada da ara" },
  { key: "closed", label: "Kapalı kayıtları dahil et" },
];

/* ────────────────────────────────────────────────
 * Sayfa
 * ──────────────────────────────────────────────── */

export default function ShellPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K — global arama paletini aç/kapa
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
        {/* müşteri logosu buraya: <Brand logoSrc="/musteri-logo.svg" name="..." /> */}
        <div className={styles.brand}>
          <Brand />
        </div>

        <div className={styles.spacer} />

        {/* Sağ araç kümesi — işlevsel gruplar, soldan sağa:
            [Keşfet&Oluştur] · [İş araçları] · [Sistem&kişisel] · [Hesap]
            En sık global eylemler başta; bildirim profile bitişik (konvansiyon). */}
        <div className={styles.utilities}>
          {/* 1 — Keşfet & oluştur */}
          <Button
            type="text"
            leadingIcon={<Search size={18} />}
            aria-label="Ara"
            onClick={() => setSearchOpen(true)}
          />
          <Button
            type="primary"
            shape="circle"
            leadingIcon={<Add size={18} />}
            aria-label="Yeni oluştur"
          />

          <span className={styles.navDivider} />

          {/* 2 — İş araçları */}
          <Button type="text" leadingIcon={<Calendar size={18} />} aria-label="Takvim" />
          <Button type="text" leadingIcon={<ChartColumn size={18} />} aria-label="Raporlar" />
          <Button
            type="text"
            leadingIcon={<RecentlyViewed size={18} />}
            aria-label="Son işlemler"
          />

          <span className={styles.navDivider} />

          {/* 3 — Sistem & kişisel */}
          <Button type="text" leadingIcon={<Earth size={18} />} aria-label="Dil" />
          <Button type="text" leadingIcon={<Help size={18} />} aria-label="Yardım" />
          <Badge dot>
            <Button
              type="text"
              leadingIcon={<NotificationIcon size={18} />}
              aria-label="Bildirimler"
            />
          </Badge>

          <span className={styles.navDivider} />

          {/* 4 — Hesap */}
          <Dropdown menu={profileMenu} trigger={["click"]} placement="bottomRight">
            <button type="button" className={styles.profile}>
              <Avatar size="small" tone="accent">
                AY
              </Avatar>
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

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        placeholder="Olay, istek, varlık, kişi ara…"
        recent={SEARCH_RECENT}
        filters={SEARCH_FILTERS}
      />
    </div>
  );
}
