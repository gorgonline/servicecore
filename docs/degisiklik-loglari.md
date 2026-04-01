# MAGIC DOC: Degisiklik Loglari
*Her oturumda yapilan onemli degisiklikleri, eklenen ozellikleri ve duzeltilen hatalari kaydet. Tarih ile birlikte.*

## Degisiklikler

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
