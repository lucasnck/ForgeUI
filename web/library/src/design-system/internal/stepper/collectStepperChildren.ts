import { Children, Fragment, isValidElement } from "react";
import type { ElementType, ReactElement, ReactNode } from "react";

export function collectStepperChildren<Props>(
  children: ReactNode,
  Constructor: ElementType,
  owner: string,
): ReactElement<Props>[] {
  const items: ReactElement<Props>[] = [];
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;

    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment &&
      child.key !== null
    ) {
      items.push(...collectStepperChildren<Props>(child.props.children, Constructor, owner));
      return;
    }

    if (!isValidElement<Props>(child) || child.type !== Constructor)
      throw new Error(owner + " accepts only its declared public children and keyed fragments.");
    items.push(child);
  });
  return items;
}
