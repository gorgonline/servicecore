"use client";

import Link from "next/link";
import {
  CheckmarkOutline,
  Send,
  Edit,
  PlayFilledAlt,
  WarningAlt,
  DocumentTasks,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Timeline } from "@servicecoreui/ui/wraps";
import styles from "./timeline.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  tight,
}: {
  caption: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={`${styles.mockFrame} ${tight ? styles.mockFrameTight : ""}`}>
        {children}
      </div>
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

export default function TimelinePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Timeline</Display>
        <Text size="lg" color="secondary">
          Dikey aktivite timeline. Ticket activity log, change request
          workflow, deployment history, audit trail, incident timeline.
          Steps'ten farkı: Timeline kronolojik geçmiş, Steps ilerlemekte olan
          akış (current step).
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Timeline vs Steps</a>
        <a href="#temel">Temel</a>
        <a href="#color">Color</a>
        <a href="#custom-dot">Custom Dot</a>
        <a href="#label">Label</a>
        <a href="#mode">Mode</a>
        <a href="#pending">Pending</a>
        <a href="#mock">Real Scenarios</a>
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
              <strong>Timeline:</strong> <code>items</code> (5.2+ modern API),{" "}
              <code>pending</code> (boolean | ReactNode), <code>pendingDot</code>,{" "}
              <code>reverse</code>,{" "}
              <code>mode</code> ('left' | 'alternate' | 'right'),{" "}
              <code>Timeline.Item</code> children pattern (legacy).
              <br />
              <strong>Item:</strong> <code>children</code> (içerik),{" "}
              <code>label</code> (timestamp/meta), <code>dot</code> (custom
              icon), <code>color</code> (blue/red/green/gray veya hex),{" "}
              <code>position</code> (alternate mode'da).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>orientation="horizontal"</code> (6.0+) — sadece vertical,
              <br />
              <code>variant</code> ('filled' / 'outlined' — 6.0+),
              <br />
              Item field rename (6.0+): <code>title</code> →{" "}
              <code>label</code>, <code>icon</code> → <code>dot</code>,{" "}
              <code>placement</code> → <code>position</code>,
              <br />
              <code>titleSpan</code> (6.0+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="items vs children — items'ı tercih et"
          description={
            <>
              5.2+'da <code>items</code> modern API. JSX temiz, dinamik liste
              kolay. Children pattern (<code>&lt;Timeline.Item&gt;</code>) hâlâ
              destekli ama deprecated yolda.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Timeline vs Steps</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Timeline: kronolojik geçmiş (audit log, activity feed)",
            "Timeline: zaman damgaları + actor + action",
            "Steps: ilerlemekte olan akış (current step, future steps)",
            "Steps: wizard, onboarding, change approval flow",
          ]}
          dontItems={[
            "Timeline'ı wizard için (current step gösterimi yok)",
            "Steps'i geçmiş log için (Timeline'ın işi)",
            "Timeline'a 50+ event tek panel (paginate)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic · items</span>
          <Heading level={2}>Temel — items array</Heading>
        </div>
        <MockBlock caption="3 event">
          <Timeline
            items={[
              { children: "Bilet açıldı" },
              { children: "Mehmet K. atandı" },
              { children: "Çözüldü" },
            ]}
          />
        </MockBlock>
        <CodeBlock>{`<Timeline
  items={[
    { children: "Bilet açıldı" },
    { children: "Mehmet K. atandı" },
    { children: "Çözüldü" },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── COLOR ── */}
      <section id="color" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>color</span>
          <Heading level={2}>Color — durum vurgusu</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>color="blue"</code> default (accent),{" "}
          <code>"green"</code> success, <code>"red"</code> danger,{" "}
          <code>"gray"</code> nötr. Hex değer de verilebilir.
        </Text>
        <MockBlock caption="Renkli noktalar">
          <Timeline
            items={[
              { color: "blue", children: "Bilet açıldı (P3)" },
              { color: "gray", children: "Atanan: Mehmet K." },
              { color: "red", children: "Önceliği P1'e yükseltildi" },
              { color: "green", children: "Çözüldü, kullanıcı onayladı" },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── CUSTOM DOT ── */}
      <section id="custom-dot" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>dot — Carbon icon</span>
          <Heading level={2}>Custom Dot — Carbon icon</Heading>
        </div>
        <Text size="md" color="secondary">
          Default açık daire yerine <code>dot</code>'a Carbon icon ver.
          Anlamı güçlendirir.
        </Text>
        <MockBlock caption="Icon dot — change request workflow">
          <Timeline
            items={[
              { dot: <DocumentTasks />, children: "CR-1145 talep oluşturuldu" },
              { dot: <Edit />, children: "CAB review tamamlandı (3/3 onay)" },
              { dot: <PlayFilledAlt />, children: "Production rollout başladı" },
              { dot: <CheckmarkOutline />, color: "green", children: "Tamamlandı, doğrulama OK" },
            ]}
          />
        </MockBlock>
        <CodeBlock>{`<Timeline
  items={[
    { dot: <DocumentTasks />, children: "Talep oluşturuldu" },
    { dot: <CheckmarkOutline />, color: "green", children: "Tamamlandı" },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── LABEL ── */}
      <section id="label" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>label</span>
          <Heading level={2}>Label — timestamp soldaki sütunda</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>label</code> ile timestamp/meta sola hizalanır.{" "}
          <code>mode="left"</code> daha okunaklı, kronolojik feed için.
        </Text>
        <MockBlock caption="Timestamp + content (mode='left')">
          <Timeline
            mode="left"
            items={[
              { label: "09:42", children: "Bilet açıldı" },
              { label: "09:58", children: "Mehmet K. atandı" },
              { label: "10:14", children: "Öncelik P2 → P1" },
              { label: "11:03", children: "İlk yorum: 'switch port reset'" },
              { label: "11:22", children: "Kullanıcı doğruladı", color: "green" },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── MODE ── */}
      <section id="mode" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>mode</span>
          <Heading level={2}>Mode — left / right / alternate</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>left</strong> (default reverse): label sol content sağ.{" "}
          <strong>right</strong>: tersi. <strong>alternate</strong>: zigzag —
          presentation odaklı. <strong>NOT:</strong> alternate'te <code>label</code>{" "}
          kullanma — label ve content yer değişir, tipografi farklı olunca
          görsel kayar. Onun yerine timestamp'i content'in başına koy.
        </Text>
        <MockBlock caption='mode="alternate" — label yerine content içinde meta'>
          <Timeline
            mode="alternate"
            items={[
              { children: "Adım 1 — Talep alındı" },
              { children: "Adım 2 — CAB review" },
              { children: "Adım 3 — Uygulama" },
              { children: "Adım 4 — Tamamlandı", color: "green" },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── PENDING ── */}
      <section id="pending" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>pending</span>
          <Heading level={2}>Pending — sonu açık timeline</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>pending</code> son item olarak "Bekleniyor..." placeholder
          ekler. Backend polling sırasında veya henüz oluşmamış event'ler için.
        </Text>
        <MockBlock caption='pending="Doğrulama bekleniyor..."'>
          <Timeline
            pending="Kullanıcı doğrulaması bekleniyor..."
            items={[
              { color: "blue", children: "Bilet açıldı" },
              { color: "gray", children: "Atandı" },
              { children: "Çözüm uygulandı" },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <MockBlock caption="Ticket activity log — label + actor">
          <Timeline
            mode="left"
            items={[
              {
                label: "09:42",
                children: (
                  <div className={styles.activityRow}>
                    <span className={styles.activityActor}>
                      <strong>Ahmet K.</strong> bileti açtı
                    </span>
                    <span className={styles.activityMeta}>
                      Kategori: Network / VPN · Öncelik: P3
                    </span>
                  </div>
                ),
              },
              {
                label: "09:58",
                color: "gray",
                children: (
                  <div className={styles.activityRow}>
                    <span className={styles.activityActor}>
                      Sistem · <strong>Mehmet K.</strong>'ye atandı
                    </span>
                    <span className={styles.activityMeta}>Network ekibi · Otomatik route</span>
                  </div>
                ),
              },
              {
                label: "10:14",
                color: "red",
                children: (
                  <div className={styles.activityRow}>
                    <span className={styles.activityActor}>
                      <strong>Mehmet K.</strong> önceliği yükseltti
                      <span className={styles.activityTag}>P3 → P1</span>
                    </span>
                    <span className={styles.activityMeta}>Sebep: 50+ kullanıcı etkileniyor</span>
                  </div>
                ),
              },
              {
                label: "11:03",
                children: (
                  <div className={styles.activityRow}>
                    <span className={styles.activityActor}>
                      <strong>Mehmet K.</strong> yorum ekledi
                    </span>
                    <span className={styles.activityMeta}>
                      &quot;Switch port reset edildi, link UP geldi. Test bekleniyor.&quot;
                    </span>
                  </div>
                ),
              },
              {
                label: "11:22",
                color: "green",
                dot: <CheckmarkOutline />,
                children: (
                  <div className={styles.activityRow}>
                    <span className={styles.activityActor}>
                      <strong>Ayşe T.</strong> (son kullanıcı) doğruladı
                    </span>
                    <span className={styles.activityMeta}>
                      &quot;Test ettim, internet açıldı. Teşekkürler.&quot;
                    </span>
                  </div>
                ),
              },
            ]}
          />
        </MockBlock>

        <MockBlock caption="Incident timeline — major outage RCA">
          <Timeline
            mode="left"
            items={[
              { label: "08:42", color: "red", dot: <WarningAlt />, children: "Algılandı — API 5xx artışı (>%50)" },
              { label: "08:44", children: "Slack #incidents bildirimi gönderildi, oncall page'lendi" },
              { label: "08:51", children: "Team bridge açıldı, RCA araştırması başladı" },
              { label: "09:15", color: "blue", children: "Root cause bulundu: DNS resolver crash" },
              { label: "09:28", color: "green", dot: <CheckmarkOutline />, children: "Çözüm uygulandı, %100 API recovery" },
              { label: "10:00", children: "Post-mortem dokümanı hazırlanıyor", color: "gray" },
            ]}
            pending="Post-mortem review bekleniyor (CAB)"
          />
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
          message="Hata 1 — Wizard için Timeline"
          description={
            <>
              "Hangi step şu an?" sorusuna Timeline cevap vermez. Wizard,
              onboarding için <strong>Steps</strong>. Timeline kronolojik
              geçmiş.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — 50+ event tek panel"
          description={
            <>
              Uzun timeline kullanıcıyı boğar, scroll uzar.{" "}
              <strong>Çözüm:</strong> son 10-20 event göster + "Daha fazla"
              link (paginate veya virtualize).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Label'sız audit log"
          description={
            <>
              Timestamp olmayan activity log işe yaramaz. Audit log için her
              event'in <code>label</code>'ı zorunlu.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Item field rename beklemek (6.0+, yok)"
          description={
            <>
              <code>title</code>/<code>icon</code>/<code>placement</code>{" "}
              6.0+'da geldi. 5.7'de <code>label</code>/<code>dot</code>/
              <code>position</code> kullan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Children pattern + dynamic list"
          description={
            <>
              <code>{`<Timeline.Item>`}</code> children pattern dinamik liste
              için zor. <strong>Çözüm:</strong> <code>items</code> array (5.2+,
              5.7'de var).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — orientation='horizontal' beklemek (6.0+, yok)"
          description={
            <>
              5.7'de Timeline sadece vertical. Horizontal akış için Steps
              veya custom flex layout kullan.
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
