# Sözleşmeye AI Ekleri — Avukat İçin Öneri Notu

> **Amaç:** Mevcut "Servicecore Ürün Yıllık Kiralama ve Hizmet Satış
> Sözleşmesi"ne, yapay zekâ ajanları çağında ortaya çıkan yeni riskleri
> (ürünün AI ile çözülmesi/klonlanması, lisans bypass'ı, koltuk ikamesi)
> kapatacak madde/bent önerileri. **İş tarafı taslağıdır; nihai hukuki dil
> şirket avukatınca yazılmalıdır.** Referanslar Erman'ın gönderdiği sözleşme
> paketinin madde numaralarına yapılmıştır. (24.07.2026)

---

## 0. Mevcut sözleşme neyi zaten karşılıyor, boşluk nerede

**Zaten güçlü (korunmalı):**
- Madde 3 (Lisans/FMH): FSEK m.16 atfı, tersine mühendislik/çoğaltma/kaynak
  koda ulaşma yasağı, DB yapısı ve işleyiş mantığının FMH kapsamında olması.
- Madde 6 (Gizlilik): süresiz gizlilik + doğrudan/dolaylı zarar tazmini.
- Madde 2 — "Teknik Tanımlı Kullanıcı" (named technician) başına
  ücretlendirme bendi (sayımımızla 2.8; kesin numara imzalı nüshadan teyit
  edilmeli).

**AI çağı boşlukları (mevcut metin insan kullanıcı varsayar):**
1. "Kullanıcı" tanımı insanı varsayar → **ajan/otomatik erişim** tanımsız.
2. Named technician sayısı üzerinden ücret → **ajan koltuk sayısını
   düşürürse** gelir korumasız (multiplexing).
3. Tersine mühendislik yasağı var ama **"yapıyı/çıktıyı AI'a girdi vermek"**
   açıkça sayılmamış → "ben çözmedim, AI çözdü" savunması boşluğu.
4. Çıktı/veri ile **model eğitimi/damıtma** yasağı yok.
5. Doğrudan DB erişimi ve **PoC ortamından yapı çıkarma** özel olarak
   düzenlenmemiş.

Aşağıdaki öneriler bu 5 boşluğu, mevcut madde yapısını bozmadan kapatır.

---

## Öneri 1 — Madde 1'e (Tanımlar) yeni tanımlar

Sözleşmede ayrı bir tanımlar bölümü yoksa Madde 3 başına eklenebilir.

> **"Otomatik Erişim":** Gerçek kişi kullanıcının ürün arayüzü üzerinden
> gerçekleştirdiği kullanım dışında; yazılım, betik, robot, yapay zekâ ajanı
> veya benzeri otomatik araçlarla ürünün arayüzlerine, API'lerine,
> veritabanına veya çıktılarına erişilmesi ya da işlem yaptırılması.
>
> **"Yapay Zekâ Sistemi":** Makine öğrenmesi modeli, büyük dil modeli, yapay
> zekâ ajanı veya bunları barındıran her tür yazılım/hizmet.

## Öneri 2 — Madde 2'nin "Teknik Tanımlı Kullanıcı" bendine ek (koltuk ikamesi / multiplexing)

*Mevcut boşluk:* Ücret named technician sayısına bağlı; bir ajan az sayıda
hesapla çok kullanıcının işini yaparsa lisans sayısı ve gelir düşer.
*(Yeni bent numaralarını — 2.8.1/2.8.2 veya 2.11/2.12 — avukat belirlesin;
aşağıda (a)/(b) olarak verilmiştir.)*

> **(a) (yeni bent):** Teknik Tanımlı Kullanıcı lisansı yalnızca tek bir gerçek
> kişinin olağan çalışma kapasitesindeki kullanımını kapsar. Müşteri;
> donanım, yazılım, entegrasyon katmanı, havuz hesabı veya yapay zekâ ajanı
> dahil herhangi bir aracı kullanarak, ürüne erişen gerçek kullanıcı sayısını
> azaltılmış göstermek ve gereken lisans sayısını düşürmek amacıyla hareket
> edemez (çoklama / *multiplexing*). Araya konulan katman lisans ihtiyacını
> ortadan kaldırmaz.
>
> **(b) (yeni bent):** Kayıt işleme eylemi (kayıt cevaplama, kapatma, durum
> değiştirme, atama, eskalasyon) gerçekleştiren her yapay zekâ ajanı / makine
> kimliği için, insan kullanıcı lisanslarından ayrı olarak yıllık **Dijital
> Teknisyen Lisansı** gereklidir. Bu lisans ajan kimliği başına sabittir;
> işlem hacmine bağlı değildir. Salt-okur (raporlama/analiz) erişim bu
> yükümlülüğün dışındadır.

*Not:* Bu, sektörde (Microsoft, SAP) yerleşik "multiplexing / indirect
access" hükmünün ITSM'e uyarlanmış hâlidir; SAP-Diageo davası emsaldir.

## Öneri 3 — Madde 3'e ek (FSEK — AI'a girdi vermek = ifşa/işleme)

*Mevcut boşluk:* Madde 3 tersine mühendisliği yasaklar ama yapının/çıktının
bir yapay zekâya analiz/yeniden üretim için verilmesini açıkça saymaz.

> **3.x (yeni):** Ürünün kaynak veya nesne kodları, veritabanı şeması, veri
> modeli, kullanıcı arayüzü, işleyiş mantığı, yapılandırma dosyaları veya
> bunlardan türetilmiş bilgilerin herhangi bir Yapay Zekâ Sistemi'ne girdi
> olarak verilmesi; bu yolla analiz edilmesi, özetlenmesi, yeniden üretilmesi
> veya benzeri bir eserin oluşturulması, FSEK m.16 anlamında izinsiz işleme
> ve Madde 3'teki tersine mühendislik yasağının ihlali sayılır. Müşteri, bu
> fiillerin gerçek kişi eliyle mi yoksa otomatik araç/yapay zekâ eliyle mi
> yapıldığına bakılmaksızın sorumludur.

*Gerekçe:* "AI çözdü, ben çözmedim" savunmasını kapatır; FSEK m.16 (işleme
hakkı) ve mevcut m.3 yasaklarına doğrudan bağlanır.

## Öneri 4 — Madde 3'e ek (model eğitimi / damıtma yasağı)

> **3.y (yeni):** Müşteri; üründen, API'lerinden, arayüzlerinden veya
> çıktılarından elde edilen veri, öneri, şema ve yapıları, bir Yapay Zekâ
> Sistemi'nin eğitilmesi, ince ayarı (*fine-tuning*), damıtılması
> (*distillation*) veya değerlendirme/karşılaştırma setine dahil edilmesi
> amacıyla kullanamaz; üçüncü kişilere bu amaçla kullandıramaz. Müşterinin
> kendi iş verileri (kendi kayıtlarının içeriği) üzerindeki hakları saklıdır;
> bu yasak ürünün yapısına, mantığına ve ürettiği çıktılara ilişkindir.

*Not:* Son cümle kritik — "kendi verim saklı" ayrımı yazılmazsa madde
müzakerede tümden reddedilir.

## Öneri 5 — Madde 3'e / Madde 10.2'ye ek (doğrudan DB erişimi + resmî kapı)

> **3.z (yeni):** Ürünün veritabanına, ürün arayüzleri ve Servicecore'un
> sağladığı resmî raporlama/entegrasyon katmanı dışında doğrudan erişim
> (sorgu, dışa aktarım, şema inceleme) desteklenmez ve Madde 3 kapsamındaki
> yasaklara tabidir. Bu yolla elde edilen yapısal bilginin ifşası veya
> yeniden üretimi ihlal oluşturur.

*Uyum:* Madde 10.2 zaten "çevresel/konfigürasyon değişikliklerinin
Servicecore sorumluluğunda olmadığını" söylüyor; bu bent onu bütünler.

## Öneri 6 — PoC/değerlendirme için özel hüküm (ayrı PoC sözleşmesine)

*Mevcut boşluk:* PoC/deneme ortamı en yüksek sızıntı riski; ürün henüz
satılmadan tam kurulum müşteri ortamında duruyor.

> **(PoC sözleşmesine):** Değerlendirme (PoC) kurulumu süre kilitli, sınırlı
> kapsamlı ve yalnız değerlendirme amaçlıdır; tam ürün yerine sınırlı
> "değerlendirme sürümü" kurulabilir. PoC ortamının kendisi, çıktıları ve
> ekran görüntüleri dahil hiçbir materyal, Öneri 3 ve 4 kapsamındaki
> amaçlarla kullanılamaz. PoC süresi sonunda kurulum ve tüm kopyalar (yedekler
> dahil) kalıcı olarak imha edilir; yazılı imha teyidi verilir. Servicecore'un
> kurulumu uzaktan devre dışı bırakma hakkı saklıdır.

## Öneri 7 — Denetim hakkı (Madde 2 veya yeni madde)

> **(yeni):** Servicecore, makul önceden bildirimle ve yılda bir defayı
> aşmamak üzere, lisans uyumunu (kullanıcı sayısı, Otomatik Erişim, Dijital
> Teknisyen Lisansı) doğrulamak amacıyla ilgili kayıt ve logların
> incelenmesini talep edebilir.

*Not:* Öneri 2'nin fiilî yaptırım dayanağı; ürün içi otomasyon-tespiti
telemetrisiyle birlikte çalışır.

---

## Avukata iletim notları

1. **Öncelik sırası:** Öneri 3 + 4 (FSEK/AI ifşa ve eğitim yasağı) en kritik
   ve en kolay kabul edilenler; Öneri 2 (Dijital Teknisyen Lisansı) ticari
   müzakere gerektirir; Öneri 6 (PoC) ayrı sözleşmeye.
2. **Mevcut müşteriler:** Bu bentler yeni sözleşme/yenileme döneminde devreye
   alınır; mevcutlara ek protokolle (Madde 13 "ek protokol" mekanizması)
   eklenebilir.
3. **Müzakerede korunacak cümle:** Öneri 4'teki "müşterinin kendi iş verisi
   saklıdır" — bu olmadan madde satış engeline döner.
4. **Teknik ↔ hukuki eşleşme:** Bu maddeler tek başına dava dayanağıdır;
   fiilî önleme ürün içi kilitlerdir (bkz. Backend İş Paketi — kapasite tavanı,
   API kısıtı, otomasyon bloğu). Sözleşme + ürün birlikte çalışır.
5. **FSEK dışı dayanaklar:** TTK haksız rekabet (m.54 vd.), TBK sözleşme
   ihlali, ticari sır korumasının da metne dayanak yapılması avukatın
   değerlendirmesine bırakılmıştır.
