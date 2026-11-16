/** Source-accurate Showcase V2 metadata, extracted from PraticarFront.
 * Only entries with status="preview" are routed in this incremental Forge UI build.
 * No copied implementation is considered complete until it uses @forge-ui/web and is validated.
 */
export type ComponentLevel = "atoms" | "molecules" | "organisms" | "templates";
export type MigrationStatus = "preview" | "library-only" | "pending";
export interface ShowcaseEntry { name:string; slug:string; level:ComponentLevel; specification:string; status:MigrationStatus; }
export interface ResourceEntry { name:string; slug:string; kind:"hook"|"style"; specification:string; source:string; }
export const showcaseLevels: readonly ComponentLevel[] = ["atoms","molecules","organisms","templates"];
export const showcaseEntries: readonly ShowcaseEntry[] = 
[
  {
    "name": "MapView",
    "slug": "map-view",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/MapView.sc.md",
    "status": "pending"
  },
  {
    "name": "ApplicationLayoutTemplate",
    "slug": "application-layout-template",
    "level": "templates",
    "specification": "docs/sc/ds/components/templates/ApplicationLayoutTemplate.sc.md",
    "status": "pending"
  },
  {
    "name": "ApplicationLayoutHeader",
    "slug": "application-layout-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ApplicationLayoutHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "ApplicationLayoutBody",
    "slug": "application-layout-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ApplicationLayoutBody.sc.md",
    "status": "pending"
  },
  {
    "name": "ApplicationLayoutFooter",
    "slug": "application-layout-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ApplicationLayoutFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "ShowcasePageTemplate",
    "slug": "showcase-page-template",
    "level": "templates",
    "specification": "docs/sc/ds/components/templates/ShowcasePageTemplate.sc.md",
    "status": "library-only"
  },
  {
    "name": "PageHeader",
    "slug": "page-header",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/PageHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "ODataFilter",
    "slug": "odata-filter",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/ODataFilter.sc.md",
    "status": "pending"
  },
  {
    "name": "ODataFilterCondition",
    "slug": "odata-filter-condition",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ODataFilterCondition.sc.md",
    "status": "pending"
  },
  {
    "name": "ODataFilterGroup",
    "slug": "odata-filter-group",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ODataFilterGroup.sc.md",
    "status": "pending"
  },
  {
    "name": "ODataFilterValue",
    "slug": "odata-filter-value",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ODataFilterValue.sc.md",
    "status": "pending"
  },
  {
    "name": "SharedElement",
    "slug": "shared-element",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/SharedElement.sc.md",
    "status": "pending"
  },
  {
    "name": "PageTransition",
    "slug": "page-transition",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/PageTransition.sc.md",
    "status": "pending"
  },
  {
    "name": "FormFieldInput",
    "slug": "form-field-input",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/Form/FormFieldInput.sc.md",
    "status": "pending"
  },
  {
    "name": "ToastRegion",
    "slug": "toast-region",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/ToastRegion.sc.md",
    "status": "pending"
  },
  {
    "name": "Toast",
    "slug": "toast",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Toast.sc.md",
    "status": "pending"
  },
  {
    "name": "ToastHeader",
    "slug": "toast-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ToastHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "ToastBody",
    "slug": "toast-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ToastBody.sc.md",
    "status": "pending"
  },
  {
    "name": "ToastFooter",
    "slug": "toast-footer",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ToastFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "PopupListboxItem",
    "slug": "popup-listbox-item",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/PopupListboxItem.sc.md",
    "status": "pending"
  },
  {
    "name": "PopupListbox",
    "slug": "popup-listbox",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/PopupListbox.sc.md",
    "status": "pending"
  },
  {
    "name": "Autocomplete",
    "slug": "autocomplete",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Autocomplete.sc.md",
    "status": "pending"
  },
  {
    "name": "AutocompleteHeader",
    "slug": "autocomplete-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AutocompleteHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "AutocompleteBody",
    "slug": "autocomplete-body",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/AutocompleteBody.sc.md",
    "status": "pending"
  },
  {
    "name": "AutocompleteFooter",
    "slug": "autocomplete-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AutocompleteFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "Combobox",
    "slug": "combobox",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Combobox.sc.md",
    "status": "pending"
  },
  {
    "name": "ComboboxHeader",
    "slug": "combobox-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ComboboxHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "ComboboxBody",
    "slug": "combobox-body",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ComboboxBody.sc.md",
    "status": "pending"
  },
  {
    "name": "ComboboxFooter",
    "slug": "combobox-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ComboboxFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGrid",
    "slug": "tree-grid",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/TreeGrid.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGridHeader",
    "slug": "tree-grid-header",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TreeGridHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGridBody",
    "slug": "tree-grid-body",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TreeGridBody.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGridFooter",
    "slug": "tree-grid-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TreeGridFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGridRow",
    "slug": "tree-grid-row",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TreeGridRow.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGridCell",
    "slug": "tree-grid-cell",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TreeGridCell.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGridColumnHeader",
    "slug": "tree-grid-column-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TreeGridColumnHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "Dialog",
    "slug": "dialog",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/Dialog.sc.md",
    "status": "pending"
  },
  {
    "name": "DialogHeader",
    "slug": "dialog-header",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DialogHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "DialogBody",
    "slug": "dialog-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/DialogBody.sc.md",
    "status": "pending"
  },
  {
    "name": "DialogFooter",
    "slug": "dialog-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/DialogFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "DialogClose",
    "slug": "dialog-close",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/DialogClose.sc.md",
    "status": "pending"
  },
  {
    "name": "AlertDialog",
    "slug": "alert-dialog",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/AlertDialog.sc.md",
    "status": "pending"
  },
  {
    "name": "AlertDialogHeader",
    "slug": "alert-dialog-header",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/AlertDialogHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "AlertDialogBody",
    "slug": "alert-dialog-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AlertDialogBody.sc.md",
    "status": "pending"
  },
  {
    "name": "AlertDialogFooter",
    "slug": "alert-dialog-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AlertDialogFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "ConfirmationModal",
    "slug": "confirmation-modal",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/ConfirmationModal.sc.md",
    "status": "pending"
  },
  {
    "name": "Popover",
    "slug": "popover",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Popover.sc.md",
    "status": "pending"
  },
  {
    "name": "PopoverHeader",
    "slug": "popover-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/PopoverHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "PopoverBody",
    "slug": "popover-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/PopoverBody.sc.md",
    "status": "pending"
  },
  {
    "name": "PopoverFooter",
    "slug": "popover-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/PopoverFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "Tooltip",
    "slug": "tooltip",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Tooltip.sc.md",
    "status": "pending"
  },
  {
    "name": "OverlayPortal",
    "slug": "overlay-portal",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/OverlayPortal.sc.md",
    "status": "pending"
  },
  {
    "name": "Tree",
    "slug": "tree",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/Tree.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeHeader",
    "slug": "tree-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TreeHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeBody",
    "slug": "tree-body",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TreeBody.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeFooter",
    "slug": "tree-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TreeFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeItem",
    "slug": "tree-item",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TreeItem.sc.md",
    "status": "pending"
  },
  {
    "name": "TreeGroup",
    "slug": "tree-group",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TreeGroup.sc.md",
    "status": "pending"
  },
  {
    "name": "NavigationMenu",
    "slug": "navigation-menu",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/NavigationMenu.sc.md",
    "status": "pending"
  },
  {
    "name": "NavigationMenuHeader",
    "slug": "navigation-menu-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/NavigationMenuHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "NavigationMenuBody",
    "slug": "navigation-menu-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/NavigationMenuBody.sc.md",
    "status": "pending"
  },
  {
    "name": "NavigationMenuFooter",
    "slug": "navigation-menu-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/NavigationMenuFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "NavigationMenuItem",
    "slug": "navigation-menu-item",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/NavigationMenuItem.sc.md",
    "status": "pending"
  },
  {
    "name": "NavigationMenuSublist",
    "slug": "navigation-menu-sublist",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/NavigationMenuSublist.sc.md",
    "status": "pending"
  },
  {
    "name": "Menu",
    "slug": "menu",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Menu.sc.md",
    "status": "pending"
  },
  {
    "name": "MenuHeader",
    "slug": "menu-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/MenuHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "MenuBody",
    "slug": "menu-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/MenuBody.sc.md",
    "status": "pending"
  },
  {
    "name": "MenuFooter",
    "slug": "menu-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/MenuFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "MenuItem",
    "slug": "menu-item",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/MenuItem.sc.md",
    "status": "pending"
  },
  {
    "name": "DropdownMenu",
    "slug": "dropdown-menu",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DropdownMenu.sc.md",
    "status": "pending"
  },
  {
    "name": "Stepper",
    "slug": "stepper",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/Stepper.sc.md",
    "status": "pending"
  },
  {
    "name": "StepperHeader",
    "slug": "stepper-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/StepperHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "StepperBody",
    "slug": "stepper-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/StepperBody.sc.md",
    "status": "pending"
  },
  {
    "name": "StepperFooter",
    "slug": "stepper-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/StepperFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "StepperItem",
    "slug": "stepper-item",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/StepperItem.sc.md",
    "status": "pending"
  },
  {
    "name": "StepperPanel",
    "slug": "stepper-panel",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/StepperPanel.sc.md",
    "status": "pending"
  },
  {
    "name": "DataGridHeader",
    "slug": "data-grid-header",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DataGridHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "DataGridBody",
    "slug": "data-grid-body",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DataGridBody.sc.md",
    "status": "pending"
  },
  {
    "name": "DataGridRow",
    "slug": "data-grid-row",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DataGridRow.sc.md",
    "status": "pending"
  },
  {
    "name": "DataGridColumnHeader",
    "slug": "data-grid-column-header",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DataGridColumnHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "ListBox",
    "slug": "list-box",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/ListBox.sc.md",
    "status": "pending"
  },
  {
    "name": "ListBoxHeader",
    "slug": "list-box-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ListBoxHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "ListBoxBody",
    "slug": "list-box-body",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ListBoxBody.sc.md",
    "status": "pending"
  },
  {
    "name": "ListBoxFooter",
    "slug": "list-box-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ListBoxFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "ListBoxItem",
    "slug": "list-box-item",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ListBoxItem.sc.md",
    "status": "pending"
  },
  {
    "name": "Form",
    "slug": "form",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/Form.sc.md",
    "status": "pending"
  },
  {
    "name": "FormHeader",
    "slug": "form-header",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/FormHeader.sc.md",
    "status": "pending"
  },
  {
    "name": "FormBody",
    "slug": "form-body",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/FormBody.sc.md",
    "status": "pending"
  },
  {
    "name": "FormFooter",
    "slug": "form-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/FormFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "DataGridCell",
    "slug": "data-grid-cell",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/DataGridCell.sc.md",
    "status": "pending"
  },
  {
    "name": "DataGridFooter",
    "slug": "data-grid-footer",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/DataGridFooter.sc.md",
    "status": "pending"
  },
  {
    "name": "MaskedInput",
    "slug": "masked-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/MaskedInput.sc.md",
    "status": "pending"
  },
  {
    "name": "DateInput",
    "slug": "date-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DateInput.sc.md",
    "status": "pending"
  },
  {
    "name": "PostalCodeInput",
    "slug": "postal-code-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/PostalCodeInput.sc.md",
    "status": "pending"
  },
  {
    "name": "TaxIdInput",
    "slug": "tax-id-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TaxIdInput.sc.md",
    "status": "pending"
  },
  {
    "name": "TokenInput",
    "slug": "token-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TokenInput.sc.md",
    "status": "pending"
  },
  {
    "name": "EmailInput",
    "slug": "email-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/EmailInput.sc.md",
    "status": "pending"
  },
  {
    "name": "SearchInput",
    "slug": "search-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/SearchInput.sc.md",
    "status": "pending"
  },
  {
    "name": "PercentageInput",
    "slug": "percentage-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/PercentageInput.sc.md",
    "status": "pending"
  },
  {
    "name": "CurrencyInput",
    "slug": "currency-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/CurrencyInput.sc.md",
    "status": "pending"
  },
  {
    "name": "InternationalTelephoneInput",
    "slug": "international-telephone-input",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/InternationalTelephoneInput.sc.md",
    "status": "pending"
  },
  {
    "name": "LocaleSelector",
    "slug": "locale-selector",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/LocaleSelector.sc.md",
    "status": "pending"
  },
  {
    "name": "ThemeSelector",
    "slug": "theme-selector",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ThemeSelector.sc.md",
    "status": "pending"
  },
  {
    "slug": "choice-group",
    "name": "ChoiceGroup",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ChoiceGroup.sc.md",
    "status": "pending"
  },
  {
    "slug": "choice-group-header",
    "name": "ChoiceGroupHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ChoiceGroupHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "choice-group-body",
    "name": "ChoiceGroupBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ChoiceGroupBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "choice-group-footer",
    "name": "ChoiceGroupFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ChoiceGroupFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "checkbox-group",
    "name": "CheckboxGroup",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/CheckboxGroup.sc.md",
    "status": "pending"
  },
  {
    "slug": "checkbox-group-item",
    "name": "CheckboxGroupItem",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/CheckboxGroupItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "radio-group",
    "name": "RadioGroup",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/RadioGroup.sc.md",
    "status": "pending"
  },
  {
    "slug": "radio-group-item",
    "name": "RadioGroupItem",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/RadioGroupItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "tag-group",
    "name": "TagGroup",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TagGroup.sc.md",
    "status": "pending"
  },
  {
    "slug": "tag-group-item",
    "name": "TagGroupItem",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TagGroupItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "tabs",
    "name": "Tabs",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Tabs.sc.md",
    "status": "pending"
  },
  {
    "slug": "tabs-header",
    "name": "TabsHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TabsHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "tabs-body",
    "name": "TabsBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TabsBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "tabs-footer",
    "name": "TabsFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TabsFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "tab",
    "name": "Tab",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Tab.sc.md",
    "status": "pending"
  },
  {
    "slug": "tab-panel",
    "name": "TabPanel",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/TabPanel.sc.md",
    "status": "pending"
  },
  {
    "slug": "toolbar",
    "name": "Toolbar",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Toolbar.sc.md",
    "status": "pending"
  },
  {
    "slug": "toolbar-item",
    "name": "ToolbarItem",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ToolbarItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "disclosure",
    "name": "Disclosure",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Disclosure.sc.md",
    "status": "pending"
  },
  {
    "slug": "collapse",
    "name": "Collapse",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Collapse.sc.md",
    "status": "pending"
  },
  {
    "slug": "collapse-header",
    "name": "CollapseHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/CollapseHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "collapse-body",
    "name": "CollapseBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/CollapseBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "collapse-footer",
    "name": "CollapseFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/CollapseFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "accordion",
    "name": "Accordion",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Accordion.sc.md",
    "status": "pending"
  },
  {
    "slug": "accordion-item",
    "name": "AccordionItem",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/AccordionItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "accordion-header",
    "name": "AccordionHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AccordionHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "accordion-body",
    "name": "AccordionBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AccordionBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "accordion-footer",
    "name": "AccordionFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AccordionFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "pagination",
    "name": "Pagination",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Pagination.sc.md",
    "status": "pending"
  },
  {
    "slug": "pagination-item",
    "name": "PaginationItem",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/PaginationItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "pagination-ellipsis",
    "name": "PaginationEllipsis",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/PaginationEllipsis.sc.md",
    "status": "pending"
  },
  {
    "slug": "list",
    "name": "List",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/List.sc.md",
    "status": "pending"
  },
  {
    "slug": "list-header",
    "name": "ListHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ListHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "list-body",
    "name": "ListBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ListBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "list-footer",
    "name": "ListFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ListFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "list-item",
    "name": "ListItem",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ListItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "breadcrumb",
    "name": "Breadcrumb",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Breadcrumb.sc.md",
    "status": "pending"
  },
  {
    "slug": "breadcrumb-item",
    "name": "BreadcrumbItem",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/BreadcrumbItem.sc.md",
    "status": "pending"
  },
  {
    "slug": "input",
    "name": "Input",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Input.sc.md",
    "status": "preview"
  },
  {
    "slug": "input-base",
    "name": "InputBase",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/InputBase.sc.md",
    "status": "pending"
  },
  {
    "slug": "textarea",
    "name": "Textarea",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Textarea.sc.md",
    "status": "preview"
  },
  {
    "slug": "color-input",
    "name": "ColorInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ColorInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "password-input",
    "name": "PasswordInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/PasswordInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "number-input",
    "name": "NumberInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/NumberInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "telephone-input",
    "name": "TelephoneInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TelephoneInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "url-input",
    "name": "UrlInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/UrlInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "date-time-input",
    "name": "DateTimeInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/DateTimeInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "time-input",
    "name": "TimeInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/TimeInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "checkbox",
    "name": "Checkbox",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Checkbox.sc.md",
    "status": "preview"
  },
  {
    "slug": "switch",
    "name": "Switch",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Switch.sc.md",
    "status": "preview"
  },
  {
    "slug": "radio",
    "name": "Radio",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Radio.sc.md",
    "status": "preview"
  },
  {
    "slug": "select",
    "name": "Select",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Select.sc.md",
    "status": "pending"
  },
  {
    "slug": "option",
    "name": "Option",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Option.sc.md",
    "status": "pending"
  },
  {
    "slug": "inline",
    "name": "Inline",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Inline.sc.md",
    "status": "pending"
  },
  {
    "slug": "button-group",
    "name": "ButtonGroup",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ButtonGroup.sc.md",
    "status": "pending"
  },
  {
    "slug": "stack",
    "name": "Stack",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Stack.sc.md",
    "status": "pending"
  },
  {
    "slug": "container",
    "name": "Container",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Container.sc.md",
    "status": "pending"
  },
  {
    "slug": "surface",
    "name": "Surface",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Surface.sc.md",
    "status": "pending"
  },
  {
    "slug": "simple-grid",
    "name": "SimpleGrid",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/SimpleGrid.sc.md",
    "status": "pending"
  },
  {
    "slug": "heading",
    "name": "Heading",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Heading.sc.md",
    "status": "preview"
  },
  {
    "slug": "text",
    "name": "Text",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Text.sc.md",
    "status": "preview"
  },
  {
    "slug": "label",
    "name": "Label",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Label.sc.md",
    "status": "preview"
  },
  {
    "slug": "legend",
    "name": "Legend",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Legend.sc.md",
    "status": "pending"
  },
  {
    "slug": "field-hint",
    "name": "FieldHint",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/FieldHint.sc.md",
    "status": "pending"
  },
  {
    "slug": "field-error",
    "name": "FieldError",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/FieldError.sc.md",
    "status": "pending"
  },
  {
    "slug": "progress",
    "name": "Progress",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Progress.sc.md",
    "status": "pending"
  },
  {
    "slug": "progress-bar",
    "name": "ProgressBar",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ProgressBar.sc.md",
    "status": "pending"
  },
  {
    "slug": "meter",
    "name": "Meter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Meter.sc.md",
    "status": "pending"
  },
  {
    "slug": "slider",
    "name": "Slider",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Slider.sc.md",
    "status": "pending"
  },
  {
    "slug": "spinner",
    "name": "Spinner",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Spinner.sc.md",
    "status": "preview"
  },
  {
    "slug": "skeleton",
    "name": "Skeleton",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Skeleton.sc.md",
    "status": "pending"
  },
  {
    "slug": "currency-value",
    "name": "CurrencyValue",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/CurrencyValue.sc.md",
    "status": "pending"
  },
  {
    "slug": "divider",
    "name": "Divider",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Divider.sc.md",
    "status": "preview"
  },
  {
    "slug": "link",
    "name": "Link",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Link.sc.md",
    "status": "pending"
  },
  {
    "slug": "icon",
    "name": "Icon",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Icon.sc.md",
    "status": "pending"
  },
  {
    "slug": "aspect-ratio",
    "name": "AspectRatio",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AspectRatio.sc.md",
    "status": "pending"
  },
  {
    "slug": "avatar",
    "name": "Avatar",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Avatar.sc.md",
    "status": "pending"
  },
  {
    "slug": "badge",
    "name": "Badge",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Badge.sc.md",
    "status": "preview"
  },
  {
    "slug": "icon-button",
    "name": "IconButton",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/IconButton.sc.md",
    "status": "pending"
  },
  {
    "slug": "visually-hidden",
    "name": "VisuallyHidden",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/VisuallyHidden.sc.md",
    "status": "preview"
  },
  {
    "slug": "alert",
    "name": "Alert",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Alert.sc.md",
    "status": "pending"
  },
  {
    "slug": "alert-header",
    "name": "AlertHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AlertHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "alert-body",
    "name": "AlertBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AlertBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "alert-footer",
    "name": "AlertFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/AlertFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "empty-state",
    "name": "EmptyState",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/EmptyState.sc.md",
    "status": "pending"
  },
  {
    "slug": "empty-state-header",
    "name": "EmptyStateHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/EmptyStateHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "empty-state-body",
    "name": "EmptyStateBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/EmptyStateBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "empty-state-footer",
    "name": "EmptyStateFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/EmptyStateFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "error-state",
    "name": "ErrorState",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ErrorState.sc.md",
    "status": "pending"
  },
  {
    "slug": "error-state-header",
    "name": "ErrorStateHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ErrorStateHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "error-state-body",
    "name": "ErrorStateBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ErrorStateBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "error-state-footer",
    "name": "ErrorStateFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ErrorStateFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "loading-state",
    "name": "LoadingState",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/LoadingState.sc.md",
    "status": "pending"
  },
  {
    "slug": "loading-state-header",
    "name": "LoadingStateHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/LoadingStateHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "loading-state-body",
    "name": "LoadingStateBody",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/LoadingStateBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "loading-state-footer",
    "name": "LoadingStateFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/LoadingStateFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "form-field",
    "name": "FormField",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/FormField.sc.md",
    "status": "pending"
  },
  {
    "slug": "form-field-header",
    "name": "FormFieldHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/FormFieldHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "form-field-body",
    "name": "FormFieldBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/FormFieldBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "form-field-footer",
    "name": "FormFieldFooter",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/FormFieldFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "input-group",
    "name": "InputGroup",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/InputGroup.sc.md",
    "status": "pending"
  },
  {
    "slug": "input-addon",
    "name": "InputAddon",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/InputAddon.sc.md",
    "status": "pending"
  },
  {
    "slug": "tag",
    "name": "Tag",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Tag.sc.md",
    "status": "pending"
  },
  {
    "slug": "file-input",
    "name": "FileInput",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/FileInput.sc.md",
    "status": "pending"
  },
  {
    "slug": "button",
    "name": "Button",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/Button.sc.md",
    "status": "preview"
  },
  {
    "slug": "card-header",
    "name": "CardHeader",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/CardHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "card-body",
    "name": "CardBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/CardBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "card-footer",
    "name": "CardFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/CardFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "modal-body",
    "name": "ModalBody",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ModalBody.sc.md",
    "status": "pending"
  },
  {
    "slug": "modal-footer",
    "name": "ModalFooter",
    "level": "atoms",
    "specification": "docs/sc/ds/components/atoms/ModalFooter.sc.md",
    "status": "pending"
  },
  {
    "slug": "card",
    "name": "Card",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Card.sc.md",
    "status": "pending"
  },
  {
    "slug": "modal",
    "name": "Modal",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/Modal.sc.md",
    "status": "pending"
  },
  {
    "slug": "modal-header",
    "name": "ModalHeader",
    "level": "molecules",
    "specification": "docs/sc/ds/components/molecules/ModalHeader.sc.md",
    "status": "pending"
  },
  {
    "slug": "data-grid",
    "name": "DataGrid",
    "level": "organisms",
    "specification": "docs/sc/ds/components/organisms/DataGrid.sc.md",
    "status": "pending"
  },
  {
    "slug": "home-page",
    "name": "HomePageTemplate",
    "level": "templates",
    "specification": "docs/sc/ds/components/templates/HomePageTemplate.sc.md",
    "status": "pending"
  },
  {
    "slug": "list-page",
    "name": "ListPageTemplate",
    "level": "templates",
    "specification": "docs/sc/ds/components/templates/ListPageTemplate.sc.md",
    "status": "pending"
  },
  {
    "slug": "detail-page",
    "name": "DetailPageTemplate",
    "level": "templates",
    "specification": "docs/sc/ds/components/templates/DetailPageTemplate.sc.md",
    "status": "pending"
  },
  {
    "slug": "form-page",
    "name": "FormPageTemplate",
    "level": "templates",
    "specification": "docs/sc/ds/components/templates/FormPageTemplate.sc.md",
    "status": "pending"
  }
];
export const resourceEntries: readonly ResourceEntry[] = 
[
  {
    "slug": "use-presence",
    "name": "usePresence",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-presence.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "motion-recipes",
    "name": "Motion recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/animations/tech-motion-recipes.sc.md",
    "source": "@/design-system/styles/motion-components.module.css"
  },
  {
    "slug": "design-tokens",
    "name": "Design tokens",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-design-tokens.sc.md",
    "source": "src/design-system/styles/tokens.css"
  },
  {
    "slug": "use-collapse",
    "name": "useCollapse",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-disclosure-hooks.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-disclosure-group",
    "name": "useDisclosureGroup",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-disclosure-hooks.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-accordion",
    "name": "useAccordion",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-disclosure-hooks.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-grid-navigation",
    "name": "useGridNavigation",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-grid-navigation.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-list-box-state",
    "name": "useListBoxState",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-listbox-state.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-masked-input",
    "name": "useMaskedInput",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-mask.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-modal",
    "name": "useModal",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-modal-interactions.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-toast-region",
    "name": "useToastRegion",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-notifications.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-toast",
    "name": "useToast",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-notifications.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-overlay",
    "name": "useOverlay",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-overlay-interactions.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-popup-listbox",
    "name": "usePopupListbox",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-popup-contracts.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-roving-focus",
    "name": "useRovingFocus",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-roving-focus.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-tree-state",
    "name": "useTreeState",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-tree-state.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "use-tree-navigation",
    "name": "useTreeNavigation",
    "kind": "hook",
    "specification": "docs/sc/ds/hooks/tech-tree-state.sc.md",
    "source": "@/design-system"
  },
  {
    "slug": "data-grid-recipes",
    "name": "Data Grid recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-data-grid-components.sc.md",
    "source": "@/design-system/styles/data-grid-components.module.css"
  },
  {
    "slug": "icon-recipes",
    "name": "Icon recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-icon.sc.md",
    "source": "@/design-system/styles/icon-components.module.css"
  },
  {
    "slug": "interactive-recipes",
    "name": "Interactive recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-interactive-primitives.sc.md",
    "source": "@/design-system/styles/interactive-primitives.module.css"
  },
  {
    "slug": "layout-recipes",
    "name": "Layout recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-layout.sc.md",
    "source": "@/design-system/styles/layout-components.module.css"
  },
  {
    "slug": "loading-recipes",
    "name": "Loading recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-loading-indicators.sc.md",
    "source": "@/design-system/styles/loading-components.module.css"
  },
  {
    "slug": "native-control-recipes",
    "name": "Native Control recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-native-control-recipes.sc.md",
    "source": "@/design-system/styles/field-control.module.css"
  },
  {
    "slug": "overlay-scroll-lock",
    "name": "Overlay Scroll Lock",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-overlay-scroll-lock.sc.md",
    "source": "@/design-system/styles/overlay-scroll-lock.css"
  },
  {
    "slug": "popup-recipes",
    "name": "Popup recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-popup-recipes.sc.md",
    "source": "@/design-system/styles/popup-components.module.css"
  },
  {
    "slug": "range-recipes",
    "name": "Range recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-range-recipes.sc.md",
    "source": "@/design-system/styles/range-components.module.css"
  },
  {
    "slug": "scrollbars",
    "name": "Scrollbar recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-scrollbars.sc.md",
    "source": "@/design-system/styles/scrollbars.css"
  },
  {
    "slug": "shape-recipes",
    "name": "Shape recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-shape.sc.md",
    "source": "@/design-system/styles/shaped-components.module.css"
  },
  {
    "slug": "status-recipes",
    "name": "Status recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-status-primitives.sc.md",
    "source": "@/design-system/styles/status-components.module.css"
  },
  {
    "slug": "typography-recipes",
    "name": "Typography recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/tech-typography.sc.md",
    "source": "@/design-system/styles/text-components.module.css"
  },
  {
    "slug": "page-transition-recipes",
    "name": "Page Transition recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/animations/tech-page-transitions.sc.md",
    "source": "@/design-system/styles/animations/page-transitions.module.css"
  },
  {
    "slug": "shared-element-recipes",
    "name": "Shared Element recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/animations/tech-shared-element-transitions.sc.md",
    "source": "@/design-system/styles/animations/shared-element-transitions.module.css"
  },
  {
    "slug": "surface-animations",
    "name": "Surface Animation recipes",
    "kind": "style",
    "specification": "docs/sc/ds/styles/animations/tech-surface-animations.sc.md",
    "source": "@/design-system/styles/animations/surface-animations.module.css"
  }
];
export const previewEntries = showcaseEntries.filter(entry => entry.status === "preview");
export const showcaseHref = (slug: string) => `/components/${slug}/`;
