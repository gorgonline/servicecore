"use client";

import { useState } from "react";
import {
  UserAvatar,
  Edit,
  CheckmarkOutline,
  Send,
  DocumentTasks,
  PlayFilledAlt,
  ArrowLeft,
  ArrowRight,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Steps } from "@servicecoreui/ui/wraps";
import styles from "./steps.module.css";

/* ────────────────────────────────────────────────
 * Reusable section helpers
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

/* ────────────────────────────────────────────────
 * Mocks — gerçek ServiceCore senaryoları
 * ──────────────────────────────────────────────── */

function TicketLifecycleMock() {
  return (
    <Steps
      current={2}
      items={[
        { title: "Açıldı", description: "12:14 · son kullanıcı" },
        { title: "Atandı", description: "Mehmet K." },
        { title: "İşleniyor", description: "Bekleyen yanıt" },
        { title: "Çözüldü" },
        { title: "Kapatıldı" },
      ]}
    />
  );
}

function ChangeApprovalMock() {
  return (
    <Steps
      direction="vertical"
      current={2}
      items={[
        {
          title: "Talep oluşturuldu",
          description: "Standard change · Web ekibi · 2 sa önce",
          icon: <DocumentTasks />,
        },
        {
          title: "CAB onayı",
          description: "Onay: 3/3 · Tarih: 2026-05-22 09:00",
          icon: <CheckmarkOutline />,
        },
        {
          title: "Uygulama penceresi",
          description: "Cuma 22:00 — Pazar 02:00",
          icon: <PlayFilledAlt />,
        },
        {
          title: "Doğrulama",
          description: "Test ekibi smoke testleri yürütecek",
        },
        {
          title: "Post-implementation review",
        },
      ]}
    />
  );
}

