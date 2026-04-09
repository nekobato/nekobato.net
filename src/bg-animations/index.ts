import type { BackgroundAnimation } from "./lib/types";

const animationModules = import.meta.glob(
  [
    "./*.ts",
    "!./index.ts",
  ],
  {
    eager: true,
    import: "animation",
  },
) as Record<string, BackgroundAnimation>;

const animations = Object.values(animationModules);

/**
 * Picks one animation candidate, taking optional weights into account.
 */
const pickAnimation = (
  candidates: BackgroundAnimation[],
): BackgroundAnimation | undefined => {
  if (candidates.length === 0) {
    return undefined;
  }

  const totalWeight = candidates.reduce(
    (sum, candidate) => sum + (candidate.weight ?? 1),
    0,
  );
  let cursor = Math.random() * totalWeight;

  for (const candidate of candidates) {
    cursor -= candidate.weight ?? 1;

    if (cursor <= 0) {
      return candidate;
    }
  }

  return candidates[0];
};

/**
 * Initializes one random background animation for the current visit.
 */
export const initializeRandomBackground = (
  canvas: HTMLCanvasElement,
): (() => void) => {
  const selectedAnimation = pickAnimation(animations);

  if (!selectedAnimation) {
    return () => {};
  }

  document.body.style.background = selectedAnimation.background;
  console.log(`animation: ${selectedAnimation.id}`);
  return selectedAnimation.initialize(canvas);
};
