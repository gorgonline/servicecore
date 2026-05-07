# Datasheet Sayfasi Tasarim Karari

> Hedef: Eski PDF datasheet'inin web standardinda **whitepaper / kurumsal urun dokumani** karsiligi.
> Hem ekranda whitepaper hissi versin, hem de Playwright ile A4 PDF'e cikarildiginda kurumsal bir urun katalogu olsun.
> Uygulanacak: `website/src/app/(main)/datasheet/page.tsx` + `website/src/components/ui/datasheet-content.tsx`.

---

## 0. Sayfa Amaci

ServiceCore'un 17 ITSM/ESM modulunun **uctan uca, ITIL4 uyumlu, kurumsal seviyede** dokumantasyon ozeti. Bu sayfa hem ekranda satis-oncesi referans, hem de PDF'e cikarildiginda potansiyel musteriye iletilebilen tek dosyadir.

---

## 1. Sayfa Akisi (Ust > Alt)

| # | Bolum | Tip | A4 sayfa hedefi |
|---|-------|-----|-----------------|
| 1 | **Hero / Cover** | Tam ekran kapak | Sayfa 1 (kapak) |
| 2 | **Kunye seridi** | Meta bilgi bandi (versiyon, tarih, sayfa sayisi) | Sayfa 1 alti |
| 3 | **KPI seridi** | 4 lu numerik tile | Sayfa 2 ust |
| 4 | **Yonetici Ozeti** | Drop-cap + 1-2 paragraf | Sayfa 2 |
| 5 | **Icindekiler (TOC)** | Numerik liste + sayfa numarasi | Sayfa 3 |
| 6 | **Modul bolumleri (17 adet)** | Her modul yeni A4 sayfada acilir | Sayfa 4-26 |
| 7 | **Kapanis / Sonraki Adimlar** | CTA bandi | Sayfa 27 |
| 8 | **Iletisim ve kunye** | Footer kart | Sayfa 28 |

> Hedef: 28 sayfalik PDF -- eski PDF'in sayfa sayisini koruyoruz.

---

## 2. Hero / Cover Bolumu

### 2.1 Layout (ASCII wireframe)

```
+===========================================================================+
|                                                                           |
|                              [grid pattern arka plan]                     |
|                              [glow radial -- primary]                     |
|                                                                           |
|   [LOGO MARK 56x56]  Servicecore                                          |
|                                                                           |
|                                                                           |
|   --- ince hairline (gradient: primary -> transparent) ---                |
|                                                                           |
|   DATASHEET   |   v2026.05   |   28 sayfa   |   TR                        |
|                                                                           |
|                                                                           |
|                                                                           |
|     Kurumsal Servis                                                       |
|     Yonetimi Platformu                                                    |
|                       (h1Large -- 60-80px)                                |
|                                                                           |
|   17 modul. Tek platform. ITIL4 uyumlu.                                   |
|                       (lead -- 24px secondary)                            |
|                                                                           |
|                                                                           |
|     +-------------------------+   +---------------------------------+     |
|     | [Download icon] PDF al  |   | docs.servicecore.app  [arrow]   |     |
|     +-------------------------+   +---------------------------------+     |
|                                                                           |
|                                                                           |
|                                                                           |
|                                                                           |
|                                                                           |
|     [SAGDA: abstract dashboard composite -- bkz. mock visual #1]          |
|                                                                           |
|                                                                           |
|   --- ince hairline ---                                                   |
|                                                                           |
|   Servicecore Bilgi Teknolojileri A.S.   |   Istanbul, Turkiye            |
|   Hazirlandigi tarih: 06 Mayis 2026                                       |
+===========================================================================+
```

### 2.2 Boyut

- **Ekranda**: `min-h-[100dvh]`, `flex` ile dikey ortalama. `pt-32 pb-24`. Tam ekran kapak.
- **A4 baski**: hero blogu `print:break-after-page` ile zorla yeni sayfa baslatir; hero kendi tek A4 sayfasinda kalir.

### 2.3 Icerik (datasheet.json `cover` alanina eklenecek)

