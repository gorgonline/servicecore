"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Button, Carousel } from "@servicecore/ui/wraps";
import type { CarouselRef } from "@servicecore/ui/wraps";
import styles from "./carousel.module.css";

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

export default function CarouselPage() {
  const refImperative = useRef<CarouselRef>(null);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Carousel</Display>
        <Text size="lg" color="secondary">
          Slide rotasyonu. Login splash, onboarding tour, dashboard widget
          rotation, feature highlight banner. <strong>Az kullan</strong> —
          otomatik rotation kullanıcı kontrolünü elinden alır; manuel dot/arrow
          kullanımı daha kullanıcı dostu.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#effect">Effect</a>
        <a href="#dot-position">Dot Position</a>
        <a href="#imperative">Imperative</a>
        <a href="#dashboard">Dashboard KPI</a>
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
              <code>autoplay</code> (boolean), <code>autoplaySpeed</code>,{" "}
              <code>adaptiveHeight</code>,{" "}
              <code>dotPosition</code> / <code>dotPlacement</code>,{" "}
              <code>dots</code> (boolean | object),{" "}
              <code>draggable</code>, <code>effect</code> (scrollx / fade),{" "}
              <code>easing</code>, <code>infinite</code>, <code>speed</code>,{" "}
              <code>beforeChange</code>, <code>afterChange</code>,{" "}
              <code>waitForAnimate</code>.
              <br />
              <strong>Methods (ref):</strong> <code>goTo</code>, <code>next</code>,{" "}
              <code>prev</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>arrows</code> prop (5.17+) — prev/next button gerekiyorsa{" "}
              <code>ref</code> ile manuel render et,{" "}
              <code>{`autoplay={{ dotDuration: true }}`}</code> object form
              (5.24+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="autoplay — kullanıcı kontrolünü düşün"
          description={
            <>
              <code>autoplay</code> default <strong>false</strong>. Açarsan
              kullanıcı kendi hızında okumakta zorlanır, hover'a duraklatma
              expectation oluşur. <strong>Çözüm:</strong> dots göster, autoplay
              kullanırsan <code>pauseOnHover</code> davranışı için manuel
              kontrol.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — dots + draggable</Heading>
        </div>
        <Text size="md" color="secondary">
          Dot'lara tıkla veya slide üstünde sürükle. <code>autoplay</code> kapalı
          — kullanıcı kontrolde.
        </Text>
        <MockBlock caption="3 slide + manuel kontrol">
          <Carousel draggable>
            <div className={`${styles.slide} ${styles.slide1}`}>
              <span className={styles.slideTitle}>ServiceCore'a hoş geldin</span>
              <span className={styles.slideDesc}>
                ITSM panelinin sade hâli — kurulum 5 dakika.
              </span>
            </div>
            <div className={`${styles.slide} ${styles.slide2}`}>
              <span className={styles.slideTitle}>Bilet akışını otomatize et</span>
              <span className={styles.slideDesc}>
                Rule engine ile triage'ı %70 hızlandır.
              </span>
            </div>
            <div className={`${styles.slide} ${styles.slide3}`}>
              <span className={styles.slideTitle}>SLA'yı canlı izle</span>
              <span className={styles.slideDesc}>
                Dashboard'da real-time threshold uyarıları.
              </span>
            </div>
          </Carousel>
        </MockBlock>
        <CodeBlock>{`<Carousel draggable>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`}</CodeBlock>
      </section>

      {/* ── EFFECT ── */}
      <section id="effect" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>effect</span>
          <Heading level={2}>Effect — scrollx vs fade</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>scrollx</code> default — slide yatay kayar. <code>fade</code>{" "}
          slide aniden değişir, daha sade. KPI/widget rotation'da fade,
          galeri/storytelling'de scrollx.
        </Text>
        <MockBlock caption='effect="fade" + autoplay 4sn'>
          <Carousel effect="fade" autoplay autoplaySpeed={4000}>
            <div className={`${styles.slide} ${styles.slide1}`}>
              <span className={styles.slideTitle}>Slide 1 (fade)</span>
            </div>
            <div className={`${styles.slide} ${styles.slide2}`}>
              <span className={styles.slideTitle}>Slide 2 (fade)</span>
            </div>
            <div className={`${styles.slide} ${styles.slide4}`}>
              <span className={styles.slideTitle}>Slide 3 (fade)</span>
            </div>
          </Carousel>
        </MockBlock>
        <CodeBlock>{`<Carousel effect="fade" autoplay autoplaySpeed={4000}>
  ...
</Carousel>`}</CodeBlock>
      </section>

      {/* ── DOT POSITION ── */}
      <section id="dot-position" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>dotPosition</span>
          <Heading level={2}>Dot konumu — top/bottom/left/right</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>bottom</code>. Vertical layout slide içeriği geniş ise{" "}
          <code>left</code>/<code>right</code> — yatay dotlar yer kapatır.
        </Text>
        <MockBlock caption='dotPosition="right"'>
          <Carousel dotPosition="right" draggable>
            <div className={`${styles.slide} ${styles.slide2}`}>
              <span className={styles.slideTitle}>Slide A</span>
              <span className={styles.slideDesc}>Dot'lar sağda dikey</span>
            </div>
            <div className={`${styles.slide} ${styles.slide4}`}>
              <span className={styles.slideTitle}>Slide B</span>
            </div>
            <div className={`${styles.slide} ${styles.slide1}`}>
              <span className={styles.slideTitle}>Slide C</span>
            </div>
          </Carousel>
        </MockBlock>
      </section>

      {/* ── IMPERATIVE ── */}
      <section id="imperative" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ref + methods</span>
          <Heading level={2}>Imperative — manuel kontrol (arrows yok 5.7'de)</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>arrows</code> prop'u 5.17+'da geldi. 5.7'de prev/next button
          için <code>ref</code> + <code>goTo</code>/<code>next</code>/
          <code>prev</code> methodları kullan.
        </Text>
        <MockBlock caption="Ref + Button — sol/sağ butonları">
          <div>
            <Carousel ref={refImperative} effect="fade" dots={false}>
              <div className={`${styles.slide} ${styles.slide3}`}>
                <span className={styles.slideTitle}>1. SLA Hedefleri</span>
              </div>
              <div className={`${styles.slide} ${styles.slide1}`}>
                <span className={styles.slideTitle}>2. Bilet Akışı</span>
              </div>
              <div className={`${styles.slide} ${styles.slide2}`}>
                <span className={styles.slideTitle}>3. Raporlama</span>
              </div>
            </Carousel>
            <div className={styles.controls}>
              <Button
                type="default"
                leadingIcon={<ArrowLeft />}
                onClick={() => refImperative.current?.prev()}
              >
                Önceki
              </Button>
              <Button
                type="primary"
                trailingIcon={<ArrowRight />}
                onClick={() => refImperative.current?.next()}
              >
                Sonraki
              </Button>
            </div>
          </div>
        </MockBlock>
        <CodeBlock>{`const ref = useRef<CarouselRef>(null);

<Carousel ref={ref} effect="fade" dots={false}>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>

<Button onClick={() => ref.current?.prev()}>Önceki</Button>
<Button onClick={() => ref.current?.next()}>Sonraki</Button>
<Button onClick={() => ref.current?.goTo(2)}>Slide 3'e git</Button>`}</CodeBlock>
      </section>

      {/* ── DASHBOARD ── */}
      <section id="dashboard" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Dashboard KPI Rotation</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek widget alanında 3-4 KPI rotation. autoplay açık ama hızlı değil
          (8sn) — kullanıcı okumaya vakit bulsun.
        </Text>
        <DoDontGrid
          doItems={[
            "Dashboard widget rotation (KPI metrik) — autoplaySpeed >5sn",
            "Login splash — 2-3 slide, hızlıca tanıtım",
            "Onboarding tour — kullanıcı manuel ilerlesin",
            "Feature highlight banner — sürekli görünür değil, modal/dismissible",
          ]}
          dontItems={[
            "Ana içerik için (kullanıcı vakit kaybeder)",
            "5+ slide (kullanıcı sayamaz, dot patlamasından kaçınılmaz olur)",
            "Hızlı autoplay (<3sn) — okumaya vakit yok",
            "Mobile'da büyük splash carousel (UX kötü, performans kötü)",
          ]}
        />
        <MockBlock caption="KPI rotation — fade effect, 8sn autoplay">
          <Carousel effect="fade" autoplay autoplaySpeed={8000}>
            <div className={styles.kpiSlide}>
              <span className={styles.kpiNumber}>87</span>
              <span className={styles.kpiLabel}>Açık Bilet</span>
              <span className={styles.kpiTrend}>↓ %12 (dün)</span>
            </div>
            <div className={styles.kpiSlide}>
              <span className={styles.kpiNumber}>4.7</span>
              <span className={styles.kpiLabel}>CSAT (5 üzerinden)</span>
              <span className={styles.kpiTrend}>↑ 0.2 (geçen ay)</span>
            </div>
            <div className={styles.kpiSlide}>
              <span className={styles.kpiNumber}>42dk</span>
              <span className={styles.kpiLabel}>Ort. çözüm süresi</span>
              <span className={styles.kpiTrend}>↓ 8dk (hedef altı)</span>
            </div>
            <div className={styles.kpiSlide}>
              <span className={styles.kpiNumber}>%96</span>
              <span className={styles.kpiLabel}>SLA Uyum</span>
              <span className={styles.kpiTrend}>↑ %3 (geçen hafta)</span>
            </div>
          </Carousel>
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
          message="Hata 1 — Ana içerik için Carousel"
          description={
            <>
              Kullanıcı senin ritminde okumak istemez. Ana content (bilet listesi,
              detay) Carousel'da değil, Table/List/Tabs ile.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — autoplaySpeed çok düşük (<3sn)"
          description={
            <>
              3sn'de slide değişir, kullanıcı bir cümleyi bile okuyamaz.{" "}
              <strong>Çözüm:</strong> minimum 5sn, ideal 8sn (özellikle metin
              ağırlıklı slide'larda).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — arrows prop'u beklemek (5.17+, yok)"
          description={
            <>
              <code>{`arrows={true}`}</code> 5.17+'da geldi. 5.7'de etkisiz.{" "}
              <strong>Çözüm:</strong> <code>ref</code> + manuel{" "}
              <code>{`<Button>`}</code> ile prev/next.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — 5+ slide"
          description={
            <>
              Dot patlamasından kaçınılmaz olur, kullanıcı pozisyonu kaybeder.{" "}
              <strong>Çözüm:</strong> max 3-4 slide. Daha fazla içerik için
              Tabs veya Pagination.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Login splash 10+ slide"
          description={
            <>
              Kullanıcı login için geldi, splash okumak istemez. Maks 3 slide,
              skip butonu, autoplaySpeed=4sn.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — autoplay + dots gizli"
          description={
            <>
              Kullanıcı manuel kontrol yapamaz, hangi slide'da olduğunu
              bilmez. autoplay açıkken dots her zaman görünmeli.
            </>
          }
        />
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
