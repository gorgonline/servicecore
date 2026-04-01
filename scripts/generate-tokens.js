#!/usr/bin/env node

/**
 * Token Generator Script
 *
 * Tek kaynak: brand/tokens.json
 * Çıktılar:
 *   1. website/src/app/globals.css  → CSS Custom Properties (:root bloğu)
 *   2. website/src/lib/tokens.ts    → JS runtime constants
 *
 * Kullanım: node scripts/generate-tokens.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_PATH = path.join(ROOT, 'brand/tokens.json');
const CSS_PATH = path.join(ROOT, 'website/src/app/globals.css');
const TS_PATH = path.join(ROOT, 'website/src/lib/tokens.ts');

// ─── Token dosyasını oku ───
const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'));

// ═══════════════════════════════════════════════
// 1. CSS Custom Properties üret
// ═══════════════════════════════════════════════

function generateCSS(tokens) {
  const lines = [];

  lines.push('  /* ── Brand Colors ── */');
  const brand = tokens.colors.brand;
  lines.push(`  --color-brand-primary: ${brand.primary};`);
  lines.push(`  --color-brand-primary-hover: ${brand.primaryHover};`);
  lines.push(`  --color-brand-primary-dark: ${brand.primaryDark};`);
  lines.push(`  --color-brand-secondary: ${brand.secondary};`);
  lines.push(`  --color-brand-accent: ${brand.accent};`);
  lines.push(`  --color-brand-purple: ${brand.purple};`);

  lines.push('');
  lines.push('  /* ── Surface Colors ── */');
  const surface = tokens.colors.surface;
  lines.push(`  --color-surface-base: ${surface.base};`);
  lines.push(`  --color-surface-base-dark: ${surface.baseDark};`);
  lines.push(`  --color-surface-elevated-solid: ${surface.elevated};`);
  lines.push(`  --color-surface-elevated-dark: ${surface.elevatedDark};`);
  lines.push(`  --color-surface-shader1: ${surface.shader1};`);
  lines.push(`  --color-surface-shader2: ${surface.shader2};`);
  lines.push(`  --color-surface-mid-gradient: ${surface.midGradient};`);

  lines.push('');
  lines.push('  /* ── Surface Alpha ── */');
  const sa = tokens.colors.surfaceAlpha;
  for (const [key, val] of Object.entries(sa)) {
    lines.push(`  --color-surface-alpha-${key}: ${val};`);
  }

  lines.push('');
  lines.push('  /* ── Border Colors ── */');
  const border = tokens.colors.border;
  lines.push(`  --color-border-subtle: ${border.subtle};`);
  lines.push(`  --color-border-default: ${border.default};`);
  lines.push(`  --color-border-medium: ${border.medium};`);
  lines.push(`  --color-border-strong: ${border.strong};`);
  lines.push(`  --color-border-active: ${border.activePrimary};`);
  lines.push(`  --color-border-active-strong: ${border.activePrimaryStrong};`);

  lines.push('');
  lines.push('  /* ── Text Colors ── */');
  const text = tokens.colors.text;
  lines.push(`  --color-text-primary: ${text.primary};`);
  lines.push(`  --color-text-secondary: ${text.secondary};`);
  lines.push(`  --color-text-muted: ${text.muted};`);
  lines.push(`  --color-text-dim: ${text.dim};`);
  lines.push(`  --color-text-faint: ${text.faint};`);
  lines.push(`  --color-text-brand: ${text.brand};`);
  lines.push(`  --color-text-overline: ${tokens.typography.overline.color};`);

  lines.push('');
  lines.push('  /* ── Accent Colors ── */');
  const accent = tokens.colors.accent;
  for (const [name, shades] of Object.entries(accent)) {
    lines.push(`  --color-accent-${name}-light: ${shades.light};`);
    lines.push(`  --color-accent-${name}-base: ${shades.base};`);
    lines.push(`  --color-accent-${name}-dark: ${shades.dark};`);
  }

  lines.push('');
  lines.push('  /* ── Accent Alpha ── */');
  const aa = tokens.colors.accentAlpha;
  for (const [key, val] of Object.entries(aa)) {
    lines.push(`  --color-accent-alpha-${key}: ${val};`);
  }

  lines.push('');
  lines.push('  /* ── Shadows ── */');
  const glow = tokens.shadows.glow;
  lines.push(`  --shadow-glow-primary: ${glow.primary};`);
  lines.push(`  --shadow-glow-primary-strong: ${glow.primaryStrong};`);
  lines.push(`  --shadow-glow-primary-hero: ${glow.primaryHero};`);
  lines.push(`  --shadow-glow-primary-subtle: ${glow.primarySubtle};`);
  lines.push(`  --shadow-glow-primary-weak: ${glow.primaryWeak};`);
  lines.push(`  --shadow-glow-primary-card: ${glow.primaryCard};`);
  lines.push(`  --shadow-glow-white: ${glow.white};`);

  lines.push('');
  lines.push('  /* ── Legacy aliases ── */');
  lines.push('  --background: var(--color-surface-base);');
  lines.push('  --foreground: var(--color-text-primary);');

  return lines.join('\n');
}

