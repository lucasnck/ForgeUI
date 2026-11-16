"use client";
import {
  Dialog,
  DialogBody,
  DialogClose,
  AlertDialogHeader,
  Button,
  Stack,
  Icon,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useAlertDialogHeaderExample } from "./useAlertDialogHeaderExample";

export function AlertDialogHeaderExample() {
  const { triggerRef, copy, open, show, request, properties, state } =
    useAlertDialogHeaderExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <Dialog open={open} onOpenChange={request} returnFocusRef={triggerRef}>
        <AlertDialogHeader title="Title" {...properties} icon={<Icon name="info" size="sm" />}>
          <DialogClose aria-label={copy.close} appearance="ghost" tone="neutral">
            <Icon name="close" size="inherit" />
          </DialogClose>
        </AlertDialogHeader>
        <DialogBody hidden />
      </Dialog>
      <ExampleState value={state} />
    </Stack>
  );
}
