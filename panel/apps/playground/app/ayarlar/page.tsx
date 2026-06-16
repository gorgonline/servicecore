"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Asset,
  Box,
  Building,
  Bullhorn,
  Calendar,
  Chat,
  Db2Database,
  Document,
  DocumentBlank,
  DocumentTasks,
  EventSchedule,
  Events,
  Flash,
  Flow,
  Globe,
  Group,
  License,
  ListChecked,
  Location,
  Meter,
  Notification,
  Plug,
  Report,
  ChevronRight,
  Search,
  SearchLocate,
  Security,
  Settings,
  SettingsAdjust,
  Table,
  TextLinkAnalysis,
  Time,
  Translate,
  Tree,
  User,
  UserAvatar,
  UserFollow,
  UserMultiple,
  UserRole,
  UserSettings,
} from "@carbon/icons-react";
import { Text } from "@servicecoreui/ui/typography";
import { NavCard, PageHeader, RecentPanels } from "@servicecoreui/ui/custom";
import { Button, Card, Input } from "@servicecoreui/ui/wraps";
import { PanelShell } from "../_components/PanelShell";
import { RECENT_PANELS } from "../_data/recentPanels";
import settings from "./settings.json";
import styles from "./ayarlar.module.css";

// Carbon ikon adı → bileşen (JSON'daki icon string'i bununla çözülür).
const ICONS: Record<string, typeof Document> = {
  Asset,
  Box,
  Building,
  Bullhorn,
  Calendar,
  Chat,
  Db2Database,
  Document,
  DocumentBlank,
  DocumentTasks,
  EventSchedule,
  Events,
  Flash,
  Flow,
  Globe,
  Group,
  License,
  ListChecked,
  Location,
  Meter,
  Notification,
  Plug,
  Report,
  SearchLocate,
  Security,
  Settings,
  SettingsAdjust,
  Table,
  TextLinkAnalysis,
  Time,
  Translate,
  Tree,
  User,
  UserAvatar,
  UserFollow,
  UserMultiple,
  UserRole,
  UserSettings,
};

export default function AyarlarPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const query = q.trim().toLocaleLowerCase("tr");

  const groups = settings.groups
    .map((g) => ({
      label: g.label,
      items: query
        ? g.items.filter(
            (it) =>
              it.title.toLocaleLowerCase("tr").includes(query) ||
              it.description.toLocaleLowerCase("tr").includes(query),
          )
        : g.items,
    }))
    .filter((g) => g.items.length > 0);

  return (
    <PanelShell>
      {/* Page header — saat (Son Panolar) + "Ayarlar" + chevron (Pano ile aynı desen) */}
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
            <span className={styles.crumbLabel}>Ayarlar</span>
            <ChevronRight size={16} className={styles.crumbSep} />
          </span>
        }
      />

      <div className={styles.body}>
        <Input
          size="large"
          allowClear
          prefix={<Search size={18} />}
          placeholder="Ayarlarda ara…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={styles.search}
        />

        {groups.length === 0 ? (
          <Text color="tertiary">"{q}" için sonuç bulunamadı.</Text>
        ) : (
          groups.map((g) => (
            <Card key={g.label} title={g.label}>
              <div className={styles.grid}>
                {g.items.map((it) => {
                  const Icon = ICONS[it.icon] ?? Document;
                  return (
                    <NavCard
                      key={it.key}
                      icon={<Icon size={24} />}
                      title={it.title}
                      description={it.description}
                      onClick={() =>
                        it.key === "genel-ayarlar"
                          ? router.push("/ayarlar/genel-ayarlar")
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            </Card>
          ))
        )}

        <div className={styles.version}>Sürüm: {settings.version}</div>
      </div>
    </PanelShell>
  );
}
