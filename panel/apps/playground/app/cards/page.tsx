"use client";

import {
  ChartBar,
  OverflowMenuVertical,
  Document,
  Add,
  TrashCan,
  Edit,
  Save,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  User,
  Renew,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Card } from "@servicecoreui/ui";
import styles from "./cards.module.css";

/* ────────────────────────────────────────────────
 * Mock helpers
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
 * Page
 * ──────────────────────────────────────────────── */

const STAT_MODULE_BODY_STYLE: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function CardsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Card</Display>
        <Text size="lg" color="secondary">
          İçerik kapsayıcısı. Dashboard widget'ı, form bölümü, liste öğesi, boş
          durum, KPI özeti — her biri bir <strong>Card</strong>. Tutarlı kenar,
          radius, padding.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#layering">Layering</a>
        <a href="#widget">Widget</a>
        <a href="#section">Form Section</a>
        <a href="#clickable">Clickable</a>
        <a href="#meta">Card.Meta</a>
        <a href="#grid">Card.Grid</a>
        <a href="#nested">Nested (inner)</a>
        <a href="#empty">Empty State</a>
        <a href="#stats">Stats</a>
        <a href="#loading">Loading</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── LAYERING ── */}
      <section id="layering" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>kural</span>
          <Heading level={2}>Layering — Kart Katmanları</Heading>
        </div>
        <Text size="md" color="secondary">
          Carbon'un layering kuralı: <strong>katmanlar arası alternasyon</strong>. Açık temada sürekli koyulaşamayız — White ↔ Gray 10 ↔ White ↔ Gray 10. Her iç katman, dış katmandan farklı bir renk almalı.
        </Text>
        <div className={styles.layerStack}>
          {/* Doğru: alternasyon */}
          <div className={`${styles.layerDemo} ${styles.layerCorrect} ${styles.layerL1}`}>
            <span className={`${styles.layerVerdict} ${styles.layerVerdictDo}`}>✓ Doğru</span>
            <span className={styles.layerLabel}>L1 — Sayfa (gray 10)</span>
            <div className={styles.layerL2}>
              <span className={styles.layerLabel}>L2 — Card (white)</span>
              <div className={styles.layerL3} style={{ marginTop: 12 }}>
                <span className={styles.layerLabel}>L3 — Inner (gray 10)</span>
                <div className={styles.layerL4} style={{ marginTop: 8 }}>
                  <span className={styles.layerLabel}>L4 — Inner-inner (white)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Yanlış: hepsi beyaz */}
          <div className={`${styles.layerDemo} ${styles.layerWrong} ${styles.layerL1}`}>
            <span className={`${styles.layerVerdict} ${styles.layerVerdictDont}`}>✗ Yanlış</span>
            <span className={styles.layerLabel}>L1 — Sayfa (gray 10)</span>
            <div className={styles.layerL2}>
              <span className={styles.layerLabel}>L2 — Card (white)</span>
              <div className={styles.layerL3} style={{ marginTop: 12 }}>
                <span className={styles.layerLabel}>L3 — Inner (white) — ayrım yok</span>
                <div className={styles.layerL4} style={{ marginTop: 8 }}>
                  <span className={styles.layerLabel}>L4 — Inner-inner (white) — yine ayrım yok</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DoDontGrid
          doItems={[
            "Body: gray 10 (--sc-color-bg-muted)",
            "Card default: beyaz (--sc-color-bg-base)",
            "Nested (type=\"inner\"): otomatik gray 10 — kural uygulanır",
            "Max 3-4 derinlik — daha fazlası hiyerarşi çöker",
          ]}
          dontItems={[
            "Body'yi beyaz bırakma — Card sınırı sadece border'la algılanır",
            "Nested kartı beyaz beyaz üstüne yığma — alternasyon şart",
            "5+ seviye derinlik — kullanıcı kaybolur",
            "Her seviyede koyulaştırma — Carbon kuralı alternasyon",
          ]}
        />
        <CodeBlock>{`/* tokens.css */
--sc-color-bg-muted: oklch(0.97 0 0);   /* L1, L3 — gray 10 */
--sc-color-bg-base: oklch(1 0 0);       /* L2, L4 — white */

/* Kullanım */
<body style={{ background: 'var(--sc-color-bg-muted)' }}>     {/* L1 */}
  <Card title="Outer">                                         {/* L2 (white) */}
    <Card type="inner" title="Inner">                          {/* L3 (gray 10) */}
      <Card type="inner" title="Deepest">...</Card>            {/* L4 (white) */}
    </Card>
  </Card>
</body>`}</CodeBlock>
      </section>

      {/* ── WIDGET ── */}
      <section id="widget" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>title + extra + body</span>
          <Heading level={2}>Widget Card</Heading>
        </div>
        <Text size="md" color="secondary">
          Dashboard'da chart, KPI listesi, son aktiviteler gibi <strong>tek bir
          veri parçasını</strong> sunan kart. Sağ üstte aksiyon menüsü (export,
          ayar, sil).
        </Text>
        <DoDontGrid
          doItems={[
            "Dashboard'da tek bir veri için (bir chart, bir liste)",
            "Başlığı sayfa-seviye değil, kart-seviye tutar (kısa: &quot;Açık Çağrılar&quot;)",
            "Sağ üstte action menüsü — kebab (⋮) veya export dropdown",
            "Veri tazeliği footer'da (örn. &quot;5 dk önce&quot;)",
          ]}
          dontItems={[
            "Birden fazla farklı widget'ı tek kart'a tıkıştırma — bölüşür",
            "Başlığı uzun cümle olarak yazma (max 3-4 kelime)",
            "Border'sız bırakma — dashboard'da kart sınırı şart",
            "Header'ı boş bırakma — başlığı olmayan widget anlamsız",
          ]}
        />
        <MockBlock caption="Dashboard widget — başlık + kebab menü + chart placeholder">
          <Card
            title="Açık Çağrılar"
            titleIcon={<ChartBar />}
            extra={
              <Button
                type="text"
                size="small"
                leadingIcon={<OverflowMenuVertical />}
                aria-label="Menü"
              />
            }
          >
            <div className={styles.chartPlaceholder}>
              <Text size="sm" color="tertiary">
                [Bar chart placeholder · 12 kategori, en yüksek 47]
              </Text>
            </div>
            <Text size="xs" color="tertiary" align="end" style={{ marginTop: 12 }}>
              5 dk önce güncellendi
            </Text>
          </Card>
        </MockBlock>
        <CodeBlock>{`<Card
  title="Açık Çağrılar"
  extra={<Button type="text" icon={<OverflowMenuVertical />} />}
>
  <Chart data={...} />
</Card>`}</CodeBlock>
      </section>

      {/* ── SECTION ── */}
      <section id="section" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>bordered + form rows</span>
          <Heading level={2}>Form Section</Heading>
        </div>
        <Text size="md" color="secondary">
          Detay sayfasında <strong>ilgili alanları gruplandıran</strong> kart.
          Ticket bilgileri, atanan kişiler, SLA, ek dosyalar — her grup ayrı
          Card.
        </Text>
        <DoDontGrid
          doItems={[
            "Detay sayfasında alanları konuya göre grupla",
            "Başlık = grubun adı (&quot;Bilgiler&quot;, &quot;Atanan Kişiler&quot;)",
            "İçinde label-value satırları, az padding",
            "Sağ üstte düzenle butonu (inline edit)",
          ]}
          dontItems={[
            "Tek bir alan için Card kullanma — bir satır yeter",
            "Form submit butonunu Card içinde tutma — footer'da olmalı",
            "Kart içine sayfanın başka bölümlerini katma",
          ]}
        />
        <MockBlock caption="Ticket detay — sol kolonda &quot;Bilgiler&quot; section card">
          <Card
            title="Bilgiler"
            extra={
              <Button type="text" size="small" leadingIcon={<Edit />}>
                Düzenle
              </Button>
            }
          >
            <div className={styles.formRow}>
              <span className={styles.formLabel}>Talep No</span>
              <span className={styles.formValue} style={{ fontFamily: "var(--sc-font-mono)" }}>
                SC-4127
              </span>
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>Durum</span>
              <span className={styles.formValue}>Beklemede</span>
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>Öncelik</span>
              <span className={styles.formValue}>Yüksek</span>
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>Kategori</span>
              <span className={styles.formValue}>Donanım · Yazıcı</span>
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>Atanan</span>
              <span className={styles.formValue}>Mehmet Demir</span>
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>SLA</span>
              <span className={styles.formValue}>4 saat içinde yanıt</span>
            </div>
          </Card>
        </MockBlock>
        <CodeBlock>{`<Card title="Bilgiler" extra={<EditButton />}>
  <FormRow label="Talep No" value="SC-4127" />
  <FormRow label="Durum" value="Beklemede" />
  ...
</Card>`}</CodeBlock>
      </section>

      {/* ── CLICKABLE ── */}
      <section id="clickable" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>clickable</span>
          <Heading level={2}>Clickable Card</Heading>
        </div>
        <Text size="md" color="secondary">
          Tüm kart bir navigasyon butonu. <strong>Asset listesi</strong>, KB
          makalesi, kullanıcı kartı gibi her birinin detayına gidilecek listeler.
        </Text>
        <DoDontGrid
          doItems={[
            "Asset envanteri, KB liste, kullanıcı kartları",
            "Card → detay sayfası 1:1 navigasyon",
            "Hover state ile tıklanabilirliği gösterir",
            "İçeride aksiyon butonu YOK (whole card click ile çelişir)",
          ]}
          dontItems={[
            "İçinde başka tıklanabilir öğe varsa kullanma (button click + card click karışır)",
            "Tek bir aksiyon için clickable yapma — onun yeri Button",
            "Hover state'i kaldırma — affordance kaybolur",
          ]}
        />
        <MockBlock caption="Asset envanteri — kart bütünüyle tıklanabilir, detaya gider">
          <div className={styles.assetGrid}>
            {[
              { name: "DELL Latitude 7420", id: "ASSET-9032", user: "Ayşe Y." },
              { name: "HP EliteBook 840 G8", id: "ASSET-9033", user: "Mehmet D." },
              { name: "Lenovo ThinkPad T14", id: "ASSET-9034", user: "Selin K." },
              { name: "MacBook Pro 14&quot; M2", id: "ASSET-9035", user: "Burak T." },
            ].map((a) => (
              <Card key={a.id} clickable size="small">
                <div className={styles.assetMeta}>
                  <span className={styles.assetName}>{a.name}</span>
                  <span className={styles.assetId}>{a.id}</span>
                </div>
                <div className={styles.assetMetaRow}>
                  <span>Atanan: {a.user}</span>
                  <ChevronRight size={14} />
                </div>
              </Card>
            ))}
          </div>
        </MockBlock>
        <CodeBlock>{`<Card clickable size="small" onClick={() => router.push(\`/assets/\${asset.id}\`)}>
  <AssetSummary asset={asset} />
</Card>`}</CodeBlock>
      </section>

      {/* ── CARD.META ── */}
      <section id="meta" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Card.Meta</span>
          <Heading level={2}>Card.Meta — Avatar + Başlık + Açıklama</Heading>
        </div>
        <Text size="md" color="secondary">
          AntD'nin layout helper'ı. <strong>Avatar/logo + title + description</strong> kalıbı için. ITSM'de kullanıcı kartı, atanan kişi, KB makale özeti için ideal.
        </Text>
        <DoDontGrid
          doItems={[
            "Kullanıcı listesi — avatar + isim + rol",
            "KB makale kartı — küçük görsel + başlık + özet",
            "Atanan kişi göstergesi — avatar + isim",
            "Asset kartı (görsel ile)",
          ]}
          dontItems={[
            "Sade liste için — Card.Meta fazla yapı katar",
            "Form section'ında (orada label-value yeter)",
            "İstatistik / KPI için — büyük rakam ortada olmalı",
          ]}
        />
        <MockBlock caption="Kullanıcı yönetimi — avatar + isim + rol">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {[
              { name: "Ayşe Yıldız", role: "Service Desk Manager", initials: "AY" },
              { name: "Mehmet Demir", role: "L2 Destek", initials: "MD" },
              { name: "Selin Kaya", role: "Network Admin", initials: "SK" },
              { name: "Burak Türk", role: "ITSM Operatör", initials: "BT" },
            ].map((u) => (
              <Card key={u.name} clickable size="small">
                <Card.Meta
                  avatar={
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--sc-radius-full)",
                        background: "var(--sc-color-accent-subtle)",
                        color: "var(--sc-color-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      {u.initials}
                    </div>
                  }
                  title={u.name}
                  description={u.role}
                />
              </Card>
            ))}
          </div>
        </MockBlock>
        <CodeBlock>{`<Card clickable size="small" onClick={() => router.push(\`/users/\${user.id}\`)}>
  <Card.Meta
    avatar={<Avatar src={user.photo} />}
    title={user.name}
    description={user.role}
  />
</Card>`}</CodeBlock>
      </section>

      {/* ── CARD.GRID ── */}
      <section id="grid" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Card.Grid</span>
          <Heading level={2}>Card.Grid — Mosaic</Heading>
        </div>
        <Text size="md" color="secondary">
          Bir Card içinde <strong>tıklanabilir hücreler</strong>. Quick-action grid, modül başlatıcı, kategori navigasyonu için. Hücreler hover'da yükselir.
        </Text>
        <DoDontGrid
          doItems={[
            "Modül seçici (Çağrı / Olay / Problem / İstek mozaiği)",
            "Quick action panel (yeni talep, yeni asset, yeni kullanıcı)",
            "Kategori navigasyonu — alt kırılım",
          ]}
          dontItems={[
            "Veri tablosu yerine — orada Table kullan",
            "Asset/Ticket listesi için (orada clickable Card daha temiz)",
            "Tek hücre için — Card.Grid amaç dışı",
          ]}
        />
        <MockBlock caption="Yeni kayıt başlatıcı — 4 tıklanabilir hücre">
          <Card title="Yeni kayıt başlat">
            <Card.Grid style={{ width: "25%", textAlign: "center" }}>
              <Add size={24} style={{ color: "var(--sc-color-accent)" }} />
              <Text size="sm" weight="medium" style={{ marginTop: 8 }}>
                Çağrı
              </Text>
            </Card.Grid>
            <Card.Grid style={{ width: "25%", textAlign: "center" }}>
              <Add size={24} style={{ color: "var(--sc-color-accent)" }} />
              <Text size="sm" weight="medium" style={{ marginTop: 8 }}>
                Olay
              </Text>
            </Card.Grid>
            <Card.Grid style={{ width: "25%", textAlign: "center" }}>
              <Add size={24} style={{ color: "var(--sc-color-accent)" }} />
              <Text size="sm" weight="medium" style={{ marginTop: 8 }}>
                Problem
              </Text>
            </Card.Grid>
            <Card.Grid style={{ width: "25%", textAlign: "center" }}>
              <Add size={24} style={{ color: "var(--sc-color-accent)" }} />
              <Text size="sm" weight="medium" style={{ marginTop: 8 }}>
                İstek
              </Text>
            </Card.Grid>
          </Card>
        </MockBlock>
        <CodeBlock>{`<Card title="Yeni kayıt başlat">
  <Card.Grid onClick={() => createTicket()}>...</Card.Grid>
  <Card.Grid onClick={() => createIncident()}>...</Card.Grid>
</Card>`}</CodeBlock>
      </section>

      {/* ── NESTED ── */}
      <section id="nested" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>type=&quot;inner&quot;</span>
          <Heading level={2}>Nested Card</Heading>
        </div>
        <Text size="md" color="secondary">
          Bir Card içinde <strong>alt bölümler gerektiğinde</strong> kullan.
          AntD'nin <code>type=&quot;inner&quot;</code> prop'u nested kart için doğru cevap. Önceliğin gerçekten section gruplama olduğunda kullan — sade alt-başlık yetiyorsa onu tercih et.
        </Text>
        <DoDontGrid
          doItems={[
            "Detay sayfasında ana Card içinde alt-segmentler (örn. SLA + Etkilenen Servisler)",
            "Form içinde mantıksal alt-gruplar",
            "Her alt-bölümün kendi başlığı ve içeriği varsa",
          ]}
          dontItems={[
            "Görsel hiyerarşi istemiyorsan — alt-başlık daha temiz",
            "İç içe 3+ seviye derinlik — kafa karışır",
            "Tek bir alt segment için — gereksiz çerçeve",
          ]}
        />
        <MockBlock caption="Change Request detay — ana kart + iç kartlar">
          <Card title="Change Request — CR-1042" extra={<Text size="xs" color="tertiary">Onay bekliyor</Text>}>
            <Card type="inner" title="Etkilenen Servisler" size="small">
              <Text size="sm">
                · Print Server (192.168.1.10)<br />
                · DHCP Service<br />
                · Active Directory
              </Text>
            </Card>
            <div style={{ height: 12 }} />
            <Card type="inner" title="Geri Alma Planı" size="small">
              <Text size="sm">
                Yedek snapshot 2026-05-10 14:30'da alındı. Rollback süresi tahmini 15 dk.
              </Text>
            </Card>
          </Card>
        </MockBlock>
        <CodeBlock>{`<Card title="Change Request">
  <Card type="inner" title="Etkilenen Servisler" size="small">
    ...
  </Card>
  <Card type="inner" title="Geri Alma Planı" size="small">
    ...
  </Card>
</Card>`}</CodeBlock>
      </section>

      {/* ── EMPTY STATE ── */}
      <section id="empty" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>empty content</span>
          <Heading level={2}>Empty State</Heading>
        </div>
        <Text size="md" color="secondary">
          Liste boş, filtre sonuç vermedi, yeni özelik kullanılmadı — Card'ın
          içinde <strong>boş durumu açıklayan</strong> görsel + CTA.
        </Text>
        <MockBlock caption="Boş tablo — dashed CTA ile yeni öğe oluşturma">
          <Card>
            <div className={styles.emptyInner}>
              <div className={styles.emptyIcon}>
                <Document size={24} />
              </div>
              <Heading level={5}>Henüz çağrı yok</Heading>
              <Text size="sm" color="secondary">
                Bu kategoride açılmış destek çağrısı bulunamadı.
              </Text>
              <Button type="dashed" leadingIcon={<Add />}>
                İlk çağrıyı oluştur
              </Button>
            </div>
          </Card>
        </MockBlock>
        <CodeBlock>{`<Card>
  <EmptyState
    icon={<Document />}
    title="Henüz çağrı yok"
    description="..."
    action={<Button type="dashed" icon={<Add />}>Oluştur</Button>}
  />
</Card>`}</CodeBlock>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>KPI</span>
          <Heading level={2}>Stats / KPI</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>Tek bir büyük rakam.</strong> Dashboard'un üstündeki KPI
          şeridi. Trend (▲▼) ve açıklama metni. İleride KPI Tile component'i
          olacak, şu an Card ile inşa.
        </Text>
        <MockBlock caption="Dashboard KPI şeridi — 4 büyük rakam">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <Card subtle size="small">
              <Text size="xs" color="tertiary">Açık Çağrı</Text>
              <div className={styles.statRow}>
                <span className={styles.statValue}>12</span>
                <span className={`${styles.statTrend} ${styles.statTrendUp}`}>
                  <ArrowUp size={14} /> +3
                </span>
              </div>
              <Text size="xs" color="tertiary">Düne göre</Text>
            </Card>
            <Card subtle size="small">
              <Text size="xs" color="tertiary">SLA Aşıldı</Text>
              <div className={styles.statRow}>
                <span className={styles.statValue}>3</span>
                <span className={`${styles.statTrend} ${styles.statTrendDown}`}>
                  <ArrowDown size={14} /> -1
                </span>
              </div>
              <Text size="xs" color="tertiary">Düne göre</Text>
            </Card>
            <Card subtle size="small">
              <Text size="xs" color="tertiary">Bekleyen Olay</Text>
              <div className={styles.statRow}>
                <span className={styles.statValue}>148</span>
              </div>
              <Text size="xs" color="tertiary">Toplam aktif</Text>
            </Card>
            <Card subtle size="small">
              <Text size="xs" color="tertiary">Bu Hafta Kapanan</Text>
              <div className={styles.statRow}>
                <span className={styles.statValue}>47</span>
                <span className={`${styles.statTrend} ${styles.statTrendUp}`}>
                  <ArrowUp size={14} /> %12
                </span>
              </div>
              <Text size="xs" color="tertiary">Geçen haftaya göre</Text>
            </Card>
          </div>
        </MockBlock>
        <Text size="sm" color="secondary">
          NOT: Bu mock şu an Card ile yapıldı. KPI Tile component'i ayrıca
          yapılacak — daha güçlü API (value, label, trend, format).
        </Text>

        <MockBlock caption="Modül ikonlu KPI — header (ikon) / body (label, flex:1) / footer (sayı + % pill). Label uzunluğu kart yüksekliğini değiştirmez.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, alignItems: "stretch" }}>
            <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
              <div className={styles.statModuleHeader}>
                <img
                  src="/ikonlar/moduller/olay-yonetimi.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.statModuleIcon}
                />
              </div>
              <div className={styles.statModuleBody}>
                <span className={styles.statModuleLabel}>Olaylar</span>
              </div>
              <div className={styles.statModuleFooter}>
                <span className={styles.statValueMono}>6</span>
                <span className={`${styles.statTrendPill} ${styles.statTrendPillUp}`}>
                  <ArrowUp size={12} /> %33
                </span>
              </div>
            </Card>
            <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
              <div className={styles.statModuleHeader}>
                <img
                  src="/ikonlar/moduller/hizmet-masasi.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.statModuleIcon}
                />
              </div>
              <div className={styles.statModuleBody}>
                <span className={styles.statModuleLabel}>Bana Atanan Açık Çağrılarım</span>
              </div>
              <div className={styles.statModuleFooter}>
                <span className={styles.statValueMono}>1</span>
                <span className={`${styles.statTrendPill} ${styles.statTrendPillDown}`}>
                  <ArrowDown size={12} /> %50
                </span>
              </div>
            </Card>
            <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
              <div className={styles.statModuleHeader}>
                <img
                  src="/ikonlar/moduller/istek-yonetimi.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.statModuleIcon}
                />
              </div>
              <div className={styles.statModuleBody}>
                <span className={styles.statModuleLabel}>Bana Atanan Açık İsteklerim</span>
              </div>
              <div className={styles.statModuleFooter}>
                <span className={styles.statValueMono}>11</span>
                <span className={`${styles.statTrendPill} ${styles.statTrendPillUp}`}>
                  <ArrowUp size={12} /> %18
                </span>
              </div>
            </Card>
            <Card subtle size="small" className={styles.statModuleCard} bodyStyle={STAT_MODULE_BODY_STYLE}>
              <div className={styles.statModuleHeader}>
                <img
                  src="/ikonlar/moduller/problem-yonetimi.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.statModuleIcon}
                />
              </div>
              <div className={styles.statModuleBody}>
                <span className={styles.statModuleLabel}>Problemler</span>
              </div>
              <div className={styles.statModuleFooter}>
                <span className={styles.statValueMono}>1</span>
                <span className={`${styles.statTrendPill} ${styles.statTrendPillFlat}`}>
                  %0
                </span>
              </div>
            </Card>
          </div>
        </MockBlock>
      </section>

      {/* ── LOADING ── */}
      <section id="loading" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>loading</span>
          <Heading level={2}>Loading</Heading>
        </div>
        <Text size="md" color="secondary">
          AntD Card'ın <strong>loading</strong> prop'u skeleton verir. Veri
          çekilirken Card'ı boş bırakma — skeleton göster.
        </Text>
        <div className={styles.subgrid}>
          <MockBlock caption="loading=true — AntD skeleton">
            <Card title="Açık Çağrılar" loading />
          </MockBlock>
          <MockBlock caption="loading=false — gerçek içerik">
            <Card title="Açık Çağrılar">
              <Text size="md">12 aktif çağrı, 3'ü SLA aşımı.</Text>
            </Card>
          </MockBlock>
        </div>
        <CodeBlock>{`<Card title="Açık Çağrılar" loading={isFetching}>
  <ChartBar data={data} />
</Card>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Aynı widget'ı iki kez koymak">
          Eski dashboard'da bunu gördük (&quot;Açık Çağrılar Yeni&quot; + &quot;Açık Çağrılar&quot;).
          Tek bir KPI için tek bir kart.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Border'sız kart">
          Dashboard'da kart sınırı şart, içerikler birbirine karışır. Form
          section dışında her Card border'lı.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Default Card'ı Card içine atmak">
          <strong>Yanlış:</strong> Card içine başka bir default Card koymak — iki ayrı çerçeve görsel kafa karıştırır.{" "}
          <strong>Doğru:</strong> Nested kart şart ise AntD'nin <code>type=&quot;inner&quot;</code> prop'unu kullan — yumuşatılmış iç-kart stili gelir. Detay için <a href="#nested" style={{ color: "var(--sc-color-accent)" }}>Nested Card bölümü</a>.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Clickable card + içeride buton">
          Tüm kart tıklanabilirse, içindeki buton çakışır. Ya kart clickable
          ya buton — ikisi birden değil.
        </AntiPattern>
      </section>
    </main>
  );
}
