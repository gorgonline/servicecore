# AICore Eklentileri — Müşteri Altyapı Gereksinimleri

> AI servisi ServiceCore'un YANINA ayrı Linux sunucu olarak kurulur; ServiceCore sunucusuna dokunulmaz.
> Tek altyapı tüm AICore eklentilerine hizmet eder; kademe = eklenti sayısı + kayıt hacmi.

| | Kademe 1 — Pilot / Başlangıç | Kademe 2 — Kurumsal | Kademe 3 — Büyük Ölçek | Alternatif — Maskeli Bulut |
|---|---|---|---|---|
| **Hedef müşteri** | 1-2 AICore eklentisi · ~50 teknisyene kadar · günde ~500 kayda kadar | 3-5 AICore eklentisi · ~250 teknisyene kadar · günde ~2.500 kayda kadar | Tüm paket · 250+ teknisyen · yüksek eşzamanlılık (banka/holding) | KVKK açısından esnek müşteri; veri maskelenerek bulut yapay zekâ kullanılır |
| **Yerel dil modeli** | Çift model: 12B sınıfı (canlı işlemler) + 31B sınıfı (derin analiz ve denetim) | Çift model (12B + 31B) · daha yüksek eşzamanlılık | Çift model + 70B sınıfı seçenek · yüksek eşzamanlılık | Yerel model YOK (bulut) |
| **GPU** | 1 × 48 GB (NVIDIA L40S) veya 2 × 24 GB (NVIDIA L4) | 2 × 48 GB (L40S) veya 1 × 80 GB (A100/H100) | 2 × 80 GB (A100/H100) veya 4 × L40S | GPU GEREKMEZ |
| **İşlemci (CPU)** | 16 çekirdek | 32 çekirdek | 64 çekirdek | 8-16 çekirdek |
| **Bellek (RAM)** | 96 GB | 128 GB | 256 GB | 32-64 GB |
| **Disk** | 1 TB NVMe SSD | 2 TB NVMe SSD | 4 TB NVMe SSD | 500 GB SSD |
| **Sunucu** | Tek sunucu (ServiceCore sunucusundan AYRI) | Tek güçlü sunucu veya 2 sunucu | Ayrık GPU sunucusu + uygulama sunucusu (yatay ölçekleme) | Tek uygulama sunucusu |
| **İnternet ihtiyacı** | Gerekmez (kapalı ağda çalışır) | Gerekmez (kapalı ağda çalışır) | Gerekmez (kapalı ağda çalışır) | Yalnız tek denetimli çıkış (bulut yapay zekâ API'si) |

## Ortak gereksinimler

- **İşletim sistemi:** Ubuntu Server 22.04 LTS veya üzeri (AI sunucusu Linux'tur; ServiceCore'un Windows sunucusuna kurulmaz, yanına ayrı kutu olarak eklenir)
- **Konteyner ortamı:** Docker + Docker Compose; GPU'lu kademelerde NVIDIA sürücüsü + NVIDIA Container Toolkit
- **Sanallaştırma:** VM üzerinde kurulacaksa GPU passthrough (veya vGPU lisansı) şarttır; aksi halde fiziksel sunucu önerilir
- **Ağ:** ServiceCore sunucusu ile AI sunucusu arasında iç ağda HTTP/HTTPS erişimi (çift yönlü); son kullanıcıya açık port gerekmez (son-kullanıcı eklentileri hariç — Eklenti Notları)
- **ServiceCore erişimi:** ServiceCore REST API adresi + eklenti bazlı yetkilendirilmiş servis hesabı. Her eklenti yalnızca işinin gerektirdiği yetkiyi alır: analiz ve öneri eklentileri salt-okurdur; kayıt açan/güncelleyen eklentiler yazma yetkisini ayrıca ve sınırlı kapsamda alır. Eklenti bazlı yetki dökümü Eklenti Notları sayfasındadır. Tüm yazma işlemleri iz kaydına (audit) düşer
- **Ek erişimler (eklentiye göre):** Bazı eklentiler kapsamı gereği ek erişim ister ve YALNIZCA o eklenti alındığında talep edilir: doküman kaynakları (dosya sunucusu/SharePoint), izleme-alarm sistemleri, telefon santrali/çağrı merkezi, ağ keşif yetkileri, zafiyet veri güncellemeleri. Döküm: Eklenti Notları sayfası
- **Kimlik doğrulama:** Onay paneli için kurumun kimlik sağlayıcısı (SSO/OIDC) ile entegrasyon — panel kurum kullanıcılarıyla açılır
- **Veri konumu:** Tüm yapay zekâ verileri (kayıt arşivi, bilgi kartları, denetim izleri) müşterinin diskinde tutulur; dışarı veri çıkmaz
- **Yedekleme:** AI veri klasörünün mevcut kurumsal yedekleme düzenine dahil edilmesi (dosya bazlı, ~onlarca GB)
- **İzleme (opsiyonel):** Kurumun mevcut izleme sistemi (Datadog/Dynatrace vb.) varsa AI servisi metriklerini oraya gönderebilir

## Eklenti notları (her eklentinin altyapı izi)

| Eklenti | ServiceCore yetkisi | Ek erişim / ek altyapı | Çalışma deseni | Boyutlandırma etkeni |
|---|---|---|---|---|
| **SolveCoreAI** | Okur (kayıtlar + bilgi bankası) | — | Canlı — teknisyen tetikler | Teknisyen sayısı + günlük kayıt |
| **KnowCoreAI** | Okur (kapanmış kayıtlar); onaylanan makaleyi bilgi bankasına yazar | — | Gece toplu | Kayıt arşivi büyüklüğü |
| **DocCoreAI** | Onaylanan kartı bilgi bankasına yazar | Doküman kaynaklarına erişim (dosya sunucusu / SharePoint / intranet); doküman arşivi için ek disk | Toplu — istenince | Doküman hacmi |
| **RootCoreAI** | Okur (teknisyen geri bildirimleri) | — | Gece toplu | Geri bildirim hacmi |
| **MergeCoreAI** | Okur; onaylanan birleştirmeyi uygular (yazar) | — | Canlı — yeni kayıtta | Günlük kayıt hacmi |
| **ChatCoreAI** | Bilgi bankasını ve kayıt durumunu okur; kayıt taslağı AÇAR (yazar) | Çalışan portalı / Teams-Slack kanal entegrasyonu; son kullanıcıya açık güvenli erişim | Canlı — son kullanıcı, mesai boyu | TOPLAM ÇALIŞAN sayısı + eşzamanlı sohbet |
| **ReplyCoreAI** | Okur; yanıt TASLAĞI yazar (gönderim teknisyende) | — | Canlı — kayıt başına | Teknisyen sayısı + günlük kayıt |
| **ClassifyCoreAI** | Okur; kategori ve atamayı günceller (yazar) | — | Canlı — her yeni kayıtta | Günlük kayıt hacmi |
| **PriorityCoreAI** | Okur; öncelik alanını günceller (yazar) | — | Canlı — her yeni kayıtta | Günlük kayıt hacmi |
| **ImpactCoreAI** | Okur (değişiklik kayıtları + varlık ilişkileri) | — | Canlı — değişiklik başına | Aylık değişiklik sayısı |
| **PredictCoreAI** | Okur (kayıt + hizmet seviyesi verisi) | — | Periyodik analiz | Kayıt hacmi |
| **ReportCoreAI** | Okur (raporlama verisi) | — | Canlı — soru başına | Rapor kullanan yönetici sayısı |
| **SentimentCoreAI** | Okur (kullanıcı mesajları) | — | Canlı — mesaj başına | Günlük mesaj hacmi |
| **KBCoreAI** | Bilgi bankasını okur; düzenleme TASLAĞI yazar (yayın editörde) | — | Toplu — istenince | Bilgi bankası büyüklüğü |
| **ToneCoreAI** | Okur (teknisyen yanıtları) | — | Canlı — yanıt başına | Günlük yanıt hacmi |
| **StormCoreAI** | Okur; ilişkili olayları gruplar (yazar) | İzleme/alarm sistemlerinden olay akışı entegrasyonu | Canlı — yüksek hacimli anlar | Alarm/olay tepe hacmi |
| **FlowCoreAI** | İş akışı tanımı yazar (YAPILANDIRMA düzeyi — her akış insan onayıyla devreye girer) | — | İstenince | Düşük — hacimden bağımsız |
| **DisCoreAI** | Varlık envanterine (CMDB) yazar | Ağ keşif erişimi ve yetkileri (kurum BT'siyle birlikte tanımlanır) | Periyodik tarama | Varlık sayısı |
| **TranslateCoreAI** | Okur; çeviri metnini ekler | — | Canlı — mesaj başına | Çok dilli mesaj hacmi |
| **VoiceCoreAI** | Kayıt açar / durum okur (yazar) | Telefon santrali veya mikrofon kanalı entegrasyonu; konuşma tanıma bileşeni | Canlı — çağrı başına | Günlük çağrı hacmi |
| **CallCoreAI** | Okur; çağrı özetini kayda yazar | Çağrı merkezi ses akışı; ses kayıtları için ek disk | Canlı — çağrı başına | Günlük çağrı hacmi + kayıt saklama süresi |
| **VisionCoreAI** | Okur (kayıt ekindeki görseller) | — | Canlı — görselli kayıtta | Görsel ekli kayıt oranı |
| **ShiftCoreAI** | Okur; vardiya planı ÖNERİSİ yazar (onay yönetimde) | Vardiya/mesai verisi (İK sistemi varsa entegrasyon) | Periyodik | Ekip büyüklüğü |
| **AuditCoreAI** | Okur (süreç kayıtları) | — | Periyodik denetim | Süreç/kayıt hacmi |
| **AssetCoreAI** | Okur (varlık kayıtları) | Varlık performans verisi kaynakları (izleme sistemi varsa) | Periyodik | Varlık sayısı |
| **VendorCoreAI** | Okur (tedarikçi/sözleşme kayıtları) | — | Periyodik | Tedarikçi sayısı |
| **ContractCoreAI** | Okur | Sözleşme doküman deposuna erişim | Toplu — istenince | Sözleşme sayısı |
| **BudgetCoreAI** | Okur | Bütçe/harcama verisi kaynağı (finans sistemi varsa entegrasyon) | Periyodik | Kalem sayısı — düşük yük |
| **CoachCoreAI** | Okur (performans verisi) | — | Periyodik | Teknisyen sayısı |
| **ProjectCoreAI** | Okur (proje kayıtları) | — | Periyodik | Aktif proje sayısı |
| **RisiCoreAI** | Okur (varlık + hizmet + sözleşme) | Zafiyet bankası veri güncellemeleri (kontrollü paket veya tek denetimli çıkış) | Periyodik | Varlık sayısı |

## Notlar

1. Tek yapay zekâ altyapısı TÜM AICore eklentilerine hizmet eder — her eklenti için ayrı GPU/sunucu gerekmez. Eklenti sayısı ve kayıt hacmi arttıkça kademe yükseltilir.
2. AICore çift model mimarisiyle çalışır: hızlı model günlük canlı işlemleri, büyük model derin analiz ve kalite denetimini üstlenir. Tüm kademeler iki modeli birlikte taşıyacak şekilde boyutlanmıştır.
3. Boyutlandırma ölçüsü eklentiye göre değişir: teknisyen eklentilerinde teknisyen sayısı ve günlük kayıt hacmi; SON KULLANICIYA açılan eklentilerde (sanal asistan, sesli işlem) toplam çalışan sayısı ve eşzamanlı kullanım esas alınır. Kademe seçimi bu ölçüyle yapılır.
4. Gece çalışan eklentiler (bilgi bankası üretimi, doküman işleme, öğrenme döngüsü) yoğun saat dışında çalışır; gündüz kullanımıyla kaynak çakışmaz.
5. Kesin boyutlandırma pilot sırasında gerçek kayıt hacmiyle doğrulanır; bu tablo teklif aşaması şartnamesidir.
6. Kapalı ağ (air-gap) desteklenir: yerel model kurulduktan sonra sistem internetsiz çalışır. Model güncellemeleri ve dış veri paketleri (örn. zafiyet bankası verisi) kontrollü paket yöntemiyle içeri alınır.
7. Ses kaydı işleyen ve doküman arşivi tutan eklentiler disk ihtiyacını artırır; bu eklentiler alınırsa disk kapasitesi hacme göre birlikte planlanır.
8. Maskeli Bulut seçeneğinde kişisel veriler maskelendikten sonra bulut yapay zekâsına gider; maskeleme denetlenebilir şekilde kayıt altındadır. KVKK katı müşteriye (banka/sağlık) yerel kurulum önerilir.
9. ServiceCore uygulama/veritabanı sunucusunda değişiklik gerekmez; AI ayrı kutudur, HTTP üzerinden konuşur, bağımsız ölçeklenir.
10. Kurulum sonrası her müşteri için bir kalibrasyon çalışması yapılır (müşterinin kendi kayıtlarıyla ayar); bu donanım değil, devreye alma hizmetidir.
