"use client";
import {
  Button,
  Inline,
  Stack,
  ToastRegion,
  Toast,
  ToastHeader,
  ToastBody,
  ToastFooter,
} from "@forge-ui/web";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useToastResourceExample } from "./useToastResourceExample";

function Producer() {
  const { queue, lastId, add, dismiss, copy } = useToastResourceExample();

  return (
    <Stack gap="2">
      <Inline gap="2">
        <Button onClick={add}>{copy.add}</Button>
        <Button
          variant="outline"
          onClick={dismiss}
          disabled={!queue.records.some((r) => r.id === lastId)}
        >
          {copy.dismiss}
        </Button>
      </Inline>
      <pre className={styles.state}>
        {JSON.stringify({ ids: queue.records.map((r) => r.id), lastId }, null, 2)}
      </pre>
    </Stack>
  );
}

const producerRecord = {
  id: "producer",
  title: "Title",
  message: "Message",
  duration: "persistent" as const,
  dismissLabel: "Dismiss",
};

function renderToast(record: import("@forge-ui/web").ToastRecord) {
  return record.id === "producer" ? (
    <Toast record={record}>
      <ToastHeader>Title</ToastHeader>
      <ToastBody>
        <Producer />
      </ToastBody>
      <ToastFooter>Children</ToastFooter>
    </Toast>
  ) : (
    <Toast record={record} />
  );
}

export function UseToastExample() {
  return <ToastRegion label="Label" defaultRecords={[producerRecord]} renderToast={renderToast} />;
}
