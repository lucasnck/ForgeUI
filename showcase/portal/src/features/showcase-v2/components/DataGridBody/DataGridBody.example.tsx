"use client";
import { Stack, DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { getRowKey } from "../DataGrid/data-grid.fixtures";
import { useDataGridBodyExample } from "./useDataGridBodyExample";

export function DataGridBodyExample() {
  const view = useDataGridBodyExample();

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
        <DataGridBody title="Title" {...view.properties} />
      </DataGrid>
      <ExampleState value={view.state} />
    </Stack>
  );
}
