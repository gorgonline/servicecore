# SolveAI — Kaynaklı arka-plan değerlendirici (Reflexion "Self-Reflection / Msr")

> Görev id: 2026-06-25-002 · Y22 (Reflexion, arXiv:2303.11366) · A271 turu
> Reflexion eşlemesi: **solve = Actor · kalite = Evaluator · didim = Self-Reflection**

## Sıralama (anayasal)
Reflexion Tablo 3: **dayanaksız değerlendiricinin üstüne yansıma kurmak BOZAR** (0.52 < 0.60 base).
→ **Önce Evaluator'ı dayanaklı yap (Faz 1), SONRA didim'e bağla (Faz 2).** Faz 2 ancak Faz 1 ölçülüp dayanaklılık doğrulandıktan sonra ve **ayrı onayla** başlar.

---

## Faz 1 — TAMAMLANDI (bu görev)
**Amaç:** kalite hakemi cevabı **kaynaklarıyla** görsün → "uydurma mı / kaynağa dayalı mı" (faithfulness) yargısı verebilsin. (A270 denetimi P1-d kapanır.)

**Değişen dosyalar (8):**
| # | Dosya | Değişiklik |
|---|-------|-----------|
| 1 | `kalite/solveai_kalite/main.py` | `uyum_denetle(..., kaynaklar_metin="")` imza + payload |
| 2 | `kalite/solveai_kalite/varlik_degerlendir_agent.py` | `parse_node` state + `_icerik_sorular_inject` kaynak enjeksiyon (instruction'a dokunulmadı) |
| 3 | `solvecoreai/solveai_solve/shared/kaynak_metin.py` | **YENİ** — `OneriGirdi → düz metin` saf formatter (A2A sınırı: kalite import etmez) |
| 4 | `solvecoreai/solveai_solve/izle.py` | `coz_ve_izle(..., kaynak_dondur=False)` — geriye-uyumlu; True'da `(sonuc, iz, kaynaklar_metin)` |
| 5 | `panel/api/canli.py` | `coz` 3'lü tuple açar + `_uyum_kontrol(oneri, kaynaklar)` |
| 6 | `kalite/tests/unit/test_kaynak_inject.py` | **YENİ** — inject + parse_node birim testi (5) |
| 7 | `solvecoreai/.../shared/test_kaynak_metin.py` | **YENİ** — formatter birim testi (6) |
| 8 | `kalite/Makefile` | `test` hedefi `tests/unit`'i de kapsar |

**Kaynak akışı (kanıtlı):** `oneri_hazirla` → `OneriGirdi` (benzerler[].cozum + cozum_adaylari[].icerik) → `coz_ve_izle` döngüsünde yakalanır → **yalnız `durum=="oneri_var"`** ise `kaynaklari_metne_cevir` ile metne döner → panel `uyum_denetle`'ye geçer → `parse_node` state → `verdict_ver` user-content'ine "Kaynaklar:\n..." enjekte.

**Anayasa uyumu:** instruction değişmedi · sampling değişmedi · kalite KAPI DEĞİL (note, cevabı bloklamaz) · runtime karar katmanına ek LLM yok (kalite post-hoc, solve grafiğinde değil) · paralı model yok (gemma-4-31b).

**Spec'ten sapma (kanıtla gerekçeli):** Açık Soru 1'in önerisi `coz_ve_izle`'yi 3'lü tuple yapıp "2 çağıranı güncelle" idi. Kod okundu: **10+ çağıran** var (`_olcum_*`, `_eval_*`, `_kesif_*`, `_denetim`, `_tezgah_5` — çoğu `sonuc, _ = ...`). 3'lü tuple hepsini kırardı. → Geriye-uyumlu `kaynak_dondur` flag'i: default 2'li (kimse kırılmaz), yalnız panel `True` ile 3'lü alır.

**Kabul (Faz 1):** kalite kaynakları görüp faithfulness yargılar ✓ · solve/cevap bloklanmaz ✓ · `kaynaklar_metin=""` geriye-uyum ✓ · mevcut testler + yeni birim testler yeşil (kalite 30/30, solve shared 20/20) ✓.

---

## Faz 2 — PLAN (implement EDİLMEDİ, ayrı onay gerekir)

**Hedef:** kalite'nin sözel `gerekce`'sini (skor + madde-madde dayanak) didim'in zaten okuduğu yola otomatik "ders" olarak ver → Reflexion Self-Reflection döngüsünü tamamla.

**didim giriş yolu (kod-kanıtlı, okundu):**
`feedback_kaynak.py:itsm_geri_bildirim_metni()` → `feedback.db` (`sonuclar` JOIN `geri_bildirim`) → `tara_agent` → `kopru.py:kopru_aktar()` → `kural_store.kural_kaydet(durum='beklemede')` = **HITL onay** (köprü zaten insan onaylı, otonom değil).

### Açık tasarım kararı (Levent onayı gerekir)
**Seçenek A — `geri_bildirim`'e otomatik "olumsuz+yorum" yaz.**
**Seçenek B — didim'e AYRI "otomatik-değerlendirme" kaynağı ekle.** ← **ÖNERİ**

**Gerekçe (kod okumadan görülmeyen, `feedback_kaynak.py:24-34` okundu):**
- `itsm_geri_bildirim_metni` her `sonuc` için **SON** sinyali alır, yalnız o son sinyal `'olumsuz'` ise dahil eder. → Seçenek A, kalite'nin yazdığı 'olumsuz'u **insan 👍/👎 kanalının üstüne** SON sinyal yapar; teknisyen 👍 verse bile kalite 'olumsuz'u onu ezer → didim sahte "tekrar eden hata" öğrenir. **İnsan kanalını kirletir.**
- Seçenek B ayrı tablo/kaynak → insan kanalı dokunulmaz; iki sinyal didim'de bilinçli birleştirilir.

**İkinci zorunlu kısıt (her iki seçenekte):** yalnız **düşük skorlu** değerlendirme negatif derse dönmeli. Yüksek skorlu (kaynağa dayalı, uydurmasız) cevap 'olumsuz' yazılırsa didim **sahte hata kalıbı** öğrenir. → eşik gerekir (örn. skor < τ; τ ölçümle kalibre edilir, Faz 1 ölçümünden sonra).

**Neden ayrı onay:** Faz 2, didim **girdi sözleşmesine** dokunur (yeni kaynak/tablo veya feedback semantiği) — didim redesign alanı. Anayasa: didim/feedback.db'ye onaysız dokunulmaz.

### Faz 2 ön-koşulu (Levent tetikler — ÖLÇÜM)
Faz 1 dayanaklılığı kanıtlanmadan Faz 2 başlamaz:
- dayanaklı (kaynaklı) vs dayanaksız (kaynaksız) değerlendiricinin **faithfulness yakalama farkı**;
- LLM varyansı için **3-5 tur ortalama**; **izole feedback.db** kopyası; spoiler-temiz.
- Beklenti: kaynaklı değerlendirici, kaynakta olmayan adım içeren ("uydurma") cevaplarda dayanaksızlık skorunu düşürür (Reflexion Tablo 3 dayanaklılık ön-şartı).

---

## Karar bekleyen 3 soru (Levent)
1. **Faz 2 kaynak yazımı:** Seçenek A (olumsuz+yorum) mı, **B (ayrı kaynak — önerilen)** mı?
2. **Düşük-skor eşiği τ:** Faz 1 ölçümünden sonra mı kalibre edelim (önerilen), yoksa şimdi sabit mi?
3. **Tetikleyici yüzeyi (Faz 1 Açık Soru 2):** panel `/coz` non-blocking (fire-and-forget) yapılsın mı, yoksa ayrı "ticket çözüldü" arka-plan girişi mi? (Faz 1 minimal tuttu: kaynak görünürlüğü kuruldu, tetikleyici persistana bağlı — Faz 2 ile netleşir.)
