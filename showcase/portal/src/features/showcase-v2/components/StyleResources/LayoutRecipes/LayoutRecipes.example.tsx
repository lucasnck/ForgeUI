"use client";
import { Stack, Heading, Text, Surface, Inline, Button } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import layoutStyles from "../../../../../../../../web/library/src/design-system/styles/layout-components.module.css";

import { useLayoutRecipesExample } from "./useLayoutRecipesExample";

export function LayoutRecipesExample() {
  const view = useLayoutRecipesExample();
  const {
    layout: viewLayout,
    setLayout: viewSetLayout,
    gap: viewGap,
    setGap: viewSetGap,
    padding: viewPadding,
    setPadding: viewSetPadding,
    action: viewAction,
    copy: viewCopy,
    count: viewCount,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="class"
          value={viewLayout}
          options={["grid", "stack", "inline"]}
          onChange={viewSetLayout}
        />
        <SelectControl
          label="data-gap"
          value={viewGap}
          options={["1", "2", "4", "8"]}
          onChange={viewSetGap}
        />
        <SelectControl
          label="data-padding"
          value={viewPadding}
          options={["0", "2", "4"]}
          onChange={viewSetPadding}
        />
      </ExampleControls>
      <div className={layoutStyles.container} data-size="narrow">
        <Heading level={3}>Children</Heading>
        <div
          className={layoutStyles[viewLayout]}
          data-gap={viewGap}
          data-padding={viewPadding}
          data-columns="1"
          data-columns-mobile="2"
          data-columns-wide="3"
        >
          {[1, 2, 3].map((index) => (
            <Surface key={index} padding="2">
              <Text>Children {index}</Text>
            </Surface>
          ))}
        </div>
        <Inline gap="2" justify="end">
          <Button variant="outline" onClick={viewAction}>
            {viewCopy.cancel}
          </Button>
          <Button onClick={viewAction}>{viewCopy.save}</Button>
        </Inline>
      </div>
      <ResourceState value={{ gap: viewGap, padding: viewPadding, count: viewCount }} />
    </Stack>
  );
}
