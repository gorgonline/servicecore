# MAGIC DOC: Mimari
*Projenin teknik mimarisini, veri akisini, dosya yapisini ve onemli tasarim kararlarini takip et.*

## Stack

- Next.js 16 + React 19 + Tailwind CSS 4 + Framer Motion
- TypeScript strict
- Deploy: Vercel (root: website/)

## Monorepo Yapisi

```
servicecore/
├── brand/              — Marka kimligi (tokens.json, voice.json, assets/)
├── website/            — Next.js kurumsal site
│   └── src/
│       ├── app/
│       │   ├── (main)/     — Urun sayfalari (Turkce URL'ler)
│       │   ├── (orkestra)/ — Dahili izleme paneli
│       │   └── api/        — API route'lari
│       ├── components/     — UI bilesenleri
│       ├── data/           — JSON icerik + design-tokens.json
│       ├── lib/            — Util, helper
│       └── test/           — Testler
├── email/              — Kampanya sablonlari (pure HTML)
├── linkedin/           — Post ve gorsel sablonlari
├── docs/               — Magic Docs (bu klasor)
└── .claude/            — Rules, agents, skills
```

## Route Izolasyonu

- `(main)` = urun sayfalari (anasayfa, hizmetler, planlar, iletisim...)
- `(orkestra)` = dahili izleme paneli
- Aralarinda import YASAK. Ortak: src/components/shared/

## Veri Akisi

- brand/tokens.json → `npm run tokens` → website/src/data/design-tokens.json + globals.css + lib/tokens.ts
- brand/voice.json → icerik uretiminde referans
- website/src/data/*.json → sayfa icerikleri (hardcoded string yasak)

## Tasarim Kararlari

- Koyu tema tek tema (light yok)
- Glassmorphism zorunlu (flat = basarisizlik)
- Spring animasyon (linear yasak)
- Geist Sans + Mono (ikinci font yasak)
- Max 2 buton yan yana
- Apple-style minimalizm (ikon w-8, logo w-12 asmasin)
