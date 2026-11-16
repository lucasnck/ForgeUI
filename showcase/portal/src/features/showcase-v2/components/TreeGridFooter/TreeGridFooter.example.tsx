"use client";
import {
  TreeGrid,
  TreeGridHeader,
  TreeGridBody,
  TreeGridFooter,
  Stack,
  Surface,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeGridFooterExample } from "./useTreeGridFooterExample";

function TreeGridFooterScenario() {
  const view = useTreeGridFooterExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <TreeGrid
          label="Label"
          title="Title"
          nodes={view.nodes}
          columns={view.columns}
          getNodeLabel={view.getNodeLabel}
          expandedValue={view.expanded}
          onExpandedValueChange={view.expand}
        >
          <TreeGridHeader title="Title" />
          <TreeGridBody title="Title" />
          <TreeGridFooter title="Title" {...view.properties}>
            <Text>{view.properties.children ?? "Children"}</Text>
          </TreeGridFooter>
        </TreeGrid>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeGridFooterExample() {
  return <TreeGridFooterScenario />;
}
