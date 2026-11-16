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
import { useStepperBodyExample } from "./useStepperBodyExample";

export function StepperBodyExample() {
  const view = useStepperBodyExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Stepper label="Label" value={view.value} onStepChange={view.change}>
          <StepperHeader>
            {steps.slice(0, 2).map((item) => (
              <StepperItem key={item.id} value={item.id} label={item.label} />
            ))}
          </StepperHeader>
          <StepperBody title="Title" {...view.properties}>
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
