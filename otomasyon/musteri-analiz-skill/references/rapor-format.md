# Rapor formatı, content.json şeması ve e-posta taslağı

## Bölüm sırası (sabit)

Rapor her zaman bu sırayı izler:

1. Başlık bloğu + Taraflar
2. **1 · Yönetici Özeti** — en üstte "Tek cümle:" ile bu müşteri aslında ne tür bir alıcı + ana fırsat + ana risk + önerilen hamle.
3. **2 · Müşteri Profili** — firma, ölçek, mevcut durum/statüko.
4. **3 · Gerçek İhtiyaç vs Söylenen**
5. **4 · Karar Yapısı & Bütçe** (tablo)
6. **5 · Sinyaller** (sıcak / soğuk)
7. **6 · İtirazlar & Endişeler** (açık / örtük)
8. **7 · Sizin Göremeyeceğiniz Pattern'ler** — raporun asıl değeri; numaralı, her madde etiketli.
9. **8 · Riskler** (önem sırasına göre tablo: Risk / Neden / Azaltma)
10. **9 · Teklif & Sonraki Adım Önerileri** (numaralı, uygulanabilir)
11. **Ek · Metodoloji & Kanıt** — etiket anahtarı + 5-6 doğrudan alıntı (zaman damgalı).

Yönetici özeti tek başına okunduğunda karar verdirebilmeli. Pattern bölümü en güçlü kısım olmalı.

## content.json şeması

Script bu yapıyı bekler. `sections` sırayla render edilir.

```json
{
  "meta": {
    "ust": "MÜŞTERİ TOPLANTISI · DERİN ANALİZ",
    "baslik": "ServiceCore Guided Demo — <Müşteri>",
    "altbaslik": "19 Haziran 2026 · 1 sa 21 dk · Demo / keşif görüşmesi",
    "altbilgi": "Hazırlayan: Gorgo Agency (AI destekli analiz) · Alıcı: Erman Taşkın & ekip · Gizli"
  },
  "taraflar": [
    ["Müşteri (potansiyel)", "Ömer Faruk — değerlendiren / proje sahibi. **Genel Müdür** kararda üst merci."],
    ["ServiceCore tarafı", "Tamer Demirayak (satış), İsmail Berk Solcan (demo), Erman Taşkın (fiyat)."]
  ],
  "sections": [
    { "h1": "1 · Yönetici Özeti" },
    { "p": "Tek cümle: **Bu müşteri bir ITSM alıcısı değil; ...**" },
    { "bul": ["**Asıl tetikleyici:** ... {{coy}}", "..."] },
    { "h1": "4 · Karar Yapısı & Bütçe" },
    { "table": { "head": ["Rol", "Tespit"], "fill": "PRIMARY",
        "rows": [ ["Champion", "Ömer Faruk — ... {{olgu}}"], ["Ekonomik alıcı", "Genel Müdür ... {{coy}}"] ] } },
    { "h2": "Sıcak (satın alma yönünde)" },
    { "bul": ["Teklif sürecini kendisi sordu ... {{olgu}}"] },
    { "h1": "8 · Riskler (önem sırasına göre)" },
    { "table": { "head": ["Risk", "Neden", "Azaltma"], "fill": "RED",
        "rows": [ ["1. Fiyat şoku", "...", "..."] ] } },
    { "h1": "9 · Teklif & Sonraki Adım Önerileri" },
    { "num": ["**Anlatıyı çevir:** ...", "..."] },
    { "h1": "Ek · Metodoloji & Kanıt" },
    { "p": "Etiket anahtarı. {{olgu}} = açıkça söylendi. ..." },
    { "bul": ["**Sorumluluk:** “...alıntı...” [00:01]"] }
  ]
}
```

### Satır içi işaretleme (inline markup)

İçindeki metinlerde script şu işaretleri çevirir:

- `**kalın**` → kalın metin.
- `{{olgu}}` → yeşil **[Olgu]** etiketi.
- `{{cy}}` → mavi **[Çıkarım · güven: yüksek]**.
- `{{coy}}` → mavi **[Çıkarım · güven: orta-yüksek]**.
- `{{co}}` → amber **[Çıkarım · güven: orta]**.
- `{{cd}}` → gri **[Çıkarım · güven: düşük]**.
- `“ ”` tırnaklar aynen kalır (alıntılar için kullan).

### Bölüm tipleri

- `{"h1": "..."}` — ana başlık (alt çizgili).
- `{"h2": "..."}` — alt başlık.
- `{"p": "..."}` — paragraf.
- `{"bul": ["...", "..."]}` — madde işaretli liste.
- `{"num": ["...", "..."]}` — numaralı liste.
- `{"table": {"head": [...], "rows": [[...]], "fill": "PRIMARY|INK|RED"}}` — tablo (2 veya 3 sütun). Renkler ServiceCore brand'inden gelir (beyaz zemin, #0070F3 primary, #010E21 ink). Logo `assets/logo.png` başlığa otomatik eklenir.

## Erman'a TASLAK e-posta şablonu

Konu: `Müşteri Analizi — <Müşteri> <ToplantıTipi> (<Tarih>)`

```
Erman Bey merhaba,

<Müşteri> ile <tarih> <toplantı tipi> görüşmesinin derin analizini ekte paylaşıyorum. Özet:

• Gerçek ihtiyaç: <tek cümle — söylenenin altındaki>.
• Karar yapısı: champion <kim>, onay <kim>; <bütçe/kullanıcı notu>.
• En kritik fırsat: <tek cümle>.
• En büyük risk: <tek cümle + azaltma>.
• Önerilen sonraki hamle: <somut adım>.

Detaylar, kanıt alıntıları ve teklif önerileri ekteki raporda. Her bulgu olgu/çıkarım + güven
seviyesiyle etiketli.

Saygılarımla,
Levent
```

Taslağı hazırla, **gönderme**; Levent gözden geçirip kendisi göndersin.
