# ServiceCore Zoho Teklif — Görsel Dil v2 (Tek Kaynak / Builder Brief)

> Bu doküman **sadece görsel dili / aesthetic** yeniden tanımlar. 14 sayfa yapısı/akışı
> (`tasarim-spec.md` Bölüm 3) ONAYLI — DEĞİŞMEZ. Burada değişen: palet, tipografi ölçeği,
> layout mimarisi ve **tek ayrıştırıcı signature öğe**. Builder bu dosyayı `tasarim-spec.md`
> ile birlikte okur: yapı/kopya spec'ten, görsel dil buradan.
>
> Render motoru: Zoho Flying Saucer (XHTML + CSS 2.1). KISIT bölümü her seçimi sınırlar.
> Çıktı: beyaz/açık zemin, A4-yazdırılabilir, premium/kurumsal. Köşeler KARE (Flying Saucer).
>
> Süreç (frontend-design): v1 eleştiri → token sistemi → default-kontrol → signature → kısıt-uyum → değişim listesi.

---

## 0. ÖZET — TEK CÜMLEDE YÖN

> **"Mühendislik blueprint'i estetiği":** teklif bir satış broşürü değil, bir kurumsal sistem
> **plakası/şeması** gibi okunur. Her sayfanın sol kenarında dikey bir **"servis omurgası"
> (spine)** akar; hexagonal amblemin altı faseti palette/yapıya kodlanır; tipografi mavi-koyu
> serif display + Arial sans-data kontrastıyla kişilik kazanır. Boldness tek yerde:
> **spine + faset-koordinat sistemi**. Gerisi sakin, beyaz, nefes alan.

Alternatif eksen (not, ana yön DEĞİL): "ölçüm cetveli / ölçek-işaretli kenar" — spine yerine
sayfa kenarına ince milimetrik tick'ler. Daha minimal ama daha az "orkestrasyon" anlatır.
Spine'ı seçtim çünkü ServiceCore'un kendi sözü "orkestrasyon" + "tek omurga, tek veri modeli";
bunu görselleştiren öğe markaya spesifik. (Gerekçe Bölüm 2.4.)

---

## 1. v1 ŞABLON ELEŞTİRİSİ — Neden default duruyor

> Çerçeve: frontend-design'ın "AI şu an 3 default look'a yığılıyor" + "büyük sayı + accent =
> template cevap" + "yapısal öğeler anlam kodlamalı, dekore etmemeli" prensipleri.
> Önizleme (`onizleme.png`) + kaynak HTML üzerinden somut maddeler.

**E1 — v1 doğrudan AI-default look #3'tür ("broadsheet").**
frontend-design üç default look sayar; üçüncüsü: *"broadsheet-style layout with hairline rules,
zero border-radius, and dense newspaper-like columns."* v1 tam olarak bu: 1px hairline ayraçlar
(`#E2E8F0`), sıfır yuvarlatma, 3 kolonluk yoğun modül indeksi (`line-height:1.9`), gazete-kolonu
ritmi. Bu look bazı brief'ler için meşru ama **bir SEÇİM değil, default** — konudan bağımsız
ortaya çıkıyor. ServiceCore'un dünyasından (orkestrasyon, hexagonal çekirdek, on-premise sistem)
hiçbir iz taşımıyor; aynı iskelet bir muhasebe ya da sigorta teklifine de otururdu. **Ayrıştırıcı
değil, jenerik.**

**E2 — Hero "template cevabı" veriyor: büyük sayı + küçük etiket + tek accent.**
frontend-design birebir uyarıyor: *"a big number with a small label, supporting stats, and a
gradient accent is the template answer, only use if that's truly the best option."* v1 kapağı +
modül sayfası tam bunu yapıyor: 5 hücreli stat şeridi (`2000` / `30+` / `4M+` / `ITIL4` / `7/24`),
her biri büyük mavi sayı + küçük UPPERCASE etiket. Üstüne her sayfada tekrar eden 4 hücreli stat
şeridi → aynı template cevabı 14 kez. Gradient yok (kısıt) ama "büyük sayı kutusu" iskeleti
değişmiyor. Hero bir **tez** olmalı (konunun en karakteristik şeyi); v1'in tezi yok, sadece
sayı kutusu var.

**E3 — Tek-mavi monotonluğu = renk kararı yokluğu.**
v1'de tek accent `#0070F3` + nötr griler. Bu "disiplin" gibi görünür ama aslında **karar
verilmemiş** demektir: hiçbir destekleyici ton, hiçbir derinlik tonu, hiçbir ikincil aile yok.
Sonuç: marka mavisi her yerde aynı parlaklıkta → göz yorucu ve karaktersiz. (v1 sonradan bento'ya
kategori renkleri eklemiş ama bunlar küçük 3px şeritlerde kalıyor, palet sistemi değil — paletin
kendisi hâlâ "mavi + gri".)

**E4 — Yapısal öğeler dekore ediyor, anlam kodlamıyor.**
frontend-design: *"Structural devices... should encode something true about the content, not
decorate it."* v1'in yapısal öğeleri (hairline ayraç, 3px top-border, dikey stat ayracı) hiçbir
şey **kodlamıyor** — sadece "kart burada bitiyor" diyorlar. ServiceCore'un içeriği bir **sistem**
(modüller bir çekirdek etrafında, native entegre, tek omurga). Bu yapı görsel mimariye hiç
yansımıyor. Modüller rastgele kutular; aralarındaki "tek veri modeli" ilişkisi görünmüyor.

**E5 — Tipografi "nötr teslimat aracı", kişilik yok.**
frontend-design: *"Make the type treatment itself a memorable part of the design, not a neutral
delivery vehicle."* v1 baştan sona tek aile (Arial), tek kontrast mantığı (büyük-koyu başlık /
küçük-gri gövde). Display ile data arasında **tipografik gerilim yok**. Web font yasağı bahane
değil: Arial + web-safe serif (Georgia) kontrastı, ağır ölçek sıçramaları ve case oyunlarıyla
karakter kurulabilir — v1 bunu denemiyor.

