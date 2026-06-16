# TODO — Primitive'leri gizle, sadece feature bileşenleri dışarı aç

> ## ✅ TAMAMLANDI (2026-06-15)
> Public yüzey artık **sadece** domain feature'ları + theme:
> - **AÇIK:** `.` (theme+VERSION) · `/theme` · `/auth` · `/settings` · `/system` · `/sla` · `/notification` · `/time` · `/styles.css` · `/tokens.css`
> - **BLOK (node exports'tan kaldırıldı):** `/wraps` · `/custom` · `/charts` · `/features` · `/icons` + typography + tüm primitive'ler
> - Playground iç katalog olarak çalışmaya devam ediyor — kaldırılan yolları `apps/playground/tsconfig.json` `paths` ile iç dist hedeflerine alias'lıyor.
> - Mimari detay: [ARCHITECTURE-feature-based.md](ARCHITECTURE-feature-based.md) · `src/` katmanlı (typography/primitive/feature/asset/theme + _internal toplayıcılar).
>
> Aşağıdaki orijinal plan tarihsel referans olarak duruyor.

---

> **Amaç:** Tüketici geliştirici sıfırdan tasarım kurmasın. Bizim hazırladığımız
> **feature bileşenlerini** (AuthShell, SettingsForm, DataTable, PageHeader…)
> kullansın. Ham primitive'ler (Button, Card, Input, Table… = `/wraps` kovası)
> paketin public yüzeyinden **çıkarılacak**.

---

## 1. Mevcut export yüzeyi

| Subpath | İçerik | Karar |
|---|---|---|
| `@servicecoreui/ui` (`.`) | Typography primitifleri (Heading, Display, Text, Eyebrow, Code) + theme | ⚠️ Karar gerek (aşağıda) |
| `@servicecoreui/ui/wraps` | **50+ AntD wrap** (Button, Card, Input, Table, Select…) | ❌ **Gizlenecek** — asıl hedef |
| `@servicecoreui/ui/custom` | ServiceCore'a özel (DataTable, CommandPalette, PageHeader, UserMenu…) | ✅ Kalır (feature yüzeyi) |
| `@servicecoreui/ui/features` | Sayfa yapıtaşları (AuthShell, PasswordChecklist, SystemMessage, SettingsForm) | ✅ Kalır (feature yüzeyi) |
| `@servicecoreui/ui/charts` | Recharts grafikleri | ✅ Kalır |
| `@servicecoreui/ui/icons` | Carbon ikon re-export | ✅ Kalır |
| `@servicecoreui/ui/theme` | Token + ConfigProvider teması | ✅ Kalır |

---

## 2. Kritik bulgu — iç kompozisyon GÜVENLİ ✅

Feature/custom bileşenleri wraps'ı **relative path** ile içe aktarıyor
(`import { Button } from "../Button"`), npm subpath ile değil. esbuild bunları
bundle'a **gömüyor** (`build.mjs` EXTERNAL = sadece react/antd/carbon/clsx/recharts).

**Sonuç:** `/wraps` public export'unu kaldırmak DataTable, SettingsForm, UserMenu
gibi feature'ları **kırmaz**. Primitive'ler içeride yaşamaya devam eder, sadece
dışarı kapı kapanır. Bu işi düşük riskli yapan ana faktör.

---

## 3. Önce KARAR ver (bunlar TODO'nun içeriğini değiştirir)

- [ ] **K1 — Typography primitifleri (`.` ana entry) ne olacak?**
  Heading/Display/Text/Eyebrow/Code de "primitive". Tüketici bunlarla serbest
  tasarım kurabilir.
  - **Öneri:** Şimdilik **kalsın** (feature bileşenleri zaten bunları kullanıyor;
    metin yazmak için gerekli, "tasarım kurma" riski düşük). Yalnız `/wraps`'a odaklan.
- [ ] **K2 — Playground wrap demo sayfaları (89 dosya) ne olacak?**
  Playground `@servicecoreui/ui/wraps`'ı yoğun kullanıyor; export kalkınca kırılır.
  - **Öneri:** Playground'a **source alias** ekle (`@servicecoreui/ui/wraps` →
    `packages/ui/src/wraps.ts`) → demolar iç dokümantasyon olarak yaşamaya devam
    eder, ama npm yüzeyi temiz kalır. (Alternatif: demo sayfalarını sil — bilgi kaybı.)
- [ ] **K3 — `/wraps` tam mı kaldırılsın, deprecate mi edilsin?**
  Backend ekibi şu an `/wraps`'tan import ediyorsa, sert kaldırma onları kırar.
  - **Öneri:** v0.7.0'da `exports`'tan **tamamen çıkar** (henüz erken faz, tüketici az).
    Eğer canlı tüketici varsa → bir minor sürüm "deprecated, taşıyın" uyarısıyla bekle.

---

## 4. TODO — Paket (`packages/ui`)

- [ ] `package.json` → `exports`'tan `"./wraps"` girişini **kaldır**
      ([packages/ui/package.json](packages/ui/package.json))
