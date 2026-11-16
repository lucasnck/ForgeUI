"use client";
import { cloneElement, Fragment, isValidElement } from "react";
import type { ReactElement } from "react";
import type {
  TooltipTriggerProps,
  ComponentOpenProps,
  ComponentAnimatedProps,
} from "../../../types";
import { useTooltip } from "./useTooltip";
import styles from "./Tooltip.module.css";
export interface TooltipProps extends ComponentOpenProps, ComponentAnimatedProps {
  content: string;
  children: ReactElement<TooltipTriggerProps>;
}

export function Tooltip(input: TooltipProps) {
  if (!isValidElement(input.children) || input.children.type === Fragment)
    throw new Error("Tooltip requires one enabled ref-forwarding trigger.");
  const {
    children,
    content,
    tooltipId,
    panelRef,
    visible,
    animated,
    focused,
    present,
    phase,
    onTransitionEnd,
    triggerProps,
    handleSurfaceEnter,
    handleSurfaceLeave,
  } = useTooltip(input);

  return (
    <span className={styles.anchor}>
      {cloneElement(children, triggerProps)}
      {present && (
        <span
          ref={panelRef}
          id={tooltipId}
          role="tooltip"
          inert={!visible || undefined}
          aria-hidden={!visible || undefined}
          data-animated={animated}
          data-motion-state={phase}
          data-motion-focus={focused || undefined}
          onTransitionEnd={onTransitionEnd}
          onMouseEnter={handleSurfaceEnter}
          onMouseLeave={handleSurfaceLeave}
          className={styles.surface}
        >
          {content}
        </span>
      )}
    </span>
  );
}
