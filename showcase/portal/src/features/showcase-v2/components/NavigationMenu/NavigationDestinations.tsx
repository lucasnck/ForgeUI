"use client";
import { Stack, Surface, Heading } from "@forge-ui/web";
import { destinations } from "./fixtures";
import type { useNavigationPreview } from "./useNavigationPreview";

export function NavigationDestinations({
  view,
  nested = false,
  sibling = false,
}: {
  view: ReturnType<typeof useNavigationPreview>;
  nested?: boolean;
  sibling?: boolean;
}) {
  return (
    <Stack gap="2">
      {destinations
        .filter((item) => (nested ? item.index > 1 && (sibling || item.index < 4) : item.index < 4))
        .map((item) => (
          <Surface key={item.id} id={view.id + "-" + item.id} padding="2" shape="rounded">
            <Heading level={3}>{item.children}</Heading>
          </Surface>
        ))}
    </Stack>
  );
}
