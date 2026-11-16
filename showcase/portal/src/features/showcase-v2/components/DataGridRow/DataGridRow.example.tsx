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
import { useDataGridRowExample } from "./useDataGridRowExample";

export function DataGridRowExample() {
  const view = useDataGridRowExample();

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
            <DataGridRow
              key={row.id}
              rowKey={row.id}
              {...view.properties}
              title={(view.properties.title ?? "Title") + " " + row.index}
            >
              <DataGridCell rowKey={row.id} columnKey="title" rowHeader>
                {row.title}
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
