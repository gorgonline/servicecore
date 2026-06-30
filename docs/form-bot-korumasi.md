# Form Bot Koruması — Aşama 1 (Honeypot + Zaman Tuzağı)

Spam form gönderimlerine karşı ilk savunma katmanı. Kullanıcıya görünmez,
ek maliyet yok, CAPTCHA friction'ı yok.

## Mimari özet

Website'deki **8 formun tamamı** (`contact-form`, `demo-form`, `analiz-form`,
`partner-kayit-form`, `privacy-contact` + `egitimler`/`partnerlik`/`kurslar`
sayfaları) tek bir yoldan gönderiyor:

```
form → submitForm() (src/lib/forms.ts) → POST → Google Apps Script → Google Sheets
```

Arada bizim kontrol ettiğimiz bir sunucu yok; endpoint (`NEXT_PUBLIC_FORMS_ENDPOINT`)
herkese açık. Bu yüzden koruma **iki katmanlı**:

1. **Client (bu repo):** Gönderim öncesi honeypot + zaman kontrolü. Bot tespit
   edilirse istek sunucuya hiç gitmez; bota sahte "başarılı" yanıtı döner
   (sinyal vermemek için).
2. **Sunucu (Apps Script — aşağıdaki snippet):** Asıl zorlama. Endpoint'e
   doğrudan POST atan botları da eler; client kontrolü bypass edilse bile burada
   yakalanır.

## İki sinyal

| Sinyal | Nasıl çalışır | Eşik |
|---|---|---|
| **Honeypot** | İnsanlara görünmez gizli `website_url` alanı. Botlar tüm inputları doldurur; bu alan dolu gelirse → bot. | dolu = bot |
| **Zaman tuzağı** | Form mount'ından (≈ sayfaya gelme anı) gönderime kadar geçen süre. İnsan formu saniyeler içinde dolduramaz. | `< 1200 ms` = bot |

Eşik tek yerden gelir: `website/src/lib/form-guard.ts` → `MIN_FILL_MS`.
Apps Script'teki `MIN_FILL_MS` ile **aynı tutulmalı**.

## Repo tarafı (uygulandı)

- `src/lib/form-guard.ts` — sabitler + `isLikelyBot()` mantığı
- `src/hooks/useFormGuard.tsx` — gizli honeypot alanı + `collect()` toplayıcı
- `src/lib/forms.ts` — `submitForm(sheet, data, guard?)` artık guard verisini
  taşıyor ve client ön-elemesi yapıyor
- 8 formun her biri: `const guard = useFormGuard()` → `{guard.field}` render →
  `submitForm(..., guard.collect())`

Gönderilen payload artık şu şekilde:

```json
{ "sheet": "Demo", "data": { ... }, "guard": { "hp": "", "t": 8421 } }
```

`guard` alanı `data`'nın **dışında** — Google Sheets sütunlarını kirletmez.

## Apps Script tarafı (manuel ekle)

Apps Script projesinde (`Servicecore Formlar` bağlı script), `doPost`'un en
başına aşağıdaki kontrolü ekle:

```javascript
// === Bot koruması (honeypot + zaman tuzağı) ===
var MIN_FILL_MS = 1200;     // website/src/lib/form-guard.ts ile AYNI tutulmalı
var GUARD_STRICT = false;   // true → guard alanı hiç yoksa da ele (aşağıdaki nota bak)

function isSpam(payload) {
  var guard = payload && payload.guard;
  if (!guard) {
    // guard alanı yok: ya doğrudan POST eden naif bot, ya da çok eski cache'li
    // bir istemci. STRICT açıkken ele.
    return GUARD_STRICT === true;
  }
  // 1) Honeypot dolu → bot
  if (guard.hp && String(guard.hp).trim() !== "") return true;
  // 2) Form eşikten hızlı gönderildi → bot
  var t = Number(guard.t);
  if (!isNaN(t) && t < MIN_FILL_MS) return true;
  return false;
}

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);

  // Spam'i sessizce ele — bota başarı yanıtı dön, Sheet'e YAZMA.
  if (isSpam(payload)) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, sheet: payload.sheet }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ↓↓↓ MEVCUT sheet'e yazma kodun buradan itibaren AYNEN devam etsin ↓↓↓
}
```

Snippet'i ekledikten sonra **Deploy → Manage deployments → mevcut deployment'ı
"Edit" → New version** ile yeniden yayınla (URL aynı kalır).

### `GUARD_STRICT` notu

- `false` (varsayılan): yalnızca honeypot dolu **veya** çok hızlı gönderimler
  elenir. Naif "doğrudan POST" eden botlar (guard alanı hiç göndermeyen) geçer.
  Risk yok — hiçbir gerçek lead kaybedilmez.
- `true`: guard alanı olmayan **her** gönderim elenir. En güçlü koruma; ama
  saatlerce açık kalmış eski sekmelerdeki çok eski JS'ten gelen nadir gönderimi
  de eler. Spam doğrudan endpoint'e POST ile geliyorsa bunu `true` yap.

Öneri: önce `false` ile yayınla, spam loglarını izle. Spam hâlâ Sheet'e
düşüyorsa (yani guard'sız doğrudan POST geliyorsa) `true`'ya çek.

## Aşama 2 (sonraki adım, henüz yapılmadı)

Honeypot + zaman tuzağı kaba/orta seviye botları eler. Hedefli/ısrarlı botlar
için **Cloudflare Turnstile** (managed/görünmez, KVKK-dostu, ücretsiz) eklenir;
token Apps Script'te `siteverify` ile doğrulanır. Detay ayrı planda.
