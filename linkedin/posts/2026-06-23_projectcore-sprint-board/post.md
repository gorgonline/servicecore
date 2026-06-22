# Salı — ProjectCore: Sprint Board (ürün ekranı / mockup)

**Tarih:** 2026-06-23 (Salı)
**Kanal:** LinkedIn (1:1, 1200×1200)
**Hafta planı:** Gün 2/6 · Format: Ürün ekranı / mockup (tasarlanmış UI, gerçek veri yok)
**Ürün:** ProjectCore (Agile proje yönetimi modülü)

## Caption

Sprint'iniz tek ekranda.

Backlog'tan teslimata: Scrum ve Kanban panoları, story point bazlı sprint kapasitesi, velocity trendleri ve efor KPI'ları — hepsi tek ProjectCore ekranında.

Servis masanız ve geliştirme ekibiniz aynı platformda, ITIL 4 uyumlu süreçlerle çalışır.

Demo İste → servicecore.com.tr

#ProjectCore #Agile #Scrum #Kanban #ITSM #ProjeYonetimi #ServiceCore

## Görsel (post.png — 2400×2400 @2x)

Tasarlanmış ProjectCore board mockup'ı (gerçek müşteri verisi yok):
- **Eyebrow:** "PROJECTCORE · AGILE BOARD" + başlık "Sprint'iniz **tek ekranda.**"
- **App penceresi:** ProjectCore logo + "Sprint 24 · Servis Masası" + sprint kapasitesi barı (38/45 SP) + ekip avatarları
- **4 kolon:** Backlog · Yapılıyor · İncelemede · Bitti — renk kodlu etiketler (Özellik/Hata/İyileştirme), story point çipleri, ilerleme barları, atanan avatarları
- **Alt şerit:** Velocity sparkline + KPI'lar (Tamamlanan 9/13 · Bu sprint 38 SP · Kalan 4 gün)
- Koyu premium UI, marka renkleri `brand/tokens.json`'dan (hardcoded hex yok).

## Üretim

```
# Chrome ile (bu görsel bununla üretildi):
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
  --force-device-scale-factor=2 --window-size=1200,1200 \
  --default-background-color=00000000 --virtual-time-budget=2500 \
  --screenshot="post.png" "file://$PWD/post.html"
```

## Onay
- [x] Tasarım üretildi (post.png)
- [ ] Levent onayı (caption + görsel)
- [ ] Yayın
