export const basicCode = `import { Button } from "@forge-ui/web";

<Button>Children</Button>;
`;

export const hierarchyCode = `import { Button, Inline, Stack, Heading, AlertDialog, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@forge-ui/web";

<Stack gap="3">
  <Stack gap="2">
    <Heading level={3} size="md">Listing</Heading>
    <Inline gap="2">
      <Button tone="neutral" appearance="bordered" onClick={onRetry}>Retry</Button>
      <Button tone="brand" appearance="solid" onClick={onCreate}>Create</Button>
    </Inline>
  </Stack>
  <Stack gap="2">
    <Heading level={3} size="md">Details</Heading>
    <Inline gap="2">
      <Button tone="neutral" appearance="ghost" onClick={onBack}>Back</Button>
      <Button tone="sand" appearance="bordered" onClick={onEdit}>Edit</Button>
      <Button tone="neutral" appearance="bordered" onClick={onShowDialog}>Delete</Button>
    </Inline>
  </Stack>
  <AlertDialog open={open} onOpenChange={onOpenChange} initialFocusRef={cancelRef} description="Description">
    <AlertDialogHeader title="Confirm deletion" />
    <AlertDialogBody>Description</AlertDialogBody>
    <AlertDialogFooter>
      <Button ref={cancelRef} tone="neutral" appearance="ghost" onClick={onCancel}>Cancel</Button>
      <Button tone="danger" appearance="solid" onClick={onConfirm}>Delete</Button>
    </AlertDialogFooter>
  </AlertDialog>
</Stack>;
`;
