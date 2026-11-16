export const basicCode = `import { Modal, ModalBody, ModalFooter, Button } from "@forge-ui/web";

<Modal aria-label="ModalFooter preview" open={open} onOpenChange={onOpenChange}>
  <ModalBody hidden />
  <ModalFooter>
    <Button variant="outline" tone="neutral" onClick={onClose}>
      Cancel
    </Button>
    <Button onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>;
`;
