"use client";
import {
  Stack,
  DataGrid,
  DataGridHeader,
  DataGridBody,
  DataGridFooter,
  Text,
  Pagination,
  PaginationItem,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { getRowKey, records } from "../DataGrid/data-grid.fixtures";
import { useDataGridFooterExample } from "./useDataGridFooterExample";

export function DataGridFooterExample() {
  const view = useDataGridFooterExample();

  return (
    <Stack gap="4">
      <DataGrid label="Label" rows={view.rows} columns={view.columns} getRowKey={getRowKey}>
        <DataGridHeader />
        <DataGridBody />
        <DataGridFooter title="Title" {...view.properties}>
          <Text>
            {view.rows.length} / {records.length}
          </Text>
          <Pagination
            label="Label"
            page={view.page}
            pageCount={view.pageCount}
            onPageChange={view.changePage}
          >
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page} page={page} label={"Label " + page}>
                {"Children " + page}
              </PaginationItem>
            ))}
          </Pagination>
        </DataGridFooter>
      </DataGrid>
      <ExampleState value={view.state} />
    </Stack>
  );
}
