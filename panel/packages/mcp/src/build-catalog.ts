/**
 * Build-time scanner — packages/ui/src/ klasörünü tarar,
 * her component için spec'i çıkarır, dist/catalog.json üretir.
 *
 * Çıktı: { components: { Button: { source, types?, css?, description } }, tokens, version }
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MCP_ROOT = path.resolve(__dirname, "..");
const UI_SRC = path.resolve(MCP_ROOT, "../ui/src");
const APP = path.resolve(MCP_ROOT, "../../apps/playground/app");
const UI_PKG = JSON.parse(
  fs.readFileSync(path.resolve(MCP_ROOT, "../ui/package.json"), "utf-8"),
) as { version: string; name: string };

interface ComponentSpec {
  name: string;
  source: string;
  types?: string;
  css?: string;
  description: string;
}

interface PageFile {
  path: string;
  content: string;
}

interface PageBundle {
  name: string;
  title: string;
  route: string;
  description: string;
  files: PageFile[];
}

interface Catalog {
  uiPackage: string;
  uiVersion: string;
  generatedAt: string;
  components: Record<string, ComponentSpec>;
  pages: Record<string, PageBundle>;
  pageInstall: string;
  tokens: string;
  rules: string;
}

function extractDescription(source: string): string {
  const match = source.match(/\/\*\*\s*([\s\S]*?)\*\//);
  if (!match || !match[1]) return "";
  return match[1]
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, "").trim())
    .filter((l) => l.length > 0 && !l.startsWith("@"))
    .join(" ")
    .slice(0, 300);
}

/** Tek bir klasörden (<dir>/<name>.tsx + opsiyonel .types.ts/.module.css) spec çıkar. */
function specFromDir(dir: string, name: string): ComponentSpec | null {
  const tsxPath = path.join(dir, `${name}.tsx`);
  if (!fs.existsSync(tsxPath)) return null;

  const typesPath = path.join(dir, `${name}.types.ts`);
  const cssPath = path.join(dir, `${name}.module.css`);
  const source = fs.readFileSync(tsxPath, "utf-8");
  const types = fs.existsSync(typesPath) ? fs.readFileSync(typesPath, "utf-8") : undefined;
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf-8") : undefined;

  const spec: ComponentSpec = {
    name,
    source,
    description: extractDescription(types ?? source),
  };
  if (types !== undefined) spec.types = types;
  if (css !== undefined) spec.css = css;
  return spec;
}

function scanComponents(): Record<string, ComponentSpec> {
  const components: Record<string, ComponentSpec> = {};

  const add = (dir: string, name: string) => {
    const spec = specFromDir(dir, name);
    if (spec) components[name] = spec;
  };

  for (const entry of fs.readdirSync(UI_SRC, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!/^[A-Z]/.test(entry.name)) continue;
    if (entry.name === "theme") continue;

    const dir = path.join(UI_SRC, entry.name);
    // 1) Top-level bileşen: src/<Ad>/<Ad>.tsx
    add(dir, entry.name);

    // 2) Nested bileşenler: src/<Kapsayıcı>/<Alt>/<Alt>.tsx (ör. Charts/BarChart).
    //    Scanner tek seviye iner; kapsayıcının kendi .tsx'i yoksa (Charts gibi) yalnız alt'lar girer.
    for (const sub of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!sub.isDirectory()) continue;
      if (!/^[A-Z]/.test(sub.name)) continue;
      add(path.join(dir, sub.name), sub.name);
    }
  }

  return components;
}

function readTokens(): string {
  const tokensPath = path.join(UI_SRC, "theme", "tokens.css");
  if (!fs.existsSync(tokensPath)) return "";
  return fs.readFileSync(tokensPath, "utf-8");
}

function readRules(): string {
  const rulesPath = path.resolve(MCP_ROOT, "design-rules.md");
  if (!fs.existsSync(rulesPath)) return "";
  return fs.readFileSync(rulesPath, "utf-8");
}

