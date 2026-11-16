"use client";
import {
  ToastRegion,
  Toast,
  ToastHeader,
  ToastBody,
  Stack,
  Inline,
  Button,
  Heading,
} from "@forge-ui/web";
import { ToastActions } from "../ToastRegion/ToastActions";
import { ExampleState } from "../ExampleState/ExampleState";
import { useToastHeaderExample } from "./useToastHeaderExample";

function ToastHeaderScenario({ timed = false }: { timed?: boolean }) {
  const { copy, fallbackRef, records, change, action, nextRecord, restore, state, properties } =
    useToastHeaderExample(timed);

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
            <ToastHeader title="Title" {...properties}>
              <Heading level={3}>{properties.children ?? "Children"}</Heading>
              <ToastActions
                record={record}
                nextRecord={nextRecord}
                onAction={action}
                producer={false}
              />
            </ToastHeader>
            <ToastBody hidden></ToastBody>
          </Toast>
        )}
      />
      <ExampleState value={state} />
    </Stack>
  );
}

export function ToastHeaderExample() {
  return <ToastHeaderScenario />;
}
