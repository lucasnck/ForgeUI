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
import { useStepperPanelExample } from "./useStepperPanelExample";

export function StepperPanelExample() {
  const view = useStepperPanelExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Stepper label="Label" value={view.value} onStepChange={view.change}>
          <StepperHeader>
            {steps.slice(0, 2).map((item) => (
              <StepperItem key={item.id} value={item.id} label={item.label} />
            ))}
          </StepperHeader>
          <StepperBody>
            {steps.slice(0, 2).map((item) => (
              <StepperPanel
                key={item.id}
                value={item.id}
                title={(view.properties.title ?? "Title") + " " + item.index}
              >
                <Surface padding="2" shape="rounded">
                  <Text>{String(view.properties.children ?? "Children") + " " + item.index}</Text>
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
