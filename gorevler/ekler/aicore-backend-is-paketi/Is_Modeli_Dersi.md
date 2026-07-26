# AICore İş Modeli — Ders Anlatımı (sıfırdan)

> Amaç: **Yapay zekâ çağında lisans gelirini nasıl koruyacağımızı ve nereden
> kazanacağımızı** jargonsuz, sırayla anlamak.
>
> Tek cümle: **Aldığın eklentinin yaptığı iş fiyatına dahildir; lisansı
> olmayan dış ajanın insansız işi kapının bandını belirler; kapıdan girmeyen
> bot bloklanır.**

---

## ❓ Problem ne? (neden bu modele mecburuz)

1. Bugün gelirimiz **teknisyen lisansından** geliyor: 100 teknisyen = 100 lisans.
2. Yapay zekâ gelince aynı işi belki 60 kişi yapacak → müşteri 40 lisansı
   kapatacak → gelir düşecek.
3. **"Yasaklayalım" diyemeyiz** — müşteri verim istiyor; yasaklayan satıcıyı bırakır.
4. **"Bedava verelim" diyemeyiz** — kaybolan lisansın yerine hiçbir gelir konmaz.
5. **"Bota bir lisans satalım" da çözüm değil** — sınırsız tek lisans yüz
   kişinin işini yapar; herkes bir tane alır, sistem fiyatı tek lisansa iner.
   *(Erman'ın yakaladığı delik buydu.)*
6. Geriye tek yol kalıyor: **yapay zekânın yaptığı işi saymak ve sayıya göre
   ücretlendirmek.** Bütün model bu cümledir.

## 🚪 Kapı — herkes kim olduğunu söyleyecek

Benzetme: **site güvenliği.** İçeri giren herkes "kimim, kime geldim" der,
deftere yazılır.

7. Sisteme dışarıdan bağlanan her yazılım kapıda kendini tanıtır: **"ben kimim?"**
8. İkinci soru: **"sorumlum kim?"** — her yazılımın arkasında kayıtlı bir insan olur.
9. Cevap veremeyen **içeri giremez**.
10. Yapılan her iş deftere yazılır: **işi hangi yazılım yaptı + sorumlusu kim.**
11. Bot **asla bir insanın şifresini kullanmaz.** Kullansaydı defter yalan
    söylerdi: işi bot yapmışken "Ayşe yaptı" görünürdü.

## 🛣️ Üç çalışma şekli — üç ayrı gelir yolu

12. **Birinci: işi insan yapıyor.** Bildiğimiz teknisyen lisansı. Değişen yok.
13. **İkinci: insan ekranda, yapay zekâ yardım ediyor** (özet çıkarıyor, cevap
    taslağı yazıyor; son kararı insan veriyor). Ücret: teknisyenin lisansının
    **üstüne yıllık sabit ek ücret.** Benzetme: telefon hattının üstüne ek
    hizmet paketi almak.
14. Bu yol teknisyen ekranda değilse **çalışmaz** — canlı oturum şart. Gece
    işi bu ucuz yoldan kaçamaz.
15. Bu ek ücret koltuğu öldüremez — ancak koltuğun üstünde yaşar. Tersine
    **her koltuğun gelirini artırır.**
16. **Üçüncü: ortada insan yok, işi yazılım bitiriyor** (gece 3'te kaydı çözüp
    kapatıyor). Burada ikiye ayırmak şart — en çok karıştırılan yer burası.
17. **Bizim eklentimiz yapıyorsa ayrıca ücret YOK.** Müşteri o eklentinin
    bedelini zaten ödedi; gece çalışması, toplu çalışması fiyatına dahildir.
    İkinci kez saymak haksızlık olur ve sürpriz fatura şikâyetinin kaynağıdır.
18. **Müşterinin kendi ajanı yapıyorsa** ortada hiçbir eklenti lisansı yok —
    ölçü buraya konur: kapının bandı. Küçük/orta/büyük, faturası **yıllık ve
    sabit**; iş artarsa üst banda geçilir.
19. Kural tek cümle: **lisansı olan iş sayılmaz, lisansı olmayan iş banda girer.**
20. Bant sınırlı olduğu için korkulan şey imkânsız: tek bantla yüz kişinin işi
    yaptırılamaz. **Çok iş = büyük bant = daha yüksek gelir.**

## 🔢 Sayacın inceliği — neyi sayıyoruz?

Benzetme: **lokanta hesabı masaya gelen tabağa kesilir; mutfakta kaç tencere
kirlendiğine değil.**

21. **Sayaç bir fatura kalemi değildir.** İki işi var: dış ajanın hangi banda
    düştüğünü belirlemek ve kimliğini bildirmeyen otomasyonu yakalamak.
    Benzetme: koltuk saymak — kimse her girişte fatura kesmez, sadece kaç
    koltuk gerektiğini belirler.
22. Botun içerideki teknik adımlarını **saymayız** — müşteri onları bilemez,
    kontrol edemez.
23. Sayılan tek şey: **başarıyla bitmiş iş.** Bot bir kaydı çözmek için
    içeride 15 adım attıysa 1 yazılır, 15 değil.
24. **Sayılmayanlar:** başarısız deneme, tekrar, yarım kalıp insana devredilen
    iş. "Çözüldü" denip aynı dertle geri açılan kayıt **sayaçtan geri düşülür.**
25. Ağır işler baştan belli çarpanla yazılır: basit cevap **1** · randevu
    değiştirme **2** · birkaç sistemi dolaşan iş emri **5**. Rakamlar
    sözleşmede sabitlenir, sonradan oynanmaz.

## 🆓 Neyi ÜCRETLENDİRMEYİZ (en az sayaç kadar önemli)

26. Sisteme **kayıt açan** trafik bedava: e-postadan kayıt açılması, izleme
    sisteminin arıza bildirmesi, portal. Bunlar bize iş **getiriyor** —
    getirene vergi kesilmez.
27. İki sistem arasında **veri kopyalayan** entegrasyon bedava.
28. Ücret yalnız insansız **çözen / kapatan / karar veren** işten alınır.
    Yazılımın markasına bakmayız, **yaptığı işe** bakarız — "bu yapay zekâ
    değil, normal script" bahanesi işlemez.
29. **Aynı iş iki kere ücretlenmez:** ya yardımlı iştir ya insansız iştir;
    kayıtta tek etiket taşır.

## 🕳️ Kaçak yolları — hepsi kapalı

30. *"10 teknisyenle 100 kişilik iş yaptırırım"* → her insan hesabının
    **işlem tavanı** var. Gerçek insan bu tavana ömründe takılmaz; bot ilk
    saatte çarpar.
31. *"Botu insan gibi gösteririm"* (tarayıcı taklidi) → bot imzası bellidir:
    7/24 çalışma, istekler arası hep aynı süre, insanüstü hız → **tespit + blok.**
32. *"Yardım yolu ucuz; botun işine teknisyene formalite onay bastırırım"* →
    saniyeler arayla, okumadan toplu onay deseni yakalanır; iş **insansız
    sayılır**, paketten düşer.
33. *"Kendi yazdığım program bedava çalışsın"* → iş bitiren her yazılım
    **aynı kapıdan** girer, **aynı paketten** düşer. Bizi atlatmaya çalışan
    bile bize ödeme yapar.

## ⚖️ Bandın kuralları — açık bırakılmaması gerekenler

Bant fikri tek başına yetmiyor; şu sekiz kural yazılmazsa yıl sonunda kavga
çıkar. (Erman'ın ekibinin yakaladığı açıklar; hepsi kapatıldı.)

- **İş kime yazılır:** çözümü kim ürettiyse ona. Sona konan onay tıklaması işi
  insan işi yapmaz — yoksa herkes bir stajyere düğmeye bastırır, bant sıfırlanır.
- **Bir sonuç bir iş:** üç ajan sırayla dokunsa da bir kez sayılır.
- **İlk üç ay ölçüm:** yeni müşteride geçmiş veri yok; band dördüncü ayda
  gerçek ölçüme göre sabitlenir, gerekirse aşağı iner.
- **Sınırda ne olur:** hemen kesilmez, süre tanınır. Üst banda geçilirse bedel
  aşım tarihinden itibaren işler — geçmişe dönük değil. Geçilmezse dış ajanın
  yazması durur.
- **İmzasız fatura yok:** otomatik aşım faturası ve geçmişe borç yok.
- **Aşağı inmek var:** iki dönem düşük kalınırsa yenilemede bir kademe iner.
  Tek yönlü bilet güveni bitirir.
- **Tavan var:** büyük bandın üstü ayrı fiyatlanır. Sebep maliyet değil ölçek —
  elli bin işle beş milyon iş aynı bedele giremez.
- **Yaptırım var:** kimliksiz otomasyon yakalanırsa erişim askıya alınır. Ama
  geçmişe ceza faturası çıkarılmaz — o yol SAP'yi mahkemeye götürdü.

İki tanım da sözleşmeye yazılır: faturaya esas dönem **sözleşme yılı**,
izlemeye esas pencere **kayan 12 ay**; hangi sonuçların iş sayıldığı ise tek
tek listelenir (kapanış tek başına yetmez — yönlendirme, atama, kart üretimi
de insansız biten işlerdir).

## 📊 Patrona ne var?

34. Her iş defterde olduğu için rapor kendiliğinden çıkar: **kim ne kadar işi
    yapay zekâya yaptırıyor, paket ne kadar doldu.**
35. Müşterinin **fatura kontrol ekranı ücretsizdir** — ödediğinin nereye
    gittiğini görmek onun hakkı. Gelişmiş analiz (nerede daha çok otomasyon
    yapılır, hangi bot sık hata yapıyor) **ayrıca satılır.**
36. Kişi bazlı ekran (*"Ali işinin %62'sini yapay zekâya yaptırıyor"*)
    hassastır — çalışan gözetimi sayılır. Varsayılan **ekip bazlı**; kişi
    bazlısı izin ve hukuk onayıyla açılır.

## 🐢 Nasıl devreye alacağız? (acele yok)

37. Önce sayaç **sessizce** çalışır: 10-15 müşteride fatura kesmeden ölçeriz,
    gerçek rakamları görürüz.
38. Sonra **tek senaryoda küçük pilot**, sabit bedelle.
39. Fiyatlar ve paket boyları **ancak bu veriden sonra** kilitlenir. Demir
    kural: sonradan kural değiştirip geçmişe dönük borç çıkarmak **yasak** —
    SAP bu çukura düştü, müşterileri mahkemede kaybetti.

---

## 📖 Küçük sözlük (bu derste geçen 3 terim)

- **token** — kısa ömürlü giriş anahtarı. Şifre değil; süresi dolunca çöp olur,
  her an iptal edilebilir.
- **oturum** — teknisyenin ekranda açık, canlı çalışma penceresi.
- **entegrasyon** — iki yazılımın birbiriyle veri alışverişi yapması.

## 🎯 Tek cümlelik özet

> İnsan çalışıyorsa lisans; yanında yapay zekâ varsa lisans + sabit ek ücret;
> aldığın eklentinin işi fiyatına dahil; lisansı olmayan dış ajanın işi kapının
> bandını belirler; kayıt açan bedava; kapıdan girmeyen bot bloklanır;
> **sayaç tabağı sayar, tencereyi değil — ve tabağı zaten ödenmişse hiç saymaz.**

---

Karar gerektiren 8 madde ayrı sayfada: `Yonetici_Ozeti_ve_Kararlar.md`.
Teknik uygulama: `AICORE_Backend_Is_Paketi.md` (backend ekibinin işi).
