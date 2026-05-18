"use client";

import Link from "next/link";
import {
  Help,
  Add,
  Chat,
  Notification as NotificationIcon,
  ArrowUp,
  Phone,
  WarningAlt,
  Idea,
  ShoppingCart,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, FloatButton } from "@servicecore/ui/wraps";
import styles from "./float-buttons.module.css";

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

export default function FloatButtonsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">FloatButton</Display>
        <Text size="lg" color="secondary">
          Sayfa düzeyinde sabit kalan, fixed-position buton. Sağ-alt köşede
          tipik kullanım: yardım, hızlı aksiyon, BackTop. Global erişim için.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Basic</a>
        <a href="#type">Type</a>
        <a href="#shape">Shape</a>
        <a href="#badge">Badge</a>
        <a href="#group">Group (Menu)</a>
        <a href="#backtop">BackTop</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>basic</span>
          <Heading level={2}>Basic</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek FloatButton, sağ-alt köşede sabit. Default Carbon{" "}
          <code>Help</code> ikonu.
        </Text>
        <div className={styles.demoFrame}>
          <div className={styles.demoContent}>
            <Heading level={4}>Sayfa içeriği</Heading>
            <p>Bu kutu bir panel sayfasını temsil ediyor.</p>
            <p>Sağ-alt köşede FloatButton sabit duruyor.</p>
          </div>
          <FloatButton tooltip="Yardım" />
        </div>
        <DoDontGrid
          doItems={[
            "Global yardım/destek erişimi",
            "Sayfa-agnostik hızlı aksiyon (yeni talep)",
            "Geri bildirim / öneri formu açma",
            "BackTop (uzun sayfalarda)",
          ]}
          dontItems={[
            "Sayfaya özel ana aksiyon — bu PageHeader'da olur",
            "Form submit — orası Button",
            "Çok sayıda FloatButton (1-2 yeter, fazlası Group olur)",
            "Mobile'da iki+ aynı anda gösterme",
          ]}
        />
      </section>

      {/* ── TYPE ── */}
      <section id="type" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>type</span>
          <Heading level={2}>Type</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>default</strong> (beyaz, ince border) — yardım, BackTop, sade fonksiyonlar.{" "}
          <strong>primary</strong> (accent mavi) — ana çağrı, dikkat çekici aksiyon.
        </Text>
        <div className={styles.subgrid}>
          <MockBlock caption='type="default" — sade'>
            <div className={styles.demoFrame}>
              <Text size="sm" color="tertiary">Yardım butonu, dikkat çekmez.</Text>
              <FloatButton icon={<Help />} tooltip="Yardım" />
            </div>
          </MockBlock>
          <MockBlock caption='type="primary" — vurgulu'>
            <div className={styles.demoFrame}>
              <Text size="sm" color="tertiary">Ana çağrı, mavi vurgulu.</Text>
              <FloatButton type="primary" icon={<Add />} tooltip="Yeni talep" />
            </div>
          </MockBlock>
        </div>
      </section>

      {/* ── SHAPE ── */}
      <section id="shape" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>shape</span>
          <Heading level={2}>Shape</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>circle</strong> (default) — sadece ikon. <strong>square</strong> —
          ikon + kısa metin (description) yan yana sığar.
        </Text>
        <div className={styles.subgrid}>
          <MockBlock caption="circle — sadece ikon">
            <div className={styles.demoFrame}>
              <Text size="sm" color="tertiary">Daire, kompakt.</Text>
              <FloatButton icon={<Chat />} tooltip="Sohbet aç" />
            </div>
          </MockBlock>
          <MockBlock caption="square + description — kısa metinle">
            <div className={styles.demoFrame}>
              <Text size="sm" color="tertiary">Kare, etiketli.</Text>
              <FloatButton
                shape="square"
                icon={<Chat />}
                description="Destek"
                tooltip="Canlı destek hattı"
              />
            </div>
          </MockBlock>
        </div>
      </section>

      {/* ── BADGE ── */}
      <section id="badge" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>badge</span>
          <Heading level={2}>Badge (Sayı/Nokta)</Heading>
        </div>
        <Text size="md" color="secondary">
          Okunmamış sayısı veya dikkat sinyali — bildirim, yeni mesaj.
        </Text>
        <div className={styles.subgrid}>
          <MockBlock caption="badge count">
            <div className={styles.demoFrame}>
              <Text size="sm" color="tertiary">3 yeni bildirim var.</Text>
              <FloatButton icon={<NotificationIcon />} badge={{ count: 3 }} tooltip="Bildirimler" />
            </div>
          </MockBlock>
          <MockBlock caption="badge dot">
            <div className={styles.demoFrame}>
              <Text size="sm" color="tertiary">Yeni mesaj sinyali.</Text>
              <FloatButton icon={<Chat />} badge={{ dot: true }} tooltip="Sohbet" />
            </div>
          </MockBlock>
        </div>
      </section>

      {/* ── GROUP ── */}
      <section id="group" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>FloatButton.Group</span>
          <Heading level={2}>Group (Menu)</Heading>
        </div>
        <Text size="md" color="secondary">
          Çoklu hızlı aksiyon. <code>trigger=&quot;click&quot;</code> veya{" "}
          <code>&quot;hover&quot;</code> ile açılır. Trigger'a hover'la / tıkla.
        </Text>
        <div className={styles.subgrid}>
          <MockBlock caption="trigger=hover">
            <div className={`${styles.demoFrame} ${styles.demoFrameTall}`}>
              <Text size="sm" color="tertiary">+ ikonuna hover'la, menüyü gör.</Text>
              <FloatButton.Group trigger="hover" tooltip="Hızlı aksiyon">
                <FloatButton icon={<Phone />} tooltip="Yeni çağrı" />
                <FloatButton icon={<WarningAlt />} tooltip="Yeni olay" />
                <FloatButton icon={<Idea />} tooltip="Yeni problem" />
                <FloatButton icon={<ShoppingCart />} tooltip="Yeni istek" />
              </FloatButton.Group>
            </div>
          </MockBlock>
          <MockBlock caption="trigger=click + type=primary">
            <div className={`${styles.demoFrame} ${styles.demoFrameTall}`}>
              <Text size="sm" color="tertiary">+ butonuna tıkla.</Text>
              <FloatButton.Group trigger="click" type="primary">
                <FloatButton icon={<Phone />} tooltip="Yeni çağrı" />
                <FloatButton icon={<WarningAlt />} tooltip="Yeni olay" />
                <FloatButton icon={<Idea />} tooltip="Yeni problem" />
              </FloatButton.Group>
            </div>
          </MockBlock>
        </div>
      </section>

      {/* ── BACKTOP ── */}
      <section id="backtop" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>FloatButton.BackTop</span>
          <Heading level={2}>BackTop</Heading>
        </div>
        <Text size="md" color="secondary">
          Sayfayı en üste kaydır. <code>visibilityHeight</code> (default 400px)
          aşıldığında görünür.
        </Text>
        <Alert
          type="info"
          showIcon
          message="Demo notu"
          description={
            <>
              BackTop sayfayı en üste kaydırır. Bu sayfanın altında aktif.{" "}
              Aşağı kaydır, sağ-altta beliren ok ikonuyla en üste dön.
            </>
          }
        />
        <CodeBlock>{`<FloatButton.BackTop visibilityHeight={400} />`}</CodeBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Panel sağ-altta: Yardım butonu (her zaman görünür)">
          <div className={styles.demoFrame}>
            <Heading level={4}>Talep listesi</Heading>
            <p style={{ fontSize: 14, color: "var(--sc-color-text-tertiary)", margin: 0 }}>
              Operatör çalışırken sıkıştığında sağ-altta yardıma erişebilir.
            </p>
            <FloatButton icon={<Help />} tooltip="Yardım & SSS" />
          </div>
        </MockBlock>

        <MockBlock caption="Hızlı kayıt grup — 4 modül için kısa yol">
          <div className={`${styles.demoFrame} ${styles.demoFrameTall}`}>
            <Heading level={4}>Ana sayfa</Heading>
            <p style={{ fontSize: 14, color: "var(--sc-color-text-tertiary)", margin: 0 }}>
              Hızlı kayıt: + ikonuna tıkla, modülü seç.
            </p>
            <FloatButton.Group trigger="click" type="primary" tooltip="Hızlı kayıt">
              <FloatButton icon={<Phone />} tooltip="Yeni çağrı" />
              <FloatButton icon={<WarningAlt />} tooltip="Yeni olay" />
              <FloatButton icon={<Idea />} tooltip="Yeni problem" />
              <FloatButton icon={<ShoppingCart />} tooltip="Yeni istek" />
            </FloatButton.Group>
          </div>
        </MockBlock>

        <MockBlock caption="Bildirim trigger — badge count ile">
          <div className={styles.demoFrame}>
            <Heading level={4}>Dashboard</Heading>
            <p style={{ fontSize: 14, color: "var(--sc-color-text-tertiary)", margin: 0 }}>
              Sağ-altta bildirim balonu. Tıklayınca açılır.
            </p>
            <FloatButton
              icon={<NotificationIcon />}
              badge={{ count: 5 }}
              tooltip="Bildirimler"
            />
          </div>
        </MockBlock>

        <CodeBlock>{`<FloatButton icon={<Help />} tooltip="Yardım" />

<FloatButton.Group trigger="click" type="primary">
  <FloatButton icon={<Phone />} tooltip="Yeni çağrı" />
  <FloatButton icon={<WarningAlt />} tooltip="Yeni olay" />
</FloatButton.Group>

<FloatButton.BackTop visibilityHeight={400} />

<FloatButton icon={<Notification />} badge={{ count: 5 }} />`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Sayfa-spesifik ana aksiyon için FloatButton">
          FloatButton <strong>global</strong> — her sayfada görünür. Sayfanın
          ana eylemini (örn. &quot;Talebi Kaydet&quot;) FloatButton yapma — orası{" "}
          <code>PageHeader</code>'daki primary Button.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Aynı anda 3+ farklı FloatButton">
          Birden fazla bağımsız FloatButton görsel kirlilik yaratır. 2'den
          fazlası gerekirse <code>FloatButton.Group</code> ile menüye topla.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Mobile'da büyük FloatButton">
          Küçük ekranda FloatButton parmakla seyrüsefere engel olabilir.
          Mobile'da sadece BackTop veya tek yardım butonu kullan.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Tooltip yok">
          İkonun ne yaptığını sadece icon'dan anlamak zor.{" "}
          <code>tooltip</code> şart — &quot;Yardım&quot;, &quot;Yeni talep&quot;,
          &quot;Bildirimler&quot;.
        </AntiPattern>

        <AntiPattern title="Hata 5 — BackTop yerine fixed scroll script">
          Sayfayı en üste kaydırmak için kendi JS yazma. AntD&apos;nin{" "}
          <code>FloatButton.BackTop</code>&apos;u animasyon + scroll handling
          dahil hazır.
        </AntiPattern>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>

      {/* Gerçek BackTop — bu sayfada aktif */}
      <FloatButton.BackTop visibilityHeight={400} />
    </main>
  );
}
