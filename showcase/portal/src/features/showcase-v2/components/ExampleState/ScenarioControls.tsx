"use client";
import { useSyncExternalStore } from "react";
import { DataGrid, DataGridHeader, DataGridBody, Stack, Heading } from "@forge-ui/web";
import type { DataGridColumn } from "@forge-ui/web";
import { useExampleStore } from "../ExampleScope/ExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { PropertyEditor } from "../PropertyGrid/PropertyEditor";
import type { RegisteredControl } from "../ExampleScope/example-store";

function scenarioKey(row: RegisteredControl) {
  return row.id;
}

function useScenarioControls() {
  const store = useExampleStore();
  if (!store) throw Error("Scenario controls require a scope");
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const { copy } = useShowcaseV2Copy();
  const names = new Set(store.properties.map((p) => p.name));

  return {
    store,
    copy,
    rows: snapshot.controls.filter((control) => !names.has(control.label)),
  };
}

export function ScenarioControls() {
  const { store, copy, rows } = useScenarioControls();
  if (!rows.length) return null;
  const columns: readonly DataGridColumn<RegisteredControl>[] = [
    {
      key: "name",
      header: copy.name,
      rowHeader: true,
      renderCell: (row) => row.label,
    },
    {
      key: "options",
      header: copy.options,
      renderCell: (row) => (
        <PropertyEditor
          name={row.label}
          registered={row}
          value={row.value}
          store={store}
          scenario
        />
      ),
    },
  ];

  return (
    <Stack as="section" gap="2">
      <Heading level={3} size="md">
        {copy.exampleState} · {copy.scenario}
      </Heading>
      <DataGrid
        label={copy.scenario}
        rows={rows}
        columns={columns}
        getRowKey={scenarioKey}
        fullWidth
        size="sm"
      >
        <DataGridHeader />
        <DataGridBody />
      </DataGrid>
    </Stack>
  );
}
