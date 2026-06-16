"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Anchor } from "@servicecoreui/ui/wraps";
import styles from "./anchors.module.css";

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

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

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <Code block>{children}</Code>;
}

function AntiPattern({ title, children }: { title: string; children: React.ReactNode }) {
  return <Alert type="error" showIcon message={title} description={children} />;
}

/* ────────────────────────────────────────────────
 * Mock items
 * ──────────────────────────────────────────────── */

const horizontalItems = [
  { key: "h-info", href: "#h-info", title: "Bilgiler" },
  { key: "h-sla", href: "#h-sla", title: "SLA" },
  { key: "h-assignee", href: "#h-assignee", title: "Atanan" },
  { key: "h-history", href: "#h-history", title: "Geçmiş" },
  { key: "h-attachments", href: "#h-attachments", title: "Ekler" },
];

const verticalItems = [
  { key: "v-info", href: "#v-info", title: "Bilgiler" },
  { key: "v-sla", href: "#v-sla", title: "SLA" },
  { key: "v-assignee", href: "#v-assignee", title: "Atanan" },
  { key: "v-history", href: "#v-history", title: "Geçmiş" },
  { key: "v-attachments", href: "#v-attachments", title: "Ekler" },
];

const nestedItems = [
  {
    key: "n-overview",
    href: "#n-overview",
    title: "Genel Bakış",
    children: [
      { key: "n-status", href: "#n-status", title: "Durum" },
      { key: "n-priority", href: "#n-priority", title: "Öncelik" },
    ],
  },
  {
    key: "n-people",
    href: "#n-people",
    title: "İlgili Kişiler",
    children: [
      { key: "n-reporter", href: "#n-reporter", title: "Açan" },
      { key: "n-assignee", href: "#n-assignee", title: "Atanan" },
      { key: "n-watchers", href: "#n-watchers", title: "Takip Edenler" },
    ],
  },
  { key: "n-comments", href: "#n-comments", title: "Yorumlar" },
];

