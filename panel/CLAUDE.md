# panel/

## Misyon
ServiceCore'un mevcut paneli için **bileşen kütüphanesi**. Biz panel yazmıyoruz — kütüphane yazıyoruz. Backend ekibi AntD 5.7 kullanan kendi panel codebase'inde bizim paketi tüketecek.

**Deliverable:** `@servicecoreui/ui` npm paketi (npmjs.org — public)

## ⚠️ Deploy — DİKKAT (iki repo var)
- Bu klasör **monorepo** `gorgonline/servicecore` içinde (`panel/`). Burası **çalışma kopyası**.
- **Vercel deploy AYRI repodan olur:** `gorgonline/servicecore-panel` (kökü = bu `panel/` içeriği).
- **Monorepo'ya push DEPLOY ETMEZ.** Panel'i yayına almak için `servicecore-panel`'e senkron şart.
- Tek komut (panel/ içinden): `pnpm sync-deploy "commit mesajı"` → [scripts/sync-deploy.sh](scripts/sync-deploy.sh)
- "Panel'i commit/push et" denince **bu script'i** kullan; `origin` (monorepo) push'u yayına çıkmaz.

## Yapı
- `packages/ui/` — yayınlanan paket. AntD 5.7 wrap bileşenleri, CSS Modules, kendi token sistemi
- `apps/playground/` — bizim test ortamımız. Next.js 15 + React 18 + AntD 5.7 + AntdRegistry. **Onlara gitmez**
- `packages/ui/dist/` — esbuild çıktısı (ESM + CJS + .d.ts + birleşik CSS) — `build.mjs`

