"use client";
import { Component, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Alert, AlertBody, Text } from "@forge-ui/web";
import { useExampleStore } from "../ExampleScope/ExampleScope";
interface BoundaryProps {
  version: Readonly<Record<string, unknown>>;
  children: ReactNode;
}
class RenderBoundary extends Component<BoundaryProps, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidUpdate(previous: BoundaryProps) {
    if (this.state.error && previous.version !== this.props.version) this.setState({ error: null });
  }
  render() {
    return this.state.error ? (
      <Alert announcement="assertive"><AlertBody><Text as="p">{this.state.error.message}</Text></AlertBody></Alert>
    ) : (
      this.props.children
    );
  }
}

function useExampleBoundary() {
  const store = useExampleStore();
  if (!store) throw Error("Example requires a scope");
  return useSyncExternalStore(store.subscribe, store.getOverrides, store.getServerOverrides);
}

export function ExampleBoundary({ children }: { children: ReactNode }) {
  const version = useExampleBoundary();

  return <RenderBoundary version={version}>{children}</RenderBoundary>;
}
