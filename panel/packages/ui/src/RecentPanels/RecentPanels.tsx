"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { ArrowRight, Catalog, Dashboard } from "@carbon/icons-react";
import { Popover } from "../Popover";
import { Popconfirm } from "../Popconfirm";
import { Empty } from "../Empty";
import { Button } from "../Button";
import { Text } from "../Text";
import { Kbd } from "../Kbd";
import { ListItem } from "../ListItem";
import { message } from "../Message";
import styles from "./RecentPanels.module.css";

export interface RecentPanel {
  key: string;
  /** Pano adı — ana satır. */
  title: string;
  /** Modül/yol — ikincil satır (ör. "Operasyon Yönetimi · /panolar/ops"). */
  path?: string;
  /** Son görüntülenme — sağa hizalı sessiz meta (ör. "5 dk önce"). */
  lastViewed?: ReactNode;
  /** Tam tarih — meta'nın title attribute'u (ekran okuyucu / hover için kesin bilgi). */
  lastViewedTitle?: string;
  /** Şu an açık pano — sol accent şerit + ekran okuyucu işareti. */
  current?: boolean;
  /** Satır ikonu (varsayılan Dashboard). */
  icon?: ReactNode;
}

export interface RecentPanelsProps {
  /** Tetikleyici — popover'ı açan eleman (ör. saat butonu). */
  children: ReactNode;
  title?: string;
  /** Başlangıç listesi — ekleme/çıkarma içeride yönetilir. */
  panels?: RecentPanel[];
  /** Bir panoya gidilince (panel kapanır). */
  onNavigate?: (panel: RecentPanel) => void;
  /** "Tüm panolar" çıkışı (panel kapanır). */
  onViewAll?: () => void;
  /** Liste değişince (çıkar/geri al/temizle). */
  onChange?: (panels: RecentPanel[]) => void;
  emptyText?: string;
  emptyHint?: string;
  viewAllLabel?: string;
  clearLabel?: string;
}

/**
 * RecentPanels — "Son Panolar" hızlı erişim listesi.
 *
 * Saat ikonuna bağlı bir Popover; son görüntülenen panoları listeler, satıra
 * tıklayınca o panoya gider, hover/focus'ta beliren × ile satırı listeden çıkarır
 * (anında + "Geri al" toast). Başlık + sayaç, "Tümünü temizle" (Popconfirm),
 * Empty (CTA'lı) ve footer (Tüm panolar + klavye ipucu) içerir. Aktif pano sol
 * accent şeritle işaretlenir. İçeride Popover · ListItem · Empty · Popconfirm ·
 * Kbd · message kullanır (DRY — satır omurgası ListItem).
 *
 * @example
 * <RecentPanels panels={recent} onNavigate={go} onViewAll={() => router.push("/panolar")}>
 *   <Button type="text" leadingIcon={<Time size={18} />} aria-label="Son panolar" />
 * </RecentPanels>
 */
