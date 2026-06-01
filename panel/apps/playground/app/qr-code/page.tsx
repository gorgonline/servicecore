"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, QRCode } from "@servicecoreui/ui/wraps";
import styles from "./qr-code.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={styles.mockFrame}>{children}</div>
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

export default function QRCodePage() {
  const [token, setToken] = useState(() => Math.random().toString(36).slice(2, 10));
  const [expired, setExpired] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">QRCode</Display>
        <Text size="lg" color="secondary">
          QR kod üretimi. Mobile login link, 2FA TOTP setup (Google
          Authenticator), asset QR tag, ticket share link, WiFi credential.{" "}
          <strong>5.1+'da geldi</strong>, 5.7'de stable.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#size-color">Size + Color</a>
        <a href="#icon">Icon</a>
        <a href="#error-level">Error Level</a>
        <a href="#type">Type</a>
        <a href="#status">Status</a>
        <a href="#mock">Real Scenarios</a>
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
          message="5.7'de mevcut tüm temel API (5.1+'dan)"
          description={
            <>
              <code>value</code>, <code>type</code> (canvas / svg — 5.6+),{" "}
              <code>size</code>, <code>color</code> (foreground),{" "}
              <code>bgColor</code>, <code>bordered</code>, <code>icon</code>{" "}
              (URL string), <code>errorLevel</code>{" "}
              (<code>L</code>/<code>M</code>/<code>Q</code>/<code>H</code>),{" "}
              <code>status</code>{" "}
              (<code>active</code>/<code>expired</code>/<code>loading</code>/
              <code>scanned</code>), <code>onRefresh</code> (expired durumunda
              refresh callback).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>iconSize</code> object form{" "}
              (<code>{`{ width, height }`}</code>) (5.19+),{" "}
              <code>statusRender</code> (5.20+) — custom overlay,{" "}
              <code>marginSize</code> (6.2+),{" "}
              <code>boostLevel</code> (5.28+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="errorLevel + icon — H önerilir"
          description={
            <>
              <strong>L:</strong> 7% recovery (icon yok, max veri).{" "}
              <strong>M:</strong> 15% (default).{" "}
              <strong>Q:</strong> 25%.{" "}
              <strong>H:</strong> 30% (icon overlay için ideal — center logo
              QR'ın okunabilirliğini bozmaz).
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — value zorunlu</Heading>
        </div>
        <MockBlock caption="Default — 160px, bordered">
          <QRCode value="https://servicecore.com" />
        </MockBlock>
        <CodeBlock>{`<QRCode value="https://servicecore.com" />`}</CodeBlock>
      </section>

      {/* ── SIZE + COLOR ── */}
      <section id="size-color" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size · color</span>
          <Heading level={2}>Size + Color — accent renkli QR</Heading>
        </div>
        <Text size="md" color="secondary">
          Brand renk QR'ı kurumsal kimlik için. Dikkat: çok düşük kontrast
          QR'ı okutmaz — tarayıcı bg'siyle yeterli kontrast olsun.
        </Text>
        <MockBlock caption="3 boyut + accent color">
          <div className={styles.row}>
            <div className={styles.cell}>
              <QRCode value="size 120" size={120} />
              <span className={styles.cellLabel}>size={`{120}`}</span>
            </div>
            <div className={styles.cell}>
              <QRCode value="size 160 default" size={160} />
              <span className={styles.cellLabel}>size={`{160}`}</span>
            </div>
            <div className={styles.cell}>
              <QRCode value="accent color" size={140} color="#0070F3" />
              <span className={styles.cellLabel}>color=&quot;#0070F3&quot;</span>
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── ICON ── */}
      <section id="icon" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>icon</span>
          <Heading level={2}>Icon — center logo</Heading>
        </div>
        <Text size="md" color="secondary">
          Center logo için <code>icon</code> URL ver +{" "}
          <code>errorLevel="H"</code> ile yüksek recovery (logo
          QR'ın bir kısmını kapatsa bile okutulabilir).
        </Text>
        <MockBlock caption="icon + errorLevel='H'">
          <QRCode
            value="https://servicecore.com"
            icon="https://placehold.co/40/0070F3/FFFFFF/png?text=SC"
            errorLevel="H"
            size={180}
          />
        </MockBlock>
        <CodeBlock>{`<QRCode
  value="https://servicecore.com"
  icon="/logo.png"
  errorLevel="H"      // High redundancy — icon korur QR'ı
  size={180}
/>`}</CodeBlock>
      </section>

      {/* ── ERROR LEVEL ── */}
      <section id="error-level" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>errorLevel</span>
          <Heading level={2}>Error Level — recovery seviyesi</Heading>
        </div>
        <Text size="md" color="secondary">
          QR'ın bir kısmı bozuk/kapalı olsa bile okutulabilir oranı. Yüksek
          level = daha fazla pixel = daha büyük QR ama recover oranı yüksek.
        </Text>
        <MockBlock caption="L → H">
          <div className={styles.row}>
            <div className={styles.cell}>
              <QRCode value="error L" errorLevel="L" size={120} />
              <span className={styles.cellLabel}>L · ~7%</span>
            </div>
            <div className={styles.cell}>
              <QRCode value="error M" errorLevel="M" size={120} />
              <span className={styles.cellLabel}>M · ~15% (default)</span>
            </div>
            <div className={styles.cell}>
              <QRCode value="error Q" errorLevel="Q" size={120} />
              <span className={styles.cellLabel}>Q · ~25%</span>
            </div>
            <div className={styles.cell}>
              <QRCode value="error H" errorLevel="H" size={120} />
              <span className={styles.cellLabel}>H · ~30%</span>
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── TYPE ── */}
      <section id="type" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>type</span>
          <Heading level={2}>Type — canvas vs svg</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>canvas</strong> default — DOM'da hızlı render.{" "}
          <strong>svg</strong> scalable — print için ideal (asset tag,
          ticket print).
        </Text>
        <MockBlock caption='type="svg" — print için scalable'>
          <QRCode value="svg type" type="svg" size={140} />
        </MockBlock>
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>status · onRefresh</span>
          <Heading level={2}>Status — expired + refresh akışı</Heading>
        </div>
        <Text size="md" color="secondary">
          Mobile login token'ı belli süre sonra expire olur — kullanıcıya
          "yenile" butonu göster.
        </Text>
        <MockBlock caption="Expire et / yenile (interactive)">
          <div className={styles.row}>
            <div className={styles.cell}>
              <QRCode
                value={`https://app.servicecore.com/login?token=${token}`}
                size={160}
                status={expired ? "expired" : "active"}
                onRefresh={() => {
                  setToken(Math.random().toString(36).slice(2, 10));
                  setExpired(false);
                }}
              />
              <span className={styles.cellLabel}>token: {token}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-2)" }}>
              <Button type="default" onClick={() => setExpired(true)}>
                Expire et
              </Button>
              <Button
                type="default"
                onClick={() => {
                  setToken(Math.random().toString(36).slice(2, 10));
                  setExpired(false);
                }}
              >
                Manuel yenile
              </Button>
            </div>
          </div>
        </MockBlock>
        <MockBlock caption='status="loading" · status="scanned"'>
          <div className={styles.row}>
            <div className={styles.cell}>
              <QRCode value="loading state" size={140} status="loading" />
              <span className={styles.cellLabel}>loading</span>
            </div>
            <Alert
              type="info"
              showIcon
              message='"scanned" 5.7 tipinde yok'
              description={
                <>
                  Tipte sadece <code>active</code>/<code>expired</code>/
                  <code>loading</code> var. Tarama'yı backend'den polled edip
                  Notification/Toast ile bilgilendir.
                </>
              }
            />
          </div>
        </MockBlock>
        <CodeBlock>{`const [token, setToken] = useState(generateToken());
const [expired, setExpired] = useState(false);

useEffect(() => {
  const t = setTimeout(() => setExpired(true), 60_000);
  return () => clearTimeout(t);
}, [token]);

<QRCode
  value={\`https://app.servicecore.com/login?token=\${token}\`}
  status={expired ? "expired" : "active"}
  onRefresh={() => {
    setToken(generateToken());
    setExpired(false);
  }}
/>`}</CodeBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <DoDontGrid
          doItems={[
            "Mobile login (PC'de QR göster, mobil app tara)",
            "2FA setup (otp:// URI, errorLevel=Q + Google Authenticator logo)",
            "Asset QR tag (print, type=svg, asset URL)",
            "Ticket share link (kısa URL, errorLevel=M)",
          ]}
          dontItems={[
            "Çok uzun URL (QR yoğun olur, taranamaz) → URL shortener",
            "Düşük kontrast renk (#FFD000 yellow on white — tarayıcı bulamaz)",
            "Şifre/secret QR'a koymak (kameralar/screenshot kolayca okur)",
            "Bordersuz + bg renkli QR (whitespace yok, tarama zor)",
          ]}
        />

        <MockBlock caption="Mobile login card">
          <div className={styles.loginCard}>
            <QRCode
              value="https://app.servicecore.com/login?token=abc123"
              size={160}
              icon="https://placehold.co/32/0070F3/FFFFFF/png?text=SC"
              errorLevel="H"
            />
            <Text size="sm" weight="medium">ServiceCore mobile ile tara</Text>
            <span className={styles.loginHint}>
              Mobil uygulamada <strong>Profil → QR ile giriş</strong> menüsünden
              tarayın. Token 60 saniye geçerli.
            </span>
          </div>
        </MockBlock>

        <MockBlock caption="Asset detail — QR ile fiziksel etiket">
          <div className={styles.assetCard}>
            <QRCode
              value="https://app.servicecore.com/assets/ASSET-9032"
              size={120}
              type="svg"
            />
            <div className={styles.assetMeta}>
              <span className={styles.assetId}>ASSET-9032</span>
              <span className={styles.assetName}>DELL-LAT-7420</span>
              <span className={styles.assetSpecs}>
                Dell Latitude 7420 · 16GB RAM · 512GB SSD
                <br />
                Sahibi: Ayşe T. (Finans) · Garanti: 2027-05
              </span>
            </div>
          </div>
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
          message="Hata 1 — Çok uzun URL"
          description={
            <>
              500 karakterlik URL QR'ı yoğun pikselle doldurur, taranamaz.{" "}
              <strong>Çözüm:</strong> URL shortener (bit.ly, kendi shortener
              backend'i) ile kısalt; QR<code>{` < 100 char`}</code> tutmaya çalış.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Düşük kontrast renk"
          description={
            <>
              Sarı QR beyaz background'da, açık gri QR — kameralar bulamaz.{" "}
              <strong>Çözüm:</strong> Foreground siyah veya accent koyu mavi;
              background beyaz/açık.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Şifre/secret QR'a koymak"
          description={
            <>
              QR cam'dan görünür, screenshot ile çoğaltılır. Şifre,
              private key, persistent token koymak <strong>güvensiz</strong>.{" "}
              <strong>Çözüm:</strong> Tek kullanımlık token (60sn expire) +
              backend session.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Icon + errorLevel L"
          description={
            <>
              Icon QR'ın merkezini kapatır. Düşük recovery (L) ile icon koyarsan
              QR <strong>taranmaz</strong>.{" "}
              <strong>Çözüm:</strong> Icon kullanırken{" "}
              <code>errorLevel="H"</code> (30% recovery).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Expire eden token + onRefresh yok"
          description={
            <>
              Token 60sn sonra geçersiz ama UI hâlâ eski QR'ı gösteriyor →
              kullanıcı sonsuza dek bekler. <strong>Çözüm:</strong>{" "}
              <code>status="expired"</code> + <code>onRefresh</code> ile yenile
              akışı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — statusRender beklemek (5.20+, yok)"
          description={
            <>
              <code>statusRender</code> custom overlay 5.20+'da geldi. 5.7'de
              standart "expired" mesajı görünür. Kendi overlay istiyorsan
              parent'a relative wrapper koy + absolute mask render et.
            </>
          }
        />
      </section>
    </main>
  );
}
