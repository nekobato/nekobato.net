import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("#main") as HTMLDivElement;
  const dummyContent = document.querySelector(
    "#dummy-content"
  ) as HTMLDivElement;

  let windowScrolling = false;
  let mainScrolling = false;
  let adjusted = false;
  let resetTimeout: number;

  const setDummyContentHeight = () => {
    if (!dummyContent || !main) return;
    dummyContent.style.height =
      window.innerHeight * (main.scrollHeight / main.clientHeight) + "px";
  };

  const adjustScrollDiff = () => {
    if (
      Math.abs(
        main.scrollTop / main.clientHeight - window.scrollY / window.innerHeight
      ) > 0.1
    ) {
      console.log(
        main.scrollHeight / main.clientHeight,
        window.scrollY / window.innerHeight,
        Math.abs(
          main.scrollHeight / main.clientHeight -
            window.scrollY / window.innerHeight
        ),
        mainScrolling,
        windowScrolling
      );
      if (windowScrolling) {
        main.scrollTo(
          0,
          (window.scrollY / window.innerHeight) * main.clientHeight
        );
      } else if (mainScrolling) {
        window.scrollTo(
          0,
          (main.scrollTop / main.clientHeight) * window.innerHeight
        );
      }
      adjusted = true;
      clearTimeout(resetTimeout);
    } else {
      if (adjusted) {
        adjusted = false;
        windowScrolling = false;
        mainScrolling = false;
      } else {
        resetTimeout = setTimeout(() => {
          windowScrolling = false;
          mainScrolling = false;
        }, 100);
      }
    }
    windowScrolling = false;
    window.requestAnimationFrame(adjustScrollDiff);
  };

  window.addEventListener("scroll", () => {
    if (mainScrolling || windowScrolling) return;
    windowScrolling = true;
  });

  main.addEventListener("scroll", () => {
    if (mainScrolling || windowScrolling) return;
    mainScrolling = true;
  });

  window.addEventListener("resize", setDummyContentHeight);

  setDummyContentHeight();
  document.querySelector("body")?.classList.remove("loading");
  window.requestAnimationFrame(adjustScrollDiff);
});
