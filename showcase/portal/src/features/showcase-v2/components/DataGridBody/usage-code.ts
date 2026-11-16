export const basicCode =
  'import { DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";\n<DataGrid\n  label="Label"\n  rows={rows}\n  columns={columns}\n  getRowKey={(row) => row.id}\n  sort={sort}\n  onSortChange={onSortChange}\n>\n  <DataGridHeader />\n  <DataGridBody title="Title" />\n</DataGrid>;\n';
