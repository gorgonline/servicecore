# Personel Değer & Performans Değerlendirme — Araştırma Raporu

> **Amaç:** ServiceCore task/ticket/proje verisinden yola çıkarak, kişi başına "kim ne kadar değerli iş üretti" ölçümünü **adil ve bilimsel** bir temele oturtmak.
> **Bağlam:** İç odaklı (performans+prim, kapasite/iş yükü, kalite/risk erken uyarı). Müşteri/gelir verisi yok. Ölçü = platform-içi sinyaller + işin içeriğini bir LLM'in (Claude) okuyup puanlaması. Geliştiriciler işi AI ile yazıyor, bitince task'ı kapatıyor.
> **Yöntem:** Deep-research harness — 5 paralel arama açısı, 20 kaynak, 93 iddia çıkarıldı, 25'i 3 oylu çapraz doğrulamadan geçti (18 doğrulandı / 7 çürütüldü).
> **Tarih:** 2026-06-09

---

## 1. Doğrulanan bilimsel sonuçlar

### 1.1 Üretkenlik tek metrikle ölçülemez (kanıtlı)
En az 3 boyut gerekir. SPACE çerçevesinin özü zaten "üretkenlik tek bir boyuta indirgenemez". DevEx çerçevesi geliştirici deneyimini 3 boyutta tanımlar: **Feedback Loops** (geri besleme döngüleri), **Cognitive Load** (bilişsel yük), **Flow State** (akış hâli).
- Doğrulama: **3-0**
- Kaynak: `queue.acm.org/detail.cfm?id=3454124` (SPACE), `queue.acm.org/detail.cfm?id=3595878` (DevEx)

