"use client";

import { useState } from "react";
import { Checkmark, Close } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Switch } from "@servicecoreui/ui/wraps";
import styles from "./switch.module.css";

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
 * Settings mock — anında uygulanan ayar paneli
 * ──────────────────────────────────────────────── */

type Setting = {
  key: string;
  title: string;
  desc: string;
  default: boolean;
  badge?: string;
};

const SETTINGS: Setting[] = [
  { key: "email", title: "E-posta bildirimleri", desc: "Yeni bilet, atama ve yorum bildirimlerini e-postaya gönder", default: true },
  { key: "push", title: "Push bildirimleri", desc: "Tarayıcı push notifikasyonu (ön plan açıkken)", default: true },
  { key: "sms", title: "SMS bildirimleri", desc: "Kritik P1 olaylarında SMS gönder", default: false, badge: "PRO" },
  { key: "digest", title: "Günlük özet", desc: "Sabah 09:00'da gün önceki tüm aktivitelerin özeti", default: false },
  { key: "twoFa", title: "İki faktörlü doğrulama", desc: "Hesabına giriş sırasında ek SMS/TOTP kodu iste", default: true },
];

function SettingsMock() {
  const [vals, setVals] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SETTINGS.map((s) => [s.key, s.default])),
  );
  const [pending, setPending] = useState<string | null>(null);

  const toggle = (key: string) => async (checked: boolean) => {
    setPending(key);
    // backend save simülasyonu
    await new Promise((r) => setTimeout(r, 400));
    setVals((prev) => ({ ...prev, [key]: checked }));
    setPending(null);
  };

  return (
    <div className={styles.settings}>
      {SETTINGS.map((s) => (
        <div key={s.key} className={styles.settingsRow}>
          <div className={styles.settingsMeta}>
            <div>
              <span className={styles.settingsTitle}>{s.title}</span>
              {s.badge && <span className={styles.settingsBadge}>{s.badge}</span>}
            </div>
            <span className={styles.settingsDesc}>{s.desc}</span>
          </div>
          <Switch
            checked={vals[s.key]}
            onChange={toggle(s.key)}
            loading={pending === s.key}
            disabled={s.badge === "PRO" && !vals[s.key]}
          />
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function SwitchPage() {
  const [basic, setBasic] = useState(true);
  const [loading, setLoading] = useState(false);

  const onAsync = async (checked: boolean) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setBasic(checked);
    setLoading(false);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Switch</Display>
        <Text size="lg" color="secondary">
          Binary <strong>on/off</strong> toggle — <strong>anında uygulanan
          ayar</strong>. Settings panelleri, feature flag, "aktif mi?"
          durumu. Form submit'e bağlı değer için Checkbox; 2+ seçenek varsa
          Radio.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Switch vs ?</a>
        <a href="#temel">Temel</a>
        <a href="#loading">Loading</a>
        <a href="#labeled">Labeled</a>
        <a href="#size">Size</a>
        <a href="#disabled">Disabled</a>
        <a href="#mock">Settings Panel</a>
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
              <code>checked</code>, <code>defaultChecked</code>,{" "}
              <code>disabled</code>, <code>loading</code>, <code>size</code>,{" "}
              <code>checkedChildren</code>, <code>unCheckedChildren</code>,{" "}
              <code>autoFocus</code>, <code>onChange</code>,{" "}
              <code>onClick</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>value</code> / <code>defaultValue</code> (5.12+) —{" "}
              <strong>checked / defaultChecked</strong> kullan (Switch'in
              orijinal API'si),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — (checked, event) signature"
          description={
            <>
              <code>{`(checked: boolean, event: MouseEvent) => void`}</code> —{" "}
              ilk parametre yeni boolean değer, ikinci event. Async backend
              kaydı için <code>loading</code> prop'unu state'le birleştir,
              kullanıcı tıklayınca spinner görsün.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message={`Form.Item ile — valuePropName="checked"`}
          description={
            <>
              Checkbox gibi Switch de <code>checked</code> prop'unu kullanır.
              Form'da: <code>{`<Form.Item name="aktif" valuePropName="checked"><Switch /></Form.Item>`}</code>.
              Eksikse state senkron olmaz.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Switch vs Checkbox vs Radio — nasıl seçilir?</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Switch: anında uygulanır (settings, feature flag, aktif/pasif)",
            "Checkbox: form submit'e bekler (kabul, çoklu seçim, filter)",
            "Radio: 2+ seçenek arasından TEK (öncelik, görünüm, tip)",
            "Switch: binary durum (Açık/Kapalı, Aktif/Pasif, On/Off)",
          ]}
          dontItems={[
            "Switch'i 'kabul ediyorum' onayında (o Checkbox — form submit)",
            "Checkbox'ı settings'te (kullanıcı Save ararsa kaybolur)",
            "Radio'yu binary için (Switch daha sade)",
            "Switch'i yıkıcı eylemde (yanlışlıkla tıklamada veri kaybı)",
          ]}
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
            <Switch checked={basic} onChange={setBasic} />
            <Text size="sm" color="secondary">
              checked: <Code>{String(basic)}</Code>
            </Text>
          </div>
        </MockBlock>
        <CodeBlock>{`const [on, setOn] = useState(true);

<Switch checked={on} onChange={setOn} />`}</CodeBlock>
      </section>

      {/* ── LOADING ── */}
      <section id="loading" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>loading</span>
          <Heading level={2}>Loading — async kayıt sırasında</Heading>
        </div>
        <Text size="md" color="secondary">
          Backend'e save isteği sırasında <code>loading</code>'i açık tut —
          kullanıcı çift tıklayamaz, durumun değişmekte olduğunu görür.
        </Text>
        <MockBlock caption="Tıklayın — sahte 600ms gecikme">
          <div className={styles.row}>
            <Switch checked={basic} onChange={onAsync} loading={loading} />
            <Text size="sm" color="secondary">
              {loading ? "Kaydediliyor..." : `checked: ${basic}`}
            </Text>
          </div>
        </MockBlock>
        <CodeBlock>{`const [on, setOn] = useState(true);
const [pending, setPending] = useState(false);

const handle = async (checked: boolean) => {
  setPending(true);
  try {
    await api.update({ active: checked });
    setOn(checked);
  } finally {
    setPending(false);
  }
};

<Switch checked={on} onChange={handle} loading={pending} />`}</CodeBlock>
      </section>

      {/* ── LABELED ── */}
      <section id="labeled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>checkedChildren / unCheckedChildren</span>
          <Heading level={2}>İçinde etiket — Açık/Kapalı</Heading>
        </div>
        <Text size="md" color="secondary">
          Switch'in içinde küçük metin/icon. Status netleştirmek için sade
          bir yöntem; iki kelimeyi geçmesin.
        </Text>
        <MockBlock caption="Metin label">
          <div className={styles.stack}>
            <Switch defaultChecked checkedChildren="Açık" unCheckedChildren="Kapalı" />
            <Switch defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
            <Switch defaultChecked checkedChildren={<Checkmark />} unCheckedChildren={<Close />} />
          </div>
        </MockBlock>
        <CodeBlock>{`<Switch checkedChildren="Açık" unCheckedChildren="Kapalı" />
<Switch checkedChildren={<Checkmark />} unCheckedChildren={<Close />} />`}</CodeBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — default / small</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>size="small"</code> tablo satırı, kompakt liste için. Default
          settings paneli için.
        </Text>
        <MockBlock caption="2 boyut">
          <div className={styles.row}>
            <Switch defaultChecked />
            <Switch size="small" defaultChecked />
          </div>
        </MockBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled — neden disable olduğu açık olmalı</Heading>
        </div>
        <Text size="md" color="secondary">
          Disabled tek başına yetmez — yanında "Pro plan gerekir" gibi
          gerekçe ekle. Aksi halde kullanıcı "neden tıklayamıyorum"
          sorusunu sorar.
        </Text>
        <MockBlock caption="Disabled (on/off)">
          <div className={styles.row}>
            <Switch disabled defaultChecked />
            <Switch disabled />
          </div>
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Settings Panel — anında kayıt</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore'un en yaygın Switch pattern'i. Her toggle bağımsız —
          her birinin kendi <code>loading</code> state'i. Save butonu YOK,
          değişim anında backend'e gider.
        </Text>
        <MockBlock caption="Bildirim tercihleri — interactive (sahte 400ms gecikme)">
          <SettingsMock />
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
          message="Hata 1 — Form'da Switch + Submit"
          description={
            <>
              Switch <strong>anında uygulanır</strong>. Form'a koyup &quot;Save&quot;
              butonu beklemek kullanıcıyı şaşırtır.{" "}
              <strong>Çözüm:</strong> Settings ekranında Switch (Save yok),
              form'da Checkbox (Save var).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Yıkıcı eylem için Switch (Hesabı sil, Veri sil)"
          description={
            <>
              Tek tıklamada hesap silinmesi <strong>kabul edilemez</strong> —
              kullanıcı yanlışlıkla tıklayabilir.{" "}
              <strong>Çözüm:</strong> Button + confirm modal. Yıkıcı eylem
              <strong>her zaman</strong> confirmation gerektirir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 3 — Loading set etmemek (async kayıt)'
          description={
            <>
              Backend save 500ms sürüyorsa Switch hemen durumu değiştirir,
              ama hata olursa geri döner → kullanıcı "ne oluyor" düşünür.{" "}
              <strong>Çözüm:</strong> save sırasında{" "}
              <code>loading={`{true}`}</code>, success'te değişimi
              uygula, error'da Snackbar/Alert göster.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 4 — Disabled\\u0027in nedenini söylememek'
          description={
            <>
              Soluk bir Switch tek başına "Pro plan gerekir" demek değildir.{" "}
              <strong>Çözüm:</strong> Yanda kısa rozet ("PRO", "Pro plan
              gerekir") veya Tooltip.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — value / defaultValue prop'u beklemek (5.12+, yok)"
          description={
            <>
              <code>value={`{true}`}</code> 5.12+'da geldi. 5.7'de runtime'da
              etkisiz. <strong>Çözüm:</strong>{" "}
              <code>checked / defaultChecked</code> (Switch'in orijinal API'si).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Switch'i her satırda kullanmak"
          description={
            <>
              "Tüm bildirimleri kapat" gibi master toggle YOK ise + 20 satır
              Switch varsa kullanıcı yorulur. <strong>Çözüm:</strong> master
              switch + alt switch'ler, veya kategorize edip grupla.
            </>
          }
        />
      </section>
    </main>
  );
}
