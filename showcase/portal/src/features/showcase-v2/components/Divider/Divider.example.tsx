"use client";
import type { ComponentProps as ShowcaseDividerProps } from "react";
import { useExampleProperties as useDividerExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Text, Divider } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";

import { useDividerExample } from "./useDividerExample";

export function DividerExample() {
  const { properties: dividerProperties } = useDividerPropertyBindings();

  const view = useDividerExample();
  const { visible: viewVisible, setVisible: viewSetVisible } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="visible" checked={viewVisible} onChange={viewSetVisible} />
      </ExampleControls>
      <Stack gap="2">
        <Text>Children 1</Text>
        {viewVisible && <Divider {...dividerProperties} />}
        <Text>Children 2</Text>
      </Stack>
    </Stack>
  );
}

function useDividerPropertyBindings() {
  return useDividerExampleProperties<Pick<ShowcaseDividerProps<typeof Divider>, "title">>(
    "Divider",
  );
}
