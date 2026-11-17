---
title: "Native API Mapping"
scope: "Shared type, composition, input, semantic and platform-boundary rules for all app component specifications"
---

# Native API Mapping

All constructors and types in the app SCs are proposed until implemented and exported. The [221-component inventory](core-app-parity-catalog.sc.md) is specification coverage, not widget availability. Each component SC includes an explicit property equivalence matrix, local source defaults, fixed forwarded control intent, native behavior and equivalent showcase cases. The [traceability data](reference/component-contracts.json) records source paths/hashes, source declarations, mapped properties and remaining inherited native members.

## Type translation and ownership

| Web shape | App shape | Constraints |
| --- | --- | --- |
| string / boolean / number | String / bool / num, int for integral indices/counts | Keep allowed values/ranges; numeric keyboard is only a hint |
| readonly T[] | List<T> treated immutably | Keep order, identity and no input mutation |
| named record / discriminated union | Named immutable Forge-prefixed record / sealed variants | Preserve every field, tag, variant and null case from the linked source type |
| string literal union | Typed native enum with reversible source value mapping | Never remove a variant or repurpose its serialized name |
| ReactNode / ReactElement | Widget composition | Child order, null content and canonical parts remain constrained by the owning source |
| render callback | Typed Widget builder | Keep input model, ownership and callback timing; no dynamic record casts |
| value-change callback | Typed native callback | No DOM event; expose the same meaningful value exactly once |
| optional nullable controlled value | ForgeProvided<T>? | Omitted means uncontrolled; ForgeProvided(null) means controlled null where source allows it |
| Web ref | FocusNode / control binding / Key as appropriate | Focus/control operations are separate from widget identity; never dispose caller resources |

Optional constructor parameters do not automatically mean a behavioral null default. Preserve omission, inherited defaults and explicit null as separate cases wherever the source differentiates them. A required nullable source field remains required even if null is an accepted value. DefaultValue/defaultRecords/defaultExpandedValue initialize and reset local state; they do not overwrite accepted edits on ordinary parent rebuilds.

Named proposed structural models in the traceability data retain the complete source alias/record/union, not merely the type name or visible showcase subset. Inline records receive a component/property-specific native model name. Implement these through the [native contracts SC](ds/types/tech-native-contracts.sc.md). Primitive aliases such as MonetaryValue remain exact String? rather than double; renderable slots become Widgets, not serialized JSON. Domain models must not be replaced by Object/dynamic/map-of-anything.

ComponentSize maps to ForgeSize, ComponentTone to ForgeTone, ComponentAppearance to ForgeAppearance, ComponentShape to ForgeShape, ComponentVariant to ForgeVariant and ComponentSpace to ForgeSpace. Other typography, layout, animation and domain aliases retain their own distinct native types; text size, container size and icon size must not accidentally use the five control sizes.

## Inherited native members

The traceability data lists remaining inherited Web members under delegatedNativeProperties. They are governed here rather than advertised as hundreds of Dart constructor parameters.

| Web members | Native treatment |
| --- | --- |
| children, labels, supported values, constraints and direct component capabilities | Explicit per-component property matrix; do not remove or rename without the recorded mapping |
| key / ref / focus events / autoFocus / tabIndex | Key identity, FocusNode/control binding, focus callbacks and native traversal policy; owner-managed widgets retain their prescribed traversal |
| aria-* / role | Native Semantics and explicit description/control relationships; owning widget state/role wins over conflicting decoration |
| aria-pressed mixed / aria-invalid grammar or spelling | Preserve meaningful tri-state/diagnostic intent via typed semantic states; never collapse mixed to false |
| className / style / data-* / css attributes | Web presentation hooks; native composition and token/theme overrides provide equivalent customization intent, no CSS-string parameters |
| id / htmlFor / aria-labelledby / aria-describedby / form | Stable semantic/control/form bindings within owner scope; no ambient DOM lookup |
| onClick / pointer / touch / keyboard handlers | Native action/focus/edit/gesture interception through an explicit binding; preserve cancellation and disabled behavior, no duplicated activation |
| onChange / onInput / composition events | Value/editing callbacks and TextEditingValue composing ranges, preserving caret and IME; browser event objects are not carried over |
| onSubmit / onReset / name / form / validation flags | Explicit native form adapter and submission intents, including cancellation, repeated names, disabled exclusion and reset |
| href / target / rel / download / language | Injected app navigation/launch/download adapter; destination preserved; browser tabs/referrer flags remain documented Web-only mechanics |
| accessKey / contentEditable / draggable / spellcheck | Native shortcuts, editing, gestures or spellcheck only when semantically applicable; passive DS wrappers do not gain new actions |
| suppressHydrationWarning / dangerouslySetInnerHTML / React lifecycle/ref hooks / browser rendering callbacks | Web/React-only rendering mechanics, not Flutter properties; never render untrusted raw HTML |
| remaining global HTML/SVG/media attributes | Caller/native wrapper or injected renderer capability when relevant; DOM-specific attribute syntax stays Web-only and cannot override source-owned semantics |

