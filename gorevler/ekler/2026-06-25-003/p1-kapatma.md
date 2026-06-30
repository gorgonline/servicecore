# P1 Üretim-Blocker Kapatma Raporu (A271)

**Tarih:** 2026-06-25 · **Commit:** `69ccfa6` · **Tag:** `A271-p1-didim-revert-feedback-izolasyon` · **Push:** `origin/gemmav2`
**Bağlam:** A270 denetim raporundaki (görev `2026-06-25-001`, arşivde) 4 P1 kaleminin kapatılması.

---

## Durum tablosu

| P1 | Durum | Nasıl |
|---|---|---|
| **P1-a** didim revert ödül-muhasebesi | ✅ **KAPANDI** (A271) | test-first fix, 4 test |
| **P1-b** feedback.db çoklu-tenant izolasyon | ✅ **KAPANDI** (A271) | default → müşteri-izole |
| **P1-c** knowcoreai entegrasyon | ✅ **DEĞERLENDİRİLDİ** — kod gerekmez | konumlandırma zaten dürüst |
| **P1-d** kalite yargıcına kaynak (Y8) | ⚠️ **KOD HAZIR + YEŞİL ama görev `hata`'da takılı + commit edilmemiş** | paralel worker yaptı (görev 002) |

---

## P1-a — didim revert birikmiş ödülü geri alıyordu [BUG → FIX, test-first]

**Bug (kanıtlandı):** `revert_adaylari` ham `puan` kıyaslıyordu (`v_aktif.puan < v_eski.puan`).
"guncelle" ile **iyileştirilen** bulgunun yeni versiyonu `puan=100`'e resetlenir; kapanan
eski versiyon birikmiş ödülünü (örn. 130) korur → iyileştirilmiş (hatta **net-pozitif**, ödül
kazanmış) bulgu `100 < 130` diye yanlış revert adayı sayılıp geri alınıyordu → kasıtlı
iyileştirme bozuluyor.

**Test-first kanıt:** `tests/unit/test_revert.py` (4 case). Fix ÖNCESİ:
`test_iyilestirilmis` (V2=100) + `test_net_pozitif` (V2=110) FAIL etti (yanlış revert adayı).

**Fix:** net-negatif guard — `AND v_aktif.puan < _BAZ_PUAN(100)`. Yalnız gerçekten kötüleşen
(cezalanmış, puan<100) versiyon geri alınır; reset-baseline artefaktına bağışık. Fix sonrası
4/4 yeşil (iyileştirilmiş + net-pozitif korunur; gerçek-kötü hâlâ yakalanır; yaş şartı korunur).
**didim suite: 47 passed (+4).** Instruction/sampling'e dokunulmadı; deterministik (LLM yok).

## P1-b — feedback.db çoklu-tenant izolasyon [PROD BLOCKER → FIX]

`store._db_path()` env yoksa paket-içi lab DB'ye düşüyordu → on-prem çoklu-müşteride feedback
karışır (KVKK + veri-bütünlüğü). Default'u **didim/observability deseniyle** `data_dir()/solveai/`
(= `clients/<ACTIVE_CLIENT>/_hafiza`) yaptım → her müşteri kendi DB'sine yazar. `SOLVEAI_FEEDBACK_DB`
+ `GORGO_DATA_DIR` override korundu. **Doğrulandı:** feedback testleri izole (env), gerçek lab DB
kirlenmedi; **solvecoreai 186 yeşil.**

## P1-c — knowcoreai entegrasyon [DEĞERLENDİRİLDİ — kod gerekmez]

Kod değişikliği yapmadım çünkü konumlandırma **zaten dürüst**: README başlığı "KnowCoreAI — ...
**(OFFLINE)**", "gece/offline batch — **canlı değil**", DESIGN_SPEC "nli_kapi 4. kapı **BAĞLI DEĞİL**".
Kimse canlı sanmaz. A2A servis + solve entegrasyonu bilinçli **Faz-3 kararı** (senin mimari çağrın,
pilot'u geciktirir — boş yere CI-paketleme yapmadım).

## P1-d — kalite yargıcına kaynak (Y8) [WORKER YAPTI, ama görev `hata`'da takılı]

**Paralel worker (Mac Mini) görev `2026-06-25-002`'de bunu yaptı** (Reflexion Evaluator / Y8):
kalite hakemi artık cevabı **kaynaklarıyla** görüyor → faithfulness yargılayabiliyor.
- **Kod hazır + YEŞİL** (kendi koşumlarım doğruladı: kalite `make test` 30 passed, solve shared
  kaynak_metin testleri dahil 186 passed). instruction'a dokunmamış (callback ile inject — doğru).
- **AMA görev `hata/` durumunda takılı** (geçmiş: `yapiliyor>hata` × 2) ve **değişiklikler commit
  EDİLMEMİŞ** (working tree'de duruyor: `shared/kaynak_metin.py`, `izle.py`, `panel/api/canli.py`,
  `kalite/main.py`, `kalite/varlik_degerlendir_agent.py`, `test_kaynak_inject.py`, `Makefile`, spec).
- Worker raporu "SONUÇ: TAMAM" diyor → `hata` durumu büyük olasılıkla **kodun değil, görev-süreç/
  commit adımının** takılması (kod testleri geçiyor).

**Ben bu dosyalara DOKUNMADIM / commit ETMEDİM** — worker'ın görevi; kör commit etmek (1) takılma
nedenini maskeler, (2) başkasının in-progress işini sahiplenir. **Öneri:** görev 002'yi incele →
sorun yoksa worker'ın P1-d işini commit et (kod zaten yeşil). Faz 2 (didim'e otomatik ders bağlama)
worker tarafından yalnız **plan** olarak bırakılmış (ayrı onayın bekliyor) — doğru sıra (Reflexion
Tablo 3: önce dayanaklı Evaluator, sonra yansıma).

---

## Test özeti (A271 sonrası, tümü yeşil)
didim **47** (+4 revert) · solvecoreai **186** · kalite **30** · gorgo_core **173**. Regresyon yok.

## Anayasa
Instruction / sampling / paralı-model'e dokunulmadı. didim fix deterministik + test-backed
(eval/A/B değil — onu sen tetiklersin). Worker'ın P1-d dosyaları ellenmedi.
