# SolveAI / ServiceCore AI — Üretim Denetim Raporu (A270)

**Tarih:** 2026-06-25 · **Branch:** `gemmav2` · **Commit:** `665df7d` · **Tag:** `A270-solveai-production-denetim`
**Talep:** "ARASTIRMA_YASALARI'na bak, ServiceCore AI'ları incele, eksikleri + kod hatalarını bul, test yap, düzelt, commit/tag/push, rapor et. Production'a girmesi gerek."

---

## 1. Özet (TL;DR)

ServiceCore AI kodu **olgun ve disiplinli** — savunmacı yazım, CRAG karar katmanı, güvenlik kiti, CaMeL-by-construction. Acil "her şeyi durduran" bir hata YOK. Ama **production'a girmeden önce kapatılması gereken net boşluklar var** — en kritiği bir **on-prem çökme hatası** ve bir **KVKK PII sızıntısı**, ikisini de bu turda düzelttim.

- **Yöntem:** 9 alt-sistem auditor'ü paralel + her bulgu bağımsız ajanla **adversarial doğrulama** (kod okunmadan bulgu kabul edilmedi). 46 ham bulgu → **42 confirmed**, 3 reddedildi, 1 belirsiz.
- **Düzelttim:** 8 güvenli kalem (gerçek bug + KVKK + prod-hijyen) — hepsi test'li, **instruction/sampling/mimariye dokunmadan**.
- **Rapor ediyorum:** 31 confirmed bulgu (mimari/yasa-eksiği/davranış-değişikliği-A/B-ister) — tek başıma uygulamadım, kararın senin.
- **Test:** baseline 417 → **423 yeşil** (4 yeni A2A testi + 2 onarılan dedup testi).
- **Production hükmü:** "Pilot'a hazır" sayılır AMA P1 kalemlerini (aşağıda) kapatınca. Şu an açık: çoklu-tenant izolasyon, didim ödül-sayaç hatası, knowcore entegrasyon kopukluğu, A2A giriş kontratı.

---

## 2. Kısıtlara uyum (anayasa)

- ✅ Hiçbir ajan **instruction**'ına dokunulmadı.
- ✅ Hiçbir **sampling** (temperature/top_p/top_k) değeri değiştirilmedi.
- ✅ **Paralı model** (gemini-2.5-pro/flash, gpt-4, claude) kullanılmadı — testler offline/mock veya bedava Gemma/lokal e5.
- ✅ `except Exception`/`except BaseException` hiçbir ADK tool/callback'e EKLENMEDİ (tam tersi: bir geniş except daraltıldı).

---

## 3. Test durumu

| Paket | Baseline | Şimdi | Not |
|---|---|---|---|
| gorgo_core | 173 | 173 | embedder/observability/a2a değişti — yeşil |
| solvecoreai | 176 | **180** | +4 yeni A2A integration testi |
| rootcoreai | 43 | 43 | yeşil |
| kalite | 25 | 25 | cache fix — yeşil |
| knowcore (dedup_kurator) | 0 (KIRIK) | **2** | onarıldı |
| **Toplam (offline)** | **417** | **423** | |

> Not: knowcoreai'nin kendi pyproject/testpaths'i yok → testleri standart CI'ya bağlı değil (bkz. P1-c). dedup testi e5 modeli + 1 LLM çağrısı yapan ağır integration testi (~70s).

---

## 4. DÜZELTİLEN 8 KALEM (commit 665df7d)

### 4.1 [PROD BLOCKER] embedder global cihaz hardcoded `mps` → fallback
`packages/gorgo_core/gorgo_core/embedder.py`
Global embedder `device="mps"` ile sabit kodluydu. `mps` yalnız Apple Silicon'da var; **on-prem hedef (Sabancı/QNB veri merkezi = CUDA GPU veya CPU)** kutusunda `SentenceTransformer(device="mps")` init'i **çökerdi**. Bu embedder `standard_plugins → SQLiteObservabilityPlugin → embed_bytes` zinciriyle HER departmanda çekiliyor. SolveAI'ın kendi `shared/embedder.py`'si zaten doğru yapmıştı (env-driven mps→cuda→cpu); global geride kalmış. **Fix:** aynı desen — `GORGO_EMBED_DEVICE` env, yoksa otomatik mps→cuda→cpu.

