"use client";

import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Calendar } from "@servicecoreui/ui";
import styles from "./calendar.module.css";

/* ────────────────────────────────────────────────
 * Mock event veri
 * ──────────────────────────────────────────────── */

type EventType = "maintenance" | "change" | "incident" | "cert";

interface Event {
  type: EventType;
  title: string;
}

/* Bugünden itibaren takvim üzerinde event'ler. Demo amaçlı bu ay ve gelecek
 * birkaç tarih. */
function eventsFor(date: Dayjs): Event[] {
  const day = date.date();
  const month = date.month();
  const today = dayjs().month();

  // Sadece bu ay göster (out of view'da event gösterme)
  if (month !== today) return [];

  const events: Event[] = [];
  if (day === dayjs().date()) {
    events.push({ type: "maintenance", title: "DB maintenance 22:00" });
  }
  if (day === dayjs().date() + 2) {
    events.push({ type: "change", title: "CR-1145 deploy" });
    events.push({ type: "incident", title: "P2 — VPN" });
  }
  if (day === dayjs().date() + 5) {
    events.push({ type: "change", title: "CR-1146 firewall update" });
  }
  if (day === dayjs().date() + 10) {
    events.push({ type: "cert", title: "SSL yenileme" });
  }
  if (day === dayjs().date() + 14) {
    events.push({ type: "maintenance", title: "Network reboot 03:00" });
    events.push({ type: "change", title: "CR-1148" });
  }
  return events;
}

const TYPE_LABEL: Record<EventType, string> = {
  maintenance: "Maintenance",
  change: "Change",
  incident: "Incident",
  cert: "Sertifika",
};

const TYPE_CLASS: Record<EventType, string> = {
  maintenance: styles.eventMaintenance ?? "",
  change: styles.eventChange ?? "",
  incident: styles.eventIncident ?? "",
  cert: styles.eventCert ?? "",
};

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

