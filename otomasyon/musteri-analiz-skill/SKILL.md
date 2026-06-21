---
name: musteri-toplanti-analizi
description: >-
  ServiceCore müşteri/demo toplantısı transcript'lerini derinlemesine analiz eder: müşterinin
  gerçek (söylenenin altındaki) ihtiyacını, niyetini, karar yapısını ve bütçesini, açık + örtük
  itirazlarını, satın alma sinyallerini, rakip/statüko imalarını, risklerini ve ekibin göremeyeceği
  pattern'leri çıkarır. Çıktı: olgu/çıkarım + güven seviyesiyle etiketli, kanıt alıntılı bir Word
  raporu ve Erman'a gönderilmek üzere bir TASLAK e-posta. Bir toplantı/görüşme/demo transcript'i
  (TXT) verildiğinde veya "şu görüşmeyi analiz et", "müşteri toplantısı analizi", "demo analizi",
  "niyet analizi", "bu call'da müşteri ne istiyor", "teklif için pattern çıkar", "müşteriyi analiz et",
  "sales call analysis", "analyze this customer/demo call" gibi her durumda MUTLAKA bu skill'i kullan.
  Toplantı iç ekip toplantısıysa hafif özet + Levent'i ilgilendiren uyarılar; müşteri toplantısıysa
  tam derin analiz uygula.
---

# Müşteri Toplantısı Derin Analizi

## Bu skill ne için var

Amaç, bir satış/demo görüşmesinin transcript'inden **ekibin gözünden kaçanı** çıkarmak: müşterinin
ağzından çıkan talebin altındaki gerçek ihtiyacı, niyetini, kararı kimin verdiğini, neye gerçekten
takıldığını ve bir sonraki görüşmede/teklifte işe yarayacak kaldıraçları. Yüzeysel bir özet değil;
**satışı ilerletecek istihbarat** üretiyoruz.

İki temel ilke:

1. **Onların dünyasıyla başla, ürünle değil.** Çoğu kayıp, ürünü doğru anlatamamaktan değil, müşterinin
   gerçekte ne aldığını yanlış okumaktan olur. Önce müşteriyi çöz.
2. **Olgu ile çıkarımı asla karıştırma.** Niyet "sezmek" tahmindir. Her bulguyu kanıtıyla işaretle ki
   ekip neye güvenip neye temkinli yaklaşacağını bilsin. Güveni hak edilmeden verme.

## Adım 1 — Transcript'i tam oku ve sınıflandır

Transcript'i **baştan sona** oku (uzun olabilir; sayfalıysa hepsini oku, ilk sayfayla yetinme).
Sonra toplantıyı sınıflandır:

- **İç ekip toplantısı** — tüm katılımcılar ServiceCore/Gorgo tarafındansa. `references/servicecore-baglam.md`
  içindeki iç ekip listesine bak. Bu durumda derin analiz YAPMA; sadece kısa bir özet + Levent'i
  ilgilendiren aksiyon/uyarıları çıkar ve dur.
- **Müşteri toplantısı** — katılımcılar arasında dışarıdan (müşteri firmasından) biri varsa. Tam derin
  analizi uygula (Adım 2–6).

Emin değilsen müşteri toplantısı varsay ve kullanıcıya tek satırlık sınıflandırmanı söyle.

Her analizden önce `references/servicecore-baglam.md`'yi oku — ServiceCore'un ideal müşteri profili,
sık görülen itirazlar, kazanılan/kaybedilen deal pattern'leri burada birikiyor. Bu bağlam analizi
sıfırdan değil, birikmiş tecrübeyle yaptırır.

## Adım 2 — 9 mercekten analiz

Her merceği transcript'ten **kanıtla** doldur. Boş geçme; sinyal yoksa "bu görüşmede sinyal yok" yaz.

1. **Açık talep vs gerçek ihtiyaç.** Müşteri ne istedi (kelimeleri) ve altında yatan asıl iş ne?
   Çoğu zaman ilk söylenen, gerçek motivasyonun sadece kabuğudur.
2. **Niyet & aciliyet.** Neden şimdi? Gerçek tetikleyici ne? Deadline/baskı var mı, yoksa keşif mi?
   Aciliyet yoksa bunu açıkça yaz — drift riski demektir.
3. **Karar yapısı & bütçe.** Champion kim, ekonomik alıcı (parayı onaylayan) kim, engelleyici kim?
   Bütçe/fiyat sinyalleri, kullanıcı/lisans sayıları, satın alma modeli.
4. **İtirazlar & endişeler — açık + örtük.** Açıkça dile getirilenler kadar, *sormadıkları ama
   davranışlarından okunan* endişeler (tekrar tekrar dönülen konu, temkinli dil, hızla geçilen alan).
