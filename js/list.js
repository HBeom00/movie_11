const API_KEY = "d235a0d6390e11fb07dd3329c8492501";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    let list = data.results;
    list.forEach((element) => {
      let poster = element.poster_path;

      let temp_HTML = `
        <div>
            <img src="https://image.tmdb.org/t/p/w500${poster}" alt="">
        </div>
      `;

      document.getElementById("movie-list").insertAdjacentHTML("beforeend", temp_HTML);
    });
  })
  .catch((error) => console.error("Error:", error));