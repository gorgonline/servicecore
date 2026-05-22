"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs, { type Dayjs } from "dayjs";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, TimePicker } from "@servicecore/ui/wraps";
import styles from "./time-picker.module.css";

const { RangePicker } = TimePicker;

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
 * Real mocks
 * ──────────────────────────────────────────────── */

function MaintenanceMock() {
  const [start, setStart] = useState<Dayjs | null>(dayjs().hour(22).minute(0));
  const [end, setEnd] = useState<Dayjs | null>(dayjs().hour(2).minute(0));

  return (
    <div className={styles.form}>
      <Text size="sm" weight="medium">
        Maintenance penceresi
      </Text>
      <div className={styles.row}>
        <div className={styles.formField}>
          <span className={styles.formLabel}>Başlangıç</span>
          <TimePicker
            value={start}
            onChange={setStart}
            format="HH:mm"
            minuteStep={15}
          />
        </div>
        <div className={styles.formField}>
          <span className={styles.formLabel}>Bitiş</span>
          <TimePicker
            value={end}
            onChange={setEnd}
            format="HH:mm"
            minuteStep={15}
          />
        </div>
      </div>
      <span className={styles.formHint}>
        15 dakika hassasiyetinde. Gece yarısını geçen pencereler de geçerli.
      </span>
    </div>
  );
}

