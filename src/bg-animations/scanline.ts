import type { BackgroundAnimation } from "./lib/types";

const MAX_DEVICE_PIXEL_RATIO = 2;
const SWEEP_HEIGHT = 160;

type NoiseParticle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  phaseOffset: number;
};

/**
 * Restricts a value to the provided minimum and maximum bounds.
 */
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Returns a random number inside the provided range.
 */
const randomBetween = (min: number, max: number): number =>
  min + Math.random() * (max - min);

/**
 * Resizes the canvas to match the viewport and device pixel ratio.
 */
const resizeCanvas = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
): { width: number; height: number } => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const devicePixelRatio = Math.min(
    window.devicePixelRatio || 1,
    MAX_DEVICE_PIXEL_RATIO,
  );

  canvas.width = Math.floor(width * devicePixelRatio);
  canvas.height = Math.floor(height * devicePixelRatio);
  context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  return { width, height };
};

/**
 * Calculates a noise particle count that scales with the viewport area.
 */
const getNoiseParticleCount = (
  viewportWidth: number,
  viewportHeight: number,
): number =>
  clamp(Math.round((viewportWidth * viewportHeight) / 24000), 18, 52);

/**
 * Creates a single bright particle that will softly flicker over time.
 */
const createNoiseParticle = (
  viewportWidth: number,
  viewportHeight: number,
): NoiseParticle => ({
  x: randomBetween(0, viewportWidth),
  y: randomBetween(0, viewportHeight),
  size: randomBetween(1, 2.6),
  opacity: randomBetween(0.08, 0.2),
  phaseOffset: randomBetween(0, Math.PI * 2),
});

/**
 * Builds a sparse field of CRT-like noise speckles.
 */
const createNoiseField = (
  viewportWidth: number,
  viewportHeight: number,
): NoiseParticle[] =>
  Array.from(
    { length: getNoiseParticleCount(viewportWidth, viewportHeight) },
    () => createNoiseParticle(viewportWidth, viewportHeight),
  );

/**
 * Draws thin horizontal scanlines with a slight pulse.
 */
const drawScanlines = (
  context: CanvasRenderingContext2D,
  viewportWidth: number,
  viewportHeight: number,
  timeSeconds: number,
): void => {
  const lineSpacing = 4;

  context.save();

  for (let y = 0; y <= viewportHeight + lineSpacing; y += lineSpacing) {
    const alpha = 0.045 + 0.018 * Math.sin(y * 0.08 + timeSeconds * 1.4);
    context.fillStyle = `rgba(173, 226, 255, ${clamp(alpha, 0.02, 0.08)})`;
    context.fillRect(0, y, viewportWidth, 1);
  }

  context.restore();
};

/**
 * Draws a slow highlight sweep so the scanline layer does not feel static.
 */
const drawSweep = (
  context: CanvasRenderingContext2D,
  viewportWidth: number,
  viewportHeight: number,
  timeSeconds: number,
): void => {
  const sweepY =
    ((timeSeconds * 48) % (viewportHeight + SWEEP_HEIGHT * 2)) - SWEEP_HEIGHT;
  const gradient = context.createLinearGradient(
    0,
    sweepY - SWEEP_HEIGHT / 2,
    0,
    sweepY + SWEEP_HEIGHT / 2,
  );

  gradient.addColorStop(0, "rgba(180, 236, 255, 0)");
  gradient.addColorStop(0.45, "rgba(180, 236, 255, 0.012)");
  gradient.addColorStop(0.5, "rgba(226, 248, 255, 0.06)");
  gradient.addColorStop(0.55, "rgba(180, 236, 255, 0.012)");
  gradient.addColorStop(1, "rgba(180, 236, 255, 0)");

  context.save();
  context.globalCompositeOperation = "screen";
  context.fillStyle = gradient;
  context.fillRect(0, sweepY - SWEEP_HEIGHT / 2, viewportWidth, SWEEP_HEIGHT);
  context.restore();
};

/**
 * Draws a sparse set of flickering phosphor-like noise points.
 */
