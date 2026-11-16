"use client";
import { useExamplePropertySnapshot as useTagExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseTagProps } from "react";
import { useExampleProperties as useTagExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Tag } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useTagExample } from "./useTagExample";
interface TagFixtureItemProps {
  index: number;
  disabled: boolean;
  onRemove(index: number): void;
}

function useTagFixtureItem({ index, onRemove }: TagFixtureItemProps) {
  function remove() {
    onRemove(index);
  }

  return { remove };
}

function TagFixtureItem(props: TagFixtureItemProps) {
  const { properties: tagProperties } = useTagPropertyBindings(props.index);

  const { remove } = useTagFixtureItem(props);
  useTagPropertySnapshot({ disabled: props.disabled });
  return (
    <Tag disabled={props.disabled} onRemove={remove} {...tagProperties}>
      {tagProperties.children === undefined ? (
        <>Children {props.index}</>
      ) : (
        <>
          {tagProperties.children} {props.index}
        </>
      )}
    </Tag>
  );
}

export function TagExample() {
  const view = useTagExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    items: viewItems,
    remove: viewRemove,
    removed: viewRemoved,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <Inline gap="2">
        {viewItems.map((index) => (
          <TagFixtureItem
            key={`item-${index}`}
            index={index}
            disabled={viewDisabled}
            onRemove={viewRemove}
          />
        ))}
      </Inline>
      <ResourceState value={{ removed: viewRemoved, items: viewItems }} />
    </Stack>
  );
}

function useTagPropertyBindings(index: number) {
  const binding =
    useTagExampleProperties<
      Pick<
        ShowcaseTagProps<typeof Tag>,
        | "children"
        | "size"
        | "tone"
        | "appearance"
        | "shape"
        | "fullWidth"
        | "removeLabel"
        | "disabled"
        | "title"
      >
    >("Tag");

  return {
    ...binding,
    properties: {
      ...binding.properties,
      removeLabel: `${binding.properties.removeLabel?.trim() || "RemoveLabel"} ${index}`,
      ...(binding.properties.title === undefined
        ? {}
        : { title: `${binding.properties.title} ${index}` }),
    },
  };
}

function useTagPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useTagExamplePropertySnapshot("Tag", values);
}
