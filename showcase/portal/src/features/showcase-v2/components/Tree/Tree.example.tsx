"use client";
import {
  Tree,
  TreeBody,
  Stack,
  Surface,
  TreeHeader,
  Inline,
  Icon,
  Heading,
  TreeFooter,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTreeExample } from "./useTreeExample";

function TreeScenario({ reject = false }: { reject?: boolean }) {
  const view = useTreeExample(reject);

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Tree
          label="Label"
          title="Title"
          {...view.properties}
          nodes={view.nodes}
          value={view.value}
          onValueChange={view.select}
          expandedValue={view.expanded}
          onExpandedValueChange={view.expand}
        >
          <TreeHeader title="Title">
            <Inline gap="2" align="center">
              <Icon name="info" size="sm" />
              <Heading level={3}>{"Children"}</Heading>
            </Inline>
          </TreeHeader>
          <TreeBody title="Title" />
          <TreeFooter>
            <Inline gap="2" align="center" justify="end">
              <Button type="button" appearance="outlined" onClick={view.expandAll}>
                {view.copy.expand}
              </Button>
              <Button
                type="button"
                appearance="outlined"
                onPointerDown={reject ? view.preserveTreeFocus : undefined}
                onClick={view.collapseAll}
              >
                {view.copy.collapse}
              </Button>
            </Inline>
          </TreeFooter>
        </Tree>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function TreeExample() {
  return <TreeScenario />;
}

export function TreeRejectExample() {
  return <TreeScenario reject />;
}
