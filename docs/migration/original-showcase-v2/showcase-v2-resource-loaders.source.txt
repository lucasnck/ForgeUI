import type { ShowcaseV2ResourceDefinition } from "./showcase-v2-resource.types";
import { showcaseV2Resources } from "./showcase-v2-resources";
const loaders: Record<string, () => Promise<ShowcaseV2ResourceDefinition>> = {
  "use-collapse": () =>
    import("../components/HookResources/useCollapse/definition").then((m) => m.default),
  "use-disclosure-group": () =>
    import("../components/HookResources/useDisclosureGroup/definition").then((m) => m.default),
  "use-accordion": () =>
    import("../components/HookResources/useAccordion/definition").then((m) => m.default),
  "use-grid-navigation": () =>
    import("../components/HookResources/useGridNavigation/definition").then((m) => m.default),
  "use-list-box-state": () =>
    import("../components/HookResources/useListBoxState/definition").then((m) => m.default),
  "use-masked-input": () =>
    import("../components/HookResources/useMaskedInput/definition").then((m) => m.default),
  "use-modal": () =>
    import("../components/HookResources/useModal/definition").then((m) => m.default),
  "use-toast-region": () =>
    import("../components/HookResources/useToastRegion/definition").then((m) => m.default),
  "use-toast": () =>
    import("../components/HookResources/useToast/definition").then((m) => m.default),
  "use-overlay": () =>
    import("../components/HookResources/useOverlay/definition").then((m) => m.default),
  "use-popup-listbox": () =>
    import("../components/HookResources/usePopupListbox/definition").then((m) => m.default),
  "use-roving-focus": () =>
    import("../components/HookResources/useRovingFocus/definition").then((m) => m.default),
  "use-tree-state": () =>
    import("../components/HookResources/useTreeState/definition").then((m) => m.default),
  "use-tree-navigation": () =>
    import("../components/HookResources/useTreeNavigation/definition").then((m) => m.default),
  "data-grid-recipes": () =>
    import("../components/StyleResources/DataGridRecipes/definition").then((m) => m.default),
  "icon-recipes": () =>
    import("../components/StyleResources/IconRecipes/definition").then((m) => m.default),
  "interactive-recipes": () =>
    import("../components/StyleResources/InteractiveRecipes/definition").then((m) => m.default),
  "layout-recipes": () =>
    import("../components/StyleResources/LayoutRecipes/definition").then((m) => m.default),
  "loading-recipes": () =>
    import("../components/StyleResources/LoadingRecipes/definition").then((m) => m.default),
  "native-control-recipes": () =>
    import("../components/StyleResources/NativeControlRecipes/definition").then((m) => m.default),
  "overlay-scroll-lock": () =>
    import("../components/StyleResources/OverlayScrollLock/definition").then((m) => m.default),
  "popup-recipes": () =>
    import("../components/StyleResources/PopupRecipes/definition").then((m) => m.default),
  "range-recipes": () =>
    import("../components/StyleResources/RangeRecipes/definition").then((m) => m.default),
  scrollbars: () =>
    import("../components/StyleResources/ScrollbarRecipes/definition").then((m) => m.default),
  "shape-recipes": () =>
    import("../components/StyleResources/ShapeRecipes/definition").then((m) => m.default),
  "status-recipes": () =>
    import("../components/StyleResources/StatusRecipes/definition").then((m) => m.default),
  "typography-recipes": () =>
    import("../components/StyleResources/TypographyRecipes/definition").then((m) => m.default),
  "page-transition-recipes": () =>
    import("../components/StyleResources/PageTransitionRecipes/definition").then((m) => m.default),
  "shared-element-recipes": () =>
    import("../components/StyleResources/SharedElementRecipes/definition").then((m) => m.default),
  "surface-animations": () =>
    import("../components/StyleResources/SurfaceAnimationRecipes/definition").then(
      (m) => m.default,
    ),

  "use-presence": () =>
    import("../components/PresenceResource/definition").then((m) => m.presenceDefinition),
  "motion-recipes": () =>
    import("../components/PresenceResource/definition").then((m) => m.motionDefinition),
  "design-tokens": () => import("../components/TokenResource/definition").then((m) => m.default),
};

export async function loadShowcaseV2Resource(slug: string) {
  const entry = showcaseV2Resources.find((item) => item.slug === slug);
  if (!entry || !Object.hasOwn(loaders, slug)) throw new Error("Unknown Showcase V2 resource");
  const definition = await loaders[slug]();

  for (const key of ["slug", "name", "kind", "source", "specification"] as const) {
    if (definition[key] !== entry[key]) throw new Error(`Resource metadata mismatch: ${key}`);
  }

  if (!definition.description.trim() || !definition.examples.length || !definition.contracts.length)
    throw new Error("Incomplete resource");
  const ids = definition.examples.map((example) => example.id);
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate resource examples");

  for (const example of definition.examples) {
    if (
      !example.id.trim() ||
      !example.title.trim() ||
      !example.description.trim() ||
      !example.code.trim() ||
      typeof example.Component !== "function"
    )
      throw new Error("Incomplete resource example");
  }

  return definition;
}
