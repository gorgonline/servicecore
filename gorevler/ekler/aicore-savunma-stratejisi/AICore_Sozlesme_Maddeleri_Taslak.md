# AICore — Sözleşme Maddeleri Taslağı (Hukuk İncelemesine)

> Amaç: Müşteri ajanlarının ürünü bypass etmesi, yapının kopyalanması ve
> verinin model eğitiminde kullanılması risklerine karşı lisans sözleşmesi,
> PoC sözleşmesi ve partner sözleşmelerine eklenecek hükümler.
>
> **Not:** Bu bir iş tarafı taslağıdır — madde metinleri niyeti netleştirmek
> için yazılmıştır; nihai hukuki dil, ilgili mevzuat (FSEK, TTK haksız rekabet,
> KVKK, Borçlar K.) süzgecinden hukuk müşaviri tarafından geçirilmelidir.

---

## A. Lisans Sözleşmesine Eklenecek Hükümler

### Madde 1 — Tanımlar (yeni tanımlar)

Taslak metin:

> **"Otomatik Erişim":** İnsan kullanıcının arayüz üzerinden gerçekleştirdiği
> kullanım dışında, yazılım, betik, robot, yapay zekâ ajanı veya benzeri
> otomatik araçlarla Ürün'ün arayüzlerine, API'lerine, veritabanına veya
> çıktılarının herhangi birine erişilmesi.
>
> **"Yapay Zekâ Sistemi":** Makine öğrenmesi modeli, büyük dil modeli, ajan
> platformu veya bunları barındıran her tür yazılım/hizmet.

Gerekçe: Mevcut sözleşmeler "kullanıcı" kavramını insan varsayar; ajan
çağında tanım boşluğu bırakılmamalı.

### Madde 2 — Otomatik erişim, insan lisansından ayrıdır

Taslak metin:

> Adlandırılmış kullanıcı (named user) lisansları yalnızca gerçek kişilerin
> kullanımını kapsar. Otomatik Erişim, ancak Müşteri'nin geçerli bir
> **GateCoreAI / AICORE Gateway lisansına** sahip olması ve erişimin bu
> kapı üzerinden, ajan başına tanımlı makine kimliğiyle yapılması hâlinde
> mümkündür. İnsan kullanıcı hesabı kimlik bilgilerinin otomatik araçlara
> tanımlanması sözleşmeye esaslı aykırılıktır.

Gerekçe: SAP-Diageo "dolaylı erişim" emsali — insan lisansının makine
erişimini kapsamadığı hukuken tanınmış durumda. Ücretlendirme dayanağı bu
maddedir.

### Madde 3 — Model eğitimi ve damıtma yasağı

Taslak metin:

> Müşteri; Ürün'den, API'lerinden veya Gateway'den elde edilen veri, çıktı,
> öneri, şema ve yapıların tamamını veya bir kısmını, hangi amaçla olursa
> olsun bir Yapay Zekâ Sistemi'nin eğitilmesi, ince ayarı (fine-tuning),
> damıtılması (distillation) veya değerlendirme setine dahil edilmesi için
> kullanamaz; üçüncü kişilere bu amaçla kullandıramaz. Müşteri'nin kendi iş
> verileri üzerindeki hakları saklıdır; yasak, Ürün'ün yapısına, mantığına ve
> ürettiği çıktılara ilişkindir.

Gerekçe: "Bizim emeğimizle kendi ajanını besleme" riskinin doğrudan cevabı.
Son cümle önemli — müşteri kendi verisinin sahibidir, ayrımı net çizmezsek
madde müzakerede tümden düşer.

### Madde 4 — Yapı ticari sırdır; tersine mühendislik yasağı

Taslak metin:

> Ürün'ün veritabanı şeması, veri modeli, iş mantığı, API tasarımı ve iç
> mimarisi ServiceCore'un ticari sırrı ve eser niteliğindeki fikri
> mülkiyetidir. Tersine mühendislik, kaynak koda dönüştürme, şemanın
> çıkarılması, belgelenmesi veya üçüncü kişilere ifşası yasaktır.
> Veritabanına Ürün arayüzleri ve resmî raporlama katmanı dışında doğrudan
> erişim desteklenmez; bu yolla yapılan müdahalelerden doğan sorunlar destek
> kapsamı dışındadır.

