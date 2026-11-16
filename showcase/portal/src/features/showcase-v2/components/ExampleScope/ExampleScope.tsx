"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ShowcaseV2Property } from "../../model/showcase-v2.types";
import { createExampleStore, type PropertySchema } from "./example-store";
const ExampleContext = createContext<ReturnType<typeof createExampleStore> | null>(null);

export function ExampleScope({
  name,
  schema,
  properties,
  children,
}: {
  name: string;
  schema: PropertySchema;
  properties: readonly ShowcaseV2Property[];
  children: ReactNode;
}) {
  const [store] = useState(() => createExampleStore(name, schema, properties));

  return <ExampleContext value={store}>{children}</ExampleContext>;
}

export function useExampleStore() {
  return useContext(ExampleContext);
}
