"use client";

import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, DatePicker } from "@servicecoreui/ui/wraps";
import styles from "./date-picker.module.css";

const { RangePicker } = DatePicker;

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
 * Real-world mocks
 * ──────────────────────────────────────────────── */

function FilterSidebarMock() {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  return (
    <div className={styles.filterPanel}>
      <div>
        <div className={styles.filterLabel}>Açılma tarihi</div>
        <RangePicker
          value={range}
          onChange={(v) => setRange(v as [Dayjs | null, Dayjs | null] | null)}
          presets={[
            { label: "Bugün", value: [dayjs().startOf("day"), dayjs().endOf("day")] },
            { label: "Son 7 gün", value: [dayjs().subtract(7, "day"), dayjs()] },
            { label: "Son 30 gün", value: [dayjs().subtract(30, "day"), dayjs()] },
            { label: "Bu ay", value: [dayjs().startOf("month"), dayjs().endOf("month")] },
            { label: "Geçen ay", value: [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")] },
          ]}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <div className={styles.filterLabel}>SLA bitiş tarihi</div>
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          placeholder="Tarih seç"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

function SlaFormMock() {
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);
  return (
    <div className={styles.slaForm}>
      <div className={styles.formField}>
        <span className={styles.formLabel}>Uygulama başlangıcı</span>
        <DatePicker
          value={start}
          onChange={setStart}
          showTime={{ format: "HH:mm" }}
          format="DD MMMM YYYY HH:mm"
          placeholder="Başlangıç"
        />
      </div>
      <div className={styles.formField}>
        <span className={styles.formLabel}>Uygulama bitişi</span>
        <DatePicker
          value={end}
          onChange={setEnd}
          showTime={{ format: "HH:mm" }}
          format="DD MMMM YYYY HH:mm"
          placeholder="Bitiş"
          disabledDate={(current) => !!start && current.isBefore(start, "day")}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function DatePickerPage() {
  const [single, setSingle] = useState<Dayjs | null>(null);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">DatePicker</Display>
        <Text size="lg" color="secondary">
          Tarih ve tarih aralığı seçimi. SLA tarihleri, filtre tarih aralığı,
          change request uygulama penceresi, rapor dönemi. ITSM panelinin
          standart tarih input'u. <strong>Türkçe locale</strong> playground'da
          global olarak ayarlı.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#locale">Locale</a>
        <a href="#temel">Temel</a>
        <a href="#picker">Picker Tipleri</a>
        <a href="#show-time">showTime</a>
        <a href="#format">Format</a>
        <a href="#size">Size</a>
        <a href="#status">Status</a>
        <a href="#disabled-date">disabledDate</a>
        <a href="#presets">Presets</a>
        <a href="#range">RangePicker</a>
        <a href="#mock">Mock</a>
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
              <code>value</code>, <code>defaultValue</code>, <code>format</code>,{" "}
              <code>picker</code>, <code>showTime</code>, <code>showNow</code>,{" "}
              <code>disabled</code>, <code>disabledDate</code>,{" "}
              <code>disabledTime</code>, <code>size</code>, <code>status</code>,{" "}
              <code>open</code>, <code>mode</code>, <code>placement</code>,{" "}
              <code>inputReadOnly</code>, <code>allowClear</code> (boolean),{" "}
              <code>cellRender</code> (5.4+), <code>panelRender</code>,{" "}
              <code>renderExtraFooter</code>, <code>presets</code>,{" "}
              <code>onChange</code>, <code>onOk</code>, <code>onOpenChange</code>,{" "}
              <code>onPanelChange</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>multiple</code> (5.14+),{" "}
              <code>minDate</code>/<code>maxDate</code> (5.14+) →{" "}
              <code>disabledDate</code> ile yap,{" "}
              <code>pickerValue</code> (5.14+), <code>needConfirm</code> (5.14+),{" "}
              <code>order</code> (5.14+), <code>variant</code> (5.13+),{" "}
              <code>prefix</code> (5.22+),{" "}
              <code>{`allowClear={{ clearIcon }}`}</code> object (5.8+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+),{" "}
              <code>disabledDate</code>'in <code>info</code> param'ı (5.14+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — dayjs object + string ikilisi"
          description={
            <>
              <code>{`(date: Dayjs | null, dateString: string | null) => void`}</code>{" "}
              — iki parametre alır. Backend'e göndermek için{" "}
              <strong>string'i</strong>, ek manipülasyon (+1 gün, format
              değişimi) için <strong>dayjs object</strong>'i kullan.
            </>
          }
        />
      </section>

      {/* ── LOCALE ── */}
      <section id="locale" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>locale</span>
          <Heading level={2}>Locale — Türkçe setup</Heading>
        </div>
        <Text size="md" color="secondary">
          DatePicker dayjs kullanır. Türkçe gün isimleri (Pzt, Sal, Çar...),
          Pazartesi'nin haftanın ilk günü olması, "Bugün"/"Tamam" buton metinleri
          için <strong>iki ayrı locale</strong> ayarlamak gerekir: dayjs locale
          + AntD ConfigProvider locale.
        </Text>
        <CodeBlock>{`// app/providers.tsx
"use client";
import { ConfigProvider } from "antd";
import trTR from "antd/locale/tr_TR";
import dayjs from "dayjs";
import "dayjs/locale/tr";

dayjs.locale("tr");  // global — bir kez yap

<ConfigProvider locale={trTR}>
  {children}
</ConfigProvider>`}</CodeBlock>
        <Alert
          type="info"
          showIcon
          message="Playground'da zaten kurulu"
          description={
            <>
              Bu sayfadaki tüm DatePicker'lar Türkçe haftanın günleri ve Pazartesi
              haftabaşı ile geliyor. Backend ekibi kendi app entry'sinde de aynı
              setup'ı yapmalı yoksa picker İngilizce + Pazar başlangıçlı görünür.
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
        <Text size="md" color="secondary">
          En sade hâli. Controlled veya uncontrolled. <code>onChange</code>{" "}
          dayjs object + string verir, hangisini kullanacağına bağlamına göre
          karar ver.
        </Text>
        <MockBlock caption="Controlled — onChange ile state">
          <div className={styles.row}>
            <DatePicker
              value={single}
              onChange={setSingle}
              placeholder="Tarih seç"
            />
            <Code>{single ? single.format("YYYY-MM-DD") : "—"}</Code>
          </div>
        </MockBlock>
        <CodeBlock>{`const [date, setDate] = useState<Dayjs | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Tarih seç"
/>`}</CodeBlock>
      </section>

      {/* ── PICKER ── */}
      <section id="picker" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>picker</span>
          <Heading level={2}>Picker Tipleri</Heading>
        </div>
        <Text size="md" color="secondary">
          Aynı bileşen, beş farklı seçim modu. <code>date</code> default;{" "}
          <code>week</code> haftalık raporlar, <code>month</code> aylık
          istatistik, <code>quarter</code> finansal dönem, <code>year</code>{" "}
          yıllık arşiv.
        </Text>
        <MockBlock caption="5 picker tipi">
          <div className={styles.row}>
            <DatePicker picker="date" placeholder="Gün" />
            <DatePicker picker="week" placeholder="Hafta" />
            <DatePicker picker="month" placeholder="Ay" />
            <DatePicker picker="quarter" placeholder="Çeyrek" />
            <DatePicker picker="year" placeholder="Yıl" />
          </div>
        </MockBlock>
        <CodeBlock>{`<DatePicker picker="date"    placeholder="Gün" />
<DatePicker picker="week"    placeholder="Hafta" />
<DatePicker picker="month"   placeholder="Ay" />
<DatePicker picker="quarter" placeholder="Çeyrek" />
<DatePicker picker="year"    placeholder="Yıl" />`}</CodeBlock>
      </section>

      {/* ── SHOW TIME ── */}
      <section id="show-time" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showTime</span>
          <Heading level={2}>showTime — tarih + saat</Heading>
        </div>
        <Text size="md" color="secondary">
          SLA bitişi, change request başlangıcı, scheduled maintenance gibi
          <strong> saat hassasiyeti</strong> gereken alanlarda. <code>format</code>{" "}
          mutlaka saati de içermeli yoksa input string'de saat kaybolur.
        </Text>
        <MockBlock caption="Tarih + saat — HH:mm">
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder="SLA bitiş"
          />
        </MockBlock>
        <MockBlock caption="Tarih + saat:saniye">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Tam zaman damgası"
          />
        </MockBlock>
        <CodeBlock>{`<DatePicker
  showTime={{ format: "HH:mm" }}
  format="YYYY-MM-DD HH:mm"
  placeholder="SLA bitiş"
/>`}</CodeBlock>
      </section>

      {/* ── FORMAT ── */}
      <section id="format" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>format</span>
          <Heading level={2}>Format — display string</Heading>
        </div>
        <Text size="md" color="secondary">
          Picker input'ta görünen format. dayjs format string'i.{" "}
          <code>YYYY-MM-DD</code> default, ServiceCore'da Türk kullanıcılar için{" "}
          <code>DD.MM.YYYY</code> veya <code>DD MMMM YYYY</code> okunaklı.
        </Text>
        <MockBlock caption="Format örnekleri">
          <div className={styles.stack}>
            <div className={styles.row}>
              <DatePicker format="YYYY-MM-DD" placeholder="ISO format" defaultValue={dayjs()} />
              <DatePicker format="DD.MM.YYYY" placeholder="TR format" defaultValue={dayjs()} />
              <DatePicker format="DD MMMM YYYY" placeholder="Uzun TR" defaultValue={dayjs()} />
              <DatePicker format="dddd, DD MMMM" placeholder="Gün adı" defaultValue={dayjs()} />
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`<DatePicker format="DD.MM.YYYY" />
<DatePicker format="DD MMMM YYYY" />       // "22 Mayıs 2026"
<DatePicker format="dddd, DD MMMM" />      // "Cuma, 22 Mayıs"
<DatePicker format={["DD.MM.YYYY", "YYYY-MM-DD"]} />  // Display ilki, parse her ikisi`}</CodeBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — small / middle / large</Heading>
        </div>
        <MockBlock caption="3 boyut">
          <div className={styles.row}>
            <DatePicker size="small" placeholder="Small" />
            <DatePicker size="middle" placeholder="Middle (default)" />
            <DatePicker size="large" placeholder="Large" />
          </div>
        </MockBlock>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>status</span>
          <Heading level={2}>Status — error / warning</Heading>
        </div>
        <Text size="md" color="secondary">
          Form validation'da. Form.Item kullanılıyorsa otomatik geçer; manuel
          kontrolde <code>status</code> prop'u ver.
        </Text>
        <MockBlock caption="Validation states">
          <div className={styles.row}>
            <DatePicker status="error" placeholder="Tarih zorunlu" />
            <DatePicker status="warning" placeholder="Geçmiş tarih" defaultValue={dayjs().subtract(1, "year")} />
          </div>
        </MockBlock>
      </section>

      {/* ── DISABLED DATE ── */}
      <section id="disabled-date" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabledDate</span>
          <Heading level={2}>disabledDate — seçilemez tarihler</Heading>
        </div>
        <Text size="md" color="secondary">
          5.7 baseline'da <code>minDate</code>/<code>maxDate</code> yok —{" "}
          <code>disabledDate</code> ile aynı işi yap. Fonksiyon{" "}
          <code>true</code> dönerse hücre disabled olur.
        </Text>
        <MockBlock caption="Geçmiş günler disabled (sadece bugün ve sonrası)">
          <DatePicker
            placeholder="Gelecek tarih seç"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </MockBlock>
        <MockBlock caption="Sadece hafta içi seçilebilir (hafta sonu disabled)">
          <DatePicker
            placeholder="Hafta içi tarih"
            disabledDate={(current) => {
              const day = current.day();
              return day === 0 || day === 6;
            }}
          />
        </MockBlock>
        <CodeBlock>{`// Geçmiş disabled
<DatePicker
  disabledDate={current =>
    current && current < dayjs().startOf("day")
  }
/>

// Hafta sonu disabled
<DatePicker
  disabledDate={current => {
    const day = current.day(); // 0=Pazar, 6=Cumartesi
    return day === 0 || day === 6;
  }}
/>

// minDate/maxDate (5.14+) YOK → bu pattern'i kullan:
<DatePicker
  disabledDate={current =>
    current.isBefore(min) || current.isAfter(max)
  }
/>`}</CodeBlock>
      </section>

      {/* ── PRESETS ── */}
      <section id="presets" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>presets</span>
          <Heading level={2}>Presets — hızlı tarih chip'leri</Heading>
        </div>
        <Text size="md" color="secondary">
          Panel'in solunda quick-select listesi. Filter sidebar'larda olmazsa
          olmaz — kullanıcı 7 tıkla 7 gün önceyi seçmek yerine "Son 7 gün"
          chip'ine basar.
        </Text>
        <MockBlock caption="Tarih preset'leri">
          <DatePicker
            placeholder="Hızlı seçim"
            presets={[
              { label: "Bugün", value: dayjs() },
              { label: "Yarın", value: dayjs().add(1, "day") },
              { label: "Önümüzdeki Cuma", value: (() => {
                let d = dayjs().day(5);
                if (d.isBefore(dayjs())) d = d.add(7, "day");
                return d;
              })() },
              { label: "1 hafta sonra", value: dayjs().add(7, "day") },
              { label: "1 ay sonra", value: dayjs().add(1, "month") },
            ]}
          />
        </MockBlock>
        <CodeBlock>{`<DatePicker
  presets={[
    { label: "Bugün",            value: dayjs() },
    { label: "Yarın",            value: dayjs().add(1, "day") },
    { label: "1 hafta sonra",    value: dayjs().add(7, "day") },
    { label: "Önümüzdeki Cuma",  value: (() => {     // anlık hesaplama
      let d = dayjs().day(5);
      if (d.isBefore(dayjs())) d = d.add(7, "day");
      return d;
    })() },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── RANGE PICKER ── */}
      <section id="range" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>RangePicker</span>
          <Heading level={2}>RangePicker — tarih aralığı</Heading>
        </div>
        <Text size="md" color="secondary">
          İki tarih için iki ayrı DatePicker yan yana <strong>YAPMA</strong> —{" "}
          <code>RangePicker</code> kullan. Aralık preset'leri, otomatik start/end
          validation, panel'de iki ay yan yana.
        </Text>

        <DoDontGrid
          doItems={[
            "Filter sidebar'da tarih aralığı",
            "Rapor dönem seçimi (başlangıç → bitiş)",
            "Change request uygulama penceresi (start → end)",
            "Audit log filter'ı",
          ]}
          dontItems={[
            "İki ayrı DatePicker yan yana — RangePicker bunun için var",
            "Locale'i ayarlamamak — İngilizce ay isimleri görünür",
            "Range'de end < start kontrolünü kendin yapmak — 5.7'de order=true yok ama AntD otomatik sıralar",
          ]}
        />

        <MockBlock caption="Temel RangePicker">
          <RangePicker placeholder={["Başlangıç", "Bitiş"]} />
        </MockBlock>

        <MockBlock caption="RangePicker + preset'ler — filter sidebar'ın olmazsa olmazı">
          <RangePicker
            placeholder={["Başlangıç", "Bitiş"]}
            presets={[
              { label: "Bugün", value: [dayjs().startOf("day"), dayjs().endOf("day")] },
              { label: "Dün", value: [dayjs().subtract(1, "day").startOf("day"), dayjs().subtract(1, "day").endOf("day")] },
              { label: "Son 7 gün", value: [dayjs().subtract(7, "day"), dayjs()] },
              { label: "Son 30 gün", value: [dayjs().subtract(30, "day"), dayjs()] },
              { label: "Bu ay", value: [dayjs().startOf("month"), dayjs().endOf("month")] },
              { label: "Geçen ay", value: [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")] },
            ]}
          />
        </MockBlock>

        <MockBlock caption="Range + showTime">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder={["Maintenance başlangıç", "Maintenance bitiş"]}
          />
        </MockBlock>

        <CodeBlock>{`<DatePicker.RangePicker
  presets={[
    { label: "Son 7 gün",  value: [dayjs().subtract(7, "day"),  dayjs()] },
    { label: "Son 30 gün", value: [dayjs().subtract(30, "day"), dayjs()] },
    { label: "Bu ay",      value: [dayjs().startOf("month"),    dayjs().endOf("month")] },
  ]}
  onChange={([start, end], [startStr, endStr]) => {
    // Backend'e startStr/endStr gönder, UI manipülasyonu için start/end kullan
  }}
/>`}</CodeBlock>
      </section>

      {/* ── REAL MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek senaryolar</Heading>
        </div>

        <MockBlock caption="Bilet filter sidebar — RangePicker + tek DatePicker">
          <FilterSidebarMock />
        </MockBlock>

        <MockBlock caption="Change request uygulama penceresi — başlangıç + bitiş (cross-validation)">
          <SlaFormMock />
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
          message="Hata 1 — Tarih için Input + manuel parse"
          description={
            <>
              <code>{`<Input placeholder="2026-05-22" />`}</code> ile tarih
              alma → kullanıcı her formatı yazar, parse hatası bug üretir.{" "}
              <strong>Çözüm:</strong> Her zaman DatePicker — formatı sen
              dayatırsın.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Dayjs object'i state'te tutup serialize etmeye çalışmak"
          description={
            <>
              <code>JSON.stringify(dayjsObj)</code> garip çıktı verir.{" "}
              <strong>Çözüm:</strong> Backend'e gönderirken{" "}
              <code>onChange</code>'in <strong>ikinci parametresi</strong> olan
              string'i kullan, veya <code>date.toISOString()</code> /{" "}
              <code>date.format()</code> ile string'e çevir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Locale ayarı eksik (İngilizce panel)"
          description={
            <>
              <code>dayjs.locale("tr")</code> + AntD{" "}
              <code>{`<ConfigProvider locale={trTR}>`}</code> ikisini de yapmazsan
              picker İngilizce, Pazar haftabaşı, "OK / Today" İngilizce kalır.
              ServiceCore Türkçe → bu kabul edilmez.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Tarih aralığı için iki ayrı DatePicker"
          description={
            <>
              <code>{`<DatePicker /> ile <DatePicker />`}</code> yan yana koyma —{" "}
              <code>RangePicker</code> tam bunun için var. İki ayrı picker'da
              end{"<"}start validation'ını sen yazarsın, panel iki ay yan yana
              gelmez, preset'ler iki ayrı yerde durur.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — showTime + format uyumsuzluğu"
          description={
            <>
              <code>showTime</code> verirsen <code>format</code>'ta saati de
              göstermelisin: <code>format="YYYY-MM-DD HH:mm"</code>. Aksi halde
              kullanıcı saat seçer ama input'ta görmez, "kayıp" hisseder.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Filter sidebar'da preset yok"
          description={
            <>
              "Son 7 gün", "Bu ay" gibi preset'ler verilmediyse kullanıcı 7 tıkla
              7 gün öncesini seçmek zorunda. Filter sidebar'da{" "}
              <strong>her zaman preset</strong> ver — kullanıcı analytics
              kullanımı %3'ten %30'a çıkar.
            </>
          }
        />
      </section>
    </main>
  );
}