| Slot | Icerik |
|------|--------|
| Marka | "Servicecore" + logo |
| Eyebrow rozet | "DATASHEET" (mono, uppercase, primary glow) |
| Meta tile'lar | versiyon (`v2026.05`), tarih (`Mayis 2026`), sayfa sayisi (`28 sayfa`), dil (`TR`) -- kucuk mono pill |
| Baslik (h1Large) | "Kurumsal Servis Yonetimi Platformu" (gradient text: primary -> cyan) |
| Alt baslik (lead) | "17 modul. Tek platform. ITIL4 uyumlu." |
| Lead paragraf | mevcut `meta.subtitle` ("Kurumsal Servis Yonetimi (ESM) ve Servicecore ITSM Modulleri") |
| Birincil aksiyon | "PDF olarak al" (window.print) |
| Ikincil link | docs.servicecore.app |
| Kunye satiri | "Servicecore Bilgi Teknolojileri A.S. -- Istanbul, Turkiye" |

### 2.4 Gorsel ve efektler

- Arkaplanda: `effects.gradient.surfaceFade` + sol ust kose `effects.backgroundGlow.primaryStrong` + sag alt kose `effects.backgroundGlow.purpleMedium`.
- Grid pattern overlay (`effects.gridPattern`, opacity: 0.03).
- Sag yarisinda **abstract dashboard composite** (mock visual #1, bkz. bolum 6).
- Ince hairline ayraclar `effects.gradient.separatorLine`.
- Animasyon: hero badge (DATASHEET pill) -- spring giris (`animation.spring.gentle`); baslik kelime kelime fade-up (stagger 0.05s); composite SVG slow float.

### 2.5 Print davranisi

- `printBackground: true` -- glass + glow korunur.
- Hero composite SVG'leri `print:opacity-100` (default opacity korunur).
- "PDF al" buton ve secondary link sadece ekranda gorunur: `print:hidden`.

---

## 3. Kunye / Meta Seridi

Hero altinda, ince hairline ile ayrilmis tek satirlik bilgi seridi.

```
[ MODUL SAYISI 17 ]   [ ITIL4 UYUMLU ]   [ KURUMSAL SEVIYE ]   [ TR + EN ]
```

- 4 mono pill (kucuk, transparan border).
- Sadece ust ve alt hairline.
- Kullanici icin "tek bakista ne var?" cevabi.

---

## 4. KPI Seridi (Hizli Ozet)

4 sutunlu (mobilde 2x2). Ekranda animated counter, baskida statik.

| Sayi | Etiket | Detay alt yazisi |
|------|--------|-------------------|
| 17 | Modul | ITIL4 uyumlu, native entegre |
| 25 | Yil deneyim | 2000'den beri |
| 600K+ | Aktif kullanici | Kurumsal musterilerde |
| 100+ | Entegrasyon | AD, izleme, yardim masasi |

**Gorsel:** Her tile -- glass card (subtle), 88px sayi (mono, gradient text), uzerinde 12px overline etiket. `cards.subtle` token'i.

**Animasyon:** sayi `useReducedMotion` kontrollu, IntersectionObserver tetiklenince 800ms spring counter (`animation.spring.counter`). `print:` icin sayilar zaten render edilmis halde durur, animasyon olmadan gorunur.

---

## 5. Yonetici Ozeti

Tek kart, sol tarafta dikey numara ribbon (mono "00 / OZET"), sagda 2 paragraf metin.

- **Ilk paragraf**: drop-cap (ilk harf 64px, primary gradient text).
- **Ikinci paragraf**: standart body, italic son cumle.
- Icerik kaynagi: `intro.blocks[0]` veya yeniden yazim onerisi (bolum 9'da).

---

## 6. Icindekiler (TOC)

Eski PDF'in icindekiler tarzi -- doluluk hissi versin.

### 6.1 Layout

3 sutunlu modul listesi (mobilde tek sutun). Her satir:

```
01  ----  Service Desk & Interaction Management  ............................  s.04
02  ----  Incident Management  ....................................................  s.06
03  ----  Problem Management  .................................................. s.08
...
```

- Sol: 2-haneli mono numara (primary glow).
- Orta: modul adi (font-medium).
- Sag: A4 sayfa numarasi (caption, mono).
- Aralarinda dotted leader (CSS `border-bottom: dotted`).

### 6.2 Sticky TOC (sadece ekranda)

Mevcut sticky TOC sol taraftaki sidebar **kalsin** (yardimci nav), ama ust kademede de bir TOC sayfasi olsun. Sticky TOC sadece ekranda; baskida `print:hidden`.

- Sticky TOC: scroll spy ile hangi modul aktif onu vurgular (border-l + bg primary/10).

### 6.3 TOC sayfa sonu

`print:break-after-page` ile TOC kendi A4 sayfasinda kalir.

---

## 7. Modul Bolumleri (17 adet)

### 7.1 Modul header / baslangic

Her modulun ust kismi kapakvari hissi tasiyacak. Her modul baslarken once "modul opener" gorunur, sonra icerik gelir.

```
+-----------------------------------------------------------------------+
|                                                                       |
|  M O D U L                                                            |
|                                              02                       |
|     Incident Management                  (mono, 240px,                |
|     [icon Incident]                       primary outlined)           |
|                                                                       |
|  Olay yonetimi -- ITIL4 uyumlu hizli mudahale, teshis ve cozum.        |
|  ............................................................        |
|  s.06-07                                                              |
|                                                                       |
|  --- ince hairline (gradient primary -> transparent) ---              |
|                                                                       |
+-----------------------------------------------------------------------+
```

- Sol ust: kucuk overline `MODUL` (caption, mono).
- Sag ust: BUYUK numara (200-260px, mono, primary outline -- yani `text-stroke` + `text-transparent`). Paralaks gibi kismen kart disina tasar (`-mr-8`).
- Sol: 64x64 lucide icon container (icon eslesmesi: bolum 8 tablo).
- Modul adi: h2Large (60px), tracking-tight.
- Bir cumlelik aciklama (lead, max 80 karakter).
- Sayfa referansi (`s.06-07`) caption mono.
- Hairline gradient (primary -> transparent) bolumun bittigini belirtir.

**Print:** Modul opener `print:break-before-page` -- her modul yeni A4 sayfada baslar.

### 7.2 Modul icerik akisi

Modulun icindeki `items` dizisini render ederken, **modul tipine gore** 3 farkli varyant kullanilir.

#### Varyant A -- "Tek Paragraf / Ozet" (Service Desk, Change Management)

- Tek genis text bloguyla, olabildigince temiz okuma.
- Drop-cap ilk paragrafta.
- `max-w-prose` (~65ch).
- 2 sutun degil tek sutun -- bu modullerde kisa zaten.
- Yan kenarda `border-l-2 border-primary/30` ile alintilanmis hissi.

#### Varyant B -- "Cok Paragraf / Whitepaper" (Incident, Problem, Request, Asset, Configuration, Knowledge, Catalog, SLA, Reporting, Self Service Portal, Continual Improvement, Service Automation, Task Management, ESM)

Eski PDF'in birebir mantigi: paragraf paragraf akar.

- **Iki sutunlu metin akisi** (mobilde tek). `column-count: 2` + `column-gap: 48px` + `column-rule: 1px solid white/5`.
- Drop-cap ilk paragrafta.
- Subheading varsa: ust ust 32px boslukla, sol border + uppercase mono ile vurgulanir.
- Numarali bullet (`kind: "bullet"`) -- numara primary cember (`w-7 h-7 rounded-full bg-primary/10 border-primary/30`), pull-left, paragraf yaninda akar.
- Continual Improvement gibi 5 numerik bullet'i olan modullerde, bullet'lar 2 sutundan cikip TEK sutunlu numbered list olur (CSS `column-span: all`).

#### Varyant C -- "Feature Grid" (Sadece Project Management)

- 13 feature kartini icerir + 2 subheading.
- Subheading'ler full-width section break (h3, primary border-l).
- Feature'lar **alternating zig-zag** yerine, `grid-cols-12` icinde **bento layout**:
  - Onemli 3 kart (Dashboard, Kanban, Sprint) -- col-span-6
  - Geri kalan -- col-span-4 veya col-span-3
- Her feature kart icinde:
  - Sol ust: kucuk mono index (`F.01`, `F.02` ...)
  - Baslik (h4)
  - Aciklama (small)
  - `checks` -- her birinde kucuk CheckCircle2 icon (`accent-blue-light`)
  - Hover: border-blue-500/30, glow blue
- **Onemli:** Project Management bolumu A4'de 2-3 sayfa kaplar; bento layout `print:grid-cols-2` ile sadelesir, kartlar break-inside-avoid.

### 7.3 Modul bolumu print kurallari

- `break-before-page` her modul opener'da.
- Modul icindeki paragraflar `break-inside-avoid` (bolunmesin diye).
- Feature kartlari `break-inside-avoid`.
- Numerik bullet listesi `break-inside-avoid` (5 bullet beraber kalsin).

---

## 8. Modul Accent Renk Haritasi

Modules-grid bilesenindeki gorseli korumak icin **her modul kendi accent rengini** alir. Modul opener'in sag ust numara stroke rengi, sol ust icon background ve hairline gradient bu accent'ten beslenir.

| # | Modul | Accent token | Icon (lucide) | Modul opener gradient stop |
|---|-------|--------------|--------------|----------------------------|
| 01 | Service Desk & Interaction | accent.blue | `MessageSquare` | blue.base -> transparent |
| 02 | Incident Management | accent.red | `AlertCircle` | red.base -> transparent |
| 03 | Problem Management | accent.amber | `HelpCircle` | amber.base -> transparent |
| 04 | Request Management | accent.cyan | `FileText` | cyan.base -> transparent |
| 05 | Change Management | accent.purple | `RefreshCw` | purple.base -> transparent |
| 06 | Asset Management | accent.orange | `Box` | orange.base -> transparent |
| 07 | Configuration & CMDB | accent.blue | `Settings` | blue.dark -> transparent |
| 08 | Knowledge Management | accent.sky | `BookOpen` | sky.base -> transparent |
| 09 | Continual Improvement | accent.emerald | `TrendingUp` | emerald.base -> transparent |
| 10 | Measurement & Reporting | accent.cyan | `LineChart` | cyan.dark -> transparent |
| 11 | Service Catalog | accent.pink | `Store` | pink.base -> transparent |
| 12 | Service Level Mgmt | accent.cyan | `Activity` | cyan.base -> transparent |
| 13 | Service Automation | accent.emerald | `Terminal` | emerald.dark -> transparent |
| 14 | Self Service Portal | accent.amber | `Smartphone` | amber.base -> transparent |
| 15 | Task Management | accent.emerald | `ListTodo` | emerald.base -> transparent |
| 16 | Project Management | accent.orange | `Briefcase` | orange.base -> transparent |
| 17 | Enterprise Service Mgmt | accent.purple | `GitBranch` | purple.dark -> transparent |

> **Not:** Notlardan `Self Service Portal` (modules-grid'de `PortalModule`) modul listesinde 12. sirada degil 12. sirada **Self Service Portal** olarak gectigine dikkat. datasheet.json modul sirasi PDF'i takip eder; opener'lar bu siraya gore numerik etiketlenir.

> **Govde rengi degismez.** Sadece: modul opener numarasi, icon container, hairline ve sticky TOC'da modul aktifken sol border bu accent'i kullanir. Body text her zaman `text-secondary` kalir -- kurumsal ton bozulmasin.

---

## 9. Tipografi Hiyerarsi Tablosu

| Eleman | Token | Boyut | Weight | Renk | Kullanim |
|--------|-------|-------|--------|------|----------|
| Hero baslik | `typography.heading.h1` (custom 80px lg) | 48/64/80px | 700 | white + gradient overlay | Cover h1 |
| Modul adi | `typography.heading.h2Large` | 36/48/60px | 500 | white | Modul opener |
| Bolum subheading | `typography.heading.h3` | 20/24px | 600 | white | "Operasyonel Derinlik" gibi modul ici alt baslik |
| Feature kart basligi | `typography.heading.h4` | 18px | 600 | white | Project Management feature kartlari |
| Lead | `typography.body.leadLarge` | 18/24px | 300 | secondary | Hero alt baslik, modul opener bir cumle |
| Body | `typography.body.base` | 16px | 300 | secondary | Tum paragraflar |
| Drop-cap | custom 64px (mono) | 64px | 700 | gradient (primary->cyan) | Yonetici Ozeti + her modul ilk paragrafi |
| Module display number | mono | 200/260px | 700 | text-transparent + text-stroke primary/40 | Modul opener buyuk numara |
| Overline | `typography.overline` | 12px | 600 | text-overline (cbd5e1) | "MODUL", "DATASHEET" |
| Mono pill / sayfa ref | `typography.caption` mono | 12px | 500 | muted | "v2026.05", "s.06-07" |
| Numerik bullet | mono | 14px (cember icinde) | 700 | accent.blue | Continual Improvement 1-5 bullet |

---

## 10. Mock Visual Onerileri

Builder agent inline SVG ile uretsin. Hardcoded fotograf YOK -- abstrak gorsel.

### Mock #1 -- Hero Composite (Cover)

Sag yarida, sayfa kayrak halinde duran **ucgen kompozisyon**:
- Arka katman: 380x240 abstrak "dashboard" -- 4 KPI tile + 1 line chart sketch (sadece path, fill yok).
- Orta katman: 280x180 "ticket detay" panel mock.
- On katman: 200x140 "kanban kolon" mock.
- Hepsi glass-frame: `bg-white/4 border-white/10 backdrop-blur-xl rounded-2xl`.
- Yumusak float animasyonu (her katman farkli amplitud, `animation.keyframes.float`).
- Reduced motion'da statik.

### Mock #2 -- Yonetici Ozeti yan vinyet

Yonetici ozeti sag tarafinda kucuk (240x320) abstract sema:
- 17 modul = 17 nokta, ortada bir ServiceCore mark dairesi, modulleri merkeze baglayan ince cizgiler.
- Hover'da modul noktalari sirayla pulse.
- Sticky TOC'a refleks: scroll edildiginde aktif modulun noktasi parlar.

### Mock #3 -- Modul opener'da kuçuk decorative SVG

Her modul opener'in sag tarafinda accent rengiyle uyumlu 96x96 abstract glyph (line art):
- Service Desk -> 3 cevrim katmani (omnichannel)
- Incident -> dalga (alarm)
- Problem -> ag/dugum
- Request -> akis ok
- Change -> rotation
- Asset -> stack 3D
- Configuration -> grid
- Knowledge -> kitap acik sayfa
- Continual Improvement -> spiral yukari
- Reporting -> bar chart up
- Catalog -> kart raf
- SLA -> gosterge clock
- Service Automation -> dis carki
- Self Service -> mobil + chat
- Task -> kanban kolon
- Project -> gantt sketch
- ESM -> dallanma

Hepsi uniform `stroke-1.5`, `accent.<renk>.light` stroke, `accent.<renk>.dark` fill (ince).

### Mock #4 -- KPI sayilarinin alti

Her KPI tile'in altinda 1px sparkline veya progress sembolu (saatca 600K progress doluyor goruntusu). Cok kucuk, sade, dikkat dagitmasin.

### Mock #5 -- Kapanis CTA bandi

"Dijital donusumunuze baslamak icin..." baslikli kapanis bandi.
- Buyuk gradient blob arka planda (primary + emerald karisim, mesh).
- 2 buton: "Demo Iste" (primary) + "Teklif Iste" (secondary).
- 4 link: docs, support, www, hotline (444CORE).

---

## 11. Sayfa Kirilim Stratejisi (A4 PDF)

> Print CSS web koyu temayi koruyacak. `printBackground: true` Playwright'da set edildigi icin gradient ve glass renderlanir.

### 11.1 Tailwind print utility'leri

```
print:break-before-page    -> her modul opener
print:break-after-page     -> hero, TOC, kapanis CTA
print:break-inside-avoid   -> her paragraf, her feature kart, her KPI tile, numerik bullet listesi
print:hidden               -> sticky TOC, "PDF al" butonu, navbar/footer wrapper
print:opacity-100          -> glow, gradient blob (default'ta render olur)
```

### 11.2 Margin

`@page` kuralinda `15mm` margin. Ekranda hero `min-h-[100dvh]` ama print'te `min-h-[260mm]` (A4 -- margin).

### 11.3 Sayfa numarasi

`@page` kuralinda `@bottom-right { content: counter(page) " / " counter(pages); }` mono caption.
Sol altta: "Servicecore Datasheet -- v2026.05".

### 11.4 Olcek

Hero ve modul opener tipografisi A4'te biraz daha kucuk olsun:
- h1 ekranda 80px -> printte 56px
- h2Large ekranda 60px -> printte 40px
- 200px modul number -> printte 140px
- Body 16px -> printte 11pt (yaklasik 14.6px)

Bunu `@media print` icinde override ile cozeriz.

### 11.5 Renkler

`-webkit-print-color-adjust: exact;` ve `print-color-adjust: exact;` body'ye -- gradient ve glow korunur.

### 11.6 Ozel sayfa kirilim noktalari

- Hero -> sayfa 1 (break-after-page).
- Meta + KPI seridi -> sayfa 2.
- Yonetici ozeti -> sayfa 2-3.
- TOC -> sayfa 3 (break-after-page).
- Her modul -> kendi sayfasinda baslar (break-before-page).
- Project Management -> 3 sayfaya kadar yayilabilir, feature kartlari break-inside-avoid.
- Continual Improvement (en uzun, 9 paragraf + 5 numerik bullet) -> 2-3 sayfa.
- Kapanis CTA -> kendi sayfasinda (break-before-page).
- Iletisim footer -> son sayfa.

---

## 12. UI Detaylari (Builder agent icin uyari listesi)

### 12.1 Navbar / Footer

- Ekranda mevcut (main) layout navbar/footer korunur.
- Print'te: `print:hidden` global wrapper'a uygulanir, sadece datasheet content basilir.

### 12.2 Sticky TOC

Mevcut sticky TOC kalsin ama:
- Sadece ekranda gorunur.
- Scroll spy: aktif modul highlight (sol border accent rengi, bg accent/8).
- `print:hidden`.

### 12.3 Anchor scroll offset

`scroll-mt-28` (mevcut) -- sticky navbar'a takilmaz. Modul opener'larda korunsun.

### 12.4 Erisilebilirlik

- Hero h1 tek olmali, modul basliklari h2.
- Lucide icon'larina `aria-hidden`.
- Modul opener buyuk decorative numara: `aria-hidden`.
- TOC linkleri `aria-current="location"` (active modul icin).

### 12.5 Animasyon

- Tum spring `prefers-reduced-motion` kontrollu (`useReducedMotion` hook).
- Hero composite SVG animasyonu sadece hero gorunurken; off-screen oldugunda animasyon durur.
- KPI counter sadece IntersectionObserver tetiklenince calisir.

### 12.6 Boyutlar

- Container: `max-w-[1400px]` (datasheet whitepaper hissi icin biraz daha genis).
- Modul opener `py-32`, modul body `py-16` ile baslar.
- Feature kartlari max `p-8`, mobilde `p-6`.

---

## 13. Icerik (datasheet.json) icin Onerilen Genisletmeler

Builder agent JSON'a dokunmasin. Su anki JSON yeterli **ama** asagidaki alanlari ekleseniz daha iyi olur:

### 13.1 `meta` genisletilsin

```json
"meta": {
  "source": "datasheet.pdf",
  "title": "Servicecore Datasheet",
  "subtitle": "Kurumsal Servis Yonetimi (ESM) ve Servicecore ITSM Modulleri",
  "platform_label": "BT Servis Yonetimi (ITSM) Platformu",
  "extracted_modules": 17,
  "version": "v2026.05",
  "release_date": "Mayis 2026",
  "release_date_iso": "2026-05",
  "page_count": 28,
  "language": "TR",
  "company_full": "Servicecore Bilgi Teknolojileri A.S.",
  "company_location": "Istanbul, Turkiye"
}
```

### 13.2 `cover` blogu eklensin

```json
"cover": {
  "eyebrow": "DATASHEET",
  "title_main": "Kurumsal Servis Yonetimi",
  "title_accent": "Platformu",
  "lede": "17 modul. Tek platform. ITIL4 uyumlu.",
  "description": "Kurumsal servis yonetimini, BT operasyonlarini ve proje sureclerini tek platformda dijitallestirin.",
  "primary_cta": { "label": "PDF olarak al", "action": "print" },
  "secondary_cta": { "label": "docs.servicecore.app", "href": "https://docs.servicecore.app" }
}
```

### 13.3 `kpis` blogu eklensin

```json
"kpis": [
  { "value": "17", "label": "Modul", "detail": "ITIL4 uyumlu, native entegre" },
  { "value": "25", "suffix": " yil", "label": "Deneyim", "detail": "2000'den beri" },
  { "value": "600.000", "suffix": "+", "label": "Aktif kullanici", "detail": "Kurumsal musterilerde" },
  { "value": "100", "suffix": "+", "label": "Entegrasyon", "detail": "AD, monitoring, helpdesk" }
]
```

### 13.4 `executive_summary` blogu eklensin

```json
"executive_summary": {
  "lead_drop_cap": "S",
  "paragraphs": [
    "Servicecore, 25 yili askin servis yonetimi tecrubesinin urunu olan kurumsal seviye bir ITSM ve ESM platformudur. ITIL4 yazarlarinin tasarim sureclerine katildigi bu platform, BT operasyonlarini, proje yonetimini ve kurumsal hizmet sureclerini tek altyapida birlestirir.",
    "Bu datasheet, platformun 17 ana modulunun amaclarini, ITIL4 ile entegrasyonunu ve kurumsal donusum surecindeki rollerini ozetler. Her modul, native entegrasyonlu calisir; modulden module degisen koklerine ragmen tek veri modeli ve tek arayuz uzerinden yonetilir."
  ],
  "highlight": "ITIL4 yazarlarinin tasarim sureclerine katildigi tek Turk yapimi platform."
}
```

### 13.5 Her modulde `accent` ve `icon` alani

```json
{
  "id": "incident-management",
  "title": "Incident Management",
  "title_tr": "Olay Yonetimi",
  "tagline": "Olaylarin hizli mudahale, teshis ve cozumu.",
  "accent": "red",
  "icon": "AlertCircle",
  "pages": [4, 5],
  "items": [...]
}
```

### 13.6 `closing` blogu eklensin

```json
"closing": {
  "eyebrow": "SONRAKI ADIMLAR",
  "title": "Dijital donusumunuze baslamak icin",
  "description": "Servicecore ekibi, kurumsal servis yonetimi ihtiyaclarinizi anlamak ve cozumu birlikte tasarlamak icin sizinle gorusmeye hazir.",
  "ctas": [
    { "label": "Demo Iste", "href": "/demo", "variant": "primary" },
    { "label": "Teklif Iste", "href": "/teklif", "variant": "secondary" }
  ],
  "links": [
    { "label": "docs.servicecore.app", "href": "https://docs.servicecore.app" },
    { "label": "support.servicecore.app", "href": "https://support.servicecore.app" },
    { "label": "info@servicecore.com.tr", "href": "mailto:info@servicecore.com.tr" },
    { "label": "444CORE", "href": "tel:444CORE" }
  ]
}
```

> **Yine de:** JSON'a dokunmadan da builder agent en azindan KPI ve cover'i `voice.json` + `meta` mevcut alanlarindan turetebilir. Yukaridaki onerileri builder agent uygularsa, yapi temiz olur.

---

## 14. Riskler ve Notlar

1. **Continual Improvement modulu** -- 9 paragraf + 5 numerik bullet. En uzun bolum. Iki sutun layout'unda 5 bullet `column-span: all` olmali ki numerik liste bolunmesin.
2. **Project Management modulu** -- 13 feature kartini bento'da yerlestirmek karmasik. Builder agent kart sayisi 13 oldugu icin matematik olarak grid-cols-12 uzerinden 6+6, 4+4+4, 3+3+3+3 kombinasyonu ile yerlestirsin. Asagidaki **dagilim onerisi**:
   - Row 1: Dashboard (col-6), Kanban (col-6)
   - Row 2: Sprint Kapasitesi (col-4), Backlog (col-4), Isi Haritasi (col-4)
   - Row 3: Workload (col-6), Gantt (col-6)
   - **Subheading** "Operasyonel Derinlik" tam genislik
   - Row 4: Scheduler (col-4), Workflow (col-4), Task Types (col-4)
   - Row 5: Worklog (col-4), Board (col-4), Table (col-4)
3. **Print + glass:** Bazi tarayicilarda backdrop-blur print'te bozulabilir. Builder agent `@media print` icinde `backdrop-filter: none; background: rgba(255,255,255,0.04);` fallback uygulasin.
4. **Drop-cap** ozelligi `::first-letter` ile yapilirsa Firefox print'te bazen kayar. Builder agent drop-cap'i ayri bir `<span>` ile `float-left` olarak yapsin.
5. **Sayfa numarasi `@page`** sadece print'te calisir. Ekranda anchor href'lerinde `s.06-07` referansi gozukur.
6. **17 modul x 17 inline SVG glyph** = 17 ufak bilesen. Builder agent bunlari ayri dosya yapmasin, `datasheet-content.tsx` icinde tek `MODULE_GLYPHS` map olarak versin.
7. **Sticky TOC scroll spy** mobilde kullanim disi -- mobilde TOC'i drawer butonu ile actirin (alt sag floating button), `print:hidden`.
8. **Kapanis CTA bandi** ekranda animated mesh gradient olabilir; baskida animasyon donduruldugunda statik gradient kalmali.
9. **Fontlar:** Geist Sans + Geist Mono. Whitepaper hissi icin govde paragraflar `font-light` yerine `font-normal` (400) **degil** -- whitepaper'larda body 400 daha rahat okunur ama tasarim kuralimiz `font-light` (300). Builder agent kuralimiza sadik kalsin: body 300, ama leading `1.7` ile genisletilsin (default 1.6 yerine).
10. **A4 pratik kontrol:** Builder agent bitirince Playwright ile bir test PDF cikartip 28 sayfa sayisini, modul break'lerini ve drop-cap'i kontrol etmeli.

---

## 15. Builder Checklist

- [ ] Hero kapak `min-h-[100dvh]` + `print:break-after-page`.
- [ ] KPI seridi 4 tile + animated counter + reduced motion fallback.
- [ ] Yonetici ozeti drop-cap.
- [ ] Icindekiler tam sayfa + dotted leader + sayfa referanslari.
- [ ] Sticky TOC scroll spy + active highlight + `print:hidden`.
- [ ] 17 modul opener -- buyuk numara + accent renk + icon glyph.
- [ ] Modul varyant A / B / C secimi -- modul tipine gore.
- [ ] Project Management bento layout (yukaridaki dagilim).
- [ ] Modul ici 2 sutun text + drop-cap + numerik bullet column-span all.
- [ ] Print CSS: break utility'leri, @page margin, sayfa numarasi, renk korumasi.
- [ ] Kapanis CTA bandi + iletisim footer.
- [ ] Lucide icon eslemesi (bolum 8 tablosu).
- [ ] Inline SVG glyph haritasi (bolum 10 mock #3).
- [ ] `prefers-reduced-motion` her animasyonda.
- [ ] `npm run lint` sifir hata.
- [ ] Playwright print testi -> 28 sayfa, modul break'leri dogru.
