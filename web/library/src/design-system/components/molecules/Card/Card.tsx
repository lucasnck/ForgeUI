"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { CardContext } from "../../../internal/card/CardContext";
import { CardHeader } from "../../atoms/CardHeader";
import { CardBody } from "../../atoms/CardBody";
import { CardFooter } from "../../atoms/CardFooter";
import { Surface } from "../../atoms/Surface";
import type {
  ComponentShapeProps,
  ComponentFullWidthProps,
} from "../../../types/component-capabilities";
import type { ComponentElevation } from "../../../types/layout";
import { useCard } from "./useCard";
import styles from "./Card.module.css";

export interface CardProps
  extends
    NativeSectionRootProps,
    ComponentChildrenProps,
    ComponentShapeProps,
    ComponentFullWidthProps {
  elevation?: ComponentElevation;
}

export function Card(props: CardProps) {
  const view = useCard(props);
  const parts = collectCompoundParts(
    view.children,
    { header: CardHeader, body: CardBody, footer: CardFooter },
    ["body"],
  );

  return (
    <CardContext value={{ titleId: parts.header ? view.titleId : undefined }}>
      <Surface
        as="article"
        elevation={view.elevation}
        shape={view.shape}
        data-full-width={view.fullWidth || undefined}
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        gap="0"
        aria-labelledby={parts.header ? view.titleId : undefined}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </Surface>
    </CardContext>
  );
}
