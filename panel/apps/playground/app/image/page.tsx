"use client";

import Link from "next/link";
import { Image as ImageIconCarbon } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Image } from "@servicecore/ui/wraps";
import styles from "./image.module.css";

/* ────────────────────────────────────────────────
 * Mock URLs — Placehold.co'dan basit renkli kareler.
 * ──────────────────────────────────────────────── */

const SHOT_1 = "https://placehold.co/600x400/0070F3/FFFFFF/png?text=Screenshot+1";
const SHOT_2 = "https://placehold.co/600x400/16A34A/FFFFFF/png?text=Screenshot+2";
const SHOT_3 = "https://placehold.co/600x400/F59E0B/FFFFFF/png?text=Screenshot+3";
const SHOT_4 = "https://placehold.co/600x400/EF4444/FFFFFF/png?text=Screenshot+4";
const SHOT_5 = "https://placehold.co/600x400/5856D6/FFFFFF/png?text=Screenshot+5";
const SHOT_6 = "https://placehold.co/600x400/EC4899/FFFFFF/png?text=Screenshot+6";

const FALLBACK = "https://placehold.co/200x140/EEEEEE/999999/png?text=No+Image";

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

export default function ImagePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Image</Display>
        <Text size="lg" color="secondary">
          Resim görüntüleme + preview (zoom / rotate / move). Ticket
          attachment, asset photo, KB ek görsel, server diagram, profil
          avatarı. Üretimde <code>fallback</code> ile broken image durumunu
          gizle.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Image vs img</a>
        <a href="#temel">Temel</a>
        <a href="#fallback">Fallback</a>
        <a href="#preview-off">Preview Off</a>
        <a href="#gallery">PreviewGroup</a>
        <a href="#mock">Ticket Attachments</a>
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
              <code>src</code>, <code>alt</code>, <code>width</code>,{" "}
              <code>height</code>, <code>placeholder</code>,{" "}
              <code>fallback</code>, <code>preview</code> (boolean | object),{" "}
              <code>preview.src</code>, <code>preview.scaleStep</code>,{" "}
              <code>preview.minScale</code>, <code>preview.maxScale</code>,{" "}
              <code>preview.movable</code>, <code>preview.mask</code>,{" "}
              <code>preview.visible</code> / <code>preview.onVisibleChange</code>{" "}
              (legacy), <code>preview.toolbarRender</code>,{" "}
              <code>rootClassName</code>, <code>onError</code>,{" "}
              <code>Image.PreviewGroup</code> (children pattern).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>Image.PreviewGroup items</code> prop (5.10+) — children
              pattern kullan,{" "}
              <code>preview.imageRender</code> (modern API, 5.10+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+),{" "}
              <code>focusTrap</code> (6.4+), <code>mask.closable</code> (6.4+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="preview.visible vs open — 5.7'de visible"
          description={
            <>
              <code>open</code> 5.13+'da geldi (visible'ın yenisi). 5.7'de{" "}
              <code>visible</code> + <code>onVisibleChange</code> kullan.
              Yine de runtime'da ikisi de çalışır.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>AntD Image vs HTML img / next/image</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "AntD Image: preview (zoom/rotate), fallback, gallery gerekiyor",
            "Ticket attachment, KB ek görsel, asset photo",
            "next/image: optimization gerekli sayfalar (LCP, Largest Contentful Paint)",
            "HTML img: data: URL, inline svg, animated gif",
          ]}
          dontItems={[
            "AntD Image: SEO kritik banner için (next/image optimization gerek)",
            "next/image: panel içinde preview gerekli yerde (AntD Image var)",
            "HTML img: kullanıcı yüklemiş asset (fallback handling lazım — AntD Image)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — image'a tıkla preview açılır</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>preview=true</code>. Image'a hover ile "Önizle" mask
          görünür, tıklayınca modal açılır — zoom in/out, rotate, drag, close.
        </Text>
        <MockBlock caption="Tıklayın — preview modal açılır">
          <Image
            src={SHOT_1}
            alt="Hata ekran görüntüsü"
            width={240}
            height={160}
          />
        </MockBlock>
        <CodeBlock>{`<Image
  src="/screenshot.png"
  alt="Hata ekran görüntüsü"
  width={240}
  height={160}
/>`}</CodeBlock>
      </section>

      {/* ── FALLBACK ── */}
      <section id="fallback" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>fallback</span>
          <Heading level={2}>Fallback — image yüklenemediğinde</Heading>
        </div>
        <Text size="md" color="secondary">
          User upload'ları broken olabilir; CDN düşebilir. <code>fallback</code>{" "}
          ile broken image yerine placeholder görseli — UX bozulmaz.
        </Text>
        <MockBlock caption="Broken URL — fallback devreye girer">
          <Image
            src="https://nonexistent.example/broken.png"
            alt="Bozuk URL"
            fallback={FALLBACK}
            width={200}
            height={140}
          />
        </MockBlock>
        <CodeBlock>{`<Image
  src={user.avatarUrl}            // CDN düşerse...
  fallback="/avatar-placeholder.png"  // bu görünür
  alt="Profil resmi"
/>`}</CodeBlock>
      </section>

      {/* ── PREVIEW OFF ── */}
      <section id="preview-off" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>preview={`{false}`}</span>
          <Heading level={2}>Preview Off — sadece display</Heading>
        </div>
        <Text size="md" color="secondary">
          Logo, icon, decorative görsel için preview kapat — kullanıcı
          tıklayıp modal açmasın.
        </Text>
        <MockBlock caption="preview kapalı — sadece display">
          <Image
            src={SHOT_2}
            alt="Logo"
            width={200}
            preview={false}
          />
        </MockBlock>
        <CodeBlock>{`<Image src="/logo.png" preview={false} width={200} />`}</CodeBlock>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Image.PreviewGroup</span>
          <Heading level={2}>Gallery — preview'da prev/next ile gez</Heading>
        </div>
        <Text size="md" color="secondary">
          Birden fazla image, tek preview modal'ında prev/next ok butonları
          ile gezilebilir. KB makale ek görselleri, ticket attachment'ları,
          asset gallery için ideal.{" "}
          <strong>5.7'de <code>items</code> prop YOK</strong> — children pattern
          (her image'ı PreviewGroup içine koy).
        </Text>
        <MockBlock caption="6 image gallery — tıklayın, sonra prev/next">
          <Image.PreviewGroup>
            <div className={styles.gallery}>
              <Image src={SHOT_1} alt="1" width={120} height={80} />
              <Image src={SHOT_2} alt="2" width={120} height={80} />
              <Image src={SHOT_3} alt="3" width={120} height={80} />
              <Image src={SHOT_4} alt="4" width={120} height={80} />
              <Image src={SHOT_5} alt="5" width={120} height={80} />
              <Image src={SHOT_6} alt="6" width={120} height={80} />
            </div>
          </Image.PreviewGroup>
        </MockBlock>
        <CodeBlock>{`<Image.PreviewGroup>
  {attachments.map(url => (
    <Image key={url} src={url} width={120} />
  ))}
</Image.PreviewGroup>

// 5.7'de items prop YOK — children pattern kullan:
// ❌ <Image.PreviewGroup items={urls} />  // 5.10+ only`}</CodeBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Ticket Attachments — gallery + meta</Heading>
        </div>
        <Text size="md" color="secondary">
          Bilet detay sayfasında ek dosyalar. Her thumbnail tıklanır,
          PreviewGroup ile galeride gezilebilir. Yan tarafta dosya adı +
          boyut.
        </Text>
        <MockBlock caption="Bilet SC-4127 — 3 ek görsel">
          <Image.PreviewGroup>
            <div className={styles.attachmentList}>
              <div className={styles.attachmentRow}>
                <Image src={SHOT_1} alt="Hata sayfası" width={80} height={56} />
                <div className={styles.attachmentMeta}>
                  <span className={styles.attachmentName}>hata-sayfasi.png</span>
                  <span className={styles.attachmentSize}>238 KB · 09:43</span>
                </div>
              </div>
              <div className={styles.attachmentRow}>
                <Image src={SHOT_3} alt="Log" width={80} height={56} />
                <div className={styles.attachmentMeta}>
                  <span className={styles.attachmentName}>error-log.png</span>
                  <span className={styles.attachmentSize}>412 KB · 09:45</span>
                </div>
              </div>
              <div className={styles.attachmentRow}>
                <Image src={SHOT_5} alt="Switch config" width={80} height={56} />
                <div className={styles.attachmentMeta}>
                  <span className={styles.attachmentName}>switch-config.png</span>
                  <span className={styles.attachmentSize}>88 KB · 11:01</span>
                </div>
              </div>
            </div>
          </Image.PreviewGroup>
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
          message="Hata 1 — fallback yok, broken image gözüküyor"
          description={
            <>
              User upload broken olduğunda ekranda kırık image ikonu →
              UX kötü. <strong>Çözüm:</strong> <code>fallback</code> prop'una
              placeholder URL ver.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Logo/icon için preview açık"
          description={
            <>
              Logo'ya tıklayıp preview modal'ı açmak anlamsız.{" "}
              <code>preview={`{false}`}</code> ile kapat — sadece display.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Gallery için her image kendi modal'ı"
          description={
            <>
              5 attachment, her birine tıklayınca tekil preview modal →
              prev/next yok. <strong>Çözüm:</strong>{" "}
              <code>Image.PreviewGroup</code> ile sarmala — tek modal'da
              tüm image'lar gezilebilir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — items prop'u beklemek (5.10+, yok)"
          description={
            <>
              <code>{`<Image.PreviewGroup items={urls} />`}</code> 5.10+'da
              geldi. 5.7'de children pattern kullan:
              <br />
              <code>{`<Image.PreviewGroup>{urls.map(u => <Image src={u} />)}</Image.PreviewGroup>`}</code>
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — alt yok"
          description={
            <>
              Erişilebilirlik (a11y) için <code>alt</code> her zaman ver. Screen
              reader ile gezen kullanıcı image içeriğini anlasın. "Profil
              resmi", "SC-4127 hata ekran görüntüsü" gibi.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Banner/hero için AntD Image"
          description={
            <>
              SEO kritik, LCP optimize gereken banner'lar için{" "}
              <code>next/image</code> kullan (WebP, AVIF, lazy, srcset).
              AntD Image panel içeriği için.
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
