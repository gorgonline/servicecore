"use client";

/* ════════════════════════════════════════════════════════════════════════
 * ServiceCore — PanelShell (paylaşılan "chrome")
 *
 * Üst navbar + sidebar + CommandPalette tek yerde. Her panel sayfası bunu
 * sarar; içerik `children` olarak gelir.
 *
 * Kural:
 *   • SADECE @servicecoreui/ui + /wraps + /custom bileşenleri kullanılır.
 *   • İkonlar Carbon (@carbon/icons-react).
 *   • Renk/boşluk/radius YALNIZCA var(--sc-*) token'larından.
 *   • next/navigation bağımlılığı YOK — gezinme onNavigate callback'i ile.
 * ════════════════════════════════════════════════════════════════════════ */

import {
  Add,
  Asset,
  Book,
  Calendar,
  Catalog,
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
  Settings,
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
import { Brand } from "../../../components/Brand";
import { CommandPalette } from "../../../components/CommandPalette";
import { NotificationCenter } from "../../../components/NotificationCenter";
import type { NotificationItem } from "../../../components/NotificationCenter";
import { TimeTracker } from "../../../components/TimeTracker";
import type { TimerEntry } from "../../../components/TimeTracker";
import { UserMenu } from "../../../components/UserMenu";
import type { UserMenuItem, UserMenuAction } from "../../../components/UserMenu";
import { Avatar } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Dropdown } from "../../../components/Dropdown";
import { Menu } from "../../../components/Menu";
import type { MenuProps } from "../../../components/Menu";
import { Tooltip } from "../../../components/Tooltip";
import styles from "./PanelShell.module.css";

/* ────────────────────────────────────────────────
 * Tip tanımları
 * ──────────────────────────────────────────────── */

export interface PanelShellSearchConfig {
  recent: Array<{ key: string; label: string }>;
  filters: Array<{ key: string; label: string }>;
  placeholder?: string;
}

export interface PanelShellUserMenuConfig {
  name: string;
  email?: string;
  initials?: string;
  avatarSrc?: string;
  items?: UserMenuItem[];
  actions?: UserMenuAction[];
}

export interface PanelShellProps {
  children: ReactNode;
  /** Aktif kenar çubuğu item anahtarı. */
  activeNav?: string;
  /** Kenar çubuğu menü item'ları; verilmezse defaultPanelNav kullanılır. */
  navItems?: MenuProps["items"];
  /** "+ Yeni oluştur" dropdown menüsü; verilmezse defaultCreateMenu kullanılır. */
  createMenu?: MenuProps;
  /** Kullanıcı menüsü yapılandırması; verilmezse defaultUserMenuConfig kullanılır. */
  userMenu?: PanelShellUserMenuConfig;
  /** Bildirim merkezi aktiviteleri; verilmezse defaultNotifications kullanılır. */
  notifications?: NotificationItem[];
  /** Zaman makinesi başlangıç sayaçları; verilmezse defaultTimers kullanılır. */
  timers?: TimerEntry[];
  /** Komut paleti yapılandırması; verilmezse defaultSearchConfig kullanılır. */
  search?: PanelShellSearchConfig;
  /** Gezinme callback'i — next/navigation yerine. Ör. `router.push`. */
  onNavigate?: (path: string) => void;
  /** Aktif dil; verilmezse internal state ("tr") kullanılır. */
  lang?: "tr" | "en";
  /** Dil değişince çağrılır. */
  onLangChange?: (lang: "tr" | "en") => void;
}

/* ────────────────────────────────────────────────
 * Varsayılan veri (playground birebir görünümü için export)
 * ──────────────────────────────────────────────── */

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

