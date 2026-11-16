"use client";
import type { ComponentProps as ShowcaseCardFooterProps } from "react";
import { useExampleProperties as useCardFooterExampleProperties } from "../ExampleScope/useExampleScope";
import { Card, CardBody, CardFooter, Button, Inline } from "@forge-ui/web";
import { EventFeedback } from "../ExampleControls";
import { useCardFooterExample } from "./useCardFooterExample";

export function CardFooterExample() {
  const { properties: cardFooterProperties } = useCardFooterPropertyBindings();

  const view = useCardFooterExample();

  return (
    <>
      <Card fullWidth>
        <CardBody hidden />
        <CardFooter {...cardFooterProperties}>
          <Inline gap="2" align="center" justify="end" role="group" aria-label={view.copy.actions}>
            <Button variant="outline" tone="neutral" onClick={view.onCancel}>
              {view.copy.cancel}
            </Button>
            <Button onClick={view.onSave}>{view.copy.save}</Button>
          </Inline>
        </CardFooter>
      </Card>
      <EventFeedback>
        onCancel: {view.cancelCount}; onSave: {view.saveCount}
      </EventFeedback>
    </>
  );
}

function useCardFooterPropertyBindings() {
  return useCardFooterExampleProperties<Pick<ShowcaseCardFooterProps<typeof CardFooter>, "title">>(
    "CardFooter",
  );
}
