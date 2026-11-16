"use client";
import { Heading, Stack, DataGrid, DataGridHeader, DataGridBody, Text } from "@forge-ui/web";
import type { DataGridColumn } from "@forge-ui/web";
import type { ShowcaseV2Property } from "../../model/showcase-v2.types";
import { usePropertyGrid } from "./usePropertyGrid";
import { PropertyEditor } from "./PropertyEditor";

/** Original Showcase V2 property editors backed by the public DataGrid compound. */
export function PropertyGrid({ properties }: { properties: readonly ShowcaseV2Property[] }) {
  const { rows, copy, store, id } = usePropertyGrid(properties);
  type Row = (typeof rows)[number];
  const columns: readonly DataGridColumn<Row>[] = [
    { key: "name", header: copy.name, rowHeader: true, renderCell: row => <Text as="span" weight="semibold">{row.name}</Text> },
    { key: "type", header: copy.type, renderCell: row => row.type },
    { key: "required", header: copy.required, renderCell: row => row.required ? copy.yes : copy.no },
    { key: "default", header: copy.defaultValue, renderCell: row => row.defaultValue ?? "—" },
    { key: "description", header: copy.description, renderCell: row => row.description },
    { key: "source", header: copy.source, renderCell: row => row.source },
    { key: "editor", header: copy.options, renderCell: row => <PropertyEditor name={row.name} editor={row.editor} registered={row.registered} value={row.value} store={store}/> },
  ];
  return <Stack as="section" gap="2" aria-labelledby={`${id}-properties`}>
    <Heading level={3} size="lg" id={`${id}-properties`}>{copy.properties}</Heading>
    <DataGrid label={copy.tableCaption} rows={rows} columns={columns} getRowKey={row => row.name} fullWidth size="sm" emptyContent="—">
      <DataGridHeader/><DataGridBody/>
    </DataGrid>
  </Stack>;
}
