# Modül İkonlu KPI Kartı — Tam Üretim Kılavuzu

## 1. Anatomi

```
┌─────────────────────────┐
│ [20px modül ikonu]      │  ← header (sabit, flex: 0 0 auto)
│                         │
│ Bana Atanan Açık        │  ← body (flex: 1 1 auto, min-height: 2lh)
│ Çağrılarım              │     label burada — 2 satıra düşse de
│                         │     kart yüksekliği değişmez
│                         │
│ 1   ↓ %50               │  ← footer (sabit, flex: 0 0 auto)
└─────────────────────────┘
```

- **Header**: yalnız 20px ikon (yanında metin **yok**)
- **Body**: yalnız label (xs caption, max-width 18ch ile uzun ifadeler 2 satıra zorlanır)
- **Footer**: büyük Geist Mono sayı + renkli % trend pill
- **Divider yok** — sadece spacing
- **Card root** `height: 100%`, **AntD card body** `height: 100% + flex column` (inline `bodyStyle` ile)
- Grid `align-items: stretch` → tüm kartlar aynı yükseklik

## 2. Gerekli Token'lar

`packages/ui/src/theme/tokens.css` üzerinden okunan token'lar:

| Token | Değer | Kullanım |
|---|---|---|
| `--sc-color-text-primary` | siyah | sayı |
| `--sc-color-text-tertiary` | gri (zayıf) | label |
| `--sc-color-state-success-fg` | yeşil koyu | yukarı trend |
| `--sc-color-state-success-bg` | yeşil 50 | yukarı pill bg |
| `--sc-color-state-danger-fg` | kırmızı koyu | aşağı trend |
| `--sc-color-state-danger-bg` | kırmızı 50 | aşağı pill bg |
| `--sc-color-bg-muted` | gri 10 | nötr pill bg |
| `--sc-font-mono` | Geist Mono | **tüm rakamlar** |
| `--sc-font-size-xs` | 12px | label, pill |
| `--sc-font-size-4xl` | ~36px | büyük sayı |
| `--sc-font-weight-medium` | 500 | label, pill |
| `--sc-font-weight-semibold` | 600 | büyük sayı |
| `--sc-line-height-tight` | 1.2 | sıkı satır arası |
| `--sc-letter-spacing-tight` | -0.01em | büyük sayı |
| `--sc-radius-full` | 9999px | pill |
| `--sc-space-2` | 8px | gap'ler |
| `--sc-space-4` | 16px | header/body alt margin |

## 3. CSS Modules (`cards.module.css`)

```css
/* ─────────────────────────────────────────────────
 * Modül İkonlu KPI Kartı — 3 katmanlı yapı
 * Header (ikon) / Body (label, flex:1) / Footer (sayı + pill)
 * ───────────────────────────────────────────────── */

/* Card root: grid içinde stretch ile tam yüksekliği kapla */
.statModuleCard {
  height: 100%;
}

/* AntD .ant-card-body'yi flex column'a çevirme inline bodyStyle ile yapılıyor
   (CSS Modules :global() Next 15 Webpack + AntD DOM mount edge case'inde
   "Cannot read properties of null (reading 'removeChild')" hatasına yol açar) */

/* ── Header — yalnız ikon ── */
.statModuleHeader {
  flex: 0 0 auto;
  margin-bottom: var(--sc-space-4);
}

.statModuleIcon {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
  flex-shrink: 0;
  display: block;
  opacity: 0.7;
}

/* ── Body — label, esnek alan ── */
.statModuleBody {
  flex: 1 1 auto;
  display: flex;
  align-items: flex-start;
  /* En az 2 satır rezerve et — tek kelime kartlarda da
     footer aynı baseline'da kalır */
  min-height: 2lh;
  margin-bottom: var(--sc-space-4);
}

.statModuleLabel {
  font-size: var(--sc-font-size-xs);
  font-weight: var(--sc-font-weight-medium);
  color: var(--sc-color-text-tertiary);
  line-height: var(--sc-line-height-tight);
  display: block;
  /* 18 karakterden sonra kır — 4-5 kelimeli label'lar 2 satıra düşer */
  max-width: 18ch;
  overflow-wrap: break-word;
}

/* ── Footer — büyük sayı + trend pill ── */
.statModuleFooter {
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  gap: var(--sc-space-2);
  flex-wrap: wrap;
}

.statValueMono {
  font-family: var(--sc-font-mono);
  font-size: var(--sc-font-size-4xl);
  font-weight: var(--sc-font-weight-semibold);
  color: var(--sc-color-text-primary);
  letter-spacing: var(--sc-letter-spacing-tight);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

/* ── Trend pill — renkli yüzde göstergesi ── */
.statTrendPill {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 8px;
  border-radius: var(--sc-radius-full);
  font-family: var(--sc-font-mono);
  font-size: var(--sc-font-size-xs);
  font-weight: var(--sc-font-weight-medium);
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
}

.statTrendPillUp {
  color: var(--sc-color-state-success-fg);
  background: var(--sc-color-state-success-bg);
}

.statTrendPillDown {
  color: var(--sc-color-state-danger-fg);
  background: var(--sc-color-state-danger-bg);
}

.statTrendPillFlat {
  color: var(--sc-color-text-tertiary);
  background: var(--sc-color-bg-muted);
}
```

