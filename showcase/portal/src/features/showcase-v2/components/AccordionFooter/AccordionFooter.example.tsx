"use client";
import type { ComponentProps as ShowcaseAccordionFooterProps } from "react";
import { useExampleProperties as useAccordionFooterExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  AccordionFooter,
  Inline,
  Button,
  Surface,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";

import { useAccordionFooterExample } from "./useAccordionFooterExample";

export function AccordionFooterExample() {
  const { properties: accordionFooterProperties } = useAccordionFooterPropertyBindings();

  const {
    value,
    animated,
    setAnimated,
    level,
    change,
    calls,
    items,
    copy,
    saved,
    cancelled,
    lastItem,
  } = useAccordionFooterExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
      </ExampleControls>
      <Surface padding="2" shape="rounded">
        <Accordion level={level} value={value} onValueChange={change} animated={animated}>
          {items.slice(0, 1).map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionHeader hidden>{item.children}</AccordionHeader>
              <AccordionBody hidden />
              <AccordionFooter {...accordionFooterProperties}>
                <Inline gap="2" padding="4" justify="end">
                  <Button variant="outline" onClick={item.cancel}>
                    {copy.cancel}
                  </Button>
                  <Button onClick={item.save}>{copy.save}</Button>
                </Inline>
              </AccordionFooter>
            </AccordionItem>
          ))}
        </Accordion>
      </Surface>
      <ResourceState value={{ value, calls, saved, cancelled, lastItem }} />
    </Stack>
  );
}

function useAccordionFooterPropertyBindings() {
  return useAccordionFooterExampleProperties<
    Pick<ShowcaseAccordionFooterProps<typeof AccordionFooter>, "title">
  >("AccordionFooter");
}
