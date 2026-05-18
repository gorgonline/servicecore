/**
 * Form gönderim yardımcısı — Google Apps Script Web App endpoint'ine POST atar.
 * Tüm form gönderimleri "Servicecore Formlar" adlı Google Sheets dosyasına düşer.
 *
 * Apps Script CORS preflight'ı tetiklememesi için Content-Type 'text/plain' kullanılır;
 * payload yine JSON string olarak gönderilir, Apps Script JSON.parse ile çözer.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "";

export type FormSheet =
  | "Demo"
  | "İletişim"
  | "Soru"
  | "Eğitim"
  | "Kurs"
  | "Partnerlik"
  | "Analiz"
  | "Register";

export type FormSubmitResult =
  | { ok: true; sheet: FormSheet }
  | { ok: false; error: string };

export async function submitForm(
  sheet: FormSheet,
  data: Record<string, unknown>,
): Promise<FormSubmitResult> {
  if (!ENDPOINT) {
    return { ok: false, error: "Form gönderim adresi yapılandırılmamış." };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ sheet, data }),
    });

    if (!response.ok) {
      return { ok: false, error: `Sunucu hatası (${response.status})` };
    }

    const result = (await response.json()) as FormSubmitResult;
    return result;
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Bilinmeyen ağ hatası",
    };
  }
}
