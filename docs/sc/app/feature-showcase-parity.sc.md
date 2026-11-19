---
title: "App Showcase Parity"
scope: "Equivalent native examples and truthful property controls in the common portal"
status: "PENDING"
type: "component"
ds-level: "pages"
---

# App Showcase Parity

## Files

```text
features/showcase-v2/model/flutter-preview-index.ts (M)
features/showcase-v2/components/FlutterPreview/FlutterPreview.tsx (M)
features/showcase-v2/components/FlutterPreview/FlutterComponentShowcase.tsx (M)
features/showcase-v2/components/FlutterPreview/flutter-button-properties.ts (M)
features/showcase-v2/components/FlutterPreview/useFlutterPreview.ts (M)
../../../app/showcase_flutter/lib/main.dart (M)
../../../app/showcase_flutter/lib/preview_settings.dart (M)
../../../app/showcase_flutter/test/preview_test.dart (M)
features/showcase-v2/components/FlutterPreview/flutter-component-properties.ts (C)
../../../scripts/build-flutter-preview.mjs (M)
../../../app/showcase_flutter/lib/preview_bridge.dart (M)
../../../app/showcase_flutter/test/component_parity_test.dart (C)
../../../app/showcase_flutter/lib/examples/map_view_example.dart (C)
../../../app/showcase_flutter/lib/examples/application_layout_template_example.dart (C)
../../../app/showcase_flutter/lib/examples/application_layout_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/application_layout_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/application_layout_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/showcase_page_template_example.dart (C)
../../../app/showcase_flutter/lib/examples/page_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/o_data_filter_example.dart (C)
../../../app/showcase_flutter/lib/examples/o_data_filter_condition_example.dart (C)
../../../app/showcase_flutter/lib/examples/o_data_filter_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/o_data_filter_value_example.dart (C)
../../../app/showcase_flutter/lib/examples/shared_element_example.dart (C)
../../../app/showcase_flutter/lib/examples/page_transition_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_field_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/toast_region_example.dart (C)
../../../app/showcase_flutter/lib/examples/toast_example.dart (C)
../../../app/showcase_flutter/lib/examples/toast_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/toast_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/toast_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/popup_listbox_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/popup_listbox_example.dart (C)
../../../app/showcase_flutter/lib/examples/autocomplete_example.dart (C)
../../../app/showcase_flutter/lib/examples/autocomplete_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/autocomplete_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/autocomplete_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/combobox_example.dart (C)
../../../app/showcase_flutter/lib/examples/combobox_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/combobox_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/combobox_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_grid_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_grid_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_grid_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_grid_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_grid_row_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_grid_cell_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_grid_column_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/dialog_example.dart (C)
../../../app/showcase_flutter/lib/examples/dialog_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/dialog_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/dialog_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/dialog_close_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_dialog_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_dialog_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_dialog_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_dialog_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/confirmation_modal_example.dart (C)
../../../app/showcase_flutter/lib/examples/popover_example.dart (C)
../../../app/showcase_flutter/lib/examples/popover_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/popover_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/popover_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/tooltip_example.dart (C)
../../../app/showcase_flutter/lib/examples/overlay_portal_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/tree_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/navigation_menu_example.dart (C)
../../../app/showcase_flutter/lib/examples/navigation_menu_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/navigation_menu_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/navigation_menu_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/navigation_menu_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/navigation_menu_sublist_example.dart (C)
../../../app/showcase_flutter/lib/examples/menu_example.dart (C)
../../../app/showcase_flutter/lib/examples/menu_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/menu_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/menu_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/menu_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/dropdown_menu_example.dart (C)
../../../app/showcase_flutter/lib/examples/stepper_example.dart (C)
../../../app/showcase_flutter/lib/examples/stepper_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/stepper_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/stepper_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/stepper_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/stepper_panel_example.dart (C)
../../../app/showcase_flutter/lib/examples/data_grid_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/data_grid_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/data_grid_row_example.dart (C)
../../../app/showcase_flutter/lib/examples/data_grid_column_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_box_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_box_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_box_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_box_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_box_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/data_grid_cell_example.dart (C)
../../../app/showcase_flutter/lib/examples/data_grid_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/masked_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/date_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/postal_code_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/tax_id_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/token_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/email_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/search_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/percentage_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/currency_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/international_telephone_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/locale_selector_example.dart (C)
../../../app/showcase_flutter/lib/examples/theme_selector_example.dart (C)
../../../app/showcase_flutter/lib/examples/choice_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/choice_group_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/choice_group_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/choice_group_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/checkbox_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/checkbox_group_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/radio_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/radio_group_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/tag_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/tag_group_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/tabs_example.dart (C)
../../../app/showcase_flutter/lib/examples/tabs_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/tabs_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/tabs_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/tab_example.dart (C)
../../../app/showcase_flutter/lib/examples/tab_panel_example.dart (C)
../../../app/showcase_flutter/lib/examples/toolbar_example.dart (C)
../../../app/showcase_flutter/lib/examples/toolbar_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/disclosure_example.dart (C)
../../../app/showcase_flutter/lib/examples/collapse_example.dart (C)
../../../app/showcase_flutter/lib/examples/collapse_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/collapse_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/collapse_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/accordion_example.dart (C)
../../../app/showcase_flutter/lib/examples/accordion_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/accordion_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/accordion_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/accordion_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/pagination_example.dart (C)
../../../app/showcase_flutter/lib/examples/pagination_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/pagination_ellipsis_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/breadcrumb_example.dart (C)
../../../app/showcase_flutter/lib/examples/breadcrumb_item_example.dart (C)
../../../app/showcase_flutter/lib/examples/input_example.dart (C)
../../../app/showcase_flutter/lib/examples/input_base_example.dart (C)
../../../app/showcase_flutter/lib/examples/textarea_example.dart (C)
../../../app/showcase_flutter/lib/examples/color_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/password_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/number_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/telephone_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/url_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/date_time_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/time_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/checkbox_example.dart (C)
../../../app/showcase_flutter/lib/examples/switch_example.dart (C)
../../../app/showcase_flutter/lib/examples/radio_example.dart (C)
../../../app/showcase_flutter/lib/examples/select_example.dart (C)
../../../app/showcase_flutter/lib/examples/option_example.dart (C)
../../../app/showcase_flutter/lib/examples/inline_example.dart (C)
../../../app/showcase_flutter/lib/examples/button_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/stack_example.dart (C)
../../../app/showcase_flutter/lib/examples/container_example.dart (C)
../../../app/showcase_flutter/lib/examples/surface_example.dart (C)
../../../app/showcase_flutter/lib/examples/simple_grid_example.dart (C)
../../../app/showcase_flutter/lib/examples/heading_example.dart (C)
../../../app/showcase_flutter/lib/examples/text_example.dart (C)
../../../app/showcase_flutter/lib/examples/label_example.dart (C)
../../../app/showcase_flutter/lib/examples/legend_example.dart (C)
../../../app/showcase_flutter/lib/examples/field_hint_example.dart (C)
../../../app/showcase_flutter/lib/examples/field_error_example.dart (C)
../../../app/showcase_flutter/lib/examples/progress_example.dart (C)
../../../app/showcase_flutter/lib/examples/progress_bar_example.dart (C)
../../../app/showcase_flutter/lib/examples/meter_example.dart (C)
../../../app/showcase_flutter/lib/examples/slider_example.dart (C)
../../../app/showcase_flutter/lib/examples/spinner_example.dart (C)
../../../app/showcase_flutter/lib/examples/skeleton_example.dart (C)
../../../app/showcase_flutter/lib/examples/currency_value_example.dart (C)
../../../app/showcase_flutter/lib/examples/divider_example.dart (C)
../../../app/showcase_flutter/lib/examples/link_example.dart (C)
../../../app/showcase_flutter/lib/examples/icon_example.dart (C)
../../../app/showcase_flutter/lib/examples/aspect_ratio_example.dart (C)
../../../app/showcase_flutter/lib/examples/avatar_example.dart (C)
../../../app/showcase_flutter/lib/examples/badge_example.dart (C)
../../../app/showcase_flutter/lib/examples/icon_button_example.dart (C)
../../../app/showcase_flutter/lib/examples/visually_hidden_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/alert_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/empty_state_example.dart (C)
../../../app/showcase_flutter/lib/examples/empty_state_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/empty_state_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/empty_state_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/error_state_example.dart (C)
../../../app/showcase_flutter/lib/examples/error_state_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/error_state_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/error_state_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/loading_state_example.dart (C)
../../../app/showcase_flutter/lib/examples/loading_state_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/loading_state_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/loading_state_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_field_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_field_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_field_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_field_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/input_group_example.dart (C)
../../../app/showcase_flutter/lib/examples/input_addon_example.dart (C)
../../../app/showcase_flutter/lib/examples/tag_example.dart (C)
../../../app/showcase_flutter/lib/examples/file_input_example.dart (C)
../../../app/showcase_flutter/lib/examples/button_example.dart (C)
../../../app/showcase_flutter/lib/examples/card_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/card_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/card_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/modal_body_example.dart (C)
../../../app/showcase_flutter/lib/examples/modal_footer_example.dart (C)
../../../app/showcase_flutter/lib/examples/card_example.dart (C)
../../../app/showcase_flutter/lib/examples/modal_example.dart (C)
../../../app/showcase_flutter/lib/examples/modal_header_example.dart (C)
../../../app/showcase_flutter/lib/examples/data_grid_example.dart (C)
../../../app/showcase_flutter/lib/examples/home_page_template_example.dart (C)
../../../app/showcase_flutter/lib/examples/list_page_template_example.dart (C)
../../../app/showcase_flutter/lib/examples/detail_page_template_example.dart (C)
../../../app/showcase_flutter/lib/examples/form_page_template_example.dart (C)
```

