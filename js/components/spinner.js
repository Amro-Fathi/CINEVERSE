let section = document.querySelector("#Wheel"),
  box = section.querySelector(".spinner-container"),
  wheel = section.querySelector(".wheel"),
  spinner = section.querySelector(".spinner"),
  portal = section.querySelector(".portal"),
  clip = section.querySelector(".hand-clip"),
  hand = section.querySelector(".hand"),
  claw = section.querySelector("#claw"),
  grab = section.querySelector("#grab"),
  grabImg = grab.querySelector("img"),
  moviesBox = section.querySelector(".movies"),
  spinBtn = section.querySelector("#spinBtn"),
  pictures = section.querySelectorAll(".choose img"),
  moviePlaceHolder = section.querySelector(".placeholder"),
  flash = section.querySelector(".flash"),
  movies = [],
  rotation = 0,
  tilt = ["tilt-1", "tilt-2", "tilt-3", "tilt-4", "tilt-5", "tilt-6"];

(async function loadMovies() {
  let data = await getAllMovies();
  while (movies.length < 9 && movies.length < data.length) {
    let movie = data[Math.floor(Math.random() * data.length)];

    if (!movies.includes(movie)) {
      movies.push(movie);
    }
  }
  movies.forEach((movie, i) => {
    if (pictures[i]) {
      pictures[i].src = baseImgUrl + movie.poster_path;
    }
  });
})();

function wait(timeToWait, callback) {
  setTimeout(callback, timeToWait);
}
function scroll(s) {
  window.scrollBy({
    top: s,
    behavior: "smooth",
  });
}

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  let winner = Math.floor(Math.random() * movies.length);
  section.scrollIntoView({
    behavior: "smooth",
  });
  let oldRotation = rotation,
    winnerImg = `${baseImgUrl}${movies[winner].poster_path}`;
  rotation = rotation - (rotation % 360) + 1800 + ((180 - winner * 40 + 360) % 360);
  grabImg.src = winnerImg;
  wait(1000, function () {
    window.scrollBy({
      top: 250,
      behavior: "smooth",
    });
    portal.classList.add("open");
    moviePlaceHolder.classList.add("d-none");
    moviesBox.classList.remove("up");
    wait(3000, function () {
      claw.classList.add("show", "clicking");
      wait(300, function () {
        flash.classList.add("show");
        wait(300, function () {
          flash.classList.remove("show");
          claw.classList.remove("show", "clicking");

          section.scrollIntoView({
            behavior: "smooth",
          });
          wait(500, function () {
            portal.classList.remove("open");
            spinner.animate([{ transform: `rotate(${oldRotation}deg)` }, { transform: `rotate(${rotation}deg)` }], {
              duration: 5000,
              fill: "forwards",
            });

            wait(5400, function () {
              window.scrollBy({
                top: 250,
                behavior: "smooth",
              });
              portal.classList.add("open");
              wait(3000, function () {
                claw.classList.add("grabbing-the-movie");
                wait(1500, function () {
                  claw.classList.remove("closed");
                  claw.classList.add("open");
                  wait(1000, function () {
                    grab.classList.add("grabbed");
                    wait(1500, function () {
                      claw.classList.add("wait-more");
                      claw.classList.remove("grabbing-the-movie");
                      wait(1500, function () {
                        moviesBox.innerHTML += `
                          <div class="movie">
                             <div class="movie-inner">
                               <div class="face front">
                                <img src="${baseImgUrl}${movies[winner].poster_path}" alt="${movies[winner].title}" />
                                <div class="info">
                                  <p class="rate">${movies[winner].vote_average.toFixed(1)}<i class="fa-solid fa-star"></i></p>
                                  <h3>${movies[winner].title}</h3>
                                  <p class="year">${movies[winner].year}</p>
                                </div>
                              </div>

                              <div class="face back">
                                <p class="rate">${movies[winner].vote_average.toFixed(1)} <i class="fa-solid fa-star"></i></p>
                                <h3>${movies[winner].title}</h3>
                                <p class="genres"><i class="fa-regular fa-clock"></i> ${movies[winner].runtime}m ${movies[winner].genres[0]} ${movies[winner].year}</p>
                                <p class="overview">
                                  ${movies[winner].overview.slice(0, 120)}...
                                </p>
                                <a class="view-detailes" onclick="goToMovieExplore(${movies[winner].id})"><i class="fa-solid fa-play"></i> Details</a>
                              </div>
                            </div>
                          </div>
                        `;
                        wait(500, function () {
                          moviesBox.lastElementChild.classList.add("active");
                          wait(500, function () {
                            spinBtn.disabled = false;
                            moviesBox.lastElementChild.classList.add(tilt[winner]);
                            window.scrollBy({
                              top: 300,
                              behavior: "smooth",
                            });
                            wait(500, function () {
                              portal.classList.remove("open");
                              claw.classList = "claw closed";
                              grab.classList = "grab";
                              wait(1300, function () {
                                moviesBox.classList.add("up");
                                window.scrollBy({
                                  top: -200,
                                  behavior: "smooth",
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
