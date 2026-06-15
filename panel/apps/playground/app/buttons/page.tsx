"use client";

import {
  Add,
  ArrowRight,
  Save,
  TrashCan,
  Edit,
  CheckmarkOutline,
  Filter,
  Document,
  Download,
  Settings,
  WarningAlt,
  ChevronRight,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button } from "@servicecoreui/ui";
import styles from "./buttons.module.css";

/* ────────────────────────────────────────────────
 * Mock visual building blocks (sayfa-içi)
 * ──────────────────────────────────────────────── */

function TicketHeaderMock() {
  return (
    <div className={styles.mockFrame}>
      <div className={styles.ticketHeader}>
        <div className={styles.ticketHeaderTop}>
          <div className={styles.ticketHeaderMeta}>
            <span className={styles.ticketHeaderId}>SC-4127</span>
            <Heading level={4}>Print server bağlanamıyor — Muhasebe katı</Heading>
          </div>
          <div className={styles.ticketHeaderActions}>
            <Button type="default" leadingIcon={<Edit />}>Düzenle</Button>
            <Button type="primary" leadingIcon={<CheckmarkOutline />}>
              Çözüldü Olarak İşaretle
            </Button>
          </div>
        </div>
        <div className={styles.ticketHeaderTags}>
          <span className={styles.statusChip}>Beklemede</span>
          <Text size="xs" color="tertiary">
            Açıldı: 2 saat önce · SLA: 4 saat içinde yanıt
          </Text>
        </div>
      </div>
    </div>
  );
}

function ModalMock() {
  return (
    <div className={styles.mockFrame}>
      <div className={styles.modal}>
        <div className={styles.modalBody}>
          <Heading level={5}>Değişikliği onayla</Heading>
          <Text size="sm" color="secondary">
            Bu change request 3 sunucuyu etkileyecek. Devam etmek istediğinizden
            emin misiniz?
          </Text>
        </div>
        <div className={styles.modalFooter}>
          <Button type="default">Vazgeç</Button>
          <Button type="primary">Onayla ve Uygula</Button>
        </div>
      </div>
    </div>
  );
}

