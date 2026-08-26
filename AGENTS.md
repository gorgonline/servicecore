# AGENTS.md — ServiceCore

> Bu dosya projede çalışan **tüm AI ajanları** için sözleşmedir (Codex, Claude Code, diğerleri).
> Codex bu dosyayı her oturumda otomatik okur. Kurallar tavsiye değil, zorunluluktur.

## Proje

ServiceCore — kurumsal ITSM/ESM platformu. Bu repo **pazarlama sitesi** ve marka varlıklarıdır, ürünün kendisi değil.
Ton: premium, enterprise, güven veren. Abartılı satış dili yok.

## Yapı

```
brand/       tek kaynak — tokens.json (renk/tipografi), voice.json (ton), assets/
website/     Next.js 16 + React 19 + Tailwind 4 + TypeScript strict + Framer Motion → Vercel
panel/       AntD 5.7 wrap UI kütüphanesi (@servicecore/ui), pnpm monorepo — ayrı sistem
email/       kampanya şablonları (saf HTML)
docs/        proje dokümantasyonu
```

`projectcore/` ve `servicecore-app/` gitignore'da — **ayrı repolar**, buradan dokunulmaz.
`social/` gitignore'da — canlı API anahtarları var, repoya girmez.

## Komutlar (`website/` içinden)

```bash
npm run dev      # geliştirme
npm run lint     # eslint — SIFIR hata zorunlu
npm run build    # production build
npm test         # testler
npm run tokens   # brand/tokens.json değiştiğinde çalıştır
```

## Sert kurallar — ihlal = kabul edilmez

1. **Hardcoded hex YASAK.** Renk `brand/tokens.json` veya `website/src/data/design-tokens.json`'dan gelir.
2. **Hardcoded string YASAK.** Kullanıcıya görünen tüm metin `website/src/data/*.json` içinde durur, TSX'e gömülmez.
3. **`any` YASAK.** Bilinmeyen tip için `unknown` kullan.
4. **Türkçe URL.** Route'lar Türkçe: `/egitimler`, `/olay-yonetimi` — `/trainings` değil.
5. **Route izolasyonu.** `(main)` ve `(orkestra)` route group'ları arasında import YASAK.
6. **Tek tema.** Sadece koyu tema. Light tema yok.
7. **Tek font.** Geist Sans + Geist Mono. İkinci font YASAK.
8. **ITIL4 terminolojisi.** Olay/Problem/Değişiklik/İstek terimleri doğru kullanılır, uydurulmaz.
9. **Türkçe içerik.** Arayüz metinleri profesyonel Türkçe.
10. **Uydurma rakam YASAK.** Müşteri sayısı, oran, performans iddiası — kaynağı yoksa yazma.

### Türkçe yazım — büyük "I" kuralı
İngilizce kelime ve kısaltmalarda **düz "I"** kullanılır (IT, ITIL, ITSM, API).
Noktalı **"İ"** yalnızca Türkçe kelimelerde (İstek, İş Akışı, İnsan Kaynakları).

## Kod kuralları

- Server Components varsayılan. `'use client'` sadece state/effect/event gerektiğinde.
- Tıklanabilir her elemanda `cursor-pointer` zorunlu.
- `next/image` kullan, `alt` metni Türkçe.
- Props aynı dosyada tanımlanır, export edilmez. `interface` tercih edilir.
- Kullanılmayan import YASAK. Import'ta `@/` prefix kullan.

### Dosya yerleşimi
```
Bileşen  website/src/components/<Ad>.tsx
Sayfa    website/src/app/(main)/<route>/page.tsx
API      website/src/app/api/<route>/route.ts
Hook     website/src/hooks/use<Ad>.ts
Util     website/src/lib/<ad>.ts
Veri     website/src/data/<ad>.json
```

## Çıktı kalitesi

Kısmi çıktı = bozuk çıktı. Dosya istendiğinde tamamı verilir.
`// ...`, `// rest of the code`, `// TODO: implement`, "kalanı benzer şekilde" **YASAK**.
Import satırları dahil yazılır — "gerekli import'ları ekleyin" demek yasak.

## Doğrulama — her değişiklikten sonra

1. `npm run lint` → sıfır hata (zorunlu)
2. Değişiklik `website/` altındaysa `npm run build` ile doğrula
3. Yeni metin eklediysen JSON'da mı kontrol et
4. Yeni renk kullandıysan token'dan mı geldiğini kontrol et

## Git ve deploy

- **`main`'e push = canlı yayın.** Vercel otomatik deploy eder, ~2 dakikada `servicecore.com.tr`'de.
- Commit mesajı **Türkçe**, formatı: `<kapsam>: <ne yapıldı>` — örn. `egitimler: CSSM-P tarihi güncellendi`
- Tek commit = tek iş birimi.
- Sürüm tag'i: `vX.Y.0` sıralı, annotated, mesajı commit mesajıyla aynı. Son: `v1.80.0`
- Push etmeden önce `npm run lint` çalıştır. Kırık kod push edilirse site eski sürümde takılı kalır.

## Detaylı kaynaklar

| Konu | Dosya |
|---|---|
| Tasarım dili (renk, tipografi, spacing, animasyon) | `.claude/rules/servicecore-tasarim.md` |
| Kod kalitesi | `.claude/rules/kod-kalitesi.md` |
| Çıktı kuralları | `.claude/rules/output-guard.md` |
| E-posta şablonları | `.claude/rules/email.md` |
| Sosyal medya görselleri | `.claude/rules/linkedin.md` |
| Marka tokenları | `brand/tokens.json` |
| Marka tonu, müşteri listesi, iletişim | `brand/voice.json` |

`CLAUDE.md` Claude Code'a özel ajan zinciri ve skill tanımlarını içerir — diğer ajanlar için gerekli değildir.
