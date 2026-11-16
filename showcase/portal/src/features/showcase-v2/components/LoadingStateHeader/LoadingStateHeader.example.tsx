"use client";
import type { ComponentProps as ShowcaseLoadingStateHeaderProps } from "react";
import { useExampleProperties as useLoadingStateHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Icon,
  Heading,
  Text,
  LoadingState,
  LoadingStateHeader,
  LoadingStateBody,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";

import { useLoadingStateHeaderExample } from "./useLoadingStateHeaderExample";

export function LoadingStateHeaderExample() {
  const { properties: loadingStateHeaderProperties } = useLoadingStateHeaderPropertyBindings();

  const view = useLoadingStateHeaderExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    showIcon: viewShowIcon,
    setShowIcon: viewSetShowIcon,
    loading: viewLoading,
    setLoading: viewSetLoading,
    count: viewCount,
    lastAction: viewLastAction,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <ToggleControl label="icon" checked={viewShowIcon} onChange={viewSetShowIcon} />
        <ToggleControl label="loading" checked={viewLoading} onChange={viewSetLoading} />
      </ExampleControls>
      {viewLoading ? (
        <LoadingState label="Label">
          <LoadingStateHeader {...loadingStateHeaderProperties}>
            <Inline gap="2" align="center">
              {viewShowIcon && <Icon name="info" size="inherit" />}
              <Heading level={3} size="md">
                {viewChildren}
              </Heading>
            </Inline>
          </LoadingStateHeader>
          <LoadingStateBody hidden>
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

function useLoadingStateHeaderPropertyBindings() {
  return useLoadingStateHeaderExampleProperties<
    Pick<ShowcaseLoadingStateHeaderProps<typeof LoadingStateHeader>, "title">
  >("LoadingStateHeader");
}
