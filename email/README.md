# ServiceCore — E-posta Sablonlari

Bu klasor ServiceCore icin e-posta kampanya sablonlarini icerir.

## Klasor Yapisi

```
email/
├── templates/          # Sablon turleri
│   ├── kampanya/       # Kampanya/promosyon e-postalari
│   ├── duyuru/         # Urun/ozellik duyurulari
│   └── davet/         # Etkinlik/demo davet e-postalari
├── components/         # Tekrar kullanilabilir bloklar (header, footer, CTA)
└── output/             # Museteriye teslim edilen son HTML dosyalari
```

## Kurallar

- E-posta sablonlari **pure HTML + inline CSS** olmalidir (mail client uyumlulugu)
- Renkler ve font bilgileri `../brand/tokens.json` dosyasindan alinir
- Ton ve mesaj dili `../brand/voice.json` dosyasindan alinir
- Logo ve gorseller `../brand/assets/` klasorunden alinir
- Her sablon responsive olmali (max-width: 600px)
- Teslim edilen dosyalar `output/` klasorune `YYYY-MM-DD_konu.html` formatiyla kaydedilir