5. **İlgi/satın alma sinyalleri vs soğukluk.** Sıcak: teklif/fiyat sorma, kendi senaryosunu ürüne
   giydirme, rollout planlama. Soğuk: deadline yokluğu, gelişmiş özelliklere sıfır tepki.
6. **Rakip / statüko / mevcut çözüm imaları.** Çoğu B2B'de asıl rakip başka bir ürün değil,
   **statüko** (mevcut yöntem, kağıt, "şimdilik idare ediyoruz"). Onu tespit et.
7. **Riskler.** Bu deal'i kaybettirebilecek şeyler — önem sırasına göre, her birine azaltma hamlesiyle.
8. **Görmedikleri pattern'ler — raporun ASIL değeri.** Tek tek doğru ama birleşince yeni anlam veren
   şeyler: söyledikleri ile ima ettikleri arasındaki çelişki, tekrar eden temalar, ürünün ağırlık
   merkezi ile alıcının ağırlık merkezinin ayrışması, gizli genişleme/daralma sürücüleri. Burada
   cesur ol ama her iddiayı güven seviyesiyle işaretle.
9. **Sonraki adım & teklifte ne vurgulanmalı.** Somut, uygulanabilir: anlatıyı nasıl kur, kapsamı
   nasıl çerçevele, fiyatı nasıl konumla, hangi kanıtı/demoyu hazırla, içeride kim kime nasıl satsın.

## Adım 3 — Her bulguyu etiketle

Her iddianın sonuna etiket koy:

- **[Olgu]** — transcript'te açıkça söylendi (mümkünse alıntı + zaman damgası ver).
- **[Çıkarım · güven: yüksek/orta-yüksek/orta/düşük]** — yorumla çıkarıldı.

Niyet okuması doğası gereği tahmindir; ekibin teklif kararlarını yüksek güvenli bulgulara
dayandırabilmesi için bu ayrım şart. Uydurma yok: transcript'te olmayan kişi/sayı/olay ekleme.
Zayıf temelli bir sezgiyi "düşük güven" diye işaretlemek, onu atlamaktan iyidir — ama abartma.

## Adım 4 — Raporu üret (Word)

Analizi `content.json` olarak yapılandır ve paketteki script ile tutarlı, doğrulanmış bir .docx üret.
Şema ve örnek için `references/rapor-format.md`'yi oku. Çalıştırma:

```bash
cd <skill>/scripts && npm install docx --no-audit --no-fund --loglevel=error
node build_report.js /yol/content.json "/çıktı/2026-06-19_<Musteri>_Analiz.docx"
```

Rapor bölüm sırası `references/rapor-format.md`'de sabit; ondan sapma. Dosya adı
`YYYY-MM-DD_<Musteri>_<ToplantiTipi>_Analiz.docx` ve müşteriye ait klasöre kaydedilir.

## Adım 5 — Erman'a TASLAK e-posta

Kısa, yönetici diline uygun bir e-posta taslağı hazırla (rapor eki + 4-6 maddelik öz). Şablon
`references/rapor-format.md` içinde.

**Asla otomatik gönderme.** Her zaman taslak olarak hazırla, kullanıcı (Levent) gözden geçirip
göndersin. Müşteri istihbaratı hassastır; yanlış bir cümle ilişkiye zarar verebilir. Gmail bağlıysa
taslağı oluşturabilirsin ama gönderme adımını kullanıcının onayına bırak.

## Adım 6 — Müşteri hafızasını güncelle

Bu müşteri için yaşayan bir profil tut/güncelle (deal adı, profil, karar yapısı, açık riskler, son
durum, rapor yolu). Asıl pattern gücü buradan gelir: aynı müşteriyle birden çok görüşme biriktikçe
tutarsızlıkları, tutum değişimini ve tekrar eden temaları yakalarsın. Önceki görüşme(ler) varsa bu
analizi onlarla karşılaştır ("geçen sefer X dediler, bu sefer Y").

## Geri besleme ile keskinleşme

Deal kapandıkça (kazanıldı/kaybedildi) sonucu ve "neyi doğru/yanlış okuduk" notunu
`references/servicecore-baglam.md`'ye işle. Skill böyle öğrenir: her döngüde ServiceCore'un gerçek
kazanma/kaybetme pattern'leri çerçeveye gömülür.

## Kapsam dışı

- Hukuki/finansal kesin tavsiye verme; sinyalleri sun, kararı ekibe bırak.
- Transcript yoksa analiz uydurma; iç toplantı özetinde derin müşteri analizine girme.
