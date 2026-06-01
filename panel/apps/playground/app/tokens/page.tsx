import Link from "next/link";
import { colors, radius, spacing, fontSize, fontWeight } from "@servicecoreui/ui";
import styles from "./tokens.module.css";

const NEUTRAL_STEPS = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const PRIMARY_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const ALIAS_TOKENS = [
  { name: "--sc-color-bg-base",       role: "Background base" },
  { name: "--sc-color-bg-subtle",     role: "Background subtle" },
  { name: "--sc-color-bg-muted",      role: "Background muted" },
  { name: "--sc-color-text-primary",  role: "Text primary" },
  { name: "--sc-color-text-secondary", role: "Text secondary" },
  { name: "--sc-color-text-tertiary", role: "Text tertiary" },
  { name: "--sc-color-border-subtle", role: "Border subtle" },
  { name: "--sc-color-border-default", role: "Border default" },
  { name: "--sc-color-border-strong", role: "Border strong" },
  { name: "--sc-color-accent",        role: "Accent" },
  { name: "--sc-color-accent-hover",  role: "Accent hover" },
  { name: "--sc-color-accent-active", role: "Accent active" },
  { name: "--sc-color-accent-subtle", role: "Accent subtle" },
  { name: "--sc-color-state-success-fg", role: "Success" },
  { name: "--sc-color-state-warning-fg", role: "Warning" },
  { name: "--sc-color-state-danger-fg",  role: "Danger" },
] as const;

const RADIUS_STEPS = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "full"] as const;

const SPACING_STEPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const;
const SPACING_MAX = 64;

const TYPE_SCALE = [
  { name: "6xl", token: "--sc-font-size-6xl", weight: "semibold", sample: "Display" },
  { name: "5xl", token: "--sc-font-size-5xl", weight: "semibold", sample: "Headline" },
  { name: "4xl", token: "--sc-font-size-4xl", weight: "semibold", sample: "Heading 1" },
  { name: "3xl", token: "--sc-font-size-3xl", weight: "semibold", sample: "Heading 2" },
  { name: "2xl", token: "--sc-font-size-2xl", weight: "medium",   sample: "Heading 3" },
  { name: "xl",  token: "--sc-font-size-xl",  weight: "medium",   sample: "Heading 4" },
  { name: "lg",  token: "--sc-font-size-lg",  weight: "medium",   sample: "Heading 5" },
  { name: "md",  token: "--sc-font-size-md",  weight: "regular",  sample: "Body — varsayılan metin boyutu" },
  { name: "sm",  token: "--sc-font-size-sm",  weight: "regular",  sample: "Body small — ikincil metin" },
  { name: "xs",  token: "--sc-font-size-xs",  weight: "regular",  sample: "Caption — yardımcı bilgi" },
  { name: "2xs", token: "--sc-font-size-2xs", weight: "regular",  sample: "Eyebrow — etiket" },
] as const;

const SHADOWS = [
  { name: "xs", token: "--sc-shadow-xs", desc: "Subtle elevation" },
  { name: "sm", token: "--sc-shadow-sm", desc: "Card, tooltip" },
  { name: "md", token: "--sc-shadow-md", desc: "Popover, dropdown" },
  { name: "lg", token: "--sc-shadow-lg", desc: "Modal, overlay" },
  { name: "xl", token: "--sc-shadow-xl", desc: "Drawer, prominent" },
] as const;

