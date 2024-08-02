// 본인의 API 키를 넣어주셔야 합니다.
const API_KEY = "2bf749ea958d9defe9de1793706e4f20";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    const movies = data.results;
    console.log(movies);
    const movieContainer = document.getElementById("cardWrap");
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
    // 이후 데이터 처리
  })
  .catch((error) => console.error("Error:", error));

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
   <div class="card-contents">
   <div class="movie-title">
   
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
 <h3>${movie.title}</h3>
 </div>
  `;
  // card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
  return card;
}

// document.getElementById('search-button').addEventListener('click', () => {
//   const query = document.getElementById('search-input').value.toLowerCase();
//   const movieCards = document.querySelectorAll('.movie-card');
//   movieCards.forEach(card => {
//     const title = card.querySelector('h3').textContent.toLowerCase();
//     if (title.includes(query)) {
//       card.style.display = 'block';
//     } else {
//       card.style.display = 'none';
//     }
//   });
// });
