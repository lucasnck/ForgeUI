"use client";
import { Button, Stack, Text, Surface, PageTransition } from "@forge-ui/web";
import { ExampleControls, ToggleControl, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import { usePageTransitionRecipesExample } from "./usePageTransitionRecipesExample";

export function PageTransitionRecipesExample() {
  const view = usePageTransitionRecipesExample();
  const {
    animated: viewAnimated,
    setAnimated: viewSetAnimated,
    fallback: viewFallback,
    setFallback: viewSetFallback,
    type: viewType,
    setType: viewSetType,
    next: viewNext,
    copy: viewCopy,
    detail: viewDetail,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={viewAnimated} onChange={viewSetAnimated} />
        <ToggleControl
          label="immediate fallback"
          checked={viewFallback}
          onChange={viewSetFallback}
        />
        <SelectControl
          label="transitionType"
          value={viewType}
          options={["forward", "back", "replace", "reveal"]}
          onChange={viewSetType}
        />
      </ExampleControls>
      <div>
        <Button onClick={viewNext}>{viewCopy.next}</Button>
      </div>
      <PageTransition animated={viewAnimated}>
        <Surface key={viewDetail ? "detail" : "list"} padding="3">
          <Text>Title {viewDetail ? 2 : 1}</Text>
          <Text>Description {viewDetail ? 2 : 1}</Text>
        </Surface>
      </PageTransition>
      <ResourceState
        value={{
          view: viewDetail ? "detail" : "list",
          animated: viewAnimated,
          type: viewType,
          fallback: viewFallback,
        }}
      />
    </Stack>
  );
}