/* ── Sayfa dağıtımı (get_page) ────────────────────────────────────────────
 * Sayfalar bileşen değil; kaynak-kod ŞABLON olarak dağıtılır (shadcn mantığı).
 * Her sayfa = kendi dosyaları + paylaşılan blok dosyaları. Yollar app/ köküne
 * görelidir; consumer bu yapıyı kurar ve mock veriyi gerçek API/DTO'ya bağlar. */

const PAGE_INSTALL = [
  "## Kurulum",
  "1. Paketi kur: `npm i @servicecoreui/ui` — peer: `antd@^5.7`, `react`, `react-dom`.",
  '2. App entry\'de bir kez: `import "@servicecoreui/ui/styles.css";`',
  '3. İkonlar paketten gelir: `import { Add } from "@servicecoreui/ui/icons";`',
  "4. Aşağıdaki dosyaları repona kopyala (yollar `app/` köküne göre).",
  "5. Mock veri / placeholder handler'ları gerçek API + DTO'ya bağla (`value` / `onChange` / `options`).",
].join("\n");

/** Paylaşılan blok dosyaları (birden çok sayfanın kullandığı yerel yapıtaşları). */
const BLOCKS: Record<string, string[]> = {
  authStyles: ["giris/giris.module.css"],
  AuthShell: ["_components/AuthShell.tsx", "_components/AuthShell.module.css"],
  PasswordChecklist: ["_components/PasswordChecklist.tsx", "_components/PasswordChecklist.module.css"],
  SystemMessage: ["_components/SystemMessage.tsx", "_components/SystemMessage.module.css"],
  PanelShell: ["_components/PanelShell.tsx", "_components/PanelShell.module.css"],
  SettingsForm: ["ayarlar/_components/SettingsForm.tsx", "ayarlar/_components/SettingsForm.module.css"],
  recentPanels: ["_data/recentPanels.ts"],
};

interface PageDef {
  name: string;
  title: string;
  route: string;
  description: string;
  files: string[];
  blocks: string[];
}

