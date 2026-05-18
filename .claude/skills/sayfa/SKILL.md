---
name: sayfa
description: "ServiceCore website'de yeni sayfa kurar. designer → builder → reviewer → verifier zincirini calistirir. Use when user says 'yeni sayfa', 'sayfa kur', 'sayfa ac', '/sayfa', 'page olustur'."
user-invocable: true
---

# Yeni Sayfa Recetesi

Website'de yeni sayfa kurmak icin 4 ajani sirayla calistir.

## Adim 0: Hedef

Kullanici sayfa adi vermis mi? $ARGUMENTS

Vermemisse SOR. Hangi sayfa? Turkce URL slug ne olacak? (or: `/cozumler/yeni-modul`)

## Adim 1: Designer

Designer ajanini cagir.

Gorev: Sayfanin yapisini, section'larini, JSON data dosyasini hazirla.

Ciktiyi al, kullaniciya goster, ONAY iste:
> "Designer tasarimi yapti. Builder'a geceyim mi?"

Kullanici onaylamadan SONRAKI ADIMA GECME.

## Adim 2: Builder

Builder ajanini cagir.

Gorev: Designer'in JSON data dosyasini ve yapisini kullanarak TSX/layout/page kodunu yaz.

Ciktiyi al, kullaniciya goster, ONAY iste:
> "Builder kodu yazdi. Reviewer'a geceyim mi?"

## Adim 3: Reviewer

Reviewer ajanini cagir.

Gorev: Kodu denetle — token uyumu, a11y, ServiceCore tasarim dili.

Bulgular varsa:
- Kritik bulgular → Builder'a geri don, duzelt
- Kucuk bulgular → kullaniciya goster, karar verdir

Onay sonrasi:
> "Reviewer onayladi. Verifier'a geceyim mi?"

## Adim 4: Verifier

Verifier ajanini cagir.

Gorev: `npm run lint` ve typecheck calistir.

Hata varsa → Builder'a geri don, duzelt, tekrar verifier.
Sifir hata → tamamlandi.

## Bitis

Kullaniciya ozet:
- Sayfa: `<sayfa-adi>`
- Olusturulan dosyalar: liste
- Lint: sifir hata
- Devam icin: "git commit yapmami ister misin?" (kullanici istemedikce YAPMA)

## Kurallar

- Her adim sonrasi ONAY iste, bekle
- Atlama yapma, sirayi koru
- Hata cikarsa: hangi adimda, ne hatasi → kullaniciya net soyle
- `npm run build` ve `git commit` kullanici acikca istemedikce YAPMA
- Hardcoded hex/string YASAK — ajanlar bunu zaten biliyor ama hatirlat
