"use client";
import { OverlayPortal, Surface, Stack, Inline, Heading, Button } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useOverlayPortalExample } from "./useOverlayPortalExample";

export function OverlayPortalExample() {
  const { triggerRef, portalRef, open, show, close, copy, properties, state } =
    useOverlayPortalExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show} disabled={open}>
        {copy.show}
      </Button>
      <ExampleState value={state} />
      {open && (
        <OverlayPortal>
          <Surface ref={portalRef} role="region" aria-label="Children" padding="4" shape="rounded">
            <Stack gap="2">
              <Heading level={3}>{properties.children ?? "Children"}</Heading>
              <Inline gap="2" align="center" justify="end">
                <Button type="button" appearance="outlined" onClick={close}>
                  {copy.close}
                </Button>
              </Inline>
            </Stack>
          </Surface>
        </OverlayPortal>
      )}
    </Stack>
  );
}
