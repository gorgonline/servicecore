# ServiceCore — LinkedIn Icerik ve Sablonlari

Bu klasor ServiceCore icin LinkedIn post ve gorsel sablonlarini icerir.

## Klasor Yapisi

```
linkedin/
├── templates/          # Sablon turleri
│   ├── carousel/       # Coklu gorsel/slayt postlari
│   ├── tek-gorsel/     # Tek gorsel + metin postlari
│   └── text-post/      # Salt metin postlari
├── posts/              # Uretilen postlar (metin + gorseller)
└── assets/             # Post'a ozel gorseller ve ikonlar
```

## Kurallar

- Gorseller 1200x1200 (kare) veya 1200x628 (landscape) olmali
- Carousel slaytlari 1080x1350 (portrait) olmali
- Renkler ve font bilgileri `../brand/tokens.json` dosyasindan alinir
- Ton ve mesaj dili `../brand/voice.json` dosyasindan alinir
- Her post klasoru: `posts/YYYY-MM-DD_konu/` formatiyla olusturulur
  - `post.md` — LinkedIn post metni
  - `gorsel-*.png` — Posta eslik eden gorseller
