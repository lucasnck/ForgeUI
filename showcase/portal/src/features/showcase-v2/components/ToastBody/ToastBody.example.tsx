"use client";
import { ToastRegion, Toast, ToastBody, Stack, Inline, Button, Text } from "@forge-ui/web";
import { ToastActions } from "../ToastRegion/ToastActions";
import { ExampleState } from "../ExampleState/ExampleState";
import { useToastBodyExample } from "./useToastBodyExample";

function ToastBodyScenario({ timed = false }: { timed?: boolean }) {
  const { copy, fallbackRef, records, change, action, nextRecord, restore, state, properties } =
    useToastBodyExample(timed);

  return (
    <Stack gap="4">
      <Inline gap="2" align="center" justify="end">
        <Button ref={fallbackRef} type="button" appearance="outlined" onClick={restore}>
          {copy.show}
        </Button>
      </Inline>
      <ToastRegion
        label="Label"
        records={records}
        onRecordsChange={change}
        fallbackRef={fallbackRef}
        renderToast={(record) => (
          <Toast record={record}>
            <ToastBody title="Title" {...properties}>
              <Text>{properties.children ?? "Children"}</Text>
              <ToastActions
                record={record}
                nextRecord={nextRecord}
                onAction={action}
                producer={false}
              />
            </ToastBody>
          </Toast>
        )}
      />
      <ExampleState value={state} />
    </Stack>
  );
}

export function ToastBodyExample() {
  return <ToastBodyScenario />;
}