### 4.2 [PROD BLOCKER / KVKK] observability PII'yi guard'dan önce diske yazıyordu
`packages/gorgo_core/gorgo_core/observability.py`
ADK plugin'leri kayıt sırasıyla koşar; observability index 0, guard EN SONDA. Yani ham girdi/çıktı (TC/IBAN/kart/telefon/email) **önce** `observability.db`'ye yazılıyor, **sonra** guard maskeliyor → kalıcı PII sızıntısı (banka/on-prem KVKK ihlali). **Fix:** payload+hata diske yazılmadan `pii_temizle`'den geçiyor (sıra-bağımsız garanti). Default AÇIK (`GORGO_OBSERVABILITY_MASK_PII=1`), ham lab payload için `=0`. **Fonksiyonel doğrulandı:** TC/IBAN/email/telefon/kart → `<TC>` vb. maskeleniyor.

### 4.3 [BUG] kırık `test_dedup_kurator.py` → onarıldı
`projects/servicecore/knowcoreai/motor/test_dedup_kurator.py`
İki test setup'ta `AttributeError` ile patlıyordu: `dedup.COZUM_DB` değişkeni A228 refactor'da kalktı (artık `cozum_store._db_path()` + `SOLVEAI_COZUM_DB` env). Ayrıca `dedup_kontrol` artık 4-tuple döner (3 değil). Bu test, A218 #4'teki **küratör-süzgeci regresyonunu** (dedup'ın reader'ın asla göstermeyeceği geliştirici-wiki kaydına "guncelle" demesini engelleme) koruyordu; ölü olduğu için korumasızdı. **Fix:** env override + 4-tuple unpack + `route` beklentisi `guncelle`→`{guncelle,hitl}` (A219 güvenli-varsayılan: oto-merge KAPALI → "aynı problem" kararı `hitl`/insan-onaylı). Kritik regresyon koruması (küratör-dışı süzülür) geri geldi.

### 4.4 [BUG] `sorgu_yaz` geniş `except Exception` → daraltıldı
`projects/servicecore/solvecoreai/solveai_solve/benzer_ara/sorgu_yaz.py`
ADK tool/callback DEĞİL (düz helper, degrade tasarımı doğru) ama geniş except `AttributeError/KeyError` gibi **programlama hatalarını** da yutup `''` dönüyor → A/B'de "rewrite çalışmadı" diye sessizce maskeliyor, kök-neden gizleniyor. **Fix:** dar küme (`litellm.exceptions.APIError, TimeoutError, ConnectionError, OSError`); programlama hatası yukarı sızar. `''`-degrade sözleşmesi korundu.

### 4.5 [BUG] kalite soru-cache şema-dışı JSON yazabiliyordu
`projects/servicecore/kalite/solveai_kalite/varlik_degerlendir_agent.py`
`_soru_cache_save` ham model çıktısını `json.loads` edip doğrudan cache'liyor; geçerli-JSON-ama-şema-dışı bir yapı yazılırsa sonraki cache-hit'te `SoruListesi` doğrulaması `ValidationError` fırlatır ve LLM artık atlandığı için **kalıcı kilitlenir (poisoned cache)**. **Fix:** cache'e yazmadan `SoruListesi.model_validate` — geçersizse yazılmaz.

### 4.6 [BUG] A2A agent-card `host` localhost hardcoded → env-driven
`packages/gorgo_core/gorgo_core/a2a_helper.py`
Card `rpc_url=http://localhost:PORT` ilan ediyor; Docker sidecar/on-prem'de gateway konteyner-dışından bu adrese erişemez (uvicorn 0.0.0.0'a bind ediyor, doğru — ama card yanlış ilan). **Fix:** `A2A_ADVERTISE_HOST` env, default `localhost` (geriye uyumlu).

