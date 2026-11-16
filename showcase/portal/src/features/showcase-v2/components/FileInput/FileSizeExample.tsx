"use client";
import { Stack, Text } from "@forge-ui/web";
import { fileSizeRows } from "./file-size-fixtures";

export function FileSizeExample() {
  return (
    <Stack gap="2">
      {fileSizeRows.map((row) => (
        <Text as="p" key={row.id}>
          {row.bytes} B · {row.binary ? "binary" : "decimal"}: {row.formatted} · {String(row.valid)}
        </Text>
      ))}
    </Stack>
  );
}
