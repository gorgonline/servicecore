# AICore Lisanslama, GateCoreAI ve Lisanslama Rehberi

## Detaylı içerik, ürün, ticari model, güvenlik, tasarım ve teknik inceleme raporu

**İnceleme tarihi:** 27 Temmuz 2026  
**İncelenen çalışma:**

1. `/aicore/lisanslama` — yeni sayfa
2. `/aicore/gatecore` — ortak şablon yerine özel sayfa
3. `/planlar/lisanslama-rehberi` — eklenen 13. bölüm

> Bu rapor yalnızca eleştiri çıkarmak için hazırlanmadı. Aşağıdaki maddeler, müşterinin satın alma kararını, sözleşmenin uygulanabilirliğini, ürünün güvenlik iddialarını veya sitenin teknik kalitesini gerçekten etkileyen konulardır.
>
> Satır numaraları inceleme anındaki sürüme aittir; dosyalar değiştikçe kayabilir.

---

## 1. Net hüküm

İstenen içerik kapsamı büyük ölçüde tamamlanmış. Üç çalışma da yüzeysel bir metin eklemesi gibi durmuyor; konuyu anlatmaya çalışan, kendi mantığı ve sunum dili olan ciddi sayfalar ortaya çıkmış.

Özellikle:

- Lisanslama sayfasında teklifteki üç ticari grup, eklentilerin yaptığı işin fiyata dahil olması, sayacın ne olduğu ve olmadığı, bandın yalnız dış ajan için kullanılması, sekiz bant kuralı, ölçüm tanımları, ücretlendirilmeyenler, şeffaflık ve on soruluk SSS mevcut.
- GateCoreAI sayfasında mevcut durum, ajanın üçlü yapısal zaafı, servis yönetiminin neden hassas olduğu, sekiz risk senaryosu ve karşılığı, kapının yetenekleri, çift yönlü şeffaflık, bağlantı şartları, lisans notu ve üç özel mock ekran mevcut.
- Lisanslama rehberinde 13. bölüm eklenmiş.
- Üç rota da çalışıyor.
- Masaüstü ve mobil görünümde yatay taşma görülmedi.
- Üretim derlemesi başarılı.

Ancak çalışma şu an **görsel olarak yayımlanabilir**, fakat **ticari ve sözleşmesel olarak henüz teklif vermeye hazır değil**.

Temel neden şu:

> Web metni, ürün ve ticari model kesinleşmiş gibi konuşuyor; repository içindeki ürün kataloğu, hukuk taslağı, fiyatlama notu, backend iş paketi ve yönetici kararları ise aynı konuda farklı modeller anlatıyor.

Bu, kelime tercihi seviyesinde bir sorun değil. Bugün satış ekibi bu sayfaları referans alarak teklif çıkarırsa aşağıdaki soruların birden fazla doğru cevabı oluşuyor:

- GateCoreAI bugün satılan zorunlu ürün mü, 2027 beta ürünü mü?
- AICore lisansı kişi/ajan kimliği başına mı, tamamlanan iş bandına göre mi?
- Bir iş her zaman bir birim mi, yoksa 1/2/5 ağırlıkla mı sayılıyor?
- Üç kalemin tamamı yıllık sabit mi, yoksa kurulum tek seferlik mi?
- Kullanım fiyatı hiç değiştirmiyor mu, yoksa kurum kullanım bandına göre mi fiyatlanıyor?
- İlk üç ayın sonunda hangi fiyat uygulanıyor?
- Bandı aşan müşteri için yeni fiyat hangi tarihten başlıyor?
- AICore destek paketinde ücretli görünen güncellemeler, genel bakım sözleşmesinde zaten dahil mi?

Bu cevaplar tekleştirilmeden “kurallar sözleşmede aynen yer alır”, “yoruma açık değildir” gibi kesin ifadeler riskli.

---

## 2. Yayın öncesindeki üç ana blokaj

### 2.1 GateCoreAI’nin bugünkü statüsü tek değil

Ürün kataloğu GateCoreAI’yi beta ve 2027 yol haritası ürünü olarak tanımlıyor:

- `src/data/aicore.json:1332-1340`
- `tier: "beta"`
- `year: 2027`
- `release: "Beta — Yol Haritası"`

AICore liste sayfası da ürünü bu veriye göre beta grubunda gösteriyor:

- `src/app/(main)/aicore/page.tsx:26-27`
- `src/app/(main)/aicore/page.tsx:166-178`

Buna karşılık navigasyon GateCoreAI’yi bilinçli biçimde beta olmaktan çıkarıp zorunlu ürün olarak işaretliyor:

- `src/components/layout/Navbar.tsx:182-191`

Footer da zorunlu olduğunu söylüyor:

- `src/components/layout/Footer.tsx:18-20`

Yeni GateCoreAI ve lisanslama sayfaları da GateCoreAI’yi bugün devrede olan, ayrı lisanslanan ve zorunlu bir katman gibi anlatıyor.

Daha önemlisi, hukuk taslağında GateCoreAI fiziksel olarak henüz bulunmasa bile sözleşme maddelerinin caydırıcılık sağlamasından söz ediliyor:

- `gorevler/ekler/aicore-savunma-stratejisi/AICore_Sozlesme_Maddeleri_Taslak.md:188-196`

Burada iki ihtimal var:

1. GateCoreAI bugün üretimde ve zorunluysa katalog, yol haritası, listeleme ve hukuk notu eskimiş.
2. GateCoreAI hâlâ gelecek/beta ürünüyse bugün zorunlu lisans kalemi olarak satılamaz ve mevcut güvenlik işlevleri varmış gibi anlatılamaz.

Bu ayrım yayın öncesinde kesinleştirilmeli. “Beta ama zorunlu” da mümkün bir modeldir; fakat o durumda müşteriye hizmet seviyesi, sorumluluk sınırı, beta şartları ve ücretlendirme açıkça anlatılmalıdır. Mevcut metin bunu yapmıyor.

### 2.2 Lisanslama modeli için birden fazla kaynak “nihai karar” gibi davranıyor

