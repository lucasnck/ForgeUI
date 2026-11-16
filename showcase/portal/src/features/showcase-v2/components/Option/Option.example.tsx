"use client";
import type { ComponentProps as ShowcaseOptionProps } from "react";
import { useExampleProperties as useOptionExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Select, Option } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useOptionExample } from "./useOptionExample";

export function OptionExample() {
  const { properties: optionProperties } = useOptionPropertyBindings();

  const view = useOptionExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    id: viewId,
    value: viewValue,
    change: viewChange,
    changes: viewChanges,
  } = view;

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
          onChange={viewChange}
          disabled={viewDisabled}
          fullWidth
        >
          <Option value="item-1" {...optionProperties}>
            Children 1
          </Option>
          <Option value="item-2" {...optionProperties}>
            Children 2
          </Option>
          <Option value="item-3" {...optionProperties}>
            Children 3
          </Option>
        </Select>
      </Stack>
      <ResourceState value={{ value: viewValue, onChange: viewChanges }} />
    </Stack>
  );
}

function useOptionPropertyBindings() {
  return useOptionExampleProperties<Pick<ShowcaseOptionProps<typeof Option>, "title" | "disabled">>(
    "Option",
  );
}
