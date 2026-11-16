"use client";
import type { ComponentProps as ShowcaseLegendProps } from "react";
import { useExampleProperties as useLegendExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Label, Input, Legend } from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";

import { useLegendExample } from "./useLegendExample";

export function LegendExample() {
  const { properties: legendProperties } = useLegendPropertyBindings();

  const view = useLegendExample();
  const { children: viewChildren, setChildren: viewSetChildren, id: viewId } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
      </ExampleControls>
      <fieldset>
        <Legend {...legendProperties}>
          {legendProperties.children === undefined ? (
            <> {viewChildren} </>
          ) : (
            <>{legendProperties.children}</>
          )}
        </Legend>
        <Stack gap="1">
          <Label htmlFor={viewId}>Label</Label>
          <Input id={viewId} placeholder="Placeholder" />
        </Stack>
      </fieldset>
    </Stack>
  );
}

function useLegendPropertyBindings() {
  return useLegendExampleProperties<Pick<ShowcaseLegendProps<typeof Legend>, "children" | "title">>(
    "Legend",
  );
}
