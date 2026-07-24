# ServiceCore Backend — AICORE Koruma ve Lisans Zorlama İş Paketi

> **AICORE Review toplantısı — backend ekibi ve takım liderine.** (24.07.2026)
>
> **Bağlam (2 cümle):** Müşteriler merkezi yapay zekâ ajanları kurmaya başladı;
> tek bir ajan, az sayıda hesap üzerinden 100 teknisyenin işini yapabilir ve
> lisans sayısını %90 düşürebilir (sektördeki adı: **multiplexing**). Bu paketin
> hedefi, lisanssız otomasyonu **ürün seviyesinde imkânsız kılmak** ve ajan
> kullanımını **Dijital Teknisyen Lisansı**na bağlamak — sözleşme değil, kilit.
>
> Kapsam: ServiceCore çekirdeği (C#/.NET + MSSQL). AI servisi (AICORE/Gateway)
> ayrı kutudur; yalnız İş Paketi 4'te arayüz olarak geçer.

---

## İş Paketi 1 — Hesap Kapasite Tavanı ("insan lisansı = insan kapasitesi") · P1

**Ne:** Her insan hesabı için kayıt-işleme sayaçları: cevaplama, kapatma,
durum değiştirme, atama, eskalasyon. Dakikalık ve günlük tavanlar.

Gereksinimler:
- Sayaç **kanal bağımsızdır**: UI, API, e-posta fetch, portal — işlem hangi
  kanaldan gelirse gelsin işleyen hesaba yazılır.
- Eşikler yapılandırılabilir (müşteri ortamı config'i, varsayılanlar üründe).
- Aşımda **aşamalı davranış**: (1) logla — gölge mod, (2) admin bildirimi,
  (3) blok + ekran: *"Bu hesapta otomasyon tespit edildi; devam için Dijital
  Teknisyen Lisansı gereklidir."* Blok ekranı aynı zamanda satış ekranıdır.
- Ürün içi meşru toplu işlemler (ör. yöneticinin toplu kapatma aksiyonu)
  ayrı sayılır/muaftır — normal kullanıcı asla takılmamalı.

**Kalibrasyon (kritik):** Doğrudan blokla BAŞLANMAZ. Önce 4-8 hafta gölge
modda telemetri toplanır; eşik = gözlenen insan p99'unun 5-10 katı. Gerçek
teknisyen bu tavana ömründe takılmaz; ajan ilk saatte çarpar. Yanlış-pozitif
satış felaketidir — o yüzden önce ölç, sonra kilitle.

**Kabul ölçütü:** Test botu (100 işlem/dk) X dakika içinde bloklanır; gerçek
teknisyen senaryoları (yoğun gün dahil) hiçbir zaman takılmaz.

## İş Paketi 2 — API Yazma Yetkisi Ayrımı · P1

**Ne:** Kayıt-işleme yazma uçları (cevaplama, kapatma, durum, atama) insan
hesaplarında **varsayılan kapalı**. Yazma-API yalnız **Makine Hesabı** tipiyle
kullanılabilir.

Gereksinimler:
- Yeni varlık: **Makine Hesabı** (service account) — ayrı hesap tipi, token
  bazlı kimlik; sahibi, amacı ve etiketi kayıtlı; insan lisansı tüketmez,
  **Dijital Teknisyen Lisansı** kontrolüne bağlıdır (İş Paketi 4).
- Lisanssız/insan token'ıyla yazma çağrısı → 403 + audit log.
- Salt-okur API insan hesabında kalabilir (raporlama/BI meşru kullanım).

**Geçiş riski (ekip dikkat):** Mevcut müşterilerin entegrasyonları bugün insan
hesabıyla API'ye yazıyor olabilir. Önce **entegrasyon envanteri** çıkarılır;
2 sürümlük geçiş dönemi tanınır; mevcut meşru entegrasyonlara sınırlı kapsamlı
"entegrasyon makine hesabı" verilerek kırılmadan geçilir.

## İş Paketi 3 — Otomasyon Tespiti + Oturum Kilidi · P2

**Ne:** İnsan hesabında bot davranışını tespit edip aşamalı aksiyon almak.

Sinyaller: 7/24 kesintisiz aktivite · istekler arası sabit aralık (düşük
varyans) · insanüstü tempo · UI etkileşimi olmadan form/istek desenleri ·
aynı hesabın paralel oturumları · user-agent tutarsızlıkları.

Gereksinimler:
- Sinyaller skorlanır; aşamalı aksiyon: işaretle → admin bildirimi → blok
  ekranı (İş Paketi 1'deki ekranla aynı).
- Tek aktif oturum kuralı (yapılandırılabilir).
- **KVKK notu:** Telemetri amaç sınırlıdır — lisans uyumu; kişisel
  profilleme değildir. Sözleşme tarafında denetim maddesi karşılığı vardır.

**Kabul ölçütü:** RPA botu (tarayıcı otomasyonu senaryosu) 1 saat içinde
tespit + blok; insan senaryolarında 0 yanlış-pozitif.

## İş Paketi 4 — Dijital Teknisyen Lisansı Altyapısı · P1

**Ne:** Ajanları lisansa bağlayan lisans/kimlik altyapısı.

Gereksinimler:
- Lisans modeline yeni tip: **Dijital Teknisyen Lisansı (DTL)** — ajan
  kimliği başına, yıllık, sabit (işlem hacminden bağımsız — sayaçlı
  faturalama YOK, bilinçli karar).
- Makine Hesabı ↔ DTL eşleşmesi: lisanssız makine hesabının yazma uçları
  kapalı; lisans süresi bitince otomatik pasif.
- **"İşleyen kimlik" zorunluluğu:** Her kayıt işleminde işleyen hesabın tipi
  (insan/makine) ve kimliği audit'e yazılır; "kim kapattı?" alanı makine
  kimliğini açıkça gösterir.
- **Lisans uyum raporu (admin panel):** hesap tipi bazlı işlem dağılımı +
  şüpheli otomasyon işaretleri — müşteriyle lisans görüşmesinin veri kaynağı.
- **AICORE arayüzü:** AICORE Gateway (AI tarafı) makine kimliklerini bu
  altyapıya kaydedecek; backend'in sunması gereken şey kimlik + lisans
  doğrulama API'sidir. (AI tarafının işi bizde — backend yalnız API'yi sunar.)

## İş Paketi 5 — Ek Korumalar · P3

- **Resmî raporlama katmanı:** Read-only raporlama view'ları/replica.
  Politikanın ("ana şemaya doğrudan erişim destek dışıdır") teknik karşılığı;
  meşru BI ihtiyacını resmî kapıya yönlendirir.
- **PoC Edition:** Süre kilitli kurulum (lisans anahtarında bitiş tarihi +
  süre sonunda kilit ekranı), kısıtlı bileşen seti, sentetik veri paketi.
  Mevcut PoC süreciyle uyumlu: LOI (Niyet Mektubu) + Gizlilik Sözleşmesi
  imzalanmadan tam ürün müşteri ortamına kurulmaz; kurulursa PoC Edition
  kurulur.
- **Kurulum parmak izi:** Kurulum başına benzersiz, zararsız şema/veri
  izleri — olası klon vakasında "bizden kopyalandı" kanıtı.
- (Düşük öncelik) Kritik stored procedure'lerde şifreleme.

---

## Öncelik ve sıra önerisi

| Öncelik | Paketler | Not |
|---|---|---|
| **P1 — gelir koruması çekirdeği** | İP1 (gölge modda) + İP2 (makine hesabı) + İP4 (DTL altyapısı) | Aynı sürümde çıkmalı; gölge mod verisi eşikleri kalibre eder |
| **P2** | İP3 (tespit/blok) + İP1'in blok modunun açılması | Gölge mod verisiyle beslenir |
| **P3** | İP5 (raporlama katmanı, PoC Edition, parmak izi) | PoC Edition satış takvimine göre öne çekilebilir |

## Riskler ve dikkat noktaları

1. **Mevcut entegrasyonları kırmamak** — İP2 envanter + geçiş dönemi şart.
2. **Yanlış-pozitif** — önce gölge mod; insan asla bloklanmamalı.
3. **Performans** — sayaçlar hafif tutulmalı (bellek içi sayaç + periyodik yazma).
4. **KVKK** — telemetri amaç sınırlı; kişisel profilleme değil lisans uyumu.
5. **İletişim dili** — müşteriye "ceza" değil **"adil kullanım"** diliyle
   anlatılır: "1 teknisyen lisansı = 1 insan kapasitesi; ajanlar için Dijital
   Teknisyen Lisansı".

## Tek cümlelik özet

> Lisanssız ajan, kapasite tavanına çarpar (İP1), API kapısını kapalı bulur
> (İP2), tespit edilir ve bloklanır (İP3); çalışmak isteyen her ajanın tek
> yolu Dijital Teknisyen Lisansı olur (İP4) — kilit üründe, gelir bizde.