## Export kovaları — bileşen NEREYE gider
Paket çok-girişli (subpath export). Yeni bileşeni **doğru kovaya** koy:
- `@servicecoreui/ui` → typography primitifleri + theme (Heading, Display, Text, Eyebrow, Code). **Server-safe** (AntD yok, RSC uyumlu).
- `@servicecoreui/ui/wraps` → AntD wrap'leri (Button, Card, Input, Table…). `"use client"`, client-only.
- `@servicecoreui/ui/custom` → **bizim sıfırdan yaptığımız** ServiceCore'a özel bileşenler (Brand, Kbd, DataTable, CommandPalette, PageHeader, UserMenu…). `"use client"`.
- `@servicecoreui/ui/features` → sayfa-seviyesi feature yapıtaşları (AuthShell, PasswordChecklist, SystemMessage, SettingsForm). `"use client"`. *(custom da geriye-uyum için re-export eder.)*
- `@servicecoreui/ui/charts` → Recharts grafikleri (BarChart, DonutChart, LineChart, SlaGauge). `"use client"`, izole bundle (~100KB recharts yalnız buraya).
- `@servicecoreui/ui/icons` → Carbon ikonları re-export. Server-safe.
- `@servicecoreui/ui/theme` → token'lar + `servicecoreTheme` (ConfigProvider). Server-safe.
- CSS: `@servicecoreui/ui/styles.css` (app entry'de bir kez) + `@servicecoreui/ui/tokens.css`.

**Yeni custom (kendi) bileşen eklerken:**
1. `src/<Ad>/` klasörü (pattern aşağıda — Eyebrow/Code gibi: `<Ad>.tsx` + `.module.css` + `index.ts`)
2. `src/custom.ts`'e `export * from "./<Ad>";`
3. Playground'da `app/<ad>/` demo sayfası + `_components/nav.ts`'te **"ServiceCore Özel"** grubuna giriş
4. `pnpm build:ui` (dist'i yenile)

## MCP — AI katalog server'ı (`packages/mcp`)
`@servicecoreui/mcp` — AI araçlarına (Claude Code, Cursor) `@servicecoreui/ui` kataloğunu açar; AI doğrudan AntD yerine bizim wrap kütüphanesini görür. Kurulum/IDE ayarları: [packages/mcp/README.md](packages/mcp/README.md).

**Tool'lar:** `list_components` · `find_component "<arama>"` · `get_component_spec <Ad>` (source+types+css) · `get_tokens` · `get_design_rules` · **`list_pages`** · **`get_page <ad>`** (sayfa şablonu = route page + css + data/şema + yerel yapıtaşları, kaynak-kod olarak; manifest `build-catalog.ts`'te, dosyalar `apps/playground/app`'ten okunur).

**Katalog nasıl üretiliyor:** build-time'da `packages/mcp/src/build-catalog.ts`, `packages/ui/src/`'i tarar → `dist/catalog.json`.
- Bileşen taraması: `src/<Ad>/<Ad>.tsx` (top-level) **ve bir seviye nested** `src/<Kapsayıcı>/<Alt>/<Alt>.tsx` (ör. `Charts/BarChart`).
- Token'lar `src/theme/tokens.css`'ten, kurallar `packages/mcp/design-rules.md`'den okunur.

**⚠️ Bakım:** Yeni bileşen / token / kural eklediğinde kataloğu **yeniden üret**, yoksa MCP eski bilgi döner:
```
pnpm --filter @servicecoreui/mcp build
```

## Stack
- pnpm workspace monorepo
- TypeScript strict, React 18, AntD 5.7
- esbuild build (ESM + CJS dual output) — `build.mjs`
- CSS Modules + AntD theme tokens (Tailwind YOK)

## Hedef tüketim ortamı
Backend ekibi: AntD 5.7 + React 18 + Webpack (CRA veya custom). Bizim paket bu ortamda **drop-in** çalışmalı.

## Kullanım (onların gözünden)
```bash
npm install @servicecoreui/ui   # public npmjs.org — .npmrc gerekmez
```
```tsx
import { Button } from '@servicecoreui/ui/wraps';   // AntD wrap'leri (client-only)
import '@servicecoreui/ui/styles.css';              // app entry'sinde bir kez
```

Opsiyonel — tüm AntD'yi ServiceCore diline çevirmek için:
```tsx
import { servicecoreTheme } from '@servicecoreui/ui/theme';
<ConfigProvider theme={servicecoreTheme}>...</ConfigProvider>
```

## Kurallar

### Bileşen pattern'i — her bileşen aynı kalıbı izler
```
src/Button/
├── Button.tsx           # AntD'yi wrap eder, varyant prop'ları ekler
├── Button.module.css    # Token'la çözülmeyen ince ayarlar
├── Button.types.ts      # Public type'lar
└── index.ts             # export { Button } from './Button'; export type { ButtonProps } from './Button.types';
```

```tsx
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import clsx from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps extends AntButtonProps {
  variant?: 'default' | 'ghost' | 'destructive';
}

export function Button({ variant = 'default', className, ...rest }: ButtonProps) {
  return <AntButton {...rest} className={clsx(styles.button, styles[variant], className)} />;
}
```

### Token kullanımı
- `packages/ui/src/theme/tokens.css` tek kaynak
- Her renk/spacing/radius CSS değişkeni olarak gelir: `var(--sc-color-primary)`, `var(--sc-radius-md)`
- AntD theme'i de bu değerleri okur (`theme.ts`)
- Hex değiştirmek için tek yer: tokens.css

### YASAK
- Tailwind class kullanma — sadece CSS Modules + AntD tokens
- Hardcoded hex — tokens.css'i değiştir
- shadcn pattern'leri — biz AntD wrap stratejisindeyiz
- Koyu tema — sadece açık
- 12 renkli accent palet — tek accent var, `#0070F3`
- AntD 5.17+ özelliklerine bağımlılık — `@layer`, `cssVar: true` modları kullanma (5.7 baseline)

### Önerilen
- Önce token'la çöz, sonra CSS Module override'a in
- `!important` gerekirse 5.7 specificity yüzünden — sebebi yorumla yaz
- Her bileşen için playground'da bir demo sayfası
- Carbon icon: paketten re-export → `import { Add } from "@servicecoreui/ui/icons"` (consumer Carbon'u ayrı kurmaz; `@carbon/icons-react` artık dependency, build'de external)

## Komutlar (panel/ içinden)
- `pnpm dev` — playground başlatır (port 3300)
- `pnpm build:ui` — sadece library'yi build eder (esbuild)
- `pnpm build` — her şeyi build eder
- `pnpm typecheck` — tüm paketler

## Faz Haritası
- [x] **Faz 0** — iskelet (pnpm workspace + 2 paket + Next.js playground)
- [ ] **Faz 1** — token foundation (tokens.css + theme.ts + OKLCH algorithm)
- [ ] **Faz 2** — typography sistemi
- [ ] **Faz 3** — ilk 4 wrap: Button, Input, Badge, Tag
- [ ] **Faz 4** — gerçek ekran testi (playground'da ticket-list demo)
- [ ] **Faz 5** — composite: Table, Form, Select, Dialog, Tabs, Sidebar

## Açık konular
- Backend ekibinin webpack/CRA exact setup'ı (`pnpm install` sonrası belirli olur)
- ProComponents (`@servicecoreui/ui-pro`) ayrı paket olacak mı (Faz 5'te kararla)
- Storybook eklenecek mi (Faz 3 sonunda karar)
- AntD versiyon yükseltme planı (backend ekibiyle konuşulacak)

## Referanslar
- AntD 5.7 docs: https://5x.ant.design/
- AntD + Next.js: https://ant.design/docs/react/use-with-next
- Carbon icons: https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react
