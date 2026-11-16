"use client";
import { useExamplePropertySnapshot as useFieldErrorExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseFieldErrorProps } from "react";
import { useExampleProperties as useFieldErrorExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Input, FieldError } from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";


import { useFieldErrorExample } from "./useFieldErrorExample";


export function FieldErrorExample() {
  const { properties: fieldErrorProperties } = useFieldErrorPropertyBindings();


  const view = useFieldErrorExample();
  const { children: viewChildren, setChildren: viewSetChildren, id: viewId } = view;
  useFieldErrorPropertySnapshot({ announce: false });
  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={viewId}>Label</Label>
        <Input
          id={viewId}
          placeholder="Placeholder"
          aria-describedby={`${viewId}-description`}
          invalid
        />
        <FieldError id={`${viewId}-description`} announce={false} {...fieldErrorProperties}>
          {fieldErrorProperties.children === undefined ? (
            <>{viewChildren}</>
          ) : (
            <>{fieldErrorProperties.children}</>
          )}
        </FieldError>
      </Stack>
    </Stack>
  );
}


function useFieldErrorPropertyBindings() {
  return useFieldErrorExampleProperties<
    Pick<
      ShowcaseFieldErrorProps<typeof FieldError>,
      "children" | "size" | "tone" | "weight" | "announce" | "title"
    >
  >("FieldError");
}


function useFieldErrorPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useFieldErrorExamplePropertySnapshot("FieldError", values);
}