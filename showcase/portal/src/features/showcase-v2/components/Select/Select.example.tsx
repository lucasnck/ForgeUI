"use client";
import { useExamplePropertySnapshot as useSelectExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseSelectProps } from "react";
import { useExampleProperties as useSelectExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Select, Option } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useSelectExample } from "./useSelectExample";

export function SelectExample() {
  const { properties: selectProperties, bindChange: bindSelectPropertyChange } =
    useSelectPropertyBindings();

  const view = useSelectExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    id: viewId,
    value: viewValue,
    change: viewChange,
    changes: viewChanges,
  } = view;
  useSelectPropertySnapshot({
    value: viewValue,
    disabled: viewDisabled,
    fullWidth: true,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={viewId}>Label</Label>
        <Select
          id={viewId}
          name="value"
          value={viewValue}
          onChange={bindSelectPropertyChange("value", viewChange)}
          disabled={viewDisabled}
          fullWidth
          {...selectProperties}
        >
          <Option value="item-1">Children 1</Option>
          <Option value="item-2">Children 2</Option>
          <Option value="item-3">Children 3</Option>
        </Select>
      </Stack>
      <ResourceState value={{ value: viewValue, onChange: viewChanges }} />
    </Stack>
  );
}

function useSelectPropertyBindings() {
  return useSelectExampleProperties<
    Pick<
      ShowcaseSelectProps<typeof Select>,
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "fullWidth"
      | "invalid"
      | "title"
      | "value"
      | "disabled"
    >
  >("Select");
}

function useSelectPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useSelectExamplePropertySnapshot("Select", values);
}
