"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Mentions } from "@servicecoreui/ui/wraps";
import styles from "./mentions.module.css";

/* ────────────────────────────────────────────────
 * Mock veri
 * ──────────────────────────────────────────────── */

type Person = { value: string; name: string; role: string };

const PEOPLE: Person[] = [
  { value: "mehmet.k",  name: "Mehmet K.", role: "Network Engineer" },
  { value: "ayse.t",    name: "Ayşe T.",   role: "Helpdesk Manager" },
  { value: "burak.d",   name: "Burak D.",  role: "Software Developer" },
  { value: "selin.y",   name: "Selin Y.",  role: "System Admin" },
  { value: "emre.k",    name: "Emre K.",   role: "Security Lead" },
  { value: "deniz.a",   name: "Deniz A.",  role: "DevOps Engineer" },
  { value: "merve.s",   name: "Merve S.",  role: "QA Engineer" },
  { value: "can.o",     name: "Can O.",    role: "Database Admin" },
];

const CHANNELS = [
  { value: "ag-network",     name: "ag-network" },
  { value: "destek-genel",   name: "destek-genel" },
  { value: "kritik-incident",name: "kritik-incident" },
  { value: "release",        name: "release" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
 * Custom option label (avatar + ad + rol)
 * ──────────────────────────────────────────────── */

function PersonOption({ name, role }: { name: string; role: string }) {
  return (
    <div className={styles.optionItem}>
      <span className={styles.optionAvatar}>{initials(name)}</span>
      <div className={styles.optionMeta}>
        <span className={styles.optionName}>{name}</span>
        <span className={styles.optionRole}>{role}</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Real mock — bilet yorum input'u
 * ──────────────────────────────────────────────── */

function CommentReplyMock() {
  const [value, setValue] = useState("");

  const options = useMemo(
    () =>
      PEOPLE.map((p) => ({
        value: p.value,
        label: <PersonOption name={p.name} role={p.role} />,
      })),
    [],
  );

  return (
    <div className={styles.commentMock}>
      <div className={styles.commentItem}>
        <div className={styles.commentAvatar}>AK</div>
        <div className={styles.commentBody}>
          <div className={styles.commentHeader}>
            <Text size="sm" weight="semibold">
              Ahmet K.
            </Text>
            <Text size="xs" color="tertiary">
              · 14 dk önce
            </Text>
          </div>
          <Text size="sm" color="secondary">
            Switch port'u yeniden başlattım, link UP geldi. <span className={styles.commentMention}>@mehmet.k</span> kullanıcının bağlantısı düzeldi mi teyit eder misin?
          </Text>
        </div>
      </div>

      <div className={styles.commentReply}>
        <Mentions
          value={value}
          onChange={setValue}
          placeholder="Yorum yaz · @ ile kişi etiketle, # ile kanal"
          prefix={["@", "#"]}
          autoSize={{ minRows: 3, maxRows: 6 }}
          options={[
            ...options,
            ...CHANNELS.map((c) => ({ value: c.value, label: <Text size="sm">#{c.name}</Text> })),
          ]}
        />
        <div className={styles.commentReplyFooter}>
          <span className={styles.commentHint}>
            <code>@</code> kişi · <code>#</code> kanal · <kbd>↑↓</kbd> gez · <kbd>Enter</kbd> seç
          </span>
          <Button type="primary" size="small" disabled={!value.trim()}>
            Gönder
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function MentionsPage() {
  const [basic, setBasic] = useState("");
  const [filtered, setFiltered] = useState<Person[]>(PEOPLE);

  const onSearch = (text: string, prefix: string) => {
    if (prefix !== "@") return;
    const q = text.toLowerCase();
    setFiltered(PEOPLE.filter((p) => p.name.toLowerCase().includes(q) || p.value.includes(q)));
  };

  const richOptions = useMemo(
    () =>
      filtered.map((p) => ({
        value: p.value,
        label: <PersonOption name={p.name} role={p.role} />,
      })),
    [filtered],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Mentions</Display>
        <Text size="lg" color="secondary">
          <code>@</code> veya <code>#</code> prefix'iyle autocomplete açan
          textarea. Bilet yorumlarında kişi etiketleme, chat, audit comment'i,
          asset tag'leme. Saf TextArea + regex çözmek istemediğin her senaryoda.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#options">Options</a>
        <a href="#async">Async Search</a>
        <a href="#custom">Custom Item</a>
        <a href="#multi">Multi-prefix</a>
        <a href="#placement">Placement</a>
        <a href="#size-status">Size/Status</a>
        <a href="#mock">Yorum Input'u</a>
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
              <code>value</code>, <code>defaultValue</code>,{" "}
              <code>prefix</code> (string | string[]), <code>split</code>,{" "}
              <code>size</code>, <code>placement</code>, <code>disabled</code>,{" "}
              <code>readOnly</code>, <code>autoSize</code>,{" "}
              <code>status</code> (4.19+),{" "}
              <code>options</code> (5.1+ — modern API),{" "}
              <code>notFoundContent</code>, <code>filterOption</code>,{" "}
              <code>validateSearch</code>, <code>getPopupContainer</code>,{" "}
              <code>popupClassName</code>,{" "}
              <code>onChange</code>, <code>onSelect</code>,{" "}
              <code>onSearch</code>, <code>onFocus</code>, <code>onBlur</code>,{" "}
              <code>onPressEnter</code>, <code>onResize</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>allowClear</code> (5.13+) — TextArea olduğu için clear az
              gerekir, manuel reset yeterli,{" "}
              <code>variant</code> (5.13+), <code>onClear</code> (5.20+),{" "}
              <code>onPopupScroll</code> (5.23+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="options vs <Mentions.Option> — options'ı tercih et"
          description={
            <>
              AntD 5.1+'de <code>options</code> prop'u modern API. Hem JSX'i
              temizler hem dinamik listede performansı iyi. Children pattern{" "}
              (<code>&lt;Mentions.Option&gt;</code>) hâlâ destekli ama backward
              compat için.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="value, key olarak saklanır — render zamanı resolve et"
          description={
            <>
              Mentions <code>onSelect</code>'te <code>option.value</code> verir
              (genelde userId/slug). String mesaj <code>"merhaba @mehmet.k"</code>{" "}
              formatında saklanır. Render'da regex ile parse edip{" "}
              <strong>@mehmet.k</strong> → kullanıcı objesine resolve et,
              gerekli linkleri/avatarları o zaman çiz.
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
          <code>@</code> yazınca kişi listesi düşer. <code>↑/↓</code> ile gez,{" "}
          <code>Enter</code> ile seç. Static option listesi yeter, search/filter
          AntD otomatik halleder.
        </Text>
        <MockBlock caption="@ yaz, kişi listesi açılır">
          <Mentions
            value={basic}
            onChange={setBasic}
            placeholder="@ yaz — kişi seç"
            options={PEOPLE.map((p) => ({ value: p.value, label: p.name }))}
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </MockBlock>
        <CodeBlock>{`const [value, setValue] = useState("");

<Mentions
  value={value}
  onChange={setValue}
  placeholder="@ yaz — kişi seç"
  options={[
    { value: "mehmet.k", label: "Mehmet K." },
    { value: "ayse.t",   label: "Ayşe T."   },
    { value: "burak.d",  label: "Burak D."  },
  ]}
/>`}</CodeBlock>
      </section>

      {/* ── OPTIONS ── */}
      <section id="options" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>options vs children</span>
          <Heading level={2}>Modern options vs eski Mentions.Option</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "options array → modern API, dinamik listede temiz",
            "Static <=20 kayıt → options ile inline ver",
            "Custom render → label'a ReactNode ver (avatar+ad+rol)",
            ">20 kayıt → onSearch ile async (aşağıdaki bölüm)",
          ]}
          dontItems={[
            "<Mentions.Option>...</Mentions.Option> JSX — deprecated yolda, dinamik renderi zor",
            "Çok büyük listeyi (100+) options'a doldurmak → onSearch ile lazy yap",
          ]}
        />
        <CodeBlock>{`// Modern API — options
<Mentions options={[{ value: "mehmet.k", label: "Mehmet K." }]} />

// Backward compat — children pattern
<Mentions>
  <Mentions.Option value="mehmet.k">Mehmet K.</Mentions.Option>
</Mentions>`}</CodeBlock>
      </section>

      {/* ── ASYNC ── */}
      <section id="async" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>onSearch</span>
          <Heading level={2}>Async Search — backend'den filtre</Heading>
        </div>
        <Text size="md" color="secondary">
          200+ kullanıcı varsa hepsini önden yüklemek anlamsız.{" "}
          <code>onSearch(text, prefix)</code> her tuş vuruşunda fire eder —
          backend'e debounced query at, sonucu <code>options</code>'a koy.
        </Text>
        <MockBlock caption="@ yaz — burada client-side filtre, gerçekte fetch çağrılır">
          <Mentions
            placeholder="@ yaz — Mehmet, Ayşe, Burak ..."
            onSearch={onSearch}
            options={richOptions}
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </MockBlock>
        <CodeBlock>{`const [opts, setOpts] = useState([]);

const onSearch = useDebouncedCallback((text, prefix) => {
  if (prefix !== "@") return;
  api.searchUsers(text).then(users =>
    setOpts(users.map(u => ({ value: u.id, label: u.name })))
  );
}, 200);

<Mentions onSearch={onSearch} options={opts} />`}</CodeBlock>
      </section>

      {/* ── CUSTOM ITEM ── */}
      <section id="custom" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>label = ReactNode</span>
          <Heading level={2}>Custom Item — avatar + ad + rol</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>label</code> ReactNode kabul eder. Avatar + ad + rol gibi
          rich list öğeleri için. <strong>value</strong> hâlâ string —
          mention metni o değerle yazılır.
        </Text>
        <MockBlock caption="@ yaz — rich autocomplete">
          <Mentions
            placeholder="@ ile etiketle..."
            options={PEOPLE.map((p) => ({
              value: p.value,
              label: <PersonOption name={p.name} role={p.role} />,
            }))}
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </MockBlock>
        <CodeBlock>{`<Mentions
  options={users.map(u => ({
    value: u.username,                          // → @username olarak yazılır
    label: (
      <div className={styles.optionItem}>
        <Avatar src={u.avatar} />
        <div>
          <strong>{u.name}</strong>
          <span>{u.role}</span>
        </div>
      </div>
    ),
  }))}
/>`}</CodeBlock>
      </section>

      {/* ── MULTI PREFIX ── */}
      <section id="multi" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>prefix=[]</span>
          <Heading level={2}>Multi-prefix — @kişi + #kanal</Heading>
        </div>
        <Text size="md" color="secondary">
          Slack-tarzı. <code>@</code> kişi, <code>#</code> kanal/etiket.
          <code>onSearch</code>'in ikinci parametresi prefix gelir — hangi
          listeyi yükleyeceğine ona göre karar verirsin.
        </Text>
        <MockBlock caption="@ veya # ile başla">
          <Mentions
            placeholder="@kişi veya #kanal"
            prefix={["@", "#"]}
            autoSize={{ minRows: 2, maxRows: 4 }}
            options={[
              ...PEOPLE.map((p) => ({ value: p.value, label: p.name })),
              ...CHANNELS.map((c) => ({ value: c.value, label: `#${c.name}` })),
            ]}
          />
        </MockBlock>
        <CodeBlock>{`<Mentions
  prefix={["@", "#"]}
  onSearch={(text, prefix) => {
    if (prefix === "@") loadUsers(text);
    if (prefix === "#") loadChannels(text);
  }}
  options={mergedOptions}
/>`}</CodeBlock>
      </section>

      {/* ── PLACEMENT ── */}
      <section id="placement" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>placement</span>
          <Heading level={2}>Placement — top / bottom</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>bottom</code>. Input sayfanın altındaysa (chat
          gibi) <code>placement="top"</code> ver — popup yukarı açılır.
        </Text>
        <MockBlock caption='placement="top"'>
          <Mentions
            placement="top"
            placeholder="@ yaz — popup yukarı çıkar"
            options={PEOPLE.map((p) => ({ value: p.value, label: p.name }))}
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </MockBlock>
      </section>

      {/* ── SIZE / STATUS ── */}
      <section id="size-status" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>size · status</span>
          <Heading level={2}>Size ve Status</Heading>
        </div>
        <MockBlock caption="3 boyut">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-3)" }}>
            <Mentions size="small" placeholder="Small" options={[{ value: "a", label: "A" }]} />
            <Mentions size="middle" placeholder="Middle" options={[{ value: "a", label: "A" }]} />
            <Mentions size="large" placeholder="Large" options={[{ value: "a", label: "A" }]} />
          </div>
        </MockBlock>
        <MockBlock caption="Validation states">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sc-space-3)" }}>
            <Mentions status="error" placeholder="Hatalı" options={[{ value: "a", label: "A" }]} />
            <Mentions status="warning" placeholder="Uyarı" options={[{ value: "a", label: "A" }]} />
          </div>
        </MockBlock>
      </section>

      {/* ── REAL MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Bilet Yorum Input'u — gerçek senaryo</Heading>
        </div>
        <Text size="md" color="secondary">
          Bilet yorum thread'inde reply input'u. <code>@</code> kişi tag'lemek
          için, <code>#</code> kanal/etiket için. Custom item label (avatar +
          rol). Submit butonu boş değerde disabled.
        </Text>
        <MockBlock caption="Yorum yaz, @ veya # dene">
          <CommentReplyMock />
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
          message="Hata 1 — Plain TextArea + regex ile @ taglemek"
          description={
            <>
              <code>onChange={`{e => parseForMentions(e.target.value)}`}</code>{" "}
              her yerde tekrar eder, autocomplete UI'ını sıfırdan yazarsın, hata
              yapmaya açık. <strong>Çözüm:</strong> Mentions —{" "}
              prefix/popup/keyboard nav hepsi içinde.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — 500 kullanıcıyı önden options'a doldurmak"
          description={
            <>
              JSON çok büyür, ilk render yavaşlar, gereksiz veri.{" "}
              <strong>Çözüm:</strong> <code>onSearch</code> ile her tuş vuruşunda
              backend'e debounced query at — sonucu options'a koy.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — value'yu rich label ile karıştırmak"
          description={
            <>
              <code>{`{ value: "Mehmet K.", label: "Mehmet K." }`}</code> →
              mention metni <code>@Mehmet K.</code> olarak yazılır, backend
              userId bilemez.{" "}
              <strong>Çözüm:</strong> <code>value</code> userId/slug,{" "}
              <code>label</code> görünen ad. Server'a slug git, render'da name resolve et.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Mention metnini düz string'de saklayıp linklemeden render etmek"
          description={
            <>
              <code>"@mehmet.k uçtaki sorunu bak"</code> string'i veritabanına
              gider, render'da düz metin olarak görünür → kullanıcı tıklayamaz,
              avatar yok. <strong>Çözüm:</strong> Render'da regex parse et,{" "}
              <code>@mehmet.k</code> matchini <code>{`<Link to="/users/mehmet.k"><b>@Mehmet K.</b></Link>`}</code>
              {" "}olarak render et.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — allowClear veya variant beklemek (5.13+, yok)"
          description={
            <>
              <code>allowClear</code> ve <code>variant</code> 5.13+'da geldi.
              5.7'de runtime'da etkisiz. <strong>Çözüm:</strong> Reset için
              dışarıdan <code>onChange("")</code> çağır; variant için border'ı
              CSS module'da kendin override et.
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
