let planetsContainer = document.querySelector("#Explore .content");
let planets = planetsContainer.querySelectorAll(".planet"),
  moviesSection = document.querySelector("#Movies");

function changePlanet(planet) {
  let activePlanet = planetsContainer.querySelector(".planet.active");

  if (activePlanet === planet) {
    return;
  }

  activePlanet?.classList.remove("active");
  planet.classList.add("active");
  setTimeout(() => {
    moviesSection.scrollIntoView({
      behavior: "smooth",
    });
  }, 1000);
}

planets.forEach((planet) => {
  planet.addEventListener("click", () => changePlanet(planet));
});

setHeaderPadding();
window.addEventListener("resize", setHeaderPadding);
