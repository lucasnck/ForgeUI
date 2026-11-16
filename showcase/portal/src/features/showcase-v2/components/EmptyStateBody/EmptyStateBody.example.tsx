"use client";
import type { ComponentProps as ShowcaseEmptyStateBodyProps } from "react";
import { useExampleProperties as useEmptyStateBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Text, EmptyState, EmptyStateBody } from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";

import { useEmptyStateBodyExample } from "./useEmptyStateBodyExample";

export function EmptyStateBodyExample() {
  const { properties: emptyStateBodyProperties } = useEmptyStateBodyPropertyBindings();

  const view = useEmptyStateBodyExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    count: viewCount,
    lastAction: viewLastAction,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
      </ExampleControls>
      <EmptyState>
        <EmptyStateBody {...emptyStateBodyProperties}>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </EmptyStateBody>
      </EmptyState>
    </Stack>
  );
}

function useEmptyStateBodyPropertyBindings() {
  return useEmptyStateBodyExampleProperties<
    Pick<ShowcaseEmptyStateBodyProps<typeof EmptyStateBody>, "title">
  >("EmptyStateBody");
}
