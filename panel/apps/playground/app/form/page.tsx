"use client";

import { useState } from "react";
import { Add, TrashCan, Information } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
} from "@servicecoreui/ui/wraps";
import styles from "./form.module.css";

/* ────────────────────────────────────────────────
 * Section helpers
 * ──────────────────────────────────────────────── */

function MockBlock({
  caption,
  children,
  wide,
}: {
  caption: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={`${styles.mockFrame} ${wide ? styles.mockFrameWide : ""}`}>
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
 * Real-world mock — Bilet oluşturma formu
 * ──────────────────────────────────────────────── */

function TicketCreateMock() {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

  const onFinish = (values: unknown) => {
    setSubmitted(values as Record<string, unknown>);
  };

  // useWatch ile kategoriye bağlı UI
  const category = Form.useWatch("category", form);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ priority: "p3", notify: true }}
      requiredMark="optional"
    >
      <Form.Item name="title" label="Bilet başlığı" rules={[{ required: true, message: "Başlık girilmeli" }, { max: 100, message: "En fazla 100 karakter" }]}>
        <Input placeholder="örn. Print server bağlanamıyor" />
      </Form.Item>

      <Form.Item name="category" label="Kategori" rules={[{ required: true, message: "Kategori seçilmeli" }]}>
        <Select
          placeholder="Kategori seç"
          options={[
            { label: "Network", value: "network" },
            { label: "Donanım", value: "hardware" },
            { label: "Yazılım", value: "software" },
            { label: "Erişim", value: "access" },
          ]}
        />
      </Form.Item>

      {/* category="network" ise subnet sor — cross-field dependency */}
      {category === "network" && (
        <Form.Item
          name="subnet"
          label="İlgili subnet"
          rules={[{ required: true, message: "Subnet bilgisi gerekli", pattern: /^\d{1,3}(\.\d{1,3}){3}\/\d{1,2}$/, } as never]}
          extra="CIDR notasyonu: 10.0.0.0/24"
        >
          <Input placeholder="10.0.0.0/24" />
        </Form.Item>
      )}

      <Form.Item name="priority" label="Öncelik" rules={[{ required: true }]}>
        <Select
          options={[
            { label: "P1 — Kritik", value: "p1" },
            { label: "P2 — Yüksek", value: "p2" },
            { label: "P3 — Orta", value: "p3" },
            { label: "P4 — Düşük", value: "p4" },
          ]}
        />
      </Form.Item>

      <Form.Item name="dueDate" label="SLA bitiş" extra="Boş bırakılırsa öncelikten hesaplanır">
        <DatePicker showTime={{ format: "HH:mm" }} format="DD MMMM YYYY HH:mm" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="description" label="Açıklama" rules={[{ required: true, min: 10, message: "En az 10 karakter" }]}>
        <Input.TextArea rows={3} placeholder="Sorunu detaylı anlat..." />
      </Form.Item>

      <Form.Item name="notify" valuePropName="checked">
        <Checkbox>E-posta bildirimi gönder</Checkbox>
      </Form.Item>

      <div className={styles.actions}>
        <Button type="default" onClick={() => form.resetFields()}>
          Vazgeç
        </Button>
        <Button type="primary" htmlType="submit">
          Bilet Oluştur
        </Button>
      </div>

      {submitted && (
        <div style={{ marginTop: "var(--sc-space-4)" }}>
          <Alert type="success" showIcon message="Form submit'lendi" description={<Code block>{JSON.stringify(submitted, null, 2)}</Code>} />
        </div>
      )}
    </Form>
  );
}

/* ────────────────────────────────────────────────
 * Methods demo — form instance metotları
 * ──────────────────────────────────────────────── */

function MethodsMock() {
  const [form] = Form.useForm();

  return (
    <>
      <div className={styles.methodBar}>
        <Button size="small" type="default" onClick={() => form.setFieldsValue({ name: "Mehmet", role: "admin" })}>
          setFieldsValue
        </Button>
        <Button size="small" type="default" onClick={() => form.resetFields()}>
          resetFields
        </Button>
        <Button size="small" type="default" onClick={() => form.validateFields().then((v) => console.log("OK", v)).catch((e) => console.log("FAIL", e))}>
          validateFields
        </Button>
        <Button size="small" type="default" onClick={() => alert(JSON.stringify(form.getFieldsValue(), null, 2))}>
          getFieldsValue
        </Button>
      </div>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="İsim" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Rol">
          <Select
            options={[
              { label: "Admin", value: "admin" },
              { label: "Operatör", value: "operator" },
              { label: "Son kullanıcı", value: "user" },
            ]}
          />
        </Form.Item>
      </Form>
    </>
  );
}

