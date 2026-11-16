"use client";
import { TagGroup, TagGroupItem, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTagGroupItemExample } from "./useTagGroupItemExample";

export function TagGroupItemExample() {
  const view = useTagGroupItemExample();

  return (
    <Stack gap="4">
      <TagGroup>
        {view.renderItems.map((item) => (
          <TagGroupItem
            key={item.id}
            {...view.properties}
            title={`${view.properties.title ?? "Title"} ${item.index}`}
            tag={item.tag}
          />
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
