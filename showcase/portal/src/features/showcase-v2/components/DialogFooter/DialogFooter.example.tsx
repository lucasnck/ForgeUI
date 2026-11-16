"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
  Button,
  Stack,
  Inline,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useDialogFooterExample } from "./useDialogFooterExample";

export function DialogFooterExample() {
  const { triggerRef, copy, open, show, request, properties, state } = useDialogFooterExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <Dialog aria-label="Label" open={open} onOpenChange={request} returnFocusRef={triggerRef}>
        <DialogHeader title="Title" hidden />
        <DialogBody hidden />
        <DialogFooter title="Title" {...properties}>
          <Stack gap="2">
            <Text>{properties.children ?? "Children"}</Text>
            <Inline gap="2" align="center" justify="end">
              <DialogClose>{copy.close}</DialogClose>
            </Inline>
          </Stack>
        </DialogFooter>
      </Dialog>
      <ExampleState value={state} />
    </Stack>
  );
}