## 4. JSX / TSX

### Sabit bodyStyle objesi (render başına yeni obje üretme)

Dosyanın üst seviyesinde:

```tsx
const STAT_MODULE_BODY_STYLE: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
```

### Import'lar

```tsx
import { ArrowUp, ArrowDown } from "@carbon/icons-react";
import { Card } from "@servicecoreui/ui/wraps";
import styles from "./cards.module.css";
```

### Grid container (4 kart yan yana, eşit yükseklik)

```tsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    alignItems: "stretch",
  }}
>
  {/* 4 kart buraya gelir */}
</div>
```

### Tek kart şablonu (yukarı trend)

```tsx
<Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
  <div className={styles.statModuleHeader}>
    <img
      src="/ikonlar/moduller/olay-yonetimi.svg"
      alt=""
      width={20}
      height={20}
      className={styles.statModuleIcon}
    />
  </div>
  <div className={styles.statModuleBody}>
    <span className={styles.statModuleLabel}>Olaylar</span>
  </div>
  <div className={styles.statModuleFooter}>
    <span className={styles.statValueMono}>6</span>
    <span className={`${styles.statTrendPill} ${styles.statTrendPillUp}`}>
      <ArrowUp size={12} /> %33
    </span>
  </div>
</Card>
```

### Aşağı trend varyantı (footer kısmı)

```tsx
<div className={styles.statModuleFooter}>
  <span className={styles.statValueMono}>1</span>
  <span className={`${styles.statTrendPill} ${styles.statTrendPillDown}`}>
    <ArrowDown size={12} /> %50
  </span>
</div>
```

### Nötr / flat trend varyantı (ok ikonu yok)

```tsx
<div className={styles.statModuleFooter}>
  <span className={styles.statValueMono}>1</span>
  <span className={`${styles.statTrendPill} ${styles.statTrendPillFlat}`}>
    %0
  </span>
</div>
```

## 5. Tam Örnek — 4 Kart Yan Yana

```tsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    alignItems: "stretch",
  }}
>
  {/* Kart 1 — tek kelime label, yukarı trend */}
  <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
    <div className={styles.statModuleHeader}>
      <img src="/ikonlar/moduller/olay-yonetimi.svg" alt="" width={20} height={20} className={styles.statModuleIcon} />
    </div>
    <div className={styles.statModuleBody}>
      <span className={styles.statModuleLabel}>Olaylar</span>
    </div>
    <div className={styles.statModuleFooter}>
      <span className={styles.statValueMono}>6</span>
      <span className={`${styles.statTrendPill} ${styles.statTrendPillUp}`}>
        <ArrowUp size={12} /> %33
      </span>
    </div>
  </Card>

  {/* Kart 2 — 4 kelime label (2 satır), aşağı trend */}
  <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
    <div className={styles.statModuleHeader}>
      <img src="/ikonlar/moduller/hizmet-masasi.svg" alt="" width={20} height={20} className={styles.statModuleIcon} />
    </div>
    <div className={styles.statModuleBody}>
      <span className={styles.statModuleLabel}>Bana Atanan Açık Çağrılarım</span>
    </div>
    <div className={styles.statModuleFooter}>
      <span className={styles.statValueMono}>1</span>
      <span className={`${styles.statTrendPill} ${styles.statTrendPillDown}`}>
        <ArrowDown size={12} /> %50
      </span>
    </div>
  </Card>

  {/* Kart 3 — 4 kelime label (2 satır), yukarı trend */}
  <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
    <div className={styles.statModuleHeader}>
      <img src="/ikonlar/moduller/istek-yonetimi.svg" alt="" width={20} height={20} className={styles.statModuleIcon} />
    </div>
    <div className={styles.statModuleBody}>
      <span className={styles.statModuleLabel}>Bana Atanan Açık İsteklerim</span>
    </div>
    <div className={styles.statModuleFooter}>
      <span className={styles.statValueMono}>11</span>
      <span className={`${styles.statTrendPill} ${styles.statTrendPillUp}`}>
        <ArrowUp size={12} /> %18
      </span>
    </div>
  </Card>

  {/* Kart 4 — tek kelime label, nötr trend */}
  <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
    <div className={styles.statModuleHeader}>
      <img src="/ikonlar/moduller/problem-yonetimi.svg" alt="" width={20} height={20} className={styles.statModuleIcon} />
    </div>
    <div className={styles.statModuleBody}>
      <span className={styles.statModuleLabel}>Problemler</span>
    </div>
    <div className={styles.statModuleFooter}>
      <span className={styles.statValueMono}>1</span>
      <span className={`${styles.statTrendPill} ${styles.statTrendPillFlat}`}>
        %0
      </span>
    </div>
  </Card>
</div>
```