## Dependencies

- [Flutter preview host surface](tech-flutter-preview-surface.sc.md)
- [Public Dart snippet presentation](tech-flutter-code-display.sc.md)
- [Full-catalog structural/evidence audit](tech-full-catalog-parity.sc.md)

- [Native model contracts](ds/types/tech-native-contracts.sc.md)
- [Native platform adapters](ds/helpers/tech-native-platform-adapters.sc.md)

- [Multiplatform showcase](../showcase/feature-multiplatform-showcase.sc.md)
- [Flutter Button](ds/components/atoms/Button.sc.md)
- [Flutter Spinner](ds/components/atoms/Spinner.sc.md)
- [Flutter IconButton](ds/components/molecules/IconButton.sc.md)
- [Flutter ButtonGroup](ds/components/molecules/ButtonGroup.sc.md)

## Contract

```tsx
import { FlutterPreview } from "./features/showcase-v2/components/FlutterPreview/FlutterPreview";

<FlutterPreview slug="button" />
```

## Tests

- Give every component a dedicated Dart example module under the existing single Flutter preview application. The registry maps implemented component/scenario ids to these modules; do not build a separate application per widget or force every example into main.dart.
- Validate bridge settings against the selected component schema, including enums/defaults/reset; callbacks use named native actions, while structured domain models remain typed fixtures as in Web rather than arbitrary executable/JSON controls. Preserve versioned same-origin parent/source validation.

