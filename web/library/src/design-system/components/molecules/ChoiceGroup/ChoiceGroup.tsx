"use client";

import type {
  NativeChoiceGroupProps,
  ComponentChildrenProps,
} from "../../../types/compound-composition";
import type { ComponentInvalidProps } from "../../../types/component-capabilities";
import type { ComponentSpaceProps } from "../../../types/layout";
import { ChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { Legend } from "../Legend";
import { ChoiceGroupHeader } from "../../atoms/ChoiceGroupHeader";
import { ChoiceGroupBody } from "../../atoms/ChoiceGroupBody";
import { ChoiceGroupFooter } from "../../atoms/ChoiceGroupFooter";
import { useChoiceGroup } from "./useChoiceGroup";
import styles from "./ChoiceGroup.module.css";

export interface ChoiceGroupProps
  extends
    NativeChoiceGroupProps,
    ComponentChildrenProps,
    ComponentInvalidProps,
    ComponentSpaceProps {
  legend?: string;
}

export function ChoiceGroup(input: ChoiceGroupProps) {
  const { legend, invalid, gap, padding, children, props, footerId, legendId, className } =
    useChoiceGroup(input);
  const regions = collectCompoundParts(
    children,
    { header: ChoiceGroupHeader, body: ChoiceGroupBody, footer: ChoiceGroupFooter },
    legend ? ["body"] : ["header", "body"],
  );
  if (legend && regions.header) throw new Error("ChoiceGroup accepts one legend source");
  const describedBy =
    [
      ...new Set([
        ...(props["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []),
        ...(regions.footer ? [footerId] : []),
      ]),
    ].join(" ") || undefined;

  return (
    <ChoiceGroupContext value={{ describedBy, invalid, footerId, legendId }}>
      <fieldset
        {...props}
        aria-invalid={invalid ?? props["aria-invalid"]}
        aria-describedby={describedBy}
        data-gap={gap}
        data-padding={padding}
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        {legend ? <Legend id={legendId}>{legend}</Legend> : regions.header}
        {regions.body}
        {regions.footer}
      </fieldset>
    </ChoiceGroupContext>
  );
}
