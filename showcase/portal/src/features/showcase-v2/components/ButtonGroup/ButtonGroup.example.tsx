"use client";
import { useExamplePropertySnapshot as useButtonGroupExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseButtonGroupProps } from "react";
import { useExampleProperties as useButtonGroupExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, ButtonGroup } from "@forge-ui/web";
import { ExampleControls, SelectControl, EventFeedback } from "../ExampleControls";

import { useButtonGroupExample } from "./useButtonGroupExample";

export function ButtonGroupExample() {
  const { properties: buttonGroupProperties } = useButtonGroupPropertyBindings();

  const view = useButtonGroupExample();
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
  useButtonGroupPropertySnapshot({
    label: "Label",
    gap: viewGapValue,
    padding: viewPaddingValue,
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
      <Inline justify="end">
        <ButtonGroup
          label="Label"
          gap={viewGapValue}
          padding={viewPaddingValue}
          {...buttonGroupProperties}
        >
          <Button variant="outline" onClick={viewCancel}>
            {viewCopy.cancel}
          </Button>
          <Button onClick={viewSave}>{viewCopy.save}</Button>
        </ButtonGroup>
      </Inline>
      <EventFeedback>
        onSave: {viewSaveCount} · onCancel: {viewCancelCount}
      </EventFeedback>
    </Stack>
  );
}

function useButtonGroupPropertyBindings() {
  return useButtonGroupExampleProperties<
    Pick<
      ShowcaseButtonGroupProps<typeof ButtonGroup>,
      "gap" | "padding" | "fullWidth" | "label" | "title"
    >
  >("ButtonGroup");
}

function useButtonGroupPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useButtonGroupExamplePropertySnapshot("ButtonGroup", values);
}