**E6 — Kapak amblemi var ama "tema" değil; hexagon israf ediliyor.**
v1 kapakta 40px amblem koyuyor, sonra unutuyor. Hexagonal amblem ServiceCore'un en güçlü görsel
varlığı: **altı faset** = altı modül-kategorisi, **çekirdek** = tek platform. Bu motif tüm
dokümana yayılabilecekken (sayfa numarası, kategori işareti, spine düğümü) tek bir dekoratif
logo olarak harcanıyor. Signature fırsatı kaçmış.

**E7 — Boşluk ve ölçek "güvenli", risk yok.**
frontend-design: *"Not taking a risk can be a risk itself."* v1 her yeri eşit nefesle dolduruyor
(simetrik kolonlar, eşit kart gridleri, ortalı hero). Hiçbir asimetri, hiçbir cesur ölçek
sıçraması, hiçbir akılda kalır an yok. "Yeterince iyi" ama **unutulur**. Eleştiri haklı.

**Özet:** v1 = (default look #3) × (template hero) × (renk-kararsızlığı) × (anlamsız yapısal süs)
× (nötr tipografi). Hiçbiri "yanlış" değil; hiçbiri **seçim** değil. v2 her ekseni bir karara
çevirir.

---

## 2. TOKEN SİSTEMİ (v2 yön)

> frontend-design iki-pass yöntemi: önce kompakt token sistemi (color / type / layout / signature),
> sonra default'a karşı eleştir. Tüm değerler Flying Saucer-güvenli **literal hex** + **web-safe font**.

### 2.1 — RENK (5 isimli hex + ölçülü faset paleti)

v1'in "mavi + gri" kararsızlığını **derinlik eksenine** çeviriyoruz: marka mavisi korunur ama
yanına bir **mürekkep-lacivert (ink)** derin ton ve sıcak-nötr kağıt tonu gelir. Bu, hexagonal
amblemin kendi iki rengidir (parlak mavi facet + neredeyse-siyah lacivert facet) — palet
**amblemden türüyor**, soyut tercih değil.

**Çekirdek 5 renk (her sayfada bunlar taşır):**

| İsim | hex | rol | kaynak |
|---|---|---|---|
| **ink** (mürekkep) | `#0A1B2E` | display başlık, spine ana rengi, wordmark "service", footer | amblem koyu facet (≈ surface.base türevi, print-safe koyulaştırılmış) |
| **signal** (sinyal mavi) | `#0070F3` | marka vurgu, spine düğümleri, overline, accent kelime, stat sayısı | brand.primary (DEĞİŞMEZ) |
| **signal-deep** (derin mavi) | `#0B3A8C` | başlık altı ikinci ton, koordinat etiketi, vurgu kelime alternatifi | brand.primaryDark türevi, koyulaştırılmış |
| **paper** (kağıt) | `#FBFCFE` | A4 yaprak zemini (saf beyaz değil — hafif soğuk kağıt, premium his) | yeni — soğuk-beyaz |
| **slate** (kurşun) | `#475569` | gövde metni, açıklama | text.secondary |

**Destek nötrleri (yüzey + çizgi):**

| İsim | hex | rol |
|---|---|---|
| **panel** | `#F4F7FB` | nötr kart/stat/callout zemini (v1 `#F8FAFC` yerine — bir tık daha mavi-soğuk, paper ile uyumlu) |
| **mist** | `#EAF1FB` | mavi-açık zemin (kategori etiket, mavi callout) — v1 `#EAF3FF` yerine ink-uyumlu |
| **rule** | `#DCE3EC` | hairline / kart border / tablo çizgisi (v1 `#E2E8F0` yerine bir tık derin, paper'da görünür) |
| **rule-soft** | `#EDF1F6` | iç tablo satır ayracı |
| **mute** | `#64748B` | yardımcı metin, etiket |
| **faint** | `#94A3B8` | dipnot, legal |

**Faset paleti (KATEGORİ — sadece spine düğümü + 3px şerit + mini etiket; ÖLÇÜLÜ):**
Hexagonal amblemin **altı faseti** = altı modül kategorisi. Her kategori bir fasete eşlenir.
Bu, v1'deki "rastgele 5 renk" yerine **anlam taşıyan 6 renk** (E4'ü çözer):

| Faset | Kategori | nokta/şerit hex | etiket-zemin hex | tokens kaynak |
|---|---|---|---|---|
| F1 | ITSM / Çekirdek | `#0070F3` | `#EAF1FB` | brand.primary |
| F2 | ITAM / Varlık | `#0B3A8C` | `#E5EBF7` | accent.blue.dark koyu türev |
| F3 | ITIL4 / Süreç | `#0F766E` | `#E4F2F0` | accent.emerald.dark → teal'e kaydırıldı (print-uyum) |
| F4 | Otomasyon | `#B45309` | `#F7EFE3` | accent.amber.dark / orange koyu (kahverengi-amber, parlak turuncu DEĞİL — kurumsal) |
| F5 | ESM / Proje | `#6D28D9` | `#EEE8FA` | accent.purple.dark |
| F6 | Analiz / Platform | `#0E7490` | `#E2F0F4` | accent.cyan.dark |

> **Faset paleti v1'den nasıl ayrışır:** (a) renkler **kategoriye DEĞİL, amblem fasetine** bağlı
> — yani 6 sayı, "6 modül kategorisi" anlatısıyla aynı (anlam kodlama). (b) Tonlar
> **koyulaştırıldı/desature edildi** (parlak turuncu `#EA580C` → kahve-amber `#B45309`; emerald →
> teal) → beyaz kağıtta "kurumsal mürekkep" hissi, "lego rengi" değil. (c) Kategori rengi artık
> sadece bento şeridinde değil, **spine düğümünde** de görünür (signature ile bağ).

**ACCENT KULLANIM KURALI (premium algı kilidi — v1'den devralınır, sıkılaştırılır):**
- **signal (#0070F3) NEREDE:** overline, spine düğümleri, stat sayısı, başlıktaki TEK `.accent`
  kelime, 3px top-border, CTA dolgu, kapak koordinat-bloğu.
- **NEREDE YOK:** gövde metni rengi, geniş zemin dolgusu (büyük mavi blok YOK), aynı blokta
  birden çok rakip vurgu.
- **ink (#0A1B2E) yeni rol:** display başlıkların rengi artık saf-siyah-yakını `#0F172A` değil,
  **mürekkep-lacivert `#0A1B2E`** → amblemle aynı koyu ton, doküman "tek mürekkeple basılmış"
  hisseder (klasik blueprint/mühendislik baskı dili).
- **Bir sayfada en fazla 1 "renkli dolgu" alanı** (CTA kutusu / tek vurgu bandı). Gerisi
  paper/panel beyaz → premium nefes.

### 2.2 — TİPOGRAFİ (3 rol, web-safe serif/sans kontrastı)

v1'in tek-Arial monotonluğunu (E5) **serif-display ↔ sans-data gerilimine** çeviriyoruz.
Web font yasak; ama **Georgia** (web-safe serif, PDF'te güvenle render olur) + **Arial**
kombinasyonu karakter kurar. Üç rol:

| Rol | Font | kullanım |
|---|---|---|
| **DISPLAY** | Georgia, "Times New Roman", serif | kapak ana başlık, her iç sayfa H2, vurgu rakamı (stat-num). Serif = "köklü, kurumsal, 25 yıl, güven" — markanın "2000'den beri" sözüne tipografik karşılık. |
| **SANS** | Arial, Helvetica, sans-serif | gövde, lead, etiket, tablo, indeks — tüm "data". Nötr/temiz/okunur. Serif ile yan yana **kontrast** yaratır. |
| **MONO-ROL (gerçek mono yok)** | Arial + `letter-spacing` geniş + UPPERCASE | koordinat etiketleri, overline, stat-lbl, spine numaraları. Flying Saucer'da mono font güvensiz; Arial'i **harf-aralığı + caps + küçük punto** ile "teknik/veri" rolüne sokarız (sahte-mono). |

> **Neden Georgia serif (v1'in hiç düşünmediği hamle):** ITSM teklifleri klişe olarak hep
> sans-serif "teknoloji" diliyle yazılır → hepsi birbirine benzer. Georgia serif başlık,
> ServiceCore'un gerçek farkını (25 yıl köklü yerli üretici, ITIL Expert kadrosu) tipografik
> olarak söyler ve doküman **anında ayrışır**. Serif sadece DISPLAY rolünde (başlık + büyük
> rakam); gövde Arial kalır → okunurluk korunur, kişilik kazanılır. Bu, "büyük sayı + accent"
> template cevabını da kırar: rakam artık **serif** ve "ölçüm değeri" gibi okunur, jenerik
> dashboard-sayısı değil.

**Tip ölçeği (px + weight + letter-spacing + case + font + renk):**

| Rol | font | px | weight | l-spacing | line-h | case | renk | kullanım |
|---|---|---|---|---|---|---|---|---|
| **display-xl (kapak H1)** | Georgia | 42 | 700 | -0.01em | 1.08 | — | `#0A1B2E` | yalnız kapak ana başlık |
| **display-sub (kapak alt)** | Georgia | 21 | 400 (italic) | 0 | 1.3 | — | `#0070F3` | kapak konu satırı — **italik** (serif italik = imza dokunuşu) |
| **H2 (sayfa başlığı)** | Georgia | 27 | 700 | -0.01em | 1.18 | — | `#0A1B2E` | her iç sayfa başlık |
| **H3 (blok başlığı)** | Arial | 15 | 700 | -0.005em | 1.25 | — | `#0A1B2E` | kart/alt bölüm başlığı |
| **H4 (mini başlık)** | Arial | 12 | 700 | 0 | 1.3 | — | `#0A1B2E` | tablo grup / callout başlık |
| **overline** | Arial | 10 | 700 | 0.24em | 1 | UPPER | `#0070F3` | başlık üstü etiket |
| **coord (koordinat)** | Arial | 9 | 700 | 0.18em | 1 | UPPER | `#0B3A8C` | **SIGNATURE** — spine/sayfa koordinat etiketi (ör. `S.04 / MODÜL`) |
| **overline-small** | Arial | 9 | 700 | 0.14em | 1 | UPPER | `#64748B` | indeks kategori mikro-başlık |
| **lead** | Arial | 13 | 400 | 0 | 1.62 | — | `#475569` | başlık altı açıklama |
| **body** | Arial | 12 | 400 | 0 | 1.58 | — | `#475569` | gövde |
| **body-strong** | Arial | 12 | 700 | 0 | 1.5 | — | `#0A1B2E` | öne çıkan satır |
| **caption** | Arial | 10 | 400 | 0 | 1.5 | — | `#64748B` | dipnot |
| **caption-cap** | Arial | 9 | 700 | 0.14em | 1.5 | UPPER | `#94A3B8` | meta etiket |
| **stat-num** | **Georgia** | 30 | 700 | -0.01em | 1 | — | `#0070F3` | büyük istatistik (serif — v1 sans'tan ayrışır) |
| **stat-lbl** | Arial | 9 | 700 | 0.12em | 1.3 | UPPER | `#64748B` | istatistik etiketi |
| **legal** | Arial | 9 | 400 (italic) | 0 | 1.6 | — | `#94A3B8` | gizlilik/şartlar |
| **run (header/footer)** | Arial | 9 | 400 | 0.06em | 1.4 | — | `#64748B` | çalışan üst/alt |
| **wordmark** | Arial | 17 | service:400 / core:700 | -0.02em | 1 | — | service:`#0A1B2E` / core:`#0070F3` | header metin logo |
| **wordmark-lg** | Arial | 26 | service:400 / core:700 | -0.03em | 1 | — | aynı | kapak metin logo |

**Tipografi kuralları (v2):**
- DISPLAY (Georgia) yalnız: kapak H1/sub, iç H2, stat-num. Başka hiçbir yerde serif YOK
  (kontrolü serif = az = imza).
- En fazla 6 boyut bir sayfada (kapak istisna). Başlık rengi `#0A1B2E` (ink). Gövde `#475569`.
- Letter-spacing: serif başlıklar hafif negatif (`-0.01em`); UPPERCASE etiketler **agresif
  pozitif** (`0.14–0.24em` — v1'den daha geniş, "teknik plaka" hissi).
- **Gradient text YOK** (Flying Saucer). Vurgu = düz `#0070F3` veya `#0B3A8C` renkli kelime.
- `display-sub` ve `legal` **italik** — Georgia italik serif, Arial italik gövde; italik =
  ölçülü imza, sadece bu iki yerde.

### 2.3 — LAYOUT (konsept + ASCII)

**Konsept (1 cümle):** Sayfa, solunda dikey bir **servis omurgası (spine)** akan bir
**mühendislik plakası**dır; içerik spine'dan sağa dökülür, her ana blok spine üzerinde renkli
bir **faset-düğümü** + **koordinat etiketi** (`S.04 / MODÜL`) ile işaretlenir.

Bu, v1'in **simetrik-ortalı-broadsheet** mimarisini kırar: artık güçlü bir **sol-hizalı dikey
eksen** + asimetrik içerik akışı var. Spine, tüm 14 sayfayı tek sisteme bağlar (orkestrasyon =
tek omurga anlatısının görsel karşılığı).

```
A4 yaprak (paper #FBFCFE)
┌──┬──────────────────────────────────────────────────┐
│▓▓│  service|core                  TEKLİF · No   ◇    │  ← çalışan header (spine üstte başlar)
│▓▓├──────────────────────────────────────────────────┤
│◆ │  KURUMSAL ORKESTRASYON PLATFORMU   ← overline     │
│▓▓│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓          │
│S │  ┃  H2 başlık (Georgia serif, ink)      ┃          │  ◆ = faset düğümü (kategori rengi)
│P │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛          │  S.04 = koordinat etiketi (dikey, coord)
│I │  lead (Arial, slate) ......................        │
│N │                                                    │
│E │  [ içerik blokları — bento / indeks / tablo ]      │  spine = 6px dikey şerit, sol kenarda
│  │                                                    │     ink zemin + faset-düğüm noktaları
│◆ │  ┌─────────┬─────────┬─────────┐                  │
│▓▓│  │ stat    │ stat    │ stat    │  ← panel zemin    │
│  │  └─────────┴─────────┴─────────┘                  │
│▓▓├──────────────────────────────────────────────────┤
│▓▓│  Firma · Telefon          Sayfa 4 / 14    ◇        │  ← çalışan footer (spine altta biter)
└──┴──────────────────────────────────────────────────┘
   ↑
 spine kolonu (~14px): ink dikey şerit + faset-düğümleri + dikey koordinat
```

**Izgara (table-tabanlı):**
- Dış iskelet: **2 kolonlu ana tablo** — sol `width:14px` (spine), sağ `width:auto` (içerik).
  Bu, tüm sayfaların ortak sarmalayıcısı.
- İçerik max genişlik: spine dahil `.sheet` ≈ `780px`, içerik kolonu padding `40px 44px`.
- İç bloklar: 2/3/4 kolon tablolar (bento 3, stat 3-4, meta 2×2) — spec'teki gibi.
- **Asimetri:** ROI sayfası 62/38 split (spec'teki 60/40 istisnası korunur, spine ile uyumlu).

### 2.4 — SIGNATURE: "Servis Omurgası + Faset Koordinat Sistemi"

> frontend-design: *"Spend your boldness in one place. Let the signature element be the one
> memorable thing, keep everything around it quiet."* Tek signature, iki bileşeni var ama tek
> kavram: **spine** (dikey omurga) + üzerindeki **faset-düğümleri/koordinatlar**.

**Ne:**
1. **Spine** — her sayfanın **sol kenarında**, header'dan footer'a kesintisiz akan dikey şerit.
   İnce ink (`#0A1B2E`) zemin (≈14px genişlik kolon, içinde 4-6px görünür çizgi).
2. **Faset-düğümleri** — spine üzerinde, o sayfanın/bloğun kategorisine ait **faset rengi**nde
   küçük kareler (6×6px). Sayfa hangi kategoriye aitse (ör. Modül = ITSM mavi, Güvenlik = ITAM
   lacivert) düğüm o renge boyanır. Hexagonal amblemin 6 faseti → 6 renk → 6 anlam.
3. **Koordinat etiketi** — spine'ın üst-başında **dikey okunan** (ya da yatay, kısıt gereği)
   teknik etiket: `S.04 / MODÜL`, `S.07 / DEĞER`. Sayfa numarasını "broşür sayfası" değil,
   "sistem koordinatı" gibi gösterir → blueprint dili.
4. **Sayfa numarası amblemi** — footer'da sayfa no'nun yanında küçük **hexagon-glyph** (amblemin
   tek-renk minik versiyonu, hosted PNG 10px) → her sayfada marka mührü.

**Neden bu brief'e ait (gerekçe):**
- **ServiceCore'un kendi sözü:** "Kurumsal **Orkestrasyon** Platformu", "tek **omurga**, tek veri
  modeli", "native entegre". Spine = bu cümlelerin birebir görsel karşılığı. Modüller bağımsız
  kutular değil, **tek omurgaya dizilmiş** — "tek platform" anlatısı görsel oluyor (E4'ü çözer).
- **Hexagonal amblem:** 6 faset zaten markada var; faset paletini ve düğüm renklerini buradan
  türetmek "soyut renk tercihi" değil, **marka geometrisinin sisteme dönüşmesi**. Logo artık
  kapakta unutulan dekor değil (E6), tüm dokümanın dilini yönetiyor.
- **Print + Flying Saucer'da yaşar:** spine = tek dış tablo sütunu (`<td width="14px"
  bgcolor>`). Düğüm = küçük renkli `<td>`/`<div>`. Koordinat = döndürülmüş değil, **dikey
  yığılmış küçük caps metin** (transform yok → harfleri alt alta `<br/>` ile dizebiliriz, ya da
  yatay bırakırız — Bölüm 5). Gradient/shadow/SVG GEREKMEZ. PDF'te kenar boyunca **fiziksel
  olarak basılı** kalır → "akılda kalan tek öğe" (frontend-design'ın istediği).
- **14 sayfayı birleştirir:** her sayfa aynı spine'ı taşır ama farklı faset rengiyle → doküman
  "tek sistem, çok modül" hisseder. Tutarlılık + ayrıştırıcılık aynı anda.

**Sınır (Chanel kuralı — "bir aksesuarı çıkar"):** Spine + düğüm + koordinat YETER. Bunun
üstüne ızgara deseni, ikon kalabalığı, ikinci renkli şerit EKLENMEZ. Spine bold; gerisi
beyaz/sakin. Bento'daki 3px top-border bile spine ile **aynı faset rengini** kullanır (iki ayrı
renk sistemi değil — tek sistem).

---

## 3. DEFAULT-KONTROL (her ekseni "seçim mi default mu" diye sınadım)

> frontend-design: *"if any part of it reads like the generic default you would produce for any
> similar page... revise that part, say what you changed and why."* Aşağıda her eksen, üç AI-default
> look'a VE v1'e karşı sınandı.

**Eksen: Genel look →** Default mı? AI default #3 (broadsheet) v1'de aynen vardı. ✅ **Değiştirildi:**
broadsheet'in ortalı-simetrik kolon mantığı yerine **sol-eksenli spine mimarisi** + asimetri.
Hairline'lar kaldı ama artık birincil yapı değil (spine birincil). **Sonuç: seçim.**

**Eksen: Hero →** Default mı? "Büyük sayı + etiket" template cevabıydı (v1). ✅ **Değiştirildi:**
kapağın tezi artık **Georgia serif başlık + koordinat bloğu + spine**; stat şeridi var ama
ikincil ve sayıları **serif** ("ölçüm değeri" hissi, dashboard-sayısı değil). **Sonuç: seçim.**

**Eksen: Renk →** Default mı? AI default #1 (cream + serif + terracotta) ve #2 (near-black + acid
accent) DEĞİL — biz beyaz/mavi'deyiz, bu brief'e doğru (kurumsal print). Ama v1'in "tek mavi"
kararsızlığı vardı. ✅ **Değiştirildi:** **ink (#0A1B2E) derinlik tonu** + faset paleti amblemden
türetildi; tonlar desature/koyu (kahve-amber, teal) → "kurumsal mürekkep". **Risk kontrolü:**
beyaz+mavi'nin kendisi default-yakını mı? Hayır — ITSM teklifi için beyaz/yazdırılabilir
**zorunlu kısıt** (A4, Flying Saucer), serbest eksen değil; serbest olan derinlik tonu + faset
sistemi, oraya karar koydum. **Sonuç: seçim.**

**Eksen: Tipografi →** Default mı? AI default #1 "high-contrast serif display" KULLANIR — bizimki
ona benziyor mu? Yüzeyde evet (serif display), ama: (a) zemin cream değil paper-beyaz, accent
terracotta değil signal-mavi → #1'in paketini taşımıyoruz; (b) serif **sadece** display+rakam,
gövde Arial → "yarı-serif" sistem, tam-serif broadsheet değil; (c) seçim gerekçesi brief'e özgü
("25 yıl köklü" → serif). Tek-Arial (v1) ise hiç karakter taşımıyordu. ✅ **Değiştirildi ve
gerekçelendirildi.** **Sonuç: seçim** (default #1'den bilinçli ayrıldım, Bölüm 2.2).

**Eksen: Yapısal öğe (numara/eyebrow/divider) →** Default mı? frontend-design: numaralı işaretler
(01/02/03) yalnız içerik gerçekten sıralıysa uygun. ✅ **Kontrol:** koordinat etiketi (`S.04`)
sayfa **sırasını** kodluyor (14 sayfalık doküman = gerçek sıra) → meşru. D8 timeline (kurulum 5
adım, sonraki adımlar 3 adım) **gerçek süreç sırası** → numaralandırma meşru. Bento/indeks
**sıralı DEĞİL** → orada numara YOK, faset rengi var (kategori sinyali). **Sonuç: seçim
(numara sadece gerçek sıra olan yerde).**

**Eksen: Signature →** Default mı? "Spine/omurga" jenerik bir tasarım klişesi mi? Dikey kenar
şeridi başka yerlerde görülür ama: (a) burada **amblem fasetleriyle renklenmiş düğümler** taşıyor
(markaya özgü), (b) **koordinat sistemi** (sistem-koordinatı dili) ekleniyor, (c) gerekçesi
ServiceCore'un kendi "orkestrasyon/omurga" sözü. Soyut bir dekor değil, **brief'in kelimelerinin
görselleşmesi**. **Sonuç: seçim.**

**Eksen: Animasyon/motion →** Print/PDF → animasyon YOK (kısıt). frontend-design: "sometimes less
is more, extra animation = AI-generated hissi". Burada sıfır animasyon **doğru** (statik baskı).
**Sonuç: kısıt + doğru karar.**

**Genel sonuç:** Her serbest eksende v1'in/üç-default'un cevabından bilinçli ayrıldım. Tek
"riskli" hamle (Georgia serif), default #1'e yüzeyde benziyor ama paketi + gerekçesi farklı —
frontend-design'ın "justify edebileceğin tek risk" tanımına uyuyor.

---

## 4. ASCII WIREFRAME — Kapak + Modül Vitrini (v2)

> Her blok signature ile ilişkisi `◆`/`[SPINE]`/`[FASET]`/`[COORD]` ile işaretli.

### 4.1 — KAPAK (Sayfa 1)

```
┌──┬───────────────────────────────────────────────────────┐
│▓▓│ service|core              TEKLİF · ${No}        ⬡       │ header (run) + ⬡ hexagon-glyph
├──┼───────────────────────────────────────────────────────┤
│◆ │                                  ┌────────────────────┐ │ ◆ kapak faset düğümü = ITSM mavi [FASET]
│  │                                  │ KURUMA ÖZEL ·       │ │ pill (mist zemin) sağ-üst
│S │                                  │ CONFIDENTIAL        │ │
│.│                                   └────────────────────┘ │
│0 │                                                         │
│1 │   ⬡  service|core   (wordmark-lg, amblem 36px sol)      │ amblem + wordmark SOL-HİZALI
│  │                                                         │ (v1 ortalı → v2 sol-eksen, spine ile)
│[ │   KURUMSAL ORKESTRASYON PLATFORMU   ← overline (signal) │
│C │                                                         │
│O │   ${Account Name}        ← display-xl (Georgia 42, ink) │ ← HERO TEZİ: serif başlık
│O │   ${Subject} Teklifi     ← display-sub (Georgia italic) │   [COORD: spine'da "S.01" hizalı]
│R │                                                         │
│D │   ──────────────────────────────────────────────────   │ hairline (rule)
│] │                                                         │
│  │   ┌──────────────┬──────────────┐                      │
│◆ │   │ TEKLİF NO    │ TEKLİF TARİHİ│  ← meta kart (D4)     │ 2×2, rule border, panel YOK (beyaz)
│  │   │ ${No}        │ ${Created}   │                      │
│  │   ├──────────────┼──────────────┤                      │
│  │   │ SON GEÇERLİK │ YETKİLİ      │                      │
│  │   │ ${Valid}     │ ${Contact}   │                      │
│  │   └──────────────┴──────────────┘                      │
│  │                                                         │
│◆ │   ┌────┬────┬────┬────┬────┐                            │ stat şeridi (D2) — 5 hücre
│  │   │2000│30+ │4M+ │ITIL│7/24│  ← stat-num GEORGIA serif  │ panel zemin, sayılar SERİF [FASET-bağ]
│  │   │beri│MODÜ│KULL│ 4  │DEST│  ← stat-lbl Arial caps     │ (v1 sans → v2 serif: ayrışma)
│  │   └────┴────┴────┴────┴────┘                            │
│  │                                                         │
│  │   ── hairline ──                                        │
│  │   Sınıflandırma: Kuruma Özel — Confidential (H4)        │
│  │   ${...} legal italik gizlilik metni (faint)            │
├──┼───────────────────────────────────────────────────────┤
│▓▓│ Firma · Telefon · sales@...        Sayfa 1 / 14   ⬡     │ footer + hexagon-glyph
└──┴───────────────────────────────────────────────────────┘
```

**Kapak signature bağı:** spine sol kenarda; üst düğüm = ITSM-mavi faset (kapak ana kategori);
spine başında dikey/yığık koordinat `S.01`; hero **sol-hizalı** (v1 ortalı'dan kopuş, spine
eksenine yaslı); stat sayıları **Georgia serif** (template "dashboard sayısı"ndan ayrışma);
footer'da hexagon-glyph mührü.

### 4.2 — MODÜL VİTRİNİ (Sayfa 4)

```
┌──┬───────────────────────────────────────────────────────┐
│▓▓│ service|core              TEKLİF · ${No}        ⬡       │ header
├──┼───────────────────────────────────────────────────────┤
│◆ │  S.04 / ÜRÜN PLATFORMU   ← [COORD] (coord, signal-deep) │ ◆ düğüm = ITSM mavi [FASET]
│  │  ÜRÜN PLATFORMU          ← overline (signal)            │
│S │  Tek platformda 30+ entegre modül.  ← H2 Georgia serif  │ [SPINE eksenine yaslı sol-hizalı]
│.│   lead (Arial slate, 1-2 cümle) ...................      │
│0 │                                                         │
│4 │  ┌────┬────┬────┬────┐                                  │ stat şeridi (D2) 4 hücre
│  │  │30+ │8+  │Nati│ITIL│  ← stat-num GEORGIA              │ panel zemin
│  │  │MODÜ│KATE│ENTE│ 4  │                                  │
│  │  └────┴────┴────┴────┘                                  │
│  │                                                         │
│◆ │  ── BENTO (D3) — 6 modül, FASET RENKLİ top-border ──    │ HER kart top-border + nokta = faset
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐                    │ rengi (spine düğümüyle AYNI sistem)
│  │  │▔F1 ITSM │ │▔F3 ITIL4│ │▔F2 ITAM │  ▔=3px faset şerit │ [FASET: her kartın kategorisi
│  │  │ Hizmet  │ │ Olay/Pr.│ │ Varlık  │                    │  spine fasetiyle aynı renk]
│  │  │ Masası  │ │ /Değiş. │ │ /Disc.  │                    │
│  │  └─────────┘ └─────────┘ └─────────┘                    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐                    │
│  │  │▔F5 Proje│ │▔F5 ESM  │ │▔F4 Otom.│                    │
│  │  │ Agile/  │ │ Feder.  │ │ İş Akışı│                    │
│  │  │ SDLC    │ │ Engine  │ │         │                    │
│  │  └─────────┘ └─────────┘ └─────────┘                    │
│  │                                                         │
│◆ │  Platformun tamamı — tek lisans, tek arayüz (idx-title) │
│  │  ┌──────────┬──────────┬──────────┐                     │ indeks (D5) 3 kolon
│  │  │·ITSM ÇEK.│·ITAM·ITIL│·ESM·OTOM.│ ← kategori başlık   │ her kolon başı küçük faset-noktası
│  │  │■ Hizmet  │■ Varlık  │■ ESM      │ ■=faset kare-nokta │ [FASET: nokta rengi = kolon kat.]
│  │  │■ Olay    │■ Discovery│■ Federat.│   (3 kolon=3 faset)│
│  │  │■ Problem │■ ServisK.│■ Otomasy. │                    │
│  │  │ ...(10)  │ ...(10)  │ ...(9)    │                    │
│  │  └──────────┴──────────┴──────────┘                     │
│  │                                                         │
│  │  ┌─────────────────────────────────────────────────┐   │ callout (D6) — TEK renkli dolgu
│  │  │▌ Her modül native entegre çalışır — tek veri     │   │ ▌=3px sol faset(ITSM) border
│  │  │  modeli, tek arayüz, tek lisans.  (body-strong)  │   │ panel zemin (sayfanın tek vurgusu)
│  │  └─────────────────────────────────────────────────┘   │
├──┼───────────────────────────────────────────────────────┤
│▓▓│ Firma · Telefon               Sayfa 4 / 14      ⬡       │ footer
└──┴───────────────────────────────────────────────────────┘
```

**Modül signature bağı:** spine + ITSM-mavi sayfa-düğümü + koordinat `S.04 / ÜRÜN PLATFORMU`;
bento kartlarının her top-border'ı + indeks nokta-kareleri **spine fasetiyle aynı 6-renk
sistemini** kullanıyor (iki ayrı renk sistemi değil, tek faset dili — E3+E4 çözümü); stat
sayıları serif; tek renkli dolgu = kapanış callout (premium disiplin).

---

## 5. KISIT-UYUM (her seçim Flying Saucer'da NASIL gerçekleşir)

> Hiçbiri uygulanamaz değil. Her satır = builder'ın kullanacağı teknik.

| v2 seçimi | Flying Saucer tekniği | uygulanabilir? |
|---|---|---|
| **Spine (dikey ink şerit)** | Dış sarmalayıcı **2-kolon tablo**: `<td width="14" bgcolor="#0A1B2E" valign="top">` + sağ `<td>` içerik. `bgcolor` attribute (CSS3 gerekmez), literal hex. | ✅ |
| **Faset-düğümleri (renkli kareler)** | Spine `<td>` içinde küçük `<div>` ya da iç `<table>`: `width:6px;height:6px;background:#0070F3;font-size:0;line-height:0;`. Kategori başına farklı `background` literal hex. | ✅ |
| **Koordinat etiketi (dikey)** | transform/rotate YOK. İki seçenek: (a) **yatay** küçük caps blok başlık üstünde (`coord` sınıfı) — EN GÜVENLİ, önerilen; (b) dikey istenirse harfleri `<br/>` ile alt alta tek-karakter yığ (`S<br/>.<br/>0<br/>4`) — çalışır ama kırılgan. **Karar: yatay coord** (`S.04 / MODÜL`) başlık bloğunun üstünde. | ✅ |
| **ink başlık rengi (#0A1B2E)** | literal hex `color:#0A1B2E`. | ✅ |
| **Faset paleti (6 kategori rengi)** | 6 literal hex; `.cat-f1..f6` + `.bd-f1..f6` (top-border) + `.node-f1..f6` (düğüm). `rgba` yok, hepsi solid. | ✅ |
| **paper zemin (#FBFCFE)** | `.sheet { background:#FBFCFE; }` literal hex. body `#EEF2F6` korunur (önizleme). | ✅ |
| **Georgia serif display/H2/stat-num** | `font-family: Georgia, "Times New Roman", serif;` — Georgia web-safe, PDF/Flying Saucer'da bulunur. Bulunmazsa Times fallback (yine serif, karakter korunur). | ✅ |
| **Arial sans gövde** | `font-family: Arial, Helvetica, sans-serif;` mevcut. | ✅ |
| **sahte-mono (coord/overline geniş caps)** | Arial + `letter-spacing:0.18em; text-transform:uppercase; font-size:9px;`. Gerçek mono font YOK; aralık+caps "teknik" hissi verir. | ✅ |
| **serif italik (display-sub, legal)** | `font-style:italic;` Georgia/Arial italik web-safe. | ✅ |
| **hexagon-glyph (footer mührü)** | hosted PNG (`https://<ALAN>/teklif/symbol.png`), `<img height="10" />`. SVG değil PNG. (`assets/logo.png` zaten amblem; tek-renk minik versiyon `symbol.png` hazırlanır — README'de zaten planlı.) | ✅ |
| **bento 3px faset top-border** | `<td style="border-top:3px solid #0F766E;">` literal hex, kategoriye göre. CSS2.1 border. | ✅ |
| **indeks faset kare-nokta** | `<span>` `width:5px;height:5px;background:#0F766E;display:inline-block;` kategori rengi. | ✅ |
| **stat panel zemin** | `<td bgcolor="#F4F7FB">` ya da `background:#F4F7FB`. | ✅ |
| **callout 3px sol faset border** | `border-left:3px solid #0070F3; background:#F4F7FB;` | ✅ |
| **asimetri 62/38 (ROI)** | `<td width="62%">` + `<td width="38%">`. | ✅ |
| **köşeler KARE** | `border-radius` HİÇ kullanılmaz (mevcut karar korunur). | ✅ |
| **sayfa kırma / spine her sayfada** | her `.sheet` kendi 2-kolon spine tablosunu içerir; `page-break-before:always`. Spine içerik-tablosunun parçası olduğu için her sayfada tekrar eder (footer/header gibi ayrı container değil — sayfa-içi). | ✅ |
| **Türkçe entity** | tüm Türkçe harfler `&#305;` vb. (spec Bölüm 0 kuralı). | ✅ |

**Tek dikkat:** Georgia tüm Zoho sunucu ortamlarında %100 garanti değil; fallback `"Times New
Roman", serif` zinciri **serif karakteri korur** (sans'a düşmez). Builder test PDF'inde
serif-render doğrulamalı (README adım 5). Düşerse Times yine serif → yön bozulmaz.

---

## 6. v1 → v2 DEĞİŞİM LİSTESİ (builder'ın uygulayacağı somut maddeler)

> Yapı/kopya `tasarim-spec.md`'den AYNEN gelir. Aşağıdakiler **sadece görsel dil** değişikliği.
> Builder bu listeyi tek tek uygular; spec'in 8 desen kütüphanesi (D1–D8) korunur, sadece
> stillenmesi değişir.

**G1 — Dış iskelete spine kolonu ekle.** Her `.sheet` içeriğini 2-kolon tabloyla sar:
sol `<td width="14" bgcolor="#0A1B2E">` (spine) + sağ içerik. İçerik padding `.sheet` yerine
sağ `<td>`'ye taşınır (`padding:40px 44px 36px 40px`).

**G2 — Faset palet sistemini kur (tek renk sistemi).** v1'in dağınık kategori renklerini
(`c-emerald/c-bluedark/...`) **6 faset sınıfına** birle: `.f1`(ITSM #0070F3) `.f2`(ITAM #0B3A8C)
`.f3`(ITIL4 #0F766E) `.f4`(Otom #B45309) `.f5`(ESM/Proje #6D28D9) `.f6`(Platform #0E7490). Her
faset 3 varyant üretir: top-border (`.bd-fN`), düğüm/nokta zemini (`.node-fN`/`.dot-fN`), etiket
zemini (`.cat-fN`). v1 turuncu `#EA580C`→`#B45309`, emerald→teal `#0F766E` (desature/kurumsal).

**G3 — Spine düğümü + koordinat etiketi ekle (SIGNATURE).** Her sayfanın spine'ında 2-3 nokta:
en üstte sayfa-kategorisi fasetinde 6×6px düğüm. Başlık bloğunun ÜSTÜNE `coord` etiketi:
`S.01 / KAPAK`, `S.04 / ÜRÜN PLATFORMU` vb. (overline'ın üstünde, signal-deep `#0B3A8C`, 9px,
0.18em caps). 14 sayfa koordinatı: S.01 Kapak · S.02 Yönetici Özeti · S.03 Mevcut Durum ·
S.04 Ürün Platformu · S.05 Fark Yaratan · S.06 Güvenlik · S.07 Değer · S.08 Lisanslama ·
S.09 Kurulum · S.10 Destek · S.11 Referanslar · S.12 Sonraki Adımlar · S.13 Şartlar · S.14 Ekler.

**G4 — Renk paletini güncelle.** `#0F172A`→`#0A1B2E` (ink, tüm başlık). Zemin: `.sheet`
`#FFFFFF`→`#FBFCFE` (paper). Panel zemin `#F8FAFC`→`#F4F7FB`. Mavi-açık `#EAF3FF`→`#EAF1FB`.
Hairline `#E2E8F0`→`#DCE3EC`. (body önizleme zemini `#EEF2F6` kalır.)

**G5 — Tipografiyi serif/sans sistemine çevir.** YENİ `.display` / H2 / `.stat-num` sınıflarına
`font-family:Georgia,"Times New Roman",serif`. Gövde/etiket/tablo Arial KALIR. `display-sub` ve
`legal` `font-style:italic`. Boyut güncellemeleri: cover-title 40→42, h2 26→27, stat-num 26→30,
wordmark-lg 30→26, wordmark 18→17 (Bölüm 2.2 tablosu kesin değerler).

**G6 — Hero'yu sol-hizala (kapak).** v1 ortalı hero (`align="center"`) → **sol-hizalı**
(`align="left"`), spine eksenine yaslı. Amblem 40→36px, sol-üstte (ortada değil). wordmark-lg
sol. (E7 asimetri + spine uyumu.)

**G7 — Stat sayılarını serif yap.** `.stat-num` `font-family:Georgia` + 26→30px. "Dashboard
sayısı" hissinden "ölçüm değeri" hissine geçer (template hero kırılır). stat-lbl Arial caps kalır.

**G8 — Bento + indeks fasete bağla.** Bento top-border'ları `.bd-fN`, etiket zeminleri `.cat-fN`
(yeni 6-faset sistemi). İndeks kategori başlıklarına küçük faset kare-nokta (`.dot-fN`, kolonun
kategorisinde). v1'in eski kategori sınıfları silinir, faset sistemine taşınır.

**G9 — UPPERCASE etiket aralığını genişlet.** overline 0.22em→0.24em; yeni `coord` 0.18em;
caption-cap/stat-lbl 0.08–0.12em→0.12–0.14em. "Teknik plaka" hissi (Bölüm 2.2).

**G10 — Footer'a hexagon-glyph ekle.** Sayfa no'nun yanına `<img src=".../symbol.png"
height="10" />` (tek-renk minik amblem). Header'da wordmark zaten var; footer'a mühür eklenir.
(`symbol.png` README'de planlı; yoksa builder mevcut `logo.png`'yi küçük kullanır, açık madde.)

**G11 — Spacer ritmini koru, tek değişiklik:** spec'teki spacer standardı (xs12/s20/m32/l56)
AYNEN. v2 yeni spacer eklemez — sadece spine + tipografi + renk değişir. Sakinlik korunur
(Chanel kuralı: bir aksesuar ekledik=spine, başka eklemiyoruz).

**G12 — Premium disiplin kuralı sıkılaşır.** Sayfa başına EN FAZLA 1 renkli dolgu (callout veya
CTA). Spine ink'tir (renkli dolgu sayılmaz, yapısal). Faset renkleri yalnız: spine düğümü +
3px şerit + 5px nokta + mini etiket zemini. Gövde/başlık ASLA faset rengi almaz (ink/slate kalır).

---

## 7. BUILDER İÇİN HIZLI BAŞVURU (CSS sınıf havuzu — v1'den devral + ekle)

> Tek `<style>` bloğu. v1 sınıflarını GÜNCELLE (renk/font), YENİ olanları ekle. 32K limiti:
> tekrar inline yok, sınıf paylaşımı.

**Güncellenen (v1→v2):** `.cover-title` (Georgia 42, ink) · `.cover-sub` (Georgia italic 21) ·
`.h2` (Georgia 27, ink) · `.overline` (0.24em) · `.stat-num` (Georgia 30) · `.lead/.body`
(slate, renk aynı) · `.wm/.wm-lg` (ink "service") · `.sheet` (paper bg) · `.stats td/.stats5 td`
(panel bg) · `.pill/.cat` (mist bg) · `.hairline` (rule) · `.callout-band` (panel bg + faset
sol-border) · `.bento td` (rule border) · `.idx-item .dot` (faset).

**Yeni:** `.spine-cell` (`width:14px;background:#0A1B2E;`) · `.node-f1..f6`
(`6px×6px` faset kare) · `.coord` (9px, signal-deep, 0.18em caps) · `.f1..f6` faset renk
değişkenleri → `.bd-f1..f6` (border-top) + `.cat-f1..f6` (etiket zemin) + `.dot-f1..f6` (nokta) ·
`.display` (Georgia serif jenerik sınıf) · `.hexglyph` (footer img sarmalayıcı).

**Silinecek (faset sistemine taşındı):** v1'in `.c-emerald/.c-bluedark/.c-purple/.c-orange/
.c-cyan` + `.cat.c-*` varyantları → `.f1..f6` + `.bd/cat/dot-f1..f6` ile değiştirilir.

---

## 8. ÖZET — Builder'a tek mesaj

v1 "broadsheet default + büyük-sayı template + tek-mavi kararsızlık"tı. v2 dört kararla ayrışır:
(1) **spine** (sol dikey omurga = orkestrasyon anlatısı, signature), (2) **faset paleti** (amblemin
6 fasetinden türeyen, anlam taşıyan kategori sistemi), (3) **Georgia serif display + Arial sans
data** (köklü-kurumsal tipografik kişilik), (4) **ink mürekkep tonu + paper soğuk-beyaz**
(tek-mürekkep blueprint hissi). Boldness tek yerde: **spine + faset düğüm/koordinat**. Gerisi
beyaz, sakin, nefes alan. Yapı/akış/kopya `tasarim-spec.md`'den değişmeden gelir; bu doküman
sadece o yapının **nasıl göründüğünü** yeniden tanımlar.
