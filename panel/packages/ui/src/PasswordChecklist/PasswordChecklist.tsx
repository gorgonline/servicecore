/**
 * PasswordChecklist — canlı parola kuralı kontrolü + güç barı (frontend, regex).
 *
 * Güvenlik Ayarları'ndaki ilkelerle aynı kurallar; auth akışında (şifre sıfırla /
 * değiştir / kayıt) ortak. `value` controlled; kurallar `defaultPasswordRules`
 * ile gelir, override edilebilir.
 */

import { CheckmarkFilled, CircleDash } from "@carbon/icons-react";
import styles from "./PasswordChecklist.module.css";

export interface PasswordRule {
  key: string;
  label: string;
  test: (pw: string) => boolean;
}

/** Varsayılan kurallar (min uzunluk parametreli). */
export function defaultPasswordRules(minLength = 8): PasswordRule[] {
  return [
    { key: "upper", label: "En az 1 büyük harf", test: (p) => /\p{Lu}/u.test(p) },
    { key: "lower", label: "En az 1 küçük harf", test: (p) => /\p{Ll}/u.test(p) },
    { key: "number", label: "En az 1 rakam", test: (p) => /\d/.test(p) },
    { key: "symbol", label: "En az 1 sembol karakter", test: (p) => /[^\p{L}\d]/u.test(p) },
    { key: "min", label: `En az ${minLength} karakter`, test: (p) => p.length >= minLength },
  ];
}

const STRENGTH = [
  { label: "Zayıf", className: "weak" },
  { label: "Orta", className: "medium" },
  { label: "Güçlü", className: "strong" },
];

export interface PasswordChecklistProps {
  value: string;
  rules?: PasswordRule[];
}

export function PasswordChecklist({
  value,
  rules = defaultPasswordRules(),
}: PasswordChecklistProps) {
  const met = rules.filter((r) => r.test(value)).length;
  const ratio = rules.length ? met / rules.length : 0;
  // 0–%40 zayıf, %40–%80 orta, %80+ güçlü
  const level = ratio >= 0.8 ? 2 : ratio >= 0.4 ? 1 : 0;
  const strength = STRENGTH[level]!;

  return (
    <div className={styles.wrap}>
      <div className={styles.barTrack}>
        <div
          className={`${styles.barFill} ${styles[strength.className]}`}
          style={{ width: `${value ? Math.max(ratio * 100, 8) : 0}%` }}
        />
      </div>
      <div className={styles.strengthRow}>
        <span className={styles.strengthLabel}>Şifre gücü</span>
        <span className={`${styles.strengthValue} ${styles[strength.className]}`}>
          {value ? strength.label : "—"}
        </span>
      </div>

      <ul className={styles.list}>
        {rules.map((r) => {
          const ok = r.test(value);
          return (
            <li key={r.key} className={`${styles.item} ${ok ? styles.ok : styles.pending}`}>
              {ok ? <CheckmarkFilled size={16} /> : <CircleDash size={16} />}
              <span>{r.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
