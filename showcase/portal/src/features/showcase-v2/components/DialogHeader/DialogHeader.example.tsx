"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogClose,
  Button,
  Stack,
  Icon,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useDialogHeaderExample } from "./useDialogHeaderExample";

export function DialogHeaderExample() {
  const { triggerRef, copy, open, show, request, properties, state } = useDialogHeaderExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <Dialog open={open} onOpenChange={request} returnFocusRef={triggerRef}>
        <DialogHeader title="Title" {...properties} icon={<Icon name="info" size="sm" />}>
          <DialogClose aria-label={copy.close} appearance="ghost" tone="neutral">
            <Icon name="close" size="inherit" />
          </DialogClose>
        </DialogHeader>
        <DialogBody hidden />
      </Dialog>
      <ExampleState value={state} />
    </Stack>
  );
}
