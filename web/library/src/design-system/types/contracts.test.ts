import type { ComponentPropsWithRef, RefObject } from "react";
import type * as Public from "../index";
import type * as Canonical from "./index";
import type {
  ComponentSize,
  ComponentTone,
  ComponentAppearance,
  ComponentShape,
  ComponentVariant,
  VisualProps,
  ComponentFullWidthProps,
  ComponentLoadingProps,
  ComponentInvalidProps,
} from "./component-capabilities";
import type {
  NativeInputProps,
  NativeSelectProps,
  NativeTextareaProps,
  NativeCheckboxProps,
  NativeEmailInputProps,
} from "./native-control-contracts";
import type { NativeIconButtonProps, NativeSwitchProps } from "./interactive-controls";
import type { AnimationEffect, PresencePhase, PresenceOptions } from "./animation";
import type { PopupListboxOptions, PopupComboboxAttributes } from "./popup";
import type {
  ComponentTextSize,
  ComponentTextTone,
  ComponentFontWeight,
  ComponentHeadingLevel,
  TextElement,
} from "./typography";
import type {
  ComponentSpace,
  ComponentResponsive,
  ComponentGridColumns,
  LayoutElement,
} from "./layout";
import type { ComponentIconSize } from "./icon";
import type { IconGeometry, IconName } from "./icon-geometry";
import type { SkeletonKind } from "./loading";
import type { ComponentMeterValueProps, NativeProgressProps, MeterRange } from "./range";

type Assignable<Constraint, Value extends Constraint> = Value;
type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <Value>() => Value extends Right ? 1 : 2
    ? true
    : false;
type Assert<Value extends true> = Value;
type Excludes<Shape, Key> = Key extends keyof Shape ? false : true;

export type ValidSizes = Assignable<ComponentSize, "xs" | "sm" | "md" | "lg" | "xl">;
export type ValidTones = Assignable<
  ComponentTone,
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "inverse"
  | "sand"
  | "violet"
  | "forest"
  | "sky"
>;
export type ValidAppearances = Assignable<
  ComponentAppearance,
  "solid" | "soft" | "outlined" | "bordered" | "ghost" | "none"
>;
export type ValidShapes = Assignable<ComponentShape, "square" | "rounded" | "pill">;
export type ValidVariants = Assignable<ComponentVariant, "solid" | "soft" | "ghost" | "outline">;
export type ComposedCapabilities = Assignable<
  VisualProps & ComponentFullWidthProps & ComponentLoadingProps & ComponentInvalidProps,
  { size: "md"; tone: "brand"; fullWidth: true; loading: true; invalid: false }
>;
export type NativeInputRef = Assert<
  Equal<NativeInputProps["ref"], ComponentPropsWithRef<"input">["ref"]>
>;
export type NativeSelectRef = Assert<
  Equal<NativeSelectProps["ref"], ComponentPropsWithRef<"select">["ref"]>
>;
export type NativeTextareaRef = Assert<
  Equal<NativeTextareaProps["ref"], ComponentPropsWithRef<"textarea">["ref"]>
>;
export type NativeIconButtonRef = Assert<
  Equal<NativeIconButtonProps["ref"], ComponentPropsWithRef<"button">["ref"]>
>;
export type NoNativeSize = Assert<Excludes<NativeInputProps, "size">>;
export type NoCheckableType = Assert<Excludes<NativeCheckboxProps, "type">>;
export type NoCheckableChildren = Assert<Excludes<NativeCheckboxProps, "children">>;
export type NoEmailChannel = Assert<Excludes<NativeEmailInputProps, "onChange">>;
export type NoSwitchRole = Assert<Excludes<NativeSwitchProps, "role">>;
export type NoNativeProgressValue = Assert<Excludes<NativeProgressProps, "value">>;
export type PublicCompatibility = Assert<Equal<Public.ComponentSize, Canonical.ComponentSize>>;
export type PublicPopupCompatibility = Assert<
  Equal<Public.PopupListboxContract, Canonical.PopupListboxContract>
>;
export type ValidEffects = Assignable<AnimationEffect, "none" | "fade" | "scale">;
export type ValidPresence = Assignable<
  PresenceOptions,
  { open: boolean; elementRef: RefObject<HTMLDivElement | null> }
>;
export type ValidPopup = Assignable<
  PopupListboxOptions,
  { count: number; queryKey: null; onAcceptOption(index: number): void }
>;
export type ValidTextSizes = Assignable<
  ComponentTextSize,
  "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
>;
export type ValidTextTones = Assignable<
  ComponentTextTone,
  "default" | "muted" | "brand" | "danger" | "success" | "inverse"
>;
export type ValidWeights = Assignable<
  ComponentFontWeight,
  "regular" | "medium" | "semibold" | "bold"
>;
export type ValidHeading = Assignable<ComponentHeadingLevel, 1 | 2 | 3 | 4 | 5 | 6>;
export type ValidTextElements = Assignable<TextElement, "span" | "p" | "small" | "strong">;
export type ValidSpaces = Assignable<
  ComponentSpace,
  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20"
>;
export type ValidResponsive = Assignable<
  ComponentResponsive<ComponentGridColumns>,
  { base: "1"; mobile: "2"; wide: "4" }
