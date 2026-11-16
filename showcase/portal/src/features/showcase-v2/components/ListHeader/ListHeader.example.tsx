"use client";
import type { ComponentProps as ShowcaseListHeaderProps } from "react";
import { useExampleProperties as useListHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  List,
  ListBody,
  ListItem,
  ListHeader,
  Heading,
  Icon,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useListHeaderExample } from "./useListHeaderExample";

export function ListHeaderExample() {
  const { properties: listHeaderProperties } = useListHeaderPropertyBindings();

  const { children, setChildren, icon, setIcon, items } = useListHeaderExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={children} onChange={setChildren} />
        <ToggleControl label="icon" checked={icon} onChange={setIcon} />
      </ExampleControls>
      <List label="Label">
        <ListHeader {...listHeaderProperties}>
          <Inline gap="2" align="center">
            {icon && <Icon name="info" size="inherit" />}
            <Heading level={3} size="md">
              {children}
            </Heading>
          </Inline>
        </ListHeader>
        <ListBody hidden>
          {items.map((item) => (
            <ListItem key={item.id}>{item.children}</ListItem>
          ))}
        </ListBody>
      </List>
      <ResourceState value={{ children, icon }} />
    </Stack>
  );
}

function useListHeaderPropertyBindings() {
  return useListHeaderExampleProperties<Pick<ShowcaseListHeaderProps<typeof ListHeader>, "title">>(
    "ListHeader",
  );
}
