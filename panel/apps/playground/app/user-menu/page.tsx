"use client";

import {
  Task,
  WarningAlt,
  RequestQuote,
  Asset,
  Logout,
  User,
  Home,
  ChevronDown,
} from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { UserMenu } from "@servicecoreui/ui";
import { Button, Avatar } from "@servicecoreui/ui";
import styles from "./user-menu.module.css";

const ITEMS = [
  { key: "gorev", icon: <Task size={20} />, title: "Görevlerim", description: "Görev Detaylarım" },
  { key: "olay", icon: <WarningAlt size={20} />, title: "Olay Kayıtlarım", description: "Bana Atanan Olaylar" },
  { key: "istek", icon: <RequestQuote size={20} />, title: "İstek Kayıtlarım", description: "Bana Atanan İstekler" },
  { key: "varlik", icon: <Asset size={20} />, title: "Varlıklarım", description: "Bana Atanan Varlıklar" },
];

const ACTIONS = [
  { key: "kullanici", label: "Kullanıcı", icon: <User size={18} /> },
  { key: "baslangic", label: "Başlangıç", icon: <Home size={18} /> },
  { key: "cikis", label: "Çıkış Yap", icon: <Logout size={18} />, danger: true },
];

export default function UserMenuPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">UserMenu</Display>
        <Text size="lg" color="secondary">
          Zengin kullanıcı/hesap menüsü — avatar'a bağlı popover; üstte kullanıcı
          (avatar + ad + email), ortada "bana atanan kayıtlar" listesi (`ListItem`),
          altta aksiyon butonları. Veri-güdümlü. İçeride{" "}
          <code>Popover · Avatar · ListItem · Button · Text</code> kullanır.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Demo</Heading>
        <UserMenu
          name="Ayşe Yıldız"
          email="ayse.yildiz@servicecore.app"
          initials="AY"
          items={ITEMS}
          actions={ACTIONS}
        >
          <Button>
            <Avatar size="small" tone="accent">
              AY
            </Avatar>{" "}
            Ayşe Yıldız <ChevronDown size={14} />
          </Button>
        </UserMenu>
      </section>

      <section className={styles.section}>
        <Heading level={2}>API</Heading>
        <table className={styles.props}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tip</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>Tetikleyici — popover'ı açan eleman (avatar).</td>
            </tr>
            <tr>
              <td><code>name / email</code></td>
              <td><code>ReactNode</code></td>
              <td>Header kullanıcı bilgisi.</td>
            </tr>
            <tr>
              <td><code>avatarSrc / initials</code></td>
              <td><code>string?</code></td>
              <td>Avatar görseli; yoksa baş harfler.</td>
            </tr>
            <tr>
              <td><code>items</code></td>
              <td><code>UserMenuItem[]?</code></td>
              <td>Liste ({"{"} key, title, description?, icon? {"}"}).</td>
            </tr>
            <tr>
              <td><code>actions</code></td>
              <td><code>UserMenuAction[]?</code></td>
              <td>Footer butonları ({"{"} key, label, icon?, danger?, onClick? {"}"}).</td>
            </tr>
            <tr>
              <td><code>onSelect</code></td>
              <td><code>(item) =&gt; void</code></td>
              <td>Liste öğesine tıklanınca.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<UserMenu
  name="Ayşe Yıldız"
  email="ayse.yildiz@servicecore.app"
  initials="AY"
  items={[{ key: "gorev", title: "Görevlerim", description: "Görev Detaylarım", icon: <Task /> }]}
  actions={[{ key: "cikis", label: "Çıkış Yap", icon: <Logout />, danger: true }]}
>
  <button>…avatar…</button>
</UserMenu>`}</Code>
      </section>
    </main>
  );
}
