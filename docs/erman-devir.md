# ServiceCore — Devir Notu (Erman)

> Bu dosyayı Codex'e ver, kurulumu ve ilk adımları o yürütebilir.
> Kural dosyası ayrı: repo kökündeki `AGENTS.md` — Codex onu her oturumda kendi okur.

---

## 1. Ne devrediliyor

| Ne | Nerede | Durum |
|---|---|---|
| Pazarlama sitesi | `website/` → servicecore.com.tr | Canlı, Vercel'de |
| Marka kaynağı | `brand/` (tokens.json, voice.json) | Tek kaynak, buradan beslenir |
| E-posta şablonları | `email/` | Saf HTML |
| Panel UI kütüphanesi | `panel/` | Ayrı sistem, pnpm monorepo |
| Sosyal medya hattı | `social/` | **Repoda yok** — ayrı arşiv olarak gelir |

`projectcore/` ve `servicecore-app/` bu repoda değil, kendi repolarında.

---

## 2. Levent'ten istemen gereken 3 şey

Bunları Codex halledemez, elle verilmesi gerekiyor:

1. **GitHub yazma yetkisi** — `gorgonline/servicecore` reposuna collaborator olarak eklenmen lazım. Şu an sadece klonlayabilirsin, push edemezsin.
2. **Vercel proje erişimi** — deploy loglarını ve environment variable'ları görebilmen için.
3. **`social/.env` anahtarları** — Zernio API key, Vercel blob token, LinkedIn/Instagram hesap ID'leri. Arşivde bilerek yok.

---

## 3. Kurulum

```bash
git clone git@github.com:gorgonline/servicecore.git
cd servicecore/website
npm install
cp .env.example .env.local     # değerleri Vercel'den al
npm run dev                     # http://localhost:3000
```

Doğrulama:
```bash
npm run lint     # sıfır hata dönmeli
npm run build    # başarıyla bitmeli
```

---

## 4. Deploy nasıl çalışıyor

```
git push origin main  →  Vercel otomatik build  →  ~2 dk sonra canlı
```

Arada onay mekanizması **yok**. Push ettiğin şey yayına girer.

Bu yüzden push öncesi zorunlu:
```bash
npm run lint     # sıfır hata
npm run build    # patlamamalı
```

Build patlarsa Vercel deploy'u atar ve **site sessizce eski sürümde kalır** — hata mesajı görmezsin, sadece değişikliğin görünmez. Vercel panosundan build logunu kontrol et.

### Commit ve tag geleneği
```bash
git commit -m "egitimler: CSSM-P tarihi guncellendi"   # Türkçe, <kapsam>: <ne yapıldı>
git tag -a v1.81.0 -m "egitimler: CSSM-P tarihi guncellendi"
git push origin main --follow-tags
```
Sürüm numarası sıralı gider. Son tag: **v1.80.0**.

---

## 5. Sık yapılan iş: içerik güncelleme

Sayfa metinleri koda gömülü **değil**, JSON'da:

```
website/src/data/egitimler.json     eğitim tarihleri, müfredat
website/src/data/hizmetler.json     hizmet açıklamaları
website/src/data/moduller.json      modül listesi
website/src/data/page-meta.json     SEO başlık/açıklama
```

Örnek — eğitim tarihi değiştirme:
1. `egitimler.json` içinde `"Eğitim Tarihi"` alanını bul, değeri güncelle
2. `npm run lint`
3. Commit + tag + push

Codex'e "eğitimler sayfasındaki CSSM-P tarihini değiştir" dersen doğru dosyayı bulur — `AGENTS.md` ona metnin JSON'da olduğunu söylüyor.

---

## 6. Sosyal medya hattı (`social/`)

Ayrı arşiv olarak gelir, repoda yok (canlı API anahtarları içerdiği için).

**Ne yapar:** LinkedIn ve Instagram'a görsel post zamanlar. Zernio API üzerinden.

```bash
cd social
npm install
# .env dosyasını Levent'ten gelen anahtarlarla oluştur

npx tsx scripts/queue-ozet.ts --from=2026-09-01   # kuyruğu gör
npx tsx scripts/schedule.ts --plan=X.json         # kuyruğa at
npx tsx scripts/onizleme.ts --plan=X.json --out=posts/_onizleme.html
```

**Tempo:** Haftada 2 post — Salı + Perşembe, 11:00 (Europe/Istanbul).

**Mevcut kuyruk 29 Eylül 2026'da bitiyor.** Sonrası için yeni plan üretilmesi gerekiyor. Detaylı akış: `social/CLAUDE.md`.

**Görsel üretimi:** HTML kartlar Chrome headless ile PNG'ye basılıyor (1200×1200 → 2400×2400 @2x). Playwright bu ağda çalışmıyor, sistem Chrome'u kullanılıyor. Komut `social/CLAUDE.md` içinde.

---

## 7. Dikkat edilecekler

- **Repo public.** `gorgonline/servicecore` herkese açık. Anahtar, token, müşteri verisi commit'leme. `.env` dosyaları gitignore'da, orada tut.
- **Hardcoded renk yok.** Renkler `brand/tokens.json`'dan gelir. Codex bunu `AGENTS.md`'den biliyor ama gözden kaçarsa uyar.
- **Uydurma rakam yok.** Müşteri sayısı, performans oranı — kaynağı yoksa yazılmaz. Sosyal medya görsellerinde örnek veri kullanılıyorsa üzerinde "ÖRNEK PANO" ibaresi zorunlu.
- **Türkçe'de büyük I:** İngilizce kısaltmada düz "I" (IT, ITIL, API), Türkçe kelimede noktalı "İ" (İstek, İş Akışı).

---

## 8. Kurulum sonrası kontrol listesi

- [ ] Repoya push yetkim var (`git push` deneme commit'i ile test et)
- [ ] `npm run lint` sıfır hata dönüyor
- [ ] `npm run build` başarıyla bitiyor
- [ ] `npm run dev` ile site lokalde açılıyor
- [ ] Vercel panosuna erişimim var, build loglarını görüyorum
- [ ] `social/` arşivi açıldı, `.env` dolduruldu, `queue-ozet.ts` kuyruğu listeliyor
- [ ] Küçük bir değişiklik push edip Vercel'de deploy olduğunu gördüm
