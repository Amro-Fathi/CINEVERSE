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
document.addEventListener("click", function () {
  navbarAccountPopup.classList.remove("active");
  navbarAccountArrow.classList.remove("active");
  navbarAccount.classList.remove("active");
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    navbarAccount.classList.remove("active");
  }
});
