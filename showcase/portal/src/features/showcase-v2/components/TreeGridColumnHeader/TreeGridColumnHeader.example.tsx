"use client";
import {
  TreeGrid,
  TreeGridHeader,
  TreeGridBody,
  TreeGridColumnHeader,
  Stack,
  Surface,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeGridColumnHeaderExample } from "./useTreeGridColumnHeaderExample";

function TreeGridColumnHeaderScenario() {
  const view = useTreeGridColumnHeaderExample();

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
          <TreeGridHeader>
            {view.columns.map((column, index) => (
              <TreeGridColumnHeader
                key={column.key}
                columnKey={column.key}
                label={(view.properties.label ?? "Label") + " " + (index + 1)}
              />
            ))}
          </TreeGridHeader>
          <TreeGridBody title="Title" />
        </TreeGrid>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeGridColumnHeaderExample() {
  return <TreeGridColumnHeaderScenario />;
}
