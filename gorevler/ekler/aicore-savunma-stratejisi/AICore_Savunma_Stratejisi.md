# AICORE Savunma Stratejisi

> Konu: Müşterilerin kendi AI agent'larıyla sisteme bağlanıp AICORE ailesini
> bypass etmesi, ürünün agent katmanında çözülmesi ve şema/IP'nin kopyalanması
> tehditlerine karşı bütünsel tavır. (Erman + Levent tartışması, 24.07.2026)

---

## 1. Tehdit — üç seviye

1. **Bypass:** Müşteri merkezi bir LLM/agent platformu kurar, her üründen MCP
   bekler, AICORE add-on'u almadan kendi agent'ıyla temel işleri yaptırır.
2. **Çözülme (disintermediation):** Agent'lar arayüzün yerini alır; ürün önce
   "backend + DB"ye iner, sonra backend fonksiyonları muz gibi soyulup klonlanır.
3. **IP kopyası:** DB şeması müşteri ortamında açık durur; bir PoC'den veya
   müşteri kurulumundan yapı alınıp AI'a verilerek ürünün rakibi yazdırılabilir.
4. **Koltuk ikamesi (en somut gelir tehdidi):** Kayıtları cevaplayan/kapatan
   bir ajan, 100 teknisyen lisansını 10-20'ye düşürerek koltuk gelirini eritebilir.

Bu tehdit ServiceCore'a özgü değil — sektörün varoluş tartışması. Nadella'nın
tezi: "İş uygulamaları = CRUD + iş mantığı; agent'lar iş mantığını yutacak."
Çöküşten geriye iki şey kalıyor: **veri + governance.** Savunma oraya kurulur.

## 2. Sektör ne yapıyor? (2026)

- **ServiceNow (Knowledge 2026):** "Her agent'a açığız" (Claude, Copilot, kendi
  yazdığınız agent). AMA: MCP Server'ı **Now Assist SKU'sunun içine** koydu —
  kendi agent'ınla gelmek için bile onların AI lisansını alıyorsun. Ve her çağrı
  onların Control Tower'ından (kimlik, yetki, audit) geçiyor.
- **Zendesk / Atlassian:** Resmi MCP server'lar (OAuth/token + plan şartı).
  Belgeli zaafları: yetkili kullanıcının gördüğü HER ŞEYİ döküyorlar (PII dahil).
- **SAP emsali:** Dolaylı erişim (indirect access) davasını Diageo'ya karşı
  kazandı — "insan lisansı makine erişimini kapsamaz" hukuken tanınmış durumda.

**Sektörün ortak cevabı: kimse yasaklamıyor; herkes resmi kapıyı kurup
ücretlendiriyor ve governance'ı kendi kontrol noktası yapıyor.**
Yasaklarsan müşteri gri yoldan girer; hem parayı hem kontrolü kaybedersin.

## 3. Tavır ilkeleri

1. **Kapıyı kapatma — kapının sahibi ol.** Bypass yolunun kendisini ürünleştir.
2. **Yazmayı asla çıplak verme.** Agent süreçten (onay, SLA, yetki, audit)
   geçmek zorunda kalsın — UI'ı terk edebilir, süreci terk edemez.
3. **Çalınabileni değersizleştir.** Şema ve kod stoktur, klonu donuk kalır;
   değeri klonlanamayan akışa (öğrenen döngü, KB fabrikası, destek) taşı.
4. **Bypass'ı ekonomik olarak saçmalaştır.** Klonlama + bakım maliyeti >
   lisans ücreti olduğu sürece kimse klonlamaz. Sembolik fiyat stratejisi
   bu savaşın silahıdır.

## 4. Katman 1 — Ürün cevabı: AICORE Gateway (resmi MCP)

Müşterinin merkezi agent'ı ServiceCore'a yalnızca bu kapıdan bağlanır.

- **İki seviye uç:**
  - *Temel işlem uçları* (kayıt oku / aç / güncelle): Gateway lisansıyla.
  - *Akıllı uçlar* (kanıtlı çözüm önerisi, bilgi kartı üretimi, benzer kayıt,
    kök neden): yalnız ilgili AICORE modül lisansı olan müşteriye açılır.
    → Dış agent akıllı ucu çağırınca AICORE'u bypass etmez, **tüketir**.
