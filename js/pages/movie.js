setHeaderPadding();
window.addEventListener("resize", setHeaderPadding);

let controls = document.querySelectorAll("#MovieControl >*");
controls.forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("active");
    item.disabled = true;
    if (item.classList.contains("watch-list") && !item.classList.contains("active")) {
      setTimeout(() => {
        item.innerHTML = `<i class="fa-solid fa-bookmark"></i> Add to Watch Later`;
      }, 400);
    } else if (item.classList.contains("watch-list")) {
      item.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
    }
    if (item.classList.contains("watched") && !item.classList.contains("active")) {
      setTimeout(() => {
        item.innerHTML = `<i class="fa-solid fa-eye"></i> Mark As Watched`;
      }, 400);
    } else if (item.classList.contains("watched")) {
      item.innerHTML = `<i class="fa-solid fa-eye"></i>`;
    }
    setTimeout(function () {
      item.disabled = false;
    }, 700);
  });
});
