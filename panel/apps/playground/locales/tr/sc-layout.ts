import type { ScLayoutKeys } from "@servicecoreui/ui";

/**
 * sc-layout namespace — Türkçe çeviriler (playground)
 *
 * satisfies ile derleme zamanında eksiksizlik doğrulanır.
 * Bu dosya YALNIZCA playground'a aittir; packages/ui'ye import edilmez.
 */
const scLayout = {
  logout: "Çıkış Yap",
  notifications: "Bildirimler",
  search: "Ara",
  profile: "Hesap menüsü",
  settings: "Ayarlar",
  help: "Yardım",
  menu: "Menüyü genişlet",
  closeMenu: "Menüyü daralt",
} satisfies ScLayoutKeys;

export default scLayout;
