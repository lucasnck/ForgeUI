"use client";
import {
  Dialog,
  DialogHeader,
  DialogClose,
  AlertDialogBody,
  Button,
  Stack,
  Inline,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useAlertDialogBodyExample } from "./useAlertDialogBodyExample";

export function AlertDialogBodyExample() {
  const { triggerRef, copy, open, show, request, properties, state } = useAlertDialogBodyExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <Dialog aria-label="Label" open={open} onOpenChange={request} returnFocusRef={triggerRef}>
        <DialogHeader title="Title" hidden />
        <AlertDialogBody title="Title" {...properties}>
          <Stack gap="2">
            <Text>{properties.children ?? "Children"}</Text>
            <Inline gap="2" align="center" justify="end">
              <DialogClose>{copy.close}</DialogClose>
            </Inline>
          </Stack>
        </AlertDialogBody>
      </Dialog>
      <ExampleState value={state} />
    </Stack>
  );
}
