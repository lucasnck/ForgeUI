"use client";
import { useExamplePropertySnapshot as useCardExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseCardProps } from "react";
import { useExampleProperties as useCardExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Inline,
  Icon,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl, EventFeedback } from "../ExampleControls";
import { useCardExample } from "./useCardExample";

function CardScenario({ bodyOnly = false }: { bodyOnly?: boolean }) {
  const { properties: cardProperties } = useCardPropertyBindings();

  const view = useCardExample(bodyOnly);
  useCardPropertySnapshot({
    elevation: view.elevation,
    shape: view.resolvedShape,
    fullWidth: view.fullWidth,
  });
  return (
    <>
      <ExampleControls>
        <SelectControl
          label="elevation"
          value={view.elevation}
          options={["flat", "raised", "floating"]}
          onChange={view.changeElevation}
        />
        <SelectControl
          label="shape"
          value={view.shape}
          options={["inherited", "square", "rounded", "pill"]}
          onChange={view.setShape}
        />
        <ToggleControl label="fullWidth" checked={view.fullWidth} onChange={view.setFullWidth} />
        <ToggleControl label="CardHeader" checked={view.header} onChange={view.setHeader} />
        <ToggleControl label="CardFooter" checked={view.footer} onChange={view.setFooter} />
      </ExampleControls>
      <Card
        elevation={view.elevation}
        shape={view.resolvedShape}
        fullWidth={view.fullWidth}
        {...cardProperties}
      >
        {view.header && (
          <CardHeader>
            <Inline gap="2" align="center" wrap={false}>
              <Icon name="info" size="inherit" />
              <Heading level={4}>Children</Heading>
            </Inline>
          </CardHeader>
        )}
        <CardBody>
          <Text>Children</Text>
        </CardBody>
        {view.footer && (
          <CardFooter>
            <Inline
              gap="2"
              align="center"
              justify="end"
              role="group"
              aria-label={view.copy.actions}
            >
              <Button variant="outline" tone="neutral" onClick={view.onCancel}>
                {view.copy.cancel}
              </Button>
              <Button onClick={view.onSave}>{view.copy.save}</Button>
            </Inline>
          </CardFooter>
        )}
      </Card>
      <EventFeedback>
        onCancel: {view.cancelCount}; onSave: {view.saveCount}
      </EventFeedback>
    </>
  );
}

export function CardExample() {
  return <CardScenario />;
}

export function CardBodyOnlyExample() {
  return <CardScenario bodyOnly />;
}

function useCardPropertyBindings() {
  return useCardExampleProperties<
    Pick<ShowcaseCardProps<typeof Card>, "elevation" | "shape" | "fullWidth" | "title">
  >("Card");
}

function useCardPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useCardExamplePropertySnapshot("Card", values);
}
