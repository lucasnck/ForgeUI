---
title: "App Parity Specification Coverage"
scope: "Complete Web component baseline and app specification coverage"
---

# App Parity Specification Coverage

All **221 current Web catalog components have an app specification**: 217 added after the initial four, with all four initial contracts enriched by source-based property matrices. These are proposed contracts; **all 221 remain PENDING for Flutter implementation and acceptance**. The current minimal ForgeButton and compiled preview do not establish full widget parity.

Read [shared parity rules](core-web-app-parity.sc.md), [native mapping](core-native-api-mapping.sc.md), [native contracts](ds/types/tech-native-contracts.sc.md), [platform adapters](ds/helpers/tech-native-platform-adapters.sc.md) and [showcase parity](feature-showcase-parity.sc.md). This is specification coverage, not a catalog of available exports.

## Coverage

The first functional app delivery includes Button, Spinner and ButtonGroup with compiled previews. Their complete contracts remain PENDING for outstanding mapping/visual/native acceptance; the remaining 218 widgets are not implemented. See [delivery evidence](../../migration/FLUTTER-COMPONENTS-PHASE-1.md).

| Level | App specifications |
| --- | --- |
| atoms | 115 |
| molecules | 86 |
| organisms | 14 |
| templates | 6 |
| Total | 221 |

Each component spec records source property types/requiredness, observed local defaults, native mappings, behavior-specific tests, pending acceptance and equivalent showcase scenarios. The baseline has **254 actual component examples**; resource fixture ids are not counted as scenarios.

The [traceability data](reference/component-contracts.json) records the inspected source interface and hooks, source hashes, property mappings and inherited Web members governed by native delegation rules. The [authoring audit](reference/spec-authoring-audit.json) validates documentation coverage/links/contracts; it does not run or certify Flutter widgets.

## Implementation sequence

1. Shared native models, tokens/style mappings, form/control/semantic bindings and injected platform adapters.
2. Input/action primitives, formatting, selection and explicit compound parts.
3. Feedback, overlays, disclosure, navigation and collections with controlled state/focus contracts.
4. Advanced data grids, OData, maps, transitions and adaptive templates; equivalent showcase scenarios only after library support.

Preserve all source capabilities. Native adaptation can change interaction/layout mechanisms, not silently remove properties, validation, exact values or caller-owned behaviors. No package, permission, backend or consumer integration is selected by these specs.

## Component inventory

