"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Help, Time } from "@carbon/icons-react";
import { Heading, Text } from "@servicecoreui/ui/typography";
import { PageHeader, RecentPanels, SettingsForm } from "@servicecoreui/ui/custom";
import { Button, Card, Drawer, Tooltip } from "@servicecoreui/ui/wraps";
import { PanelShell } from "../../_components/PanelShell";
import { RECENT_PANELS } from "../../_data/recentPanels";
import { GENEL_AYARLAR_TABS } from "./fields";
import styles from "./genel-ayarlar.module.css";

/** Yardım Drawer içeriği. */
function HelpContent() {
  const sections = [
    { title: "Genel Ayarlar", body: "Portal adı, adresi ve varsayılan dili tanımlanır. E-posta bildirimleri etkinleştirilir veya iş saatine göre planlanır. Favicon, logo, giriş ekranı görseli ve e-posta şablon logosu yüklenebilir." },
    { title: "Genel Portal Ayarları", body: "Başlık arka planı, yazı rengi, menü çubuğu renkleri ve aktif sekme renkleri özelleştirilir. Ayrıca ek CSS ve JavaScript kodları eklenerek portalın görünümü kuruma özel hale getirilebilir." },
    { title: "Kullanıcı Portal Ayarları", body: "Kullanıcı portalının başlık metni ve arka plan resmi belirlenir. Kullanıcıların erişebileceği modüller (Projeler, Servisler, Çözümler vb.) seçilir. Ana ekranda hangi bileşenlerin gösterileceği tanımlanır." },
    { title: "Uygulama Ayarları", body: "E-posta gönderim davranışları, çözüm tipleri ve kapatma kuralları yapılandırılır. Kapalı kayıtların yeniden açılma durumu, otomatik kapatma süreleri ve butonların (Çöz, Kapat, Bana Ata) görünürlüğü yönetilebilir." },
    { title: "Güvenlik Ayarları", body: "Parola politikaları tanımlanır. En az bir büyük harf, küçük harf, rakam veya özel karakter zorunlu kılınabilir. Minimum parola uzunluğu belirlenerek hesap güvenliği artırılır." },
  ];
  return (
    <div className={styles.help}>
      <Text color="secondary">
        Bu modül, sistemin genel ayarlarının yönetilmesini sağlar. Buradan portal görünümü,
        kullanıcı yetkileri, uygulama davranışları ve güvenlik politikaları yapılandırılabilir.
      </Text>
      {sections.map((s) => (
        <div key={s.title} className={styles.helpSection}>
          <Heading level={5}>{s.title}</Heading>
          <Text size="sm" color="secondary">
            {s.body}
          </Text>
        </div>
      ))}
    </div>
  );
}

export default function GenelAyarlarPage() {
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <PanelShell>
      <PageHeader
        title={
          <span className={styles.crumb}>
            <RecentPanels panels={RECENT_PANELS}>
              <Button
                type="text"
                leadingIcon={<Time size={18} />}
                aria-label="Son panolar"
                title="Son panolar"
              />
            </RecentPanels>
            <button type="button" className={styles.crumbLink} onClick={() => router.push("/ayarlar")}>
              Ayarlar
            </button>
            <ChevronRight size={16} className={styles.crumbSep} />
            <span className={styles.crumbCurrent}>Genel Ayarlar</span>
          </span>
        }
        extra={
          <Tooltip title="Yardım" placement="bottom">
            <Button
              type="text"
              leadingIcon={<Help size={18} />}
              aria-label="Yardım"
              onClick={() => setHelpOpen(true)}
            />
          </Tooltip>
        }
      />

      <div className={styles.body}>
        <Card title="Genel Ayarlar">
          <SettingsForm tabs={GENEL_AYARLAR_TABS} />
        </Card>
      </div>

      <Drawer
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Genel Ayarlar"
        placement="right"
        width={420}
      >
        <HelpContent />
      </Drawer>
    </PanelShell>
  );
}
