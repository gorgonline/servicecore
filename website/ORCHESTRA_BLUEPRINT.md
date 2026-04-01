# ORCHESTRA BLUEPRINT: Autonomous Agent Governance System

Bu döküman, bir projenin "Orkestra" disiplini ile yönetilmesi için gereken tüm altyapıyı içerir.

## 1. Taşınacak Klasörler (Plug & Play)
Sistemi başka bir projeye taşımak için şu 3 yapıyı kopyalayın:
1. **`.gemini/`**: Ajanlar, Skiller, Kurallar ve Dış Denetçi (Sistemin Beyni).
2. **`src/app/(orkestra)/`**: Görsel Dashboard (Sistemin Gözü).
3. **`ORCHESTRA_BLUEPRINT.md`**: Kurulum Talimatları.

## 2. Skill (Yetenek) Mimarisi
- **Konum:** Tüm uzmanlık dökümanları `.gemini/skills/` altında toplanır.
- **Mandat:** Her uzman, görevine başlamadan önce ilgili `.md` skill dosyasını okumak zorundadır (Rule #12).
- **Programatik Denetim:** Auditor, ajanın skill okuyup okumadığını "Sistem Analizi" adımında sorgular.

## 3. Kurulum Talimatları (AI için)
1. **Analiz:** Projenin tech-stack'ini ve ihtiyaç duyduğu uzmanları belirle.
2. **Ajan & Skill Yaratımı:** `.gemini/agents/` ve `.gemini/skills/` yapılarını kur. Her ajana 7 adımlık DNA'sını işle.
3. **Auditor Kurulumu:** `.gemini/scripts/orkestra-auditor.py` dosyasını yaz. Bütçe, No-Skip, Rollback ve Terminal Şeffaflığı kurallarını yükle.
4. **Hook Kaydı:** `.gemini/config.json` içine `BeforeTool` hook'unu tanımla.
5. **Dashboard & Sabitler:** `src/app/(orkestra)/` yapısını kur ve `src/data/orchestrator-constants.ts` dosyasını programatik olarak çivile.

## 4. Dış Denetçi (Auditor) Kuralları
Auditor şu 5 temel noktayı hatasız denetlemelidir:
- **Freshness:** State güncelliği (10 dk).
- **Sequential Logic:** 7 adımın sırayla takibi (No-Skip).
- **Evidence:** Başarı için terminal logu zorunluluğu (Live Terminal).
- **Budget:** 1200$ Hard Cap.
- **Memory:** Geçmiş hataların (Lessons Learned) anlamsal kontrolü.

## 5. Başlatma Komutu
Kurulum bittiğinde `GEMINI.md` dosyasına mühür bas:
*"Bu proje Orkestra v1.55.0 disiplini altındadır. Tüm işlemler dış denetçi onayına tabidir."*
