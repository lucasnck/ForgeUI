"use client";
import { useExamplePropertySnapshot as useAvatarExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseAvatarProps } from "react";
import { useExampleProperties as useAvatarExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Avatar, Text } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";

import { useAvatarExample } from "./useAvatarExample";

export function AvatarExample() {
  const { properties: avatarProperties } = useAvatarPropertyBindings();

  const view = useAvatarExample();
  const {
    src: viewSrc,
    setSrc: viewSetSrc,
    decorative: viewDecorative,
    setDecorative: viewSetDecorative,
    resolvedSrc: viewResolvedSrc,
  } = view;
  useAvatarPropertySnapshot({
    label: "Label",
    initials: "IN",
    src: viewResolvedSrc,
    decorative: viewDecorative,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="src fixture"
          value={viewSrc}
          options={["none", "image", "broken"]}
          onChange={viewSetSrc}
        />
        <ToggleControl label="decorative" checked={viewDecorative} onChange={viewSetDecorative} />
      </ExampleControls>
      <Inline gap="2">
        <Avatar
          label="Label"
          initials="IN"
          src={viewResolvedSrc}
          decorative={viewDecorative}
          {...avatarProperties}
        />
        <Text>Children</Text>
      </Inline>
    </Stack>
  );
}

function useAvatarPropertyBindings() {
  return useAvatarExampleProperties<
    Pick<
      ShowcaseAvatarProps<typeof Avatar>,
      "size" | "shape" | "label" | "src" | "initials" | "decorative" | "title"
    >
  >("Avatar");
}

function useAvatarPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useAvatarExamplePropertySnapshot("Avatar", values);
}
