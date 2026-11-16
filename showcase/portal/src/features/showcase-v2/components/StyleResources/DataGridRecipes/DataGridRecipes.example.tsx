"use client";
import { DataGrid, DataGridHeader, DataGridBody, Stack } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useDataGridRecipesExample } from "./useDataGridRecipesExample";

export function DataGridRecipesExample() {
  const view = useDataGridRecipesExample();
  const {
    size: viewSize,
    changeSize: viewChangeSize,
    lines: viewLines,
    setLines: viewSetLines,
    alternating: viewAlternating,
    setAlternating: viewSetAlternating,
    rows: viewRows,
    columns: viewColumns,
    getRowKey: viewGetRowKey,
    sort: viewSort,
    setSort: viewSetSort,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg"]}
          onChange={viewChangeSize}
        />
        <ToggleControl label="showRowLines" checked={viewLines} onChange={viewSetLines} />
        <ToggleControl
          label="rowAlternationEnabled"
          checked={viewAlternating}
          onChange={viewSetAlternating}
        />
      </ExampleControls>
      <DataGrid
        label="Label"
        rows={viewRows}
        columns={viewColumns}
        getRowKey={viewGetRowKey}
        size={viewSize}
        showRowLines={viewLines}
        rowAlternationEnabled={viewAlternating}
        sort={viewSort}
        onSortChange={viewSetSort}
        fullWidth
      >
        <DataGridHeader />
        <DataGridBody />
      </DataGrid>
      <ResourceState value={{ sort: viewSort, size: viewSize }} />
    </Stack>
  );
}
