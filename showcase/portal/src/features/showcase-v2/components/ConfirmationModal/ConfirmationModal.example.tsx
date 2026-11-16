"use client";
import { ConfirmationModal, Button, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useConfirmationModalExample } from "./useConfirmationModalExample";

function ConfirmationModalScenario({ pending = false }: { pending?: boolean }) {
  const { triggerRef, copy, open, show, request, confirm, loading, properties, state } =
    useConfirmationModalExample(pending);

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <ConfirmationModal
        title="Title"
        closeLabel={copy.close}
        cancelLabel={copy.cancel}
        confirmLabel={copy.confirm}
        loadingLabel="LoadingLabel"
        {...properties}
        open={open}
        onOpenChange={request}
        onConfirm={confirm}
        loading={loading}
        returnFocusRef={triggerRef}
      >
        {properties.children ?? "Children"}
      </ConfirmationModal>
      <ExampleState value={state} />
    </Stack>
  );
}

export function ConfirmationModalExample() {
  return <ConfirmationModalScenario />;
}

export function ConfirmationModalPendingExample() {
  return <ConfirmationModalScenario pending />;
}