### 4.7 [PROD/KABUL] `.env.example` yoktu → oluşturuldu
`projects/servicecore/solvecoreai/.env.example`
Sözleşme §8.5.8 + KABUL §A `OTEL_..._CAPTURE_MESSAGE_CONTENT=NO_CONTENT` default'unu her departmanın `.env.example`'ında ister; dosya yoktu → `cp .env.example .env` kurulum talimatı kırıktı + NO_CONTENT default kodla ship edilmemişti. **Fix:** ~40 env anahtarı + NO_CONTENT + yeni KVKK bayrağı + secret'lar boş.

### 4.8 [PROD/KABUL] A2A integration test + README/DESIGN_SPEC düzeltmesi
- `tests/integration/test_a2a.py` (YENİ): KABUL §A "A2A integration test" kapısı boştu. Minimal montaj smoke — app yüklenir, A2A card kurulur, güvenlik kiti takılı, /feedback route kayıtlı (LLM yok).
- `README.md`: tamamen **yanlış departmanı** anlatıyordu (magnesia "Atolye Lina" e-ticaret butik kopyası — var olmayan 10 tool, yanlış path). Erman ekibine teslimde yanıltıcıydı → doğru SolveAI ITSM içeriğiyle yeniden yazıldı.
- `DESIGN_SPEC.md`: "Aşama 0 — sadece ticket+özet, A2A yok" diyordu (bayat); tüm aşamalar kurulu → güncel node/aşama tablosu + açık borçlar.

---

## 5. RAPOR EDİLEN BULGULAR (31 confirmed — kararın senin)

> Bunları **kasıtlı düzeltmedim**: ya mimari karar / yasa-eksiği (tek başıma yeni özellik kurmam), ya da davranış-değişikliği (A/B + evalset ister). Öncelik sırasıyla:

### P1 — Production'a girmeden kapatılmalı (yüksek)

**P1-a · [BUG] didim: revert birikmiş ödülü geri alıyor**
`rootcoreai/solveai_didim/db/versiyonlama.py:60-96` ↔ `db/bulgular.py:73-83`
Judge bir bulguyu "guncelle" ile iyileştirince yeni versiyon `puan=100`'den başlar; kapanan eski versiyon birikmiş ödül sayacını (120-130) korur. `revert_adaylari` ham `puan` kıyası yapınca iyileştirilmiş bulguyu yanlış aday gösterebilir → self-improving döngünün ödül muhasebesi bozuk. **Öneri:** revert kıyasını aktif-versiyon ödülüne göre yap (puan reset'ini hesaba kat). *didim öğrenme davranışı → senin onayınla.*

**P1-b · [PROD BLOCKER] feedback.db çoklu-tenant izolasyonu yok**
`solvecoreai/.../geri_bildirim/store.py:34-46`
Sistemin geri kalanı `data_dir + ACTIVE_CLIENT` ile müşteri-izole `_hafiza` kullanırken bu store kopuk: `SOLVEAI_FEEDBACK_DB` set edilmezse paket-içi lab DB'sine yazar. On-prem çoklu-müşteride feedback karışır (KVKK + veri-bütünlüğü). **Öneri:** feedback DB yolunu da `data_dir()/ACTIVE_CLIENT` deseni üstünden çöz (didim/observability gibi). *Düzeltme küçük ama yol-çözme mimarisi → senin kararın.*

**P1-c · [PROD BLOCKER] knowcoreai production'a entegre değil (script-only)**
`knowcoreai/motor/uctan_uca.py:187-190`
KB-kart üretim hattı ama: (1) FastAPI/to_a2a/app entrypoint YOK (sadece `__main__` batch), (2) testleri standart CI'ya bağlı değil (pyproject yok), (3) 4. kapı (nli_kapi) yalnız smoke'ta. SolveAI'a fiilen bağlı değil. **Öneri:** ya production-yol netleştir (A2A servis + entegrasyon), ya da "offline KB-bakım aracı" olarak açıkça konumla + CI'ya bağla.

