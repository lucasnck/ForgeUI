"use client";
import { useExamplePropertySnapshot as useSpinnerExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseSpinnerProps } from "react";
import { useExampleProperties as useSpinnerExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Text, Spinner } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";

import { useSpinnerExample } from "./useSpinnerExample";

export function SpinnerExample() {
  const { properties: spinnerProperties } = useSpinnerPropertyBindings();

  const view = useSpinnerExample();
  const {
    loading: viewLoading,
    setLoading: viewSetLoading,
    animated: viewAnimated,
    setAnimated: viewSetAnimated,
    size: viewSize,
    changeSize: viewChangeSize,
  } = view;
  useSpinnerPropertySnapshot({ size: viewSize, animated: viewAnimated });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="loading" checked={viewLoading} onChange={viewSetLoading} />
        <ToggleControl label="animated" checked={viewAnimated} onChange={viewSetAnimated} />
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg"]}
          onChange={viewChangeSize}
        />
      </ExampleControls>
      {viewLoading ? (
        <Inline gap="2" role="status" aria-label="Label">
          <Spinner size={viewSize} animated={viewAnimated} {...spinnerProperties} />
          <Text>Children</Text>
        </Inline>
      ) : (
        <Text>Children</Text>
      )}
    </Stack>
  );
}

function useSpinnerPropertyBindings() {
  return useSpinnerExampleProperties<
    Pick<
      ShowcaseSpinnerProps<typeof Spinner>,
      "size" | "tone" | "animated" | "decorative" | "label" | "title"
    >
  >("Spinner");
}

function useSpinnerPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useSpinnerExamplePropertySnapshot("Spinner", values);
}
