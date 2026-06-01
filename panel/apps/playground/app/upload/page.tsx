"use client";

import { useState } from "react";
import Link from "next/link";
import { CloudUpload, Document, Add, UserAvatar } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Upload } from "@servicecoreui/ui/wraps";
import type { UploadProps } from "@servicecoreui/ui/wraps";
import styles from "./upload.module.css";

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

export default function UploadPage() {
  /* Demo: gerçek backend yok — beforeUpload'da false dönüp client-side
   *  simülasyon. Üretimde action="/api/upload" veya customRequest kullan. */
  const fakeUpload: UploadProps["beforeUpload"] = () => false;

  const [picture, setPicture] = useState<UploadProps["fileList"]>([]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Upload</Display>
        <Text size="lg" color="secondary">
          Dosya yükleme. Bilet eki, asset import (CSV), KB dökümanı, profil
          avatarı. <strong>action</strong> ile endpoint, ya da{" "}
          <strong>customRequest</strong> ile özel XHR. Demo'da
          <code>beforeUpload</code>'tan <code>false</code> dönerek
          client-side simülasyon yapılıyor.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#basic">Temel</a>
        <a href="#list-types">List Types</a>
        <a href="#dragger">Dragger</a>
        <a href="#max-accept">Max + Accept</a>
        <a href="#avatar">Avatar</a>
        <a href="#disabled">Disabled</a>
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
              <code>accept</code>, <code>action</code>,{" "}
              <code>beforeUpload</code>, <code>customRequest</code>,{" "}
              <code>data</code>, <code>headers</code>, <code>method</code>,{" "}
              <code>withCredentials</code>, <code>defaultFileList</code>,{" "}
              <code>fileList</code>, <code>directory</code>,{" "}
              <code>disabled</code>,{" "}
              <code>listType</code> (text / picture / picture-card /
              picture-circle 5.2+), <code>maxCount</code> (4.10+),{" "}
              <code>multiple</code>, <code>name</code>,{" "}
              <code>openFileDialogOnClick</code>, <code>previewFile</code>,{" "}
              <code>progress</code>, <code>showUploadList</code> (boolean),{" "}
              <code>iconRender</code>, <code>itemRender</code> (4.16+),{" "}
              <code>isImageUrl</code>, <code>Upload.Dragger</code>,{" "}
              <code>onChange</code>, <code>onPreview</code>,{" "}
              <code>onRemove</code>, <code>onDrop</code>, <code>onDownload</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>showUploadList</code> object form{" "}
              ({`{ showPreviewIcon, showRemoveIcon, showDownloadIcon }`}{" "}
              fonksiyonlar) (5.21+),{" "}
              <code>pastable</code> (5.25+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="Form.Item ile — valuePropName='fileList' + getValueFromEvent"
          description={
            <>
              <code>Upload</code> Form'da special binding ister:
              <br />
              <code>{`<Form.Item name="ekler" valuePropName="fileList"
  getValueFromEvent={e => e?.fileList}>
  <Upload>...</Upload>
</Form.Item>`}</code>
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="beforeUpload — validation + upload kontrolü"
          description={
            <>
              <code>{`(file, fileList) => boolean | Promise<boolean> | "LIST_IGNORE"`}</code>
              <br />
              <strong>true</strong>: upload başlasın. <strong>false</strong>:
              upload atla, listeye ekle. <strong>Promise.reject()</strong>:
              upload iptal et. <strong>"LIST_IGNORE"</strong>: listeye bile
              ekleme. Validation için bunu kullan.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="action vs customRequest"
          description={
            <>
              <strong>action</strong>: basit POST endpoint string.
              <br />
              <strong>customRequest</strong>: tam kontrol — kendi XHR, progress
              callback, abort, signed URL pattern, multipart custom field.
            </>
          }
        />
      </section>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel kullanım</Heading>
        </div>
        <MockBlock caption="Buton trigger + text list">
          <Upload beforeUpload={fakeUpload} multiple>
            <Button type="default" leadingIcon={<CloudUpload />}>
              Dosya seç
            </Button>
          </Upload>
        </MockBlock>
        <CodeBlock>{`<Upload action="/api/upload" multiple>
  <Button leadingIcon={<CloudUpload />}>Dosya seç</Button>
</Upload>`}</CodeBlock>
      </section>

      {/* ── LIST TYPES ── */}
      <section id="list-types" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>listType</span>
          <Heading level={2}>Liste tipleri — text / picture / picture-card</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>text:</strong> sadece dosya adı (default). Dokümanlar için.
          <br />
          <strong>picture:</strong> dosya adı + küçük thumbnail. Karışık tip.
          <br />
          <strong>picture-card:</strong> grid thumbnail. Galeri için.
          <br />
          <strong>picture-circle:</strong> avatar (5.2+, 5.7'de var).
        </Text>

        <MockBlock caption='listType="picture" — küçük thumbnail + isim'>
          <Upload
            beforeUpload={fakeUpload}
            multiple
            listType="picture"
            defaultFileList={[
              {
                uid: "1",
                name: "ekran-goruntusu.png",
                status: "done",
                url: "https://placehold.co/40",
              },
              {
                uid: "2",
                name: "switch-config.txt",
                status: "done",
              },
            ]}
          >
            <Button type="default" leadingIcon={<CloudUpload />}>
              Dosya ekle
            </Button>
          </Upload>
        </MockBlock>

        <MockBlock caption='listType="picture-card" — grid (avatar/gallery için)'>
          <Upload
            beforeUpload={fakeUpload}
            multiple
            listType="picture-card"
            defaultFileList={[
              { uid: "1", name: "1.png", status: "done", url: "https://placehold.co/96/0070F3/FFF" },
              { uid: "2", name: "2.png", status: "done", url: "https://placehold.co/96/16A34A/FFF" },
            ]}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <Add />
              <span style={{ fontSize: 12 }}>Yükle</span>
            </div>
          </Upload>
        </MockBlock>

        <CodeBlock>{`<Upload listType="picture" multiple>...</Upload>
<Upload listType="picture-card" multiple>...</Upload>
<Upload listType="picture-circle" maxCount={1}>...</Upload>  // avatar, 5.7'de var`}</CodeBlock>
      </section>

      {/* ── DRAGGER ── */}
      <section id="dragger" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Upload.Dragger</span>
          <Heading level={2}>Drag &amp; Drop — geniş drop alanı</Heading>
        </div>
        <Text size="md" color="secondary">
          Asset import (CSV/Excel), bilet attachment için. Drop alanına dosya
          sürüklenebilir veya tıklanır.
        </Text>

        <DoDontGrid
          doItems={[
            "Bilet attachment — multiple, geniş alan",
            "CSV import — accept='.csv,.xlsx'",
            "KB makale dosya yükleme",
            "Modal/Drawer içinde yer veriyorsa Dragger açıklamasıyla net",
          ]}
          dontItems={[
            "Tek küçük profil avatarı için Dragger (overkill — picture-circle yeter)",
            "Inline form alanında dragger (yer kapar — küçük Upload button)",
            "Hint metni vermeden Dragger (kullanıcı ne yapacağını bilemez)",
          ]}
        />

        <MockBlock caption="Dragger — geniş drop alanı + hint">
          <Upload.Dragger beforeUpload={fakeUpload} multiple>
            <p className="ant-upload-drag-icon">
              <CloudUpload size={36} />
            </p>
            <p className="ant-upload-text">Dosya sürükle veya tıkla</p>
            <p className="ant-upload-hint">
              PDF, PNG, JPG, DOCX. Tek seferde 10MB&apos;a kadar.
            </p>
          </Upload.Dragger>
        </MockBlock>

        <CodeBlock>{`<Upload.Dragger
  action="/api/upload"
  multiple
  accept=".pdf,.png,.jpg,.docx"
  beforeUpload={(file) => {
    if (file.size > 10 * 1024 * 1024) {
      message.error("Dosya 10MB'tan büyük");
      return Upload.LIST_IGNORE;
    }
    return true;
  }}
>
  <p className="ant-upload-drag-icon"><CloudUpload size={36} /></p>
  <p className="ant-upload-text">Dosya sürükle veya tıkla</p>
  <p className="ant-upload-hint">PDF, PNG, JPG. 10MB max.</p>
</Upload.Dragger>`}</CodeBlock>
      </section>

      {/* ── MAX + ACCEPT ── */}
      <section id="max-accept" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>maxCount · accept</span>
          <Heading level={2}>maxCount + accept — kısıtlamalar</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>maxCount</code> dosya sayısı sınırı. <code>maxCount=1</code>{" "}
          replace mode (eski silinir). <code>accept</code> MIME ya da
          extension whitelist. Mobile'da kameradan çekim için{" "}
          <code>accept="image/*"</code> ile capture açar.
        </Text>
        <MockBlock caption='accept=".pdf,.docx" + maxCount=3'>
          <Upload
            beforeUpload={fakeUpload}
            multiple
            accept=".pdf,.docx"
            maxCount={3}
          >
            <Button type="default" leadingIcon={<Document />}>
              Doküman ekle (max 3)
            </Button>
          </Upload>
        </MockBlock>
        <CodeBlock>{`<Upload accept=".pdf,.docx,.xlsx" maxCount={5} multiple>...</Upload>
<Upload accept="image/*" maxCount={1}>...</Upload>  // avatar replace
<Upload accept=".csv" multiple>...</Upload>          // sadece CSV`}</CodeBlock>
      </section>

      {/* ── AVATAR ── */}
      <section id="avatar" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Avatar Upload — picture-circle + maxCount=1</Heading>
        </div>
        <Text size="md" color="secondary">
          Profil resmi. <code>listType="picture-circle"</code> +{" "}
          <code>maxCount=1</code> (replace mode). 5.7'de var (5.2+'da geldi).
        </Text>
        <MockBlock caption="Avatar upload">
          <Upload
            beforeUpload={fakeUpload}
            listType="picture-circle"
            maxCount={1}
            fileList={picture}
            onChange={({ fileList }) => setPicture(fileList)}
          >
            {(picture?.length ?? 0) < 1 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <UserAvatar />
                <span style={{ fontSize: 12 }}>Foto</span>
              </div>
            )}
          </Upload>
        </MockBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled</Heading>
        </div>
        <MockBlock caption="Disabled Upload">
          <Upload disabled>
            <Button type="default" disabled leadingIcon={<CloudUpload />}>
              Dosya seç
            </Button>
          </Upload>
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
          message="Hata 1 — beforeUpload yerine onChange'de validate"
          description={
            <>
              onChange validate edildiğinde dosya zaten yüklenmiş olur. Boyut/
              tip kontrolü için <code>beforeUpload</code> kullan — Promise
              reject veya <code>Upload.LIST_IGNORE</code> dön.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — accept yok"
          description={
            <>
              Kullanıcı .exe yükler, backend reject eder ama UX kötü.
              <code>accept</code> ile uygun tipleri filtrele — file picker zaten
              uygun dosyaları göstersin.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 3 — Form.Item için valuePropName="fileList" + getValueFromEvent eksik'
          description={
            <>
              Bu iki prop verilmezse Upload'ın değeri Form state'iyle senkron
              olmaz. AntD'nin official binding pattern'i:
              <br />
              <code>{`valuePropName="fileList" getValueFromEvent={e => e?.fileList}`}</code>
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Dragger'da hint yok"
          description={
            <>
              "Dosya sürükle" demek yeterli değil — hangi tip? boyut? Hint
              metniyle açıkla. AntD'nin <code>ant-upload-hint</code>{" "}
              class'ında.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Avatar için listType='picture-card' (kare)"
          description={
            <>
              Avatar dairesel olmalı. <code>listType="picture-circle"</code>{" "}
              kullan (5.2+, 5.7'de var). Kare avatar 90'lardan kalma.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Action endpoint olmadan production'a çıkmak"
          description={
            <>
              Demo'da <code>beforeUpload={`{() => false}`}</code> ile simülasyon
              OK. Üretimde <code>action="/api/..."</code> veya{" "}
              <code>customRequest</code> ile gerçek backend bağla — yoksa
              dosya hiçbir yere gitmez.
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
