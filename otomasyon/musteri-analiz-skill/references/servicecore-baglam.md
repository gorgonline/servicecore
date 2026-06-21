# ServiceCore satış bağlamı (yaşayan belge)

> Bu dosya her analiz öncesi okunur ve deal'ler kapandıkça güncellenir. Amaç: analizi sıfırdan değil,
> ServiceCore'un birikmiş satış aklıyla yaptırmak. Buradaki pattern'ler kanıtlandıkça eklensin.

## İç ekip listesi (toplantı sınıflandırması için)

Bir toplantıda HERKES bu listedeyse → iç toplantı (hafif özet). Aşağıdakilerin dışından biri varsa
→ müşteri toplantısı (derin analiz). Liste eksikse kullanıcıya sor ve güncelle.

ServiceCore / Gorgo tarafı: İbrahim Öz, İsmail Berk Solcan, Peker Çakar, Salih Aydın, Berdan Şen,
Bora Çetin, Levent Usta (Gorgo), Muhammed Erin, Necati Kekeç, Osman Okan Bozok, Erkan Sezgin,
Erman Taşkın, Tahsin Gül, Tamer Demirayak.

Rapor alıcısı: **Erman Taşkın** (Levent cc).

## Ürün & ticari çerçeve

- ServiceCore = kurumsal **ITSM/ESM** platformu; ~16-29 modül (olay, istek, problem, değişiklik,
  katalog, bilgi bankası, CMDB/varlık, sözleşme, proje, görev, çağrı, ESM çok-tenant, mobil).
- **Yerli** ürün, **ITIL4** terminolojisi. Kurulum **on-prem** (veriler müşteri sunucusunda; bulut
  varsayılan değil). Ticari model **yıllık kiralama**.
- Paketler: **standart** ve **profesyonel**. Modüller esnek — profesyonel bir modül standart kullanıcıya
  add-on olarak eklenebilir; herkesi profesyonele zorlama yok. "Alım gücünü zorlamadan en optimum paket"
  satış dili.

## Sık görülen müşteri pattern'leri (kanıtlandıkça genişlet)

- **KOBİ/saha-ağırlıklı müşteriler çoğu ITIL modülünü istemez.** Sıklıkla kapsamı olay + istek/katalog +
  varlık + forma daraltırlar; problem/değişiklik/proje/SLA/CMDB-ilişki ilgisiz kalır. Ürünün ağırlık
  merkezi (ITSM) ile alıcının ihtiyacı ayrışabilir → onların dünyasıyla başla.
- **Fiyat hassasiyeti yüksek olabilir.** Enterprise gibi fiyatlanırsa statükoya (kağıt/Excel) döner ya da
  erteler. Yalın paket + kalem bazında şeffaflık + paylaşımlı/şube kullanıcı mantığı işe yarar.
- **Asıl rakip çoğu zaman statüko** (kağıt, Excel, "şimdilik idare ediyoruz"), başka bir ürün değil.
- **On-prem/veri kontrolü** bir güven noktası ve farklılaştırıcı; müşteri sorduğunda yazılı teyit et.
- **Formlar = ticket değil** beklentisi: bazı müşteriler atama/onay olmadan, çok kullanıcının doldurup
  "kapattığı" tekrar kullanılabilir form ister; ürün bunu katalog/istek olarak modelliyor — bu ince farkı
  proaktif göster, kurulumda itiraza dönmesin.
- **Mobil/tablet adopsiyonu** saha personeli için kritik; sürtünme deal'i öldürür.

## Kazanılan / kaybedilen deal'ler (geri besleme — doldur)

> Her deal kapandığında: müşteri, sonuç, neyi doğru/yanlış okuduk, hangi pattern doğrulandı/yanlışlandı.

- (henüz veri yok — ilk deal'lerden sonra doldurulacak)

## Aktif deal profilleri

- **Dalaman Havalimanı (F&B)** — "kağıt öldüren + sorumluluk kalkanı" arıyor, ITSM değil. Kapsam:
  olay + varlık + form. Yüksek fiyat hassasiyeti, sezonluk personel, on-prem şart. Demo analizi:
  19 Haziran 2026. (Detay raporu müşteri klasöründe.)