Web sayfası dış ajanın tamamladığı iş hacmine dayalı bant modelini ana model olarak sunuyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:123-136`
- `src/app/(main)/aicore/lisanslama/page.tsx:423-458`

Hukuk taslağı ise yıllık sabit “Dijital Teknisyen Lisansı”nı ajan kimliği başına kuruyor:

- `gorevler/ekler/aicore-savunma-stratejisi/AICore_Sozlesme_Maddeleri_Taslak.md:58-72`

Fiyatlama bilimi notu da kişi/ajan başına DTL modelini kararlaştırılmış model olarak anlatıyor:

- `gorevler/ekler/aicore-lisanslama/AICore_Fiyatlama_Bilimi_Notu.md:72-88`

Öte yandan yönetici özeti bant eşikleri, fiyatlar, tolerans ve kuralları yönetim kararı olarak listeliyor:

- `gorevler/ekler/aicore-lisanslama/Yonetici_Ozeti_ve_Kararlar.md:50-77`
- `gorevler/ekler/aicore-lisanslama/Yonetici_Ozeti_ve_Kararlar.md:91-107`

Backend iş paketi ise fiyat ve limitlerin sessiz ölçüm ve pilot sonrasında kilitleneceğini, pilot öncesi satış yapılmaması gerektiğini söylüyor:

- `gorevler/ekler/aicore-lisanslama/AICORE_Backend_Is_Paketi.md:303-316`
- `gorevler/ekler/aicore-lisanslama/AICORE_Backend_Is_Paketi.md:345-348`

Bu belgeler aynı anda doğru olamaz. Önce aşağıdakilerden biri seçilmeli:

- Ajan kimliği başına lisans
- Kurum başına yıllık iş hacmi bandı
- İkisinin birlikte kullanıldığı hibrit model

Hibrit model seçilecekse hangi ücretin neyi karşıladığı ve aynı kullanımın iki kez ücretlenmediği açıkça gösterilmelidir.

### 2.3 Sayaç algoritması web ile backend arasında farklı

Web metni anlaşılır biçimde “bir sonuç = bir iş” diyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:147-150`
- `src/data/lisanslama-rehberi.json:288-290`

Backend dokümanı ise işlerin zorluğa göre 1, 2 veya 5 ağırlıkla sayılmasını koruyor:

- `gorevler/ekler/aicore-lisanslama/AICORE_Backend_Is_Paketi.md:167-172`
- `gorevler/ekler/aicore-lisanslama/AICORE_Backend_Is_Paketi.md:214-216`

Aynı ağırlıklı yaklaşım iş modeli dersinde de var:

- `gorevler/ekler/aicore-lisanslama/Is_Modeli_Dersi.md:71-77`

Bu teknik detay gibi görünse de doğrudan faturayı değiştirir. Bir müşteri 20.000 iş yaptığını düşünürken sistem 60.000 ağırlıklı birim hesaplayabilir.

Karar açık olmalı:

- Ya her başarılı sonuç gerçekten bir adet sayılır.
- Ya ağırlıklı birim kullanılır ve web sayfası bunu örneklerle açıklar.

“Bir iş bir iştir” denilip backend’de ağırlık uygulanmamalı.

---

## 3. Lisanslama sayfasındaki önemli çelişki ve eksikler

### 3.1 “Üçü de yıllık sabit kalem” ifadesi doğru değil

Hero bölümünde üç kalemin de yıllık ve sabit olduğu söyleniyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:291-294`

Fakat üçüncü kartın içinde kurulumun tek seferlik, bakım ve desteğin yıllık olduğu yazıyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:58-66`

İlgili veri dosyaları da bunu doğruluyor:

- `src/data/aicore-launch-ready.json:2-9` — tek seferlik
- `src/data/aicore-destek.json:2-9` — yıllık

Daha doğru anlatım:

> Teklif üç ticari gruptan oluşur: yıllık ürün lisansları, zorunlu GateCoreAI lisansı ve tek seferlik kurulum ile yıllık destek hizmetleri.

Ayrıca “dördüncü kalem yok” denecekse bunun mevcut ServiceCore ana platform lisansının üzerinde oluşan AICore ek kapsamı olduğu belirtilmeli. Aksi hâlde mevcut ServiceCore lisansı görünmez olmuş gibi algılanabilir.

### 3.2 “GateCoreAI satış kalemi değildir” sözü teklif yapısıyla çelişiyor

GateCoreAI sayfası:

- `src/app/(main)/aicore/gatecore/page.tsx:231-235`
- “GateCoreAI bir satış kalemi değil” diyor.

Lisanslama sayfası ise GateCoreAI’yi teklifin üç ana kaleminden ikincisi olarak gösteriyor ve ayrı yıllık lisanslandığını söylüyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:45-54`

Burada anlatılmak istenen muhtemelen “isteğe bağlı bir eklenti değildir.” O hâlde ifade şöyle kurulmalı:

> GateCoreAI isteğe bağlı bir satış eklentisi değildir; AICore ve dış ajan erişimi için ayrı lisanslanan zorunlu güvenlik katmanıdır.

Bu ifade hem ticari gerçeği hem ürünün zorunluluğunu saklamaz.

### 3.3 “Kullanım fiyatı değiştirmez” ifadesi fazla mutlak

Sayfa frekansın fiyatı değiştirmediğini ve günde binlerce işlem olsa da eklenti fiyatının sabit kaldığını söylüyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:35-42`
- `src/app/(main)/aicore/lisanslama/page.tsx:70-75`
- `src/app/(main)/aicore/lisanslama/page.tsx:224-225`

Rehber ise bazı AICore ürünlerinin kayıt, varlık veya çalışan hacmi bandına göre sabit fiyatlandığını söylüyor:

- `src/data/lisanslama-rehberi.json:255-256`

Burada “sabit fiyat” ile “kullanımdan bağımsız fiyat” birbirine karışıyor.

Daha doğru ifade:

> Sözleşilen hacim bandı içinde işlem sıklığı ayrıca ücretlendirilmez. Fiyat, kullanım başına değişmez; ancak yenilemede veya tanımlanmış bant geçiş koşullarında kurumun hacim bandı değişebilir.

### 3.4 Rehberdeki eski mutlak kurallar yeni AICore modeline göre daraltılmamış

Rehberin başında yalnız teknisyenlerin lisanslandığı ve her lisansın isimli bir teknisyene atandığı söyleniyor:

- `src/data/lisanslama-rehberi.json:43-55`

Aynı rehberin devamında kurum bazlı sabit AICore eklentileri ve GateCoreAI var:

- `src/data/lisanslama-rehberi.json:255-256`
- `src/data/lisanslama-rehberi.json:304-307`

Dolayısıyla “tüm lisanslar isimlidir” ifadesi artık doğru değil. Şu ayrım yapılmalı:

- ServiceCore insan kullanıcı lisansları
- AICore ürün/kapasite lisansları
- Dış ajan/GateCoreAI erişim lisansları
- Kurulum ve destek hizmetleri

Benzer biçimde:

- Rehberin 4. bölümünde minimum 10 lisans koşulu var: `src/data/lisanslama-rehberi.json:58-64`
- AICore SSS bölümünde zorunlu minimum olmadığı söyleniyor: `src/app/(main)/aicore/lisanslama/page.tsx:256-257`

Bu iki cümle ürün ailesi belirtilmeden okunduğunda çelişiyor. “Minimum 10” kuralının hangi lisans ailesine ait olduğu açıkça yazılmalı.

Rehberin erken bölümünde kayıt veya işlem sınırı olmadığı da söyleniyor:

- `src/data/lisanslama-rehberi.json:46-50`

