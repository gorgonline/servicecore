"use client";

/* ════════════════════════════════════════════════════════════════════════
 * ServiceCore — PanelShell (paylaşılan "chrome")
 *
 * Üst navbar + sidebar + CommandPalette tek yerde. Her panel sayfası bunu
 * sarar; içerik `children` olarak gelir. (shell/page.tsx ve kayitlar/page.tsx
 * ortak kullanır → DRY.)
 *
 * Kural:
 *   • SADECE @servicecoreui/ui + /wraps bileşenleri kullanılır.
 *   • İkonlar Carbon (@carbon/icons-react).
 *   • Renk/boşluk/radius YALNIZCA var(--sc-*) token'larından.
 *   • Hardcoded hex/px YOK (yalnız frame layout ölçüleri token).
 *   • antd DOĞRUDAN import edilmez. (Frame L-şekli için Layout wrap'i henüz yok
 *     → semantic HTML + CSS Module ile kuruldu; gerisi tamamen bileşen.)
 * ════════════════════════════════════════════════════════════════════════ */

import {
  Add,
  Asset,
  Book,
  Calendar,
  Catalog,
  ChartColumn,
  Chat,
  CheckmarkOutline,
  ChevronDown,
  Cloud,
  DataBase,
  Debug,
  DocumentSigned,
  Earth,
  Help,
  Home,
  Idea,
  Logout,
  Notebook,
  Notification as NotificationIcon,
  Phone,
  Renew,
  RequestQuote,
  Roadmap,
  Search,
  SidePanelClose,
  SidePanelOpen,
  Task,
  Time,
  User,
  UserMultiple,
  WarningAlt,
} from "@carbon/icons-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Brand,
  CommandPalette,
  NotificationCenter,
  TimeTracker,
  UserMenu,
} from "@servicecoreui/ui/custom";
import { Avatar, Badge, Button, Dropdown, Menu } from "@servicecoreui/ui/wraps";
import type { MenuProps } from "@servicecoreui/ui/wraps";
import styles from "./PanelShell.module.css";

/* ────────────────────────────────────────────────
 * Nav — ServiceCore'un gerçek üst-menü modülleri (mevcut panelden birebir).
 * Düz liste; uydurma grup / sahte rozet-sayı YOK. Her item'da `title` →
 * collapsed (icon-only) modda AntD hover tooltip'i bu string'den üretir.
 * İkonlar Carbon (@carbon/icons-react).
 * ──────────────────────────────────────────────── */

// Label + sağa yaslı count badge — sadece iş-kuyruğu modüllerinde (anlamlı sayı).
// tone: "neutral" = bilgilendirici sayı (gri); "danger" = dikkat gereken kuyruk (kırmızı).
// Hepsini kırmızı yapmak yanlış — kırmızı yalnız gerçekten acil olana (Olay = SLA-kritik).
function menuLabel(text: string, count: number, tone: "neutral" | "danger" = "neutral") {
  return (
    <span className={styles.menuLabel}>
      <span className={styles.menuLabelText}>{text}</span>
      <Badge
        count={count}
        overflowCount={99}
        size="small"
        className={tone === "danger" ? styles.menuBadgeDanger : styles.menuBadgeNeutral}
      />
    </span>
  );
}

