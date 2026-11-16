"use client";
import { TreeGrid, TreeGridHeader, TreeGridBody, Stack, Surface } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeGridBodyExample } from "./useTreeGridBodyExample";

function TreeGridBodyScenario() {
  const view = useTreeGridBodyExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <TreeGrid
          label="Label"
          title="Title"
          nodes={view.nodes}
          columns={view.columns}
          getNodeLabel={view.getNodeLabel}
          expandedValue={view.expanded}
          onExpandedValueChange={view.expand}
        >
          <TreeGridHeader title="Title" />
          <TreeGridBody title="Title" {...view.properties} />
        </TreeGrid>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeGridBodyExample() {
  return <TreeGridBodyScenario />;
}
