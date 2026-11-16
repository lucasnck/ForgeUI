"use client";
import { Stack } from "@forge-ui/web";
import { TemplateDemoProvider } from "../TemplateDemo/TemplateDemoProvider";
import { TemplateDemoList, DemoSimulation } from "../TemplateDemo/TemplateDemoPages";
import { useListPageTemplateExample } from "./useListPageTemplateExample";

function Example() {
  const demo = useListPageTemplateExample();

  return (
    <Stack gap="2">
      <DemoSimulation onReset={demo.reset} />
      <TemplateDemoList />
    </Stack>
  );
}

export function ListPageTemplateExample() {
  return (
    <TemplateDemoProvider>
      <Example />
    </TemplateDemoProvider>
  );
}
