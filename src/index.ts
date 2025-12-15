import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("#main") as HTMLDivElement;
  const dummyContent = document.querySelector(
    "#dummy-content"
  ) as HTMLDivElement;

  let syncing = false;

  const setDummyContentHeight = () => {
    if (!dummyContent || !main) return;
    dummyContent.style.height =
      window.innerHeight * (main.scrollHeight / main.clientHeight) + "px";
  };

  const syncFromWindow = () => {
    if (!main || syncing) return;
    syncing = true;
    const ratio = window.scrollY / window.innerHeight;
    main.scrollTo(0, ratio * main.clientHeight);
    requestAnimationFrame(() => {
      syncing = false;
    });
  };

  const syncFromMain = () => {
    if (!main || syncing) return;
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
});
