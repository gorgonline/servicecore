---
name: google-ads
description: "ServiceCore icin Google Ads Search kampanyasi kurar. Hedef sayfasini analiz eder, keyword listesini cikartir, RSA reklam metnini yazar, kullaniciyi Ads UI'da adim adim yonlendirir. Use when user says 'yeni reklam', 'reklam kur', 'google ads kampanya', 'adwords kampanya', 'yeni kampanya', '/google-ads', 'reklam yapalim'."
user-invocable: true
---

# Google Ads Kampanya Recetesi

ServiceCore'da Search kampanyasi kurma rehberi. Kullanici Ads UI'da tiklar, sen yonlendirirsin. Her adimda "tamam" bekle, atlamadan sirayla git.

## Onkosul (KONTROL ET)

Skill'e baslamadan once dogrula:
1. `website/.env.local` icinde `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GADS_CONVERSION_ID`, `NEXT_PUBLIC_GADS_DEMO_CONVERSION_LABEL` dolu mu?
2. Production'da GA4 + Ads tag yukleniyor mu? (Hizli kontrol: `curl -sL https://www.servicecore.com.tr/ | grep -oE "G-[A-Z0-9]+|AW-[0-9]+"`)
3. Eksikse `docs/google-ads-setup.md`'ye yonlendir, altyapi kurulsun, sonra geri don.

## Adim 0: Brief

Kullanicidan al:
- **Hedef sayfa URL'i** (orn: `https://www.servicecore.com.tr/proje-yonetimi`)
- **Aylik bütçe** (orn: ₺2000/gun, ₺48K kredi promosyonu varsa hesap yap)
- **Cografi hedef** (varsayilan: Tum Turkiye)
- **Kampanya adi** (onerilen format: `Search-<Konu>-TR-<Yil>Q<Ceyrek>`)

Vermemisse SOR. Birden fazla varsa hepsini topla.

## Adim 1: Sayfayi Oku, Niyet Cikar

Kullanicinin verdigi URL'i lokalde bul:
- `find website/src/app -type d -name "<slug>"` 
- `Read` ile `page.tsx`'i tamamen oku (her satir, kisaltma yapma)

Cikart:
- **Ana baslik (h1)** — kampanya teması
- **Onerme cumlesi** — ürün/hizmet aciklamasi
- **Ozellikler** — 5-10 ana feature listesi (cocum kelimeleri buradan)
- **CTA hedefi** — formu var mi, /demo'ya mi gidiyor?
- **Marka tonu** — premium/B2B/yerli vs.

Bunlari ozetle kullaniciya goster. ONAY iste:
> "Sayfayi anladim, su konuda kampanya: <konu>. Devam edeyim mi?"

## Adim 2: Keyword Universe'u Cikar

Sayfanin konusuna gore 3 grup keyword hazirla:

### A) Core (exact + phrase match)
Sayfanin ana teması:
- `[<ana terim>]` (exact)
- `"<ana terim> yazilimi"` (phrase)
- Turkce + Ingilizce karisik
- 15-25 keyword

### B) Cesit teşkili (phrase match)
- Yerli variantlari: "yerli <terim>", "turk <terim>"
- Yazilim eki: "<terim> yazilimi", "<terim> platformu", "<terim> araci"
- Ozellik bazli: feature isimleri (orn: "kanban yazilimi", "scrum board")
- 30-40 keyword

### C) Rakip brand defense (phrase match)
- Sayfanin alaninda one cikan global rakipler (orn proje yonetimi icin: jira, asana, trello, monday, clickup)
- "<rakip>", "<rakip> alternatifi", "<rakip> fiyat"
- 20-30 keyword

**Toplam: ~75-150 keyword**

ONEMLI:
- Sadece exact ve phrase match kullan. **Broad match YASAK** (butce yakar).
- "customer service", "is ilani", "egitim" gibi yan terimleri **EKLEME** (negatife giderler).
- Listeyi kullaniciya goster, onay iste.

## Adim 3: Negatif Keyword Listesi

Her kampanya icin **standart negatif liste** (asagida tum kategoriler):

```
ucretsiz
free
freeware
indir
download
crack
nedir
"ne demek"
"ne ise yarar"
ornek
pdf
kitap
ebook
kurs
egitim
sertifika
sertifikasi
"online egitim"
"is ilani"
"is ilanlari"
kariyer
maas
maaslar
"is ariyorum"
cv
ozgecmis
forum
sikayet
sikayetvar
youtube
twitter
instagram
"sosyal medya"
oyun
film
muzik
sarki
tarif
yemek
ucret
fiyati
maliyeti
"kac tl"
"kaca"
```

**Hedef sayfasina ozel** ek negatifler:
- ITSM kampanyasi degilse: `itsm`, `"servis masasi"`, `"yardim masasi"`, `helpdesk`, `"olay yonetimi"` ekle (kendi ITSM kampanyamizla cakismasin)
- Proje yonetimi degilse: `jira`, `agile`, `scrum`, `kanban`, `sprint` ekle
- Kullanicinin sektor disindaki kullanimlar: kisisel/hobi/okul terimleri (orn proje icin: "okul projesi", "hobi", "kisisel todo")

## Adim 4: RSA Reklam Metni

**15 baslik (max 30 karakter her biri):**
Yapi:
- 2-3 **brand**: "ServiceCore <Konu>", "<Konu> | ServiceCore"
- 3-4 **intent matched**: "<Konu> Yazilimi", "Turkiye'nin <Konu> Cozumu"
- 2-3 **benefit/feature**: ozellik vurgulu
- 2-3 **alternatif/yerli**: "Jira Alternatifi Turkiye", "Yerli <Konu>"
- 2-3 **CTA**: "Demo Iste", "Hemen Basla", "Kontrolu Ele Al"

