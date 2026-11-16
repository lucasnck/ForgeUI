"use client";
import { ViewTransition, type ComponentPropsWithRef, type ReactNode } from "react";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { pageTransitionTypes, pageTransitionClasses } from "../../../types/page-transitions";
import styles from "../../../styles/animations/page-transitions.module.css";
export interface PageTransitionProps extends ComponentPropsWithRef<"div">, ComponentAnimatedProps {
  children: ReactNode;
}
const transitionClasses = {
  [pageTransitionTypes.forward]: pageTransitionClasses.forward,
  [pageTransitionTypes.back]: pageTransitionClasses.back,
  [pageTransitionTypes.replace]: pageTransitionClasses.replace,
  [pageTransitionTypes.reveal]: pageTransitionClasses.reveal,
  default: "none",
};

export function PageTransition({
  children,
  animated = true,
  className,
  ...props
}: PageTransitionProps) {
  return (
    <ViewTransition
      enter={animated ? transitionClasses : "none"}
      exit={animated ? transitionClasses : "none"}
      default="none"
    >
      <div {...props} className={[styles.boundary, className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </ViewTransition>
  );
}
