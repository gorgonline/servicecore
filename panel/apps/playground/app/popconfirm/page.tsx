"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import {
  Alert,
  Button,
  Popconfirm,
  Switch,
  message,
} from "@servicecore/ui/wraps";
import { WarningAltFilled, Archive, TrashCan } from "@carbon/icons-react";
import styles from "./popconfirm.module.css";

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

export default function PopconfirmPage() {
  const [messageApi, messageCtx] = message.useMessage();
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [tickets, setTickets] = useState([
    { id: "SC-4127", title: "Network outage — Acme A.Ş.", status: "Açık" },
    { id: "SC-4128", title: "Disk full — srv-prod-04", status: "Açık" },
    { id: "SC-4129", title: "VPN bağlantı sorunu — Beta Ltd.", status: "Beklemede" },
  ]);

  const onAsyncConfirm = async () => {
    setAsyncLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setAsyncLoading(false);
    messageApi.success("Arşivlendi");
  };

  const deleteTicket = (id: string) => {
    setTickets((t) => t.filter((row) => row.id !== id));
    messageApi.success(`${id} silindi`);
  };

  return (
    <main className={styles.page}>
      {messageCtx}

      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Popconfirm</Display>
        <Text size="lg" color="secondary">
          Inline confirm popup — trigger yanında küçük baloncuk. Tek soru,
          hızlı evet/hayır. <strong>Modal.confirm'un hafif alternatifi.</strong>
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">vs Modal.confirm / Popover</a>
        <a href="#basic">Basic</a>
        <a href="#description">Description</a>
        <a href="#danger">Danger (okType)</a>
        <a href="#async">Async + Loading</a>
        <a href="#placement">Placement</a>
        <a href="#nocancel">showCancel=false</a>
        <a href="#controlled">Controlled</a>
        <a href="#disabled">Disabled</a>
        <a href="#realworld">Real-world Table</a>
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
              <strong>Core:</strong> <code>title</code> (zorunlu),{" "}
              <code>description</code> (5.1+), <code>okText</code>,{" "}
              <code>cancelText</code>, <code>okType</code>,{" "}
              <code>okButtonProps</code>, <code>cancelButtonProps</code>,{" "}
              <code>icon</code>, <code>showCancel</code> (4.18+),{" "}
              <code>disabled</code>, <code>onConfirm</code>,{" "}
              <code>onCancel</code>, <code>onPopupClick</code> (5.5+).
              <br />
              <strong>Tooltip shared:</strong> <code>arrow</code>,{" "}
              <code>placement</code> (12 yön), <code>trigger</code>,{" "}
              <code>open</code>/<code>defaultOpen</code>,{" "}
              <code>onOpenChange</code>, <code>mouseEnterDelay</code>/
              <code>mouseLeaveDelay</code>, <code>overlayClassName</code>,{" "}
              <code>overlayStyle</code>, <code>overlayInnerStyle</code>,{" "}
              <code>rootClassName</code>, <code>getPopupContainer</code>,{" "}
              <code>color</code>, <code>fresh</code>,{" "}
              <code>autoAdjustOverflow</code>,{" "}
              <code>destroyTooltipOnHide</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>classNames</code>/<code>styles</code> semantic DOM (5.8+) —{" "}
              <code>overlayClassName</code> + <code>overlayInnerStyle</code> kullan.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Popconfirm vs Modal.confirm vs Popover</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Popconfirm: inline tek soru — 'Bu satırı sil?', 'Arşivle?'",
            "Modal.confirm: yıkıcı + bağlam — 'İlişkili bilet de silinecek'",
            "Popover: custom içerik (form, action menu) — confirm değil",
            "Popconfirm: table row action, dismiss notif",
          ]}
          dontItems={[
            "3+ satır açıklama gerektiren onay (Modal.confirm)",
            "Form/input içeren confirm (Popover veya Modal)",
            "Critical (delete account) için Popconfirm (Modal — bağlam ver)",
            "Mobile'da hover-trigger (touch'ta hover yok — click trigger)",
          ]}
        />
      </section>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Basic — title + onConfirm</Heading>
        </div>
        <MockBlock caption="En basit form — title + onConfirm">
          <Popconfirm
            title="Bileti arşivlemek istediğine emin misin?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => messageApi.success("Arşivlendi")}
            onCancel={() => messageApi.info("İptal edildi")}
          >
            <Button>Arşivle</Button>
          </Popconfirm>
        </MockBlock>
        <CodeBlock>{`<Popconfirm
  title="Bileti arşivle?"
  okText="Evet"
  cancelText="Hayır"
  onConfirm={() => api.archive(id)}
  onCancel={() => {}}  // opsiyonel
>
  <Button>Arşivle</Button>
</Popconfirm>`}</CodeBlock>
      </section>

      {/* ── DESCRIPTION ── */}
      <section id="description" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>description 5.1+</span>
          <Heading level={2}>Description — alt satır açıklama</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>description</code> 5.1+'da geldi. Title kısa kalmalı, ayrıntı
          description'da. <strong>3+ satır olacaksa Modal.confirm.</strong>
        </Text>
        <MockBlock caption="Title + description">
          <Popconfirm
            title="Bileti sil?"
            description="Bu işlem geri alınamaz."
            okText="Sil"
            okType="danger"
            cancelText="Vazgeç"
            onConfirm={() => messageApi.success("Silindi")}
          >
            <Button danger>Sil</Button>
          </Popconfirm>
        </MockBlock>
      </section>

      {/* ── DANGER ── */}
      <section id="danger" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>okType="danger"</span>
          <Heading level={2}>Danger — yıkıcı eylem için kırmızı buton</Heading>
        </div>
        <MockBlock caption="Sil + arşivle — farklı okType">
          <Popconfirm
            title="Bileti kalıcı olarak sil?"
            description="Bu işlem geri alınamaz."
            okText="Sil"
            okType="danger"
            cancelText="Vazgeç"
            icon={<WarningAltFilled style={{ color: "var(--sc-color-state-danger-fg)" }} />}
            onConfirm={() => messageApi.success("Silindi")}
          >
            <Button danger leadingIcon={<TrashCan />}>
              Sil
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Bileti arşivle?"
            okText="Arşivle"
            cancelText="Vazgeç"
            onConfirm={() => messageApi.success("Arşivlendi")}
          >
            <Button leadingIcon={<Archive />}>Arşivle</Button>
          </Popconfirm>
        </MockBlock>
        <CodeBlock>{`<Popconfirm
  title="Bileti kalıcı olarak sil?"
  description="Bu işlem geri alınamaz."
  okText="Sil"
  okType="danger"           // OK butonu kırmızı
  cancelText="Vazgeç"
  icon={<WarningAltFilled style={{ color: "var(--sc-color-state-danger-fg)" }} />}
  onConfirm={() => api.delete(id)}
>
  <Button danger>Sil</Button>
</Popconfirm>`}</CodeBlock>
      </section>

      {/* ── ASYNC ── */}
      <section id="async" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>async</span>
          <Heading level={2}>Async onConfirm — okButtonProps loading</Heading>
        </div>
        <Text size="md" color="secondary">
          Popconfirm OK butonu otomatik loading göstermez. Manuel yönet:{" "}
          <code>okButtonProps={`{{ loading }}`}</code>. Async sonra
          state güncelle.
        </Text>
        <MockBlock caption="1sn loading sonra success">
          <Popconfirm
            title="Bileti arşivle?"
            okText="Arşivle"
            cancelText="Vazgeç"
            okButtonProps={{ loading: asyncLoading }}
            onConfirm={onAsyncConfirm}
          >
            <Button>Async arşivle</Button>
          </Popconfirm>
        </MockBlock>
        <CodeBlock>{`const [loading, setLoading] = useState(false);

<Popconfirm
  title="Bileti arşivle?"
  okButtonProps={{ loading }}
  onConfirm={async () => {
    setLoading(true);
    try {
      await api.archive(id);
    } finally {
      setLoading(false);
    }
  }}
>
  <Button>Arşivle</Button>
</Popconfirm>`}</CodeBlock>
      </section>

      {/* ── PLACEMENT ── */}
      <section id="placement" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>12 yön</span>
          <Heading level={2}>Placement — Tooltip ile aynı 12 yön</Heading>
        </div>
        <MockBlock caption="6 yön sample — diğerleri aynı pattern">
          <div className={styles.placementGrid}>
            {(
              ["topLeft", "top", "topRight", "bottomLeft", "bottom", "bottomRight"] as const
            ).map((p) => (
              <Popconfirm
                key={p}
                title={`Placement: ${p}`}
                onConfirm={() => messageApi.success(`${p} confirmed`)}
                placement={p}
              >
                <Button>{p}</Button>
              </Popconfirm>
            ))}
          </div>
        </MockBlock>
        <Alert
          type="info"
          showIcon
          message="12 yön: top/bottom/left/right × Left/Center/Right (veya Top/Center/Bottom)"
          description={
            <>
              Default <code>top</code>. Table row için <code>topRight</code>{" "}
              veya <code>left</code>. Mobile'da{" "}
              <code>autoAdjustOverflow</code> ile viewport dışına taşmayı
              önler (default açık).
            </>
          }
        />
      </section>

      {/* ── NO CANCEL ── */}
      <section id="nocancel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showCancel</span>
          <Heading level={2}>showCancel=false — tek OK butonu</Heading>
        </div>
        <Text size="md" color="secondary">
          Sadece bilgilendirme + onay (cancel anlamsız). Acknowledge pattern.
        </Text>
        <MockBlock caption="Tek OK — uyarı">
          <Popconfirm
            title="Kaydedilmedi"
            description="Değişiklikler kaybolacak."
            showCancel={false}
            okText="Anladım"
            onConfirm={() => messageApi.warning("Çıkış yapıldı")}
          >
            <Button>Çık</Button>
          </Popconfirm>
        </MockBlock>
      </section>

      {/* ── CONTROLLED ── */}
      <section id="controlled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>controlled</span>
          <Heading level={2}>Controlled — open + onOpenChange</Heading>
        </div>
        <Text size="md" color="secondary">
          Dış state ile aç/kapa. Pre-validation veya conditional open için.
          Confirm/cancel manuel kapat.
        </Text>
        <MockBlock caption="State buton ile aç">
          <Button onClick={() => setControlledOpen(true)}>
            Confirm aç
          </Button>
          <Popconfirm
            title="Devam et?"
            open={controlledOpen}
            onConfirm={() => {
              setControlledOpen(false);
              messageApi.success("Onaylandı");
            }}
            onCancel={() => setControlledOpen(false)}
          >
            <span style={{ marginInlineStart: "var(--sc-space-2)" }}>
              <em style={{ color: "var(--sc-color-text-tertiary)" }}>
                (anchor: bu metin yanında açılır)
              </em>
            </span>
          </Popconfirm>
        </MockBlock>
        <CodeBlock>{`const [open, setOpen] = useState(false);

<Popconfirm
  open={open}
  onConfirm={() => { save(); setOpen(false); }}
  onCancel={() => setOpen(false)}
  onOpenChange={(o) => setOpen(o)}
>
  <Button onClick={() => preValidate() && setOpen(true)}>
    Kaydet
  </Button>
</Popconfirm>`}</CodeBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled — popup açılmaz</Heading>
        </div>
        <Text size="md" color="secondary">
          Trigger butona tıklasa da Popconfirm açılmaz, direkt{" "}
          <code>onConfirm</code> çalışır (skip confirm). Toggle ile yetki/mode
          kontrolü.
        </Text>
        <MockBlock caption="Switch: confirm istemiyorum">
          <span>
            Confirm'i atla:{" "}
            <Switch checked={disabled} onChange={setDisabled} />
          </span>
          <Popconfirm
            title="Bileti sil?"
            disabled={disabled}
            onConfirm={() => messageApi.success("Silindi (confirm bypass)")}
          >
            <Button danger>Sil</Button>
          </Popconfirm>
        </MockBlock>
      </section>

      {/* ── REAL-WORLD TABLE ── */}
      <section id="realworld" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ServiceCore</span>
          <Heading level={2}>Real-world — Table row delete</Heading>
        </div>
        <Text size="md" color="secondary">
          Popconfirm'un en yaygın kullanımı. Her satırda kendi confirm'i.{" "}
          <code>placement="topRight"</code> + küçük buton.
        </Text>
        <MockBlock caption="Bilet tablosu — sil butonu Popconfirm'lı">
          <div className={styles.tableMock}>
            <div className={`${styles.tableRow} ${styles.head}`}>
              <div>ID</div>
              <div>Başlık</div>
              <div>Durum</div>
              <div></div>
            </div>
            {tickets.length === 0 ? (
              <div className={styles.tableRow}>
                <div></div>
                <div style={{ color: "var(--sc-color-text-tertiary)" }}>
                  Tüm biletler silindi
                </div>
                <div></div>
                <div></div>
              </div>
            ) : (
              tickets.map((row) => (
                <div key={row.id} className={styles.tableRow}>
                  <div className={styles.tableId}>{row.id}</div>
                  <div>{row.title}</div>
                  <div>{row.status}</div>
                  <div style={{ textAlign: "right" }}>
                    <Popconfirm
                      title={`${row.id} silinsin mi?`}
                      description="Bu işlem geri alınamaz."
                      okText="Sil"
                      okType="danger"
                      cancelText="Vazgeç"
                      placement="topRight"
                      onConfirm={() => deleteTicket(row.id)}
                    >
                      <Button danger size="small" leadingIcon={<TrashCan />} />
                    </Popconfirm>
                  </div>
                </div>
              ))
            )}
          </div>
          {tickets.length === 0 && (
            <Button
              onClick={() =>
                setTickets([
                  { id: "SC-4127", title: "Network outage — Acme A.Ş.", status: "Açık" },
                  { id: "SC-4128", title: "Disk full — srv-prod-04", status: "Açık" },
                  { id: "SC-4129", title: "VPN bağlantı sorunu — Beta Ltd.", status: "Beklemede" },
                ])
              }
            >
              Sıfırla
            </Button>
          )}
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
          message="Hata 1 — Critical (delete account) için Popconfirm"
          description={
            <>
              "Hesabımı sil" tek satır Popconfirm yetersiz — kullanıcı sonucu
              kavramayabilir. <strong>Çözüm:</strong> Modal.confirm (bağlam +
              type-to-confirm pattern).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Form/input içeren confirm"
          description={
            <>
              Popconfirm sadece title/description + button. Form alanı
              gerekiyorsa <strong>Popover</strong> (custom content) veya{" "}
              <strong>Modal</strong>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Async onConfirm'da loading yok"
          description={
            <>
              Async <code>onConfirm</code> sırasında button loading
              göstermezsen kullanıcı 2 kez tıklayabilir.{" "}
              <strong>Çözüm:</strong>{" "}
              <code>okButtonProps={`{{ loading: state }}`}</code> + manuel
              state.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Mobile'da trigger=hover"
          description={
            <>
              Touch device'larda hover yok → confirm açılmaz.{" "}
              <strong>Çözüm:</strong> Default <code>trigger="click"</code> bırak
              (Popconfirm zaten default click).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — 3+ satır title"
          description={
            <>
              Popconfirm dar (max ~300px) — uzun title kötü kırpılır.{" "}
              <strong>Çözüm:</strong> Kısa title + description (5.1+) veya
              Modal.confirm.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Yıkıcı eylemde okType=primary"
          description={
            <>
              Sil için mavi OK butonu yanlış sinyal. <strong>Çözüm:</strong>{" "}
              <code>okType="danger"</code> + uygun ikon (TrashCan).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 7 — onCancel'da side effect"
          description={
            <>
              Kullanıcı cancel'a basınca log/audit yazmak — cancel "hiçbir şey
              olmadı" sinyali olmalı. <strong>Çözüm:</strong>{" "}
              <code>onCancel</code> sadece UI state reset (open=false).
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
