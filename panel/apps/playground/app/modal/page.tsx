"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import {
  Alert,
  Button,
  Input,
  Modal,
  Select,
  message,
} from "@servicecoreui/ui/wraps";
import styles from "./modal.module.css";

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

export default function ModalPage() {
  const [modalApi, modalCtx] = Modal.useModal();
  const [messageApi, messageCtx] = message.useMessage();

  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [asyncOpen, setAsyncOpen] = useState(false);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [customFooterOpen, setCustomFooterOpen] = useState(false);
  const [widthOpen, setWidthOpen] = useState<null | "sm" | "md" | "lg" | "xl">(null);
  const [scrollOpen, setScrollOpen] = useState(false);
  const [destroyOpen, setDestroyOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", priority: "P3" });

  const onAsyncOk = async () => {
    setAsyncLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setAsyncLoading(false);
    setAsyncOpen(false);
    messageApi.success("Bilet kaydedildi");
  };

  return (
    <main className={styles.page}>
      {modalCtx}
      {messageCtx}

      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Modal</Display>
        <Text size="lg" color="secondary">
          Merkezi diyalog — kullanıcı eylem bekler. Form, confirm, detay.{" "}
          Sayfa karanlık, dışarısı tıklanamaz. <strong>Workflow kesintisi
          istemiyorsan Drawer.</strong>
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Modal vs Drawer</a>
        <a href="#basic">Basic</a>
        <a href="#confirm">Confirm</a>
        <a href="#static">Static Methods</a>
        <a href="#hook">useModal Hook</a>
        <a href="#async">Async onOk</a>
        <a href="#footer">Custom Footer</a>
        <a href="#width">Width</a>
        <a href="#scroll">Centered + Scroll</a>
        <a href="#destroy">destroyOnClose</a>
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
              <strong>Component props:</strong> <code>open</code>,{" "}
              <code>title</code>, <code>footer</code>, <code>width</code>{" "}
              (number), <code>centered</code>, <code>closable</code>,{" "}
              <code>closeIcon</code>, <code>okText</code>/<code>cancelText</code>,
              <code>okType</code>, <code>okButtonProps</code>/
              <code>cancelButtonProps</code>, <code>confirmLoading</code>,{" "}
              <code>mask</code> (boolean), <code>maskClosable</code>,{" "}
              <code>keyboard</code>, <code>zIndex</code>,{" "}
              <code>destroyOnClose</code>, <code>forceRender</code>,{" "}
              <code>modalRender</code>, <code>getContainer</code>,{" "}
              <code>wrapClassName</code>, <code>focusTriggerAfterClose</code>,
              <code>onOk</code>/<code>onCancel</code>/<code>afterClose</code>,
              <code>afterOpenChange</code>.
              <br />
              <strong>Static API:</strong>{" "}
              <code>Modal.confirm/info/success/error/warning</code>,{" "}
              <code>Modal.useModal()</code>, <code>Modal.destroyAll()</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>destroyOnHidden</code> (5.25+) — <code>destroyOnClose</code> kullan,
              <br />
              <code>loading</code> skeleton (5.18+) — Spin/Skeleton manuel,
              <br />
              <code>focusable</code> object (6.2+) —{" "}
              <code>focusTriggerAfterClose</code> kullan,
              <br />
              <code>mask</code> object (6.3+) — sadece boolean,
              <br />
              <code>width</code> Breakpoint object (5.23+) — sadece number,
              <br />
              <code>classNames</code>/<code>styles</code> semantic DOM —{" "}
              <code>wrapClassName</code> + style kullan.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="useModal > static — neden?"
          description={
            <>
              Static <code>Modal.confirm()</code> ConfigProvider context'i
              okumaz (locale, theme).{" "}
              <code>const [api, ctx] = Modal.useModal()</code> hook tema/locale
              ile uyumlu. <strong>Yeni kodda useModal tercih et.</strong>
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Modal vs Drawer vs Popconfirm</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Modal: tek odak — form, confirm, detay (geniş içerik)",
            "Modal: yıkıcı eylem onayı (sil, geri al)",
            "Drawer: workflow kesilmesin (filter, ticket detay)",
            "Popconfirm: inline tek soru (delete row, archive)",
          ]}
          dontItems={[
            "Liste filtresi için Modal (Drawer kullan — workflow korunsun)",
            "Tek tıklamalık confirm için Modal (Popconfirm yeter)",
            "Bilgi mesajı için Modal (Message/Notification — auto-dismiss)",
            "İç içe Modal (UX kötü — Drawer push veya wizard tek Modal)",
          ]}
        />
      </section>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>controlled</span>
          <Heading level={2}>Basic — open/close state</Heading>
        </div>
        <MockBlock caption="En basit form — controlled open">
          <Button onClick={() => setBasicOpen(true)}>Modalı aç</Button>
          <Modal
            open={basicOpen}
            title="Bilet kapatma onayı"
            okText="Kapat"
            cancelText="Vazgeç"
            onOk={() => {
              setBasicOpen(false);
              messageApi.success("Bilet kapatıldı");
            }}
            onCancel={() => setBasicOpen(false)}
          >
            <Text size="md" color="secondary">
              Bilet <strong>SC-4127</strong> "Resolved" durumuna geçecek.
              Müşteriye otomatik mail gönderilecek.
            </Text>
          </Modal>
        </MockBlock>
        <CodeBlock>{`const [open, setOpen] = useState(false);

<Modal
  open={open}
  title="Bilet kapatma onayı"
  okText="Kapat"
  cancelText="Vazgeç"
  onOk={() => { save(); setOpen(false); }}
  onCancel={() => setOpen(false)}
>
  <Text>SC-4127 "Resolved" durumuna geçecek.</Text>
</Modal>`}</CodeBlock>
      </section>

      {/* ── CONFIRM ── */}
      <section id="confirm" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Modal.confirm</span>
          <Heading level={2}>Confirm — yıkıcı eylem onayı</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek soru, evet/hayır. Hızlı kullanım — controlled state'e gerek yok.
          Yıkıcı eylem için <code>okType="danger"</code>.
        </Text>
        <MockBlock caption="Sil onayı (danger)">
          <Button
            danger
            onClick={() =>
              modalApi.confirm({
                title: "Bileti silmek istediğine emin misin?",
                content:
                  "SC-4127 ve tüm yorumları kalıcı olarak silinecek. Bu işlem geri alınamaz.",
                okText: "Sil",
                okType: "danger",
                cancelText: "Vazgeç",
                onOk: () => messageApi.success("Bilet silindi"),
              })
            }
          >
            Bileti sil
          </Button>
          <Button
            onClick={() =>
              modalApi.confirm({
                title: "Bu değişikliği uygulansın mı?",
                content: "Önceliği P3 → P1 olarak güncelliyorsun.",
                okText: "Uygula",
                cancelText: "Vazgeç",
                onOk: () => messageApi.success("Güncellendi"),
              })
            }
          >
            Normal confirm
          </Button>
        </MockBlock>
        <CodeBlock>{`modalApi.confirm({
  title: "Bileti silmek istediğine emin misin?",
  content: "SC-4127 ve tüm yorumları silinecek. Geri alınamaz.",
  okText: "Sil",
  okType: "danger",   // kırmızı OK butonu
  cancelText: "Vazgeç",
  onOk: async () => { await api.delete(id); },
  onCancel: () => { /* opsiyonel */ },
});`}</CodeBlock>
      </section>

      {/* ── STATIC ── */}
      <section id="static" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>5 type</span>
          <Heading level={2}>info / success / error / warning / confirm</Heading>
        </div>
        <MockBlock caption="Her type — icon + renk farklı">
          <Button
            onClick={() =>
              modalApi.info({
                title: "Bilgi",
                content: "Yeni sürüm 2.3.4 yayında — release notlarına göz at.",
              })
            }
          >
            info
          </Button>
          <Button
            onClick={() =>
              modalApi.success({
                title: "Tamamlandı",
                content: "Toplu güncelleme 47 bilet üzerinde uygulandı.",
              })
            }
          >
            success
          </Button>
          <Button
            onClick={() =>
              modalApi.error({
                title: "Hata",
                content:
                  "API timeout — bağlantı 30sn sonra düştü. Detay loglarda.",
              })
            }
          >
            error
          </Button>
          <Button
            onClick={() =>
              modalApi.warning({
                title: "Dikkat",
                content:
                  "SLA aşımına 2 saat kaldı. Atanmış teknisyene hatırlatma gönderildi.",
              })
            }
          >
            warning
          </Button>
        </MockBlock>
        <CodeBlock>{`modalApi.info({ title: "Bilgi", content: "..." });
modalApi.success({ title: "Tamamlandı", content: "..." });
modalApi.error({ title: "Hata", content: "..." });
modalApi.warning({ title: "Dikkat", content: "..." });
modalApi.confirm({ title: "Emin misin?", onOk: () => {} });`}</CodeBlock>
      </section>

      {/* ── HOOK ── */}
      <section id="hook" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>useModal hook</span>
          <Heading level={2}>useModal — ConfigProvider context'i okur</Heading>
        </div>
        <Text size="md" color="secondary">
          Static <code>Modal.confirm()</code> AntD context'inden bağımsız
          render edilir → tema/locale yanlış olabilir.{" "}
          <code>useModal()</code> contextHolder döner, JSX'e bir kere koyarsın.
        </Text>
        <CodeBlock>{`function MyComponent() {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      {contextHolder}  {/* portal anchor — bir kez component tree'de */}
      <Button onClick={() =>
        modal.confirm({ title: "Sil?", onOk: () => api.delete() })
      }>
        Sil
      </Button>
    </>
  );
}`}</CodeBlock>
      </section>

      {/* ── ASYNC ── */}
      <section id="async" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>async onOk</span>
          <Heading level={2}>Async onOk — confirmLoading + Promise</Heading>
        </div>
        <Text size="md" color="secondary">
          İki yaklaşım: (1){" "}
          <code>onOk</code> Promise döner → AntD otomatik loading +
          başarılıysa kapatır. (2) <code>confirmLoading</code> manuel kontrol —
          kapatma da senin elinde (form validation fail → açık kal).
        </Text>
        <MockBlock caption="Form save — manuel loading kontrolü">
          <Button type="primary" onClick={() => setAsyncOpen(true)}>
            Bilet kaydet
          </Button>
          <Modal
            open={asyncOpen}
            title="Yeni bilet"
            okText="Kaydet"
            cancelText="Vazgeç"
            confirmLoading={asyncLoading}
            onOk={onAsyncOk}
            onCancel={() => setAsyncOpen(false)}
          >
            <Text size="md" color="secondary">
              Kaydet'e tıkla — 1.2sn loading sonra başarı mesajı.
            </Text>
          </Modal>
        </MockBlock>
        <CodeBlock>{`// (1) Promise döndüğünde AntD otomatik kapatır
modalApi.confirm({
  title: "Sil?",
  onOk: async () => {
    await api.delete(id);  // Promise — loading auto
    // dönüş sonrası modal kapanır
  },
});

// (2) confirmLoading + manuel kapama (component formunda)
const [loading, setLoading] = useState(false);
<Modal
  open={open}
  confirmLoading={loading}
  onOk={async () => {
    setLoading(true);
    try {
      await api.save();
      setOpen(false);  // manuel kapat
    } finally {
      setLoading(false);
    }
  }}
/>`}</CodeBlock>
      </section>

      {/* ── FOOTER ── */}
      <section id="footer" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>footer</span>
          <Heading level={2}>Custom Footer — null / array / render fn</Heading>
        </div>
        <MockBlock caption="3 buton + footer={null} (sadece content)">
          <Button onClick={() => setCustomFooterOpen(true)}>
            Custom footer
          </Button>
          <Modal
            open={customFooterOpen}
            title="Bilet ata"
            onCancel={() => setCustomFooterOpen(false)}
            footer={[
              <Button
                key="draft"
                onClick={() => {
                  setCustomFooterOpen(false);
                  messageApi.info("Taslak kaydedildi");
                }}
              >
                Taslak
              </Button>,
              <Button
                key="cancel"
                onClick={() => setCustomFooterOpen(false)}
              >
                Vazgeç
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  setCustomFooterOpen(false);
                  messageApi.success("Bilet atandı");
                }}
              >
                Ata ve gönder
              </Button>,
            ]}
          >
            <Text size="md" color="secondary">
              3 farklı eylem: taslak / vazgeç / ata. Footer array olarak verildi.
            </Text>
          </Modal>
        </MockBlock>
        <CodeBlock>{`<Modal footer={null}>...</Modal>   // hiç footer yok

<Modal
  footer={[
    <Button key="draft">Taslak</Button>,
    <Button key="cancel" onClick={onCancel}>Vazgeç</Button>,
    <Button key="submit" type="primary" onClick={onOk}>Gönder</Button>,
  ]}
/>

// veya render fn (5.7'de var)
<Modal footer={(_, { OkBtn, CancelBtn }) => (
  <>
    <ExtraAction />
    <CancelBtn />
    <OkBtn />
  </>
)} />`}</CodeBlock>
      </section>

      {/* ── WIDTH ── */}
      <section id="width" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>width</span>
          <Heading level={2}>Width — sm 400 / md 520 / lg 720 / xl 960</Heading>
        </div>
        <MockBlock caption="Genişlik varyantları — number">
          <Button onClick={() => setWidthOpen("sm")}>sm 400</Button>
          <Button onClick={() => setWidthOpen("md")}>md 520 (default)</Button>
          <Button onClick={() => setWidthOpen("lg")}>lg 720</Button>
          <Button onClick={() => setWidthOpen("xl")}>xl 960</Button>
          <Modal
            open={widthOpen !== null}
            width={
              widthOpen === "sm"
                ? 400
                : widthOpen === "lg"
                  ? 720
                  : widthOpen === "xl"
                    ? 960
                    : 520
            }
            title={`Width: ${widthOpen ?? ""}`}
            onOk={() => setWidthOpen(null)}
            onCancel={() => setWidthOpen(null)}
          >
            <Text size="md" color="secondary">
              ServiceCore ölçek önerisi:
            </Text>
            <ul style={{ marginBlockStart: "var(--sc-space-3)" }}>
              <li>
                <strong>400</strong> — confirm, tek soru, basit form
              </li>
              <li>
                <strong>520</strong> — varsayılan, kısa form (3-5 alan)
              </li>
              <li>
                <strong>720</strong> — orta form, 2 kolonlu layout
              </li>
              <li>
                <strong>960</strong> — kompleks form, table preview
              </li>
            </ul>
          </Modal>
        </MockBlock>
        <Alert
          type="warning"
          showIcon
          message="960+ için Drawer düşün"
          description={
            <>
              Modal 960px'i geçerse mobilde okunaksız. 960'tan büyük içerik
              için <strong>Drawer (size="large", 800px)</strong> daha iyi —
              sayfa görünür kalır.
            </>
          }
        />
      </section>

      {/* ── SCROLL ── */}
      <section id="scroll" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>centered</span>
          <Heading level={2}>Centered + Scroll — uzun içerik</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>centered</code> dikey ortalama. Uzun içerikte modal body scroll
          olur (header/footer sabit kalır).
        </Text>
        <MockBlock caption="Centered + uzun içerik">
          <Button onClick={() => setScrollOpen(true)}>
            Release notlarını aç
          </Button>
          <Modal
            open={scrollOpen}
            title="Sürüm 2.3.4 — Release Notes"
            centered
            width={640}
            okText="Anladım"
            onOk={() => setScrollOpen(false)}
            onCancel={() => setScrollOpen(false)}
          >
            <div
              className={styles.longContent}
              style={{ maxHeight: 360, overflowY: "auto" }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <p key={i}>
                  <strong>{`SC-${4127 + i}`}</strong> — Asset envanteri
                  modülünde JSON import sırasında oluşan parsing hatası
                  giderildi. Önceden geniş dosyalar 64KB'ı aştığında
                  silentça düşüyordu; artık explicit hata + log düşüyor.
                </p>
              ))}
            </div>
          </Modal>
        </MockBlock>
      </section>

      {/* ── DESTROY ── */}
      <section id="destroy" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>destroyOnClose</span>
          <Heading level={2}>destroyOnClose — form içeriği reset</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>false</code> — modal kapanır ama DOM'da kalır, içerik
          korunur (sonraki açışta önceki değerler). <code>destroyOnClose</code>{" "}
          true → her açışta sıfır state.
          <br />
          <strong>Form Modal'larında destroyOnClose=true tercih et</strong>{" "}
          (kullanıcı yeni kayıt için açtığında boş başlasın).
        </Text>
        <MockBlock caption="Form modal — her açışta sıfır">
          <Button onClick={() => setDestroyOpen(true)}>Yeni bilet aç</Button>
          <Modal
            open={destroyOpen}
            title="Yeni bilet"
            destroyOnClose
            okText="Oluştur"
            cancelText="Vazgeç"
            onOk={() => {
              setDestroyOpen(false);
              messageApi.success(`"${formData.title || "Başlıksız"}" kaydedildi`);
              setFormData({ title: "", priority: "P3" });
            }}
            onCancel={() => setDestroyOpen(false)}
          >
            <div className={styles.formRow}>
              <span className={styles.formLabel}>Başlık</span>
              <Input
                placeholder="Kısa özet"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>Öncelik</span>
              <Select
                value={formData.priority}
                onChange={(v) => setFormData({ ...formData, priority: v })}
                options={[
                  { value: "P1", label: "P1 — Kritik" },
                  { value: "P2", label: "P2 — Yüksek" },
                  { value: "P3", label: "P3 — Normal" },
                  { value: "P4", label: "P4 — Düşük" },
                ]}
              />
            </div>
          </Modal>
        </MockBlock>
        <CodeBlock>{`<Modal
  open={open}
  destroyOnClose       // her kapanışta children unmount → form reset
  onOk={save}
  onCancel={onClose}
>
  <Form />
</Modal>

// 5.25+'de destroyOnHidden — 5.7'de YOK, destroyOnClose kullan.`}</CodeBlock>
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
          message="Hata 1 — useModal hook yerine static (ConfigProvider context loss)"
          description={
            <>
              <code>Modal.confirm()</code> static — locale/tema doğru
              gelmeyebilir. <strong>Çözüm:</strong>{" "}
              <code>const [api, ctx] = Modal.useModal()</code> hook + JSX'te{" "}
              <code>{`{ctx}`}</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Form Modal'da destroyOnClose yok"
          description={
            <>
              Kullanıcı 1. kez açar, doldurur, vazgeç. 2. kez açtığında eski
              değerler durur → kafa karışıklığı. <strong>Çözüm:</strong>{" "}
              <code>destroyOnClose</code> + state reset onCancel'da.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — İç içe Modal"
          description={
            <>
              Modal içinden başka Modal açmak — Z-index katmanı çoğalır,
              kullanıcı bağlamı kaybeder. <strong>Çözüm:</strong> Wizard (tek
              Modal, steps), veya akışı sayfa içine taşı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Filter/liste için Modal"
          description={
            <>
              Liste filtresi Modal'da → her filter değişiminde dışarısı
              görünmez, kullanıcı kontrol kaybeder. <strong>Çözüm:</strong>{" "}
              Drawer (sayfa görünür) veya inline filter bar.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Bilgi mesajı için Modal"
          description={
            <>
              "Kaydedildi" Modal'da → kullanıcı OK basmak zorunda, akış
              durur. <strong>Çözüm:</strong> Message toast (auto-dismiss 3sn).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Tek tıklamalık confirm için ağır Modal.confirm"
          description={
            <>
              Table row'da "Sil" butonuna basıp Modal.confirm açmak — fazla
              ağır. <strong>Çözüm:</strong> Popconfirm (inline, hızlı).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 7 — Async onOk'ta hata yakalanmıyor"
          description={
            <>
              <code>{`onOk: async () => { await api.save(); }`}</code> hata
              fırlatırsa modal açık kalır ama loading takılı. <strong>Çözüm:</strong>{" "}
              <code>try/catch</code> + <code>confirmLoading</code> manuel
              kontrol, hata mesajını göster.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 8 — 960+ Modal mobilde"
          description={
            <>
              Genişlik 960'ı geçen Modal mobilde kenara taşar, okunaksız.{" "}
              <strong>Çözüm:</strong> Drawer (size="large", responsive) veya
              dedicated full-page route.
            </>
          }
        />
      </section>
    </main>
  );
}
