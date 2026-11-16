"use client";
import { useExamplePropertySnapshot as useSimpleGridExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseSimpleGridProps } from "react";
import { useExampleProperties as useSimpleGridExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Text, Surface, SimpleGrid } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../ExampleControls";


import { useSimpleGridExample } from "./useSimpleGridExample";


export function SimpleGridExample() {
  const { properties: simpleGridProperties } = useSimpleGridPropertyBindings();


  const view = useSimpleGridExample();
  const {
    gap: viewGap,
    setGap: viewSetGap,
    padding: viewPadding,
    setPadding: viewSetPadding,
    variant: viewVariant,
    setVariant: viewSetVariant,
    gapValue: viewGapValue,
    paddingValue: viewPaddingValue,
    columns: viewColumns,
  } = view;
  useSimpleGridPropertySnapshot({
    gap: viewGapValue,
    padding: viewPaddingValue,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="gap"
          value={viewGap}
          options={["1", "2", "4", "8"]}
          onChange={viewSetGap}
        />
        <SelectControl
          label="padding"
          value={viewPadding}
          options={["0", "2", "4"]}
          onChange={viewSetPadding}
        />
        <SelectControl
          label="columns.wide"
          value={viewVariant}
          options={["1", "2", "3", "4"]}
          onChange={viewSetVariant}
        />
      </ExampleControls>
      <SimpleGrid
        gap={viewGapValue}
        padding={viewPaddingValue}
        columns={{ base: "1", mobile: "2", wide: viewColumns }}
        {...simpleGridProperties}
      >
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Surface padding="2" key={`item-${index}`}>
            <Text>Children {index}</Text>
          </Surface>
        ))}
      </SimpleGrid>
    </Stack>
  );
}


function useSimpleGridPropertyBindings() {
  return useSimpleGridExampleProperties<
    Pick<ShowcaseSimpleGridProps<typeof SimpleGrid>, "gap" | "padding" | "title">
  >("SimpleGrid");
}


function useSimpleGridPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useSimpleGridExamplePropertySnapshot("SimpleGrid", values);
}