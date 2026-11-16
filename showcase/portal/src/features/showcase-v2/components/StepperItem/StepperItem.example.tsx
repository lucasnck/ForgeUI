"use client";
import {
  Stepper,
  StepperHeader,
  StepperBody,
  StepperItem,
  StepperPanel,
  Surface,
  Stack,
  Text,
} from "@forge-ui/web";
import { steps } from "../Stepper/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useStepperItemExample } from "./useStepperItemExample";

export function StepperItemExample() {
  const view = useStepperItemExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Stepper label="Label" value={view.value} onStepChange={view.change}>
          <StepperHeader>
            {steps.slice(0, 2).map((item) => (
              <StepperItem
                key={item.id}
                value={item.id}
                {...view.properties}
                label={(view.properties.label ?? "Label") + " " + item.index}
                statusLabel={(view.properties.statusLabel ?? "StatusLabel") + " " + item.index}
                title={(view.properties.title ?? "Title") + " " + item.index}
              />
            ))}
          </StepperHeader>
          <StepperBody>
            {steps.slice(0, 2).map((item) => (
              <StepperPanel key={item.id} value={item.id} title={item.title}>
                <Surface padding="2" shape="rounded">
                  <Text>{item.children}</Text>
                </Surface>
              </StepperPanel>
            ))}
          </StepperBody>
        </Stepper>
        <ExampleState value={view.state} />
      </Surface>
    </Stack>
  );
}
