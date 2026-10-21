let baseURL = "https://amro-fathi.github.io/api/",
baseImgUrl = 'https://image.tmdb.org/t/p/original';
async function getAllMovies() {
  let response = await fetch(`${baseURL}movies.json`);
  let data = await response.json();
  return data;
}
async function getReviews(id) {
  let response = await fetch(`${baseURL}reviews.json`);
  let data = await response.json();
  return data[id];
}
async function getData(category) {
  let response = await fetch(`${baseURL}categories/${category}.json`);
  let data = await response.json();
  return data;
}







const LATEST_MOVIES_COUNT = 10;
const DEFAULT_IMAGE_URL = "https://image.tmdb.org/t/p/origin";

// Stops movie text from breaking our HTML (for example a title with a " in it)
function escapeHTML(text) {
  return String(text || "").replace(/[&<>"']/g, function (char) {
    const safeCharacters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return safeCharacters[char];
  });
}

// Turns the release date into a number so we can compare movies.
// If the movie has no date we use 0 (the oldest possible).
function getReleaseTime(movie) {
  const time = Date.parse(movie.release_date || movie.year);
  return isNaN(time) ? 0 : time;
}

// The same movie can be in many category files, so keep only one copy of each id
function removeDuplicateMovies(movies) {
  const seenIds = {};
  const uniqueMovies = [];

  for (const movie of movies) {
    if (!seenIds[movie.id]) {
      seenIds[movie.id] = true;
      uniqueMovies.push(movie);
    }
  }
  return uniqueMovies;
}

// Gets the newest movies that are already out
function getLatestMovies(allMovies) {
  // Sometimes the data is { movies: [...] } instead of [...]
  let movies = Array.isArray(allMovies) ? allMovies : (allMovies && allMovies.movies) || [];

  movies = removeDuplicateMovies(movies);

  // Remove movies without a date and movies that are not released yet
  const now = Date.now();
  movies = movies.filter(function (movie) {
    const releaseTime = getReleaseTime(movie);
    return releaseTime > 0 && releaseTime <= now;
  });

  // Newest first
  movies.sort(function (movieA, movieB) {
    return getReleaseTime(movieB) - getReleaseTime(movieA);
  });

  return movies.slice(0, LATEST_MOVIES_COUNT);
}

// ---------- Small helpers that prepare the text for one card ----------

function getPosterUrl(movie) {
  const poster = movie.poster_path || movie.poster_url || "";

  // Already a full link (https://...) → use it as it is
  if (!poster || poster.startsWith("http")) return poster;

  const imageBase = typeof baseImgUrl === "string" ? baseImgUrl.replace(/\/$/, "") : DEFAULT_IMAGE_URL;
  const slash = poster.startsWith("/") ? "" : "/";
  return imageBase + slash + poster;
}

function getMovieYear(movie) {
  if (movie.year) return movie.year;
  if (movie.release_date) return movie.release_date.slice(0, 4);
  return "New";
}

function getMovieGenre(movie) {
  return Array.isArray(movie.genres) && movie.genres.length > 0 ? movie.genres[0] : "Movie";
}

function getMovieRating(movie) {
  const rating = Number(movie.vote_average);
  return rating > 0 ? rating.toFixed(1) : "—";
}

// ---------- Builds the HTML of ONE movie card ----------

function createMovieCard(movie, index) {
  const title = movie.title || movie.original_title || "Unknown Movie";
  const cardNumber = String(index + 1).padStart(2, "0"); // 1 → "01", 10 → "10"
  const posterUrl = getPosterUrl(movie);

  // Real poster if we have one, otherwise a "CINEVERSE" placeholder
  const posterHTML = posterUrl
    ? `<img class="latest-movie__poster" src="${escapeHTML(posterUrl)}" alt="${escapeHTML(title)} poster" loading="lazy">`
    : `<div class="latest-movie__no-poster"><span>CINEVERSE</span><i>✦</i></div>`;

  // latest-movie--1 ... latest-movie--10 tell the CSS where this card starts
  return `
    <article class="latest-movie latest-movie--${index + 1}">
      <div class="latest-movie__poster-frame">
        ${posterHTML}
        <span class="latest-movie__index">${cardNumber}</span>
        <span class="latest-movie__rating">★ ${getMovieRating(movie)}</span>
        <span class="latest-movie__shine"></span>
      </div>

      <div class="latest-movie__caption">
        <h3>${escapeHTML(title)}</h3>
        <p>
          <span>${escapeHTML(getMovieYear(movie))}</span>
          <i>·</i>
          <span>${escapeHTML(getMovieGenre(movie))}</span>
        </p>
      </div>
    </article>
  `;
}

// ---------- Main function ----------

async function showLatestMovies() {
  const section = document.querySelector("#Latest");
  const cardsContainer = document.querySelector("[data-latest-cards]");

  if (!section || !cardsContainer) return;

  try {
    const allMovies = await getAllMovies();
    const latestMovies = getLatestMovies(allMovies);

    if (latestMovies.length === 0) {
      cardsContainer.innerHTML = '<p class="latest-state">No movies found.</p>';
      return;
    }

    cardsContainer.innerHTML = latestMovies.map(createMovieCard).join("");

    // Tells the CSS that the movies are ready
    section.classList.add("latest-section--ready");
  } catch (error) {
    console.log("Error loading latest movies:", error);
    cardsContainer.innerHTML = '<p class="latest-state">Could not load movies.</p>';
  }
}

showLatestMovies();