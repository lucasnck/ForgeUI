"use client";
import { Stack, Inline, Icon, Text, iconData } from "@forge-ui/web";
import { iconNames } from "./fixtures";

export function IconGeometryExample() {
  return (
    <Stack gap="2">
      {iconNames.map((name, index) => (
        <Inline key={name} gap="2" align="center">
          <Icon name={name} />
          <Text>
            {"Label " + (index + 1)}: {iconData[name].drawing} · {iconData[name].viewBox}
          </Text>
        </Inline>
      ))}
    </Stack>
  );
}
