/**
 * Build-time scanner — packages/ui/src/ klasörünü tarar,
 * her component için spec'i çıkarır, dist/catalog.json üretir.
 *
 * Tarama kökleri:
 *   - components/<Ad>/<Ad>.tsx (+ bir seviye nested: components/Charts/BarChart)
 *   - features/auth/<Ad>/<Ad>.tsx  → kind: "feature"
 *   - features/layout/<Ad>/<Ad>.tsx → kind: "feature"
 *
 * Çıktı: { components: { Button: { source, types?, css?, description, kind } }, i18n, tokens, version }
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
  kind: "primitive" | "feature";
  i18nKeys?: string;
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
  i18n: string;
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
function specFromDir(
  dir: string,
  name: string,
  kind: "primitive" | "feature",
  i18nKeys?: string,
): ComponentSpec | null {
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
    kind,
  };
  if (types !== undefined) spec.types = types;
  if (css !== undefined) spec.css = css;
  if (i18nKeys !== undefined) spec.i18nKeys = i18nKeys;
  return spec;
}

// ── i18n sözleşmesi (statik) ──────────────────────────────────────────────
const I18N_CONTRACT = `## i18n Key Sözleşmesi

Namespace: \`sc-\` (tüm anahtarlar bu prefix ile başlar)

### ScAuthKeys — Kimlik doğrulama bileşenleri

| Anahtar Grubu     | Bileşen               | Örnek Anahtar                          |
|-------------------|-----------------------|----------------------------------------|
| \`sc-login\`        | LoginForm             | \`sc-login.email\`, \`sc-login.password\`, \`sc-login.submit\` |
| \`sc-forgot\`       | ForgotPasswordForm    | \`sc-forgot.email\`, \`sc-forgot.submit\`, \`sc-forgot.back\` |
| \`sc-reset\`        | ResetPasswordForm     | \`sc-reset.newPassword\`, \`sc-reset.confirm\`, \`sc-reset.submit\` |
| \`sc-change\`       | ChangePasswordForm    | \`sc-change.current\`, \`sc-change.new\`, \`sc-change.confirm\` |
| \`sc-2fa\`          | TwoFactorForm         | \`sc-2fa.code\`, \`sc-2fa.submit\`, \`sc-2fa.resend\` |
| \`sc-2fa-setup\`    | TwoFactorSetup        | \`sc-2fa-setup.scan\`, \`sc-2fa-setup.code\`, \`sc-2fa-setup.verify\` |
| \`sc-register\`     | RegisterForm          | \`sc-register.name\`, \`sc-register.email\`, \`sc-register.password\` |

### ScLayoutKeys — Panel iskelet bileşenleri

| Anahtar Grubu     | Bileşen               | Örnek Anahtar                          |
|-------------------|-----------------------|----------------------------------------|
| \`sc-panel\`        | PanelShell            | \`sc-panel.nav.*\`, \`sc-panel.user.*\`, \`sc-panel.logout\` |
| \`sc-error\`        | ErrorPage             | \`sc-error.title\`, \`sc-error.description\`, \`sc-error.retry\` |

### Kullanım

Tüketici uygulamada kendi sözlüğünde \`sc-\` anahtarlarını tanımlar:

\`\`\`ts
// i18n/tr.json
{
  "sc-login": {
    "email": "E-posta",
    "password": "Şifre",
    "submit": "Giriş Yap"
  }
}
\`\`\`
`;

// Feature bileşenlerine ait i18n key blokları
const AUTH_I18N_KEYS: Record<string, string> = {
  LoginForm: `**i18n Keys (ScAuthKeys — \`sc-login\` grubu):**\n\`sc-login.email\` · \`sc-login.password\` · \`sc-login.submit\` · \`sc-login.forgot\` · \`sc-login.sso\``,
  ForgotPasswordForm: `**i18n Keys (ScAuthKeys — \`sc-forgot\` grubu):**\n\`sc-forgot.email\` · \`sc-forgot.submit\` · \`sc-forgot.back\` · \`sc-forgot.sent\``,
  ResetPasswordForm: `**i18n Keys (ScAuthKeys — \`sc-reset\` grubu):**\n\`sc-reset.newPassword\` · \`sc-reset.confirm\` · \`sc-reset.submit\` · \`sc-reset.rules\``,
  ChangePasswordForm: `**i18n Keys (ScAuthKeys — \`sc-change\` grubu):**\n\`sc-change.current\` · \`sc-change.new\` · \`sc-change.confirm\` · \`sc-change.submit\``,
  TwoFactorForm: `**i18n Keys (ScAuthKeys — \`sc-2fa\` grubu):**\n\`sc-2fa.code\` · \`sc-2fa.submit\` · \`sc-2fa.resend\` · \`sc-2fa.help\``,
  TwoFactorSetup: `**i18n Keys (ScAuthKeys — \`sc-2fa-setup\` grubu):**\n\`sc-2fa-setup.scan\` · \`sc-2fa-setup.code\` · \`sc-2fa-setup.verify\` · \`sc-2fa-setup.skip\``,
  RegisterForm: `**i18n Keys (ScAuthKeys — \`sc-register\` grubu):**\n\`sc-register.name\` · \`sc-register.email\` · \`sc-register.password\` · \`sc-register.submit\` · \`sc-register.terms\``,
};

const LAYOUT_I18N_KEYS: Record<string, string> = {
  PanelShell: `**i18n Keys (ScLayoutKeys — \`sc-panel\` grubu):**\n\`sc-panel.nav.*\` · \`sc-panel.user.name\` · \`sc-panel.user.role\` · \`sc-panel.logout\` · \`sc-panel.settings\``,
  ErrorPage: `**i18n Keys (ScLayoutKeys — \`sc-error\` grubu):**\n\`sc-error.title\` · \`sc-error.description\` · \`sc-error.retry\` · \`sc-error.home\``,
};

function scanComponents(): Record<string, ComponentSpec> {
  const components: Record<string, ComponentSpec> = {};

  const addPrimitive = (dir: string, name: string) => {
    const spec = specFromDir(dir, name, "primitive");
    if (spec) components[name] = spec;
  };

  const addFeature = (dir: string, name: string, i18nKeys?: string) => {
    const spec = specFromDir(dir, name, "feature", i18nKeys);
    if (spec) components[name] = spec;
    else console.warn(`[mcp] UYARI: feature bileşeni bulunamadı: ${name} (${dir})`);
  };

  // ── 1. components/ — primitives ──────────────────────────────────────
  const componentsDir = path.join(UI_SRC, "components");
  if (fs.existsSync(componentsDir)) {
    for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (!/^[A-Z]/.test(entry.name)) continue;

      const dir = path.join(componentsDir, entry.name);
      addPrimitive(dir, entry.name);

      for (const sub of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!sub.isDirectory()) continue;
        if (!/^[A-Z]/.test(sub.name)) continue;
        addPrimitive(path.join(dir, sub.name), sub.name);
      }
    }
  }

  // ── 2. features/auth ─────────────────────────────────────────────────
  const authDir = path.join(UI_SRC, "features", "auth");
  if (fs.existsSync(authDir)) {
    for (const entry of fs.readdirSync(authDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (!/^[A-Z]/.test(entry.name)) continue;
      addFeature(
        path.join(authDir, entry.name),
        entry.name,
        AUTH_I18N_KEYS[entry.name],
      );
    }
  }

  // ── 3. features/layout ───────────────────────────────────────────────
  const layoutDir = path.join(UI_SRC, "features", "layout");
  if (fs.existsSync(layoutDir)) {
    for (const entry of fs.readdirSync(layoutDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (!/^[A-Z]/.test(entry.name)) continue;
      addFeature(
        path.join(layoutDir, entry.name),
        entry.name,
        LAYOUT_I18N_KEYS[entry.name],
      );
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
  "",
  "### Yapıtaşları = paketten import (KOPYALANMAZ)",
  "Sayfa dosyaları şu bileşenleri `@servicecoreui/ui`'den çeker — npm'den gelir, kaynak kopyalamana gerek yok:",
  "`AuthShell` · `PasswordChecklist` · `SystemMessage` · `SettingsForm` (+ `SettingsTab`/`Field` tipleri).",
  "Aşağıda listelenen dosyalar yalnızca **sayfaya özel** (route page, şema/data, `PanelShell`, paylaşılan CSS) — bunları kopyalarsın.",
].join("\n");

/** Paylaşılan blok dosyaları (birden çok sayfanın kullandığı yerel yapıtaşları).
 *
 * NOT: AuthShell · PasswordChecklist · SystemMessage · SettingsForm artık
 * yapıtaşı olarak burada DEĞİL — `@servicecoreui/ui`'den import edilen
 * yayınlanmış bileşenler. Sayfa dosyaları onları npm'den çeker; kopyalanmaz.
 * Burada kalanlar Next'e bağlı / sayfaya özel (kopyalanması gereken) dosyalar. */
