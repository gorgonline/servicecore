"use client";

import Link from "next/link";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, message } from "@servicecoreui/ui/wraps";
import styles from "./message.module.css";

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

export default function MessagePage() {
  const [messageApi, contextHolder] = message.useMessage();

  const onLoading = async () => {
    const hide = messageApi.loading("Yükleniyor...", 0);
    await new Promise((r) => setTimeout(r, 1500));
    hide();
    messageApi.success("Yüklendi");
  };

  return (
    <main className={styles.page}>
      {contextHolder}
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Message</Display>
        <Text size="lg" color="secondary">
          Toast/snackbar — kısa başarı/hata/info feedback. "Kopyalandı",
          "Kaydedildi", "Ağ hatası". <strong>Component değil, imperative API.</strong>{" "}
          <code>message.success("...")</code> şeklinde çağırılır.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Message vs Notification</a>
        <a href="#types">Types</a>
        <a href="#hook">useMessage Hook</a>
        <a href="#loading">Loading Flow</a>
        <a href="#config">Global Config</a>
        <a href="#destroy">Destroy</a>
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
              <strong>Imperative:</strong>{" "}
              <code>message.success / error / warning / info / loading / open</code>,
              <br />
              <strong>Hook (önerilen):</strong>{" "}
              <code>{`const [api, ctx] = message.useMessage()`}</code> — ConfigProvider
              context (locale, theme) için.
              <br />
              <strong>Config object props:</strong>{" "}
              <code>content</code>, <code>duration</code>, <code>icon</code>,{" "}
              <code>key</code>, <code>className</code>, <code>style</code>,{" "}
              <code>onClick</code>, <code>onClose</code>,{" "}
              <code>pauseOnHover</code>.
              <br />
              <strong>Global config:</strong>{" "}
              <code>message.config({`{ top, duration, maxCount, rtl, getContainer }`})</code>.
              <br />
              <strong>Destroy:</strong> <code>message.destroy()</code> veya{" "}
              <code>message.destroy(key)</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>stack</code> config (6.4+) — toast'lar üst üste stacked,
              <br />
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="useMessage > static — neden?"
          description={
            <>
              Static <code>message.success()</code> AntD ConfigProvider
              context'i okuyamaz → tema, locale, prefixCls miras almaz.{" "}
              <code>useMessage()</code> hook context-aware, doğru tema ile
              render edilir. <strong>Yeni kodda useMessage tercih et.</strong>
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Message vs Notification vs Alert</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Message: KISA tek satır feedback ('Kopyalandı', 'Kaydedildi')",
            "Message: auto-dismiss 3sn (kullanıcı kapatmaz)",
            "Notification: çok satır + title + description (köşede daha büyük)",
            "Alert: sayfa içi PERSISTENT uyarı (kullanıcı kapatana kadar kalır)",
          ]}
          dontItems={[
            "Message'a paragraf yazmak (Notification kullan)",
            "Sayfa içi uyarı için Message (auto-dismiss kaybolur — Alert kullan)",
            "Critical error için Message (Notification.error veya Modal)",
            "Aynı anda 10+ message açmak (maxCount ile sınırla)",
          ]}
        />
      </section>

      {/* ── TYPES ── */}
      <section id="types" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>5 type</span>
          <Heading level={2}>Types — success / error / warning / info / loading</Heading>
        </div>
        <MockBlock caption="Her type'a tıkla — sayfanın üstünde toast">
          <Button onClick={() => messageApi.success("Bilet kaydedildi (SC-4127)")}>
            success
          </Button>
          <Button onClick={() => messageApi.error("Ağ hatası — tekrar dene")}>error</Button>
          <Button onClick={() => messageApi.warning("SLA aşımı yakın")}>warning</Button>
          <Button onClick={() => messageApi.info("Yeni bildirim mevcut")}>info</Button>
          <Button onClick={() => messageApi.loading("Yükleniyor...", 1.5)}>loading</Button>
        </MockBlock>
        <CodeBlock>{`message.success("Kaydedildi");
message.error("Ağ hatası");
message.warning("SLA aşımı yakın");
message.info("Yeni bildirim");
message.loading("Yükleniyor...", 0);  // 0 = manuel kapanır`}</CodeBlock>
      </section>

      {/* ── HOOK ── */}
      <section id="hook" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>useMessage hook</span>
          <Heading level={2}>useMessage — ConfigProvider context'i okur</Heading>
        </div>
        <Text size="md" color="secondary">
          Static <code>message.success()</code> AntD context'inden bağımsız
          render edilir → tema/locale doğru olmayabilir.{" "}
          <code>useMessage()</code> ile contextHolder döner, JSX'e koy.
        </Text>
        <CodeBlock>{`function MyComponent() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}  {/* portal anchor — bir kez component tree'de */}
      <Button onClick={() => messageApi.success("Tamam")}>
        Aç
      </Button>
    </>
  );
}`}</CodeBlock>
      </section>

      {/* ── LOADING ── */}
      <section id="loading" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>loading → success</span>
          <Heading level={2}>Loading Flow — async işlem</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>message.loading(content, 0)</code> manuel kapanır (duration=0).
          Returned function ile kapatırsın, sonra success/error göster.
        </Text>
        <MockBlock caption="Loading → 1.5sn sonra success">
          <Button type="primary" onClick={onLoading}>
            Async işlem
          </Button>
        </MockBlock>
        <CodeBlock>{`const onUpload = async () => {
  const hide = messageApi.loading("Yükleniyor...", 0);
  try {
    await api.upload(file);
    hide();
    messageApi.success("Yüklendi");
  } catch (e) {
    hide();
    messageApi.error("Yükleme hatası: " + e.message);
  }
};`}</CodeBlock>
      </section>

      {/* ── CONFIG ── */}
      <section id="config" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>message.config</span>
          <Heading level={2}>Global Config — app entry'de 1 kez</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>top</code> default 24px. Header'ı 64px ise{" "}
          <code>top: 80</code>. <code>maxCount</code> 5 — fazla mesaj kuyruğa
          alınır.
        </Text>
        <CodeBlock>{`// app/providers.tsx veya app entry'de
import { message } from "@servicecoreui/ui/wraps";

message.config({
  top: 80,         // header altından (default 24px → header gizler)
  duration: 3,     // 3sn auto-dismiss (default)
  maxCount: 5,     // 5 toast aynı anda max
  // getContainer: () => document.body,  // portal hedefi
});`}</CodeBlock>
      </section>

      {/* ── DESTROY ── */}
      <section id="destroy" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>destroy</span>
          <Heading level={2}>Destroy — manuel kapama</Heading>
        </div>
        <MockBlock caption="Tüm toast'ları kapat / unique key ile kapat">
          <Button
            onClick={() => {
              messageApi.success({ content: "İlk", key: "msg1", duration: 0 });
              messageApi.warning({ content: "İkinci", key: "msg2", duration: 0 });
              messageApi.info({ content: "Üçüncü", key: "msg3", duration: 0 });
            }}
          >
            3 toast aç
          </Button>
          <Button onClick={() => messageApi.destroy("msg2")}>İkinciyi kapat (key)</Button>
          <Button onClick={() => messageApi.destroy()}>Tümünü kapat</Button>
        </MockBlock>
        <CodeBlock>{`// Tek toast'u key ile takip et + kapat
const KEY = "upload";
messageApi.loading({ content: "Yükleniyor...", key: KEY, duration: 0 });

// İşlem bitince
messageApi.success({ content: "Yüklendi", key: KEY });  // aynı key → replace
// veya:
messageApi.destroy(KEY);

// Hepsini kapat
messageApi.destroy();`}</CodeBlock>
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
          message="Hata 1 — useMessage hook yerine static (ConfigProvider context loss)"
          description={
            <>
              <code>message.success()</code> static — tema/locale doğru
              gelmeyebilir. <strong>Çözüm:</strong>{" "}
              <code>const [api, ctx] = message.useMessage()</code> hook + JSX'te{" "}
              <code>{`{ctx}`}</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Message'a paragraph"
          description={
            <>
              Toast tek satır içindir, paragraph değil.{" "}
              <strong>Çözüm:</strong> Notification (title + description) veya
              inline Alert.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Sayfa içi persistent uyarı için Message"
          description={
            <>
              "Mailing aktif değil" gibi kalıcı uyarı 3sn'de kaybolur →
              kullanıcı kaçırır. <strong>Çözüm:</strong> Alert (sayfa içi,
              kullanıcı kapatana kadar kalır).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — maxCount yok"
          description={
            <>
              Async loop'ta her iterasyonda message.success() → 100 toast
              ekranı kaplar. <strong>Çözüm:</strong>{" "}
              <code>message.config({`{ maxCount: 5 }`})</code> ile sınır.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Loading message'ı destroy unutmak"
          description={
            <>
              <code>message.loading("...", 0)</code> manuel kapanır. Returned
              hide function çağırılmazsa sonsuza dek görünür. Her zaman{" "}
              <code>try/finally</code>'de hide().
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Critical action confirm için Message"
          description={
            <>
              "Hesap silinecek mi?" Message yerine Modal.confirm veya
              Popconfirm. Yıkıcı eylem için kullanıcı reddetme şansı olmalı.
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
