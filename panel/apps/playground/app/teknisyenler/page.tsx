"use client";

import { useState } from "react";
import Link from "next/link";
import { Add, ChevronRight, Edit, Help, Password, Power, Time } from "@servicecoreui/ui";
import { Heading, Text } from "@servicecoreui/ui";
import { DataTable, PageHeader, PasswordChecklist, RecentPanels } from "@servicecoreui/ui";
import type { DataTableColumn } from "@servicecoreui/ui";
import { Avatar, Button, Drawer, Input, Select, Switch, Tag, Tooltip } from "@servicecoreui/ui";
import { useRouter } from "next/navigation";
import { PanelShell } from "@servicecoreui/ui/custom";
import { RECENT_PANELS } from "../_data/recentPanels";
import styles from "./teknisyenler.module.css";

interface Agent {
  id: string;
  ad: string;
  soyad: string;
  email: string;
  isTanimi: string;
  bolum: string;
  rol: string;
  grup: string;
  aktif: boolean;
}

const ROL_OPTS = [
  { value: "teknisyen", label: "Teknisyen" },
  { value: "supervizor", label: "Süpervizör" },
  { value: "yonetici", label: "Yönetici" },
];

const BOLUM_OPTS = [
  { value: "bt", label: "BT" },
  { value: "ag", label: "Ağ" },
  { value: "sistem", label: "Sistem" },
  { value: "uygulama", label: "Uygulama" },
  { value: "destek", label: "Destek" },
];

const GRUP_OPTS = [
  { value: "destek", label: "Destek Masası" },
  { value: "ag", label: "Ağ" },
  { value: "sistem", label: "Sistem" },
  { value: "uygulama", label: "Uygulama" },
];

const MOCK: Agent[] = [
  { id: "1", ad: "Demo", soyad: "Admin", email: "demo.admin@sirket.com", isTanimi: "Sistem Yöneticisi", bolum: "BT", rol: "yonetici", grup: "destek", aktif: true },
  { id: "2", ad: "Jack", soyad: "Bauer", email: "jack.bauer@sirket.com", isTanimi: "Satınalma Müdürü", bolum: "BT", rol: "yonetici", grup: "destek", aktif: true },
  { id: "3", ad: "Ayşe", soyad: "Tan", email: "ayse.tan@sirket.com", isTanimi: "Kıdemli Teknisyen", bolum: "Ağ", rol: "teknisyen", grup: "ag", aktif: true },
  { id: "4", ad: "Mehmet", soyad: "Kaya", email: "mehmet.kaya@sirket.com", isTanimi: "Teknisyen", bolum: "Sistem", rol: "teknisyen", grup: "sistem", aktif: true },
  { id: "5", ad: "Selin", soyad: "Koç", email: "selin.koc@sirket.com", isTanimi: "Süpervizör", bolum: "Uygulama", rol: "supervizor", grup: "uygulama", aktif: false },
  { id: "6", ad: "Can", soyad: "Erdem", email: "can.erdem@sirket.com", isTanimi: "Teknisyen", bolum: "Destek", rol: "teknisyen", grup: "destek", aktif: false },
];

const initials = (a: Agent) => `${a.ad[0] ?? ""}${a.soyad[0] ?? ""}`.toLocaleUpperCase("tr");