const PAGES: PageDef[] = [
  // ── Auth akışı ──
  { name: "login", title: "Giriş (Login)", route: "/giris", description: "Split-screen login — e-posta/şifre + captcha + Google/SSO. AuthShell + form.", files: ["giris/page.tsx"], blocks: ["authStyles", "AuthShell"] },
  { name: "sifremi-unuttum", title: "Şifremi Unuttum", route: "/sifremi-unuttum", description: "Parola sıfırlama isteği (e-posta).", files: ["sifremi-unuttum/page.tsx"], blocks: ["authStyles", "AuthShell"] },
  { name: "sifre-link-gonderildi", title: "Bağlantı Gönderildi", route: "/sifre-link-gonderildi", description: "Sıfırlama e-postası gönderildi onay ekranı.", files: ["sifre-link-gonderildi/page.tsx"], blocks: ["authStyles", "AuthShell"] },
  { name: "sifre-sifirla", title: "Şifre Sıfırla", route: "/sifre-sifirla", description: "Yeni şifre + tekrar + canlı parola kuralları (PasswordChecklist).", files: ["sifre-sifirla/page.tsx"], blocks: ["authStyles", "AuthShell", "PasswordChecklist"] },
  { name: "sifre-degistir", title: "Şifre Değiştir", route: "/sifre-degistir", description: "Mevcut + yeni şifre + kurallar.", files: ["sifre-degistir/page.tsx"], blocks: ["authStyles", "AuthShell", "PasswordChecklist"] },
  { name: "2fa", title: "2FA — Kod", route: "/2fa", description: "İki adımlı doğrulama kodu girişi.", files: ["2fa/page.tsx"], blocks: ["authStyles", "AuthShell"] },
  { name: "2fa-qr", title: "2FA — QR Kurulum", route: "/2fa-qr", description: "Authenticator QR kurulumu + kod.", files: ["2fa-qr/page.tsx"], blocks: ["authStyles", "AuthShell"] },
  { name: "kayit", title: "Kayıt (Register)", route: "/kayit", description: "Hesap oluşturma + parola kuralları.", files: ["kayit/page.tsx"], blocks: ["authStyles", "AuthShell", "PasswordChecklist"] },
  { name: "yetkisiz", title: "Yetkisiz (403)", route: "/yetkisiz", description: "Erişim reddedildi ekranı.", files: ["yetkisiz/page.tsx"], blocks: ["authStyles", "AuthShell"] },
  // ── Sistem ──
  { name: "404", title: "404 — Bulunamadı", route: "(not-found)", description: "Next not-found.tsx — tam-ekran 404.", files: ["not-found.tsx"], blocks: ["SystemMessage"] },
  { name: "500", title: "500 — Error Boundary", route: "(error)", description: "Next error.tsx — hata sınırı (reset + ana sayfa).", files: ["error.tsx"], blocks: ["SystemMessage"] },
  // ── Panel + Ayarlar ──
  { name: "pano", title: "Pano (Dashboard)", route: "/pano", description: "Dashboard — KPI Statistic + chart'lar + widget grid. PanelShell içinde.", files: ["pano/page.tsx", "pano/pano.module.css"], blocks: ["PanelShell", "recentPanels"] },
  { name: "kayitlar", title: "Kayıtlar (DataTable)", route: "/kayitlar", description: "Kayıt tarayıcısı — DataTable (sıralama/filtre/kolon). PanelShell içinde.", files: ["kayitlar/page.tsx", "kayitlar/kayitlar.module.css"], blocks: ["PanelShell"] },
  { name: "ayarlar", title: "Ayarlar (Liste)", route: "/ayarlar", description: "Ayar kategorileri — NavCard grid + arama. PanelShell içinde.", files: ["ayarlar/page.tsx", "ayarlar/ayarlar.module.css", "ayarlar/settings.json"], blocks: ["PanelShell", "recentPanels"] },
  { name: "genel-ayarlar", title: "Genel Ayarlar (Detay)", route: "/ayarlar/genel-ayarlar", description: "Ayar detayı — data-driven SettingsForm (5 sekme, 11 alan tipi, koşullu alanlar, sol açılır nav + arama).", files: ["ayarlar/genel-ayarlar/page.tsx", "ayarlar/genel-ayarlar/genel-ayarlar.module.css", "ayarlar/genel-ayarlar/fields.ts"], blocks: ["PanelShell", "SettingsForm", "recentPanels"] },
];

function scanPages(): Record<string, PageBundle> {
  const pages: Record<string, PageBundle> = {};
  for (const p of PAGES) {
    const rels = Array.from(new Set([...p.files, ...p.blocks.flatMap((b) => BLOCKS[b] ?? [])]));
    const files: PageFile[] = [];
    for (const rel of rels) {
      const full = path.join(APP, rel);
      if (!fs.existsSync(full)) {
        console.warn(`[mcp] UYARI: sayfa dosyası bulunamadı: ${rel} (${p.name})`);
        continue;
      }
      files.push({ path: rel, content: fs.readFileSync(full, "utf-8") });
    }
    pages[p.name] = {
      name: p.name,
      title: p.title,
      route: p.route,
      description: p.description,
      files,
    };
  }
  return pages;
}

const catalog: Catalog = {
  uiPackage: UI_PKG.name,
  uiVersion: UI_PKG.version,
  generatedAt: "build-time",
  components: scanComponents(),
  pages: scanPages(),
  pageInstall: PAGE_INSTALL,
  tokens: readTokens(),
  rules: readRules(),
};

const distDir = path.resolve(MCP_ROOT, "dist");
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const out = path.join(distDir, "catalog.json");
fs.writeFileSync(out, JSON.stringify(catalog, null, 2));

console.log(
  `[mcp] catalog written: ${Object.keys(catalog.components).length} components, ${Object.keys(catalog.pages).length} pages, ${(JSON.stringify(catalog).length / 1024).toFixed(1)}kB`,
);
