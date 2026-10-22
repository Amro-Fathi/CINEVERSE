let root = document.querySelector("html");
let bar = document.querySelector(".ss");
let ship = bar.querySelector(".ss-ship");
let fill = bar.querySelector(".ss-fill");

let sections = [...document.querySelectorAll("section")];
let buttons = [...bar.querySelectorAll(".ss-mark")];

let marks = sections
  .map((section, index) => {
    let button = buttons[index];

    button.addEventListener("click", () => {
      section.scrollIntoView({
        behavior: "smooth",
      });
    });

    return { section, button, progress: 0 };
  })
  .filter(Boolean);

let maxScroll;
let railStart;
let railEnd;
let shipHeight;
let shipY = 0;
let boost = 0;
let animationFrame = 0;
let idleTimer = 0;
let dragging = false;
let lastScrollY = window.scrollY;

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

function measure() {
  let height = window.innerHeight;
  maxScroll = Math.max(1, root.scrollHeight - height);
  shipHeight = ship.offsetHeight;
  let padding = parseFloat(getComputedStyle(bar).getPropertyValue("--ss-pad")) || 14;
  railStart = padding + shipHeight / 2;
  railEnd = height - padding - shipHeight / 2;
  bar.style.setProperty("--r0", `${railStart}px`);
  bar.style.setProperty("--r1", `${height - railEnd}px`);
  marks.forEach((mark) => {
    let top = mark.section.getBoundingClientRect().top + window.scrollY;
    mark.progress = clamp(top / maxScroll);
    mark.button.style.top = `${railStart + mark.progress * (railEnd - railStart)}px`;
  });
  bar.hidden = root.scrollHeight <= height + 1;
  shipY = railStart + clamp(window.scrollY / maxScroll) * (railEnd - railStart);
  frame(true);
}

function frame(snap = false) {
  animationFrame = 0;
  let progress = clamp(window.scrollY / maxScroll);
  let targetY = railStart + progress * (railEnd - railStart);
  let previousY = shipY;
  if (snap) {
    shipY = targetY;
  } else {
    shipY += (targetY - shipY) * (dragging ? 0.5 : 0.16);
  }

  if (Math.abs(targetY - shipY) < 0.1) {
    shipY = targetY;
  }
  boost += (clamp(Math.abs(shipY - previousY) / 14) - boost) * 0.2;
  if (boost < 0.01) boost = 0;
  ship.style.transform = `translate3d(0, ${shipY - shipHeight / 2}px, 0)`;
  ship.style.setProperty("--boost", boost.toFixed(3));
  fill.style.transform = `scaleY(${clamp((shipY - railStart) / (railEnd - railStart))})`;
  marks.forEach((mark) => {
    let active = mark.progress <= progress + 0.02 && !marks.some((other) => other.progress > mark.progress && other.progress <= progress + 0.02);
    mark.button.classList.toggle("on", active);
    if (active) {
      mark.button.setAttribute("aria-current", "true");
    } else {
      mark.button.removeAttribute("aria-current");
    }
  });
  if (shipY !== targetY || boost) {
    animationFrame = requestAnimationFrame(() => frame());
  }
}

function wake() {
  bar.classList.add("awake");
  bar.classList.remove("idle");
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    bar.classList.remove("awake");
    bar.classList.add("idle");
  }, 1400);

  if (!animationFrame) {
    animationFrame = requestAnimationFrame(() => frame());
  }
}

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY !== lastScrollY) {
      bar.classList.toggle("up", window.scrollY < lastScrollY);
    }

    lastScrollY = window.scrollY;
    wake();
  },
  { passive: true },
);

function seek(clientY, instant = false) {
  let progress = clamp((clientY - railStart) / (railEnd - railStart));

  window.scrollTo({
    top: progress * maxScroll,
    behavior: "smooth",
  });
}

bar.addEventListener("pointerdown", (event) => {
  if (event.button > 0 || event.target.closest(".ss-mark")) return;

  if (Math.abs(event.clientY - shipY) <= shipHeight / 2) {
    dragging = true;
    bar.classList.add("dragging");
    bar.setPointerCapture(event.pointerId);
  } else {
    seek(event.clientY);
  }
});

bar.addEventListener("pointermove", (event) => {
  if (dragging) seek(event.clientY, true);
});

function endDragging() {
  dragging = false;
  bar.classList.remove("dragging");
}

bar.addEventListener("pointerup", endDragging);
bar.addEventListener("pointercancel", endDragging);
window.addEventListener("resize", measure);

if (window.ResizeObserver) {
  new ResizeObserver(measure).observe(root);
}

root.classList.add("ss-on");

measure();
wake();
