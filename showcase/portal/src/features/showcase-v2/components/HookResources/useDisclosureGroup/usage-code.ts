export const usageCode =
  'import { Button, useDisclosureGroup } from "@forge-ui/web";\nconst group = useDisclosureGroup({ value, onValueChange, multiple: true });\n<Button aria-expanded={group.isExpanded("item-1")} onClick={() => group.toggle("item-1")}>Label 1</Button>;\n// Each mounted item registers with group.registerItem("item-1"); return its cleanup on unmount.';
