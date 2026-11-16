import { Modal } from "../../molecules/Modal";
import type { ModalProps } from "../../molecules/Modal";

export interface DialogProps extends ModalProps {}

export function Dialog(props: DialogProps) {
  return <Modal {...props} />;
}
