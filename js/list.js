<<<<<<< HEAD
const API_KEY = "2bf749ea958d9defe9de1793706e4f20";
let nowPage = 1;

function loadMovie() {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${nowPage}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const movies = data.results;
      console.log(movies);
      const movieContainer = document.getElementById("cardWrap");
      movies.forEach((movie) => {
        const card = createMovieCard(movie);
        movieContainer.appendChild(card);
      });
      const totalPage = data.total_pages;
      if (nowPage < totalPage) {
        let moreMovie = document.createElement("div");
        moreMovie.id = "more-btn";
        moreMovie.innerText = "More View";
        document.getElementById("cardWrap").append(moreMovie);
        document.getElementById("more-btn").addEventListener("click", function () {});
        document.getElementById("more-btn").addEventListener("click", () => {
          document.getElementById("more-btn").remove();
          nowPage++;
=======
const API_KEY = "d235a0d6390e11fb07dd3329c8492501";

const category = location.search.replace("?", "");
let nowPage = 1;

let loadMovie = () => {
  const URL = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&region=kr&page=${nowPage}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      let list = data.results;
      list.forEach((movie) => {
        const score = Math.round(movie.vote_average / 2);
        const movieCard = document.createElement("li");
        movieCard.classList = "card";
        movieCard.innerHTML = `
        <a href="/detail.html?${movie.id}">
          <div class="poster"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" onerror="this.src='./img/no-img.png'" alt="${movie.title} 포스터"></div>
          <div class="info">
            <div class="release-date">${movie.release_date}</div>
            <div class="title">${movie.title}</div>
            <div class="vote">
              <img src="./img/popcorn-${score}.png" alt="${score}점">
              <span id="average">(${movie.vote_average})</span>
            </div>
          </div>
        </a>
      `;

        document.getElementById("movie-list").append(movieCard);
      });

      if (sessionStorage.getItem(category) !== null) {
        while (nowPage < sessionStorage.getItem(category)) {
          nowPage++;
          loadMovie();
        }
      }

      if (nowPage < data.total_pages) {
        let moreMovie = document.createElement("div");
        moreMovie.id = "more-btn";
        moreMovie.innerText = `Load More ( ${nowPage} / ${data.total_pages} )`;
        document.getElementById("more-btn") !== null && document.getElementById("more-btn").remove();
        document.getElementById("wrap").append(moreMovie);

        document.getElementById("more-btn").addEventListener("click", () => {
          document.getElementById("more-btn").remove();
          nowPage++;
          sessionStorage.setItem(category, nowPage);
>>>>>>> 2508fc1f34bce47fcc44fd57b436aff8cb4edb33
          loadMovie();
        });
      }
    })
    .catch((error) => console.error("Error:", error));
<<<<<<< HEAD
  function createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
   <div class="card-contents">
  <img class='movie-poster' src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
 <h3>${movie.title}</h3>
 </div>
  `;
    return card;
  }
}
=======
};
>>>>>>> 2508fc1f34bce47fcc44fd57b436aff8cb4edb33
loadMovie();
