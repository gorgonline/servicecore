# ServiceCore Zoho Teklif — Tasarım Spec (Tek Kaynak)

> Bu doküman, ana Claude'un Zoho-güvenli HTML implementasyonunun **tek kaynağıdır**.
> Tasarım dilini designer (bu ajan) sahiplenir; ana Claude bu spec'e göre kod yazar.
> Çıktı: beyaz/açık zemin, A4-yazdırılabilir, premium/kurumsal, çarpıcı ama boğulmayan az-öz metin.
> Render motoru: Zoho Flying Saucer = XHTML + CSS 2.1. KISIT bölümünü ihlal eden hiçbir şey yazılmaz.

---

## 0. DEĞİŞMEZ TEKNİK KISITLAR (her sayfaya uygulanır)

Flying Saucer = tarayıcı değil. Şunlar **YOK** ve kullanılmaz:
`flexbox` · `grid` · `var()` · `linear-gradient`/`radial-gradient` · `box-shadow` · `transform` · `:hover` · `:nth-child` · `:first-child`/`:last-child` · `@media` · animasyon/transition · `border-radius` (kısmen riskli — KÖŞELER KARE, yuvarlatma KULLANMA) · `rgba()` (riskli — literal hex + ayrı katman kullan) · SVG görsel · web font (Geist render OLMAZ).

**Bunun yerine:**
- Layout = iç içe `<table>` (her sütun bir `<td>`, genişlik `width="%"` ile).
- Renk = literal hex (`#0070F3` gibi), `rgba` yok. Şeffaflık gerekirse açık ton hex kullan (örn. mavi %8 zemin = `#EAF3FF`).
- Gölge/derinlik = `box-shadow` yerine **1px hairline border** + **açık zemin tonu** + **3px accent üst-şerit** (top-border).
- Yuvarlak köşe = YOK. Tüm kutular keskin köşe. (Örnek dosya zaten köşesiz — bunu KORU, premium-print için doğru karar.)
- Font = `Arial, Helvetica, sans-serif`. Mono yok. Türkçe glyph sorunsuz (Arial Türkçe destekler).
- Görsel = mutlak HTTPS PNG. `assets/...` göreli yol sadece tarayıcı önizleme için; Zoho'da find/replace ile `https://<ALAN-ADI>/teklif/...` olur.
- Wordmark = METİN (`service` koyu `#1E293B` normal + `core` mavi `#0070F3` bold). Görsel değil.
- Gövde 32.000 karakter limiti → görseller base64 DEĞİL, paylaşılan CSS sınıfları, tekrar eden inline stil yok.
- Sayfa kırma: `page-break-before:always` (yeni sayfa), `page-break-inside:avoid` (kutu bölünmesin).
- İskelet: `header-container` (çalışan üst) / `page-container` > `pdfgen-content` (içerik) / `footer-container` (çalışan alt, sayfa no).

**Türkçe karakter kuralı (HTML entity):** Flying Saucer'da güvenli olması için Türkçe harfleri HTML entity ile yaz (örnek dosyadaki gibi): `ı`=`&#305;` `İ`=`&#304;` `ş`=`&#351;` `Ş`=`&#350;` `ğ`=`&#287;` `Ğ`=`&#286;` `ç`=`&#231;` `Ç`=`&#199;` `ö`=`&#246;` `Ö`=`&#214;` `ü`=`&#252;` `Ü`=`&#220;`. (Bu spec'te kopyalar okunur Türkçe yazılı; HTML'e geçerken entity'le.)

---

## 1. MEVCUT 2 ÖRNEK SAYFA KRİTİĞİ

Önizleme görseli (`teklif/onizleme.png`) + kaynak HTML üzerinden somut değerlendirme. Her madde Flying Saucer + print kısıtı içinde **uygulanabilir**.

### 1.A — KORU (doğru kararlar, bozma)

1. **Köşesiz kutular** — yuvarlatma yok; Flying Saucer için doğru, premium-print için temiz. Korunacak temel karar.
2. **Tek accent disiplini (#0070F3)** — sayfada tek vurgu rengi var, renk enflasyonu yok. Bu premium algının çekirdeği.
3. **Çalışan header/footer** — logo amblemi + metin wordmark + sağda `TEKLİF · No`, altta firma+telefon+sayfa no. Yapı doğru, dokunma.
4. **Meta kart 2×2** — Teklif No / Tarih / Geçerlilik / Yetkili düzeni temiz ve okunur. Korunacak.
5. **Overline → başlık → lead ritmi** — mavi overline (0.22em tracking) + koyu başlık + gri lead. Tipografik hiyerarşi sağlam.
6. **3px mavi top-border kart** (bento) — gölgesiz derinlik hissi veren doğru teknik. Korunacak ama renklendirilecek (aşağıda).
7. **Hairline ayraçlar** (`#E2E8F0`, 1px) — bölüm ayırma için doğru, gölgesiz/sade. Korunacak.
8. **Gizlilik bloğu** (italik, küçük, gri) — kurumsal/legal doğru ton. Korunacak.

### 1.B — DEĞİŞTİR (somut, uygulanabilir)

1. **Kapak hero "yüzüyor" — dikey ritmi sıkılaştır.**
   Sorun: hero bloğu (logo+wordmark+başlık) sayfa ortasında, üstte çift `spacer-l` (112px) boşluk var, ağırlık merkezi kayıyor.
   Çöz: üst boşluğu `spacer-l` (56px) tek bırak; hero'yu sayfanın **üst-orta üçlüğüne** otur. Wordmark amblemi `48px` → `40px` (Apple-style minimalizm: logo ≤ ~48px; print'te 40px daha rafine). Başlık `cover-title` 40px korunur ama üst boşluk azalır.

2. **Trust şeridi zayıf — "istatistik şeridi"ne yükselt.**
   Sorun: kapakta trust değerleri sadece dikey çizgi-ayraçlı tek satır, görsel ağırlığı yok; modül sayfasındaki güçlü stat-kutu deseni varken kapak ondan zayıf kalıyor.
   Çöz: kapağı da modül sayfasındaki **stat-num/stat-lbl kutu deseni** ile hizala — `#F8FAFC` zeminli, 1px borderlı, büyük mavi sayı (`26px`) + küçük uppercase etiket. Tutarlılık + ağırlık kazanır. (Aşağıda "İstatistik şeridi" deseni tek standart olarak tanımlı.)

