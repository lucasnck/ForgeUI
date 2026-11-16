"use client";

import type { ComponentPropsWithRef } from "react";
import { useCardBody } from "./useCardBody";
import styles from "./CardBody.module.css";

export interface CardBodyProps extends ComponentPropsWithRef<"div"> {}

export function CardBody(props: CardBodyProps) {
  const view = useCardBody(props);

  return (
    <div {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children}
    </div>
  );
}
