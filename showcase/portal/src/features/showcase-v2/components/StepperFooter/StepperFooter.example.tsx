"use client";
import {
  Stepper,
  StepperHeader,
  StepperBody,
  StepperFooter,
  StepperItem,
  StepperPanel,
  Surface,
  Stack,
  Inline,
  Button,
  Text,
} from "@forge-ui/web";
import { steps } from "../Stepper/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useStepperFooterExample } from "./useStepperFooterExample";

export function StepperFooterExample() {
  const view = useStepperFooterExample();

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
              <StepperPanel key={item.id} value={item.id} title={item.title}>
                <Surface padding="2" shape="rounded">
                  <Text>{item.children}</Text>
                </Surface>
              </StepperPanel>
            ))}
          </StepperBody>
          <StepperFooter title="Title" {...view.properties}>
            <Stack gap="2">
              <Text>{view.properties.children ?? "Children"}</Text>
              <Inline gap="2" align="center" justify="end">
                <Button
                  type="button"
                  appearance="outlined"
                  disabled={view.index === 0}
                  onClick={view.previous}
                >
                  {view.copy.back}
                </Button>
                <Button type="button" disabled={view.index === 1} onClick={view.next}>
                  {view.copy.next}
                </Button>
              </Inline>
            </Stack>
          </StepperFooter>
        </Stepper>
        <ExampleState value={view.state} />
      </Surface>
    </Stack>
  );
}
