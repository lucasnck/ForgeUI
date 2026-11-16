---
title: "Showcase V2 DS Coverage"
scope: "Per-resource specification coverage and pending acceptance for the full public Design System"
---

# Showcase V2 DS Coverage

## Coverage and status

This map specifies the complete DS migration; it is not a runtime registration list. The public barrel currently exposes 221 components and 15 hooks; 18 style SCs own the visual recipe/token resources. The delivered V2 set contains 221 component pages and all 33 planned resource pages: 15 public hooks and 18 style resources. The component pages and all 31 supporting type consumer checks are complete; two helper consumer checks remain PENDING for browser review. Only delivered entries belong in the live indexes.

The 223 component SCs include two non-page cases: private RangeTrack is exercised through public consumers, and DropdownMenuCompositeTrigger is a scenario of DropdownMenu rather than another export. Sixteen helper SCs and thirty-one type SCs define consumer/typed-fixture acceptance, without adding unsupported helper/type page kinds. Infrastructure hooks such as useTheme/useLocale and application hooks such as useCrudPageFlow keep their existing ownership; this DS mapping does not duplicate them.

PENDING refers to new V2 examples/consumer checks. Existing public exports and checked API criteria remain available. Preserve V1 registrations and existing delivered V2 entries; do not rebuild a DS component merely because its new showcase acceptance is pending.

Component pages retain Dynamic example, Properties, and Methods/resources. Hook/style pages retain Dynamic example and Contract only; Usage/resources and Related examples remain absent. Every example includes minimal copyable consumption code.

Delivered Tab coverage includes editable canonical visual axes, filled selected styling without an underline and optional square bottom corners through attached=true. Delivered Collapse/Accordion owner and part pages compose public Surface/Inline/Button resources; their triggers retain behavior/focus with neutralized native appearance. These refinements preserve the 221-page delivered total.

Delivered Form coverage includes required native validation, actual submitter FormData, caller loading and isolated Header/Body/Footer compositions. DataGridCell demonstrates explicit public cells and stable indexed sorting; DataGridFooter demonstrates twelve shared records across three caller-owned pages.

The complete DataGrid family now includes generated Header/ColumnHeader, Body and explicit Row pages. ListBox and its four public parts cover indexed single/multiple selection, filtering without record deletion, caller clear, native FormData and disabled-option keyboard traversal.

The complete Stepper family adds controlled linear navigation, caller-validated review/edit with retained drafts, and five contextual part pages. Native Tab order, current-step relationships and visible complete/error labels remain owned by the public DS composition.

Menu and its four public parts add indexed actions, disabled-item traversal, typeahead and dismissal notifications. DropdownMenu adds controlled default/composite triggers, visible dismissal and shared overlay focus/motion behavior.

NavigationMenu and its five public parts add real local anchors, caller-owned current destination, depth-first indexed groups and controlled expansion. Leaves retain native navigation; no disabled capability is advertised.

Tree and its five public parts add generated hierarchy metadata, disabled-node traversal, controlled selection/expansion and an independent rejection scenario. The visibleTree helper derives technical preorder feedback from the same source nodes without replacing the DS navigation engine.

Popover owner/parts add named panels and visible contextual dismissal; Tooltip keeps passive supplementary content, and OverlayPortal demonstrates caller-owned mounting/cleanup at the document body without claiming modality.

Dialog/AlertDialog/ConfirmationModal and their applicable public parts add native record inspection/editing, required validation, safe initial actions, acknowledgement and cancellable caller-owned pending confirmation. Alias previews preserve the canonical Modal constructors and one native engine.

All 221 public component pages are registered, including TreeGrid, query inputs and popup adapters, scoped notifications, React Hook Form fields, typed OData editors, local view transitions, composed PageHeader and isolated structural template documents. Component acceptance is independent from the remaining helper/type consumer checks below.

## Coverage summary

| Component level | Delivered | Pending | Total |
|---|---:|---:|---:|
| atoms | 115 | 0 | 115 |
| molecules | 86 | 0 | 86 |
| organisms | 14 | 0 | 14 |
| templates | 6 | 0 | 6 |
| **Components** | **221** | **0** | **221** |

Component page coverage: **100%**. Resource page coverage: **33/33 (100%)**. Consumer acceptance: **14/16 helper SCs** and **31/31 type SCs**, tracked separately below without new page kinds.

## Components

