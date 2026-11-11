let CHARS = "▓▒█#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)],
  encryptedElements = [],
  hits = 0,
  texts = [];

function wait(timeToWait, callback) {
  setTimeout(callback, timeToWait);
}
function mix(text, revealed = 0) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char === " " || i < revealed) {
      result += char;
    } else {
      result += randomChar();
    }
  }
  return result;
}

function decode(element, text, duration = 2000) {
  if (!text.length) return;

  let revealed = 0;

  let interval = setInterval(function () {
    revealed++;
    element.textContent = mix(text, revealed);

    if (revealed >= text.length) {
      clearInterval(interval);
    }
  }, duration / text.length);
}

function initShuffling() {
  encryptedElements = document.querySelectorAll(".encrypted");
  texts = [];

  encryptedElements.forEach(function (el, index) {
    el.dataset.index = index;
    texts.push({
      id: index,
      text: el.textContent,
    });

    el.textContent = mix(el.textContent);
  });
}
function playSound(name, volume = 0.5) {
  let sound = new Audio(`../../audio/${name}.mp3`);
  sound.volume = volume;
  sound.play();
  return sound;
}

function decodeGroup(container, duration = 3000) {
  let items = [container, ...container.querySelectorAll(".encrypted")];

  items.forEach(function (el) {
    let data = texts[el.dataset.index];
    if (data) decode(el, data.text, duration);
  });
}

function launchMeteorite(container) {
  let meteorite = container.querySelector(".meteorite");

  meteorite.classList.remove("d-none");
  meteorite.classList.add("fall");

  meteorite.addEventListener("animationend", function onEnd(e) {
    if (e.animationName !== "meteorite-travel") return;
    meteorite.removeEventListener("animationend", onEnd);

    playSound("meteorite", 0.08);
    container.classList.add("hit", "struck");
    decodeGroup(container, 700);
    hits++;
    if (hits == document.querySelectorAll(".meteorite").length - 1) wait(600, openSignal);
    wait(900, () => container.classList.remove("hit"));
  });
}
function revealDetails() {
  let overview = document.querySelector(".overview"),
    dateBox = document.querySelector(".lists .item");

  overview.classList.add("reveal");
  decodeGroup(overview, 1500);

  wait(600, function () {
    dateBox.classList.add("reveal");
    decodeGroup(dateBox, 800);
  });
}
function openSignal() {
  let cover = document.querySelector(".signal-lost"),
    logo = cover.parentElement;
  cover.classList.add("play");
  wait(2200, () => decodeGroup(logo, 1700));
  wait(3900, () => (document.querySelector("#repeatAnimation").disabled = false));
}

function initAnimation() {
  let explosionPlanet = document.querySelector(".explosion-planet"),
    FloatingImg = document.querySelector("#FloatingImg"),
    src = explosionPlanet.querySelector("img").src,
    meteorites = document.querySelectorAll(".meteorite-container .meteorite");
  document.querySelector("#repeatAnimation").disabled = true;
  playSound("explosion");
  explosionPlanet.querySelector("img").src = `${src}?t=${Date.now()}`;
  wait(5000, function () {
    FloatingImg.classList.remove("explosion");
    wait(2000, function () {
      explosionPlanet.classList.add("d-none");
    });
  });

  wait(5000, function () {
    revealDetails();
    meteorites.forEach(function (item, i) {
      wait(i * 1400, function () {
        launchMeteorite(item.parentElement);
      });
    });
  });
}

function resetAnimation() {
  hits = 0;

  document.querySelector(".signal-lost").classList.remove("play");
  document.querySelectorAll(".overview, .lists .item").forEach((el) => el.classList.remove("reveal"));

  document.querySelectorAll(".meteorite-container").forEach(function (container) {
    let meteorite = container.querySelector(".meteorite");
    container.classList.remove("hit", "struck");
    meteorite.classList.remove("fall");
    meteorite.classList.add("d-none");
  });

  encryptedElements.forEach((el) => (el.textContent = mix(texts[el.dataset.index].text)));

  document.querySelector(".explosion-planet").classList.remove("d-none");
  document.querySelector("#FloatingImg").classList.add("explosion");

  initAnimation();
}

document.querySelector("#repeatAnimation").addEventListener("click", resetAnimation);
