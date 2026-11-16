"use client";
import { Stack, Heading, Text, Label, Input } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useTypographyRecipesExample } from "./useTypographyRecipesExample";

export function TypographyRecipesExample() {
  const view = useTypographyRecipesExample();
  const {
    size: viewSize,
    changeSize: viewChangeSize,
    weight: viewWeight,
    changeWeight: viewChangeWeight,
    id: viewId,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg", "2xl"]}
          onChange={viewChangeSize}
        />
        <SelectControl
          label="weight"
          value={viewWeight}
          options={["regular", "medium", "semibold", "bold"]}
          onChange={viewChangeWeight}
        />
      </ExampleControls>
      <Heading level={3} size={viewSize} weight={viewWeight}>
        Children
      </Heading>
      <Text size={viewSize} weight={viewWeight}>
        Children 1 · Children 2 · Children 3 · Children 4 · Children 5 · Children 6 · Children 7 ·
        Children 8
      </Text>
      <Label htmlFor={viewId} size={viewSize}>
        Label
      </Label>
      <Input id={viewId} placeholder="Placeholder" />
      <ResourceState value={{ semanticLevel: 3, size: viewSize, weight: viewWeight }} />
    </Stack>
  );
}
