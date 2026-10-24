let planetsContainer = document.querySelector("#Explore .content");
let planets = planetsContainer.querySelectorAll(".planet"),
  moviesSection = document.querySelector("#Movies"),
  topMoviesContent = moviesSection.querySelector(".content .movies-section.top-rated-movies .body .movies"),
  nextBtn = moviesSection.querySelector(".content .next"),
  prevBtn = moviesSection.querySelector(".content .prev");

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

async function showTopMoviesExplore() {
  let res = await getData("top_rated"),
    data = res.movies;
  topMoviesContent.innerHTML = "";
  data.forEach(function (movie) {
    topMoviesContent.innerHTML += `
      
               <div class="movie">
                    <div class="movie-inner">
                      <div class="face front">
                        <img src="${baseImgUrl}${movie.poster_path}" alt="${movie.title}" />
                        <div class="info">
                          <p class="rate">${movie.vote_average}<i class="fa-solid fa-star"></i></p>
                          <h3>${movie.title}</h3>
                          <p class="year">${movie.year}</p>
                        </div>
                      </div>

                      <div class="face back">
                        <p class="rate">${movie.vote_average} <i class="fa-solid fa-star"></i></p>
                        <h3>${movie.title}</h3>
                        <p class="genres"><i class="fa-regular fa-clock"></i> ${movie.runtime}m &nbsp; ${movie.genres[0]} &nbsp; ${movie.year}</p>
                        <p class="overview">
                          ${movie.overview.slice(0, 120)}...
                        </p>
                        <a class="view-detailes"><i class="fa-solid fa-play"></i> Details</a>
                      </div>
                    </div>
                  </div>
      
      
      `;
  });
}

nextBtn.addEventListener("click", () => {
  topMoviesContent.scrollBy({
    left: topMoviesContent.clientWidth * 0.7,
    behavior: "smooth",
  });
});
prevBtn.addEventListener("click", () => {
  topMoviesContent.scrollBy({
    left: -topMoviesContent.clientWidth * 0.7,
    behavior: "smooth",
  });
});

showTopMoviesExplore();
setHeaderPadding();
window.addEventListener("resize", setHeaderPadding);