## 6. Kritik Davranış Kuralları

### Eşit yükseklik nasıl çalışır

1. Grid container'da `align-items: stretch` (varsayılan zaten budur ama açıkça yazıldı)
2. Her Card'a `.statModuleCard { height: 100% }` → kart kendisi grid hücresinin tüm yüksekliğini kaplar
3. Card'ın AntD body'sine **inline `bodyStyle`** ile `height: 100%; display: flex; flexDirection: column`
4. Body içindeki üç çocuk:
   - `header` → `flex: 0 0 auto` (sadece içerik kadar)
   - `body` → `flex: 1 1 auto` (kalanı doldurur)
   - `footer` → `flex: 0 0 auto` (sadece içerik kadar)
5. Sonuç: kart toplam yüksekliği grid içindeki en uzun kartın boyutu, footer her zaman alt sınıra yapışık

### Label uzunluğu kart yüksekliğini değiştirmez

- `.statModuleLabel { max-width: 18ch }` → ~18 karakterden sonra zorla kırılır, "Bana Atanan Açık Çağrılarım" (27 karakter) iki satıra düşer
- `.statModuleBody { min-height: 2lh }` → label tek kelime bile olsa en az 2 satır kadar yer rezerve edilir
- Bu iki kural birlikte: hiçbir kart label genişliği yüzünden diğerlerinden daha uzun olamaz, footer her zaman aynı dikey hizada

### Rakam tipografisi

- Bütün sayı/yüzde içeren span'lar:
  - `font-family: var(--sc-font-mono)` — Geist Mono
  - `font-variant-numeric: tabular-nums` — her rakam aynı genişlik (tablo-stili)

### Hata önleme

- CSS Modules içinde `:global(.ant-card-body)` selector **kullanma**. Next 15 Webpack + AntD birlikteliğinde mount sırasında bazen `removeChild` null hatası verir. Bunun yerine AntD'nin yerli `bodyStyle` prop'unu kullan.
- `bodyStyle` objesini render dışında sabit tanımla (her render'da yeni referans olursa AntD gereksiz re-render yapar).

## 7. Modül İkonu Kaynakları

`/ikonlar/moduller/*.svg` — Carbon Design Icons 32px (viewBox 32×32, width/height attribute'u yok → CSS ile küçültülebilir). 25 dosya:

```
bilgi-yonetimi.svg, degisiklik-yonetimi.svg, discovery.svg,
entegrasyon-yonetimi.svg, esm.svg, gorev-yonetimi.svg,
hizmet-masasi.svg, is-akisi-yonetimi.svg, istek-yonetimi.svg,
low-code-gelistirme.svg, mobil-servis-yonetimi.svg, olay-yonetimi.svg,
problem-yonetimi.svg, proje-yonetimi.svg, raporlama-yonetimi.svg,
self-servis-portal.svg, servis-iliskileri-yonetimi.svg,
servis-katalog-yonetimi.svg, servis-konfigurasyon-yonetimi.svg,
servis-otomasyonu.svg, servis-seviye-yonetimi.svg, sozlesme-yonetimi.svg,
surekli-iyilestirme.svg, varlik-yonetimi.svg, yonetim-paneli.svg
```

İkonların Next.js public route'undan servis edilmesi için panel playground'da `apps/playground/public/ikonlar/moduller/` altına kopyalandı.

## 8. Boyut/Davranış Özeti

| Özellik | Değer |
|---|---|
| Card boyutu | `size="small"` + `subtle` |
| İkon | 20×20px, opacity 0.7 |
| Label font | 12px / medium / tertiary renk |
| Label max-width | 18ch (zorla 2 satıra düşürme) |
| Body min-height | 2lh (~29px) |
| Sayı font | Geist Mono 4xl / semibold / 100% line-height |
| Pill | 2px 8px padding, full radius, mono 12px |
| Header–Body gap | 16px (margin-bottom) |
| Body–Footer gap | 16px (margin-bottom) |
| Sayı–Pill gap | 8px (flex gap) |
| Grid gap | 16px |

Bu tablo ve kod bloklarıyla başka bir geliştirici aynı kartı sıfırdan kurabilir.
