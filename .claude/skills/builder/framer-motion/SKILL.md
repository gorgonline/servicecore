---
name: framer-motion
description: Framer Motion kod rehberi. Animasyon kodlarken, motion component, variants, scroll, stagger pattern yazarken kullan.
user-invocable: false
---

# Framer Motion Kod Rehberi

Hangi animasyonun yapilacagina designer karar verir. Bu dosya SADECE implementasyon icin.

Framer Motion yuklu mu kontrol et:
!grep -q "framer-motion" website/package.json && echo "framer-motion YUKLU" || echo "UYARI: framer-motion YUKLU DEGIL — npm install framer-motion gerekli"

Spring degerleri: brand/tokens.json animation bolumunden alinir.

## Pattern'ler

### Giris animasyonu
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
/>
```

### Hover + Tap
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
/>
```

### Stagger
```tsx
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};
```

### Scroll tetiklemeli
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
/>
```

### Reduced Motion
```tsx
const shouldReduceMotion = useReducedMotion();
// shouldReduceMotion true ise y: 0 ve duration: 0 kullan
```

## Kurallar

- GPU property kullan: opacity, transform. width/height YASAK
- Spring tercih et. Linear YASAK
- useReducedMotion her zaman kontrol et
- AnimatePresence ile exit animasyonu
