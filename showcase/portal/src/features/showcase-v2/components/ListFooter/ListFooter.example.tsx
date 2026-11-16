"use client";
import type { ComponentProps as ShowcaseListFooterProps } from "react";
import { useExampleProperties as useListFooterExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, List, ListBody, ListItem, Text, ListFooter, Button } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useListFooterExample } from "./useListFooterExample";

export function ListFooterExample() {
  const { properties: listFooterProperties } = useListFooterPropertyBindings();

  const { copy, filter, setFilter, reverse, setReverse, items, visible, showMore } =
    useListFooterExample();

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
        <ListBody>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Inline gap="2" align="center" justify="between">
                <Text>{item.children}</Text>
              </Inline>
            </ListItem>
          ))}
        </ListBody>
        <ListFooter data-justify="between" {...listFooterProperties}>
          <Text>{items.length} / 6</Text>
          <Button onClick={showMore} disabled={visible === 6}>
            {copy.showMore}
          </Button>
        </ListFooter>
      </List>
      <ResourceState
        value={{
          indices: items.map((item) => item.index),
          visible: items.length,
          total: 6,
        }}
      />
    </Stack>
  );
}

function useListFooterPropertyBindings() {
  return useListFooterExampleProperties<Pick<ShowcaseListFooterProps<typeof ListFooter>, "title">>(
    "ListFooter",
  );
}