- **Diferansiyatör:** Rakip MCP'ler kullanıcının gördüğü her şeyi döker; bizim
  Gateway **maskeli + eklenti-bazlı yetkili + denetlenebilir** verir (Cloud
  Ready'nin maskeleme katmanı burada ikinci kez satılır). KVKK pazarında güçlü koz.
- **Fiyat:** Yıllık add-on + hacim bandı. AICORE modülü alan müşteriye
  indirimli/dahil; hiç modül almadan yalnız kendi agent'ıyla gelene tam fiyat.
  Doğru davranış ucuz, bypass pahalı.
- **Yan fayda:** Gateway telemetrisi = erken uyarı radarı — hangi müşterinin
  "koptuğu" (UI kullanımı düşen, agent trafiği artan) veriden görünür.

## 5. Katman 2 — Teknik önlemler

- Akıllı yetenekler ham REST API'de hiç sunulmaz (mimari zaten böyle: AI ayrı kutu).
- Ham API'de: makine hesabı zorunluluğu, agent trafiği kimliklendirme, rate
  limit, anomali tespiti. İnsan hesabıyla bot trafiği = sözleşme ihlali.
- **DB:** doğrudan erişim kapalı; BI/rapor ihtiyacı için resmi read-only
  raporlama katmanı (view/replica). Politika: "ana şemaya doğrudan dokunan
  kurulum destek dışıdır."
- İş mantığı DB'de değil uygulama kodunda tutulur — şema tek başına ürünü
  anlatmasın ("boş tabak"). Kritik stored procedure'lere şifreleme (kırılabilir
  ama "bilerek kırdı" kanıtı üretir).
- **PoC disiplini (en sıcak kapı):** PoC'ye tam ürün kurulmaz — kısıtlı
  "PoC edition": süre kilidi, sentetik veri, daraltılmış şema. PoC sözleşmesi +
  NDA + bitişte imha taahhüdü.
- **Parmak izi:** kurulumlara/şemaya bize özgü zararsız izler (haritacıların
  "tuzak sokak" taktiği) — klon davasında "bizden kopyalandı" kanıtı.
- Not: Şema karıştırma (obfuscation) ÖNERİLMEZ — AI örnek veriden şemayı
  anlamıyla geri çözer; maliyeti (migration, BI kırılması, destek) faydasından büyük.

## 6. Katman 3 — Lisans ve hukuk

Sözleşmeye eklenecek maddeler:

1. **Agent erişimi:** İnsan kullanıcı lisansı otomatik/agent erişimini kapsamaz;
   agent erişimi Gateway lisansına tabidir. (SAP-Diageo emsali.)
2. **Model eğitimi yasağı:** API/Gateway üzerinden alınan veri ve çıktılarla
   üçüncü taraf model eğitimi/damıtma yasaktır.
3. **Yapı = ticari sır:** DB şeması ve ürün yapısı ticari sır ve telif eseridir
   (FSEK + haksız rekabet); reverse engineering ve üçüncü tarafa ifşa yasaktır.
4. **AI'a vermek = ifşa:** "Ürünün yapısının, şemasının veya çıktılarının yapay
   zekâ sistemlerine girdi olarak verilmesi ifşa hükmündedir." — "AI çözdü, ben
   çözmedim" savunmasını baştan kapatır.
5. PoC'ler için ayrı NDA + imha taahhüdü; entegratör/partner sözleşmelerinde
   aynı hükümler.

## 7. Katman 4 — Finansal tasarım

- Gateway: yıllık sabit + hacim bandı (kurumsal satın almanın sevdiği model).
- Teşvik mimarisi: AICORE modülü olan müşteriye Gateway indirimli → "bizim AI'ı
  al, kapı ucuz; yalnız kendi agent'ınla gel, kapı tam fiyat."
- Basit işlerin kaybı kabul edilir (marj zaten yok); tutulacak yer: olay akışı +
  akıllı uçlar + veri + governance.
- Lisans modeli zamanla koltuktan süreç/kayıt hacmine kaydırılır — "arayüzü az
  kullanan ama süreci kullanan" müşteri gelir kaybettirmesin.

## 8. Katman 5 — Stratejik: değer stoktan akışa

