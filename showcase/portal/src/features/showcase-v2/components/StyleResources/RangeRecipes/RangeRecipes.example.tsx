"use client";
import { Stack, Slider, ProgressBar, Meter, Label } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useRangeRecipesExample } from "./useRangeRecipesExample";

export function RangeRecipesExample() {
  const view = useRangeRecipesExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    id: viewId,
    value: viewValue,
    change: viewChange,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <Label htmlFor={`${viewId}-1`}>Label 1</Label>
      <Slider
        id={`${viewId}-1`}
        min={0}
        max={100}
        value={viewValue}
        onChange={viewChange}
        disabled={viewDisabled}
        fullWidth
      />
      <Label htmlFor={`${viewId}-2`}>Label 2</Label>
      <ProgressBar label="Label 2" id={`${viewId}-2`} value={viewValue} max={100} />
      <Label htmlFor={`${viewId}-3`}>Label 3</Label>
      <Meter
        label="Label 3"
        id={`${viewId}-3`}
        value={viewValue}
        min={0}
        max={100}
        low={30}
        high={70}
        optimum={50}
      />
      <ResourceState value={{ value: viewValue, max: 100, low: 30, high: 70, optimum: 50 }} />
    </Stack>
  );
}
