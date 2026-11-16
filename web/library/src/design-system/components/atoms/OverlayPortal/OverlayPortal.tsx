"use client";

import { createPortal } from "react-dom";
import type { ComponentChildrenProps } from "../../../types";
import { useOverlayPortal } from "./useOverlayPortal";

export interface OverlayPortalProps extends ComponentChildrenProps {}

export function OverlayPortal(props: OverlayPortalProps) {
  const { container } = useOverlayPortal();

  return container ? createPortal(props.children, container) : null;
}