/** Sağ bilgi kartı içeriği — `?` ile açılan Drawer. */
function HelpContent() {
  return (
    <div className={styles.help}>
      <Text color="secondary">
        Bu ekranda <strong>teknisyen (ajan) kayıtlarını</strong> oluşturur, düzenler ve yönetirsiniz.
        Her teknisyen için durum, fotoğraf, ad-soyad, e-posta, iş tanımı ve bölüm gibi temel bilgiler
        tutulur; ayrıca yetki/grup atamaları yapılır.
      </Text>

      <div className={styles.helpSection}>
        <Heading level={5}>Başlıca İşlemler</Heading>
        <ul className={styles.helpList}>
          <li><strong>Yeni teknisyen ekleme:</strong> Kimlik, iletişim ve organizasyon alanlarını girerek kayıt oluşturun.</li>
          <li><strong>Düzenleme ve durum yönetimi:</strong> Profil bilgilerini güncelleyin, hesabı Aktif/Pasif yapın.</li>
          <li><strong>Rol ve erişim:</strong> Teknisyene roller atayın, yetkileri ve erişim anahtarlarını yönetin.</li>
          <li><strong>Grup üyelikleri:</strong> Teknisyen ve kullanıcı gruplarına üyelikleri yönetin; atama/otomasyon kurallarına temel oluşturun.</li>
          <li><strong>Görüntüleme/izleme:</strong> Profilleri görüntüleyin, kayıt üzerinde hızlı aksiyon alın.</li>
          <li><strong>Filtreleme ve arama:</strong> Durum, ad-soyad, e-posta, iş tanımı ve bölüme göre listeyi süzün.</li>
        </ul>
      </div>

      <div className={styles.helpSection}>
        <Heading level={5}>İpuçları</Heading>
        <ul className={styles.helpList}>
          <li>Doğru SLA ve iş akışları için teknisyenleri uygun <strong>gruplar</strong> ve <strong>roller</strong> ile eşleştirin.</li>
          <li>Ayrılan teknisyenleri silmek yerine <strong>Pasif</strong> yaparak geçmiş kayıtları koruyun.</li>
        </ul>
      </div>
    </div>
  );
}

