import { initializeRandomBackground } from "./bg-animations";
import "./style.scss";

/**
 * Starts browser behavior after hydration and returns its lifecycle cleanup.
 */
export const initializePage = (): (() => void) => {
  const desktopLayoutMediaQuery = window.matchMedia("(min-width: 641px)");
  const events = new AbortController();
  const { signal } = events;
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
  window.addEventListener("pagehide", stopBackground, { signal });
  window.addEventListener("pageshow", syncBackground, { signal });
  desktopLayoutMediaQuery.addEventListener("change", syncBackground, {
    signal,
  });

  if (!main || !dummyContent) {
    return () => {
      events.abort();
      stopBackground();
    };
  }

  let syncing = false;
  let scrollFrame = 0;

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
    scrollFrame = requestAnimationFrame(() => {
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
    scrollFrame = requestAnimationFrame(() => {
      syncing = false;
    });
  };

  window.addEventListener("scroll", syncFromWindow, { passive: true, signal });
  main.addEventListener("scroll", syncFromMain, { passive: true, signal });
  window.addEventListener("resize", setDummyContentHeight, { signal });
  desktopLayoutMediaQuery.addEventListener("change", setDummyContentHeight, {
    signal,
  });
  main.addEventListener("toggle", setDummyContentHeight, {
    capture: true,
    signal,
  });
  main.addEventListener("load", setDummyContentHeight, {
    capture: true,
    signal,
  });

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        syncing = false;
      }
    },
    { signal },
  );

  void document.fonts.ready.then(() => {
    if (!signal.aborted) setDummyContentHeight();
  });

  setDummyContentHeight();
  return () => {
    events.abort();
    cancelAnimationFrame(scrollFrame);
    stopBackground();
    clearDummyContentHeight();
  };
};
