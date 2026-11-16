export const basicCode = `import { Modal, ModalBody, DialogClose, Stack, Text } from "@forge-ui/web";

<Modal aria-label="ModalBody preview" open={open} onOpenChange={onOpenChange}>
  <ModalBody>
    <Stack gap="2">
      <Text>Children</Text>
      <DialogClose appearance="outlined">Close</DialogClose>
    </Stack>
  </ModalBody>
</Modal>;
`;
