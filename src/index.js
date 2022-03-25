const main = document.querySelector("#main");
const dummyContent = document.querySelector("#dummy-content");

function setDummyContentHeight() {
  dummyContent.style.height =
    window.innerHeight * (main.scrollHeight / main.clientHeight) + "px";
}

window.addEventListener(
  "scroll",
  e => {
    main.scrollTop = (window.scrollY / window.innerHeight) * main.clientHeight;
  },
  { passive: true }
);

window.addEventListener("resize", setDummyContentHeight, { passive: true });

setDummyContentHeight();
