// API KEY 값
const API_KEY = "55c98ffe62df5cbb6d68882dde4d2f2c";
// 현재 상영 영화 URL
const playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-US&page=1`;

fetch(playingURL)
  .then((response) => response.json())
  .then((response) => {
    let movieList = response.results;
    for (let i = 0; i < 4; i++) {
      let movieId = movieList[i].id;
      const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`;
      fetch(videoUrl)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((movie) => {
            if (movie.type === "Teaser") {
              let playBox = document.createElement("div");
              playBox.setAttribute("class", "box");
              let player = document.createElement("div");
              player.setAttribute("id", movie.key);
              player.innerHTML = `
                <iframe width="100%" src="https://www.youtube.com/embed/${movie.key}?controls=1&autoplay=0&mute=1&loop=1&playlist=${movie.key}&origin=https://hbeom00.github.io/movie_11/index.html" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              `;

              playBox.append(player);
              document.getElementById("youtube").append(playBox);
            }
          });
        })
        .catch((err) => console.error(err));
    }
  })
  .catch((err) => console.error(err));