AICore bantları ve GateCoreAI’nin aşım sonrası yazmayı durdurabilmesi düşünüldüğünde bu ifade de “ServiceCore ana platform kullanımı” ile sınırlandırılmalı.

### 3.5 “Teknisyen ekranında çalışan yedi ürün” gerekçesi bütün ürünlere uymuyor

Rehber, yedi AICore ürününü teknisyen tabanlı lisanslayıp bunların teknisyen ekranında çalıştığını ve kişi olmadan değer üretmediğini söylüyor:

- `src/data/lisanslama-rehberi.json:242-243`

Fakat katalog:

- VoiceCoreAI’nin son kullanıcıyla da çalışıp kayıt açabildiğini gösteriyor: `src/data/aicore.json:869-899`
- CoachCoreAI’nin altı aylık geçmiş üzerinde arka plan analizi yaptığını gösteriyor: `src/data/aicore.json:1418-1435`
- ReportCoreAI yönetici kullanımına bağlanıyor: `src/data/lisanslama-rehberi.json:242-251`

Üstelik rehberin erken bölümünde yönetici rolünün lisans gerektirmediği yazıyor:

- `src/data/lisanslama-rehberi.json:31-38`

Bu ürünlerin tamamını aynı “teknisyen ekranında çalışır” gerekçesine bağlamak savunulabilir değil. Her ürün için gerçek lisans öznesi belirtilmeli:

- teknisyen,
- yönetici,
- kurum,
- kanal,
- ajan kimliği,
- hacim bandı.

### 3.6 “Ölçülür” ve “banttan düşülür” kavramları ayrılmalı

Lisanslama sayfası AICore eklentilerinin yaptığı işlerin sayılmadığını söylüyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:116-125`

Aynı sayfa şeffaflık bölümünde her işin kaydedilip raporlandığını söylüyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:199-203`

Backend dokümanı bu ayrımı daha doğru kuruyor: eklenti işleri ölçülür ve raporlanır, fakat dış ajan bandından düşülmez:

- `gorevler/ekler/aicore-lisanslama/AICORE_Backend_Is_Paketi.md:197-202`

Kavramların ayrı adları olmalı:

1. **Denetim olayı:** Sistemde gerçekleşen her anlamlı eylem
2. **Toplam otomasyon sonucu:** AICore ve dış ajan dahil tamamlanan tüm işler
3. **Banda tabi dış ajan birimi:** Lisans bandından düşülen başarılı dış ajan işleri
4. **Ağırlıklı birim:** Yalnız kullanılmasına karar verilirse zorluk katsayılı ticari ölçü

“Sayaç” kelimesi bu dört anlam için birden kullanılmamalı.

### 3.7 Bant yaşam döngüsü sözleşmeye dönüşecek kadar tamamlanmamış

Mevcut metinde ilk üç ay sınırsız gözlem dönemi var. Fakat şu soruların cevabı yok:

- İlk teklif hangi banttan ve hangi fiyatla kesilecek?
- Üç aylık hacim yıllık banda nasıl çevrilecek?
- Müşteri ölçüm sonunda daha düşük banda düşerse fark iade veya kredi olacak mı?
- Daha yüksek banda çıkarsa geçmiş üç ay için fark alınacak mı?
- Mevsimsel işletmeler nasıl değerlendirilecek?
- Yeni müşteri ile mevcut müşteri aynı yöntemle mi sınıflandırılacak?

Ayrıca sayfa bir yerde sözleşme yılı sıfırlamasını, başka yerde son 12 aylık hacmi birlikte kullanıyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:184-195`

Bunlar farklı mekanizmalardır:

- Sayaç sözleşme yıldönümünde sıfırlanabilir.
- Bant seçimi kayan son 12 aylık ölçüme göre yapılabilir.

İkisi birlikte kullanılacaksa ayrı ayrı tanımlanmalı.

“İki dönem” ifadesi de belirsiz:

- `src/app/(main)/aicore/lisanslama/page.tsx:168-170`

Buradaki dönem ay mı, çeyrek mi, sözleşme yılı mı? Bu kadar kritik bir tetikleyici isimsiz bırakılamaz.

Rehber genel aboneliklerin 1, 3 ve 5 yıl olabileceğini söylüyor:

- `src/data/lisanslama-rehberi.json:68-75`

Bu nedenle yıllık sayaç, çok yıllı sözleşme ve fiyat yenileme anı arasındaki ilişki ayrıca tanımlanmalı.

### 3.8 Aşım sonrası fiyatın başlangıç tarihi geriye dönük faturalama riski yaratıyor

Sayfa yeni fiyatın aşım tarihinden itibaren geçerli olduğunu, fakat ek sipariş formu imzalanmadan otomatik fatura oluşmadığını söylüyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:158-165`
- `src/app/(main)/aicore/lisanslama/page.tsx:240-241`

Ek form tolerans süresi bittikten sonra imzalanırsa, aşım tarihine kadar geri giden fiyat farkı fiilen geriye dönük ücret olur. “Geriye dönük fatura yoktur” iddiasıyla çelişir.

Şunlardan biri açıkça seçilmeli:

- Yeni fiyat yalnız imza tarihinden sonra başlar.
- Tolerans bitiminden sonra yazma durur; imza olmadan fiyat başlamaz.
- Sözleşme, tanımlı eşiğin aşılmasıyla otomatik bant geçişine önceden izin verir.

Şu anki metin üçünü birden ima ediyor.

### 3.9 ESM bandındaki “kurum” ölçü birimi tanımsız

Rehber tenant kapsamını ayrı anlatıyor:

- `src/data/lisanslama-rehberi.json:185-200`

AICore bölümü ise “kurum” diyor:

- `src/data/lisanslama-rehberi.json:255-256`
- `src/data/lisanslama-rehberi.json:304`

Kurum şu anlamlardan hangisi?

- tek tüzel kişilik,
- tenant,
- ServiceCore kurulumu,
- holding,
- bağlı şirket,
- production instance,
- sözleşmedeki müşteri hesabı.

Bu tanım yapılmazsa grup şirketlerinde hem fiyat hem sayaç tartışması çıkar.

### 3.10 Destek ve güncelleme kapsamı iki farklı şekilde anlatılıyor

