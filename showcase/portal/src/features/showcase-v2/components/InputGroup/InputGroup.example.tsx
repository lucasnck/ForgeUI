"use client";
import { useExamplePropertySnapshot as useInputGroupExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseInputGroupProps } from "react";
import { useExampleProperties as useInputGroupExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Input, InputGroup, InputAddon, Button } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useInputGroupExample } from "./useInputGroupExample";

export function InputGroupExample() {
  const { properties: inputGroupProperties } = useInputGroupPropertyBindings();

  const view = useInputGroupExample();
  const {
    invalid: viewInvalid,
    setInvalid: viewSetInvalid,
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    id: viewId,
    clear: viewClear,
    copy: viewCopy,
    value: viewValue,
    change: viewChange,
    changes: viewChanges,
  } = view;
  useInputGroupPropertySnapshot({ fullWidth: true });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="error" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={viewId}>Label</Label>
        <InputGroup
          leading={<InputAddon id={`${viewId}-addon`}>Children</InputAddon>}
          trailing={
            <Button variant="outline" onClick={viewClear}>
              {viewCopy.clear}
            </Button>
          }
          fullWidth
          {...inputGroupProperties}
        >
          <Input
            id={viewId}
            aria-describedby={`${viewId}-addon`}
            placeholder="Placeholder"
            value={viewValue}
            onChange={viewChange}
            disabled={viewDisabled}
            invalid={viewInvalid}
            fullWidth
          />
        </InputGroup>
      </Stack>
      <ResourceState value={{ value: viewValue, onChange: viewChanges }} />
    </Stack>
  );
}

function useInputGroupPropertyBindings() {
  return useInputGroupExampleProperties<
    Pick<
      ShowcaseInputGroupProps<typeof InputGroup>,
      "gap" | "padding" | "align" | "fullWidth" | "title"
    >
  >("InputGroup");
}

function useInputGroupPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useInputGroupExamplePropertySnapshot("InputGroup", values);
}
