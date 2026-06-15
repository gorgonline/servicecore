"use client";

import { useEffect, useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Progress } from "@servicecoreui/ui";
import { Document, DocumentPdf, Image as ImageIcon } from "@carbon/icons-react";
import styles from "./progress.module.css";

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

export default function ProgressPage() {
  // Animated demo
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimated((p) => (p >= 100 ? 0 : p + 5));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Upload mock
  const uploads = [
    { id: "u1", name: "olay-rapor-2025-q4.pdf", percent: 100, status: "success" as const, icon: <DocumentPdf /> },
    { id: "u2", name: "asset-envanteri.xlsx", percent: 67, status: "active" as const, icon: <Document /> },
    { id: "u3", name: "topology-diagram.png", percent: 0, status: "exception" as const, icon: <ImageIcon /> },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Progress</Display>
        <Text size="lg" color="secondary">
          İlerleme göstergesi — yüzdeli (determinate). Line / Circle /
          Dashboard. <strong>Bilinmeyen süre için Spin</strong>, yer tutucu
          için Skeleton.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">vs Spin/Skeleton</a>
        <a href="#types">Type Karşılaştırma</a>
        <a href="#status">Status</a>
        <a href="#line-size">Line Size</a>
        <a href="#steps">Steps (segmented)</a>
        <a href="#circle">Circle</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#stroke">Custom strokeColor</a>
        <a href="#format">Custom format</a>
        <a href="#success">Multi-segment</a>
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
              <strong>Common:</strong> <code>type</code> (line/circle/dashboard),{" "}
              <code>percent</code>, <code>format</code>, <code>status</code>{" "}
              (success/exception/normal/active),{" "}
              <code>showInfo</code>, <code>strokeColor</code>{" "}
              (string/gradient/array), <code>strokeLinecap</code>{" "}
              (round/butt/square), <code>strokeWidth</code>,{" "}
              <code>success</code> obj ({`{ percent, strokeColor }`}).
              <br />
              <strong>Line:</strong> <code>steps</code> (number),{" "}
              <code>size</code> (number/'small').
              <br />
              <strong>Circle/Dashboard:</strong> <code>size</code>{" "}
              (number/'small'),
              <code>gapDegree</code> (0-295), <code>gapPosition</code>{" "}
              (top/bottom/left/right).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>size</code> tuple <code>[w, h]</code> (5.18+) — sadece
              number/'small',
              <br />
              <code>percentPosition</code> (5.18+),
              <br />
              <code>steps</code> obj <code>{`{ count, gap }`}</code> (5.16+),
              <br />
              <code>rounding</code> (5.24+),
              <br />
              <code>classNames</code>/<code>styles</code> semantic DOM (5.18+).
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Progress vs Spin vs Skeleton</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Progress: yüzde biliniyor — file upload %47, sprint %72",
            "Spin: süre belirsiz — 'yükleniyor...', save button loading",
            "Skeleton: içerik gelene kadar — list/card placeholder",
            "Progress + status='active': akış sürüyor, görsel hareket var",
          ]}
          dontItems={[
            "Süre bilinmiyorsa Progress (fake %85'te takılma — Spin)",
            "Sayfa boş render için Progress (Skeleton)",
            "Tek satır toast'a Progress (mesaj loading kullan)",
            "0→100 atlama (animasyonsuz değişim — kullanıcı bağlam kaybeder)",
          ]}
        />
      </section>

      {/* ── TYPES ── */}
      <section id="types" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>3 type</span>
          <Heading level={2}>Type — Line / Circle / Dashboard</Heading>
        </div>
        <MockBlock caption="Aynı %60 — 3 farklı görsel" row>
          <div style={{ flex: "1 1 240px", minWidth: 240 }}>
            <Progress type="line" percent={60} />
          </div>
          <Progress type="circle" percent={60} size={100} />
          <Progress type="dashboard" percent={60} size={100} />
        </MockBlock>
        <CodeBlock>{`<Progress type="line" percent={60} />          // form/upload bar
<Progress type="circle" percent={60} size={100} />   // KPI card
<Progress type="dashboard" percent={60} />     // gauge (gap altta)`}</CodeBlock>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>4 status</span>
          <Heading level={2}>Status — normal / active / success / exception</Heading>
        </div>
        <MockBlock caption="Status renkleri">
          <Progress percent={70} status="normal" />
          <Progress percent={70} status="active" />
          <Progress percent={100} status="success" />
          <Progress percent={70} status="exception" />
        </MockBlock>
        <CodeBlock>{`<Progress percent={70} status="normal" />     // accent
<Progress percent={70} status="active" />     // accent + shimmer
<Progress percent={100} status="success" />   // success-fg + check
<Progress percent={70} status="exception" />  // danger-fg + X`}</CodeBlock>
      </section>

      {/* ── LINE SIZE ── */}
      <section id="line-size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>line size</span>
          <Heading level={2}>Line Size — 'small' / number / strokeWidth</Heading>
        </div>
        <MockBlock caption="Compact bar varyantları — width değişiyor, height sabit">
          <Progress percent={60} size="small" />
          <Progress percent={60} />
          <Progress percent={60} size={300} />
        </MockBlock>
        <Alert
          type="warning"
          showIcon
          message="5.7'de bar height customize edilemez"
          description={
            <>
              AntD 5.7 runtime'da <code>strokeWidth</code> için "deprecated —
              use size instead" uyarısı verir.{" "}
              <code>{`size={[w, h]}`}</code> tuple form ise 5.18+'da geldi
              (5.7'de yok). <strong>Sonuç:</strong> 5.7'de line bar yüksekliği
              değiştirilemez — preset <code>'small'</code> veya default kalır.
              Width için <code>size</code> (number) kullan.
            </>
          }
        />
      </section>

      {/* ── STEPS ── */}
      <section id="steps" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>steps</span>
          <Heading level={2}>Steps — segmented bar</Heading>
        </div>
        <Text size="md" color="secondary">
          Kademeli ilerleme — wizard, bulk action, scoring. <code>steps</code>{" "}
          + percent = aktif segment sayısı (%60 + 5 step = 3 aktif).
        </Text>
        <MockBlock caption="5 step bar — farklı percent'ler">
          <Progress percent={60} steps={5} />
          <Progress percent={80} steps={10} size="small" />
          <Progress percent={100} steps={5} status="success" />
        </MockBlock>
      </section>

      {/* ── CIRCLE ── */}
      <section id="circle" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>circle</span>
          <Heading level={2}>Circle — KPI / asset health</Heading>
        </div>
        <MockBlock caption="Circle varyantları" row>
          <Progress type="circle" percent={75} size={80} />
          <Progress type="circle" percent={75} size={120} />
          <Progress type="circle" percent={100} size={120} status="success" />
          <Progress type="circle" percent={85} size={120} status="exception" />
        </MockBlock>
      </section>

      {/* ── DASHBOARD ── */}
      <section id="dashboard" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>dashboard</span>
          <Heading level={2}>Dashboard — Gauge (gap'lı yarım daire)</Heading>
        </div>
        <Text size="md" color="secondary">
          Tachometer/gauge. <code>gapDegree</code> 0-295 arası açıklık,{" "}
          <code>gapPosition</code> (top/bottom/left/right).
        </Text>
        <MockBlock caption="Dashboard — farklı gap" row>
          <Progress
            type="dashboard"
            percent={75}
            size={140}
            gapDegree={120}
            gapPosition="bottom"
          />
          <Progress
            type="dashboard"
            percent={75}
            size={140}
            gapDegree={90}
            gapPosition="top"
          />
          <Progress
            type="dashboard"
            percent={75}
            size={140}
            gapDegree={0}
          />
        </MockBlock>
      </section>

      {/* ── STROKE COLOR ── */}
      <section id="stroke" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>strokeColor</span>
          <Heading level={2}>Custom strokeColor — string / gradient / array</Heading>
        </div>
        <MockBlock caption="Tek renk / gradient / per-step renk">
          <Progress
            percent={75}
            strokeColor="var(--sc-color-state-warning-fg)"
          />
          <Progress
            percent={75}
            strokeColor={{ "0%": "#0070F3", "100%": "#00C2FF" }}
          />
          <Progress
            percent={60}
            steps={5}
            strokeColor={[
              "var(--sc-color-state-danger-fg)",
              "var(--sc-color-state-danger-fg)",
              "var(--sc-color-state-warning-fg)",
              "var(--sc-color-state-success-fg)",
              "var(--sc-color-state-success-fg)",
            ]}
          />
        </MockBlock>
        <CodeBlock>{`// Tek renk
<Progress percent={75} strokeColor="var(--sc-color-state-warning-fg)" />

// Gradient
<Progress
  percent={75}
  strokeColor={{ "0%": "#0070F3", "100%": "#00C2FF" }}
/>

// Steps — per-segment renk
<Progress
  percent={60}
  steps={5}
  strokeColor={["#ef4444", "#ef4444", "#f59e0b", "#22c55e", "#22c55e"]}
/>`}</CodeBlock>
      </section>

      {/* ── FORMAT ── */}
      <section id="format" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>format</span>
          <Heading level={2}>Custom format — countdown, X/Y, JSX</Heading>
        </div>
        <MockBlock caption="Format fonksiyonu — text/JSX" row>
          <Progress
            type="circle"
            percent={75}
            size={120}
            format={(p) => `${Math.round(((p ?? 0) / 100) * 240)} / 320`}
          />
          <Progress
            type="circle"
            percent={animated}
            size={120}
            format={(p) => (
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {p}%
                <br />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "var(--sc-color-text-tertiary)",
                  }}
                >
                  yükleniyor
                </span>
              </span>
            )}
          />
          <Progress
            type="dashboard"
            percent={30}
            size={120}
            gapDegree={90}
            gapPosition="bottom"
            format={(p) => (
              <span>
                <strong>{p}%</strong>
                <br />
                <span style={{ fontSize: 11, color: "var(--sc-color-text-tertiary)" }}>
                  SLA
                </span>
              </span>
            )}
          />
        </MockBlock>
      </section>

      {/* ── SUCCESS / MULTI-SEGMENT ── */}
      <section id="success" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>success obj</span>
          <Heading level={2}>Multi-segment — success.percent</Heading>
        </div>
        <Text size="md" color="secondary">
          Toplam ilerlemenin bir kısmı "başarılı" olarak ayrı renkte. Bulk
          action senaryosu: 100 satır işlendi, 60'ı başarılı, 40'ı bekliyor.
        </Text>
        <MockBlock caption="60 başarılı / 40 active">
          <Progress percent={100} success={{ percent: 60 }} />
          <Progress
            percent={80}
            success={{
              percent: 50,
              strokeColor: "var(--sc-color-state-success-fg)",
            }}
          />
        </MockBlock>
      </section>

      {/* ── REAL-WORLD ── */}
      <section id="realworld" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ServiceCore</span>
          <Heading level={2}>Real-world senaryolar</Heading>
        </div>

        <MockBlock caption="KPI panosu — sprint / SLA / disk usage">
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <span className={styles.kpiCaption}>Sprint 28</span>
              <Progress type="circle" percent={72} size={100} />
              <span className={styles.kpiSubtext}>23 / 32 görev tamamlandı</span>
            </div>
            <div className={styles.kpiCard}>
              <span className={styles.kpiCaption}>SLA kalan (P1)</span>
              <Progress
                type="dashboard"
                percent={30}
                size={100}
                gapDegree={90}
                gapPosition="bottom"
                status="exception"
                format={(p) => (
                  <span>
                    <strong style={{ fontSize: 16 }}>{p}%</strong>
                    <br />
                    <span style={{ fontSize: 10, color: "var(--sc-color-text-tertiary)" }}>
                      kalan
                    </span>
                  </span>
                )}
              />
              <span className={styles.kpiSubtext}>2 saat 14 dk</span>
            </div>
            <div className={styles.kpiCard}>
              <span className={styles.kpiCaption}>Disk usage</span>
              <Progress
                type="circle"
                percent={85}
                size={100}
                status="exception"
              />
              <span className={styles.kpiSubtext}>srv-prod-04 / 850 GB / 1 TB</span>
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="File upload listesi">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-1)", width: "100%" }}>
            {uploads.map((file) => (
              <div key={file.id} className={styles.uploadRow}>
                <div className={styles.uploadIcon}>{file.icon}</div>
                <div>
                  <div className={styles.uploadName}>{file.name}</div>
                  <Progress
                    percent={file.percent}
                    status={file.status}
                    size="small"
                    showInfo={false}
                  />
                </div>
                <div className={styles.uploadMeta}>
                  {file.status === "exception"
                    ? "Hata"
                    : file.status === "success"
                      ? "Tamam"
                      : `${file.percent}%`}
                </div>
              </div>
            ))}
          </div>
        </MockBlock>

        <MockBlock caption="Bulk update — segmented progress">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sc-space-4)" }}>
            <span style={{ minWidth: 160, fontSize: "var(--sc-font-size-sm)" }}>
              Toplu kapama — 47 / 100
            </span>
            <div style={{ flex: 1 }}>
              <Progress percent={47} steps={10} />
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="Animated demo — auto increment">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sc-space-6)" }}>
            <Progress percent={animated} status="active" />
            <Button onClick={() => setAnimated(0)}>Reset</Button>
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
          message="Hata 1 — Süre bilinmiyorsa Progress (fake %85)"
          description={
            <>
              Backend ne zaman dönecek belli değil. %0'dan %85'e çıkarıp orada
              takılan progress kullanıcıyı kandırır.{" "}
              <strong>Çözüm:</strong> Spin (indeterminate).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Sayfa boş, Progress ile dolduruyorsun"
          description={
            <>
              İçerik gelmeden Progress bar göstermek → kullanıcı yapı görmüyor.{" "}
              <strong>Çözüm:</strong> Skeleton (yer tutucu şekil).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Status'u state'e göre güncellemiyorsun"
          description={
            <>
              %85 disk dolu ama hâlâ mavi (normal). Eşik aşıldığında{" "}
              <code>status="exception"</code> yap — visual cue önemli.{" "}
              <strong>Çözüm:</strong>{" "}
              <code>{`status={p >= 80 ? "exception" : "normal"}`}</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — 0 → 100 instant atlama"
          description={
            <>
              Animasyon olmadan değer atlarsa kullanıcı gözünden kaçar.{" "}
              <strong>Çözüm:</strong> Adım adım increment veya CSS transition.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Tuple size [w,h] 5.7'de yok"
          description={
            <>
              <code>{`size={[300, 8]}`}</code> 5.18+. 5.7'de width için{" "}
              <code>size</code>, height için <code>strokeWidth</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Steps + percent uyumsuz"
          description={
            <>
              <code>steps={5}</code> + <code>percent={37}</code> →{" "}
              "1.85 segment" gibi anlamsız. <strong>Çözüm:</strong> Adım adım
              hesapla:{" "}
              <code>{`percent = (completed / total) * 100`}</code>, segment
              sayısı net olsun.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 7 — Sürekli circle ile sayfa şişirmek"
          description={
            <>
              Her KPI için 200px circle → sayfa scroll uzar.{" "}
              <strong>Çözüm:</strong> Compact line variant veya küçük circle
              (60-80px) + Statistic bileşeni.
            </>
          }
        />
      </section>
    </main>
  );
}