>;
export type ValidIcon = Assignable<ComponentIconSize, ComponentSize | "inherit">;
export type GeneratedIconName = Assignable<IconName, "check">;
export type ReadonlyGeometry = Assert<Equal<IconGeometry, Readonly<IconGeometry>>>;
export type ValidSkeleton = Assignable<SkeletonKind, "rectangle" | "text" | "circle">;
export type ValidMeter = Assignable<ComponentMeterValueProps, { value: number }>;

// @ts-expect-error Arbitrary control sizes are not part of the canonical scale.
export type InvalidSize = Assignable<ComponentSize, "xxl">;
// @ts-expect-error Unsupported action tones are excluded.
export type InvalidTone = Assignable<ComponentTone, "primary">;
// @ts-expect-error Unsupported appearances are excluded.
export type InvalidAppearance = Assignable<ComponentAppearance, "transparent">;
// @ts-expect-error Unsupported shapes are excluded.
export type InvalidShape = Assignable<ComponentShape, "circle">;
// @ts-expect-error Variant aliases remain a separate closed contract.
export type InvalidVariant = Assignable<ComponentVariant, "outlined">;
// @ts-expect-error Text tones do not include unsupported text tokens.
export type InvalidTextTone = Assignable<ComponentTextTone, "warning">;
// @ts-expect-error Headings remain semantic levels one through six.
export type InvalidHeading = Assignable<ComponentHeadingLevel, 7>;
// @ts-expect-error Font weight values are semantic names.
export type InvalidWeight = Assignable<ComponentFontWeight, 700>;
// @ts-expect-error Text primitives do not own heading semantics.
export type InvalidTextElement = Assignable<TextElement, "h1">;
// @ts-expect-error Spacing rejects arbitrary numeric CSS lengths.
export type InvalidSpace = Assignable<ComponentSpace, 8>;
// @ts-expect-error Columns remain a closed named vocabulary.
export type InvalidColumns = Assignable<ComponentGridColumns, "5">;
// @ts-expect-error Responsive maps expose only the canonical breakpoints.
export type InvalidBreakpoint = Assignable<keyof ComponentResponsive<"1">, "desktop">;
// @ts-expect-error Layout elements do not include interactive buttons.
export type InvalidLayout = Assignable<LayoutElement, "button">;
// @ts-expect-error Loading kinds have no independent progress vocabulary.
export type InvalidSkeleton = Assignable<SkeletonKind, "progress">;
// @ts-expect-error Icon sizes are semantic values rather than pixels.
export type InvalidIconSize = Assignable<ComponentIconSize, 24>;
// @ts-expect-error IconName follows generated canonical keys only.
export type InvalidIconName = Assignable<IconName, "not-in-the-manifest">;
// @ts-expect-error Drawing vocabulary matches canonical normalized geometry.
export type InvalidIconDrawing = Assignable<IconGeometry["drawing"], "outline">;
// @ts-expect-error An effect is a named CSS effect, not a numeric duration.
export type InvalidEffect = Assignable<AnimationEffect, 220>;
// @ts-expect-error Presence phases are lifecycle descriptors.
export type InvalidPhase = Assignable<PresencePhase, "open">;
export type InvalidPresenceRef = Assignable<
  PresenceOptions["elementRef"],
  // @ts-expect-error A presence surface ref targets a native HTML element.
  RefObject<SVGElement | null>
>;
export type InvalidPopup = Assignable<
  PopupListboxOptions,
  // @ts-expect-error Missing count cannot construct a popup contract.
  { queryKey: string; onAcceptOption(index: number): void }
>;
// @ts-expect-error ARIA combobox role is fixed by the contract.
export type InvalidPopupRole = Assignable<PopupComboboxAttributes["role"], "listbox">;
export type InvalidPopupCallback = Assignable<
  PopupListboxOptions["onAcceptOption"],
  // @ts-expect-error Acceptance receives a numeric option index.
  (index: string) => void
>;
// @ts-expect-error Meter requires a finite numeric value channel.
export type InvalidMeter = Assignable<ComponentMeterValueProps, { value: string }>;
// @ts-expect-error A meter requires a scalar value.
export type MissingMeterValue = Assignable<ComponentMeterValueProps, object>;
// @ts-expect-error Normalized thresholds remain numeric.
export type InvalidMeterThreshold = Assignable<MeterRange["low"], string>;

import type { NativePaginationEllipsisProps } from "./compound-composition";
export const passivePaginationGap = {
  id: "gap",
  title: "Gap",
  hidden: false,
  lang: "en",
  dir: "ltr",
} satisfies NativePaginationEllipsisProps;
// @ts-expect-error A gap cannot receive an action handler.
export const actionablePaginationGap: NativePaginationEllipsisProps = { onClick() {} };
// @ts-expect-error A gap cannot enter keyboard tab order.
export const focusablePaginationGap: NativePaginationEllipsisProps = { tabIndex: 0 };
// @ts-expect-error A gap cannot become an action role.
export const semanticPaginationGap: NativePaginationEllipsisProps = { role: "button" };
// @ts-expect-error The marker owns its visual content.
export const customPaginationGap: NativePaginationEllipsisProps = { children: "More" };
