"use client";
import { TagGroup, TagGroupItem, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTagGroupExample } from "./useTagGroupExample";

export function TagGroupExample() {
  const view = useTagGroupExample();

  return (
    <Stack gap="4">
      <TagGroup title="Title" {...view.properties}>
        {view.renderItems.map((item) => (
          <TagGroupItem key={item.id} title={item.title} tag={item.tag} />
        ))}
      </TagGroup>
      <ExampleState
        value={{
          items: view.remaining.map((item) => item.id),
          removed: view.removed,
        }}
      />
    </Stack>
  );
}