const listenerItems = [
  { key: "l-1", href: "#l-1", title: "Section 1" },
  { key: "l-2", href: "#l-2", title: "Section 2" },
  { key: "l-3", href: "#l-3", title: "Section 3" },
];

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function AnchorsPage() {
  const [activeLink, setActiveLink] = useState<string>("");
  const [clickLog, setClickLog] = useState<string[]>([]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Anchor</Display>
        <Text size="lg" color="secondary">
          Sayfa içi navigation — scroll spy. Uzun sayfalarda section listesi,
          aktif item highlight. <strong>vertical</strong> (sidebar TOC) veya{" "}
          <strong>horizontal</strong> (sticky top bar). AntD 5.7'de tüm temel
          özellikler mevcut, <code>replace</code> prop'u tam 5.7'de eklendi.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#horizontal">Horizontal</a>
        <a href="#vertical">Vertical</a>
        <a href="#nested">Nested</a>
        <a href="#offset">offsetTop</a>
        <a href="#bounds">bounds</a>
        <a href="#listeners">Listener'lar</a>
        <a href="#replace">replace (history)</a>
        <a href="#legacy">Legacy API</a>
        <a href="#do-dont">Ne zaman</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── HORIZONTAL ── */}
      <section id="horizontal" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>direction=&quot;horizontal&quot;</span>
          <Heading level={2}>Horizontal (Sticky Top Bar)</Heading>
        </div>
        <Text size="md" color="secondary">
          Üst sticky bar — rehber sayfalarda kullandığımız pattern. Sayfa
          scroll'larken aktif section yan border'a oturur. <strong>Not:</strong>{" "}
          horizontal mode <code>children</code> (nested) desteklemez.
        </Text>
        <div className={styles.demoFrame}>
          <Anchor direction="horizontal" items={horizontalItems} />
        </div>
      </section>

      {/* ── VERTICAL ── */}
      <section id="vertical" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>direction=&quot;vertical&quot;</span>
          <Heading level={2}>Vertical (Sidebar TOC)</Heading>
        </div>
        <Text size="md" color="secondary">
          Sol sidebar TOC. Uzun ticket detay, KB makalesi, settings sayfası için.
        </Text>
        <div className={styles.detailMock}>
          <Anchor direction="vertical" items={verticalItems} affix={false} />
          <div className={styles.detailContent}>
            <section id="v-info">
              <h3>Bilgiler</h3>
              <p>SC-4127 — Print server bağlanamıyor. Donanım kategorisi, yüksek öncelik.</p>
            </section>
            <section id="v-sla">
              <h3>SLA</h3>
              <p>Yanıt süresi 4 saat. Şu an 3 saat 5 dakika geçti, kalan 55 dakika.</p>
            </section>
            <section id="v-assignee">
              <h3>Atanan</h3>
              <p>Mehmet Demir (L2 Destek) tarafından üstleniliyor.</p>
            </section>
            <section id="v-history">
              <h3>Geçmiş</h3>
              <p>3 yorum, 2 durum değişikliği, 1 öncelik güncelleme.</p>
            </section>
            <section id="v-attachments">
              <h3>Ekler</h3>
              <p>2 ekran görüntüsü, 1 log dosyası.</p>
            </section>
          </div>
        </div>
      </section>

      {/* ── NESTED ── */}
      <section id="nested" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>children</span>
          <Heading level={2}>Nested (Hiyerarşik)</Heading>
        </div>
        <Text size="md" color="secondary">
          Section'lar grup halinde — alt-section'lar var. Sadece vertical
          mode'da çalışır.
        </Text>
        <div className={styles.detailMock}>
          <Anchor direction="vertical" items={nestedItems} affix={false} />
          <div className={styles.detailContent}>
            <section id="n-overview"><h3>Genel Bakış</h3><p>Talep özeti...</p></section>
            <section id="n-status"><h3>Durum</h3><p>Beklemede</p></section>
            <section id="n-priority"><h3>Öncelik</h3><p>Yüksek</p></section>
            <section id="n-people"><h3>İlgili Kişiler</h3><p>Talep ile ilgili tüm kullanıcılar.</p></section>
            <section id="n-reporter"><h3>Açan</h3><p>Ayşe Yıldız</p></section>
            <section id="n-assignee"><h3>Atanan</h3><p>Mehmet Demir</p></section>
            <section id="n-watchers"><h3>Takip Edenler</h3><p>3 kişi</p></section>
            <section id="n-comments"><h3>Yorumlar</h3><p>5 yorum</p></section>
          </div>
        </div>
      </section>

      {/* ── OFFSET TOP / TARGET OFFSET ── */}
      <section id="offset" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>offsetTop / targetOffset</span>
          <Heading level={2}>Sticky Header Altında — offsetTop</Heading>
        </div>
        <Text size="md" color="secondary">
          Sticky header varsa Anchor'a tıkladığında scroll target header'ın
          altına gizlenir. <code>offsetTop</code>{" "}
          (sayfa scroll position'ı için) ve <code>targetOffset</code> (scroll
          edildiğinde hedef'in nereye konumlanacağı — default <code>offsetTop</code> ile aynı) ayarla.
        </Text>
        <Alert
          type="info"
          showIcon
          message="ServiceCore panel için"
          description={
            <>
              Header 48px sticky → <code>offsetTop=&#123;48&#125;</code>.
              Scroll target ekranın ortasına gelsin →{" "}
              <code>targetOffset=&#123;window.innerHeight / 2&#125;</code>.
            </>
          }
        />
        <CodeBlock>{`<Anchor
  offsetTop={48}            // sticky header altına gizlenmesin
  targetOffset={48}         // scroll'da hedef header altında 48px başlasın
  items={items}
/>`}</CodeBlock>
      </section>

      {/* ── BOUNDS ── */}
      <section id="bounds" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>bounds</span>
          <Heading level={2}>bounds — Algılama Eşiği</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>5</code>px. Section bu eşiği geçtiğinde &quot;aktif&quot; sayılır.
          Çok küçük section'lar varsa veya scroll spy &quot;hassas&quot; davranıyorsa artır
          (örn. 50). showInkInFixed → <code>affix=&#123;false&#125;</code> modunda ink
          göstergesini açar.
        </Text>
        <CodeBlock>{`<Anchor
  bounds={50}              // 50px eşik
  affix={false}
  showInkInFixed           // affix kapalıyken bile ink göstersin
  items={items}
/>`}</CodeBlock>
      </section>

      {/* ── LISTENERS (onChange + onClick) ── */}
      <section id="listeners" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>onChange / onClick</span>
          <Heading level={2}>Listener'lar — Aktif Değişimi & Tıklama</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>onChange(currentActiveLink)</code> aktif section değiştiğinde tetiklenir
          — analytics, scroll tracking için. <code>onClick(e, link)</code> tıklamayı
          yakalar — link object: <code>{`{ title, href, key }`}</code>.
        </Text>
        <div className={styles.detailMock}>
          <Anchor
            direction="vertical"
            items={listenerItems}
            affix={false}
            onChange={(link) => setActiveLink(link)}
            onClick={(e, link) => {
              setClickLog((prev) =>
                [`Tıklandı: ${link.title} (${link.href})`, ...prev].slice(0, 5),
              );
            }}
          />
          <div className={styles.detailContent}>
            <section id="l-1"><h3>Section 1</h3><p>Bir section'a tıkla veya scroll'la</p></section>
            <section id="l-2"><h3>Section 2</h3><p>Sağdaki bilgi paneli güncellenir</p></section>
            <section id="l-3"><h3>Section 3</h3><p>onChange + onClick callback'leri görünür</p></section>
          </div>
        </div>
        <Alert
          type="info"
          showIcon
          message="Aktif link"
          description={
            <>
              <code>activeLink</code>: <strong>{activeLink || "(henüz yok)"}</strong>
              <br />
              <strong>Son tıklamalar:</strong>
              <ul style={{ margin: 4, paddingInlineStart: "var(--sc-space-4)" }}>
                {clickLog.length === 0 ? (
                  <li>(henüz yok)</li>
                ) : (
                  clickLog.map((entry, i) => <li key={i}>{entry}</li>)
                )}
              </ul>
            </>
          }
        />
      </section>

      {/* ── REPLACE (5.7+) ── */}
      <section id="replace" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>replace (5.7+)</span>
          <Heading level={2}>History Mode — push vs replace</Heading>
        </div>
        <Text size="md" color="secondary">
          Default: her tıklama tarayıcı history'sine <code>pushState</code> ekler —{" "}
          <strong>back button</strong> önceki anchor item'a döner.{" "}
          <code>replace=&#123;true&#125;</code> ise <code>replaceState</code> kullanır —{" "}
          back button bir önceki <strong>sayfaya</strong> döner, anchor değişimi
          history'ye yazılmaz. AntD 5.7'de tam eklendi.
        </Text>
        <CodeBlock>{`// Default — history.pushState (her tıklama back ile geri alınabilir)
<Anchor items={items} />

// Replace mode — back button önceki sayfaya
<Anchor replace items={items} />

// Item-level replace
<Anchor
  items={[
    { key: "1", href: "#1", title: "1", replace: true },
    { key: "2", href: "#2", title: "2" },
  ]}
/>`}</CodeBlock>
        <Alert
          type="warning"
          showIcon
          message="AntD 5.25+ :target uyarısı"
          description={
            <>
              5.25+ ile Anchor <code>window.history.pushState/replaceState</code>{" "}
              kullanıyor (önceki <code>window.location.href</code>{" "}
              değişiminden). CSS <code>:target</code> pseudo-class artık otomatik
              tetiklenmiyor. Bizim baseline 5.7 — bu uyarı şu an etkisiz, ama
              ileride AntD yükseltirsek dikkat: tam URL inşa et:{" "}
              <code>{`href = window.location.origin + window.location.pathname + "#xxx"`}</code>.
            </>
          }
        />
      </section>

      {/* ── LEGACY API ── */}
      <section id="legacy" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Anchor.Link</span>
          <Heading level={2}>Legacy API — Anchor.Link</Heading>
        </div>
        <Text size="md" color="secondary">
          Eski yöntem: Anchor.Link component'i ile children olarak ver.{" "}
          <code>items</code> prop'u 5.1+ tercih edilen yöntem.{" "}
          <strong>Backend kodunda Anchor.Link görürsen items'a geçir.</strong>
        </Text>
        <div className={styles.subgrid}>
          <Alert
            type="error"
            showIcon
            message="Eski (deprecated)"
            description={
              <CodeBlock>{`<Anchor>
  <Anchor.Link href="#info" title="Bilgiler" />
  <Anchor.Link href="#sla" title="SLA">
    <Anchor.Link href="#sla-yanit" title="Yanıt" />
  </Anchor.Link>
</Anchor>`}</CodeBlock>
            }
          />
          <Alert
            type="success"
            showIcon
            message="Modern (items)"
            description={
              <CodeBlock>{`<Anchor
  items={[
    { key: "info", href: "#info", title: "Bilgiler" },
    {
      key: "sla", href: "#sla", title: "SLA",
      children: [
        { key: "sla-yanit", href: "#sla-yanit", title: "Yanıt" },
      ],
    },
  ]}
/>`}</CodeBlock>
            }
          />
        </div>
        <Text size="sm" color="secondary">
          NOT: AntD v4.24+ Anchor functional component'e geçti — eski ref-bazlı
          method çağrıları (örn. <code>scrollTo</code>) artık çalışmaz.
        </Text>
      </section>

      {/* ── DO/DONT ── */}
      <section id="do-dont" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>kural</span>
          <Heading level={2}>Ne Zaman Kullan</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "5+ section'lı uzun sayfalar (KB makale, settings)",
            "Detay sayfaları (ticket, asset, change request)",
            "Rehber sayfalar (bu playground)",
            "Long-form içerik (raporlar, dokümantasyon)",
          ]}
          dontItems={[
            "3'ten az section için — anchor'a gerek yok",
            "Kısa sayfalarda — sayfa zaten tek ekran",
            "Modal/Drawer içinde — yer kısıtlı",
            "Mobile'da vertical anchor — sidebar yer çalar",
          ]}
        />
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Anchor yerine custom nav">
          Custom <code>{`<nav>`}</code> + scroll JS yazma. AntD Anchor scroll
          spy, smooth scroll, hash routing hazır geliyor.
        </AntiPattern>

        <AntiPattern title="Hata 2 — 15+ flat item">
          Çok sayıda section varsa hiyerarşi şart — <code>children</code> ile
          grup'la. Düz uzun liste kullanıcıyı kaybeder.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Section'a id eklemeyi unutmak">
          Anchor item <code>href=&quot;#xxx&quot;</code> der ama o id'li element
          DOM'da yoksa scroll çalışmaz. Her section'a karşılık gelen{" "}
          <code>id</code> şart.
        </AntiPattern>

        <AntiPattern title="Hata 4 — offsetTop yok, sticky header altında kalıyor">
          Sticky header varsa scroll target header'ın altına gizlenir.{" "}
          <code>offsetTop=&#123;48&#125;</code> (header yüksekliği kadar) ver.{" "}
          <strong>ServiceCore panel için 48px (header yüksekliği) standart.</strong>
        </AntiPattern>

        <AntiPattern title="Hata 5 — Horizontal mode'da nested children">
          AntD Anchor horizontal'da nested children çalışmaz. Hiyerarşi
          gerekiyorsa vertical mode kullan.
        </AntiPattern>

        <AntiPattern title="Hata 6 — Anchor.Link (deprecated) ile yeni kod yazmak">
          Backend hâlâ <code>Anchor.Link</code> children API'sını kullanıyorsa,
          yeni kodda <code>items</code> prop'una geçir. Daha okunaklı, data-driven, refactor kolay.
        </AntiPattern>

        <AntiPattern title="Hata 7 — Ref ile scrollTo çağırmak">
          AntD v4.24+ Anchor functional component oldu — internal method
          çağrıları (örn. <code>ref.current.scrollTo()</code>) çalışmaz. Native{" "}
          <code>element.scrollIntoView()</code> kullan.
        </AntiPattern>
      </section>
    </main>
  );
}
