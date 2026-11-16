"use client";
import { useExamplePropertySnapshot as useProgressExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseProgressProps } from "react";
import { useExampleProperties as useProgressExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Progress } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useProgressExample } from "./useProgressExample";

export function ProgressExample() {
  const { properties: progressProperties } = useProgressPropertyBindings();

  const view = useProgressExample();
  const {
    value: viewValue,
    changeValue: viewChangeValue,
    indeterminate: viewIndeterminate,
    setIndeterminate: viewSetIndeterminate,
  } = view;
  useProgressPropertySnapshot({
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
          options={["0", "25", "40", "75", "100"]}
          onChange={viewChangeValue}
        />
        <ToggleControl
          label="indeterminate"
          checked={viewIndeterminate}
          onChange={viewSetIndeterminate}
        />
      </ExampleControls>
      <Progress
        label="Label"
        value={viewIndeterminate ? undefined : viewValue}
        max={100}
        fullWidth
        {...progressProperties}
      />
      <ResourceState value={{ value: viewIndeterminate ? null : viewValue, max: 100 }} />
    </Stack>
  );
}

function useProgressPropertyBindings() {
  return useProgressExampleProperties<
    Pick<
      ShowcaseProgressProps<typeof Progress>,
      "value" | "max" | "label" | "size" | "tone" | "fullWidth" | "animated" | "title"
    >
  >("Progress");
}

function useProgressPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useProgressExamplePropertySnapshot("Progress", values);
}
