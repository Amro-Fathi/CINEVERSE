let root = document.querySelector("html");
let bar = document.querySelector(".ss");
let sections = [...document.querySelectorAll("section")];
let marks = [...bar.querySelectorAll(".ss-mark")];

let max = () => Math.max(1, root.scrollHeight - innerHeight);
let lastY = scrollY;
let idleTimer;
function layout() {
  sections.forEach((s, i) => {
    let top = s.getBoundingClientRect().top + scrollY;
    marks[i].style.setProperty("--mp", Math.min(1, top / max()));
  });
  update();
}

function update() {
  bar.style.setProperty("--p", Math.min(1, scrollY / max()));
  let active = -1;
  sections.forEach((s, i) => {
    if (s.getBoundingClientRect().top <= innerHeight / 2) active = i;
  });
  marks.forEach((m, i) => m.classList.toggle("on", i === active));
}
function wake() {
  bar.classList.add("awake");
  bar.classList.remove("idle");
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    bar.classList.remove("awake");
    bar.classList.add("idle");
  }, 1400);
}
marks.forEach((m, i) => m.addEventListener("click", () => sections[i].scrollIntoView({ behavior: "smooth" })));

let seek = (e) => scrollTo(0, ((e.clientY - 32) / (innerHeight - 64)) * max());

bar.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".ss-mark")) return;
  bar.setPointerCapture(e.pointerId);
  seek(e);
});
bar.addEventListener("pointermove", (e) => {
  if (bar.hasPointerCapture(e.pointerId)) seek(e);
});

addEventListener(
  "scroll",
  () => {
    if (scrollY !== lastY) bar.classList.toggle("up", scrollY < lastY);
    lastY = scrollY;
    update();
    wake();
  }
);



addEventListener("resize", layout);
addEventListener("load", layout);
root.classList.add("ss-on");
layout();
wake();
