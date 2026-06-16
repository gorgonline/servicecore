"use client";

import {
  Notification as NotificationIcon,
  Phone,
  WarningAlt,
  Idea,
  ShoppingCart,
  Help,
  Email,
  Chat,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Avatar, Badge, Card, Flex } from "@servicecoreui/ui/wraps";
import styles from "./badges.module.css";

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
 * Page
 * ──────────────────────────────────────────────── */

export default function BadgesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Badge</Display>
        <Text size="lg" color="secondary">
          Sayı veya nokta göstergesi. Başka bir element üzerine{" "}
          <strong>overlay</strong> — bell ikonu yanında bildirim, menu sayacı,
          avatar yanında online dot. Tag ile karıştırma:{" "}
          <strong>Tag = etiket, Badge = sayı/nokta</strong>.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#count">Count</a>
        <a href="#dot">Dot</a>
        <a href="#status">Status</a>
        <a href="#ribbon">Ribbon</a>
        <a href="#vs-tag">Tag vs Badge</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── COUNT ── */}
      <section id="count" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>count</span>
          <Heading level={2}>Count (Sayı)</Heading>
        </div>
        <Text size="md" color="secondary">
          Bell, sepet, mesaj gibi ikonların üstüne <strong>okunmamış sayı</strong>{" "}
          overlay. 99'u aşarsa "99+" gösterir (<code>overflowCount</code>).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basic</span>
            <div className={styles.rowItems}>
              <Badge count={5}>
                <span className={styles.demoBox}>
                  <NotificationIcon size={20} />
                </span>
              </Badge>
              <Badge count={12}>
                <span className={styles.demoBox}>
                  <Email size={20} />
                </span>
              </Badge>
              <Badge count={148}>
                <span className={styles.demoBox}>
                  <Chat size={20} />
                </span>
              </Badge>
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>overflow 99+</span>
            <div className={styles.rowItems}>
              <Badge count={250}>
                <span className={styles.demoBox}>
                  <NotificationIcon size={20} />
                </span>
              </Badge>
              <Badge count={1500} overflowCount={999}>
                <span className={styles.demoBox}>
                  <Email size={20} />
                </span>
              </Badge>
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>showZero</span>
            <div className={styles.rowItems}>
              <Badge count={0}>
                <span className={styles.demoBox}>
                  <NotificationIcon size={20} />
                </span>
              </Badge>
              <Text size="xs" color="tertiary">(gizli — count=0)</Text>
              <Badge count={0} showZero>
                <span className={styles.demoBox}>
                  <NotificationIcon size={20} />
                </span>
              </Badge>
              <Text size="xs" color="tertiary">(showZero=true ile görünür)</Text>
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>standalone</span>
            <div className={styles.rowItems}>
              <Badge count={5} />
              <Badge count={47} />
              <Badge count={148} />
              <Text size="xs" color="tertiary">(children'sız — pill olarak)</Text>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOT ── */}
      <section id="dot" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>dot</span>
          <Heading level={2}>Dot (Nokta)</Heading>
        </div>
        <Text size="md" color="secondary">
          Sayı önemli değilse — sadece "bir şey var" sinyali. Bildirim varlığı,
          okunmamış işaret, yeni mesaj.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>dot</span>
            <div className={styles.rowItems}>
              <Badge dot>
                <span className={styles.demoBox}>
                  <NotificationIcon size={20} />
                </span>
              </Badge>
              <Badge dot>
                <Avatar size="small">AY</Avatar>
              </Badge>
              <Badge dot>
                <span className={styles.demoBox}>
                  <Email size={20} />
                </span>
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>status</span>
          <Heading level={2}>Status (Standalone)</Heading>
        </div>
        <Text size="md" color="secondary">
          Children'sız — sade renkli nokta + metin. Status indicator için
          (online, processing, açık ticket sayısı yanında, vs.).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>5 status</span>
            <div className={styles.rowItems}>
              <Badge status="success" text="Online" />
              <Badge status="processing" text="İşleniyor" />
              <Badge status="warning" text="Beklemede" />
              <Badge status="error" text="Hata" />
              <Badge status="default" text="Offline" />
            </div>
          </div>
        </div>
      </section>

      {/* ── RIBBON ── */}
      <section id="ribbon" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Badge.Ribbon</span>
          <Heading level={2}>Ribbon (Köşe Etiketi)</Heading>
        </div>
        <Text size="md" color="secondary">
          Card'ın sağ-üst köşesinde "Yeni", "Beta", "Önemli" gibi kısa etiketler.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.rowItems}>
            <Badge.Ribbon text="Yeni">
              <Card title="AI Talep Sınıflandırma" size="small">
                <Text size="sm" color="secondary">
                  Talepleri otomatik kategorilere ayır.
                </Text>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Beta" color="orange">
              <Card title="Otomatik Yönlendirme" size="small">
                <Text size="sm" color="secondary">
                  Operatör müsaitliğine göre dağıt.
                </Text>
              </Card>
            </Badge.Ribbon>
          </div>
        </div>
      </section>

      {/* ── VS TAG ── */}
      <section id="vs-tag" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>karşılaştırma</span>
          <Heading level={2}>Tag vs Badge — Karıştırma</Heading>
        </div>
        <Text size="md" color="secondary">
          Bu iki bileşen sıkça karıştırılır. Net fark:
        </Text>
        <div className={styles.subgrid}>
          <Alert
            type="success"
            showIcon
            message="Badge — sayı/nokta"
            description={
              <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
                <li>Başka bir element üstüne <strong>overlay</strong></li>
                <li>Bildirim sayısı: <code>{"<Badge count={5}>"}</code></li>
                <li>Sade nokta: <code>{"<Badge dot>"}</code></li>
                <li>Standalone: <code>{"<Badge status=... text=... />"}</code></li>
              </ul>
            }
          />
          <Alert
            type="info"
            showIcon
            message="Tag — etiket/kategori"
            description={
              <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
                <li><strong>Inline</strong> — kendi başına bir chip</li>
                <li>Statü adı: <code>{"<Tag tone='warning'>Beklemede</Tag>"}</code></li>
                <li>Kategori: <code>{"<Tag>Donanım · Yazıcı</Tag>"}</code></li>
                <li>Filtre chip'i: <code>{"<Tag closable>Durum: Açık</Tag>"}</code></li>
              </ul>
            }
          />
        </div>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Header bell — okunmamış bildirim sayısı (count)">
          <div className={styles.headerUtility}>
            <Badge count={3}>
              <button className={styles.iconBtn} aria-label="Bildirimler">
                <NotificationIcon size={18} />
              </button>
            </Badge>
            <Badge dot>
              <button className={styles.iconBtn} aria-label="Mesajlar">
                <Email size={18} />
              </button>
            </Badge>
            <button className={styles.iconBtn} aria-label="Yardım">
              <Help size={18} />
            </button>
          </div>
        </MockBlock>

        <MockBlock caption="Sidebar menü — modül sayaçları (count badge ile gerçek)">
          <Card>
            <Flex vertical gap="small">
              <div className={styles.menuItem}>
                <Phone size={18} />
                <span className={styles.menuLabel}>Çağrı</span>
                <Badge count={12} />
              </div>
              <div className={`${styles.menuItem} ${styles.menuItemActive}`}>
                <WarningAlt size={18} />
                <span className={styles.menuLabel}>Olay</span>
                <Badge count={148} overflowCount={99} />
              </div>
              <div className={styles.menuItem}>
                <Idea size={18} />
                <span className={styles.menuLabel}>Problem</span>
                <Badge count={3} />
              </div>
              <div className={styles.menuItem}>
                <ShoppingCart size={18} />
                <span className={styles.menuLabel}>İstek</span>
              </div>
            </Flex>
          </Card>
        </MockBlock>

        <MockBlock caption="Tab başlık + sayı — count yerine inline text (sade)">
          <Card>
            <div className={styles.tabBar}>
              <div className={`${styles.tab} ${styles.tabActive}`}>
                Açık Çağrılar
                <span className={styles.tabCount}>12</span>
              </div>
              <div className={styles.tab}>
                Beklemede
                <span className={styles.tabCount}>3</span>
              </div>
              <div className={styles.tab}>
                Çözüldü
                <span className={styles.tabCount}>47</span>
              </div>
            </div>
            <Text size="sm" color="tertiary" style={{ marginTop: 12 }}>
              NOT: Tab'larda <strong>Badge count overlay</strong> yerine sade
              metin daha temiz. Badge bell gibi ikonlarda işe yarar.
            </Text>
          </Card>
        </MockBlock>

        <MockBlock caption="Avatar + online dot — kullanıcı status'u">
          <Card>
            <Flex gap="large" align="center">
              <Flex align="center" gap="small">
                <Badge dot status="success">
                  <Avatar>AY</Avatar>
                </Badge>
                <Text size="sm">Ayşe (online)</Text>
              </Flex>
              <Flex align="center" gap="small">
                <Badge dot status="warning">
                  <Avatar tone="neutral">MD</Avatar>
                </Badge>
                <Text size="sm">Mehmet (boşta)</Text>
              </Flex>
              <Flex align="center" gap="small">
                <Avatar tone="neutral">SK</Avatar>
                <Text size="sm">Selin (offline)</Text>
              </Flex>
            </Flex>
          </Card>
        </MockBlock>

        <MockBlock caption="Card ribbon — yeni özellik / beta vurgusu">
          <Flex gap="middle" wrap>
            <Badge.Ribbon text="Yeni">
              <Card title="AI Talep Sınıflandırma" size="small" style={{ width: 280 }}>
                <Text size="sm" color="secondary">
                  Gelen talepleri otomatik sınıflandır, doğru ekibe yönlendir.
                </Text>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Beta" color="orange">
              <Card title="Otomatik Yönlendirme" size="small" style={{ width: 280 }}>
                <Text size="sm" color="secondary">
                  Operatör müsaitliğine göre dağıtım kuralı.
                </Text>
              </Card>
            </Badge.Ribbon>
          </Flex>
        </MockBlock>

        <CodeBlock>{`<Badge count={3}><Bell /></Badge>
<Badge count={250} overflowCount={99}><Mail /></Badge>
<Badge dot><Avatar>AY</Avatar></Badge>
<Badge status="success" text="Online" />
<Badge.Ribbon text="Yeni">
  <Card title="..." />
</Badge.Ribbon>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Tag yerine Badge">
          &quot;Açık&quot;, &quot;Beklemede&quot;, &quot;Çözüldü&quot; gibi statü <strong>etiket</strong> için
          Tag kullan. Badge sadece <strong>sayı veya nokta</strong>.
        </AntiPattern>

        <AntiPattern title="Hata 2 — overflowCount yok">
          <code>{"<Badge count={1500}>"}</code> → &quot;1500&quot; görünür, çirkin.{" "}
          <code>overflowCount=&#123;99&#125;</code> ile &quot;99+&quot; göster.
        </AntiPattern>

        <AntiPattern title="Hata 3 — count=0 görünür bırakma">
          Default <code>count=0</code> gizli. <code>showZero</code> aktif etme
          — &quot;0 bildirim&quot; göstermek gereksiz gürültü.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Her ikona Badge">
          Header'da her utility ikona Badge koyma — 5 tane kırmızı nokta gürültüdür.
          Sadece <strong>action gerektiren</strong> bildirimler için (bell, mesaj).
        </AntiPattern>

        <AntiPattern title="Hata 5 — Tab'da count overlay">
          Tab başlığında Badge count <strong>overlay</strong> kullanma —
          &quot;Açık Çağrılar <em>12</em>&quot; gibi inline metin daha sade.
        </AntiPattern>
      </section>
    </main>
  );
}
