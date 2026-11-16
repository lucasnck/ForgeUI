"use client";
import { Icon, Inline, Text, Stack } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useIconRecipesExample } from "./useIconRecipesExample";

export function IconRecipesExample() {
  const view = useIconRecipesExample();
  const { size: viewSize, changeSize: viewChangeSize } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="size"
          value={viewSize}
          options={["xs", "sm", "md", "lg", "xl", "inherit"]}
          onChange={viewChangeSize}
        />
      </ExampleControls>
      <Icon name="search" size={viewSize} label="Label" />
      <Inline gap="2">
        <Icon name="search" size={viewSize} />
        <Text size="xl">Children</Text>
      </Inline>
      <ResourceState
        value={{
          size: viewSize,
          standalone: "role=img",
          inline: "aria-hidden=true",
        }}
      />
    </Stack>
  );
}
