"use client";
import { useExamplePropertySnapshot as useInlineExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseInlineProps } from "react";
import { useExampleProperties as useInlineExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button } from "@forge-ui/web";
import { ExampleControls, SelectControl, EventFeedback } from "../ExampleControls";

import { useInlineExample } from "./useInlineExample";

export function InlineExample() {
  const { properties: inlineProperties } = useInlinePropertyBindings();

  const view = useInlineExample();
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
  useInlinePropertySnapshot({
    gap: viewGapValue,
    padding: viewPaddingValue,
    justify: "end",
  });
  return (
    <Stack gap="2">
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
      <Inline gap={viewGapValue} padding={viewPaddingValue} justify="end" {...inlineProperties}>
        <Button variant="outline" onClick={viewCancel}>
          {viewCopy.cancel}
        </Button>
        <Button onClick={viewSave}>{viewCopy.save}</Button>
      </Inline>
      <EventFeedback>
        onSave: {viewSaveCount} · onCancel: {viewCancelCount}
      </EventFeedback>
    </Stack>
  );
}

function useInlinePropertyBindings() {
  return useInlineExampleProperties<
    Pick<
      ShowcaseInlineProps<typeof Inline>,
      "gap" | "padding" | "align" | "justify" | "wrap" | "title"
    >
  >("Inline");
}

function useInlinePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useInlineExamplePropertySnapshot("Inline", values);
}
