// Central GSAP setup for the portfolio.
// - Registers plugins once (ScrollTrigger + useGSAP context integration).
// - Re-exports everything components need from a single module.
// - Exposes the easing tokens that mirror the CSS design system in index.css:
//     --ease-luxury    cubic-bezier(0.25, 0.1, 0.25, 1)  → power3.out
//     --ease-out-expo  cubic-bezier(0.19, 1, 0.22, 1)    → expo.out
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Motion tokens ───
export const EASE_LUXURY = "power3.out";
export const EASE_OUT_EXPO = "expo.out";

export const DUR_REVEAL = 0.9;
export const DUR_MID = 0.7;
export const DUR_FAST = 0.4;

// Decorative motion is skipped when the user prefers reduced motion
// (all components wrap their entrance/scroll animations in this condition).
export const NO_PREFER_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

// Staggered rise + fade for a group of elements when `trigger` enters the
// viewport. Runs once. `targets` must be an array of elements — use the
// scoped `gsap.utils.selector(scope)` helper inside components.
export function staggerReveal(
  targets,
  {
    trigger,
    start = "top 82%",
    y = 28,
    stagger = 0.12,
    duration = DUR_REVEAL,
    delay = 0,
    ease = EASE_LUXURY,
  } = {}
) {
  if (!targets || !targets.length) return null;
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: { trigger, start, once: true },
    }
  );
}

export { gsap, ScrollTrigger, useGSAP };
