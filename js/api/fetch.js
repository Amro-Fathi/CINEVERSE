let baseURL = "https://amro-fathi.github.io/api/",
  baseImgUrl = "https://image.tmdb.org/t/p/original";
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

function goToMovieExplore(id) {
  window.location.href = "movie.html?id=" + id;
}
function goToMovieIndex(id) {
  window.location.href = "pages/movie.html?id=" + id;
}
function goToIndex() {
  window.location.href = "../index.html";
}

/*
{
  "id": 166428,
  "imdb_id": "tt2386490",
  "title": "How to Train Your Dragon: The Hidden World",
  "original_title": "How to Train Your Dragon: The Hidden World",
  "original_language": "en",
  "tagline": "Fly on your own. Find your way home.",
  "overview": "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.",
  "release_date": "2019-01-03",
  "year": 2019,
  "runtime": 104,
  "vote_average": 7.8,
  "vote_count": 7317,
  "popularity": 21.5,
  "adult": false,
  "genres": [
   "Animation",
   "Family",
   "Adventure"
  ],
  "genre_ids": [
   16,
   10751,
   12
  ],
  "trailer_youtube_id": "Rokcx3qFsww",
  "poster_path": "/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg",
  "backdrop_path": "/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg",
  "logo_path": "/xtEU2VCn3j3zBKSI74qCEs6CUYf.png",
  "images": {
   "posters": [
    "/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg",
    "/bCYRgsT0Kndh23a6kHazBdXWCn1.jpg",
    "/ZPZdFP2qo0cvfNTrUUNRXTW9AB.jpg",
    "/gHoZaNRTCYNjftaqZFjjV15OSHr.jpg",
    "/5YQQNdUTVLuPlTTmR54g5Vx7D4K.jpg"
   ],
   "backdrops": [
    "/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg",
    "/lFwykSz3Ykj1Q3JXJURnGUTNf1o.jpg",
    "/7j1UKo3cvXnOjvYtiNamAgFl2TE.jpg",
    "/kEDkiJBJuOxKjEPjWK2HQemTOym.jpg",
    "/yQEiidhiRM8CvuCPoRBRMrZ3ikC.jpg"
   ],
   "logos": [
    "/xtEU2VCn3j3zBKSI74qCEs6CUYf.png",
    "/5qmSzNMirgHRwLSIve4Y4LPvb4t.png"
   ]
  },
  "keywords": [
   "based on novel or book",
   "flying",
   "villain",
   "melancholy",
   "vikings (norsemen)",
   "sequel",
   "overpopulation",
   "dragon",
   "love interest",
   "based on children's book",
   "mourning",
   "mysterious",
   "thoughtful",
   "somber",
   "philosophical",
   "reflective",
   "complex",
   "wonder",
   "playful",
   "introspective",
   "3d animation",
   "inspirational",
   "grand",
   "intimate",
   "joyous",
   "dramatic",
   "suspenseful",
   "sentimental",
   "witty",
   "intense",
   "romantic",
   "admiring",
   "adoring",
   "amused",
   "appreciative",
   "approving",
   "awestruck",
   "bold",
   "celebratory",
   "comforting",
   "compassionate",
   "complicated",
   "enthusiastic",
   "exuberant",
   "optimistic",
   "powerful",
   "sincere",
   "sympathetic",
   "vibrant"
  ],
  "review_count": 17,
  "categories": [
   "Top_Rated",
   "Adventure"
  ],
  "slug": "how-to-train-your-dragon-the-hidden-world-2019",
  "language": "English",
  "runtime_text": "1h 44m",
  "rating_percent": 78,
  "imdb_url": "https://www.imdb.com/title/tt2386490/",
  "trailer_url": "https://www.youtube.com/watch?v=Rokcx3qFsww",
  "trailer_embed_url": "https://www.youtube.com/embed/Rokcx3qFsww",
  "poster_url": "https://image.tmdb.org/t/p/original/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg",
  "backdrop_url": "https://image.tmdb.org/t/p/original/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg",
  "logo_url": "https://image.tmdb.org/t/p/original/xtEU2VCn3j3zBKSI74qCEs6CUYf.png"
 }

 */
