"use client";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Inline, Stack, VisuallyHidden, useCollapse } from "@forge-ui/web";
import type { ShowcaseV2Example } from "../../model/showcase-v2.types";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { useExampleStore } from "../ExampleScope/ExampleScope";
import { useExampleCode } from "../ExampleCode/useExampleCode";
import { ExampleCode } from "../ExampleCode/ExampleCode";
import { formatDartForDisplay } from "../ExampleCode/format-dart-for-display.mjs";
import { ExampleBoundary } from "../ExampleState/ExampleBoundary";

/** Original Showcase V2 Card composition and the original useCollapse + ExampleBoundary contracts. */
export function ExamplePreview({ example }: { example: ShowcaseV2Example }) {
  const { copy } = useShowcaseV2Copy();
  const store = useExampleStore();
  const [revision, setRevision] = useState(0);
  const collapse = useCollapse({ defaultOpen: true, id: `${example.id}-preview-toggle` });
  const overrides = useSyncExternalStore(store?.subscribe ?? noSubscribe, store?.getOverrides ?? emptySnapshot, store?.getServerOverrides ?? emptySnapshot);
  const rawCode = example.getCode?.(overrides) ?? example.code;
  const code = useMemo(() => formatDartForDisplay(rawCode), [rawCode]);
  const clipboard = useExampleCode(code);
  const { Component } = example;
  function reset() {
    store?.clear();
    setRevision(value => value + 1);
    clipboard.reset();
  }
  return (
    <Card fullWidth id={`${example.id}-dynamic-examples`}>
      <CardHeader>
        <Inline gap="2" align="center" justify="between">
          <Heading level={3} size="md">{example.title}</Heading>
          <Inline gap="2" align="center">
            <Button size="sm" tone="neutral" variant="ghost" type="button" ref={collapse.triggerRef} {...collapse.triggerProps} onClick={collapse.toggle}>
              {copy.example}
            </Button>
            <Button size="sm" tone="neutral" variant="outline" type="button" onClick={reset}>{copy.reset}</Button>
            <Button size="sm" tone="neutral" variant="outline" type="button" onClick={clipboard.copyCode} disabled={clipboard.status === "copying"}>{copy.copyCode}</Button>
          </Inline>
        </Inline>
        <VisuallyHidden role="status" aria-live="polite">{clipboard.status === "copied" ? copy.codeCopied : clipboard.status === "error" ? copy.codeCopyError : ""}</VisuallyHidden>
      </CardHeader>
      <CardBody {...collapse.bodyProps} ref={collapse.bodyRef}>
        <ExampleBoundary><Stack gap="2"><Component key={revision}/></Stack></ExampleBoundary>
      </CardBody>
      <CardFooter>
        <ExampleCode code={code} title={example.title}/>
      </CardFooter>
    </Card>
  );
}
const empty = Object.freeze({});
const emptySnapshot = () => empty;
const noSubscribe = () => () => {};
