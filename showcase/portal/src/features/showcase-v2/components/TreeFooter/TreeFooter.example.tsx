"use client";
import { Tree, TreeBody, Stack, Surface, TreeFooter, Text } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeFooterExample } from "./useTreeFooterExample";

function TreeFooterScenario() {
  const view = useTreeFooterExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Tree
          label="Label"
          title="Title"
          nodes={view.nodes}
          value={view.value}
          onValueChange={view.select}
          expandedValue={view.expanded}
          onExpandedValueChange={view.expand}
        >
          <TreeBody title="Title" />
          <TreeFooter title="Title" {...view.properties}>
            <Text>{view.properties.children ?? "Children"}</Text>
          </TreeFooter>
        </Tree>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeFooterExample() {
  return <TreeFooterScenario />;
}
