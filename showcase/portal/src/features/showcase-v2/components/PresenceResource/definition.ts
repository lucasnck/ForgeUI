import type { ShowcaseV2ResourceDefinition } from "../../model/showcase-v2-resource.types";
import { showcaseV2Resources } from "../../model/showcase-v2-resources";
import { PresenceResourceExample, MotionResourceExample } from "./PresenceResource.example";
const presenceCode = `import { Card, CardBody, usePresence } from "@forge-ui/web";
import motionStyles from "../../../../../../../web/library/src/design-system/styles/motion-components.module.css";

const { present, phase, onTransitionEnd } = usePresence({ open, elementRef, enabled: animated });

present && (
  <div ref={elementRef} className={motionStyles.surfacePresence}
    data-motion-state={phase} data-animated={animated}
    onTransitionEnd={onTransitionEnd} inert={!open} aria-hidden={!open}>
    <Card><CardBody>Children</CardBody></Card>
  </div>
);`;
const related = [
  { name: "Card", href: "/components/card/" },
  { name: "Design tokens", href: "/resources/design-tokens/" },
];
export const presenceDefinition = {
  ...showcaseV2Resources[0],
  description:
    "Observe semantic open state and the visual lifetime of a panel through the real public usePresence hook.",
  examples: [
    {
      id: "presence-lifecycle",
      title: "Visual presence",
      description:
        "Open, close or reverse the panel; disable motion to compare immediate removal. Reset restores the closed state.",
      code: presenceCode,
      Component: PresenceResourceExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "open",
          type: "boolean",
          description: "Required semantic state, owned by the caller.",
        },
        {
          name: "elementRef",
          type: "RefObject<HTMLElement | null>",
          description:
            "Required ref on the animated element; CSS opacity timing determines exit completion.",
        },
        {
          name: "enabled",
          type: "boolean = true",
          description:
            "False settles presence immediately. Reduced motion and zero duration also settle immediately.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "present",
          type: "boolean",
          description: "Render while true; closing may retain noninteractive exit pixels.",
        },
        {
          name: "phase",
          type: '"unmounted" | "entering" | "entered" | "exiting"',
          description: "Apply to data-motion-state on the animated element.",
        },
        {
          name: "onTransitionEnd",
          type: "(event: TransitionEvent<HTMLElement>) => void",
          description:
            "Attach to the ref element; only its opacity exit completion is accepted. Missing events have a bounded fallback.",
        },
      ],
    },
  ],
  notes: [
    "Call hooks only inside a component or custom hook. This snippet belongs inside your caller; open, animated and elementRef come from it.",
    "The hook supplies lifecycle, not styles, semantic open state, dismissal, focus management or accessibility. Move focus before an interactive surface becomes inert; this demo uses passive content.",
    "Reopening invalidates pending exit completion. The public hook cancels timers, frames and listeners on cleanup.",
  ],
  related: [
    {
      name: "Motion recipes",
      href: "/resources/motion-recipes/",
    },
    ...related,
  ],
} satisfies ShowcaseV2ResourceDefinition;
export const motionDefinition = {
  ...showcaseV2Resources[1],
  description:
    "Compare the shared surface and disclosure presence recipes without recreating the animation CSS.",
  examples: [
    {
      id: "motion-comparison",
      title: "Presence recipes",
      description:
        "Select a recipe, show or hide the panel, and compare enabled/disabled motion. The disclosure recipe clips its inner content.",
      code: `import { Card, CardBody } from "@forge-ui/web";
import motionStyles from "../../../../../../../web/library/src/design-system/styles/motion-components.module.css";

<div ref={elementRef} className={motionStyles.disclosurePresence}
  data-motion-state={phase} data-animated={animated}
  onTransitionEnd={onTransitionEnd} inert={!open} aria-hidden={!open}>
  <div className={motionStyles.clip}><Card><CardBody>Children</CardBody></Card></div>
</div>;`,
      Component: MotionResourceExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "surfacePresence",
          type: "CSS Module class",
          description: "Opacity and scale presence transition.",
        },
        {
          name: "disclosurePresence + clip",
          type: "CSS Module classes",
          description: "Grid row and opacity transition; put clip on a nested content wrapper.",
        },
        {
          name: "stateColor",
          type: "CSS Module class",
          description:
            "Transitions background and border colors when consumer state styles change.",
        },
        {
          name: "stateOpacity",
          type: "CSS Module class",
          description: "Transitions opacity when consumer state styles change.",
        },
        {
          name: "stateFeedback",
          type: "CSS Module class",
          description: "Transitions background, border and opacity.",
        },
      ],
    },
    {
      title: "Attributes and tokens",
      entries: [
        {
          name: "data-motion-state",
          type: "PresencePhase",
          description:
            "entering/exiting target hidden; entered targets visible. Obtain phase from usePresence.",
        },
        {
          name: "data-animated",
          type: "boolean",
          description:
            "False disables transitions; usePresence enabled must use the same preference.",
        },
        {
          name: "--motion-fast / --motion-normal / --ease-standard",
          type: "CSS variables",
          description: "Canonical duration and easing tokens, never duplicated locally.",
        },
        {
          name: "--motion-opacity-* / --motion-scale-* / --motion-grid-*",
          type: "CSS variables",
          description: "Shared visual endpoints for presence recipes.",
        },
      ],
    },
  ],
  notes: [
    "The recipe styles pixels only. Render the snippet while usePresence.present is true and attach the hook ref and transition handler.",
    "prefers-reduced-motion disables transitions and surface transforms. data-animated=false is an explicit opt-out; keep lifecycle enabled consistent.",
    "Retained exit content must be inert and aria-hidden immediately. Focus and semantic state remain caller-owned.",
    "The base snippet demonstrates disclosurePresence; the runtime selector also exposes surfacePresence.",
  ],
  related: [{ name: "usePresence", href: "/resources/use-presence/" }, ...related],
} satisfies ShowcaseV2ResourceDefinition;
