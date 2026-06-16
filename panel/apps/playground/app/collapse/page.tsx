"use client";

import { Settings, Information } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Collapse } from "@servicecoreui/ui/wraps";
import type { CollapseItem } from "@servicecoreui/ui/wraps";
import styles from "./collapse.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  pad,
}: {
  caption: string;
  children: React.ReactNode;
  pad?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={`${styles.mockFrame} ${pad ? styles.mockFramePad : ""}`}>{children}</div>
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

export default function CollapsePage() {
  const faq: CollapseItem[] = [
    {
      key: "1",
      label: "ServiceCore'a nasıl kayıt olunur?",
      children: (
        <p className={styles.panelText}>
          Demo talep formunu doldurun, satış ekibi 24 saat içinde demo URL'ini
          gönderir. Kurulum 5 dakika sürer; SSO entegrasyonu opsiyoneldir.
        </p>
      ),
    },
    {
      key: "2",
      label: "Hangi entegrasyonlar var?",
      children: (
        <ul className={styles.panelList}>
          <li>Slack, MS Teams</li>
          <li>Jira, GitHub, GitLab</li>
          <li>Active Directory / Azure AD (SSO + SCIM)</li>
          <li>Zapier, n8n webhook'ları</li>
        </ul>
      ),
    },
    {
      key: "3",
      label: "SLA garantisi nedir?",
      children: (
        <p className={styles.panelText}>
          Enterprise planda %99.9 uptime garantisi. Aylık downtime 43 dakikayı
          geçerse pro-rata credit verilir.
        </p>
      ),
    },
    {
      key: "4",
      label: "Veri nerede tutuluyor?",
      children: (
        <p className={styles.panelText}>
          AWS Frankfurt (eu-central-1). KVKK + GDPR uyumlu. On-premise için
          satış ekibiyle iletişime geç.
        </p>
      ),
    },
  ];

  const ticketSections: CollapseItem[] = [
    {
      key: "info",
      label: "Bilet bilgileri",
      extra: <span className={styles.extraCount}>SC-4127</span>,
      children: (
        <p className={styles.panelText}>
          <strong>Açıldı:</strong> 09:42 · <strong>Atanan:</strong> Mehmet K. ·{" "}
          <strong>Öncelik:</strong> P1 · <strong>Kategori:</strong> Network/VPN
        </p>
      ),
    },
    {
      key: "comments",
      label: "Yorumlar",
      extra: <span className={styles.extraCount}>3</span>,
      children: (
        <p className={styles.panelText}>
          Switch port'u yeniden başlatıldı, link UP. Test bekleniyor.
        </p>
      ),
    },
    {
      key: "history",
      label: "Geçmiş",
      extra: (
        <span className={styles.extraBadge}>
          <Information size={12} />&nbsp;SLA aşıldı
        </span>
      ),
      children: (
        <p className={styles.panelText}>
          09:42 açıldı → 09:58 atandı → 10:14 P2→P1 → 11:03 yorum → 11:22 test
        </p>
      ),
    },
  ];

  const settingsSections: CollapseItem[] = [
    {
      key: "notifications",
      label: "Bildirimler",
      children: (
        <p className={styles.panelText}>
          E-posta, push ve SMS bildirim tercihlerini buradan yönet. Bilet
          atama, yorum, SLA uyarıları için ayrı toggle.
        </p>
      ),
    },
    {
      key: "security",
      label: "Güvenlik",
      children: (
        <p className={styles.panelText}>
          Şifre, 2FA, oturum yönetimi, son giriş geçmişi. SSO etkin ise
          şifre alanı disabled.
        </p>
      ),
    },
    {
      key: "integrations",
      label: "Entegrasyonlar",
      children: (
        <p className={styles.panelText}>
          Slack, Teams, Jira webhook'ları. Token rotation 90 gün hatırlatma.
        </p>
      ),
    },
    {
      key: "danger",
      label: "Tehlikeli alan",
      children: (
        <p className={styles.panelText}>
          Hesap kapatma, veri ihracı, hesap silme. Confirmation modal'ları
          tetiklenir.
        </p>
      ),
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Collapse</Display>
        <Text size="lg" color="secondary">
          Açılır panel / accordion. FAQ, settings sections, advanced filters,
          ticket detail collapsible sections. Uzun içeriği gizleyip kullanıcının
          ihtiyaca göre genişletmesini sağlar.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#accordion">Accordion</a>
        <a href="#extra">Extra</a>
        <a href="#ghost">Ghost</a>
        <a href="#size">Size</a>
        <a href="#collapsible">Collapsible</a>
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
              <code>accordion</code>, <code>activeKey</code>,{" "}
              <code>defaultActiveKey</code>, <code>bordered</code>,{" "}
              <code>collapsible</code> (header/icon/disabled — 4.9+),{" "}
              <code>ghost</code> (4.4+), <code>size</code> (small/middle/large —
              5.2+), <code>expandIcon</code>, <code>expandIconPosition</code>{" "}
              (start/end), <code>items</code> (modern API — 5.6+),{" "}
              <code>destroyInactivePanel</code>, <code>onChange</code>.
              <br />
              <strong>Item:</strong> <code>key</code>, <code>label</code>,{" "}
              <code>children</code>, <code>extra</code>, <code>showArrow</code>,{" "}
              <code>forceRender</code>, <code>collapsible</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>destroyOnHidden</code> (5.25+) —{" "}
              <code>destroyInactivePanel</code> kullan (deprecated ama çalışır),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="items vs Collapse.Panel — items'ı tercih et"
          description={
            <>
              <strong>items</strong> 5.6+ modern API — JSX temiz, dinamik liste
              kolay, perf iyi. <strong>Collapse.Panel</strong> children pattern
              hâlâ destekli ama deprecated yolda.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="collapsible — header tıklamaya alternatif"
          description={
            <>
              Default <strong>"header"</strong> (tüm header tıklanır).{" "}
              <strong>"icon"</strong>: sadece chevron — header'da link/buton
              kullanmak istiyorsan. <strong>"disabled"</strong>: tıklanamaz.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic · items</span>
          <Heading level={2}>Temel — items modern API</Heading>
        </div>
        <Text size="md" color="secondary">
          FAQ tarzı klasik kullanım. Birden fazla panel aynı anda açılabilir.
        </Text>
        <MockBlock caption="FAQ — 4 soru, default ilki açık">
          <Collapse defaultActiveKey={["1"]} items={faq} />
        </MockBlock>
        <CodeBlock>{`<Collapse
  defaultActiveKey={["1"]}
  items={[
    { key: "1", label: "Soru 1?", children: <p>Cevap...</p> },
    { key: "2", label: "Soru 2?", children: <p>Cevap...</p> },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── ACCORDION ── */}
      <section id="accordion" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>accordion</span>
          <Heading level={2}>Accordion — tek panel açık</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>accordion</code> ile sadece bir panel açık kalabilir, yenisi
          tıklanınca eski kapanır. Settings, step-by-step wizard alternatifi
          için uygun.
        </Text>
        <MockBlock caption="Sadece bir panel açık">
          <Collapse accordion items={faq} defaultActiveKey={["1"]} />
        </MockBlock>
      </section>

      {/* ── EXTRA ── */}
      <section id="extra" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>extra</span>
          <Heading level={2}>Extra — header'da badge / sayaç</Heading>
        </div>
        <Text size="md" color="secondary">
          Header'ın sağında ek slot. Sayaç (3 yorum), badge (SLA aşıldı),
          buton koymak için. Açıklayıcı meta gösterir, kullanıcı panel'i
          açmadan durumu görür.
        </Text>
        <MockBlock caption="Ticket sections — sayaç + warning badge">
          <Collapse items={ticketSections} defaultActiveKey={["info"]} />
        </MockBlock>
        <CodeBlock>{`<Collapse
  items={[
    {
      key: "comments",
      label: "Yorumlar",
      extra: <Badge count={3} />,
      children: <CommentList />,
    },
    {
      key: "history",
      label: "Geçmiş",
      extra: <Tag color="warning">SLA aşıldı</Tag>,
      children: <Timeline />,
    },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── GHOST ── */}
      <section id="ghost" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ghost</span>
          <Heading level={2}>Ghost — borderless settings stili</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>ghost</code> ile container border kaldırılır, header bg
          transparent. Settings page'leri için tipik — sayfa zaten kart
          içinde, ekstra border görsel gürültü yapar.
        </Text>
        <MockBlock pad caption='ghost={true}'>
          <Collapse ghost items={settingsSections} defaultActiveKey={["notifications"]} />
        </MockBlock>
        <CodeBlock>{`<Collapse ghost items={settingsSections} />`}</CodeBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — small / middle / large</Heading>
        </div>
        <MockBlock caption='size="small"'>
          <Collapse size="small" items={faq.slice(0, 2)} />
        </MockBlock>
        <MockBlock caption='size="large"'>
          <Collapse size="large" items={faq.slice(0, 2)} />
        </MockBlock>
      </section>

      {/* ── COLLAPSIBLE ── */}
      <section id="collapsible" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>collapsible</span>
          <Heading level={2}>Collapsible — tıklama davranışı</Heading>
        </div>
        <Text size="md" color="secondary">
          Header'a link/buton koymak istiyorsan <code>collapsible="icon"</code>{" "}
          — sadece chevron tıklanır, header text'ine click event'ler atayabilirsin.
        </Text>
        <MockBlock caption='collapsible="icon" — sadece chevron tıklanır'>
          <Collapse
            collapsible="icon"
            items={[
              {
                key: "1",
                label: "Header tıklanmaz, sadece sağdaki chevron",
                children: <p className={styles.panelText}>İçerik...</p>,
              },
              {
                key: "2",
                label: "Bu da tıklanmaz",
                children: <p className={styles.panelText}>İçerik...</p>,
              },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Settings Panel — ghost + section'lar</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "FAQ — uzun cevaplar, accordion",
            "Settings page section'ları (ghost mode)",
            "Ticket detail collapsible (info/comments/history)",
            "Advanced filters (sık kullanılmayan filter'ları gizle)",
          ]}
          dontItems={[
            "Ana içerik için (kullanıcı tıklamadan göremez → SEO/UX kötü)",
            "Mobile'da çok katmanlı nested collapse",
            "Tek panel için (gereksiz — direkt göster)",
            "Critical info'yu collapse içine gizlemek",
          ]}
        />
        <MockBlock pad caption="Settings page — ghost mode, 4 section">
          <Collapse ghost items={settingsSections} />
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
          message="Hata 1 — Ana içerik için Collapse"
          description={
            <>
              Kullanıcı tıklamadan göremez → SEO kötü, ilk-bakış UX kötü. Ana
              içeriği aç göster, Collapse'i destekleyici detay/yardım için
              kullan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Tek item için Collapse"
          description={
            <>
              Tek panel açılır/kapanır — gereksiz UI. <strong>Çözüm:</strong>{" "}
              içeriği direkt göster veya "Detayı Göster/Gizle" link butonu.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — extra'ya tıklayınca panel açılıyor"
          description={
            <>
              <code>extra</code> içine button koyup tıklayınca panel da
              açılırsa kullanıcı confused. <strong>Çözüm:</strong>{" "}
              <code>collapsible="icon"</code> — header tıklanmaz, sadece
              chevron; button kendi event'ini fire eder.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Form içinde forceRender'sız Collapse"
          description={
            <>
              Form alanları Collapse içinde, panel kapalıyken DOM'da değil →
              form submit'te o alanlar undefined. <strong>Çözüm:</strong>{" "}
              <code>forceRender={`{true}`}</code> ile DOM'da tut.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Nested collapse 3+ seviye"
          description={
            <>
              Kullanıcı kaybolur, hiyerarşi takip edilmez. Maks 2 seviye, daha
              fazlası için Tree veya sidebar nav.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — destroyOnHidden beklemek (5.25+)"
          description={
            <>
              5.7'de <code>destroyOnHidden</code> yok.{" "}
              <code>destroyInactivePanel</code> kullan (legacy ama çalışır).
            </>
          }
        />
      </section>
    </main>
  );
}
