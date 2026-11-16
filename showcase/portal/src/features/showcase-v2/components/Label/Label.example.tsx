"use client";
import { useExamplePropertySnapshot as useLabelExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseLabelProps } from "react";
import { useExampleProperties as useLabelExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Input } from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";

import { useLabelExample } from "./useLabelExample";

export function LabelExample() {
  const { properties: labelProperties } = useLabelPropertyBindings();

  const view = useLabelExample();
  const { children: viewChildren, setChildren: viewSetChildren, id: viewId } = view;
  useLabelPropertySnapshot({ htmlFor: viewId });
  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={viewId} {...labelProperties}>
          {labelProperties.children === undefined ? (
            <> {viewChildren} </>
          ) : (
            <>{labelProperties.children}</>
          )}
        </Label>
        <Input id={viewId} placeholder="Placeholder" />
      </Stack>
    </Stack>
  );
}

function useLabelPropertyBindings() {
  return useLabelExampleProperties<
    Pick<
      ShowcaseLabelProps<typeof Label>,
      "children" | "size" | "tone" | "weight" | "htmlFor" | "required" | "title"
    >
  >("Label");
}

function useLabelPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useLabelExamplePropertySnapshot("Label", values);
}
