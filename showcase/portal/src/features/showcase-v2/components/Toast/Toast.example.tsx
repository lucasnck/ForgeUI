"use client";
import {
  ToastRegion,
  Toast,
  ToastHeader,
  ToastBody,
  ToastFooter,
  Stack,
  Inline,
  Button,
  Heading,
  Text,
} from "@forge-ui/web";
import { ToastActions } from "../ToastRegion/ToastActions";
import { ExampleState } from "../ExampleState/ExampleState";
import { useToastExample } from "./useToastExample";

function ToastScenario({ timed = false }: { timed?: boolean }) {
  const { copy, fallbackRef, records, change, action, nextRecord, restore, state, properties } =
    useToastExample(timed);

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
          <Toast record={record} {...properties}>
            <ToastHeader>
              <Heading level={3}>{record.title}</Heading>
            </ToastHeader>
            <ToastBody>
              <Text>{record.message}</Text>
            </ToastBody>
            <ToastFooter>
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

export function ToastExample() {
  return <ToastScenario />;
}
