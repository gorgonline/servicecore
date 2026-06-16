"use client";

import type { ReactNode } from "react";
import { Popover } from "../Popover";
import { Tooltip } from "../Tooltip";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Text } from "../../typography/Text";
import { ListItem } from "../ListItem";
import styles from "./UserMenu.module.css";

export interface UserMenuItem {
  key: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

export interface UserMenuAction {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export interface UserMenuProps {
  /** Tetikleyici — popover'ı açan eleman (avatar). */
  children: ReactNode;
  name: ReactNode;
  email?: ReactNode;
  /** Avatar görseli; yoksa initials gösterilir. */
  avatarSrc?: string;
  /** Avatar fallback baş harfleri (src yoksa). */
  initials?: string;
  /** "Bana atanan kayıtlar" listesi. */
  items?: UserMenuItem[];
  /** Alt aksiyon butonları (Çıkış Yap, Kullanıcı, Başlangıç…). */
  actions?: UserMenuAction[];
  onSelect?: (item: UserMenuItem) => void;
}

/**
 * UserMenu — zengin kullanıcı/hesap menüsü.
 *
 * Avatar'a bağlı Popover; üstte kullanıcı (avatar + ad + email), ortada "bana
 * atanan kayıtlar" listesi (ListItem), altta aksiyon butonları. Veri-güdümlü.
 * İçeride Popover · Avatar · ListItem · Button · Text kullanır.
 */
export function UserMenu({
  children,
  name,
  email,
  avatarSrc,
  initials,
  items = [],
  actions = [],
  onSelect,
}: UserMenuProps) {
  const content = (
    <div className={styles.menu}>
      {/* Header — kullanıcı */}
      <div className={styles.header}>
        <Avatar src={avatarSrc} size={40} tone="accent">
          {initials}
        </Avatar>
        <div className={styles.headerText}>
          <Text size="sm" weight="medium">
            {name}
          </Text>
          {email ? (
            <Text size="xs" color="tertiary">
              {email}
            </Text>
          ) : null}
        </div>
      </div>

      {/* Liste — bana atanan kayıtlar */}
      <div className={styles.list}>
        {items.map((it) => (
          <ListItem
            key={it.key}
            icon={it.icon}
            title={it.title}
            description={it.description}
            onClick={() => onSelect?.(it)}
          />
        ))}
      </div>

      {/* Footer — aksiyonlar (ikon üstte, etiket altta) */}
      {actions.length > 0 ? (
        <div className={styles.footer}>
          {actions.map((a) => (
            <Tooltip key={a.key} title={a.label}>
              <Button
                type="text"
                size="small"
                danger={a.danger}
                leadingIcon={a.icon}
                onClick={a.onClick}
                aria-label={typeof a.label === "string" ? a.label : undefined}
                className={styles.action}
              />
            </Tooltip>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      overlayInnerStyle={{ width: 360, padding: 0 }}
    >
      {children}
    </Popover>
  );
}
