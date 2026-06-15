"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Skeleton, Switch } from "@servicecoreui/ui";
import styles from "./skeleton.module.css";

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  row = false,
}: {
  caption: string;
  children: React.ReactNode;
  row?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={row ? styles.mockFrameRow : styles.mockFrame}>{children}</div>
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

export default function SkeletonPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Skeleton</Display>
        <Text size="lg" color="secondary">
          Yer tutucu iskelet — içerik gelene kadar sayfanın SHAPE'ini göster.
          Layout shift sıfır. <strong>Süre belirsiz işlem için Spin,
          yüzdeli için Progress.</strong>
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">vs Spin/Progress</a>
        <a href="#basic">Basic</a>
        <a href="#active">Active (shimmer)</a>
        <a href="#avatar">Avatar</a>
        <a href="#paragraph">Custom Paragraph</a>
        <a href="#round">Round</a>
        <a href="#loading">loading={`{false}`} swap</a>
        <a href="#sub">Sub-components</a>
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
              <strong>Composite Skeleton:</strong> <code>active</code>,{" "}
              <code>avatar</code> (bool/<code>{`{ shape, size }`}</code>),{" "}
              <code>loading</code> + <code>children</code>,{" "}
              <code>paragraph</code> (bool/
              <code>{`{ rows, width: number|string|Array }`}</code>),{" "}
              <code>round</code>, <code>title</code> (bool/
              <code>{`{ width }`}</code>).
              <br />
              <strong>Sub-components:</strong>
              <ul style={{ margin: "var(--sc-space-2) 0 0 var(--sc-space-4)" }}>
                <li>
                  <code>Skeleton.Button</code> — active, block, shape
                  (circle/round/square/default), size (large/medium/small)
                </li>
                <li>
                  <code>Skeleton.Avatar</code> — active, shape (circle/square),
                  size (number/large/medium/small)
                </li>
                <li>
                  <code>Skeleton.Input</code> — active, size
                </li>
                <li>
                  <code>Skeleton.Image</code> — active
                </li>
                <li>
                  <code>Skeleton.Node</code> — active, children (custom shape)
                </li>
              </ul>
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK"
          description={
            <>
              <code>Skeleton.Node</code> <code>fullSize</code> (5.8+),
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
          <Heading level={2}>Skeleton vs Spin vs Progress</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Skeleton: içeriğin yapısı belli — card listesi, detay sayfa, table",
            "Spin: süre belirsiz nokta loading — save button, full page overlay",
            "Progress: yüzdeli — file upload %47, sprint %72",
            "Skeleton: sayfa açılışında layout shift sıfırlar",
          ]}
          dontItems={[
            "Button click loading için Skeleton (Spin loading=true)",
            "Toast içeriğinde Skeleton (Message yeter)",
            "Yer şekli bilinmiyorsa Skeleton (Spin overlay)",
            "Sürekli polling'de her cycle yeni Skeleton (flicker — sadece ilk yüklemede)",
          ]}
        />
      </section>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Basic — default (title + 3 paragraf)</Heading>
        </div>
        <MockBlock caption="En basit form">
          <Skeleton />
        </MockBlock>
        <CodeBlock>{`<Skeleton />     // title + 3 paragraf, animasyonsuz`}</CodeBlock>
      </section>

      {/* ── ACTIVE ── */}
      <section id="active" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>active</span>
          <Heading level={2}>Active — shimmer animasyonu</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>active</code> yoksa skeleton sabit gri durur — kullanıcı
          "yükleniyor mu?" diye anlamayabilir. <strong>Default loading state
          için her zaman active=true.</strong>
        </Text>
        <MockBlock caption="active=true">
          <Skeleton active />
        </MockBlock>
      </section>

      {/* ── AVATAR ── */}
      <section id="avatar" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>avatar</span>
          <Heading level={2}>Avatar — kullanıcı profil iskeleti</Heading>
        </div>
        <MockBlock caption="Composite avatar — default circle">
          <Skeleton avatar active paragraph={{ rows: 3 }} />
        </MockBlock>
        <MockBlock caption="Avatar object — square + large">
          <Skeleton
            avatar={{ shape: "square", size: "large" }}
            active
            paragraph={{ rows: 2 }}
          />
        </MockBlock>
      </section>

      {/* ── PARAGRAPH ── */}
      <section id="paragraph" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>paragraph</span>
          <Heading level={2}>Custom Paragraph — rows + width</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>rows</code> satır sayısı, <code>width</code> tüm satırlar için
          tek değer veya array (her satıra ayrı).
        </Text>
        <MockBlock caption="title %60, 4 satır farklı width">
          <Skeleton
            title={{ width: "60%" }}
            paragraph={{
              rows: 4,
              width: ["100%", "100%", "90%", "40%"],
            }}
            active
          />
        </MockBlock>
        <CodeBlock>{`<Skeleton
  title={{ width: '60%' }}
  paragraph={{
    rows: 4,
    width: ['100%', '100%', '90%', '40%'],  // son satır kısa
  }}
  active
/>`}</CodeBlock>
      </section>

      {/* ── ROUND ── */}
      <section id="round" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>round</span>
          <Heading level={2}>Round — köşeleri yuvarla</Heading>
        </div>
        <Text size="md" color="secondary">
          Default radius xs. <code>round=true</code> → md. Kart içi
          skeleton'larda content'in radius'una uyum için.
        </Text>
        <MockBlock caption="round=true">
          <Skeleton round active paragraph={{ rows: 3 }} />
        </MockBlock>
      </section>

      {/* ── LOADING SWAP ── */}
      <section id="loading" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>loading</span>
          <Heading level={2}>loading + children — iskelet/içerik swap</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>loading=true</code> iskeleti gösterir, <code>false</code>{" "}
          children'ı. Async fetch sonrası tek prop değişir → layout shift
          sıfır.
        </Text>
        <MockBlock caption="Toggle ile swap denemesi">
          <div style={{ display: "flex", gap: "var(--sc-space-3)", alignItems: "center", marginBottom: "var(--sc-space-3)" }}>
            <span>Loading:</span>
            <Switch checked={loading} onChange={setLoading} />
            <Button size="small" onClick={() => setLoading(!loading)}>
              Toggle
            </Button>
          </div>
          <Skeleton loading={loading} active avatar>
            <div className={styles.realArticle}>
              <div className={styles.realAvatar}>MY</div>
              <div className={styles.realBody}>
                <h4>Mehmet Yılmaz</h4>
                <p>
                  Network outage olayı — Acme A.Ş. ofisi. Saat 14:22'de
                  başladı, NOC bilgilendirildi, ETA 30 dakika. P1 öncelikli.
                </p>
              </div>
            </div>
          </Skeleton>
        </MockBlock>
        <CodeBlock>{`<Skeleton loading={isLoading} active avatar>
  <ArticleCard {...data} />
</Skeleton>`}</CodeBlock>
      </section>

      {/* ── SUB-COMPONENTS ── */}
      <section id="sub" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>5 sub</span>
          <Heading level={2}>Sub-components — Button / Avatar / Input / Image / Node</Heading>
        </div>
        <Text size="md" color="secondary">
          Composite hazır kalıp uymadığında primitive'lerden custom kompoz et.
        </Text>

        <MockBlock caption="Button — shape + size varyantları" row>
          <Skeleton.Button active size="small" />
          <Skeleton.Button active />
          <Skeleton.Button active size="large" />
          <Skeleton.Button active shape="round" />
          <Skeleton.Button active shape="circle" />
        </MockBlock>

        <MockBlock caption="Avatar — circle/square + size" row>
          <Skeleton.Avatar active size="small" />
          <Skeleton.Avatar active />
          <Skeleton.Avatar active size="large" />
          <Skeleton.Avatar active shape="square" size="large" />
          <Skeleton.Avatar active size={64} />
        </MockBlock>

        <MockBlock caption="Input — size" row>
          <Skeleton.Input active size="small" />
          <Skeleton.Input active />
          <Skeleton.Input active size="large" />
        </MockBlock>

        <MockBlock caption="Image — fixed size" row>
          <Skeleton.Image active />
        </MockBlock>

        <MockBlock caption="Node — custom shape (chart placeholder)">
          <Skeleton.Node active>
            <div
              style={{
                width: 320,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "var(--sc-font-size-sm)",
                color: "var(--sc-color-text-tertiary)",
              }}
            >
              chart yükleniyor...
            </div>
          </Skeleton.Node>
        </MockBlock>
      </section>

      {/* ── REAL-WORLD ── */}
      <section id="realworld" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ServiceCore</span>
          <Heading level={2}>Real-world senaryolar</Heading>
        </div>

        <MockBlock caption="Bilet listesi — 4 row card skeleton">
          <div className={styles.cardList}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.card}>
                <Skeleton.Avatar active size={40} shape="square" />
                <Skeleton.Input active size="small" />
                <Skeleton.Button active size="small" />
              </div>
            ))}
          </div>
        </MockBlock>

        <MockBlock caption="Table loading — 8 satır row skeleton">
          <div className={styles.tableMock}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={styles.tableRow}>
                <Skeleton.Input active size="small" />
                <Skeleton.Input active size="small" />
                <Skeleton.Input active size="small" />
                <Skeleton.Button active size="small" />
              </div>
            ))}
          </div>
        </MockBlock>

        <MockBlock caption="Detail layout — main + sidebar">
          <div className={styles.detail}>
            <div className={styles.detailMain}>
              <Skeleton avatar active paragraph={{ rows: 4 }} />
              <Skeleton active paragraph={{ rows: 3 }} title={false} />
              <Skeleton.Node active>
                <div
                  style={{
                    width: "100%",
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--sc-font-size-sm)",
                    color: "var(--sc-color-text-tertiary)",
                  }}
                >
                  topology diagram
                </div>
              </Skeleton.Node>
            </div>
            <div className={styles.detailSide}>
              <Skeleton.Input active />
              <Skeleton.Input active />
              <Skeleton.Input active />
              <Skeleton.Button active block />
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="Image gallery — 4 thumbnail">
          <div className={styles.gallery}>
            <Skeleton.Image active />
            <Skeleton.Image active />
            <Skeleton.Image active />
            <Skeleton.Image active />
          </div>
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
          message="Hata 1 — active=false (sabit gri)"
          description={
            <>
              Kullanıcı yükleniyor mu kırık mı anlamaz. <strong>Çözüm:</strong>{" "}
              Her loading state için <code>active</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Skeleton boyutu real content'ten farklı"
          description={
            <>
              Skeleton 3 satır, gerçek içerik 8 satır → büyük layout shift.{" "}
              <strong>Çözüm:</strong> Real content'in tipik shape'ini taklit et
              — <code>paragraph.rows</code> + <code>width</code> array doğru
              ayarla.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Polling'de her cycle skeleton"
          description={
            <>
              5sn'de bir refresh → her seferinde skeleton flicker'ı.{" "}
              <strong>Çözüm:</strong> Sadece ilk fetch'te skeleton, sonraki
              fetch'lerde mevcut data + ince Spin overlay veya optimistic
              update.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Button click loading için Skeleton"
          description={
            <>
              "Kaydet" butonu loading'i için skeleton anlamsız.{" "}
              <strong>Çözüm:</strong> <code>{`<Button loading>`}</code>{" "}
              (AntD'nin native spinner'ı).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Yer şekli bilinmiyorsa Skeleton"
          description={
            <>
              Backend dinamik döndürüyor (kullanıcıya göre 0-N item), shape
              bilinmiyor → uydurma skeleton kafa karıştırır.{" "}
              <strong>Çözüm:</strong> Spin overlay + Empty fallback (data 0
              ise).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Skeleton 'yükleniyor...' metin overlay"
          description={
            <>
              Skeleton zaten görsel sinyal — üstüne text koymak gürültü.{" "}
              <strong>Çözüm:</strong> Sadece shimmer animasyonu, metin yok.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 7 — loading=true + Skeleton dışı element gösterme"
          description={
            <>
              <code>loading=true</code> iken sayfada yarı yüklenmiş gerçek
              element + skeleton karışık → confused state.{" "}
              <strong>Çözüm:</strong> Section bazında tek state — section
              loading ise sadece skeleton.
            </>
          }
        />
      </section>
    </main>
  );
}
