# AICORE Review — Backend Ekibi Koruma Önerileri (İş Paketi)

> **Kime:** ServiceCore backend ekibi + takım lideri
> **Konu:** Lisanssız yapay zekâ ajanlarının ürünü kullanmasını ürün
> seviyesinde engelleyen korumalar ("multiplexing" savunması) + destekleyici
> altyapı işleri. Tehdit özeti Bölüm 1'de; iş paketleri Bölüm 2-6'da;
> önerilen sıra Bölüm 7'de. (AICORE Review toplantısı, 24.07.2026)

---

## 1. Neden yapıyoruz — tehdit iki cümlede

Müşteri, ServiceCore'a dışarıdan bir yapay zekâ ajanı bağlayıp (API, tarayıcı
otomasyonu veya e-posta üzerinden) kayıtları otomatik cevaplatabilir,
kapattırabilir ve **100 teknisyen lisansını 10'a düşürebilir** — bugünkü
üründe bunu engelleyen hiçbir mekanizma yok. Bu senaryonun sektördeki adı
**multiplexing**tir (araya katman koyarak lisans sayısını düşürmek);
Microsoft ve SAP bunu sözleşmeyle yasaklar **ve ürün içinde teknik olarak
engeller** — bizim de yapacağımız bu: sözleşme maddeleri hazırlanıyor,
aşağıdaki iş paketleri onun ürün tarafıdır.

Tasarım ilkesi: **engelleme aynı zamanda satıştır.** Amaç ajanları yasaklamak
değil; lisanssız ajanı imkânsız kılıp lisanslı yolu (Dijital Teknisyen
Lisansı + makine hesabı) tek seçenek hâline getirmek.

---

## 2. İş Paketi 1 — Hesap başına kapasite tavanı (en kritik koruma)

**İlke:** 1 teknisyen lisansı = 1 insanın çalışma kapasitesi. Ürün bunu zorlar.

Gereksinimler:
- Hesap başına **işlem sayaçları**: kayıt cevaplama, kapatma, durum
  değiştirme, atama, eskalasyon eylemleri sayılır. İki pencere: dakikalık
  ve günlük.
- **Kanal bağımsız sayım:** işlem UI'dan, API'den, e-posta işleyiciden veya
  entegrasyondan gelsin — işleyen hesaba yazılır. (Arka kapı kalmaması için
  sayım, eylemin gerçekleştiği servis katmanında yapılmalı; giriş
  noktasında değil.)
- Eşikler **yapılandırılabilir** (tenant bazında override edilebilir) ve
  insan davranışının çok üstünde seçilir. Öneri: ilk 4-8 hafta yalnız ölçüm
  (gölge mod) yapılıp gerçek kullanıcı dağılımının p99'u alınır; eşik =
  p99 × 5-10. İnsan hiçbir koşulda takılmamalı.
- **Aşım davranışı (kademeli):**
  1. Yumuşak eşik: olay logu + yöneticiye bildirim.
  2. Sert eşik: hesabın yazma işlemleri geçici kilitlenir; kullanıcıya
     ekran: *"Bu hesapta otomasyon kaynaklı yoğunluk tespit edildi.
     Otomatik işlemler için Dijital Teknisyen Lisansı gereklidir."*
     (Engel ekranı aynı zamanda satış ekranıdır — mesaj metni üründe
     yapılandırılabilir olsun.)
- Meşru istisnalar tasarlanmalı: toplu işlem UI aksiyonları (çoklu seçim +
  toplu kapatma) tek eylem sayılır; sistem/otomasyon kuralları (SARE)
  sayım dışıdır (kendi kimliğiyle çalışır).
- Tüm aşım olayları **denetim kaydına** (kim, ne zaman, hangi eşik) yazılır.

Kabul ölçütü: 10 hesaba bağlanan bir test botu, dakikalar içinde sert eşiğe
takılıp bloklanmalı; aynı dönemde gerçek kullanıcı trafiğinde sıfır yanlış
tetikleme olmalı (gölge mod verisiyle kanıtlanır).

## 3. İş Paketi 2 — API yazma yetkisinin insan hesabından ayrılması

**İlke:** Yazma-API'si insan hesabında yoktur; yalnız lisanslı makine
hesabında vardır.

Gereksinimler:
- Hesap modeline **hesap tipi** ayrımı: insan hesabı / makine hesabı
  (service account). Makine hesabı ayrı varlıktır: sahibi, amacı, son
  kullanım tarihi, bağlı lisansı kayıtlıdır.
- İnsan hesaplarında API üzerinden **yazma uçları varsayılan kapalı**
  (okuma açık kalabilir — raporlama/BI meşru ihtiyaç).
- Makine hesabı ancak **geçerli Dijital Teknisyen Lisansı** ile
  oluşturulabilir/aktif kalır; lisans süresi dolunca hesap otomatik pasife
  düşer.
- **Geçiş planı (kritik risk):** mevcut müşteri entegrasyonları bugün insan
  hesabı + API ile çalışıyor olabilir. Doğrudan kapatmak entegrasyon kırar.
  Önerilen: envanter çıkarma → mevcutlara geçiş süresi + makine hesabına
  taşıma sihirbazı → yeni kurulumlarda baştan kapalı.
- "İşlemi yapan kimlik" alanı her kayıtta zorunlu ve makine hesabı için
  ayrıca görünür olmalı ("Kapatta: AGENT-ACME-01") — denetlenebilirlik +
  müşteriye şeffaflık.

Kabul ölçütü: İnsan hesabı token'ıyla yazma çağrısı 403 dönmeli; lisanssız
makine hesabı oluşturulamamalı; süresi dolan makine hesabının çağrıları
kesilmeli.

## 4. İş Paketi 3 — Otomasyon tespiti ve oturum sertleştirme

**İlke:** API kapatılınca kalan yol tarayıcı taklididir (RPA); onun da
imzası bellidir.

Gereksinimler:
- **Tek aktif oturum:** bir insan hesabı aynı anda tek etkileşimli oturum;
  ikinci oturum açılınca ilki düşer (veya onaylı istisna).
- **Davranış sinyalleri** (skorlama, tek başına değil birlikte):
  - 7/24 kesintisiz aktivite, mesai/mola deseni