### 1.2 Throughput'u izole ölçmek = Goodhart felaketi (en kritik bulgu)
**DX Core 4** (getDX — DORA + SPACE + DevEx'i birleştiren güncel, 4 boyutlu çerçeve: Speed, Effectiveness, Quality, Impact) net diyor: kapatılan iş / throughput **tek başına kullanılırsa korku ve oyunlama yaratır**. Güvenli kullanım için üç ön koşul:
1. Karşı-dengeleyici metriklerle birlikte (DXI — Developer Experience Index)
2. **Prime / bireysel hedefe bağlama**
3. Dikkatli rollout (önce güven inşası)

- Doğrulama: **3-0**
- Kaynak: `getdx.com/news/introducing-the-dx-core-4/`, `leaddev.com/career-development/what-mckinsey-got-wrong-about-developer-productivity`

### 1.3 AI ile yazılan işte klasik "zorluk/efor" ölçümü bozulur
Story Point gibi insan-zorluğu vekilleri, LLM maliyet etkenlerine **duyarsız**. "Developer'lar AI ile yazıyor" gerçeği tam da literatürün uyardığı durum: efor/süre ölçmek artık çift kat yanıltıcı. Bu, ölçümü **efordan → çıktının değerine** kaydırmayı zorunlu kılıyor (kullanıcının sezgisi bilimsel olarak doğru).
- Doğrulama: **3-0**
- Kaynak: `frontiersin.org/.../frai.2026.1772418/full`

### 1.4 LLM'in (Claude'un) puanlaması ölçülebilir biaslar taşır
"Değer"i ben okuyup vereceğim için bu bizim için en kritik risk:
- **Self-enhancement (öz-tercih) bias**: LLM kendi/AI-üretimi metni daha yüksek puanlar (GPT-4 ≈ 0.520). Kod AI ile yazıldığı için doğrudan risk.
- **Verbosity (uzunluk) bias**: uzun/ayrıntılı metin otomatik daha yüksek puan alır → çok yazan teknisyen haksız şişer.
- Bir çalışma (CALM) **12 ayrı ölçülebilir bias tipi** sayıyor.
- Doğrulama: **3-0** (self-enhancement, verbosity), bir alt-iddia **2-1**
- Kaynak: `arxiv.org/html/2410.02736v1` (CALM), `arxiv.org/html/2410.21819v2`

### 1.5 Az sayıda örnek-çapa, LLM puanlamasını ölçülebilir derecede iyileştirir
Projeye özel sadece **5 etiketli örnek** vermek (few-shot), LLM'in tahmin tutarlılığını artırıyor. → Rubriğe sabit örnek-çapalar gömmek işe yarar.
- Doğrulama: **3-0**
- Kaynak: `arxiv.org/html/2603.06276v1`

---

## 2. Çürütülen mitler (dürüstlük payı)

Bu iddialar çapraz doğrulamada **reddedildi** — yaygın inanışlar olmalarına rağmen yanlış/abartı çıktılar:

| İddia | Sonuç | Not |
|---|---|---|
| "SPACE bireysel ölçümü açıkça yasaklar" | **0-3 ❌** | SPACE bireyde kullanımı yasaklamıyor, "dikkatli kullanın" diyor. "Bireysel ölçmek bilim-dışı" söylemi abartı. |
| "SPACE = kesin 5 boyut, kanonik şablon" | **0-3 ❌** | Katı S-P-A-C-E reçetesi gibi kullanma. |
| "LLM, story-point'i eğitimli modeller kadar iyi tahmin eder" | **1-2 ❌** | LLM'in sayısal efor tahmini güvenilir değil. (Kalite/etki *yorumu* ayrı konu — orası daha güçlü.) |
| "LLM SP tahmini eğitimli baseline'larla eşdeğer (Llama3SP)" | **0-3 ❌** | Aynı şekilde reddedildi. |
| "AI-destekli işte zorluk etiketleri eforla tamamen kopar" (güçlü versiyon) | **0-3 ❌** | Genel uyarı (1.3) geçerli ama bu en aşırı haliyle desteklenmedi. |
| "LLM öz-tercihinin kök nedeni perplexity/familiarity'dir" | **0-3 ❌** | Bias gerçek (1.4) ama bu tek nedensel açıklama doğrulanmadı. |

---

## 3. Bizim use-case'e tercümesi — kritik gerçek

Kullanıcının amaçları arasında **prim** vardı. En sağlam bulgu (§1.2) tam buna dokunuyor: **üretkenlik metriğini doğrudan prime bağlamak sistemi oyunlatır ve ekip güvenini bozar.** McKinsey'nin 2023 makalesinin en çok eleştiri yediği nokta budur (Fowler, Pragmatic Engineer).

Bu "sistemi kurma" demek **değil** — **kurulumu değiştir** demek:

- **Kapasite + kalite/risk** → serbestçe, otomatik kullan (en güvenli kullanım).
- **Prim** → metrik *karar vermez, bilgi verir*; insan kalibrasyonu + LLM-bias kalkanı zorunlu.

---

## 4. Önerilen sistem iskeleti (bilime uygun, oynanması zor)

Dört karşı-dengeleyici boyut (DX Core 4 uyarlaması), tek skora indirgenmez:

| Boyut | Platform sinyali | Kaynak mantığı |
|---|---|---|
| **Hız** | cycle-time (aç→kapat), **ağırlıklı** throughput (ham adet değil) | DX Core 4 / DORA |
| **Kalite** | reopen oranı, SLA ihlali, ping-pong (yeniden atama) | karşı-denge |
| **Etki / Değer** | **Claude işin içeriğini okur, rubrikle puanlar** | Impact boyutu + kullanıcı sezgisi |
| **Yük** | açık WIP, açılan-kapanan dengesi | kapasite |

### LLM-bias kalkanı (Claude puanlaması için zorunlu prosedür)
Literatürden türetilmiş, §1.4'teki riskleri kıran kurallar:
1. **İkili karşılaştırma** (mutlak 1-10 puan yerine "A mı B mi daha değerli") — daha güvenilir.
2. **Yazar kimliğine kör** puanlama (kim yaptığını görmeden).
3. Sabit **rubrik + 5 örnek-çapa** (§1.5 doğruladı).
4. **Çok geçişli** puanlama (tek atışa güvenme).
5. Prim kararında **insan onayı = son söz** (LLM sadece girdi).
6. **Uzunluk-nötr**: puanı işin *sonucuna/etkisine* ver, açıklamanın uzunluğuna değil (verbosity bias).

---

## 5. Açık sorular / sonraki adımlar

- Platform sinyallerimiz (ServiceCore API alanları) bu 4 boyuta tam olarak nasıl haritalanır? → API alan envanteri gerekli (time-tracking, öncelik, kategori, durum geçmişi, reopen izi var mı?).
- Prim kapsamda mı kalacak (kalibrasyonlu), yoksa önce kapasite + kalite/risk pilotu mu?
- Rubrik ve 5 örnek-çapa birlikte tanımlanıp kilitlenecek.

---

## 6. Kaynak kalitesi & uyarılar (caveat)

- **DX Core 4** getDX'in tescilli çerçevesi; etkinliği bağımsız olarak tam kanıtlanmış değil, vendor kaynaklı.
- Bazı **ACM Queue** sayfaları 403 döndü; ikincil teyitle desteklendi.
- LLM bulguları "orta güven" bölgesinde; 12-bias iddiası tek makaleye (CALM) dayanıyor.
- "SPACE bireysel ölçümü yasaklar" iddiası reddedildi — yaygın ama yanlış.

### Birincil kaynaklar
- SPACE: `queue.acm.org/detail.cfm?id=3454124`
- DevEx: `queue.acm.org/detail.cfm?id=3595878`
- DX Core 4: `getdx.com/news/introducing-the-dx-core-4/` · `getdx.com/research/measuring-developer-productivity-with-the-dx-core-4/`
- McKinsey eleştirisi: `leaddev.com/career-development/what-mckinsey-got-wrong-about-developer-productivity` · `newsletter.pragmaticengineer.com/p/measuring-developer-productivity` · `martinfowler.com/bliki/CannotMeasureProductivity.html`
- Goodhart: `en.wikipedia.org/wiki/Goodhart%27s_law` · `buttondown.com/hillelwayne/archive/goodharts-law-in-software-engineering/`
- Performans review pratiği: `blog.pragmaticengineer.com/performance-reviews-for-software-engineers/`
- LLM puanlama & bias: `arxiv.org/html/2410.02736v1` (CALM) · `arxiv.org/html/2410.21819v2` · `arxiv.org/html/2603.06276v1` · `frontiersin.org/.../frai.2026.1772418/full` · `sciencedirect.com/science/article/pii/S2949719125000652`
