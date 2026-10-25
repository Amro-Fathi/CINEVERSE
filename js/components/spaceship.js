let ship = document.querySelector(".ss"),
  sections = document.querySelectorAll("section"),
  marks = ship.querySelectorAll(".ss-mark"),
  lastY = scrollY,
  timer;

function maxScroll() {
  return Math.max(1, document.documentElement.scrollHeight - innerHeight);
}

function placeMarks() {
  sections.forEach((section, index) => {
    marks[index].style.setProperty("--mp", Math.min(1, section.offsetTop / maxScroll()));
  });
}

function update() {
  ship.style.setProperty("--p", Math.min(1, scrollY / maxScroll()));
}

function wake() {
  ship.classList.add("awake");
  ship.classList.remove("idle");
  clearTimeout(timer);
  timer = setTimeout(() => {
    ship.classList.remove("awake");
    ship.classList.add("idle");
  }, 1400);
}

marks.forEach((mark, index) => {
  mark.addEventListener("click", () => {
    sections[index].scrollIntoView({ behavior: "smooth" });
  });
});

function seek(e) {
  let percent = (e.clientY - 32) / (innerHeight - 64);
  scrollTo({ top: percent * maxScroll(), behavior: "instant" });
}

ship.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".ss-mark")) return;
  ship.setPointerCapture(e.pointerId);
  seek(e);
});

ship.addEventListener("pointermove", (e) => {
  if (ship.hasPointerCapture(e.pointerId)) {
    seek(e);
  }
});

addEventListener("scroll", () => {
  if (scrollY < lastY) {
    ship.classList.add("up");
  } else if (scrollY > lastY) {
    ship.classList.remove("up");
  }
  lastY = scrollY;
  update();
  wake();
});

addEventListener("resize", function () {
  placeMarks();
  update();
});
addEventListener("load", function () {
  placeMarks();
  update();
});

document.documentElement.classList.add("ss-on");
placeMarks();
update();
wake();