| Component | Level | Web baseline | App specification |
| --- | --- | --- | --- |
| AccordionBody | atoms | [Web SC](../ds/components/atoms/AccordionBody.sc.md) | [PENDING](ds/components/atoms/AccordionBody.sc.md) |
| AccordionFooter | atoms | [Web SC](../ds/components/atoms/AccordionFooter.sc.md) | [PENDING](ds/components/atoms/AccordionFooter.sc.md) |
| AccordionHeader | atoms | [Web SC](../ds/components/atoms/AccordionHeader.sc.md) | [PENDING](ds/components/atoms/AccordionHeader.sc.md) |
| AlertBody | atoms | [Web SC](../ds/components/atoms/AlertBody.sc.md) | [PENDING](ds/components/atoms/AlertBody.sc.md) |
| AlertDialogBody | atoms | [Web SC](../ds/components/atoms/AlertDialogBody.sc.md) | [PENDING](ds/components/atoms/AlertDialogBody.sc.md) |
| AlertDialogFooter | atoms | [Web SC](../ds/components/atoms/AlertDialogFooter.sc.md) | [PENDING](ds/components/atoms/AlertDialogFooter.sc.md) |
| AlertFooter | atoms | [Web SC](../ds/components/atoms/AlertFooter.sc.md) | [PENDING](ds/components/atoms/AlertFooter.sc.md) |
| AlertHeader | atoms | [Web SC](../ds/components/atoms/AlertHeader.sc.md) | [PENDING](ds/components/atoms/AlertHeader.sc.md) |
| ApplicationLayoutBody | atoms | [Web SC](../ds/components/atoms/ApplicationLayoutBody.sc.md) | [PENDING](ds/components/atoms/ApplicationLayoutBody.sc.md) |
| ApplicationLayoutFooter | atoms | [Web SC](../ds/components/atoms/ApplicationLayoutFooter.sc.md) | [PENDING](ds/components/atoms/ApplicationLayoutFooter.sc.md) |
| ApplicationLayoutHeader | atoms | [Web SC](../ds/components/atoms/ApplicationLayoutHeader.sc.md) | [PENDING](ds/components/atoms/ApplicationLayoutHeader.sc.md) |
| AspectRatio | atoms | [Web SC](../ds/components/atoms/AspectRatio.sc.md) | [PENDING](ds/components/atoms/AspectRatio.sc.md) |
| AutocompleteFooter | atoms | [Web SC](../ds/components/atoms/AutocompleteFooter.sc.md) | [PENDING](ds/components/atoms/AutocompleteFooter.sc.md) |
| AutocompleteHeader | atoms | [Web SC](../ds/components/atoms/AutocompleteHeader.sc.md) | [PENDING](ds/components/atoms/AutocompleteHeader.sc.md) |
| Avatar | atoms | [Web SC](../ds/components/atoms/Avatar.sc.md) | [PENDING](ds/components/atoms/Avatar.sc.md) |
| Badge | atoms | [Web SC](../ds/components/atoms/Badge.sc.md) | [PENDING](ds/components/atoms/Badge.sc.md) |
| BreadcrumbItem | atoms | [Web SC](../ds/components/atoms/BreadcrumbItem.sc.md) | [PENDING](ds/components/atoms/BreadcrumbItem.sc.md) |
| Button | atoms | [Web SC](../ds/components/atoms/Button.sc.md) | [PENDING](ds/components/atoms/Button.sc.md) |
| CardBody | atoms | [Web SC](../ds/components/atoms/CardBody.sc.md) | [PENDING](ds/components/atoms/CardBody.sc.md) |
| CardFooter | atoms | [Web SC](../ds/components/atoms/CardFooter.sc.md) | [PENDING](ds/components/atoms/CardFooter.sc.md) |
| CardHeader | atoms | [Web SC](../ds/components/atoms/CardHeader.sc.md) | [PENDING](ds/components/atoms/CardHeader.sc.md) |
| Checkbox | atoms | [Web SC](../ds/components/atoms/Checkbox.sc.md) | [PENDING](ds/components/atoms/Checkbox.sc.md) |
| ChoiceGroupBody | atoms | [Web SC](../ds/components/atoms/ChoiceGroupBody.sc.md) | [PENDING](ds/components/atoms/ChoiceGroupBody.sc.md) |
| ChoiceGroupFooter | atoms | [Web SC](../ds/components/atoms/ChoiceGroupFooter.sc.md) | [PENDING](ds/components/atoms/ChoiceGroupFooter.sc.md) |
| ChoiceGroupHeader | atoms | [Web SC](../ds/components/atoms/ChoiceGroupHeader.sc.md) | [PENDING](ds/components/atoms/ChoiceGroupHeader.sc.md) |
| CollapseBody | atoms | [Web SC](../ds/components/atoms/CollapseBody.sc.md) | [PENDING](ds/components/atoms/CollapseBody.sc.md) |
| CollapseFooter | atoms | [Web SC](../ds/components/atoms/CollapseFooter.sc.md) | [PENDING](ds/components/atoms/CollapseFooter.sc.md) |
| CollapseHeader | atoms | [Web SC](../ds/components/atoms/CollapseHeader.sc.md) | [PENDING](ds/components/atoms/CollapseHeader.sc.md) |
| ComboboxFooter | atoms | [Web SC](../ds/components/atoms/ComboboxFooter.sc.md) | [PENDING](ds/components/atoms/ComboboxFooter.sc.md) |
| ComboboxHeader | atoms | [Web SC](../ds/components/atoms/ComboboxHeader.sc.md) | [PENDING](ds/components/atoms/ComboboxHeader.sc.md) |
| Container | atoms | [Web SC](../ds/components/atoms/Container.sc.md) | [PENDING](ds/components/atoms/Container.sc.md) |
| CurrencyValue | atoms | [Web SC](../ds/components/atoms/CurrencyValue.sc.md) | [PENDING](ds/components/atoms/CurrencyValue.sc.md) |
| DataGridCell | atoms | [Web SC](../ds/components/atoms/DataGridCell.sc.md) | [PENDING](ds/components/atoms/DataGridCell.sc.md) |
| DataGridFooter | atoms | [Web SC](../ds/components/atoms/DataGridFooter.sc.md) | [PENDING](ds/components/atoms/DataGridFooter.sc.md) |
| DialogBody | atoms | [Web SC](../ds/components/atoms/DialogBody.sc.md) | [PENDING](ds/components/atoms/DialogBody.sc.md) |
| DialogClose | atoms | [Web SC](../ds/components/atoms/DialogClose.sc.md) | [PENDING](ds/components/atoms/DialogClose.sc.md) |
| DialogFooter | atoms | [Web SC](../ds/components/atoms/DialogFooter.sc.md) | [PENDING](ds/components/atoms/DialogFooter.sc.md) |
| Divider | atoms | [Web SC](../ds/components/atoms/Divider.sc.md) | [PENDING](ds/components/atoms/Divider.sc.md) |
| EmptyStateBody | atoms | [Web SC](../ds/components/atoms/EmptyStateBody.sc.md) | [PENDING](ds/components/atoms/EmptyStateBody.sc.md) |
| EmptyStateFooter | atoms | [Web SC](../ds/components/atoms/EmptyStateFooter.sc.md) | [PENDING](ds/components/atoms/EmptyStateFooter.sc.md) |
| EmptyStateHeader | atoms | [Web SC](../ds/components/atoms/EmptyStateHeader.sc.md) | [PENDING](ds/components/atoms/EmptyStateHeader.sc.md) |
| ErrorStateBody | atoms | [Web SC](../ds/components/atoms/ErrorStateBody.sc.md) | [PENDING](ds/components/atoms/ErrorStateBody.sc.md) |
| ErrorStateFooter | atoms | [Web SC](../ds/components/atoms/ErrorStateFooter.sc.md) | [PENDING](ds/components/atoms/ErrorStateFooter.sc.md) |
| ErrorStateHeader | atoms | [Web SC](../ds/components/atoms/ErrorStateHeader.sc.md) | [PENDING](ds/components/atoms/ErrorStateHeader.sc.md) |
| FieldError | atoms | [Web SC](../ds/components/atoms/FieldError.sc.md) | [PENDING](ds/components/atoms/FieldError.sc.md) |
| FieldHint | atoms | [Web SC](../ds/components/atoms/FieldHint.sc.md) | [PENDING](ds/components/atoms/FieldHint.sc.md) |
| FormBody | atoms | [Web SC](../ds/components/atoms/FormBody.sc.md) | [PENDING](ds/components/atoms/FormBody.sc.md) |
| FormFieldBody | atoms | [Web SC](../ds/components/atoms/FormFieldBody.sc.md) | [PENDING](ds/components/atoms/FormFieldBody.sc.md) |
| FormFieldHeader | atoms | [Web SC](../ds/components/atoms/FormFieldHeader.sc.md) | [PENDING](ds/components/atoms/FormFieldHeader.sc.md) |
| FormFooter | atoms | [Web SC](../ds/components/atoms/FormFooter.sc.md) | [PENDING](ds/components/atoms/FormFooter.sc.md) |
| FormHeader | atoms | [Web SC](../ds/components/atoms/FormHeader.sc.md) | [PENDING](ds/components/atoms/FormHeader.sc.md) |
| Heading | atoms | [Web SC](../ds/components/atoms/Heading.sc.md) | [PENDING](ds/components/atoms/Heading.sc.md) |
| Icon | atoms | [Web SC](../ds/components/atoms/Icon.sc.md) | [PENDING](ds/components/atoms/Icon.sc.md) |
| Inline | atoms | [Web SC](../ds/components/atoms/Inline.sc.md) | [PENDING](ds/components/atoms/Inline.sc.md) |
| Input | atoms | [Web SC](../ds/components/atoms/Input.sc.md) | [PENDING](ds/components/atoms/Input.sc.md) |
| Label | atoms | [Web SC](../ds/components/atoms/Label.sc.md) | [PENDING](ds/components/atoms/Label.sc.md) |
| Link | atoms | [Web SC](../ds/components/atoms/Link.sc.md) | [PENDING](ds/components/atoms/Link.sc.md) |
| ListBody | atoms | [Web SC](../ds/components/atoms/ListBody.sc.md) | [PENDING](ds/components/atoms/ListBody.sc.md) |
| ListBoxFooter | atoms | [Web SC](../ds/components/atoms/ListBoxFooter.sc.md) | [PENDING](ds/components/atoms/ListBoxFooter.sc.md) |
| ListBoxHeader | atoms | [Web SC](../ds/components/atoms/ListBoxHeader.sc.md) | [PENDING](ds/components/atoms/ListBoxHeader.sc.md) |
| ListBoxItem | atoms | [Web SC](../ds/components/atoms/ListBoxItem.sc.md) | [PENDING](ds/components/atoms/ListBoxItem.sc.md) |
| ListFooter | atoms | [Web SC](../ds/components/atoms/ListFooter.sc.md) | [PENDING](ds/components/atoms/ListFooter.sc.md) |
| ListHeader | atoms | [Web SC](../ds/components/atoms/ListHeader.sc.md) | [PENDING](ds/components/atoms/ListHeader.sc.md) |
| ListItem | atoms | [Web SC](../ds/components/atoms/ListItem.sc.md) | [PENDING](ds/components/atoms/ListItem.sc.md) |
| LoadingStateFooter | atoms | [Web SC](../ds/components/atoms/LoadingStateFooter.sc.md) | [PENDING](ds/components/atoms/LoadingStateFooter.sc.md) |
| LoadingStateHeader | atoms | [Web SC](../ds/components/atoms/LoadingStateHeader.sc.md) | [PENDING](ds/components/atoms/LoadingStateHeader.sc.md) |
| MenuBody | atoms | [Web SC](../ds/components/atoms/MenuBody.sc.md) | [PENDING](ds/components/atoms/MenuBody.sc.md) |
| MenuFooter | atoms | [Web SC](../ds/components/atoms/MenuFooter.sc.md) | [PENDING](ds/components/atoms/MenuFooter.sc.md) |
| MenuHeader | atoms | [Web SC](../ds/components/atoms/MenuHeader.sc.md) | [PENDING](ds/components/atoms/MenuHeader.sc.md) |
| MenuItem | atoms | [Web SC](../ds/components/atoms/MenuItem.sc.md) | [PENDING](ds/components/atoms/MenuItem.sc.md) |
| Meter | atoms | [Web SC](../ds/components/atoms/Meter.sc.md) | [PENDING](ds/components/atoms/Meter.sc.md) |
| ModalBody | atoms | [Web SC](../ds/components/atoms/ModalBody.sc.md) | [PENDING](ds/components/atoms/ModalBody.sc.md) |
| ModalFooter | atoms | [Web SC](../ds/components/atoms/ModalFooter.sc.md) | [PENDING](ds/components/atoms/ModalFooter.sc.md) |
| NavigationMenuBody | atoms | [Web SC](../ds/components/atoms/NavigationMenuBody.sc.md) | [PENDING](ds/components/atoms/NavigationMenuBody.sc.md) |
| NavigationMenuFooter | atoms | [Web SC](../ds/components/atoms/NavigationMenuFooter.sc.md) | [PENDING](ds/components/atoms/NavigationMenuFooter.sc.md) |
| NavigationMenuHeader | atoms | [Web SC](../ds/components/atoms/NavigationMenuHeader.sc.md) | [PENDING](ds/components/atoms/NavigationMenuHeader.sc.md) |
| NavigationMenuSublist | atoms | [Web SC](../ds/components/atoms/NavigationMenuSublist.sc.md) | [PENDING](ds/components/atoms/NavigationMenuSublist.sc.md) |
| Option | atoms | [Web SC](../ds/components/atoms/Option.sc.md) | [PENDING](ds/components/atoms/Option.sc.md) |
| OverlayPortal | atoms | [Web SC](../ds/components/atoms/OverlayPortal.sc.md) | [PENDING](ds/components/atoms/OverlayPortal.sc.md) |
| PaginationEllipsis | atoms | [Web SC](../ds/components/atoms/PaginationEllipsis.sc.md) | [PENDING](ds/components/atoms/PaginationEllipsis.sc.md) |
| PaginationItem | atoms | [Web SC](../ds/components/atoms/PaginationItem.sc.md) | [PENDING](ds/components/atoms/PaginationItem.sc.md) |
| PopoverBody | atoms | [Web SC](../ds/components/atoms/PopoverBody.sc.md) | [PENDING](ds/components/atoms/PopoverBody.sc.md) |
| PopoverFooter | atoms | [Web SC](../ds/components/atoms/PopoverFooter.sc.md) | [PENDING](ds/components/atoms/PopoverFooter.sc.md) |
| PopoverHeader | atoms | [Web SC](../ds/components/atoms/PopoverHeader.sc.md) | [PENDING](ds/components/atoms/PopoverHeader.sc.md) |
| PopupListboxItem | atoms | [Web SC](../ds/components/atoms/PopupListboxItem.sc.md) | [PENDING](ds/components/atoms/PopupListboxItem.sc.md) |
| Progress | atoms | [Web SC](../ds/components/atoms/Progress.sc.md) | [PENDING](ds/components/atoms/Progress.sc.md) |
| Radio | atoms | [Web SC](../ds/components/atoms/Radio.sc.md) | [PENDING](ds/components/atoms/Radio.sc.md) |
| Select | atoms | [Web SC](../ds/components/atoms/Select.sc.md) | [PENDING](ds/components/atoms/Select.sc.md) |
| SharedElement | atoms | [Web SC](../ds/components/atoms/SharedElement.sc.md) | [PENDING](ds/components/atoms/SharedElement.sc.md) |
| SimpleGrid | atoms | [Web SC](../ds/components/atoms/SimpleGrid.sc.md) | [PENDING](ds/components/atoms/SimpleGrid.sc.md) |
| Skeleton | atoms | [Web SC](../ds/components/atoms/Skeleton.sc.md) | [PENDING](ds/components/atoms/Skeleton.sc.md) |
| Spinner | atoms | [Web SC](../ds/components/atoms/Spinner.sc.md) | [PENDING](ds/components/atoms/Spinner.sc.md) |
| Stack | atoms | [Web SC](../ds/components/atoms/Stack.sc.md) | [PENDING](ds/components/atoms/Stack.sc.md) |
| StepperBody | atoms | [Web SC](../ds/components/atoms/StepperBody.sc.md) | [PENDING](ds/components/atoms/StepperBody.sc.md) |
| StepperFooter | atoms | [Web SC](../ds/components/atoms/StepperFooter.sc.md) | [PENDING](ds/components/atoms/StepperFooter.sc.md) |
| StepperHeader | atoms | [Web SC](../ds/components/atoms/StepperHeader.sc.md) | [PENDING](ds/components/atoms/StepperHeader.sc.md) |
| StepperPanel | atoms | [Web SC](../ds/components/atoms/StepperPanel.sc.md) | [PENDING](ds/components/atoms/StepperPanel.sc.md) |
| Surface | atoms | [Web SC](../ds/components/atoms/Surface.sc.md) | [PENDING](ds/components/atoms/Surface.sc.md) |
| Switch | atoms | [Web SC](../ds/components/atoms/Switch.sc.md) | [PENDING](ds/components/atoms/Switch.sc.md) |
| Tab | atoms | [Web SC](../ds/components/atoms/Tab.sc.md) | [PENDING](ds/components/atoms/Tab.sc.md) |
| TabPanel | atoms | [Web SC](../ds/components/atoms/TabPanel.sc.md) | [PENDING](ds/components/atoms/TabPanel.sc.md) |
| TabsBody | atoms | [Web SC](../ds/components/atoms/TabsBody.sc.md) | [PENDING](ds/components/atoms/TabsBody.sc.md) |
| TabsFooter | atoms | [Web SC](../ds/components/atoms/TabsFooter.sc.md) | [PENDING](ds/components/atoms/TabsFooter.sc.md) |
| TabsHeader | atoms | [Web SC](../ds/components/atoms/TabsHeader.sc.md) | [PENDING](ds/components/atoms/TabsHeader.sc.md) |
| Text | atoms | [Web SC](../ds/components/atoms/Text.sc.md) | [PENDING](ds/components/atoms/Text.sc.md) |
| Textarea | atoms | [Web SC](../ds/components/atoms/Textarea.sc.md) | [PENDING](ds/components/atoms/Textarea.sc.md) |
| ToastBody | atoms | [Web SC](../ds/components/atoms/ToastBody.sc.md) | [PENDING](ds/components/atoms/ToastBody.sc.md) |
| ToastHeader | atoms | [Web SC](../ds/components/atoms/ToastHeader.sc.md) | [PENDING](ds/components/atoms/ToastHeader.sc.md) |
| ToolbarItem | atoms | [Web SC](../ds/components/atoms/ToolbarItem.sc.md) | [PENDING](ds/components/atoms/ToolbarItem.sc.md) |
| TreeFooter | atoms | [Web SC](../ds/components/atoms/TreeFooter.sc.md) | [PENDING](ds/components/atoms/TreeFooter.sc.md) |
| TreeGridCell | atoms | [Web SC](../ds/components/atoms/TreeGridCell.sc.md) | [PENDING](ds/components/atoms/TreeGridCell.sc.md) |
| TreeGridColumnHeader | atoms | [Web SC](../ds/components/atoms/TreeGridColumnHeader.sc.md) | [PENDING](ds/components/atoms/TreeGridColumnHeader.sc.md) |
| TreeGridFooter | atoms | [Web SC](../ds/components/atoms/TreeGridFooter.sc.md) | [PENDING](ds/components/atoms/TreeGridFooter.sc.md) |
| TreeHeader | atoms | [Web SC](../ds/components/atoms/TreeHeader.sc.md) | [PENDING](ds/components/atoms/TreeHeader.sc.md) |
| VisuallyHidden | atoms | [Web SC](../ds/components/atoms/VisuallyHidden.sc.md) | [PENDING](ds/components/atoms/VisuallyHidden.sc.md) |
| Accordion | molecules | [Web SC](../ds/components/molecules/Accordion.sc.md) | [PENDING](ds/components/molecules/Accordion.sc.md) |
| AccordionItem | molecules | [Web SC](../ds/components/molecules/AccordionItem.sc.md) | [PENDING](ds/components/molecules/AccordionItem.sc.md) |
| Alert | molecules | [Web SC](../ds/components/molecules/Alert.sc.md) | [PENDING](ds/components/molecules/Alert.sc.md) |
| AlertDialogHeader | molecules | [Web SC](../ds/components/molecules/AlertDialogHeader.sc.md) | [PENDING](ds/components/molecules/AlertDialogHeader.sc.md) |
| Autocomplete | molecules | [Web SC](../ds/components/molecules/Autocomplete.sc.md) | [PENDING](ds/components/molecules/Autocomplete.sc.md) |
| AutocompleteBody | molecules | [Web SC](../ds/components/molecules/AutocompleteBody.sc.md) | [PENDING](ds/components/molecules/AutocompleteBody.sc.md) |
| Breadcrumb | molecules | [Web SC](../ds/components/molecules/Breadcrumb.sc.md) | [PENDING](ds/components/molecules/Breadcrumb.sc.md) |
| ButtonGroup | molecules | [Web SC](../ds/components/molecules/ButtonGroup.sc.md) | [PENDING](ds/components/molecules/ButtonGroup.sc.md) |
| Card | molecules | [Web SC](../ds/components/molecules/Card.sc.md) | [PENDING](ds/components/molecules/Card.sc.md) |
| CheckboxGroup | molecules | [Web SC](../ds/components/molecules/CheckboxGroup.sc.md) | [PENDING](ds/components/molecules/CheckboxGroup.sc.md) |
| CheckboxGroupItem | molecules | [Web SC](../ds/components/molecules/CheckboxGroupItem.sc.md) | [PENDING](ds/components/molecules/CheckboxGroupItem.sc.md) |
| ChoiceGroup | molecules | [Web SC](../ds/components/molecules/ChoiceGroup.sc.md) | [PENDING](ds/components/molecules/ChoiceGroup.sc.md) |
| Collapse | molecules | [Web SC](../ds/components/molecules/Collapse.sc.md) | [PENDING](ds/components/molecules/Collapse.sc.md) |
| ColorInput | molecules | [Web SC](../ds/components/molecules/ColorInput.sc.md) | [PENDING](ds/components/molecules/ColorInput.sc.md) |
| Combobox | molecules | [Web SC](../ds/components/molecules/Combobox.sc.md) | [PENDING](ds/components/molecules/Combobox.sc.md) |
| ComboboxBody | molecules | [Web SC](../ds/components/molecules/ComboboxBody.sc.md) | [PENDING](ds/components/molecules/ComboboxBody.sc.md) |
| CurrencyInput | molecules | [Web SC](../ds/components/molecules/CurrencyInput.sc.md) | [PENDING](ds/components/molecules/CurrencyInput.sc.md) |
| DataGridBody | molecules | [Web SC](../ds/components/molecules/DataGridBody.sc.md) | [PENDING](ds/components/molecules/DataGridBody.sc.md) |
| DataGridColumnHeader | molecules | [Web SC](../ds/components/molecules/DataGridColumnHeader.sc.md) | [PENDING](ds/components/molecules/DataGridColumnHeader.sc.md) |
| DataGridHeader | molecules | [Web SC](../ds/components/molecules/DataGridHeader.sc.md) | [PENDING](ds/components/molecules/DataGridHeader.sc.md) |
| DataGridRow | molecules | [Web SC](../ds/components/molecules/DataGridRow.sc.md) | [PENDING](ds/components/molecules/DataGridRow.sc.md) |
| DateInput | molecules | [Web SC](../ds/components/molecules/DateInput.sc.md) | [PENDING](ds/components/molecules/DateInput.sc.md) |
| DateTimeInput | molecules | [Web SC](../ds/components/molecules/DateTimeInput.sc.md) | [PENDING](ds/components/molecules/DateTimeInput.sc.md) |
| DialogHeader | molecules | [Web SC](../ds/components/molecules/DialogHeader.sc.md) | [PENDING](ds/components/molecules/DialogHeader.sc.md) |
| Disclosure | molecules | [Web SC](../ds/components/molecules/Disclosure.sc.md) | [PENDING](ds/components/molecules/Disclosure.sc.md) |
| DropdownMenu | molecules | [Web SC](../ds/components/molecules/DropdownMenu.sc.md) | [PENDING](ds/components/molecules/DropdownMenu.sc.md) |
| EmailInput | molecules | [Web SC](../ds/components/molecules/EmailInput.sc.md) | [PENDING](ds/components/molecules/EmailInput.sc.md) |
| EmptyState | molecules | [Web SC](../ds/components/molecules/EmptyState.sc.md) | [PENDING](ds/components/molecules/EmptyState.sc.md) |
| ErrorState | molecules | [Web SC](../ds/components/molecules/ErrorState.sc.md) | [PENDING](ds/components/molecules/ErrorState.sc.md) |
| FileInput | molecules | [Web SC](../ds/components/molecules/FileInput.sc.md) | [PENDING](ds/components/molecules/FileInput.sc.md) |
| FormField | molecules | [Web SC](../ds/components/molecules/FormField.sc.md) | [PENDING](ds/components/molecules/FormField.sc.md) |
| FormFieldFooter | molecules | [Web SC](../ds/components/molecules/FormFieldFooter.sc.md) | [PENDING](ds/components/molecules/FormFieldFooter.sc.md) |
| IconButton | molecules | [Web SC](../ds/components/molecules/IconButton.sc.md) | [PENDING](ds/components/molecules/IconButton.sc.md) |
| InputAddon | molecules | [Web SC](../ds/components/molecules/InputAddon.sc.md) | [PENDING](ds/components/molecules/InputAddon.sc.md) |
| InputBase | molecules | [Web SC](../ds/components/molecules/InputBase.sc.md) | [PENDING](ds/components/molecules/InputBase.sc.md) |
| InputGroup | molecules | [Web SC](../ds/components/molecules/InputGroup.sc.md) | [PENDING](ds/components/molecules/InputGroup.sc.md) |
| InternationalTelephoneInput | molecules | [Web SC](../ds/components/molecules/InternationalTelephoneInput.sc.md) | [PENDING](ds/components/molecules/InternationalTelephoneInput.sc.md) |
| Legend | molecules | [Web SC](../ds/components/molecules/Legend.sc.md) | [PENDING](ds/components/molecules/Legend.sc.md) |
| List | molecules | [Web SC](../ds/components/molecules/List.sc.md) | [PENDING](ds/components/molecules/List.sc.md) |
| ListBoxBody | molecules | [Web SC](../ds/components/molecules/ListBoxBody.sc.md) | [PENDING](ds/components/molecules/ListBoxBody.sc.md) |
| LoadingState | molecules | [Web SC](../ds/components/molecules/LoadingState.sc.md) | [PENDING](ds/components/molecules/LoadingState.sc.md) |
| LoadingStateBody | molecules | [Web SC](../ds/components/molecules/LoadingStateBody.sc.md) | [PENDING](ds/components/molecules/LoadingStateBody.sc.md) |
| LocaleSelector | molecules | [Web SC](../ds/components/molecules/LocaleSelector.sc.md) | [PENDING](ds/components/molecules/LocaleSelector.sc.md) |
| MaskedInput | molecules | [Web SC](../ds/components/molecules/MaskedInput.sc.md) | [PENDING](ds/components/molecules/MaskedInput.sc.md) |
| Menu | molecules | [Web SC](../ds/components/molecules/Menu.sc.md) | [PENDING](ds/components/molecules/Menu.sc.md) |
| Modal | molecules | [Web SC](../ds/components/molecules/Modal.sc.md) | [PENDING](ds/components/molecules/Modal.sc.md) |
| ModalHeader | molecules | [Web SC](../ds/components/molecules/ModalHeader.sc.md) | [PENDING](ds/components/molecules/ModalHeader.sc.md) |
| NavigationMenuItem | molecules | [Web SC](../ds/components/molecules/NavigationMenuItem.sc.md) | [PENDING](ds/components/molecules/NavigationMenuItem.sc.md) |
| NumberInput | molecules | [Web SC](../ds/components/molecules/NumberInput.sc.md) | [PENDING](ds/components/molecules/NumberInput.sc.md) |
| ODataFilterCondition | molecules | [Web SC](../ds/components/molecules/ODataFilterCondition.sc.md) | [PENDING](ds/components/molecules/ODataFilterCondition.sc.md) |
| ODataFilterGroup | molecules | [Web SC](../ds/components/molecules/ODataFilterGroup.sc.md) | [PENDING](ds/components/molecules/ODataFilterGroup.sc.md) |
| ODataFilterValue | molecules | [Web SC](../ds/components/molecules/ODataFilterValue.sc.md) | [PENDING](ds/components/molecules/ODataFilterValue.sc.md) |
| PageHeader | molecules | [Web SC](../ds/components/molecules/PageHeader.sc.md) | [PENDING](ds/components/molecules/PageHeader.sc.md) |
| PageTransition | molecules | [Web SC](../ds/components/molecules/PageTransition.sc.md) | [PENDING](ds/components/molecules/PageTransition.sc.md) |
| Pagination | molecules | [Web SC](../ds/components/molecules/Pagination.sc.md) | [PENDING](ds/components/molecules/Pagination.sc.md) |
| PasswordInput | molecules | [Web SC](../ds/components/molecules/PasswordInput.sc.md) | [PENDING](ds/components/molecules/PasswordInput.sc.md) |
| PercentageInput | molecules | [Web SC](../ds/components/molecules/PercentageInput.sc.md) | [PENDING](ds/components/molecules/PercentageInput.sc.md) |
| Popover | molecules | [Web SC](../ds/components/molecules/Popover.sc.md) | [PENDING](ds/components/molecules/Popover.sc.md) |
| PopupListbox | molecules | [Web SC](../ds/components/molecules/PopupListbox.sc.md) | [PENDING](ds/components/molecules/PopupListbox.sc.md) |
| PostalCodeInput | molecules | [Web SC](../ds/components/molecules/PostalCodeInput.sc.md) | [PENDING](ds/components/molecules/PostalCodeInput.sc.md) |
| ProgressBar | molecules | [Web SC](../ds/components/molecules/ProgressBar.sc.md) | [PENDING](ds/components/molecules/ProgressBar.sc.md) |
| RadioGroup | molecules | [Web SC](../ds/components/molecules/RadioGroup.sc.md) | [PENDING](ds/components/molecules/RadioGroup.sc.md) |
| RadioGroupItem | molecules | [Web SC](../ds/components/molecules/RadioGroupItem.sc.md) | [PENDING](ds/components/molecules/RadioGroupItem.sc.md) |
| SearchInput | molecules | [Web SC](../ds/components/molecules/SearchInput.sc.md) | [PENDING](ds/components/molecules/SearchInput.sc.md) |
| Slider | molecules | [Web SC](../ds/components/molecules/Slider.sc.md) | [PENDING](ds/components/molecules/Slider.sc.md) |
| StepperItem | molecules | [Web SC](../ds/components/molecules/StepperItem.sc.md) | [PENDING](ds/components/molecules/StepperItem.sc.md) |
| Tabs | molecules | [Web SC](../ds/components/molecules/Tabs.sc.md) | [PENDING](ds/components/molecules/Tabs.sc.md) |
| Tag | molecules | [Web SC](../ds/components/molecules/Tag.sc.md) | [PENDING](ds/components/molecules/Tag.sc.md) |
| TagGroup | molecules | [Web SC](../ds/components/molecules/TagGroup.sc.md) | [PENDING](ds/components/molecules/TagGroup.sc.md) |
| TagGroupItem | molecules | [Web SC](../ds/components/molecules/TagGroupItem.sc.md) | [PENDING](ds/components/molecules/TagGroupItem.sc.md) |
| TaxIdInput | molecules | [Web SC](../ds/components/molecules/TaxIdInput.sc.md) | [PENDING](ds/components/molecules/TaxIdInput.sc.md) |
| TelephoneInput | molecules | [Web SC](../ds/components/molecules/TelephoneInput.sc.md) | [PENDING](ds/components/molecules/TelephoneInput.sc.md) |
| ThemeSelector | molecules | [Web SC](../ds/components/molecules/ThemeSelector.sc.md) | [PENDING](ds/components/molecules/ThemeSelector.sc.md) |
| TimeInput | molecules | [Web SC](../ds/components/molecules/TimeInput.sc.md) | [PENDING](ds/components/molecules/TimeInput.sc.md) |
| Toast | molecules | [Web SC](../ds/components/molecules/Toast.sc.md) | [PENDING](ds/components/molecules/Toast.sc.md) |
| ToastFooter | molecules | [Web SC](../ds/components/molecules/ToastFooter.sc.md) | [PENDING](ds/components/molecules/ToastFooter.sc.md) |
| TokenInput | molecules | [Web SC](../ds/components/molecules/TokenInput.sc.md) | [PENDING](ds/components/molecules/TokenInput.sc.md) |
| Toolbar | molecules | [Web SC](../ds/components/molecules/Toolbar.sc.md) | [PENDING](ds/components/molecules/Toolbar.sc.md) |
| Tooltip | molecules | [Web SC](../ds/components/molecules/Tooltip.sc.md) | [PENDING](ds/components/molecules/Tooltip.sc.md) |
| TreeBody | molecules | [Web SC](../ds/components/molecules/TreeBody.sc.md) | [PENDING](ds/components/molecules/TreeBody.sc.md) |
| TreeGridBody | molecules | [Web SC](../ds/components/molecules/TreeGridBody.sc.md) | [PENDING](ds/components/molecules/TreeGridBody.sc.md) |
| TreeGridHeader | molecules | [Web SC](../ds/components/molecules/TreeGridHeader.sc.md) | [PENDING](ds/components/molecules/TreeGridHeader.sc.md) |
| TreeGridRow | molecules | [Web SC](../ds/components/molecules/TreeGridRow.sc.md) | [PENDING](ds/components/molecules/TreeGridRow.sc.md) |
| TreeGroup | molecules | [Web SC](../ds/components/molecules/TreeGroup.sc.md) | [PENDING](ds/components/molecules/TreeGroup.sc.md) |
| TreeItem | molecules | [Web SC](../ds/components/molecules/TreeItem.sc.md) | [PENDING](ds/components/molecules/TreeItem.sc.md) |
| UrlInput | molecules | [Web SC](../ds/components/molecules/UrlInput.sc.md) | [PENDING](ds/components/molecules/UrlInput.sc.md) |
| AlertDialog | organisms | [Web SC](../ds/components/organisms/AlertDialog.sc.md) | [PENDING](ds/components/organisms/AlertDialog.sc.md) |
| ConfirmationModal | organisms | [Web SC](../ds/components/organisms/ConfirmationModal.sc.md) | [PENDING](ds/components/organisms/ConfirmationModal.sc.md) |
| DataGrid | organisms | [Web SC](../ds/components/organisms/DataGrid.sc.md) | [PENDING](ds/components/organisms/DataGrid.sc.md) |
| Dialog | organisms | [Web SC](../ds/components/organisms/Dialog.sc.md) | [PENDING](ds/components/organisms/Dialog.sc.md) |
| Form | organisms | [Web SC](../ds/components/organisms/Form.sc.md) | [PENDING](ds/components/organisms/Form.sc.md) |
| FormFieldInput | organisms | [Web SC](../ds/components/organisms/Form/FormFieldInput.sc.md) | [PENDING](ds/components/organisms/FormFieldInput.sc.md) |
| ListBox | organisms | [Web SC](../ds/components/organisms/ListBox.sc.md) | [PENDING](ds/components/organisms/ListBox.sc.md) |
| MapView | organisms | [Web SC](../ds/components/organisms/MapView.sc.md) | [PENDING](ds/components/organisms/MapView.sc.md) |
| NavigationMenu | organisms | [Web SC](../ds/components/organisms/NavigationMenu.sc.md) | [PENDING](ds/components/organisms/NavigationMenu.sc.md) |
| ODataFilter | organisms | [Web SC](../ds/components/organisms/ODataFilter.sc.md) | [PENDING](ds/components/organisms/ODataFilter.sc.md) |
| Stepper | organisms | [Web SC](../ds/components/organisms/Stepper.sc.md) | [PENDING](ds/components/organisms/Stepper.sc.md) |
| ToastRegion | organisms | [Web SC](../ds/components/organisms/ToastRegion.sc.md) | [PENDING](ds/components/organisms/ToastRegion.sc.md) |
| Tree | organisms | [Web SC](../ds/components/organisms/Tree.sc.md) | [PENDING](ds/components/organisms/Tree.sc.md) |
| TreeGrid | organisms | [Web SC](../ds/components/organisms/TreeGrid.sc.md) | [PENDING](ds/components/organisms/TreeGrid.sc.md) |
| ApplicationLayoutTemplate | templates | [Web SC](../ds/components/templates/ApplicationLayoutTemplate.sc.md) | [PENDING](ds/components/templates/ApplicationLayoutTemplate.sc.md) |
| DetailPageTemplate | templates | [Web SC](../ds/components/templates/DetailPageTemplate.sc.md) | [PENDING](ds/components/templates/DetailPageTemplate.sc.md) |
| FormPageTemplate | templates | [Web SC](../ds/components/templates/FormPageTemplate.sc.md) | [PENDING](ds/components/templates/FormPageTemplate.sc.md) |
| HomePageTemplate | templates | [Web SC](../ds/components/templates/HomePageTemplate.sc.md) | [PENDING](ds/components/templates/HomePageTemplate.sc.md) |
| ListPageTemplate | templates | [Web SC](../ds/components/templates/ListPageTemplate.sc.md) | [PENDING](ds/components/templates/ListPageTemplate.sc.md) |
| ShowcasePageTemplate | templates | [Web SC](../ds/components/templates/ShowcasePageTemplate.sc.md) | [PENDING](ds/components/templates/ShowcasePageTemplate.sc.md) |
