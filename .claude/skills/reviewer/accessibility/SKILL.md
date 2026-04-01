---
name: accessibility
description: Erisilebilirlik kontrol rehberi. WCAG denetimi, kontrast, heading, form, focus, touch hedef kontrollerinde kullan. Puanlama icerir.
user-invocable: false
---

# Erisilebilirlik Kontrol Rehberi (Next.js)

## Kritik Kontroller (WCAG A)

### 1. Ikon Butonlar
- Metin icermeyen butonlarda `aria-label` VAR MI?

### 2. Form Etiketleri
- Her input'un `aria-label` veya bagli label etiketi VAR MI?
- Placeholder etiket YERINE GECMEZ.

### 3. Semantik HTML
- Tiklanabilir div/span VAR MI? (button veya a olmali)

### 4. Link Gecerliligi
- href'siz link VAR MI? onClick-only link YASAK.

## Ciddi Kontroller (WCAG AA)

### 5. Focus Gorunurlugu
- outline: none VARSA, alternatif focus gostergesi VAR MI?

### 6. Dokunma Hedefi
- Tiklanabilir elemanlar minimum 44x44px MI?

### 7. Baslik Hiyerarsisi
- h1 -> h3 (h2 atlandi) VARSA = hata. Sirali baslik seviyeleri zorunlu.

## Orta Kontroller

### 8. Renk Kontrasti
- Body metin (slate-400) arka plan (010E21) uzerinde >= 4.5:1 MI?
- UI elemanlari (border, ikon) >= 3:1 MI?

### 9. Animasyon
- `prefers-reduced-motion` kontrol ediliyor MU?

### 10. Image
- Tum next/image elemanlarinda `alt` text VAR MI? Turkce MI?
- Dekoratif gorseller icin `alt=""` (bos) MI?

## Puanlama

- 100'den basla
- Kritik sorun: -10 puan
- Ciddi sorun: -5 puan
- Orta sorun: -2 puan

## Rapor Formati

```
ERISILEBILIRLIK KONTROLU: [Sayfa Adi]
SKOR: XX/100

KRITIK (X sorun)
- [dosya:satir] Sorun -> Onerilen duzeltme

CIDDI (X sorun)
- [dosya:satir] Sorun -> Onerilen duzeltme

ORTA (X sorun)
- [dosya:satir] Sorun -> Onerilen duzeltme
```