- Apply the complete 221-component app inventory and its 254 existing scenario contracts. Platform availability remains gated per implemented widget/scenario; do not restrict coverage planning to the initial Button family or advertise all 221 as implemented.

- Compare Button basic/crud-hierarchy by observable behavior, original tone hierarchy and callback feedback.
- Verify all shared properties/enum choices/defaults and native action/focus/name equivalents; unimplemented controls remain explicit gaps.
- Verify property edits update real widgets and copyable public Dart code; include loading/disabled precedence, inherited shape reset and fullWidth.
- Verify Spinner status/motion, IconButton loading names and ButtonGroup wrapping/spacing after library support exists.
- Verify platform tabs stay in the common component container and preserve selected component/equivalent scenario.
- Verify explicit unavailable states and recoverable preview failures; Flutter Web availability never implies native-device acceptance.

## Criteria

- [ ] Preserve the full catalog and equivalent per-component scenarios as each widget is delivered, including native property controls, reset and actual Dart usage. Unsupported entries remain explicitly unavailable.

- [ ] Implement library capabilities before enabling property controls or registering preview support.
- [ ] Show equivalent scenarios and truthful tables, including Web-only mechanisms/native substitutions.
- [ ] Generate public Dart usage from current controls; demo-only overrides cannot fake missing widget features.
- [ ] Keep navigation/specs/comparison in one portal; widgets never import portal modules.
- [ ] Record runtime evidence for edits, activation, loading, reset and platform switching; compilation alone is insufficient.

## 2026-11-18 — Tabs presentation parity

**Files:** `app/library/lib/src/components/forge_tabs.dart` (M), `app/library/test/forge_tabs_visual_state_test.dart` (C). Dependency: the Web `Tab`/`Tabs` default presentation in `web/library`, and `feature-multiplatform-showcase.sc.md` for embedded preview.

For an unset Flutter `ForgeTab.appearance`, an enabled selected tab resolves to the branded **solid button** treatment, and an enabled unselected tab resolves to a ghost button treatment. Explicit caller appearance overrides remain supported. Do not add a new permanent underline below the label. Preserve `attached`, size, tone, shape, controlled/uncontrolled selection, disabled behavior, roving keyboard focus, text direction and accessibility semantics; an optional underline variant may be specified separately but is not the default. The Flutter user-facing widget remains the real `ForgeTab`, not a demo-only substitute.

Tests must check resolved `ForgeButton.appearance` before and after changing selection, an explicit appearance override, and that the selected tab is exposed in accessibility semantics. Check light/dark visual results against React before claiming DONE. Public API callers and `PraticarApp` are not automatically upgraded until the ForgeUI repository revision is published/referenced.


## Full-catalog parity scope — 18 November 2026

The feature owns the observable Showcasing and parity journey; the linked TECH SCs own independent preview embedding, snippet presentation and structural/evidence validation. This FEATURE does not reimplement those technical mechanisms, and each Dart widget fix stays in that widget's SC.

The requested parity review covers **all 221** native component constructors and their canonical React scenarios, not just Tabs. See `docs/sc/app/tech-full-catalog-parity.sc.md` for the cross-cutting inventory, required evidence and blocking regression tests. Changes to shared showcase code apply uniformly, while missing styles, behavior and API mappings must be corrected under each owning component SC (not masked by screenshots or fake examples). Any incomplete native/visual comparison remains PENDING.
