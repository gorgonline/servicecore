"use client";

import { useEffect, useRef } from "react";
import { HONEYPOT_NAME, MIN_FILL_MS, type FormGuard } from "@/lib/form-guard";

/**
 * Formlara görünmez bot koruması ekler (honeypot + zaman tuzağı).
 *
 *  - `field`: form içine render edilecek gizli honeypot alanı. Görsel olarak
 *    gizlidir; tab sırasından çıkarılmıştır; ekran okuyuculara "boş bırakın"
 *    talimatı verir (erişilebilir honeypot deseni).
 *  - `collect()`: gönderim anında honeypot değerini ve form yüklendiğinden
 *    bu yana geçen süreyi toplar; `submitForm`'a üçüncü argüman olarak verilir.
 *
 * Kullanım:
 *   const guard = useFormGuard();
 *   // <form> içinde: {guard.field}
 *   // submit'te: submitForm(sheet, data, guard.collect());
 */
export function useFormGuard() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountRef = useRef<number>(0);

  // Mount zamanı — render sırasında değil, mount sonrası (client) ölçülür.
  useEffect(() => {
    mountRef.current = Date.now();
  }, []);

  const field = (
    <div
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      <label htmlFor={HONEYPOT_NAME}>Bu alanı boş bırakın</label>
      <input
        ref={honeypotRef}
        type="text"
        id={HONEYPOT_NAME}
        name={HONEYPOT_NAME}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );

  function collect(): FormGuard {
    const startedAt = mountRef.current;
    return {
      hp: honeypotRef.current?.value ?? "",
      // Mount henüz ölçülmediyse (pratikte olmaz) güvenli tarafta kal → insan say.
      t: startedAt > 0 ? Date.now() - startedAt : MIN_FILL_MS,
    };
  }

  return { field, collect };
}
