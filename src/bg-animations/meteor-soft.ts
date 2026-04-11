import { createMeteorAnimation } from "./lib/create-meteor-animation";
import type { BackgroundAnimation } from "./lib/types";

/**
 * A gentle meteor field with longer trails and calmer pacing.
 */
export const animation: BackgroundAnimation = createMeteorAnimation({
  id: "meteor-soft",
  weight: 1,
  background:
    "linear-gradient(180deg, rgb(44, 74, 96) 0%, rgb(22, 39, 55) 52%, rgb(11, 19, 30) 100%)",
  densityMultiplier: 1,
  speedRange: [280, 600],
  lengthRange: [96, 208],
  thicknessRange: [1.1, 2.2],
  opacityRange: [0.36, 0.78],
  glowRange: [6, 12],
  trailColor: [145, 150, 253],
  headColor: [255, 255, 255],
  maxDevicePixelRatio: 1.5,
  maxFramesPerSecond: 30,
});
