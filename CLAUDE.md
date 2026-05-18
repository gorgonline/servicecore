# CLAUDE.md

## Musteri
ServiceCore — Kurumsal ITSM/ESM platformu. Premium, enterprise-seviye.

## Yapi
- brand/ — tek kaynak (tokens.json, voice.json, assets/)
- website/ — Next.js 16 + React 19 + Tailwind 4 + Framer Motion
- panel/ — AntD 5.7 wrap UI library (@servicecore/ui, GitHub Packages). pnpm monorepo: packages/ui + apps/playground. Detay: panel/CLAUDE.md
- email/ — kampanya sablonlari (pure HTML)

## Stack (website/)
Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, TypeScript strict, Vercel deploy

## Komutlar (website/ icinden)
- `npm run dev` / `npm run build` / `npm run lint` / `npm test`
- `npm run tokens` — brand/tokens.json degistiginde calistir

## Musteri Mesaji Akisi
Mesaj (Teams/email/sozlu) geldiginde — bu siniflandirma ana Claude'un isi, ayri ajan YOK:
1. **Sinifla:** operasyon (website/panel/social/email/brand), is tipi (yeni/duzeltme/bug/icerik), aciliyet
2. **Eksik bilgi varsa once sor** (hangi sayfa, ornek, deadline)
3. **Recete varsa cagir** (`/sayfa`, vs.). Yoksa ajan zincirini elle baslat: designer → builder → reviewer → verifier
4. **Bug ise** once researcher ile yer bul, sonra builder ile cozumu yaz

## Ajanlar
- **designer** — sayfa yapisi, JSON data, UI kararlari (kod yazmaz)
- **builder** — TSX/Tailwind/Framer Motion implementasyon
- **reviewer** — kod denetimi, token uyumu, a11y (sadece okur)
- **verifier** — lint + typecheck + build dogrulama
- **researcher** — dosya bulma, pattern arama (ucuz/hizli)

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
