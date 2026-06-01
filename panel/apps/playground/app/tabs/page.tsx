"use client";

import { useRef, useState } from "react";
import {
  UserAvatar,
  Chat,
  Attachment,
  Activity,
  Document,
  Edit,
  Filter,
  Add,
  Download,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Tabs } from "@servicecoreui/ui/wraps";
import type { TabsItem } from "@servicecoreui/ui/wraps";
import styles from "./tabs.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  tight,
}: {
  caption: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={`${styles.mockFrame} ${tight ? styles.mockFrameTight : ""}`}>
        {children}
      </div>
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

function PanelPlaceholder({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.panelBody}>
      <Heading level={5}>{title}</Heading>
      <Text size="sm" color="secondary">
        {body}
      </Text>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Real-world mocks
 * ──────────────────────────────────────────────── */

function TicketDetailMock() {
  const ticketTabs: TabsItem[] = [
    {
      key: "activity",
      label: (
        <span className={styles.labelWithIcon}>
          <Activity />
          Aktivite
        </span>
      ),
      children: (
        <div>
          <div className={styles.activityRow}>
            <span className={styles.activityMeta}>09:42</span>
            <span className={styles.activityDot} />
            <Text size="sm">Bilet açıldı — son kullanıcı</Text>
          </div>
          <div className={styles.activityRow}>
            <span className={styles.activityMeta}>09:58</span>
            <span className={styles.activityDot} />
            <Text size="sm">Mehmet K. atandı — Network ekibi</Text>
          </div>
          <div className={styles.activityRow}>
            <span className={styles.activityMeta}>10:14</span>
            <span className={styles.activityDot} />
            <Text size="sm">Öncelik P2 → P1 yükseltildi</Text>
          </div>
          <div className={styles.activityRow}>
            <span className={styles.activityMeta}>11:03</span>
            <span className={styles.activityDot} />
            <Text size="sm">Mehmet K. yorum ekledi</Text>
          </div>
        </div>
      ),
    },
    {
      key: "comments",
      label: (
        <span className={styles.labelWithIcon}>
          <Chat />
          Yorumlar (3)
        </span>
      ),
      children: (
        <div className={styles.commentList}>
          <div className={styles.commentItem}>
            <div className={styles.commentAvatar}>
              <UserAvatar />
            </div>
            <div className={styles.commentBody}>
              <div className={styles.commentHeader}>
                <Text size="sm" weight="semibold">
                  Mehmet K.
                </Text>
                <Text size="xs" color="tertiary">
                  11:03
                </Text>
              </div>
              <Text size="sm" color="secondary">
                Switch port'unu yeniden başlattım, link UP geldi. Kullanıcının
                bağlantısı düzeldi mi teyit istiyorum.
              </Text>
            </div>
          </div>
          <div className={styles.commentItem}>
            <div className={styles.commentAvatar}>
              <UserAvatar />
            </div>
            <div className={styles.commentBody}>
              <div className={styles.commentHeader}>
                <Text size="sm" weight="semibold">
                  Ayşe T.
                </Text>
                <Text size="xs" color="tertiary">
                  11:22
                </Text>
              </div>
              <Text size="sm" color="secondary">
                Test ettim, internet açıldı. Teşekkürler.
              </Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "attachments",
      label: (
        <span className={styles.labelWithIcon}>
          <Attachment />
          Ekler (2)
        </span>
      ),
      children: (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-2)" }}>
          <div className={styles.attachmentRow}>
            <div className={styles.attachmentIcon}>
              <Document />
            </div>
            <div className={styles.attachmentMeta}>
              <Text size="sm" weight="medium">
                switch-config.txt
              </Text>
              <Text size="xs" color="tertiary">
                4.2 KB · 11:01
              </Text>
            </div>
            <Button type="text" size="small" leadingIcon={<Download />}>
              İndir
            </Button>
          </div>
          <div className={styles.attachmentRow}>
            <div className={styles.attachmentIcon}>
              <Document />
            </div>
            <div className={styles.attachmentMeta}>
              <Text size="sm" weight="medium">
                ekran-goruntusu.png
              </Text>
              <Text size="xs" color="tertiary">
                238 KB · 09:43
              </Text>
            </div>
            <Button type="text" size="small" leadingIcon={<Download />}>
              İndir
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={styles.ticketHeader}>
        <span className={styles.ticketMeta}>SC-4127 · P1 · Network</span>
        <Heading level={4}>Print server bağlanamıyor — Muhasebe katı</Heading>
      </div>
      <Tabs defaultActiveKey="activity" items={ticketTabs} />
    </>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function TabsPage() {
  /* Editable-card demo state */
  const initialPanes: TabsItem[] = [
    { key: "1", label: "Sorgu 1", children: <PanelPlaceholder title="Sorgu 1" body="SQL ya da filtre içeriği." /> },
    { key: "2", label: "Sorgu 2", children: <PanelPlaceholder title="Sorgu 2" body="SQL ya da filtre içeriği." /> },
  ];
  const [panes, setPanes] = useState<TabsItem[]>(initialPanes);
  const [activeKey, setActiveKey] = useState<string>("1");
  const newTabIndex = useRef(3);

  const addTab = () => {
    const newKey = String(newTabIndex.current++);
    const newPanes = [
      ...panes,
      {
        key: newKey,
        label: `Sorgu ${newKey}`,
        children: <PanelPlaceholder title={`Sorgu ${newKey}`} body="Yeni sorgu için boş alan." />,
      },
    ];
    setPanes(newPanes);
    setActiveKey(newKey);
  };

  const removeTab = (targetKey: string) => {
    const targetIdx = panes.findIndex((p) => p.key === targetKey);
    const newPanes = panes.filter((p) => p.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const fallback = newPanes[targetIdx === newPanes.length ? targetIdx - 1 : targetIdx];
      if (fallback) setActiveKey(fallback.key);
    }
    setPanes(newPanes);
  };

  const onEdit: React.ComponentProps<typeof Tabs>["onEdit"] = (targetKey, action) => {
    if (action === "add") addTab();
    else if (action === "remove" && typeof targetKey === "string") removeTab(targetKey);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Tabs</Display>
        <Text size="lg" color="secondary">
          Aynı sayfa içinde <strong>peer-level</strong> içerik bölümleri arasında
          geçiş için. Ticket detay sekmeleri, asset detail, settings panel,
          dashboard görünüm filtreleri. Sayfa hiyerarşisi DEĞİL — onun yeri
          Menu/Breadcrumb.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#type">Type</a>
        <a href="#size">Size</a>
        <a href="#position">Position</a>
        <a href="#extra">Extra</a>
        <a href="#editable">Editable</a>
        <a href="#icon">Icon</a>
        <a href="#mock">Ticket Detay</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── API Notu ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>not</span>
          <Heading level={2}>API: AntD ile birebir</Heading>
        </div>
        <Alert
          type="success"
          showIcon
          message="Tüm prop'lar AntD 5.7 ile aynı"
          description={
            <>
              <code>activeKey</code>, <code>defaultActiveKey</code>,{" "}
              <code>items</code>, <code>type</code>, <code>size</code>,{" "}
              <code>tabPosition</code>, <code>centered</code>,{" "}
              <code>animated</code>, <code>hideAdd</code>,{" "}
              <code>tabBarExtraContent</code>, <code>tabBarGutter</code>,{" "}
              <code>moreIcon</code>, <code>destroyInactiveTabPane</code>,{" "}
              <code>onChange</code>, <code>onEdit</code>, <code>onTabClick</code>{" "}
              — backend AntD doc'undan ne okuduysa burada aynısı çalışır.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="items vs <Tabs.TabPane> — items'ı tercih et"
          description={
            <>
              AntD 5.7'de iki kullanım var: <code>items=[...]</code> prop'u veya{" "}
              <code>&lt;Tabs&gt;&lt;Tabs.TabPane /&gt;</code> children pattern'i.
              Modern API <code>items</code>. ServiceCore kodunda{" "}
              <strong>items'ı tercih et</strong>, dinamik liste rendering daha
              temiz olur ve <code>TabPane</code> 5.x'te deprecated yolda.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="AntD 5.7 baseline — TabItem.icon prop'u YOK"
          description={
            <>
              <code>{`{ icon: <UserAvatar /> }`}</code> AntD 5.12+'da geldi.
              5.7'de TabItem'da <code>icon</code> prop'u yok.{" "}
              <strong>Çözüm:</strong> label'ı ReactNode olarak ver, içine icon
              koy:{" "}
              <code>{`label: <><UserAvatar /> Aktivite</>`}</code>. Aşağıdaki{" "}
              <em>Icon</em> bölümünde örnek var.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel kullanım</Heading>
        </div>
        <Text size="md" color="secondary">
          En sade hâli: <code>line</code> tipinde <code>items</code> prop'u ile.
          Aktif sekme accent ink-bar ile vurgulanır.
        </Text>
        <MockBlock caption="line type — accent alt çizgi">
          <Tabs
            defaultActiveKey="detay"
            items={[
              {
                key: "detay",
                label: "Detay",
                children: <PanelPlaceholder title="Detay" body="Bilet meta bilgileri." />,
              },
              {
                key: "yorumlar",
                label: "Yorumlar",
                children: <PanelPlaceholder title="Yorumlar" body="Bilet üzerine yorumlar." />,
              },
              {
                key: "tarih",
                label: "Geçmiş",
                children: <PanelPlaceholder title="Geçmiş" body="Audit log." />,
              },
            ]}
          />
        </MockBlock>
        <CodeBlock>{`<Tabs
  defaultActiveKey="detay"
  items={[
    { key: "detay",    label: "Detay",    children: <DetayPanel /> },
    { key: "yorumlar", label: "Yorumlar", children: <YorumPanel /> },
    { key: "tarih",    label: "Geçmiş",   children: <HistoryPanel /> },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── TYPE ── */}
      <section id="type" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type</span>
          <Heading level={2}>Type — line / card / editable-card</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>"line"</code> default — sayfa içi sekme geçişi.{" "}
          <code>"card"</code> içerik kapsayıcısı varmış hissi verir.{" "}
          <code>"editable-card"</code> kullanıcı yeni tab ekleyip silebilir
          (kullanıcı sorguları, terminal sekmeleri, dashboard view'ları).
        </Text>

        <DoDontGrid
          doItems={[
            "line: master-detail sekmeler (Detay/Yorum/Geçmiş)",
            "line: dashboard view filter (Bugün/Bu Hafta/Bu Ay)",
            "card: panel içi bağımsız bölümler (Genel/Ayarlar/Üyeler)",
            "editable-card: kullanıcı kendi sorgularını/view'larını oluşturuyor",
          ]}
          dontItems={[
            "card type'ı her yerde — kalabalık olur, line yeter",
            "editable-card için kalıcı saklama mantığı yoksa — confused user",
            "Sayfa hiyerarşisi için (o Menu/Breadcrumb)",
          ]}
        />

        <MockBlock caption='type="line" — varsayılan'>
          <Tabs
            defaultActiveKey="1"
            items={[
              { key: "1", label: "Genel", children: <PanelPlaceholder title="Genel" body="..." /> },
              { key: "2", label: "Üyeler", children: <PanelPlaceholder title="Üyeler" body="..." /> },
              { key: "3", label: "Ayarlar", children: <PanelPlaceholder title="Ayarlar" body="..." /> },
            ]}
          />
        </MockBlock>

        <MockBlock caption='type="card" — aktif sekme kart şeklinde'>
          <Tabs
            type="card"
            defaultActiveKey="1"
            items={[
              { key: "1", label: "Genel", children: <PanelPlaceholder title="Genel" body="..." /> },
              { key: "2", label: "Üyeler", children: <PanelPlaceholder title="Üyeler" body="..." /> },
              { key: "3", label: "Ayarlar", children: <PanelPlaceholder title="Ayarlar" body="..." /> },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Tabs type="card" items={[...]} />`}</CodeBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — small / middle / large</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>"middle"</code> default. <code>"small"</code> sidebar veya yoğun
          panel'lerde, <code>"large"</code> hero/landing tarzı ekranlarda.
        </Text>

        <MockBlock caption='size="small"'>
          <Tabs
            size="small"
            defaultActiveKey="1"
            items={[
              { key: "1", label: "Bugün", children: <PanelPlaceholder title="Bugün" body="..." /> },
              { key: "2", label: "Bu Hafta", children: <PanelPlaceholder title="Bu Hafta" body="..." /> },
              { key: "3", label: "Bu Ay", children: <PanelPlaceholder title="Bu Ay" body="..." /> },
            ]}
          />
        </MockBlock>

        <MockBlock caption='size="large"'>
          <Tabs
            size="large"
            defaultActiveKey="1"
            items={[
              { key: "1", label: "Genel Bakış", children: <PanelPlaceholder title="Genel Bakış" body="..." /> },
              { key: "2", label: "Detaylar", children: <PanelPlaceholder title="Detaylar" body="..." /> },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── POSITION ── */}
      <section id="position" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>tabPosition</span>
          <Heading level={2}>Position — top / left / right / bottom</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>"top"</code>. <code>"left"</code> 5+ sekmeli yan-panel
          akışlarında (settings, profile). <code>"bottom"</code> ve{" "}
          <code>"right"</code> nadir kullanılır.
        </Text>

        <MockBlock caption='tabPosition="left" — settings panel'>
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            style={{ minHeight: 220 }}
            items={[
              { key: "1", label: "Hesap", children: <PanelPlaceholder title="Hesap" body="Profil bilgileri, e-posta, şifre değişikliği." /> },
              { key: "2", label: "Bildirimler", children: <PanelPlaceholder title="Bildirimler" body="E-posta ve push bildirim tercihleri." /> },
              { key: "3", label: "Erişim", children: <PanelPlaceholder title="Erişim" body="Rol ve izinler." /> },
              { key: "4", label: "Faturalama", children: <PanelPlaceholder title="Faturalama" body="Plan, ödeme yöntemleri." /> },
              { key: "5", label: "API Anahtarları", children: <PanelPlaceholder title="API Anahtarları" body="Personal access token'lar." /> },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Tabs tabPosition="left" items={[...]} />`}</CodeBlock>
      </section>

      {/* ── EXTRA CONTENT ── */}
      <section id="extra" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>tabBarExtraContent</span>
          <Heading level={2}>Extra — tab bar action area</Heading>
        </div>
        <Text size="md" color="secondary">
          Tab bar'ın sağında action button koymak için. "Yeni ekle", "Filtre",
          "Dışa aktar" gibi page-level eylemler. Solda meta/info için de
          kullanılabilir (<code>{"{ left, right }"}</code> nesne formu).
        </Text>

        <MockBlock caption="Sağda Filtre + Yeni ekle butonu">
          <Tabs
            defaultActiveKey="aktif"
            tabBarExtraContent={
              <>
                <Button type="default" size="small" leadingIcon={<Filter />}>
                  Filtre
                </Button>
                <Button type="primary" size="small" leadingIcon={<Add />}>
                  Yeni
                </Button>
              </>
            }
            items={[
              { key: "aktif", label: "Aktif (12)", children: <PanelPlaceholder title="Aktif Biletler" body="Açık olan biletler listesi." /> },
              { key: "bekleyen", label: "Bekleyen (3)", children: <PanelPlaceholder title="Bekleyen" body="Yanıt bekleyenler." /> },
              { key: "kapali", label: "Kapalı", children: <PanelPlaceholder title="Kapalı" body="Çözülmüş biletler." /> },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Tabs
  tabBarExtraContent={
    <>
      <Button leadingIcon={<Filter />}>Filtre</Button>
      <Button type="primary" leadingIcon={<Add />}>Yeni</Button>
    </>
  }
  items={[...]}
/>

// veya iki tarafa da:
<Tabs
  tabBarExtraContent={{
    left:  <span>Meta info</span>,
    right: <Button>Action</Button>,
  }}
  items={[...]}
/>`}</CodeBlock>
      </section>

      {/* ── EDITABLE ── */}
      <section id="editable" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>editable-card</span>
          <Heading level={2}>Editable Card — kullanıcı sekme ekler/siler</Heading>
        </div>
        <Text size="md" color="secondary">
          Kullanıcı çalışma alanı modellemek için. Veritabanı sorguları,
          terminal sekmeleri, dashboard view'ları, kayıtlı raporlar gibi
          senaryolarda. <code>onEdit</code> ile state'i sen yönetirsin.
        </Text>

        <MockBlock caption="Interactive — + butonuyla ekle, × ile sil">
          <Tabs
            type="editable-card"
            activeKey={activeKey}
            onChange={setActiveKey}
            onEdit={onEdit}
            items={panes}
          />
        </MockBlock>

        <CodeBlock>{`const [panes, setPanes]       = useState<TabsItem[]>(initial);
const [activeKey, setActiveKey] = useState<string>(initial[0].key);
const newIdx = useRef(initial.length + 1);

const onEdit: TabsProps["onEdit"] = (targetKey, action) => {
  if (action === "add") {
    const newKey = String(newIdx.current++);
    setPanes(p => [...p, { key: newKey, label: \`Sorgu \${newKey}\`, children: ... }]);
    setActiveKey(newKey);
  } else if (action === "remove" && typeof targetKey === "string") {
    setPanes(p => p.filter(t => t.key !== targetKey));
  }
};

<Tabs
  type="editable-card"
  activeKey={activeKey}
  onChange={setActiveKey}
  onEdit={onEdit}
  items={panes}
/>`}</CodeBlock>
      </section>

      {/* ── ICON ── */}
      <section id="icon" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>label içinde icon</span>
          <Heading level={2}>Icon — Carbon</Heading>
        </div>
        <Text size="md" color="secondary">
          AntD 5.7'de <code>TabItem.icon</code> prop'u yok (5.12+).{" "}
          <strong>Çözüm:</strong> Label'ı ReactNode olarak ver, içine inline
          Carbon icon koy. Hizalama için <code>{".labelWithIcon"}</code> gibi
          basit flex helper kullan.
        </Text>

        <MockBlock caption="Carbon ikonlu label'lar">
          <Tabs
            defaultActiveKey="activity"
            items={[
              {
                key: "activity",
                label: (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Activity /> Aktivite
                  </span>
                ),
                children: <PanelPlaceholder title="Aktivite" body="Audit log." />,
              },
              {
                key: "comments",
                label: (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Chat /> Yorumlar
                  </span>
                ),
                children: <PanelPlaceholder title="Yorumlar" body="..." />,
              },
              {
                key: "attachments",
                label: (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Attachment /> Ekler
                  </span>
                ),
                children: <PanelPlaceholder title="Ekler" body="..." />,
              },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Tabs
  defaultActiveKey="activity"
  items={[
    {
      key: "activity",
      label: <span style={{ display: "inline-flex", gap: 8 }}>
        <Activity /> Aktivite
      </span>,
      children: <ActivityPanel />,
    },
    // ...
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── REAL MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Ticket Detay — gerçek senaryo</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore'un en yoğun ekranı. Üstte ticket header, altında Aktivite
          / Yorumlar / Ekler sekmeleri. Tabs'ın <strong>tipik</strong>{" "}
          kullanımı — sayfa hiyerarşisi değil, master record'un alt görünümleri.
        </Text>
        <MockBlock caption="Ticket SC-4127 — sekmeler arası geçiş">
          <TicketDetailMock />
        </MockBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>
        <Text size="md" color="secondary">
          Eski panelde gördüğümüz hatalar — bunları yeni kodda{" "}
          <strong>tekrarlama</strong>.
        </Text>

        <Alert
          type="error"
          showIcon
          message="Hata 1 — 8+ sekme tek satıra sıkıştırmak"
          description={
            <>
              Yatayda 6'yı geçen tab okunmaz, <code>moreIcon</code> dropdown'u
              devreye girer ama kullanıcı sekmeleri göremez.{" "}
              <strong>Çözüm:</strong> içeriği parçala (alt sayfa) veya{" "}
              <code>tabPosition="left"</code>'a geç.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Sayfa hiyerarşisi için Tabs kullanmak"
          description={
            <>
              Tabs <strong>peer-level</strong> içerik içindir. Sayfa-alt sayfa
              ilişkisi için Menu (sider) + Breadcrumb kullan. Aksi halde URL'de
              sayfa state'i kaybolur, kullanıcı geri tuşunda confused olur.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Tabs içinde Tabs (nested)"
          description={
            <>
              İki seviyeli sekme kullanıcının kafasını karıştırır.{" "}
              <strong>Çözüm:</strong> ikinci seviye için <code>Radio.Group</code>{" "}
              veya <code>Segmented</code> kullan, görsel olarak farklı olsun.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Label sadece ikon, yazı yok"
          description={
            <>
              Salt ikon erişilebilirlik ve hatırlanabilirlik açısından zayıf.
              ServiceCore'da label <strong>her zaman</strong> metin içerir; icon
              opsiyonel bir görsel destektir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Önemli içerik ilk sekme dışında"
          description={
            <>
              Kullanıcı varsayılan açık sekmeyi okur; diğerlerine genelde
              tıklamaz. Asıl içerik (örn. ticket detayı) <strong>ilk sekmede</strong>{" "}
              olmalı. "Audit log" gibi nadir bakılan içerik son sırada.
            </>
          }
        />
      </section>
    </main>
  );
}