Klonlanabilen şey stok (kod, şema, fonksiyon); klon kopyalandığı gün donar.
Klonlanamayan şey akış:

- Her gece öğrenen katman (teknisyen geri bildiriminden kural üretimi),
- Kendini büyüten bilgi bankası fabrikası,
- Müşteri verisiyle kalibrasyon + her güncellemede otomatik doğrulama,
- Sürüm akışı + destek paketleri (abonelik = akış ilişkisi).

Müşterinin kendi içine yaptığı çözüm rakip ürün değildir: satamaz, bakımını
kendisi öder, domain güncellemesi alamaz. "Kendi ITSM'ini yazan kurum" hikâyesi
30 yıldır hep aynı biter — 3. yılda bakım maliyetinde boğulur. İzlenecek asıl
risk: bunu ürünleştiren üçüncü taraf entegratör → panzehir: sözleşme + roadmap hızı.

## 9. Katman 6 — Koltuk ikamesine cevap: Dijital Teknisyen Lisansı

Tehdit 4'ün cevabı. Koltuk düşüşü durdurulamaz — müşteri AI'ı verimlilik
için alıyor; yasaklamak müşteriyi kaçırır. Cevap: düşen koltuğu **ajan
lisansıyla ikame etmek** — kullanım/işlem sayacı OLMADAN, sabit lisansla.

- **Model:** Kayıt işleme eylemi (cevaplama, kapatma, durum değiştirme,
  eskalasyon) gerçekleştiren her dış ajan = Gateway'de ayrı makine kimliği =
  **1 Dijital Teknisyen Lisansı** (yıllık, sabit).
- **Fiyat çapası:** insan teknisyen lisansının **3-5 katı**. Müşteriye
  anlatılabilir gerekçe: ajan 7/24 çalışır (3 vardiya = 3 insan), paralel iş
  yapar — "1 ajan = 3-5 teknisyen eşdeğeri".
- **Matematik:** 100 koltuk → 20 koltuk + 5 ajan × (3-5 koltuk fiyatı) =
  **35-45 koltuk eşdeğeri gelir.** Çöküş ikameye döner; müşteri de kârlı
  çıkar. Sektör emsali: Salesforce / ServiceNow / Microsoft "agent seat"
  modeline gidiyor — uydurma değil, standartlaşan model.
- **İkinci hat — AICORE'u ucuz alternatif yap:** AICORE ajanları öneri +
  insan onayı modelinde çalışır, koltuk öldürmez → modül lisansı sembolik
  kalır. Tam otonom ikame isteyen dış ajan pahalı Dijital Teknisyen Lisansı
  öder. Müşteriye mesaj: *"Bizim AI ile hızlan, koltuğun kalsın, ucuz; dış
  ajanla ikame et, ajan başına öde."*
- **Sözleşme dayanağı:** Sözleşme taslağına Madde 2/A (Dijital Teknisyen
  Lisansı), Madde 1/A (insan kapasitesi tanımı) ve Madde 2/B (multiplexing
  yasağı) olarak eklendi.

### Ürün içi zorlama (enforcement) — 4 kilit

