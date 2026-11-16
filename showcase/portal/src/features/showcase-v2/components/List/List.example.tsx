"use client";
import { useExamplePropertySnapshot as useListExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseListProps } from "react";
import { useExampleProperties as useListExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  List,
  ListBody,
  ListItem,
  Text,
  ListHeader,
  Heading,
  Icon,
  ListFooter,
  Button,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useListExample } from "./useListExample";

export function ListExample() {
  const { properties: listProperties } = useListPropertyBindings();

  const { copy, filter, setFilter, reverse, setReverse, items, saved, cancelled, save, cancel } =
    useListExample();
  useListPropertySnapshot({ label: "Label" });
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
      <List label="Label" {...listProperties}>
        <ListHeader>
          <Inline gap="2" align="center">
            <Icon name="info" size="inherit" />
            <Heading level={3} size="md">
              Children
            </Heading>
          </Inline>
        </ListHeader>
        <ListBody>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Inline gap="2" align="center" justify="between">
                <Text>{item.children}</Text>
              </Inline>
            </ListItem>
          ))}
        </ListBody>
        <ListFooter data-justify="end">
          <Button variant="outline" onClick={cancel}>
            {copy.cancel}
          </Button>
          <Button onClick={save}>{copy.save}</Button>
        </ListFooter>
      </List>
      <ResourceState value={{ indices: items.map((item) => item.index), saved, cancelled }} />
    </Stack>
  );
}

function useListPropertyBindings() {
  return useListExampleProperties<Pick<ShowcaseListProps<typeof List>, "label" | "title">>("List");
}

function useListPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useListExamplePropertySnapshot("List", values);
}
