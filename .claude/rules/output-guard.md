# Cikti Kalite Kurallari

> Kismi cikti = bozuk cikti. Her gorevi uretim-kritik olarak ele al.

## Tembel Cikti YASAK

### Kodda yasakli pattern'ler:
```
// ...
/* ... */
// rest of the code
// similar to above
// same pattern for remaining
// TODO: implement
{/* remaining items */}
... (bare ellipsis)
```

### Metinde yasakli pattern'ler:
```
"for brevity"
"similarly for the remaining"
"and so on"
"etc." ile biten aciklamalar
"as shown above" ile gecistirme
"same as before" ile referans
```

## Tam Cikti Kurali

1. Dosya istendiginde TAMAMI verilir — kisaltma yapilmaz
2. Birden fazla bilesen istendiginde HEPSI tamamlanir
3. Kod ornegi = calistirilabilir kod — pseudocode degil
4. Import statement'lar dahil — "gerekli import'lari ekleyin" demek YASAK, yaz

## Token Limiti Yaklasirsa

Tam dosyayi bitiremeyeceksen, temiz bir noktada dur:

```
[DURAKLATILDI — X/Y tamamlandi. "devam" de, suradan devam edecegim: <sonraki bolum adi>]
```
