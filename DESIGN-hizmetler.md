# Hizmetler — Tasarım Dokümanı

> ServiceCore web sitesine eklenen 13 yeni sayfanın bölüm yapıları, layout pattern'leri ve mevcut sayfalardan esinlenme noktaları.
>
> **Amaç:** Müşterinin sağladığı 26 profesyonel hizmeti (4 kategori) kataloglamak, ön plana çıkan 8 hizmet için docs içeriklerini detay sayfalarında tam olarak yansıtmak. Tasarım dili mevcut moduller, cozumler, aicore ve destek sayfaları ile birebir tutarlı.

---

## Locale uyarısı (Builder için)

Site `<html lang="tr">` ile köklü. Aşağıdaki uppercase İngilizce ifadeler sayfalarda kullanılıyor — builder bunları `<En>` veya `<span lang="en">` ile sarmalı; aksi halde `i → İ` dönüşümü kırılır:

- `SETUP SERVICES`, `SUPPORT SERVICES`, `TRAINING SERVICES`, `CONSULTANCY SERVICES`
- `Launch Ready`, `Quickstart`, `Mission Critical`, `Platinum`, `Gold`, `Silver`
- `Configuration Pack`, `Annual`, `One-Time`
- `CSSM-A`, `CSSM-P`, `ITIL4 FND`
- `Continuous Delivery`, `Service Portal`, `Knowledge Base`, `Health-Check`
- `REST API`, `JSON`, `DMZ`, `CMDB`, `SLA`, `OS`, `RAM`, `SSL`, `TLS`, `VPN`, `DNS`, `AD`, `MSSQL`, `POP`, `IMAP`, `EWS`, `Microsoft Graph`, `Office 365`, `Exchange`, `Azure DevOps`
- Service Code'lar: `SCLRCP`, `SCQSSMP`, `SCINTS`, `SCMS`, `SCSSP`, `SCGSP`, `SCPSP`, `SCMCSP`, `DRCCP`, `SCDMZCP`, `FSCP`, `TSCP`, `ACDCP`, `SCREPS`, `SCSO`, `SCFEP`, `SCPT`, `CSSM-A`, `CSSM-P`, `SRDT`, `SCPCS`, `SCPMP`, `SCPCDP`, `SCFTVIPSP`

---

## Navbar Mega Menu — "Hizmetler"

### Yer
**Planlar dropdown'undan önce, AICore dropdown'undan sonra.** Sıralama: `Modüller · Çözümler · AICore · Hizmetler · Planlar · Kaynaklar · İletişim`.