const BLOCKS: Record<string, string[]> = {
  authStyles: ["giris/giris.module.css"],
  PanelShell: ["_components/PanelShell.tsx", "_components/PanelShell.module.css"],
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
  // ── Auth akışı (AuthShell/PasswordChecklist npm'den — @servicecoreui/ui) ──
  { name: "login", title: "Giriş (Login)", route: "/giris", description: "Split-screen login — e-posta/şifre + captcha + Google/SSO. AuthShell (npm) + form.", files: ["giris/page.tsx"], blocks: ["authStyles"] },
  { name: "sifremi-unuttum", title: "Şifremi Unuttum", route: "/sifremi-unuttum", description: "Parola sıfırlama isteği (e-posta).", files: ["sifremi-unuttum/page.tsx"], blocks: ["authStyles"] },
  { name: "sifre-link-gonderildi", title: "Bağlantı Gönderildi", route: "/sifre-link-gonderildi", description: "Sıfırlama e-postası gönderildi onay ekranı.", files: ["sifre-link-gonderildi/page.tsx"], blocks: ["authStyles"] },
  { name: "sifre-sifirla", title: "Şifre Sıfırla", route: "/sifre-sifirla", description: "Yeni şifre + tekrar + canlı parola kuralları (PasswordChecklist npm).", files: ["sifre-sifirla/page.tsx"], blocks: ["authStyles"] },
  { name: "sifre-degistir", title: "Şifre Değiştir", route: "/sifre-degistir", description: "Mevcut + yeni şifre + kurallar.", files: ["sifre-degistir/page.tsx"], blocks: ["authStyles"] },
  { name: "2fa", title: "2FA — Kod", route: "/2fa", description: "İki adımlı doğrulama kodu girişi.", files: ["2fa/page.tsx"], blocks: ["authStyles"] },
  { name: "2fa-qr", title: "2FA — QR Kurulum", route: "/2fa-qr", description: "Authenticator QR kurulumu + kod.", files: ["2fa-qr/page.tsx"], blocks: ["authStyles"] },
  { name: "kayit", title: "Kayıt (Register)", route: "/kayit", description: "Hesap oluşturma + parola kuralları.", files: ["kayit/page.tsx"], blocks: ["authStyles"] },
  { name: "yetkisiz", title: "Yetkisiz (403)", route: "/yetkisiz", description: "Erişim reddedildi ekranı.", files: ["yetkisiz/page.tsx"], blocks: ["authStyles"] },
  // ── Sistem (SystemMessage npm'den — @servicecoreui/ui) ──
  { name: "404", title: "404 — Bulunamadı", route: "(not-found)", description: "Next not-found.tsx — tam-ekran 404 (SystemMessage npm).", files: ["not-found.tsx"], blocks: [] },
  { name: "500", title: "500 — Error Boundary", route: "(error)", description: "Next error.tsx — hata sınırı, reset + ana sayfa (SystemMessage npm).", files: ["error.tsx"], blocks: [] },
  // ── Panel + Ayarlar ──
  { name: "pano", title: "Pano (Dashboard)", route: "/pano", description: "Dashboard — KPI Statistic + chart'lar + widget grid. PanelShell içinde.", files: ["pano/page.tsx", "pano/pano.module.css"], blocks: ["PanelShell", "recentPanels"] },
  { name: "kayitlar", title: "Kayıtlar (DataTable)", route: "/kayitlar", description: "Kayıt tarayıcısı — DataTable (sıralama/filtre/kolon). PanelShell içinde.", files: ["kayitlar/page.tsx", "kayitlar/kayitlar.module.css"], blocks: ["PanelShell"] },
  { name: "ayarlar", title: "Ayarlar (Liste)", route: "/ayarlar", description: "Ayar kategorileri — NavCard grid + arama. PanelShell içinde.", files: ["ayarlar/page.tsx", "ayarlar/ayarlar.module.css", "ayarlar/settings.json"], blocks: ["PanelShell", "recentPanels"] },
  { name: "genel-ayarlar", title: "Genel Ayarlar (Detay)", route: "/ayarlar/genel-ayarlar", description: "Ayar detayı — data-driven SettingsForm (npm). Sayfa = şema (fields.ts) + PanelShell. 5 sekme, 11 alan tipi, koşullu alanlar.", files: ["ayarlar/genel-ayarlar/page.tsx", "ayarlar/genel-ayarlar/genel-ayarlar.module.css", "ayarlar/genel-ayarlar/fields.ts"], blocks: ["PanelShell", "recentPanels"] },
  { name: "teknisyenler", title: "Teknisyenler (Liste + CRUD)", route: "/teknisyenler", description: "AdminListPage deseni — DataTable (durum/ad/e-posta/aksiyon) + Yeni/Düzenle Drawer + Parola Drawer (PasswordChecklist npm). PanelShell içinde.", files: ["teknisyenler/page.tsx", "teknisyenler/teknisyenler.module.css"], blocks: ["PanelShell", "recentPanels"] },
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
  i18n: I18N_CONTRACT,
  tokens: readTokens(),
  rules: readRules(),
};

const distDir = path.resolve(MCP_ROOT, "dist");
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const out = path.join(distDir, "catalog.json");
fs.writeFileSync(out, JSON.stringify(catalog, null, 2));

const primitiveCount = Object.values(catalog.components).filter((c) => c.kind === "primitive").length;
const featureCount = Object.values(catalog.components).filter((c) => c.kind === "feature").length;

console.log(
  `[mcp] catalog written: ${primitiveCount} primitives + ${featureCount} features = ${Object.keys(catalog.components).length} total, ${Object.keys(catalog.pages).length} pages, ${(JSON.stringify(catalog).length / 1024).toFixed(1)}kB`,
);