Sözleşme kâğıttır; asıl cevap ürünün içindeki kilittir. Bu senaryonun
sektördeki adı **multiplexing**tir (araya katman koyup lisans sayısını
düşürmek — Microsoft/SAP 20 yıldır tanımlar ve ürün kilidiyle önler).
Lisanssız ajanın 100 kişilik işi yapmasını FİZİKEN imkânsız kılan dört
kilit, ServiceCore çekirdeğine (C# backend) yazılır:

1. **İnsan lisansı = insan kapasitesi (en öldürücü kilit).** Lisans tanımına
   kapasite gömülür ve ürün zorlar: hesap başına dakikada en fazla N kayıt
   işlemi, günde en fazla M kapatma/cevaplama. Gerçek insan bu tavana asla
   takılmaz; ajan ilk saatte duvara çarpar. 100 kişilik iş 10 hesaptan
   matematiksel olarak geçemez.
2. **İnsan hesabında yazma-API'si HİÇ YOK.** API üzerinden kayıt yazma
   yetkisi insan hesaplarında varsayılan kapalıdır; yazma-API yalnız makine
   kimliklerine açılır — makine kimliği de ancak Dijital Teknisyen
   Lisansıyla tanımlanır. Lisanssız ajanın girebileceği API kapısı ürün
   seviyesinde mevcut değildir.
3. **Tek oturum + otomasyon tespiti → otomatik BLOK.** Kalan yol tarayıcı
   taklididir (RPA); imzası bellidir: 7/24 aktivite, sabit aralıklı
   istekler, insanüstü tempo. Ürün tespit edince uyarmaz, keser — ekranda:
   "Bu hesapta otomasyon tespit edildi; devam için Dijital Teknisyen
   Lisansı gereklidir." Kilit aynı zamanda satış ekranıdır.
4. **Kanal bağımsız sayım.** E-posta botu, portal botu, entegrasyon —
   işlem hangi kanaldan gelirse gelsin işleyen hesaba yazılır; kapasite
   tavanı kanal ayırt etmez. Arka kapı kalmaz.

**Senaryonun ölümü:** Ajan API'ye giremez (Kilit 2) → tarayıcıdan dener,
kapasite tavanına çarpar (Kilit 1) → hızını insana düşürürse zaten 10
kişilik iş yapar → 100 kişilik iş için TEK yol Dijital Teknisyen Lisansı.
"Durdurmak", lisansa zorlamanın mekanizmasıdır.

**Sahiplik:** Bu dört kilit ServiceCore backend ekibinin iş paketidir
(AI servisinin değil); Gateway makine kimliklerinin kapısı olarak bağlanır.

## 9.5. Katman 7 — Müşteri güvenliği argümanı (ayrı dosya)

Kendi ajanını çıplak API'ye bağlayan müşteri yalnız BİZİM için değil,
KENDİSİ için de risk alır: veri sızdırma, dolaylı komut enjeksiyonu, ajan
kazaları (Replit vakası), bellek zehirlenmesi, ajan yayılması. GateCoreAI
bu tehditlere karşı müşterinin "emniyet kemeri"dir — üç meşru gerekçeden
(gelir + hukuk + **güvenlik**) müşteriyi kapıya kendi ayağıyla getireni.
Gerçek vakalar + tehdit → kontrol eşleşmesi + satış anlatısı:
**`Katman7_Musteri_Guvenligi_Argumani.md`**.

## 10. Yol haritası önerisi

| Vade | Adım |
|---|---|
| Hemen | PoC politikası (PoC edition + NDA + imha) · sözleşme maddeleri taslağının hukuka verilmesi · parmak izi pratiğinin başlatılması · **Dijital Teknisyen Lisansı fiyat çapasının belirlenmesi (kaç × teknisyen lisansı?)** |
| 1-3 ay | AICORE Gateway ürün tanımı + fiyat bandları · vitrine ürün kartı (beta) ✅ · raporlama katmanı politikasının yazılması · Dijital Teknisyen Lisansı SKU'sunun açılması |
| 3-6 ay | Gateway MVP (temel uçlar + maskeleme + audit + **otomasyon tespiti telemetrisi**) · ilk pilot müşteriyle "Agent-Ready" anlatısının denenmesi · **ServiceCore backend'ine 4-kilit enforcement spec'inin verilmesi (kapasite tavanı · API yazma kısıtı · otomasyon bloğu · kanal bağımsız sayım)** |

## 11. Tek cümlelik özet

> Kapıyı kapatmayacağız; kapıyı biz yapıp gişe koyacağız. Yazma asla çıplak
> verilmeyecek, şema boş tabağa çevrilecek, sözleşme AI çağına göre yazılacak,
> bypass fiyatla cazibesizleştirilecek, kayıt işleyen her dış ajan Dijital
> Teknisyen Lisansıyla sayılacak — ve asıl yatırım, klonlanamayan tek şeye
> yapılacak: yaşayan, öğrenen, desteklenen akışa.

---

*Kaynaklar: ServiceNow Knowledge 2026 duyuruları (Action Fabric / MCP Server —
Now Assist SKU'suna dahil; Control Tower governance), Zendesk MCP erken erişim
programı + güvenlik analizleri (PII dökme zaafı), Atlassian Rovo MCP (API token
ile makine erişimi), Nadella'nın "SaaS agent çağında çöker" tezi (B2G podcast,
CX Today / Windows Central aktarımları), SAP-Diageo dolaylı erişim davası.*
