"use client";
import { Stack, Text } from "@forge-ui/web";
import { relativeRows } from "./formatting-fixtures";

export function RelativeTimeTextExample() {
  return (
    <Stack gap="2">
      {relativeRows.map((row) => (
        <Text as="p" key={row.id}>
          {row.offset} ms · {row.formatted} · {String(row.valid)}
        </Text>
      ))}
    </Stack>
  );
}
