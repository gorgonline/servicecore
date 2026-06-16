import {
  Display,
  Heading,
  Text,
  Eyebrow,
  Code,
  type DisplaySize,
  type TextSize,
  type TextWeight,
  type TextColor,
  type EyebrowTone,
} from "@servicecoreui/ui/typography";
import styles from "./typography.module.css";

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

const DISPLAY_SIZES: { size: DisplaySize; sample: string; desc: string }[] = [
  { size: "lg", sample: "Hero Display", desc: "60px · hero ekranlar" },
  { size: "md", sample: "Section Hero", desc: "48px · bölüm hero" },
  { size: "sm", sample: "Compact Display", desc: "36px · küçük hero" },
];

const TEXT_SIZES: { size: TextSize; desc: string }[] = [
  { size: "xl", desc: "18px · lead paragraf" },
  { size: "lg", desc: "16px · büyük gövde" },
  { size: "md", desc: "14px · varsayılan" },
  { size: "sm", desc: "13px · ikincil gövde" },
  { size: "xs", desc: "12px · küçük metin / caption" },
];

// Type sistemi tavanı = medium (semibold/bold typo'dan kaldırıldı).
const TEXT_WEIGHTS: TextWeight[] = ["regular", "medium"];

const TEXT_COLORS: TextColor[] = [
  "primary",
  "secondary",
  "tertiary",
  "disabled",
  "accent",
  "success",
  "warning",
  "danger",
];

const EYEBROW_TONES: EyebrowTone[] = [
  "default",
  "primary",
  "accent",
  "success",
  "warning",
  "danger",
];

export default function TypographyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Faz 2 · Typography</Eyebrow>
        <Display size="md">Type System</Display>
        <Text size="md" color="secondary">
          Display, Heading, Text, Eyebrow, Code — tüm tipografi bileşenleri tokens.css üzerinden
          beslenir. Geist Sans + Geist Mono.
        </Text>
      </header>

      {/* ── Display ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={3}>Display</Heading>
          <Text size="sm" color="secondary">
            Marketing / hero / promosyon başlıkları. Çok büyük tipografi, sıkı tracking.
          </Text>
        </div>
        {DISPLAY_SIZES.map((d) => (
          <div key={d.size} className={styles.row}>
            <div className={styles.meta}>
              <span className={styles.metaName}>size=&quot;{d.size}&quot;</span>
              <span className={styles.metaDesc}>{d.desc}</span>
            </div>
            <div className={styles.sample}>
              <Display size={d.size}>{d.sample}</Display>
            </div>
          </div>
        ))}
      </section>

      {/* ── Heading ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={3}>Heading (h1–h6)</Heading>
          <Text size="sm" color="secondary">
            Panel başlıkları. Default semantik etiket = h{`{level}`}, `as` ile override edilir.
          </Text>
        </div>
        {HEADING_LEVELS.map((level) => (
          <div key={level} className={styles.row}>
            <div className={styles.meta}>
              <span className={styles.metaName}>level={level}</span>
              <span className={styles.metaDesc}>
                {level === 1 && "h1 · 36px"}
                {level === 2 && "h2 · 28px"}
                {level === 3 && "h3 · 22px"}
                {level === 4 && "h4 · 18px"}
                {level === 5 && "h5 · 16px"}
                {level === 6 && "h6 · 14px medium"}
              </span>
            </div>
            <div className={styles.sample}>
              <Heading level={level}>Ticket #4127 — Print server bağlanamıyor</Heading>
            </div>
          </div>
        ))}
      </section>

      {/* ── Text sizes ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={3}>Text — Sizes</Heading>
          <Text size="sm" color="secondary">
            Gövde metni. Default: md (14px), regular weight, primary color.
          </Text>
        </div>
        {TEXT_SIZES.map((t) => (
          <div key={t.size} className={styles.row}>
            <div className={styles.meta}>
              <span className={styles.metaName}>size=&quot;{t.size}&quot;</span>
              <span className={styles.metaDesc}>{t.desc}</span>
            </div>
            <div className={styles.sample}>
              <Text size={t.size}>
                Operatör kullanıcının açtığı talebi inceleyerek SLA ile uyumlu bir yanıt süresi
                belirler ve gerekirse change request başlatır.
              </Text>
            </div>
          </div>
        ))}
      </section>

      {/* ── Text weights ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={3}>Text — Weights</Heading>
          <Text size="sm" color="secondary">
            Vurgu için. regular default, medium etiket/buton, semibold başlık ipucu.
          </Text>
        </div>
        <div className={styles.grid}>
          {TEXT_WEIGHTS.map((w) => (
            <div key={w} className={styles.swatchCell}>
              <span className={styles.swatchLabel}>weight=&quot;{w}&quot;</span>
              <Text weight={w} size="lg">
                ServiceCore
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* ── Text colors ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={3}>Text — Colors</Heading>
          <Text size="sm" color="secondary">
            Semantik alias'a bağlı. accent/success/warning/danger — state göstergeleri için.
          </Text>
        </div>
        <div className={styles.grid}>
          {TEXT_COLORS.map((c) => (
            <div key={c} className={styles.swatchCell}>
              <span className={styles.swatchLabel}>color=&quot;{c}&quot;</span>
              <Text color={c} weight="medium">
                Talep güncellendi
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* ── Eyebrow ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={3}>Eyebrow</Heading>
          <Text size="sm" color="secondary">
            Küçük caps etiket — section header'ı üstünde, durum göstergesi, kategori başlangıcı.
          </Text>
        </div>
        <div className={styles.grid}>
          {EYEBROW_TONES.map((tone) => (
            <div key={tone} className={styles.swatchCell}>
              <span className={styles.swatchLabel}>tone=&quot;{tone}&quot;</span>
              <Eyebrow tone={tone}>Service Catalog</Eyebrow>
            </div>
          ))}
        </div>
      </section>

      {/* ── Code ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={3}>Code</Heading>
          <Text size="sm" color="secondary">
            Inline ID, kısa kod, ya da çok satırlı kod bloğu.
          </Text>
        </div>
        <div className={styles.swatchCell}>
          <span className={styles.swatchLabel}>inline</span>
          <Text size="md">
            Ticket ID <Code>SC-4127</Code> kapatıldığında, ilgili asset{" "}
            <Code>ASSET-9032</Code> envantere geri döner.
          </Text>
        </div>
        <div className={styles.swatchCell}>
          <span className={styles.swatchLabel}>block</span>
          <Code block>{`import { Button } from '@servicecoreui/ui';
import '@servicecoreui/ui/styles.css';

export function App() {
  return <Button>Kaydet</Button>;
}`}</Code>
        </div>
      </section>
    </main>
  );
}