| Component | Level | Owning SC | V2 acceptance | Named scenarios |
|---|---|---|---|---|
| AccordionBody | atoms | [SC](ds/components/atoms/AccordionBody.sc.md) | Delivered | AccordionBody contextual region |
| AccordionFooter | atoms | [SC](ds/components/atoms/AccordionFooter.sc.md) | Delivered | AccordionFooter contextual region |
| AccordionHeader | atoms | [SC](ds/components/atoms/AccordionHeader.sc.md) | Delivered | AccordionHeader contextual region |
| AlertBody | atoms | [SC](ds/components/atoms/AlertBody.sc.md) | Delivered | AlertBody contextual region |
| AlertDialogBody | atoms | [SC](ds/components/atoms/AlertDialogBody.sc.md) | Delivered | AlertDialogBody contextual region |
| AlertDialogFooter | atoms | [SC](ds/components/atoms/AlertDialogFooter.sc.md) | Delivered | AlertDialogFooter contextual region |
| AlertFooter | atoms | [SC](ds/components/atoms/AlertFooter.sc.md) | Delivered | AlertFooter contextual region |
| AlertHeader | atoms | [SC](ds/components/atoms/AlertHeader.sc.md) | Delivered | AlertHeader contextual region |
| ApplicationLayoutBody | atoms | [SC](ds/components/atoms/ApplicationLayoutBody.sc.md) | Delivered | ApplicationLayoutBody contextual region |
| ApplicationLayoutFooter | atoms | [SC](ds/components/atoms/ApplicationLayoutFooter.sc.md) | Delivered | ApplicationLayoutFooter contextual region |
| ApplicationLayoutHeader | atoms | [SC](ds/components/atoms/ApplicationLayoutHeader.sc.md) | Delivered | ApplicationLayoutHeader contextual region |
| AspectRatio | atoms | [SC](ds/components/atoms/AspectRatio.sc.md) | Delivered | Media ratio |
| AutocompleteFooter | atoms | [SC](ds/components/atoms/AutocompleteFooter.sc.md) | Delivered | AutocompleteFooter contextual region |
| AutocompleteHeader | atoms | [SC](ds/components/atoms/AutocompleteHeader.sc.md) | Delivered | AutocompleteHeader contextual region |
| Avatar | atoms | [SC](ds/components/atoms/Avatar.sc.md) | Delivered | Identity fallback |
| Badge | atoms | [SC](ds/components/atoms/Badge.sc.md) | Delivered | Status marker |
| BreadcrumbItem | atoms | [SC](ds/components/atoms/BreadcrumbItem.sc.md) | Delivered | Indexed location trail |
| Button | atoms | [SC](ds/components/atoms/Button.sc.md) | Delivered | Existing named scenarios |
| CardBody | atoms | [SC](ds/components/atoms/CardBody.sc.md) | Delivered | Existing named scenarios |
| CardFooter | atoms | [SC](ds/components/atoms/CardFooter.sc.md) | Delivered | Existing named scenarios |
| CardHeader | atoms | [SC](ds/components/atoms/CardHeader.sc.md) | Delivered | Existing named scenarios |
| Checkbox | atoms | [SC](ds/components/atoms/Checkbox.sc.md) | Delivered | Controlled boolean |
| ChoiceGroupBody | atoms | [SC](ds/components/atoms/ChoiceGroupBody.sc.md) | Delivered | ChoiceGroupBody contextual region |
| ChoiceGroupFooter | atoms | [SC](ds/components/atoms/ChoiceGroupFooter.sc.md) | Delivered | ChoiceGroupFooter contextual region |
| ChoiceGroupHeader | atoms | [SC](ds/components/atoms/ChoiceGroupHeader.sc.md) | Delivered | ChoiceGroupHeader contextual region |
| CollapseBody | atoms | [SC](ds/components/atoms/CollapseBody.sc.md) | Delivered | CollapseBody contextual region |
| CollapseFooter | atoms | [SC](ds/components/atoms/CollapseFooter.sc.md) | Delivered | CollapseFooter contextual region |
| CollapseHeader | atoms | [SC](ds/components/atoms/CollapseHeader.sc.md) | Delivered | CollapseHeader contextual region |
| ComboboxFooter | atoms | [SC](ds/components/atoms/ComboboxFooter.sc.md) | Delivered | ComboboxFooter contextual region |
| ComboboxHeader | atoms | [SC](ds/components/atoms/ComboboxHeader.sc.md) | Delivered | ComboboxHeader contextual region |
| Container | atoms | [SC](ds/components/atoms/Container.sc.md) | Delivered | Composed content layout |
| CurrencyValue | atoms | [SC](ds/components/atoms/CurrencyValue.sc.md) | Delivered | Exact monetary display |
| DataGridCell | atoms | [SC](ds/components/atoms/DataGridCell.sc.md) | Delivered | DataGridCell contextual region |
| DataGridFooter | atoms | [SC](ds/components/atoms/DataGridFooter.sc.md) | Delivered | DataGridFooter contextual region |
| DialogBody | atoms | [SC](ds/components/atoms/DialogBody.sc.md) | Delivered | DialogBody contextual region |
| DialogClose | atoms | [SC](ds/components/atoms/DialogClose.sc.md) | Delivered | Contextual dismissal |
| DialogFooter | atoms | [SC](ds/components/atoms/DialogFooter.sc.md) | Delivered | DialogFooter contextual region |
| Divider | atoms | [SC](ds/components/atoms/Divider.sc.md) | Delivered | Separated regions |
| EmptyStateBody | atoms | [SC](ds/components/atoms/EmptyStateBody.sc.md) | Delivered | EmptyStateBody contextual region |
| EmptyStateFooter | atoms | [SC](ds/components/atoms/EmptyStateFooter.sc.md) | Delivered | EmptyStateFooter contextual region |
| EmptyStateHeader | atoms | [SC](ds/components/atoms/EmptyStateHeader.sc.md) | Delivered | EmptyStateHeader contextual region |
| ErrorStateBody | atoms | [SC](ds/components/atoms/ErrorStateBody.sc.md) | Delivered | ErrorStateBody contextual region |
| ErrorStateFooter | atoms | [SC](ds/components/atoms/ErrorStateFooter.sc.md) | Delivered | ErrorStateFooter contextual region |
| ErrorStateHeader | atoms | [SC](ds/components/atoms/ErrorStateHeader.sc.md) | Delivered | ErrorStateHeader contextual region |
| FieldError | atoms | [SC](ds/components/atoms/FieldError.sc.md) | Delivered | Connected field description |
| FieldHint | atoms | [SC](ds/components/atoms/FieldHint.sc.md) | Delivered | Connected field description |
| FormBody | atoms | [SC](ds/components/atoms/FormBody.sc.md) | Delivered | FormBody contextual region |
| FormFieldBody | atoms | [SC](ds/components/atoms/FormFieldBody.sc.md) | Delivered | FormFieldBody contextual region |
| FormFieldHeader | atoms | [SC](ds/components/atoms/FormFieldHeader.sc.md) | Delivered | FormFieldHeader contextual region |
| FormFooter | atoms | [SC](ds/components/atoms/FormFooter.sc.md) | Delivered | FormFooter contextual region |
| FormHeader | atoms | [SC](ds/components/atoms/FormHeader.sc.md) | Delivered | FormHeader contextual region |
| Heading | atoms | [SC](ds/components/atoms/Heading.sc.md) | Delivered | Semantic typography |
| Icon | atoms | [SC](ds/components/atoms/Icon.sc.md) | Delivered | Inline icon |
| Inline | atoms | [SC](ds/components/atoms/Inline.sc.md) | Delivered | Action grouping |
| Input | atoms | [SC](ds/components/atoms/Input.sc.md) | Delivered | Controlled text entry |
| Label | atoms | [SC](ds/components/atoms/Label.sc.md) | Delivered | Connected field description |
| Link | atoms | [SC](ds/components/atoms/Link.sc.md) | Delivered | Local anchor navigation |
| ListBody | atoms | [SC](ds/components/atoms/ListBody.sc.md) | Delivered | ListBody contextual region |
| ListBoxFooter | atoms | [SC](ds/components/atoms/ListBoxFooter.sc.md) | Delivered | ListBoxFooter contextual region |
| ListBoxHeader | atoms | [SC](ds/components/atoms/ListBoxHeader.sc.md) | Delivered | ListBoxHeader contextual region |
| ListBoxItem | atoms | [SC](ds/components/atoms/ListBoxItem.sc.md) | Delivered | Generated listbox item |
| ListFooter | atoms | [SC](ds/components/atoms/ListFooter.sc.md) | Delivered | ListFooter contextual region |
| ListHeader | atoms | [SC](ds/components/atoms/ListHeader.sc.md) | Delivered | ListHeader contextual region |
| ListItem | atoms | [SC](ds/components/atoms/ListItem.sc.md) | Delivered | Indexed content list |
| LoadingStateFooter | atoms | [SC](ds/components/atoms/LoadingStateFooter.sc.md) | Delivered | LoadingStateFooter contextual region |
| LoadingStateHeader | atoms | [SC](ds/components/atoms/LoadingStateHeader.sc.md) | Delivered | LoadingStateHeader contextual region |
| MenuBody | atoms | [SC](ds/components/atoms/MenuBody.sc.md) | Delivered | MenuBody contextual region |
| MenuFooter | atoms | [SC](ds/components/atoms/MenuFooter.sc.md) | Delivered | MenuFooter contextual region |
| MenuHeader | atoms | [SC](ds/components/atoms/MenuHeader.sc.md) | Delivered | MenuHeader contextual region |
| MenuItem | atoms | [SC](ds/components/atoms/MenuItem.sc.md) | Delivered | Indexed action menu |
| Meter | atoms | [SC](ds/components/atoms/Meter.sc.md) | Delivered | Measured range |
| ModalBody | atoms | [SC](ds/components/atoms/ModalBody.sc.md) | Delivered | Existing named scenarios |
| ModalFooter | atoms | [SC](ds/components/atoms/ModalFooter.sc.md) | Delivered | Existing named scenarios |
| NavigationMenuBody | atoms | [SC](ds/components/atoms/NavigationMenuBody.sc.md) | Delivered | NavigationMenuBody contextual region |
| NavigationMenuFooter | atoms | [SC](ds/components/atoms/NavigationMenuFooter.sc.md) | Delivered | NavigationMenuFooter contextual region |
| NavigationMenuHeader | atoms | [SC](ds/components/atoms/NavigationMenuHeader.sc.md) | Delivered | NavigationMenuHeader contextual region |
| NavigationMenuSublist | atoms | [SC](ds/components/atoms/NavigationMenuSublist.sc.md) | Delivered | Nested local navigation |
| Option | atoms | [SC](ds/components/atoms/Option.sc.md) | Delivered | Indexed native selection |
| OverlayPortal | atoms | [SC](ds/components/atoms/OverlayPortal.sc.md) | Delivered | Mounted portal |
| PaginationEllipsis | atoms | [SC](ds/components/atoms/PaginationEllipsis.sc.md) | Delivered | Controlled pagination |
| PaginationItem | atoms | [SC](ds/components/atoms/PaginationItem.sc.md) | Delivered | Controlled pagination |
| PopoverBody | atoms | [SC](ds/components/atoms/PopoverBody.sc.md) | Delivered | PopoverBody contextual region |
| PopoverFooter | atoms | [SC](ds/components/atoms/PopoverFooter.sc.md) | Delivered | PopoverFooter contextual region |
| PopoverHeader | atoms | [SC](ds/components/atoms/PopoverHeader.sc.md) | Delivered | PopoverHeader contextual region |
| PopupListboxItem | atoms | [SC](ds/components/atoms/PopupListboxItem.sc.md) | Delivered | Public popup adapter |
| Progress | atoms | [SC](ds/components/atoms/Progress.sc.md) | Delivered | Measured range |
| Radio | atoms | [SC](ds/components/atoms/Radio.sc.md) | Delivered | Exclusive native choice |
| RangeTrack | atoms | [SC](ds/components/atoms/RangeTrack.sc.md) | Consumer coverage | Private range rendering |
| Select | atoms | [SC](ds/components/atoms/Select.sc.md) | Delivered | Indexed native selection |
| SharedElement | atoms | [SC](ds/components/atoms/SharedElement.sc.md) | Delivered | Local view transition |
| SimpleGrid | atoms | [SC](ds/components/atoms/SimpleGrid.sc.md) | Delivered | Indexed responsive grid |
| Skeleton | atoms | [SC](ds/components/atoms/Skeleton.sc.md) | Delivered | Loading presentation |
| Spinner | atoms | [SC](ds/components/atoms/Spinner.sc.md) | Delivered | Loading presentation |
| Stack | atoms | [SC](ds/components/atoms/Stack.sc.md) | Delivered | Composed content layout |
| StepperBody | atoms | [SC](ds/components/atoms/StepperBody.sc.md) | Delivered | StepperBody contextual region |
| StepperFooter | atoms | [SC](ds/components/atoms/StepperFooter.sc.md) | Delivered | StepperFooter contextual region |
| StepperHeader | atoms | [SC](ds/components/atoms/StepperHeader.sc.md) | Delivered | StepperHeader contextual region |
| StepperPanel | atoms | [SC](ds/components/atoms/StepperPanel.sc.md) | Delivered | StepperPanel contextual region |
| Surface | atoms | [SC](ds/components/atoms/Surface.sc.md) | Delivered | Composed content layout |
| Switch | atoms | [SC](ds/components/atoms/Switch.sc.md) | Delivered | Controlled boolean |
| Tab | atoms | [SC](ds/components/atoms/Tab.sc.md) | Delivered | Linked tab panels |
| TabPanel | atoms | [SC](ds/components/atoms/TabPanel.sc.md) | Delivered | Linked tab panels |
| TabsBody | atoms | [SC](ds/components/atoms/TabsBody.sc.md) | Delivered | TabsBody contextual region |
| TabsFooter | atoms | [SC](ds/components/atoms/TabsFooter.sc.md) | Delivered | TabsFooter contextual region |
| TabsHeader | atoms | [SC](ds/components/atoms/TabsHeader.sc.md) | Delivered | TabsHeader contextual region |
| Text | atoms | [SC](ds/components/atoms/Text.sc.md) | Delivered | Semantic typography |
| Textarea | atoms | [SC](ds/components/atoms/Textarea.sc.md) | Delivered | Controlled text entry |
| ToastBody | atoms | [SC](ds/components/atoms/ToastBody.sc.md) | Delivered | ToastBody contextual region |
| ToastHeader | atoms | [SC](ds/components/atoms/ToastHeader.sc.md) | Delivered | ToastHeader contextual region |
| ToolbarItem | atoms | [SC](ds/components/atoms/ToolbarItem.sc.md) | Delivered | Action toolbar |
| TreeFooter | atoms | [SC](ds/components/atoms/TreeFooter.sc.md) | Delivered | TreeFooter contextual region |
| TreeGridCell | atoms | [SC](ds/components/atoms/TreeGridCell.sc.md) | Delivered | TreeGridCell contextual region |
| TreeGridColumnHeader | atoms | [SC](ds/components/atoms/TreeGridColumnHeader.sc.md) | Delivered | TreeGridColumnHeader contextual region |
| TreeGridFooter | atoms | [SC](ds/components/atoms/TreeGridFooter.sc.md) | Delivered | TreeGridFooter contextual region |
| TreeHeader | atoms | [SC](ds/components/atoms/TreeHeader.sc.md) | Delivered | TreeHeader contextual region |
| VisuallyHidden | atoms | [SC](ds/components/atoms/VisuallyHidden.sc.md) | Delivered | Accessible supplementary text |
| Accordion | molecules | [SC](ds/components/molecules/Accordion.sc.md) | Delivered | Indexed expansion |
| AccordionItem | molecules | [SC](ds/components/molecules/AccordionItem.sc.md) | Delivered | Indexed expansion |
| Alert | molecules | [SC](ds/components/molecules/Alert.sc.md) | Delivered | Composed feedback |
| AlertDialogHeader | molecules | [SC](ds/components/molecules/AlertDialogHeader.sc.md) | Delivered | AlertDialogHeader contextual region |
| Autocomplete | molecules | [SC](ds/components/molecules/Autocomplete.sc.md) | Delivered | Filtered indexed options |
| AutocompleteBody | molecules | [SC](ds/components/molecules/AutocompleteBody.sc.md) | Delivered | AutocompleteBody contextual region |
| Breadcrumb | molecules | [SC](ds/components/molecules/Breadcrumb.sc.md) | Delivered | Indexed location trail |
| ButtonGroup | molecules | [SC](ds/components/molecules/ButtonGroup.sc.md) | Delivered | Action grouping |
| Card | molecules | [SC](ds/components/molecules/Card.sc.md) | Delivered | Existing named scenarios |
| CheckboxGroup | molecules | [SC](ds/components/molecules/CheckboxGroup.sc.md) | Delivered | Indexed choice composition |
| CheckboxGroupItem | molecules | [SC](ds/components/molecules/CheckboxGroupItem.sc.md) | Delivered | Indexed choice composition |
| ChoiceGroup | molecules | [SC](ds/components/molecules/ChoiceGroup.sc.md) | Delivered | Indexed choice composition |
| Collapse | molecules | [SC](ds/components/molecules/Collapse.sc.md) | Delivered | Visible disclosure |
| ColorInput | molecules | [SC](ds/components/molecules/ColorInput.sc.md) | Delivered | Typed native entry |
| Combobox | molecules | [SC](ds/components/molecules/Combobox.sc.md) | Delivered | Filtered indexed options |
| ComboboxBody | molecules | [SC](ds/components/molecules/ComboboxBody.sc.md) | Delivered | ComboboxBody contextual region |
| CurrencyInput | molecules | [SC](ds/components/molecules/CurrencyInput.sc.md) | Delivered | Exact monetary entry |
| DataGridBody | molecules | [SC](ds/components/molecules/DataGridBody.sc.md) | Delivered | DataGridBody contextual region |
| DataGridColumnHeader | molecules | [SC](ds/components/molecules/DataGridColumnHeader.sc.md) | Delivered | DataGridColumnHeader contextual region |
| DataGridHeader | molecules | [SC](ds/components/molecules/DataGridHeader.sc.md) | Delivered | DataGridHeader contextual region |
| DataGridRow | molecules | [SC](ds/components/molecules/DataGridRow.sc.md) | Delivered | DataGridRow contextual region |
| DateInput | molecules | [SC](ds/components/molecules/DateInput.sc.md) | Delivered | Canonical masked entry |
| DateTimeInput | molecules | [SC](ds/components/molecules/DateTimeInput.sc.md) | Delivered | Typed native entry |
| DialogHeader | molecules | [SC](ds/components/molecules/DialogHeader.sc.md) | Delivered | DialogHeader contextual region |
| Disclosure | molecules | [SC](ds/components/molecules/Disclosure.sc.md) | Delivered | Visible disclosure |
| DropdownMenu | molecules | [SC](ds/components/molecules/DropdownMenu.sc.md) | Delivered | Default and composite triggers |
| DropdownMenuCompositeTrigger | molecules | [SC](ds/components/molecules/DropdownMenuCompositeTrigger.sc.md) | Aggregate scenario | Composite identity trigger |
| EmailInput | molecules | [SC](ds/components/molecules/EmailInput.sc.md) | Delivered | Provider completion |
| EmptyState | molecules | [SC](ds/components/molecules/EmptyState.sc.md) | Delivered | Composed feedback |
| ErrorState | molecules | [SC](ds/components/molecules/ErrorState.sc.md) | Delivered | Composed feedback |
| FileInput | molecules | [SC](ds/components/molecules/FileInput.sc.md) | Delivered | Local file selection |
| FormField | molecules | [SC](ds/components/molecules/FormField.sc.md) | Delivered | Field label hint and error |
| FormFieldFooter | molecules | [SC](ds/components/molecules/FormFieldFooter.sc.md) | Delivered | FormFieldFooter contextual region |
| IconButton | molecules | [SC](ds/components/molecules/IconButton.sc.md) | Delivered | Named icon action |
| InputAddon | molecules | [SC](ds/components/molecules/InputAddon.sc.md) | Delivered | Composed input actions |
| InputBase | molecules | [SC](ds/components/molecules/InputBase.sc.md) | Delivered | Controlled text entry |
| InputGroup | molecules | [SC](ds/components/molecules/InputGroup.sc.md) | Delivered | Composed input actions |
| InternationalTelephoneInput | molecules | [SC](ds/components/molecules/InternationalTelephoneInput.sc.md) | Delivered | International phone entry |
| Legend | molecules | [SC](ds/components/molecules/Legend.sc.md) | Delivered | Connected field description |
| List | molecules | [SC](ds/components/molecules/List.sc.md) | Delivered | Indexed content list |
| ListBoxBody | molecules | [SC](ds/components/molecules/ListBoxBody.sc.md) | Delivered | ListBoxBody contextual region |
| LoadingState | molecules | [SC](ds/components/molecules/LoadingState.sc.md) | Delivered | Composed feedback |
| LoadingStateBody | molecules | [SC](ds/components/molecules/LoadingStateBody.sc.md) | Delivered | LoadingStateBody contextual region |
| LocaleSelector | molecules | [SC](ds/components/molecules/LocaleSelector.sc.md) | Delivered | Valid preference options |
| MaskedInput | molecules | [SC](ds/components/molecules/MaskedInput.sc.md) | Delivered | Canonical masked entry |
| Menu | molecules | [SC](ds/components/molecules/Menu.sc.md) | Delivered | Indexed action menu |
| Modal | molecules | [SC](ds/components/molecules/Modal.sc.md) | Delivered | Existing named scenarios |
| ModalHeader | molecules | [SC](ds/components/molecules/ModalHeader.sc.md) | Delivered | Existing named scenarios |
| NavigationMenuItem | molecules | [SC](ds/components/molecules/NavigationMenuItem.sc.md) | Delivered | Nested local navigation |
| NumberInput | molecules | [SC](ds/components/molecules/NumberInput.sc.md) | Delivered | Native numeric constraints |
| ODataFilterCondition | molecules | [SC](ds/components/molecules/ODataFilterCondition.sc.md) | Delivered | Typed filter editing |
| ODataFilterGroup | molecules | [SC](ds/components/molecules/ODataFilterGroup.sc.md) | Delivered | Typed filter editing |
| ODataFilterValue | molecules | [SC](ds/components/molecules/ODataFilterValue.sc.md) | Delivered | Typed filter editing |
| PageHeader | molecules | [SC](ds/components/molecules/PageHeader.sc.md) | Delivered | Composed page heading |
| PageTransition | molecules | [SC](ds/components/molecules/PageTransition.sc.md) | Delivered | Local view transition |
| Pagination | molecules | [SC](ds/components/molecules/Pagination.sc.md) | Delivered | Controlled pagination |
| PasswordInput | molecules | [SC](ds/components/molecules/PasswordInput.sc.md) | Delivered | Reveal and conceal |
| PercentageInput | molecules | [SC](ds/components/molecules/PercentageInput.sc.md) | Delivered | Native numeric constraints |
| Popover | molecules | [SC](ds/components/molecules/Popover.sc.md) | Delivered | Named composed popover |
| PopupListbox | molecules | [SC](ds/components/molecules/PopupListbox.sc.md) | Delivered | Public popup adapter |
| PostalCodeInput | molecules | [SC](ds/components/molecules/PostalCodeInput.sc.md) | Delivered | Canonical masked entry |
| ProgressBar | molecules | [SC](ds/components/molecules/ProgressBar.sc.md) | Delivered | Measured range |
| RadioGroup | molecules | [SC](ds/components/molecules/RadioGroup.sc.md) | Delivered | Indexed choice composition |
| RadioGroupItem | molecules | [SC](ds/components/molecules/RadioGroupItem.sc.md) | Delivered | Indexed choice composition |
| SearchInput | molecules | [SC](ds/components/molecules/SearchInput.sc.md) | Delivered | Query and clear |
| Slider | molecules | [SC](ds/components/molecules/Slider.sc.md) | Delivered | Measured range |
| StepperItem | molecules | [SC](ds/components/molecules/StepperItem.sc.md) | Delivered | Registered step control |
| Tabs | molecules | [SC](ds/components/molecules/Tabs.sc.md) | Delivered | Linked tab panels |
| Tag | molecules | [SC](ds/components/molecules/Tag.sc.md) | Delivered | Indexed tag removal |
| TagGroup | molecules | [SC](ds/components/molecules/TagGroup.sc.md) | Delivered | Indexed tag removal |
| TagGroupItem | molecules | [SC](ds/components/molecules/TagGroupItem.sc.md) | Delivered | Indexed tag removal |
| TaxIdInput | molecules | [SC](ds/components/molecules/TaxIdInput.sc.md) | Delivered | Canonical masked entry |
| TelephoneInput | molecules | [SC](ds/components/molecules/TelephoneInput.sc.md) | Delivered | Typed native entry |
| ThemeSelector | molecules | [SC](ds/components/molecules/ThemeSelector.sc.md) | Delivered | Valid preference options |
| TimeInput | molecules | [SC](ds/components/molecules/TimeInput.sc.md) | Delivered | Typed native entry |
| Toast | molecules | [SC](ds/components/molecules/Toast.sc.md) | Delivered | Scoped toast composition |
| ToastFooter | molecules | [SC](ds/components/molecules/ToastFooter.sc.md) | Delivered | ToastFooter contextual region |
| TokenInput | molecules | [SC](ds/components/molecules/TokenInput.sc.md) | Delivered | Canonical masked entry |
| Toolbar | molecules | [SC](ds/components/molecules/Toolbar.sc.md) | Delivered | Action toolbar |
| Tooltip | molecules | [SC](ds/components/molecules/Tooltip.sc.md) | Delivered | Pointer and focus hint |
| TreeBody | molecules | [SC](ds/components/molecules/TreeBody.sc.md) | Delivered | TreeBody contextual region |
| TreeGridBody | molecules | [SC](ds/components/molecules/TreeGridBody.sc.md) | Delivered | TreeGridBody contextual region |
| TreeGridHeader | molecules | [SC](ds/components/molecules/TreeGridHeader.sc.md) | Delivered | TreeGridHeader contextual region |
| TreeGridRow | molecules | [SC](ds/components/molecules/TreeGridRow.sc.md) | Delivered | TreeGridRow contextual region |
| TreeGroup | molecules | [SC](ds/components/molecules/TreeGroup.sc.md) | Delivered | Generated tree nodes |
| TreeItem | molecules | [SC](ds/components/molecules/TreeItem.sc.md) | Delivered | Generated tree nodes |
| UrlInput | molecules | [SC](ds/components/molecules/UrlInput.sc.md) | Delivered | Typed native entry |
| AlertDialog | organisms | [SC](ds/components/organisms/AlertDialog.sc.md) | Delivered | Record confirmation, Validated acknowledgement |
| ConfirmationModal | organisms | [SC](ds/components/organisms/ConfirmationModal.sc.md) | Delivered | Immediate confirmation, Pending confirmation |
| DataGrid | organisms | [SC](ds/components/organisms/DataGrid.sc.md) | Delivered | Existing named scenarios |
| Dialog | organisms | [SC](ds/components/organisms/Dialog.sc.md) | Delivered | Record inspection, Editable local record |
| FormFieldInput | organisms | [SC](ds/components/organisms/Form/FormFieldInput.sc.md) | Delivered | Registered required field, Conditional registered field |
| Form | organisms | [SC](ds/components/organisms/Form.sc.md) | Delivered | Required native submission, Multiple submit intents |
| ListBox | organisms | [SC](ds/components/organisms/ListBox.sc.md) | Delivered | Single record selection, Filtered multiple selection |
| MapView | organisms | [SC](ds/components/organisms/MapView.sc.md) | Delivered | Schematic route preview, Simulated instructor approach, Completed journey geometry |
| NavigationMenu | organisms | [SC](ds/components/organisms/NavigationMenu.sc.md) | Delivered | Flat local destinations, Hierarchical destinations |
| ODataFilter | organisms | [SC](ds/components/organisms/ODataFilter.sc.md) | Delivered | Simple typed fields, Advanced nested conditions, Sidebar filters, Dropdown filters |
| Stepper | organisms | [SC](ds/components/organisms/Stepper.sc.md) | Delivered | Linear local entry, Review and edit |
| ToastRegion | organisms | [SC](ds/components/organisms/ToastRegion.sc.md) | Delivered | Manual scoped notifications, Timed queue and pause |
| Tree | organisms | [SC](ds/components/organisms/Tree.sc.md) | Delivered | Hierarchical selection, Controlled expansion rejection |
| TreeGrid | organisms | [SC](ds/components/organisms/TreeGrid.sc.md) | Delivered | Hierarchical tabular records, Controlled hierarchy filtering |
| ApplicationLayoutTemplate | templates | [SC](ds/components/templates/ApplicationLayoutTemplate.sc.md) | Delivered | Application shell, Minimal content shell |
| DetailPageTemplate | templates | [SC](ds/components/templates/DetailPageTemplate.sc.md) | Delivered | Existing named scenarios |
| FormPageTemplate | templates | [SC](ds/components/templates/FormPageTemplate.sc.md) | Delivered | Existing named scenarios |
| HomePageTemplate | templates | [SC](ds/components/templates/HomePageTemplate.sc.md) | Delivered | Existing named scenarios |
| ListPageTemplate | templates | [SC](ds/components/templates/ListPageTemplate.sc.md) | Delivered | Existing named scenarios |
| ShowcasePageTemplate | templates | [SC](ds/components/templates/ShowcasePageTemplate.sc.md) | Delivered | Catalog shell, Focused preview shell |

