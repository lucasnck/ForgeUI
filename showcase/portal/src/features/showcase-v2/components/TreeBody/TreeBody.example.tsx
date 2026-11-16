"use client";
import { Tree, TreeBody, Stack, Surface } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeBodyExample } from "./useTreeBodyExample";

function TreeBodyScenario() {
  const view = useTreeBodyExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Tree
          label="Label"
          title="Title"
          nodes={view.nodes}
          value={view.value}
          onValueChange={view.select}
          expandedValue={view.expanded}
          onExpandedValueChange={view.expand}
        >
          <TreeBody title="Title" {...view.properties} />
        </Tree>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeBodyExample() {
  return <TreeBodyScenario />;
}
