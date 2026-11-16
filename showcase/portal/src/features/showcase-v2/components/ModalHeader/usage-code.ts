export const basicCode = `import {
  Modal,
  ModalHeader,
  ModalBody,
  DialogClose,
  Icon,
} from "@forge-ui/web";

<Modal open={open} onOpenChange={onOpenChange}>
  <ModalHeader title="Title" icon={<Icon name="info" size="inherit" />}>
    <DialogClose aria-label="Close" appearance="ghost" tone="neutral">
      <Icon name="close" size="inherit" />
    </DialogClose>
  </ModalHeader>
  <ModalBody hidden />
</Modal>;
`;
