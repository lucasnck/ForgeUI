"use client";
import { TreeGrid, TreeGridHeader, TreeGridBody, Stack, Surface } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeGridHeaderExample } from "./useTreeGridHeaderExample";

function TreeGridHeaderScenario() {
  const view = useTreeGridHeaderExample();

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
          <TreeGridHeader title="Title" {...view.properties} />
          <TreeGridBody title="Title" />
        </TreeGrid>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeGridHeaderExample() {
  return <TreeGridHeaderScenario />;
}
