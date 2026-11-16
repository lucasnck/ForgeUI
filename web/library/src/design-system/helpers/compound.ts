import { Children, Fragment, isValidElement } from "react";
import type { ReactNode } from "react";
import type {
  CompoundConstructors,
  CompoundParts,
  CompoundRegion,
} from "../types/compound-composition";

export function collectCompoundParts(
  children: ReactNode,
  constructors: CompoundConstructors,
  required: readonly CompoundRegion[] = ["header", "body"],
): CompoundParts {
  const parts: CompoundParts = {};
  const regions: readonly CompoundRegion[] = ["header", "body", "footer"];

  function visit(nodes: ReactNode): void {
    Children.forEach(nodes, (child) => {
      if (child === null || child === undefined || typeof child === "boolean") {
        return;
      }

      if (!isValidElement<{ children?: ReactNode }>(child)) {
        throw new Error("Invalid compound child");
      }

      if (child.type === Fragment && child.key !== null) {
        visit(child.props.children);
        return;
      }

      const region = regions.find((name) => child.type === constructors[name]);
      if (!region) throw new Error("Unknown compound region");
      if (parts[region]) throw new Error("Duplicate compound region: " + region);
      parts[region] = child;
    });
  }

  visit(children);

  for (const region of required) {
    if (!parts[region]) throw new Error("Missing compound region: " + region);
  }

  return parts;
}
