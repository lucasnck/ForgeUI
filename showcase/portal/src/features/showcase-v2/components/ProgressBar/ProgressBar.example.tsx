"use client";
import { useExamplePropertySnapshot as useProgressBarExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseProgressBarProps } from "react";
import { useExampleProperties as useProgressBarExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, ProgressBar } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useProgressBarExample } from "./useProgressBarExample";

import { measurementValues } from "./fixtures";

export function ProgressBarExample() {
  const { properties: progressBarProperties } = useProgressBarPropertyBindings();

  const view = useProgressBarExample();
  const {
    value: viewValue,
    changeValue: viewChangeValue,
    indeterminate: viewIndeterminate,
    setIndeterminate: viewSetIndeterminate,
  } = view;
  useProgressBarPropertySnapshot({
    label: "Label",
    value: viewIndeterminate ? undefined : viewValue,
    max: 100,
    fullWidth: true,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="value"
          value={String(viewValue)}
          options={measurementValues}
          onChange={viewChangeValue}
        />
        <ToggleControl
          label="indeterminate"
          checked={viewIndeterminate}
          onChange={viewSetIndeterminate}
        />
      </ExampleControls>
      <ProgressBar
        label="Label"
        value={viewIndeterminate ? undefined : viewValue}
        max={100}
        fullWidth
        {...progressBarProperties}
      />
      <ResourceState value={{ value: viewIndeterminate ? null : viewValue, max: 100 }} />
    </Stack>
  );
}

function useProgressBarPropertyBindings() {
  return useProgressBarExampleProperties<
    Pick<
      ShowcaseProgressBarProps<typeof ProgressBar>,
      "value" | "max" | "label" | "size" | "tone" | "fullWidth" | "animated" | "valueText" | "title"
    >
  >("ProgressBar");
}

function useProgressBarPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useProgressBarExamplePropertySnapshot("ProgressBar", values);
}
