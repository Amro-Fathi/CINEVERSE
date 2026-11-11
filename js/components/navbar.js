let navbarAccountArrow = document.querySelector(".account-arrow");
((navbarAccountPopup = document.querySelector(".account-detailes")), (navbarAccount = document.querySelector(".account-detailes-popup")));

function OpenAccountPopup() {
  navbarAccountPopup.classList.toggle("active");
  navbarAccountArrow.classList.toggle("active");
}
function OpenAccountPopupRight() {
  navbarAccount.classList.toggle("active");
}
function stopPropagation(event) {
  event.stopPropagation();
}
function toggleSearchActive() {
  document.querySelector("#SearchContainer").classList.toggle("active");
  let isActive = document.querySelector("#SearchContainer").classList.contains("active");
  document.querySelector("#SearchInput").classList.toggle("active", isActive);
  if (isActive) {
    document.querySelector("#SearchInput").focus();
  }
}

document.addEventListener("click", function () {
  navbarAccountPopup.classList.remove("active");
  navbarAccountArrow.classList.remove("active");
  navbarAccount.classList.remove("active");
});
window.addEventListener("resize", function () {
  if (window.innerWidth > 992) {
    navbarAccount.classList.remove("active");
  }
});

function setHeaderPadding() {
  let header = document.querySelector("header");
  let nav = document.querySelector("nav.main-nav");

  if (header.id == "Movie") {
    header.style.paddingBlock = `${nav.offsetHeight + 60}px`;
    if (window.innerWidth < 1050) {
      header.querySelector(".padding-row").style.paddingTop = `${nav.offsetHeight + 100}px`;
    } else {
      header.querySelector(".padding-row").style.paddingTop = ``;
    }
    return;
  }
  header.style.paddingTop = `${nav.offsetHeight - 10}px`;
}
