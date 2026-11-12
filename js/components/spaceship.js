let ship = document.querySelector(".ss");
let sections = document.querySelectorAll("section");
let marks = document.querySelectorAll(".ss-mark");
let lastY = 0;
let timer;

function getMax() {
  return document.documentElement.scrollHeight - innerHeight;
}

function placeMarks() {
  for (let i = 0; i < marks.length; i++) {
    marks[i].style.setProperty("--mp", sections[i].offsetTop / getMax());
  }
}

function update() {
  ship.style.setProperty("--p", scrollY / getMax());
}

function wake() {
  ship.classList.add("awake");
  ship.classList.remove("idle");
  clearTimeout(timer);
  timer = setTimeout(function () {
    ship.classList.remove("awake");
    ship.classList.add("idle");
  }, 1400);
}

for (let i = 0; i < marks.length; i++) {
  marks[i].addEventListener("click", function () {
    sections[i].scrollIntoView({ behavior: "smooth" });
  });
}

function seek(e) {
  let percent = e.clientY / innerHeight;
  scrollTo(0, percent * getMax());
}

ship.addEventListener("pointerdown", function (e) {
  if (e.target.closest(".ss-mark")) return;
  ship.setPointerCapture(e.pointerId);
  seek(e);
});

ship.addEventListener("pointermove", function (e) {
  if (ship.hasPointerCapture(e.pointerId)) {
    seek(e);
  }
});

addEventListener("scroll", function () {
  if (scrollY < lastY) {
    ship.classList.add("up");
  } else {
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

placeMarks();
update();
wake();
