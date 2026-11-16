"use client";
import type { ComponentProps as ShowcaseListItemProps } from "react";
import { useExampleProperties as useListItemExampleProperties } from "../ExampleScope/useExampleScope";
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
import { useListItemExample } from "./useListItemExample";

export function ListItemExample() {
  const { properties: listItemProperties } = useListItemPropertyBindings();

  const {
    copy,
    filter,
    setFilter,
    reverse,
    setReverse,
    items,
    saved,
    cancelled,
    save,
    cancel,
    action,
    calls,
  } = useListItemExample();

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
            <ListItem key={item.id} {...listItemProperties}>
              <Inline gap="2" align="center" justify="between">
                <Text>{item.children}</Text>
                <Button
                  size="sm"
                  variant="outline"
                  aria-label={`Action ${item.index}`}
                  onClick={item.onAction}
                >
                  {copy.review}
                </Button>
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
      <ResourceState
        value={{
          indices: items.map((item) => item.index),
          action,
          calls,
          saved,
          cancelled,
        }}
      />
    </Stack>
  );
}

function useListItemPropertyBindings() {
  return useListItemExampleProperties<Pick<ShowcaseListItemProps<typeof ListItem>, "title">>(
    "ListItem",
  );
}
