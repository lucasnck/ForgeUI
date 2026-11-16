"use client";
import {
  Stepper,
  StepperHeader,
  StepperBody,
  StepperFooter,
  StepperItem,
  StepperPanel,
  Stack,
  Inline,
  Surface,
  Button,
  Text,
  Heading,
  Input,
  Label,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { steps } from "./fixtures";
import { useStepperExample } from "./useStepperExample";

function StepperScenario({ review = false }: { review?: boolean }) {
  const view = useStepperExample(review);

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Stepper
          label="Label"
          title="Title"
          {...view.properties}
          value={view.value}
          onStepChange={view.change}
        >
          <StepperHeader>
            {steps.map((item) => (
              <StepperItem
                key={item.id}
                value={item.id}
                label={item.label}
                status={item.index - 1 < view.index ? "complete" : "pending"}
                statusLabel={"StatusLabel " + item.index}
              />
            ))}
          </StepperHeader>
          <StepperBody>
            {steps.map((item) => (
              <StepperPanel key={item.id} value={item.id} title={item.title}>
                <Surface padding="2" shape="rounded">
                  <Stack gap="2">
                    <Heading level={3}>{item.title}</Heading>
                    {review && item.index < 3 ? (
                      <>
                        <Label htmlFor={view.id + item.id}>{item.label}</Label>
                        <Input
                          id={view.id + item.id}
                          placeholder={"Placeholder " + item.index}
                          value={view.drafts[item.index - 1]}
                          onChange={view.draftChange(item.index - 1)}
                        />
                      </>
                    ) : review ? (
                      <Stack gap="2">
                        {steps.slice(0, 2).map((field) => (
                          <Inline key={field.id} gap="2" align="center">
                            <Text>{field.label + ": " + view.drafts[field.index - 1]}</Text>
                            <Button
                              type="button"
                              appearance="outlined"
                              onClick={view.reviewStep(field.id)}
                            >
                              {view.copy.review + " " + field.index}
                            </Button>
                          </Inline>
                        ))}
                      </Stack>
                    ) : (
                      <Text>{item.children}</Text>
                    )}
                  </Stack>
                </Surface>
              </StepperPanel>
            ))}
          </StepperBody>
          <StepperFooter>
            <Inline gap="2" justify="end" align="center">
              <Button
                type="button"
                appearance="outlined"
                disabled={view.index === 0}
                onClick={view.previous}
              >
                {view.copy.back}
              </Button>
              <Button type="button" disabled={view.index === steps.length - 1} onClick={view.next}>
                {view.copy.next}
              </Button>
            </Inline>
          </StepperFooter>
        </Stepper>
        {view.error && <Text role="alert">{view.copy.required}</Text>}
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function StepperExample() {
  return <StepperScenario />;
}

export function StepperReviewExample() {
  return <StepperScenario review />;
}