AICore sayfası ayrı yıllık bakım/destek paketi gösteriyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:58-66`
- `src/data/lisanslama-rehberi.json:308-309`

Rehberin 14. bölümü ise bakım, hata düzeltmeleri, özellikler ve güncellemelerin dahil olduğunu söylüyor:

- `src/data/lisanslama-rehberi.json:313-339`

AICore destek veri dosyası da sürüm güncellemeleri ve güvenlik yamalarını ücretli paketin kapsamına koyuyor:

- `src/data/aicore-destek.json:25-40`
- `src/data/aicore-destek.json:123-127`

Şu ayrım yapılmalı:

- **Temel ürün hakkı:** Kritik güvenlik yamaları, yasal uyumluluk düzeltmeleri ve ürün hataları
- **Ücretli destek hakkı:** SLA, öncelikli müdahale, model/ajan kalibrasyonu, operasyon danışmanlığı, sürüm yönetimi, özel destek

Güvenlik yamalarının destek satın almayan müşteriden esirgenmesi hem güvenlik hem ürün itibarı açısından doğru olmaz.

### 3.11 “Sekiz kural” iki yerde aynı değil

Ana lisanslama sayfasında gerçekten sekiz ayrı bant kuralı var. Bunlardan biri imzalı sipariş formu olmadan otomatik ücret oluşmayacağına ilişkin.

Rehberin 13. bölümünde ise:

- `src/data/lisanslama-rehberi.json:285-298`

on madde bulunuyor; bant sınırı davranışı ve ölçüm tanımları da kural listesine karışmış. Buna karşılık imzalı sipariş formu/no automatic invoice kuralı açık biçimde yer almıyor.

Bu içerik iki ayrı kaynaktan elle yazılmamalı. Tek bir veri kaynağından şu başlıklarla üretilmeli:

- Sekiz ticari kural
- Ölçüm tanımları
- Sınır davranışı
- Örnek hesap

### 3.12 Dış ajan + lisanslı AICore zincirinde işi kimin ürettiği belirsiz

Katalog GateCoreAI’nin dış ajana satın alınmış AICore yeteneklerini kullandırabileceğini söylüyor:

- `src/data/aicore.json:1360-1361`

Lisanslama sayfası ise sonucu kimin ürettiğine göre ayrım yapıyor ve lisanslı AICore işlerini dış ajan bandından muaf tutuyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:143-150`
- `src/app/(main)/aicore/lisanslama/page.tsx:452-458`

Örnek:

1. Dış ajan kayıt okuyor.
2. SolveCoreAI’dan çözüm alıyor.
3. Dış ajan bu çözümü kayda yazıp kaydı kapatıyor.

Bu iş:

- dış ajanın tamamladığı bir iş mi,
- SolveCoreAI lisansına dahil bir iş mi,
- ikisinin de denetim olayına girip yalnız birinin banda yansıdığı iş mi?

Bu zincir açık tanımlanmazsa hem çift sayım hem lisans kaçınma tartışması çıkar.

### 3.13 Ücretsiz şeffaflık ile ücretli analitik sınırı net değil

