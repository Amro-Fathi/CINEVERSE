let Top_Rated_Container = document.querySelector("#Top_Rated_Container"),
  header_Destination = document.querySelector(".js-header-destination"),
  mobile_Destination = document.querySelector(".js-mobile-destination"),
  holo = document.querySelector(".checkbox-container label"),
  topLoading = document.querySelector("#Top_Rated .loadingPage");

async function destination() {
  let data = await getAllMovies(),
    random = Math.floor(Math.random() * data.length);
  let movie = data[random];
  header_Destination.innerHTML = "";
  mobile_Destination.innerHTML = "";
  header_Destination.innerHTML = `
                <div class="head">
              <div class="right">
                <i class="fa-solid fa-crosshairs me-2"></i>
                <span>TODAYS'S DESTINATION</span>
              </div>
              <div class="left">
                <i class="fa-solid fa-angle-right"></i>
              </div>
            </div>
            <div class="body">
              <div class="left">
                <img src="${baseImgUrl}${movie.poster_path}" class="img-fluid" alt="Space" />
              </div>
              <div class="right">
                <h4 class="title">${movie.title}</h4>
                <div class="info">
                  <span>${movie.year}</span>
                  <span class="dot">•</span>
                  <span>${movie.genres[0]}</span>
                  <span class="dot">•</span>
                  <span class="rate"><i class="fa-solid fa-star"></i>${movie.vote_average}</span>
                </div>
                <div class="desc">${movie.overview.slice(0, 150)}...</div>
                <div class="icons">
                  <i class="fa-solid fa-play active"></i>
                  <i class="fa-solid fa-bookmark"></i>
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
   
   
   
   `;
  mobile_Destination.innerHTML = ` <div class="card js-mobile-destination">
      <div class="head">
        <div class="right">
          <i class="fa-solid fa-crosshairs me-2" aria-hidden="true"></i>
          <span>TODAY'S DESTINATION</span>
        </div>
        <div class="left" role="button" tabindex="0" aria-label="Open today's destination">
          <i class="fa-solid fa-angle-right" aria-hidden="true"></i>
        </div>
      </div>
 
      <div class="dest-body">
        <div class="dest-top">
          <div class="left">
            <img src="${baseImgUrl}${movie.poster_url}" alt="${movie.title} poster"
                 width="160" height="240" loading="lazy" decoding="async" />
          </div>
          <div class="right">
            <h4 class="title">${movie.title}</h4>
            <div class="info">
              <span>${movie.year}</span>
              <span class="dot">•</span>
              <span>${movie.genres[0]}</span>
              <span class="dot">•</span>
              <span class="rate"><i class="fa-solid fa-star" aria-hidden="true"></i>${movie.vote_average}</span>
            </div>
            <div class="desc">${movie.overview.slice(0, 110)}...</div>
          </div>
        </div>
 
        <div class="icons">
          <i class="fa-solid fa-play active" role="button" tabindex="0" aria-label="Play trailer"></i>
          <i class="fa-solid fa-bookmark" role="button" tabindex="0" aria-label="Save"></i>
          <i class="fa-solid fa-plus" role="button" tabindex="0" aria-label="Add to list"></i>
        </div>
      </div>
    </div>`;
}

async function showTop() {
  let res = await getData("top_rated"),
    data = res.movies;
  let randomMovies = [];
  while (randomMovies.length < 3 && randomMovies.length < data.length) {
    let movie = data[Math.floor(Math.random() * data.length)];

    if (!randomMovies.includes(movie)) {
      randomMovies.push(movie);
    }
  }
  randomMovies.sort((a, b) => b.vote_average - a.vote_average);
  Top_Rated_Container.innerHTML = "";

  randomMovies.forEach((movie, index) => {
    let rank = ["top-one", "top-two", "top-three"][index];
    let order = ["order-lg-2", "order-lg-1", "order-lg-3"][index];

    Top_Rated_Container.innerHTML += `
            <div class="col-12 col-lg-4 order-2 ${order}">
              <div class="top  ${rank}">
                <img src="./images/genres/${movie.genres[0].toLowerCase()}.png" class="planet" alt="${movie.genres[index]}" />
                <span class="rank">${index + 1}</span>
                <div class="img ">
                  <img src="${baseImgUrl}${movie.poster_path}" alt="${movie.title}" />
                </div>
                <div class="content">
                  <h4 class="title">${movie.title}</h4>
                  <div class="info">
                    <span>${movie.year}</span><span class="dot">•</span> <span>${movie.genres[0]}</span><span class="dot">•</span>
                    <span class="rate"><i class="fa-solid fa-star"></i>${movie.vote_average}</span>
                  </div>
                  <div class="desc">
                     ${movie.overview.slice(0, 120)}...
                  </div>
                  <div class="actions">
                    <div class="view-details"><i class="fa-solid fa-play"></i><span>View Details</span></div>
                    <div class="bookmark"><i class="fa-regular fa-bookmark"></i></div>
                  </div>
                </div>
              </div>
            </div>
    
    
    
    
    
    `;
  });
  setTimeout(() => {
    topLoading.classList.remove("active");
  }, 1000);
}

holo.onclick = function () {
  topLoading.classList.add("active");
  setTimeout(() => {
    showTop();
  }, 200);
  setTimeout(() => {
    this.parentElement.querySelector('input[type="checkbox"]').checked = false;
  }, 1500);
};

showTop();
destination();
