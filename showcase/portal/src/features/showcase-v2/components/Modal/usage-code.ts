export const basicCode = `import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DialogClose,
  Icon,
  Button,
} from "@forge-ui/web";

<Modal open={open} onOpenChange={onOpenChange}>
  <ModalHeader title="Title">
    <DialogClose aria-label="Close" appearance="ghost" tone="neutral">
      <Icon name="close" size="inherit" />
    </DialogClose>
  </ModalHeader>
  <ModalBody>Children</ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>
      Close
    </Button>
  </ModalFooter>
</Modal>;
`;

export const inputCode = `import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DialogClose,
  Icon,
  Stack,
  Label,
  Input,
  Button,
} from "@forge-ui/web";

<Modal open={open} onOpenChange={onOpenChange}>
  <ModalHeader title="Title">
    <DialogClose aria-label="Close" appearance="ghost" tone="neutral">
      <Icon name="close" size="inherit" />
    </DialogClose>
  </ModalHeader>
  <ModalBody>
    <Stack gap="1">
      <Label htmlFor="modal-value">Children</Label>
      <Input
        id="modal-value"
        placeholder="Placeholder"
        value={value}
        onChange={onChange}
      />
    </Stack>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>
      Cancel
    </Button>
    <Button onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>;
`;
