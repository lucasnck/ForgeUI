"use client";
import type { ComponentProps as ShowcaseCollapseBodyProps } from "react";
import { useExampleProperties as useCollapseBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Collapse, CollapseHeader, CollapseBody, Text, Surface } from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";

import { useCollapseBodyExample } from "./useCollapseBodyExample";

export function CollapseBodyExample() {
  const { properties: collapseBodyProperties } = useCollapseBodyPropertyBindings();

  const { open, animated, setAnimated, change, calls, requested, children, setChildren } =
    useCollapseBodyExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
        <TextControl label="children" value={children} onChange={setChildren} />
      </ExampleControls>
      <Surface padding="2" shape="rounded">
        <Collapse open={open} onOpenChange={change} animated={animated}>
          <CollapseHeader hidden>Children</CollapseHeader>
          <CollapseBody {...collapseBodyProperties}>
            <Surface elevation="flat" padding="4">
              <Text>{children}</Text>
            </Surface>
          </CollapseBody>
        </Collapse>
      </Surface>
      <ResourceState value={{ open, calls, requested }} />
    </Stack>
  );
}

function useCollapseBodyPropertyBindings() {
  return useCollapseBodyExampleProperties<
    Pick<ShowcaseCollapseBodyProps<typeof CollapseBody>, "title">
  >("CollapseBody");
}
