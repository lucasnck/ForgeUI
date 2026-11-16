"use client";
import { useExamplePropertySnapshot as useHeadingExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseHeadingProps } from "react";
import { useExampleProperties as useHeadingExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Heading } from "@forge-ui/web";
import { ExampleControls, SelectControl, TextControl, ToggleControl } from "../ExampleControls";

import { useHeadingExample } from "./useHeadingExample";
import styles from "../ComponentExamples/ComponentExamples.module.css";

export function HeadingExample() {
  const { properties: headingProperties } = useHeadingPropertyBindings();

  const view = useHeadingExample();
  const {
    long: viewLong,
    changeLong: viewChangeLong,
    children: viewChildren,
    setChildren: viewSetChildren,
    size: viewSize,
    changeSize: viewChangeSize,
    weight: viewWeight,
    changeWeight: viewChangeWeight,
    element: viewElement,
    setElement: viewSetElement,
    level: viewLevel,
  } = view;
  useHeadingPropertySnapshot({
    level: viewLevel,
    size: viewSize,
    weight: viewWeight,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="longChildren" checked={viewLong} onChange={viewChangeLong} />
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg", "2xl", "4xl"]}
          onChange={viewChangeSize}
        />
        <SelectControl
          label="weight"
          value={viewWeight}
          options={["regular", "medium", "semibold", "bold"]}
          onChange={viewChangeWeight}
        />
        <SelectControl
          label="level"
          value={viewElement}
          options={["2", "3", "4", "5", "6"]}
          onChange={viewSetElement}
        />
      </ExampleControls>
      <Heading
        level={viewLevel}
        size={viewSize}
        weight={viewWeight}
        className={styles.content}
        {...headingProperties}
      >
        {headingProperties.children === undefined ? (
          <>{viewChildren}</>
        ) : (
          <>{headingProperties.children}</>
        )}
      </Heading>
    </Stack>
  );
}

function useHeadingPropertyBindings() {
  return useHeadingExampleProperties<
    Pick<
      ShowcaseHeadingProps<typeof Heading>,
      "children" | "level" | "size" | "weight" | "tone" | "title"
    >
  >("Heading");
}

function useHeadingPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useHeadingExamplePropertySnapshot("Heading", values);
}
