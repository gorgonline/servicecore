"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Button, Spin, Switch } from "@servicecore/ui/wraps";
import { Renew, CheckmarkFilled } from "@carbon/icons-react";
import styles from "./spin.module.css";

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  tall = false,
}: {
  caption: string;
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={tall ? styles.mockFrameTall : styles.mockFrame}>{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <Code block>{children}</Code>;
}

function DoDontGrid({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  const renderList = (items: string[]) => (
    <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
  return (
    <div className={styles.subgrid}>
      <Alert type="success" showIcon message="Ne zaman kullan" description={renderList(doItems)} />
      <Alert type="error" showIcon message="KULLANMA" description={renderList(dontItems)} />
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function SpinPage() {
  const [wrapperLoading, setWrapperLoading] = useState(true);
  const [delayLoading, setDelayLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const onAsyncSave = async () => {
    setBtnLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setBtnLoading(false);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Spin</Display>
        <Text size="lg" color="secondary">
          Süre belirsiz loading göstergesi — save button, async fetch overlay,
          section refresh. <strong>Yüzdeli için Progress, içerik shape'i belli
          için Skeleton.</strong>
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">vs Skeleton/Progress</a>
        <a href="#size">Size</a>
        <a href="#wrapper">Wrapper</a>
        <a href="#delay">Delay (flicker)</a>
        <a href="#tip">Tip</a>
        <a href="#custom">Custom Indicator</a>
        <a href="#global">setDefaultIndicator</a>
        <a href="#realworld">Real-world</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── API Notu ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>not</span>
          <Heading level={2}>API: AntD 5.7 baseline</Heading>
        </div>
        <Alert
          type="success"
          showIcon
          message="5.7'de mevcut"
          description={
            <>
              <strong>Props:</strong> <code>spinning</code>, <code>size</code>{" "}
              (small/default/large), <code>delay</code> (ms — flicker önleme),{" "}
              <code>indicator</code> (custom ReactNode), <code>tip</code>{" "}
              (alt metin), <code>wrapperClassName</code>,{" "}
              <code>prefixCls</code>.
              <br />
              <strong>Static:</strong>{" "}
              <code>Spin.setDefaultIndicator(node)</code> — app genelinde
              default indicator.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>fullscreen</code> (5.11+) — manuel overlay div + Spin,
              <br />
              <code>percent</code> (5.18+) — Progress kullan,
              <br />
              <code>description</code> (6.3+) — <code>tip</code> kullan,
              <br />
              <code>classNames</code>/<code>styles</code> semantic DOM (5.8+).
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Spin vs Skeleton vs Progress</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Spin: süre belirsiz — save button, fetch overlay, refresh",
            "Skeleton: içerik shape'i belli — card listesi, detay sayfa",
            "Progress: yüzdeli — file upload %47, sprint %72",
            "Spin wrapper: section üstüne overlay (children görünür ama soluk)",
          ]}
          dontItems={[
            "İçerik yapısı bilinen yerde Spin (Skeleton kullan — layout shift sıfır)",
            "Upload progress için Spin (Progress — kullanıcı kalanını görmeli)",
            "5sn'den uzun beklemede Spin'i yalnız bırakmak (tip ekle veya progress)",
            "0.1sn'lik işlem için Spin (flicker — delay={200} ile gizle)",
          ]}
        />
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>3 size</span>
          <Heading level={2}>Size — small / default / large</Heading>
        </div>
        <MockBlock caption="3 boyut yan yana">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </MockBlock>
        <CodeBlock>{`<Spin size="small" />        // 14px — inline icon yanı
<Spin />                     // 20px — default
<Spin size="large" />        // 32px — section overlay`}</CodeBlock>
      </section>

      {/* ── WRAPPER ── */}
      <section id="wrapper" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>wrapper</span>
          <Heading level={2}>Wrapper — children'ı overlay'le maske</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>{`<Spin spinning={loading}>...</Spin>`}</code> — children'a
          opacity uygulanır, ortaya spinner gelir. Section refresh için
          ideal.
        </Text>
        <MockBlock caption="Toggle ile overlay" tall>
          <div style={{ display: "flex", gap: "var(--sc-space-3)", alignItems: "center", marginBottom: "var(--sc-space-4)" }}>
            <span>Loading:</span>
            <Switch checked={wrapperLoading} onChange={setWrapperLoading} />
          </div>
          <Spin spinning={wrapperLoading} tip="Veriler güncelleniyor...">
            <div className={styles.sampleContent}>
              <span className={styles.sampleTitle}>SC-4127 — Network outage</span>
              <span className={styles.sampleMeta}>
                Acme A.Ş. / P1 / Açık — Mehmet Y. atanmış. Müşteri 14:22'de
                bildirdi, NOC ETA 30 dakika.
              </span>
            </div>
          </Spin>
        </MockBlock>
      </section>

      {/* ── DELAY ── */}
      <section id="delay" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>delay</span>
          <Heading level={2}>Delay — flicker önle (200ms+)</Heading>
        </div>
        <Text size="md" color="secondary">
          İşlem <strong>delay süresinden hızlı biterse spinner GÖSTERİLMEZ</strong>{" "}
          — kullanıcı flicker yaşamaz. Cache'li veya hızlı endpoint'ler için
          mutlaka kullan. Önerilen: 200-300ms.
        </Text>
        <MockBlock caption="Hızlı işlem (800ms) + delay={300}" tall>
          <div style={{ marginBottom: "var(--sc-space-4)" }}>
            <Button
              type="primary"
              onClick={async () => {
                setDelayLoading(true);
                await new Promise((r) => setTimeout(r, 800));
                setDelayLoading(false);
              }}
            >
              Async işlem başlat
            </Button>
          </div>
          <Spin spinning={delayLoading} delay={300} tip="Yükleniyor...">
            <div className={styles.sampleContent}>
              <span className={styles.sampleTitle}>İçerik</span>
              <span className={styles.sampleMeta}>
                Butona bas — 800ms sonra biter. 300ms delay → spinner ya
                hiç görünmez ya çok kısa görünür (flicker yok).
              </span>
            </div>
          </Spin>
        </MockBlock>
        <CodeBlock>{`<Spin spinning={loading} delay={300}>
  <Content />
</Spin>
// İşlem 300ms'den önce biterse spinner GÖSTERİLMEZ`}</CodeBlock>
      </section>

      {/* ── TIP ── */}
      <section id="tip" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>tip</span>
          <Heading level={2}>Tip — alt metin (5.7'de tip, 6.3+ description)</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek başına Spin'de tip görünmez (wrapper veya size=large gerek);
          wrapper'lı kullanımda spinner altında.
        </Text>
        <MockBlock caption="tip ile loading messages">
          <Spin tip="Yükleniyor..." size="large">
            <div style={{ minWidth: 180, minHeight: 60 }} />
          </Spin>
          <Spin tip="Senkronize ediliyor..." size="large">
            <div style={{ minWidth: 220, minHeight: 60 }} />
          </Spin>
        </MockBlock>
      </section>

      {/* ── CUSTOM INDICATOR ── */}
      <section id="custom" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>indicator</span>
          <Heading level={2}>Custom Indicator — Carbon icon spinning</Heading>
        </div>
        <Text size="md" color="secondary">
          AntD default 4 nokta dönen yerine Carbon icon kullan. CSS keyframe{" "}
          <code>sc-spin-anim</code> bizim wrap CSS'te tanımlı.
        </Text>
        <MockBlock caption="Renew icon + CheckmarkFilled (paused)">
          <Spin
            indicator={
              <Renew
                size={24}
                className="sc-spin-anim"
                style={{ color: "var(--sc-color-accent)" }}
              />
            }
          />
          <Spin
            size="large"
            indicator={
              <Renew
                size={32}
                className="sc-spin-anim"
                style={{ color: "var(--sc-color-accent)" }}
              />
            }
            tip="Yenileniyor..."
          >
            <div style={{ minWidth: 180, minHeight: 60 }} />
          </Spin>
          <CheckmarkFilled
            size={24}
            style={{ color: "var(--sc-color-state-success-fg)" }}
            title="(referans — pause)"
          />
        </MockBlock>
        <CodeBlock>{`import { Renew } from "@carbon/icons-react";

<Spin
  indicator={
    <Renew
      size={24}
      className="sc-spin-anim"   // wrap CSS'inde tanımlı keyframe
      style={{ color: "var(--sc-color-accent)" }}
    />
  }
/>`}</CodeBlock>
      </section>

      {/* ── GLOBAL ── */}
      <section id="global" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>static</span>
          <Heading level={2}>Spin.setDefaultIndicator — app genelinde</Heading>
        </div>
        <Text size="md" color="secondary">
          App entry'sinde 1 kez çağır — tüm Spin'ler bu indicator'ı kullanır.
          Her sayfada custom indicator yazmaktan kurtarır.
        </Text>
        <CodeBlock>{`// app/providers.tsx veya layout.tsx
import { Spin } from "@servicecore/ui/wraps";
import { Renew } from "@carbon/icons-react";

Spin.setDefaultIndicator(
  <Renew
    size={20}
    className="sc-spin-anim"
    style={{ color: "var(--sc-color-accent)" }}
  />,
);

// Artık tüm <Spin /> bu indicator'ı kullanır`}</CodeBlock>
      </section>

      {/* ── REAL-WORLD ── */}
      <section id="realworld" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ServiceCore</span>
          <Heading level={2}>Real-world senaryolar</Heading>
        </div>

        <MockBlock caption="Save button — native Button loading (Spin değil)">
          <Button type="primary" loading={btnLoading} onClick={onAsyncSave}>
            {btnLoading ? "Kaydediliyor..." : "Bileti kaydet"}
          </Button>
        </MockBlock>
        <Alert
          type="info"
          showIcon
          message="Button loading için <Spin /> YAZMA"
          description={
            <>
              AntD Button'ın native <code>loading</code> prop'u var.{" "}
              <code>{`<Button loading={saving}>Kaydet</Button>`}</code> →{" "}
              içerik solunda küçük spinner. Spin manuel sarmak gereksiz.
            </>
          }
        />

        <MockBlock caption="Section overlay — bilet listesi refresh" tall>
          <div style={{ marginBottom: "var(--sc-space-4)" }}>
            <Switch checked={sectionLoading} onChange={setSectionLoading} />
            <span style={{ marginInlineStart: "var(--sc-space-3)", fontSize: "var(--sc-font-size-sm)" }}>
              Section loading
            </span>
          </div>
          <Spin spinning={sectionLoading} tip="Biletler güncelleniyor...">
            <div className={styles.sectionMock}>
              <div className={styles.sectionRow}>
                <span className={styles.sectionRowId}>SC-4127</span>
                <span>Network outage — Acme A.Ş.</span>
                <span style={{ color: "var(--sc-color-state-danger-fg)" }}>P1</span>
              </div>
              <div className={styles.sectionRow}>
                <span className={styles.sectionRowId}>SC-4128</span>
                <span>Disk full — srv-prod-04</span>
                <span style={{ color: "var(--sc-color-state-warning-fg)" }}>P2</span>
              </div>
              <div className={styles.sectionRow}>
                <span className={styles.sectionRowId}>SC-4129</span>
                <span>VPN bağlantı sorunu — Beta Ltd.</span>
                <span style={{ color: "var(--sc-color-text-secondary)" }}>P3</span>
              </div>
            </div>
          </Spin>
        </MockBlock>

        <MockBlock caption="Inline status — table cell, row action">
          <span style={{ fontSize: "var(--sc-font-size-sm)" }}>
            Senkronize ediliyor <Spin size="small" />
          </span>
          <span style={{ fontSize: "var(--sc-font-size-sm)" }}>
            <Spin
              size="small"
              indicator={
                <Renew
                  size={14}
                  className="sc-spin-anim"
                  style={{ color: "var(--sc-color-accent)" }}
                />
              }
            />{" "}
            CMDB güncelleniyor
          </span>
        </MockBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <Alert
          type="error"
          showIcon
          message="Hata 1 — Button loading için Spin manuel sarmak"
          description={
            <>
              <code>{`<Spin spinning={saving}><Button>Kaydet</Button></Spin>`}</code> ← gereksiz.{" "}
              <strong>Çözüm:</strong>{" "}
              <code>{`<Button loading={saving}>Kaydet</Button>`}</code> —
              native.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Delay yok (flicker)"
          description={
            <>
              Cache'li endpoint 50ms'de döndü → spinner görünüp kayboldu,
              flicker. <strong>Çözüm:</strong> <code>delay={`{200-300}`}</code>{" "}
              ile gizle.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — İçerik shape'i belli ama Spin"
          description={
            <>
              Card listesi yükleniyor → Spin sayfayı tam ortaladığı için
              layout boş. <strong>Çözüm:</strong> Skeleton (shape'i göster,
              layout shift sıfır).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Spin tip metni yok, 5sn+ bekliyor"
          description={
            <>
              Kullanıcı "donmuş mu?" diye düşünür. <strong>Çözüm:</strong>{" "}
              <code>tip</code> ekle ("Veriler güncelleniyor...") veya 5sn'den
              uzun beklemede Progress göster.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — fullscreen prop kullanmak (5.7'de YOK)"
          description={
            <>
              <code>{`<Spin fullscreen />`}</code> 5.11+. 5.7'de manuel
              overlay div:{" "}
              <code>{`<div className="fullscreen-overlay"><Spin size="large" /></div>`}</code>{" "}
              + CSS position fixed inset-0.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — percent prop ile progress (5.7'de YOK)"
          description={
            <>
              <code>{`<Spin percent={47} />`}</code> 5.18+.{" "}
              <strong>Çözüm:</strong> Progress component kullan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 7 — Polling'de her cycle spinner"
          description={
            <>
              5sn refresh → her seferinde overlay flicker.{" "}
              <strong>Çözüm:</strong> İlk fetch'te Spin, sonraki fetch'lerde
              optimistic update veya çok ince inline indicator.
            </>
          }
        />
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
