const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWVjZTQ3MTM4YTljNjA0ZDJjNTQxZDM0MTUyOWZlMyIsIm5iZiI6MTcyMjQ5MjM3OS44MTk4ODUsInN1YiI6IjY2YTBkYzFkY2M0MmFlNzJhMjJlOWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UkEFEcFoMzkNPfld4qzpu8RIO9OHQpfvPgxT6NH3a7Q";

let currentPage = 1;
const ITEMS_PER_PAGE = 20;
let totalResults = 0;
let searchQuery = "";
let displayedMovieIds = new Set(); // 표시된 영화 IDs를 저장하는 Set
const category = location.search.replace("?", "");
let check = 0;
let nowPage = 1;

// 초기 검색 함수
function initializeSearch() {
  currentPage = 1; // 검색 시 페이지를 1로 초기화
  displayedMovieIds.clear(); // 표시된 영화 IDs 초기화
  searchResult(currentPage);
}
initializeSearch();

function searchResult(page = 1) {
  const query = location.search.replace("?", "");
  searchQuery = query; // 현재 쿼리를 업데이트

  if (!query) {
    alert("검색어를 입력해주세요.");
    return;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`
    }
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=false&language=ko&page=${page}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const searchResultDiv = document.getElementById("searchResult");
      const resultCountDiv = document.getElementById("result-count");
      const loadMoreDiv = document.getElementById("load-more");

      if (page === 1) {
        searchResultDiv.innerHTML = ""; // 초기화면에서 결과를 비우기
        totalResults = data.total_results;
        resultCountDiv.textContent = `총 결과 개수: ${totalResults}`;

        check = 0;
        check = totalResults;

        // 페이지 초기화 후 load-more 버튼을 업데이트
        updateLoadMoreButton(data.total_pages);
      }

      if (data.results.length > 0) {
        data.results.forEach((movie) => {
          if (displayedMovieIds.has(movie.id)) {
            return; // 중복 제외
          }

          // 새 영화 ID를 표시된 영화 IDs에 추가
          displayedMovieIds.add(movie.id);

          const score = Math.round(movie.vote_average / 2);

          const cardElement = document.createElement("div");
          cardElement.className = "card";
          cardElement.innerHTML = `
            <a href="/detail.html?${movie.id}">
              <div class="poster"><img src="${BASE_IMAGE_URL}${movie.poster_path}" onerror="this.src='./img/no-img.png'" alt="${movie.title} 포스터" class="poster-img"></div>
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

          searchResultDiv.appendChild(cardElement);
        });

        if (nowPage >= data.total_pages) {
          hideLoadMoreButton();
        } else {
          updateLoadMoreButton(data.total_pages);
        }
      } else {
        searchResultDiv.innerHTML = "<p>결과가 없습니다.</p>";
      }
    })
    .catch((err) => console.error(err));
}

// 영화 포스터를 클릭하면 영화의 ID를 알림 창으로 표시
function showMovieId(id) {
  alert(`영화 ID: ${id}`);
}

function updateLoadMoreButton(totalPages) {
  let moreMovie = document.createElement("div");
  moreMovie.id = "more-btn";
  moreMovie.innerText = `Load More ( ${nowPage} / ${totalPages} )`;
  document.getElementById("more-btn") !== null && document.getElementById("more-btn").remove();
  document.getElementById("wrap").append(moreMovie);
  document.getElementById("more-btn").addEventListener("click", () => {
    document.getElementById("more-btn").remove();
    nowPage++;
    sessionStorage.setItem(category, nowPage);
    searchResult(nowPage);
  });
}

function hideLoadMoreButton() {
  const loadMoreDiv = document.getElementById("more-btn");
  if (loadMoreDiv) {
    loadMoreDiv.remove();
  }
}