A delegated member is not a promise of a hidden working constructor parameter. Before implementing a consumer requirement, map its actual user-visible intent to a supported native mechanism. The explicit shared component capabilities are mandatory; do not use this delegation policy to omit them.

## Editing and native form behavior

Text editors preserve controlled values, default initialization/reset, disabled versus readOnly, required/length/pattern/range constraints, placeholder and autofill/keyboard hints. Preserve IME composing ranges and selections. Programmatic changes do not synthesize user callbacks. Validation does not occur earlier merely because a native picker/keyboard is used.

Generic Button remains an action. Form submit/reset is explicit through a native binding/intent. ForgeFormData preserves ordered repeated names, selected file references, canonical scalar/selection values and submitter intent; disabled controls are excluded. Native submit interception precedes owned validation/submission and cancellation stops it. Do not add a backend, persistence, or implicit React Hook Form dependency.

Native file references retain name, size, MIME/type and readable content access without promising a filesystem path. Chooser cancellation is distinct from an accepted empty selection. Camera/capture permissions and plugin choice belong to an injected platform adapter.

## Composition, layout and app integration

Canonical part roles remain explicit. Preserve required/optional parts, unknown/duplicate-part rejection, stable keys, nested scope isolation and cleanup. Public Dialog and AlertDialog part aliases map to the same Modal part roles, not copied stateful widgets. Builders receive explicit bindings in place of cloneElement/ref injection.

Responsive content uses actual layout constraints and shared breakpoint tokens. Keep all slots/data/columns reachable; app adaptation may stack an aside or scroll a table, but cannot silently discard properties or rows. Shell integration coordinates SafeArea and keyboard insets once; a DS component/template never creates another MaterialApp/router/provider.

Hidden retained content preserves required state but leaves interaction, focus traversal and semantics immediately. Appearance transitions must never delay callbacks, value changes or focus repair. Offstage/exclusion/presence mechanisms must obey the owner's specific retention contract rather than imposing universal retained state.

## Platform boundaries and evidence

The [platform adapter SC](ds/helpers/tech-native-platform-adapters.sc.md) owns maps, overlays, navigation, form integration, files and native transition ports. No package, paid map SDK or permission is selected implicitly.

For each component, evaluate observable shared Web criteria through the explicit native mapping. Requirements tied to React hooks, CSS selectors, HTML hierarchy, SSR or npm tests are provenance, not Flutter implementation instructions. Behavioral invariants, rejection paths and data constraints remain mandatory. A source hash, authored spec, analyzer or compiled preview alone is not visual/runtime acceptance. All resource statuses remain PENDING until implemented and verified.


## Specification file roots

Files paths in app component/type/helper specs are relative to app/library/lib/src. Paths in the app showcase parity spec are relative to showcase/portal/src; its Dart example modules belong to the existing app/showcase_flutter package. C/M markers describe proposed work and never assert that the proposed exports or modules already exist. Property-table types describe supplied values; presence/default/nullability is governed by the adjacent source contract, including explicit controlled-null wrappers.
