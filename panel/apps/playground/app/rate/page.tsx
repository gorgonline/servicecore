"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, FaceSatisfied } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Rate } from "@servicecoreui/ui/wraps";
import styles from "./rate.module.css";

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
 * Real mocks
 * ──────────────────────────────────────────────── */

function CsatModalMock() {
  const [score, setScore] = useState<number | null>(null);
  const hints = [
    "Çok kötü — anlaşılmadı veya çözülmedi",
    "Kötü — çok uzun sürdü",
    "Orta — sorun çözüldü ama hızlı değildi",
    "İyi — beklediğim gibi çözüldü",
    "Mükemmel — hızlı ve net çözüldü",
  ];

  return (
    <div className={styles.csatModal}>
      <span className={styles.csatTicket}>SC-4127 · Çözüldü</span>
      <Heading level={4}>Bu çözüm sizi memnun etti mi?</Heading>
      <Text size="sm" color="secondary">
        Bilet kapatılmadan önce 1–5 yıldız puanlamanız istenir. Bu skor ekip
        CSAT raporunda kullanılır.
      </Text>
      <div style={{ display: "flex", justifyContent: "center", padding: "var(--sc-space-2) 0" }}>
        <Rate
          value={score ?? 0}
          onChange={setScore}
          tooltips={hints}
        />
      </div>
      <div className={styles.csatHint}>
        {score !== null && score > 0 ? hints[score - 1] : "Bir yıldıza tıkla"}
      </div>
      <div className={styles.csatActions}>
        <Button type="default" size="small">Şimdi değil</Button>
        <Button type="primary" size="small" disabled={!score}>Gönder</Button>
      </div>
    </div>
  );
}

