import { createMeteorAnimation } from "./lib/create-meteor-animation";
import type { BackgroundAnimation } from "./lib/types";

/**
 * A denser and brighter meteor shower for more dramatic visits.
 */
export const animation: BackgroundAnimation = createMeteorAnimation({
  id: "meteor-shower",
  weight: 1,
  background:
    "linear-gradient(180deg, rgb(38, 66, 88) 0%, rgb(18, 33, 48) 48%, rgb(8, 14, 23) 100%)",
  densityMultiplier: 1.2,
  speedRange: [420, 860],
  lengthRange: [72, 168],
  thicknessRange: [1.3, 2.8],
  opacityRange: [0.52, 0.98],
  glowRange: [8, 16],
  trailColor: [145, 150, 253],
  headColor: [255, 255, 255],
  maxDevicePixelRatio: 1.5,
  maxFramesPerSecond: 30,
});
