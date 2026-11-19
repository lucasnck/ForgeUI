---
title: "App Authoring Templates and Snippets"
scope: "Reusable Dart widget, local logic, helper and resource-specification patterns"
---

# App Authoring Templates and Snippets

Use the existing [resource template](../core-template.sc.md), [app parity rules](core-web-app-parity.sc.md), [native API mapping](core-native-api-mapping.sc.md) and the component's [app SC](core-app-parity-catalog.sc.md) first. These snippets are authoring tools, not new public components, implemented parity or a reason to replace an existing contract.

Apply the canonical [SC granularity rubric](../core-template.sc.md) first: a shared Flutter technical adapter is a TECH only when it has one independently testable responsibility; the Showcase user-facing experience is a FEATURE; each reusable widget retains its own canonical component SC. One TECH can own several Dart files and tests. Do not create a TECH per helper or combine unrelated Flutter, Web and build-tool integrations in one implementation scope.

The Web pattern separates rendered components, colocated view hooks and shared helpers. Native equivalents use Widgets, State and an optional colocated controller/notifier. Flutter widgets never need React hooks, CSS Modules, Next or a new state-management package.

## Editor snippets

Open the ForgeUI repository as the editor workspace. The project-scoped [snippet file](../../../.vscode/forge-ui-app.code-snippets) is available in editors supporting VS Code project snippets; invoke Insert Snippet or type the prefix and select completion. Dart snippets are scoped to Dart; SC snippets to Markdown. Other editors can copy the bodies from that JSON file.

| Prefix | Use |
| --- | --- |
| forge-app-widget | Stateless presentation shell |
| forge-app-stateful | Native State lifecycle for real owned state/resources |
| forge-app-controller | Optional focus-presentation ValueNotifier example |
| forge-app-helper | Pure, deterministic helper example |
| forge-app-sc-component | Component resource SC |
| forge-app-sc-helper | Helper resource SC |

Tab through named placeholders; repeated class/type placeholders use the same value. The final tab stop is the editing position. Replace the example properties and body with the selected SC's exact contract. A child-only shell does not implement a real component. The helper algorithm and focus notifier are small working examples, not defaults that every resource should inherit.

## Files and naming

```text
docs/sc/app/ds/components/<level>/<Component>.sc.md
docs/sc/app/ds/helpers/tech-<helper>.sc.md
app/library/lib/src/components/forge_<component>.dart
app/library/lib/src/components/forge_<component>_controller.dart
app/library/lib/src/helpers/<helper>.dart
app/library/test/forge_<component>_test.dart
app/showcase_flutter/lib/examples/<component>_example.dart
```

Keep the existing flat components directory for this phase. Public widget names use Forge plus PascalCase; filenames use snake_case. A controller is colocated and internal by default; helpers live in helpers only when independently reusable. A shared behavior controller can use a dedicated owner when its own SC requires one. Export only implemented public contracts through app/library/lib/forge_ui.dart. Do not export internal controllers/helpers merely because a snippet created a file.

SC Files paths are relative to app/library/lib/src; app showcase paths follow the [native mapping guide](core-native-api-mapping.sc.md). Replace template dependency/import/path placeholders, verify actual C/M markers and retain PENDING until implementation and acceptance evidence exist. Global template guides have only title/scope, while resource SCs have the five resource fields.

## Presentation and local logic

Prefer StatelessWidget when rendering depends only on incoming properties and inherited theme. Do not create an empty State or controller to imitate the Web hook convention. The stateful snippet shows lifecycle insertion points: retain only methods that own actual work.

State owns widget lifecycle and subscriptions; rendering stays in build. A local controller owns only the behavior/state explicitly assigned by the SC. It must not import the rendered widget or the showcase, fetch feature data, choose routes or persist settings. UI updates and callbacks remain immediate.

The controller snippet demonstrates deduplicated focus presentation through ValueNotifier<bool>. It is suitable only when the SC needs that presentation state. It does not own selection, expansion, loading or input values. A parent Focus scope may report descendant focus with canRequestFocus=false so the wrapper does not create an extra focus stop. If a real action needs its own focus target, follow its SC instead.

## Lifecycle and ownership

| Lifecycle / resource | Required handling |
| --- | --- |
| initState | Create only owned resources once; avoid inherited-theme lookup here |
| didUpdateWidget | Synchronize changed configuration and replace listeners when controller identity changes |
| didChangeDependencies | Resolve inherited theme/settings when dependency tracking is needed |
| build | Render current accepted state; never notify listeners or schedule feature work here |
| dispose | Remove listeners, cancel work and dispose owned resources before super.dispose |
| Supplied FocusNode/TextEditingController/notifier | Borrow; never dispose caller-owned resources |
| Replacing owned/supplied resources | Detach the old listener, dispose only the formerly owned resource, attach the new one once |
| Async work | Ignore stale generations, cancel owned work and never notify after disposal |

Flutter State handles local lifecycle; no flutter_hooks, Riverpod, Provider or other dependency is implied. If a behavior has no meaningful independent notifier/listener state, keep it in State rather than constructing an empty controller.

Controlled values remain caller-owned. A rejected request cannot become accepted local state. Omitted and explicit-null controlled values follow the existing native contracts; do not replace a pending ForgeProvided API with a guessed implementation in a snippet. Editing widgets preserve composing ranges/caret, avoid duplicate notifications and retain the selected source validation timing.

## Styles, helpers and examples

Use the actual implemented ForgeThemeTokens.of(context).palette from the theme adapter when the selected SC requires token values. Read inherited theme from build/didChangeDependencies. Keep generated token sources canonical; a sample does not justify literal palettes, replacement Material defaults or new enum sets. ForgeSize/ForgeTone and the other basic visual enums are now exported. Other named structural models remain proposed until implemented; do not import them merely because a spec names them.

A pure helper has explicit typed inputs/outputs, no Flutter imports, no BuildContext, no input mutation and no hidden I/O. Keep helper implementation details out of widget UI. UI orchestration belongs in State/controller, and feature/backend behavior belongs to the consumer.

Showcase consumes the public library. Create the example in the existing single app/showcase_flutter package after widget support exists, preserving equivalent source scenarios, controls, reset and copyable Dart usage. Compilation and snippets do not establish visual/native acceptance.

## Authoring sequence

1. Select or update the app SC and compare actual Web properties/defaults/behavior.
2. Insert the smallest applicable snippet, replace its sample contract and remove unused lifecycle scaffolding.
3. Add local logic/helpers only where the selected SC owns them; keep dependency direction and disposal explicit.
4. Verify the actual change with appropriate analysis and behavioral checks, then wire the public export and truthful showcase availability.
5. Record evidence in the selected resource before DONE. Never mark the 221 pending component contracts implemented because their scaffolding exists.

