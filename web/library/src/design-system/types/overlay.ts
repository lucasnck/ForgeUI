import type { Ref, HTMLAttributes, RefObject, ReactNode } from "react";

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export interface OverlayLayerOptions {
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  onEscape(): void;
  onOutside(): void;
  nativeModal?: boolean;
  lockScroll?: boolean;
}

export interface OverlayLayerContract {
  registerBranch(element: HTMLElement): () => void;
  restoreTriggerFocus(): void;
}

export interface OverlayPortalProps {
  children: ReactNode;
}
