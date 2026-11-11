let auth = document.querySelector("#Login .auth"),
  switchers = document.querySelectorAll("#Login [data-switch]"),
  eyes = document.querySelectorAll("#Login .toggle-pass");

switchers.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    auth.dataset.mode = item.dataset.switch;
  });
});

if (location.hash == "#register") auth.dataset.mode = "register";

eyes.forEach(function (eye) {
  eye.addEventListener("click", function () {
    let input = eye.parentElement.querySelector("input"),
      show = input.type == "password";
    input.type = show ? "text" : "password";
    eye.innerHTML = `<i class="fa-regular fa-eye${show ? "" : "-slash"}"></i>`;
  });
});
