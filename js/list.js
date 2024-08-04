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
          loadMovie();
        });
      }
    })
    .catch((error) => console.error("Error:", error));
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
loadMovie();
