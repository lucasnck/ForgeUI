"use client";

import { Collapse } from "../Collapse";
import type { CollapseProps } from "../Collapse";
import { CollapseHeader } from "../../atoms/CollapseHeader";
import { CollapseBody } from "../../atoms/CollapseBody";

export interface DisclosureProps extends CollapseProps {
  label: string;
}

export function Disclosure({ children, label, ...props }: DisclosureProps) {
  if (!label.trim()) throw new Error("Disclosure requires a nonempty visible label.");
  return (
    <Collapse {...props}>
      <CollapseHeader>{label}</CollapseHeader>
      <CollapseBody>{children}</CollapseBody>
    </Collapse>
  );
}
