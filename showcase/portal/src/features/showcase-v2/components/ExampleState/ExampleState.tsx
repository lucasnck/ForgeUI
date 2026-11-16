"use client";
import { DataGrid, DataGridHeader, DataGridBody, Stack, Heading, Text } from "@forge-ui/web";
import type { DataGridColumn } from "@forge-ui/web";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
interface Row {
  name: string;
  value: string;
}

function stateKey(row: Row) {
  return row.name;
}

function useExampleState(value: unknown) {
  const { copy } = useShowcaseV2Copy();
  const record = value && typeof value === "object" && !Array.isArray(value) ? value : { value };
  const rows = Object.entries(record).map(([name, item]) => ({
    name,
    value: typeof item === "string" ? item : (JSON.stringify(item) ?? "undefined"),
  }));

  return { copy, rows };
}

export function ExampleState({ value }: { value: unknown }) {
  const { copy, rows } = useExampleState(value);
  const columns: readonly DataGridColumn<Row>[] = [
    {
      key: "name",
      header: copy.name,
      rowHeader: true,
      renderCell: (row) => row.name,
    },
    { key: "value", header: copy.value, renderCell: (row) => row.value },
  ];

  return (
    <Stack as="section" gap="2">
      <Heading level={3} size="md">
        {copy.exampleState}
      </Heading>
      <DataGrid
        label={copy.exampleState}
        rows={rows}
        columns={columns}
        getRowKey={stateKey}
        size="sm"
        fullWidth
      >
        <DataGridHeader />
        <DataGridBody />
      </DataGrid>
    </Stack>
  );
}

export function ExampleEventState({ children }: { children: React.ReactNode }) {
  const { copy } = useShowcaseV2Copy();

  return (
    <Stack as="section" gap="2">
      <Heading level={3} size="md">
        {copy.exampleState}
      </Heading>
      <Text as="p" role="status" aria-live="polite">
        {children}
      </Text>
    </Stack>
  );
}
