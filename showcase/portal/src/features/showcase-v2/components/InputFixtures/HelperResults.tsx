import { Stack, Heading, DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";
import type { DataGridColumn } from "@forge-ui/web";

export interface HelperResult {
  id: string;
  input: string;
  output: string;
  valid: boolean;
  canonical?: string;
}

const columns: readonly DataGridColumn<HelperResult>[] = [
  {
    key: "input",
    header: "input",
    rowHeader: true,
    renderCell: (row) => row.input,
  },
  { key: "output", header: "output", renderCell: (row) => row.output },
  { key: "valid", header: "valid", renderCell: (row) => String(row.valid) },
];
const canonicalColumns: readonly DataGridColumn<HelperResult>[] = [
  columns[0],
  {
    key: "canonical",
    header: "canonical",
    renderCell: (row) => row.canonical ?? "—",
  },
  ...columns.slice(1),
];

function rowKey(row: HelperResult) {
  return row.id;
}

export function HelperResults({ label, rows }: { label: string; rows: readonly HelperResult[] }) {
  return (
    <Stack as="section" gap="2">
      <Heading level={3} size="md">
        {label}
      </Heading>
      <DataGrid
        label={label}
        rows={rows}
        columns={rows.some((row) => row.canonical !== undefined) ? canonicalColumns : columns}
        getRowKey={rowKey}
        size="sm"
        fullWidth
      >
        <DataGridHeader />
        <DataGridBody />
      </DataGrid>
    </Stack>
  );
}
