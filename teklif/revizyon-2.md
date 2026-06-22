# REVİZYON 2 — Erman'ın Zoho PDF testi sonrası geri bildirimleri

Dosya: `teklif/servicecore-teklif.html`. Zoho'ya import edilip A4 PDF üretildi. Aşağıdaki maddeler EKSİKSİZ uygulanacak. Zoho/Flying Saucer kısıtları, Türkçe entity, büyük "İ" kuralı (İngilizce kelimede düz I), 44 fark / 55 logo / 16 koşul içeriği, "Proof Drive" = 0, dış www logo URL'leri KORUNUR.

## 0. LOGO (BİTTİ — DOKUNMA)
ServiceCore logosu artık `https://www.servicecore.com.tr/teklif/logo.png` (sembol+wordmark birleşik, beyaz zemin). Tekrar eden metin-wordmark (.wm / .wm-lg) kaldırıldı. Bunlara dokunma.

## 1. "YATIRIM" KELİMESİNİ ÇIKAR (pazarlama metninde — referans firma adlarına DOKUNMA)
Sadece şu metinleri değiştir:
- Kapak overline: `Kurumsal ITSM / ESM Platformu — Yatırım Teklifi` → `Kurumsal ITSM / ESM Platformu`
- Kapak lead: `...için hazırlanmış yatırım teklifidir.` → `...için hazırlanmış tekliftir.`
- Fiyat sayfası overline: `Yatırım ve Lisanslama` → `Teklif ve Lisanslama`
- Fiyat sayfası h2: `Teklif ve yatırım özeti.` → `Teklif özeti.`
- Fiyat sayfası lead: `Bu yatırım;` → `Bu teklif;`
DİKKAT: Referans firma adlarındaki "Yatırım" (Yıldızlar Yatırım Holding, İntegral Yatırım, Aytemiz Yatırım Bankası, Kuveyttürk Yatırım) KALACAK.

## 2. KAPAK (A4'e tam otursun, alt boşluk dolsun + uzun isim taşmasın)
- `.cover-title` font-size 46px → 32px; ayrıca `word-wrap:break-word` ekle ki uzun firma adları (`${Quotes.Account Name}`) taşmasın, alt satıra sarsın. line-height 1.1.
- Kapak içeriği A4'in ÜST 2/3'ünde kalıp altta yarım sayfa boşluk bırakıyor. Dikey ritmi artırarak (mevcut `spacer-l`/`spacer-m`/`spacer-s` bloklarını çoğaltıp/büyüterek) içeriği A4 yüksekliğine yay; "Sınıflandırma … Confidential" bloğu sayfanın ALT kısmına insin. Hiç içerik ekleme/çıkarma — sadece boşlukları dengele.

## 3. YÖNETİCİ ÖZETİ (çok kısa — yarım A4 boş; doldur)
Mevcut 01/02/03 akışı + meta + özet callout'tan SONRA, sayfayı dolduracak müşteri-odaklı bir blok EKLE (didaktik/"ders verir" ton YOK; düz, faydalı Türkçe):
- Başlık: `<p class="fk-h">Bu teklif neleri kapsar</p>` benzeri küçük başlık (mevcut sınıfları kullan).
- 2 kolonlu kısa "kapsam" listesi (mevcut `nose`/`meta` veya basit tablo sınıflarıyla, kare köşe): 6-8 madde — ör.: "30+ native modül, 16 ITIL4 süreci · On-premise kurulum (veri sizde) · Yalnız teknisyen lisansı, sınırsız son kullanıcı · Tüm bakım+güncelleme abonelikte dahil · ITIL Expert sertifikalı yerli danışman · Türkçe ürün + yerel destek · Hibrit/karma lisanslama · Kurulum, eğitim ve devreye alma". Kısa, fayda cümleleri.
- Sayfa A4'i rahat dolduracak ama TAŞMAYACAK kadar (üst/alt nefes payı kalsın).

## 4. MEVCUT DURUMUN MALİYETİ — COI (ders verme, müşteri diliyle; A4'e otur)
Tablo/rakamlar KALIR. Didaktik/retorik dili müşteri-dostu, bilgilendirici tona çevir:
- h2 `Asıl soru: değişimin değil, değişmemenin maliyeti.` → `Mevcut dağınık yapının yıllık görünmeyen maliyeti.`
- lead `Yeni bir platformun maliyetini sormadan önce, mevcut dağınık yapının bugün size ne kadara mal olduğunu görelim. ...` → daha düz: `Aşağıdaki kalemler, dağınık araç ve manuel süreçlerin tipik yıllık yükünü gösterir; sektör benchmark'ıdır ve analiz formuyla kurumunuza özel hesaplanır.`
- Alttaki callout `Soru "ServiceCore ne kadar?" değil — "mevcut dağınıklık her yıl ne kadarınızı götürüyor?"` (retorik/ders verir) → değer cümlesi: `Bu görünmeyen maliyetler, tek platforma geçişle büyük ölçüde ortadan kalkar.`
- "premium" / kendini öven / soru-sorup-ders-veren her ifadeyi düzelt.
- Sayfa A4'e otursun (altta boşluk varsa dikey ritmi dengele; içerik taşmasın).

