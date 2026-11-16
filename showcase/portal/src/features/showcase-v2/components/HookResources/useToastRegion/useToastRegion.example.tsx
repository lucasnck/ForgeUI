"use client";
import { useLayoutEffect, useRef } from "react";
import type { ToastRecord, ToastRegionContract } from "@forge-ui/web";
import { Button, Inline, Stack, Text, VisuallyHidden } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../../ExampleControls";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useToastRegionResourceExample } from "./useToastRegionResourceExample";

export function UseToastRegionExample() {
  const {
    queue,
    fallbackRef,
    accept,
    setAccept,
    request,
    duration,
    changeDuration,
    urgency,
    changeUrgency,
    paused,
    togglePause,
    add,
    dismiss,
    update,
    copy,
  } = useToastRegionResourceExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="duration"
          value={duration}
          options={["persistent", "short", "long"]}
          onChange={changeDuration}
        />
        <SelectControl
          label="urgency"
          value={urgency}
          options={["normal", "urgent"]}
          onChange={changeUrgency}
        />
        <ToggleControl label="acceptChanges" checked={accept} onChange={setAccept} />
        <ToggleControl label="pause(hover)" checked={paused} onChange={togglePause} />
      </ExampleControls>
      <Inline gap="2">
        <Button ref={fallbackRef} onClick={add}>
          {copy.add}
        </Button>
        <Button variant="outline" onClick={dismiss} disabled={!queue.records.length}>
          {copy.dismiss} 1
        </Button>
        <Button variant="outline" onClick={update} disabled={!queue.records.length}>
          {copy.update} Message 1
        </Button>
      </Inline>
      <ol className={styles.items} aria-live="off">
        {queue.records.map((record) => (
          <QueueRecord key={record.id} record={record} queue={queue} />
        ))}
      </ol>
      <pre className={styles.state}>
        {JSON.stringify({ records: queue.records, request, paused }, null, 2)}
      </pre>
      <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
        <span key={queue.announcement?.sequence}>
          {queue.announcement?.messages
            .filter((m) => m.urgency === "normal")
            .map((m) => m.text)
            .join(" ")}
        </span>
      </VisuallyHidden>
      <VisuallyHidden role="alert" aria-live="assertive" aria-atomic="true">
        <span key={queue.announcement?.sequence}>
          {queue.announcement?.messages
            .filter((m) => m.urgency === "urgent")
            .map((m) => m.text)
            .join(" ")}
        </span>
      </VisuallyHidden>
    </Stack>
  );
}

function useQueueRecord(record: ToastRecord, queue: ToastRegionContract) {
  const rootRef = useRef<HTMLLIElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const { registerRecord } = queue;
  useLayoutEffect(() => registerRecord(record.id, rootRef, actionRef), [registerRecord, record.id]);

  function dismiss() {
    queue.dismiss(record.id);
  }

  return { rootRef, actionRef, dismiss };
}

function QueueRecord({ record, queue }: { record: ToastRecord; queue: ToastRegionContract }) {
  const { rootRef, actionRef, dismiss } = useQueueRecord(record, queue);

  return (
    <li ref={rootRef} className={styles.panel}>
      <Stack gap="2">
        <Text>{record.title}</Text>
        <Text>{record.message}</Text>
        <Inline justify="end">
          <Button ref={actionRef} variant="outline" onClick={dismiss}>
            {record.dismissLabel}
          </Button>
        </Inline>
      </Stack>
    </li>
  );
}
