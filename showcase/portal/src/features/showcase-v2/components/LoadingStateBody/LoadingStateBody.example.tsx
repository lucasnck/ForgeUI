"use client";
import type { ComponentProps as ShowcaseLoadingStateBodyProps } from "react";
import { useExampleProperties as useLoadingStateBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Text, LoadingState, LoadingStateBody } from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";

import { useLoadingStateBodyExample } from "./useLoadingStateBodyExample";

export function LoadingStateBodyExample() {
  const { properties: loadingStateBodyProperties } = useLoadingStateBodyPropertyBindings();

  const view = useLoadingStateBodyExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    loading: viewLoading,
    setLoading: viewSetLoading,
    count: viewCount,
    lastAction: viewLastAction,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <ToggleControl label="loading" checked={viewLoading} onChange={viewSetLoading} />
      </ExampleControls>
      {viewLoading ? (
        <LoadingState label="Label">
          <LoadingStateBody {...loadingStateBodyProperties}>
            <Text>
              {viewChildren}
              {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
            </Text>
          </LoadingStateBody>
        </LoadingState>
      ) : (
        <Text>Children</Text>
      )}
    </Stack>
  );
}

function useLoadingStateBodyPropertyBindings() {
  return useLoadingStateBodyExampleProperties<
    Pick<ShowcaseLoadingStateBodyProps<typeof LoadingStateBody>, "title">
  >("LoadingStateBody");
}
