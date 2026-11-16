export const usageCode =
  'import { Button, useToast } from "@forge-ui/web";\n// Inside a Toast rendered by ToastRegion.renderToast (the public region provides the context):\nconst queue = useToast();\n<Button onClick={() => queue.add({ id: "item-1", title: "Title 1", message: "Message 1", duration: "persistent", dismissLabel: "Dismiss" })}>Add</Button>;';