Gerekçe: FSEK + TTK haksız rekabet koruması ancak sözleşmede "sır" olarak
tanımlanmışsa güçlü işler. "Destek dışı" ibaresi teknik yaptırım yerine
ticari yaptırım kurar.

### Madde 5 — Yapay zekâya girdi vermek ifşa hükmündedir

Taslak metin:

> Ürün'ün yapısının, şemasının, kaynak veya ara kodlarının, yapılandırma
> dosyalarının veya bunlardan türetilmiş bilgilerin herhangi bir Yapay Zekâ
> Sistemi'ne girdi olarak verilmesi, üçüncü kişiye ifşa hükmünde olup Madde
> 4'teki yasaklara tabidir. Bu hüküm, girdinin analiz, özetleme, yeniden
> üretim veya benzer işlevlerle sınırlı olduğu hâllerde de uygulanır.

Gerekçe: "Ben çözmedim, AI çözdü" savunmasını baştan kapatır. 2026 itibarıyla
büyük yazılım sözleşmelerinde hızla standartlaşan hüküm.

### Madde 6 — Denetim ve tespit

Taslak metin:

> ServiceCore, makul önceden bildirimle ve yılda bir defayı aşmamak üzere,
> lisans uyumunu (kullanıcı sayısı, Otomatik Erişim, Gateway kullanımı)
> doğrulamak için kayıt ve log incelemesi talep edebilir. Ürün'ün, kullanım
> desenlerinden otomatik erişimi tespit eden teknik göstergeler içerdiğini
> Müşteri kabul eder.

Gerekçe: Madde 2'nin dişi. Parmak izi/telemetri pratiğinin sözleşme dayanağı.

## B. PoC (Kavram Kanıtlama) Sözleşmesine Eklenecek Hükümler

### Madde 7 — PoC kapsam ve sınırları

Taslak metin:

> PoC kurulumu; süre kilitli, sınırlı kapsamlı ve yalnız değerlendirme
> amaçlıdır. PoC ortamında üretim verisi kullanılmayacaksa ServiceCore
> sentetik veri sağlar. PoC sürümü, Ürün'ün tam şemasını ve tüm bileşenlerini
> içermeyebilir. PoC çıktıları ve ekran görüntüleri dahil hiçbir materyal,
> Madde 3 ve 5 kapsamındaki amaçlarla kullanılamaz.

### Madde 8 — PoC sonu imha

Taslak metin:

> PoC süresi sonunda Müşteri, kurulumu ve tüm kopyaları (yedekler dahil)
> kalıcı olarak imha eder ve yazılı imha teyidi verir. ServiceCore'un
> kurulumu uzaktan devre dışı bırakma hakkı saklıdır.

Gerekçe: Erman'ın tarif ettiği en sıcak sızıntı kapısı PoC'dir; NDA tek
başına yetmez, imha + süre kilidi + sentetik veri üçlüsü gerekir.

## C. Partner / Entegratör Sözleşmelerine Eklenecek Hükümler

### Madde 9 — Rekabet eden ürün geliştirme yasağı

Taslak metin:

> Partner; Ürün'e erişimi süresince ve sonrasında, bu erişimden edindiği
> yapı, şema, mantık ve know-how'ı kullanarak Ürün'le veya AICore ürün
> ailesiyle rekabet eden bir ürün geliştiremez, geliştirilmesine katkı
> sunamaz. Madde 3, 4 ve 5 partner için de aynen geçerlidir.

Gerekçe: Stratejide işaretlenen asıl risk müşteri değil, öğrendiğini
ürünleştiren entegratördür.

---

## Uygulama Notları (hukuk + satış ekibine)

1. Mevcut müşterilere geçiş: bu hükümler yeni sözleşme/yenileme döneminde
   devreye alınır; mevcutlara ek protokol önerilir.
2. Müzakere düşme sırası: Madde 6 (denetim) ilk pazarlık konusu olur —
   yılda 1 sınırı bu yüzden baştan yazıldı. Madde 3'ün "kendi verisi saklı"
   cümlesi korunmalı, yoksa tümü tartışmaya açılır.
3. Bu maddelerin ticari karşılığı GateCoreAI lisansıdır — hukuki metin,
   Gateway ürünü fiilen çıkmadan da caydırıcılık sağlar.
