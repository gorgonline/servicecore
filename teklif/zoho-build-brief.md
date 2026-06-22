# Zoho Teklif Şablonu — Tam Sürüm Build Brief

**Hedef dosya:** `teklif/servicecore-teklif.html` (TAM sürüm).
**Temel/base:** `teklif/servicecore-teklif-ornek.html` — onaylı 5 sayfalık Zoho-uyumlu örnek. Bu dosyanın `<style>` sistemini, çalışan header/footer'ını ve mevcut sayfalarını AYNEN koru. Yeni sayfalar bu tasarım dilini birebir kullanır.

> Bu, web sitesindeki `/teklif` sayfasının (website/public/teklif/index.html) **Zoho CRM Inventory (Quotes) template** karşılığıdır. Erman'ın 4 talimatı uygulanır.

## ERMAN'IN 4 TALİMATI (zorunlu)
1. **Proof Drive söylemlerini çıkar.** Base'de zaten yok — ama dosyanın HİÇBİR yerinde "Proof Drive", "Proof of Value", "PoV", "8 hafta", "sonuç yoksa sipariş yok", "risksiz başlangıç/geçiş" gibi ifadeler BULUNMAYACAK. (Bunlar yalnız web sitesi /teklif sayfasında var; Zoho sürümüne taşınmaz.)
2. **Referansları fulle.** Yeni bir "Referanslar" sayfası ekle; `website/src/data/references.json` içindeki TÜM referansları (her iki kategori, 55 logo) bir logo ızgarasında göster + 4-6 öne çıkan mini-vaka.
3. **Fark Var sayfasını fulle.** Mevcut 6 vitrin (mock'lu) kartı KORU; ardından `website/src/data/fark-var.json` içindeki TÜM maddeleri (44 madde) eksiksiz listele.
4. **Erman'ın verdiği teklif koşullarını ekle.** Yeni bir "Teklif Koşulları" sayfası; aşağıdaki maddeler birebir işlenir.

## SAYFA SIRASI (7 bölüm)
1. **Kapak** — base'den AYNEN (merge alanları korunur).
2. **Yönetici Özeti** — base'den AYNEN.
3. **Mevcut Durumun Maliyeti (COI)** — base'den AYNEN.
4. **Fark Yaratan Yetenekler — TAM** — base'deki 6 mock kart + altına TÜM 44 madde (fark-var.json).
5. **Teklif ve Yatırım** — base'den AYNEN (3 kademe + Zoho lineItem tablosu + notlar). Tek ekleme: fiyat tablosu altına KDV muafiyet notu (aşağıda).
6. **Teklif Koşulları — YENİ** (Erman'ın koşulları).
7. **Referanslar — YENİ** (tam logo ızgarası + vakalar).

## GÖRSEL URL KURALLARI (Zoho mutlak HTTPS PNG ister; relative ve SVG KABUL ETMEZ)
- Ana ServiceCore logosu (header, footer, kapak): base'deki `assets/logo.png` yollarının TAMAMINI `https://servicecore.com.tr/teklif/logo.png` ile değiştir.
- Referans logoları: references.json'daki `/logos/x.png` → `https://servicecore.com.tr/logos/x.png`.
- Başka hiçbir relative `assets/...` görseli kalmasın (mock'lar saf HTML/CSS, görsel değil — onlar kalır).

## ZOHO / FLYING SAUCER KISITLARI (XHTML + CSS 2.1) — İHLAL ETME
- YASAK: flex, grid, `var()`, gradient, `box-shadow`, `transform`, `border-radius`, `rgba()`, SVG, web-font, JavaScript, `<link>` harici CSS.
- Layout SADECE iç içe `<table>`. Renkler literal hex. Köşeler KARE. Fontlar yalnız Arial/Helvetica + Georgia.
- İyi biçimli XHTML: tüm etiketler kapalı, `<img ... />`, `<br />`, `<hr />` self-closing; öznitelikler tırnaklı.
- Tek `<style>` bloğu (head) + inline stiller. Yeni CSS sınıflarını namespace'le: Fark Var listesi `.fk-`, Koşullar `.ko-`, Referanslar `.rf-`.
- Türkçe karakterler için base ile AYNI yöntem: **sayısal HTML entity** kullan. ı=`&#305;` İ=`&#304;` ş=`&#351;` Ş=`&#350;` ğ=`&#287;` Ğ=`&#286;` ü=`&#252;` Ü=`&#220;` ö=`&#246;` Ö=`&#214;` ç=`&#231;` Ç=`&#199;`. Ayrıca em-dash `&#8212;`, kesme `&#8217;`, orta nokta `&#183;`, nbsp `&#160;`, ₺ `&#8378;`, % işareti düz `%`. Ampersand `&amp;`.
- **BÜYÜK "İ" KURALI (ZORUNLU):** Noktalı büyük `İ` (`&#304;`) YALNIZCA Türkçe kelimelerde (küçük hali "i" olan) kullanılır. **İngilizce kelime ve kısaltmalarda ASLA `&#304;` kullanma — düz ASCII "I" yaz.** Örnek düz "I": ITIL, ITSM, ITAM, ESM, FSM, CSM, CMDB, CI, AD, ID, SRM, IT, TIME ENGINE, INTERACTION MANAGEMENT, BACKLOG, AGILE, KANBAN, WORKFLOW ENGINE, CUSTOM FLOW DESIGN, LOW CODE DESIGN, MULTICOMPANY, UPDATE, HOSTED. Örnek noktalı `&#304;`: İstek, İhtiyaç, İlk, İdari, İmza, İçindekiler, İş, İleri. fark-var.json başlıkları çoğunlukla İngilizce ALL-CAPS — bunlardaki "I" düz kalır, `&#304;`'ye çevrilmez.
- Sayfa kırma: yeni sayfa `<div class="sheet pb">`, bölünmesin `class="avoid"` / `page-break-inside:avoid`.

## MARKA / DİL
- Renkler: accent #0070F3, ink #0A1B2E, base'deki gri paleti. ITIL4 terminolojisi. "Policy" (asla "poliçe"). Profesyonel, güven veren Türkçe; agresif satış dili YOK. Rakip ismi GEÇMEZ.

---

## SAYFA 4 — FARK VAR TAM LİSTE (mock kartlardan sonra)
- 6 mock kart `dif` tablosu base'den AYNEN kalır.
- Altına: `<div class="spacer-m">`, sonra alt-başlık (overline + h2 değil, küçük bir `.fk-h`/pill) "T&#252;m Fark Yaratan Yetenekler" + fark-var.json `giris_metni` (lead stilinde).
- Sonra TÜM 44 madde: 2 kolonlu tablo (`.fk` namespace). Her hücre: küçük accent madde işareti/numara + `baslik` (Georgia bold ~12px #0A1B2E) + `aciklama` (Arial ~10px #475569, line-height 1.5). Satırlar `page-break-inside:avoid`. 44 madde → bu sayfa birden çok yazdırma sayfasına taşabilir (sorun değil).
- Maddeleri fark-var.json sırasıyla, BİREBİR (başlık + açıklama) işle. Hiçbirini atlama, kısaltma, "vb." ile geçiştirme YOK.

## SAYFA 6 — TEKLİF KOŞULLARI (YENİ)
Başlık bloğu: `<p class="overline">Teklif Ko&#351;ullar&#305;</p>` + `<h2 class="h2">Teklif ve hizmet ko&#351;ullar&#305;.</h2>` + kısa lead: "A&#351;a&#287;&#305;daki ko&#351;ullar, iki taraf&#305;n da ba&#351;ar&#305;s&#305;n&#305; g&#252;vence alt&#305;na almak i&#231;in tan&#305;mlanm&#305;&#351;t&#305;r."

Aşağıdaki maddeleri BİREBİR, profesyonel biçimde işle (numaralı liste ya da gruplu kartlar; `.ko-` namespace; köşe kare, tablo layout). Hiçbir madde atlanmaz:

1. Servicecore A.Ş. ürünleri teknopark bünyesinde ve T.C. Sanayi ve Ticaret Bakanlığı'na bağlıdır. T.C. STB 092050 kodlu Servicecore ürünü 223-20/1 kapsamında KDV'den muaftır.
2. Teklif yukarıda belirtilen süreyle (Son Geçerlilik tarihi) geçerlidir. Fiyatlar geçerlilik süresinden sonra değiştirilebilir, güncellenebilir.
3. Sözleşme ve fatura imza tarihindeki TCMB kuru ile Türk Lirası olarak düzenlenmektedir. Fiyatlar global olarak tüm yurtdışı ve yurtiçi müşterilere sunulduğundan teklif USD veya TL para biriminde sunulabilmektedir.
4. İlk alım indirimi müşteriye ve projeye özel sunulmuştur. Fiyatlar sözleşme süresince geçerlidir ve sonraki yıllarda değişebilir. Liste fiyatları, indirim oranları ve özel fiyatlarda enflasyon kaynaklı değişiklik hakkımız saklıdır.
5. Teklife konu ürünlerin detayları ve taahhüt edilen tüm fonksiyonları ilgili sayfada; ayrıca özet olarak **datasheet** ve kapsamlı olarak **specsheet** içinde yer alır. (datasheet → https://servicecore.com.tr/datasheet , specsheet → https://servicecore.com.tr/specsheet — accent-renkli link.)
6. Lisans kiralama sözleşmemiz ilgili koşullarda tanımlıdır ve teklif bu koşullarda oluşturulmuştur.
7. Teklifte yer alan **destek hizmetleri** ilgili koşullara göre sunulur. (destek → https://servicecore.com.tr/destek)
8. Teklifte yer alan **kurulum ve implementasyon hizmetleri** ilgili kapsamlarda sunulur. (kurulum → https://servicecore.com.tr/hizmetler/setup)
9. Teklifin daha sağlıklı oluşturulması ve en doğru ihtiyaç analizi için **analiz formu** kullanılabilir; bu formdaki sorular lisans ve hizmet ihtiyaçlarının tespiti için yeterlidir. Form, online toplantıda birlikte doldurulduktan sonra en sağlıklı tekliflendirme yapılır. (analiz → https://servicecore.com.tr/analiz)
10. Talep üzerine ve analiz formundaki cevaplara göre implementasyon, migration, entegrasyon ve özel ek geliştirmeler için ek tekliflendirme yapılabilir.
11. Ürün kullanım hakları yıllık, 3 yıllık vb. sürelerde abonelik (subscription / kiralama) modeli ile sunulur.
12. Bu sürelerde yapılan abonelik, ürünle ilgili her tür bakımı kapsar. Tüm bakım (düzeltici + üretici standart roadmap yeni özellikleri ve bunların müşteri ortamına yüklenmesi) abonelik ücretine dahildir.
13. Abonelik/Subscription modeli SaaS anlamına gelmez. Ürün abonelik olarak lisanslansa da kurulum müşteri ortamına on-premises yapılır.
14. Lisans, yıllık bazda kullanım hakkı olarak sisteme tanımlanır. Abonelik süresi sonunda yazılımın çalışmaya devamı için abonelik yenilenmelidir.
15. Lisanslama minimum 10 teknisyen ile başlar. Hibrit/karma lisans mümkündür ("X adet Standart + Y adet Add-on + Z adet Professional"); doğru kullanım analizi ile en tasarruflu modele ulaşılır. Hibrit lisanslamada Professional lisans, Standart lisansın %25'inden az olamaz.
16. Lisanslama planlarınızı bu gözle yeniden incelemenizde fayda olabilir.

Kapanış notu (ince, italik): "Detayl&#305; s&#246;zle&#351;me &#351;artlar&#305; imzaya esas ana s&#246;zle&#351;mede (MSA) yer al&#305;r; yukar&#305;daki maddeler &#246;zet niteli&#287;indedir."

## SAYFA 5 — KDV (DOKÜMANA SADIK — ekstra not YOK)
Fiyat tablosunu dokümandaki Zoho formatıyla AYNEN bırak: `Toplam ${Quotes.Sub Total}` · `KDV ${Quotes.Tax}` · `Genel Toplam ${Quotes.Grand Total}`. KDV satırı kaldırılmaz; tablonun altına KDV muafiyetiyle ilgili **hiçbir ek not/cümle eklenmez**. KDV muafiyeti yalnızca Teklif Koşulları sayfasında (madde 1) PDF'teki haliyle birebir geçer. Döküman ne diyorsa o.

## SAYFA 7 — REFERANSLAR (YENİ)
- Başlık: `<p class="overline">Referanslar</p>` + `<h2 class="h2">T&#252;rkiye&#8217;nin lider kurumlar&#305;n&#305;n tercihi.</h2>` + lead (references.json intro.description'tan uyarlanmış; "4M'i aşan son kullanıcı" ifadesi korunur).
- TÜM referans logoları (references.json `categories[].references`, 55 adet) bir ızgarada (`.rf-grid`): tablo, 5 kolon, her hücre beyaz kutu (border #DCE3EC veya hairline), ortalanmış `<img>` (max-height ~26px, genişlik auto/100%). İki kategori için alt-başlık ver: "ESM / ITSM / FSM / ITAM / EAM" ve "CSM / Multi-CSM Service Integrators" (references.json categories[].title). Logo URL'leri `https://servicecore.com.tr/logos/<dosya>`.
- Logo ızgarasından sonra 4-6 öne çıkan mini-vaka (references.json `detailedReferences`'tan: Aksa, Boyner, Roketsan, Sabancı DX, Logo Yazılım, ALJ Finans/Misyon): küçük kartlarda `name` (bold) + `description` (gri, ~10px). `.rf-case` namespace.
- Kapanış: "Sekt&#246;r&#252;n&#252;ze en yak&#305;n referans&#305;m&#305;zla bir referans g&#246;r&#252;&#351;mesi ayarlayabiliriz." (callout-band)

## BÜYÜK "İ" / "I" DENETİMİ (teslimden önce)
Dosyadaki HER `&#304;` (ve her düz büyük "I") tek tek gözden geçirilir: İngilizce kelime/kısaltma içindeyse düz "I" olmalı; Türkçe kelime başıysa `&#304;` olmalı. Bu kural Fark Var başlıkları, Koşullar metni ve tüm bölümler için geçerlidir.

## YAZIM / EKSİKSİZLİK KURALI
- Hiçbir bölüm "..." / "for brevity" / "vb. ile geçiştirme" ile kısaltılmaz. 44 fark maddesi, 16 koşul maddesi, 55 logo TAM işlenir.
- Dosyayı yazdıktan sonra şunları doğrula ve raporla: (a) fark maddesi sayısı (44 olmalı), (b) referans logo `<img>` sayısı (55 olmalı), (c) "Proof Drive" geçişi (0 olmalı), (d) relative `assets/` görsel kalmadı, (e) merge alanları (`${Quotes...}`, `${Organization...}`, `${...Hizmet Listesi...}`) korunuyor.
