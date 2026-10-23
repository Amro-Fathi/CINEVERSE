let root = document.querySelector("html");
let spaceShip = document.querySelector(".ss");
let sections = document.querySelectorAll("section");
let marks = spaceShip.querySelectorAll(".ss-mark");
function getMaxPossibleHeightPercentage() {
  return Math.max(1, root.scrollHeight - innerHeight);
}
let max = getMaxPossibleHeightPercentage();
let lastY = scrollY;
let idleTimer;
function layout() {
  let sectionsArr = [...sections];

  sectionsArr.forEach((section, i) => {
    marks[i].style.setProperty("--mp", Math.min(1, section.offsetTop / max));
  });
  update();
}

function update() {
  let sectionsArr = [...sections];
  spaceShip.style.setProperty("--p", Math.min(1, scrollY / max));
  let active = sectionsArr.findLastIndex((s) => s.offsetTop <= scrollY + innerHeight / 2);
  marks.forEach((m, i) => m.classList.toggle("on", i === active));
}
function wake() {
  spaceShip.classList.add("awake");
  spaceShip.classList.remove("idle");
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    spaceShip.classList.remove("awake");
    spaceShip.classList.add("idle");
  }, 1400);
}
marks.forEach((m, i) => m.addEventListener("click", () => sections[i].scrollIntoView({ behavior: "smooth" })));

let seek = function (e) {
  scrollTo({ top: ((e.clientY - 32) / (innerHeight - 64)) * max, behavior: "instant" });
};
spaceShip.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".ss-mark")) return;
  spaceShip.setPointerCapture(e.pointerId);
  seek(e);
});
spaceShip.addEventListener("pointermove", (e) => {
  if (spaceShip.hasPointerCapture(e.pointerId)) seek(e);
});

addEventListener("scroll", () => {
  if (scrollY < lastY) {
    spaceShip.classList.add("up");
  } else if (scrollY > lastY) {
    spaceShip.classList.remove("up");
  }
  lastY = scrollY;
  update();
  wake();
});

addEventListener("resize", layout);
addEventListener("load", layout);
root.classList.add("ss-on");
layout();
wake();
