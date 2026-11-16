"use client";
import { useExamplePropertySnapshot as useBadgeExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseBadgeProps } from "react";
import { useExampleProperties as useBadgeExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Badge, Text } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../ExampleControls";

import { useBadgeExample } from "./useBadgeExample";

export function BadgeExample() {
  const { properties: badgeProperties } = useBadgePropertyBindings();

  const view = useBadgeExample();
  const {
    tone: viewTone,
    changeTone: viewChangeTone,
    appearance: viewAppearance,
    setAppearance: viewSetAppearance,
    resolvedAppearance: viewResolvedAppearance,
  } = view;
  useBadgePropertySnapshot({
    tone: viewTone,
    appearance: viewResolvedAppearance,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="tone"
          value={viewTone}
          options={["brand", "success", "danger"]}
          onChange={viewChangeTone}
        />
        <SelectControl
          label="appearance"
          value={viewAppearance}
          options={["soft", "solid", "outlined", "ghost"]}
          onChange={viewSetAppearance}
        />
      </ExampleControls>
      <Inline gap="2">
        <Badge tone={viewTone} appearance={viewResolvedAppearance} {...badgeProperties}>
          {badgeProperties.children === undefined ? <>Children</> : <>{badgeProperties.children}</>}
        </Badge>
        <Text>Children</Text>
      </Inline>
    </Stack>
  );
}

function useBadgePropertyBindings() {
  return useBadgeExampleProperties<
    Pick<
      ShowcaseBadgeProps<typeof Badge>,
      "children" | "size" | "tone" | "appearance" | "shape" | "fullWidth" | "title"
    >
  >("Badge");
}

function useBadgePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useBadgeExamplePropertySnapshot("Badge", values);
}