/* ────────────────────────────────────────────────
 * Watch demo
 * ──────────────────────────────────────────────── */

function WatchMock() {
  const [form] = Form.useForm();
  const title = Form.useWatch("title", form) ?? "";
  const priority = Form.useWatch("priority", form);

  return (
    <Form form={form} layout="vertical" initialValues={{ priority: "p3" }}>
      <Form.Item name="title" label="Başlık">
        <Input placeholder="Yazmaya başla..." />
      </Form.Item>
      <Form.Item name="priority" label="Öncelik">
        <Select
          options={[
            { label: "P1 — Kritik", value: "p1" },
            { label: "P2 — Yüksek", value: "p2" },
            { label: "P3 — Orta", value: "p3" },
          ]}
        />
      </Form.Item>
      <div className={styles.row}>
        <span className={styles.watchPreview}>title: &quot;{title || "—"}&quot;</span>
        <span className={styles.watchPreview}>priority: {priority}</span>
      </div>
    </Form>
  );
}

/* ────────────────────────────────────────────────
 * Form.List demo — dinamik etiket listesi
 * ──────────────────────────────────────────────── */

function ListMock() {
  return (
    <Form layout="vertical" initialValues={{ tags: [{ name: "ofis-3" }] }}>
      <Form.Item label="Etiketler" extra="Bilete istediğin kadar etiket ekle">
        <Form.List name="tags">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className={styles.listRow}>
                  <Form.Item
                    name={[field.name, "name"]}
                    rules={[{ required: true, message: "Etiket adı gerekli" }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input placeholder="örn. network" />
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    leadingIcon={<TrashCan />}
                    onClick={() => remove(field.name)}
                    aria-label="Sil"
                  />
                </div>
              ))}
              <Button type="dashed" block leadingIcon={<Add />} onClick={() => add()}>
                Etiket ekle
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>
    </Form>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function FormPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Form</Display>
        <Text size="lg" color="secondary">
          ITSM panelinin standart form library'si. State management, validation,
          submit handling, cross-field reactivity — hepsi Form'a bırakılır,
          <strong> useState ile manuel kontrol etmeyin</strong>. AntD Form'un
          tüm API'si 5.7 baseline ile birebir.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#layout">Layout</a>
        <a href="#temel">Temel</a>
        <a href="#validation">Validation</a>
        <a href="#required-mark">requiredMark</a>
        <a href="#methods">Methods</a>
        <a href="#watch">Watch</a>
        <a href="#list">Form.List</a>
        <a href="#mock">Bilet Formu</a>
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
          message="Form'un büyük çoğunluğu 5.7'de mevcut"
          description={
            <>
              <code>Form</code>, <code>Form.Item</code>, <code>Form.List</code>,{" "}
              <code>Form.ErrorList</code>, <code>Form.Provider</code>,{" "}
              <code>Form.useForm</code>, <code>Form.useFormInstance</code>,{" "}
              <code>Form.useWatch</code> (basit), <code>Form.Item.useStatus</code>,{" "}
              tüm Rule prop'ları (required/message/pattern/type/min/max/len/
              validator/transform/whitespace/warningOnly), <code>layout</code>,{" "}
              <code>labelCol</code>/<code>wrapperCol</code>,{" "}
              <code>requiredMark</code>, <code>scrollToFirstError</code>,{" "}
              <code>validateMessages</code>, <code>initialValues</code>,{" "}
              <code>onFinish</code>/<code>onValuesChange</code>/
              <code>onFieldsChange</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>variant</code> (5.13+),{" "}
              <code>clearOnDestroy</code> (5.18+),{" "}
              <code>hasFeedback={`{{ icons }}`}</code> object (5.9+){" "}
              — boolean form var,{" "}
              <code>validateDebounce</code> (5.9+),{" "}
              <code>Form.Item.layout</code> (5.18+) — Form root'tan miras al,{" "}
              <code>useWatch</code> selector (5.12+) — basit name path kullan,{" "}
              <code>useWatch</code> WatchOptions (5.4+){" "}
              — sadece <code>form</code> argümanı.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="Form-child binding — valuePropName kuralı"
          description={
            <>
              AntD Form, child'ı <code>value</code> + <code>onChange</code>{" "}
              prop'larıyla bağlar. Bunu kullanmayan input'lar için override:
              <br />
              <strong>Checkbox/Switch:</strong>{" "}
              <code>valuePropName=&quot;checked&quot;</code>
              <br />
              <strong>Upload:</strong>{" "}
              <code>{`valuePropName="fileList"`}</code> +{" "}
              <code>{`getValueFromEvent={e => e?.fileList}`}</code>
            </>
          }
        />
      </section>

      {/* ── LAYOUT ── */}
      <section id="layout" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>layout</span>
          <Heading level={2}>Layout — vertical / horizontal / inline</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>vertical</code> ServiceCore default — label üstte, alan altta.
          Mobile uyumlu, okuması kolay. <code>horizontal</code> label solda,
          dar form'larda; <code>inline</code> filter bar gibi yatay sıralamada.
        </Text>

        <DoDontGrid
          doItems={[
            "vertical: %95 formda — bilet oluştur, settings, modal form",
            "horizontal: ayar paneli (label kısa + alan uzun) — labelCol={{span:6}}",
            "inline: filter bar, search form (3-4 küçük alan yan yana)",
          ]}
          dontItems={[
            "horizontal'da label çok uzun (taşar) → vertical'a geç",
            "inline'da 6+ alan (kaybolur) → vertical + 2-3 sütun grid",
            "Modal içinde horizontal (dar yer) → vertical",
          ]}
        />

        <MockBlock caption="vertical (ServiceCore default)">
          <Form layout="vertical">
            <Form.Item label="Başlık" name="title">
              <Input placeholder="..." />
            </Form.Item>
            <Form.Item label="Kategori" name="cat">
              <Select placeholder="Seç" options={[{ label: "Network", value: "n" }]} />
            </Form.Item>
          </Form>
        </MockBlock>

        <MockBlock caption="horizontal — labelCol/wrapperCol grid">
          <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="Başlık" name="title">
              <Input placeholder="..." />
            </Form.Item>
            <Form.Item label="Kategori" name="cat">
              <Select placeholder="Seç" options={[{ label: "Network", value: "n" }]} />
            </Form.Item>
          </Form>
        </MockBlock>

        <MockBlock caption="inline — filter bar" wide>
          <Form layout="inline">
            <Form.Item label="Durum" name="status">
              <Select placeholder="Tümü" style={{ minWidth: 140 }} options={[{ label: "Açık", value: "open" }, { label: "Kapalı", value: "closed" }]} />
            </Form.Item>
            <Form.Item label="Tarih" name="date">
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Filtrele</Button>
            </Form.Item>
          </Form>
        </MockBlock>
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel kullanım — Form.useForm + onFinish</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>Form.useForm()</code> ile instance al, Form'a{" "}
          <code>form={`{form}`}</code> ile bağla. <code>onFinish</code>{" "}
          submit'te tüm validate edilmiş değerleri verir.
        </Text>

        <CodeBlock>{`const [form] = Form.useForm();

<Form
  form={form}
  layout="vertical"
  initialValues={{ priority: "p3" }}
  onFinish={values => api.create(values)}
>
  <Form.Item name="title" label="Başlık" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
  <Form.Item name="priority" label="Öncelik">
    <Select options={[...]} />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">Kaydet</Button>
  </Form.Item>
</Form>`}</CodeBlock>
      </section>

      {/* ── VALIDATION ── */}
      <section id="validation" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>rules</span>
          <Heading level={2}>Validation — Rule patterns</Heading>
        </div>
        <Text size="md" color="secondary">
          Her Form.Item'a <code>rules</code> dizisi ver. AntD validate eder,
          submit'i bloklamak için boş bırakmaz. Custom validator promise döner.
        </Text>

        <MockBlock caption="Tüm rule tipleri" wide>
          <Form layout="vertical">
            <Form.Item name="email" label="E-posta" rules={[{ required: true, message: "Gerekli" }, { type: "email", message: "Geçerli e-posta girin" }]}>
              <Input placeholder="ad@firma.com" />
            </Form.Item>
            <Form.Item name="phone" label="Telefon" rules={[{ pattern: /^\+?\d{10,13}$/, message: "Geçerli telefon formatı (10-13 hane)" }]}>
              <Input placeholder="+905551234567" />
            </Form.Item>
            <Form.Item name="password" label="Şifre" rules={[{ required: true }, { min: 8, message: "En az 8 karakter" }, { pattern: /[A-Z]/, message: "En az 1 büyük harf" }, { pattern: /\d/, message: "En az 1 rakam" }]} hasFeedback>
              <Input.Password placeholder="••••••••" />
            </Form.Item>
            <Form.Item name="custom" label="Custom validator (yasaklı kelime: 'test')" rules={[{ validator: async (_, value) => {
              if (typeof value === "string" && value.toLowerCase().includes("test")) {
                throw new Error("'test' kullanılamaz");
              }
            } }]}>
              <Input placeholder="Bir şey yaz..." />
            </Form.Item>
          </Form>
        </MockBlock>

        <CodeBlock>{`rules={[
  { required: true, message: "Gerekli" },
  { type: "email", message: "Geçerli e-posta" },
  { min: 8, max: 100, message: "8-100 karakter" },
  { pattern: /^[A-Z]/, message: "Büyük harfle başla" },
  { validator: async (_, value) => {
      if (value === "yasak") throw new Error("Yasaklı kelime");
    },
  },
  { warningOnly: true, ... }, // hata yerine uyarı (submit'i bloklamaz)
]}`}</CodeBlock>
      </section>

      {/* ── REQUIRED MARK ── */}
      <section id="required-mark" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>requiredMark</span>
          <Heading level={2}>requiredMark — yıldız vs optional</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>true</code> — zorunlu alanlarda kırmızı yıldız.{" "}
          <code>&quot;optional&quot;</code> tersini yapar: zorunlu OLMAYAN
          alanlarda &quot;(opsiyonel)&quot; rozeti çıkar.{" "}
          <code>false</code> hiçbir işaret koymaz.
        </Text>

        <DoDontGrid
          doItems={[
            'requiredMark=true: çoğunluk zorunlu (5+) — yıldız az yer kaplar',
            'requiredMark="optional": çoğunluk opsiyonel (3+) — yıldız tarlası olmaz, dikkat çekme yeri opsiyonel',
            "requiredMark=false: form 1-2 alan + her şey zorunlu, info gürültü olur",
          ]}
          dontItems={[
            "Hem yıldız hem 'gerekli' yardım metni — tek sinyal yeter",
            "Sadece bazı zorunlu alanlarda yıldız gösterip diğerlerinde göstermemek",
          ]}
        />

        <MockBlock caption='requiredMark="optional" — zorunlu OLMAYANA "(opsiyonel)" yazar'>
          <Form layout="vertical" requiredMark="optional">
            <Form.Item name="title" label="Başlık" rules={[{ required: true }]}>
              <Input placeholder="Zorunlu" />
            </Form.Item>
            <Form.Item name="tags" label="Etiketler">
              <Input placeholder="Opsiyonel" />
            </Form.Item>
            <Form.Item name="note" label="Not">
              <Input placeholder="Opsiyonel" />
            </Form.Item>
          </Form>
        </MockBlock>
      </section>

      {/* ── METHODS ── */}
      <section id="methods" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>FormInstance</span>
          <Heading level={2}>Methods — programmatic kontrol</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>Form.useForm()</code>'dan dönen instance — değer set/get,
          validation tetikleme, reset için. Modal aç/kapat, &quot;şablon
          uygula&quot;, &quot;quick action&quot; gibi senaryolarda işin temeli.
        </Text>
        <MockBlock caption="Üst bar butonlarına tıkla — form state'i değiştir">
          <MethodsMock />
        </MockBlock>
        <CodeBlock>{`form.setFieldsValue({ name: "Mehmet", role: "admin" });
form.resetFields();                         // tüm alanları sıfırla
form.validateFields()                       // promise döner
    .then(values => api.create(values))
    .catch(err => console.log(err.errorFields));
form.getFieldsValue();                       // mevcut tüm değerler
form.getFieldValue("name");                  // tek alan
form.setFieldValue("name", "Ayşe");          // 4.22+ - tek alan setle
form.scrollToField("description");           // hatalı alana scroll
form.submit();                                // manuel submit (onFinish tetikler)`}</CodeBlock>
      </section>

      {/* ── WATCH ── */}
      <section id="watch" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>useWatch</span>
          <Heading level={2}>Watch — başka alanı dinle</Heading>
        </div>
        <Text size="md" color="secondary">
          Bir alanın değerine bağlı dinamik UI (preview, conditional field,
          karakter sayacı). <code>useWatch(name, form)</code> her değişimde
          re-render eder.
        </Text>
        <MockBlock caption="Alt taraftaki rozetlere bak — form değiştikçe güncellenir">
          <WatchMock />
        </MockBlock>
        <CodeBlock>{`const [form] = Form.useForm();
const title    = Form.useWatch("title", form);
const priority = Form.useWatch("priority", form);

return (
  <Form form={form}>
    <Form.Item name="title"><Input /></Form.Item>
    <Form.Item name="priority"><Select options={[...]} /></Form.Item>
    <Preview title={title} priority={priority} />
  </Form>
);

// NOT — 5.7'de selector form'u YOK (5.12+):
//   useWatch(values => values.title.length, form)  ← ÇALIŞMAZ
//   Sadece name path kullan.`}</CodeBlock>
      </section>

      {/* ── FORM.LIST ── */}
      <section id="list" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Form.List</span>
          <Heading level={2}>Form.List — dinamik alan listesi</Heading>
        </div>
        <Text size="md" color="secondary">
          Etiket listesi, varyantlar, custom field listesi gibi
          <strong> kaç tane olacağı kullanıcıya bağlı</strong> alanlar için.
          Render prop pattern: <code>(fields, {`{add, remove, move}`})</code>.
        </Text>
        <MockBlock caption="Etiket ekle/sil — dinamik">
          <ListMock />
        </MockBlock>
        <CodeBlock>{`<Form.List name="tags">
  {(fields, { add, remove }) => (
    <>
      {fields.map(field => (
        <div key={field.key}>
          <Form.Item
            name={[field.name, "name"]}
            rules={[{ required: true }]}
          >
            <Input placeholder="Etiket adı" />
          </Form.Item>
          <Button onClick={() => remove(field.name)}>Sil</Button>
        </div>
      ))}
      <Button type="dashed" onClick={() => add()}>
        + Etiket ekle
      </Button>
    </>
  )}
</Form.List>`}</CodeBlock>
      </section>

      {/* ── REAL MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Bilet Oluşturma — gerçek senaryo</Heading>
        </div>
        <Text size="md" color="secondary">
          ServiceCore'un en sık görülen form'u. Tüm pattern'ler birlikte:
          Input + Select + DatePicker + Checkbox, vertical layout,{" "}
          <code>requiredMark=&quot;optional&quot;</code>, custom validator,
          cross-field dependency (kategori network ise subnet sor),
          submit handler + reset.
        </Text>
        <MockBlock caption="Bilet oluştur — interactive, submit ile JSON görünür">
          <TicketCreateMock />
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
          message="Hata 1 — Her alan için useState"
          description={
            <>
              <code>const [title, setTitle] = useState(&quot;&quot;)</code> ×
              10 alan = 10 state, 10 setState, 10 onChange handler.{" "}
              <strong>Çözüm:</strong> Form.useForm() — tek instance tüm
              state'i yönetir.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Manuel validation"
          description={
            <>
              <code>{`if (!title) { setError("Gerekli") }`}</code> her alan için
              ayrı kontrol. <strong>Çözüm:</strong>{" "}
              <code>rules</code> ver, AntD halleder — submit'te otomatik
              validate, hatalı alana scroll, mesaj göster.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message='Hata 3 — Checkbox/Switch için valuePropName="checked" eklememek'
          description={
            <>
              <code>{`<Form.Item name="aktif"><Checkbox /></Form.Item>`}</code>{" "}
              yazınca AntD <code>value</code> bağlar, ama Checkbox <code>checked</code>{" "}
              ister. Sonuç: değer güncellenmez.{" "}
              <strong>Çözüm:</strong>{" "}
              <code>{`<Form.Item name="aktif" valuePropName="checked">`}</code>
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — onChange'de submit"
          description={
            <>
              Her keystroke'ta backend'e POST → 100 istek 1 saniyede.{" "}
              <strong>Çözüm:</strong> Form'a <code>onFinish</code> ver, submit
              butonu <code>htmlType=&quot;submit&quot;</code> ile bunu tetikler
              — tek istek.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Dynamic field için Form.List yerine state array"
          description={
            <>
              <code>{`const [tags, setTags] = useState([{name: ""}])`}</code>{" "}
              yazınca validation, reset, initialValue, error rendering hepsi
              senin sırtında. <strong>Çözüm:</strong> Form.List — render prop'la
              dinamik field'lar, validation aynı tek yerde.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — useWatch'ı 5.7'de selector formatıyla kullanmak"
          description={
            <>
              <code>{`useWatch(v => v.title.length, form)`}</code> selector
              imzası 5.12+'da geldi. 5.7'de sadece{" "}
              <code>{`useWatch("title", form)`}</code> çalışır — sonra{" "}
              <code>.length</code>'i sen al.
            </>
          }
        />
      </section>
    </main>
  );
}
