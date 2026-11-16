import type { RefObject } from "react";
import type { TextProps } from "./atoms/Text";
import type { HeadingProps } from "./atoms/Heading";
import type { ContainerProps } from "./atoms/Container";
import type { StackProps } from "./atoms/Stack";
import type { InlineProps } from "./atoms/Inline";
import type { SimpleGridProps } from "./atoms/SimpleGrid";
import type { AspectRatioProps } from "./atoms/AspectRatio";
import type { DividerProps } from "./atoms/Divider";
import type { FieldHintProps } from "./atoms/FieldHint";
import type { FieldErrorProps } from "./atoms/FieldError";
import type { CardProps } from "./molecules/Card";
import type { AlertProps } from "./molecules/Alert";
import type { LoadingStateProps } from "./molecules/LoadingState";
import type { ButtonGroupProps } from "./molecules/ButtonGroup";
import type { BreadcrumbProps } from "./molecules/Breadcrumb";
import type { PaginationProps } from "./molecules/Pagination";
import type { PaginationItemProps } from "./atoms/PaginationItem";
import type { ToolbarProps } from "./molecules/Toolbar";
import type { ToolbarItemProps } from "./atoms/ToolbarItem";

declare const elementRef: RefObject<HTMLElement | null>;
declare const headingRef: RefObject<HTMLHeadingElement | null>;
declare const paragraphRef: RefObject<HTMLParagraphElement | null>;
declare const dividerRef: RefObject<HTMLHRElement | null>;
declare const svgRef: RefObject<SVGSVGElement | null>;
declare const buttonRef: RefObject<HTMLButtonElement | null>;
declare const divRef: RefObject<HTMLDivElement | null>;

export const nativeRefContracts = {
  text: { ref: elementRef, as: "strong", size: "lg" } satisfies TextProps,
  heading: { ref: headingRef, level: 2 } satisfies HeadingProps,
  container: { ref: elementRef, as: "section" } satisfies ContainerProps,
  stack: { ref: elementRef, as: "article" } satisfies StackProps,
  inline: { ref: elementRef, wrap: false } satisfies InlineProps,
  grid: { ref: elementRef, columns: { base: "4", mobile: "1" } } satisfies SimpleGridProps,
  aspect: { ref: elementRef, ratio: "video" } satisfies AspectRatioProps,
  divider: { ref: dividerRef } satisfies DividerProps,
  hint: { ref: paragraphRef } satisfies FieldHintProps,
  error: { ref: paragraphRef, announce: false } satisfies FieldErrorProps,
  card: { ref: elementRef, children: "content", elevation: "flat" } satisfies CardProps,
  group: { ref: divRef, label: "Actions", children: null } satisfies ButtonGroupProps,
  breadcrumb: { ref: elementRef, label: "Path", children: null } satisfies BreadcrumbProps,
  pagination: {
    ref: elementRef,
    label: "Pages",
    page: 1,
    pageCount: 3,
    onPageChange: (page: number) => page,
    children: null,
  } satisfies PaginationProps,
  paginationItem: { ref: buttonRef, label: "Second", page: 2 } satisfies PaginationItemProps,
  toolbar: {
    ref: divRef,
    label: "Actions",
    children: null,
    direction: "rtl",
    orientation: "horizontal",
  } satisfies ToolbarProps,
  toolbarItem: { ref: buttonRef, itemKey: "save" } satisfies ToolbarItemProps,
};

// @ts-expect-error Native refs retain their element contract.
export const invalidHintRef: FieldHintProps = { ref: svgRef };
// @ts-expect-error Headings require a semantic level.
export const missingHeadingLevel: HeadingProps = {};
// @ts-expect-error Only declared breakpoint column counts are supported.
export const invalidColumns: SimpleGridProps = { columns: { base: "5" } };
// @ts-expect-error Feedback politeness uses its canonical value contract.
export const invalidAnnouncement: AlertProps = { children: "content", announcement: "urgent" };
// @ts-expect-error Loading requires a caller-owned localized label.
export const missingLoadingLabel: LoadingStateProps = { children: "content" };

export const wrongPageCallback: PaginationProps = {
  label: "Pages",
  page: 1,
  pageCount: 3,
  // @ts-expect-error Pagination requests keep the canonical numeric target.
  onPageChange: (page: string) => page,
  children: null,
};
// @ts-expect-error Pagination uses native tab order rather than an item tabIndex API.
export const unsupportedRovingItem: PaginationItemProps = { label: "First", page: 1, tabIndex: -1 };

export const unsupportedToolbarDirection: ToolbarProps = {
  label: "Actions",
  children: null,
  // @ts-expect-error Toolbar direction uses its canonical navigation contract.
  direction: "auto",
};

import type { NavigationMenuProps } from "./organisms/NavigationMenu";
import type { StepperProps } from "./organisms/Stepper";
import type { StepperItemProps } from "./molecules/StepperItem";
export const navigationMenuContract = {
  ref: elementRef,
  label: "Site",
  children: null,
} satisfies NavigationMenuProps;
export const stepperContract = {
  ref: divRef,
  label: "Progress",
  value: "first",
  onStepChange: (value: string) => value,
  children: null,
} satisfies StepperProps;
// @ts-expect-error Stepper is controlled by a required caller callback.
export const missingStepperCallback: StepperProps = {
  label: "Progress",
  value: "first",
  children: null,
};

export const invalidStepStatus: StepperItemProps = {
  value: "first",
  label: "First",
  // @ts-expect-error Step status uses its canonical contract.
  status: "finished",
};

import type { DisclosureProps } from "./molecules/Disclosure";
export const disclosureContract = {
  ref: divRef,
  label: "Details",
  children: null,
  defaultOpen: true,
  disabled: true,
  animated: false,
} satisfies DisclosureProps;
// @ts-expect-error Disclosure requires a caller-owned visible trigger label.
export const missingDisclosureLabel: DisclosureProps = { children: null };

import type { PaginationEllipsisProps } from "./atoms/PaginationEllipsis";
export const inertPaginationEllipsis = { id: "pagination-gap" } satisfies PaginationEllipsisProps;
// @ts-expect-error An ellipsis is not a page target.
export const targetedPaginationEllipsis: PaginationEllipsisProps = { page: 2 };
