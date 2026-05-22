import type { ComponentProps } from "react";
import type { Form as AntForm } from "antd";

/** Form layout — Form root'unun layout prop'u. */
export type FormLayout = "horizontal" | "vertical" | "inline";

/** Required mark gösterim modu.
 *  - true       : Zorunlu alanlarda kırmızı yıldız (default)
 *  - false      : Hiç gösterme
 *  - "optional" : Zorunlu olmayan alanlarda "(opsiyonel)" yazar
 *  - function   : Custom render
 */
export type FormRequiredMark =
  | boolean
  | "optional"
  | ((labelNode: React.ReactNode, info: { required: boolean }) => React.ReactNode);

/** Label/wrapper grid prop'u (horizontal layout için AntD Grid). */
export interface FormColProps {
  span?: number;
  offset?: number;
  flex?: string | number;
  xs?: number | object;
  sm?: number | object;
  md?: number | object;
  lg?: number | object;
  xl?: number | object;
  xxl?: number | object;
}

/** AntD Rule interface — Form.Item.rules prop'una verilir.
 *
 * 5.7 baseline'da hepsi mevcut. validator async olabilir (Promise döndürür),
 * sync olarak da kullanılabilir.
 */
export interface FormRule {
  /** Zorunlu mu? */
  required?: boolean;
  /** Hata mesajı (template variable destekler: ${name}, ${label}). */
  message?: React.ReactNode;
  /** Regex pattern. */
  pattern?: RegExp;
  /** Tip kısıtlaması — string/number/email/url/tel vb. */
  type?:
    | "string"
    | "number"
    | "boolean"
    | "method"
    | "regexp"
    | "integer"
    | "float"
    | "array"
    | "object"
    | "enum"
    | "date"
    | "url"
    | "hex"
    | "email"
    | "tel";
  /** Tam uzunluk. */
  len?: number;
  /** Maksimum uzunluk/değer. */
  max?: number;
  /** Minimum uzunluk/değer. */
  min?: number;
  /** Whitespace-only string'i empty say. */
  whitespace?: boolean;
  /** Transform değer (validation öncesi). */
  transform?: (value: unknown) => unknown;
  /** Custom validator. */
  validator?: (rule: FormRule, value: unknown) => Promise<void>;
  /** Hangi event'te validate. Default: 'onChange'. */
  validateTrigger?: string | string[];
  /** Hata değil uyarı olarak göster (form submit'i bloklamaz). */
  warningOnly?: boolean;
}

/** ServiceCore Form — AntD Form 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   colon, component, disabled (4.21+), fields, form, initialValues,
 *   labelAlign, labelCol, labelWrap (4.18+), layout, name, preserve (4.4+),
 *   requiredMark, scrollToFirstError, size, validateMessages,
 *   validateTrigger (4.3+), wrapperCol, onFieldsChange, onFinish,
 *   onFinishFailed, onValuesChange
 *
 * 5.7'de YOK:
 *   variant (5.13+), clearOnDestroy (5.18+).
 */
export type FormProps = ComponentProps<typeof AntForm>;

/** Form.Item — alan wrapper'ı. */
export type FormItemProps = ComponentProps<typeof AntForm.Item>;

/** Form.List — dinamik alan listesi. */
export type FormListProps = ComponentProps<typeof AntForm.List>;

/** Form.Provider — cross-form coordination. */
export type FormProviderProps = ComponentProps<typeof AntForm.Provider>;

/** Form.ErrorList — manual error rendering (Form.List validator için). */
export type FormErrorListProps = ComponentProps<typeof AntForm.ErrorList>;
