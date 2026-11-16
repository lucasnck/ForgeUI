"use client";
import type { ComponentProps as ShowcaseLoadingStateFooterProps } from "react";
import { useExampleProperties as useLoadingStateFooterExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Text,
  Button,
  LoadingState,
  LoadingStateBody,
  LoadingStateFooter,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";

import { useLoadingStateFooterExample } from "./useLoadingStateFooterExample";

export function LoadingStateFooterExample() {
  const { properties: loadingStateFooterProperties } = useLoadingStateFooterPropertyBindings();

  const view = useLoadingStateFooterExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    loading: viewLoading,
    setLoading: viewSetLoading,
    count: viewCount,
    lastAction: viewLastAction,
    cancel: viewCancel,
    copy: viewCopy,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <ToggleControl label="loading" checked={viewLoading} onChange={viewSetLoading} />
      </ExampleControls>
      {viewLoading ? (
        <LoadingState label="Label">
          <LoadingStateBody>
            <Text>
              {viewChildren}
              {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
            </Text>
          </LoadingStateBody>
          <LoadingStateFooter {...loadingStateFooterProperties}>
            <Inline gap="2" justify="end">
              <Button variant="outline" onClick={viewCancel}>
                {viewCopy.cancel}
              </Button>
            </Inline>
          </LoadingStateFooter>
        </LoadingState>
      ) : (
        <Text>Children</Text>
      )}
    </Stack>
  );
}

function useLoadingStateFooterPropertyBindings() {
  return useLoadingStateFooterExampleProperties<
    Pick<ShowcaseLoadingStateFooterProps<typeof LoadingStateFooter>, "title">
  >("LoadingStateFooter");
}
