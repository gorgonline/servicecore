# MAGIC DOC: Degisiklik Loglari
*Her oturumda yapilan onemli degisiklikleri, eklenen ozellikleri ve duzeltilen hatalari kaydet. Tarih ile birlikte.*

## Degisiklikler

### 2026-04-21 — v1.2.0: Planlar Refactor + Navbar Overhaul

**Ozellikler:**
- Planlar sayfasi data-driven refactor: ExpandedPricingSection artik `data` prop aliyor, icerik JSON'da
- Yeni sayfa: `/planlar-pm` (Proje Yonetimi Lisanslama) — ayri JSON beslemeli
- `pricing-itsm.json` + `pricing-pm.json` — tek kaynak ilke, hardcoded string kurali
- Navbar: Planlar dropdown (ITSM / PM 2 link) — Kaynaklar pattern'i esas alindi
- Navbar Moduller mega menu: 25 modul canli siteye gore yeniden dizildi, 3 yeni modul eklendi (Servis Iliskileri, ESM Kurumsal, AI Yol Haritasi), modul adlari guncellendi
- Moduler mega menu: full-width (w-screen, fixed positioning, scroll-aware top), icerde max-w-7xl ortali
- Kaynaklar menusu: 6 link (Sunumlar, Videolar, Dokumanlar, Kurslar, Guncellemeler, Egitimler) — Pratikler + Fark Var cikarildi
- Footer ANA MENU: Pratikler ve Fark Var eklendi, Kurslar cikarildi (Kaynaklar'da)
- Modul sayfalarinda hero image pattern birlestirme: etkilesim-yonetimi, bilgi-bankasi, proje-yonetimi
- Hero image pattern: kart icinde dogal boyut, sol-ust anchored, tasanlar kart icinde kirpiliyor (pencere efekti), `max-w-none` + `block` + `origin-top-left`
- Tailwind 4 canonical cleanup: bg-linear-to-*, alpha notasyonu (/2, /4, /8), rounded-4xl, aspect-video, pixel→spacing — 384 rename
- ESLint cleanup: 32 error + 88 warning → 0 (unused imports, `<img>`→`Image`, any→unknown/typed, react-hooks rule)
- Dev server fix: root package.json/lock linkedin/ altina tasindi, Next.js turbopack workspace root sorunu cozuldu
- next.config.ts: turbopack.root, img.youtube.com remotePatterns
- ESLint config: .gemini/ ve fix-blurs.js ignore, react-hooks/set-state-in-effect kapali (SSR hydration)
- .gitignore: *.tsbuildinfo eklendi

**Etkilenen dosyalar (ozet):**
- website/src/data/pricing-itsm.json (yeni)
- website/src/data/pricing-pm.json (yeni)
- website/src/data/pricing.json (silindi)
- website/src/app/(main)/planlar-pm/page.tsx (yeni)
- website/src/app/(main)/planlar/page.tsx (refactor)
- website/src/components/ui/expanded-pricing.tsx (refactor — data prop)
- website/src/components/ui/detailed-pricing.tsx (silindi — olu kod)
- website/src/components/layout/Navbar.tsx (moduller + planlar + kaynaklar)
- website/src/components/layout/Footer.tsx (ANA MENU)
- website/src/app/(main)/{etkilesim-yonetimi,bilgi-bankasi,proje-yonetimi}/page.tsx (hero image)
- website/eslint.config.mjs (ignore + rules)
- website/next.config.ts (turbopack.root + youtube)
- Tailwind 4 canonical class dogrusu 45 dosyada
- linkedin/package.json + linkedin/package-lock.json (root'tan tasindi)
- .gitignore (*.tsbuildinfo)
- docs/durum.md + degisiklik-loglari.md (guncellendi)

---

### 2026-04-21 — v1.1.0: Icerik Uretim Pipeline'i

**Ozellikler:**
- LinkedIn gorsel uretim scripti: `linkedin/html-to-png.mjs` (puppeteer tabanli HTML → PNG)
- LinkedIn uretim ciktilari: 4 post klasoru (`linkedin/posts/`)
- Email kampanya ilk uretim: `email/output/2026-04-15_genel-tanitim.html`
- Email marka logolari: boyner, qnb, roketsan, sabanci, toyota (`email/assets/`)
- Brand sembol varligi: `brand/assets/Symbol@4x.png`
- package.json + lock: puppeteer ^24.40.0 (dev dependency)
- LinkedIn sablon metni: "600.000" → "4M+ kullanici" guncellemesi
- .gitignore: `*.zip` eklendi (paketlenmis arsivler dısarıda)

**Etkilenen dosyalar:**
- linkedin/html-to-png.mjs (yeni)
- linkedin/posts/ (yeni — 4 post klasoru)
- linkedin/templates/tek-gorsel/sablon.md (guncellendi)
- linkedin/templates/text-post/sablon.md (guncellendi)
- email/assets/*.png (yeni — 5 logo)
- email/output/2026-04-15_genel-tanitim.html (yeni)
- brand/assets/Symbol@4x.png (yeni)
- package.json + package-lock.json (yeni)
- .gitignore (guncellendi)
- docs/durum.md (guncellendi)

---

### 2026-04-01 — v1.0.0: Temel Kurulum

**Ozellikler:**
- Proje settings.json olusturuldu — generated dosya korumasi (globals.css, tokens.ts deny), brand/ dosyalari ask
- Email sablonlari: 3 component (header/footer/cta) + 3 tam sablon (kampanya/duyuru/davet)
- LinkedIn sablonlari: 3 rehber (text-post/tek-gorsel/carousel)
- next.config.ts: security headers, AVIF/WebP image optimization, strict mode, poweredByHeader kapali
- Memory zengilestirildi: reference_kaynaklar + project_bekleyen_isler eklendi
- .gitignore: merak/, .gemini/, node_modules, .env, .DS_Store eklendi
- GitHub private repo olusturuldu (gorgonline/servicecore)
- v1.0.0 tag'i olusturuldu

**Etkilenen dosyalar:**
- .claude/settings.json (yeni)
- .gitignore (guncellendi)
- email/components/*.html (yeni — header, footer, cta)
- email/templates/kampanya/sablon.html (yeni)
- email/templates/duyuru/sablon.html (yeni)
- email/templates/davet/sablon.html (yeni)
- linkedin/templates/*/sablon.md (yeni — 3 dosya)
- website/next.config.ts (guncellendi)