// ═══════════════════════════════════════════════
// 2. TypeScript runtime tokens üret
// ═══════════════════════════════════════════════

function generateTS(tokens) {
  const lines = [];
  lines.push('/**');
  lines.push(' * AUTO-GENERATED — DO NOT EDIT');
  lines.push(' * Source: brand/tokens.json');
  lines.push(' * Generator: scripts/generate-tokens.js');
  lines.push(' *');
  lines.push(' * CSS variable kullanilamayan yerlerde (JS props, dynamic styles) bu dosya kullanilir.');
  lines.push(' * Degisiklik yapmak icin brand/tokens.json duzenle ve `node scripts/generate-tokens.js` calistir.');
  lines.push(' */');
  lines.push('');

  // Colors
  lines.push('export const runtimeTokens = {');
  lines.push('  colors: {');
  lines.push('    brand: {');
  const brand = tokens.colors.brand;
  for (const [k, v] of Object.entries(brand)) {
    lines.push(`      ${k}: '${v}',`);
  }
  lines.push('    },');

  lines.push('    surface: {');
  const surface = tokens.colors.surface;
  for (const [k, v] of Object.entries(surface)) {
    lines.push(`      ${k}: '${v}',`);
  }
  lines.push('    },');

  lines.push('    text: {');
  const text = tokens.colors.text;
  for (const [k, v] of Object.entries(text)) {
    lines.push(`      ${k}: '${v}',`);
  }
  lines.push('    },');

  lines.push('    accent: {');
  const accent = tokens.colors.accent;
  for (const [name, shades] of Object.entries(accent)) {
    for (const [shade, val] of Object.entries(shades)) {
      lines.push(`      ${name}${shade.charAt(0).toUpperCase() + shade.slice(1)}: '${val}',`);
    }
  }
  lines.push('    },');

  lines.push('    accentAlpha: {');
  const aa = tokens.colors.accentAlpha;
  for (const [k, v] of Object.entries(aa)) {
    lines.push(`      '${k}': '${v}',`);
  }
  lines.push('    },');

  lines.push('    statusDots: {');
  const sd = tokens.colors.statusDots;
  for (const [k, v] of Object.entries(sd)) {
    lines.push(`      ${k}: '${v}',`);
  }
  lines.push('    },');

  lines.push('  },');

  // Mesh Gradient
  lines.push('  meshGradient: {');
  const mg = tokens.effects.meshGradient;
  for (const [name, config] of Object.entries(mg)) {
    const colorsStr = config.colors.map(c => `'${c}'`).join(', ');
    lines.push(`    ${name}: [${colorsStr}] as string[],`);
  }
  lines.push('  },');

  // Animation springs
  lines.push('  animation: {');
  lines.push('    spring: {');
  const springs = tokens.animation.spring;
  for (const [name, config] of Object.entries(springs)) {
    const entries = Object.entries(config).map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`).join(', ');
    lines.push(`      ${name}: { ${entries} },`);
  }
  lines.push('    },');
  lines.push('  },');

  lines.push('} as const;');

  // Backward compat alias
  lines.push('');
  lines.push('/** @deprecated Use runtimeTokens instead */');
  lines.push('export const tokens = runtimeTokens;');

  return lines.join('\n');
}

// ═══════════════════════════════════════════════
// 3. Dosyalara yaz
// ═══════════════════════════════════════════════

// --- CSS: globals.css'teki :root bloğunu değiştir ---
const cssContent = fs.readFileSync(CSS_PATH, 'utf-8');
const rootStart = cssContent.indexOf(':root {');
const rootEnd = cssContent.indexOf('}', rootStart) + 1;

if (rootStart === -1) {
  console.error('ERROR: :root bloğu bulunamadı!');
  process.exit(1);
}

const beforeRoot = cssContent.slice(0, rootStart);
const afterRoot = cssContent.slice(rootEnd);

const newCSS = beforeRoot +
  ':root {\n' +
  generateCSS(tokens) + '\n' +
  '}' +
  afterRoot;

// Yorum satırını güncelle
const finalCSS = newCSS.replace(
  /Source of truth:.*\n/,
  'Source of truth: brand/tokens.json (auto-generated by scripts/generate-tokens.js)\n'
);

fs.writeFileSync(CSS_PATH, finalCSS);
console.log('✓ globals.css updated');

// --- TS: tokens.ts'i tamamen yeniden yaz ---
fs.writeFileSync(TS_PATH, generateTS(tokens) + '\n');
console.log('✓ lib/tokens.ts updated');

console.log('');
console.log('Done! Token files generated from brand/tokens.json');
