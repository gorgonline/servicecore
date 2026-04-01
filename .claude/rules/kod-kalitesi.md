---
paths:
  - "website/src/**"
---

# Kod Kalitesi

## TypeScript
- strict mode, any YASAK (unknown kullan)
- Props ayni dosyada tanimla, export etme
- interface tercih et (type yerine), basit tipler icin type ok

## Import
- Kullanilmayan import YASAK
- Barrel export (index.ts) gereksizse olusturma
- Gostereli import: @/ prefix kullan

## Bilesenler
- Server Components varsayilan. `'use client'` sadece state/effect/event gerektiginde
- `cursor-pointer` tum tiklanabilir elementlerde zorunlu
- `next/image` kullan, `alt` text Turkce
- Route Izolasyonu: `(main)` ve `(orkestra)` arasi import YASAK

## Dosya Yapisi
- Bilesen: website/src/components/<Ad>.tsx
- Sayfa: website/src/app/(main)/<route>/page.tsx
- API: website/src/app/api/<route>/route.ts
- Hook: website/src/hooks/use<Ad>.ts
- Util: website/src/lib/<ad>.ts
- Veri: website/src/data/<ad>.json

## Lint
- `npm run lint` sifir hata zorunlu — is bitmeden calistir

## Git
- Commit mesaji Turkce
- Tek commit = tek is birimi
