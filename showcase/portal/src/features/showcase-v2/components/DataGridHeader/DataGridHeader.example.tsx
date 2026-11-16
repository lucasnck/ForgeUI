"use client";
import { Stack, DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { getRowKey } from "../DataGrid/data-grid.fixtures";
import { useDataGridHeaderExample } from "./useDataGridHeaderExample";

export function DataGridHeaderExample() {
  const view = useDataGridHeaderExample();

  return (
    <Stack gap="4">
      <DataGrid
        label="Label"
        rows={[]}
        columns={view.columns}
        getRowKey={getRowKey}
        sort={view.sort}
        onSortChange={view.changeSort}
      >
        <DataGridHeader title="Title" {...view.properties} />
        <DataGridBody hidden />
      </DataGrid>
      <ExampleState value={view.state} />
    </Stack>
  );
}
