import { initializeRandomBackground } from "./bg-animations";
import "./style.scss";

const desktopLayoutMediaQuery = window.matchMedia("(min-width: 641px)");

/**
 * Initializes the page scroll synchronization and the background animation.
 */
const initializePage = (): void => {
  const canvas = document.querySelector<HTMLCanvasElement>("#bg-animation");
  const main = document.querySelector<HTMLElement>("#main");
  const dummyContent = document.querySelector<HTMLDivElement>("#dummy-content");

  let disposeBackground: (() => void) | undefined;

  /**
   * Returns whether the fixed desktop layout behavior is active.
   */
  const isDesktopLayoutEnabled = (): boolean => desktopLayoutMediaQuery.matches;

  /**
   * Stops the background animation and restores the stylesheet background.
   */
  const stopBackground = (): void => {
    if (disposeBackground) {
      disposeBackground();
      disposeBackground = undefined;
    }

    if (canvas) {
      canvas.hidden = true;
    }

    document.body.style.background = "";
  };

  /**
   * Starts or stops the background canvas for the current layout mode.
   */
  const syncBackground = (): void => {
    if (!canvas) return;

    if (!isDesktopLayoutEnabled()) {
      stopBackground();
      return;
    }

    canvas.hidden = false;

    if (disposeBackground) return;

    disposeBackground = initializeRandomBackground(canvas);
  };

  syncBackground();
  window.addEventListener("pagehide", stopBackground, { once: true });
  desktopLayoutMediaQuery.addEventListener("change", syncBackground);

  if (!main || !dummyContent) {
    document.querySelector("body")?.classList.remove("loading");
    return;
  }

  let syncing = false;

  /**
   * Clears the document scroll proxy used by the desktop panel layout.
   */
  const clearDummyContentHeight = (): void => {
    dummyContent.style.height = "";
    main.scrollTop = 0;
    syncing = false;
  };

  /**
   * Matches the dummy content height to the internal scroll area of the main panel.
   */
  const setDummyContentHeight = (): void => {
    if (!isDesktopLayoutEnabled()) {
      clearDummyContentHeight();
      return;
    }

    dummyContent.style.height =
      window.innerHeight * (main.scrollHeight / main.clientHeight) + "px";
  };

  /**
   * Keeps the panel scroll position aligned with the window scroll.
   */
  const syncFromWindow = (): void => {
    if (syncing || !isDesktopLayoutEnabled()) return;
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
  const syncFromMain = (): void => {
    if (syncing || !isDesktopLayoutEnabled()) return;
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
  desktopLayoutMediaQuery.addEventListener("change", setDummyContentHeight);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      syncing = false;
    }
  });

  setDummyContentHeight();
  document.querySelector("body")?.classList.remove("loading");
};

document.addEventListener("DOMContentLoaded", initializePage);
