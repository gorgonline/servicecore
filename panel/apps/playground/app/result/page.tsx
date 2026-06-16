"use client";

import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Button, Result } from "@servicecoreui/ui/wraps";
import { CheckmarkFilled, Download } from "@carbon/icons-react";
import styles from "./result.module.css";

/* ────────────────────────────────────────────────
 * Helpers
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

export default function ResultPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Result</Display>
        <Text size="lg" color="secondary">
          Akış sonucu sayfa/bölüm — büyük ikon + title + subTitle + action.
          "Bilet oluşturuldu", "404", "500 Sunucu hatası". <strong>Sayfa
          bütününü dolduran sonuç gösterimi.</strong>
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">vs Empty/Alert/Modal</a>
        <a href="#status">7 Status</a>
        <a href="#extra">Extra (actions)</a>
        <a href="#children">Children (detay blok)</a>
        <a href="#custom">Custom Icon</a>
        <a href="#realworld">Real-world</a>
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
          message="5.7'de mevcut"
          description={
            <>
              <strong>Core:</strong> <code>status</code>{" "}
              (success/error/info/warning/404/403/500),{" "}
              <code>title</code>, <code>subTitle</code>, <code>icon</code>{" "}
              (custom — built-in icon'u override eder), <code>extra</code>{" "}
              (action buttons slot, çoklu element için array),{" "}
              <code>children</code> (alt blok — log/code/detay liste).
              <br />
              <strong>Default illustration:</strong> 404/403/500 için AntD
              dahili SVG çizimi, success/error/info/warning için Anticon.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK"
          description={
            <>
              <code>classNames</code>/<code>styles</code> semantic DOM (5.8+) —{" "}
              <code>className</code> + global stil veya wrapper kullan.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Result vs Empty vs Alert vs Modal</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Result: akış SONUCU — 'Bilet oluşturuldu', '404', 'Export hazır'",
            "Empty: liste/data YOK — 'Hiç bilet yok, oluştur'",
            "Alert: sayfa içi inline uyarı — kullanıcı dismiss edebilir",
            "Modal: blocking confirm — kullanıcı karar vermeli",
          ]}
          dontItems={[
            "Toast'ta gösterilecek mesaj için Result (Message kullan)",
            "Form altında inline hata için Result (Alert kullan)",
            "Veri yokken Result.error (Empty + CTA)",
            "Onay sorusu için Result (Modal.confirm)",
          ]}
        />
      </section>

      {/* ── STATUS ── */}
      <section id="status" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>7 status</span>
          <Heading level={2}>Status — 4 anticon + 3 illustration</Heading>
        </div>

        <MockBlock caption="success — bilet oluşturuldu">
          <Result
            status="success"
            title="Bilet oluşturuldu"
            subTitle="SC-4127 — Acme A.Ş., P1 öncelikli, atanmamış."
            extra={[
              <Button key="open" type="primary">
                Bileti aç
              </Button>,
              <Button key="new">Yeni bilet</Button>,
            ]}
          />
        </MockBlock>

        <MockBlock caption="error — kaydetme başarısız">
          <Result
            status="error"
            title="Kaydetme başarısız"
            subTitle="Aşağıdaki alanları doldur ve tekrar dene."
            extra={<Button type="primary">Düzenle</Button>}
          />
        </MockBlock>

        <MockBlock caption="info — özelliğe erişim için yetki gerekli">
          <Result
            status="info"
            title="Bu özellik henüz aktif değil"
            subTitle="Hesabını yükseltmek için yöneticine başvur."
            extra={<Button type="primary">Daha fazla bilgi</Button>}
          />
        </MockBlock>

        <MockBlock caption="warning — uyarı">
          <Result
            status="warning"
            title="Devam etmeden önce kontrol et"
            subTitle="Bağlı 3 bilet etkilenecek. Onayladıktan sonra geri alınamaz."
            extra={<Button danger>Yine de devam et</Button>}
          />
        </MockBlock>

        <MockBlock caption="404 — sayfa bulunamadı">
          <Result
            status="404"
            title="404"
            subTitle="Aradığın sayfa mevcut değil."
            extra={<Button type="primary">Ana sayfa</Button>}
          />
        </MockBlock>

        <MockBlock caption="403 — yetkin yok">
          <Result
            status="403"
            title="403"
            subTitle="Bu sayfaya erişim yetkin yok."
            extra={<Button type="primary">Geri dön</Button>}
          />
        </MockBlock>

        <MockBlock caption="500 — sunucu hatası">
          <Result
            status="500"
            title="500"
            subTitle="Bir şeyler ters gitti. Tekrar denemen yeterli olabilir."
            extra={<Button type="primary">Yeniden dene</Button>}
          />
        </MockBlock>
      </section>

      {/* ── EXTRA ── */}
      <section id="extra" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>extra</span>
          <Heading level={2}>Extra — action button slot</Heading>
        </div>
        <Text size="md" color="secondary">
          Tek buton için ReactNode, çoklu için array (her elemente{" "}
          <code>key</code>). En az 1, en fazla 2-3 buton (primary + cancel /
          tekrar dene).
        </Text>
        <CodeBlock>{`// Tek
<Result extra={<Button type="primary">Ana sayfa</Button>} />

// Array (key zorunlu)
<Result
  extra={[
    <Button key="primary" type="primary">Bileti aç</Button>,
    <Button key="secondary">Yeni bilet</Button>,
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── CHILDREN ── */}
      <section id="children" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>children</span>
          <Heading level={2}>Children — alt detay bloğu (log/code/liste)</Heading>
        </div>
        <Text size="md" color="secondary">
          Title/subTitle dışı içerik. Error code, trace ID, etkilenen kaynak
          listesi gibi metadata. Bizim wrap'ta <code>bg-muted</code> + radius +
          border ile log kutu görünümü.
        </Text>
        <MockBlock caption="500 + trace bilgisi">
          <Result
            status="500"
            title="Sunucu hatası"
            subTitle="Talebin işlenemedi. Geliştirici ekibe ileten bilgilerle birlikte tekrar dene."
            extra={
              <>
                <Button>Loga git</Button>
                <Button type="primary">Yeniden dene</Button>
              </>
            }
          >
            <div className={styles.logBlock}>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Trace ID</span>
                <span className={styles.logValue}>7c4a-9e21-bb38-c7d0</span>
              </div>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Endpoint</span>
                <span className={styles.logValue}>POST /api/v2/tickets</span>
              </div>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Status</span>
                <span className={styles.logValue}>500 Internal Server Error</span>
              </div>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Zaman</span>
                <span className={styles.logValue}>2026-05-30 14:23:07 UTC</span>
              </div>
            </div>
          </Result>
        </MockBlock>
      </section>

      {/* ── CUSTOM ICON ── */}
      <section id="custom" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>icon</span>
          <Heading level={2}>Custom Icon — built-in'i override et</Heading>
        </div>
        <Text size="md" color="secondary">
          Status default ikonu yerine kendi (Carbon) ikonunu ver. Renk{" "}
          <code>style</code> ile.
        </Text>
        <MockBlock caption="Carbon CheckmarkFilled + accent">
          <Result
            icon={
              <CheckmarkFilled
                size={72}
                style={{ color: "var(--sc-color-accent)" }}
              />
            }
            title="Export hazır"
            subTitle="bilet-export-2026-Q1.xlsx (47 KB)"
            extra={
              <Button type="primary" leadingIcon={<Download />}>
                İndir
              </Button>
            }
          />
        </MockBlock>
      </section>

      {/* ── REAL-WORLD ── */}
      <section id="realworld" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>ServiceCore</span>
          <Heading level={2}>Real-world senaryolar</Heading>
        </div>

        <MockBlock caption="Bulk action — 47 bilet kapatıldı">
          <Result
            status="success"
            title="47 bilet kapatıldı"
            subTitle="Toplu kapama işlemi tamamlandı. Müşterilere otomatik bilgilendirme gönderildi."
            extra={[
              <Button key="view" type="primary">
                Sonuçları gör
              </Button>,
              <Button key="back">Dashboard'a dön</Button>,
            ]}
          />
        </MockBlock>

        <MockBlock caption="403 — modül yetkin yok">
          <Result
            status="403"
            title="Bu modüle erişim yok"
            subTitle="Asset Management modülünü kullanmak için yöneticine erişim talebi gönder."
            extra={[
              <Button key="request" type="primary">
                Talep gönder
              </Button>,
              <Button key="back">Geri dön</Button>,
            ]}
          />
        </MockBlock>

        <MockBlock caption="Import done — kısmi başarı (warning)">
          <Result
            status="warning"
            title="Import tamamlandı (kısmi)"
            subTitle="142 / 150 satır başarıyla import edildi. 8 satırda hata."
            extra={[
              <Button key="errors" type="primary">
                Hataları gör
              </Button>,
              <Button key="continue">Devam et</Button>,
            ]}
          >
            <div className={styles.logBlock}>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Dosya</span>
                <span className={styles.logValue}>asset-envanteri-2026.xlsx</span>
              </div>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Toplam satır</span>
                <span className={styles.logValue}>150</span>
              </div>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Başarılı</span>
                <span className={styles.logValue}>142</span>
              </div>
              <div className={styles.logRow}>
                <span className={styles.logKey}>Hata</span>
                <span className={styles.logValue}>8 (satır 23, 47, 61, 82, 99, 117, 134, 148)</span>
              </div>
            </div>
          </Result>
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
          message="Hata 1 — Veri yok için Result.info"
          description={
            <>
              "Hiç bilet yok" → Result değil, <strong>Empty</strong>.
              Empty + CTA daha doğru pattern (Result büyük, akış sonucu için).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Inline uyarı için Result.warning"
          description={
            <>
              Form altına büyük Result koymak yer israfı.{" "}
              <strong>Çözüm:</strong> Alert (inline, kompakt, dismiss edilebilir).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Toast içeriği için Result"
          description={
            <>
              "Kopyalandı" Result olmamalı. <strong>Çözüm:</strong> Message
              toast (auto-dismiss 3sn).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Title + subTitle çok uzun"
          description={
            <>
              Title 1 satır, subTitle 1-2 satır olmalı. Daha fazla detay →
              <strong> children'da</strong> yapılandırılmış blok.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Extra butonsuz"
          description={
            <>
              Sonuç sayfası kullanıcıyı bir yere yönlendirmeli. Action yoksa
              kullanıcı ne yapacağını bilmez. <strong>Çözüm:</strong> En az 1
              CTA — "Geri dön", "Ana sayfa", "Yeniden dene".
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — 4+ extra button"
          description={
            <>
              Çok fazla seçenek karar yorgunluğu. <strong>Çözüm:</strong> Max
              2-3 buton (primary + secondary [+ link]). Diğer aksiyonlar
              Dropdown ile sıkıştır.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 7 — 500 hatasında trace ID yok"
          description={
            <>
              Kullanıcı destek açacaksa trace gerekiyor. <strong>Çözüm:</strong>{" "}
              <code>children</code> içinde Trace ID + endpoint + zaman göster.
            </>
          }
        />
      </section>
    </main>
  );
}
