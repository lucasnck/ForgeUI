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
  Icon,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useDialogCloseExample } from "./useDialogCloseExample";

export function DialogCloseExample() {
  const { triggerRef, copy, open, show, request, properties, state } = useDialogCloseExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <Dialog open={open} onOpenChange={request} returnFocusRef={triggerRef}>
        <DialogHeader title="Title">
          <DialogClose aria-label={copy.close + " Header"} appearance="ghost" tone="neutral">
            <Icon name="close" size="inherit" />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Text>Children</Text>
        </DialogBody>
        <DialogFooter>
          <Inline gap="2" align="center" justify="end">
            <DialogClose {...properties}>{properties.children ?? copy.close}</DialogClose>
          </Inline>
        </DialogFooter>
      </Dialog>
      <ExampleState value={state} />
    </Stack>
  );
}