const drawNoise = (
  context: CanvasRenderingContext2D,
  noiseField: NoiseParticle[],
  timeSeconds: number,
): void => {
  context.save();
  context.globalCompositeOperation = "screen";

  noiseField.forEach((particle) => {
    const flicker =
      0.35 + 0.65 * ((Math.sin(timeSeconds * 3.2 + particle.phaseOffset) + 1) / 2);
    context.fillStyle = `rgba(223, 246, 255, ${particle.opacity * flicker})`;
    context.fillRect(particle.x, particle.y, particle.size, particle.size);
  });

  context.restore();
};

/**
 * Draws a soft vignette so the edges sit farther back behind the glass panel.
 */
const drawVignette = (
  context: CanvasRenderingContext2D,
  viewportWidth: number,
  viewportHeight: number,
): void => {
  const vignette = context.createRadialGradient(
    viewportWidth / 2,
    viewportHeight / 2,
    Math.min(viewportWidth, viewportHeight) * 0.18,
    viewportWidth / 2,
    viewportHeight / 2,
    Math.max(viewportWidth, viewportHeight) * 0.72,
  );

  vignette.addColorStop(0, "rgba(7, 16, 24, 0)");
  vignette.addColorStop(1, "rgba(5, 10, 17, 0.36)");

  context.save();
  context.fillStyle = vignette;
  context.fillRect(0, 0, viewportWidth, viewportHeight);
  context.restore();
};

/**
 * A restrained CRT-inspired scanline backdrop with a slow sweep and faint noise.
 */
export const animation: BackgroundAnimation = {
  id: "scanline",
  weight: 0.65,
  background:
    "linear-gradient(180deg, rgb(31, 50, 66) 0%, rgb(16, 28, 39) 56%, rgb(8, 14, 22) 100%)",
  initialize: (canvas: HTMLCanvasElement): (() => void) => {
    const context = canvas.getContext("2d");

    if (!context) {
      return () => {};
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const abortController = new AbortController();

    let viewport = resizeCanvas(canvas, context);
    let noiseField = createNoiseField(viewport.width, viewport.height);
    let animationFrameId = 0;
    let animationStartTimestamp = 0;

    /**
     * Paints the current frame and optionally advances the moving sweep.
     */
    const renderScene = (timestamp: number, animated: boolean): void => {
      const timeSeconds = animated
        ? (timestamp - animationStartTimestamp) / 1000
        : 0;

      context.clearRect(0, 0, viewport.width, viewport.height);
      drawVignette(context, viewport.width, viewport.height);
      drawSweep(context, viewport.width, viewport.height, timeSeconds);
      drawScanlines(context, viewport.width, viewport.height, timeSeconds);
      drawNoise(context, noiseField, timeSeconds);
    };

    /**
     * Stops the active animation loop if it is running.
     */
    const stopLoop = (): void => {
      if (animationFrameId === 0) {
        return;
      }

      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };

    /**
     * Runs the next animation frame.
     */
    const tick = (timestamp: number): void => {
      if (animationStartTimestamp === 0) {
        animationStartTimestamp = timestamp;
      }

      renderScene(timestamp, true);
      animationFrameId = requestAnimationFrame(tick);
    };

    /**
     * Starts the animation loop unless motion should be reduced.
     */
    const startLoop = (): void => {
      if (animationFrameId !== 0) {
        return;
      }

      if (motionQuery.matches || document.hidden) {
        renderScene(0, false);
        return;
      }

      animationStartTimestamp = 0;
      animationFrameId = requestAnimationFrame(tick);
    };

    /**
     * Recreates the scanline field to fit the latest viewport.
     */
    const handleResize = (): void => {
      viewport = resizeCanvas(canvas, context);
      noiseField = createNoiseField(viewport.width, viewport.height);
      renderScene(0, false);
      startLoop();
    };

    /**
     * Pauses the loop while the document is hidden to avoid needless work.
     */
    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        stopLoop();
        return;
      }

      startLoop();
    };

    /**
     * Responds to reduced-motion preference changes.
     */
    const handleMotionPreferenceChange = (): void => {
      stopLoop();
      renderScene(0, false);
      startLoop();
    };

    window.addEventListener("resize", handleResize, {
      passive: true,
      signal: abortController.signal,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange, {
      signal: abortController.signal,
    });
    motionQuery.addEventListener("change", handleMotionPreferenceChange, {
      signal: abortController.signal,
    });

    renderScene(0, false);
    startLoop();

    return () => {
      stopLoop();
      abortController.abort();
      context.clearRect(0, 0, viewport.width, viewport.height);
    };
  },
};
