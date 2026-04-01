# LinkedIn Carousel Sablonu

> Slayt boyutu: 1080x1350 (portrait)
> Kaynak: brand/tokens.json + brand/voice.json
> Max slayt: 10 (LinkedIn limiti)

---

## Post Metni Formati

```
{{HOOK_CUMLESI}}

{{CAROUSEL_OZETI — 1-2 cumle, ne ogrenecekler}}

Slaytlari kaydir →

{{CTA — kaydet, paylas veya link}}

#ITSM #ESM #ServiceCore #ITIL4 #ServisYonetimi
```

---

## Slayt Yapisi (Onerilen 6-8 slayt)

### Slayt 1 — Kapak
- Buyuk baslik (max 6 kelime)
- Alt baslik (1 cumle)
- ServiceCore logo (sol ust)
- Arkaplan: #010E21 + subtle glow

### Slayt 2-7 — Icerik Slaytlari
- Her slayt TEK bir fikir/madde
- Numara (buyuk, aksan rengi) + baslik + 1-2 cumle aciklama
- Opsiyonel: kucuk ikon veya gorsel
- Tutarli layout — her slayt ayni grid

### Slayt 8 — Kapaniş/CTA
- Ozet veya sonuc cumlesi
- CTA: "Demo Iste" / "Detaylar icin link bio'da"
- ServiceCore logo + web adresi

---

## Gorsel Tasarim Kurallari

### Renkler (tokens.json'dan)
- Arkaplan: #010E21 (surface.base)
- Icerik alani: rgba(255, 255, 255, 0.02) kartlar
- Border: rgba(255, 255, 255, 0.05)
- Numara/aksan: #0070F3 (brand.primary)
- Baslik: #FFFFFF
- Govde: #94A3B8
- Vurgu: #10B981 (emerald, pozitif/basari icin)

### Tipografi
- Font: Geist Sans
- Kapak basligi: 48px, bold
- Slayt basligi: 32px, semibold
- Slayt govde: 20px, light
- Numara: 64px, bold, aksan rengi

### Layout Kurallari
- Padding: 60px her yonden
- Ust: numara veya ikon
- Orta: baslik
- Alt: aciklama metni
- Her slayt ayni hizalamada — tutarlilik kritik

---

## Carousel Konu Ornekleri

1. "ITIL4'e Gecis: 5 Kritik Adim"
2. "Servis Masasi Metriklerinizi Nasil Olcersiniz?"
3. "IT Otomasyon Yol Haritasi: 7 Aşama"
4. "ITSM Arac Seciminizde Dikkat Etmeniz Gereken 6 Kriter"
5. "Dijital Donusum Hatalarınız: Bunlardan Kaciniz"

---

## Ornek Dosya Yapisi

```
linkedin/posts/2026-04-01_itil4-gecis/
├── post.md              ← LinkedIn post metni
├── gorsel-01-kapak.png  ← 1080x1350
├── gorsel-02.png
├── gorsel-03.png
├── gorsel-04.png
├── gorsel-05.png
├── gorsel-06.png
├── gorsel-07.png
└── gorsel-08-cta.png
```
