setHeaderPadding();
window.addEventListener("resize", setHeaderPadding);

let controls = document.querySelectorAll("#MovieControl >*");
controls.forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("active");
    item.disabled = true;
    if (item.classList.contains("watch-list") && !item.classList.contains("active")) {
      setTimeout(() => {
        item.innerHTML = `<i class="fa-solid fa-bookmark"></i> <span class="animate__animated animate__zoomIn">Add to Watch Later</span>`;
      }, 400);
    } else if (item.classList.contains("watch-list")) {
      item.innerHTML = `<i class="fa-solid fa-bookmark"></i> <span class="d-none">Add to Watch Later</span> `;
    }
    if (item.classList.contains("watched") && !item.classList.contains("active")) {
      setTimeout(() => {
        item.innerHTML = `<i class="fa-solid fa-eye "></i> <span class="animate__animated animate__zoomIn">Mark As Watched</span> `;
      }, 400);
    } else if (item.classList.contains("watched")) {
      item.innerHTML = `<i class="fa-solid fa-eye "></i> <span class="d-none">Mark As Watched</span> `;
    }
    setTimeout(function () {
      item.disabled = false;
    }, 700);
  });
});

let id = new URLSearchParams(window.location.search).get("id"),
  movie = {};
async function getNeededMovie() {
  let movies = await getAllMovies(),
    reviews = await getReviews(id),
    movie = movies.filter((item) => item.id == id)[0],
    movieContainer = document.querySelector("#NeededMovie"),
    imagesContainer = document.querySelector("#Gallary"),
    reviewsContainer = document.querySelector("#reviewsSwiper .swiper-wrapper"),
    trailer = document.querySelector("#trailer");
  trailer.addEventListener("click", function () {
    window.location.href = `${movie.trailer_url}`;
  });

  movieContainer.innerHTML = `
    
    
      <div class="col-12 col-xl-4 left">
              <div class="explosion-planet ">
                <img src="../images/signal-lost/planet-${movie.genres[0].toLowerCase() != "Science Fiction" ? movie.genres[0].toLowerCase() : "science-fiction"}.svg" alt="Explosion Planet" class="img-fluid" />
              </div>
              <div class="img">
                <div id="FloatingImg" class="float explosion">
                  <div class="card3d">
                    <div class="frame">
                      <img src="${baseImgUrl}${movie.poster_path}" alt="Movie Name" class="img-fluid" />
                    </div>
                  </div>
                </div>
                <div class="stage">
                  <i class="pool"></i>
                  <i class="r1"></i>
                  <i class="r2"></i>
                  <i class="r3"></i>
                </div>
              </div>
            </div>
            <div class="col-12 col-xl-8 right">
              <div class="logo special-effect">
                <div class="signal-lost">
                  <img class="radar"  src="../images/signal-lost/signal-lost-3-radar.svg"  alt="" />
                  <img class="glitch" src="../images/signal-lost/signal-lost-1-glitch.svg" alt="" />
                  <img class="static" src="../images/signal-lost/signal-lost-2-static.svg" alt="" />
                </div>
                <div class="logo-img ">
                  <img draggable="false" src="${baseImgUrl}${movie.logo_path}" alt="Logo Movie" class="img-fluid effect" />
                </div>
                <div class="verticle-line"></div>
                <div class="text ">
                  <div class="tagline encrypted" >${movie.tagline}</div>
                  <div class="genres">
                    ${prepareGenres(movie.genres)}
                  </div>
                </div>
              </div>

              <div class="row infos">
                <div class="col-lg-3 col-12 col-sm-6 position-relative meteorite-container">
                  <div class="meteorite d-none">
                  </div>
                  <div class="year item">
                    <div class="orb"><i class="fa-solid fa-calendar-days"></i></div>
                    <div class="panel">
                      <span class="text encrypted">Release year</span>
                      <span class="value encrypted">${movie.year}</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-12 col-sm-6 position-relative meteorite-container">
                  <div class="meteorite d-none">
                  </div>
                  <div class="time item">
                    <div class="orb"><i class="fa-solid fa-stopwatch"></i></div>
                    <div class="panel">
                      <span class="text encrypted">Runtime</span>
                      <span class="value encrypted">${movie.runtime_text}</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-12 col-sm-6 position-relative meteorite-container">
                  <div class="meteorite d-none">
                  </div>
                  <div class="rate item">
                    <div class="orb"><i class="fa-solid fa-star"></i></div>
                    <div class="panel">
                      <span class="text encrypted">Rating</span>
                      <span class="value encrypted">${movie.vote_average}</span>
                      <div class="percent">
                        <span class="ring" style="--votePercent: ${movie.rating_percent}%"><span class="number">${movie.rating_percent}%</span></span>
                        <span class="count">${movie.vote_count} votes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-12 col-sm-6 position-relative meteorite-container">
                  <div class="meteorite d-none">
                  </div>
                  <div class="popularity item">
                    <div class="orb"><i class="fa-solid fa-arrow-trend-up"></i></div>
                    <div class="panel">
                      <span class="text encrypted">Popularity</span>
                      <span class="value encrypted">${movie.popularity.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row row-gap-4">
                <div class="col-lg-8 col-12">
                  <div class="overview special-effect encrypted">
                      ${movie.overview}
                  </div>
                </div>
                <div class="col-lg-4 col-12 lists">
                  <div class="item special-effect">
                    <div class="list date encrypted">${movie.release_date}</div>
                    <a href="${movie.imdb_url}" class="list imdb"><img src="../images/imdbLogo.svg.webp" draggable="false" alt="IMDB" class="img-fluid" /></div>
                  </div>
                </div>
              </div>
            </div>
    
    

    
    
    `;

  imagesContainer.innerHTML = `
    
    

      <div class="head">
        <div>
          <p>Media Signal</p>
          <h3 class="title">Gallery</h3>
          <span class="count"><i class="fa-regular fa-image"></i> ${movie.images.backdrops.length + movie.images.posters.length} Frames</span>
        </div>
      </div>

      <div class="images">
        <button class="arrow prev"><i class="fa-solid fa-chevron-left"></i></button>

        <div class="swiper gallary-swiper">
          <div class="swiper-wrapper">
            ${prepareImages(movie.images.backdrops)}
            ${prepareImages(movie.images.posters)}
          </div>
        </div>

        <button class="arrow next"><i class="fa-solid fa-chevron-right"></i></button>

        <div class="dots"></div>
      </div>

    `;

  new Swiper("#Gallary .gallary-swiper", {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    grabCursor: true,
    slideToClickedSlide: true,

    coverflowEffect: {
      rotate: 30,
      depth: 300,
      stretch: "45%",
      slideShadows: true,
    },

    navigation: {
      prevEl: "#Gallary .prev",
      nextEl: "#Gallary .next",
    },

    pagination: {
      el: "#Gallary .dots",
      clickable: true,
      bulletClass: "dot",
      bulletActiveClass: "active",
    },
  });

  if (reviews.length == 0) {
    reviewsContainer.innerHTML = `
    <div class="no-reviews">
      <i class="fa-regular fa-comment-dots"></i>
      <p>No reviews available yet.</p>
    </div>
  `;
    reviewsContainer.parentElement.parentElement.querySelectorAll("button").forEach(function (item) {
      item.classList.add("d-none");
    });
  } else {
    reviews.forEach(function (data) {
      reviewsContainer.innerHTML += `
    
    <div class="swiper-slide">
              <div class="card">
                <div   class="top">
                  <img class="avatar" src="../images/avatars/space_avatar_${Math.floor(Math.random() * 30) + 1}.png" alt="Alex Carter" />
                  <div class="info">
                    <h3 class="name">${data.author}</h3>
                    <span class="date">${getTimeAgo(data.created_at)}</span>
                  </div>
                  <div class="rating">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i>
                  </div>
                </div>
                <div class="body">
                  <p class="text">${data.content.slice(0, 200)}...</p>
                </div>
              </div>
            </div>
    
    `;
    });

    new Swiper(".reviews-swiper", {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 30,
      rewind: true,
      grabCursor: true,
      navigation: {
        prevEl: ".reviews-arrow-prev",
        nextEl: ".reviews-arrow-next",
      },
      pagination: {
        el: ".dots",
        clickable: true,
      },
      breakpoints: {
        992: { slidesPerView: 2, spaceBetween: 40 },
        1200: { slidesPerView: 3, spaceBetween: 40 },
      },
    });
  }

  initShuffling();
  initAnimation();
}

