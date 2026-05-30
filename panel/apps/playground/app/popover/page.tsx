"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit,
  TrashCan,
  Send,
  UserAvatar,
  Settings,
  Email,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Button, Popover } from "@servicecore/ui/wraps";
import styles from "./popover.module.css";

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
 * Reusable content nodes
 * ──────────────────────────────────────────────── */

function ProfilePreview() {
  return (
    <div className={styles.profilePreview}>
      <div className={styles.profileAvatar}>MK</div>
      <div className={styles.profileMeta}>
        <span className={styles.profileName}>Mehmet Karaca</span>
        <span className={styles.profileRole}>Network Engineer</span>
        <span className={styles.profileRole}>mehmet.k@firma.com · İstanbul</span>
        <div className={styles.profileActions}>
          <Button type="primary" size="small" leadingIcon={<Email />}>
            E-posta
          </Button>
          <Button type="default" size="small">Profili gör</Button>
        </div>
      </div>
    </div>
  );
}

function ActionMenu() {
  return (
    <div className={styles.actionMenu}>
      <div className={styles.actionItem}>
        <Edit size={14} />
        <span>Düzenle</span>
      </div>
      <div className={styles.actionItem}>
        <Send size={14} />
        <span>Yeniden ata</span>
      </div>
      <div className={styles.actionItem}>
        <Settings size={14} />
        <span>Ayarlar</span>
      </div>
      <div className={`${styles.actionItem} ${styles.actionItemDanger}`}>
        <TrashCan size={14} />
        <span>Sil</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function PopoverPage() {
  const [controlled, setControlled] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Popover</Display>
        <Text size="lg" color="secondary">
          Tooltip'in zengin akrabası. Title + content + action button. Bilet
          column action menu, user profile preview, asset quick view, help text
          + read more. <strong>Sadece text</strong> ise Tooltip; rich içerik
          (header, button) ise Popover.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Popover vs Tooltip</a>
        <a href="#temel">Temel</a>
        <a href="#trigger">Trigger</a>
        <a href="#placement">Placement</a>
        <a href="#controlled">Controlled</a>
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
              <code>title</code>, <code>content</code>, <code>trigger</code>{" "}
              (hover/focus/click/contextMenu | array),{" "}
              <code>placement</code> (12 opsiyon),{" "}
              <code>arrow</code> (boolean | <code>{`{ pointAtCenter }`}</code> —
              5.2+), <code>open</code>/<code>defaultOpen</code>/
              <code>onOpenChange</code> (4.23+),{" "}
              <code>mouseEnterDelay</code>, <code>mouseLeaveDelay</code>,{" "}
              <code>color</code> (4.3+), <code>zIndex</code>,{" "}
              <code>getPopupContainer</code>, <code>autoAdjustOverflow</code>,{" "}
              <code>align</code>, <code>classNames</code>/<code>styles</code>{" "}
              semantic DOM, legacy <code>overlayClassName</code>/
              <code>overlayStyle</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>fresh</code> (5.10+) — popover her açılışta children
              re-render, 5.7'de manuel <code>key</code> prop'u ile force-remount,
              <br />
              <code>destroyOnHidden</code> (5.25+) —{" "}
              <code>destroyTooltipOnHide</code> (legacy) hâlâ çalışır.
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
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Popover vs Tooltip vs Dropdown</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Popover: title + content + action button (rich içerik)",
            "Tooltip: SADECE text (icon açıklaması, kısa ipucu)",
            "Dropdown: menu — eylem listesi, navigation",
            "Popover trigger='click': eylem kapsayan kart",
          ]}
          dontItems={[
            "Tooltip içine button koymak (UX kötü, focus loss)",
            "Dropdown içine paragraph (Popover kullan)",
            "Popover trigger='hover' eylem button ile (hover'da kaybolur)",
            "Modal yerine Popover (büyük içerik için Modal/Drawer)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel kullanım</Heading>
        </div>
        <MockBlock caption="Hover (default trigger) — title + content">
          <Popover
            title="SLA Bilgisi"
            content={
              <Text size="sm">
                P1 bilet için ilk yanıt süresi <strong>30 dakika</strong>,
                çözüm <strong>4 saat</strong>.
              </Text>
            }
          >
            <Button type="default">Hover et</Button>
          </Popover>
        </MockBlock>
        <CodeBlock>{`<Popover
  title="SLA Bilgisi"
  content={<Text>P1 bilet için ilk yanıt 30 dakika...</Text>}
>
  <Button>Hover et</Button>
</Popover>`}</CodeBlock>
      </section>

      {/* ── TRIGGER ── */}
      <section id="trigger" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>trigger</span>
          <Heading level={2}>Trigger — hover / click / focus</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>hover</strong> default — açıklama/ipucu için.{" "}
          <strong>click</strong> — eylem button içeren kart (kullanıcı
          mouse'unu çekince kapanmasın). <strong>focus</strong> — input'a
          focus geldiğinde validation ipucu.
        </Text>
        <MockBlock caption="3 farklı trigger">
          <div style={{ display: "flex", gap: "var(--sc-space-3)", flexWrap: "wrap" }}>
            <Popover content="Hover ile açıldı" trigger="hover">
              <Button type="default">Hover</Button>
            </Popover>
            <Popover
              title="Hesap eylemleri"
              content={<ActionMenu />}
              trigger="click"
              placement="bottomLeft"
            >
              <Button type="default">Click</Button>
            </Popover>
            <Popover content="Input'a focus geldiğinde açılır" trigger="focus">
              <Button type="default">Focus</Button>
            </Popover>
          </div>
        </MockBlock>
        <CodeBlock>{`<Popover trigger="click" content={<ActionMenu />}>
  <Button>Aç</Button>
</Popover>

// Birden fazla trigger:
<Popover trigger={["click", "hover"]} content={...}>
  <Button>Hover veya tıkla</Button>
</Popover>`}</CodeBlock>
      </section>

      {/* ── PLACEMENT ── */}
      <section id="placement" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>placement</span>
          <Heading level={2}>Placement — 12 yerleşim</Heading>
        </div>
        <Text size="md" color="secondary">
          Anchor'a göre popover konumu. Default <code>top</code>. Ekran kenarına
          yakınsa <code>autoAdjustOverflow</code> (default true) otomatik
          değiştirir.
        </Text>
        <MockBlock caption="Tüm 12 placement (hover edin)">
          <div className={styles.placementGrid}>
            <div className={styles.placementCell}>
              <Popover content="topLeft" placement="topLeft">
                <Button size="small">TL</Button>
              </Popover>
              <Popover content="top" placement="top">
                <Button size="small">T</Button>
              </Popover>
              <Popover content="topRight" placement="topRight">
                <Button size="small">TR</Button>
              </Popover>
            </div>
            <div className={styles.placementCell}>
              <Popover content="leftTop" placement="leftTop">
                <Button size="small">LT</Button>
              </Popover>
              <Popover content="rightTop" placement="rightTop">
                <Button size="small">RT</Button>
              </Popover>
            </div>
            <div className={styles.placementCell}>
              <Popover content="left" placement="left">
                <Button size="small">L</Button>
              </Popover>
              <Popover content="right" placement="right">
                <Button size="small">R</Button>
              </Popover>
            </div>
            <div className={styles.placementCell}>
              <Popover content="leftBottom" placement="leftBottom">
                <Button size="small">LB</Button>
              </Popover>
              <Popover content="rightBottom" placement="rightBottom">
                <Button size="small">RB</Button>
              </Popover>
            </div>
            <div className={styles.placementCell}>
              <Popover content="bottomLeft" placement="bottomLeft">
                <Button size="small">BL</Button>
              </Popover>
              <Popover content="bottom" placement="bottom">
                <Button size="small">B</Button>
              </Popover>
              <Popover content="bottomRight" placement="bottomRight">
                <Button size="small">BR</Button>
              </Popover>
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── CONTROLLED ── */}
      <section id="controlled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>open + onOpenChange</span>
          <Heading level={2}>Controlled — programmatic kontrol</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>open</code> + <code>onOpenChange</code> ile state'i sen
          yönet. "Save sonrası popover'ı kapat" gibi senaryolar için.
        </Text>
        <MockBlock caption="Controlled — dışarıdan toggle">
          <div style={{ display: "flex", gap: "var(--sc-space-3)", alignItems: "center" }}>
            <Popover
              title="Onayla"
              content={
                <div style={{ display: "flex", gap: "var(--sc-space-2)" }}>
                  <Button size="small" type="primary" onClick={() => setControlled(false)}>
                    Onayla
                  </Button>
                  <Button size="small" type="default" onClick={() => setControlled(false)}>
                    Vazgeç
                  </Button>
                </div>
              }
              open={controlled}
              onOpenChange={setControlled}
              trigger="click"
            >
              <Button type="primary">{controlled ? "Açık" : "Kapalı"}</Button>
            </Popover>
            <Button type="default" onClick={() => setControlled((v) => !v)}>
              Dışarıdan toggle
            </Button>
          </div>
        </MockBlock>
        <CodeBlock>{`const [open, setOpen] = useState(false);

const onSave = async () => {
  await api.save(...);
  setOpen(false);  // save sonrası kapat
};

<Popover open={open} onOpenChange={setOpen} content={<SaveForm onSave={onSave} />}>
  <Button>Düzenle</Button>
</Popover>`}</CodeBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <MockBlock caption="Kullanıcı profil önizleme — hover, rich content">
          <Popover
            content={<ProfilePreview />}
            trigger="hover"
            placement="bottomLeft"
            mouseEnterDelay={0.3}
          >
            <Button type="text" leadingIcon={<UserAvatar />}>
              Mehmet K.
            </Button>
          </Popover>
        </MockBlock>

        <MockBlock caption="Bilet satır action menu — click, ⋯ button">
          <Popover
            content={<ActionMenu />}
            trigger="click"
            placement="bottomRight"
          >
            <Button type="text">⋯</Button>
          </Popover>
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
          message="Hata 1 — trigger='hover' içinde button"
          description={
            <>
              Hover popover içinde button → kullanıcı mouse'unu butona
              götürmeden popover kapanır. <strong>Çözüm:</strong>{" "}
              <code>trigger="click"</code> ile kalıcı aç.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Modal yerine Popover (büyük içerik)"
          description={
            <>
              Popover dar yer (max 320px). Form, tablo, uzun içerik için
              Modal veya Drawer.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Tooltip yerine Popover (sadece text için)"
          description={
            <>
              Sadece "Sil" gibi tek kelime açıklamada Popover overkill —
              Tooltip yeter. Popover header/action/multi-line gerektiğinde.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Mobile'da Popover yoğun kullanım"
          description={
            <>
              Mobil'de hover yok, tıklama tek ipucu. Popover'lar üst üste
              binince UX kötü. Mobile'a özel sheet/bottom-drawer pattern'i
              düşün.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — visible prop (deprecated)"
          description={
            <>
              <code>visible</code>/<code>onVisibleChange</code> 4.23'te{" "}
              <code>open</code>/<code>onOpenChange</code> ile değiştirildi.
              Yeni kodda <code>open</code> kullan — 5.x'in sonunda visible
              kaldırılacak.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — fresh / destroyOnHidden beklemek (5.10+/5.25+)"
          description={
            <>
              5.7'de yok. <code>destroyTooltipOnHide</code> (legacy) ile aynı
              etki. Content her açılışta re-render isteniyorsa{" "}
              <code>key={`{Date.now()}`}</code> ile force-remount.
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
