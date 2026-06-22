# Görev Paneli — Tasarım Brief

> Kaynak: `dijital-kagit-sistemi` panel fabrikası (token + felsefe + gorgo-chat ekran kalıpları + inspire görselleri).
> Bu panel oraya yeni bir standalone panel olarak kurulacak: `cp -r panels/_template panels/gorev-paneli`.
> İlgili: [gorev-paneli-spec.md](gorev-paneli-spec.md)

## 1. Tasarım dili tek paragraf (dijital kağıt nedir)

Dijital kağıt, ekranı bir fiziksel belge sayfası gibi ele alan sessiz ve profesyonel bir tasarım dilidir. Felsefe "ne yapacağını değil, ne yapmayacağını söylemek" üzerine kurulur: yanlış olanları (gradient, neon, gölge katmanları, animasyon gösterisi, gereksiz renk) elersen geriye doğruya en yakın olan kalır. Yüzeyler düz ve kağıt-beyazıdır (off-white `oklch(0.983 ...)`), kenarlar ince gri çizgilerle (`border-border`) ayrılır, köşeler neredeyse keskindir, hiyerarşi gölgeyle değil tipografi ve boşlukla kurulur. Renk paleti siyah + beyaz + tek bir aksan (maroon `#8b0000`); aksan sadece durum/uyarı için, sayfada bir kez. Tipografi Geist Sans/Mono, başlıklar sessizce konuşur (`text-2xl` üstü yok), gövde gri ve okunaklıdır. Hareket yoktur — sadece `transition-colors` ve skeleton için `animate-pulse`. Sonuç: bir ITSM/ESM belgesi kadar ciddi, bir kağıt sayfası kadar sakin, web-native bir panel.

## 2. Token özeti (gerçek değerler — _template globals.css'ten)

Yeni panel `_template`'ten kopyalanacağı için **OKLch sistemi** taban alınır (gri-nötr, A11y-safe). Aksan ise gorgo-chat'in maroon karakterini taşımak için override edilir.

### Renk — Light / Dark
| Token | Light | Dark | Tailwind class | Kullanım |
|---|---|---|---|---|
| `--background` | `oklch(0.983 0.002 90)` | `oklch(0.145 0 0)` | `bg-background` | Sayfa zemini (kağıt off-white) |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | `text-foreground` | Ana metin |
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | `bg-card` | Kart yüzeyi (saf beyaz) |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | `text-card-foreground` | Kart içi metin |
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | `bg-primary` | Birincil buton |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | `text-primary-foreground` | Birincil buton metni |
| `--secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | `bg-secondary` | İkincil yüzey / hover |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | `bg-muted` | Sessiz dolgu |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | `text-muted-foreground` | İkincil/meta metin |
| `--accent` *(override)* | `#8b0000` | `#8b0000` | `bg-accent` `text-accent` | Aksan — sadece durum/uyarı |
| `--accent-foreground` *(override)* | `#ffffff` | `#ffffff` | `text-accent-foreground` | Aksan üstü metin |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | `bg-destructive` | Sil / geri dönüşsüz |
| `--border` | `oklch(0.96 0.002 90)` | `oklch(1 0 0 / 10%)` | `border-border` | Tüm çizgiler |
| `--input` | `oklch(0.96 0.002 90)` | `oklch(1 0 0 / 15%)` | — | Form input border |
| `--ring` *(önerilen override)* | `#8b0000` | `#8b0000` | `ring-ring` | Focus ring (maroon) |

> Override notu: `:root` ve `.dark` içinde sadece `--accent`, `--accent-foreground`, `--ring` satırlarını maroon yap. Kalan nötr palet `_template`'ten olduğu gibi kalır.

### Tipografi
| Rol | Class | Değer |
|---|---|---|
| Font (sans) | `font-sans` | Geist Sans → `var(--font-geist-sans)` |
| Font (mono) | `font-mono` | Geist Mono — sayı/tarih/ID için |
| Sayfa başlığı | `text-2xl font-semibold tracking-tight text-foreground` | 24px |
| Bölüm başlığı | `text-lg font-medium text-foreground` | 18px |
| Kart başlığı | `text-sm font-medium text-foreground` | 14px |
| Gövde | `text-sm leading-relaxed text-foreground` | 14px |
| İkincil/meta | `text-xs text-muted-foreground` | 12px |
| Etiket (label) | `text-[10px] uppercase tracking-[0.18em] text-muted-foreground` | 10px, max 2-3 kelime |
| Kod/sayı/tarih | `font-mono text-sm` | 14px |
| Buton | `text-sm font-medium` | 14px |

