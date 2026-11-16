"use client";
import { useSyncExternalStore, useId, useLayoutEffect } from "react";
import type { RegisteredControl } from "./example-store";
import { useExampleStore } from "./ExampleScope";
const empty = Object.freeze({});

const noSubscribe = () => () => {};

const getEmpty = () => empty;

export function useExampleProperties<Props extends object>(componentName: string) {
  const store = useExampleStore();
  const active = store?.componentName === componentName ? store : null;
  const properties = useSyncExternalStore(
    active?.subscribe ?? noSubscribe,
    active?.getOverrides ?? getEmpty,
    active?.getServerOverrides ?? getEmpty,
  ) as Partial<Props>;

  function bindChange<Args extends unknown[], Result>(
    name: string,
    handler: (...args: Args) => Result,
  ) {
    return (...args: Args): Result => {
      const first: unknown = args[0];
      let value: unknown = first;

      if (first && typeof first === "object" && "target" in first) {
        const target = first.target;

        if (target && typeof target === "object") {
          if (name === "checked" && "checked" in target) value = target.checked;
          else if ("value" in target) value = target.value;
        }
      }

      if (active?.schema[name]?.kind === "number" && typeof value === "string")
        value = Number(value);
      active?.sync(name, value);
      return handler(...args);
    };
  }

  return { properties, bindChange };
}

export function useRegisteredControl(
  control: Omit<RegisteredControl, "id">,
  onChange: (value: string | boolean) => void,
) {
  const store = useExampleStore();
  const id = useId();
  useLayoutEffect(() => {
    store?.register({ ...control, id }, onChange);
  });
  useLayoutEffect(
    () => () => {
      store?.unregister(id);
    },
    [store, id],
  );
  return store !== null;
}

export function useExamplePropertySnapshot(
  componentName: string,
  values: Readonly<Record<string, unknown>>,
) {
  const store = useExampleStore();
  useLayoutEffect(() => {
    if (store?.componentName === componentName) store.setBaselines(values);
  });
}
