import { initializeRandomBackground } from "./bg-animations";
import "./style.scss";

/**
 * Initializes the page scroll synchronization and the background animation.
 */
const initializePage = (): void => {
  const canvas = document.querySelector<HTMLCanvasElement>("#bg-animation");
  const main = document.querySelector<HTMLElement>("#main");
  const dummyContent = document.querySelector<HTMLDivElement>("#dummy-content");

  if (canvas) {
    const disposeBackground = initializeRandomBackground(canvas);
    window.addEventListener("pagehide", disposeBackground, { once: true });
  }

  if (!main || !dummyContent) {
    document.querySelector("body")?.classList.remove("loading");
    return;
  }

  let syncing = false;

  /**
   * Matches the dummy content height to the internal scroll area of the main panel.
   */
  const setDummyContentHeight = () => {
    dummyContent.style.height =
      window.innerHeight * (main.scrollHeight / main.clientHeight) + "px";
  };

  /**
   * Keeps the panel scroll position aligned with the window scroll.
   */
  const syncFromWindow = () => {
    if (syncing) return;
    syncing = true;
    const ratio = window.scrollY / window.innerHeight;
    main.scrollTo(0, ratio * main.clientHeight);
    requestAnimationFrame(() => {
      syncing = false;
    });
  };

  /**
   * Reflects the panel scroll position back to the window scroll offset.
   */
  const syncFromMain = () => {
    if (syncing) return;
    syncing = true;
    const ratio = main.scrollTop / main.clientHeight;
    window.scrollTo({ top: ratio * window.innerHeight });
    requestAnimationFrame(() => {
      syncing = false;
    });
  };

  window.addEventListener("scroll", syncFromWindow, { passive: true });
  main.addEventListener("scroll", syncFromMain, { passive: true });
  window.addEventListener("resize", setDummyContentHeight);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      syncing = false;
    }
  });

  setDummyContentHeight();
  document.querySelector("body")?.classList.remove("loading");
};

document.addEventListener("DOMContentLoaded", initializePage);
