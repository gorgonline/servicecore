"use client";

import Link from "next/link";
import {
  CheckmarkOutline,
  WarningAlt,
  Information,
  ErrorOutline,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Button, Card, Flex, Input } from "@servicecore/ui/wraps";
import styles from "./alerts.module.css";

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

export default function AlertsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Alert</Display>
        <Text size="lg" color="secondary">
          Sayfa içinde <strong>persistent</strong> uyarı / bilgi kutusu. 4 tip:
          success / info / warning / error. Banner mode sayfa üstü tam genişlik.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#types">4 Type</a>
        <a href="#description">Description</a>
        <a href="#icon">Icon</a>
        <a href="#closable">Closable</a>
        <a href="#action">Action</a>
        <a href="#banner">Banner</a>
        <a href="#vs">vs Message/Notif</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── TYPES ── */}
      <section id="types" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>type</span>
          <Heading level={2}>4 Tip</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>success</strong> (kayıt başarılı) · <strong>info</strong>{" "}
          (genel bilgi, default) · <strong>warning</strong> (dikkat) ·{" "}
          <strong>error</strong> (hata).
        </Text>
        <div className={styles.showcase}>
          <Alert type="success" message="Talep başarıyla oluşturuldu — SC-4128" />
          <Alert type="info" message="Bu modülde yeni özellikler eklendi: otomatik kategori, SLA tahmini." />
          <Alert type="warning" message="SLA süresinin %75'i kullanıldı. 1 saat 12 dakika kaldı." />
          <Alert type="error" message="Talep gönderilemedi. Bağlantınızı kontrol edin ve tekrar deneyin." />
        </div>
      </section>

      {/* ── DESCRIPTION ── */}
      <section id="description" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>description</span>
          <Heading level={2}>Description (Detay)</Heading>
        </div>
        <Text size="md" color="secondary">
          Kısa <code>message</code> + altta açıklayıcı <code>description</code>.
          Kompakt vs detaylı.
        </Text>
        <div className={styles.showcase}>
          <Alert
            type="warning"
            showIcon
            message="SLA süresi azalıyor"
            description="Bu talebin yanıt süresi 4 saat. Şu an 3 saat 5 dakika geçti. Operatör atanmazsa SLA aşımına geçecek."
          />
          <Alert
            type="error"
            showIcon
            message="3 alan geçersiz"
            description={
              <ul style={{ margin: 0, paddingInlineStart: 20 }}>
                <li>E-posta formatı hatalı</li>
                <li>Telefon 11 haneli olmalı</li>
                <li>Kategori seçilmedi</li>
              </ul>
            }
          />
        </div>
      </section>

      {/* ── ICON ── */}
      <section id="icon" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>showIcon / icon</span>
          <Heading level={2}>Icon</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>showIcon</code> ile default ikon, <code>icon</code> ile custom (Carbon).
        </Text>
        <div className={styles.showcase}>
          <Alert showIcon type="success" message="Default success ikonu" />
          <Alert showIcon type="info" message="Default info ikonu" />
          <Alert
            showIcon
            icon={<CheckmarkOutline />}
            type="success"
            message="Carbon icon — CheckmarkOutline"
          />
          <Alert
            showIcon
            icon={<WarningAlt />}
            type="warning"
            message="Carbon icon — WarningAlt"
          />
        </div>
      </section>

      {/* ── CLOSABLE ── */}
      <section id="closable" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>closable</span>
          <Heading level={2}>Closable (Kapatılabilir)</Heading>
        </div>
        <Text size="md" color="secondary">
          Kullanıcının kapatabileceği bilgi/uyarı için.
        </Text>
        <div className={styles.showcase}>
          <Alert
            type="info"
            showIcon
            closable
            message="Yeni özellik: AI talep sınıflandırma artık aktif."
          />
        </div>
      </section>

      {/* ── ACTION ── */}
      <section id="action" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>action</span>
          <Heading level={2}>Action (İnline aksiyon)</Heading>
        </div>
        <Text size="md" color="secondary">
          Alert içinde tek bir aksiyon butonu — kullanıcı uyarıya direkt yanıt versin.
        </Text>
        <div className={styles.showcase}>
          <Alert
            type="warning"
            showIcon
            message="Bağlantı yavaş, veri gecikmeli yüklenebilir."
            action={
              <Button type="default" size="small">
                Yenile
              </Button>
            }
          />
          <Alert
            type="error"
            showIcon
            message="Talep gönderilemedi"
            description="Sunucu yanıt vermedi. Birkaç saniye sonra tekrar deneyin."
            action={
              <Flex gap="small">
                <Button type="default" size="small">İptal</Button>
                <Button type="primary" size="small">Tekrar dene</Button>
              </Flex>
            }
          />
        </div>
      </section>

      {/* ── BANNER ── */}
      <section id="banner" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>banner</span>
          <Heading level={2}>Banner (Sayfa üstü)</Heading>
        </div>
        <Text size="md" color="secondary">
          Tüm sayfaya yayılan radius'suz uyarı. Genelde sistem bakım, üst-seviye duyuru.
        </Text>
        <div className={styles.bannerFrame}>
          <Alert
            banner
            type="warning"
            message={
              <>
                <strong>Planlı bakım:</strong> Bu Cumartesi 02:00 - 04:00 arası sistem
                erişilemez olacak.
              </>
            }
            closable
          />
          <div className={styles.bannerContent}>
            <Text size="sm" color="secondary">
              Sayfa içeriği buradan başlar...
            </Text>
          </div>
        </div>
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>karşılaştırma</span>
          <Heading level={2}>Alert vs Message vs Notification</Heading>
        </div>
        <div className={styles.subgrid}>
          <Alert
            type="info"
            showIcon
            message="Alert (bu component)"
            description={
              <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
                <li><strong>Persistent</strong> — sayfa içinde kalıcı</li>
                <li>Kullanıcı kapatana kadar görünür</li>
                <li>Form hataları, SLA uyarısı, sistem banner</li>
                <li>Inline action butonu olabilir</li>
              </ul>
            }
          />
          <Alert
            type="info"
            showIcon
            message="Message / Notification (ayrı bileşenler)"
            description={
              <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
                <li><strong>Message</strong> — top toast, auto-dismiss (3sn)</li>
                <li>&quot;Kaydedildi&quot;, &quot;Kopyalandı&quot; gibi hızlı feedback</li>
                <li><strong>Notification</strong> — köşe stack, persistent ya da auto</li>
                <li>&quot;Yeni mesaj geldi&quot; gibi async event'ler</li>
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

        <MockBlock caption="Form-level hata özeti — sayfanın üstünde">
          <Card title="Yeni Talep">
            <Flex vertical gap="middle">
              <Alert
                type="error"
                showIcon
                message="3 alan geçersiz"
                description={
                  <ul style={{ margin: 0, paddingInlineStart: 20 }}>
                    <li>E-posta formatı hatalı</li>
                    <li>Telefon 11 haneli olmalı</li>
                    <li>Kategori seçilmedi</li>
                  </ul>
                }
              />
              <div className={styles.formField}>
                <span className={styles.formLabel}>E-posta</span>
                <Input status="error" defaultValue="ayse@gorgo" />
                <span className={styles.formError}>Geçerli bir e-posta gir</span>
              </div>
              <div className={styles.formField}>
                <span className={styles.formLabel}>Telefon</span>
                <Input status="error" defaultValue="0555 123" />
                <span className={styles.formError}>11 haneli numara gir</span>
              </div>
            </Flex>
          </Card>
        </MockBlock>

        <MockBlock caption="SLA uyarısı — Card içinde, action ile">
          <Card title="SC-4127 — Print server bağlanamıyor">
            <Flex vertical gap="middle">
              <Alert
                type="warning"
                showIcon
                message="SLA süresi azalıyor"
                description="Yanıt için 1 saat 12 dakika kaldı. Operatör atanmazsa SLA aşımına geçecek."
                action={
                  <Button type="primary" size="small">
                    Şimdi ata
                  </Button>
                }
              />
              <Text size="sm" color="secondary">
                Talep detayı, açıklama, ekler...
              </Text>
            </Flex>
          </Card>
        </MockBlock>

        <MockBlock caption="Success — kayıt sonrası onay, action: detaya git">
          <Card>
            <Alert
              type="success"
              showIcon
              closable
              message="Talep oluşturuldu — SC-4128"
              description="Atanan kişiye bildirim gönderildi. Talep durumunu &quot;Açık&quot; sekmesinden takip edebilirsin."
              action={
                <Button type="link" size="small">
                  Detay →
                </Button>
              }
            />
          </Card>
        </MockBlock>

        <MockBlock caption="Sayfa üstü banner — sistem bakım">
          <div className={styles.bannerFrame}>
            <Alert
              banner
              type="warning"
              showIcon
              message={
                <>
                  <strong>Planlı bakım:</strong> Bu Cumartesi 02:00 - 04:00 arası sistem
                  erişilemez olacak. Detaylı bilgi için bildiriyi oku.
                </>
              }
              action={
                <Button type="link" size="small">
                  Detay
                </Button>
              }
              closable
            />
            <div className={styles.bannerContent}>
              <Heading level={4}>Ana sayfa içeriği</Heading>
              <Text size="sm" color="secondary">
                Banner sayfanın üstünde sticky kalır...
              </Text>
            </div>
          </div>
        </MockBlock>

        <CodeBlock>{`<Alert
  type="error"
  showIcon
  message="3 alan geçersiz"
  description={<ul>...</ul>}
/>

<Alert
  type="warning"
  showIcon
  message="SLA süresi azalıyor"
  action={<Button size="small">Şimdi ata</Button>}
/>

<Alert banner type="warning" showIcon closable
  message={<><strong>Planlı bakım:</strong> ...</>}
/>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — Toast yerine Alert">
          &quot;Kaydedildi&quot;, &quot;Kopyalandı&quot; gibi <strong>hızlı feedback</strong> için Alert
          kullanma — sayfada kalır gürültü olur. <code>message</code>{" "}
          (toast) bileşeni var.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Tek alan hatası için form-level Alert">
          Tek alan hatası → <code>Input status=&quot;error&quot;</code> + altında
          mesaj yeter. Form-level Alert sadece <strong>çoklu hata özeti</strong>{" "}
          için.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Banner mode iç sayfada">
          Banner sadece sayfa-seviyesinde (genelde üst). Card içinde banner
          kullanma, normal Alert kullan.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Üst üste 3+ Alert">
          Aynı sayfada çoklu Alert gürültüdür. Birleştir veya en kritik olanı tut.
          Geri kalanları toast/notification ile gönder.
        </AntiPattern>

        <AntiPattern title="Hata 5 — Action olmadan error">
          Kullanıcı hatayı görüp ne yapacağını bilmiyorsa Alert eksik.{" "}
          <code>action</code> ile &quot;Tekrar dene&quot;, &quot;Düzelt&quot; gibi bir seçenek sun.
        </AntiPattern>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
