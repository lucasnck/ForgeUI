"use client";
import { Stack, Text, validators } from "@forge-ui/web";
import { durationRows } from "./duration-fixtures";

export function DurationTextExample() {
  return (
    <Stack gap="2">
      {durationRows.map((row) => (
        <Text as="p" key={row.id}>
          {row.seconds} s · {row.locale}: {row.clock} · {row.localized}
        </Text>
      ))}
      <Text as="p">
        validators.duration: 0={String(validators.duration(0))} · -1=
        {String(validators.duration(-1))} · 1.5=
        {String(validators.duration(1.5))}
      </Text>
    </Stack>
  );
}