function prepareGenres(genres) {
  let i = "";
  genres.forEach(function (genre) {
    i += `<i class="encrypted">${genre}</i>`;
  });
  return i;
}
function prepareImages(images) {
  let i = "";
  images.forEach(function (url) {
    i += `
     <div class="swiper-slide"><img src="${baseImgUrl}${url}" alt="Frame 6" /></div>
    `;
  });
  return i;
}
function getTimeAgo(publishedAt) {
  let publishedTime = new Date(publishedAt);
  let now = new Date();

  let difference = Math.floor((now - publishedTime) / 1000);

  if (difference < 60) {
    return `${difference} seconds ago`;
  }

  let minutes = Math.floor(difference / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes == 1 ? "" : "s"} ago`;
  }

  let hours = Math.floor(minutes / 60);

  if (hours < 24) {
    let remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes ? `, ${remainingMinutes} minutes` : ""} ago`;
  }

  let days = Math.floor(hours / 24);

  if (days < 365) {
    let remainingHours = hours % 24;
    return `${days} days${remainingHours ? `, ${remainingHours} hours` : ""} ago`;
  }

  let years = Math.floor(days / 365);
  let remainingDays = days % 365;

  return `${years} years${remainingDays ? `, ${remainingDays} days` : ""} ago`;
}
getNeededMovie();