function WorkingHoursMock() {
  const [hours, setHours] = useState<[Dayjs | null, Dayjs | null] | null>([
    dayjs().hour(9).minute(0),
    dayjs().hour(18).minute(0),
  ]);

  return (
    <div className={styles.form}>
      <Text size="sm" weight="medium">
        Çalışma saatleri (SLA hesabı için)
      </Text>
      <RangePicker
        format="HH:mm"
        minuteStep={30}
        placeholder={["Mesai başlangıcı", "Mesai bitişi"]}
        value={hours}
        onChange={(v) => setHours(v as [Dayjs | null, Dayjs | null] | null)}
      />
      <span className={styles.formHint}>
        Bu saat aralığı dışında açılan biletler ertesi iş gününe sayılır.
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function TimePickerPage() {
  const [single, setSingle] = useState<Dayjs | null>(null);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">TimePicker</Display>
        <Text size="lg" color="secondary">
          Saat seçimi. Maintenance penceresi, çalışma saatleri, quiet hours,
          SLA target time. Tarih + saat birlikte gerekiyorsa DatePicker'a{" "}
          <code>showTime</code> ver — TimePicker tek başına saat içindir.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#format">Format</a>
        <a href="#step">Step</a>
        <a href="#showNow">showNow</a>
        <a href="#disabled-time">disabledTime</a>
        <a href="#range">Range</a>
        <a href="#size">Size</a>
        <a href="#mock">Mocklar</a>
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
              <code>format</code>, <code>use12Hours</code>,{" "}
              <code>showNow</code> (4.4+), <code>hourStep</code>,{" "}
              <code>minuteStep</code>, <code>secondStep</code>,{" "}
              <code>disabled</code>, <code>disabledTime</code> (4.19+),{" "}
              <code>hideDisabledOptions</code>, <code>size</code>,{" "}
              <code>status</code> (4.19+), <code>placement</code>,{" "}
              <code>placeholder</code>, <code>allowClear</code> (boolean),{" "}
              <code>inputReadOnly</code>, <code>cellRender</code> (5.4+),{" "}
              <code>popupClassName</code> (4.23+),{" "}
              <code>onChange</code>, <code>onOpenChange</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>{`allowClear={{ clearIcon }}`}</code> object (5.8+),{" "}
              <code>variant</code> (5.13+), <code>needConfirm</code> (5.14+),{" "}
              <code>changeOnScroll</code> (5.14+), <code>prefix</code> (5.22+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — (dayjs, string) ikilisi"
          description={
            <>
              <code>{`(time: Dayjs | null, timeString: string | null) => void`}</code>{" "}
              — backend'e string, UI manipülasyonu için dayjs object.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="TimePicker vs DatePicker showTime"
          description={
            <>
              <strong>TimePicker:</strong> sadece saat, tarih yok.
              <br />
              <strong>DatePicker showTime:</strong> tarih + saat birlikte.
              <br />
              "Maintenance saati 22:00" → TimePicker;{" "}
              "Maintenance 25 Mayıs 22:00" → DatePicker showTime.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel kullanım</Heading>
        </div>
        <MockBlock caption="Controlled">
          <div className={styles.row}>
            <TimePicker value={single} onChange={setSingle} placeholder="Saat seç" />
            <Code>{single ? single.format("HH:mm:ss") : "—"}</Code>
          </div>
        </MockBlock>
        <CodeBlock>{`const [time, setTime] = useState<Dayjs | null>(null);

<TimePicker value={time} onChange={setTime} placeholder="Saat seç" />`}</CodeBlock>
      </section>

      {/* ── FORMAT ── */}
      <section id="format" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>format · use12Hours</span>
          <Heading level={2}>Format — 24h vs 12h</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore Türkçe — <strong>24h default</strong> (<code>HH:mm</code>).{" "}
          <code>use12Hours</code> ile AM/PM 12h moduna geç (US müşteri/uluslararası).{" "}
          Saniye gereksizse <code>format="HH:mm"</code> ver.
        </Text>
        <MockBlock caption="Farklı format'lar">
          <div className={styles.stack}>
            <div className={styles.row}>
              <span className={styles.label}>HH:mm:ss (default)</span>
              <TimePicker defaultValue={dayjs("13:45:20", "HH:mm:ss")} />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>HH:mm (saniye yok)</span>
              <TimePicker format="HH:mm" defaultValue={dayjs("13:45", "HH:mm")} />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>12h AM/PM</span>
              <TimePicker use12Hours format="h:mm A" defaultValue={dayjs("13:45", "HH:mm")} />
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`<TimePicker format="HH:mm:ss" />               // default
<TimePicker format="HH:mm" />                  // saniye yok
<TimePicker use12Hours format="h:mm A" />      // 12h + AM/PM`}</CodeBlock>
      </section>

      {/* ── STEP ── */}
      <section id="step" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>hourStep · minuteStep · secondStep</span>
          <Heading level={2}>Step — adım hassasiyeti</Heading>
        </div>
        <Text size="md" color="secondary">
          Default her birim için 1. Maintenance/randevu için 15dk veya 30dk
          adım yeterli — kullanıcı 47 dakika gibi gereksiz hassas seçim yapamaz.
        </Text>
        <MockBlock caption="15dk adım">
          <TimePicker minuteStep={15} format="HH:mm" defaultValue={dayjs("09:15", "HH:mm")} />
        </MockBlock>
        <MockBlock caption="30dk adım">
          <TimePicker minuteStep={30} format="HH:mm" defaultValue={dayjs("09:30", "HH:mm")} />
        </MockBlock>
        <CodeBlock>{`<TimePicker minuteStep={15} />
<TimePicker hourStep={2} minuteStep={30} />`}</CodeBlock>
      </section>

      {/* ── SHOW NOW ── */}
      <section id="showNow" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showNow</span>
          <Heading level={2}>showNow — "Şimdi" hızlı butonu</Heading>
        </div>
        <Text size="md" color="secondary">
          Footer'da "Şimdi" butonu ekler — kullanıcı şu anki saati tek tıkla
          seçer. Timestamp gerekliyse açık tut.
        </Text>
        <MockBlock caption='showNow={true}'>
          <TimePicker showNow format="HH:mm" />
        </MockBlock>
      </section>

      {/* ── DISABLED TIME ── */}
      <section id="disabled-time" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabledTime · hideDisabledOptions</span>
          <Heading level={2}>disabledTime — saat aralığı kısıtla</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>disabledTime</code> fonksiyon olarak {`{ disabledHours, disabledMinutes, disabledSeconds }`}{" "}
          döner. <code>hideDisabledOptions={`{true}`}</code> ile devre dışı
          saatleri liste'den tamamen çıkarabilirsin (daha temiz).
        </Text>
        <MockBlock caption="Sadece mesai saatleri (09–18)">
          <TimePicker
            format="HH:mm"
            disabledTime={() => ({
              disabledHours: () => [
                ...Array.from({ length: 9 }, (_, i) => i),       // 0–8
                ...Array.from({ length: 24 - 18 }, (_, i) => i + 18), // 18–23
              ],
            })}
            hideDisabledOptions
          />
        </MockBlock>
        <CodeBlock>{`<TimePicker
  format="HH:mm"
  disabledTime={() => ({
    disabledHours: () => [
      ...Array(9).keys(),                                  // 0-8 kapalı
      ...[...Array(24 - 18).keys()].map(i => i + 18),     // 18-23 kapalı
    ],
  })}
  hideDisabledOptions
/>`}</CodeBlock>
      </section>

      {/* ── RANGE ── */}
      <section id="range" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>RangePicker</span>
          <Heading level={2}>Range — saat aralığı</Heading>
        </div>
        <Text size="md" color="secondary">
          Çalışma saatleri, quiet hours, açılış-kapanış. İki ayrı TimePicker
          koyma — <code>TimePicker.RangePicker</code> validation yapar.
        </Text>
        <MockBlock caption="Çalışma saatleri">
          <RangePicker
            format="HH:mm"
            minuteStep={30}
            placeholder={["Başlangıç", "Bitiş"]}
          />
        </MockBlock>
        <CodeBlock>{`<TimePicker.RangePicker
  format="HH:mm"
  minuteStep={30}
  placeholder={["Mesai başlangıcı", "Mesai bitişi"]}
/>`}</CodeBlock>
      </section>

      {/* ── SIZE / STATUS ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size · status</span>
          <Heading level={2}>Size ve Status</Heading>
        </div>
        <MockBlock caption="3 boyut + 2 status">
          <div className={styles.stack}>
            <div className={styles.row}>
              <TimePicker size="small" format="HH:mm" placeholder="Small" />
              <TimePicker size="middle" format="HH:mm" placeholder="Middle" />
              <TimePicker size="large" format="HH:mm" placeholder="Large" />
            </div>
            <div className={styles.row}>
              <TimePicker status="error" format="HH:mm" placeholder="Hatalı" />
              <TimePicker status="warning" format="HH:mm" placeholder="Uyarı" />
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Maintenance penceresi (start/end TimePicker)",
            "Çalışma saatleri (TimePicker.RangePicker)",
            "Quiet hours (bildirim yok) — saat aralığı",
            "Cron schedule (1x/gün belirli saat)",
          ]}
          dontItems={[
            "Tarih + saat birlikte — DatePicker showTime kullan",
            "Saat aralığı için iki ayrı TimePicker — RangePicker var",
            "1 dakika hassasiyet (1440 seçenek) — step ile 15/30 dk yeter",
            "Locale'i ayarlamamak (12h vs 24h, AM/PM dili)",
          ]}
        />
        <MockBlock caption="Maintenance penceresi (interactive)">
          <MaintenanceMock />
        </MockBlock>
        <MockBlock caption="Çalışma saatleri — RangePicker (interactive)">
          <WorkingHoursMock />
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
          message="Hata 1 — Saat aralığı için iki TimePicker yan yana"
          description={
            <>
              <code>{`<TimePicker /> <TimePicker />`}</code> yerine{" "}
              <code>TimePicker.RangePicker</code> kullan. start{">"}end
              validation'ı AntD halleder.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Tarih + saat için TimePicker'a tarih de istemek"
          description={
            <>
              TimePicker SADECE saat. "25 Mayıs 14:30" alacaksan{" "}
              <code>DatePicker showTime</code> kullan — TimePicker'la tarih
              kombinasyonu kullanıcıyı şaşırtır.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — 1dk hassasiyet (1440 seçenek liste)"
          description={
            <>
              Cron schedule, randevu, maintenance için 1 dakika hassasiyet
              gereksiz. 15/30 dakika step yeterli, panel daha temiz.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — disabledTime yerine validation submit'te"
          description={
            <>
              Mesai saatleri dışı için submit'te "geçersiz saat" hatası vermek
              UX kötü. <strong>Çözüm:</strong> <code>disabledTime</code> ile
              panel'de saatleri kapatma → kullanıcı zaten seçemez.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — variant/needConfirm/changeOnScroll beklemek"
          description={
            <>
              5.13+, 5.14+ özellikler 5.7'de yok. Library upgrade kararı
              alınmadan kullanma. Form submit için OK butonuna yerine{" "}
              <code>onChange</code> immediate kayıt yeterli.
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
