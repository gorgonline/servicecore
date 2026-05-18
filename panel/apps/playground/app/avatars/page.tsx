"use client";

import Link from "next/link";
import {
  User,
  UserMultiple,
  Asset,
  Locked,
  Settings,
  ChevronDown,
} from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Avatar, Card, Tag } from "@servicecore/ui/wraps";
import styles from "./avatars.module.css";

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

function DoDontGrid({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  return (
    <div className={styles.subgrid}>
      <Alert
        type="success"
        showIcon
        message="Ne zaman kullan"
        description={
          <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
            {doItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        }
      />
      <Alert
        type="error"
        showIcon
        message="KULLANMA"
        description={
          <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
            {dontItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        }
      />
    </div>
  );
}

function AntiPattern({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Alert
      type="error"
      showIcon
      message={title}
      description={children}
    />
  );
}

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <pre className={styles.codeBlock}>{children}</pre>;
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function AvatarsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Avatar</Display>
        <Text size="lg" color="secondary">
          Kullanıcı veya entity göstergesi. Fallback hiyerarşisi:{" "}
          <strong>image → icon → initials</strong>. 5.7 baseline — Avatar.Group'da
          <code>max</code> prop (5.18+) yok, eski <code>maxCount</code> kullan.
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#initials">Initials</a>
        <a href="#image">Image</a>
        <a href="#icon">Icon</a>
        <a href="#sizes">Boyutlar</a>
        <a href="#shapes">Şekil</a>
        <a href="#tones">Tonlar</a>
        <a href="#group">Group</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── INITIALS ── */}
      <section id="initials" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>children</span>
          <Heading level={2}>Initials (Baş Harfler)</Heading>
        </div>
        <Text size="md" color="secondary">
          Default kullanım. ServiceCore'da çoğu kullanıcı için fotoğraf yok —
          isim baş harfleri (en fazla 2 karakter) accent renkle gösterilir.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basic</span>
            <div className={styles.rowItems}>
              <Avatar>AY</Avatar>
              <Avatar>MD</Avatar>
              <Avatar>SK</Avatar>
              <Avatar>BT</Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE ── */}
      <section id="image" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>src</span>
          <Heading level={2}>Image</Heading>
        </div>
        <Text size="md" color="secondary">
          Foto varsa src ile geçirilir. Yüklenmezse <code>onError</code> →{" "}
          initials fallback.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>src + alt</span>
            <div className={styles.rowItems}>
              <Avatar src="https://i.pravatar.cc/64?img=12" alt="Ayşe Yıldız" />
              <Avatar src="https://i.pravatar.cc/64?img=33" alt="Mehmet Demir" />
              <Avatar src="https://i.pravatar.cc/64?img=47" alt="Selin Kaya" />
              <Avatar src="https://i.pravatar.cc/64?img=68" alt="Burak Türk" />
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>fallback</span>
            <div className={styles.rowItems}>
              <Avatar src="https://invalid-url-broken.test/x.jpg" alt="Hata">
                AY
              </Avatar>
              <Text size="xs" color="tertiary">
                src yüklenmedi → initials görünür
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* ── ICON ── */}
      <section id="icon" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>icon</span>
          <Heading level={2}>Icon</Heading>
        </div>
        <Text size="md" color="secondary">
          Kullanıcı belirsizken (sistem hesabı, takım, automation) Carbon icon.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>Carbon icon</span>
            <div className={styles.rowItems}>
              <Avatar icon={<User />} />
              <Avatar icon={<UserMultiple />} tone="neutral" />
              <Avatar icon={<Settings />} tone="neutral" />
              <Avatar icon={<Locked />} tone="danger" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SIZES ── */}
      <section id="sizes" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>size</span>
          <Heading level={2}>Boyutlar</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>small (24)</strong> tablo / liste · <strong>default (32)</strong>{" "}
          header / yorum · <strong>large (40)</strong> profil / detay sayfası.
          Number ile özel boyut.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>small</span>
            <div className={styles.rowItems}>
              <Avatar size="small">AY</Avatar>
              <Avatar size="small" src="https://i.pravatar.cc/64?img=12" />
              <Avatar size="small" icon={<User />} />
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>default</span>
            <div className={styles.rowItems}>
              <Avatar>AY</Avatar>
              <Avatar src="https://i.pravatar.cc/64?img=12" />
              <Avatar icon={<User />} />
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>large</span>
            <div className={styles.rowItems}>
              <Avatar size="large">AY</Avatar>
              <Avatar size="large" src="https://i.pravatar.cc/64?img=12" />
              <Avatar size="large" icon={<User />} />
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>64 (custom)</span>
            <div className={styles.rowItems}>
              <Avatar size={64}>AY</Avatar>
              <Avatar size={64} src="https://i.pravatar.cc/128?img=12" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SHAPES ── */}
      <section id="shapes" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>shape</span>
          <Heading level={2}>Şekil</Heading>
        </div>
        <Text size="md" color="secondary">
          <strong>circle</strong> (default) — kullanıcı. <strong>square</strong> —{" "}
          entity (asset, takım, system).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>circle</span>
            <div className={styles.rowItems}>
              <Avatar shape="circle" size="large">AY</Avatar>
              <Avatar shape="circle" size="large" src="https://i.pravatar.cc/64?img=33" />
              <Text size="sm" color="tertiary">— Kullanıcı için</Text>
            </div>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>square</span>
            <div className={styles.rowItems}>
              <Avatar shape="square" size="large" tone="neutral" icon={<Asset />} />
              <Avatar shape="square" size="large" tone="neutral">SC</Avatar>
              <Text size="sm" color="tertiary">— Asset / takım / sistem için</Text>
            </div>
          </div>
        </div>
      </section>

      {/* ── TONES ── */}
      <section id="tones" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>tone</span>
          <Heading level={2}>Tonlar (Bizim eklemiz)</Heading>
        </div>
        <Text size="md" color="secondary">
          Initials/icon için anlamsal arkaplan. Default: accent (mavi). Image
          verildiğinde tone görünmez.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>tonlar</span>
            <div className={styles.rowItems}>
              <Avatar tone="accent">AY</Avatar>
              <Avatar tone="neutral">MD</Avatar>
              <Avatar tone="success">SK</Avatar>
              <Avatar tone="warning">BT</Avatar>
              <Avatar tone="danger" icon={<Locked />} />
            </div>
          </div>
        </div>
        <Text size="sm" color="secondary">
          NOT: Tone'ları rastgele kullanma — kullanıcılar arasında ayrım için.
          Genel kural: tek tone (accent). Anlam taşıyorsa (örn. sistem hesabı =
          neutral, kilitli kullanıcı = danger) değiştir.
        </Text>
      </section>

      {/* ── GROUP ── */}
      <section id="group" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Avatar.Group</span>
          <Heading level={2}>Group (Yan yana + overflow)</Heading>
        </div>
        <Text size="md" color="secondary">
          Birden fazla kullanıcı yan yana — <code>maxCount</code> ile fazlasını
          "+N" olarak gösterir. Ticket takipçileri, change request onaylayanlar
          için.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basic</span>
            <Avatar.Group>
              <Avatar>AY</Avatar>
              <Avatar tone="success">MD</Avatar>
              <Avatar tone="warning">SK</Avatar>
              <Avatar tone="neutral">BT</Avatar>
            </Avatar.Group>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>maxCount=3</span>
            <Avatar.Group maxCount={3}>
              <Avatar>AY</Avatar>
              <Avatar tone="success">MD</Avatar>
              <Avatar tone="warning">SK</Avatar>
              <Avatar tone="neutral">BT</Avatar>
              <Avatar>EK</Avatar>
              <Avatar>FA</Avatar>
            </Avatar.Group>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>image group</span>
            <Avatar.Group maxCount={4}>
              <Avatar src="https://i.pravatar.cc/64?img=12" alt="Ayşe" />
              <Avatar src="https://i.pravatar.cc/64?img=33" alt="Mehmet" />
              <Avatar src="https://i.pravatar.cc/64?img=47" alt="Selin" />
              <Avatar src="https://i.pravatar.cc/64?img=68" alt="Burak" />
              <Avatar src="https://i.pravatar.cc/64?img=14" alt="Ekin" />
              <Avatar src="https://i.pravatar.cc/64?img=22" alt="Fatma" />
            </Avatar.Group>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>small size</span>
            <Avatar.Group size="small" maxCount={5}>
              <Avatar size="small">AY</Avatar>
              <Avatar size="small" tone="success">MD</Avatar>
              <Avatar size="small" tone="warning">SK</Avatar>
              <Avatar size="small" tone="neutral">BT</Avatar>
              <Avatar size="small">EK</Avatar>
              <Avatar size="small">FA</Avatar>
            </Avatar.Group>
          </div>
        </div>
      </section>

      {/* ── REAL-WORLD MOCKS ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Header profil — small size, initials, dropdown trigger ile">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 8px",
              borderRadius: "var(--sc-radius-md)",
              background: "var(--sc-color-bg-base)",
              border: "1px solid var(--sc-color-border-subtle)",
            }}
          >
            <Avatar size="small">AY</Avatar>
            <Text size="sm" weight="medium">Ayşe Yıldız</Text>
            <ChevronDown size={14} color="var(--sc-color-text-tertiary)" />
          </div>
        </MockBlock>

        <MockBlock caption="Yorum thread — default size, isim + zaman + içerik">
          <Card>
            <div className={styles.comment}>
              <Avatar>AY</Avatar>
              <div className={styles.commentBody}>
                <div className={styles.commentMeta}>
                  <span className={styles.commentAuthor}>Ayşe Yıldız</span>
                  <span className={styles.commentTime}>2 saat önce</span>
                </div>
                <Text size="sm">
                  Print server'a fiziksel olarak baktım, kablo bağlantısı oturmuş.
                  Servisi restart ettim, çalışıyor.
                </Text>
              </div>
            </div>
            <div className={styles.comment}>
              <Avatar src="https://i.pravatar.cc/64?img=33" alt="Mehmet Demir" />
              <div className={styles.commentBody}>
                <div className={styles.commentMeta}>
                  <span className={styles.commentAuthor}>Mehmet Demir</span>
                  <span className={styles.commentTime}>35 dk önce</span>
                </div>
                <Text size="sm">
                  Teşekkürler, kullanıcı taraflı da test ettim, sorun çözülmüş.
                </Text>
              </div>
            </div>
            <div className={styles.comment}>
              <Avatar tone="neutral" icon={<Settings />} />
              <div className={styles.commentBody}>
                <div className={styles.commentMeta}>
                  <span className={styles.commentAuthor}>Sistem</span>
                  <span className={styles.commentTime}>30 dk önce</span>
                </div>
                <Text size="sm" color="secondary">
                  Talep durumu &quot;Çözüldü&quot; olarak güncellendi.
                </Text>
              </div>
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Atanan kişi chip — küçük avatar + isim, kompakt">
          <Card>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div className={styles.assigneeChip}>
                <Avatar size="small">AY</Avatar>
                Ayşe Yıldız
              </div>
              <div className={styles.assigneeChip}>
                <Avatar size="small" src="https://i.pravatar.cc/48?img=33" />
                Mehmet Demir
              </div>
              <div className={styles.assigneeChip}>
                <Avatar size="small" tone="neutral" icon={<UserMultiple />} />
                L2 Destek Ekibi
              </div>
            </div>
          </Card>
        </MockBlock>

        <MockBlock caption="Kullanıcı tablosu — small avatar + isim + rol">
          <Card>
            <div className={styles.userRow + " " + styles.userRowHeader}>
              <span>Kullanıcı</span>
              <span></span>
              <span>Rol</span>
              <span>Durum</span>
            </div>
            {[
              { name: "Ayşe Yıldız", role: "Service Desk Manager", initials: "AY", img: 12, status: "success" as const, statusLabel: "Aktif" },
              { name: "Mehmet Demir", role: "L2 Destek", initials: "MD", img: 33, status: "success" as const, statusLabel: "Aktif" },
              { name: "Selin Kaya", role: "Network Admin", initials: "SK", img: 47, status: "neutral" as const, statusLabel: "İzinde" },
              { name: "Burak Türk", role: "ITSM Operatör", initials: "BT", img: null, status: "warning" as const, statusLabel: "Pasif" },
            ].map((u) => (
              <div key={u.name} className={styles.userRow}>
                <Avatar size="small" src={u.img ? `https://i.pravatar.cc/48?img=${u.img}` : undefined}>
                  {u.initials}
                </Avatar>
                <div className={styles.userMeta}>
                  <span className={styles.userName}>{u.name}</span>
                  <span className={styles.userRole}>{u.role}</span>
                </div>
                <Text size="xs" color="tertiary">{u.role.split(" ")[0]}</Text>
                <Tag tone={u.status} size="small" dot>{u.statusLabel}</Tag>
              </div>
            ))}
          </Card>
        </MockBlock>

        <MockBlock caption="Asset takımı — square avatar, entity için">
          <div className={styles.assetCard}>
            <Avatar shape="square" size="large" tone="neutral" icon={<Asset />} />
            <div className={styles.assetMeta}>
              <div className={styles.assetName}>DELL Latitude 7420</div>
              <div className={styles.assetDesc}>ASSET-9032 · Atanan: Ayşe Y. · Garanti: 2026-08</div>
            </div>
            <Avatar.Group maxCount={3} size="small">
              <Avatar size="small">AY</Avatar>
              <Avatar size="small" tone="success">MD</Avatar>
              <Avatar size="small" tone="warning">SK</Avatar>
              <Avatar size="small">BT</Avatar>
            </Avatar.Group>
          </div>
        </MockBlock>

        <CodeBlock>{`<Avatar>AY</Avatar>
<Avatar src="/users/ayse.jpg" alt="Ayşe Yıldız">AY</Avatar>
<Avatar icon={<User />} tone="neutral" />
<Avatar shape="square" size="large" icon={<Asset />} />

<Avatar.Group maxCount={3}>
  <Avatar>AY</Avatar>
  <Avatar>MD</Avatar>
  <Avatar>SK</Avatar>
  <Avatar>BT</Avatar>
  <Avatar>EK</Avatar>
</Avatar.Group>`}</CodeBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — alt yok">
          Image avatar'larda <code>alt</code> şart. Ekran okuyucu kullanıcı için
          sadece &quot;avatar image&quot; görünmez kalır. Her zaman{" "}
          <code>alt=&quot;Ayşe Yıldız&quot;</code> gibi anlamlı yaz.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Çok yığın">
          Bir tablo satırında 6+ avatar yan yana = gürültü.{" "}
          <code>Avatar.Group maxCount=&#123;3&#125;</code> ile fazlasını &quot;+N&quot;
          göster, tıklayınca popover ile aç.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Karışık shape">
          Aynı listede bazıları circle bazıları square = tutarsızlık.{" "}
          <strong>Circle = kullanıcı</strong>, <strong>square = entity</strong>{" "}
          kuralı sabit. Bir tabloda biri varsa hep o olsun.
        </AntiPattern>

        <AntiPattern title="Hata 4 — onError yok">
          Sadece <code>src</code> verip <code>children</code> (initials)
          eklememek = image yüklenmediğinde boş gri daire. Her zaman fallback
          olarak initials veya icon ver.
        </AntiPattern>

        <AntiPattern title="Hata 5 — Renkli tone'u rastgele">
          Her kullanıcıya farklı tone (success/warning/danger) verme — tone
          anlam taşır. Genel kural: accent (mavi). Sistem hesabı / takım için
          neutral, kilitli kullanıcı için danger gibi semantic kullanım.
        </AntiPattern>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