const menuItems: MenuProps["items"] = [
  { key: "gorev", icon: <Task />, label: menuLabel("Görev", 7), title: "Görev" },
  { key: "cagri", icon: <Phone />, label: menuLabel("Çağrı", 12), title: "Çağrı" },
  { key: "olay", icon: <WarningAlt />, label: menuLabel("Olay", 148, "danger"), title: "Olay" },
  { key: "problem", icon: <Debug />, label: menuLabel("Problem", 3), title: "Problem" },
  { key: "istek", icon: <RequestQuote />, label: menuLabel("İstek", 24), title: "İstek" },
  { key: "katalog", icon: <Catalog />, label: "Katalog", title: "Katalog" },
  { key: "degisiklik", icon: <Renew />, label: menuLabel("Değişiklik", 5), title: "Değişiklik" },
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

// Kullanıcı menüsü — "bana atanan kayıtlar" + footer aksiyonları
const USER_ITEMS = [
  { key: "gorev", icon: <Task size={20} />, title: "Görevlerim", description: "Görev Detaylarım" },
  { key: "etkilesim", icon: <Chat size={20} />, title: "Etkileşim Kayıtlarım", description: "Bana Atanan Etkileşimler" },
  { key: "olay", icon: <WarningAlt size={20} />, title: "Olay Kayıtlarım", description: "Bana Atanan Olaylar" },
  { key: "problem", icon: <Debug size={20} />, title: "Problem Kayıtlarım", description: "Bana Atanan Problemler" },
  { key: "istek", icon: <RequestQuote size={20} />, title: "İstek Kayıtlarım", description: "Bana Atanan İstekler" },
  { key: "degisim", icon: <Renew size={20} />, title: "Değişimlerim", description: "Bana Atanan Değişiklikler" },
  { key: "iyilestirme", icon: <Idea size={20} />, title: "İyileştirmelerim", description: "Bana Atanan İyileştirmeler" },
  { key: "onay", icon: <CheckmarkOutline size={20} />, title: "Onaylarım", description: "Onaylarım Açıklama" },
  { key: "varlik", icon: <Asset size={20} />, title: "Varlıklarım", description: "Bana Atanan Varlıklar" },
  { key: "hizmet", icon: <Catalog size={20} />, title: "Hizmetlerim", description: "Bana Atanan Hizmetler" },
];

const USER_ACTIONS = [
  { key: "kullanici", label: "Kullanıcı", icon: <User size={18} /> },
  { key: "baslangic", label: "Başlangıç", icon: <Home size={18} /> },
  { key: "cikis", label: "Çıkış Yap", icon: <Logout size={18} />, danger: true },
];

/* + (hızlı oluştur) menüsü — navbar Add butonuna bağlı. Carbon ikonlar. */
const createMenu: MenuProps = {
  items: [
    {
      key: "create",
      type: "group",
      label: "Yeni oluştur",
      children: [
        { key: "is-gunlugu", icon: <Notebook />, label: "İş Günlüğü" },
        { key: "gorev", icon: <Task />, label: "Görev" },
        { key: "cagri", icon: <Phone />, label: "Çağrı" },
        { key: "olay", icon: <WarningAlt />, label: "Olay" },
        { key: "problem", icon: <Debug />, label: "Problem" },
        { key: "istek", icon: <RequestQuote />, label: "İstek" },
        { key: "degisiklik", icon: <Renew />, label: "Değişiklik" },
        { key: "bilgi", icon: <Book />, label: "Bilgi" },
        { key: "iyilestirme", icon: <Idea />, label: "İyileştirme" },
        { key: "varlik", icon: <Asset />, label: "Varlık" },
        { key: "sozlesme", icon: <DocumentSigned />, label: "Sözleşme" },
        { key: "proje", icon: <Roadmap />, label: "Proje" },
      ],
    },
  ],
};

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

// Zaman Makinesi mock sayaçları (1631:21:18 = 5.872.878 sn)
const TIMERS = [
  { key: "telefon", name: "Telefon", seconds: 0, running: false },
  { key: "toplanti", name: "Toplantı", seconds: 5872878, running: true },
  { key: "test", name: "test", seconds: 60, running: false },
];

// Bildirim merkezi mock — Etkinlikler boş, Aktivite Kayıtları dolu
const NOTIF_ACTIVITIES = [
  { key: "1", title: "SC-4127 güncellendi", description: "Durum: Beklemede → İşlemde", time: "5 dk" },
  { key: "2", title: "Yeni yorum — SC-4125", description: "Selin Koç: AD entegrasyonu tamam", time: "1 sa" },
  { key: "3", title: "SLA uyarısı — SC-4124", description: "Yanıt süresi aşıldı", time: "2 sa" },
];

/* ────────────────────────────────────────────────
 * Shell
 * ──────────────────────────────────────────────── */

export interface PanelShellProps {
  children: ReactNode;
  activeNav?: string;
}

export function PanelShell({ children, activeNav }: PanelShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lang, setLang] = useState<"tr" | "en">("tr");

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
        {/* Marka zonu — sidebar genişliğinde (240/64). Expanded'da logo solda,
            toggle sağda (border-right sidebar çizgisini yukarı uzatır → toggle çizgiyle
            hizalı). Collapsed'da sadece toggle, ortada (alttaki ikon koloyla hizalı).
            müşteri logosu: <Brand logoSrc="/musteri-logo.svg" name="..." /> */}
        <div
          className={styles.brandZone}
          style={{
            width: collapsed ? 64 : 240,
            justifyContent: collapsed ? "center" : "space-between",
            // expanded: logo sidebar ikonlarıyla hizalı başlasın (8 margin + 12 padding = 20px)
            // collapsed: padding 0 → toggle ortada (32px), alttaki ikon koloyla hizalı
            paddingLeft: collapsed ? 0 : "var(--sc-space-5)",
            paddingRight: collapsed ? 0 : "var(--sc-space-3)",
          }}
        >
          {collapsed ? null : <Brand />}
          <Button
            type="text"
            onClick={() => setCollapsed((c) => !c)}
            leadingIcon={
              collapsed ? <SidePanelOpen size={18} /> : <SidePanelClose size={18} />
            }
            aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          />
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
          <Dropdown menu={createMenu} trigger={["click"]} placement="bottomRight">
            <Button
              type="primary"
              shape="circle"
              leadingIcon={<Add size={18} />}
              aria-label="Yeni oluştur"
            />
          </Dropdown>

          <span className={styles.navDivider} />

          {/* 2 — İş araçları */}
          <Button type="text" leadingIcon={<Calendar size={18} />} aria-label="Takvim" />
          <Button type="text" leadingIcon={<ChartColumn size={18} />} aria-label="Raporlar" />
          <TimeTracker initialTimers={TIMERS}>
            <Button
              type="text"
              leadingIcon={<Time size={18} />}
              aria-label="Zaman Makinesi"
            />
          </TimeTracker>

          <span className={styles.navDivider} />

          {/* 3 — Sistem & kişisel */}
          {/* Dil — selectable Dropdown (aktif dil işaretli); overlay tetikleyicisi
              olduğu için Tooltip yerine native title. */}
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            menu={{
              selectable: true,
              selectedKeys: [lang],
              items: [
                { key: "tr", label: "Türkçe" },
                { key: "en", label: "English" },
              ],
              onClick: ({ key }) => setLang(key as "tr" | "en"),
            }}
          >
            <Button
              type="text"
              leadingIcon={<Earth size={18} />}
              aria-label="Dil"
              title={lang === "tr" ? "Dil — Türkçe" : "Language — English"}
            />
          </Dropdown>
          <Button type="text" leadingIcon={<Help size={18} />} aria-label="Yardım" />
          <NotificationCenter activities={NOTIF_ACTIVITIES}>
            <Button
              type="text"
              leadingIcon={
                <Badge dot offset={[-2, 4]}>
                  <NotificationIcon size={18} />
                </Badge>
              }
              aria-label="Bildirimler"
            />
          </NotificationCenter>

          <span className={styles.navDivider} />

          {/* 4 — Hesap */}
          <UserMenu
            name="Ayşe Yıldız"
            email="ayse.yildiz@servicecore.app"
            initials="AY"
            items={USER_ITEMS}
            actions={USER_ACTIONS}
          >
            <button type="button" className={styles.profile}>
              <Avatar size="small" tone="accent">
                AY
              </Avatar>
              <ChevronDown size={14} />
            </button>
          </UserMenu>
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
            selectedKeys={activeNav ? [activeNav] : []}
            items={menuItems}
          />
        </aside>

        <main className={styles.content}>{children}</main>
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