## 5. FİYAT SAYFASI (alttaki teklif tablosuna yer aç)
- `<table class="recap avoid">…</table>` bloğunu (ve "deger-recap" yorumunu) TAMAMEN SİL.
- 3 lisans kademesi `<table class="tier avoid">…</table>` bloğunu (Standart/Profesyonel/ESM kartları, "3 lisans kademesi" yorumu) TAMAMEN SİL.
- Böylece line-item fiyat tablosuna bol dikey yer açılır. Tabloyu ve altındaki notu/callout'u koru. KDV satırı dokümandaki gibi kalır.

## 6. FARK VAR HERO (premium söylemi çıkar + Time Engine 1. sıradan insin)
- h2 `Neden ServiceCore premium'u hak ediyor.` → `Rakiplerde bulunmayan, fark yaratan yetenekler.`
- lead `...— premium farkı tam olarak buradadır.` → `...— işte bu yetenekler ServiceCore'u ayırır.`
- 6 mock kartı YENİDEN SIRALA (her kartın mock+içeriği aynen taşınır, sadece konum değişir). Time Engine 1. sırada OLMAYACAK. Yeni sıra (2 kolon × 3 satır):
  1) ESM — Multi-Company / Multi-Tenant
  2) ITIL Expert Kadro + Yerel Destek (on-premise)
  3) 5 Katmanlı Raporlama + İleri Proje Yönetimi
  4) 10+ Süreçte No-Code Otomasyon
  5) Hibrit Lisanslama
  6) Time Engine
- Alt callout (`30+ modül, 16 ITIL4 süreci tek platformda — ayrı ürünleri kurup entegre etme maliyeti ve riski yok.`) KALIR (olgusal).

## 7. A4 SAYFALAMA (KRİTİK — Zoho her bölümü A4 A4 basıyor)
- HER kart/satır/madde `page-break-inside:avoid` olmalı (mock kartlar `.dif > td`, fark listesi satırları `.fk-row`/`.fk-cell`, koşul maddeleri `.ko-item`, referans vaka kartları, kademe yok artık). Sınıf CSS'ine `page-break-inside:avoid;` ekle.
- Her `.sheet` bir A4'e SIĞACAK; taşmayacak; üstten/alttan nefes payı kalacak (kıtı kıtına değil).
- UZUN bölümleri A4 parçalara böl, her parça kendi `<div class="sheet pb">`'i olsun (yeni A4'ten başlar, kendi üst padding'i olur):
  - Fark TAM liste (44 madde): İÇERİĞİ KISMA. 3 A4'e HOMOJEN dağıt: 15 + 15 + 14 madde, 3 ayrı `<div class="sheet pb">` parçaya böl (her parça ~eşit dolulukta, üst/alt nefes payı kalsın). HER PARÇANIN (3 sayfanın da) BAŞINA bölüm başlığını koy: `<p class="fk-h">TÜM FARK YARATAN YETENEKLER</p>` (2. ve 3. parçada başlığa ` · devam` ekleyebilirsin). Giriş paragrafı (giris_metni) yalnız 1. parçada. Numaralandırma 01–44 kesintisiz devam etsin (parça 2: 16–30, parça 3: 31–44).
  - Referanslar logo ızgarası + vaka kartları: ızgara bir A4'e sığıyorsa kalsın; vaka kartları ayrı `sheet pb`'de.
- Kapak / Yönetici Özeti / COI gibi KISA sayfalarda alt boşluğu doldur (madde 2,3,4); UZUN sayfalarda taşmayı böl.

## DOĞRULAMA (uygulama sonrası)
- "yatırım/Yatırım" yalnız referans firma adlarında kaldı (pazarlama metninde 0).
- "premium" pazarlama söylemi 0; "Proof Drive" 0.
- 44 fark / 55 logo / 16 koşul içeriği tam.
- Tüm görseller `https://www.servicecore.com.tr/...`; base64 yok.
- Zoho yasak CSS yok (flex/grid/var/gradient/shadow/transform/radius/rgba/svg/script).
- XHTML well-formed. Büyük "İ": İngilizce kelimede düz I.
