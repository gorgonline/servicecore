"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Time, Play, Pause, Checkmark, TrashCan, Add } from "@carbon/icons-react";
import { Popover } from "../../../primitive/Popover";
import { Popconfirm } from "../../../primitive/Popconfirm";
import { Input } from "../../../primitive/Input";
import { Button } from "../../../primitive/Button";
import { Text } from "../../../typography/Text";
import { message } from "../../../primitive/Message";
import styles from "./TimeTracker.module.css";

export interface TimerEntry {
  key: string;
  name: string;
  /** Birikmiş saniye. */
  seconds: number;
  /** Çalışıyor mu (tik alıyor mu). */
  running?: boolean;
}

export interface TimeTrackerProps {
  /** Tetikleyici — popover'ı açan eleman (ör. saat ikonu butonu). */
  children: ReactNode;
  title?: string;
  placeholder?: string;
  /** Başlangıç sayaçları (mock / persisted). */
  initialTimers?: TimerEntry[];
  /** Sayaç listesi değişince (ekle/başlat/durdur/tamamla/sil). */
  onChange?: (timers: TimerEntry[]) => void;
}

/** Saniye → HH:MM:SS (saat 2 hane min, sınırsız: 1631:21:18). */
function format(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/**
 * TimeTracker — "Zaman Makinesi" zaman takip aracı.
 *
 * Clock ikonuna bağlı bir Popover; isimli sayaçlar başlatılır, duraklatılır,
 * tamamlanır, silinir. Çalışan sayaçlar saniyede bir tikler. Veri-güdümlü
 * (initialTimers + onChange). İçeride Popover · Input · Button · Text kullanır.
 *
 * @example
 * <TimeTracker initialTimers={timers}>
 *   <Button type="text" leadingIcon={<Time size={18} />} aria-label="Zaman Makinesi" />
 * </TimeTracker>
 */
export function TimeTracker({
  children,
  title = "Zaman Makinesi",
  placeholder = "Zaman Makinesinin Adı",
  initialTimers = [],
  onChange,
}: TimeTrackerProps) {
  const [timers, setTimers] = useState<TimerEntry[]>(initialTimers);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const idRef = useRef(0);

  // Saniye tik — yalnız çalışan sayaçları artır. Popover kapalıyken de işler.
  useEffect(() => {
    const id = setInterval(() => {
      setTimers((prev) =>
        prev.some((t) => t.running)
          ? prev.map((t) => (t.running ? { ...t, seconds: t.seconds + 1 } : t))
          : prev,
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const commit = (next: TimerEntry[]) => {
    setTimers(next);
    onChange?.(next);
  };

  const add = () => {
    const n = name.trim();
    if (!n) {
      setError(true); // zorunlu alan — inline hata (Modal/toast yok)
      return;
    }
    setError(false);
    commit([
      ...timers,
      { key: `t${(idRef.current += 1)}`, name: n, seconds: 0, running: true },
    ]);
    setName("");
  };

  const toggle = (key: string) =>
    commit(timers.map((t) => (t.key === key ? { ...t, running: !t.running } : t)));

  // Sil/Tamamla ortak: listeden çıkar.
  const remove = (key: string) => commit(timers.filter((t) => t.key !== key));

  // Tamamla (✓): "kaydedildi" toast + listeden çıkar (logged). Sil (🗑) → toast yok.
  const complete = (key: string) => {
    messageApi.success("Sayaç kaydedildi");
    remove(key);
  };

  const panel = (
    <div className={styles.panel}>
      {/* Yeni sayaç — + butonu suffix içinde. Boşsa inline hata (status + Text). */}
      <div className={styles.addRow}>
        <Input
          value={name}
          status={error ? "error" : undefined}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(false);
          }}
          onPressEnter={add}
          placeholder={placeholder}
          suffix={
            <Button
              type="text"
              size="small"
              leadingIcon={<Add size={18} />}
              aria-label="Sayaç başlat"
              onClick={add}
              className={styles.addBtn}
            />
          }
        />
        {error ? (
          <Text size="xs" color="danger">
            Bu alan zorunlu.
          </Text>
        ) : null}
      </div>

      {/* Liste */}
      <div className={styles.list}>
        {timers.length === 0 ? (
          <Text size="sm" color="tertiary" className={styles.empty}>
            Henüz sayaç yok.
          </Text>
        ) : (
          timers.map((t) => (
            <div key={t.key} className={styles.row}>
              <Time size={16} className={styles.rowIcon} />
              <Text size="sm" weight="medium" className={styles.elapsed}>
                {format(t.seconds)}
              </Text>
              <Text size="sm" color="secondary" className={styles.name}>
                {t.name}
              </Text>
              <span className={styles.controls}>
                <Button
                  type="text"
                  size="small"
                  aria-label={t.running ? "Duraklat" : "Başlat"}
                  leadingIcon={t.running ? <Pause size={16} /> : <Play size={16} />}
                  onClick={() => toggle(t.key)}
                />
                <Button
                  type="text"
                  size="small"
                  aria-label="Tamamla"
                  leadingIcon={<Checkmark size={16} />}
                  onClick={() => complete(t.key)}
                />
                <Popconfirm
                  title="Emin misiniz?"
                  description="Silme işlemi geri alınamaz!"
                  okText="Sil"
                  okType="danger"
                  cancelText="Vazgeç"
                  onConfirm={() => remove(t.key)}
                >
                  <Button
                    type="text"
                    size="small"
                    danger
                    aria-label="Sil"
                    leadingIcon={<TrashCan size={16} />}
                  />
                </Popconfirm>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      {contextHolder}
      <Popover
        content={panel}
        title={title}
        trigger="click"
        placement="bottomRight"
        overlayInnerStyle={{ width: 360 }}
      >
        {children}
      </Popover>
    </>
  );
}
