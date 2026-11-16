"use client";
import {
  ToastRegion,
  Toast,
  ToastBody,
  ToastFooter,
  Stack,
  Inline,
  Button,
  Text,
} from "@forge-ui/web";
import { ToastActions } from "../ToastRegion/ToastActions";
import { ExampleState } from "../ExampleState/ExampleState";
import { useToastFooterExample } from "./useToastFooterExample";

function ToastFooterScenario({ timed = false }: { timed?: boolean }) {
  const { copy, fallbackRef, records, change, action, nextRecord, restore, state, properties } =
    useToastFooterExample(timed);

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
            <ToastBody hidden></ToastBody>
            <ToastFooter title="Title" {...properties}>
              <Text>{properties.children ?? "Children"}</Text>
              <ToastActions
                record={record}
                nextRecord={nextRecord}
                onAction={action}
                producer={false}
              />
            </ToastFooter>
          </Toast>
        )}
      />
      <ExampleState value={state} />
    </Stack>
  );
}

export function ToastFooterExample() {
  return <ToastFooterScenario />;
}
