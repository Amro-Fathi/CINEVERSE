let $ = function (selector) {
  return document.querySelector(selector);
};
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
  $("#SearchContainer").classList.toggle("active");
  let isActive = $("#SearchContainer").classList.contains("active");
  $("#SearchInput").classList.toggle("active", isActive);
  if (isActive) {
    $("#SearchInput").focus();
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
