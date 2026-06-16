"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Button, Drawer } from "@servicecoreui/ui/wraps";
import styles from "./drawer.module.css";

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

export default function DrawerPage() {
  const [basic, setBasic] = useState(false);
  const [filter, setFilter] = useState(false);
  const [form, setForm] = useState(false);
  const [detail, setDetail] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [parent, setParent] = useState(false);
  const [child, setChild] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Drawer</Display>
        <Text size="lg" color="secondary">
          Yandan açılır panel. Bilet detay (sağdan), filter sidebar (soldan),
          settings panel, form modal alternative. <strong>Modal vs Drawer:</strong>{" "}
          Modal ana içeriği örter (focus tek modal'da), Drawer yan panel olarak
          ana içeriği görünür bırakır.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Drawer vs Modal</a>
        <a href="#temel">Temel</a>
        <a href="#placement">Placement</a>
        <a href="#size">Size + Width</a>
        <a href="#footer">Footer</a>
        <a href="#detail">Bilet Detay</a>
        <a href="#nested">Nested</a>
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
              <code>open</code> / <code>onClose</code> /{" "}
              <code>afterOpenChange</code> (4.23+),{" "}
              <code>title</code>, <code>extra</code>, <code>footer</code>,{" "}
              <code>placement</code> (top/right/bottom/left),{" "}
              <code>size</code> ('default' 378px / 'large' 736px),{" "}
              <code>width</code>, <code>height</code>,{" "}
              <code>mask</code> (boolean | object), <code>maskClosable</code>,{" "}
              <code>keyboard</code>, <code>closable</code> (boolean),{" "}
              <code>closeIcon</code>, <code>getContainer</code>,{" "}
              <code>rootStyle</code>, <code>rootClassName</code>,{" "}
              <code>push</code> (nested drawer effect),{" "}
              <code>destroyOnClose</code> (legacy),{" "}
              <code>zIndex</code>, <code>autoFocus</code>,{" "}
              <code>forceRender</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>loading</code> (5.17+) — Skeleton göstergesi,{" "}
              <code>closable</code> object form{" "}
              <code>{`{ closeIcon, disabled }`}</code> (5.28+),{" "}
              <code>destroyOnHidden</code> (5.25+) — legacy{" "}
              <code>destroyOnClose</code> hâlâ çalışır,{" "}
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
              5.7'de <code>open</code> + <code>onClose</code> kullan.{" "}
              <code>afterVisibleChange</code> → <code>afterOpenChange</code>{" "}
              olarak değişti. Legacy hâlâ çalışıyor ama deprecated.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Drawer vs Modal</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Drawer: ana liste'den çıkmadan detay göster (master-detail)",
            "Drawer: uzun form (Modal'da scroll yetersiz)",
            "Drawer: filter sidebar (soldan, ana içeriği etkileme)",
            "Modal: focus zorunlu (confirm, critical action)",
            "Modal: kısa içerik (≤2 form alanı, confirmation)",
          ]}
          dontItems={[
            "Drawer içinde confirm modal yerine yine Drawer açma (zincir)",
            "Modal yerine Drawer'a kısa confirm sığdırma (yer israfı)",
            "Mobile'da büyük Drawer (yüksek 80% kaplar — sheet pattern daha iyi)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel</Heading>
        </div>
        <MockBlock caption="Default — sağdan, 378px">
          <Button type="primary" onClick={() => setBasic(true)}>
            Drawer aç
          </Button>
          <Drawer
            title="Drawer başlığı"
            open={basic}
            onClose={() => setBasic(false)}
          >
            <Text size="sm" color="secondary">
              Default placement <code>"right"</code>, default size{" "}
              <code>"default"</code> (378px).
            </Text>
            <br />
            <Text size="sm" color="secondary">
              Mask'a tıklayınca veya Esc tuşuyla kapanır.
            </Text>
          </Drawer>
        </MockBlock>
        <CodeBlock>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Aç</Button>
<Drawer title="..." open={open} onClose={() => setOpen(false)}>
  ...
</Drawer>`}</CodeBlock>
      </section>

      {/* ── PLACEMENT ── */}
      <section id="placement" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>placement</span>
          <Heading level={2}>Placement — left / right / top / bottom</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>right</strong> (default): detail panel. <strong>left</strong>:{" "}
          filter sidebar. <strong>bottom</strong>: mobile sheet, command palette.{" "}
          <strong>top</strong>: notification stack (nadir).
        </Text>
        <MockBlock caption="3 farklı placement">
          <Button onClick={() => setFilter(true)}>Sol — Filter</Button>
          <Button onClick={() => setBottom(true)}>Alt — Sheet</Button>

          <Drawer
            title="Filtreler"
            placement="left"
            open={filter}
            onClose={() => setFilter(false)}
            width={320}
          >
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Durum</label>
              <div className={styles.formField}>Açık · İşleniyor · Kapalı</div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Öncelik</label>
              <div className={styles.formField}>P1 · P2 · P3 · P4</div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Kategori</label>
              <div className={styles.formField}>Network · Donanım · Yazılım</div>
            </div>
          </Drawer>

          <Drawer
            title="Komut Paleti"
            placement="bottom"
            open={bottom}
            onClose={() => setBottom(false)}
            height={300}
          >
            <Text size="sm" color="secondary">
              Bottom drawer — mobile sheet pattern. Komut paleti, action sheet,
              quick action menu için.
            </Text>
          </Drawer>
        </MockBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size + width</span>
          <Heading level={2}>Size — default (378px) / large (736px)</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>size="large"</code> form modal alternative için (geniş alan).{" "}
          <code>width</code> ile sabit pixel ver, viewport %'si için string.
        </Text>
        <MockBlock caption="Large size — form drawer">
          <Button type="primary" onClick={() => setForm(true)}>
            Yeni Bilet Aç (large)
          </Button>
          <Drawer
            title="Yeni Bilet Aç"
            size="large"
            open={form}
            onClose={() => setForm(false)}
            footer={
              <>
                <Button onClick={() => setForm(false)}>Vazgeç</Button>
                <Button type="primary" onClick={() => setForm(false)}>
                  Bilet Aç
                </Button>
              </>
            }
          >
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Başlık</label>
              <div className={styles.formField}>Bilet başlığı...</div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Kategori</label>
              <div className={styles.formField}>Network / VPN</div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Öncelik</label>
              <div className={styles.formField}>P3 — Orta</div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Açıklama</label>
              <div className={styles.formField} style={{ minHeight: 80 }}>
                Detaylı açıklama...
              </div>
            </div>
          </Drawer>
        </MockBlock>
      </section>

      {/* ── FOOTER ── */}
      <section id="footer" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>footer</span>
          <Heading level={2}>Footer — sticky action bar</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>footer</code> sabit alt bar — submit/cancel action'ları için
          scroll'dan etkilenmez. Form drawer'larda zorunlu.
        </Text>
        <CodeBlock>{`<Drawer
  title="Yeni Bilet"
  open={open}
  onClose={onClose}
  size="large"
  footer={
    <>
      <Button onClick={onClose}>Vazgeç</Button>
      <Button type="primary" onClick={onSave}>Bilet Aç</Button>
    </>
  }
>
  <Form>...</Form>
</Drawer>`}</CodeBlock>
      </section>

      {/* ── DETAIL ── */}
      <section id="detail" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Bilet Detayı — master-detail pattern</Heading>
        </div>
        <MockBlock caption='extra slot + close — sağdan 480px'>
          <Button type="primary" onClick={() => setDetail(true)}>
            Bilet detayını aç
          </Button>
          <Drawer
            title="SC-4127"
            width={480}
            open={detail}
            onClose={() => setDetail(false)}
            extra={
              <>
                <Button size="small">Düzenle</Button>
                <Button size="small" type="primary">
                  Çözüldü
                </Button>
              </>
            }
          >
            <Heading level={5} style={{ marginTop: 0 }}>
              Print server bağlanamıyor — Muhasebe katı
            </Heading>
            <div className={styles.detailGrid} style={{ marginTop: "var(--sc-space-4)" }}>
              <span className={styles.detailLabel}>Durum</span>
              <span className={styles.detailValue}>İşleniyor</span>
              <span className={styles.detailLabel}>Öncelik</span>
              <span className={styles.detailValue}>P1 — Kritik</span>
              <span className={styles.detailLabel}>Açan</span>
              <span className={styles.detailValue}>Ahmet K.</span>
              <span className={styles.detailValue}>Mehmet K.</span>
              <span className={styles.detailLabel}>Atanan</span>
              <span className={styles.detailLabel}>Açıldı</span>
              <span className={styles.detailValue}>2026-05-28 09:42</span>
              <span className={styles.detailLabel}>SLA</span>
              <span className={styles.detailValue}>3sa 12dk kaldı</span>
            </div>
            <br />
            <Text size="sm" color="secondary">
              <strong>Açıklama:</strong> Muhasebe katındaki print server'a
              bağlanılamıyor. Tüm kullanıcılar etkileniyor.
            </Text>
          </Drawer>
        </MockBlock>
      </section>

      {/* ── NESTED ── */}
      <section id="nested" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>push (nested)</span>
          <Heading level={2}>Nested Drawer — iç içe açılım</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>push</code> ile parent drawer açıkken child drawer açılırsa
          parent yana itilir (animasyon). <strong>Nadir kullan</strong> —
          kullanıcı navigation kaybeder. Genelde tek seviye yeter.
        </Text>
        <MockBlock caption="Parent drawer içinden child drawer aç">
          <Button onClick={() => setParent(true)}>Parent aç</Button>
          <Drawer
            title="Parent Drawer"
            open={parent}
            onClose={() => setParent(false)}
            push={{ distance: 180 }}
          >
            <Text size="sm" color="secondary">
              Bu parent drawer. Aşağıdaki butona basınca child drawer açılır
              ve bu drawer 180px sola itilir.
            </Text>
            <br />
            <br />
            <Button type="primary" onClick={() => setChild(true)}>
              Child drawer aç
            </Button>
            <Drawer
              title="Child Drawer"
              open={child}
              onClose={() => setChild(false)}
            >
              <Text size="sm" color="secondary">
                Child drawer içeriği. Kapatınca parent drawer geri kayar.
              </Text>
            </Drawer>
          </Drawer>
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
          message="Hata 1 — Drawer içinde confirm modal yerine Drawer"
          description={
            <>
              Parent drawer'da "Sil" → child drawer aç → child'da "Onayla"
              chain'i. Confirm için <strong>Modal</strong> kullan (Popconfirm
              veya Modal.confirm).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Modal yerine kısa Drawer"
          description={
            <>
              Tek soru ("Silmek istediğine emin misin?") için Drawer aşırı
              yer kaplar. Modal kısa confirm için ideal.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Form drawer'da footer yok"
          description={
            <>
              Submit/Cancel button'lar body içinde scroll'la kaybolur.{" "}
              <strong>Çözüm:</strong> <code>footer</code> sabit alt bar.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Mobile'da geniş Drawer"
          description={
            <>
              Mobile'da 736px size="large" → ekranı tamamen kaplar.{" "}
              <strong>Çözüm:</strong> placement="bottom" + height (sheet
              pattern) veya size="default" ile mobile responsive.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — 3+ seviye nested drawer"
          description={
            <>
              Parent → child → grandchild zincirinde kullanıcı navigation
              kaybeder. Maks 2 seviye, ideal 1 seviye.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — loading prop'u beklemek (5.17+, yok)"
          description={
            <>
              <code>{`loading={true}`}</code> 5.17+'da geldi. 5.7'de yok.{" "}
              <strong>Çözüm:</strong> body içine kendi Skeleton/Spin'ini koy.
            </>
          }
        />
      </section>
    </main>
  );
}
