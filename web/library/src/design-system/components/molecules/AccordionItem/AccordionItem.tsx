"use client";
import type { ComponentChildrenProps, NativeCollectionRootProps } from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { AccordionItemContext } from "../../../internal/accordion/AccordionItemContext";
import { AccordionHeader } from "../../atoms/AccordionHeader";
import { AccordionBody } from "../../atoms/AccordionBody";
import { AccordionFooter } from "../../atoms/AccordionFooter";
import { useAccordionItem } from "./useAccordionItem";
import styles from "./AccordionItem.module.css";
export interface AccordionItemProps extends NativeCollectionRootProps, ComponentChildrenProps {
  value: string;
  disabled?: boolean;
}

export function AccordionItem(input: AccordionItemProps) {
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
  } = useAccordionItem(input);
  const parts = collectCompoundParts(children, {
    header: AccordionHeader,
    body: AccordionBody,
    footer: AccordionFooter,
  });

  return (
    <AccordionItemContext value={context}>
      <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="2">
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
    </AccordionItemContext>
  );
}
