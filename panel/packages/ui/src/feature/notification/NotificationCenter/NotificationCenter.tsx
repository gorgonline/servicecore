"use client";

import type { ReactNode } from "react";
import { Notification as NotificationIcon, DocumentTasks } from "@carbon/icons-react";
import { Popover } from "../../../primitive/Popover";
import { Tabs } from "../../../primitive/Tabs";
import { Empty } from "../../../primitive/Empty";
import { Badge } from "../../../primitive/Badge";
import { ListItem } from "../../../primitive/ListItem";
import styles from "./NotificationCenter.module.css";

export interface NotificationItem {
  key: string;
  title: string;
  description?: string;
  time?: string;
  icon?: ReactNode;
  /** Okunmadıysa Etkinlikler sekmesinde kırmızı dot çıkar. */
  unread?: boolean;
}

export interface NotificationCenterProps {
  /** Tetikleyici — popover'ı açan eleman (ör. bell butonu). */
  children: ReactNode;
  events?: NotificationItem[];
  activities?: NotificationItem[];
  eventsLabel?: string;
  activitiesLabel?: string;
  emptyText?: string;
}

/** Bir sekmenin içeriği — doluysa liste, boşsa Empty (DRY: her iki sekme kullanır). */
function NotifList({ items, emptyText }: { items: NotificationItem[]; emptyText: string }) {
  if (items.length === 0) {
    return (
      <Empty
        className={styles.empty}
        image={<NotificationIcon size={40} className={styles.emptyIcon} />}
        description={emptyText}
      />
    );
  }
  return (
    <div className={styles.list}>
      {items.map((it) => (
        <ListItem
          key={it.key}
          icon={it.icon ?? <NotificationIcon size={18} />}
          title={it.title}
          description={it.description}
          meta={it.time}
        />
      ))}
    </div>
  );
}

/**
 * NotificationCenter — bildirim merkezi.
 *
 * Bell ikonuna bağlı Popover; iki sekme (Etkinlikler / Aktivite Kayıtları),
 * her sekme doluysa liste, boşsa Empty. Veri-güdümlü (events + activities).
 * İçeride Popover · Tabs · Empty · Badge · Text kullanır.
 *
 * @example
 * <NotificationCenter events={events} activities={activities}>
 *   <Badge dot><Button type="text" leadingIcon={<Notification size={18} />} /></Badge>
 * </NotificationCenter>
 */
export function NotificationCenter({
  children,
  events = [],
  activities = [],
  eventsLabel = "Etkinlikler",
  activitiesLabel = "Aktivite Kayıtları",
  emptyText = "Henüz bir bildirim yok",
}: NotificationCenterProps) {
  const hasUnread = events.some((e) => e.unread);

  const content = (
    <Tabs
      className={styles.tabs}
      items={[
        {
          key: "events",
          label: (
            <span className={styles.tabLabel}>
              <Badge dot={hasUnread}>
                <NotificationIcon size={16} />
              </Badge>
              {eventsLabel}
            </span>
          ),
          children: <NotifList items={events} emptyText={emptyText} />,
        },
        {
          key: "activities",
          label: (
            <span className={styles.tabLabel}>
              <DocumentTasks size={16} />
              {activitiesLabel}
            </span>
          ),
          children: <NotifList items={activities} emptyText={emptyText} />,
        },
      ]}
    />
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      overlayInnerStyle={{ width: 440, padding: 0 }}
    >
      {children}
    </Popover>
  );
}
