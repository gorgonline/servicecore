import { Form as AntForm } from "antd";
import clsx from "clsx";
import styles from "./Form.module.css";
import type {
  FormProps,
  FormItemProps,
  FormListProps,
  FormProviderProps,
  FormErrorListProps,
} from "./Form.types";

/** ServiceCore Form — AntD Form wrap.
 *
 * ITSM panelinin standart form library'si. State yönetimi, validation,
 * submit handling, cross-field reactivity hepsi AntD Form'a bırakılır —
 * useState ile manuel kontrol etmeyin.
 *
 * AntD 5.7 baseline'da Form'un hemen tüm public API'si mevcut. Sonra
 * gelenler (variant 5.13+, clearOnDestroy 5.18+, useWatch selector 5.12+)
 * KULLANMA.
 *
 * @example Temel kullanım
 * ```tsx
 * const [form] = Form.useForm();
 *
 * <Form form={form} layout="vertical" onFinish={values => api.create(values)}>
 *   <Form.Item name="title" label="Başlık" rules={[{ required: true }]}>
 *     <Input />
 *   </Form.Item>
 *   <Form.Item>
 *     <Button type="primary" htmlType="submit">Oluştur</Button>
 *   </Form.Item>
 * </Form>
 * ```
 */
function FormRoot({ className, ...rest }: FormProps) {
  return <AntForm {...rest} className={clsx(styles.form, className)} />;
}

/** ServiceCore Form.Item — AntD Form.Item wrap.
 *
 * Her form alanını sarar. `name` Form store'da alanın key'i, `rules` validation
 * kuralları, `label` üst etiket. Form context'inden disabled/size otomatik
 * miras alınır.
 *
 * KRİTİK — Checkbox/Switch için `valuePropName="checked"` ekle:
 * ```tsx
 * <Form.Item name="aktif" valuePropName="checked">
 *   <Switch />
 * </Form.Item>
 * ```
 */
function FormItem({ className, ...rest }: FormItemProps) {
  return <AntForm.Item {...rest} className={clsx(styles.item, className)} />;
}

/** Form.Item.useStatus — context'teki Form.Item'ın validation status'unu okur. */
FormItem.useStatus = AntForm.Item.useStatus;

/** Form.List — dinamik alan listesi (tag listesi, varyantlar, vs.). */
function FormList(props: FormListProps) {
  return <AntForm.List {...props} />;
}

/** Form.ErrorList — manuel error render (Form.List validator için kullanışlı). */
function FormErrorList(props: FormErrorListProps) {
  return <AntForm.ErrorList {...props} />;
}

/** Form.Provider — cross-form coordination (örneğin Modal içinden ana forma
 *  veri göndermek için onFormFinish). */
function FormProvider(props: FormProviderProps) {
  return <AntForm.Provider {...props} />;
}

FormRoot.Item = FormItem;
FormRoot.List = FormList;
FormRoot.ErrorList = FormErrorList;
FormRoot.Provider = FormProvider;

/** Form instance yaratır. Form'a `form={form}` ile bağla, sonra
 *  form.validateFields(), form.setFieldsValue(), form.resetFields() vs. */
FormRoot.useForm = AntForm.useForm;

/** Component ağacında en yakın Form context'inin instance'ını döner —
 *  prop drilling olmadan child component'ten Form'a erişim. */
FormRoot.useFormInstance = AntForm.useFormInstance;

/** Form alanını dinler ve değişimde re-render tetikler.
 *
 * 5.7 baseline'da temel kullanım: `useWatch("name", form)`.
 * Selector (5.12+) ve preserve option (5.4+ WatchOptions) sonradan geldi —
 * 5.7'de basit name/form path ile sınırlı kal. */
FormRoot.useWatch = AntForm.useWatch;

export const Form = FormRoot;
