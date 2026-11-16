"use client";
import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
  ComponentSelectionProps,
  ComponentAnimatedProps,
  NavigationDirection,
} from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { TabsContext } from "../../../internal/tabs/TabsContext";
import type { TabIdentity } from "../../../internal/tabs/TabsContext";
import { TabsHeader } from "../../atoms/TabsHeader";
import { TabsBody } from "../../atoms/TabsBody";
import { TabsFooter } from "../../atoms/TabsFooter";
import { Tab } from "../../atoms/Tab";
import { TabPanel } from "../../atoms/TabPanel";
import { useTabs } from "./useTabs";
import styles from "./Tabs.module.css";
export interface TabsProps
  extends
    NativeCollectionRootProps,
    ComponentChildrenProps,
    ComponentSelectionProps<string>,
    ComponentAnimatedProps {
  label: string;
  direction?: NavigationDirection;
}

function collect(
  children: ReactNode,
  constructor: typeof Tab | typeof TabPanel,
  values: TabIdentity[] = [],
) {
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement<TabIdentity & { children?: ReactNode }>(child))
      throw new Error("Invalid Tabs child.");

    if (child.type === Fragment && child.key !== null) {
      collect(child.props.children, constructor, values);
      return;
    }

    if (
      child.type !== constructor ||
      !child.props.value.trim() ||
      values.some((item) => item.value === child.props.value)
    )
      throw new Error("Tabs identities must be direct, nonempty and unique.");
    values.push({ value: child.props.value, disabled: child.props.disabled });
  });
  return values;
}

export function Tabs(input: TabsProps) {
  const parts = collectCompoundParts(input.children, {
    header: TabsHeader,
    body: TabsBody,
    footer: TabsFooter,
  });
  const tabs = collect((parts.header as ReactElement<{ children: ReactNode }>).props.children, Tab);
  const panels = collect(
    (parts.body as ReactElement<{ children: ReactNode }>).props.children,
    TabPanel,
  );
  if (
    tabs.length !== panels.length ||
    tabs.some((item) => !panels.some((panel) => panel.value === item.value))
  )
    throw new Error("Every Tab requires one corresponding TabPanel.");
  const { props, className, context } = useTabs(input, tabs);

  return (
    <TabsContext value={context}>
      <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="2">
        {parts.header}
        {parts.body}
        {parts.footer}
      </div>
    </TabsContext>
  );
}
