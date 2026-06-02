/**
 * Docs navigasyon haritası — tek kaynak.
 *
 * Hem sol sidebar (DocsShell) hem "Başlarken" ana sayfasındaki hızlı linkler
 * buradan beslenir. İkon YOK — bilinçli: dokümantasyon sidebar'ı metin-temelli
 * ve taranabilir kalsın (AntD/Carbon/shadcn docs deseni).
 *
 * Gruplama mevcut katalogla birebir korundu (Foundations → Feedback).
 */

export type NavItem = {
  name: string;
  href: string;
  desc: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Foundations",
    items: [
      { name: "Tokens", href: "/tokens", desc: "Renk, radius, spacing, type" },
      { name: "Typography", href: "/typography", desc: "Heading, Display, Text, Eyebrow" },
    ],
  },
  {
    // ServiceCore'a özel, sıfırdan kurulan bileşenler — AntD wrap DEĞİL.
    // Paket karşılığı: @servicecoreui/ui/custom
    label: "ServiceCore Özel",
    items: [
      { name: "Brand", href: "/brand", desc: "Logo + marka adı — white-label (logoSrc)" },
      { name: "Kbd", href: "/kbd", desc: "Klavye tuşu rozeti — kısayol ipuçları" },
      { name: "ListItem", href: "/list-item", desc: "İkon + başlık + açıklama satırı (paylaşılan)" },
      { name: "CommandPalette", href: "/command-palette", desc: "Global arama / komut paleti (⌘K)" },
      { name: "TimeTracker", href: "/time-tracker", desc: "Zaman Makinesi — isimli sayaçlar" },
      { name: "NotificationCenter", href: "/notification-center", desc: "Bildirim merkezi — sekmeli, Empty" },
      { name: "UserMenu", href: "/user-menu", desc: "Kullanıcı menüsü — header + liste + aksiyonlar" },
    ],
  },
  {
    label: "Layout",
    items: [
      { name: "Flex", href: "/flex", desc: "Block-level flex helper" },
      { name: "Divider", href: "/dividers", desc: "Bölücü çizgi (yatay/dikey)" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { name: "Anchor", href: "/anchors", desc: "Scroll spy — section TOC" },
      { name: "Breadcrumb", href: "/breadcrumbs", desc: "Sayfa hiyerarşisi" },
      { name: "Dropdown", href: "/dropdowns", desc: "Trigger'a bağlı menü, split, context" },
      { name: "Menu", href: "/menus", desc: "Persistent nav — sider, top nav, popup" },
      { name: "Steps", href: "/steps", desc: "Yaşam döngüsü, wizard, onay akışı" },
      { name: "Tabs", href: "/tabs", desc: "Peer-level sekme" },
    ],
  },
  {
    label: "Display",
    items: [
      { name: "Card", href: "/cards", desc: "Widget, form section, list item" },
      { name: "Tag", href: "/tags", desc: "Status, kategori etiketi" },
      { name: "Badge", href: "/badges", desc: "Sayı/dot/ribbon overlay" },
      { name: "Avatar", href: "/avatars", desc: "Image, initials, icon" },
    ],
  },
  {
    label: "Form",
    items: [
      { name: "Button", href: "/buttons", desc: "5 type + danger + size" },
      { name: "FloatButton", href: "/float-buttons", desc: "Sabit buton + Group + BackTop" },
      { name: "Input", href: "/inputs", desc: "Text, Search, Password, TextArea" },
      { name: "Select", href: "/selects", desc: "Single, multiple, tags, search" },
      { name: "Checkbox", href: "/checkboxes", desc: "Çoklu seçim, indeterminate, Group" },
      { name: "ColorPicker", href: "/color-picker", desc: "Tag/kategori rengi, preset paletler" },
      { name: "DatePicker", href: "/date-picker", desc: "Tarih + saat + range, presets" },
      { name: "Form", href: "/form", desc: "useForm, validation, Form.List, useWatch" },
      { name: "InputNumber", href: "/input-number", desc: "Sayısal input — min/max/step" },
      { name: "Mentions", href: "/mentions", desc: "@ kişi / # kanal tag'leme" },
      { name: "Radio", href: "/radio", desc: "Tek seçim, Group, button mode" },
      { name: "Rate", href: "/rate", desc: "Yıldız rating — CSAT, allowHalf" },
      { name: "Slider", href: "/slider", desc: "Sürekli/range değer — threshold, marks" },
      { name: "Switch", href: "/switch", desc: "Binary on/off — anlık settings" },
      { name: "TimePicker", href: "/time-picker", desc: "Saat seçimi + range, format, step" },
      { name: "Transfer", href: "/transfer", desc: "İki kolonlu item taşıma" },
      { name: "TreeSelect", href: "/tree-select", desc: "Hiyerarşik select — kategori, org" },
      { name: "Upload", href: "/upload", desc: "Dosya yükleme — Dragger, picture-card" },
      { name: "Calendar", href: "/calendar", desc: "Takvim widget'ı — etkinlik göstergesi" },
      { name: "Carousel", href: "/carousel", desc: "Slide rotasyonu — splash, KPI, onboarding" },
      { name: "Collapse", href: "/collapse", desc: "Accordion / açılır panel — FAQ, settings" },
      { name: "Descriptions", href: "/descriptions", desc: "Tek nesne key-value detay" },
      { name: "Empty", href: "/empty", desc: "Boş durum — veri yok, no result, CTA" },
      { name: "Image", href: "/image", desc: "Resim + preview (zoom/rotate), fallback" },
      { name: "QRCode", href: "/qr-code", desc: "QR kod — login, 2FA, asset tag" },
      { name: "Segmented", href: "/segmented", desc: "Segmented control — view/range switcher" },
      { name: "Statistic", href: "/statistic", desc: "Sayısal KPI — dashboard, countdown" },
      { name: "Table", href: "/table", desc: "ITSM omurgası — sort/filter/pagination" },
      { name: "Timeline", href: "/timeline", desc: "Dikey aktivite log — activity, RCA" },
      { name: "Tree", href: "/tree", desc: "Hiyerarşik widget — asset, permission" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { name: "Alert", href: "/alerts", desc: "Persistent uyarı/info kutusu" },
      { name: "Popover", href: "/popover", desc: "Title + content + action" },
      { name: "Tooltip", href: "/tooltip", desc: "Sade ipucu — icon button, kısaltma" },
      { name: "Drawer", href: "/drawer", desc: "Yandan açılır panel — bilet detay, filter" },
      { name: "Message", href: "/message", desc: "Toast/snackbar — kısa feedback" },
      { name: "Modal", href: "/modal", desc: "Merkezi diyalog — confirm, form, detay" },
      { name: "Notification", href: "/notification", desc: "Köşede bildirim — title + desc + action" },
      { name: "Popconfirm", href: "/popconfirm", desc: "Inline confirm popup — row delete" },
      { name: "Progress", href: "/progress", desc: "İlerleme — line / circle / dashboard" },
      { name: "Result", href: "/result", desc: "Akış sonucu — success / 404 / 403 / 500" },
      { name: "Skeleton", href: "/skeleton", desc: "Yer tutucu iskelet — loading" },
      { name: "Spin", href: "/spin", desc: "Süre belirsiz loading — overlay" },
    ],
  },
];

/** Toplam bileşen sayısı — "Başlarken" sayfasındaki rozet için. */
export const componentCount = navGroups.reduce((n, g) => n + g.items.length, 0);
