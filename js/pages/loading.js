let params = new URLSearchParams(window.location.search);
let where = params.get("where");
let id = params.get("id");

if (where) {
  let star = document.getElementById(where);
  star.classList.add("active");
  setTimeout(() => {
    star.classList.remove("active");
  }, 3000);
  setTimeout(() => {
    let destination = `pages/${where}.html`;
    let destinationParams = new URLSearchParams();
    if (id) {
      destinationParams.set("id", id);
    }
    if (destinationParams.toString()) {
      destination += `?${destinationParams}`;
    }
    window.location.href = destination;
  }, 3000);
} else {
  window.location.href = "pages/home.html";
}

let space = document.querySelector("#Space");
let galaxies = space.querySelectorAll(".star");

galaxies.forEach(function (star) {
  star.addEventListener("click", function () {
    goToPage(star.id);
    setTimeout(() => {
      star.classList.remove("active");
    }, 4000);
  });
});

setTimeout(() => {
  window.location.href = "pages/home.html";
}, 10000);
