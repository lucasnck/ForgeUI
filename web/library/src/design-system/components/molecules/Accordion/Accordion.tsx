"use client";
import { Children, Fragment, isValidElement } from "react";
import type { ReactNode } from "react";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
  ComponentDisclosureGroupProps,
  ComponentHeadingLevelProps,
  ComponentAnimatedProps,
} from "../../../types";
import { AccordionContext } from "../../../internal/accordion/AccordionContext";
import { AccordionItem } from "../AccordionItem";
import { useAccordionView } from "./useAccordionView";
import styles from "./Accordion.module.css";
export interface AccordionProps
  extends
    NativeCollectionRootProps,
    ComponentChildrenProps,
    ComponentDisclosureGroupProps,
    ComponentHeadingLevelProps,
    ComponentAnimatedProps {}

function validateItems(children: ReactNode, identities = new Set<string>()) {
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement<{ value: string; children?: ReactNode }>(child))
      throw new Error("Invalid Accordion child.");

    if (child.type === Fragment && child.key !== null) {
      validateItems(child.props.children, identities);
      return;
    }

    if (child.type !== AccordionItem)
      throw new Error("Accordion accepts direct AccordionItem components.");
    if (!child.props.value.trim() || identities.has(child.props.value))
      throw new Error("Accordion item values must be nonempty and unique.");
    identities.add(child.props.value);
  });
}

export function Accordion(input: AccordionProps) {
  const { props, children, className, context } = useAccordionView(input);
  validateItems(children);
  return (
    <AccordionContext value={context}>
      <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="2">
        {children}
      </div>
    </AccordionContext>
  );
}
