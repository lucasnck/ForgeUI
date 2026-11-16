"use client";
import {
  Surface,
  ListBox,
  ListBoxHeader,
  ListBoxBody,
  Heading,
  Inline,
  Icon,
} from "@forge-ui/web";
import { useListBoxHeaderExample } from "./useListBoxHeaderExample";

export function ListBoxHeaderExample() {
  const view = useListBoxHeaderExample();

  return (
    <Surface padding="2" shape="rounded">
      <ListBox label="Label" options={[]}>
        <ListBoxHeader title="Title" {...view.properties}>
          <Inline gap="2" align="center">
            <Icon name="info" size="sm" />
            <Heading level={3}>{view.properties.children ?? "Children"}</Heading>
          </Inline>
        </ListBoxHeader>
        <ListBoxBody hidden />
      </ListBox>
    </Surface>
  );
}