function KbArticleMock() {
  const [helpful, setHelpful] = useState<number | null>(null);
  return (
    <div className={styles.kbCard}>
      <div className={styles.kbHeader}>
        <Heading level={5}>VPN bağlantı sorunu — adım adım çözüm</Heading>
        <span className={styles.kbMeta}>5 dk okuma · KB-1024</span>
      </div>
      <Text size="sm" color="secondary">
        Aşağıdaki makalenin sorununuzu çözmesinde ne kadar yararlı olduğunu
        oylayın.
      </Text>
      <div className={styles.kbActions}>
        <Text size="sm" color="secondary">Bu makale yararlı oldu mu?</Text>
        <Rate
          count={2}
          value={helpful ?? 0}
          onChange={setHelpful}
          character={({ index }) =>
            index === 0 ? (
              <ThumbsDown style={{ verticalAlign: "middle" }} />
            ) : (
              <ThumbsUp style={{ verticalAlign: "middle" }} />
            )
          }
          tooltips={["Yararsız", "Yararlı"]}
        />
        {helpful !== null && (
          <Text size="xs" color="tertiary">
            · {helpful === 1 ? "Yararsız" : "Yararlı"} olarak işaretlendi
          </Text>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function RatePage() {
  const [basic, setBasic] = useState<number | null>(3);
  const [half, setHalf] = useState<number>(2.5);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Rate</Display>
        <Text size="lg" color="secondary">
          Yıldız rating. Bilet çözümü sonrası CSAT, KB makalesi memnuniyet,
          ürün rating. ServiceCore <strong>tek accent</strong> felsefesi gereği
          yıldız rengi mavi — istenirse <code>character</code> ile sarı/icon
          override.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#count">Count</a>
        <a href="#half">allowHalf</a>
        <a href="#tooltips">Tooltips</a>
        <a href="#character">Custom Char</a>
        <a href="#readonly">Read-only</a>
        <a href="#mock">Mocklar</a>
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
              <code>value</code>, <code>defaultValue</code>, <code>count</code>,{" "}
              <code>allowClear</code>, <code>allowHalf</code>,{" "}
              <code>disabled</code>, <code>character</code> (4.4+ function
              form), <code>tooltips</code>,{" "}
              <code>onChange</code>, <code>onHoverChange</code>,{" "}
              <code>onFocus</code>, <code>onBlur</code>, <code>onKeyDown</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>keyboard</code> prop'u (5.18+) — 5.7'de klavye kontrolü{" "}
              <strong>default açık</strong>, kapatmak için <code>onKeyDown</code>{" "}
              ile preventDefault çağırman gerekir.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — sade signature"
          description={
            <>
              <code>{`(value: number) => void`}</code> — Checkbox/Radio gibi
              event objesi değil, direkt sayı verir.{" "}
              <code>allowClear</code> açıkken aynı yıldıza tekrar tıklamak{" "}
              <code>0</code> set eder.
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
        <MockBlock caption="Controlled — onChange ile state">
          <div className={styles.row}>
            <Rate value={basic ?? 0} onChange={setBasic} />
            <span className={styles.scoreNum}>value: {basic ?? "null"}</span>
          </div>
        </MockBlock>
        <CodeBlock>{`const [score, setScore] = useState<number | null>(0);

<Rate value={score ?? 0} onChange={setScore} />`}</CodeBlock>
      </section>

      {/* ── COUNT ── */}
      <section id="count" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>count</span>
          <Heading level={2}>Count — yıldız sayısı</Heading>
        </div>
        <Text size="md" color="secondary">
          Default 5. CSAT için klasik 5, NPS-tarzı ölçüm için 10 kullanılabilir
          ama 10 yıldız <strong>yer israfı</strong> ve scan zor — onun yerine
          Slider veya numbered Radio.
        </Text>
        <MockBlock caption="Farklı count'lar">
          <div className={styles.stack}>
            <div className={styles.row}>
              <span className={styles.label}>3 yıldız</span>
              <Rate count={3} defaultValue={2} />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>5 (default)</span>
              <Rate defaultValue={4} />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>10 yıldız</span>
              <Rate count={10} defaultValue={7} />
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── ALLOW HALF ── */}
      <section id="half" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>allowHalf</span>
          <Heading level={2}>allowHalf — yarım yıldız</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>allowHalf</code> kullanıcının yarım yıldız seçmesine izin verir
          (3.5 gibi). Skor gösterirken (ortalama rating) zaten yarım gerekir.
        </Text>
        <MockBlock caption="Yarım yıldız + kontrollü">
          <div className={styles.row}>
            <Rate allowHalf value={half} onChange={setHalf} />
            <span className={styles.scoreNum}>value: {half}</span>
          </div>
        </MockBlock>
        <CodeBlock>{`<Rate allowHalf value={3.5} onChange={setScore} />`}</CodeBlock>
      </section>

      {/* ── TOOLTIPS ── */}
      <section id="tooltips" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>tooltips</span>
          <Heading level={2}>Tooltips — yıldıza hover'da açıklama</Heading>
        </div>
        <Text size="md" color="secondary">
          Her yıldıza hover'da küçük açıklama. CSAT'ta &quot;Kötü&quot;,{" "}
          &quot;Orta&quot;, &quot;Mükemmel&quot; gibi etiketler — kullanıcı
          rakamla değil <strong>anlamla</strong> oylar.
        </Text>
        <MockBlock caption="5 yıldız her birine tooltip">
          <Rate
            tooltips={["Çok kötü", "Kötü", "Orta", "İyi", "Mükemmel"]}
            defaultValue={4}
          />
        </MockBlock>
        <CodeBlock>{`<Rate tooltips={["Çok kötü","Kötü","Orta","İyi","Mükemmel"]} />`}</CodeBlock>
      </section>

      {/* ── CUSTOM CHARACTER ── */}
      <section id="character" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>character</span>
          <Heading level={2}>Custom Character — Carbon icon / text</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>character</code> hem <strong>ReactNode</strong> (sabit) hem{" "}
          <strong>function</strong> (index-bazlı, 4.4+) kabul eder. Thumbs
          up/down, satisfaction face, rakam, harf — yıldız yerine ne istersen.
        </Text>

        <MockBlock caption="Carbon icon — satisfaction">
          <Rate
            character={<FaceSatisfied />}
            defaultValue={3}
            tooltips={["Çok kötü", "Kötü", "Orta", "İyi", "Harika"]}
          />
        </MockBlock>

        <MockBlock caption="Function form — her indexte farklı icon">
          <Rate
            count={2}
            character={({ index }) =>
              index === 0 ? <ThumbsDown /> : <ThumbsUp />
            }
            tooltips={["Yararsız", "Yararlı"]}
          />
        </MockBlock>

        <MockBlock caption="Text karakter — rakam">
          <Rate
            character={({ index }) => <span>{(index ?? 0) + 1}</span>}
            count={5}
            defaultValue={3}
            style={{ fontSize: 18 }}
          />
        </MockBlock>

        <CodeBlock>{`// Sabit Carbon icon
<Rate character={<FaceSatisfied />} />

// Function form — index'e göre
<Rate
  count={2}
  character={({ index }) =>
    index === 0 ? <ThumbsDown /> : <ThumbsUp />
  }
/>

// Text karakter
<Rate character={({ index }) => <span>{index + 1}</span>} />`}</CodeBlock>
      </section>

      {/* ── READ-ONLY ── */}
      <section id="readonly" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Read-only — skor gösterme</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>disabled</code> + sabit <code>value</code> ile read-only skor
          gösterimi. Ürün listesi, KB makalesi ortalama puanı, bilet geçmişinde
          eski rating.
        </Text>
        <MockBlock caption="Kullanıcı tıklayamaz, sadece görüntüler">
          <div className={styles.stack}>
            <div className={styles.row}>
              <span className={styles.label}>KB-1024</span>
              <Rate disabled value={4.5} allowHalf />
              <span className={styles.scoreNum}>4.5 / 5</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>KB-1025</span>
              <Rate disabled value={3} />
              <span className={styles.scoreNum}>3 / 5</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>KB-1026</span>
              <Rate disabled value={1.5} allowHalf />
              <span className={styles.scoreNum}>1.5 / 5</span>
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── MOCKS ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Gerçek Senaryolar</Heading>
        </div>

        <DoDontGrid
          doItems={[
            "Bilet çözümü sonrası CSAT (5 yıldız + tooltips)",
            "KB makalesi 'Bu yararlı oldu mu?' (2 yıldız thumbs up/down)",
            "Hizmet sağlayıcı/SLA partner ortalama rating (disabled gösterim)",
            "Kullanıcı eğitim materyali rating (5 yıldız + half)",
          ]}
          dontItems={[
            "NPS skoru (0–10) → o Slider veya numbered Radio",
            "Çok dar bağlamda Rate (yıldız hep tek metafor → satışta uygun, BT'de zayıf)",
            "Sarı yıldız zorunlu hissi → character ile change edebilirsin ama ServiceCore default mavi",
            "Decimal precision (4.27 gibi) — allowHalf yarım yıldız yeter, daha hassas number",
          ]}
        />

        <MockBlock caption="CSAT modal — bilet kapama anketi (interactive)">
          <CsatModalMock />
        </MockBlock>

        <MockBlock caption="KB makalesi rating — thumbs up/down (Carbon icon character)">
          <KbArticleMock />
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
          message="Hata 1 — NPS için Rate (0–10)"
          description={
            <>
              NPS 0–10 ölçek; 10 yıldız Rate yer israfı + scan zor.{" "}
              <strong>Çözüm:</strong> Slider 0–10 veya 11 numbered Radio
              (button mode).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Yıldızlara tooltip eklemeden 5 puan vermek"
          description={
            <>
              "3 ne demek?" sorusu. Kullanıcı tahmin etmek zorunda kalır →
              ekipler arası tutarsız skor. <strong>Çözüm:</strong>{" "}
              <code>tooltips</code> ile anlam ver (Kötü/Orta/İyi/...).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Ortalama skoru int olarak göstermek"
          description={
            <>
              Bir ürün ortalama 4.2 puan ama 4 yıldız gösterirsen veri kaybı.{" "}
              <strong>Çözüm:</strong> <code>allowHalf</code> + decimal value
              (<code>4.2 → 4 dolu + yarım</code>) veya 4.5 yuvarlanır.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — onChange yerine onHoverChange ile state tutmak"
          description={
            <>
              <code>onHoverChange</code> her mouse hareketi tetiklenir →
              gereksiz re-render. <strong>State'i</strong>{" "}
              <code>onChange</code>'de tut, preview için onHoverChange'i
              local state'e bağla.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Disabled state'i opacity ile göstermek"
          description={
            <>
              Read-only rating skoru tam görünmeli — opacity:0.5 bunu zayıflatır.
              <strong>Çözüm:</strong> Sadece <code>disabled</code> yeterli,
              cursor değişir ama renkler tam kalır.
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
