"use client";
import type { ComponentProps as ShowcaseInputAddonProps } from "react";
import { useExampleProperties as useInputAddonExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Input, InputGroup, InputAddon, Button } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useInputAddonExample } from "./useInputAddonExample";

export function InputAddonExample() {
  const { properties: inputAddonProperties } = useInputAddonPropertyBindings();

  const view = useInputAddonExample();
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

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="error" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={viewId}>Label</Label>
        <InputGroup
          leading={
            <InputAddon id={`${viewId}-addon`} {...inputAddonProperties}>
              {inputAddonProperties.children === undefined ? (
                <> Children </>
              ) : (
                <>{inputAddonProperties.children}</>
              )}
            </InputAddon>
          }
          trailing={
            <Button variant="outline" onClick={viewClear}>
              {viewCopy.clear}
            </Button>
          }
          fullWidth
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

function useInputAddonPropertyBindings() {
  return useInputAddonExampleProperties<
    Pick<ShowcaseInputAddonProps<typeof InputAddon>, "children" | "title">
  >("InputAddon");
}
