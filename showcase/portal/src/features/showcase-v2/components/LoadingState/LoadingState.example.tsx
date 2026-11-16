"use client";
import { useExamplePropertySnapshot as useLoadingStateExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseLoadingStateProps } from "react";
import { useExampleProperties as useLoadingStateExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Icon,
  Heading,
  Text,
  Button,
  LoadingState,
  LoadingStateHeader,
  LoadingStateBody,
  LoadingStateFooter,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";

import { useLoadingStateExample } from "./useLoadingStateExample";

export function LoadingStateExample() {
  const { properties: loadingStateProperties } = useLoadingStatePropertyBindings();

  const view = useLoadingStateExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    showIcon: viewShowIcon,
    setShowIcon: viewSetShowIcon,
    loading: viewLoading,
    setLoading: viewSetLoading,
    count: viewCount,
    lastAction: viewLastAction,
    cancel: viewCancel,
    copy: viewCopy,
  } = view;
  useLoadingStatePropertySnapshot({ label: "Label" });
  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <ToggleControl label="icon" checked={viewShowIcon} onChange={viewSetShowIcon} />
        <ToggleControl label="loading" checked={viewLoading} onChange={viewSetLoading} />
      </ExampleControls>
      {viewLoading ? (
        <LoadingState label="Label" {...loadingStateProperties}>
          <LoadingStateHeader>
            <Inline gap="2" align="center">
              {viewShowIcon && <Icon name="info" size="inherit" />}
              <Heading level={3} size="md">
                {viewChildren}
              </Heading>
            </Inline>
          </LoadingStateHeader>
          <LoadingStateBody>
            <Text>
              {viewChildren}
              {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
            </Text>
          </LoadingStateBody>
          <LoadingStateFooter>
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

function useLoadingStatePropertyBindings() {
  return useLoadingStateExampleProperties<
    Pick<ShowcaseLoadingStateProps<typeof LoadingState>, "label" | "title">
  >("LoadingState");
}

function useLoadingStatePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useLoadingStateExamplePropertySnapshot("LoadingState", values);
}
