let CHARS = "▓▒░█#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)],
  elements = document.querySelectorAll(".encrypted"),
  texts = [];

elements.forEach(function (el) {
  texts.push(el.textContent);
});

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

elements.forEach(function (element, i) {
  element.textContent = mix(texts[i]);
});
function update(element, text, start, duration = 4000) {
  let progress = Math.min((Date.now() - start) / duration, 1);
  element.textContent = mix(text, Math.floor(progress * text.length));

  if (progress < 1) {
    requestAnimationFrame(function () {
      update(element, text, start, duration);
    });
  }
}
function decode(element, text) {
  let start = Date.now();
  update(element, text, start);
}

function revealMovieInfo() {
  elements.forEach((el, i) => {
    setTimeout(function () {
      decode(el, texts[i]);
    }, i * 2000);
  });
}

document.querySelector("#testDecode").addEventListener("click", revealMovieInfo);
