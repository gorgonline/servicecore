# Zoho CRM Bağlantısı — Erman İçin Kurulum Talimatı

**Amaç:** Web sitesi ve uygulamadaki formlar (Demo, İletişim, Analiz, Partnerlik) gönderildiğinde Zoho CRM'de otomatik olarak **Lead** oluşması.

**Güvenlik notu (önemli):** Aşağıda oluşturacağın yetki anahtarı **sadece "Lead oluşturma"** iznine sahip olacak. Bu anahtarla CRM'deki hiçbir kayıt **okunamaz, güncellenemez, silinemez**. Müşteri verileri, fırsatlar, raporlar tamamen kapalı kalır. Anahtar sızsa bile olabilecek tek şey CRM'e boş lead düşmesidir.

Toplam süre: ~5 dakika.

---

## Adım 0 — Hangi Zoho bölgesindesin?

CRM'e girdiğin adres çubuğuna bak:

| Giriş adresin | Bölge | Aşağıda kullanacağın adresler |
|---|---|---|
| `crm.zoho.com` | ABD | `api-console.zoho.com` ve `accounts.zoho.com` |
| `crm.zoho.eu` | Avrupa | `api-console.zoho.eu` ve `accounts.zoho.eu` |
| `crm.zoho.in` | Hindistan | `api-console.zoho.in` ve `accounts.zoho.in` |

Aşağıdaki adımlarda `.com` yazdım — bölgen farklıysa uzantıyı ona göre değiştir.

---

## Adım 1 — Self Client oluştur

1. Tarayıcıda **https://api-console.zoho.com** adresine git (CRM'e girdiğin Zoho hesabıyla).
2. **GET STARTED** (veya sağ üstte **ADD CLIENT**) → **Self Client** seç → **CREATE** → **OK**.
3. Açılan ekranda iki değer göreceksin:
   - **Client ID** → kopyala, kenara not et
   - **Client Secret** → kopyala, kenara not et

> Daha önce Self Client oluşturulmuşsa yenisini açmana gerek yok; mevcut olanın Client ID/Secret değerlerini kullanabilirsin.

---

## Adım 2 — Yetki kodu üret (Generate Code)

1. Aynı ekranda **Generate Code** sekmesine geç.
2. **Scope** alanına aynen şunu yaz (kopyala-yapıştır):

   ```
   ZohoCRM.modules.leads.CREATE
   ```

3. **Time Duration:** 10 minutes seç.
4. **Scope Description:** `ServiceCore web formları - lead olusturma` yaz.
5. **CREATE** bas → CRM portalını seçmen istenirse şirket portalını seç.
6. Ekrana gelen **kodu kopyala**.

> ⚠️ Bu kod **10 dakika** geçerli. Kopyalar kopyalamaz Adım 3'e geç.

---

## Adım 3 — Kodu kalıcı anahtara (refresh token) çevir

İki seçenek var, hangisi kolayına gelirse:

### Seçenek A — Kendin çevir (terminal/komut istemi)

Windows'ta "Komut İstemi" (cmd) veya Mac'te Terminal aç, aşağıdaki komutu **üç BÜYÜK_HARFLİ yeri kendi değerlerinle değiştirerek** çalıştır:

```
curl -X POST "https://accounts.zoho.com/oauth/v2/token" -d "grant_type=authorization_code" -d "client_id=CLIENT_ID_BURAYA" -d "client_secret=CLIENT_SECRET_BURAYA" -d "code=ADIM2_KODU_BURAYA"
```

(Avrupa hesabıysa `accounts.zoho.eu` yaz.)

Dönen cevabın içinde `"refresh_token": "1000.xxxx..."` değeri olacak — bize lazım olan bu.

### Seçenek B — Kodu hemen bize ilet

Adım 2'deki kodu kopyaladığın anda Levent'e Teams'ten gönder (10 dakika içinde), çevirme işlemini biz yaparız.

---

## Adım 4 — Bize gönderilecekler

Şu **3 değer**:

1. `Client ID`
2. `Client Secret`
3. `Refresh Token` (Seçenek B'yi seçtiysen sadece Adım 2 kodu — hızlıca)

**Güvenlik:** Üçünü tek bir e-postada gönderme. Örn. ikisini Teams'ten, birini telefonla/SMS'le ilet. Bu değerler şifre niteliğindedir (ama yukarıda anlatıldığı gibi yetkisi sadece "lead oluşturma" ile sınırlıdır).

---

## Sonrası (bizim taraf)

- Değerler form altyapımıza (Google Apps Script — Script Properties, kod içinde görünmez) tanımlanacak.
- Test formu doldurulacak → CRM'de **Leads** modülüne "Lead Source: Web Form — Demo" gibi kaynaklı bir test kaydı düşecek.
- Test lead'ini görüp onayladığında sistem canlıya alınmış olacak. Test kaydını sonra silebilirsin.

Sorun olursa: kod süresi dolduysa (10 dk) Adım 2'yi tekrarlamak yeterli — Self Client'ı yeniden oluşturmak gerekmez.
