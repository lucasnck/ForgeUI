"use client";
import { useExamplePropertySnapshot as useDataGridExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseDataGridProps } from "react";
import { useExampleProperties as useDataGridExampleProperties } from "../ExampleScope/useExampleScope";
import {
  DataGrid,
  DataGridHeader,
  DataGridBody,
  DataGridFooter,
  SearchInput,
  Pagination,
  PaginationItem,
  Text,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl, EventFeedback } from "../ExampleControls";
import { useDataGridExample } from "./useDataGridExample";
import { getRowKey } from "./data-grid.fixtures";

function DataGridScenario({ paginated = false }: { paginated?: boolean }) {
  const { properties: dataGridProperties } = useDataGridPropertyBindings();

  const view = useDataGridExample(paginated);
  useDataGridPropertySnapshot({
    label: "Label",
    size: view.size,
    showBorders: view.showBorders,
    showColumnLines: view.showColumnLines,
    showRowLines: view.showRowLines,
    rowAlternationEnabled: view.rowAlternationEnabled,
  });
  return (
    <>
      <ExampleControls>
        <SelectControl
          label="size"
          value={view.size}
          options={["xs", "sm", "md", "lg", "xl"]}
          onChange={view.changeSize}
        />
        <ToggleControl
          label="showBorders"
          checked={view.showBorders}
          onChange={view.setShowBorders}
        />
        <ToggleControl
          label="showColumnLines"
          checked={view.showColumnLines}
          onChange={view.setShowColumnLines}
        />
        <ToggleControl
          label="showRowLines"
          checked={view.showRowLines}
          onChange={view.setShowRowLines}
        />
        <ToggleControl
          label="rowAlternationEnabled"
          checked={view.rowAlternationEnabled}
          onChange={view.setRowAlternationEnabled}
        />
      </ExampleControls>
      {paginated && (
        <SearchInput
          aria-label={view.messages.search}
          placeholder="Placeholder"
          value={view.query}
          onChange={view.onSearchChange}
          clearLabel={view.messages.clear}
        />
      )}
      <DataGrid
        label="Label"
        rows={view.rows}
        columns={view.columns}
        getRowKey={getRowKey}
        sort={view.sort}
        onSortChange={view.onSortChange}
        emptyContent={view.messages.empty}
        size={view.size}
        showBorders={view.showBorders}
        showColumnLines={view.showColumnLines}
        showRowLines={view.showRowLines}
        rowAlternationEnabled={view.rowAlternationEnabled}
        {...dataGridProperties}
      >
        <DataGridHeader />
        <DataGridBody />
        <DataGridFooter>
          <Text>
            {view.messages.visible}: {view.rows.length} / {view.messages.total}: {view.total}
          </Text>
        </DataGridFooter>
      </DataGrid>
      {paginated && (
        <Pagination
          label={view.messages.page}
          page={view.page}
          pageCount={view.pageCount}
          onPageChange={view.onPageChange}
        >
          {Array.from({ length: view.pageCount }, (_, index) => (
            <PaginationItem
              key={index + 1}
              page={index + 1}
              label={`${view.messages.page} ${index + 1}`}
            />
          ))}
        </Pagination>
      )}
      <EventFeedback>{view.feedback}</EventFeedback>
    </>
  );
}

export function DataGridExample() {
  return <DataGridScenario />;
}

export function DataGridFilteredExample() {
  return <DataGridScenario paginated />;
}

function useDataGridPropertyBindings() {
  return useDataGridExampleProperties<
    Pick<
      ShowcaseDataGridProps<typeof DataGrid>,
      | "label"
      | "fullWidth"
      | "size"
      | "showBorders"
      | "showColumnLines"
      | "showRowLines"
      | "rowAlternationEnabled"
      | "title"
    >
  >("DataGrid");
}

function useDataGridPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useDataGridExamplePropertySnapshot("DataGrid", values);
}
