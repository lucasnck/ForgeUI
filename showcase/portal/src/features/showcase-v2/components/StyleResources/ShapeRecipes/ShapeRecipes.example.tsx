"use client";
import { Stack, Inline, Button, Input, Label } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useShapeRecipesExample } from "./useShapeRecipesExample";

export function ShapeRecipesExample() {
  const view = useShapeRecipesExample();
  const { shape: viewShape, change: viewChange, id: viewId } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="shape"
          value={viewShape ?? "inherit"}
          options={["inherit", "square", "rounded", "pill"]}
          onChange={viewChange}
        />
      </ExampleControls>
      <Inline gap="2">
        <Button shape={viewShape}>Children</Button>
        <Button variant="outline">Children</Button>
      </Inline>
      <Label htmlFor={viewId}>Label</Label>
      <Input id={viewId} shape={viewShape} placeholder="Placeholder" />
      <ResourceState value={{ shape: viewShape ?? "document shape" }} />
    </Stack>
  );
}
