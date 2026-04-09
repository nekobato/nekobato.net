/**
 * Describes a background animation candidate that can be mounted on the page.
 */
export type BackgroundAnimation = {
  id: string;
  weight?: number;
  background: string;
  initialize: (canvas: HTMLCanvasElement) => () => void;
};
