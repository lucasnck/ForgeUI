"use client";
import { Stack, DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { getRowKey } from "../DataGrid/data-grid.fixtures";
import { useDataGridColumnHeaderExample } from "./useDataGridColumnHeaderExample";

export function DataGridColumnHeaderExample() {
  const view = useDataGridColumnHeaderExample();

  return (
    <Stack gap="4">
      <DataGrid
        label="Label"
        rows={view.rows}
        columns={view.columns}
        getRowKey={getRowKey}
        sort={view.sort}
        onSortChange={view.changeSort}
      >
        <DataGridHeader />
        <DataGridBody />
      </DataGrid>
      <ExampleState value={view.state} />
    </Stack>
  );
}
