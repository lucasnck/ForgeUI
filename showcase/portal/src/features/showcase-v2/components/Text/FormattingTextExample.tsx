"use client";
import { Stack, Text } from "@forge-ui/web";
import { namespaceRows } from "./formatting-fixtures";

export function FormattingTextExample() {
  return (
    <Stack gap="2">
      {namespaceRows.map((row) => (
        <Text as="p" key={row.id}>
          {row.id}: {row.formatted} · {String(row.valid)}
        </Text>
      ))}
    </Stack>
  );
}
