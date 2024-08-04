// API KEY 값
const API_KEY = "55c98ffe62df5cbb6d68882dde4d2f2c";
// 인기 영화 URL
const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-US&page=1`;
// 현재 상영 영화 URL
const playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-US&page=1`;
// 상영 예정 URL
const comingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`;

// 인기 영화
fetch(popularURL)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    const $ul = document.querySelector(".slides");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIdx = 0;

    movies.forEach((el) => {
      const $li = document.createElement("li");
      $li.classList.add("movie");

      $li.innerHTML = `<img
                class="popular-img"
                src="https://image.tmdb.org/t/p/w500/${el.poster_path}"
                alt="img"
              />`;
      $ul.appendChild($li);
    });

    let movie = document.querySelectorAll(".movie");
    let slideCount = movie.length;

    makeClone();
    function makeClone() {
      for (let i = 0; i < slideCount; i++) {
        let cloneSlide = movie[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        $ul.appendChild(cloneSlide);
      }
      for (let i = slideCount - 1; i >= 0; i--) {
        let cloneSlide = movie[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        $ul.prepend(cloneSlide);
      }
      setInitial();

      setTimeout(function () {
        $ul.classList.add("animate");
      }, 100);
    }

    function setInitial() {
      let initialTranslateVal = -6200;
      $ul.style.transform = `translateX(${initialTranslateVal}px)`;
    }

    nextBtn.addEventListener("click", () => {
      moveSlide(currentIdx + 1);
    });
    prevBtn.addEventListener("click", () => {
      moveSlide(currentIdx - 1);
    });

    function moveSlide(num) {
      $ul.style.left = -num * 1550 + "px";
      currentIdx = num;

      if (currentIdx === 4 || currentIdx === -4) {
        setTimeout(function () {
          $ul.classList.remove("animate");
          $ul.style.left = "0px";
          currentIdx = 0;
        }, 500);
        setTimeout(function () {
          $ul.classList.add("animate");
        }, 600);
      }
    }
    // $ul.addEventListener("mouseover", function () {
    //   stopSlide();
    // });

    // $ul.addEventListener("mouseout", function () {
    //   autoSlide();
    // });
    const list = document.querySelector("#c");

    for (let i = 5; i < 10; i++) {
      const $div = document.createElement("div");
      $div.classList.add("movie-card");
      $div.innerHTML = `<img
                class="post-img"
                src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}"
                alt="img"
              />`;
      list.appendChild($div);
    }
  })
  .catch((error) => console.error("Error:", error));

// 현재 상영 중
fetch(playingURL)
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector("#a");
    const movies = data.results;

    for (let i = 10; i < 15; i++) {
      const $div = document.createElement("div");
      $div.classList.add("movie-card");
      $div.innerHTML = `<img
                class="post-img"
                src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}"
                alt="img"
              />`;
      list.appendChild($div);
    }
  })
  .catch((error) => console.error("Error:", error));

// 상영 예정
fetch(comingURL)
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector("#b");
    const movies = data.results;

    for (let i = 15; i < 20; i++) {
      const $div = document.createElement("div");
      $div.classList.add("movie-card");
      $div.innerHTML = `<img
              class="post-img"
              src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}"
              alt="img"
            />`;
      list.appendChild($div);
    }
  })
  .catch((error) => console.error("Error:", error));
