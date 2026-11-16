import { examples } from "../components/LiveExamples/LiveExamples";
import type { ComponentKey } from "../components/LiveExamples/LiveExamples";
/** Original V2 definitions are preserved for this slice; legacy adapters stay explicit. */
const adapterNames: ReadonlySet<string> = new Set(examples.map(example => example.key));
const originalNames: ReadonlySet<string> = new Set(["Avatar", "Skeleton", "IconButton", "Tag", "Alert", "Select", "Option", "Container", "Stack", "Inline", "Link", "Surface", "AspectRatio", "SimpleGrid", "FieldHint", "FieldError", "Spinner", "Divider", "Badge", "VisuallyHidden", "Button", "Card", "Input", "Textarea", "Checkbox", "Switch", "Radio", "Heading", "Label", "Icon", "DataGrid", "Legend"]);
export async function loadShowcaseV2Component(name: string) {
  if (originalNames.has(name)) {
    const { OriginalDefinitionPage } = await import("../components/OriginalDefinitions/OriginalDefinitionPage");
    return { kind: "original" as const, OriginalDefinitionPage, name };
  }
  if (!adapterNames.has(name)) return null;
  const { LiveDefinitionPage } = await import("../components/LiveExamples/LiveDefinitionPage");
  return { kind: "adapter" as const, LiveDefinitionPage, name: name as ComponentKey };
}
export function hasShowcaseV2Component(name: string) { return adapterNames.has(name) || originalNames.has(name); }