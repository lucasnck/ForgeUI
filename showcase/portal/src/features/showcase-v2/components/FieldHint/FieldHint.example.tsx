"use client";
import type { ComponentProps as ShowcaseFieldHintProps } from "react";
import { useExampleProperties as useFieldHintExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Input, FieldHint } from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";


import { useFieldHintExample } from "./useFieldHintExample";


export function FieldHintExample() {
  const { properties: fieldHintProperties } = useFieldHintPropertyBindings();


  const view = useFieldHintExample();
  const { children: viewChildren, setChildren: viewSetChildren, id: viewId } = view;


  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={viewId}>Label</Label>
        <Input id={viewId} placeholder="Placeholder" aria-describedby={`${viewId}-description`} />
        <FieldHint id={`${viewId}-description`} {...fieldHintProperties}>
          {fieldHintProperties.children === undefined ? (
            <> {viewChildren} </>
          ) : (
            <>{fieldHintProperties.children}</>
          )}
        </FieldHint>
      </Stack>
    </Stack>
  );
}


function useFieldHintPropertyBindings() {
  return useFieldHintExampleProperties<
    Pick<
      ShowcaseFieldHintProps<typeof FieldHint>,
      "children" | "size" | "tone" | "weight" | "title"
    >
  >("FieldHint");
}