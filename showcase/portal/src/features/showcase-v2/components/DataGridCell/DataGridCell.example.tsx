"use client";
import {
  Stack,
  DataGrid,
  DataGridHeader,
  DataGridBody,
  DataGridRow,
  DataGridCell,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { getRowKey } from "../DataGrid/data-grid.fixtures";
import { useDataGridCellExample } from "./useDataGridCellExample";

export function DataGridCellExample() {
  const view = useDataGridCellExample();

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
        <DataGridBody>
          {view.rows.map((row) => (
            <DataGridRow key={row.id} rowKey={row.id}>
              <DataGridCell
                {...view.properties}
                rowKey={row.id}
                columnKey="title"
                rowHeader={view.properties.rowHeader ?? true}
                title={(view.properties.title ?? "Title") + " " + view.index(row)}
              >
                {(view.properties.children ?? "Children") + " " + view.index(row)}
              </DataGridCell>
              <DataGridCell rowKey={row.id} columnKey="description">
                {row.description}
              </DataGridCell>
            </DataGridRow>
          ))}
        </DataGridBody>
      </DataGrid>
      <ExampleState value={view.state} />
    </Stack>
  );
}