### Spacing / Radius / Shadow
| Boyut | Değer | Kural |
|---|---|---|
| Radius (`--radius`) | `0.625rem` (10px); `rounded-sm`=6px, `rounded-md`=8px, `rounded-lg`=10px | Kart `rounded-lg`, liste öğesi `rounded-sm`/`rounded-md` |
| Micro spacing | `p-4`/`p-6`, `gap-2`/`gap-3`, `space-y-2`/`space-y-3` | Kart içi, liste, ikon-metin |
| Macro spacing | `py-8`/`py-12`, `gap-8` | Bölümler arası |
| Touch hedef | `min-h-[44px] min-w-[44px]` | Mobil dokunma |
| Shadow | **Yok** (max `shadow-sm`) | Hiyerarşi border + kontrastla kurulur |
| Viewport | `min-h-[100dvh]` veya `h-dvh` | `h-screen` YASAK |

## 3. Yasaklar (ne YAPMAYACAĞIZ)

- **Renk:** Gradient (linear/radial/conic) yok. Neon/parlak renk (mavi `#3B82F6`, mor `#7C3AED`) yok. Aynı ekranda 2 aksan yok. `bg-opacity`/şeffaf katman yok. Renkli border yok — sadece `border-border`.
- **Tipografi:** Inter/Roboto/Arial/system-ui yok — sadece Geist. `text-3xl`+ başlık yok. UPPERCASE gövde yok (sadece etiket, 2-3 kelime). Gövdede `font-bold` yok, italic yok.
- **Layout:** Tablo yok (karta çevir). 3+ ana aksiyon butonu yok (max 2). Hero section yok. 3 sütunlu eşit kart gridi yok. Sticky header+sidebar+footer kombinasyonu yok. Nested scroll yok. `h-screen` yok. Tam ekran renkli banner/CTA yok.
- **Boşluk:** `p-1`/`p-0.5`/`gap-0.5` yok. `m-0` yapıştırma yok. Negatif margin hack (`-mt-4`) yok.
- **Animasyon:** Framer Motion yok, spring yok. Hover'da `scale` yok. Hover'da shadow artışı yok. Slide/bounce/rotate/parallax yok. Grain/typewriter/shimmer/float yok. **Sadece `transition-opacity`/`transition-colors duration-200` ve `animate-pulse`.**
- **Bileşen:** Pill badge her yerde yok (sadece status). Avatar+isim+email kartı yok. Progress bar her yerde yok. FAB yok. Kritik bilgiyi tooltip'te gizleme yok. Carousel yok. Her işlem için modal yok (inline tercih et). **Spinner yok** — skeleton kullan.
- **Davranış:** Her işlem için toast yok. Basit işlem için onay dialog'u yok (sadece silme/geri dönüşsüz). Modal açılışında auto-focus yok. Infinite scroll yok (sayfalama).
- **İçerik:** AI klişesi yok ("Seamless", "Unleash", "Supercharge", "Next-gen"). Lorem ipsum / John Doe / jane@example.com yok. Başlıkta/butonda emoji yok. "Click here" yok, "etc." yok.
- **Stil:** Glassmorphism (`backdrop-blur`) yok. Neon glow yok. Shadow katmanı yok. Text shadow yok. `rounded-full` buton yok (`rounded-lg` MAX).
- **shadcn primitifleri:** `src/ui/primitives/` DOKUNMA. Variant ekleme, className override etme, hover/transition değiştirme. Özel ihtiyaç → `src/components/custom/`'da primitifi KULLAN ama DEĞİŞTİRME.

## 4. İlkeler (ne YAPACAĞIZ)

- **Renk:** Siyah + beyaz + 1 aksan (maroon). Yüzeyler `bg-background`/`bg-card`/`bg-secondary`. Tüm ayraçlar `border-border`. Dark mode = aynı kural tersine.
- **Tipografi:** `tracking-tight` başlıklarda, `leading-relaxed` gövdede, sayı/tarih/ID `font-mono`. Hiyerarşi tipografiyle, gölgeyle değil.
- **Layout:** Grid tercih et. Liste = tek sütun kart. Detay = 2/3 içerik + 1/3 sidebar. `max-w-6xl mx-auto`, `px-4 md:px-6 lg:px-8`. Mobilde `grid-cols-1`.
- **Boşluk:** Nefes aldır. Macro `py-8`/`py-12`, micro `p-4`/`p-6`.
- **Kart:** `rounded-lg border border-border bg-card p-4` (veya `p-6`). Gölge max `shadow-sm`, tercihen hiç yok.
- **Durum yönetimi (her ekran 4 durum):** Loading = skeleton `animate-pulse`. Empty = selamlama + tek buton. Error = `border-destructive` + ne yapacağını söyle. Success = inline bildirim.
- **İkon:** Sadece Lucide. `h-4 w-4` küçük, `h-5 w-5` normal. `h-6`+ YASAK.
- **İçerik:** Gerçekçi Türkçe veri (Ahmet Yılmaz, Kaya İnşaat, GG.AA.YYYY), profesyonel ITIL4 terminolojisi.

