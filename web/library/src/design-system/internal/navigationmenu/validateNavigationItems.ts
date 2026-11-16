import { Children, Fragment, isValidElement } from "react";
import type { ElementType, ReactNode } from "react";

export function validateNavigationItems(children: ReactNode, Item: ElementType): void {
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;

    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment &&
      child.key !== null
    ) {
      validateNavigationItems(child.props.children, Item);
      return;
    }

    if (!isValidElement(child) || child.type !== Item)
      throw new Error(
        "Navigation lists accept only NavigationMenuItem children and keyed fragments.",
      );
  });
}
