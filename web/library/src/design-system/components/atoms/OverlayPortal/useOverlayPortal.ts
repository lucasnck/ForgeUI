"use client";

import { useState, useSyncExternalStore } from "react";

function createPortalStore() {
  let container: HTMLElement | null = null;

  return {
    getSnapshot: () => container,
    getServerSnapshot: () => null,
    subscribe(notify: () => void) {
      container = document.body;
      notify();

      return () => {};
    },
  };
}

export function useOverlayPortal() {
  const [store] = useState(createPortalStore);
  const container = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return { container };
}
