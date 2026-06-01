/**
 * @servicecoreui/ui/custom — ServiceCore'un kendi yaptığı bileşenler.
 *
 * Buraya ne girer:
 *   • Sıfırdan kurduğumuz, ServiceCore'a özel bileşenler (AntD wrap DEĞİL).
 *
 * Buraya ne GİRMEZ:
 *   • AntD wrap'leri → `@servicecoreui/ui/wraps`
 *   • Typography primitifleri (Heading/Text/…) → ana entry `@servicecoreui/ui`
 *
 * Server-safe (AntD/runtime context bağımlılığı yok) — "use client" gerekmez.
 */

export * from "./Brand";
