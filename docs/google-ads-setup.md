# Google Ads + GA4 Kurulum Rehberi

> Bu rehber, ServiceCore website kanalına yerleştirilmiş tracking altyapısını **aktif etmek** için adım adım talimat verir. Kod ve banner zaten kurulu — eksik olan **Google hesapları + ID'lerin .env.local'a yazılması**.

## Mimari (kurulu)

- `@next/third-parties/google` paketi ile GA4 yüklemesi (root layout)
- Google Ads global tag (`AW-`) — next/script ile yüklenir
- Google Consent Mode v2 default `denied` — script'ten önce inline
- Çerez bandı (`<CookieConsent />`) — KVKK + Consent Mode v2 uyumlu
- Conversion event firing: `/tesekkurler?from=<demo|analiz|iletisim|partner>` mount'unda
- Demo formu özel: GA4 `generate_lead` + Google Ads conversion ping (label set ise)
- Diğer formlar: sadece GA4 `generate_lead` (Ads conversion sayılmaz)

## 1. GA4 Property Oluştur

1. [analytics.google.com](https://analytics.google.com) → **Admin** → **Create Property**
2. Property adı: `ServiceCore Website` — para birimi TRY, saat dilimi `(GMT+3) Istanbul`
3. **Data Streams** → **Add stream** → Web → URL: `https://servicecore.com.tr`
4. Açılan panelde **Measurement ID**'yi kopyala: `G-XXXXXXXXXX`
5. **Enhanced measurement** açık kalsın (scroll, click, file download otomatik tracking)
6. `Admin → Data settings → Data collection`: **Google signals** ve **Advertising features** aç

## 2. Google Ads Hesabı + Conversion Action

1. [ads.google.com](https://ads.google.com) → hesap aç (eğer yoksa)
2. **Tools** → **Conversions** → **+ New conversion action** → **Website**
3. URL'ye `https://servicecore.com.tr` yaz, **Scan** — site script bekler
4. **Create conversions manually** seç
5. Conversion ayarları:
   - **Category:** `Submit lead form`
   - **Conversion name:** `ServiceCore — Demo Talebi`
   - **Value:** `Don't use a value` (ya da sabit değer — opsiyonel)
   - **Count:** `One` (aynı kullanıcı 1 conversion sayılır)
   - **Click-through window:** 30 gün
   - **Attribution model:** Data-driven (ya da Last-click)
6. **Tag setup** → **Use Google Tag** → şu iki değeri kopyala:
   - **Conversion ID:** `AW-XXXXXXXXXX` (account-level)
   - **Conversion Label:** `XxXXxXxXxXxXxxxxx` (action-level, demo'ya özel)

## 3. .env.local Doldurma

```bash
# website/.env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GADS_CONVERSION_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_DEMO_CONVERSION_LABEL=XxXXxXxXxXxXxxxxx
```

**Vercel production:** Aynı değişkenleri **Project Settings → Environment Variables** altına ekle (Production environment için).

> Boş bırakırsan: GA4 ve Ads tag yüklenmez, banner hâlâ çıkar. Geliştirme sırasında veri kirletmemek için ideal.

## 4. GA4 ↔ Google Ads Bağlantısı

1. GA4 → Admin → **Product links** → **Google Ads links** → **Link**
2. Google Ads hesabını seç → Personalized advertising aç
3. Bu bağlantıdan sonra GA4 conversion'larını Ads'e import edebilirsin (manuel conversion action yerine alternatif yöntem).

## 5. Test (Yayına Almadan Önce)

### Lokal test
```bash
cd website
npm run dev
```

1. `http://localhost:3000` → Çerez bandı görünmeli
2. Chrome DevTools → **Network** → "Kabul Et"e bas → `google-analytics.com/g/collect` veya `googletagmanager.com/gtag/js` request'i atılmalı
3. "Reddet" sonrası → yeni request atılmamalı (Consent Mode düzgün çalışıyor)
4. `/demo` → form doldur, gönder → `/tesekkurler?from=demo`'ya redirect
5. GA4 → **Reports → Realtime** → `generate_lead` event'i 30 saniye içinde görünmeli
6. **Chrome eklentisi: Google Tag Assistant** ile her tag'in `Fired` olduğunu doğrula

### GA4 DebugView
1. GA4 → Admin → **DebugView**
2. Chrome'da **Google Analytics Debugger** eklentisini aç
3. Form doldur → DebugView'da event'leri sayfada gerçek zamanlı izle

### Production smoke test
- Vercel preview deploy'unda test et (production'a almadan önce)
- Vercel deploy bittikten sonra production URL'de aynı testleri tekrarla

## 6. UTM Stratejisi

### Google Ads (otomatik)
- Ads hesabında **Account settings → Auto-tagging: ON** (varsayılan açık)
- Her tıklama URL'sine `?gclid=...` eklenir, GA4 ve conversion bunu otomatik okur
- Manuel UTM **EKLEME** (auto-tag ile çakışır)

### Diğer kanallar (manuel)
LinkedIn, email, partner site vb. için UTM standardı:

| Parametre | Örnek | Açıklama |
|---|---|---|
| `utm_source` | `linkedin`, `email`, `partner-x` | Trafik kaynağı |
| `utm_medium` | `social`, `newsletter`, `referral` | Kanal türü |
| `utm_campaign` | `2026-q2-itsm-launch` | Kampanya adı |
| `utm_term` | `itsm-yazilim` | (opsiyonel) keyword |
| `utm_content` | `cta-banner-blue` | (opsiyonel) varyasyon |

Örnek: `https://servicecore.com.tr/demo?utm_source=linkedin&utm_medium=social&utm_campaign=2026-q2-itsm-launch`

## 7. Yaygın Sorunlar

- **Banner çıkmıyor:** localStorage'da `sc-consent-v1` key'ini sil → sayfa yenile
- **GA4 event görünmüyor:** Ad-blocker kapat, incognito'da test et
- **Conversion ping olmuyor:** `NEXT_PUBLIC_GADS_DEMO_CONVERSION_LABEL` boş olabilir, kontrol et
- **DevTools Network'te `collect` görünmüyor:** Consent reddedilmiş olabilir → localStorage temizle
- **Production'da çalışmıyor:** Vercel env variable'larının **Production** environment için ayarlı olduğundan emin ol, yeni deploy tetikle

## 8. Sonraki Adımlar (Bu Rehberin Dışında)

- DataForSEO ile Türkiye için ITSM keyword araştırması
- Google Ads kampanya yapısı (search, ad groups, keyword listesi, negative keywords)
- Reklam metni varyasyonları (en az 3 RSA per ad group)
- Landing page optimizasyonu (keyword-LP eşleşmesi)
- A/B test setup (Google Optimize alternatifi: VWO, Optimizely)
- Resmi Google Ads MCP server kurulumu (`googleads/google-ads-mcp`) — kampanya yönetimini AI'dan yapmak için
