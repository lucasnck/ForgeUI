"use client";
import { useExamplePropertySnapshot as useMeterExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseMeterProps } from "react";
import { useExampleProperties as useMeterExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Meter } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useMeterExample } from "./useMeterExample";

export function MeterExample() {
  const { properties: meterProperties } = useMeterPropertyBindings();

  const view = useMeterExample();
  const { value: viewValue, changeValue: viewChangeValue, indeterminate: viewIndeterminate } = view;
  useMeterPropertySnapshot({
    label: "Label",
    value: viewValue,
    min: 0,
    max: 100,
    low: 25,
    high: 75,
    optimum: 50,
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
      </ExampleControls>
      <Meter
        label="Label"
        value={viewValue}
        min={0}
        max={100}
        low={25}
        high={75}
        optimum={50}
        fullWidth
        {...meterProperties}
      />
      <ResourceState value={{ value: viewIndeterminate ? null : viewValue, max: 100 }} />
    </Stack>
  );
}

function useMeterPropertyBindings() {
  return useMeterExampleProperties<
    Pick<
      ShowcaseMeterProps<typeof Meter>,
      | "value"
      | "min"
      | "max"
      | "low"
      | "high"
      | "optimum"
      | "label"
      | "size"
      | "tone"
      | "fullWidth"
      | "animated"
      | "title"
    >
  >("Meter");
}

function useMeterPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useMeterExamplePropertySnapshot("Meter", values);
}
