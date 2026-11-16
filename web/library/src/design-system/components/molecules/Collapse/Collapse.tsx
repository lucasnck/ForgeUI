"use client";
import type {
  ComponentAnimatedProps,
  ComponentChildrenProps,
  ComponentOpenProps,
  NativeCollectionRootProps,
} from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { CollapseContext } from "../../../internal/collapse/CollapseContext";
import { CollapseHeader } from "../../atoms/CollapseHeader";
import { CollapseBody } from "../../atoms/CollapseBody";
import { CollapseFooter } from "../../atoms/CollapseFooter";
import { useCollapseView } from "./useCollapseView";
import styles from "./Collapse.module.css";
export interface CollapseProps
  extends
    NativeCollectionRootProps,
    ComponentChildrenProps,
    ComponentOpenProps,
    ComponentAnimatedProps {
  disabled?: boolean;
}

export function Collapse(input: CollapseProps) {
  const {
    props,
    children,
    className,
    animated,
    context,
    bodyRef,
    bodyProps,
    acceptedOpen,
    phase,
    onTransitionEnd,
  } = useCollapseView(input);
  const parts = collectCompoundParts(children, {
    header: CollapseHeader,
    body: CollapseBody,
    footer: CollapseFooter,
  });

  return (
    <CollapseContext value={context}>
      <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="0">
        {parts.header}
        <div
          {...bodyProps}
          ref={bodyRef}
          hidden={phase === "unmounted"}
          inert={!acceptedOpen || undefined}
          aria-hidden={!acceptedOpen || undefined}
          className={styles.panel}
          data-motion-state={phase}
          data-animated={animated}
          onTransitionEnd={onTransitionEnd}
        >
          <div className={styles.clip}>
            {parts.body}
            {parts.footer}
          </div>
        </div>
      </div>
    </CollapseContext>
  );
}
