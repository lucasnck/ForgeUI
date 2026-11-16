import type { RefObject, TransitionEvent } from "react";

export type PresencePhase = "unmounted" | "entering" | "entered" | "exiting";

export interface PresenceOptions {
  open: boolean;
  elementRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}

export interface PresenceContract {
  present: boolean;
  phase: PresencePhase;
  onTransitionEnd(event: TransitionEvent<HTMLElement>): void;
}

export interface ComponentAnimatedProps {
  animated?: boolean;
}

export type AnimationEffect = "none" | "fade" | "scale";

export interface ComponentAnimationEffectProps extends ComponentAnimatedProps {
  animationEffect?: AnimationEffect;
}
