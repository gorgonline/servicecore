"use client";

import { useState } from "react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Transfer } from "@servicecoreui/ui";
import type { TransferItem } from "@servicecoreui/ui";
import styles from "./transfer.module.css";

/* ────────────────────────────────────────────────
 * Mock data — 20 kullanıcı
 * ──────────────────────────────────────────────── */

type User = TransferItem & { name: string; role: string };

const USERS: User[] = [
  { key: "u1",  name: "Mehmet K.", role: "Network Engineer" },
  { key: "u2",  name: "Ayşe T.",   role: "Helpdesk Manager" },
  { key: "u3",  name: "Burak D.",  role: "Software Developer" },
  { key: "u4",  name: "Selin Y.",  role: "System Admin" },
  { key: "u5",  name: "Emre K.",   role: "Security Lead" },
  { key: "u6",  name: "Deniz A.",  role: "DevOps Engineer" },
  { key: "u7",  name: "Merve S.",  role: "QA Engineer" },
  { key: "u8",  name: "Can O.",    role: "Database Admin" },
  { key: "u9",  name: "Buse F.",   role: "UI Designer" },
  { key: "u10", name: "Tarık M.",  role: "Tier 2 Support" },
  { key: "u11", name: "Yusuf B.",  role: "Backend Developer" },
  { key: "u12", name: "Ece V.",    role: "Product Manager" },
].map((u) => ({ ...u, title: u.name, description: u.role }));

const initials = (n: string) =>
  n.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

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

