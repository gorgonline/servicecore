---
name: review
description: "ServiceCore UI audit. Mevcut sayfayi tasarim diline gore denetle. Use when user says 'review', 'kontrol et', 'denetle', 'audit', 'tasarimi kontrol et'."
user-invocable: true
---

# ServiceCore UI Review

Mevcut sayfayi/component'i ServiceCore tasarim diline gore denetle.

## Adim 1: Ortam Kontrolu

!cat website/package.json | grep -A 30 '"dependencies"' 2>/dev/null || echo "package.json bulunamadi"

Kontrol:
- [ ] Next.js var mi?
- [ ] Tailwind var mi?
- [ ] Framer Motion var mi?
- [ ] Geist font yuklu mu?

## Adim 2: Hedef

Kullanici su dosyayi/sayfayi denetlemek istiyor: $ARGUMENTS

Dosya belirtilmediyse sor.

## Adim 3: Audit

### Renk
- [ ] Hardcoded hex var mi? → tokens referansi kullan
- [ ] Light tema/beyaz arkaplan var mi? → koyu yuzey kullan
- [ ] Gradient/glow eksik mi? → ekle

### Glassmorphism
- [ ] Kartlarda bg-white/5 + border-white/10 + backdrop-blur var mi?
- [ ] Flat kart var mi? → glass yap

### Animasyon
- [ ] Spring-based mi? Linear var mi? → spring yap
- [ ] prefers-reduced-motion kontrol ediliyor mu?
- [ ] Interaktif element var mi?

### Tipografi
- [ ] Geist kullaniliyor mu?
- [ ] Baslik: bold/semibold, tracking-tight?
- [ ] Govde: font-light, text-secondary?

### Kod
- [ ] any tipi var mi?
- [ ] cursor-pointer eksik mi?
- [ ] next/image + Turkce alt?
- [ ] Route izolasyonu saglaniyor mu?

### Icerik
- [ ] Hardcoded string var mi? → JSON'a tasi

## Adim 4: Rapor

Her sorun icin: dosya:satir → sorun → oneri

Sonuc JSON:
```json
{
  "verdict": "GECTI | KALDI | KISMI",
  "sorun_sayisi": 0,
  "sorunlar": [],
  "ozet": "1-2 cumle"
}
```

## Kurallar
- Fonksiyonel degisiklik YAPMA — sadece denetle ve raporla
- Emin olmadigin degisiklikte kullaniciya sor
- Tek seferde tum projeyi denetleme — dosya/sayfa bazli ilerle
