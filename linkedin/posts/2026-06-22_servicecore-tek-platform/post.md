# Pazartesi — ServiceCore: Tek Platform (statement)

**Tarih:** 2026-06-22 (Pazartesi)
**Kanal:** LinkedIn (1:1, 1200×1200)
**Hafta planı:** Gün 1/6 · Format: Tek kare statement (saf tipografik manifesto)
**Ürün:** ServiceCore (şemsiye platform)

## Caption

ITSM ve proje yönetimi artık ayrı dünyalar değil.

Servis masanız, varlıklarınız ve projeleriniz tek platformda — ITIL 4 uyumlu süreçlerle birlikte çalışır. 24+ modül, tek omurga.

25 yıllık ITSM deneyimi, yerli mühendislik gücü. 600.000+ kullanıcı.

Demo İste → servicecore.com.tr

#ITSM #ITIL4 #ESM #ServiceCore #DijitalDonusum #ServisYonetimi

## Görsel (post.png — 2400×2400 @2x)

Saf tipografik manifesto:
- **Eyebrow:** "TEK PLATFORM"
- **Dev başlık:** "ITSM ve proje yönetimi, **tek omurgada.**" (mavi→camgöbeği→mor gradient)
- **Alt çizgi** + 3 güven çipi: `24+ modül` · `600.000+ kullanıcı` · `25 yıl ITSM deneyimi`
- **CTA pill:** "Demo İste →"
- **Footer:** ServiceCore logo + servicecore.com.tr
- Arka planda ince dikey "omurga" çizgisi (iki uçta parlayan düğüm) — "tek omurga" mesajını görselleştirir.
- Koyu zemin + mesh glow + grid; renkler `brand/tokens.json`'dan (hardcoded hex yok).

## Üretim

```
# Kanonik (playwright kuruluysa):
node render.mjs post 1200

# Chrome fallback (playwright tarayıcısı kurulu değilse — bu görsel bununla üretildi):
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