export default function TransferPage() {
  const [basic, setBasic] = useState<string[]>(["u2", "u5"]);
  const [search, setSearch] = useState<string[]>(["u3"]);
  const [rich, setRich] = useState<string[]>(["u1", "u6"]);
  const [oneWay, setOneWay] = useState<string[]>([]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Transfer</Display>
        <Text size="lg" color="secondary">
          İki kolonlu item taşıma. Kullanıcıyı role atama, permission seçimi,
          asset assignment, tag bulk taşıma. Sol = havuz, sağ = seçilenler.
          15+ item varsa Select multiple yerine Transfer — kullanıcı tüm
          seçimi tek bakışta görür.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Transfer vs Select</a>
        <a href="#temel">Temel</a>
        <a href="#search">Search</a>
        <a href="#render">Custom Render</a>
        <a href="#oneway">OneWay</a>
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
              <code>dataSource</code>, <code>targetKeys</code>,{" "}
              <code>selectedKeys</code>, <code>render</code>,{" "}
              <code>listStyle</code>, <code>operations</code>,{" "}
              <code>showSearch</code>, <code>filterOption</code>,{" "}
              <code>titles</code>, <code>disabled</code>,{" "}
              <code>oneWay</code> (4.3+), <code>pagination</code> (4.3+),{" "}
              <code>showSelectAll</code>, <code>footer</code>,{" "}
              <code>locale</code>, <code>rowKey</code>,{" "}
              <code>status</code> (4.19+),{" "}
              <code>onChange</code>, <code>onSearch</code>,{" "}
              <code>onSelectChange</code>, <code>onScroll</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>selectionsIcon</code> (5.8+),{" "}
              <code>selectAllLabels</code> (sonraki sürümler),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — (nextTargetKeys, direction, moveKeys)"
          description={
            <>
              <code>{`(nextTargetKeys: string[], direction: "left" | "right", moveKeys: string[]) => void`}</code>
              <br />
              <strong>nextTargetKeys</strong> sağdaki yeni liste (state'i bununla
              set et). <strong>direction</strong> hangi yöne taşındı (audit log
              için). <strong>moveKeys</strong> bu transfer'da taşınan key'ler.
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Transfer vs Select multiple</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Transfer: 15+ item, çoklu seçim, kullanıcı seçilenleri görmek istiyor",
            "Transfer: assignment akışı (rolden role, asset'i kullanıcıya)",
            "Transfer: permission matrisi (tüm modüller → izin verilen)",
            "Select multiple: <15 item, hızlı seçim, form alanı",
          ]}
          dontItems={[
            "Transfer'i 3-5 item için (yer israfı, Checkbox.Group yeter)",
            "Select multiple'i 50+ item için (chip patlaması)",
            "Transfer'i mobilde (yatay yer yok, Select multiple)",
            "Hem sol hem sağ kolonu kullanıcı düzenlesin diyerek karmaşık API kurmak",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel kullanım</Heading>
        </div>
        <MockBlock caption="Kullanıcı seçimi — checkbox + ok butonları">
          <Transfer
            dataSource={USERS}
            targetKeys={basic}
            onChange={(keys) => setBasic(keys as string[])}
            render={(item) => (item as User).name}
            titles={["Tüm kullanıcılar", "Atanan"]}
          />
        </MockBlock>
        <CodeBlock>{`const [target, setTarget] = useState<string[]>([]);

<Transfer
  dataSource={users}
  targetKeys={target}
  onChange={setTarget}
  render={(u) => u.name}
  titles={["Tüm kullanıcılar", "Atanan"]}
/>`}</CodeBlock>
      </section>

      {/* ── SEARCH ── */}
      <section id="search" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showSearch</span>
          <Heading level={2}>Search — filtre input'u</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>showSearch</code> her iki kolona search input ekler.{" "}
          <code>filterOption</code> ile custom filtre (varsayılan title'da
          arar).
        </Text>
        <MockBlock caption="Search aktif — kullanıcı adı/rol filtreleme">
          <Transfer
            showSearch
            dataSource={USERS}
            targetKeys={search}
            onChange={(keys) => setSearch(keys as string[])}
            filterOption={(input, item) => {
              const u = item as User;
              const q = input.toLowerCase();
              return u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
            }}
            render={(item) => (item as User).name}
            titles={["Havuz", "Seçilen"]}
          />
        </MockBlock>
        <CodeBlock>{`<Transfer
  showSearch
  dataSource={users}
  filterOption={(input, item) =>
    item.name.toLowerCase().includes(input.toLowerCase()) ||
    item.role.toLowerCase().includes(input.toLowerCase())
  }
  ...
/>`}</CodeBlock>
      </section>

      {/* ── CUSTOM RENDER ── */}
      <section id="render" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>render</span>
          <Heading level={2}>Custom Render — avatar + ad + rol</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>render</code> her item için ReactNode döner. Avatar + ad + rol
          gibi rich item için. Search filtre kullanıyorsan{" "}
          <code>filterOption</code>'da hangi alanları taradığını kontrol et —
          render'da göstermek search'ü değiştirmez.
        </Text>
        <MockBlock caption="Rich item — avatar + ad + rol">
          <Transfer
            showSearch
            dataSource={USERS}
            targetKeys={rich}
            onChange={(keys) => setRich(keys as string[])}
            filterOption={(input, item) => {
              const u = item as User;
              return u.name.toLowerCase().includes(input.toLowerCase());
            }}
            render={(item) => {
              const u = item as User;
              return (
                <div className={styles.userItem}>
                  <span className={styles.userAvatar}>{initials(u.name)}</span>
                  <div className={styles.userMeta}>
                    <span className={styles.userName}>{u.name}</span>
                    <span className={styles.userRole}>{u.role}</span>
                  </div>
                </div>
              );
            }}
            titles={["Tüm kullanıcılar", "Network ekibi"]}
            listStyle={{ width: 280, height: 320 }}
          />
        </MockBlock>
        <CodeBlock>{`<Transfer
  render={(user) => (
    <div className="userItem">
      <Avatar>{initials(user.name)}</Avatar>
      <div>
        <strong>{user.name}</strong>
        <span>{user.role}</span>
      </div>
    </div>
  )}
  listStyle={{ width: 280, height: 320 }}
/>`}</CodeBlock>
      </section>

      {/* ── ONE WAY ── */}
      <section id="oneway" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>oneWay</span>
          <Heading level={2}>OneWay — tek yön taşıma</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>oneWay</code> ile sadece sol→sağ taşıma. Sağdan sola dönüş yok
          ama sağdan item silmek için ✕ ikonu çıkar. Onay akışı: kullanıcı
          ekledikten sonra sağdan silebilir ama sola gönderemez.
        </Text>
        <MockBlock caption='oneWay={true} — sol→sağ taşı, sağda ✕ ile sil'>
          <Transfer
            oneWay
            dataSource={USERS}
            targetKeys={oneWay}
            onChange={(keys) => setOneWay(keys as string[])}
            render={(item) => (item as User).name}
            titles={["Davet edilebilir", "Davet edilenler"]}
          />
        </MockBlock>
      </section>

      {/* ── DISABLED ── */}
      <section id="disabled" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>disabled</span>
          <Heading level={2}>Disabled item — taşınamaz kayıt</Heading>
        </div>
        <Text size="md" color="secondary">
          Item'da <code>disabled: true</code> ver — checkbox işaretlenemez,
          taşınamaz. Bağımlı kayıt (örn. "kendi hesabını kaldıramazsın") için.
        </Text>
        <MockBlock caption="Bazı kullanıcı disabled (taşınamaz)">
          <Transfer
            dataSource={USERS.map((u) => ({ ...u, disabled: u.key === "u1" }))}
            targetKeys={["u1"]}
            render={(item) => (item as User).name}
            titles={["Havuz", "Atanan"]}
          />
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
          message="Hata 1 — 5 item için Transfer"
          description={
            <>
              Yer israfı, kullanıcıya gereksiz UI yükü.{" "}
              <strong>Çözüm:</strong> Checkbox.Group veya Select multiple — 15+
              item olunca Transfer.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — Search'siz 100+ item"
          description={
            <>
              Kullanıcı 100 isim arasından scroll'la arar → bulamaz, vakit
              kaybı. <strong>Çözüm:</strong> <code>showSearch</code> ekle, {" "}
              <code>filterOption</code> ile relevant alanları tara.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Mobilde Transfer kullanmak"
          description={
            <>
              İki kolon + ok butonları + checkbox + search — mobile'da
              taşmaz. <strong>Çözüm:</strong> Mobile'da Select multiple veya
              Modal full-screen list. Responsive switch yap.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Render'da görsel zenginleştirip filterOption'ı vermemek"
          description={
            <>
              Render'da rol gösterip search'te sadece title aratmak →
              kullanıcı "Engineer" yazınca bulunmaz. <strong>Çözüm:</strong>{" "}
              <code>filterOption</code>'da render'da göstereceğin tüm
              alanları tara.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — selectionsIcon / selectAllLabels beklemek (5.8+ ve sonraki)"
          description={
            <>
              5.7 baseline'da bunlar yok. <code>selectionsIcon</code> 5.8+,{" "}
              <code>selectAllLabels</code> daha sonraki sürümler. Custom icon
              gerekiyorsa CSS module'da master checkbox stilini değiştir.
            </>
          }
        />
      </section>
    </main>
  );
}
