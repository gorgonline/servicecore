---
name: micro-interactions
description: Animasyon tasarim kararlari. Hover, scroll, stagger, form feedback icin kullan. Kod icermez.
user-invocable: false
---

# Mikro-Etkilesim Kararlari

NE animasyon olacagini tanimlar, KOD YAZMAZ. Spring degerleri: brand/tokens.json.

## Component Bazli

### Butonlar
- Hover: hafif yukselme + glow artisi
- Press: scale 0.95

### Kartlar
- Hover: border opakligi artsin + scale 1.05
- Icerideki ikon: hover'da renk degisimi

### Listeler
- Stagger giris: 50-100ms arayla
- Fade-in + yukari kayma

### Form
- Focus: ring animasyonu
- Error: hafif shake (3px, 200ms)
- Success: kisa yesil glow flash

### Scroll
- Viewport'a girince: fade-in yukari
- once: true, margin: -100px

## Timing

| Etkilesim | Sure | Tip |
|-----------|------|-----|
| Hover | 100ms | ease-out |
| Tiklama | 100ms | ease-out |
| Toggle | 150-200ms | spring |
| Sayfa gecisi | 300ms | ease-out |

## Kurallar
- Her interaktif elemanin feedback'i olmali
- Disabled: animasyon yok, opacity azaltilmis
- prefers-reduced-motion her zaman saygi gosterilecek
