"use client";

import { useEffect, useState } from "react";
import { Edit, TrashCan, Send, Copy, Settings } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Tooltip } from "@servicecoreui/ui/wraps";
import styles from "./tooltip.module.css";

/* ────────────────────────────────────────────────
 * ClientOnly — AntD Tooltip + open=true SSR mismatch için
 * ──────────────────────────────────────────────── */

function ClientOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : <>{fallback ?? null}</>;
}

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

export default function TooltipPage() {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Tooltip</Display>
        <Text size="lg" color="secondary">
          Sade ipucu — icon button açıklaması, kısaltma açma, disabled neden,
          truncated text expansion, hover hint. <strong>Sadece text</strong>.
          Title + content + action button gerekiyorsa <strong>Popover</strong>.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Tooltip vs Popover</a>
        <a href="#temel">Temel</a>
        <a href="#placement">Placement</a>
        <a href="#color">Color</a>
        <a href="#trigger">Trigger</a>
        <a href="#disabled">Disabled Anchor</a>
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
              <code>title</code> (ReactNode | function), <code>trigger</code>{" "}
              (hover/focus/click/contextMenu | array),{" "}
              <code>placement</code> (12 opsiyon),{" "}
              <code>arrow</code> (boolean | <code>{`{ pointAtCenter }`}</code>{" "}
              — 5.2+),{" "}
              <code>open</code>/<code>defaultOpen</code>/
              <code>onOpenChange</code> (4.23+),{" "}
              <code>mouseEnterDelay</code>, <code>mouseLeaveDelay</code>,{" "}
              <code>color</code> (preset / hex — 4.3+), <code>zIndex</code>,{" "}
              <code>getPopupContainer</code>, <code>autoAdjustOverflow</code>,{" "}
              <code>align</code>,{" "}
              legacy <code>overlayClassName</code>/<code>overlayStyle</code>/
              <code>overlayInnerStyle</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>fresh</code> (5.10+),{" "}
              <code>destroyOnHidden</code> (5.25+) —{" "}
              <code>destroyTooltipOnHide</code> (legacy) hâlâ çalışır,{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="visible → open: 4.23+'da değişti"
          description={
            <>
              5.7'de <code>open</code> + <code>onOpenChange</code> kullan.
              Legacy <code>visible</code> + <code>onVisibleChange</code> hâlâ
              runtime'da çalışıyor ama deprecated.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="Disabled anchor için wrapper span"
          description={
            <>
              <code>disabled</code> button hover event yakalayamaz → tooltip
              hiç açılmaz. <strong>Çözüm:</strong> button'u{" "}
              <code>&lt;span&gt;</code> ile sar, tooltip span'e bind:
              <br />
              <code>{`<Tooltip title="..."><span><Button disabled>...</Button></span></Tooltip>`}</code>
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Tooltip vs Popover</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Tooltip: TEK satır text (icon açıklaması, kısaltma)",
            "Tooltip: disabled neden ('Pro plan gerekir')",
            "Tooltip: truncated text expansion (uzun URL/title)",
            "Popover: title + content + action button",
            "Popover: trigger='click' rich panel",
          ]}
          dontItems={[
            "Tooltip içinde button (UX kötü, focus loss)",
            "Tooltip içinde paragraph (Popover kullan)",
            "Popover yerine Tooltip sadece text amacında (overkill — Tooltip yeter)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — hover trigger</Heading>
        </div>
        <MockBlock caption="Default — hover top">
          <Tooltip title="Bileti düzenle">
            <Button type="default">Hover et</Button>
          </Tooltip>
        </MockBlock>
        <CodeBlock>{`<Tooltip title="Bileti düzenle">
  <Button>Hover et</Button>
</Tooltip>`}</CodeBlock>
      </section>

      {/* ── PLACEMENT ── */}
      <section id="placement" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>placement</span>
          <Heading level={2}>Placement — 12 yerleşim</Heading>
        </div>
        <MockBlock caption="Tüm 12 placement (hover edin)">
          <div className={styles.placementGrid}>
            <div className={styles.placementCell}>
              <Tooltip title="topLeft" placement="topLeft">
                <Button size="small">TL</Button>
              </Tooltip>
              <Tooltip title="top" placement="top">
                <Button size="small">T</Button>
              </Tooltip>
              <Tooltip title="topRight" placement="topRight">
                <Button size="small">TR</Button>
              </Tooltip>
            </div>
            <div className={styles.placementCell}>
              <Tooltip title="leftTop" placement="leftTop">
                <Button size="small">LT</Button>
              </Tooltip>
              <Tooltip title="rightTop" placement="rightTop">
                <Button size="small">RT</Button>
              </Tooltip>
            </div>
            <div className={styles.placementCell}>
              <Tooltip title="left" placement="left">
                <Button size="small">L</Button>
              </Tooltip>
              <Tooltip title="right" placement="right">
                <Button size="small">R</Button>
              </Tooltip>
            </div>
            <div className={styles.placementCell}>
              <Tooltip title="leftBottom" placement="leftBottom">
                <Button size="small">LB</Button>
              </Tooltip>
              <Tooltip title="rightBottom" placement="rightBottom">
                <Button size="small">RB</Button>
              </Tooltip>
            </div>
            <div className={styles.placementCell}>
              <Tooltip title="bottomLeft" placement="bottomLeft">
                <Button size="small">BL</Button>
              </Tooltip>
              <Tooltip title="bottom" placement="bottom">
                <Button size="small">B</Button>
              </Tooltip>
              <Tooltip title="bottomRight" placement="bottomRight">
                <Button size="small">BR</Button>
              </Tooltip>
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── COLOR ── */}
      <section id="color" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>color</span>
          <Heading level={2}>Color — preset / hex</Heading>
        </div>
        <Text size="md" color="secondary">
          Preset isimler (<code>blue</code>, <code>red</code>, <code>green</code>{" "}
          vs.) veya hex (<code>#0070F3</code>). ServiceCore tek-accent felsefesi
          gereği <strong>sade kullan</strong> — status uyarısı için renkli (red
          error gibi), genel ipucu için default (koyu).
        </Text>
        <MockBlock caption="Color varyantları">
          <div className={styles.row}>
            <Tooltip title="Default (bg-emphasis)">
              <Button size="small">default</Button>
            </Tooltip>
            <Tooltip title="Hata bağlamı" color="red">
              <Button size="small">red</Button>
            </Tooltip>
            <Tooltip title="Başarı bağlamı" color="green">
              <Button size="small">green</Button>
            </Tooltip>
            <Tooltip title="ServiceCore mavi" color="#0070F3">
              <Button size="small">accent</Button>
            </Tooltip>
          </div>
        </MockBlock>
      </section>

      {/* ── TRIGGER ── */}
      <section id="trigger" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>trigger</span>
          <Heading level={2}>Trigger — hover / click / focus</Heading>
        </div>
        <MockBlock caption="Click trigger — kopyala feedback">
          <ClientOnly>
            <Tooltip
              title={copied ? "Kopyalandı!" : "Kopyala"}
              trigger="hover"
              open={copied ? true : undefined}
            >
              <Button type="default" leadingIcon={<Copy />} onClick={onCopy}>
                Kopyala
              </Button>
            </Tooltip>
          </ClientOnly>
        </MockBlock>
        <CodeBlock>{`const [copied, setCopied] = useState(false);

const onCopy = async () => {
  await navigator.clipboard.writeText(url);
  setCopied(true);
  setTimeout(() => setCopied(false), 1500);
};

<Tooltip title={copied ? "Kopyalandı!" : "Kopyala"} open={copied || undefined}>
  <Button onClick={onCopy}>Kopyala</Button>
</Tooltip>`}</CodeBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled anchor</span>
          <Heading level={2}>Disabled Button + Tooltip — wrapper span</Heading>
        </div>
        <Text size="md" color="secondary">
          Disabled HTMLButton hover event göndermez → tooltip açılmaz.{" "}
          <strong>Çözüm:</strong> button'u <code>&lt;span&gt;</code> ile sar,
          tooltip span'e bind.
        </Text>
        <MockBlock caption="span wrapper ile disabled tooltip çalışır">
          <div className={styles.row}>
            <Tooltip title="Pro plan gerekir">
              <span>
                <Button disabled>Webhook ekle</Button>
              </span>
            </Tooltip>
            <Tooltip title="Yetki yok">
              <span>
                <Button disabled type="primary">
                  Sil
                </Button>
              </span>
            </Tooltip>
          </div>
        </MockBlock>
        <CodeBlock>{`<Tooltip title="Pro plan gerekir">
  <span>                            {/* ✓ span wrapper */}
    <Button disabled>Webhook ekle</Button>
  </span>
</Tooltip>

{/* YANLIŞ — disabled button hover event göndermez */}
<Tooltip title="Pro plan gerekir">
  <Button disabled>Webhook ekle</Button>
</Tooltip>`}</CodeBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <MockBlock caption="Toolbar — icon-only buttons + tooltip">
          <div className={styles.toolbar}>
            <Tooltip title="Düzenle">
              <Button type="text" size="small" leadingIcon={<Edit />} aria-label="Düzenle" />
            </Tooltip>
            <Tooltip title="Yanıt gönder">
              <Button type="text" size="small" leadingIcon={<Send />} aria-label="Yanıt" />
            </Tooltip>
            <Tooltip title="Ayarlar">
              <Button type="text" size="small" leadingIcon={<Settings />} aria-label="Ayarlar" />
            </Tooltip>
            <Tooltip title="Sil" color="red">
              <Button type="text" size="small" danger leadingIcon={<TrashCan />} aria-label="Sil" />
            </Tooltip>
          </div>
        </MockBlock>

        <MockBlock caption="Truncated URL → tooltip ile tam göster">
          <Tooltip title="https://app.servicecore.com/tickets/SC-4127?filter=priority:p1&assignee=mehmet.k">
            <span className={styles.truncated}>
              https://app.servicecore.com/tickets/SC-4127?filter=priority:p1&assignee=mehmet.k
            </span>
          </Tooltip>
        </MockBlock>

        <MockBlock caption="Kısaltma açıklaması">
          <div className={styles.row}>
            <Tooltip title="Priority 1 — Critical: 30dk yanıt, 4sa çözüm">
              <span className={styles.truncated} style={{ maxWidth: 60, cursor: "help" }}>
                P1
              </span>
            </Tooltip>
            <Tooltip title="Service Level Agreement — sözleşmeye göre hedef süre">
              <span className={styles.truncated} style={{ maxWidth: 60, cursor: "help" }}>
                SLA
              </span>
            </Tooltip>
            <Tooltip title="Configuration Management Database — yapılandırma kalemleri kataloğu">
              <span className={styles.truncated} style={{ maxWidth: 80, cursor: "help" }}>
                CMDB
              </span>
            </Tooltip>
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
          message="Hata 1 — Disabled button doğrudan child"
          description={
            <>
              <code>{`<Tooltip><Button disabled /></Tooltip>`}</code> — disabled
              button hover event göndermez, tooltip hiç açılmaz.{" "}
              <strong>Çözüm:</strong> button'u <code>&lt;span&gt;</code> ile sar.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Tooltip içine button/link"
          description={
            <>
              Hover tooltip içinde button → kullanıcı mouse'unu çekince kapanır.
              <strong>Çözüm:</strong> Popover (trigger="click").
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Title metni çok uzun (paragraf)"
          description={
            <>
              Tooltip kısa ipucu içindir, paragraph değil. Uzun açıklama için
              Popover veya inline help text.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Aynı anda 2+ tooltip açık"
          description={
            <>
              Aynı satırda üst üste tooltip'ler → kullanıcı kafası karışır.
              Mouse hareketi sırasında tooltip'ler arasında geçiş yapar — UX
              kötü. Yer kısıtlı toolbar'larda tooltip'leri sade tut.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Mobile'da yoğun tooltip"
          description={
            <>
              Mobile'da hover yok — tooltip tıklama ile açılır ama tek
              ipucu için bu fazla overhead. Mobile'da inline help text veya
              accordion tercih et.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — visible prop (deprecated)"
          description={
            <>
              <code>visible</code>/<code>onVisibleChange</code> 4.23'te{" "}
              <code>open</code>/<code>onOpenChange</code> ile değiştirildi.
              Yeni kodda <code>open</code> kullan.
            </>
          }
        />
      </section>
    </main>
  );
}
