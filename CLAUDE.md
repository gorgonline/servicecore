# CLAUDE.md

## Musteri
ServiceCore — Kurumsal ITSM/ESM platformu. Premium, enterprise-seviye.

## Yapi
- brand/ — tek kaynak (tokens.json, voice.json, assets/)
- website/ — Next.js 16 + React 19 + Tailwind 4 + Framer Motion
- email/ — kampanya sablonlari (pure HTML)
- linkedin/ — post ve gorsel sablonlari
- docs/ — Magic Docs (otomatik guncellenir)

## Stack (website/)
Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, TypeScript strict, Vercel deploy

## Komutlar (website/ icinden)
- `npm run dev` / `npm run build` / `npm run lint` / `npm test`
- `npm run tokens` — brand/tokens.json degistiginde calistir

## Kurallar
- Hardcoded hex YASAK — brand/tokens.json veya design-tokens.json kullan
- Hardcoded string YASAK — icerik website/src/data/*.json'da
- any YASAK — unknown kullan
- ITIL4 terminolojisine sadik kal
- Turkce icerik, profesyonel Turkce UI metinleri
- Routing: (main) route group, Turkce URL'ler
- (main) ve (orkestra) arasi import YASAK
- Yeni kanal = root'a klasor ac, brand/'den besle

## Dogrulama
- Her degisiklik sonrasi: `npm run lint` (sifir hata)
- "Bitti" demeden once lint calistir
- `npm run build` ve `git commit` kullanici istemedikce YAPMA

## Detayli Bilgi
- Mimari: docs/architecture.md
- Proje durumu: docs/durum.md
- Degisiklik loglari: docs/degisiklik-loglari.md
- Tasarim kurallari: .claude/rules/servicecore-tasarim.md
- Kod kurallari: .claude/rules/kod-kalitesi.md + website-code.md
