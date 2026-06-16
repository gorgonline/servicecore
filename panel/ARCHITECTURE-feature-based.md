# Mimari — Feature-based klasör yapısı + domain-based public API

> **Karar özeti (bu oturumdaki seçimlerin):**
> 1. `typography/` ayrı bucket.
> 2. Jenerik grafikler (Bar/Donut/Line) **primitive**; `SlaGauge` **feature** (sla).
> 3. Paylaşılan yapı taşları (DataTable, PageHeader, Brand, Kbd…) **primitive** —
>    doğrudan export edilmez. Feature içinde kullanılır (örn. `IncidentTable` →
>    içeride `DataTable`). Export edilen = domain bileşeni.
> 4. Public API **domain-based** subpath (`@servicecoreui/ui/auth`, `/incident`…).

---

## 1. Temel ayrım

| Katman | Tanım | Export? |
|---|---|---|
| **typography/** | Metin primitifleri (server-safe, AntD yok) | Dahili (feature'lar kullanır) |
| **primitive/** | Tüm jenerik yapı taşları: AntD wrap'leri + jenerik chart'lar + DataTable/PageHeader/Brand/Kbd… gibi ServiceCore-jenerik bileşenler | ❌ **Export YOK** — sadece feature'lar içeriden kullanır |
| **feature/`<domain>`/** | Domain'e özel kompozisyonlar. Primitive'leri birleştirir, anlam katar (IncidentTable, AuthShell…) | ✅ **Public** — domain-based subpath |
| **theme/** | Token sistemi | ✅ `/theme` |
| **asset/** | icons + (ileride) img/svg | ✅ `/icons` |

**Altın kural:** Tüketici primitive göremez. Sadece `feature/<domain>` bileşenlerini
import eder. Bir tablo lazımsa `DataTable` değil, `IncidentTable` gibi domain
bileşeni kullanır.

---

## 2. Hedef klasör ağacı

```
src/
├── typography/
│   ├── Heading/ Display/ Text/ Eyebrow/ Code/
│
├── primitive/
│   ├── Button/ Card/ Input/ Table/ Select/ Modal/ Drawer/ Form/ …   (54 AntD wrap)
│   ├── charts/
│   │   ├── BarChart/ DonutChart/ LineChart/
│   └── (jenerik ServiceCore yapı taşları — eski "custom"un paylaşılanları)
│       ├── DataTable/ PageHeader/ Brand/ Kbd/ ListItem/ NavCard/
│       ├── CommandPalette/ SearchableMenu/ UserMenu/ RecentPanels/
│
├── feature/
│   ├── auth/            AuthShell · PasswordChecklist
│   ├── settings/        SettingsForm        (⚠ sınır — bkz. §4)
│   ├── system/          SystemMessage       (⚠ sınır)
│   ├── sla/             SlaGauge
│   ├── notification/    NotificationCenter  (⚠ sınır)
│   ├── time/            TimeTracker         (⚠ sınır)
│   └── incident/        IncidentTable …     (⟵ YENİ — henüz yok, ileride)
│
├── asset/
│   └── icons.ts
│
└── theme/              (değişmez)
```

> **Not — primitive/ alt-gruplama:** primitive/ altında AntD wrap'leri, chart'lar ve
> jenerik yapı taşlarını ayırmak için istersen `primitive/wrap/`, `primitive/charts/`,
> `primitive/block/` alt-klasörleri açılabilir. Ama derinlik arttıkça MCP tarayıcı +
> barrel yolları karmaşıklaşır. **Öneri:** primitive/ altı düz (sadece charts/ nested),
> ayrım barrel dosyalarında.

---

## 3. Bileşen → hedef haritası (tam liste)

### → `typography/`  (5)
Heading · Display · Text · Eyebrow · Code

### → `primitive/`  (54 wrap + 3 chart + 10 blok = 67)
**AntD wrap (54):** Alert · Anchor · Avatar · Badge · Breadcrumb · Button · Calendar ·
Card · Carousel · Checkbox · Collapse · ColorPicker · DatePicker · Descriptions ·
Divider · Drawer · Dropdown · Empty · Flex · FloatButton · Form · Image · Input ·
InputNumber · Mentions · Menu · Message · Modal · Notification · Popconfirm · Popover ·
Progress · QRCode · Radio · Rate · Result · Segmented · Select · Skeleton · Slider ·
Spin · Statistic · Steps · Switch · Table · Tabs · Tag · TimePicker · Timeline ·
Tooltip · Transfer · Tree · TreeSelect · Upload
**Chart (3) → `primitive/charts/`:** BarChart · DonutChart · LineChart
**Jenerik blok (10):** DataTable · PageHeader · Brand · Kbd · ListItem · NavCard ·
CommandPalette · SearchableMenu · UserMenu · RecentPanels

### → `feature/<domain>/`  (7 mevcut)
| Domain | Bileşen | Durum |
|---|---|---|
| auth | AuthShell, PasswordChecklist | net feature |
| sla | SlaGauge | net feature |
| settings | SettingsForm | ⚠ sınır (§4) |
| system | SystemMessage | ⚠ sınır (§4) |
| notification | NotificationCenter | ⚠ sınır (§4) |
| time | TimeTracker | ⚠ sınır (§4) |
| incident | IncidentTable, … | YENİ — yok |

### → `asset/`
icons.ts

---

## 4. ⚠ Karar gereken sınır bileşenler

Bunlar "jenerik mi (primitive) yoksa domain feature mı?" belirsiz:

- **SettingsForm** — data-driven jenerik form. Primitive olup domain'de
  `GeneralSettingsForm` ile sarılabilir; ya da doğrudan settings feature sayılır.
- **SystemMessage** — jenerik tam-ekran durum. Primitive olup `NotFoundPage` gibi
  domain feature'lara sarılabilir; ya da system feature sayılır.
- **NotificationCenter** — jenerik bildirim UI. Primitive + domain sarmalayıcı; ya da
  notification feature.
- **TimeTracker** — jenerik sayaç. Primitive + domain sarmalayıcı; ya da time feature.

**Default önerim:** Şimdilik bunları **feature** bırak (zaten domain-isimli kabuklar).
İleride gerçek domain ihtiyacı belirince primitive'e indirip sarmalarsın.

---

## 5. Public API (domain-based)

`package.json` `exports` — primitive/typography **dışarı açılmaz**:

```jsonc
{
  ".":              theme + (opsiyonel) hiçbir bileşen,
  "./auth":         feature/auth,
  "./settings":     feature/settings,
  "./system":       feature/system,
  "./sla":          feature/sla,
  "./notification": feature/notification,
  "./time":         feature/time,
  "./incident":     feature/incident,   // ileride
  "./icons":        asset/icons,
  "./theme":        theme,
  "./styles.css":   "...",
}
```

`build.mjs` entry'leri de domain barrel'larına döner (her domain bir entry → izole
bundle). Eski `/wraps`, `/custom`, `/features`, `/charts` subpath'leri **kaldırılır**
(veya bir sürüm deprecate). Bu, [TODO-feature-only-export.md](TODO-feature-only-export.md)
hedefiyle birleşir — o ayrı doküman bu mimaride gereksizleşir.

---

## 6. Migrasyon adımları (sırayla)

1. **Klasörleri oluştur:** `typography/`, `primitive/`, `primitive/charts/`,
   `feature/<domain>/`, `asset/`.
2. **`git mv` ile taşı** (history korunur) — yukarıdaki haritaya göre.
3. **Relative import'ları düzelt** (63 satır):
   - feature → primitive: `../Button` → `../../../primitive/Button`
   - feature → typography: `../Text` → `../../../typography/Text`
   - primitive içi (Select → Input): aynı seviye kalır.
4. **Barrel dosyaları** yeniden yaz: domain başına bir barrel
   (`feature/auth/index.ts` …). Eski `wraps.ts/custom.ts/features.ts/charts.ts` kalkar.
5. **`build.mjs`** entry'lerini domain barrel'larına çevir + banner'lar
   ("use client" feature'larda).
6. **`package.json` exports** → domain-based.
7. **MCP `build-catalog.ts`** tarayıcıyı 2-seviye nesting'e güncelle
   (`feature/<domain>/<Comp>/<Comp>.tsx`) ve primitive'leri katalogdan gizle/işaretle.
8. **`design-rules.md`** → "domain feature kullan, primitive değil".
9. **Doğrula:** `pnpm typecheck` + `pnpm build:ui` + `pnpm --filter @servicecoreui/mcp build` + `pnpm dev`.
10. **Playground:** primitive demolarını source-alias ile iç-doküman yap (paket
    specifier kalkacağı için) ya da "internal" grubuna taşı.
11. `CLAUDE.md` "Export kovaları" bölümünü domain modeline göre yeniden yaz.

---

## 7. Riskler / dikkat

- **Çok büyük breaking change** — public yüzey baştan kurgulanıyor. Sürüm: major.
- **Playground (89 dosya)** primitive'leri paket specifier'dan çekiyor → source-alias
  şart, yoksa kırılır.
- **Boş domain'ler:** incident gibi domain'lerde henüz bileşen yok; export yüzeyi
  başta çok küçük olur. Mevcut sınır bileşenler (§4) yüzeyi besler.
- **Geri dönüş zor:** git mv + barrel + exports topluca değişir; tek commit + iyi mesaj.
```
