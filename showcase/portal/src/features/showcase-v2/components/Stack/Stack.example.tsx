"use client";
import { useExamplePropertySnapshot as useStackExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseStackProps } from "react";
import { useExampleProperties as useStackExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, Heading, Text } from "@forge-ui/web";
import { ExampleControls, SelectControl, EventFeedback } from "../ExampleControls";

import { useStackExample } from "./useStackExample";

export function StackExample() {
  const { properties: stackProperties } = useStackPropertyBindings();

  const view = useStackExample();
  const {
    gap: viewGap,
    setGap: viewSetGap,
    padding: viewPadding,
    setPadding: viewSetPadding,
    gapValue: viewGapValue,
    paddingValue: viewPaddingValue,
    cancel: viewCancel,
    copy: viewCopy,
    save: viewSave,
    saveCount: viewSaveCount,
    cancelCount: viewCancelCount,
  } = view;
  useStackPropertySnapshot({ gap: "2", padding: viewPaddingValue });
  return (
    <Stack gap="2" {...stackProperties}>
      <ExampleControls>
        <SelectControl
          label="gap"
          value={viewGap}
          options={["1", "2", "4", "8"]}
          onChange={viewSetGap}
        />
        <SelectControl
          label="padding"
          value={viewPadding}
          options={["0", "2", "4"]}
          onChange={viewSetPadding}
        />
      </ExampleControls>
      <Stack gap={viewGapValue} padding={viewPaddingValue} {...stackProperties}>
        <Heading level={3}>Children</Heading>
        <Text>Children</Text>
        <Inline justify="end" gap="2">
          <Button variant="outline" onClick={viewCancel}>
            {viewCopy.cancel}
          </Button>
          <Button onClick={viewSave}>{viewCopy.save}</Button>
        </Inline>
      </Stack>
      <EventFeedback>
        onSave: {viewSaveCount} · onCancel: {viewCancelCount}
      </EventFeedback>
    </Stack>
  );
}

function useStackPropertyBindings() {
  return useStackExampleProperties<
    Pick<ShowcaseStackProps<typeof Stack>, "gap" | "padding" | "align" | "title">
  >("Stack");
}

function useStackPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useStackExamplePropertySnapshot("Stack", values);
}
