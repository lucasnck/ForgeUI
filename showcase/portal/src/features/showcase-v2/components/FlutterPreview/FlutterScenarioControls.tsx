"use client";
import { useSyncExternalStore } from "react";
import { DataGrid, DataGridHeader, DataGridBody, Heading, Stack } from "@forge-ui/web";
import type { DataGridColumn } from "@forge-ui/web";
import { useExampleStore } from "../ExampleScope/ExampleScope";
import { PropertyEditor } from "../PropertyGrid/PropertyEditor";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

/** Consumer fixture controls are kept separate from the native constructor API. */
export function FlutterScenarioControls() {
  const store = useExampleStore();
  if (!store) throw Error("Flutter scenario controls require an example scope");
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const { copy } = useShowcaseV2Copy();
  const publicNames = new Set(store.properties.map(property => property.name));
  const rows = Object.entries(store.schema)
    .filter(([name]) => !publicNames.has(name))
    .map(([name, editor]) => ({
      name, editor,
      value: Object.hasOwn(snapshot.overrides, name) ? snapshot.overrides[name] : editor.defaultValue,
    }));
  if (!rows.length) return null;
  type Row = (typeof rows)[number];
  const columns: readonly DataGridColumn<Row>[] = [
    { key: "name", header: copy.name, rowHeader: true, renderCell: row => row.name },
    { key: "editor", header: copy.options, renderCell: row =>
      <PropertyEditor name={row.name} editor={row.editor} value={row.value} store={store} /> },
  ];
  return <Stack as="section" gap="2">
    <Heading level={3} size="md">{copy.exampleState} · {copy.scenario}</Heading>
    <DataGrid label={copy.scenario} rows={rows} columns={columns} getRowKey={row => row.name} fullWidth size="sm">
      <DataGridHeader /><DataGridBody />
    </DataGrid>
  </Stack>;
}
