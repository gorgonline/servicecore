# teklif/ — ServiceCore Zoho CRM Teklif Şablonu

Zoho CRM **Inventory (Quotes) template** olarak import edilen, premium, beyaz/açık,
A4-yazdırılabilir HTML teklif dosyası. Tek kaynak `brand/`'den beslenir.

## Dosyalar
- `servicecore-teklif-ornek.html` — **örnek** (2 sayfa: Kapak + Modül Vitrini). Hem tarayıcıda
  önizlenir, hem Zoho'ya import yapısına uygundur. Görsel yön onayı için bu kullanılır.
- `assets/` — `logo.png` = `brand/assets/logov2@2x.png` (beyaz-zemin amblemi). Wordmark ("servicecore")
  metin olarak çizilir (service koyu + core mavi), görsel değil. Tarayıcı önizlemesi için.
- *(onay sonrası)* `servicecore-teklif.html` — tam 14 sayfalık şablon.

## Hızlı önizleme
`teklif/servicecore-teklif-ornek.html` dosyasını çift tıkla → tarayıcıda aç. İki sayfa
(Kapak + Modül Vitrini) alt alta görünür. `${...}` alanları Zoho'da gerçek veriyle dolar;
tarayıcıda ham metin görünür (normal).

## Zoho'nun kıramayacağı tasarım — uyulan kurallar
Zoho yeni PDF motoru = **Flying Saucer (XHTML + CSS 2.1)**, tarayıcı değil. Bu yüzden:

| Kural | Uygulama |
|---|---|
| flex / grid / `var()` / transform / gradient / box-shadow YOK | Tüm layout iç-içe `<table>`, renkler literal hex |
| İyi-biçimli XHTML | Tüm etiketler kapalı (`<img ... />`, `<br />`), nitelikler tırnaklı |
| Tek `<style>` bloğu + inline | Harici CSS/`<link>` yok |
| Section iskeleti | `header-container` / `page-container` (`pdfgen-content`) / `footer-container` |
| Sayfa no | `<span class="pageNumber"></span> / <span class="totalPage"></span>` |
| Web-safe font | Arial/Helvetica (Geist PDF'te render olmaz; Türkçe glyph sorunsuz) |
| Sayfa kırma | `page-break-before:always` (yeni sayfa), `page-break-inside:avoid` (bölünmesin) |
| 32.000 karakter limiti | Görseller base64 DEĞİL, hosted URL; paylaşılan CSS sınıfları |

## Görsel barındırma (KARAR: website public/)
Görseller `website/public/teklif/` altına konur, Vercel'den servis edilir:
`https://<ALAN-ADI>/teklif/logo.png` gibi. **Zoho relative yol ve SVG kabul etmez** —
sadece mutlak HTTPS PNG/JPEG/GIF.

> ⚠️ **Doğrulanacak:** website'in canlı alan adı (`servicecore.com.tr` mi `servicecore.app` mi?).
> README'deki `<ALAN-ADI>` bununla değiştirilecek.

## Zoho'ya import adımları
1. `website/public/teklif/` altına `logo.png` + `symbol.png` (+ ileride mock görseller) yükle, deploy et.
2. HTML'de `src="assets/` → `src="https://<ALAN-ADI>/teklif/` olarak değiştir (find/replace).
3. Zoho CRM → Setup → Templates → Inventory Templates → Quote → **boş şablon** → "Insert HTML / Edit HTML code" ile yapıştır.
4. Page Setup'tan **A4 + margin** ayarla (Zoho UI'den, CSS `@page` ile değil).
5. **Hemen test PDF üret**: sayfa kırma, footer tekrarı, font fallback, `${...}` dolumu, satır-ürün klonlama doğru mu kontrol et.
6. Master kopyayı **her zaman bu repo'da** tut — Zoho editörü her kayıtta HTML'i yeniden akıtır/bozabilir.

## Merge alanları (örnekte kullanılan)
`${Quotes.Account Name}` · `${Quotes.Subject}` · `${Quotes.Quote Number}` ·
`${Quotes.Created Time}` · `${Quotes.Valid Until}` · `${Quotes.Contact Name}` ·
`${Organization.Organization Name}` · `${Organization.Phone}`

> Satır-ürün tablosu (tam sürümde): `<tbody id="lineItem">` içine **tek `<tr>`** —
> Zoho her ürün için klonlar. Hücreler `${Product Details.Product Name}` vb.
> Türkçe/özel alan etiketleri kendi org'unuzun field-picker'ı ile doğrulanmalı.

## Tam sürüm — 14 sayfa akışı (onaylandı)
Altın kural: **değer → fiyat → risk-azaltma**.

1. Kapak ✅(örnek) · 2. Yönetici Özeti · 3. İhtiyaç & Mevcut Durumun Maliyeti ·
4. Modül Vitrini ✅(örnek) · 5. Farklılaştırıcılar (isimsiz anlatı) · 6. Güvenlik/Uyum/On-Premise ·
7. Değer Gerekçesi ROI/TCO · 8. Fiyat Tablosu (lineItem) · 9. Kurulum/Geçiş Planı ·
10. Destek/SLA/Uzman Ekip · 11. Referanslar & Vaka · 12. Sonraki Adımlar · 13. Şartlar · 14. Ekler

## İçerik kaynakları (repo)
- Modüller: `website/src/data/moduller.json`
- Farklılaştırıcılar (48): `website/src/data/fark-var.json`
- Referanslar: `website/src/data/references.json`
- Lisans kademeleri: `website/src/data/pricing-itsm.json`
- Teknik/uyum: `website/src/data/specsheet.json`
- Marka: `brand/tokens.json` (#0070F3), `brand/voice.json`

## Teyit bekleyen açık maddeler
- Canlı alan adı (görsel URL'leri için).
- Kullanıcı sayısı istatistiği: `voice.json` **600.000+** diyor, araştırmada **4M+** geçti — hangisi?
- Para birimi (TL / USD) ve fiyat sunumu (tek-fiyat anchor vs kademe tablosu).
- Uzman ekip sayfası için gerçek danışman isim/biyografi/sertifika paylaşılabilir mi.
- Gösterilebilecek gerçek sertifikalar (ISO 27001 / SOC 2 / KVKK).
