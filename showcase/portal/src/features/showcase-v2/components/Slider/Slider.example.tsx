"use client";
import { useExamplePropertySnapshot as useSliderExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseSliderProps } from "react";
import { useExampleProperties as useSliderExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Slider } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useSliderExample } from "./useSliderExample";

export function SliderExample() {
  const { properties: sliderProperties, bindChange: bindSliderPropertyChange } =
    useSliderPropertyBindings();

  const view = useSliderExample();
  const {
    value: viewValue,
    changeValue: viewChangeValue,
    id: viewId,
    change: viewChange,
    indeterminate: viewIndeterminate,
  } = view;
  useSliderPropertySnapshot({ value: viewValue, fullWidth: true });
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
      <Stack gap="1">
        <Label htmlFor={viewId}>Label</Label>
        <Slider
          id={viewId}
          value={viewValue}
          min={0}
          max={100}
          step={1}
          onChange={bindSliderPropertyChange("value", viewChange)}
          fullWidth
          {...sliderProperties}
        />
      </Stack>
      <ResourceState value={{ value: viewIndeterminate ? null : viewValue, max: 100 }} />
    </Stack>
  );
}

function useSliderPropertyBindings() {
  return useSliderExampleProperties<
    Pick<
      ShowcaseSliderProps<typeof Slider>,
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "fullWidth"
      | "invalid"
      | "valueText"
      | "title"
      | "placeholder"
      | "value"
      | "checked"
      | "disabled"
    >
  >("Slider");
}

function useSliderPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useSliderExamplePropertySnapshot("Slider", values);
}
