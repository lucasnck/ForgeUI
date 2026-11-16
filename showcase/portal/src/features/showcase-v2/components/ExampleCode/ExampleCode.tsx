"use client";
import { Textarea } from "@forge-ui/web";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function ExampleCode({ code, title }: { code: string; title: string }) {
  const { copy } = useShowcaseV2Copy();

  return (
    <Textarea
      aria-label={`${copy.exampleCode}: ${title}`}
      value={code}
      readOnly
      rows={Math.min(16, Math.max(3, code.split("\n").length))}
      fullWidth
      spellCheck={false}
    />
  );
}
