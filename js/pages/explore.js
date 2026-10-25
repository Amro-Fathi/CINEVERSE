let planetsContainer = document.querySelector("#Explore .content");
let planets = planetsContainer.querySelectorAll(".planet"),
  moviesSection = document.querySelector("#Movies"),
  topMoviesContent = moviesSection.querySelector(".content .movies-section.top-rated-movies .body .movies"),
  genreMoviesContet = moviesSection.querySelector(".content .movies-section.genre-movies"),
  genre = genreMoviesContet.closest(".content").dataset.genre,
  prevBtn = moviesSection.querySelector(".content .prev");
nextBtn = moviesSection.querySelector(".content .next");
function changePlanet(planet) {
  let activePlanet = planetsContainer.querySelector(".planet.active");

  if (activePlanet === planet) {
    return;
  }

  activePlanet?.classList.remove("active");
  planet.classList.add("active");
  setTimeout(() => {
    moviesSection.scrollIntoView({
      top: moviesSection.clientHeight(),
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

async function showGenreMoviesExplore(genre = "action") {
  if (genre == "horror") {
    genreMoviesContet.innerHTML = `
        <div class="head">
    <div class="left">
      <div class="title">
        <div class="img">
          <img src="../images/moviesPageIcons/${genre.toLocaleLowerCase()}.png" class="img-fluid" alt="${genre} Icon" />
        </div>
        <div class="text">
          <h4><span>${genre}</span></h4>
          <p class="mb-0">The highest rated movies</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
  </div>

  <div class="body">
   <div class="wrap">
    <div class="movies">

          <p class="alert alert-danger w-100 text-dark text-center">No Movies Found For ${genre} genre , Sorry</p>

    </div>

  </div>
</div>
     
     `;
    return;
  }
  let res = await getData(genre),
    data = res.movies;
  genreMoviesContet.innerHTML = `
  
             <div class="head">
              <div class="left">
                <div class="title">
                  <div class="img">
                    <img src="../images/moviesPageIcons/${genre.toLocaleLowerCase()}.png" class="img-fluid" alt="${genre} Icon" />
                  </div>
                  <div class="text">
                    <h4><span>${genre}</span></h4>
                    <p class="mb-0">The highest rated movies</p>
                  </div>
                </div>
              </div>
              <div class="line"></div>
            </div>


            <div class="body">
   <div class="wrap">
    <button class="arrow prev" onclick="toggleScrollCards(-1 , this)"><i class="fa-solid fa-chevron-left"></i></button>
    <div class="movies">
    
    </div>

    <button class="arrow next" onclick="toggleScrollCards(1,this)"><i class="fa-solid fa-chevron-right"></i></button>
  </div>
</div>
  
  `;
  data.forEach(function (movie) {
    genreMoviesContet.querySelector(".movies").innerHTML += `
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

function toggleScrollCards(dire, that) {
  that.parentElement.querySelector(".movies").scrollBy({
    left: dire * topMoviesContent.clientWidth * 0.7,
    behavior: "smooth",
  });
}

showGenreMoviesExplore();
showTopMoviesExplore();
setHeaderPadding();
window.addEventListener("resize", setHeaderPadding);
