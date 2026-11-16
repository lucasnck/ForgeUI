"use client";
import { Stack } from "@forge-ui/web";
import { TemplateDemoProvider } from "../TemplateDemo/TemplateDemoProvider";
import { TemplateDemoForm, DemoSimulation } from "../TemplateDemo/TemplateDemoPages";
import { useFormPageTemplateExample } from "./useFormPageTemplateExample";

function Example({ edit = false }: { edit?: boolean }) {
  const demo = useFormPageTemplateExample();

  return (
    <Stack gap="2">
      <DemoSimulation onReset={demo.reset} />
      <TemplateDemoForm preview id={edit ? "item-1" : undefined} />
    </Stack>
  );
}

export function FormPageTemplateExample() {
  return (
    <TemplateDemoProvider>
      <Example />
    </TemplateDemoProvider>
  );
}

export function FormPageTemplateEditExample() {
  return (
    <TemplateDemoProvider>
      <Example edit />
    </TemplateDemoProvider>
  );
}
