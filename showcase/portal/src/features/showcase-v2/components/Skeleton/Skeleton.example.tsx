"use client";
import { useExamplePropertySnapshot as useSkeletonExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseSkeletonProps } from "react";
import { useExampleProperties as useSkeletonExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Text, Skeleton } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";

import { useSkeletonExample } from "./useSkeletonExample";

export function SkeletonExample() {
  const { properties: skeletonProperties } = useSkeletonPropertyBindings();

  const view = useSkeletonExample();
  const {
    loading: viewLoading,
    setLoading: viewSetLoading,
    animated: viewAnimated,
    setAnimated: viewSetAnimated,
    size: viewSize,
    changeSize: viewChangeSize,
    kind: viewKind,
    changeKind: viewChangeKind,
  } = view;
  useSkeletonPropertySnapshot({
    size: viewSize,
    animated: viewAnimated,
    kind: viewKind,
  });
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
        <SelectControl
          label="kind"
          value={viewKind}
          options={["text", "rectangle", "circle"]}
          onChange={viewChangeKind}
        />
      </ExampleControls>
      {viewLoading ? (
        <Inline gap="2" role="status" aria-label="Label">
          <Skeleton
            size={viewSize}
            animated={viewAnimated}
            kind={viewKind}
            {...skeletonProperties}
          />
          <Text>Children</Text>
        </Inline>
      ) : (
        <Text>Children</Text>
      )}
    </Stack>
  );
}

function useSkeletonPropertyBindings() {
  return useSkeletonExampleProperties<
    Pick<
      ShowcaseSkeletonProps<typeof Skeleton>,
      "size" | "shape" | "fullWidth" | "animated" | "kind" | "title"
    >
  >("Skeleton");
}

function useSkeletonPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useSkeletonExamplePropertySnapshot("Skeleton", values);
}
