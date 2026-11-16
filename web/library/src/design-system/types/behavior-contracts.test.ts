import type { RefObject } from "react";
import type * as Contract from "../index";

type Assignable<Constraint, Value extends Constraint> = Value;
type Assert<Value extends true> = Value;
type Excludes<Shape, Key> = Key extends keyof Shape ? false : true;

export type NativeFileHasNoValue = Assert<Excludes<Contract.NativeFileInputProps, "value">>;
export type NativeRangeHasNoReadOnly = Assert<Excludes<Contract.NativeRangeInputProps, "readOnly">>;
export type NativeQueryHasNoChange = Assert<Excludes<Contract.NativeQueryInputProps, "onChange">>;
export type NativeCollectionHasNoSelection = Assert<
  Excludes<Contract.NativeCollectionItemProps, "aria-selected">
>;
export type NativeModalHasNoOpen = Assert<Excludes<Contract.NativeModalRootProps, "open">>;
export type NativeFormHasNoAction = Assert<Excludes<Contract.NativeFormRootProps, "action">>;
export type NativeGridHasNoRole = Assert<Excludes<Contract.NativeGridCellProps, "role">>;
export type ValidOpen = Assignable<
  Contract.ComponentOpenProps,
  { open: true; onOpenChange(open: boolean): void }
>;
export type ValidChoice = Assignable<Contract.ChoiceOption, { value: string; label: string }>;
export type ValidSelection = Assignable<
  Contract.ComponentSelectionProps<readonly string[]>,
  { value: readonly string[]; onValueChange(value: readonly string[]): void }
>;
export type ValidRegions = Assignable<Contract.CompoundRegion, "header" | "body" | "footer">;
export type ValidSort = Assignable<Contract.SortDirection, "ascending" | "descending">;
export type ValidPoliteness = Assignable<
  Contract.AnnouncementPoliteness,
  "off" | "polite" | "assertive"
>;
export type ValidStatus = Assignable<Contract.StepStatus, "pending" | "complete" | "error">;
export type ValidDirection = Assignable<Contract.NavigationDirection, "ltr" | "rtl">;
export type ValidOrientation = Assignable<
  Contract.NavigationOrientation,
  "horizontal" | "vertical"
>;
export type ValidGridAddress = Assignable<
  Contract.GridCellAddress,
  { rowKey: string; columnKey: string }
>;
export type ValidMask = Assignable<
  Contract.MaskedInputOptions,
  { mask: string; value: string; onValueChange(value: string): void }
>;
export type ValidNotificationDurations = Assignable<
  Contract.ToastDuration,
  "persistent" | "short" | "long"
>;
export type ValidPauseReasons = Assignable<
  Contract.ToastPauseReason,
  "hover" | "focus" | "document-hidden"
>;
export type ValidUrgency = Assignable<Contract.NotificationUrgency, "normal" | "urgent">;
export type ValidVirtualKeys = Assignable<Contract.VirtualWindowOptions["keys"], readonly string[]>;
export type VirtualHasNoPixelHeight = Assert<Excludes<Contract.VirtualWindowOptions, "rowHeight">>;
export type TreeStateHasNoDOMFocus = Assert<Excludes<Contract.TreeStateContract, "focus">>;

// @ts-expect-error Fixed-type adapters exclude caller native type.
export type InvalidFixedType = Assignable<keyof Contract.NativeSpecializedInputProps, "type">;

export type InvalidGroupSelection = Assignable<
  Contract.ComponentDisclosureGroupProps["value"],
  // @ts-expect-error A group's selection is a readonly key collection.
  string
>;

export type InvalidSelectionCallback = Assignable<
  Contract.ComponentSelectionProps<string>["onValueChange"],
  // @ts-expect-error Generic callbacks preserve the selected value type.
  (value: number) => void
