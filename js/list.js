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
          <div class="poster"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=""></div>
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

      if (nowPage < data.total_pages) {
        let moreMovie = document.createElement("div");
        moreMovie.id = "more-btn";
        moreMovie.innerText = "More View";

        document.getElementById("wrap").append(moreMovie);

        document.getElementById("more-btn").addEventListener("click", () => {
          document.getElementById("more-btn").remove();
          nowPage++;
          loadMovie();
        });
      }
    })
    .catch((error) => console.error("Error:", error));
};
loadMovie();