export default function CalendarPage() {
  const [compactDate, setCompactDate] = useState<Dayjs>(dayjs());

  const renderEvents = (date: Dayjs) => {
    const events = eventsFor(date);
    if (events.length === 0) return null;
    return (
      <div className={styles.events}>
        {events.slice(0, 3).map((e, i) => (
          <span key={i} className={`${styles.event} ${TYPE_CLASS[e.type]}`} title={e.title}>
            <span className={styles.eventDot} />
            {e.title}
          </span>
        ))}
        {events.length > 3 && (
          <span className={styles.event} style={{ color: "var(--sc-color-text-tertiary)" }}>
            +{events.length - 3} more
          </span>
        )}
      </div>
    );
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Calendar</Display>
        <Text size="lg" color="secondary">
          Aylık/yıllık takvim. Maintenance schedule, change request calendar,
          shift planning, sertifika expiry görünümü, incident overview. Tarih
          seçimi için DatePicker — bu standalone takvim widget'ı (içerikli).
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Calendar vs DatePicker</a>
        <a href="#fullscreen">Fullscreen + Events</a>
        <a href="#compact">Compact</a>
        <a href="#valid-range">validRange</a>
        <a href="#disabled-date">disabledDate</a>
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
              <code>value</code>, <code>defaultValue</code> (dayjs),{" "}
              <code>mode</code> (month/year), <code>fullscreen</code>,{" "}
              <code>validRange</code>, <code>disabledDate</code>,{" "}
              <code>cellRender</code> (5.4+),{" "}
              <code>fullCellRender</code> (5.4+),{" "}
              <code>headerRender</code>, <code>locale</code>,{" "}
              <code>onChange</code>, <code>onPanelChange</code>,{" "}
              <code>onSelect</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>showWeek</code> (5.23+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (modern
              variant 6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="cellRender vs fullCellRender"
          description={
            <>
              <strong>cellRender:</strong> default cell rendering korunur (gün
              sayısı header'ı), senin döndürdüğün ReactNode <strong>altta</strong>{" "}
              eklenir (event badge'leri için ideal).
              <br />
              <strong>fullCellRender:</strong> hücrenin <strong>tamamını</strong>{" "}
              sen render edersin (gün sayısı dahil). Tam custom için.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="Legacy dateCellRender — 5.4'ten önce, hâlâ çalışır"
          description={
            <>
              <code>dateCellRender</code>/<code>dateFullCellRender</code>{" "}
              5.4'te <code>cellRender</code>/<code>fullCellRender</code> ile
              değiştirildi. Eski API runtime'da hâlâ çalışır ama deprecated —{" "}
              <strong>yeni kodda cellRender kullan.</strong>
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Calendar vs DatePicker</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Calendar: sayfa içi widget / panel — etkinlikleri tarih bazlı göstermek",
            "Calendar: maintenance schedule, change calendar, shift planning",
            "Calendar: kullanıcı bir günü seçince o günün detayını açacak",
            "DatePicker: form alanı — tek tarih input",
          ]}
          dontItems={[
            "Calendar'ı form alanı yerine kullanmak (yer israfı)",
            "DatePicker'a etkinlik göstermeye çalışmak (yapısı uygun değil)",
            "Hem Calendar hem DatePicker aynı sayfada aynı amaç için",
          ]}
        />
      </section>

      {/* ── FULLSCREEN + EVENTS ── */}
      <section id="fullscreen" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>fullscreen + cellRender</span>
          <Heading level={2}>Fullscreen — etkinlik takvimi</Heading>
        </div>
        <Text size="md" color="secondary">
          Sayfa içi büyük takvim. <code>cellRender</code> ile her güne event
          badge'leri ekleniyor. Hücreye tıklanınca o günün detayı açılır.
          ServiceCore'da Change Schedule, Maintenance Window, Shift Calendar
          için ideal.
        </Text>
        <MockBlock caption="Maintenance + Change + Incident schedule">
          <Calendar
            cellRender={(date, info) => {
              if (info.type !== "date") return null;
              return renderEvents(date);
            }}
            onSelect={(d, info) => {
              // Audit log için info.source kullanılabilir
              void d;
              void info;
            }}
          />
        </MockBlock>
        <CodeBlock>{`<Calendar
  cellRender={(date, info) => {
    if (info.type !== "date") return null;
    const events = eventsFor(date);
    return (
      <div className="events">
        {events.map((e) => (
          <Badge color={typeColor[e.type]}>{e.title}</Badge>
        ))}
      </div>
    );
  }}
  onSelect={(date, { source }) => openDayDetail(date)}
/>`}</CodeBlock>
      </section>

      {/* ── COMPACT ── */}
      <section id="compact" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>fullscreen=false</span>
          <Heading level={2}>Compact — sidebar/widget</Heading>
        </div>
        <Text size="md" color="secondary">
          Dashboard sidebar'da küçük takvim. Sadece gün/ay görünür, etkinlik
          gösterimi yok (yer az).
        </Text>
        <MockBlock caption="Compact takvim + seçili gün detay paneli">
          <div className={styles.compactRow}>
            <Calendar
              fullscreen={false}
              value={compactDate}
              onChange={setCompactDate}
            />
            <div className={styles.compactInfo}>
              <Text size="xs" color="tertiary">SEÇİLİ GÜN</Text>
              <Heading level={4}>{compactDate.format("DD MMMM YYYY")}</Heading>
              <Text size="sm" color="secondary">
                Bu günde {eventsFor(compactDate).length} planlanmış aktivite var.
              </Text>
              {eventsFor(compactDate).map((e, i) => (
                <span key={i} className={`${styles.event} ${TYPE_CLASS[e.type]}`}>
                  <span className={styles.eventDot} />
                  <strong>{TYPE_LABEL[e.type]}:</strong>&nbsp;{e.title}
                </span>
              ))}
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`<Calendar
  fullscreen={false}
  value={date}
  onChange={setDate}
/>`}</CodeBlock>
      </section>

      {/* ── VALID RANGE ── */}
      <section id="valid-range" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>validRange</span>
          <Heading level={2}>validRange — sadece belirli aralık</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>validRange={`{[start, end]}`}</code> ile kullanıcı sadece
          o aralığa navigate edebilir. Maintenance window planlama için: "Bu
          ay sadece" veya "Önümüzdeki 30 gün".
        </Text>
        <MockBlock caption="Sadece bu ay + gelecek 30 gün geçerli">
          <Calendar
            fullscreen={false}
            validRange={[dayjs().startOf("month"), dayjs().add(30, "day")]}
          />
        </MockBlock>
      </section>

      {/* ── DISABLED DATE ── */}
      <section id="disabled-date" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabledDate</span>
          <Heading level={2}>disabledDate — hafta sonu / geçmiş blokla</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>disabledDate</code> fonksiyon — true dönen tarihler disabled.
          Maintenance sadece hafta sonu, change request sadece iş günleri vs.
        </Text>
        <MockBlock caption="Sadece iş günleri seçilebilir (Cmt/Pzr kapalı)">
          <Calendar
            fullscreen={false}
            disabledDate={(current) => {
              const d = current.day();
              return d === 0 || d === 6;
            }}
          />
        </MockBlock>
        <CodeBlock>{`<Calendar
  disabledDate={(current) => {
    const day = current.day();      // 0=Pazar, 6=Cumartesi
    return day === 0 || day === 6;  // hafta sonu disabled
  }}
/>

// Geçmiş günleri blokla:
<Calendar
  disabledDate={current => current.isBefore(dayjs().startOf("day"))}
/>`}</CodeBlock>
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
          message="Hata 1 — Form alanı için Calendar"
          description={
            <>
              Calendar büyük yer kaplar. Tek tarih seçimi için DatePicker yeter.
              Calendar etkinlik gösterimi varsa anlamlı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — cellRender'da info.type'ı kontrol etmemek"
          description={
            <>
              Calendar mode değiştirince <code>cellRender</code>{" "}
              <code>{`{type: "date"}`}</code>,{" "}
              <code>{`{type: "month"}`}</code> gibi farklı tiplerle fire eder.{" "}
              <code>if (info.type !== "date") return null;</code> diye filtre
              eklemezsen month view'da JS hatası alırsın.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Hücrede 10+ event chip"
          description={
            <>
              Bir gün'de 10 etkinlik chip'i hücreyi taşırır. <strong>Çözüm:</strong>{" "}
              ilk 3'ü göster + "+N more" badge'i; tıklayınca detay paneli aç.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Legacy dateCellRender kullanmak (yeni kodda)"
          description={
            <>
              5.4+'da <code>cellRender</code> standart. Eski API çalışır ama
              deprecated. Yeni kodda cellRender; eski kodu refactor ederken
              dönüştür.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Locale'i ayarlamamak (İngilizce ay/gün)"
          description={
            <>
              Türkçe panel için providers'ta <code>ConfigProvider locale={`{trTR}`}</code>{" "}
              + <code>dayjs.locale("tr")</code> kurulu olmalı. Yoksa "January
              Mon Tue" görünür.
            </>
          }
        />
      </section>
    </main>
  );
}
