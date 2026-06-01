"use client";

import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { Brand } from "@servicecoreui/ui/custom";
import { Alert } from "@servicecoreui/ui/wraps";
import styles from "./brand.module.css";

/* Örnek müşteri logosu — white-label gösterimi için (public/ altında) */
const SAMPLE_LOGO = "/ornek-musteri-logo.svg";

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

export default function BrandPage() {
  return (
    <main className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Brand</Display>
        <Text size="lg" color="secondary">
          Panel/navbar'ın logo + ad lockup'ı. <strong>White-label hazır:</strong>{" "}
          <code>logoSrc</code> verilmezse ServiceCore sembolü gelir; müşteri
          kurulumunda developer kendi logosunu geçer. Logo sabit yüksekliğe ve
          maksimum genişliğe sokulur → hangi logo gelirse gelsin layout bozulmaz.
        </Text>
      </header>

      {/* ── API ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>API</Heading>
        </div>
        <table className={styles.props}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tip</th>
              <th>Default</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>logoSrc</code></td>
              <td><code>string?</code></td>
              <td>—</td>
              <td>Müşteri logosu (görsel URL). Verilmezse ServiceCore sembolüne düşer.</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string?</code></td>
              <td><code>&quot;ServiceCore&quot;</code></td>
              <td>Logonun yanındaki marka adı.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>number?</code></td>
              <td><code>24</code></td>
              <td>Sembol / logo yüksekliği (px).</td>
            </tr>
          </tbody>
        </table>
        <Alert
          type="info"
          showIcon
          message="AntD'de Brand/Logo bileşeni yok"
          description={
            <>
              Logo bir <code>img</code> veya semantic markup ister. Bu bileşen onu
              standartlaştırır. AntD bağımlılığı yoktur — <code>@servicecoreui/ui</code>{" "}
              ana entry'sinden (server-safe) gelir.
            </>
          }
        />
      </section>

      {/* ── Default ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>Varsayılan — ServiceCore</Heading>
          <Text size="md" color="secondary">
            <code>logoSrc</code> verilmediğinde ServiceCore sembolü + &quot;ServiceCore&quot; adı.
          </Text>
        </div>
        <div className={styles.demoRow}>
          <div className={styles.demoCol}>
            <Brand />
            <span className={styles.demoLabel}>&lt;Brand /&gt;</span>
          </div>
        </div>
        <Code block>{`<Brand />`}</Code>
      </section>

      {/* ── White-label ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>White-label — müşteri logosu</Heading>
          <Text size="md" color="secondary">
            Developer kurulumda <code>logoSrc</code> + <code>name</code> geçer. Logo
            yüksekliği sabit kalır, layout aynıdır.
          </Text>
        </div>
        <div className={styles.demoRow}>
          <div className={styles.demoCol}>
            <Brand logoSrc={SAMPLE_LOGO} name="Acme Corp" />
            <span className={styles.demoLabel}>logoSrc + name=&quot;Acme Corp&quot;</span>
          </div>
        </div>
        <Code block>{`<Brand logoSrc="/musteri-logo.svg" name="Acme Corp" />`}</Code>
      </section>

      {/* ── Navbar bağlamı ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>Navbar bağlamında</Heading>
          <Text size="md" color="secondary">
            Shell'in sol üst köşesinde nasıl durur — gerçek kullanım.
          </Text>
        </div>
        <div className={styles.demoRow}>
          <div className={styles.navbarMock}>
            <Brand />
          </div>
          <div className={styles.navbarMock}>
            <Brand logoSrc={SAMPLE_LOGO} name="Acme Corp" />
          </div>
        </div>
      </section>

      {/* ── Boyut ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>Boyut</Heading>
          <Text size="md" color="secondary">
            <code>size</code> sembol/logo yüksekliğini ayarlar (ad metni sabit kalır).
          </Text>
        </div>
        <div className={styles.demoRow}>
          <div className={styles.demoCol}>
            <Brand size={20} />
            <span className={styles.demoLabel}>size=20</span>
          </div>
          <div className={styles.demoCol}>
            <Brand size={24} />
            <span className={styles.demoLabel}>size=24 (default)</span>
          </div>
          <div className={styles.demoCol}>
            <Brand size={32} />
            <span className={styles.demoLabel}>size=32</span>
          </div>
        </div>
        <Code block>{`<Brand size={32} />`}</Code>
      </section>

      {/* ── Ne zaman ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Heading level={2}>Ne zaman</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Shell navbar'ı / sidebar tepesinde marka kimliği",
            "White-label kurulumda müşteri logosu (logoSrc geç)",
            "Açık zeminde (light surface) — sembol koyu+mavi token kullanır",
          ]}
          dontItems={[
            "İçerik görseli için — o Image bileşeni",
            "Avatar/kullanıcı görseli için — o Avatar",
            "Koyu zemin üzerinde (token koyu kalır, okunmaz) — ayrı varyant gerekir",
          ]}
        />
      </section>
    </main>
  );
}
