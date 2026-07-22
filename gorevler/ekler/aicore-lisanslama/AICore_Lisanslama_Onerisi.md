# AICore Lisanslama — Değerlendirme ve Öneri

> Erman'ın "fix price + sembolik fiyat + seçici devreye alma" yaklaşımına cevaptır.
> Rakip verileri 2026 güncel araştırmadan (kaynaklar en altta).

## 1. Fix + sembolik yaklaşımın DOĞRU — gerekçesi de sağlam

Amaç gelir değil **savunma**: ana ürünü içeride tutundurmak, AI soran müşteriyi
kaçırmamak, AI şart koşan yeni adaya kapıyı açmak. Amaç buysa sembolik sabit fiyat
doğru araç:

- Müşterinin "evet" demesi sürtünmesizdir — satın almayla pazarlık çıkmaz.
- Teklife saniyede eklenir, bütçe onayı takılmaz.
- "Sadece soran müşteride devreye alırız" stratejisiyle birebir uyumlu.

Rakip okuma da doğru: ServiceNow AI'ı artık paketin parçası yaptı (her katmanda
gömülü; pratikte kullanıcı başına %25-40 zam olarak yansıyor). Bizim ayrı add-on
duruşumuz bu yüzden satışta **avantaja çevrilebilir**:

> **"Rakipler AI'ı zorla paketin içine koyup herkese ödetiyor. Biz seçtiriyoruz —
> yalnızca aldığınız modülü ödersiniz, veriniz de kendi sunucunuzda kalır."**

## 2. Tek kritik ayrım: LİSANS ile HİZMETİ ayır

Sembolik fiyat **modül lisansı** için doğru; ama **kurulum ve bakım** için değil.
Sebep, rakiplerle aramızdaki yapısal fark:

| | Rakipler (SaaS) | Biz (yerinde kurulum) |
|---|---|---|
| AI'ı bir müşteriye açmak | Bir tık — maliyet ~sıfır | Yerel yapay zekâ kurulumu + müşteriye özel ayar (kalibrasyon, 1-2 hafta) |
| Güncelleme | Merkezden herkese anında | Her müşteride ayrı dağıtım + otomatik doğrulama koşusu |
| Yıllık bakım | Fiyatın içinde görünmez | Müşteri başına gerçek mühendislik emeği |

SaaS rakip sembolik fiyatı kaldırır çünkü marjinal maliyeti yok. Bizde her AI
müşterisi gerçek emek demek. Lisans da hizmet de sembolik olursa **her AI müşterisi
zarar yazar** ve büyüdükçe zarar büyür.

**Öneri — iki kalemli yapı:**

| Kalem | Fiyatlama | Amaç |
|---|---|---|
| AICore modül lisansı (eklenti başına, yıllık) | **Sembolik sabit** — senin dediğin gibi | Tutundurma + rekabet savunması |
| Kurulum / devreye alma (bir defalık) + yıllık platform-bakım ücreti | **Gerçek fiyat** | Yerel kurulum, kalibrasyon, güncelleme ve bakım emeğinin karşılığı |

Kurumsal müşteri kurulum ve bakım bedeline zaten alışıktır (her on-prem üründe
vardır); "AI eklentimiz çok uygun" mesajı bozulmaz. On-prem yazılım dünyasının
standardı da budur: lisans + yıllık bakım (tipik olarak lisansın %15-25'i).

## 3. Sembolik fiyatı "indirim" olarak ver, liste fiyatı olarak değil

Bugün savunma amaçlı verilen düşük fiyat, yarın AI gerçek talep gördüğünde
yapışıp kalır — fiyatı sonradan yükseltmek, düşürmekten çok daha zordur.

**Öneri:** Liste fiyatını makul seviyede tut; sembolikliği **"mevcut müşteri
sadakat indirimi %X"** olarak uygula.

- Müşteri aynı düşük rakamı öder — senin amacın aynen gerçekleşir.
- Ama çapa liste fiyatıdır: ileride indirim kademeli azaltılabilir, liste
  fiyatına dokunmak gerekmez.
- Yeni müşteri pazarlığında da alan bırakır ("listede şu, size şu").

## 4. Rakip fiyatlama özeti (2026)

| Rakip | Model | Rakam |
|---|---|---|
| ServiceNow (Now Assist) | Pakete gömülü — kullanıcı başına zam | Teknisyen başına %25-40 artış ($50-100+/ay) |
| Freshworks (Freddy Copilot) | Teknisyen başına sabit add-on | ~$29-35/teknisyen/ay |
| Zendesk | Hibrit: teknisyen add-on + otomasyonda sonuç başına | $50/teknisyen/ay + otomatik çözüm başına $1.5-2 |
| Piyasa geneli | Hibrit model standartlaştı (%41); salt koltuk bazlı düşüşte | Taban abonelik + kullanım katmanı |

Not: Salt kullanım-bazlı (sayaçlı) modeli bilinçli önermiyoruz — yerinde kurulumda
kullanım sayacıyla faturalama müşteriyle güven/denetim sorunu yaratır; kurumsal
satın alma sabit bütçe ister.

## Özet

1. **Fix + sembolik modül lisansı: EVET** — savunma silahı olarak doğru.
2. **Kurulum + yıllık bakım: gerçek fiyat** — SaaS değiliz, müşteri başına emek gerçek.
3. **Sembolikliği liste fiyatıyla değil sadakat indirimiyle ver** — gelecekteki değer algısı korunur.
4. **"Zorla bundle yok, seçtiriyoruz" mesajını satışta kullan** — ServiceNow'un tersi, bizim artımız.

---

*Kaynaklar: Redress Compliance & Atonement Licensing (ServiceNow Now Assist fiyat analizleri), eesel (Freshservice Freddy fiyat kılavuzu), Premium Plus & Voiceflow (Zendesk sonuç-bazlı fiyatlama), Monetizely & Particula (2026 SaaS/AI fiyatlama trend raporları), NVIDIA AI Enterprise lisans dokümanı.*