Web sayfası ücretsiz kullanım ekranı ve yönetici raporları vaat ediyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:97-100`
- `src/app/(main)/aicore/lisanslama/page.tsx:123-125`
- `src/app/(main)/aicore/lisanslama/page.tsx:533-538`

Backend iş paketi ise temel denetim ve doluluk görünümünü ücretsiz; iş dağılımı ve trend analizini ücretli kabul ediyor:

- `gorevler/ekler/aicore-lisanslama/AICORE_Backend_Is_Paketi.md:280-298`

Ücretsiz ekranda görülecek alanlarla ücretli analitik özellikleri tablo halinde ayrılmalı.

---

## 4. GateCoreAI sayfasındaki güvenlik ve ürün anlatısı

### 4.1 Ana tez güçlü ve doğru bir zemine dayanıyor

Sayfanın en güçlü fikri, ajanın şu üç yeteneği aynı anda taşıdığı anda riskin büyümesi:

1. Kurum içi gizli veriyi okuyabilmesi
2. Güvenilmeyen içerik veya talimatla karşılaşabilmesi
3. Dış dünyaya veya etkili araçlara erişebilmesi

Bu çerçeve Simon Willison’ın “lethal trifecta” tarifine dayanıyor:

- https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/

Bu tez GateCoreAI sayfasına gerçek bir gerekçe veriyor. Sayfa “bir güvenlik ürünü daha” demek yerine ajanın neden klasik entegrasyondan farklı olduğunu anlatabiliyor.

Ancak şu ifade fazla kesin:

- `src/app/(main)/aicore/gatecore/page.tsx:281-286`
- Üç parçanın tek başına zararsız olduğu söyleniyor.

Daha doğru ifade:

> Bu üç özellikten biri tek başına söz konusu veri sızdırma zincirini tamamlamaz; üçü birleştiğinde risk belirgin biçimde büyür.

Çünkü bir ajan üçlü tamamlanmadan da yanlış kayıt silebilir, yetkisiz değişiklik yapabilir veya operasyonu bozabilir.

### 4.2 Prompt injection karşılığı yalnız “yetki alanı” ile çözülemez

Risk senaryosunda prompt injection’a verilen temel karşılık kapsam/yetki sınırı:

- `src/app/(main)/aicore/gatecore/page.tsx:135-140`
- `src/app/(main)/aicore/gatecore/page.tsx:303-309`

Bu önemli ama yeterli değil. Ajanın izinli bir eylemi kötü niyetli talimatla yapması mümkündür. Ayrıca ajanın GateCoreAI dışında başka bir dışa çıkış kanalı varsa veri oradan sızabilir.

Güvenli anlatı ve ürün tasarımı şunları birlikte gerektirir:

- minimum araç ve işlem yetkisi,
- nesne seviyesinde yetki,
- veri alanı maskeleme,
- yüksek etkili işlemlerde insan onayı,
- hız/hacim/anomali sınırları,
- dışa çıkış kanallarının kontrolü,
- ajan ve sorumlu insan kimliğinin bağlanması.

OWASP’ın “Excessive Agency” rehberi de işlev, izin ve otonomi azaltımı ile yüksek etkili işlemlerde insan onayını öneriyor:

- https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

### 4.3 “Verinin nereye gittiğini kaydeder” iddiası teknik kapsamı aşabilir

Sayfa hangi içeriğin nereye gittiğinin kaydedildiğini söylüyor:

- `src/app/(main)/aicore/gatecore/page.tsx:114-119`

GateCoreAI yalnız ServiceCore tarafındaki istek ve cevabı görüyorsa kesin olarak şunları bilir:

- hangi ajan hangi endpoint’i çağırdı,
- hangi ServiceCore verisi ajana döndü,
- hangi alanlar maskelendi,
- hangi işlem izinli, onaylı veya engelli oldu.

Fakat ajan aldığı veriyi daha sonra e-posta, başka API, web araması veya kendi belleği üzerinden nereye gönderdi, bunu ancak ajanın bütün dışa çıkışları GateCoreAI üzerinden geçiyorsa bilebilir.

Bu nedenle iddia şu şekilde sınırlandırılmalı:

> GateCoreAI, ServiceCore’dan ajana hangi verinin verildiğini ve ServiceCore’a hangi işlemin uygulandığını kaydeder. Ajanın sonraki dış sistem hareketleri ancak ilgili çıkışlar da GateCoreAI politikası altında ise izlenebilir.

### 4.4 Kaynak konumu beyan ediliyor ama teknik olarak bağlanmıyor

Risk senaryosu ajanın kaynağının bilinmesini ve bilinmeyen kaynağın engellenmesini vaat ediyor:

- `src/app/(main)/aicore/gatecore/page.tsx:94-105`

Bağlantı şartları ise ağırlıklı olarak konum beyanı istiyor:

- `src/app/(main)/aicore/gatecore/page.tsx:183-189`

“Ajan Avrupa’dadır” demek, bağlantının gerçekten o iş yükünden geldiğini kanıtlamaz. Teknik bağ gerekir:

- mTLS istemci sertifikası,
- workload identity,
- anahtarın belirli iş yüküne bağlanması,
- IP/ASN allowlist,
- kısa ömürlü token,
- imzalı ajan kimliği,
- gerekiyorsa attestation.

NIST’in ajan kimliği ve yetkilendirme çalışması da ajan kimliğinin, yetkisinin ve yaşam döngüsünün teknik olarak bağlanması gereğine odaklanıyor:

- https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf

### 4.5 “Her ajanın arkasında insan vardır” şartlara yansımıyor

Sayfa:

- `src/app/(main)/aicore/gatecore/page.tsx:150-155`
- `src/app/(main)/aicore/gatecore/page.tsx:361-363`

her ajanın bir insanla ilişkilendirildiğini vurguluyor.

Fakat bağlantı şartlarında isimli ve sorumlu bir iş sahibi zorunlu alan olarak görünmüyor.

Üç kimlik birbirinden ayrılmalı:

- **Çalıştıran ajan:** Teknik workload/agent kimliği
- **Adına çalışılan kullanıcı:** Varsa o işlemi başlatan insan
- **Kurumsal sorumlu:** Ajanın kapsam ve sonuçlarından sorumlu isimli iş sahibi

Her işlemde üçünün tamamı olmayabilir; fakat hangi durumda hangisinin zorunlu olduğu tanımlanmalı.

### 4.6 Metin ile canlı trafik mock’undaki karar matrisi uyuşmuyor

Metin, kapsam dışı işlemin onaya gideceğini söylüyor:

- `src/app/(main)/aicore/gatecore/page.tsx:357-364`

Mock ise:

- tanımsız işlemi onaya,
- kapsam dışı işlemi doğrudan engele

gönderiyor:

- `src/components/aicore/GateCoreVisuals.tsx:34-38`

Daha tutarlı karar matrisi:

- **Açıkça izinli ve düşük riskli:** İzin ver
- **Potansiyel olarak izinli fakat yeni/yüksek etkili:** Onaya gönder
- **Yasak veya açıkça kapsam dışı:** Engelle
- **Kimliği/doğrulaması yetersiz:** Engelle

Bu matris sayfada tek bir kanonik tanım olarak kullanılmalı.

### 4.7 “Bir kez rutin işaretle, bir daha sormaz” güvenlik açısından sınırsız bırakılamaz

Sayfa:

- `src/app/(main)/aicore/gatecore/page.tsx:430-433`

rutin olarak işaretlenen işlemin tekrar sorulmayacağını söylüyor.

Başka bir bölüm ise sabit aralıklı davranışların yakalanıp kesilebildiğini anlatıyor:

- `src/app/(main)/aicore/gatecore/page.tsx:172-175`

Mock’ta günlük 06.00 rutini var:

- `src/components/aicore/GateCoreVisuals.tsx:107-112`

Rutin onayı sınırsız bir beyaz liste olmamalı. Şunlara bağlı bir istisna politikası olmalı:

- ajan kimliği,
- işlem tipi,
- nesne veya filtre kapsamı,
- maksimum kayıt sayısı,
- çalışma saatleri,
- geçerlilik süresi,
- veri hassasiyet sınıfı,
- sapma durumunda yeniden onay.

Yani “bir daha hiç sormaz” değil, “tanımlı rutin sınırlarında tekrar sormaz; sapmada yeniden onay ister.”

### 4.8 GateCoreAI’nin kapsamı iki farklı ürünü tarif ediyor

GateCoreAI ve lisanslama sayfaları yalnız ajanları değil, mevcut entegrasyonlar dahil bütün yazılımları kapsıyor gibi:

- `src/app/(main)/aicore/gatecore/page.tsx:232-235`
- `src/app/(main)/aicore/lisanslama/page.tsx:130-132`

Ürün kataloğu ise GateCoreAI’yi AI ajanları için güvenli erişim katmanı olarak tanımlıyor:

- `src/data/aicore.json:1332-1361`

Karar verilmesi gereken ürün sınırı:

1. Yalnız AI ajan geçidi
2. Bütün makineden makineye erişimin merkezi API geçidi
3. Ortak çekirdek üzerinde ayrı entegrasyon ve ajan profilleri

Üçüncü seçenek en mantıklısı olabilir; fakat o durumda klasik entegrasyon ile otonom ajan aynı risk profiline sahipmiş gibi ücretlendirilmemeli ve anlatılmamalı.

### 4.9 Yeni özel sayfa eski katalogdaki faydayı geri plana atmış

Katalog GateCoreAI’nin dış ajanlara:

- standart kayıt endpoint’leri,
- satın alınmış AICore akıllı yetenekleri

sunacağını anlatıyor:

- `src/data/aicore.json:1335-1361`

Yeni sayfanın yetenek bölümü neredeyse tamamen güvenlik kontrolüne odaklanıyor:

- `src/app/(main)/aicore/gatecore/page.tsx:150-180`

Bu sayfa “neyi engeller?” sorusuna güçlü cevap veriyor; “ajan GateCoreAI üzerinden hangi faydayı güvenli biçimde elde eder?” sorusunu zayıf bırakıyor.

Kısa bir “Ajan bu kapıdan ne kazanır?” bölümü eklenmeli:

- kontrollü kayıt okuma/yazma,
- satın alınmış AICore yetenek çağrıları,
- tek kimlik ve politika modeli,
- güvenli test/sandbox,
- tutarlı hata ve onay akışı.

### 4.10 Bazı cümleler savunulması zor mutlaklık taşıyor

Örnekler:

- “API kullanıcıları bugüne kadar insandı” fikri teknik olarak doğru değil; API kullanıcıları zaten yazılımdı.
- Gerçek fark, deterministik entegrasyonların önceden yazılmış akışları izlemesi; ajanların güvenilmeyen içerikten etkilenerek araç ve işlem seçebilmesi.
- “Ajanın her şeyi görmesi gerekir” benzeri ifade en az yetki ilkesiyle çelişir. Ajan yalnız görevi için gereken minimum veri alt kümesini görmelidir.
- “Firewall bunu ayıramaz” fazla mutlak. Daha doğru ifade: “Ağ güvenlik duvarı tek başına uygulama niyetini ve ServiceCore nesne yetkisini güvenilir biçimde yorumlayamaz.”
- “Satış sistemindeki hata yalnız rahatsız eder” kolayca çürütülebilir; satış sistemi hatası da finansal veya hukuki sonuç yaratabilir.

Bu cümleleri yumuşatmak sayfayı zayıflatmaz; aksine teknik okuyucu karşısında daha güvenilir yapar.

### 4.11 Nesne seviyesinde yetkilendirme açıkça anlatılmalı

“Kayıt güncelleme yetkisi var” demek, ajanın bütün kayıtları güncelleyebilmesi anlamına gelmemeli.

İzin modeli en az şu seviyeleri ayırmalı:

- işlem: kayıt oku/güncelle/kapat,
- nesne: hangi kayıtlar,
- alan: hangi alanlar,
- koşul: hangi durumdayken,
- hacim: kaç kayıt,
- zaman: hangi saat ve süre,
- bağlam: hangi kullanıcı veya departman adına.

Bu, API güvenliğinde Broken Object Level Authorization riskinin doğrudan karşılığıdır:

- https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/

---

## 5. Üç mock görselin değerlendirmesi

### 5.1 Canlı trafik

Üç karar tipini en hızlı anlatan mock bu:

- izin ver,
- onaya gönder,
- engelle.

Ancak sorumlu insan kimliği görünmüyor. Oysa sayfanın ana vaatlerinden biri ajanın arkasındaki sorumluyu görünür kılmak.

Ayrıca ekran sentetik ve statik olduğu hâlde “CANLI” etiketi kullanılıyor. Üretim ekranı sanılabilir. “Temsili ekran · sentetik veri” etiketi eklenmeli.

### 5.2 Onay kuyruğu

Üç mock içinde ürün değerini en iyi anlatan ekran bu. İşletim ekibinin ne yapacağını somutlaştırıyor.

Fakat üstte “2 kayıt” görünürken ikinci öğe artık rutin politika olarak işaretlenmiş. Bu hâliyle hâlâ bekleyen onay kuyruğunda mı, yoksa politika geçmişinde mi olduğu belirsiz.

Daha iyi yapı:

- `1 bekleyen onay`
- `1 rutin politika / geçmiş`

### 5.3 Denetim kaydı

Sayfa denetim kaydının hangi verinin görüldüğünü açıklayacağını söylüyor:

- `src/app/(main)/aicore/gatecore/page.tsx:462-469`

Mock satırları ise çoğunlukla:

- kayıt sayısı,
- maskelenen alan sayısı

gösteriyor:

- `src/components/aicore/GateCoreVisuals.tsx:171-209`

Gerçek denetim değeri için şu alanlar daha görünür olmalı:

- ajan kimliği,
- adına çalışılan kullanıcı,
- kurumsal sorumlu,
- kaynak iş yükü/konumu,
- politika kararı ve kural kimliği,
- erişilen nesne ve alan sınıfları,
- maskelenen alanlar,
- onaylayan kişi,
- correlation/request kimliği.

Mobil görünümde ajan ve sorumlu alanları `hidden sm`, maskeleme alanı `hidden md` ile gizleniyor:

- `src/components/aicore/GateCoreVisuals.tsx:198-204`

Bu durumda mobilde ekranın ana fikri kaybolup yalnız saat ve işlem kalıyor. Kolon gizlemek yerine satırları mobil kart düzenine çevirmek daha doğru.

Denetim mock’undaki “1.284 istek” gibi trafik KPI’ları da lisans sayacıyla karışabilir. “Operasyonel API trafiği — lisans sayacı değildir” etiketi eklenmeli.

---

## 6. Görsel tasarım ve bilgi mimarisi

### 6.1 Güçlü taraflar

- GateCoreAI sayfası üç özel operasyon ekranı sayesinde ortak AICore şablonundan belirgin biçimde ayrılıyor.
- Sayfaların koyu kurumsal dili ürün ailesiyle uyumlu.
- GateCoreAI’nin “neden var?” tezi ilk bakışta anlaşılabiliyor.
- Lisanslama sayfası sayaç ile fatura arasındaki ayrımı anlatmaya ciddi alan ayırıyor.
- Mobilde ana yerleşimler kırılmıyor ve yatay taşma yok.

### 6.2 GateCoreAI’nin en güçlü görseli çok geç geliyor

İlk operasyon mock’u masaüstünde yaklaşık 2.750 piksel aşağıda. Ziyaretçi ürünün ne yaptığını görmeden uzun süre kavramsal açıklama okuyor.

Daha güçlü açılış sırası:

1. Ajan kimliği
2. Politika/kapsam kontrolü
3. Veri maskeleme
4. İzin–onay–engel kararı
5. Denetim izi

Bu kısa akış hero’ya yakın bir yerde görselleştirilebilir. Sonraki bölümler ayrıntıyı açar.

### 6.3 Lisanslama sayfası kart tekrarına fazla yaslanıyor

İçerik doğru başlıklara sahip olsa da çok sayıda benzer kart, önemli ticari ayrımları eşit ağırlıkta gösteriyor.

Bir adet örnek teklif veya fatura anatomisi daha hızlı anlatır:

| Kalem | Lisans biçimi | Sayaç ilişkisi | Dönem |
|---|---|---|---|
| AICore eklentileri | Ürün/özneye göre | Kendi yaptığı iş dış ajan bandından düşmez | Yıllık |
| GateCoreAI | Zorunlu güvenlik katmanı | Dış ajan başarılı iş bandını ölçer | Yıllık |
| Launch Ready | Hizmet | Sayaç dışı | Tek seferlik |
| Bakım ve destek | Hizmet/SLA | Sayaç dışı | Yıllık |

Bu tablo, üç ticari grup söylemi korunarak kurulabilir.

### 6.4 Rehber çok uzun ve gezinme desteği yok

Ölçülen yaklaşık sayfa yükseklikleri:

| Sayfa | Masaüstü | Mobil |
|---|---:|---:|
| AICore lisanslama | 8.616 px | 16.536 px |
| GateCoreAI | 9.213 px | 17.110 px |
| Lisanslama rehberi | 14.414 px | 22.018 px |

Rehberde:

- sabit veya açılır içindekiler,
- bölüm anchor’ları,
- aktif bölüm göstergesi,
- uzun bölümler için accordion,
- “ilgili sözleşme maddesi” bağlantıları

olmalı.

13. bölüm özellikle tek parça büyük bir blok hâlinde. “Üç teklif grubu / sayaç / bant kuralları / örnekler / SSS” olarak alt başlıklara ayrılması taranabilirliği artırır.

---

## 7. Teknik inceleme

### 7.1 Doğrulanan olumlu sonuçlar

- `/aicore/lisanslama` HTTP 200
- `/aicore/gatecore` HTTP 200
- `/planlar/lisanslama-rehberi` HTTP 200
- 1440×1000 masaüstü görünümünde yatay taşma görülmedi
- 390×844 mobil görünümünde yatay taşma görülmedi
- `npm run build` başarılı
- İnceleme sonrasında mevcut çalışma ağacı temizdi

### 7.2 GateCoreAI dosyasında lint hataları var

Hedefli ESLint kontrolünde `react/no-unescaped-entities` kaynaklı sekiz hata bulundu:

`src/app/(main)/aicore/gatecore/page.tsx`

- `227:46`
- `268:15`
- `268:36`
- `286:36`
- `432:15`
- `432:27`
- `463:15`
- `463:32`

Üretim derlemesinin geçmesi bu hataları ortadan kaldırmıyor. CI lint kontrolü varsa yayın akışını durdurabilir. Türkçe tırnak/apostrof içeren JSX metinleri uygun HTML entity veya string ifadesiyle düzeltilmeli.

### 7.3 Sayfalarda iç içe iki `main` landmark var

Ana layout zaten `<main>` kullanıyor:

- `src/app/(main)/layout.tsx:12`

Yeni iki sayfa da tekrar `<main>` açıyor:

- `src/app/(main)/aicore/lisanslama/page.tsx:265-267`
- `src/app/(main)/aicore/gatecore/page.tsx:191-193`

HTML’de bir sayfanın ana içeriğini temsil eden tek bir ana landmark olması beklenir. İç sayfalardaki eleman `div` veya uygun bir section yapısına çevrilmeli.

### 7.4 Başlık hiyerarşisi erişilebilir değil

İki yeni sayfada H1’den sonra doğrudan H3 kullanılıyor; görsel bölüm başlıklarının bir kısmı `p` veya `div`.

Bu:

- ekran okuyucu gezinmesini,
- doküman outline’ını,
- SEO ve içerik anlamını

zayıflatır.

Her ana bölüm H2, onun altındaki kart/gruplar H3 olmalı.

### 7.5 Hareket azaltma tercihinde iletişim formu görünmez kalıyor

Paylaşılan iletişim bileşeninde:

- `src/components/ui/privacy-contact.tsx:20`
- `src/components/ui/privacy-contact.tsx:59-62`

SSR sırasında ilk görünürlük `opacity: 0` olarak üretiliyor. Tarayıcıda `prefers-reduced-motion: reduce` etkinse istemci tarafı başlangıç durumu bununla uyuşmuyor. React hydration farkı oluşuyor ve stil güvenilir biçimde düzeltilmediği için iletişim formu `opacity: 0` kalabiliyor.

Bu durum Chrome’da azaltılmış hareket emülasyonuyla üç sayfada da doğrulandı.

Bu kritik bir erişilebilirlik ve dönüşüm sorunudur: hareket hassasiyeti olan kullanıcı sayfanın iletişim/CTA bölümünü göremiyor.

Çözüm, azaltılmış hareket tercihinde animasyon başlangıç stilini uygulamamak ve sunucu/istemci ilk render’ını deterministik hâle getirmektir.

### 7.6 AICore mega menüsü bazı masaüstü ekranlarda erişilemez kadar uzun

1366×768 görünümde AICore mega menüsü yaklaşık:

- 887 px yüksekliğinde,
- `y=80` ile `y=967` arasında

kalıyor. Ekranın altına taşan son öğelere ulaşmak mümkün olmayabiliyor.

Ayrıca masaüstü tetikleyicisi ağırlıklı olarak `mouse enter/leave` davranışına dayanıyor:

- `src/components/layout/Navbar.tsx:457-480`

Buton üzerinde güvenilir click ve klavye açma davranışı görünmüyor.

Gerekli düzenlemeler:

- viewport’a bağlı maksimum yükseklik,
- menü içi dikey scroll,
- Escape ile kapatma,
- Enter/Space ile açma,
- ok tuşu veya en azından mantıklı Tab sırası,
- `aria-expanded` ve `aria-controls`,
- focus menü içindeyken açık kalma.

Yeni lisanslama sayfası üst menüde görünmüyor; footer veya derin bağlantılar üzerinden bulunuyor. Bu sayfa ticari karar merkezi olacaksa AICore menüsünde doğrudan yer almalı.

### 7.7 Lisanslama rehberinde sayfaya özel metadata yok

Dosya:

- `src/app/(main)/planlar/lisanslama-rehberi/page.tsx:1-5`

sayfaya özel metadata export etmiyor.

Çalışma zamanında başlık ve açıklama genel site değerlerine düşüyor:

- “ServiceCore | Enterprise IT Service Management”
- genel site açıklaması

Bu, paylaşım önizlemesi ve arama sonucu açısından kaçırılmış fırsat. En az:

- özgün title,
- description,
- canonical,
- Open Graph başlığı/açıklaması

eklenmeli.

### 7.8 Bazı küçük metinlerde kontrast sınırın altında

Sık kullanılan `#64748B` renginin `#010E21` üzerindeki yaklaşık kontrastı `4.06:1`.

