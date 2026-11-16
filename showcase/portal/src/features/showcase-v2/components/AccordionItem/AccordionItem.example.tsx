"use client";
import type { ComponentProps as ShowcaseAccordionItemProps } from "react";
import { useExampleProperties as useAccordionItemExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Icon,
  Text,
  AccordionFooter,
  Inline,
  Button,
  Surface,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, SelectControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useAccordionItemExample } from "./useAccordionItemExample";

export function AccordionItemExample() {
  const { properties: accordionItemProperties } = useAccordionItemPropertyBindings();

  const {
    value,
    animated,
    setAnimated,
    level,
    change,
    calls,
    items,
    multiple,
    changeMultiple,
    collapsible,
    setCollapsible,
    disabled,
    setDisabled,
    disableSecond,
    setDisableSecond,
    changeLevel,
    icon,
    setIcon,
    copy,
    saved,
    cancelled,
    lastItem,
  } = useAccordionItemExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
        <ToggleControl label="multiple" checked={multiple} onChange={changeMultiple} />
        <ToggleControl label="collapsible" checked={collapsible} onChange={setCollapsible} />
        <ToggleControl label="disabled" checked={disabled} onChange={setDisabled} />
        <ToggleControl
          label="disabled item 2"
          checked={disableSecond}
          onChange={setDisableSecond}
        />
        <SelectControl
          label="level"
          value={String(level)}
          onChange={changeLevel}
          options={["2", "3", "4"]}
        />
        <ToggleControl label="icon" checked={icon} onChange={setIcon} />
      </ExampleControls>
      <Surface padding="2" shape="rounded">
        <Accordion
          level={level}
          value={value}
          onValueChange={change}
          animated={animated}
          multiple={multiple}
          collapsible={collapsible}
          disabled={disabled}
        >
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              disabled={item.index === 2 && disableSecond}
              {...accordionItemProperties}
            >
              <AccordionHeader>
                <Inline as="span" gap="2" align="center" wrap={false}>
                  {icon && <Icon name="info" size="inherit" />}
                  <Text as="span">{item.children}</Text>
                </Inline>
              </AccordionHeader>
              <AccordionBody>
                <Surface elevation="flat" padding="4">
                  <Text>{item.children}</Text>
                </Surface>
              </AccordionBody>
              <AccordionFooter>
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

function useAccordionItemPropertyBindings() {
  return useAccordionItemExampleProperties<
    Pick<ShowcaseAccordionItemProps<typeof AccordionItem>, "disabled" | "title">
  >("AccordionItem");
}
