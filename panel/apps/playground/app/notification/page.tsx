"use client";

import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Button, notification } from "@servicecoreui/ui/wraps";
import {
  Notification as NotificationIcon,
  CheckmarkFilled,
} from "@carbon/icons-react";
import styles from "./notification.module.css";

/* ────────────────────────────────────────────────
 * Helpers
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

export default function NotificationPage() {
  const [notifApi, notifCtx] = notification.useNotification();

  const openTicketAssigned = () =>
    notifApi.success({
      message: "Bilet sana atandı",
      description: "SC-4127 — P1 Network outage. Müşteri: Acme A.Ş.",
      btn: (
        <Button
          type="primary"
          size="small"
          onClick={() => notifApi.destroy("ticket-4127")}
        >
          Bileti aç
        </Button>
      ),
      key: "ticket-4127",
    });

  const openSlaWarn = () =>
    notifApi.warning({
      message: "SLA aşımına 2 saat",
      description:
        "SC-4127 — Atanmış teknisyen Mehmet Y. Hatırlatma göndermek ister misin?",
      duration: 0,
      btn: (
        <>
          <Button
            size="small"
            onClick={() => notifApi.destroy("sla-warn")}
          >
            Görmezden gel
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => notifApi.destroy("sla-warn")}
          >
            Hatırlat
          </Button>
        </>
      ),
      key: "sla-warn",
    });

  const openAssetOffline = () =>
    notifApi.error({
      message: "Asset offline",
      description:
        "srv-prod-04 — Son ping: 3 dk önce. Otomatik bilet açıldı (SC-4128).",
      duration: 8,
    });

  const openBuildOk = () =>
    notifApi.success({
      message: "Build başarılı",
      description: "panel-v2.3.4 — staging ortamına deploy edildi. 47sn.",
    });

  const openCustomIcon = () =>
    notifApi.open({
      message: "Custom icon",
      description: "Carbon icon ile özelleştirilmiş notification.",
      icon: (
        <CheckmarkFilled size={20} style={{ color: "var(--sc-color-accent)" }} />
      ),
    });

  const openPlacement = (placement:
    | "top"
    | "topLeft"
    | "topRight"
    | "bottom"
    | "bottomLeft"
    | "bottomRight") =>
    notifApi.info({
      message: `Placement: ${placement}`,
      description: "Konum testleri için.",
      placement,
    });

  return (
    <main className={styles.page}>
      {notifCtx}

      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Notification</Display>
        <Text size="lg" color="secondary">
          Köşede bildirim kartı — title + description + opsiyonel action btn.{" "}
          "Bilet atandı (SC-4127) — Aç". <strong>Component değil, imperative
          API.</strong>
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">vs Message/Alert</a>
        <a href="#types">5 Type</a>
        <a href="#placement">Placement</a>
        <a href="#hook">useNotification Hook</a>
        <a href="#action">Action btn</a>
        <a href="#persistent">Persistent</a>
        <a href="#custom">Custom Icon</a>
        <a href="#realworld">Real-world</a>
        <a href="#config">Global Config</a>
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
              <strong>Imperative:</strong>{" "}
              <code>notification.success/error/warning/info/open/destroy</code>.
              <br />
              <strong>Hook (önerilen):</strong>{" "}
              <code>{`const [api, ctx] = notification.useNotification()`}</code>.
              <br />
              <strong>Config:</strong> <code>message</code> (zorunlu — title 6.0+),{" "}
              <code>description</code>, <code>btn</code> (action 5.24+),{" "}
              <code>icon</code>, <code>closeIcon</code> (null/false hide 5.7+),{" "}
              <code>duration</code> (0/false manuel), <code>key</code>,{" "}
              <code>placement</code> (6 yön), <code>className</code>,{" "}
              <code>style</code>, <code>onClick</code>, <code>onClose</code>,{" "}
              <code>role</code> (5.6+), <code>props</code> (data/ARIA).
              <br />
              <strong>Global config:</strong> <code>notification.config()</code>{" "}
              — placement, top, bottom, duration, getContainer, closeIcon, rtl,{" "}
              <code>maxCount</code> (4.17+).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>stack</code> config (5.10+) — toast'lar üst üste stacked,
              <br />
              <code>showProgress</code> + <code>pauseOnHover</code> (5.18+) —
              progress bar + hover pause,
              <br />
              <code>actions</code> (5.24+) — <code>btn</code> kullan,
              <br />
              <code>title</code> (6.0+) — <code>message</code> kullan,
              <br />
              <code>classNames</code>/<code>styles</code> semantic DOM (5.8+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="useNotification > static — neden?"
          description={
            <>
              Static <code>notification.success()</code> ConfigProvider
              context'i (locale, tema) okumaz.{" "}
              <code>useNotification()</code> hook context-aware, doğru tema ile
              render edilir. <strong>Yeni kodda hook tercih et.</strong>
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Notification vs Message vs Alert vs Modal</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Notification: title + multi-line description + action btn",
            "Notification: 'Bilet atandı' — bağlamlı, action gerekiyor",
            "Message: tek satır, 'Kopyalandı' — auto-dismiss 3sn",
            "Alert: sayfa içi PERSISTENT — 'Mailing aktif değil'",
            "Modal: kullanıcı yanıt vermeli — confirm, form",
          ]}
          dontItems={[
            "Tek kelime için Notification (Message yeter)",
            "Inline form uyarısı için Notification (Alert kullan)",
            "Critical action confirm için Notification (Modal)",
            "Sayfa açılışta 5 Notification (maxCount + spam)",
            "Persistent kullanıcı uyarısı için Notification (Alert)",
          ]}
        />
      </section>

      {/* ── TYPES ── */}
      <section id="types" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>5 type</span>
          <Heading level={2}>Types — success / error / warning / info / open</Heading>
        </div>
        <MockBlock caption="Her type'a tıkla — sağ üstte kart">
          <Button
            onClick={() =>
              notifApi.success({
                message: "Bilet kaydedildi",
                description: "SC-4127 başarıyla güncellendi.",
              })
            }
          >
            success
          </Button>
          <Button
            onClick={() =>
              notifApi.error({
                message: "Kaydetme başarısız",
                description: "API timeout — bağlantı 30sn sonra düştü.",
              })
            }
          >
            error
          </Button>
          <Button
            onClick={() =>
              notifApi.warning({
                message: "SLA riski",
                description: "P1 biletlere 2 saat içinde yanıt verilmedi.",
              })
            }
          >
            warning
          </Button>
          <Button
            onClick={() =>
              notifApi.info({
                message: "Yeni sürüm",
                description: "v2.3.4 yayında — release notlarına göz at.",
              })
            }
          >
            info
          </Button>
          <Button
            onClick={() =>
              notifApi.open({
                message: "Generic",
                description: "İcon yok, sadece title + description.",
              })
            }
          >
            open
          </Button>
        </MockBlock>
        <CodeBlock>{`notifApi.success({ message: "Kaydedildi", description: "..." });
notifApi.error({ message: "Hata", description: "..." });
notifApi.warning({ message: "Dikkat", description: "..." });
notifApi.info({ message: "Bilgi", description: "..." });
notifApi.open({ message: "Generic", description: "..." });  // icon yok`}</CodeBlock>
      </section>

      {/* ── PLACEMENT ── */}
      <section id="placement" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>6 yön</span>
          <Heading level={2}>Placement — top/bottom × Left/None/Right</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>topRight</code>. Mobile için <code>top</code> veya{" "}
          <code>bottom</code> (tam genişlik hissi). Footer-heavy app'lerde{" "}
          <code>bottomRight</code>.
        </Text>
        <MockBlock caption="6 yön — biri seç">
          <div className={styles.placementGrid}>
            <Button onClick={() => openPlacement("topLeft")}>topLeft</Button>
            <Button onClick={() => openPlacement("top")}>top</Button>
            <Button onClick={() => openPlacement("topRight")}>topRight</Button>
            <Button onClick={() => openPlacement("bottomLeft")}>bottomLeft</Button>
            <Button onClick={() => openPlacement("bottom")}>bottom</Button>
            <Button onClick={() => openPlacement("bottomRight")}>bottomRight</Button>
          </div>
        </MockBlock>
      </section>

      {/* ── HOOK ── */}
      <section id="hook" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>useNotification hook</span>
          <Heading level={2}>useNotification — context-aware</Heading>
        </div>
        <Text size="md" color="secondary">
          Static <code>notification.success()</code> ConfigProvider context'i
          okumaz → tema/locale yanlış olabilir.{" "}
          <code>useNotification()</code> contextHolder döner, JSX'e koy.
        </Text>
        <CodeBlock>{`function MyComponent() {
  const [notif, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}  {/* portal anchor — bir kez component tree'de */}
      <Button onClick={() => notif.success({
        message: "Atandı",
        description: "SC-4127 sana atandı.",
      })}>
        Aç
      </Button>
    </>
  );
}`}</CodeBlock>
      </section>

      {/* ── ACTION ── */}
      <section id="action" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>btn</span>
          <Heading level={2}>Action btn — kullanıcı eylem alabilir</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>btn</code> JSX node. <code>key</code> ver,{" "}
          <code>notification.destroy(key)</code> ile kapatabilirsin.{" "}
          <strong>5.7'de <code>btn</code> kullan</strong> — <code>actions</code>{" "}
          5.24+'da.
        </Text>
        <MockBlock caption="Action btn — 1 buton + destroy">
          <Button type="primary" onClick={openTicketAssigned}>
            "Bilet atandı" (action + key)
          </Button>
        </MockBlock>
        <CodeBlock>{`const key = "ticket-4127";

notifApi.success({
  key,
  message: "Bilet sana atandı",
  description: "SC-4127 — P1 Network outage",
  btn: (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        openTicket("SC-4127");
        notifApi.destroy(key);  // notification'u kapat
      }}
    >
      Bileti aç
    </Button>
  ),
});`}</CodeBlock>
      </section>

      {/* ── PERSISTENT ── */}
      <section id="persistent" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>duration: 0</span>
          <Heading level={2}>Persistent — manuel kapanır</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>duration: 0</code> veya <code>false</code> → auto-dismiss
          kapalı. Kullanıcı close ikonuna tıklayana veya action butona basana
          kadar kalır. Kritik uyarılar için.
        </Text>
        <MockBlock caption="SLA uyarısı — manuel kapanır">
          <Button type="primary" danger onClick={openSlaWarn}>
            SLA aşımı (2 action btn)
          </Button>
        </MockBlock>
        <CodeBlock>{`notifApi.warning({
  key: "sla-warn",
  message: "SLA aşımına 2 saat",
  description: "...",
  duration: 0,  // manuel kapanır
  btn: (
    <>
      <Button size="small" onClick={() => notifApi.destroy("sla-warn")}>
        Görmezden gel
      </Button>
      <Button type="primary" size="small" onClick={() => {
        remind();
        notifApi.destroy("sla-warn");
      }}>
        Hatırlat
      </Button>
    </>
  ),
});`}</CodeBlock>
      </section>

      {/* ── CUSTOM ICON ── */}
      <section id="custom" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>icon</span>
          <Heading level={2}>Custom Icon — type icon'unu override et</Heading>
        </div>
        <MockBlock caption="Carbon icon + accent renk">
          <Button onClick={openCustomIcon}>Custom icon notification</Button>
        </MockBlock>
        <CodeBlock>{`import { CheckmarkFilled } from "@carbon/icons-react";

notifApi.open({
  message: "Custom icon",
  description: "Carbon icon ile özelleştirildi.",
  icon: <CheckmarkFilled size={20} style={{ color: "var(--sc-color-accent)" }} />,
});`}</CodeBlock>
      </section>

      {/* ── REAL-WORLD ── */}
      <section id="realworld" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ServiceCore</span>
          <Heading level={2}>Real-world senaryolar</Heading>
        </div>
        <MockBlock caption="ITSM bağlamı — 4 farklı durum">
          <Button onClick={openTicketAssigned}>Bilet atandı</Button>
          <Button onClick={openSlaWarn}>SLA uyarısı</Button>
          <Button onClick={openAssetOffline}>Asset offline</Button>
          <Button onClick={openBuildOk}>Build OK</Button>
        </MockBlock>
        <Text size="md" color="secondary">
          ServiceCore'da Notification: <strong>bağlam + action</strong>{" "}
          gerektiren durumlar. Sadece bilgi için Message yeter.
        </Text>
      </section>

      {/* ── CONFIG ── */}
      <section id="config" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>notification.config</span>
          <Heading level={2}>Global Config — app entry'de 1 kez</Heading>
        </div>
        <CodeBlock>{`// app/providers.tsx veya app entry'de
import { notification } from "@servicecoreui/ui/wraps";

notification.config({
  placement: "topRight",
  top: 80,        // header altından (default 24px → header gizler)
  duration: 5,    // 5sn (default 4.5)
  maxCount: 3,    // 3 toast aynı anda max — fazlası kuyruğa
  // getContainer: () => document.body,
});`}</CodeBlock>
        <Alert
          type="warning"
          showIcon
          message="stack 5.7'de YOK"
          description={
            <>
              <code>stack: {`{ threshold: 3 }`}</code> 5.10+'da geldi. 5.7'de{" "}
              <code>maxCount</code> sınırla — fazlası kuyruğa girer (stack
              olmaz).
            </>
          }
        />
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
          message="Hata 1 — useNotification hook yerine static"
          description={
            <>
              <code>notification.success()</code> static — ConfigProvider
              context'i okumaz. <strong>Çözüm:</strong>{" "}
              <code>const [api, ctx] = notification.useNotification()</code>{" "}
              hook + JSX'te <code>{`{ctx}`}</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Tek satır mesaj için Notification"
          description={
            <>
              "Kopyalandı" Notification'da → fazla yer kaplar, çok ağır.{" "}
              <strong>Çözüm:</strong> Message toast (tek satır, auto-dismiss).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Critical confirm için Notification"
          description={
            <>
              "Hesabı sil?" Notification'da — kullanıcı yanıt vermeden başka iş
              yapabilir, kayıt kaybı riski. <strong>Çözüm:</strong> Modal
              (blocking confirm).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Sayfa açılışta 5 notification spam"
          description={
            <>
              Component mount'ta her bildirimi notification olarak açmak →
              kullanıcı bunaltır. <strong>Çözüm:</strong>{" "}
              <code>maxCount: 3</code> + öncelik sıralama, ya da sayfa içi{" "}
              <strong>Notification Drawer</strong> patternı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — duration: 0 + btn yok"
          description={
            <>
              Persistent notification ama action butonu yok — kullanıcı close
              ikonunu bulmak zorunda. <strong>Çözüm:</strong>{" "}
              <code>duration: 0</code> kullanıyorsan <code>btn</code> ile
              explicit eylem ver (Onayla/Görmezden gel).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — key yok + duplicate notification"
          description={
            <>
              Aynı bildirimi 2 saniye içinde 3 kez tetiklemek (websocket retry
              vs.) → 3 kart üst üste. <strong>Çözüm:</strong>{" "}
              <code>key</code> ver — aynı key ile çağırınca güncellenir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 7 — actions/title 5.24+/6.0+ kullanma"
          description={
            <>
              5.7 baseline'da yok. <strong>Çözüm:</strong> <code>btn</code> +{" "}
              <code>message</code>.
            </>
          }
        />
      </section>
    </main>
  );
}