Normal küçük metin için WCAG AA hedefi 4.5:1’dir. Özellikle mock ekranlardaki 10–11 px etiketlerde okunabilirlik zayıflıyor.

Çözüm:

- küçük metinde daha açık ton,
- font boyutu/ağırlığı artışı,
- dekoratif ve bilgi taşıyan metin rengini ayırma.

### 7.9 Mock’ların sentetik olduğu kullanıcıya görünür biçimde belirtilmiyor

Kod yorumu mock verilerinin sentetik olduğunu söylüyor:

- `src/components/aicore/GateCoreVisuals.tsx:19-20`

Fakat kullanıcı bunu görmüyor. Ürün henüz beta/yol haritasındaysa gerçek çalışan ekran izlenimi daha da riskli.

Her mock üzerinde:

> Temsili ürün görünümü · Sentetik veri

etiketi bulunmalı.

---

## 8. Stratejik ürün görüşüm

GateCoreAI’nin zorunlu olması güvenlik açısından savunulabilir. Fakat ayrı bir yıllık taban ücreti olarak sunulması, özellikle:

- müşteri dış ajan kullanmıyorsa,
- yalnız ServiceCore’un kendi ücretli AICore eklentilerini kullanıyorsa,
- GateCoreAI henüz beta ise

“satın aldığım AI ürününü güvenli kullanabilmek için ayrıca güvenlik vergisi ödüyorum” algısı yaratabilir.

