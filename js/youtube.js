// API KEY 값
const API_KEY = "55c98ffe62df5cbb6d68882dde4d2f2c";
// 현재 상영 영화 URL
const playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-US&page=1`;

fetch(playingURL)
  .then((response) => response.json())
  .then((response) => {
    loadYoutube();
    let movieList = response.results;
    for (let i = 0; i < 4; i++) {
      let movieId = movieList[i].id;
      const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`;
      fetch(videoUrl)
        .then((response) => {
          loadScript();
          return response.json();
        })
        .then((response) => {
          response.results.forEach((movie) => {
            if (movie.type === "Teaser") {
              let playBox = document.createElement("div");
              playBox.setAttribute("class", "box");
              let player = document.createElement("div");
              player.setAttribute("id", movie.key);

              playBox.append(player);
              document.getElementById("youtube").append(playBox);

              onYouTubeIframeAPIReady(movie.key);
            }
          });
        })
        .catch((err) => console.error(err));
    }
  })
  .catch((err) => console.error(err));

let player;

function onYouTubeIframeAPIReady(movieId) {
  player = new YT.Player(movieId, {
    videoId: movieId,
    playerVars: {
      controls: 1,
      mute: 1,
      playlist: movieId
    }
  });
}

function loadScript() {
  if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}
