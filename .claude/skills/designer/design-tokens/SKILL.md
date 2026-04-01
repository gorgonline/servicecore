---
name: design-tokens
description: Token sistemi. Type scale, spacing, WCAG kontrast rehberi. Token karari, font boyutu belirlerken kullan.
user-invocable: false
---

# Design Token Rehberi

Mevcut token dosyasi:
!ls -la website/src/data/design-tokens.json 2>/dev/null || echo "UYARI: design-tokens.json YOK — npm run tokens calistir"

Gercek token degerleri: brand/tokens.json ve website/src/data/design-tokens.json. Hardcoded hex YASAK.

## Type Scale

Formul: `fontSize = baseFontSize x ratio^step`
- Minor Third (1.200): cogu website, SaaS
- Major Third (1.250): pazarlama siteleri

### Line Height
- 14px ve alti: 1.6-1.7
- 16-20px: 1.5-1.6
- 20-32px: 1.3-1.4
- 32px+: 1.0-1.2

### Letter Spacing
- Body: 0 (normal)
- Baslik: -0.02 ile -0.03em
- Display: -0.03 ile -0.05em

## WCAG Kontrast

| Seviye | Oran | Nerede |
|--------|------|--------|
| AA Normal | >= 4.5:1 | Body metin |
| AA Buyuk | >= 3:1 | 18px+ veya 14px bold |
| AA UI | >= 3:1 | Border, ikon, focus ring |

## Spacing (Base-4)

| Kullanim | Deger |
|----------|-------|
| Ikon arasi | 4-8px |
| Kart padding | 16-24px |
| Section padding | 48-96px |
