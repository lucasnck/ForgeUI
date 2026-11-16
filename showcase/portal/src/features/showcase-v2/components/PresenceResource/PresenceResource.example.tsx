"use client";
import { Button, Card, CardBody, Inline, Stack, Text } from "@forge-ui/web";
import motionStyles from "../../../../../../../web/library/src/design-system/styles/motion-components.module.css";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { usePresenceResourceExample } from "./usePresenceResourceExample";

export function PresenceResourceExample({ compare = false }: { compare?: boolean }) {
  const {
    open,
    enabled,
    setEnabled,
    recipe,
    setRecipe,
    elementRef,
    panelId,
    presence,
    copy,
    toggle,
  } = usePresenceResourceExample(compare ? "disclosurePresence" : "surfacePresence");

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="enabled" checked={enabled} onChange={setEnabled} />
        {compare && (
          <SelectControl
            label="recipe"
            value={recipe}
            onChange={setRecipe}
            options={["surfacePresence", "disclosurePresence"]}
          />
        )}
      </ExampleControls>
      <Inline gap="2" align="center">
        <Button
          variant="outline"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={presence.present ? panelId : undefined}
        >
          {open ? copy.hide : copy.show}
        </Button>
        <ResourceState value={{ open, present: presence.present, phase: presence.phase }} />
      </Inline>
      {presence.present && (
        <div
          id={panelId}
          ref={elementRef}
          className={
            recipe === "disclosurePresence"
              ? motionStyles.disclosurePresence
              : motionStyles.surfacePresence
          }
          data-motion-state={presence.phase}
          data-animated={enabled}
          onTransitionEnd={presence.onTransitionEnd}
          aria-hidden={!open || undefined}
          inert={!open}
        >
          <div className={recipe === "disclosurePresence" ? motionStyles.clip : undefined}>
            <Card>
              <CardBody>
                <Stack gap="2">
                  <Text>Children</Text>
                </Stack>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </Stack>
  );
}

export function MotionResourceExample() {
  return <PresenceResourceExample compare />;
}
