import type {
  SyntheticEvent,
  MouseEvent,
  PointerEvent,
  RefObject,
  ComponentPropsWithRef,
} from "react";
import type { ComponentOpenProps } from "./selection-navigation";

export interface NativeModalRootProps extends Omit<
  ComponentPropsWithRef<"dialog">,
  "open" | "onCancel" | "onClose" | "children"
> {}

export interface ModalDismissProps {
  closeOnOutsideClick?: boolean;
}

export interface ModalOptions extends ComponentOpenProps, ModalDismissProps {
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  requiredInitialFocus?: boolean;
}

export interface ModalContract {
  open: boolean;
  dialogRef: RefObject<HTMLDialogElement | null>;
  requestOpen(open: boolean): void;
  onPointerDown(event: PointerEvent<HTMLDialogElement>): void;
  onPointerCancel(event: PointerEvent<HTMLDialogElement>): void;
  onClick(event: MouseEvent<HTMLDialogElement>): void;
  onCancel(event: SyntheticEvent<HTMLDialogElement>): void;
  onClose(event: SyntheticEvent<HTMLDialogElement>): void;
}
