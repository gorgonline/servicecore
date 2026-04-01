---
paths:
  - "website/src/components/**"
  - "website/src/app/**/page.tsx"
  - "website/src/app/**/layout.tsx"
  - "website/src/app/**/loading.tsx"
  - "website/src/app/**/error.tsx"
  - "website/src/app/**/not-found.tsx"
---

# ServiceCore Tasarim Dili

> Premium, enterprise-seviye, teknoloji oncusu. Koyu yuzey, glassmorphism, glow, spring animasyon.
> Tek kaynak: brand/tokens.json. Hardcoded hex YASAK.

---

## Renk Sistemi

### Yuzeyler (koyu tema — tek tema)
- Base: surface.base (#010E21) — ana arkaplan
- Elevated: surface.elevated (#021330) — yukseltiomis kartlar
- Shader: surface.shader1, shader2 — derinlik katmanlari
- Alfa yuzeyler: surfaceAlpha.white2–white20 — katmanli seffaflik

### Marka Renkleri
- Primary: brand.primary (#0070F3) — ana aksiyon, CTA, glow
- Secondary: brand.secondary (#10B981) — basari, onay
- Accent: brand.accent (#38BDF8) — vurgu, link hover
- Purple: brand.purple (#A855F7) — premium/ozel icerik

### Metin
- Primary: text.primary (#FFFFFF) — basliklar
- Secondary: text.secondary (#94A3B8) — govde metni
- Muted: text.muted (#64748B) — yardimci metin
- Brand: text.brand (#0070F3) — marka vurgusu

### Border
- Subtle: border.subtle (white 5%) — varsayilan kart border
- Default: border.default (white 10%) — gorulur border
- Active: border.activePrimary (primary 50%) — fokus/aktif

### RENK KURALLARI:
- Hardcoded hex YASAK — tokens.json veya design-tokens.json referans alinir
- Light tema YOK — sadece koyu tema
- Renkli border: sadece aktif/fokus durumunda (border.activePrimary)
- Accent renkler: her kart/section icin farkli olabilir (accent.blue, accent.purple, accent.emerald, accent.cyan)

---

## Tipografi

### Font: Geist Sans + Geist Mono. Ikinci font YASAK.
- CSS variable: --font-geist-sans, --font-geist-mono
- Mono: sadece kod, sayi, tarih icin

### Hiyerarsi (tokens.json'dan birebir):
```
H1:      48px(mob) / 60px(tab) / 72px(desk), font-bold, tracking-tight, leading-[1.1]
H2:      30px(mob) / 36px(desk), font-bold, tracking-tight
H2Large: 36px(mob) / 48px(tab) / 60px(desk), font-medium, tracking-tight
H3:      20px(mob) / 24px(desk), font-semibold, tracking-tight
H4:      18px, font-semibold, tracking-tight
Lead:    18px(mob) / 20px(desk), font-light, leading-relaxed, text-secondary
Body:    16px, font-light, leading-relaxed, text-secondary
Small:   14px, font-light, text-secondary
Caption: 12px, font-medium, text-muted
Overline:12px, font-semibold, tracking-[0.2em], uppercase
NavLink: 14px, font-medium, hover: text-primary
```

### TIPOGRAFI KURALLARI:
- Baslik rengi: her zaman text.primary (#FFFFFF)
- Govde rengi: her zaman text.secondary (#94A3B8)
- Baslik weight: bold veya semibold. Govde weight: light (300)
- Letter-spacing: basliklar -0.025em (tracking-tight), overline +0.2em
- Gradient text: effects.gradient.brandText veya heroText kullanilabilir

---

## Kart Yapisi

- Glass (varsayilan): tokens.json cards.glass — bg-white/5, border-white/10, backdrop-blur, rounded-xl
- Subtle: tokens.json cards.subtle — bg-white/2, rounded-3xl, hover'da bg/border guclendir
- Pricing: tokens.json cards.pricing — koyu bg, rounded-[32px]
- Glassmorphism ZORUNLU. Flat kart = BASARISIZLIK
- Hover: border guclendir + subtle bg artisi + glow
- Padding: p-8 (32px) veya p-10 (40px)

---

## Butonlar

- Primary: brand.primary bg, glow shadow, rounded-full. Degerler: tokens.json buttons.primary
- Secondary: white/5 bg, white/10 border, rounded-full. Degerler: tokens.json buttons.secondary
- CTA: beyaz bg, koyu text, white glow. Degerler: tokens.json buttons.cta
- Boyutlar: sm (h-9), md (h-11), lg (h-14). Degerler: tokens.json buttons.sizes
- Max 2 buton yan yana. 3+ YASAK
- Focus ring: primary/50, offset 2px
- cursor-pointer ZORUNLU

---

## Golge ve Glow

- Glow efekti her sayfada en az 1 kez kullanilmali
- Flat golge (shadow-sm, shadow-md) YETERSIZ — glow kullan
- Hover'da glow guclendir
- Degerler: brand/tokens.json shadows bolumu

---

## Animasyon

- Spring-based ZORUNLU (linear YASAK). Degerler: brand/tokens.json animation bolumu
- prefers-reduced-motion HER ZAMAN kontrol edilmeli
- Her sayfada en az 1 interaktif element
- SADECE transform ve opacity animate et — top/left/width/height YASAK
- Detay: micro-interactions ve framer-motion skill'leri

---

## Efektler

- Glassmorphism: bg white/5, border white/10, backdrop-blur. Hover'da guclendir
- Her sayfada en az 1 gradient ve 1 background glow
- Gradient degerleri: brand/tokens.json effects.gradient bolumu
- Glow degerleri: brand/tokens.json effects.backgroundGlow bolumu

---

## Spacing

### Sayfa:
- Section padding: py-24 (96px) veya py-32 (128px)
- Container: max-w-7xl (1280px) veya max-w-[1400px]
- Container padding: px-6 (mob) / px-12 (desk)
- Main content top: pt-20 (mob) / pt-24 (desk)

### Bilesen:
- Kart padding: p-8 (32px) veya p-10 (40px)
- Stack gap: gap-6 (24px)
- Grid gap: gap-6 (24px) veya gap-8 (32px)
- Section header margin bottom: mb-20 (80px)

### Navbar:
- Scrolled padding: py-3
- Default padding: py-6
- Nav gap: gap-8

---

## Responsive

### Breakpoints:
- xs: 320px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, xxl: 1440px

### RESPONSIVE KURALLARI:
- h-screen YASAK — 100dvh kullan (mobil URL bar sorunu)
- Mobilde grid tek sutuna dus: grid-cols-1 md:grid-cols-2
- Touch hedefleri: min-h-[44px] min-w-[44px]
- 320px'de test et — kucuk telefon kirilma noktasi

---

## Durum Yonetimi (State Handling)

### 1. Yukleniyor (Loading):
- Skeleton loader zorunlu (animate-pulse)
- Spinner YASAK — skeleton kullan
- Sadece degisen bolumu skeleton yap, tam ekran loading YASAK

### 2. Bos (Empty):
- Kisa bilgilendirme metni + tek aksiyon butonu
- Buyuk ikon/illustrasyon YASAK
- Uzun aciklama YASAK

### 3. Hata (Error):
- Inline bildirim: border-red + bg-red/10 + metin
- Kullaniciya ne yapacagini soyle
- Teknik hata mesaji gosterme

### 4. Basari (Success):
- Inline bildirim veya sayfa yonlendirme
- Toast sadece kritik islemler icin

---

## Anti-Pattern (YASAK)

### Layout:
- Flat UI (glassmorphism yok, glow yok)
- Gradient'siz sayfa (en az 1 gradient veya glow)
- h-screen kullanimi
- 3+ buton yan yana

### Stil:
- Hardcoded hex renk
- Light tema / beyaz arkaplan
- shadow-sm/shadow-md tek basina (glow olmadan)
- Linear animasyon (spring kullan)

### Bilesen:
- Spinner (skeleton kullan)
- Tam ekran loading
- 3 sutunlu esit kart gridi (varsayilan AI ciktisi)

### Boyut (Apple-style minimalizm):
- Ikon/badge boyutlari w-8/h-8 asmasin
- Logo boyutlari w-12/h-12 asmasin
- Suphe durumunda kucuk tut
