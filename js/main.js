const API_KEY = "55c98ffe62df5cbb6d68882dde4d2f2c";
const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-US&page=1`;
const playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-US&page=1`;
const comingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`;

fetch(popularURL)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    const $ul = document.querySelector(".slides");
    const $pagination = document.querySelector(".pagination");

    // 인기 영화 목록
    const list = document.querySelector("#popular-list");

    for (let i = 5; i < 10; i++) {
      const $div = document.createElement("div");
      $div.classList.add("movie-card");
      $div.innerHTML = `<a href="/detail.html?${movies[i].id}"><img
                class="post-img"
                src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}"
                alt="img"
              /></a>`;
      list.appendChild($div);
    }

    // 캐러셀 리스트
    movies.forEach((movie, index) => {
      const $li = document.createElement("li");
      $li.classList.add("movie");
      $li.innerHTML = `<img
                class="background-img"
                src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}"
                alt="${movie.title}"
              />
              <img class="poster-img" src="https://image.tmdb.org/t/p/original/${movie.poster_path}"/>
              <div class="movie-title">${movie.title}</div>
              <div class="movie-content">${movie.overview}</div>
              <button class="movie-detail"><a href="/detail.html?${movie.id}">상세 정보</a></button>
              `;
      $ul.appendChild($li);

      // 페이지네이션
      const $dot = document.createElement("div");
      $dot.classList.add("dot");
      if (index === 0) $dot.classList.add("active");
      $dot.addEventListener("click", () => moveToSlide(index + 1));
      $pagination.appendChild($dot);
    });

    // 무한 캐러셀 초기화
    initCarousel();
  })
  .catch((error) => console.error("Error:", error));

function initCarousel() {
  const $ul = document.querySelector(".slides");
  const $slides = document.querySelectorAll(".slides .movie");
  const $dots = document.querySelectorAll(".pagination .dot");
  let index = 1;

  // 첫 번째와 마지막 슬라이드 복제하여 무한 루프 설정
  const firstClone = $slides[0].cloneNode(true);
  const lastClone = $slides[$slides.length - 1].cloneNode(true);

  $ul.appendChild(firstClone);
  $ul.insertBefore(lastClone, $slides[0]);

  const totalSlides = $slides.length + 2;
  $ul.style.transform = `translateX(-${100}%)`;

  function moveToSlide(newIndex) {
    $ul.style.transition = "transform 0.5s ease-in-out";
    $ul.style.transform = `translateX(-${newIndex * 100}%)`;
    index = newIndex;

    if (index === totalSlides - 1) {
      setTimeout(() => {
        $ul.style.transition = "none";
        index = 1;
        $ul.style.transform = `translateX(-${index * 100}%)`;
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        $ul.style.transition = "none";
        index = totalSlides - 2;
        $ul.style.transform = `translateX(-${index * 100}%)`;
      }, 500);
    }
    updateDots();
    resetInterval();
  }

  function updateDots() {
    $dots.forEach((dot) => dot.classList.remove("active"));
    if (index === totalSlides - 1) {
      $dots[0].classList.add("active");
    } else if (index === 0) {
      $dots[$dots.length - 1].classList.add("active");
    } else {
      $dots[index - 1].classList.add("active");
    }
  }

  function moveToNextSlide() {
    if (index < totalSlides - 1) {
      moveToSlide(index + 1);
    }
  }

  function moveToPreviousSlide() {
    if (index > 0) {
      moveToSlide(index - 1);
    }
  }

  document.querySelector(".next").addEventListener("click", moveToNextSlide);
  document.querySelector(".prev").addEventListener("click", moveToPreviousSlide);

  setInterval(moveToNextSlide, 3000);
}

// 현재 상영 중 영화 목록
fetch(playingURL)
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector("#playing-list");
    const movies = data.results;

    for (let i = 10; i < 15; i++) {
      const $div = document.createElement("div");
      $div.classList.add("movie-card");
      $div.innerHTML = `<a href="/detail.html?${movies[i].id}"><img
              class="post-img"
              src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}"
              alt="img"
            /></a>`;
      list.appendChild($div);
    }
  })
  .catch((error) => console.error("Error:", error));

// 상영 예정 영화 목록
fetch(comingURL)
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector("#coming-list");
    const movies = data.results;

    for (let i = 15; i < 20; i++) {
      const $div = document.createElement("div");
      $div.classList.add("movie-card");
      $div.innerHTML = `<a href="/detail.html?${movies[i].id}"><img
              class="post-img"
              src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}"
              alt="img"
            /></a>`;
      list.appendChild($div);
    }
  })
  .catch((error) => console.error("Error:", error));
