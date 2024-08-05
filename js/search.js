const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWVjZTQ3MTM4YTljNjA0ZDJjNTQxZDM0MTUyOWZlMyIsIm5iZiI6MTcyMjQ5MjM3OS44MTk4ODUsInN1YiI6IjY2YTBkYzFkY2M0MmFlNzJhMjJlOWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UkEFEcFoMzkNPfld4qzpu8RIO9OHQpfvPgxT6NH3a7Q";

let currentPage = 1;
const ITEMS_PER_PAGE = 20;
let totalResults = 0;
let searchQuery = "";
let displayedMovieIds = new Set(); // 표시된 영화 IDs를 저장하는 Set

let check = 0;

// 초기 검색 함수
function initializeSearch() {
  currentPage = 1; // 검색 시 페이지를 1로 초기화
  displayedMovieIds.clear(); // 표시된 영화 IDs 초기화
  searchResult(currentPage);
}

// 영화 검색 결과를 가져옵니다.
function searchResult(page = 1) {
  const query = document.getElementById("search_movie").value;
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

        // "더보기" 버튼을 페이지 하단에 추가
        if (totalResults > ITEMS_PER_PAGE) {
          hideLoadMoreButton();
          showLoadMoreButton();
        } else {
          hideLoadMoreButton();
        }
      }

      if (data.results.length > 0) {
        data.results.forEach((movie) => {
          if (displayedMovieIds.has(movie.id)) {
            return; // 중복 제외
          }

          // 새 영화 ID를 표시된 영화 IDs에 추가
          displayedMovieIds.add(movie.id);

          const cardElement = document.createElement("div");
          cardElement.className = "card";

          cardElement.innerHTML = `
                    <div class="card-content">
                        <img src="${BASE_IMAGE_URL}${movie.poster_path}" alt="${movie.title} 포스터" class="poster-img" onclick="showMovieId(${movie.id})" />
                    </div>
                    <h3>${movie.title}</h3>
                `;

          searchResultDiv.appendChild(cardElement);
        });

        // "더보기" 버튼을 페이지 하단에 추가
        if (page > 1 && searchResultDiv.childElementCount >= totalResults) {
          hideLoadMoreButton();
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

// "더보기" 버튼을 페이지에 추가
function showLoadMoreButton() {
  let loadMoreButton = document.createElement("button");
  loadMoreButton.id = "load-more-button";
  loadMoreButton.textContent = "더보기";
  loadMoreButton.onclick = loadMoreResults;
  document.getElementById("load-more").appendChild(loadMoreButton);
}

// "더보기" 버튼을 페이지에서 제거합니다.
function hideLoadMoreButton() {
  const loadMoreButton = document.getElementById("load-more-button");
  if (loadMoreButton) {
    loadMoreButton.remove();
  }
}

//현재페이지라는 변수가 페이지 수를 나타내느 상수값인데 왜 변수만 대입해야 인식을 하지 뭐지
function loadMoreResults() {
  currentPage++;
  searchResult(currentPage); // 현재 페이지 번호를 증가시켜서 결과 가져오기
}