## 5. Bileşen kalıpları (gerçek Tailwind class)

**Kart (yüzey):**
```tsx
<div className="rounded-lg border border-border bg-card p-4">
  <h3 className="text-sm font-medium text-foreground">{title}</h3>
  <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
  <p className="mt-3 text-sm leading-relaxed text-foreground">{body}</p>
</div>
```

**Liste öğesi (gorgo-chat ArchiveItem kalıbı):**
```tsx
<button
  className={cn(
    "group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
    "hover:bg-secondary",
    active && "bg-secondary",
  )}
>
  <span className="h-9 w-9 shrink-0 overflow-hidden rounded-sm border border-border bg-muted" />
  <span className="min-w-0 flex-1">
    <span className="block truncate text-sm text-foreground">{title}</span>
    <span className="block text-xs text-muted-foreground">{subtitle}</span>
  </span>
  <Check size={14} className="shrink-0 text-muted-foreground" />
</button>
```

**Buton (shadcn primitif — saf kullan):**
```tsx
<Button size="sm">Kaydet</Button>
<Button size="sm" variant="outline">İptal</Button>
```

**Başlıklar:**
```tsx
<h1 className="text-2xl font-semibold tracking-tight text-foreground">Görev Panosu</h1>
<h2 className="text-lg font-medium text-foreground">Aktif Görevler</h2>
<span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Backlog</span>
```

**Status bullet (ProcessBullet kalıbı):**
```tsx
<span
  className={cn(
    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
    status === "done" && "border-foreground bg-foreground text-background",
    status === "running" && "border-foreground animate-pulse",
    status === "pending" && "border-border",
    status === "error" && "border-accent bg-accent text-accent-foreground",
  )}
/>
```

**Skeleton (loading — spinner YASAK):**
```tsx
<div className="space-y-2">
  <div className="h-9 w-full animate-pulse rounded-md bg-muted" />
  <div className="h-9 w-full animate-pulse rounded-md bg-muted" />
</div>
```

## 6. Görev Panosu'na uygulama (somut)

**Genel iskelet** (gorgo-chat 3-kolon shell karşılığı: sidebar + ana pano + detay):
```tsx
<div className="flex h-dvh flex-col">
  <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-4">
    <h1 className="text-sm font-medium text-foreground">Görev Panosu</h1>
    <Button size="sm">Yeni Görev</Button>
  </header>
  <div className="grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)_400px]">
    <aside className="flex h-full flex-col gap-3 border-r border-border bg-background px-3 py-4">…</aside>
    <section className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">…</section>
    <section className="flex min-h-0 flex-col border-l border-border bg-background">…</section>
  </div>
</div>
```
Mobilde: tek kolon, alt sekme navigasyonu (Backlog / Pano / Detay).

**Kanban kolonları** (tablo YASAK; kolon başlığı sessiz etiket, kart sayısı mono):
```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Backlog</span>
      <span className="font-mono text-xs text-muted-foreground">8</span>
    </div>
    {/* görev kartları space-y-2 ile */}
  </div>
  {/* Spec · Kuyruk · Tamamlandı kolonları aynı kalıpta */}
</div>
```

**Görev kartı** (kanban içi — düz, gölgesiz, sol kenarda status bullet):
```tsx
<button className="group w-full rounded-md border border-border bg-card p-3 text-left transition-colors hover:bg-secondary">
  <div className="flex items-start gap-2">
    <span className="mt-1 h-2 w-2 shrink-0 rounded-full border border-border" />
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm text-foreground">Fatura modülü hata raporu</span>
      <span className="mt-1 block text-xs text-muted-foreground">Kaya İnşaat · 09.06.2026</span>
    </span>
  </div>
  <div className="mt-2 flex items-center gap-2 pl-4">
    <span className="font-mono text-[10px] text-muted-foreground">SC-142</span>
    <span className="text-[10px] uppercase tracking-[0.18em] text-accent">Engelli</span>
  </div>
</button>
```

**Yeni-görev formu** (inline panel, modal değil; tek aksiyon):
```tsx
<form className="space-y-4 rounded-lg border border-border bg-card p-6">
  <div className="space-y-1.5">
    <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Görev başlığı</label>
    <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none" />
  </div>
  <div className="space-y-1.5">
    <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Açıklama / spec</label>
    <textarea className="scrollbar-thin min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground focus:border-foreground focus:outline-none" />
  </div>
  <div className="flex justify-end gap-2">
    <Button size="sm" variant="outline">İptal</Button>
    <Button size="sm">Kuyruğa Ekle</Button>
  </div>
</form>
```

