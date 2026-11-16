"use client";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  DialogClose,
  Button,
  Icon,
  Text,
  Stack,
  Inline,
  Checkbox,
  Label,
} from "@forge-ui/web";
import { initialRecord } from "../Dialog/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useAlertDialogExample } from "./useAlertDialogExample";

function AlertDialogScenario({ acknowledgement = false }: { acknowledgement?: boolean }) {
  const {
    triggerRef,
    cancelRef,
    copy,
    open,
    show,
    request,
    id,
    properties,
    checked,
    acknowledge,
    confirm,
    state,
  } = useAlertDialogExample(acknowledgement);

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <AlertDialog
        description="Description"
        {...properties}
        open={open}
        onOpenChange={request}
        initialFocusRef={cancelRef}
        returnFocusRef={triggerRef}
      >
        <AlertDialogHeader title="Title" icon={<Icon name="info" size="sm" />}>
          <DialogClose aria-label={copy.close} appearance="ghost" tone="neutral">
            <Icon name="close" size="inherit" />
          </DialogClose>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>{initialRecord.title}</Text>
          {acknowledgement && (
            <Inline gap="2" align="center">
              <Checkbox id={id} checked={checked} onChange={acknowledge} />
              <Label htmlFor={id}>Children</Label>
            </Inline>
          )}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Inline gap="2" align="center" justify="end">
            <DialogClose ref={cancelRef} appearance="outlined">
              {copy.cancel}
            </DialogClose>
            <Button type="button" disabled={acknowledgement && !checked} onClick={confirm}>
              {copy.confirm}
            </Button>
          </Inline>
        </AlertDialogFooter>
      </AlertDialog>
      <ExampleState value={state} />
    </Stack>
  );
}

export function AlertDialogExample() {
  return <AlertDialogScenario />;
}

export function AlertDialogAcknowledgementExample() {
  return <AlertDialogScenario acknowledgement />;
}