Karakter sayisini **kontrol et** — Turkce karakterler (ü, ö, ş, ç, ğ, ı) tek karakter sayilir.

**4 aciklama (max 90 karakter her biri):**
- 1. Cozum ozeti (ana baslik + 2-3 feature)
- 2. Turkiye/yerli vurgusu
- 3. Spesifik feature/metric (orn: "Story point, velocity, kapasite")
- 4. CTA + benefit (orn: "Demo icin iletisime gecin")

**Gorunen yol (2 slot, 15 karakter):**
- Slot 1: ana konu (orn: `itsm-yazilimi`, `proje-yonetimi`)
- Slot 2: aksiyon (orn: `demo`, `agile`)

## Adim 5: Ads UI Adim Adim

Kullaniciyi tek tek yonlendir. Her adimda ekran goruntusu bekle, anlami dogrula, sonraki adim.

### 5.1 Kampanya olustur
- `ads.google.com` → "Kampanyalar" → "+ Olustur"
- Hedef: **"Potansiyel musteriler"**
- Donusum hedefi onaylanmis: "Potansiyel musteri formu gonderimi"
- Kampanya turu: **"Arama"** (Maks. Performans YASAK — butce yakar)

### 5.2 Hedef detaylari
- Web sitesi ziyaretleri **acik**, URL: kullanicinin verdigi sayfa
- Telefon, Magaza, "Potansiyel musteri formu" **kapali**
- Kampanya adi: `Search-<Konu>-TR-<Yil>Q<Ceyrek>`

### 5.3 Teklif verme
- Strateji: **"Tiklamalar"** (Maximize Clicks)
- Max CPC sinir: **₺60** (ITSM/proje B2B Turkiye icin uygun)
- "Hedef islem basina maliyet" **KAPALI**
- "Sadece yeni musteriler" **KAPALI**

### 5.4 Kampanya ayarlari
- **Aglar: HER IKISI DE KAPALI** (Search Partners, Display)
- Konum: Turkiye (ya da brief'teki sehir)
- "Yer secenekleri" → **"Konumda bulunma"** (hedeflenen konumda bulunan)
- Diller: Turkce + Ingilizce (IT/agile arayanlar Chrome'u ENG kullanir)
- AB siyasi reklamlari: **Hayir**
- AI Max: **KAPALI** (data yoksa butce yakar)

### 5.5 Keyword
- Adim 2'deki listeyi yapistir
- Nihai URL: brief'teki sayfa
- "Reklami yapilacak urun" alanina sayfanin ana terimini yaz

### 5.6 Reklam (RSA)
- Sirayla 3'erli baslik yapistir (15 toplam)
- Sirayla 1'erli aciklama yapistir (4 toplam)
- Gorunen yol slotlarini doldur
- Onizleme'de gorseli kontrol et

### 5.7 Butce
- "Ozel butce ayarlayin"
- Brief'teki gunluk rakami yaz (orn: 2000)

### 5.8 Incele + yayinla
- Sari uyari varsa kontrol et (genelde "Smart Bidding'e gec" onerisi, gormezden gel)
- **"Kampanyayi yayinla"**

### 5.9 Yayindan sonra
- Sol menu → "Anahtar kelimeler ve icerikler" → "Negatif anahtar kelimeler" → adim 3 listeyi yapistir
- Sol menu → "Reklam zaman planlamasi" → Pzt-Cum 08:00-20:00 ekle (B2B mesai)

## Adim 6: Bitis ve Izleme

Kullaniciya ozet:
- Kampanya adi
- Yayinda mi (Etkin/Beklemede)
- Gunluk butce
- Anahtar kelime sayisi (Core + Brand defense)
- Sonraki adim: **24-48 saat sonra arama terimleri raporu** (Anahtar kelimeler → Arama terimleri) — beklenmedik aramalar varsa negatife ekle

Beklenen takvim:
- 2-24 saat: Reklam onayi
- 24-48 saat: Ilk gosterim/tiklama
- 48-72 saat: Conversion verification (ilk gercek demo basvurusu sonrasi)
- 1 hafta: Search terms ile negatif liste guncellemesi
- 2-3 hafta: Conversion data biriktiginde Maximize Clicks'ten Maximize Conversions'a gecis dusunulur

## Kurallar

- **Her adim sonrasi onay iste**, atlamadan git
- Kullanici `tamam` dedikten sonra **sonraki adim**
- Karakter limitlerini **kontrol et** (baslik 30, aciklama 90, gorunen yol 15)
- Hardcoded hex YASAK kuralina paralel: **Broad match YASAK**, **Display Network YASAK**, **AI Max YASAK** (yeni kampanyada)
- Sayfayi gercekten oku, "olabilir" dene **YASAK**. Her satiri Read et.
- Rakip listeyi sayfanin alanina gore cikar, **ITSM rakipleri ile proje rakiplerini karistirma**
- ServiceCore'un kendi ITSM kampanyasiyla cakismayi engelle (cross-negative)

## Sonraki Iyilestirmeler (Bu skill'in disinda)

- Cross-campaign negative liste yonetimi (kendi kampanyalarimizla cakismasin)
- DataForSEO ile keyword genisletmesi (sonraki sprint)
- Google Ads MCP ile programatik raporlama (token gelirse)
- A/B test (ikinci RSA varyasyonu, Manuel CPC vs Smart Bidding karsilastirmasi)
