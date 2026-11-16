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
import { useToastRegionExample } from "./useToastRegionExample";

function ToastRegionScenario({ timed = false }: { timed?: boolean }) {
  const {
    copy,
    fallbackRef,
    records,
    change,
    action,
    nextRecord,
    restore,
    update,
    state,
    properties,
  } = useToastRegionExample(timed);

  return (
    <Stack gap="4">
      <Inline gap="2" align="center" justify="end">
        <Button ref={fallbackRef} type="button" appearance="outlined" onClick={restore}>
          {copy.show}
        </Button>
        <Button type="button" appearance="outlined" onClick={update}>
          {copy.update}
        </Button>
      </Inline>
      <ToastRegion
        label="Label"
        {...properties}
        records={records}
        onRecordsChange={change}
        fallbackRef={fallbackRef}
        renderToast={(record) => (
          <Toast record={record}>
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
                producer={true}
              />
            </ToastFooter>
          </Toast>
        )}
      />
      <ExampleState value={state} />
    </Stack>
  );
}

export function ToastRegionExample() {
  return <ToastRegionScenario />;
}

export function ToastRegionTimedExample() {
  return <ToastRegionScenario timed />;
}