## Hooks and styles

| Resource | Kind | Owning SC | Target slug | Named example | V2 acceptance |
|---|---|---|---|---|---|
| useCollapse | hook | [SC](ds/hooks/tech-disclosure-hooks.sc.md) | `use-collapse` | Controlled and local disclosure | Delivered |
| useDisclosureGroup | hook | [SC](ds/hooks/tech-disclosure-hooks.sc.md) | `use-disclosure-group` | Exclusive and multiple keys | Delivered |
| useAccordion | hook | [SC](ds/hooks/tech-disclosure-hooks.sc.md) | `use-accordion` | Semantic accordion adapter | Delivered |
| useGridNavigation | hook | [SC](ds/hooks/tech-grid-navigation.sc.md) | `use-grid-navigation` | Cell focus matrix | Delivered |
| useListBoxState | hook | [SC](ds/hooks/tech-listbox-state.sc.md) | `use-list-box-state` | Controlled option selection | Delivered |
| useMaskedInput | hook | [SC](ds/hooks/tech-mask.sc.md) | `use-masked-input` | Display and canonical mask value | Delivered |
| useModal | hook | [SC](ds/hooks/tech-modal-interactions.sc.md) | `use-modal` | Native modal lifecycle | Delivered |
| useToastRegion | hook | [SC](ds/hooks/tech-notifications.sc.md) | `use-toast-region` | Scoped queue operations | Delivered |
| useToast | hook | [SC](ds/hooks/tech-notifications.sc.md) | `use-toast` | Scoped producer | Delivered |
| useOverlay | hook | [SC](ds/hooks/tech-overlay-interactions.sc.md) | `use-overlay` | Outside and topmost dismissal | Delivered |
| usePopupListbox | hook | [SC](ds/hooks/tech-popup-contracts.sc.md) | `use-popup-listbox` | Active descendant and acceptance | Delivered |
| useRovingFocus | hook | [SC](ds/hooks/tech-roving-focus.sc.md) | `use-roving-focus` | Registered toolbar focus | Delivered |
| useTreeState | hook | [SC](ds/hooks/tech-tree-state.sc.md) | `use-tree-state` | Controlled tree data state | Delivered |
| useTreeNavigation | hook | [SC](ds/hooks/tech-tree-state.sc.md) | `use-tree-navigation` | Hierarchical focus traversal | Delivered |
| DataGridRecipes | style | [SC](ds/styles/tech-data-grid-components.sc.md) | `data-grid-recipes` | Grid recipe anatomy | Delivered |
| IconRecipes | style | [SC](ds/styles/tech-icon.sc.md) | `icon-recipes` | Icon sizing and alignment | Delivered |
| InteractiveRecipes | style | [SC](ds/styles/tech-interactive-primitives.sc.md) | `interactive-recipes` | Native interaction states | Delivered |
| LayoutRecipes | style | [SC](ds/styles/tech-layout.sc.md) | `layout-recipes` | Layout composition | Delivered |
| LoadingRecipes | style | [SC](ds/styles/tech-loading-indicators.sc.md) | `loading-recipes` | Loading recipe comparison | Delivered |
| NativeControlRecipes | style | [SC](ds/styles/tech-native-control-recipes.sc.md) | `native-control-recipes` | Native control surfaces | Delivered |
| OverlayScrollLock | style | [SC](ds/styles/tech-overlay-scroll-lock.sc.md) | `overlay-scroll-lock` | Scoped scroll ownership | Delivered |
| PopupRecipes | style | [SC](ds/styles/tech-popup-recipes.sc.md) | `popup-recipes` | Anchored option surface | Delivered |
| RangeRecipes | style | [SC](ds/styles/tech-range-recipes.sc.md) | `range-recipes` | Range presentation | Delivered |
| ScrollbarRecipes | style | [SC](ds/styles/tech-scrollbars.sc.md) | `scrollbars` | Bounded scroll region | Delivered |
| ShapeRecipes | style | [SC](ds/styles/tech-shape.sc.md) | `shape-recipes` | Inherited and explicit shape | Delivered |
| StatusRecipes | style | [SC](ds/styles/tech-status-primitives.sc.md) | `status-recipes` | Status surface anatomy | Delivered |
| TypographyRecipes | style | [SC](ds/styles/tech-typography.sc.md) | `typography-recipes` | Semantic text scale | Delivered |
| PageTransitionRecipes | style | [SC](ds/styles/animations/tech-page-transitions.sc.md) | `page-transition-recipes` | Local region transitions | Delivered |
| SharedElementRecipes | style | [SC](ds/styles/animations/tech-shared-element-transitions.sc.md) | `shared-element-recipes` | Shared record identity | Delivered |
| SurfaceAnimationRecipes | style | [SC](ds/styles/animations/tech-surface-animations.sc.md) | `surface-animations` | Surface effect comparison | Delivered |
| usePresence | hook | [SC](ds/hooks/tech-presence.sc.md) | `use-presence` | Visual presence | Delivered |
| Motion recipes | style | [SC](ds/styles/animations/tech-motion-recipes.sc.md) | `motion-recipes` | Presence recipes | Delivered |
| Design tokens | style | [SC](ds/styles/tech-design-tokens.sc.md) | `design-tokens` | Token specimens | Delivered |