**P1-d · [LAW Y8] kalite yargıcı kaynak görmeden "kaynağa-dayalı mı" diyor**
`kalite/solveai_kalite/main.py:128-148, 182-198`
BLOCKER kuralı "cevap yalnız verilen kaynaklara dayanmalı" diyor ama `verdict_ver_agent`'a sadece cevap metni veriliyor, **kaynaklar (benzer ticket/KB) verilmiyor** → yargıç faithfulness'ı fiilen ölçemez. **Öneri:** kanıt paketini de yargıca enjekte et (state üzerinden). *Y8 eksiği — kalite mimarisi.*

### P2 — Production'da sertleştirme (orta)

- **[BUG] FTS-only aday cosine'siz düşüyor** — `benzer_ara/index_store.py:399,407-409`: hibrit FTS'in asıl değeri (e5'in kaçırdığı kelime-eşleşmesi) tam da bu yolda eleniyor (havuz dışıysa cosine=None → çöp). Etki sınırlı (ESKALE bandı, otomatik öneri olmaz). *Fix retrieval tasarım kararı + A/B ister.*
- **[BUG] feedback yazımı atomik değil (2-fazlı)** — `geri_bildirim/store.py:189-212`: feedback satırı commit edilip bağlantı kapanır; ödül/ceza + didim geri-besleme AYRI bağlantılarda commit-sonrası → arada çökerse tutarsız.
- **[BUG] didim "guncelle" sonsuz-rejudge + sınırsız versiyon** — `didim_agent.py:80-94,200-203`: muğlak bulgu her gece "guncelle" alıp `rubric_puan=NULL` → ertesi gece yine okunur → çözülmez churn + tablo şişer. *Öneri: ardışık-guncelle sayacı + N sonra emekli.*
- **[PROD] Y7 rewrite timeout node bütçesini aşabilir** — `sorgu_yaz.py:75` (60s) `benzer_ara` node'u da 60s; rewrite açıkken (default KAPALI) e5 cold-start ile node timeout → tüm dal çöker. *Öneri: rewrite timeout'u node'dan küçük tut (~20s) veya ayrı node.*
- **[PROD] ticket_id A2A giriş kontratı belgesiz/testsiz** — `ticket_cek/node.py:37`: ServiceCore C#↔Python dikişi; initial session state anahtarı/tipi netleştirilmeli + integration testte seed doğrulanmalı. *Pilot başlangıç riski.*
- **[LAW Y8] üretilen cevap cümle-bazlı kaynağa doğrulanmıyor** — `karar/node.py:146-174`: alaka-süzme VAR ama "her cümle kanıtla destekleniyor mu" YOK (sadece kaynak-id doğrulama).
- **[LAW Y14] kalite skoru tek-eksen** — `varlik_degerlendir_agent.py:290-313`: KVKK+halüsinasyon+yetki+format aynı düz ortalamaya katılıyor; relevance/faithfulness/correctness ayrı ölçülmeli.
- **[LAW Y13] canlı yargıç tek-tur varyans** — `varlik_degerlendir_agent.py:204-231`: eval'de num_runs=3 (iyi) ama canlı `uyum_denetle` tek tur, temp=1.
- **[LAW Y18] knowcore kartına iç ticket no (#16733) gömülüyor** — `uctan_uca.py:50,85`: SelfAI son-kullanıcıya iç sistem metadata'sı sızdırabilir.
- **[LAW Y6] lab-default HMAC anahtarı prod'da** — `gorgo_core/guard/audit.py:31-36`: `GORGO_GUARD_HMAC_KEY` yoksa kaynak-kodda yazılı lab anahtarı → audit zinciri taklit edilebilir. *Prod'da `siki` profil + HMAC zorunlu olmalı.*

### P3 — Yasa-eksiği / yol haritası (düşük öncelik, kütüphane olgunlaştırma)

- **[Y9] adaptif retrieval kapısı yok** — `workflow.py`: her ticket'a arama yapılıyor; "KB araması gerekiyor mu" ön-kapısı (Y9 GÜÇLÜ) yok. Basit ticket'ta gürültü.
- **[Y1] hibrit FTS rerank-merge** — `index_store.py`: FTS benzer_ara'da var (cozum_ara'da yok); FTS adayları rerank havuzuna düzgün katılmıyor (P2 FTS-cosine ile bağlı).
- **[Y22] didim skaler feedback, sözel-yansıma yok** — `kopru.py:76-92`: didim 👍/👎 sayar ama "şu yaklaşım neden yanlıştı" **sözel dersi** çıkarmıyor (Reflexion Y22'nin özü). Bu, didim'in OLMASI GEREKEN hali — şu an `kural_deposu` (depo+enjeksiyon, öğrenmiyor).

### P4 — Hijyen (küçük)

- `ozetle` instruction'ında `{TicketMetni.metin}` placeholder render edilmiyor (ADK noktalı state-adını geçersiz sayar) — `ozetle/agent.py:44`. *Düşük etki ama A/B sonrası bakılmalı; instruction olduğu için DOKUNMADIM.*
- `uyum/` node'ları workflow'da bağlı değil (ölü kod, A208'de sökülmüş) + `uyum_suz` SUS yolunda `_S_OZET` yazmıyor (latent — bağlanırsa patlar).
- `entities/` ve `app_utils/` boş dizinler (gerçek şemalar `shared/schemas.py`'de).
- kural_store decay/konsolidasyon non-atomik read-write; feedback son-sinyal race; observability embed-lock bloklama; kopru sys.path enjeksiyonu (Docker'da ayrı kutu olursa kırılır); parse_node ölü retry; ozet JSON trailing-text.

---

## 6. Reddedilen bulgular (3 — adversarial doğrulamada çürütüldü)

Doğrulayıcı ajan, auditor'ün öne sürdüğü 3 bulguyu kodu okuyarak çürüttü (yanlış pozitif). 1 bulgu "belirsiz" kaldı. Bu, "kod okumadan öneri yok" disiplininin çalıştığını gösterir — ham 46 bulgunun 4'ü süzüldü.

---

## 7. Production'a giriş — önerilen sıra

1. **P1-b (feedback izolasyon)** + **P1-d (Y8 yargıca kaynak)** — küçük, net, yüksek değer.
2. **P1-a (didim revert ödül)** + P2 didim-unbounded — didim öğrenme davranışı; senin onayınla birlikte (bunlar self-improving döngünün muhasebesi).
3. **P1-c (knowcore konumla/entegre)** — pilot için "offline araç" demek yeterli olabilir.
4. **ticket_id A2A kontratı** (P2) — pilot başlamadan ServiceCore backend ekibiyle netleştir.
5. Pilot'ta `SOLVE_GUARD_PROFIL=siki` + `GORGO_GUARD_HMAC_KEY` + `GORGO_OBSERVABILITY_MASK_PII=1` (artık var) + `NO_CONTENT` (artık var).

P3 (Y9/Y1/Y22) pilot'u geciktirmez — kütüphane olgunlaştırma; saha verisiyle A/B sonrası.

---

## 8. Notlar

- Denetim workflow'u: 55 ajan, ~3M token, ~18 dk (ultracode modu). Tam ham çıktı bende; istersen herhangi bir bulgunun tam kanıt zincirini açabilirim.
- Bu rapor + 8 düzeltme **tek commit** (`665df7d`, tag `A270`). Push: `origin/gemmav2`.
- Hiçbir instruction/sampling/paralı-model'e dokunulmadı (anayasa).