### Trigger
Dropdown trigger (Modüller pattern'i ile birebir):
- Label: `Hizmetler`
- Hover ile açılır
- `ChevronDown` ikonu, açıkken 180 derece döner (mevcut spring animasyonu)
- Mobile drawer'da accordion

### Mega Menu Layout
**Pattern referansı:** Modüller mega menu (`Navbar.tsx` `modules` dropdown'u). 4 sütunlu mega menu.

- Konum: `fixed left-1/2 -translate-x-1/2`, `top-14` (scrolled) veya `top-20` (default)
- Genişlik: `w-[min(1240px,calc(100vw-3rem))]`
- Arka plan: `bg-(--color-surface-elevated-solid)/95 backdrop-blur-2xl border border-white/10 rounded-2xl`
- Padding: `px-6 py-6`

### İçerik Yapısı (4 sütun)
Her sütun bir kategori. Sütun başlığı kategori adı (renkli accent), altında o kategorinin hizmetleri liste halinde.

```
SÜTUN 1: KURULUM HİZMETLERİ (accent: blue · Hammer ikonu)
  · Launch Ready Konfigürasyon Paketi          [featured rozet]
  · Quickstart Konfigürasyon Paketi             [featured rozet]
  · Felaket Kurtarma Merkezi
  · DMZ Konfigürasyon Paketi
  · Yedekli Sistem Paketi
  · Test Sistemi Paketi
  → "Tüm Kurulum Hizmetleri" → /hizmetler/setup

SÜTUN 2: DESTEK HİZMETLERİ (accent: cyan · LifeBuoy ikonu)
  · Entegrasyon Paketi                          [featured rozet]
  · Taşıma Paketi                               [featured rozet]
  · Analiz, Özelleştirme ve Devreye Alma
  · Raporlama Hizmetleri
  · Saha Destek
  · Özellik Geliştirme Paketi
  · Silver Destek Paketi                        [featured rozet · Annual]
  · Gold Destek Paketi                          [featured rozet · Annual]
  · Platinum Destek Paketi                      [featured rozet · Annual]
  · Mission Critical Destek Paketi              [featured rozet · Annual]
  → "Tüm Destek Hizmetleri" → /hizmetler/support

SÜTUN 3: EĞİTİM HİZMETLERİ (accent: emerald · GraduationCap ikonu)
  · Ürün ve ITIL Pratikleri Eğitimi
  · ITIL4 Foundation Eğitimi
  · CSSM-P Teknisyen Eğitimi
  · CSSM-A Yönetici Eğitimi
  · Raporlama ve Dashboard Eğitimi
  → "Tüm Eğitim Hizmetleri" → /hizmetler/training

SÜTUN 4: DANIŞMANLIK HİZMETLERİ (accent: purple · Compass ikonu)
  · Süreç Danışmanlığı Hizmeti
  · Proje Yönetimi Hizmeti
  · Profesyonel Özelleştirme Modül Paketi
  · Fast Track VIP Sprint Paketi
  → "Tüm Danışmanlık Hizmetleri" → /hizmetler/consultancy
```

### Sütun Stili
- Sütun başlığı: küçük ikon container (8x8) + kategori adı (h4, semibold, accent text)
- Hizmet listesi: ikon yok, sadece kompakt text liste
- Her satır: hover'da `bg-white/5`, accent text rengine geçiş
- Featured rozet: küçük yıldız ikonu (lucide `Star`, w-3 h-3) hizmet adının sonunda, accent renkte glow
- Annual etiketi: küçük mono caption `· Yıllık` şeklinde
- Detay sayfası olanlar: link `/hizmetler/<category>/<slug>` formatında
- Detay sayfası olmayanlar: link kategori sayfasına gider, ankor `#<slug>` ile karta scroll

### Footer Bar
Mega menu altında ayraç + sağ tarafta CTA link:
- Sol: `26 profesyonel hizmet · 4 kategori · uçtan uca`
- Sağ: `Tüm Hizmetleri Keşfet →` → `/hizmetler`

### Mobile Drawer
Accordion (mevcut Modüller accordion pattern'i ile aynı):
- Tek seviye accordion: "Hizmetler" → açıldığında kategori başlıkları + altlarına hizmet listesi
- Kategori başlıkları kalın, hizmetler ince
- Her hizmet satırı tıklanabilir

---

## 1. `/hizmetler` — Hub Sayfası

### Amaç
26 hizmetin genel görünümünü sunan, 4 kategoriyi tanıtan ve öne çıkan 8 hizmeti vurgulayan giriş sayfası. Ziyaretçi buradan kategori sayfalarına veya doğrudan detay sayfalarına yönlenir.

### Hedef Kullanıcı
- İlk kez hizmet portfoyünü inceleyen BT yöneticisi
- Mevcut müşteri olarak hangi paketin aldığını anlamak isteyen kullanıcı
- Demo/iletişim öncesi seçenekleri tarayan satın alma kararı sahibi

### Pattern Referansı
- **Hero:** `moduller/page.tsx` HERO bölümü (badge + titleLead + titleAccent + description + stat caption)
- **Kategori şeritleri:** Yeni — Apple Pro tarzı, 4 büyük yatay kart
- **Featured grid:** `cozumler/[slug]` pattern'i içindeki "Diğer Çözümler" kompakt grid'inin büyütülmüş hali
- **CTA banner:** `moduller/page.tsx` gradient banner

### Bölümler

#### 1.1 Hero
- Layout: stack, center align, max-w-4xl
- Badge: `LayoutGrid` ikonu + "HİZMETLER" (uppercase, mono, blue accent)
- Başlık: "ServiceCore" (white) + line break + "profesyonel hizmetleri." (gradient blue → cyan)
- Açıklama (lead): 4-5 satır, ITIL4 disiplinine sadık 26 hizmet konumlandırması
- Stat caption: `26 hizmet · 4 kategori · uçtan uca yaşam döngüsü`
- Efektler: arka planda blue (sol üst) + purple (sağ alt) glow, mesh gradient yok (statik glow yeterli)
- Animasyon: spring `gentle`, başlık fade-up 0.6s, stat 0.4s gecikme
- İkonlar: `LayoutGrid` (badge)

#### 1.2 Kategori Tanıtım Bölümü
- Bölüm başlığı: "Dört disiplin, tek catı altinda."
- Lead: kısa, kategorilerin nasıl tamamlandığını anlatır
- Layout: 4 büyük kart, masaüstünde 2x2 grid, mobilde tek sütun
- Her kart:
  - Üst: kategori ikonu (12x12 container, accent renk arka plan/border) + kategori adı (h3)
  - Üst sağ: count rozet "6 hizmet" (mono badge, accent text)
  - Tagline (lead küçük)
  - Açıklama (body)
  - Alt: "Kategoriyi İncele →" link (accent rengi)
- Kart stili: subtle (bg-white/2, rounded-3xl, p-10), hover'da accent gradient cardHover + border güçlendirme
- Animasyon: stagger 0.1s, fade-up spring
- İkonlar (kategori başına): `Hammer` (Setup), `LifeBuoy` (Support), `GraduationCap` (Training), `Compass` (Consultancy)

#### 1.3 Öne Çıkan 8 Hizmet
- Bölüm başlığı: "Öne Çıkan 8 Hizmet"
- Lead: "ServiceCore'un en çok talep gören, dokümantasyonu ile detaylandırılan profesyonel hizmetleri."
- Layout: 3 sütun grid (mobilde 1), gap-6
- Featured 8 hizmet:
  - Launch Ready, Quickstart (setup)
  - Integration, Migration (support)
  - Silver, Gold, Platinum, Mission Critical (support · annual)
- Her kart (moduller card pattern'i, accent ton):
  - Üst: hizmet ikonu (12x12 container, accent renk) + sağ üst payment term rozet (`One-Time` / `Annual` mono caption)
  - Hizmet adı (h3 bold)
  - Service code mono caption altında (örn: `SCLRCP`)
  - Short description (body, 2-3 satır clamp)
  - Ayraç hr
  - Alt: "Detayları Gör →" accent link
- Renk kodu accent: setup → blue, support → cyan, annual paketler → cyan ama hafif glow ekstra
- "Tavsiye Edilen" Platinum kartı için: en üstte ince gradient çizgi + caption
- Animasyon: stagger 0.05s, fade-up, hover'da glow + lift
- İkonlar: Rocket, Zap, Plug, ArrowLeftRight, ShieldCheck, Award, Gem, Crown

#### 1.4 Tüm Hizmetler Listesi (Kompakt)
- Bölüm başlığı: "Tüm Profesyonel Hizmetler"
- Lead: "26 hizmet · 4 kategori · 18 tek seferlik + 4 yıllık + 4 yıllık eğitim/danışmanlık"
- Layout: tablo/liste pattern; bir kart altında 4 sütun (kategori başlığı) + altında hizmet adı + service code + payment term
- Mobile: accordion (her kategori açılıp kapanır)
- Sade tasarım, sadece hover'da rengin belirginleşmesi
- Pattern referansı: `destek/components/premium-comparison-matrix.tsx` tablo tarzı ama daha sade

#### 1.5 CTA Banner
- Pattern: `moduller/page.tsx` CTA banner (gradient border + glassmorphism iç katman)
- Başlık: "Hizmet portfoyümüzü birlikte planlayalım."
- Açıklama: hizmetler.json `cta.description`
- Iki buton: "Demo İste" (primary, blue glow) + "Bize Ulaşın" (secondary, ghost)
- Builder notu: 3+ buton yan yana yok. Sade.

---

## 2. `/hizmetler/setup` — Kurulum Hizmetleri Kategori

### Amaç
6 kurulum hizmetini detaylı kartlar halinde sunar. Launch Ready ve Quickstart için detay sayfası linki var; diğer 4 hizmet için kart üzerinde tüm bilgi mevcut, link yok.

### Pattern Referansı
- **Hero:** `moduller/page.tsx` hero (kategoriye göre uyarlanmış)
- **Kart grid:** `moduller/page.tsx` modules grid (3 sütun, accent ton, hover glow)

### Bölümler

#### 2.1 Hero
- Badge: `Hammer` + "KURULUM HİZMETLERİ" (mono, blue accent)
- Başlık: "Sıfırdan canlıya hazır" (white) + "ServiceCore kurulumu." (gradient blue → cyan)
- Açıklama: hizmetler.json `categories[0].description`
- Stat: `6 hizmet · sunucu hazırlığından SLA Policy'lerine`
- Breadcrumb: `Hizmetler / Kurulum Hizmetleri`
- Animasyon: spring entry

#### 2.2 Hizmet Grid (6 kart)
- Layout: 3 sütun grid (lg), 2 (md), 1 (sm)
- Pattern: moduller modules grid kartı, blue accent
- Her kart:
  - Üst: hizmet ikonu (12x12 blue container) + payment term rozet (`Tek seferlik`)
  - Hizmet adı (h3)
  - Service code (mono caption, örn: `SCLRCP`)
  - Short description (body)
  - Value props bullet list (4 madde, küçük check ikon + 1 satır)
  - Whoför kutusu (subtle bg, küçük, italic dil, "Kimler için" başlıkla)
  - Alt: featured ise "Detayları Gör →" link (`/hizmetler/setup/<slug>`); değilse "Demo İste" link
- Featured kartlar (Launch Ready, Quickstart): ince blue gradient çerçeve + "Detaylı içerik" rozet
- Animasyon: stagger 0.05s fade-up
- İkonlar: Rocket, Zap, ShieldCheck, Globe, Layers, FlaskConical

#### 2.3 Süreç Akışı (Opsiyonel zenginleştirme)
- Bölüm başlığı: "Kurulum süreci nasıl işler?"
- Layout: yatay 4 adım, ok ile bağlı (mobile'da vertikal)
- Adımlar: Keşif → Tasarım → Kurulum → Eğitim
- Glassmorphism step kartları
- İkonlar: Search, Layout, Wrench, GraduationCap
- Pattern referansı: aicore detay sayfası `howItWorks` ama yatay

#### 2.4 CTA
- moduller CTA banner pattern'i, blue accent ton
- Başlık: "Kurulum planlamasını birlikte yapalım."
- Butonlar: "Demo İste" + "Bize Ulaşın"

---

## 3. `/hizmetler/support` — Destek Hizmetleri Kategori

### Amaç
10 destek hizmetini iki bölümde sunar: 6 proje bazlı (tek seferlik) + 4 yıllık abonelik paketi. Featured 6 hizmet için detay sayfası linki var.

### Pattern Referansı
- **Hero:** moduller hero (cyan ton)
- **Tek seferlik kartlar:** moduller grid
- **Yıllık paketler bölümü:** `destek/page.tsx` PremiumComparisonMatrix benzeri, ama burada kart formatında

### Bölümler

#### 3.1 Hero
- Badge: `LifeBuoy` + "DESTEK HİZMETLERİ"
- Başlık: "Canlı sistemler için" (white) + "uzman müdahale." (gradient cyan → blue)
- Açıklama: hizmetler.json `categories[1].description`
- Stat: `10 hizmet · 6 proje bazlı + 4 yıllık abonelik`
- Breadcrumb: `Hizmetler / Destek Hizmetleri`

#### 3.2 Proje Bazlı Destek Hizmetleri (6 kart)
- Bölüm başlığı: "Proje bazlı destek hizmetleri"
- Sub-eyebrow: `Tek seferlik`
- Layout: 3 sütun grid, cyan accent
- 6 hizmet: Integration, Migration, ACD, Reporting, On-Site, Feature Enhancement
- Kart: setup kart pattern'i (cyan ton)
- Featured (Integration, Migration): "Detayları Gör" + ince cyan glow

#### 3.3 Yıllık Destek Paketleri (4 kart)
- Bölüm başlığı: "Yıllık destek paketleri"
- Sub-eyebrow: `Annual subscription` (uppercase, mono — `<En>` ile sar)
- Layout: 4 sütun grid (lg), 2 (md), 1 (sm)
- Pattern referansı: `planlar/expanded-pricing` — pricing card stilinden esinlenme
- Her paket kartı:
  - Üst: paket adı (h3, gradient text) + tier badge (Silver/Gold/Platinum/Mission Critical)
  - Service code (mono caption)
  - Iki büyük metric: `Ticket: 15` + `Saat: 5x8`
  - Kısa açıklama
  - Dahil olanlar listesi (sadece ilk 4-5 madde + "Tümünü gör →")
  - Alt: "Detayları Gör →" link
- Platinum "Tavsiye Edilen" gradient çerçeve + üstte 1px gradient çizgi (destek matrix pattern'i)
- Mission Critical "En Kapsamlı" gold-amber accent (gradient ton)
- Silver/Gold: standart cyan accent
- Animasyon: stagger 0.08s

#### 3.4 Paket Karşılaştırması (Kısa)
- Bölüm başlığı: "Paketler karşılaştırması"
- Pattern: `destek/components/premium-comparison-matrix.tsx` — birebir reuse
- 4 sütun tablo, 16 özellik satırı
- Platinum ve Mission Critical sütunları gradient highlight
- Mobile: yatay scroll
- "Detaylı karşılaştırma için /destek sayfasına gidin" CTA

#### 3.5 Destek Kanalları (kısa banner)
- Layout: 4 ikon yatay (E-posta, Telefon, Portal, Knowledge Base)
- Builder notu: `destek-kanallari.json` supportChannels reuse

#### 3.6 CTA
- moduller CTA banner pattern'i, cyan accent

---

## 4. `/hizmetler/training` — Eğitim Hizmetleri Kategori

### Amaç
5 eğitim hizmetini sunar. Hiçbiri featured değil, yani detay sayfası yok — kart üzerinde tüm bilgi mevcut.

### Pattern Referansı
- Hero: moduller hero (emerald ton)
- Grid: moduller modules grid (emerald accent, 3 sütun)

### Bölümler

#### 4.1 Hero
- Badge: `GraduationCap` + "EĞİTİM HİZMETLERİ"
- Başlık: "Sertifikalı ServiceCore" (white) + "ve ITIL4 yetkinliği." (gradient emerald → cyan)
- Açıklama: hizmetler.json `categories[2].description`
- Stat: `5 program · sertifika + sınav + uygulamalı atölye`
- Breadcrumb: `Hizmetler / Eğitim Hizmetleri`

#### 4.2 Eğitim Programları Grid (5 kart)
- Layout: 3 sütun grid, sondaki 2 kart ortalanmış veya 2x2+1 layout
- 5 program: Ürün ve ITIL Pratikleri, ITIL4 Foundation, CSSM-P, CSSM-A, Raporlama & Dashboard
- Her kart:
  - Üst: ikon (12x12 emerald container) + "Online + Sınıf" rozet
  - Program adı (h3)
  - Service code (mono caption)
  - Hedef kitle kutusu: "Kimler için: ..."
  - Kazanımlar listesi (value props)
  - Alt: "Detay almak için iletişime geçin →"
- İkonlar: Presentation, BookCheck, Wrench, ShieldCheck, BarChart3
- Animasyon: stagger 0.05s

#### 4.3 Sertifika Yolu (Opsiyonel)
- Bölüm başlığı: "Sertifika yol haritası"
- Layout: yatay zaman çizelgesi (timeline)
- Adımlar: ITIL4 Foundation → CSSM-P → CSSM-A → Uzmanlaşma
- Pattern: aicore howItWorks adım kartları (emerald ton)

#### 4.4 CTA
- moduller CTA banner pattern'i, emerald accent
- Başlık: "Takımınızın yetkinliğini sertifikalandıralım."

---

## 5. `/hizmetler/consultancy` — Danışmanlık Hizmetleri Kategori

### Amaç
4 danışmanlık hizmetini sunar. Hiçbiri featured değil, detay sayfası yok.

### Pattern Referansı
- Hero: moduller hero (purple ton)
- Grid: moduller modules grid (purple accent, 2 sütun)

### Bölümler

#### 5.1 Hero
- Badge: `Compass` + "DANIŞMANLIK HİZMETLERİ"
- Başlık: "ITIL4 süreç ve" (white) + "proje yönetimi danışmanlığı." (gradient purple → pink)
- Açıklama: hizmetler.json `categories[3].description`
- Stat: `4 hizmet · uzman danışman + proje yönetimi disiplini`
- Breadcrumb: `Hizmetler / Danışmanlık Hizmetleri`

#### 5.2 Danışmanlık Grid (4 kart)
- Layout: 2 sütun grid (md+), 1 sütun mobile — kartlar daha geniş (4 kart için 3x grid sade duruyordu)
- Her kart purple accent ton
- Kartlar daha rich, padding p-10:
  - Üst: büyük ikon (16x16 container, purple gradient bg)
  - Hizmet adı (h2 küçük, bold)
  - Service code
  - Tagline (lead)
  - Short description
  - Value props (4 madde, glassmorphism kutular)
  - Kimler için (subtle bg kutu)
  - Alt: "Detay görüşmesi planla →" link
- İkonlar: Compass, ClipboardList, Settings2, Rocket
- Builder notu: Fast Track VIP Sprint kartına özel — daha vurgulu, "FAST TRACK" mono caption + amber accent overlay

#### 5.3 Süreç Olgunluk Modeli (Opsiyonel)
- Bölüm başlığı: "Süreç olgunluk modeli"
- Layout: 5 aşamalı yatay model (Initial → Repeatable → Defined → Managed → Optimized)
- ITIL4 maturity model'e atıf
- Glassmorphism progress bar
- Pattern referansı: aicore mock benzeri sahnelenmiş görsel

#### 5.4 CTA
- moduller CTA banner pattern'i, purple accent

---

## 6-13. Detay Sayfaları (8 hizmet)

### Genel Tasarım (8 sayfa için ortak)

**Pattern referansı (birincil):** `aicore/[slug]/page.tsx` — eyebrow + h1 + lead + sections + CTA + diğer ilgili linkler.

**Pattern referansı (ikincil):** `cozumler/[slug]/page.tsx` — sections render mantığı.

#### Ortak Bölüm Sıralaması (her detay sayfasında)

1. **Üst Bilgi Şeridi**
   - Breadcrumb: `Hizmetler / <kategori> / <hizmet adı>` (küçük mono caption)
   - Hemen altında 2 rozet:
     - Kategori rozeti (örn: `Setup · Launch Ready`)
     - Payment term rozeti (`Tek seferlik` veya `Yıllık abonelik`)
   - Featured rozet (varsa): "Öne çıkan hizmet"

2. **Hero**
   - h1 (5xl-7xl, gradient text, accent renkler)
   - Subtitle (xl-2xl, font-light)
   - Intro paragraf (base, muted)
   - 2 CTA: "Demo İste" (primary glow) + "Bize Ulaşın" (ghost)

3. **Özet / Hızlı Bilgiler Şeridi** (sadece 4 destek paketinde)
   - 3 stat: Ticket Sayısı / Çalışma Saatleri / Destek Kanalları
   - Glassmorphism kart sırası
   - Pattern referansı: aicore `whatItDoes` 3 sütun kartları

4. **Sections** (JSON'daki section'lar sırayla render)
   - Section type'ları:
     - `text`: paragraf, max-w-3xl, body large
     - `list`: glassmorphism kart içinde bullet liste, intro varsa üstte; check ikonu (cyan/accent)
     - `steps`: numaralı adımlar (aicore howItWorks pattern'i, accent rengine göre)
     - `table`: glassmorphism tablo (Quickstart sunucu gereksinimi için)
     - `comparison`: yan yana 2 kart (CSSM-A vs CSSM-P benzeri)
   - Her section arası dikey spacing: mt-20
   - Her section başlığı: küçük overline (mono, uppercase, muted) + h2 (3xl, white)

5. **Docs Linki**
   - Footer kutusu: "Resmi dokümantasyon: docs.servicecore.app/... [link]"
   - Pattern: subtle bg, küçük

6. **Diğer Hizmetler / İlgili**
   - 4 kategori sütununda diğer hizmetlere referans
   - Pattern: aicore "Diğer Çözümler" küçük link grid'i

7. **CTA**
   - Pattern: cozumler/[slug] CTA bölümü (Demo + İletişim butonları)

---

### 6. `/hizmetler/setup/launch-ready` — Launch Ready Detay

#### Bölüm Listesi
1. Üst Bilgi Şeridi: Breadcrumb + `Setup · Launch Ready` rozet + `Tek seferlik` rozet + `Öne çıkan hizmet` rozet
2. Hero: "Anahtar teslim ServiceCore implementasyonu" (gradient blue → cyan)
3. Sections (21 section):
   - Giriş (text)
   - Başlıca Implementasyon Adımları (text)
   - Kullanıcıları ve Kullanıcı Grupları Tanımlama (text)
   - Lisans ve Teknisyen Tanımlama (list, 3 madde)
   - ITSM Süreç Rolleri Belirleme (text)
   - Eğitim Programları (text — CSSM-A vurgusu)
   - Öncelik, Etki ve Aciliyet Tanımlaması (text)
   - Global Statuslar (text)
   - Süreç ve Görev Kategorileri (text)
   - Şablon Tanımlaması (list, 3 madde)
   - Hizmet Kataloğu Tanımlama (list, 5 madde)
   - Varlık Yönetimi - CMDB (list intro+5 madde)
   - Tedarikçi Tanımlama (text)
   - Sözleşme Tanımlama (text)
   - SLA Policy'leri Oluşturma (text)
   - Uyarı Şablonları (text)
   - Kapatma Kuralları (text)
   - İş Otomasyon Kuralları (text)
   - Teknisyen Eğitimleri (text — CSSM-P vurgusu)
   - Kullanıma Başlama ve Erken Dönem Destek (list, 3 madde)
   - Devam Eden Destek (text)
4. Docs Link: docs.servicecore.app/docs/kurulumkilavuzu/implementasyonadimlari/
5. Diğer Hizmetler grid
6. CTA

#### Layout/Efekt
- Blue accent ton
- Hero arka plan: blue glow sol üst + cyan glow sağ alt
- Section animasyon: viewport-triggered fade-up, spring gentle
- 21 section çok uzun — builder notu: bölüm geçişlerinde küçük dikey çizgi (separator) eklenebilir, akış görselleştirmesi için

#### İkonlar
- Section ikonları: ListChecks, Users, Key, Award, AlertOctagon, Activity, ListTree, FileTemplate, BookOpen, Database, Building, FileSignature, Timer, BellRing, CheckSquare, Workflow, Wrench, Rocket, RefreshCw

---

### 7. `/hizmetler/setup/quickstart` — Quickstart Detay

#### Bölüm Listesi
1. Üst Bilgi Şeridi: `Setup · Quickstart` + `Tek seferlik` + `Öne çıkan hizmet`
2. Hero: "Hızlı başlangıç kurulum paketi"
3. Sections (14 section):
   - Kurulum Öncesi Gerekli Erişimlerin Tanımlanması (text)
   - Continuous Delivery İzinleri (text)
   - Sunucu Ortamı Hazırlığı (**table** — OS/Server/Disk + 3 ek opsiyonel kurulum footer)
   - Uygulama Kurulum İşlemleri (text)
   - Uygulama DNS ve SSL Konfigürasyonu (text)
   - AD Entegrasyon Tanımlama (text)
   - AD Bilgisi İçin Gerekli Bilgiler (**steps**, 9 adım)
   - E-Posta Entegrasyon Tanımlama (text)
   - Giden Eposta Ayarları (**steps**, 9 adım)
   - Eposta Yakalayıcı Ayarları (**steps**, 10 adım)
   - Kullanıcıları ve Kullanıcı Grupları Tanımlama (text)
   - Lisans Tanımlama, Teknisyenleri Tanımlama (text)
   - Admin ve Teknisyenlerin Eğitimlere Katılması (**comparison**, CSSM-A vs CSSM-P)
   - Kullanıma Başlama ve Erken Dönem Yakın Destek (text)
4. Docs Link
5. Diğer Hizmetler grid
6. CTA

#### Layout/Efekt
- Blue accent ton (Launch Ready ile uyumlu)
- Server hazırlığı için tablo: glassmorphism table, header gradient
- AD/Eposta steps: 2 sütun yan yana büyük kart (steps daha okunaklı), iç çizgili (vertikal accent line)
- Comparison section: 2 büyük yan yana kart (CSSM-A vs CSSM-P), her birinde sertifika ikonu

#### İkonlar
- Hero: Zap
- Section: Key, RefreshCw, Server, Download, Globe, Network, Settings, Mail, MailCheck, Inbox, Users, UserCog, GraduationCap, Rocket

---

### 8. `/hizmetler/support/integration` — Integration Detay

#### Bölüm Listesi
1. Üst Bilgi Şeridi: `Support · Integration` + `Tek seferlik` + `Öne çıkan hizmet`
2. Hero: "REST API ile uçtan uca entegrasyon hizmeti"
3. Sections (6 section):
   - Entegrasyon Mimarisi (text)
   - Temel Faydalar (list, 8 madde)
   - Entegrasyon Tasarlama (text)
   - Entegrasyon Tasarım Adımları (**steps**, 9 adım)
   - Entegrasyonu Aktifleştirme (text)
   - Otomasyon Tasarım Adımları (**steps**, 6 adım)
4. Docs Link
5. Diğer Hizmetler grid
6. CTA

#### Layout/Efekt
- Cyan accent ton
- Faydalar listesi: 2 sütun grid (8 madde), glassmorphism kartlar (her madde küçük kart)
- Steps: aicore howItWorks pattern'i, cyan ton

#### İkonlar
- Hero: Plug
- Section: Network, ListChecks, Layout, Workflow, Power, Settings2

---

### 9. `/hizmetler/support/migration` — Migration Detay

#### Bölüm Listesi
1. Üst Bilgi Şeridi: `Support · Migration` + `Tek seferlik` + `Öne çıkan hizmet`
2. Hero: "7 aşamalı yapılandırılmış veri taşıma hizmeti"
3. Sections (2 section):
   - Giriş (text)
   - Taşıma Süreci · 7 Aşama (**steps**, 7 adım — her adımın label başında "1." gibi numara)
4. Docs Link
5. Diğer Hizmetler grid
6. CTA

#### Layout/Efekt
- Cyan accent ton
- 7 aşama: vertikal timeline, her aşama büyük numaralı dairesel ikon (16x16) + label + detail
- Pattern referansı: aicore howItWorks ama daha büyük, sahne efekti
- Aşamalar arası dikey nokta-çizgi separator (cyan accent)
- Mobile: vertikal stack

#### İkonlar
- Hero: ArrowLeftRight
- Aşama ikonları: Search, Map, Compass, ShieldCheck, Rocket, CheckSquare, MessageCircle

---

### 10-13. `/hizmetler/support/{silver,gold,platinum,mission-critical}` — 4 Destek Paketi Detay

#### Ortak Yapı (her biri için)
1. **Üst Bilgi Şeridi**
   - Breadcrumb: `Hizmetler / Destek Hizmetleri / <Paket Adı>`
   - Rozet 1: `Support · <Tier>` (kategori) — örn `Support · Platinum`
   - Rozet 2: `Yıllık abonelik`
   - Rozet 3 (Platinum): `Tavsiye edilen` (cyan glow)
   - Rozet 3 (Mission Critical): `En kapsamlı` (gradient amber)
2. **Hero**
   - h1: paket adı + gradient (Silver: slate gradient, Gold: amber gradient, Platinum: cyan gradient, Mission Critical: gradient amber → red)
   - Subtitle, intro paragraf
   - 2 CTA: "Bize Ulaşın" + "Paketleri Karşılaştır" (→ /destek)
3. **Özet Şeridi (yeni)**
   - 3 büyük metric kart yan yana:
     - Yıllık Ticket: `15` / `30` / `60` / `60` (büyük mono font)
     - Çalışma Saatleri: `5x8` / `5x8` / `7x8` / `7x24`
     - Destek Kanalları: liste rozet (E-posta, Telefon, vb.)
   - Glassmorphism, hover'da hafif scale
4. **Sections** (her paket için JSON'daki section'lar)
   - Pakete Dahil Olanlar (list, glassmorphism kart, check ikonu + ✓)
   - Pakete Dahil Olmayan Hizmetler (list, kırık çizgi ikonu — sadece Silver/Gold için)
   - Mission Critical Ayrıcalıkları (list, sadece Mission Critical)
   - Özel Kanal Ayrıcalığı (text, sadece Platinum/Mission Critical)
   - Destek Kanalları (**steps**, ikon + label + detail)
   - Health-Check ve Konfigürasyon Yönetimi (text, sadece Gold/Platinum/Mission Critical)
   - Dedicated Teknisyen (text, sadece Platinum/Mission Critical)
   - Performans İzleme (text, sadece Platinum/Mission Critical)
   - Tüm Ek Hizmetler Dahil (list, sadece Mission Critical)
   - Paket Dışındaki Ek Destek Hizmetleri (list — tüm paketlerde ortak)
   - Üst Paketlere Geçiş (text — sadece Silver)
5. **Diğer Paketler Karşılaştırması (kompakt)**
   - 4 paket küçük kart yatay sırada, mevcut paket vurgulanmış
   - Her kartta: paket adı + 2 metric (ticket + saat) + "Detayları gör →" link
6. **CTA**
   - Pattern: moduller CTA banner
   - Başlık paket-spesifik: "Silver paketi ile başlangıç desteği" / "Mission Critical ile 7x24 üst düzey destek"

#### Renk/Vurgu Stratejisi
- **Silver**: slate accent (silver tonları), düşük glow
- **Gold**: amber gradient (golden glow)
- **Platinum**: cyan gradient + glow şiddetli, "Tavsiye edilen" overlay
- **Mission Critical**: amber → red gradient, en güçlü glow, "En kapsamlı" overlay, hero başlık daha büyük

#### Builder Notu — Featured Tier Vurgusu
- Platinum sayfasında hero'da `gradient ring border` (ince 1px gradient çerçeve, tüm hero kapsayan)
- Mission Critical'da hero arka planda animasyonlu glow (subtle pulse)
- Diğer ikisi standart

#### İkonlar
- Silver: ShieldCheck (hero)
- Gold: Award (hero)
- Platinum: Gem (hero)
- Mission Critical: Crown (hero)
- Bölüm ikonları (ortak): CheckCircle2, XCircle, Phone, Mail, Globe, KeyRound, UserCheck, Activity

---

## Builder Notları (Genel)

1. **Tutarlılık:** Tüm sayfalar `bg-(--color-surface-base)` veya `bg-(--color-surface-base-dark)` ile başlasın; mevcut sayfa pattern'leri ile aynı.
2. **Container:** `max-w-7xl mx-auto px-6 lg:px-12` standart container.
3. **Padding:** Hero `pt-32 pb-16 lg:pt-48 lg:pb-24`; section `py-20` veya `py-24`.
4. **Animasyon:** Tüm motion bileşenleri `prefers-reduced-motion` kontrolüyle. Spring `gentle` veya `soft` varsayılan.
5. **Glow:** Her sayfada en az 2 background glow (köşelerde). Sayfa açılınca opacity 0.6'ya kadar var, hover'sız.
6. **JSON güveni:** Her sayfa kendi JSON'undan render edilir; hardcoded string YOK.
7. **`<En>` sarmalama:** Yukarıdaki uppercase İngilizce kelimeler listesini builder uppercase context'te `<En>` (veya `<span lang="en">`) ile sarmalı.
8. **Eski URL'ler kalmasın:** Mevcut `/destek` ve `/planlar` sayfaları korunur; bu yeni `/hizmetler` ağı **ek** olarak çalışır. Destek paketleri 2 yerden erişilir (eski karşılaştırma sayfası + yeni detay sayfaları).
9. **Featured rozet:** Mega menu, hub, kategori ve detay sayfalarında tutarlı (küçük yıldız ikonu + accent renk).
10. **3+ buton yasak:** Tüm CTA bölümleri max 2 buton. Diğer linkler "X →" formatında inline.
11. **Glassmorphism:** Tüm kartlar `bg-white/5 border-white/10 backdrop-blur`; flat YASAK.
12. **`h-screen` yok, `100dvh` kullan.**
13. **`cursor-pointer` her tıklanabilir elementte.**

---

## Mevcut Sayfa Pattern Referans Tablosu

| Yeni Sayfa | Pattern Aldığı Mevcut Sayfa | Hangi Kısım |
|------------|------------------------------|-------------|
| `/hizmetler` (hub) | `/moduller` | Hero, kategori grid, featured grid, CTA banner |
| `/hizmetler/<category>` | `/moduller` | Hero, kart grid |
| `/hizmetler/setup/*` (detay) | `/aicore/[slug]` | Hero, section render, CTA |
| `/hizmetler/support/integration`,`migration` | `/aicore/[slug]` | Hero, steps, list |
| `/hizmetler/support/{silver,gold,platinum,mc}` | `/aicore/[slug]` + `/destek` | Hero, özet stats, sections + karşılaştırma matrix referansı |
| Tüm CTA banner'lar | `/moduller` CTA bölümü | Gradient border + glassmorphism inner |
| Destek paketi karşılaştırma | `destek/components/premium-comparison-matrix.tsx` | Reuse (link) |

---

## Veri Dosyaları (Builder erişimi)

- `website/src/data/hizmetler.json` — 26 hizmet katalog + 4 kategori + featured callout + hero + CTA
- `website/src/data/hizmet-icerikleri/launch-ready.json` — Launch Ready detay
- `website/src/data/hizmet-icerikleri/quickstart.json` — Quickstart detay
- `website/src/data/hizmet-icerikleri/integration.json` — Integration detay
- `website/src/data/hizmet-icerikleri/migration.json` — Migration detay
- `website/src/data/hizmet-icerikleri/silver.json` — Silver detay
- `website/src/data/hizmet-icerikleri/gold.json` — Gold detay
- `website/src/data/hizmet-icerikleri/platinum.json` — Platinum detay
- `website/src/data/hizmet-icerikleri/mission-critical.json` — Mission Critical detay
- `website/src/data/page-meta.json` — 13 yeni route meta'sı eklendi:
  - hizmetler, hizmetler-setup, hizmetler-support, hizmetler-training, hizmetler-consultancy
  - hizmetler-setup-launch-ready, hizmetler-setup-quickstart
  - hizmetler-support-integration, hizmetler-support-migration
  - hizmetler-support-silver, hizmetler-support-gold, hizmetler-support-platinum, hizmetler-support-mission-critical

---

## Routing Yapısı

```
website/src/app/(main)/hizmetler/
├── page.tsx                       → /hizmetler (hub)
├── setup/
│   ├── page.tsx                   → /hizmetler/setup
│   ├── launch-ready/page.tsx      → /hizmetler/setup/launch-ready
│   └── quickstart/page.tsx        → /hizmetler/setup/quickstart
├── support/
│   ├── page.tsx                   → /hizmetler/support
│   ├── integration/page.tsx       → /hizmetler/support/integration
│   ├── migration/page.tsx         → /hizmetler/support/migration
│   ├── silver/page.tsx            → /hizmetler/support/silver
│   ├── gold/page.tsx              → /hizmetler/support/gold
│   ├── platinum/page.tsx          → /hizmetler/support/platinum
│   └── mission-critical/page.tsx  → /hizmetler/support/mission-critical
├── training/page.tsx              → /hizmetler/training
└── consultancy/page.tsx           → /hizmetler/consultancy
```

Builder notu: Detay sayfaları tek `[slug]` dinamik route ile de yapılabilir (4 kategori için ayrı `[slug]/page.tsx`). Müşterinin onaylı mimarisinde **statik route'lar** isteniyor — yani her detay sayfası kendi klasöründe ayrı `page.tsx` ile. Bu netlik için tasarımda statik yol tablosunu verdim; builder ister dinamik [slug] ile renderlasin, ister statik dosya ile — pattern'ler değişmez.

---

## Metric Özet

- **13 yeni sayfa**: 1 hub + 4 kategori + 8 detay
- **26 hizmet** kataloglandı, 8'i featured
- **9 JSON dosyası** eklendi (`hizmetler.json` + 8 detay)
- **13 page-meta** girdisi eklendi
- **1 navbar değişikliği** önerildi (Hizmetler mega menu Planlar'dan önceye)
