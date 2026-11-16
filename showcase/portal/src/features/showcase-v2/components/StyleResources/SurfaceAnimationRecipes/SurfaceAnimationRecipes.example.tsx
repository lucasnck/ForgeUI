"use client";
import { Stack, Button, Surface, Text } from "@forge-ui/web";
import effects from "../../../../../../../../web/library/src/design-system/styles/animations/surface-animations.module.css";
import { ExampleControls, SelectControl, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import { useSurfaceAnimationRecipesExample } from "./useSurfaceAnimationRecipesExample";

export function SurfaceAnimationRecipesExample() {
  const { elementRef, open, animated, setAnimated, effect, setEffect, presence, toggle, copy } =
    useSurfaceAnimationRecipesExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="animationEffect"
          value={effect}
          options={["none", "fade", "scale"]}
          onChange={setEffect}
        />
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
      </ExampleControls>
      <div>
        <Button onClick={toggle}>{open ? copy.close : copy.show}</Button>
      </div>
      {presence.present && (
        <div
          ref={elementRef}
          role="region"
          aria-label="Label"
          className={effects[effect]}
          data-motion-state={presence.phase}
          data-animated={animated}
          onTransitionEnd={presence.onTransitionEnd}
          inert={!open}
          aria-hidden={!open}
        >
          <Surface padding="3">
            <Text>Children</Text>
          </Surface>
        </div>
      )}
      <ResourceState
        value={{
          open,
          present: presence.present,
          phase: presence.phase,
          effect,
        }}
      />
    </Stack>
  );
}
