"use client";
import { Stack, Text } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useScrollbarRecipesExample } from "./useScrollbarRecipesExample";

export function ScrollbarRecipesExample() {
  const view = useScrollbarRecipesExample();
  const { expanded: viewExpanded, setExpanded: viewSetExpanded, indices: viewIndices } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="24 items" checked={viewExpanded} onChange={viewSetExpanded} />
      </ExampleControls>
      <div className={styles.viewport} role="region" aria-label="Label 1" tabIndex={0}>
        <Stack gap="2">
          {viewIndices.map((index) => (
            <Text key={index}>Children {index}</Text>
          ))}
        </Stack>
      </div>
      <div className={styles.viewport} role="region" aria-label="Label 2" tabIndex={0}>
        <div className={styles.wideContent}>
          <Text>Children 1 · Children 2 · Children 3 · Children 4 · Children 5 · Children 6</Text>
        </div>
      </div>
      <ResourceState value={{ items: viewIndices.length, stylesheet: "scrollbars.css" }} />
    </Stack>
  );
}
