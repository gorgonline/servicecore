import type { ComponentProps } from "react";
import type { Modal as AntModal } from "antd";

/** Modal component props (AntD 5.7 baseline). */
export type ModalProps = ComponentProps<typeof AntModal>;

/** Modal static method config — confirm/info/success/error/warning. */
export type ModalFuncProps = NonNullable<
  Parameters<typeof AntModal.confirm>[0]
>;

/** Static methods'tan dönen instance — update/destroy. */
export type ModalFuncReturn = ReturnType<typeof AntModal.confirm>;