3. **Bento kartları tek-tip — kategori-renk sistemi getir (ÖLÇÜLÜ).**
   Sorun: 6 bento kartının hepsi aynı mavi top-border + aynı gri "cat" etiket; ITSM/ITAM/Proje/ESM/Otomasyon ayrımı görsel olarak okunmuyor, monoton.
   Çöz: **top-border rengini kategoriye göre değiştir** (mavi/cyan/mor/yeşil/turuncu — `#0070F3` ana ton, diğerleri tokens accent literal hex'leri). "cat" etiket zemini de aynı kategori-açık-tonu alır. ÖNEMLİ KISIT: tek accent disiplini bozulmasın diye gövde başlık/metin **her zaman koyu/gri** kalır, sadece 3px şerit + minik etiket renklenir. Renk = kategori sinyali, dekorasyon değil.

4. **İndeks listesi çok yoğun — nefes ver + kategori başlığı.**
   Sorun: 29 modül 3 kolonda `line-height:1.9` ile sıkışık; "Platformun tamamı" başlığı tek satır, gruplama yok.
   Çöz: indeks `line-height` 1.9 → 2.0; kolon başına 10 madde dengesi korunur ama her kolona küçük **kategori üst-başlığı** (ITSM · ITAM/ITIL4 · Otomasyon & Platform gibi) eklenir — overline-small stiliyle. Daha taranabilir.

5. **Kapanış satırı zayıf — vurgu kartına çevir.**
   Sorun: "Her modül native entegre çalışır" tek satır, hairline altında kayıp.
   Çöz: bu satırı `#F8FAFC` zeminli + 3px mavi sol-border'lı **vurgu bandı** (callout) yap; mesaj öne çıksın.

6. **Boşluk ritmi standardı yok — spacer ölçeğini sabitle.**
   Sorun: `spacer-s/m/l` (20/32/56px) var ama kullanım tutarsız (kapakta çift-l, modülde tek-m).
   Çöz: aşağıdaki "Boşluk ritmi" tablosunu **tek standart** yap: bölüm-arası `32px`, başlık-altı `12px`, kart-içi `16px`, sayfa-üstü `20px`. Tüm 14 sayfa buna uyar.

7. **`rgba()` ve gradient riski — tamamen literal hex'e geç.**
   Sorun: örnek genelde temiz ama tam sürümde gradient/rgba kaçağı olmamalı.
   Çöz: tüm zeminler literal hex (`#FFFFFF`, `#F8FAFC`, `#EAF3FF`, `#0070F3`). Mavi-açık zemin = `#EAF3FF`, mavi-border-açık = `#CCE2FF`, nötr zemin = `#F8FAFC`, hairline = `#E2E8F0`.

8. **Logo amblemi boyutu — header'da küçült.**
   Sorun: çalışan header logo 20px iyi; ama kapakta 48px büyük duruyor.
   Çöz: kapak amblemi `40px`, header amblemi `20px` (mevcut), footer'da amblem yok (sadece metin). Apple-style: amblem hiçbir yerde ~48px'i aşmaz.

---

## 2. PRINT TASARIM SİSTEMİ (web-safe, tokens-türevi)

> tokens.json koyu-tema runtime için. Burada **print/beyaz-zemin web-safe karşılığı** tanımlanır.
> Koyu tema → beyaz tema eşleme mantığı: yüzeyler ters çevrilir (koyu→beyaz/açık-gri), metin ters çevrilir (beyaz→koyu-slate), accent #0070F3 **aynen** korunur (marka çekirdeği).

### 2.1 — Tipografi ölçeği (Arial/Helvetica, px + weight + letter-spacing)

| Rol | px | weight | letter-spacing | line-height | renk | kullanım |
|---|---|---|---|---|---|---|
| **cover-title (H1)** | 40 | 700 | -0.02em | 1.1 | `#0F172A` | sadece kapak ana başlık |
| **cover-sub** | 22 | 400 | -0.01em | 1.3 | `#0070F3` | kapak alt başlık (konu) |
| **H2 (sayfa başlığı)** | 26 | 700 | -0.02em | 1.2 | `#0F172A` | her iç sayfa ana başlık |
| **H3 (blok başlığı)** | 16 | 700 | -0.01em | 1.25 | `#0F172A` | kart başlığı, alt bölüm |
| **H4 (mini başlık)** | 13 | 700 | 0 | 1.3 | `#0F172A` | tablo grup başlığı, callout başlık |
| **overline** | 11 | 700 | 0.22em | 1 | `#0070F3` | UPPERCASE üst-etiket (başlık üstü) |
| **overline-small** | 9 | 700 | 0.12em | 1 | `#64748B` | UPPERCASE kategori mikro-başlık |
| **lead** | 13 | 400 | 0 | 1.6 | `#475569` | başlık altı açıklama (1-2 cümle) |
| **body** | 12 | 400 | 0 | 1.55 | `#475569` | gövde metni, madde açıklaması |
| **body-strong** | 12 | 700 | 0 | 1.5 | `#0F172A` | öne çıkan satır, etiket-değer |
| **caption** | 10 | 400 | 0 | 1.5 | `#64748B` | dipnot, yardımcı metin |
| **caption-bold** | 10 | 700 | 0.12em | 1.5 | `#94A3B8` | UPPERCASE etiket (meta lbl) |
| **stat-num** | 26 | 700 | -0.02em | 1 | `#0070F3` | büyük istatistik sayısı |
| **stat-lbl** | 10 | 700 | 0.08em | 1.3 | `#64748B` | UPPERCASE istatistik etiketi |
| **legal** | 10 | 400 (italik) | 0 | 1.6 | `#94A3B8` | gizlilik/şartlar ince metin |
| **run (header/footer)** | 10 | 400 | 0.04em | 1.4 | `#64748B` | çalışan üst/alt bilgi |
| **wordmark** | 18 | service:400 / core:700 | -0.02em | 1 | service:`#1E293B` / core:`#0070F3` | metin logo (header) |
| **wordmark-lg** | 30 | service:400 / core:700 | -0.03em | 1 | aynı | kapak metin logo |

**Tipografi kuralları (print):**
- En fazla **6 farklı boyut** bir sayfada (görsel sakinlik). Kapak istisnası: cover-title + cover-sub + meta + stat.
- Başlık rengi her zaman `#0F172A` (koyu slate). İstisna: kapak alt-başlık ve overline `#0070F3`.
- Gövde rengi her zaman `#475569`. Açıklamalarda `#64748B` (muted) ikincil.
- Letter-spacing: başlıklar negatif (`-0.02em`), UPPERCASE etiketler pozitif (`0.12em–0.22em`).
- **Gradient text YOK** (Flying Saucer). Marka vurgusu = düz `#0070F3` renkli kelime (`.accent` sınıfı).

### 2.2 — Renk paleti (beyaz-zemin, literal hex)

**Yüzeyler (koyu-tema → beyaz-tema eşlemesi):**
| Token (koyu) | Print karşılığı | hex | kullanım |
|---|---|---|---|
| surface.base `#010E21` | sayfa zemini | `#FFFFFF` | A4 yaprak zemini |
| surface.elevated | nötr kart zemini | `#F8FAFC` | stat kutu, callout, vurgu bandı |
| (yok) | sayfa-dışı zemin | `#EEF2F6` | tarayıcı önizleme arka plan (body) |
| primary %5-8 | mavi-açık zemin | `#EAF3FF` | kategori etiket zemini, mavi callout |

**Metin (ters çevrilmiş):**
| Token (koyu) | Print karşılığı | hex |
|---|---|---|
| text.primary `#FFFFFF` | başlık | `#0F172A` |
| text.secondary `#94A3B8` | gövde | `#475569` |
| text.muted `#64748B` | yardımcı | `#64748B` |
| text.dim `#475569` | dipnot | `#94A3B8` |
| text.brand `#0070F3` | marka vurgu | `#0070F3` (değişmez) |

**Border (alfa → literal):**
| Rol | hex | kullanım |
|---|---|---|
| hairline | `#E2E8F0` | bölüm ayracı, kart border, tablo çizgisi |
| hairline-soft | `#EEF2F6` | iç tablo satır ayracı (daha açık) |
| accent-border | `#0070F3` | 3px top/left vurgu şeridi |
| accent-border-soft | `#CCE2FF` | mavi callout/pill border |

**Kategori accent (sadece 3px şerit + mini etiket — gövde değil):**
ÖLÇÜLÜ kullan. tokens accent base'lerinin print-güvenli literal hex'i + açık-zemin tonu:
| Kategori | şerit hex | etiket-zemin hex | tokens kaynak |
|---|---|---|---|
| ITSM / ana | `#0070F3` | `#EAF3FF` | brand.primary |
| ITAM | `#2563EB` | `#E8EEFE` | accent.blue.dark |
| ITIL4 | `#059669` | `#E7F6F1` | accent.emerald.dark |
| Otomasyon | `#EA580C` | `#FDEEE6` | accent.orange.dark |
| ESM / Proje | `#9333EA` | `#F3E9FC` | accent.purple.dark |
| Analiz / Platform | `#0891B2` | `#E5F6FA` | accent.cyan.dark |

**ACCENT KULLANIM KURALI (kritik — premium algının korunması):**
- **Accent (#0070F3) NEREDE kullanılır:** overline etiketleri, stat sayıları, başlıktaki tek vurgu kelimesi (`.accent`), 3px top-border, CTA kutusu zemini, kapak top-bar (5px), kategori şeritleri (ölçülü).
- **Accent NEREDE KULLANILMAZ:** gövde metni rengi olarak, geniş zemin doldurmada (büyük mavi bloklar YOK — kurumsal/print için ağır görünür), birden fazla rakip vurgu olarak aynı blokta. Renk = sinyal, dolgu değil.
- **Bir sayfada en fazla 1 "renkli dolgu" alanı** (CTA kutusu veya tek vurgu bandı). Geri kalan beyaz/açık-gri kalır → premium nefes.

### 2.3 — Boşluk / ızgara ritmi (tek standart, 8px tabanlı)

| Token | px | kullanım |
|---|---|---|
| spacer-xs | 12 | başlık ↔ lead arası, kart-içi başlık ↔ metin |
| spacer-s | 20 | sayfa-üstü (topbar sonrası), küçük blok arası |
| spacer-m | 32 | bölüm ↔ bölüm arası (varsayılan ritim) |
| spacer-l | 56 | kapakta büyük nefes (hero üstü/altı), bölüm grubu arası |
| kart-padding | 16 | bento/stat/callout iç dolgu |
| kart-padding-lg | 18 | meta kart, büyük kutu iç dolgu |
| tablo-hücre-y | 14 | meta/fiyat tablo satır dikey dolgu |
| tablo-hücre-x | 18 | meta/fiyat tablo satır yatay dolgu |

**Izgara (table-tabanlı kolon sistemi):**
- Sayfa içeriği: `.sheet` max-width `760px`, padding `44px 48px 40px 48px`.
- 2 kolon: `width="50%"` + `width="50%"` (meta kart, split bloklar).
- 3 kolon: `width="33.33%"` ×3 (bento, indeks, ekip kartları). Bento'da `border-spacing:12px` (separate).
- 4 kolon: `width="25%"` ×4 (stat şeridi).
- Kolon-arası boşluk: `border-spacing:12px` (separate tablo) VEYA hücre `padding-right:14px` (collapse tablo).
- **Asimetri izni:** ROI/değer sayfasında 60/40 split (`width="60%"`+`width="40%"`) — monotonluğu kıran tek istisna.

### 2.4 — Hairline / çizgi stili

- **Tam-genişlik ayraç:** `height:1px; background:#E2E8F0; font-size:0; line-height:0;` (gradient YOK, düz çizgi).
- **3px accent top-border:** kart `<td>` üstünde `border-top:3px solid #0070F3;` (kategoriye göre renk).
- **3px accent left-border:** callout/vurgu bandında `border-left:3px solid #0070F3;`.
- **Tablo iç-çizgi:** satır altı `border-bottom:1px solid #EEF2F6;` (daha açık ton).
- **Dikey ayraç (stat/trust):** hücre `border-right:1px solid #E2E8F0;` son hücre `border-right:0`.
- **5px kapak top-bar:** `height:5px; background:#0070F3;` (sayfanın en üstünde marka şeridi, sadece kapak + bölüm açılışlarında opsiyonel).

### 2.5 — Bileşen desen kütüphanesi (her sayfada bunlardan seç)

Aşağıdaki 8 desen **tüm 14 sayfanın yapı taşıdır**. Yeni desen icat edilmez; bunlar kombinlenir.

**(D1) Section header** — overline (mavi UPPERCASE) → H2 başlık → lead (1-2 cümle). Her iç sayfanın açılışı.

**(D2) İstatistik şeridi** — 4 hücreli tablo (`width:25%`), her hücre `#F8FAFC` zemin + 1px border, içinde stat-num (`26px` mavi) + stat-lbl (UPPERCASE). Kapak + modül + ROI + ekip sayfalarında.

**(D3) Bento kartı** — 3 kolon tablo (`border-spacing:12px`), her `<td>` beyaz zemin + 1px border + 3px kategori top-border. İçinde: kategori etiketi (mini, renkli zemin) → H3 başlık → body açıklama. Modül/farklılaştırıcı/güvenlik sayfalarında.

**(D4) Meta kart** — 2×2 tablo, 1px dış border, hücre içi caption-bold etiket (UPPERCASE gri) + body-strong değer (koyu). Kapak + şartlar sayfasında.

**(D5) İndeks listesi** — 3 kolon, her madde `•` mavi kare-nokta (`width:5px;height:5px;background:#0070F3`) + body metin. Kategori üst-başlıklı. Modül + spec sayfalarında.

**(D6) Callout / vurgu bandı** — tam genişlik `#F8FAFC` zemin + 3px sol mavi border + padding 16px. İçinde body-strong mesaj. Sayfa kapanışı / önemli not.

**(D7) Fiyat/karşılaştırma tablosu** — kolon başlıklı tablo, başlık satırı `#F8FAFC` zemin, satır altı hairline-soft. Sağ sütun değerler sağa-dayalı (mono yok, Arial). Fiyat + lisans sayfasında. (Zoho lineItem: tek `<tr>` Zoho klonlar.)

**(D8) Adım/timeline bloğu** — numaralı dikey liste; her adım `#EAF3FF` zeminli daire-yerine-kare numara kutusu (`28px`, mavi zemin beyaz sayı) + sağda H3 başlık + body. Kurulum/geçiş + sonraki adımlar sayfasında.

**(Badge/pill)** — `display:inline-block; padding:5px 12px; background:#EAF3FF; border:1px solid #CCE2FF; color:#0070F3; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;`. Köşesiz. Gizlilik rozeti, kategori, "önerilen" etiketi.

---

## 3. 14 SAYFA — SAYFA SAYFA SPEC

> Her sayfa: (a) amaç/mesaj, (b) layout iskeleti (kolon + blok sırası), (c) gerçek Türkçe kopya (az-öz), (d) mock görsel/ikon notu.
> İçerik kaynağı her sayfada belirtilir. Kopyalar **uygulanmaya hazır** Türkçe; HTML'e geçerken entity'le.
> Tüm `${...}` Zoho merge alanları korunur.

---

### SAYFA 1 — KAPAK

**(a) Amaç:** İlk 3 saniyede premium/kurumsal algı + güven + "kuruma özel" his. Marka, kime/ne için, güven sinyalleri.

**(b) Layout (yukarıdan aşağıya):**
1. 5px mavi top-bar (`#0070F3`)
2. spacer-s (20px)
3. Sağ-üst: gizlilik pill (`Kuruma Özel · Confidential`)
4. spacer-l (56px) — TEK, çift değil (kritik #1.B.1)
5. Hero (ortalı): amblem `40px` → wordmark-lg (`service`+`core`) → overline (`KURUMSAL ORKESTRASYON PLATFORMU`) → cover-title `${Quotes.Account Name}` → cover-sub `${Quotes.Subject} Teklifi`
6. spacer-l (56px)
7. **Meta kart (D4)** 2×2: Teklif No / Teklif Tarihi / Son Geçerlilik / Yetkili
8. spacer-m (32px)
9. **İstatistik şeridi (D2)** — 5 hücre (kapakta 5'li istisna, eşit dağılım): `2000`'den beri · `30+` Modül · `4M+` Kullanıcı · `ITIL4` Uyumlu · `7/24` Destek
10. spacer-l (56px)
11. hairline + gizlilik bloğu (legal italik)

**(c) Kopya:**
- Overline: `KURUMSAL ORKESTRASYON PLATFORMU`
- Başlık: `${Quotes.Account Name}` (Zoho doldurur)
- Alt başlık: `${Quotes.Subject} Teklifi`
- Pill: `Kuruma Özel · Confidential`
- İstatistik şeridi: `2000` / `'den beri` · `30+` / `MODÜL` · `4M+` / `KULLANICI` · `ITIL4` / `UYUMLU` · `7/24` / `DESTEK`
- Meta etiketleri: `TEKLİF NO` / `TEKLİF TARİHİ` / `SON GEÇERLİLİK` / `YETKİLİ`
- Gizlilik başlığı: `Sınıflandırma: Kuruma Özel — Confidential`
- Gizlilik metni: `${Quotes.Created Time} tarihinde düzenlenmiştir. ${Quotes.Quote Number} numaralı, ${Quotes.Account Name} kurumuna özel ve ${Quotes.Subject} konulu teklifidir. ${Quotes.Contact Name} şahsına özel paylaşılmıştır; gizli bilgi olarak sınıflandırılmıştır ve yetkisiz üçüncü kişilerle paylaşılmaması gerekmektedir.`

> NOT (açık madde): Kullanıcı sayısı = `4M+` (references.json "4M'i aşmıştır" diyor; voice.json eski "600.000+"). README açık maddesi. **Karar: 4M+ kullan** — daha güçlü ve güncel kaynak. Ana Claude onaylatabilir.

**(d) Görsel/ikon:** `logo.png` (amblem, 40px kapak / 20px header). Başka görsel YOK — kapak tipografi+boşlukla güçlü olmalı, ikon kalabalığı premium algıyı bozar.

**Uppercase EN kelimeler (entity dikkat — i→İ bug'ı print'te yok ama tutarlılık için):** `CONFIDENTIAL`, `ITIL4`. (Print'te `<En>` sarma yok; bu sadece Türkçe uppercase'de `i` harfi geçen İngilizce kelime varsa entity `&#304;`/`&#305;` doğru seçilsin diye not.)

---

### SAYFA 2 — YÖNETİCİ ÖZETİ / KAPAK MEKTUBU

**(a) Amaç:** Karar vericiye (CIO/CTO/satınalma) hitap. "Neden ServiceCore, neden şimdi" — 25 yıl deneyim + tek platform + yerel güç. Değer→fiyat→risk altın kuralının "değer" girişi.

**(b) Layout:**
1. spacer-s
2. **Section header (D1)**: overline `YÖNETİCİ ÖZETİ` → H2 → lead
3. spacer-m
4. Mektup gövdesi: 3 kısa paragraf (body, sol-dayalı, max okunur genişlik)
5. spacer-m
6. **3'lü değer kartı (D3 sadeleştirilmiş — kategori rengi yok, hepsi mavi şerit)**: "Tek Platform" · "25 Yıl Deneyim" · "Yerel Güç & On-Premise"
7. spacer-m
8. İmza bloğu: ad/unvan placeholder + wordmark (küçük)

**(c) Kopya:**
- Overline: `YÖNETİCİ ÖZETİ`
- H2: `Tek platformda kurumsal servis mükemmelliği.`
- Lead: `Sayın ${Quotes.Contact Name}, kurumunuzun ITSM ve ESM süreçlerini tek veri modelinde birleştiren, 25 yıllık ITIL deneyimiyle olgunlaşmış bir platform sunuyoruz.`
- Paragraf 1: `ServiceCore, dağınık araçların, manuel süreçlerin ve görünürlük eksikliğinin kurumlara getirdiği gizli maliyeti ortadan kaldırmak için tasarlandı. Hizmet masasından varlık yönetimine, otomasyondan raporlamaya kadar 30+ modül tek arayüzde, native entegre çalışır.`
- Paragraf 2: `2000 yılından bu yana ITSM alanında Türkiye'de geliştiriyor; ITIL Expert ve ITIL MP sertifikalı yerli danışman kadromuzla kurumunuza üreticiden doğrudan, hızlı ve yakın destek veriyoruz. Ürün on-premise kendi sunucularınızda veya yönetilen hizmet olarak çalışır.`
- Paragraf 3: `Bu teklif; ihtiyaç analizinden lisanslamaya, kurulum planından destek taahhüdüne kadar kurumunuza özel hazırlanmıştır. Hedefimiz, yatırımınızı ilk yıldan itibaren ölçülebilir verimliliğe dönüştürmektir.`
- 3 değer kartı:
  - `Tek Platform` / `ITSM, ESM ve proje yönetimi tek veri modelinde; entegrasyon yükü yok.`
  - `25 Yıl Deneyim` / `2000'den bu yana ITSM'e odaklı yerli mühendislik ve sertifikalı danışmanlık.`
  - `Yerel Güç & On-Premise` / `Üreticiden doğrudan Türkçe destek; kendi sunucunuzda tam kontrol.`
- Kapanış (imza üstü): `Saygılarımızla,`
- İmza: `ServiceCore Çözüm Ekibi` / `Servicecore Bilgi Teknolojileri A.Ş.`

**(d) Görsel:** Yok (mektup sayfası, sade tipografi). İmza bloğunda küçük wordmark metni.

**Uppercase EN:** `ITSM`, `ESM`, `ITIL`, `ITIL EXPERT`, `ITIL MP`.

---

### SAYFA 3 — İHTİYAÇ & MEVCUT DURUMUN MALİYETİ

**(a) Amaç:** "Acı" sayfası. Karar vericiye mevcut dağınık durumun **gizli maliyetini** hatırlat (problem framing). Çözüm öncesi gerilim — değer gerekçesine zemin. (İçerik: voice + genel ITSM acıları, ürün anlatısından türev.)

**(b) Layout:**
1. spacer-s
2. **Section header (D1)**: overline `MEVCUT DURUM` → H2 → lead
3. spacer-m
4. **2 kolon "acı kartı" bloğu** — sol "Bugünün sorunları" (4 madde, indeks-stil ✕/nokta), sağ "ServiceCore ile" (4 madde, ✓/mavi nokta). Karşıtlık (problem/çözüm).
5. spacer-m
6. **İstatistik şeridi (D2)** — gizli maliyet vurgusu: 4 kutu (sektör/genel ifadeler, abartısız)
7. spacer-m
8. **Callout (D6)**: maliyet özeti tek cümle

**(c) Kopya:**
- Overline: `MEVCUT DURUM`
- H2: `Dağınık araçların görünmeyen maliyeti.`
- Lead: `Birbirinden kopuk yardım masası, varlık takibi ve proje araçları; yüksek lisans yükü, manuel iş ve körlükle sonuçlanır. Bu maliyet faturada görünmez ama her gün ödenir.`
- Sol blok başlığı: `Bugün karşılaşılanlar`
  - `Kanallara dağılmış talepler; tek bir görünürlük yok.`
  - `Manuel atama ve takip; tekrar eden işte zaman kaybı.`
  - `Varlık ve hizmet ilişkileri bilinmiyor; kör değişiklik riski.`
  - `Ayrı araçların lisans, entegrasyon ve bakım yükü katlanıyor.`
- Sağ blok başlığı: `ServiceCore ile`
  - `Tüm kanallar tek omnichannel masada birleşir.`
  - `Tekrarlayan işler no-code otomasyonla makinelere devredilir.`
  - `CMDB ve hizmet haritalarıyla etki önceden görülür.`
  - `Tek lisans, tek arayüz; entegrasyon ve bakım yükü düşer.`
- İstatistik şeridi (abartısız, genel): `30+` / `AYRI MODÜL TEK YERDE` · `16` / `ITIL4 SÜRECİ` · `10+` / `SÜREÇTE OTOMASYON` · `Tek` / `VERİ MODELİ`
- Callout: `Soru şu değil: "Bu yatırımın maliyeti ne?" — Asıl soru: "Mevcut dağınıklığın maliyeti ne kadar?"`

**(d) Görsel:** Yok; karşıtlık iki kolon tipografiyle kurulur. İsteğe bağlı: sol kolonda gri nokta, sağ kolonda mavi nokta (renk = sinyal).

**Uppercase EN:** `ITIL4`, `CMDB`, `NO-CODE`.

---

### SAYFA 4 — MODÜL VİTRİNİ (30+) [örnek mevcut — kritik 1.B uygulanır]

**(a) Amaç:** Kapsam genişliğini göster: 30+ native entegre modül = piyasanın en geniş ailesi. "Tek lisans, tek arayüz."

**(b) Layout (örnekten iyileştirilmiş):**
1. **Section header (D1)**: overline `ÜRÜN PLATFORMU` → H2 → lead
2. spacer-m
3. **İstatistik şeridi (D2)** — 4 kutu
4. spacer-m
5. **Bento (D3) — 6 yıldız modül, KATEGORİ RENKLİ top-border** (kritik 1.B.3)
6. spacer-m
7. **İndeks (D5) — 29 modül, 3 kolon, KATEGORİ ÜST-BAŞLIKLI** (kritik 1.B.4)
8. spacer-m
9. **Callout (D6)** — kapanış vurgu bandı (kritik 1.B.5)

**(c) Kopya (kaynak: moduller.json):**
- Overline: `ÜRÜN PLATFORMU`
- H2: `Tek platformda 30+ entegre modül.`
- Lead: `Hizmet masasından varlık yönetimine, otomasyondan raporlamaya kadar tüm ITSM ve ESM yetenekleri tek veri modeliyle native entegre çalışır. Piyasanın en kapsamlı modül ailesi.`
- İstatistik şeridi: `30+` / `MODÜL` · `8+` / `KATEGORİ` · `Native` / `ENTEGRASYON` · `ITIL4` / `UYUMLU`
- Bento 6 kart (kategori rengi → top-border + etiket-zemin):
  - [ITSM mavi] `Hizmet Masası & Etkileşim Yönetimi` / `Tüm iletişim kanallarını tek omnichannel masada birleştirin.`
  - [ITIL4 yeşil] `Olay, Problem & Değişiklik` / `Kesintileri hızla çözün, kök nedeni bulun, riski yöneterek değiştirin.`
  - [ITAM mavi-koyu] `Varlık Yönetimi & Discovery` / `Donanım/yazılım envanterini otomatik keşfedin ve takip edin.`
  - [Proje mor] `Agile Proje & SDLC Yönetimi` / `Servis ve projeyi tek platformda: Agile, Scrum, stratejik planlama.`
  - [ESM mor] `ESM & Federation Engine` / `Departmanları ve çoklu organizasyonu tek orkestratörle bağlayın.`
  - [Otomasyon turuncu] `Servis Otomasyonu & İş Akışı` / `Tekrarlayan işleri sürükle-bırak akışlarla makinelere devredin.`
- İndeks başlık: `Platformun tamamı — tek lisans, tek arayüz`
- İndeks 3 kolon (kategori üst-başlıklı, moduller.json'dan 29 modül):
  - **Kolon 1 — ITSM çekirdek:** Hizmet Masası ve Etkileşim · Olay Yönetimi · Problem Yönetimi · İstek Yönetimi · Bilgi ve Doküman Yönetimi · Değişiklik Yönetimi · Servis Katalog Yönetimi · Servis Seviye Yönetimi · Self Servis Portal · Yönetim Paneli
  - **Kolon 2 — ITAM & ITIL4 & İş Gücü:** Varlık Yönetimi · Discovery · Servis Konfigürasyon Yönetimi · Service Topologies Explorer · Sürekli İyileştirme · Raporlama Yönetimi · Görev Yönetimi · Vardiya Yönetimi · Servis İlişkileri Yönetimi · Sözleşme Yönetimi
  - **Kolon 3 — ESM & Otomasyon & Platform:** ESM Kurumsal Servis Yönetimi · Federation Engine · Servis Otomasyonu · İş Akışı Yönetimi · Agile Proje ve SDLC Yönetimi · Entegrasyon Modülü · Integration System · Low Code Geliştirme · Mobil Servis Yönetimi
- Callout: `Her modül native entegre çalışır — tek veri modeli, tek arayüz, tek lisans.` (`native entegre` mavi `.accent`)

**(d) Görsel:** Yok (bento tipografi+renkli şerit yeterli). İsteğe bağlı: ileride her bento kartına 20px mono-renk PNG ikon (hosted). MVP'de ikonsuz.

**Uppercase EN:** `ITSM`, `ESM`, `ITIL4`, `ITAM`, `SDLC`, `DISCOVERY`, `FEDERATION ENGINE`, `SERVICE TOPOLOGIES EXPLORER`, `INTEGRATION SYSTEM`, `LOW CODE`, `AGILE`, `SCRUM`.

---

### SAYFA 5 — FARKLILAŞTIRICILAR (isimsiz anlatı — RAKİP ADI YOK)

**(a) Amaç:** "Neden biz, neden bu fiyat" — rakipte olmayan/kısmen olan üstünlükler. Premium fiyatın çekirdek gerekçesi. **Rakip adı geçmez** (isimsiz: "sektördeki diğer çözümler" / "rakip ürünlerin çoğunda").

**(b) Layout:**
1. **Section header (D1)**: overline `FARK YARATAN ÖZELLİKLER` → H2 → lead
2. spacer-m
3. **Bento (D3) — 6 öne çıkan farklılaştırıcı, kategori renkli** (fark-var.json'dan en güçlü 6)
4. spacer-m
5. **İndeks (D5) — kalan farklılaştırıcılar 3 kolon** (fark-var.json'dan ~18 başlık, kısa)
6. spacer-m
7. **Callout (D6)** — kapanış

**(c) Kopya (kaynak: fark-var.json — 48 başlıktan seçilmiş):**
- Overline: `FARK YARATAN ÖZELLİKLER`
- H2: `Sektörde çoğunda bulunmayan yetenekler.`
- Lead: `Aşağıdaki başlıklar, sektördeki diğer çözümlerin çoğunda hiç bulunmayan veya yalnızca kısmen sunulan, ServiceCore'a özgü üstünlüklerdir.` (rakip adı yok)
- Bento 6 (kategori rengi):
  - [mavi] `Time Engine (Patentli)` / `Otomatik timesheet ve iş/servis tutanağı üretimi — sadece ServiceCore'da.`
  - [yeşil] `16 ITIL4 Süreci` / `En güncel ITIL4 çevik ve yalın pratiklerine göre 16 süreç tek üründe.`
  - [mor] `ESM Multi-Company Mode` / `Holding yapılanmasında alt şirketlere ayrıştırma; sınırsız tenant.`
  - [turuncu] `10+ Süreçte No-Code Otomasyon` / `Tüm süreçlerde koşullu aksiyonlar, sınırsız senaryo otomasyonu.`
  - [mavi-koyu] `5 Katmanlı Raporlama` / `Dashboard, servis raporlama, dinamik/döküm raporlar ve servis analitiği.`
  - [cyan] `Hibrit & Esnek Lisanslama` / `Standart/Pro karışımı + add-on ile gerçek kullanıma bağlı tasarruf.`
- İndeks başlık: `Yalnızca ServiceCore'da bulunan diğer üstünlükler`
- İndeks 3 kolon (kısa başlıklar, fark-var.json):
  - **Kolon 1:** Interaction Management · Backlog Management · Agile Kanban View · CI Management · Workforce Management · 3 Katmanlı Sözleşme · Çift Katmanlı SLA · Süreç Şablonları
  - **Kolon 2:** Sınırsız AD Sync · Sınırsız E-posta Fetcher · Dinamik Onay Mekanizması · Custom Flow Design · Workflow Engine · Low Code Design · Zimmet Formu & Onay · Sınırsız Hizmet Kategorisi
  - **Kolon 3:** TL Sözleşme & Ödeme · Aylık Ödeme İmkanı · On-Premise Kurulum · Hosted/Yönetilen Hizmet · Sıfır-Kesinti Update · Yerel Üretici Desteği · Yaygın Partner Ağı · ITIL Uzman Danışmanlık
- Callout: `Detaylı rakip karşılaştırması ve teknik analiz için danışmanlarımız teknik destek sunar.`

**(d) Görsel:** Yok. (Önemli: rakip logosu/adı kesinlikle yok — isimsiz anlatı.)

**Uppercase EN:** `TIME ENGINE`, `ITIL4`, `ESM`, `MULTI-COMPANY MODE`, `NO-CODE`, `INTERACTION MANAGEMENT`, `BACKLOG MANAGEMENT`, `AGILE KANBAN VIEW`, `CI MANAGEMENT`, `WORKFORCE MANAGEMENT`, `SLA`, `AD SYNC`, `CUSTOM FLOW DESIGN`, `WORKFLOW ENGINE`, `LOW CODE DESIGN`, `ON-PREMISE`, `ITIL`.

---

### SAYFA 6 — GÜVENLİK / UYUM / ON-PREMISE

**(a) Amaç:** Kurumsal/regülasyona tabi alıcı için (finans, savunma, kamu) güven kilidini aç: veri egemenliği, on-premise kontrol, kimlik, denetim. (Kaynak: specsheet.json teknik.)

**(b) Layout:**
1. **Section header (D1)**: overline `GÜVENLİK & UYUM` → H2 → lead
2. spacer-m
3. **Bento (D3) — 6 güvenlik/altyapı kartı, kategori renkli**
4. spacer-m
5. **İndeks (D5) — teknik altyapı maddeleri, 2-3 kolon** (specsheet teknik'ten kısa)
6. spacer-m
7. **Callout (D6)** — on-premise/veri egemenliği vurgusu

**(c) Kopya (kaynak: specsheet.json teknik + lisans):**
- Overline: `GÜVENLİK & UYUM`
- H2: `Verileriniz sizin sunucunuzda, sizin kontrolünüzde.`
- Lead: `ServiceCore on-premise kendi sunucularınıza kurulur; veri egemenliği tamamen kurumda kalır. Yüksek erişilebilirlik, güçlü kimlik ve tam denetim izi standarttır.`
- Bento 6 (kategori rengi):
  - [mavi-koyu] `On-Premise Kurulum` / `Kurumun kendi sunucularına kurulum; veri kurum dışına çıkmaz.`
  - [yeşil] `Yüksek Erişilebilirlik` / `Failover ve yedekli uygulama sunucu yapısı; kesintisiz hizmet.`
  - [mavi] `Kimlik & SSO` / `Azure AD, SAML, SSO; sınırsız Active Directory senkronizasyonu.`
  - [cyan] `HTTPS & Web Tabanlı` / `İstemciye kurulum yok; HTTPS ile güvenli veri alışverişi.`
  - [mor] `Rol Bazlı Yetki` / `Modül ve süreç bazında erişim kontrolü; merkezi rol yönetimi.`
  - [turuncu] `Denetim İzi` / `Tüm kayıt işlemlerinin tarihsel kaydı ve geçmiş izlenebilirliği.`
- İndeks başlık: `Teknik altyapı ve uyum özellikleri`
- İndeks (specsheet teknik'ten, kısa):
  - Çok katmanlı (multi-tenant) mimari · Sürekli Dağıtım (Continuous Delivery) ile sıfır-kesinti güncelleme · Sınırsız AD bağlantısı ve AD Attribute eşleme · REST API + dokümantasyon (gateway gerekmez) · Çoklu dil desteği (ana dil Türkçe) · Yalnızca IIS + MSSQL; ek 3. taraf yazılım yok · Otomatik organizasyon şeması (AD OU) ile dinamik onay · Sınırsız e-posta fetcher · TL sözleşme ve TL faturalama · Lisans yalnız teknik personel sayısına bağlı
- Callout: `Veri egemenliği, KVKK uyumu ve kurum içi tam kontrol için on-premise — finans, kamu ve savunmada kanıtlı.`

**(d) Görsel:** Yok. (İsteğe bağlı: sertifika rozetleri ISO 27001 / KVKK — README açık maddesi, gerçek sertifika teyidi gelmeden EKLENMEZ. Placeholder rozet koymak premium algıyı zedeler.)

**Uppercase EN:** `ON-PREMISE`, `SSO`, `SAML`, `HTTPS`, `REST API`, `AD`, `KVKK`, `IIS`, `MSSQL`, `ISO 27001` (teyit gelirse).

---

### SAYFA 7 — DEĞER GEREKÇESİ (ROI / TCO)

**(a) Amaç:** Altın kuralın "değer" zirvesi — fiyat sayfasından HEMEN önce. Yatırımı verimliliğe çeviren mantığı kur: tek-lisans tasarrufu, otomasyon kazancı, hızlı geri dönüş. (Sayısal abartı yok; mantık + niteliksel kazanç.)

**(b) Layout (asimetri istisnası — 60/40 split):**
1. **Section header (D1)**: overline `DEĞER GEREKÇESİ` → H2 → lead
2. spacer-m
3. **60/40 split:** sol (60%) "Nereden tasarruf?" 3-4 maddeli liste · sağ (40%) **İstatistik kutusu (dikey D2)** 3 kazanç metriği
4. spacer-m
5. **3'lü değer ekseni kartı (D3 mavi şerit)**: "Konsolidasyon" · "Otomasyon" · "Hız & Süreklilik"
6. spacer-m
7. **Callout (D6)** — TCO özeti

**(c) Kopya:**
- Overline: `DEĞER GEREKÇESİ`
- H2: `Yatırım, ilk yıldan ölçülebilir verime dönüşür.`
- Lead: `ServiceCore'un değeri üç eksende birikir: araç konsolidasyonu, manuel işin otomasyonu ve kesintisiz süreklilik. Esnek lisanslama ile yalnızca kullandığınız kadar ödersiniz.`
- Sol blok (60%) başlık: `Toplam Sahip Olma Maliyeti nerede düşer?`
  - `Konsolidasyon: 30+ modül tek lisansta — ayrı yardım masası, varlık ve proje araçlarının lisans + entegrasyon + bakım kalemi tek kaleme iner.`
  - `Otomasyon: 10+ süreçte no-code otomasyon, tekrar eden manuel işi ortadan kaldırır; aynı ekiple daha çok iş.`
  - `Esnek lisans: Standart/Pro hibrit + add-on; ihtiyaç arttıkça/azaldıkça lisans birebir uyum sağlar — atıl lisans yok.`
  - `Süreklilik: Sürekli Dağıtım ile sıfır-kesinti güncelleme; yükseltme projesi maliyeti yok.`
- Sağ kutu (40%) — 3 dikey stat:
  - `30+` / `MODÜL TEK LİSANSTA`
  - `10+` / `SÜREÇTE OTOMASYON`
  - `%5` / `TEKNİK EKİP ESNEKLİĞİ`
- 3 değer ekseni:
  - `Konsolidasyon` / `Tek veri modeli, tek arayüz; entegrasyon ve bakım yükü düşer.`
  - `Otomasyon` / `No-code kurallarla tekrar eden iş makineye devredilir.`
  - `Hız & Süreklilik` / `Yüksek geliştirme hızı, sıfır-kesinti güncelleme, yerel hızlı destek.`
- Callout: `Lisans yalnız teknik personel sayısına bağlıdır — son kullanıcı, kayıt veya varlık adedi maliyeti artırmaz.`

**(d) Görsel:** Yok. Sağ stat kutusu görsel ağırlık verir (60/40 asimetri kasıtlı — monotonluğu kırar).

**Uppercase EN:** `TCO`, `NO-CODE`, `ROI`.

---

### SAYFA 8 — FİYAT TABLOSU / LİSANSLAMA

**(a) Amaç:** Şeffaf, "adil ve esnek" lisans modelini sun. Zoho lineItem ile gerçek kalem-fiyat tablosu. İki versiyon (Standart/Pro) + hibrit + add-on mantığı. (Kaynak: pricing-itsm.json.)

**(b) Layout:**
1. **Section header (D1)**: overline `LİSANSLAMA` → H2 → lead
2. spacer-s
3. İki pill yan yana: `On-Premise veya Bulut` · `Yıllık Abonelik`
4. spacer-m
5. **2 kolon versiyon kartı**: sol `Standart Versiyon` · sağ `Profesyonel Versiyon` ("En Çok Tercih Edilen" pill, mavi 3px top-border)
6. spacer-m
7. **Fiyat tablosu (D7) — Zoho lineItem** (`<tbody id="lineItem">` tek `<tr>` Zoho klonlar): kolonlar `Kalem / Modül` · `Versiyon` · `Adet (Teknisyen)` · `Birim Fiyat` · `Tutar`. Altta ara toplam / KDV / **genel toplam** satırları (`${...}` merge).
8. spacer-m
9. Dipnot (caption): min 10 teknisyen, hibrit %25, TL sözleşme

**(c) Kopya (kaynak: pricing-itsm.json):**
- Overline: `LİSANSLAMA`
- H2: `Adil, modüler ve esnek lisanslama.`
- Lead: `Minimum 10 teknisyen ile başlayın. Single Tenant veya ESM (Multi-Tenant) mimarisi, On-Premise veya Bulut kurulum — ihtiyacınıza göre seçin, kullandığınız kadar ödeyin.`
- Pill'ler: `On-Premise veya Bulut Kurulum` · `Yıllık Abonelik Modeli`
- Standart kart:
  - Başlık: `Standart Versiyon`
  - Açıklama: `Service Desk ve temel ITIL4 süreçlerine ihtiyaç duyan organizasyonlar için başlangıç paketi.`
  - Kapsam: `Olay, görev, iş günlükleri, bilgi yönetimi ve self servis portal dahil 20+ temel modül.`
- Pro kart (pill: `EN ÇOK TERCİH EDİLEN`):
  - Başlık: `Profesyonel Versiyon`
  - Açıklama: `Kurumsal ESM/ITSM ve gelişmiş pratiklere ihtiyaç duyan kuruluşlar için tam paket.`
  - Kapsam: `Standart'taki tüm özellikler + İstek/Katalog, Problem, Değişiklik, CMDB, Otomasyon, API, iş akışları.`
- Tablo başlıkları: `KALEM / MODÜL` · `VERSİYON` · `ADET` · `BİRİM FİYAT` · `TUTAR`
- lineItem satır (Zoho klonlar): `${Product Details.Product Name}` · `${...Versiyon}` · `${Product Details.Quantity}` · `${Product Details.List Price}` · `${Product Details.Net Total}`
- Toplam satırları: `Ara Toplam` `${Quotes.Sub Total}` · `İndirim` `${Quotes.Discount}` · `KDV (%20)` `${Quotes.Tax}` · `GENEL TOPLAM` `${Quotes.Grand Total}`
- Dipnot: `* Minimum 10 teknisyen zorunludur. Standart lisansın en az %25'i kadar Pro lisans ile hibrit kurulum yapılabilir. ESM'de tenant başına bağımsız lisanslama mümkündür. Sözleşme ve ödeme Türk Lirası ile yapılabilir.`

**(d) Görsel:** Yok. Tablo netliği esas. "En Çok Tercih Edilen" pill = tek vurgu.

> NOT (açık madde): Para birimi (TL/USD) ve tek-fiyat-anchor vs kademe — README açık maddesi. lineItem TL varsayar (fark-var: "TL sözleşme"). Ana Claude org field'larıyla teyit eder.

**Uppercase EN:** `ITIL4`, `ESM`, `CMDB`, `API`, `KDV`, `SERVICE DESK`, `SINGLE TENANT`, `MULTI-TENANT`, `ON-PREMISE`.

---

### SAYFA 9 — KURULUM / GEÇİŞ PLANI

**(a) Amaç:** Riski azalt (altın kuralın "risk-azaltma" girişi). "Bu işi yapabilirler, süreç belli" güveni — adım adım, takvimli, sorumlu belli. (Kaynak: specsheet.json bakim + ürün anlatısı.)

**(b) Layout:**
1. **Section header (D1)**: overline `KURULUM & GEÇİŞ` → H2 → lead
2. spacer-m
3. **Adım/timeline bloğu (D8)** — 5 numaralı aşama (dikey, mavi kare numara kutusu)
4. spacer-m
5. **2 kolon**: sol "Sizden beklenenler" · sağ "Bizden taahhüt"
6. spacer-m
7. **Callout (D6)** — onboarding/eğitim vurgusu

**(c) Kopya (kaynak: specsheet bakim):**
- Overline: `KURULUM & GEÇİŞ`
- H2: `Net adımlarla, kontrollü geçiş.`
- Lead: `Kurulumdan canlıya geçişe kadar her aşama planlı yürütülür. Üreticiden doğrudan onboarding, eğitim ve süreç tasarımı desteğiyle riski en aza indiririz.`
- 5 adım (D8):
  1. `Keşif & Analiz` / `İhtiyaç analizi, mevcut süreç ve veri envanteri; kuruma özel kapsam.`
  2. `Kurulum & Yapılandırma` / `On-premise/bulut kurulum, AD entegrasyonu, rol ve süreç yapılandırması.`
  3. `Veri & Süreç Göçü` / `Mevcut ITSM verisi, konfigürasyon ve akışların taşınması (migration desteği).`
  4. `Eğitim & Onboarding` / `Yönetici, teknisyen ve son kullanıcı eğitim paketleri; Türkçe kaynaklar.`
  5. `Canlıya Geçiş & İyileştirme` / `Pilot, devreye alma ve sürekli iyileştirme ile yerleşik kullanım.`
- Sol blok `Sizden beklenenler`:
  - `Sunucu/altyapı erişimi (on-premise için IIS + MSSQL).`
  - `Süreç sahipleri ve AD/e-posta entegrasyon bilgileri.`
  - `Pilot ekip ve geçiş takvimi onayı.`
- Sağ blok `Bizden taahhüt`:
  - `Üreticiden doğrudan kurulum ve süreç tasarımı.`
  - `Kuruma özel ücretsiz onboarding ve eğitim.`
  - `Veri taşıma, özel form ve entegrasyon desteği.`
- Callout: `Kuruma özel onboarding ve eğitim üretici tarafından ücretsiz sağlanır — ekip ilk günden üretkendir.`

**(d) Görsel:** Yok. D8 numara kutuları görsel ritim verir.

**Uppercase EN:** `AD`, `IIS`, `MSSQL`, `ITSM`, `ON-PREMISE`, `MIGRATION`.

---

### SAYFA 10 — DESTEK / SLA / UZMAN EKİP (25+ YIL)

**(a) Amaç:** "Arkanızda kim var" — premium fiyatın insan/destek gerekçesi. 25 yıl, sertifikalı yerli kadro, üreticiden doğrudan 7/24, SLA taahhüdü. (Kaynak: specsheet bakim + fark-var ITIL uzmanlığı + voice.)

**(b) Layout:**
1. **Section header (D1)**: overline `DESTEK & UZMAN EKİP` → H2 → lead
2. spacer-m
3. **İstatistik şeridi (D2)** — 4 kutu (deneyim/destek)
4. spacer-m
5. **Bento (D3) — 3 destek piları, mavi şerit** (geniş, 3 kolon): "7/24 Çok Kanallı" · "SLA Taahhüdü" · "Sertifikalı Yerli Kadro"
6. spacer-m
7. **İndeks (D5) — destek kapsamı maddeleri, 2 kolon**
8. spacer-m
9. **Callout (D6)** — yerel/üretici-doğrudan vurgusu

**(c) Kopya (kaynak: specsheet bakim + fark-var):**
- Overline: `DESTEK & UZMAN EKİP`
- H2: `Üreticiden doğrudan, yerel ve kesintisiz destek.`
- Lead: `2000'den bu yana ITSM'e odaklı; ITIL Expert ve ITIL MP sertifikalı yerli danışman kadrosuyla, üreticiden doğrudan 7/24 destek alırsınız.`
- İstatistik şeridi: `25` / `YIL DENEYİM` · `7/24` / `DESTEK` · `20+` / `İŞ ORTAĞI` · `SLA` / `TAAHHÜDÜ`
- 3 destek piları:
  - `7/24 Çok Kanallı` / `E-posta, telefon ve ServiceCore destek portalı üzerinden kesintisiz destek.`
  - `SLA Taahhüdü` / `Kritik öncelikli olaylarda SLA tabanlı hızlı müdahale çözüm taahhüdü.`
  - `Sertifikalı Yerli Kadro` / `ITIL Expert/MP danışmanlarla Türkçe, yakın ve hızlı destek.`
- İndeks başlık: `Bakım ve destek kapsamı`
- İndeks 2 kolon (specsheet bakim):
  - **Kolon 1:** 7/24 e-posta/telefon/portal destek · SLA tabanlı kritik müdahale · Sürekli Dağıtım ile otomatik güncelleme · Planlı bakım pencerelerinde yama · Yıllık bakım: tüm sürüm yükseltmeleri dahil
  - **Kolon 2:** Ücretsiz onboarding ve eğitim · Yönetici/teknisyen/son kullanıcı eğitim paketleri · Danışmanlık ve süreç tasarımı · Yedekleme, felaket kurtarma, veri taşıma desteği · Düzenli memnuniyet anketi ve iyileştirme
- Callout: `25 yıllık Türk üreticiden doğrudan destek — aracı yok, yerelde üretici kabiliyetinde hız.`

**(d) Görsel:** Yok. (README açık maddesi: gerçek danışman isim/biyografi/sertifika paylaşılırsa burada 3'lü "ekip kartı" eklenebilir — teyit gelene kadar genel anlatı.)

**Uppercase EN:** `SLA`, `ITSM`, `ITIL`, `ITIL EXPERT`, `ITIL MP`.

---

### SAYFA 11 — REFERANSLAR & VAKA

**(a) Amaç:** Sosyal kanıt zirvesi — "bu kurumlar güvendi, siz de güvenin." Tanınır markalar + 1-2 kısa vaka. (Kaynak: references.json.)

**(b) Layout:**
1. **Section header (D1)**: overline `REFERANSLAR` → H2 → lead
2. spacer-m
3. **Logo duvarı** — referans isimleri **metin tabanlı** ızgara (3-4 kolon tablo, her hücre `#F8FAFC` zemin + 1px border + kurum adı body-strong). [Logo PNG'leri hosted edilirse görsel; MVP'de metin — bkz (d)]
4. spacer-m
5. **2 vaka kartı (D3 mavi şerit)** — detailedReferences'tan 2 güçlü vaka (kısaltılmış)
6. spacer-m
7. **Callout (D6)** — 4M+ kullanıcı vurgusu

**(c) Kopya (kaynak: references.json):**
- Overline: `REFERANSLAR`
- H2: `Türkiye'nin önde gelen kurumları güveniyor.`
- Lead: `Finanstan savunmaya, perakendeden kamuya; ServiceCore'a güvenen kurumların hizmet verdiği kullanıcı sayısı 4 milyonu aşmıştır.`
- Logo duvarı (metin ızgara, references.json'dan tanınır olanlar — 16-20 isim):
  AKSA · Roketsan · Savunma Sanayii Başkanlığı · Diyanet İşleri Başkanlığı · Toyota · Boyner · Kazancı Holding · QNB · Logo Yazılım · Sabancı DX · ALJ Finans · Misyon · Türk Kızılay · Marport · Bulutistan · TGS · Golden Global Bank · İktisat Katılım · Uludağ Enerji · ASAŞ
- Vaka 1 (Logo Yazılım):
  - `Logo Yazılım` / `ERP yapısıyla birlikte sahada, ofis ve IT altyapısında oluşan arıza, talep ve değişikliklerin uçtan uca yönetimi; müşterinin kendi müşterilerine servis süreci dahil.`
- Vaka 2 (Aksa):
  - `Aksa` / `Holding şirketlerinin tamamı tek platformda; 16 modül üzerinden merkezi servis yönetimiyle uçtan uca BT süreçleri otomatize edildi.`
- Callout: `Başarılı referanslarımız arasında siz de yer alın — 4M+ kullanıcının güvendiği platform.` (`4M+` mavi `.accent`)

**(d) Görsel:** Logo PNG'leri (`website/public/teklif/logos/` hosted edilirse) → görsel logo duvarı (her logo gri-ton/tek-renk, max 24px yükseklik, hücre ortalı). **MVP kararı:** logo PNG hazır değilse **metin ızgara** (kurum adı body-strong, `#F8FAFC` hücre) — premium ve güvenli; bozuk/eksik logo riskinden iyi. Ana Claude logo hazırlığına göre seçer.

**Uppercase EN:** `ERP`, `IT`, `BT`, `QNB`, `ALJ`, `TGS`, `ASAŞ` (Türkçe kısaltma — dikkat: `İ` yok), `DX`.

---

### SAYFA 12 — SONRAKİ ADIMLAR / CTA

**(a) Amaç:** Kararı eyleme çevir. Net sonraki adım + iletişim + tek güçlü çağrı. (Kaynak: voice contact.)

**(b) Layout:**
1. spacer-s
2. **Section header (D1)**: overline `SONRAKİ ADIMLAR` → H2 → lead
3. spacer-m
4. **Adım/timeline bloğu (D8)** — 3 kısa adım (teklifi onayla → demo/kurulum planı → canlı)
5. spacer-m
6. **CTA kutusu** — TEK renkli dolgu alanı: mavi-açık `#EAF3FF` zemin + 3px mavi top-border + içinde H3 davet + iletişim bilgileri (telefon, e-posta, web)
7. spacer-m
8. İletişim satırı (caption): HQ adres + hotline

**(c) Kopya (kaynak: voice.json contact):**
- Overline: `SONRAKİ ADIMLAR`
- H2: `Başlamak için tek bir adım kaldı.`
- Lead: `Teklifimizi değerlendirdiğinizde, kuruma özel canlı demo ve kurulum planıyla hızla ilerleyelim.`
- 3 adım (D8):
  1. `Teklifi Onaylayın` / `Kapsam ve lisans modelini birlikte netleştirelim.`
  2. `Demo & Plan` / `Kuruma özel canlı demo ve kurulum/geçiş takvimi.`
  3. `Canlıya Geçiş` / `Onboarding ve eğitimle ekibiniz üretkenliğe geçsin.`
- CTA kutusu başlık: `Kuruma özel demo planlayalım.`
- CTA kutusu metin: `Sorularınız ve sonraki adımlar için ekibimiz hazır.`
- İletişim (CTA içinde body-strong):
  - `Telefon` `0216 599 07 72` · `Hotline` `444CORE`
  - `E-posta` `sales@servicecore.app`
  - `Web` `servicecore.com.tr`
- Alt satır (caption): `Servicecore Bilgi Teknolojileri A.Ş. · Metropol İstanbul A Blok, Ataşehir/İstanbul`

**(d) Görsel:** Yok. CTA kutusu = sayfanın (ve dokümanın) tek vurgu doruğu.

**Uppercase EN:** `CTA` (sadece overline değil — overline Türkçe "SONRAKİ ADIMLAR"), `CORE` (444CORE).

> NOT: Web adresi `servicecore.com.tr` mi `.app` mı — README açık maddesi (canlı alan adı). E-posta örnekte `sales@servicecore.app`, voice'ta `info@servicecore.com.tr`. **Karar bekler:** satış için `sales@servicecore.app` (örnek dosya kullanıyor), kurumsal web `servicecore.com.tr`. Ana Claude teyit eder.

---

### SAYFA 13 — ŞARTLAR & KOŞULLAR

**(a) Amaç:** Ticari/hukuki çerçeve — geçerlilik, ödeme, lisans, kapsam. Net, sıkıcı-olmadan, güven veren. (Kaynak: specsheet lisans + pricing dipnotlar.)

**(b) Layout:**
1. spacer-s
2. **Section header (D1)**: overline `ŞARTLAR & KOŞULLAR` → H2 (kısa)
3. spacer-m
4. **Numaralı madde listesi** — 2 kolon VEYA tek kolon numaralı (1px hairline ile ayrılmış satırlar). Başlık + kısa açıklama.
5. spacer-m
6. **Meta kart (D4) varyantı** — Geçerlilik / Para Birimi / Ödeme / Min. Teknisyen
7. spacer-m
8. legal dipnot (italik)

**(c) Kopya (kaynak: specsheet lisans + pricing):**
- Overline: `ŞARTLAR & KOŞULLAR`
- H2: `Ticari koşullar.`
- Numaralı maddeler:
  1. `Teklif Geçerliliği` / `Bu teklif ${Quotes.Valid Until} tarihine kadar geçerlidir.`
  2. `Lisans Modeli` / `Lisanslama yalnız teknik personel sayısına bağlıdır; son kullanıcı, kayıt veya varlık adedi fiyatı etkilemez.`
  3. `Minimum Kapsam` / `Minimum 10 teknisyen ile başlanır. Standart lisansın en az %25'i kadar Pro lisans ile hibrit kurulum yapılabilir.`
  4. `Esneklik` / `Teknik ekip artışına %5 esneklik tanınır; yenileme döneminde esnek ek artış uygulanabilir.`
  5. `Ödeme & Para Birimi` / `Sözleşme ve ödeme Türk Lirası ile yapılabilir; faturalar TL düzenlenir. Yıllık abonelik veya aylık ödeme seçenekleri mevcuttur.`
  6. `Bakım & Destek` / `Yıllık bakım anlaşması; tüm sürüm yükseltmeleri, yeni özellikler ve 7/24 teknik destek dahildir.`
  7. `Kurulum & Eğitim` / `Kuruma özel onboarding ve temel eğitim üretici tarafından sağlanır. Özel geliştirme ve entegrasyon ek hizmet kapsamındadır.`
  8. `Gizlilik` / `Bu teklif kuruma özeldir ve gizli bilgi olarak sınıflandırılmıştır.`
- Meta kart:
  - `GEÇERLİLİK` `${Quotes.Valid Until}` · `PARA BİRİMİ` `Türk Lirası (TL)` · `ÖDEME` `Yıllık / Aylık` · `MİN. TEKNİSYEN` `10`
- legal dipnot: `Fiyatlar ve koşullar bu teklife özeldir; ${Quotes.Valid Until} sonrası güncellenebilir. KDV %20 oranında ayrıca uygulanır.`

**(d) Görsel:** Yok (legal sayfa, tipografi sade).

**Uppercase EN:** `KDV`, `TL`.

---

### SAYFA 14 — EKLER

**(a) Amaç:** Detay/teknik referans — datasheet, teknik özellikler özeti, sertifika ve iletişim. "Daha fazlası var" güveni + kapanış. (Kaynak: specsheet + voice.)

**(b) Layout:**
1. spacer-s
2. **Section header (D1)**: overline `EKLER` → H2 → lead
3. spacer-m
4. **Ek listesi (D5 varyantı)** — sunulan ek dokümanlar listesi (datasheet, specsheet, modül detayları)
5. spacer-m
6. **2 kolon**: sol "Teknik kaynaklar" · sağ "İletişim & Kaynaklar" (docs, support portal, web)
7. spacer-l
8. Kapanış bandı (D6) — marka kapanış cümlesi + wordmark (ortalı)

**(c) Kopya (kaynak: specsheet + voice):**
- Overline: `EKLER`
- H2: `Daha fazla detay için kaynaklar.`
- Lead: `Aşağıdaki ek dokümanlar ve kaynaklar talebinize göre paylaşılır; teknik derinlik ve süreç detayları için ekibimize ulaşabilirsiniz.`
- Ek listesi:
  - `ServiceCore Suite Teknik Özellikler (Datasheet)` / `16 ITIL4 modülünün ekran ve form düzeyinde detayı.`
  - `Modül Bazlı Yetenek Listesi` / `Çağrı, Olay, Problem, İstek, Varlık, CMDB ve diğer modüllerin tam özellik dökümü.`
  - `Lisanslama & Versiyon Karşılaştırması` / `Standart, Profesyonel ve add-on kapsamları.`
  - `Güvenlik & Uyum Notu` / `On-premise, kimlik, denetim ve veri egemenliği detayları.`
- Sol blok `Teknik kaynaklar`:
  - `Dokümantasyon: docs.servicecore.app`
  - `Destek Portalı: support.servicecore.app`
  - `Eğitim: Türkçe video ve canlı eğitimler`
- Sağ blok `İletişim & Kaynaklar`:
  - `Satış: sales@servicecore.app`
  - `Telefon: 0216 599 07 72 · Hotline: 444CORE`
  - `Web: servicecore.com.tr`
- Kapanış bandı: `ServiceCore — Kurumsal Orkestrasyon Platformu. Tek platform, tam kontrol, yerel güç.` + altında wordmark (ortalı, küçük)

**(d) Görsel:** Kapanış bandında amblem (24px, ortalı) + wordmark metni. Datasheet ek görselleri (varsa hosted) opsiyonel — MVP'de metin listesi.

**Uppercase EN:** `ITIL4`, `CMDB`, `ON-PREMISE`, `CORE` (444CORE).

---

## 4. UYGULAMA NOTLARI (ana Claude için kontrol listesi)

1. **Tek `<style>` bloğu** — örnek dosyadaki sınıfları genişlet; 14 sayfa aynı sınıf havuzunu paylaşır (32K limiti için tekrar inline yok).
2. **Sınıf havuzu (örnekten devral + ekle):** `.overline` `.h2` `.lead` `.body` `.callout` `.stat-*` `.bento td` `.cat` `.mod-*` `.idx-*` `.meta` `.trust→stats` `.pill` `.hairline` `.wm/.wm-lg` `.spacer-*` + YENİ: `.callout-band` (D6), `.step` (D8), `.cat-blue/.cat-emerald/.cat-orange/.cat-purple/.cat-cyan/.cat-bluedark` (kategori renk varyantları), `.split-60/.split-40`.
3. **Her sayfa `<div class="sheet pb">`** (ilk hariç `pb` = page-break-before).
4. **`avoid` sınıfı** — bölünmemesi gereken her kutuya (`page-break-inside:avoid`).
5. **Türkçe entity** — tüm Türkçe harfler entity (yukarıdaki tablo).
6. **Görsel src** — `assets/...` (önizleme); Zoho'ya alırken find/replace `https://<ALAN-ADI>/teklif/...`.
7. **Açık maddeler (HTML'e geçmeden teyit):** (a) kullanıcı sayısı 4M+ [spec kararı: 4M+] · (b) canlı alan adı .com.tr/.app · (c) para birimi TL [spec: TL] · (d) gerçek sertifika (yoksa rozet koyma) · (e) gerçek danışman bilgisi (yoksa genel anlatı).
8. **lineItem (Sayfa 8)** — `<tbody id="lineItem">` içinde TEK `<tr>`; Zoho her ürün için klonlar. Toplamlar tablo dışında `${Quotes.*}`.
9. **Premium disiplin** — sayfa başına EN FAZLA 1 renkli-dolgu alanı; geri kalan beyaz/açık-gri. Renk = sinyal. Bento'da kategori rengi sadece 3px şerit + mini etiket; gövde her zaman koyu/gri.
10. **Boyut disiplini** — amblem ≤ 48px (kapak 40, header 20, kapanış 24); başka dekoratif görsel yok. Premium = boşluk + tipografi, kalabalık değil.

---

## 5. UPPERCASE İNGİLİZCE KELİMELER (toplu — print entity dikkatı)

> Print'te `<En>` component yok (o website/React içindir). Bu liste, Türkçe uppercase metinde `i` harfi geçen İngilizce kelimelerde entity'nin doğru seçilmesi için (`İ`=`&#304;`, `ı`=`&#305;`). Saf İngilizce kelimede `I` zaten ASCII — sorun yok; karışık Türkçe-İngilizce başlıklarda dikkat.

Toplu liste (14 sayfada geçen): `ITSM` · `ESM` · `ITIL` · `ITIL4` · `ITIL EXPERT` · `ITIL MP` · `ITAM` · `CMDB` · `SLA` · `SDLC` · `SSO` · `SAML` · `AD` · `API` · `REST API` · `HTTPS` · `IIS` · `MSSQL` · `KVKK` · `KDV` · `TL` · `ERP` · `IT` · `BT` · `DX` · `CONFIDENTIAL` · `TIME ENGINE` · `INTERACTION MANAGEMENT` · `BACKLOG MANAGEMENT` · `AGILE KANBAN VIEW` · `CI MANAGEMENT` · `WORKFORCE MANAGEMENT` · `CUSTOM FLOW DESIGN` · `WORKFLOW ENGINE` · `LOW CODE` · `LOW CODE DESIGN` · `NO-CODE` · `MULTI-COMPANY MODE` · `MULTI-TENANT` · `SINGLE TENANT` · `ON-PREMISE` · `SERVICE DESK` · `FEDERATION ENGINE` · `SERVICE TOPOLOGIES EXPLORER` · `INTEGRATION SYSTEM` · `DISCOVERY` · `AGILE` · `SCRUM` · `MIGRATION` · `TCO` · `ROI` · `CTA` · `CORE` (444CORE) · `ISO 27001` (teyit gelirse).

> Bu kelimeler saf-ASCII olduğundan entity gerektirmez; uyarı yalnızca Türkçe+İngilizce karışık başlıkta (örn. "ITIL UZMANLIĞI" → `UZMANLI&#286;I`, "İLERİ DÜZEY" → `&#304;LER&#304;`) Türkçe harflerin entity'lenmesi içindir.
