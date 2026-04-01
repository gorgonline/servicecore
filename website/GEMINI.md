# ServiceCore Web — AI Orchestration (v3.0)

## 🎯 Felsefe
3 Katman Mimarisi: **Kurallar → Ajanlar → Polis.** Az ajan, çok script, sıfır aldatma.

## 🛰️ Çalışma Modları

### Standart Mod (Varsayılan)
- **Ne zaman:** Normal istek, UI düzeltmesi, bug fix.
- **Disiplin:** Design Token'lara uyum + temel kurallar.
- **Hız:** Maksimum.

### Orkestra Modu (`/orkestra`)
- **Ne zaman:** Kullanıcı mesajına `/orkestra` ile başladığında.
- **Disiplin:** Workflow pipeline'ı aktif, her adım izlenir.
- **Kalite:** Maksimum.

---

## 📜 Temel Yasalar

1. **Verifikasyon:** Kod değişikliği `npm run lint` geçmeden BİTTİ sayılmaz.
2. **Orkestra Ayrımı:** `/orkestra` rotası sadece izleme. Ürün `src/app/(main)` altında.
3. **Hafıza:** İşlem öncesi `.gemini/tracker/lessons-learned.json` kontrol edilmeli.
4. **Commit Yasağı:** `git commit/tag/build` kullanıcı açıkça istemedikçe ASLA yapılmaz.
5. **Override:** Kural deadlock yaratırsa, Teknik Gerekçe ile bir seferlik askıya alınabilir → `audit-report.md`'ye işlenir.
6. **Kural Hiyerarşisi:** `GEMINI.md` > `global-meta-rules.md` > Ajan Personaları.

## 🤖 3 Ajan Sistemi

| Ajan | Görev | Kilit Fark |
|------|-------|-----------|
| `@designer` | Brand, içerik, UI, animasyon, token uyumu | Tam yetkili |
| `@coder` | Next.js implementasyon, TypeScript, test | Tam yetkili |
| `@guardian` | QA, audit, erişilebilirlik, performans | **SADECE OKUR, YAZMAZ** |

## 🚔 Polis Katmanı (Script — Yalan Söyleyemez)

| Script | Ne Yapar |
|--------|----------|
| `memory-guard.js` | Geçmiş hataların tekrarını regex ile tespit eder |
| `arch-auditor.js` | Route group izolasyonu + hardcoded hex kontrolü |
| `pre-commit hook` | Her commit'te memory-guard + arch-auditor otomatik çalışır |

## 📂 Dosya Yapısı
- `.gemini/agents/` — 3 subagent tanımı
- `.gemini/rules/` — Kurallar
- `.gemini/scripts/` — Otomatik denetim script'leri
- `.gemini/tracker/` — State + hafıza
- `.gemini/skills/` — Teknik bilgi paketleri
- `.gemini/workflows/` — İş akışları

---
*Bu dosya projenin Anayasasıdır.*
