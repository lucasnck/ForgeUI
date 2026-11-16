"use client";
import { useExamplePropertySnapshot as useIconExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseIconProps } from "react";
import { useExampleProperties as useIconExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Icon, Inline, Text } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";

import { useIconExample } from "./useIconExample";

import { iconNames } from "./fixtures";

export function IconExample() {
  const { properties: iconProperties } = useIconPropertyBindings();

  const view = useIconExample();
  const {
    name: viewName,
    changeName: viewChangeName,
    named: viewNamed,
    setNamed: viewSetNamed,
  } = view;
  useIconPropertySnapshot({
    name: viewName,
    size: "inherit",
    label: viewNamed ? "Label" : undefined,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="name"
          value={viewName}
          options={iconNames}
          onChange={viewChangeName}
        />
        <ToggleControl label="label" checked={viewNamed} onChange={viewSetNamed} />
      </ExampleControls>
      <Inline gap="2" align="center">
        <Icon name={viewName} size="inherit" {...iconProperties} />
        <Text>Children</Text>
      </Inline>
      <Icon name={viewName} label={viewNamed ? "Label" : undefined} {...iconProperties} />
    </Stack>
  );
}

function useIconPropertyBindings() {
  return useIconExampleProperties<Pick<ShowcaseIconProps<typeof Icon>, "name" | "size" | "label">>(
    "Icon",
  );
}

function useIconPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useIconExamplePropertySnapshot("Icon", values);
}
