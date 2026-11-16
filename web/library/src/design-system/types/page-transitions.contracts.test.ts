import type { PageTransitionIntent, SharedElementName } from "./page-transitions";
import { pageTransitionTypes, pageTransitionClasses } from "./page-transitions";
const intent: PageTransitionIntent = "forward";
const name: SharedElementName = "scope-record-title";
// @ts-expect-error Unknown navigation intents are rejected.
const invalidIntent: PageTransitionIntent = "up";
// @ts-expect-error Shared identity is supplied as a string.
const invalidName: SharedElementName = 42;
void [intent, name, invalidIntent, invalidName, pageTransitionTypes, pageTransitionClasses];
