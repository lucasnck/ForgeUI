"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogClose,
  Button,
  Stack,
  Inline,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useDialogBodyExample } from "./useDialogBodyExample";

export function DialogBodyExample() {
  const { triggerRef, copy, open, show, request, properties, state } = useDialogBodyExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <Dialog aria-label="Label" open={open} onOpenChange={request} returnFocusRef={triggerRef}>
        <DialogHeader title="Title" hidden />
        <DialogBody title="Title" {...properties}>
          <Stack gap="2">
            <Text>{properties.children ?? "Children"}</Text>
            <Inline gap="2" align="center" justify="end">
              <DialogClose>{copy.close}</DialogClose>
            </Inline>
          </Stack>
        </DialogBody>
      </Dialog>
      <ExampleState value={state} />
    </Stack>
  );
}