function AssetTableMock() {
  return (
    <div className={styles.mockFrame}>
      <div className={styles.assetTable}>
        <div className={`${styles.assetRow} ${styles.assetRowHeader}`}>
          <span>Asset</span>
          <span>İşlem</span>
        </div>
        {[
          { name: "DELL-LAT-7420", id: "ASSET-9032" },
          { name: "HP-EliteBook-840", id: "ASSET-9033" },
          { name: "Lenovo-T14-G3", id: "ASSET-9034" },
        ].map((a) => (
          <div key={a.id} className={styles.assetRow}>
            <div className={styles.assetMeta}>
              <span className={styles.assetName}>{a.name}</span>
              <span className={styles.assetId}>{a.id}</span>
            </div>
            <div className={styles.assetRowActions}>
              <Button type="text" size="small" leadingIcon={<Edit />}>
                Düzenle
              </Button>
              <Button type="text" size="small" leadingIcon={<Document />}>
                Detay
              </Button>
              <Button
                type="text"
                size="small"
                danger
                leadingIcon={<TrashCan />}
                aria-label="Sil"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyStateMock() {
  return (
    <div className={styles.mockFrame}>
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <Document size={24} />
        </div>
        <Heading level={5}>Henüz talep yok</Heading>
        <Text size="sm" color="secondary">
          Bu kategoride açılmış bir destek talebi bulunamadı.
        </Text>
        <Button type="dashed" leadingIcon={<Add />}>
          İlk talebi oluştur
        </Button>
      </div>
    </div>
  );
}

function FormFooterMock() {
  return (
    <div className={styles.mockFrame}>
      <div className={styles.formFooter}>
        <div className={styles.formFooterLeft}>
          <Button type="text" danger leadingIcon={<TrashCan />}>
            Taslağı sil
          </Button>
        </div>
        <div className={styles.formFooterRight}>
          <Button type="default">Vazgeç</Button>
          <Button type="default" leadingIcon={<Save />}>Taslak kaydet</Button>
          <Button type="primary" leadingIcon={<CheckmarkOutline />}>
            Talebi Aç
          </Button>
        </div>
      </div>
    </div>
  );
}

function KbCardMock() {
  return (
    <div className={styles.mockFrame}>
      <div className={styles.kbCard}>
        <Eyebrow tone="secondary">Bilgi Tabanı</Eyebrow>
        <Heading level={5}>Yeni kullanıcı eklerken AD entegrasyonu</Heading>
        <Text size="sm" color="secondary">
          Active Directory bağlantısı kuruluyken kullanıcı oluşturma adımları.
          Bu makale 5 adımdan oluşur ve ortalama 3 dakika sürer.
        </Text>
        <div>
          <Button type="link" trailingIcon={<ChevronRight />}>
            Makaleyi oku
          </Button>
        </div>
      </div>
    </div>
  );
}

function DangerAlertMock() {
  return (
    <div className={styles.mockFrame}>
      <div className={styles.modal}>
        <div className={styles.modalBody}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sc-space-2)" }}>
            <WarningAlt color="var(--sc-color-state-danger-fg)" />
            <Heading level={5}>Bu işlem geri alınamaz</Heading>
          </div>
          <Text size="sm" color="secondary">
            <strong>ASSET-9032</strong> kalıcı olarak silinecek ve bağlı tüm
            biletler arşivlenecek. Devam etmek istediğinizden emin misiniz?
          </Text>
        </div>
        <div className={styles.modalFooter}>
          <Button type="default">Vazgeç</Button>
          <Button type="primary" danger leadingIcon={<TrashCan />}>
            Kalıcı Olarak Sil
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Section helpers
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

export default function ButtonsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Button</Display>
        <Text size="lg" color="secondary">
          5 tip + danger flag. Her birinin <strong>ne zaman</strong> ve{" "}
          <strong>ne zaman değil</strong> kullanılacağı. Her ekrana yanlış type
          koyarsak panel tutarsız olur — bu sayfa standardı belirler.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#hiyerarsi">Hiyerarşi</a>
        <a href="#primary">Primary</a>
        <a href="#default">Default</a>
        <a href="#dashed">Dashed</a>
        <a href="#text">Text</a>
        <a href="#link">Link</a>
        <a href="#danger">Danger</a>
        <a href="#ghost">Ghost</a>
        <a href="#api-notu">API Notu</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── API Notu ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>not</span>
          <Heading level={2}>API: AntD'den Farkımız</Heading>
        </div>
        <Alert
          type="success"
          showIcon
          message="type / danger / size — AntD ile birebir"
          description={
            <>
              <code>type</code> (5 değer), <code>danger</code>, <code>size</code> (small/middle/large), <code>loading</code>, <code>block</code>, <code>href</code>, <code>htmlType</code>, <code>ghost</code>, <code>disabled</code> — hepsi AntD'nin native API'sı. Backend AntD doc'unda ne okuduysa burada aynı işliyor.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="Tek sapma — icon iki slot'a bölündü"
          description={
            <>
              AntD'de tek <code>icon</code> prop'u + <code>iconPlacement=&quot;end&quot;</code> ile yer ayarı.
              Biz <code>leadingIcon</code> ve <code>trailingIcon</code> olarak iki slot ekledik.{" "}
              <strong>Sebep:</strong> AntD 5.7'de <code>iconPlacement</code> yok (5.22+), slot-bazlı API daha okunaklı ve 5.7 ile uyumlu.
            </>
          }
        />
      </section>

      {/* ── Hiyerarşi ── */}
      <section id="hiyerarsi" className={styles.section}>
        <div className={styles.sectionLabel}>
          <Heading level={2}>Hiyerarşi</Heading>
          <Text size="md" color="secondary">
            Bir ekranda en fazla <strong>tek primary</strong> olur — sayfanın
            ana eylemi. Geri kalan eylemler hiyerarşiyi takip eder.
          </Text>
        </div>
        <div className={styles.hierarchy}>
          <div className={styles.hierarchyStep}>
            <span className={styles.hierarchyOrder}>1 — En güçlü</span>
            <Button type="primary">primary</Button>
          </div>
          <div className={styles.hierarchyStep}>
            <span className={styles.hierarchyOrder}>2</span>
            <Button type="default">default</Button>
          </div>
          <div className={styles.hierarchyStep}>
            <span className={styles.hierarchyOrder}>3</span>
            <Button type="dashed">dashed</Button>
          </div>
          <div className={styles.hierarchyStep}>
            <span className={styles.hierarchyOrder}>4</span>
            <Button type="text">text</Button>
          </div>
          <div className={styles.hierarchyStep}>
            <span className={styles.hierarchyOrder}>5 — En zayıf</span>
            <Button type="link">link</Button>
          </div>
        </div>
      </section>

      {/* ── PRIMARY ── */}
      <section id="primary" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type=&quot;primary&quot;</span>
          <Heading level={2}>Primary</Heading>
        </div>
        <Text size="md" color="secondary">
          Dolgu mavi. Bir ekranın <strong>ana eylemi</strong>. Kullanıcının
          sayfaya geliş amacının tetikleyicisi.
        </Text>
        <DoDontGrid
          doItems={[
            "Sayfanın varoluş sebebi olan eylem: Kaydet, Onayla, Talebi Aç",
            "Form footer'da ana submit",
            "Modal'da onaylama eylemi (Confirm)",
            "Bir ekran = bir primary (en fazla)",
          ]}
          dontItems={[
            "Tablo satır içinde her sırada primary — gürültü olur",
            "İkincil eylemler (Vazgeç, Geri) için",
            "Salt navigasyon — onun yeri link",
            "Yıkıcı eylem için — onun yeri primary + danger",
          ]}
        />
        <MockBlock caption="Ticket detay header — ana eylem &quot;Çözüldü olarak işaretle&quot;">
          <TicketHeaderMock />
        </MockBlock>
        <MockBlock caption="Form footer — ana submit primary, ikinciller default/text">
          <FormFooterMock />
        </MockBlock>
        <CodeBlock>{`<Button type="primary" icon={<CheckmarkOutline />}>
  Çözüldü Olarak İşaretle
</Button>`}</CodeBlock>
      </section>

      {/* ── DEFAULT ── */}
      <section id="default" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type=&quot;default&quot;</span>
          <Heading level={2}>Default</Heading>
        </div>
        <Text size="md" color="secondary">
          Outline + beyaz dolgu. <strong>İkincil eylemler.</strong> Primary'nin
          yanında durarak destekleyici eylem sunar.
        </Text>
        <DoDontGrid
          doItems={[
            "Vazgeç, Geri, Kapat",
            "Primary'nin yanında ikincil seçenek (örn. &quot;Taslak kaydet&quot;)",
            "Header'da Düzenle, Filtre, Dışa aktar gibi sayfa-seviye eylemler",
            "Toolbar butonları",
          ]}
          dontItems={[
            "Sayfanın ana eylemi için (o primary)",
            "İçi boş kalan modal/empty state CTA için (o dashed)",
            "Salt metin yeterli olduğu yerlerde (o text)",
          ]}
        />
        <MockBlock caption="Modal — Vazgeç default, Onayla primary">
          <ModalMock />
        </MockBlock>
        <CodeBlock>{`<Button type="default">Vazgeç</Button>
<Button type="default" icon={<Edit />}>Düzenle</Button>`}</CodeBlock>
      </section>

      {/* ── DASHED ── */}
      <section id="dashed" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type=&quot;dashed&quot;</span>
          <Heading level={2}>Dashed</Heading>
        </div>
        <Text size="md" color="secondary">
          Kesik çizgili border. <strong>&quot;Yeni bir şey ekle&quot;</strong>{" "}
          sinyali. Görselde &quot;eklenebilir alan&quot; hissi verir.
        </Text>
        <DoDontGrid
          doItems={[
            "Empty state CTA (boş tablo, boş kategori)",
            "Liste sonunda &quot;+ Satır ekle&quot;, &quot;+ Kural ekle&quot;",
            "Form içinde dinamik alan ekle (örn. &quot;+ Yeni etiket&quot;)",
          ]}
          dontItems={[
            "Sayfanın ana eylemi olarak (o primary)",
            "İkincil eylem (o default)",
            "Her yerde — sadece &quot;ekle&quot; bağlamında",
          ]}
        />
        <MockBlock caption="Empty state — boş tabloda &quot;ilk öğeyi ekle&quot;">
          <EmptyStateMock />
        </MockBlock>
        <CodeBlock>{`<Button type="dashed" icon={<Add />}>
  İlk talebi oluştur
</Button>`}</CodeBlock>
      </section>

      {/* ── TEXT ── */}
      <section id="text" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type=&quot;text&quot;</span>
          <Heading level={2}>Text</Heading>
        </div>
        <Text size="md" color="secondary">
          Border yok, dolgu yok. <strong>Minör eylem.</strong> Hover'da hafif
          arka plan. Görsel ağırlığı en az.
        </Text>
        <DoDontGrid
          doItems={[
            "Tablo satır içi eylemler (Düzenle, Sil, Detay)",
            "Üç-nokta menü içindeki seçenekler",
            "Dropdown panel içi liste seçimleri",
            "Yer kazanmak gereken yoğun listeler",
          ]}
          dontItems={[
            "Sayfanın ana eylemi — kaybolur",
            "Form submit",
            "Modal confirm",
            "İlk bakışta görünmesi gereken eylemler",
          ]}
        />
        <MockBlock caption="Asset envanteri — satır içi eylemler text">
          <AssetTableMock />
        </MockBlock>
        <CodeBlock>{`<Button type="text" size="small" icon={<Edit />}>
  Düzenle
</Button>`}</CodeBlock>
      </section>

      {/* ── LINK ── */}
      <section id="link" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type=&quot;link&quot;</span>
          <Heading level={2}>Link</Heading>
        </div>
        <Text size="md" color="secondary">
          Mavi metin, padding/height yok. <strong>Navigasyon</strong> —
          kullanıcıyı başka sayfaya/detaya götürür.
        </Text>
        <DoDontGrid
          doItems={[
            "Kart içinden detay sayfasına git (&quot;Devamını oku&quot;)",
            "Bilgi tabanı makalesine link",
            "Inline metin akışı içinde navigasyon",
            "Footer / breadcrumb stili linkler",
          ]}
          dontItems={[
            "Eylemler için (Kaydet, Sil) — onlar buton",
            "Form submit",
            "Tablo satır eylemi (o text)",
            "Modal confirm",
          ]}
        />
        <MockBlock caption="Bilgi tabanı kartı — makaleye git">
          <KbCardMock />
        </MockBlock>
        <CodeBlock>{`<Button type="link">Makaleyi oku</Button>`}</CodeBlock>
      </section>

      {/* ── DANGER ── */}
      <section id="danger" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>danger</span>
          <Heading level={2}>Danger</Heading>
        </div>
        <Text size="md" color="secondary">
          Type değil, <strong>modifier</strong>. Herhangi bir type ile kombine
          olur. Yıkıcı veya geri alınamaz eylem için.
        </Text>
        <DoDontGrid
          doItems={[
            "Sil, Kalıcı olarak sil, Hesap kapat",
            "Geri alınamaz değişiklik (örn. &quot;Tüm bağlı kayıtları sil&quot;)",
            "Yıkıcı confirm modal — primary + danger",
            "Satır içi sil — text + danger",
          ]}
          dontItems={[
            "Kapat, Vazgeç — onlar yıkıcı değil",
            "Sıradan iptal — onlar default",
            "Her sil eylemi otomatik primary değil — bağlama bak",
          ]}
        />
        <MockBlock caption="Yıkıcı confirm — &quot;Kalıcı Olarak Sil&quot; primary + danger">
          <DangerAlertMock />
        </MockBlock>
        <MockBlock caption="Satır içi sil — text + danger (görsel yoğunluğu az)">
          <div className={styles.mockFrame}>
            <div className={styles.modal}>
              <div className={styles.modalFooter}>
                <Button type="text" size="small" leadingIcon={<Edit />}>
                  Düzenle
                </Button>
                <Button
                  type="text"
                  size="small"
                  danger
                  leadingIcon={<TrashCan />}
                  aria-label="Sil"
                />
              </div>
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`<Button type="primary" danger icon={<TrashCan />}>
  Kalıcı Olarak Sil
</Button>

<Button type="text" size="small" danger icon={<TrashCan />} aria-label="Sil" />`}</CodeBlock>
      </section>

      {/* ── GHOST ── */}
      <section id="ghost" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ghost</span>
          <Heading level={2}>Ghost</Heading>
        </div>
        <Text size="md" color="secondary">
          Type değil, <strong>modifier</strong>. Background'u şeffaf yapar — koyu zemin veya görsel arka plan üstünde butonun okunabilir kalması için.
        </Text>
        <DoDontGrid
          doItems={[
            "Hero bölümü, splash screen, login form arka planda görsel varken",
            "Koyu zemin üzerinde primary buton — okunabilirlik korunur",
            "Modal'lar değil, full-bleed banner'lar için",
          ]}
          dontItems={[
            "Normal beyaz panel ekranlarında — anlamsız",
            "Form footer'da (zaten beyaz zemin)",
            "Tablo satır içinde (zaten ince eylemi text yapıyoruz)",
          ]}
        />
        <MockBlock caption="Koyu hero — primary üstüne ghost, kontrastı korur">
          <div
            style={{
              background: "var(--sc-color-bg-emphasis)",
              padding: "var(--sc-space-12)",
              borderRadius: "var(--sc-radius-lg)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--sc-space-3)",
            }}
          >
            <Heading level={3} style={{ color: "var(--sc-color-text-inverse)" }}>
              Hizmet kataloğuna başla
            </Heading>
            <Text size="md" style={{ color: "var(--sc-color-text-inverse)", opacity: 0.7 }}>
              ServiceCore üzerinden ekibinize hızlıca destek talebi açın.
            </Text>
            <div style={{ display: "flex", gap: "var(--sc-space-2)", marginTop: "var(--sc-space-3)" }}>
              <Button type="primary">Hemen başla</Button>
              <Button ghost>Daha fazla bilgi</Button>
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`<Button ghost>Daha fazla bilgi</Button>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>
        <Text size="md" color="secondary">
          Eski paneldeki yanlış kullanımlar — bu listede olanları yeni kodda{" "}
          <strong>tekrarlama</strong>.
        </Text>

        <AntiPattern title="Hata 1 — Birden fazla primary">
          <>
            Bir ekranda iki primary varsa kullanıcı hangisini tıklayacağını
            bilmez. Hiyerarşi yok demektir. <strong>Tek primary kuralı.</strong>
            <div className={styles.mockFrame} style={{ marginTop: 12 }}>
              <div className={styles.modalFooter}>
                <Button type="primary">Kaydet</Button>
                <Button type="primary">Onayla</Button>
                <Button type="primary">Yayınla</Button>
              </div>
            </div>
          </>
        </AntiPattern>

        <AntiPattern title="Hata 2 — Tablo satırında primary kullanmak">
          Liste içindeki satır eylemleri minördür. Her sıra primary ile
          doluysa sayfa gürültü olur. <strong>text kullan.</strong>
        </AntiPattern>

        <AntiPattern title="Hata 3 — Sil için sadece danger yetmez">
          Geri alınamaz sil → <strong>primary + danger</strong> ile büyük
          modal. Satır içi sil → <strong>text + danger</strong> ile minör.
          Bağlama bak.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Navigasyona button koymak">
          &quot;Makaleyi oku&quot;, &quot;Detaya git&quot; gibi yönlendirmeler{" "}
          <strong>link</strong>. Button, eylem; link, gezinti.
        </AntiPattern>

        <AntiPattern title="Hata 5 — Yan yana 3'ten fazla buton">
          <>
            <strong>AntD kuralı:</strong> 1 primary + n secondary, toplam 3'ü
            geçerse butonları bir <strong>Dropdown</strong> menüye topla. Ekran
            buton tarlasına dönüşmesin.
            <div className={styles.mockFrame} style={{ marginTop: 12 }}>
              <div className={styles.modalFooter}>
                <Button type="default">Aksiyon 1</Button>
                <Button type="default">Aksiyon 2</Button>
                <Button type="default">Aksiyon 3</Button>
                <Button type="default">Aksiyon 4</Button>
                <Button type="primary">Onayla</Button>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: "var(--sc-font-size-xs)", color: "var(--sc-color-text-tertiary)" }}>
              Yukarıdaki YANLIŞ. DOĞRU: 1 primary + 1-2 secondary + &quot;Daha
              fazla ▾&quot; dropdown.
            </div>
          </>
        </AntiPattern>
      </section>
    </main>
  );
}