export const defaultPanelNav: MenuProps["items"] = [
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

export const defaultCreateMenu: MenuProps = {
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

export const defaultUserMenuItems: UserMenuItem[] = [
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

export const defaultUserMenuActions: UserMenuAction[] = [
  { key: "kullanici", label: "Kullanıcı", icon: <User size={18} /> },
  { key: "baslangic", label: "Başlangıç", icon: <Home size={18} /> },
  { key: "cikis", label: "Çıkış Yap", icon: <Logout size={18} />, danger: true },
];

export const defaultUserMenuConfig: PanelShellUserMenuConfig = {
  name: "Ayşe Yıldız",
  email: "ayse.yildiz@servicecore.app",
  initials: "AY",
  items: defaultUserMenuItems,
  actions: defaultUserMenuActions,
};

export const defaultSearchConfig: PanelShellSearchConfig = {
  recent: [
    { key: "1", label: "SC-4127 — Print server bağlanamıyor" },
    { key: "2", label: "VPN yavaş — ev ofisi" },
    { key: "3", label: "Yeni kullanıcı AD entegrasyonu" },
  ],
  filters: [
    { key: "desc", label: "Açıklamada da ara" },
    { key: "closed", label: "Kapalı kayıtları dahil et" },
  ],
  placeholder: "Olay, istek, varlık, kişi ara…",
};

export const defaultTimers: TimerEntry[] = [
  { key: "telefon", name: "Telefon", seconds: 0, running: false },
  { key: "toplanti", name: "Toplantı", seconds: 5872878, running: true },
  { key: "test", name: "test", seconds: 60, running: false },
];

export const defaultNotifications: NotificationItem[] = [
  { key: "1", title: "SC-4127 güncellendi", description: "Durum: Beklemede → İşlemde", time: "5 dk" },
  { key: "2", title: "Yeni yorum — SC-4125", description: "Selin Koç: AD entegrasyonu tamam", time: "1 sa" },
  { key: "3", title: "SLA uyarısı — SC-4124", description: "Yanıt süresi aşıldı", time: "2 sa" },
];

/* ────────────────────────────────────────────────
 * Shell
 * ──────────────────────────────────────────────── */

export function PanelShell({
  children,
  activeNav,
  navItems,
  createMenu,
  userMenu,
  notifications,
  timers,
  search,
  onNavigate,
  lang: langProp,
  onLangChange,
}: PanelShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langInternal, setLangInternal] = useState<"tr" | "en">("tr");

  const lang = langProp ?? langInternal;
  const handleLangChange = (l: "tr" | "en") => {
    if (!langProp) setLangInternal(l);
    onLangChange?.(l);
  };

  const resolvedNav = navItems ?? defaultPanelNav;
  const resolvedCreateMenu = createMenu ?? defaultCreateMenu;
  const resolvedUserMenu = userMenu ?? defaultUserMenuConfig;
  const resolvedNotifications = notifications ?? defaultNotifications;
  const resolvedTimers = timers ?? defaultTimers;
  const resolvedSearch = search ?? defaultSearchConfig;

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
        <div
          className={styles.brandZone}
          style={{
            width: collapsed ? 64 : 240,
            justifyContent: collapsed ? "center" : "space-between",
            paddingLeft: collapsed ? 0 : "var(--sc-space-5)",
            paddingRight: collapsed ? 0 : "var(--sc-space-3)",
          }}
        >
          {collapsed ? null : <Brand />}
          <Tooltip title={collapsed ? "Menüyü genişlet" : "Menüyü daralt"} placement="right">
            <Button
              type="text"
              onClick={() => setCollapsed((c) => !c)}
              leadingIcon={
                collapsed ? <SidePanelOpen size={18} /> : <SidePanelClose size={18} />
              }
              aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
            />
          </Tooltip>
        </div>

        <div className={styles.spacer} />

        <div className={styles.utilities}>
          {/* 1 — Keşfet & oluştur */}
          <Tooltip title="Ara" placement="bottom">
            <Button
              type="text"
              leadingIcon={<Search size={18} />}
              aria-label="Ara"
              onClick={() => setSearchOpen(true)}
            />
          </Tooltip>
          <Dropdown menu={resolvedCreateMenu} trigger={["click"]} placement="bottomRight">
            <Button
              type="primary"
              shape="circle"
              leadingIcon={<Add size={18} />}
              aria-label="Yeni oluştur"
              title="Yeni oluştur"
            />
          </Dropdown>

          <span className={styles.navDivider} />

          {/* 2 — İş araçları */}
          <Tooltip title="Takvim" placement="bottom">
            <Button type="text" leadingIcon={<Calendar size={18} />} aria-label="Takvim" />
          </Tooltip>
          <Tooltip title="Ayarlar" placement="bottom">
            <Button
              type="text"
              leadingIcon={<Settings size={18} />}
              aria-label="Ayarlar"
              onClick={() => onNavigate?.("/ayarlar")}
            />
          </Tooltip>
          <TimeTracker initialTimers={resolvedTimers}>
            <Button
              type="text"
              leadingIcon={<Time size={18} />}
              aria-label="Zaman Makinesi"
              title="Zaman Makinesi"
            />
          </TimeTracker>

          <span className={styles.navDivider} />

          {/* 3 — Sistem & kişisel */}
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
              onClick: ({ key }) => handleLangChange(key as "tr" | "en"),
            }}
          >
            <Button
              type="text"
              leadingIcon={<Earth size={18} />}
              aria-label="Dil"
              title={lang === "tr" ? "Dil — Türkçe" : "Language — English"}
            />
          </Dropdown>
          <Tooltip title="Yardım" placement="bottom">
            <Button type="text" leadingIcon={<Help size={18} />} aria-label="Yardım" />
          </Tooltip>
          <NotificationCenter activities={resolvedNotifications}>
            <Button
              type="text"
              leadingIcon={
                <Badge dot offset={[-2, 4]}>
                  <NotificationIcon size={18} />
                </Badge>
              }
              aria-label="Bildirimler"
              title="Bildirimler"
            />
          </NotificationCenter>

          <span className={styles.navDivider} />

          {/* 4 — Hesap */}
          <UserMenu
            name={resolvedUserMenu.name}
            email={resolvedUserMenu.email}
            initials={resolvedUserMenu.initials}
            avatarSrc={resolvedUserMenu.avatarSrc}
            items={resolvedUserMenu.items}
            actions={resolvedUserMenu.actions}
          >
            <button
              type="button"
              className={styles.profile}
              aria-label={`Hesap menüsü — ${resolvedUserMenu.name}`}
              title="Hesap menüsü"
            >
              <Avatar size="small" tone="accent">
                {resolvedUserMenu.initials ?? "?"}
              </Avatar>
              <ChevronDown size={14} />
            </button>
          </UserMenu>
        </div>
      </header>

      {/* ── Body: sidebar + content ── */}
      <div className={styles.body}>
        <aside
          className={`${styles.sider} ${collapsed ? styles.siderCollapsed : ""}`}
          style={{ width: collapsed ? 64 : 240 }}
        >
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={activeNav ? [activeNav] : []}
            items={resolvedNav}
          />
        </aside>

        <main className={styles.content}>{children}</main>
      </div>

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        placeholder={resolvedSearch.placeholder ?? "Olay, istek, varlık, kişi ara…"}
        recent={resolvedSearch.recent}
        filters={resolvedSearch.filters}
      />
    </div>
  );
}
