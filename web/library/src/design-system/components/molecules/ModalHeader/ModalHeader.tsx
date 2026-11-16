"use client";
import { Heading } from "../../atoms/Heading";
import styles from "./ModalHeader.module.css";
import type { ComponentPropsWithRef, ReactNode } from "react";
export interface ModalHeaderProps extends ComponentPropsWithRef<"header"> {
  title: string;
  icon?: ReactNode;
  divider?: boolean;
}
import { useModalHeader } from "./useModalHeader";

export function ModalHeader(props: ModalHeaderProps) {
  const view = useModalHeader(props);

  return (
    <header
      {...view.props}
      className={[styles.root, view.props.className].filter(Boolean).join(" ")}
      data-divider={view.divider}
    >
      <div className={styles.title}>
        {view.icon}
        <Heading level={2} id={view.modal.titleId}>
          {view.title}
        </Heading>
      </div>
      {view.children}
    </header>
  );
}
