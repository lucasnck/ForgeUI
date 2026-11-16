"use client";

import { Button, Inline, MapView, Stack, Text } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { mapLabels, schematicMapRenderer } from "./fixtures";
import { useMapViewExample } from "./useMapViewExample";

function MapViewScenario({ kind }: { kind: "preview" | "approach" | "completed" }) {
  const view = useMapViewExample(kind);

  return (
    <Stack gap="4">
      <MapView
        title="Title"
        scene={view.scene}
        renderer={schematicMapRenderer}
        labels={mapLabels}
        onRendererError={view.reportError}
        {...view.properties}
        status={view.failed ? "unavailable" : (view.properties.status ?? "ready")}
      />
      <Text>Caller-owned schematic scenario: {kind}. No location service or GPS request.</Text>
      <Inline gap="2" justify="end">
        <Button variant="outline" onClick={view.reset}>
          Reset
        </Button>
        <Button variant="outline" onClick={view.toggleFailure}>
          Toggle unavailable
        </Button>
        {kind === "approach" && <Button onClick={view.advance}>Simulate next position</Button>}
      </Inline>
      <ExampleState
        value={{ kind, step: view.step, unavailable: view.failed, onRendererError: view.errors }}
      />
    </Stack>
  );
}

export function MapViewPreviewExample() {
  return <MapViewScenario kind="preview" />;
}

export function MapViewApproachExample() {
  return <MapViewScenario kind="approach" />;
}

export function MapViewCompletedExample() {
  return <MapViewScenario kind="completed" />;
}
