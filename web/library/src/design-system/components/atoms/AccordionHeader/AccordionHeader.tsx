"use client";
import type { NativeCompoundTriggerProps } from "../../../types";
import { useAccordionHeader } from "./useAccordionHeader";
import { Heading } from "../Heading";
import styles from "./AccordionHeader.module.css";
export interface AccordionHeaderProps extends NativeCompoundTriggerProps {}

export function AccordionHeader(input: AccordionHeaderProps) {
  const { level, animated, children, className, props, triggerProps, handleClick, ref } =
    useAccordionHeader(input);

  return (
    <Heading level={level}>
      <button
        {...props}
        {...triggerProps}
        ref={ref}
        type="button"
        onClick={handleClick}
        data-animated={animated}
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        {children}
      </button>
    </Heading>
  );
}
