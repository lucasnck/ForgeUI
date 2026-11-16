"use client";
import { ViewTransition, type ComponentPropsWithRef, type ReactNode } from "react";
import type { ComponentAnimatedProps } from "../../../types/animation";
import type { SharedElementName } from "../../../types/page-transitions";
import { pageTransitionClasses } from "../../../types/page-transitions";
import styles from "../../../styles/animations/shared-element-transitions.module.css";
export interface SharedElementProps extends ComponentPropsWithRef<"span">, ComponentAnimatedProps {
  name: SharedElementName;
  children: ReactNode;
}

export function SharedElement({
  name,
  animated = true,
  className,
  children,
  ...props
}: SharedElementProps) {
  if (!name.trim()) throw new Error("SharedElement requires a nonempty name.");
  return (
    <ViewTransition
      name={name}
      share={animated ? pageTransitionClasses.shared : "none"}
      default="none"
    >
      <span {...props} className={[styles.participant, className].filter(Boolean).join(" ")}>
        {children}
      </span>
    </ViewTransition>
  );
}