## Helpers and types

| Owning SC | Consumer coverage | Acceptance |
|---|---|---|
| [Document formatting and validation](ds/helpers/tech-brazilian-document-formatters.sc.md) | TaxIdInput | Delivered consumer fixtures |
| [Compound guard contracts](ds/helpers/tech-compound-parts.sc.md) | Card | Delivered consumer fixtures |
| [Civil date display](ds/helpers/tech-date-only-formatters.sc.md) | DateInput | Delivered consumer fixtures |
| [Elapsed duration display](ds/helpers/tech-duration-formatters.sc.md) | Text | Delivered consumer fixtures |
| [File size display](ds/helpers/tech-file-size-formatters.sc.md) | FileInput | Delivered consumer fixtures |
| [Formatter namespace contracts](ds/helpers/tech-formatting-api.sc.md) | Text | Delivered consumer fixtures |
| [Supported icon geometry](ds/helpers/tech-icon-sources.sc.md) | Icon | Implemented; visual review pending |
| [Pure mask application](ds/helpers/tech-mask-helpers.sc.md) | MaskedInput | Delivered consumer fixtures |
| [Map geometry](ds/helpers/tech-map-geometry.sc.md) | MapView | Delivered decoder/scene fixtures; cartographic integration remains separate |
| [Exact money formatting](ds/helpers/tech-money.sc.md) | CurrencyInput | Delivered consumer fixtures |
| [Serialized filter acceptance](ds/helpers/tech-odata-filter.sc.md) | ODataFilter | Delivered consumer fixtures |
| [Phone normalization and validation](ds/helpers/tech-phone-formatters.sc.md) | InternationalTelephoneInput | Delivered consumer fixtures |
| [Postal code display](ds/helpers/tech-postal-code-formatters.sc.md) | PostalCodeInput | Delivered consumer fixtures |
| [Normalized range boundaries](ds/helpers/tech-range-indicators.sc.md) | ProgressBar | Implemented; visual review pending |
| [Deterministic relative time](ds/helpers/tech-relative-time-formatters.sc.md) | Text | Delivered consumer fixtures |
| [Visible indexed traversal](ds/helpers/tech-tree-traversal.sc.md) | Tree | Delivered consumer fixtures |
| [animation-contracts](ds/types/tech-animation-contracts.sc.md) | usePresence, Motion recipes | Delivered type fixtures |
| [collection-contracts](ds/types/tech-collection-contracts.sc.md) | DataGrid, Menu, Stepper | Delivered type fixtures |
| [component-capabilities](ds/types/tech-component-capabilities.sc.md) | Button, Input, Surface | Delivered type fixtures |
| [compound-composition](ds/types/tech-compound-composition.sc.md) | Card, Modal, Accordion | Delivered type fixtures |
| [disclosure-contracts](ds/types/tech-disclosure-contracts.sc.md) | Collapse, Accordion | Delivered type fixtures |
| [focus-contracts](ds/types/tech-focus-contracts.sc.md) | Toolbar, Tabs, useRovingFocus | Delivered type fixtures |
| [form-field-organisms](ds/types/tech-form-field-organisms.sc.md) | FormFieldInput | Delivered type fixtures |
| [grid-navigation-contracts](ds/types/tech-grid-navigation-contracts.sc.md) | DataGrid, TreeGrid, useGridNavigation | Delivered type fixtures |
| [icon-contracts](ds/types/tech-icon-contracts.sc.md) | Icon, IconButton | Delivered type fixtures |
| [icon-geometry](ds/types/tech-icon-geometry.sc.md) | Icon | Delivered type fixtures |
| [input-specializations](ds/types/tech-input-specializations.sc.md) | EmailInput, PasswordInput, SearchInput | Delivered type fixtures |
| [interactive-controls](ds/types/tech-interactive-controls.sc.md) | Checkbox, RadioGroup, Switch | Delivered type fixtures |
| [layout-contracts](ds/types/tech-layout-contracts.sc.md) | Inline, Stack, SimpleGrid | Delivered type fixtures |
| [listbox-state-contracts](ds/types/tech-listbox-state-contracts.sc.md) | ListBox, useListBoxState | Delivered type fixtures |
| [loading-contracts](ds/types/tech-loading-contracts.sc.md) | Button, Spinner, Skeleton | Delivered type fixtures |
| [mask-contracts](ds/types/tech-mask-contracts.sc.md) | MaskedInput, useMaskedInput | Delivered type fixtures |
| [modal-contracts](ds/types/tech-modal-contracts.sc.md) | Dialog, AlertDialog, useModal | Delivered type fixtures |
| [map-contracts](ds/types/tech-map-contracts.sc.md) | MapView | Delivered accepted/rejected type fixtures |
| [money-contracts](ds/types/tech-money-contracts.sc.md) | CurrencyInput, CurrencyValue | Delivered type fixtures |
| [native-control-contracts](ds/types/tech-native-control-contracts.sc.md) | Input, Select, Checkbox | Delivered type fixtures |
| [notification-contracts](ds/types/tech-notification-contracts.sc.md) | ToastRegion, useToast | Delivered type fixtures |
| [odata-filter-contracts](ds/types/tech-odata-filter-contracts.sc.md) | ODataFilter | Delivered type fixtures |
| [overlay-contracts](ds/types/tech-overlay-contracts.sc.md) | Popover, DropdownMenu, useOverlay | Delivered type fixtures |
| [page-transition-contracts](ds/types/tech-page-transition-contracts.sc.md) | PageTransition, SharedElement | Delivered type fixtures |
| [phone-contracts](ds/types/tech-phone-contracts.sc.md) | InternationalTelephoneInput | Delivered type fixtures |
| [popup-types](ds/types/tech-popup-types.sc.md) | Autocomplete, Combobox, usePopupListbox | Delivered type fixtures |
| [range-contracts](ds/types/tech-range-contracts.sc.md) | Progress, Meter, Slider | Delivered type fixtures |
| [selection-navigation](ds/types/tech-selection-navigation.sc.md) | NavigationMenu, Menu, Stepper | Delivered type fixtures |
| [tree-contracts](ds/types/tech-tree-contracts.sc.md) | Tree, TreeGrid, useTreeState | Delivered type fixtures |
| [typography-contracts](ds/types/tech-typography-contracts.sc.md) | Heading, Text, Label | Delivered type fixtures |
| [virtual-window-contracts](ds/types/tech-virtual-window-contracts.sc.md) | Type-only VirtualWindowOptions/VirtualWindowContract; no current consumer prop assumed | Delivered type fixtures |

## Delivery sequence

Implement hook/style resources and their shared V2 definition/fixture checks first, then the remaining component pages and the public primitives/owners required by each selected composition; contextual parts reuse their owner fixtures. Existing public source remains the authority, and no private context or guard bypass is permitted. Organisms require both specifically named use scenarios before registration.

Keep full-page template landmarks inside titled, finite static frame documents instead of nested main elements. Preview-only frame/provider orchestration stays out of copied application consumption code. Hooks call real public hooks inside local view hooks; styles import their existing recipes. Controls use valid typed values and prop-name/index text, with semantic localized action labels where needed.

Completion requires the owning new unchecked criteria, meaningful type/behavior checks, and direct browser review of the affected composition. Documentation-only changes do not establish runtime acceptance; keep pending rows out of live indexes until implemented.

ListBoxItem exposes canonical size, tone, appearance and shape editors through public ListBoxOption descriptors. The selected item retains a filled tone and border/weight cue separate from native focus; disabled options keep their keyboard behavior. This extension adds no page to the delivered component totals.
