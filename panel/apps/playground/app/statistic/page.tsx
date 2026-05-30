"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Button, Statistic } from "@servicecore/ui/wraps";
import styles from "./statistic.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={styles.mockFrame}>{children}</div>
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

export default function StatisticPage() {
  const [maintenanceTarget, setMaintenanceTarget] = useState(
    () => Date.now() + 1000 * 60 * 60 * 2,
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Statistic</Display>
        <Text size="lg" color="secondary">
          Sayısal istatistik. Dashboard KPI, SLA, ticket count, response time,
          MRR/ARR, countdown. Title (caps eyebrow) + value (büyük mono rakam) +
          prefix/suffix (sembol/birim) yapısı.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#precision">Precision</a>
        <a href="#prefix-suffix">Prefix + Suffix</a>
        <a href="#formatter">Formatter</a>
        <a href="#loading">Loading</a>
        <a href="#countdown">Countdown</a>
        <a href="#mock">Dashboard KPI Grid</a>
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
          message="5.7'de mevcut tüm temel API"
          description={
            <>
              <strong>Statistic:</strong> <code>value</code>, <code>title</code>,{" "}
              <code>prefix</code>, <code>suffix</code>,{" "}
              <code>groupSeparator</code> (default ","),{" "}
              <code>decimalSeparator</code> (default "."),{" "}
              <code>precision</code>, <code>formatter</code>,{" "}
              <code>loading</code> (4.8+), <code>classNames</code>,{" "}
              <code>styles</code>.
              <br />
              <strong>Statistic.Countdown:</strong> <code>value</code>{" "}
              (timestamp), <code>format</code>, <code>onFinish</code>,{" "}
              <code>onChange</code> (4.16+).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>Statistic.Timer</code> (5.25+) — countup/countdown unified
              API,{" "}
              <code>valueRender</code> (modern variant 6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="TR locale para format"
          description={
            <>
              Türkçe para gösterimi:{" "}
              <code>{`groupSeparator="." decimalSeparator=","`}</code>{" "}
              (₺1.234.567,89). Default US format virgül ayırıcı:{" "}
              <code>1,234,567.89</code>.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — title + value</Heading>
        </div>
        <MockBlock caption="Tek KPI">
          <Statistic title="Açık Bilet" value={127} />
        </MockBlock>
        <CodeBlock>{`<Statistic title="Açık Bilet" value={127} />`}</CodeBlock>
      </section>

      {/* ── PRECISION ── */}
      <section id="precision" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>precision · groupSeparator</span>
          <Heading level={2}>Precision + GroupSeparator</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>precision</code> ondalık basamak sayısı.{" "}
          <code>groupSeparator</code> binlik ayırıcı.
        </Text>
        <MockBlock caption="precision=2 + TR group separator">
          <div className={styles.row}>
            <Statistic
              title="Aylık Gelir"
              value={45230.5}
              precision={2}
              prefix="₺"
              groupSeparator="."
              decimalSeparator=","
            />
            <Statistic
              title="Aktif kullanıcı"
              value={12453}
              groupSeparator="."
            />
          </div>
        </MockBlock>
      </section>

      {/* ── PREFIX + SUFFIX ── */}
      <section id="prefix-suffix" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>prefix · suffix</span>
          <Heading level={2}>Prefix + Suffix — sembol ve birim</Heading>
        </div>
        <MockBlock caption="₺ prefix / % suffix / adet suffix">
          <div className={styles.row}>
            <Statistic
              title="MRR"
              value={45230}
              precision={2}
              prefix="₺"
              groupSeparator="."
              decimalSeparator=","
            />
            <Statistic title="SLA Uyum" value={96.8} precision={1} suffix="%" />
            <Statistic title="Toplam Asset" value={2847} suffix="adet" />
            <Statistic title="Çözüm Süresi" value={42} suffix="dk" />
          </div>
        </MockBlock>
      </section>

      {/* ── FORMATTER ── */}
      <section id="formatter" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>formatter</span>
          <Heading level={2}>Formatter — custom render</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>formatter</code> value'yu özel render eder.{" "}
          precision/groupSeparator yetmediği zaman (relative time, file size,
          duration).
        </Text>
        <MockBlock caption="Custom format">
          <div className={styles.row}>
            <Statistic
              title="Dosya boyutu"
              value={1024 * 1024 * 248}
              formatter={(v: string | number) => `${(Number(v) / 1024 / 1024).toFixed(1)} MB`}
            />
            <Statistic
              title="Active sessions"
              value={1247}
              formatter={(v: string | number) => Number(v).toLocaleString("tr-TR")}
              suffix="oturum"
            />
          </div>
        </MockBlock>
      </section>

      {/* ── LOADING ── */}
      <section id="loading" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>loading</span>
          <Heading level={2}>Loading — skeleton placeholder</Heading>
        </div>
        <MockBlock caption="loading=true">
          <div className={styles.row}>
            <Statistic title="Açık Bilet" value={127} loading />
            <Statistic title="CSAT" value={4.7} precision={1} loading />
          </div>
        </MockBlock>
      </section>

      {/* ── COUNTDOWN ── */}
      <section id="countdown" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Statistic.Countdown</span>
          <Heading level={2}>Countdown — geri sayım</Heading>
        </div>
        <Text size="md" color="secondary">
          Maintenance window başlangıcı, deadline, session timeout için.
          <code>value</code> timestamp (ms), <code>format</code> görünüm,{" "}
          <code>onFinish</code> 0'a inince çağrılır.
        </Text>
        <MockBlock caption="Maintenance başlama countdown'u">
          <div className={styles.row}>
            <Statistic.Countdown
              title="Maintenance başlıyor"
              value={maintenanceTarget}
              format="HH:mm:ss"
              onFinish={() => {
                // Backend webhook trigger, notification göster, vs.
              }}
            />
            <Button
              type="default"
              onClick={() => setMaintenanceTarget(Date.now() + 1000 * 60 * 60 * 2)}
            >
              Yenile (+2 saat)
            </Button>
            <Button
              type="default"
              onClick={() => setMaintenanceTarget(Date.now() + 5000)}
            >
              5sn sonra (test onFinish)
            </Button>
          </div>
        </MockBlock>
        <CodeBlock>{`<Statistic.Countdown
  title="Maintenance başlıyor"
  value={Date.now() + 1000 * 60 * 60 * 2}   // 2 saat sonra
  format="HH:mm:ss"
  onFinish={() => notifyMaintenanceStart()}
/>

// Day + saat:
<Statistic.Countdown
  format="D gün H sa m dk"
  value={deadline}
/>`}</CodeBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Dashboard KPI Grid</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Dashboard KPI cards (4-8 metric)",
            "Trend göstergesi (↑ %12, ↓ %3) alt satırda",
            "Para için TR locale (group=. decimal=,)",
            "Countdown — deadline, maintenance window",
          ]}
          dontItems={[
            "20+ metric tek grid'de (boğulur, kategorize et)",
            "Sürekli güncellenip flicker eden value (debounce)",
            "Title ve value aynı boyutta (hiyerarşi kaybolur)",
            "Birim yok (suffix vermeden ham sayı — anlam kaybı)",
          ]}
        />
        <MockBlock caption="ServiceCore dashboard — 6 KPI + trend">
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <Statistic title="Açık Bilet" value={127} suffix="adet" />
              <span className={styles.trendDown}>↓ %12 (geçen hafta)</span>
            </div>
            <div className={styles.kpiCard}>
              <Statistic title="CSAT" value={4.7} precision={1} suffix="/ 5" />
              <span className={styles.trendUp}>↑ 0.2 (geçen ay)</span>
            </div>
            <div className={styles.kpiCard}>
              <Statistic title="Ort. Çözüm" value={42} suffix="dk" />
              <span className={styles.trendUp}>↓ 8dk (hedef altı)</span>
            </div>
            <div className={styles.kpiCard}>
              <Statistic title="SLA Uyum" value={96.8} precision={1} suffix="%" />
              <span className={styles.trendUp}>↑ %3 (geçen hafta)</span>
            </div>
            <div className={styles.kpiCard}>
              <Statistic
                title="MRR"
                value={45230}
                precision={2}
                prefix="₺"
                groupSeparator="."
                decimalSeparator=","
              />
              <span className={styles.trendUp}>↑ %8 (MoM)</span>
            </div>
            <div className={styles.kpiCard}>
              <Statistic title="Active User" value={1247} groupSeparator="." />
              <span className={styles.trendNeutral}>→ sabit (±2%)</span>
            </div>
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
          message="Hata 1 — Suffix yok (birimsiz ham sayı)"
          description={
            <>
              <code>42</code> → 42 ne? Dakika? Saniye? Bilet?{" "}
              <strong>Çözüm:</strong> Her zaman <code>suffix</code> (adet, %,
              dk, dakika).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Para için precision yok"
          description={
            <>
              <code>{`<Statistic value={1234.5} />`}</code> → "1,234.5" (kayıp
              kuruş). Para için <code>precision={`{2}`}</code> ile her zaman
              iki ondalık.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — TR para US format ile"
          description={
            <>
              Türkçe metin "₺1,234,567.89" yanlış görsel. <strong>Çözüm:</strong>{" "}
              <code>{`groupSeparator="." decimalSeparator=","`}</code> →
              <code>₺1.234.567,89</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — 20+ KPI tek grid'de"
          description={
            <>
              Kullanıcı boğulur, ana metric kaybolur.{" "}
              <strong>Çözüm:</strong> 4-8 KPI maksimum. Daha fazla için Tabs
              veya kategorize.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Countdown onFinish yok"
          description={
            <>
              Süre 0'a iner ve hiçbir şey olmaz → kullanıcı stuck.{" "}
              <strong>Çözüm:</strong> <code>onFinish</code> ile state değiştir
              (status "expired", notification, refetch).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Statistic.Timer beklemek (5.25+, yok)"
          description={
            <>
              <code>Statistic.Timer</code> (countup/countdown unified) 5.25+'da
              geldi. 5.7'de <strong>Countdown</strong> kullan; countup için
              manuel useState + setInterval.
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
