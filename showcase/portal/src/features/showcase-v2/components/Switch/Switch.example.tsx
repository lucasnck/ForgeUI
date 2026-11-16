"use client";
import { useExamplePropertySnapshot as useSwitchExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseSwitchProps } from "react";
import { useExampleProperties as useSwitchExampleProperties } from "../ExampleScope/useExampleScope";
import { Switch, Label, Inline, Stack } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useSwitchExample } from "./useSwitchExample";

export function SwitchExample() {
  const { properties: switchProperties, bindChange: bindSwitchPropertyChange } =
    useSwitchPropertyBindings();

  const view = useSwitchExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    size: viewSize,
    changeSize: viewChangeSize,
    tone: viewTone,
    changeTone: viewChangeTone,
    id: viewId,
    checked: viewChecked,
    change: viewChange,
    changes: viewChanges,
  } = view;
  useSwitchPropertySnapshot({
    checked: viewChecked,
    disabled: viewDisabled,
    size: viewSize,
    tone: viewTone,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg"]}
          onChange={viewChangeSize}
        />
        <SelectControl
          label="tone"
          value={viewTone}
          options={["brand", "success", "danger"]}
          onChange={viewChangeTone}
        />
      </ExampleControls>
      <Inline gap="2">
        <Switch
          id={viewId}
          name="option"
          value="item-1"
          checked={viewChecked}
          onChange={bindSwitchPropertyChange("checked", viewChange)}
          disabled={viewDisabled}
          size={viewSize}
          tone={viewTone}
          {...switchProperties}
        />
        <Label htmlFor={viewId}>Label</Label>
      </Inline>
      <ResourceState value={{ checked: viewChecked, onChange: viewChanges }} />
    </Stack>
  );
}

function useSwitchPropertyBindings() {
  return useSwitchExampleProperties<
    Pick<
      ShowcaseSwitchProps<typeof Switch>,
      | "size"
      | "tone"
      | "fullWidth"
      | "invalid"
      | "title"
      | "placeholder"
      | "value"
      | "checked"
      | "disabled"
      | "readOnly"
    >
  >("Switch");
}

function useSwitchPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useSwitchExamplePropertySnapshot("Switch", values);
}
