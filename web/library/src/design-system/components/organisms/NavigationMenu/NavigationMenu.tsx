"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { NavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import { NavigationMenuHeader } from "../../atoms/NavigationMenuHeader";
import { NavigationMenuBody } from "../../atoms/NavigationMenuBody";
import { NavigationMenuFooter } from "../../atoms/NavigationMenuFooter";
import { NavigationMenuItem } from "../../molecules/NavigationMenuItem";
import styles from "./NavigationMenu.module.css";

export interface NavigationMenuProps extends NativeSectionRootProps, ComponentChildrenProps {
  label: string;
}

export function NavigationMenu({ label, children, className, ...props }: NavigationMenuProps) {
  if (!label.trim()) throw new Error("NavigationMenu requires a nonempty localized name.");
  const parts = collectCompoundParts(
    children,
    { header: NavigationMenuHeader, body: NavigationMenuBody, footer: NavigationMenuFooter },
    ["body"],
  );

  return (
    <NavigationMenuContext value={{ label, Item: NavigationMenuItem }}>
      <nav
        {...props}
        role={undefined}
        aria-label={label}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-gap="2"
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </nav>
    </NavigationMenuContext>
  );
}