function MajorIncidentMock() {
  return (
    <Steps
      progressDot
      current={1}
      items={[
        { title: "Algılandı", description: "08:42" },
        { title: "Bildirim", description: "08:44 · Slack #incidents" },
        { title: "Müdahale", description: "Team bridge açık" },
        { title: "Çözüm" },
        { title: "RCA" },
      ]}
    />
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function StepsPage() {
  /* Clickable Steps demo state */
  const [current, setCurrent] = useState(1);

  /* Wizard demo state */
  const [wizardStep, setWizardStep] = useState(0);
  const wizardItems = [
    { title: "Bilgiler", description: "Talep özeti" },
    { title: "Etkilenen sistem", description: "CI seçimi" },
    { title: "Onay" },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Steps</Display>
        <Text size="lg" color="secondary">
          Çok-adımlı bir akışı görselleştirir: yaşam döngüsü, wizard, onay
          akışı, incident timeline. Kullanıcıya <strong>"nereden geldim,
          neredeyim, nereye gidiyorum"</strong> sorusunu net cevaplar.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#status">Status</a>
        <a href="#direction">Direction</a>
        <a href="#size">Size</a>
        <a href="#type">Type</a>
        <a href="#dot">Dot</a>
        <a href="#description">Description</a>
        <a href="#custom-icon">Custom Icon</a>
        <a href="#wizard">Wizard</a>
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
              <code>current</code>, <code>initial</code>, <code>status</code>,{" "}
              <code>direction</code>, <code>type</code>, <code>size</code>,{" "}
              <code>labelPlacement</code>, <code>progressDot</code>,{" "}
              <code>responsive</code>, <code>percent</code>, <code>onChange</code>,{" "}
              <code>items</code> — backend AntD doc'undan ne okuduysa burada
              aynısı çalışır. Görsel ServiceCore'a çekildi, API dokunulmadı.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="items vs children — items'ı tercih et"
          description={
            <>
              AntD 5.7'de iki kullanım var: <code>items=[...]</code> prop'u veya{" "}
              <code>&lt;Steps&gt;&lt;Steps.Step /&gt;</code> children pattern'i.
              Modern API <code>items</code>. ServiceCore kodunda{" "}
              <strong>items'ı tercih et</strong>, dinamik liste rendering daha
              temiz olur. Children pattern hâlâ destekli.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="AntD 5.7 baseline — inline tipi YOK"
          description={
            <>
              <code>type="inline"</code> AntD 5.13+'da geldi. 5.7'de mevcut
              tipler: <code>"default"</code> ve <code>"navigation"</code>. Kompakt
              kullanım için <code>size="small"</code> + <code>progressDot</code>{" "}
              kombinasyonu inline'a yakın bir hava verir.
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
          Bir ticket'ın yaşam döngüsü. <code>current</code> aktif adımı
          belirler (0-indexed). Önceki adımlar otomatik finish, sonraki adımlar
          wait olur.
        </Text>
        <MockBlock caption="Ticket yaşam döngüsü — current=2 (İşleniyor)">
          <TicketLifecycleMock />
        </MockBlock>
        <CodeBlock>{`<Steps
  current={2}
  items={[
    { title: "Açıldı", description: "12:14 · son kullanıcı" },
    { title: "Atandı", description: "Mehmet K." },
    { title: "İşleniyor", description: "Bekleyen yanıt" },
    { title: "Çözüldü" },
    { title: "Kapatıldı" },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>status</span>
          <Heading level={2}>Status — current adımın durumu</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>status</code> prop'u <em>aktif</em> adımın durumunu belirler:{" "}
          <code>"wait"</code>, <code>"process"</code> (default),{" "}
          <code>"finish"</code>, <code>"error"</code>. Bir adımın kendi{" "}
          <code>status</code>'u verilirse o baskın gelir.
        </Text>

        <MockBlock caption='status="process" — varsayılan, aktif adım accent dolgulu'>
          <Steps
            current={1}
            items={[
              { title: "Talep alındı" },
              { title: "İnceleniyor" },
              { title: "Sonuç" },
            ]}
          />
        </MockBlock>

        <MockBlock caption='status="error" — aktif adım danger renginde'>
          <Steps
            current={1}
            status="error"
            items={[
              { title: "Talep alındı" },
              { title: "İnceleniyor", description: "Eksik bilgi" },
              { title: "Sonuç" },
            ]}
          />
        </MockBlock>

        <MockBlock caption="Karışık — bir adımda kendi status override">
          <Steps
            current={2}
            items={[
              { title: "Açıldı", description: "OK" },
              { title: "İlk yanıt", status: "error", description: "SLA aşıldı" },
              { title: "Çözüm" },
              { title: "Kapatıldı" },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Steps
  current={1}
  status="error"
  items={[...]}
/>

// veya adıma özel:
<Steps
  current={2}
  items={[
    { title: "Açıldı" },
    { title: "İlk yanıt", status: "error" },
    { title: "Çözüm" },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── DIRECTION ── */}
      <section id="direction" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>direction</span>
          <Heading level={2}>Direction — horizontal vs vertical</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>"horizontal"</code>. <code>"vertical"</code> sidebar'da
          uzun ve description'lı akışlar için. Mobilde otomatik vertical olur
          (<code>responsive=true</code> varsayılan).
        </Text>

        <DoDontGrid
          doItems={[
            "Vertical: Change approval gibi her adımı uzun açıklama gerektiren akışlar",
            "Vertical: Sidebar/yan panel — sayfa içeriği yanda dururken",
            "Vertical: 5+ adım var ve hepsi description'lı",
            "Horizontal: Wizard, page header banner, kısa lifecycle",
          ]}
          dontItems={[
            "Mobilde manuel vertical — responsive=true zaten halleder",
            "5+ adımı horizontal sıkıştırmak — vertical'a geç",
            "Description'sız 3 adımı vertical yapmak — yer israfı",
          ]}
        />

        <MockBlock caption='direction="vertical" — change request approval flow'>
          <ChangeApprovalMock />
        </MockBlock>

        <MockBlock caption="İki sütun — sidebar'da vertical Steps, içerik sağda">
          <div className={styles.twoCol}>
            <Steps
              direction="vertical"
              size="small"
              current={1}
              items={[
                { title: "Bilgiler" },
                { title: "Yapılandırma" },
                { title: "Önizleme" },
                { title: "Yayınla" },
              ]}
            />
            <div className={styles.twoColMain}>
              <Heading level={5}>Yapılandırma</Heading>
              <Text size="sm" color="secondary">
                Sol kolondaki adım bu içeriğin başlığını verir. Vertical Steps,
                sayfanın yarım bir bölümünü kalıcı navigasyon olarak kullanır.
              </Text>
            </div>
          </div>
        </MockBlock>

        <CodeBlock>{`<Steps
  direction="vertical"
  current={2}
  items={[
    { title: "Talep oluşturuldu", description: "..." },
    { title: "CAB onayı",         description: "..." },
    { title: "Uygulama penceresi",description: "..." },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── SIZE ── */}
      <section id="size" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size</span>
          <Heading level={2}>Size — default vs small</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>"default"</code> 28px daire, <code>"small"</code> 22px daire.
          Small, sidebar veya yoğun panel'lerde yer kazanır.
        </Text>

        <MockBlock caption='size="default" (varsayılan)'>
          <Steps
            current={1}
            items={[
              { title: "Açıldı" },
              { title: "İşleniyor" },
              { title: "Çözüldü" },
            ]}
          />
        </MockBlock>

        <MockBlock caption='size="small" — daha kompakt'>
          <Steps
            size="small"
            current={1}
            items={[
              { title: "Açıldı" },
              { title: "İşleniyor" },
              { title: "Çözüldü" },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Steps size="small" current={1} items={[...]} />`}</CodeBlock>
      </section>

      {/* ── TYPE ── */}
      <section id="type" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type</span>
          <Heading level={2}>Type — default vs navigation</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>"default"</code> klasik numara-daire çubuğu.{" "}
          <code>"navigation"</code> yatay menü gibi davranır, her adım tıklanabilir,
          aktif adım altında 2px accent çizgi belirir. Page-level navigation için.
        </Text>

        <MockBlock caption='type="default" — klasik akış göstergesi'>
          <Steps
            current={1}
            items={[
              { title: "Adım 1" },
              { title: "Adım 2" },
              { title: "Adım 3" },
            ]}
          />
        </MockBlock>

        <MockBlock caption='type="navigation" — sayfa tabbar tarzı'>
          <Steps
            type="navigation"
            current={current}
            onChange={setCurrent}
            items={[
              { title: "Genel", subTitle: "Temel ayarlar" },
              { title: "Üyeler", subTitle: "Erişim ve roller" },
              { title: "Faturalama" },
              { title: "Entegrasyonlar" },
            ]}
          />
        </MockBlock>
        <Text size="xs" color="tertiary">
          Yukarıdaki örnek tıklanabilir — adımlardan birine tıkla, current
          state güncellenir.
        </Text>

        <CodeBlock>{`const [current, setCurrent] = useState(0);

<Steps
  type="navigation"
  current={current}
  onChange={setCurrent}
  items={[
    { title: "Genel",    subTitle: "Temel ayarlar" },
    { title: "Üyeler",   subTitle: "Erişim ve roller" },
    { title: "Faturalama" },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── DOT ── */}
      <section id="dot" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>progressDot</span>
          <Heading level={2}>Dot — nokta tipi</Heading>
        </div>
        <Text size="md" color="secondary">
          Numara dairesi yerine küçük nokta. Daha sessiz, ikincil bir gösterim.
          Major incident timeline, audit log gibi durumlar için ideal — yer
          kazanır, gürültü azaltır.
        </Text>

        <MockBlock caption="progressDot — major incident timeline">
          <MajorIncidentMock />
        </MockBlock>

        <MockBlock caption="progressDot + vertical">
          <Steps
            progressDot
            direction="vertical"
            current={2}
            items={[
              { title: "08:42 — Algılandı", description: "Monitor: API 5xx artışı" },
              { title: "08:44 — Bildirim",   description: "Slack #incidents, oncall page" },
              { title: "08:51 — Müdahale",   description: "Team bridge açık, root cause araştırılıyor" },
              { title: "Çözüm",              description: "—" },
              { title: "RCA",                description: "—" },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Steps progressDot current={2} items={[...]} />

// Vertical + dot, audit log için ideal kombinasyon:
<Steps progressDot direction="vertical" current={2} items={[...]} />`}</CodeBlock>
      </section>

      {/* ── DESCRIPTION ── */}
      <section id="description" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>description / subTitle</span>
          <Heading level={2}>Description &amp; SubTitle</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>title</code> ana etiket. <code>subTitle</code> başlık yanında
          küçük gri metin (kısa meta — "5 dk", "20 puan"). <code>description</code>{" "}
          altında 1-2 satırlık ayrıntı. İkisini birden kullanma — kalabalık olur.
        </Text>

        <MockBlock caption="title + subTitle + description (tam set)">
          <Steps
            current={1}
            items={[
              {
                title: "Talep alındı",
                subTitle: "2 sa önce",
                description: "Kategori: Network · SLA P3",
              },
              {
                title: "Atandı",
                subTitle: "1 sa önce",
                description: "Atanan: Network ekibi",
              },
              {
                title: "Çözüm",
                subTitle: "—",
                description: "Henüz başlamadı",
              },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`<Steps
  current={1}
  items={[
    {
      title: "Talep alındı",
      subTitle: "2 sa önce",
      description: "Kategori: Network · SLA P3",
    },
    ...
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── CUSTOM ICON ── */}
      <section id="custom-icon" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>icon</span>
          <Heading level={2}>Custom Icon — Carbon</Heading>
        </div>
        <Text size="md" color="secondary">
          Numara yerine Carbon icon. Adımın anlamı icon'la güçlenir (kullanıcı,
          kalem, gönder...). İcon override, başlık metnini desteklemeli — tek
          başına anlamlı olmalı.
        </Text>

        <MockBlock caption="Carbon ikonlu — kullanıcı kayıt akışı">
          <Steps
            current={1}
            items={[
              { title: "Hesap", icon: <UserAvatar /> },
              { title: "Profil", icon: <Edit /> },
              { title: "Doğrula", icon: <Send /> },
              { title: "Tamam", icon: <CheckmarkOutline /> },
            ]}
          />
        </MockBlock>

        <CodeBlock>{`import { UserAvatar, Edit, Send, CheckmarkOutline } from "@carbon/icons-react";

<Steps
  current={1}
  items={[
    { title: "Hesap",   icon: <UserAvatar /> },
    { title: "Profil",  icon: <Edit /> },
    { title: "Doğrula", icon: <Send /> },
    { title: "Tamam",   icon: <CheckmarkOutline /> },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── WIZARD ── */}
      <section id="wizard" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>pattern</span>
          <Heading level={2}>Wizard — interaktif çok-adımlı form</Heading>
        </div>
        <Text size="md" color="secondary">
          Tipik kullanım. Steps yukarıda, ortada içerik, altta Geri/İleri
          butonları. ServiceCore'da change request açma, onboarding, raporlama
          akışlarında karşımıza çıkar.
        </Text>

        <MockBlock caption="Interactive — butonlarla adımlar arasında gez">
          <div className={styles.wizardShell}>
            <Steps current={wizardStep} items={wizardItems} />
            <div className={styles.wizardBody}>
              <Heading level={5}>{wizardItems[wizardStep]?.title}</Heading>
              <Text size="sm" color="secondary">
                {wizardItems[wizardStep]?.description ??
                  "Bu adım için içerik form, tablo veya özet olabilir."}
              </Text>
            </div>
            <div className={styles.wizardFooter}>
              <Button
                type="default"
                leadingIcon={<ArrowLeft />}
                disabled={wizardStep === 0}
                onClick={() => setWizardStep((s) => Math.max(0, s - 1))}
              >
                Geri
              </Button>
              {wizardStep < wizardItems.length - 1 ? (
                <Button
                  type="primary"
                  trailingIcon={<ArrowRight />}
                  onClick={() => setWizardStep((s) => s + 1)}
                >
                  İleri
                </Button>
              ) : (
                <Button type="primary" leadingIcon={<CheckmarkOutline />}>
                  Tamamla
                </Button>
              )}
            </div>
          </div>
        </MockBlock>

        <CodeBlock>{`const [step, setStep] = useState(0);
const items = [
  { title: "Bilgiler",       description: "Talep özeti" },
  { title: "Etkilenen sistem", description: "CI seçimi" },
  { title: "Onay" },
];

<Steps current={step} items={items} />

<Button onClick={() => setStep(s => s - 1)} disabled={step === 0}>
  Geri
</Button>
<Button type="primary" onClick={() => setStep(s => s + 1)}>
  İleri
</Button>`}</CodeBlock>
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
          message="Hata 1 — 7+ adımı tek horizontal Steps'e sığdırmak"
          description={
            <>
              Yatayda 5'i geçen Steps okunmaz hale gelir, title'lar kesilir.{" "}
              <strong>Çözüm:</strong> <code>direction="vertical"</code> veya
              akışı parçala (örn. "Hazırlık" ve "Uygulama" iki ayrı Steps).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 2 — Steps yerine "ne kadar tamamlandı" göstermek'
          description={
            <>
              Linear ilerleme yüzdesi gösteriliyorsa <strong>Progress</strong>{" "}
              kullan. Steps, ayrı ayrı isimlendirilmiş{" "}
              <strong>aşamalar</strong> içindir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Adım başlıkları belirsiz veya teknik"
          description={
            <>
              <code>"Step 1"</code>, <code>"Süreç A"</code>,{" "}
              <code>"webhook-validation"</code> gibi başlıklar kullanıcıya hiçbir
              şey anlatmaz. <strong>Çözüm:</strong> <code>"Talep alındı"</code>,{" "}
              <code>"Onay bekleniyor"</code>, <code>"Yayında"</code> — kullanıcı
              dilinde, eylem bazlı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message={`Hata 4 — Geçmiş adımlardaki "error" status'unu silmek`}
          description={
            <>
              SLA aşıldı ama bilet sonradan çözüldü — geçmiş adım <code>error</code>{" "}
              olarak kalmalı (audit/şeffaflık). Status'u silip{" "}
              <code>finish</code> yapma — bu lifecycle'ı yalan söyletir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 5 — Steps "tıklanabilir" görüntülü ama tıklanmıyor'
          description={
            <>
              Görsel olarak <code>type="navigation"</code> kullanıyorsan{" "}
              <code>onChange</code> da bağla, kullanıcı tıklayınca bir şey olsun.
              Aksi halde tıklanır gibi duran ama tıklanmayan bileşen — kullanıcı
              güvenini sarsar.
            </>
          }
        />
      </section>
    </main>
  );
}
