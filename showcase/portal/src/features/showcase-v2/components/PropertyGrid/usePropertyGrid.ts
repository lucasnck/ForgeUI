"use client";
import { useSyncExternalStore, useId } from "react";
import { useExampleStore } from "../ExampleScope/ExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import type { ShowcaseV2Property } from "../../model/showcase-v2.types";

export function usePropertyGrid(properties: readonly ShowcaseV2Property[]) {
  const store = useExampleStore();
  if (!store) throw Error("Properties require an example scope");
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const { copy } = useShowcaseV2Copy();
  const id = useId();
  const rows = properties.map((property) => ({
    ...property,
    editor: store.schema[property.name],
    registered: snapshot.controls.find((c) => c.label === property.name),
    value: Object.hasOwn(snapshot.overrides, property.name)
      ? snapshot.overrides[property.name]
      : Object.hasOwn(snapshot.baselines, property.name)
        ? snapshot.baselines[property.name]
        : (snapshot.controls.find((c) => c.label === property.name)?.value ??
          store.schema[property.name]?.defaultValue),
  }));

  return { rows, copy, store, id };
}