Değerlendirilmeye değer model:

- GateCoreAI’nin kendi AICore ürünlerini güvenli çalıştıran temel seviyesi AICore platformuna dahil edilir.
- Dış ajan bağlantısı, ileri politika, kurumsal kimlik bağlama, yüksek hacim ve gelişmiş denetim ayrı GateCoreAI lisansı/bandı olur.

Bu zorunlu bir sonuç değil; ticari bir öneridir. Ancak mevcut ayrı ve zorunlu fiyat yapısının müşteriye neden adil olduğunu açıklamak gerekecek.

---

## 9. Önerilen düzeltme sırası

### P0 — Ticari ve hukuki kararlar

1. GateCoreAI’nin bugünkü statüsünü kesinleştir:
   - üretim,
   - kontrollü erişim,
   - beta,
   - yol haritası.
2. Lisans modelini seç:
   - ajan başına,
   - iş hacmi bandı,
   - açıkça tanımlanmış hibrit.
3. Sayaç algoritmasını seç:
   - bir sonuç = bir iş,
   - 1/2/5 ağırlıklı birim.
4. İlk üç ay, bant belirleme, üst/alt banda geçiş, tolerans, yenileme ve imza tarihlerini sözleşme mantığıyla tamamla.
5. “Kurum”, “tenant”, “ajan”, “sorumlu insan”, “başarılı iş” ve “dönem” tanımlarını tekleştir.
6. Temel ürün güncellemeleri ile ücretli destek/SLA kapsamını ayır.

