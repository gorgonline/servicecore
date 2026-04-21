# LinkedIn Tek Gorsel Post Sablonu

> Gorsel: 1200x1200 (kare) veya 1200x628 (landscape)
> Kaynak: brand/tokens.json + brand/voice.json

---

## Post Metni Formati

```
{{HOOK_CUMLESI}}

{{GORSEL_BAGLAMI — gorselin ne gosterdigini kisa acikla}}

{{DEGER_ACIKLAMASI — 2-3 cumle, kullaniciya ne kazandirir}}

{{CTA — link veya aksyon}}

#ITSM #ESM #ServiceCore #ITIL4
```

---

## Gorsel Tasarim Kurallari

### Renkler (tokens.json'dan)
- Arkaplan: #010E21 (surface.base)
- Metin: #FFFFFF (text.primary)
- Alt metin: #94A3B8 (text.secondary)
- Aksan: #0070F3 (brand.primary)
- Ikincil aksan: #10B981 (brand.secondary)
- Border: rgba(255, 255, 255, 0.10)

### Tipografi
- Font: Geist Sans
- Baslik: 48-60px, bold, tracking-tight
- Alt baslik: 24-30px, light
- Govde: 18-20px, light

### Layout
- Max 6-8 kelime baslik
- Logo sol ust veya alt orta
- Temiz, minimalist — fazla eleman yok
- ServiceCore mavi glow efekt (opsiyonel)

### Gorsel Turleri
1. **Stat gorsel**: Buyuk rakam + kisa aciklama ("4M+ kullanici")
2. **Alinti gorsel**: Musteri veya uzman alintilarini
3. **Before/After**: Surec iyilestirme karsilastirmasi
4. **Ozellik tanıtımı**: Tek ozellik, buyuk screenshot + overlay metin
5. **Infografik**: Basit, 3-4 maddeli veri gorsellestirme

---

## Ornek Dosya Yapisi

```
linkedin/posts/2026-04-01_otomasyon-rakamlar/
├── post.md          ← LinkedIn post metni
└── gorsel-stat.png  ← 1200x1200 stat gorseli
```