export function RecentPanels({
  children,
  title = "Son Panolar",
  panels = [],
  onNavigate,
  onViewAll,
  onChange,
  emptyText = "Henüz pano görüntülemediniz",
  emptyHint = "Açtığınız panolar burada hızlı erişim için listelenir",
  viewAllLabel = "Tüm panolar",
  clearLabel = "Tümünü temizle",
}: RecentPanelsProps) {
  const [list, setList] = useState<RecentPanel[]>(panels);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const listRef = useRef<HTMLDivElement>(null);
  // Güncel listeyi kapanış closure'ından bağımsız tut (geri al doğru sıraya eklesin).
  const listValueRef = useRef<RecentPanel[]>(panels);

  const commit = (next: RecentPanel[]) => {
    listValueRef.current = next;
    setList(next);
    onChange?.(next);
  };

  const navigate = (panel: RecentPanel) => {
    setOpen(false);
    onNavigate?.(panel);
  };

  const viewAll = () => {
    setOpen(false);
    onViewAll?.();
  };

  // Çıkar: anında kaldır + "Geri al" toast (5 sn). Pano silinmiyor, sadece listeden
  // düşüyor — düşük bedelli, Popconfirm yerine geri-al (sürtünmesiz ama güvenli).
  const remove = (panel: RecentPanel) => {
    const index = listValueRef.current.findIndex((p) => p.key === panel.key);
    commit(listValueRef.current.filter((p) => p.key !== panel.key));
    const toastKey = `recent-${panel.key}`;
    messageApi.open({
      key: toastKey,
      duration: 5,
      content: (
        <span className={styles.undo}>
          <Text size="sm">{panel.title} listeden çıkarıldı</Text>
          <button
            type="button"
            className={styles.undoBtn}
            onClick={() => {
              const arr = [...listValueRef.current];
              arr.splice(Math.min(index, arr.length), 0, panel);
              commit(arr);
              messageApi.destroy(toastKey);
            }}
          >
            Geri al
          </button>
        </span>
      ),
    });
  };

  // Tümünü temizle: tek tıkta tüm listeyi yok etmek tek satırdan farklı bedelde →
  // Popconfirm (yanlış-tıkla koruması).
  const clear = () => commit([]);

  // Popover'da yerleşik menü ok-navigasyonu yok; satırlar arası ↑/↓ için hafif roving.
  // Her satır = ListItem wrapper; ana (tıklanabilir) buton wrapper'ın ilk butonu (× ikinci).
  const onListKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const root = listRef.current;
    if (!root) return;
    const btns = Array.from(root.children)
      .map((el) => el.querySelector("button"))
      .filter((b): b is HTMLButtonElement => b !== null);
    if (!btns.length) return;
    e.preventDefault();
    const idx = btns.findIndex((b) => b === document.activeElement);
    const nextIdx =
      e.key === "ArrowDown"
        ? idx < 0
          ? 0
          : (idx + 1) % btns.length
        : idx < 0
          ? btns.length - 1
          : (idx - 1 + btns.length) % btns.length;
    btns[nextIdx]?.focus();
  };

  const body =
    list.length === 0 ? (
      <Empty
        className={styles.empty}
        image={<Dashboard size={40} className={styles.emptyIcon} />}
        description={
          <span className={styles.emptyDesc}>
            <Text size="sm" color="tertiary">
              {emptyText}
            </Text>
            <Text size="xs" color="tertiary">
              {emptyHint}
            </Text>
          </span>
        }
      >
        <Button
          type="default"
          size="small"
          leadingIcon={<Catalog size={16} />}
          onClick={viewAll}
        >
          {viewAllLabel}
        </Button>
      </Empty>
    ) : (
      <div className={styles.list} ref={listRef} onKeyDown={onListKeyDown}>
        {list.map((p) => (
          <ListItem
            key={p.key}
            className={p.current ? styles.currentRow : undefined}
            icon={p.icon ?? <Dashboard size={18} />}
            title={
              <>
                {p.title}
                {p.current ? <span className={styles.srOnly}> (şu an açık)</span> : null}
              </>
            }
            description={p.path}
            meta={
              p.lastViewed ? (
                <span title={p.lastViewedTitle}>{p.lastViewed}</span>
              ) : undefined
            }
            onClick={() => navigate(p)}
            onRemove={() => remove(p)}
            removeLabel={`${p.title} listeden çıkar`}
          />
        ))}
      </div>
    );

  const content = (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>
          <Text size="sm" weight="semibold">
            {title}
          </Text>
          {list.length > 0 ? (
            <Text size="xs" color="tertiary" className={styles.count}>
              {list.length}
            </Text>
          ) : null}
        </span>
        {list.length > 0 ? (
          <Popconfirm
            title="Son panolar listesini temizle?"
            okText="Temizle"
            okType="danger"
            cancelText="Vazgeç"
            placement="bottomRight"
            onConfirm={clear}
          >
            <Button type="text" size="small">
              {clearLabel}
            </Button>
          </Popconfirm>
        ) : null}
      </div>

      {body}

      {list.length > 0 ? (
        <div className={styles.footer}>
          <Button
            type="link"
            size="small"
            trailingIcon={<ArrowRight size={16} />}
            onClick={viewAll}
          >
            {viewAllLabel}
          </Button>
          <span className={styles.kbdHint}>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Text size="xs" color="tertiary">
              gez
            </Text>
            <Text size="xs" color="tertiary">
              ·
            </Text>
            <Kbd>↵</Kbd>
            <Text size="xs" color="tertiary">
              aç
            </Text>
          </span>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      {contextHolder}
      <Popover
        content={content}
        open={open}
        onOpenChange={setOpen}
        trigger="click"
        placement="bottomLeft"
        overlayInnerStyle={{ width: 320, padding: 0 }}
      >
        {children}
      </Popover>
    </>
  );
}
