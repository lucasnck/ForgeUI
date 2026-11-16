"use client";
import {
  TreeGrid,
  TreeGridHeader,
  TreeGridBody,
  TreeGridFooter,
  Stack,
  Surface,
  Inline,
  Button,
  Text,
  SearchInput,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeGridExample } from "./useTreeGridExample";

function TreeGridScenario({ filtered = false }: { filtered?: boolean }) {
  const view = useTreeGridExample();

  return (
    <Stack gap="4">
      <>
        {filtered && (
          <SearchInput
            aria-label="Label"
            placeholder="Placeholder"
            value={view.query}
            onChange={view.search}
            clearLabel={view.copy.clear}
          />
        )}
      </>
      <Surface padding="2" shape="rounded">
        <TreeGrid
          label="Label"
          title="Title"
          {...view.properties}
          nodes={view.nodes}
          columns={view.columns}
          getNodeLabel={view.getNodeLabel}
          expandedValue={view.expanded}
          onExpandedValueChange={view.expand}
        >
          <TreeGridHeader title="Title" />
          <TreeGridBody title="Title" />
          <TreeGridFooter>
            <Inline gap="2" align="center" justify="end">
              <Button type="button" appearance="outlined" onClick={view.expandAll}>
                {view.copy.expand}
              </Button>
              <Button
                type="button"
                appearance="outlined"
                onClick={view.collapseAll}
                onPointerDown={filtered ? view.preserveCellFocus : undefined}
              >
                {view.copy.collapse}
              </Button>
            </Inline>
          </TreeGridFooter>
        </TreeGrid>
      </Surface>
      {filtered && !view.nodes.length && <Text role="status">{view.copy.empty}</Text>}
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeGridExample() {
  return <TreeGridScenario />;
}

export function TreeGridFilteredExample() {
  return <TreeGridScenario filtered />;
}
