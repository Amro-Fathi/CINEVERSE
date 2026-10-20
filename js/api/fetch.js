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
