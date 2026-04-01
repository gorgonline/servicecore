---
name: verification
description: QA dogrulama protokolu. Kod incelemesi, is tamamlama oncesi kontrol yaparken kullan.
user-invocable: false
---

# Dogrulama Protokolu

## Demir Yasa

KANITLANMADAN IDDIA ETME.

## Adimlar

1. TANIMLA: Hangi komut bu iddiayi kanitlar?
2. CALISTIR: Komutu calistir
3. OKU: Ciktinin TAMAMINI oku
4. DOGRULA: Cikti iddiayi destekliyor mu?
5. ANCAK SIMDI: Iddiani yap

## Yaygin Hatalar

| Iddia | Gerekli | Yeterli DEGIL |
|-------|---------|---------------|
| Lint gecti | Lint ciktisi: 0 hata | "Gecmesi lazim" |
| Build basarili | Build ciktisi: exit 0 | Lint gecti = build gecer |
| Bug duzeltildi | Orijinal semptomu test et | Kod degisti = duzelmistir |

## Kirmizi Bayraklar

"Muhtemelen gecer", "Guzel gorunuyor", memnuniyet ifadesi dogrulamadan once = DUR.