**Görev detayı** (durum adımları ProcessBullet listesi):
```tsx
<div className="flex flex-col gap-4 p-4">
  <div>
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-muted-foreground">SC-142</span>
      <span className="text-[10px] uppercase tracking-[0.18em] text-accent">Engelli</span>
    </div>
    <h2 className="mt-1 text-lg font-medium text-foreground">Fatura modülü hata raporu</h2>
    <p className="mt-1 text-xs text-muted-foreground">Kaya İnşaat · Atanan: Ahmet Yılmaz · 09.06.2026</p>
  </div>
  <p className="text-sm leading-relaxed text-foreground">Müşteri ayın 5'inde kesilen faturaların PDF çıktısında KDV satırının iki kez göründüğünü bildirdi.</p>
  <ul className="space-y-2">
    <li className="flex items-start gap-3 text-sm">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-foreground bg-foreground text-background"><Check size={10} /></span>
      <span className="leading-5 text-foreground">Grupla → ServiceCore / Faturalama</span>
    </li>
    <li className="flex items-start gap-3 text-sm">
      <span className="mt-0.5 h-4 w-4 shrink-0 animate-pulse rounded-full border border-foreground" />
      <span className="leading-5 text-foreground">Spec yazımı sürüyor</span>
    </li>
    <li className="flex items-start gap-3 text-sm">
      <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-border" />
      <span className="leading-5 text-muted-foreground">Kuyruğa alınacak</span>
    </li>
  </ul>
</div>
```

**Empty state** (form değil, selamlama + tek buton):
```tsx
<div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
  <p className="text-sm text-muted-foreground">Henüz görev yok. İlk görevi yazarak başla.</p>
  <Button size="sm">Yeni Görev</Button>
</div>
```

## 7. Kurulum notu

- **Kaynak şablon:** `cp -r panels/_template panels/gorev-paneli`. `_template` zaten dijital-kağıt iskeletini taşıyor: `src/ui/` (OKLch `globals.css`, `index.ts`, `utils.ts` → `cn()`, `primitives/`), `src/components/{base,custom}/`, `src/app/{(panel),api,auth,layout.tsx,page.tsx}`, Prisma, eslint `no-restricted-imports`.
- **Hazır primitifler (`src/ui/primitives/` — DOKUNMA):** `button`, `button-group`, `toggle`, `toggle-group`, `input`, `label`, `separator`, `avatar`, `alert-dialog`, `dropdown-menu`, `sonner`. Hepsi `src/ui/index.ts`'ten export. **İmport her zaman `@/ui`'den** — `@gorgo/ui` YASAK.
- **Token override:** `src/ui/globals.css`'in `:root` ve `.dark` bloklarında sadece şu üç satırı maroon yap — `--accent: #8b0000; --accent-foreground: #ffffff; --ring: #8b0000;`. Nötr OKLch palet aynen kalır. Yeni token İCAT ETME.
- **Font:** `src/app/layout.tsx`'te `geist` — `var(--font-geist-sans)` / `var(--font-geist-mono)`. `next-themes` ThemeProvider (`attribute="class"`, `defaultTheme="system"`).
- **Tailwind v4:** `globals.css` başındaki `@import "tailwindcss"`; tema `@theme inline` ile CSS değişkenlerine bağlı — Tailwind config dosyası yok.
- **Özel bileşenler:** Görev kartı, kanban kolonu, yeni-görev formu → `src/components/custom/`; primitifleri saran genel parçalar → `src/components/base/`. İkonlar sadece Lucide.
- **Standalone kurulum:** `package.json` `name` güncelle; ana monorepo `pnpm-workspace.yaml`'a `- '!panels/gorev-paneli'`; panel içine `pnpm-workspace.yaml` (`packages: ['.']`); `cd panels/gorev-paneli && pnpm install`. `pnpm --filter` KULLANMA.

### Referans dosyalar (kopyalama kaynağı)
- `panels/_template/src/ui/globals.css` (OKLch token tabanı)
- `panels/_template/src/ui/index.ts` + `primitives/` (11 primitif)
- `panels/gorgo-chat/src/components/archive/ArchiveItem.tsx` (liste öğesi kalıbı)
- `panels/gorgo-chat/src/components/pipeline/ProcessBullet.tsx` (status bullet kalıbı)
- `panels/gorgo-chat/src/components/layout/DesktopShell.tsx` (3-kolon shell)