>;
// @ts-expect-error Open channels are boolean, never string-valued.
export type InvalidOpen = Assignable<Contract.ComponentOpenProps["open"], "true">;
// @ts-expect-error A choice requires a visible and accessible label.
export type MissingChoiceLabel = Assignable<Contract.ChoiceOption, { value: string }>;
// @ts-expect-error Compound regions remain header/body/footer.
export type InvalidRegion = Assignable<Contract.CompoundRegion, "content">;
// @ts-expect-error Constructor mappings require all three region keys.
export type MissingConstructors = Assignable<Contract.CompoundConstructors, { header: "header" }>;
// @ts-expect-error Roving navigation requires an orientation.
export type MissingOrientation = Assignable<Contract.RovingFocusOptions, object>;
// @ts-expect-error Direction follows the canonical bidi vocabulary.
export type InvalidDirection = Assignable<Contract.NavigationDirection, "reverse">;

export type InvalidFocusRef = Assignable<
  Contract.FocusItemRegistration["ref"],
  // @ts-expect-error DOM registration requires an HTML ref.
  RefObject<SVGElement | null>
>;
// @ts-expect-error Grid addresses contain both keys.
export type MissingGridColumn = Assignable<Contract.GridCellAddress, { rowKey: string }>;
// @ts-expect-error Grid keys are caller-owned strings.
export type InvalidGridKey = Assignable<Contract.GridCellAddress["rowKey"], number>;
// @ts-expect-error Mask values are strings.
export type InvalidMaskValue = Assignable<Contract.MaskedInputOptions["value"], number>;
// @ts-expect-error Masks preserve inputMode numeric/text only.
export type InvalidMaskMode = Assignable<Contract.MaskedInputContract["inputMode"], "email">;

export type MissingOverlayCallbacks = Assignable<
  Contract.OverlayLayerOptions,
  // @ts-expect-error Escape callbacks are required by overlay ownership.
  {
    open: boolean;
    triggerRef: RefObject<HTMLElement | null>;
    panelRef: RefObject<HTMLElement | null>;
  }
>;

export type InvalidModalHandler = Assignable<
  Contract.ModalContract["onCancel"],
  // @ts-expect-error Modal cancel callbacks receive dialog events.
  (event: number) => void
>;

export type InvalidGridRenderer = Assignable<
  Contract.DataGridColumn<{ name: string }>["renderCell"],
  // @ts-expect-error Generic grid renderers preserve caller row shape.
  (row: { id: number }) => string
>;
// @ts-expect-error Tree nodes have stable string keys.
export type InvalidTreeKey = Assignable<Contract.TreeNodeDescriptor["key"], number>;

export type InvalidTreeSelection = Assignable<
  Contract.TreeStateContract["selected"],
  // @ts-expect-error Single tree selection is a nullable scalar key.
  readonly string[]
>;

export type MissingVisibleMetadata = Assignable<
  Contract.VisibleTreeNode,
  // @ts-expect-error A visible tree node requires traversal metadata.
  { node: Contract.TreeNodeDescriptor }
>;
// @ts-expect-error Listbox selections retain readonly collections.
export type InvalidListboxSelection = Assignable<Contract.ListBoxStateOptions["value"], string>;

export type InvalidViewportRef = Assignable<
  Contract.VirtualWindowOptions["viewportRef"],
  // @ts-expect-error Virtualization refs target HTML viewports.
  RefObject<SVGElement | null>
>;

export type MissingToastLabel = Assignable<
  Contract.ToastRecord,
  // @ts-expect-error Toast records require dismiss labels.
  { id: string; title: string; message: string }
>;
// @ts-expect-error Toast durations are closed semantic values.
export type InvalidToastDuration = Assignable<Contract.ToastDuration, "medium">;

export type StyledListBoxOption = Assignable<
  Contract.ListBoxOption,
  {
    value: string;
    label: string;
    size: "sm";
    tone: "success";
    appearance: "outlined";
    shape: "pill";
  }
>;

export type InvalidListBoxOptionSize = Assignable<
  Contract.ListBoxOption,
  // @ts-expect-error ListBox options reuse the canonical size union.
  { value: string; label: string; size: "huge" }
>;
