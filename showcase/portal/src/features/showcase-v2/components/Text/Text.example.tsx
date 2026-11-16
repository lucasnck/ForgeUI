"use client";
import { useExamplePropertySnapshot as useTextExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseTextProps } from "react";
import { useExampleProperties as useTextExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Text } from "@forge-ui/web";
import { ExampleControls, SelectControl, TextControl, ToggleControl } from "../ExampleControls";

import { useTextExample } from "./useTextExample";
import styles from "../ComponentExamples/ComponentExamples.module.css";

export function TextExample() {
  const { properties: textProperties } = useTextPropertyBindings();

  const view = useTextExample();
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
    as: viewAs,
  } = view;
  useTextPropertySnapshot({ size: viewSize, weight: viewWeight });
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
          label="as"
          value={viewElement}
          options={["p", "span", "small", "strong"]}
          onChange={viewSetElement}
        />
      </ExampleControls>
      <Text
        as={viewAs}
        size={viewSize}
        weight={viewWeight}
        className={styles.content}
        {...textProperties}
      >
        {textProperties.children === undefined ? (
          <>{viewChildren}</>
        ) : (
          <>{textProperties.children}</>
        )}
      </Text>
    </Stack>
  );
}

function useTextPropertyBindings() {
  return useTextExampleProperties<
    Pick<ShowcaseTextProps<typeof Text>, "children" | "size" | "tone" | "weight" | "title">
  >("Text");
}

function useTextPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useTextExamplePropertySnapshot("Text", values);
}
