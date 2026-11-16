"use client";
import { Tree, TreeBody, Stack, Surface, TreeHeader, Inline, Icon, Heading } from "@forge-ui/web";
import { useTreeHeaderExample } from "./useTreeHeaderExample";

function TreeHeaderScenario() {
  const view = useTreeHeaderExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Tree
          label="Label"
          title="Title"
          nodes={[]}
          value={view.value}
          onValueChange={view.select}
          expandedValue={view.expanded}
          onExpandedValueChange={view.expand}
        >
          <TreeHeader title="Title" {...view.properties}>
            <Inline gap="2" align="center">
              <Icon name="info" size="sm" />
              <Heading level={3}>{view.properties.children ?? "Children"}</Heading>
            </Inline>
          </TreeHeader>
          <TreeBody hidden />
        </Tree>
      </Surface>
    </Stack>
  );
}

export function TreeHeaderExample() {
  return <TreeHeaderScenario />;
}
