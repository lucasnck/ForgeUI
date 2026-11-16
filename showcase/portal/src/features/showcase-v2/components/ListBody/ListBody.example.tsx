"use client";
import type { ComponentProps as ShowcaseListBodyProps } from "react";
import { useExampleProperties as useListBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, List, ListBody, ListItem, Text } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useListBodyExample } from "./useListBodyExample";

export function ListBodyExample() {
  const { properties: listBodyProperties } = useListBodyPropertyBindings();

  const { filter, setFilter, reverse, setReverse, items } = useListBodyExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="filter"
          value={filter}
          onChange={setFilter}
          options={["all", "2", "none"]}
        />
        <ToggleControl label="reverse" checked={reverse} onChange={setReverse} />
      </ExampleControls>
      <List label="Label">
        <ListBody {...listBodyProperties}>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Inline gap="2" align="center" justify="between">
                <Text>{item.children}</Text>
              </Inline>
            </ListItem>
          ))}
        </ListBody>
      </List>
      <ResourceState value={{ indices: items.map((item) => item.index) }} />
    </Stack>
  );
}

function useListBodyPropertyBindings() {
  return useListBodyExampleProperties<Pick<ShowcaseListBodyProps<typeof ListBody>, "title">>(
    "ListBody",
  );
}
