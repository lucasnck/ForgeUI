"use client";
import {
  TreeGrid,
  TreeGridHeader,
  TreeGridBody,
  TreeGridRow,
  TreeGridCell,
  Stack,
  Surface,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeGridCellExample } from "./useTreeGridCellExample";

function TreeGridCellScenario() {
  const view = useTreeGridCellExample();

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
          <TreeGridBody>
            {view.visibleRows.map((row) => (
              <TreeGridRow key={row.id} rowKey={row.id}>
                {view.columns.map((column) => (
                  <TreeGridCell
                    key={column.key}
                    rowKey={row.id}
                    columnKey={column.key}
                    title={(view.properties.title ?? "Title") + " " + row.index}
                  >
                    {column.getCellText(row)}
                  </TreeGridCell>
                ))}
              </TreeGridRow>
            ))}
          </TreeGridBody>
        </TreeGrid>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeGridCellExample() {
  return <TreeGridCellScenario />;
}
