import api from "./flutter-native-api.json";
import type { ShowcaseV2Property } from "./showcase-v2.types";
const entries = new Map(api.entries.map(entry => [entry.slug, entry]));
export function flutterNativeProperties(slug: string): readonly ShowcaseV2Property[] {
  return entries.get(slug)?.properties ?? [];
}
