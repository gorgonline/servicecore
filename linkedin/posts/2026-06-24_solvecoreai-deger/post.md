# Çarşamba — SolveCoreAI: Uydurmayan AI (carousel)

**Tarih:** 2026-06-24 (Çarşamba)
**Kanal:** LinkedIn + Instagram (1:1 carousel, 4 slide)
**Hafta planı:** Gün 3/6 · Format: Carousel (değer odaklı, tek AI)
**Ürün:** AICore — SolveCoreAI

## Caption
Çoğu yapay zekâ her şeyi modele yıkar. SolveCoreAI farklı: emin olmadığında uydurmaz — ya susar ya da kararı insana bırakır.

Bir destek talebini 30 saniyede özetler, benzer çözülmüş vakayı kaynağıyla bulur ve tek net 'sıradaki adım'ı önerir. Her öneri kaynağını gösterir.

Sonuç: daha hızlı çözüm, ekibinizde kalan güven.

#AICore #YapayZeka #AgenticAI #ITSM #ITIL4 #ServiceCore

## Slide'lar (slide-1..4.png — 2400×2400 @2x)
1. Kapak: "Uydurmayan yapay zekâ." — SolveCoreAI
2. Değer–Hız: "30 dakika → 30 saniye" (talep özeti: durum/denenenler/son nokta)
3. Değer–Güven: "Kara kutu değil, cam kutu." (öneri + kaynak rozeti)
4. Kapanış: "Demo İste →" servicecore.com.tr

> İçerik gerçek SolveCoreAI projesinden derlendi; tüm ticket/INC değerleri kurgu (gerçek müşteri verisi yok). İç detay (port/cron/db/model) yayınlanmaz kuralına uygun olarak dışarıda bırakıldı.

## Üretim
```
# her slide için:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
  --force-device-scale-factor=2 --window-size=1200,1200 \
  --default-background-color=00000000 --virtual-time-budget=2500 \
  --screenshot="slide-N.png" "file://$PWD/slide-N.html"
```

## Durum
- [x] Tasarım üretildi (4 slide)
- [x] Zernio'ya zamanlandı (2026-06-24 11:00, LinkedIn + Instagram)