- [ ] `build.mjs` → `wraps` entry'sini build listesinden çıkar (artık dist'e yazma)
      ([packages/ui/build.mjs](packages/ui/build.mjs))
      - Not: `src/wraps.ts` **dosyası kalsın** — playground source-alias'tan ve
        feature'lar relative import'tan hâlâ ihtiyaç duyabilir; sadece public
        entry/çıktı kalkıyor.
- [ ] `src/custom.ts` ve `src/features.ts` wraps'ı re-export ETMEDİĞİNİ doğrula
      (şu an etmiyor — sadece kendi bileşenlerini açıyor ✅)
- [ ] `pnpm build:ui` → dist'te `wraps.js/.cjs/.d.ts` **olmadığını** doğrula
- [ ] `pnpm typecheck` → feature/custom bileşenleri hâlâ derleniyor mu kontrol et

## 5. TODO — Playground (`apps/playground`)  *(K2'ye bağlı)*

- [ ] **K2 = source alias** seçilirse: `apps/playground/tsconfig.json` `paths`'e
      `"@servicecoreui/ui/wraps": ["../../packages/ui/src/wraps.ts"]` ekle
      ([apps/playground/tsconfig.json](apps/playground/tsconfig.json))
- [ ] Next webpack/turbopack çözümlemesi için aynı alias'ı `next.config` tarafında
      da gerekiyorsa ekle (tsconfig paths Next'te otomatik çalışabilir — doğrula)
- [ ] `pnpm dev` → playground'un 200 döndüğünü ve wrap demo sayfalarının açıldığını
      doğrula
- [ ] Nav'da wrap demolarını "İç / Geliştirici" grubu altına taşımayı değerlendir
      (tüketiciye "bunları kullan" sinyali vermesin)

## 6. TODO — MCP kataloğu (`packages/mcp`)  ← kolay atlanır, önemli

AI ajanı şu an **yanlış** yönlendiriliyor: feature-only stratejisiyle çelişiyor.

- [ ] `design-rules.md` Kural #1'i **tersine çevir**: "AntD'yi değil `/wraps`'ı
      kullan" → "ham primitive kullanma, **feature bileşenlerini** kullan
      (`@servicecoreui/ui/features` · `/custom`)"
      ([packages/mcp/design-rules.md](packages/mcp/design-rules.md))
- [ ] `build-catalog.ts` → wrap bileşenlerini katalogdan **çıkar** veya
      "internal, doğrudan kullanma" olarak işaretle; `list_components`/
      `find_component` feature'ları öne çıkarsın
      ([packages/mcp/src/build-catalog.ts](packages/mcp/src/build-catalog.ts))
- [ ] `pnpm --filter @servicecoreui/mcp build` → kataloğu yeniden üret
- [ ] `get_design_rules` ve `list_components` çıktısını gözden geçir (AI'a artık
      Button/Card önermiyor)

## 7. TODO — Dokümantasyon

- [ ] `CLAUDE.md` "Export kovaları" bölümünü güncelle: `/wraps` artık **internal**,
      public değil ([CLAUDE.md](CLAUDE.md))
- [ ] `packages/ui/README.md` kullanım örneklerinden `/wraps` import'larını çıkar,
      feature import örnekleriyle değiştir
- [ ] "Yeni custom bileşen eklerken" akışını gözden geçir (wraps'a public referans varsa)

---

## 8. Riskler / dikkat

- **Breaking change:** Bu bir major davranış değişikliği. Backend ekibi `/wraps`'tan
  import ediyorsa sürüm notunda açıkça belirt (K3).
- **Feature kapsamı yetiyor mu?** `/features` şu an sadece 4 bileşen
  (AuthShell, PasswordChecklist, SystemMessage, SettingsForm). Primitive'leri
  kapatınca tüketici "ekranı nasıl kuracağım?" diye sıkışabilir. Kapatmadan önce
  feature kataloğunun ihtiyacı karşıladığını gözden geçir — gerekirse önce eksik
  feature bileşenlerini ekle, sonra kapıyı kapat.
- **`tsc` .d.ts:** `exports`'tan çıkarınca tip çözümlemesi de kapanır; eski import'lar
  TS hatası verir (istenen davranış, ama tüketiciye haber ver).
- **Playground = canlı doküman:** Wrap demoları silinirse o bilgi kaybolur; alias
  yaklaşımı (K2) bunu korur.

---

## 9. Önerilen sıra

1. K1–K3 kararlarını ver (gerekirse bana sor).
2. (Gerekiyorsa) eksik feature bileşenlerini tamamla.
3. Paket: `exports`'tan `/wraps` çıkar + `build.mjs` güncelle → build + typecheck.
4. Playground: source alias → `pnpm dev` ile doğrula.
5. MCP: design-rules + catalog güncelle → yeniden build.
6. Docs: CLAUDE.md + README.
7. `pnpm sync-deploy "feat: primitive'ler internal, public yüzey feature-only"`.