export default function TokensPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Faz 1 · Token Foundation</p>
        <h1 className={styles.title}>Design Tokens</h1>
        <p className={styles.subtitle}>
          Renk, radius, spacing, type ve gölge skalalarımızın canlı dökümü.
          Tek kaynak: <code>packages/ui/src/theme/tokens.css</code>.
        </p>
      </header>

      {/* ── Neutral palette ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Neutral Palette</h2>
          <p className={styles.sectionDesc}>
            OKLCH, saturasyon 0. Light theme'in tüm yüzey ve metin renkleri buradan akar.
          </p>
        </div>
        <div className={styles.swatchGrid}>
          {NEUTRAL_STEPS.map((step) => (
            <div key={step} className={styles.swatch}>
              <div
                className={styles.swatchChip}
                style={{ background: colors.neutral[step] }}
              />
              <div className={styles.swatchMeta}>
                <span className={styles.swatchLabel}>neutral.{step}</span>
                <span className={styles.swatchValue}>{colors.neutral[step]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Primary palette ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Primary Scale</h2>
          <p className={styles.sectionDesc}>
            ServiceCore mavisi. 500 = <code>#0070F3</code>. Tek accent rengi — multi-color
            palet yok.
          </p>
        </div>
        <div className={styles.swatchGrid}>
          {PRIMARY_STEPS.map((step) => (
            <div key={step} className={styles.swatch}>
              <div
                className={styles.swatchChip}
                style={{ background: colors.primary[step] }}
              />
              <div className={styles.swatchMeta}>
                <span className={styles.swatchLabel}>primary.{step}</span>
                <span className={styles.swatchValue}>{colors.primary[step]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Semantic ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Semantic Colors</h2>
          <p className={styles.sectionDesc}>
            Success, warning, danger — sadece state göstergeleri için. 3 değer her biri için.
          </p>
        </div>
        <div className={styles.swatchGrid}>
          {(["success", "warning", "danger"] as const).flatMap((kind) =>
            ([50, 500, 700] as const).map((step) => (
              <div key={`${kind}-${step}`} className={styles.swatch}>
                <div
                  className={styles.swatchChip}
                  style={{ background: colors[kind][step] }}
                />
                <div className={styles.swatchMeta}>
                  <span className={styles.swatchLabel}>
                    {kind}.{step}
                  </span>
                  <span className={styles.swatchValue}>{colors[kind][step]}</span>
                </div>
              </div>
            )),
          )}
        </div>
      </section>

      {/* ── Alias ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Semantic Aliases</h2>
          <p className={styles.sectionDesc}>
            Bileşen-seviye kullanım katmanı. Renk değiştirmek istediğinde scale'i değil,
            burayı yeniden eşle.
          </p>
        </div>
        <div className={styles.aliasGrid}>
          {ALIAS_TOKENS.map((tok) => (
            <div key={tok.name} className={styles.aliasRow}>
              <div className={styles.aliasDot} style={{ background: `var(${tok.name})` }} />
              <div className={styles.aliasMeta}>
                <span className={styles.aliasName}>{tok.name}</span>
                <span className={styles.aliasRole}>{tok.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Radius ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Radius</h2>
          <p className={styles.sectionDesc}>
            Default = <code>md</code> (6px). Kart ve modal'larda <code>lg</code>. Pill için{" "}
            <code>full</code>.
          </p>
        </div>
        <div className={styles.radiusGrid}>
          {RADIUS_STEPS.map((step) => (
            <div key={step} className={styles.radiusItem}>
              <div
                className={styles.radiusBox}
                style={{ borderRadius: `var(--sc-radius-${step})` }}
              />
              <span className={styles.radiusLabel}>{step}</span>
              <span className={styles.radiusValue}>
                {radius[step] === 9999 ? "9999px" : `${radius[step]}px`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Spacing ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Spacing</h2>
          <p className={styles.sectionDesc}>4px taban. Her bileşen bu skala üstüne oturur.</p>
        </div>
        <div className={styles.spacingList}>
          {SPACING_STEPS.map((step) => {
            const value = spacing[step];
            return (
              <div key={step} className={styles.spacingRow}>
                <span className={styles.spacingName}>space.{step}</span>
                <span className={styles.spacingValue}>{value}px</span>
                <div
                  className={styles.spacingBar}
                  style={{ width: `${(value / SPACING_MAX) * 100}%`, maxWidth: 600 }}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Type scale ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Type Scale</h2>
          <p className={styles.sectionDesc}>
            Geist Sans. Modular ~1.2 oran. Display'lerde tighter letter-spacing.
          </p>
        </div>
        <div className={styles.typeList}>
          {TYPE_SCALE.map((t) => (
            <div key={t.name} className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeName}>size.{t.name}</span>
                <span className={styles.typeValue}>
                  {fontSize[t.name as keyof typeof fontSize]}px / {t.weight}
                </span>
              </div>
              <span
                className={styles.typeSample}
                style={{
                  fontSize: `var(${t.token})`,
                  fontWeight: fontWeight[t.weight as keyof typeof fontWeight],
                }}
              >
                {t.sample}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Shadows ── */}
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>Elevation</h2>
          <p className={styles.sectionDesc}>
            Minimum gölge. ITSM panelinde flat yüzey tercih edilir, gölge sadece overlap için.
          </p>
        </div>
        <div className={styles.shadowGrid}>
          {SHADOWS.map((s) => (
            <div
              key={s.name}
              className={styles.shadowCard}
              style={{ boxShadow: `var(${s.token})` }}
            >
              <span className={styles.shadowName}>shadow.{s.name}</span>
              <span className={styles.shadowDesc}>{s.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