export default function TeknisyenlerPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>(MOCK);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [pwOpen, setPwOpen] = useState(false);
  const [pwAgent, setPwAgent] = useState<Agent | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const mismatch = pw2.length > 0 && pw !== pw2;

  const openNew = () => {
    setEditing(null);
    setEditOpen(true);
  };
  const openEdit = (a: Agent) => {
    setEditing(a);
    setEditOpen(true);
  };
  const openPw = (a: Agent) => {
    setPwAgent(a);
    setPw("");
    setPw2("");
    setPwOpen(true);
  };
  const toggleEnable = (a: Agent) =>
    setAgents((prev) => prev.map((x) => (x.id === a.id ? { ...x, aktif: !x.aktif } : x)));

  const columns: DataTableColumn<Agent>[] = [
    {
      key: "aktif",
      title: "Durum",
      dataIndex: "aktif",
      width: 110,
      sortable: true,
      render: (r) => (
        <Tag tone={r.aktif ? "success" : "danger"} size="small">
          {r.aktif ? "Aktif" : "Devre Dışı"}
        </Tag>
      ),
    },
    {
      key: "foto",
      title: "Foto",
      dataIndex: "ad",
      width: 70,
      render: (r) => <Avatar size="small">{initials(r)}</Avatar>,
    },
    {
      key: "adSoyad",
      title: "Ad - Soyad",
      dataIndex: "ad",
      sortable: true,
      filter: { type: "text" },
      render: (r) => (
        <Text size="sm" weight="medium">
          {r.ad} {r.soyad}
        </Text>
      ),
    },
    { key: "email", title: "E-Mail", dataIndex: "email", sortable: true, filter: { type: "text" }, render: (r) => <Text size="sm" color="secondary">{r.email}</Text> },
    { key: "isTanimi", title: "İş Tanımı", dataIndex: "isTanimi", sortable: true, filter: { type: "text" }, render: (r) => <Text size="sm">{r.isTanimi}</Text> },
    { key: "bolum", title: "Bölüm", dataIndex: "bolum", sortable: true, filter: { type: "text" }, render: (r) => <Text size="sm">{r.bolum}</Text> },
    {
      key: "actions",
      title: "İşlemler",
      dataIndex: "id",
      width: 150,
      render: (r) => (
        <div className={styles.actions}>
          <Button type="text" size="small" leadingIcon={<Edit size={16} />} aria-label="Düzenle" title="Düzenle" onClick={() => openEdit(r)} />
          <Button type="text" size="small" leadingIcon={<Password size={16} />} aria-label="Parolayı değiştir" title="Parolayı değiştir" onClick={() => openPw(r)} />
          <Button
            type="text"
            size="small"
            leadingIcon={<Power size={16} />}
            aria-label={r.aktif ? "Pasifleştir" : "Aktifleştir"}
            title={r.aktif ? "Pasifleştir" : "Aktifleştir"}
            onClick={() => toggleEnable(r)}
          />
        </div>
      ),
    },
  ];

  return (
    <PanelShell onNavigate={router.push}>
      <PageHeader
        title={
          <span className={styles.crumb}>
            <RecentPanels panels={RECENT_PANELS}>
              <Button type="text" leadingIcon={<Time size={18} />} aria-label="Son panolar" title="Son panolar" />
            </RecentPanels>
            <Link href="/ayarlar" className={styles.crumbLink}>
              Ayarlar
            </Link>
            <ChevronRight size={16} className={styles.crumbSep} />
            <span className={styles.crumbCurrent}>Teknisyenler</span>
          </span>
        }
        extra={
          <>
            <Tooltip title="Yardım" placement="bottom">
              <Button type="text" leadingIcon={<Help size={18} />} aria-label="Yardım" onClick={() => setHelpOpen(true)} />
            </Tooltip>
            <Button type="primary" leadingIcon={<Add />} onClick={openNew}>
              Yeni Teknisyen
            </Button>
          </>
        }
      />

      <div className={styles.body}>
        <DataTable<Agent> rowKey="id" data={agents} columns={columns} />
      </div>

      {/* Bilgi — Teknisyen Ayarları (Drawer) */}
      <Drawer open={helpOpen} onClose={() => setHelpOpen(false)} title="Teknisyen Ayarları" placement="right" width={420}>
        <HelpContent />
      </Drawer>

      {/* Yeni / Düzenle */}
      <Drawer
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={editing ? "Teknisyeni Düzenle" : "Yeni Teknisyen Oluştur"}
        placement="right"
        width={460}
        footer={
          <div className={styles.drawerFoot}>
            <Button onClick={() => setEditOpen(false)}>Vazgeç</Button>
            <Button type="primary" onClick={() => setEditOpen(false)}>
              Kaydet
            </Button>
          </div>
        }
      >
        <div className={styles.form} key={editing?.id ?? "new"}>
          <div className={styles.cols}>
            <label className={styles.field}>
              <span className={styles.label}>Ad</span>
              <Input size="large" defaultValue={editing?.ad} placeholder="Ad" />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Soyad</span>
              <Input size="large" defaultValue={editing?.soyad} placeholder="Soyad" />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.label}>E-Mail</span>
            <Input type="email" size="large" defaultValue={editing?.email} placeholder="ornek@sirket.com" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>İş Tanımı</span>
            <Input size="large" defaultValue={editing?.isTanimi} placeholder="Örn: Kıdemli Teknisyen" />
          </label>
          <div className={styles.cols}>
            <label className={styles.field}>
              <span className={styles.label}>Bölüm</span>
              <Select size="large" style={{ width: "100%" }} defaultValue={editing?.bolum?.toLocaleLowerCase("tr")} options={BOLUM_OPTS} placeholder="Seçiniz" searchInPopup />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Rol</span>
              <Select size="large" style={{ width: "100%" }} defaultValue={editing?.rol} options={ROL_OPTS} placeholder="Seçiniz" searchInPopup />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.label}>Grup</span>
            <Select size="large" style={{ width: "100%" }} defaultValue={editing?.grup} options={GRUP_OPTS} placeholder="Seçiniz" searchInPopup />
          </label>
          <div className={styles.switchRow}>
            <Switch defaultChecked={editing?.aktif ?? true} />
            <span className={styles.switchLabel}>Aktif</span>
          </div>
        </div>
      </Drawer>

      {/* Parola değiştir */}
      <Drawer
        open={pwOpen}
        onClose={() => setPwOpen(false)}
        title="Parolayı Değiştir"
        placement="right"
        width={420}
        footer={
          <div className={styles.drawerFoot}>
            <Button onClick={() => setPwOpen(false)}>Vazgeç</Button>
            <Button type="primary" onClick={() => setPwOpen(false)}>
              Kaydet
            </Button>
          </div>
        }
      >
        <div className={styles.form}>
          {pwAgent ? (
            <Text color="secondary">
              {pwAgent.ad} {pwAgent.soyad} için yeni parola belirle.
            </Text>
          ) : null}
          <label className={styles.field}>
            <span className={styles.label}>Parola</span>
            <Input.Password size="large" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
          </label>
          <PasswordChecklist value={pw} />
          <label className={styles.field}>
            <span className={styles.label}>Parolayı Doğrulayınız</span>
            <Input.Password
              size="large"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              status={mismatch ? "error" : undefined}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {mismatch ? (
              <Text size="xs" color="danger">
                Parolalar eşleşmiyor.
              </Text>
            ) : null}
          </label>
        </div>
      </Drawer>
    </PanelShell>
  );
}