### P1 — Tek gerçek kaynak

Şu içerikler elle farklı dosyalarda yeniden yazılmamalı:

- ürün statüsü,
- lisans ölçüsü,
- sekiz bant kuralı,
- ölçüm tanımları,
- ücretlendirilmeyen işler,
- tolerans ve aşım davranışı,
- fiyatın başlangıç tarihi.

Sürümlenmiş tek bir kanonik veri/doküman oluşturulmalı. Aşağıdakiler ondan güncellenmeli:

- web sayfaları,
- lisanslama rehberi,
- ürün kataloğu,
- hukuk taslağı,
- backend acceptance kriterleri,
- yönetici özeti,
- teklif şablonu.

Her ticari kural için en az şu alanlar olmalı:

- kural kimliği,
- geçerlilik tarihi,
- ürün kapsamı,
- ticari metin,
- teknik uygulama,
- sözleşme karşılığı,
- örnek hesap.

### P1 — Güvenlik doğruluk incelemesi

GateCoreAI metni ürün, backend ve güvenlik ekipleriyle şu iddialar üzerinden doğrulanmalı:

- hangi trafiği gerçekten görür,
- hangi dışa çıkışı kontrol eder,
- kaynak kimliğini nasıl kanıtlar,
- nesne/alan seviyesinde nasıl yetkilendirir,
- hangi işlem onaya gider, hangisi engellenir,
- rutin politikanın sınırı ve süresi,
- denetim kaydında gerçekten hangi alanlar tutulur,
- veri saklama ve silme süresi,
- logların değiştirilemezliği,
- acil durdurma/kill switch,
- GateCoreAI erişilemezken fail-open mı fail-closed mu davranacağı.

Son iki madde mevcut sayfada özellikle eksik:

- GateCoreAI çökerse dış ajan erişimi devam edecek mi?
- Devam etmeyecekse kritik operasyonlar için kontrollü acil durum prosedürü nedir?

### P2 — Metin ve bilgi mimarisi

1. “Satış kalemi değildir” ifadesini düzelt.
2. “Üçü de yıllık” iddiasını üç ticari grup şeklinde düzelt.
3. Eski rehber kurallarını ServiceCore ana platformuyla sınırla.
4. Lisanslama sayfasına örnek teklif/fatura anatomisi ekle.
5. Rehbere içindekiler ve anchor navigasyonu ekle.
6. GateCoreAI’ye “ajan bu kapıdan ne kazanır?” bölümünü geri ekle.
7. Güvenlik iddialarındaki savunulması zor mutlak ifadeleri daralt.

### P2 — Teknik ve erişilebilirlik

1. Sekiz lint hatasını düzelt.
2. İç içe `main` elemanlarını kaldır.
3. H1–H2–H3 hiyerarşisini kur.
4. `prefers-reduced-motion` durumunda görünmez kalan iletişim formunu düzelt.
5. AICore mega menüsünü viewport, klavye ve focus açısından düzelt.
6. Rehbere sayfaya özel metadata ekle.
7. Küçük metin kontrastlarını AA seviyesine çıkar.
8. Mock’lara görünür sentetik veri etiketi ekle.
9. Denetim mock’unu mobilde kart düzenine geçir.

---

## 10. Önerilen yayın kabul kriterleri

Sayfalar aşağıdaki maddeler sağlanmadan “ticari olarak nihai” kabul edilmemeli:

- [ ] GateCoreAI statüsü bütün dosyalarda aynı
- [ ] Tek lisanslama modeli seçilmiş
- [ ] Sayaç algoritması web ve backend’de aynı
- [ ] Teklif kalemlerinin dönemleri doğru
- [ ] İlk üç ayın fiyat ve bant etkisi tanımlı
- [ ] Üst ve alt bant geçişleri tanımlı
- [ ] İmza, tolerans ve fiyat başlangıç tarihi çelişmiyor
- [ ] Kurum/tenant ve başarılı iş tanımları sözleşmede mevcut
- [ ] Sekiz kural web ve rehberde birebir aynı
- [ ] Destek ile temel ürün hakkı ayrılmış
- [ ] Dış ajan + AICore zinciri için sayım kuralı var
- [ ] GateCoreAI’nin gerçek teknik kontrol sınırı doğrulanmış
- [ ] Kaynak ve sorumlu kimliği teknik olarak bağlanıyor
- [ ] Fail-open/fail-closed ve acil durum davranışı tanımlı
- [ ] Lint temiz
- [ ] Azaltılmış hareket tercihinde bütün içerik görünür
- [ ] Menü klavye ve küçük masaüstü ekranında kullanılabilir

---

## 11. Sonuç

Bu çalışma başarısız değil; tersine, ürün ailesinin en zor konularından ikisini ilk kez müşterinin okuyabileceği kadar somutlaştırmış:

- AICore işinin neden klasik kullanıcı lisansına benzemediği
- Dış ajanın neden sıradan bir API entegrasyonu gibi ele alınamayacağı

GateCoreAI sayfası, özel görselleri ve “üç yetenek bir araya geldiğinde risk büyür” teziyle üç çalışma içinde en güçlü anlatıya sahip. Lisanslama sayfası da “sayaç faturanın kendisi değildir” ayrımını doğru yönde kuruyor.

Asıl sorun kaliteden çok **olgunluk senkronizasyonu**:

> Web metni, ürün kataloğundan, hukuk metninden ve backend kararlarından bir adım ileride.

Öncelik yeni metin eklemek olmamalı. Önce ticari model, ürün statüsü ve ölçüm algoritması tek bir karara bağlanmalı; sonra bütün yüzeyler aynı kaynaktan güncellenmeli.

Bu yapıldığında mevcut tasarım ve anlatının önemli kısmı korunabilir. Yapılmadan yayımlanırsa en büyük risk müşterinin sayfayı anlamaması değil, sayfayı çok net anlayıp sözleşme veya ürün davranışında başka bir gerçekle karşılaşmasıdır.
