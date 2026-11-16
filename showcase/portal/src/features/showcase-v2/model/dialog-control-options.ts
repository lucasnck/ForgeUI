import type {
  DialogProps,
  DialogHeaderProps,
  DialogBodyProps,
  DialogFooterProps,
  DialogCloseProps,
  AlertDialogProps,
  AlertDialogHeaderProps,
  AlertDialogBodyProps,
  AlertDialogFooterProps,
  ConfirmationModalProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const dialogControlOptions = {
  Dialog: {
    open: { kind: "boolean" },
    animated: { kind: "boolean" },
    animationEffect: { kind: "select", options: ["none", "fade", "scale"] },
    closeOnOutsideClick: { kind: "boolean" },
    title: { kind: "text" },
  },
  AlertDialog: {
    description: { kind: "text" },
    open: { kind: "boolean" },
    animated: { kind: "boolean" },
    animationEffect: { kind: "select", options: ["none", "fade", "scale"] },
  },
  ConfirmationModal: {
    closeOnOutsideClick: { kind: "boolean" },
    title: { kind: "text" },
    children: { kind: "text" },
    open: { kind: "boolean" },
    animated: { kind: "boolean" },
    animationEffect: { kind: "select", options: ["none", "fade", "scale"] },
    closeLabel: { kind: "text" },
    cancelLabel: { kind: "text" },
    confirmLabel: { kind: "text" },
    loading: { kind: "boolean" },
    loadingLabel: { kind: "text" },
  },
  DialogHeader: { title: { kind: "text" }, divider: { kind: "boolean" } },
  AlertDialogHeader: { title: { kind: "text" }, divider: { kind: "boolean" } },
  DialogBody: { children: { kind: "text" }, title: { kind: "text" } },
  AlertDialogBody: { children: { kind: "text" }, title: { kind: "text" } },
  DialogFooter: {
    children: { kind: "text" },
    divider: { kind: "boolean" },
    title: { kind: "text" },
  },
  AlertDialogFooter: {
    children: { kind: "text" },
    divider: { kind: "boolean" },
    title: { kind: "text" },
  },
  DialogClose: {
    children: { kind: "text" },
    disabled: { kind: "boolean" },
    size: { kind: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: { kind: "select", options: ["square", "rounded", "pill"] },
  },
} satisfies {
  Dialog: PropertyEditors<DialogProps>;
  DialogHeader: PropertyEditors<DialogHeaderProps>;
  DialogBody: PropertyEditors<DialogBodyProps>;
  DialogFooter: PropertyEditors<DialogFooterProps>;
  DialogClose: PropertyEditors<DialogCloseProps>;
  AlertDialog: PropertyEditors<AlertDialogProps>;
  AlertDialogHeader: PropertyEditors<AlertDialogHeaderProps>;
  AlertDialogBody: PropertyEditors<AlertDialogBodyProps>;
  AlertDialogFooter: PropertyEditors<AlertDialogFooterProps>;
  ConfirmationModal: PropertyEditors<ConfirmationModalProps>;
};
