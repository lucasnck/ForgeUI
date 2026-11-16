"use client";
import { Spinner, Skeleton, Inline, Stack, Text } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../../ExampleControls";

import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useLoadingRecipesExample } from "./useLoadingRecipesExample";

export function LoadingRecipesExample() {
  const view = useLoadingRecipesExample();
  const {
    animated: viewAnimated,
    setAnimated: viewSetAnimated,
    size: viewSize,
    changeSize: viewChangeSize,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={viewAnimated} onChange={viewSetAnimated} />
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg"]}
          onChange={viewChangeSize}
        />
      </ExampleControls>
      <Inline gap="2" role="status" aria-label="Label">
        <Spinner size={viewSize} animated={viewAnimated} />
        <Text>Children</Text>
      </Inline>
      <Inline gap="2">
        <Skeleton size={viewSize} kind="text" animated={viewAnimated} />
        <Skeleton size={viewSize} kind="circle" animated={viewAnimated} />
      </Inline>
      <pre className={styles.state}>
        {JSON.stringify({ animated: viewAnimated, size: viewSize }, null, 2)}
      </pre>
    </Stack>
  );
}
