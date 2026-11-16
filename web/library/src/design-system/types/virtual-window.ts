import type { RefObject } from "react";
import type { ComponentSize } from "./component-capabilities";

export interface VirtualWindowOptions {
  keys: readonly string[];
  size?: ComponentSize;
  overscan?: number;
  initialCount?: number;
  pinnedKey?: string;
  viewportRef: RefObject<HTMLElement | null>;
}

export interface VirtualWindowContract {
  start: number;
  end: number;
  paddingBefore: number;
  paddingAfter: number;
  scrollToIndex(index: number): void;
}
