import { type ThemeSelectorProps } from "@forge-ui/web";
export const initialValue = "light";
export const options: ThemeSelectorProps["options"] = [
  { value: "light", label: "Label 1" },
  { value: "dark", label: "Label 2" },
  { value: "contrast", label: "Label 3" },
  { value: "liquid-glass", label: "Label 4" },
];
