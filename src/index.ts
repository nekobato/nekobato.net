import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("#main") as HTMLDivElement;
  const dummyContent = document.querySelector(
    "#dummy-content"
  ) as HTMLDivElement;

  const setDummyContentHeight = () => {
    if (!dummyContent || !main) return;
    dummyContent.style.height =
      window.innerHeight * (main.scrollHeight / main.clientHeight) + "px";
  };

  const onScrollWindow = () => {
    main.scrollTop = (window.scrollY / window.innerHeight) * main.clientHeight;
  };

  window.addEventListener("scroll", onScrollWindow, { passive: true });
  window.addEventListener("resize", setDummyContentHeight, { passive: true });
  main.addEventListener("scroll", (e) => {
    e.stopPropagation();
  });

  setDummyContentHeight();
  document.querySelector("body")?.classList.remove("loading");
});
