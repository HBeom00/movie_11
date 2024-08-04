// 전체 공통 JS

// 로그인 여부 확인
let isLogin = localStorage.getItem("login");
if (isLogin === "yes") {
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "block";
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("login");
  localStorage.removeItem("id");
  localStorage.removeItem("password");
  alert("로그아웃 되었습니다.");
  window.location.reload();
});

// 검색창
const searchArea = document.getElementById("search-area");
const searchBtn = document.getElementById("search");
window.onload = function () {
  document.querySelector("body").style.opacity = "1";

  searchBtn.addEventListener("click", function () {
    if (!searchBtn.classList.contains("on")) {
      searchBtn.classList.add("on");
      searchArea.style.cssText = "opacity: 1; transform: translateY(0);";
    } else {
      searchBtn.classList.remove("on");
      searchArea.style.cssText = "opacity: 0; transform: translateY(-100%);";
    }
  });
};
function onSearch() {
  let keyword = document.getElementById("search-input").value;
  if (typeof keyword === null || keyword === undefined || keyword === "") {
    alert("영화 제목을 입력하세요.");
  } else {
    window.location = `/search.html?${keyword}`;
  }
}
document.getElementById("search-input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    onSearch();
  }
});

// 상단 스크롤 이벤트
let beforeY = 0;
document.addEventListener("scroll", function (e) {
  if (beforeY < window.scrollY) {
    document.getElementById("header").classList.remove("on");
    document.getElementById("header").style.transform = "translateY(-100%)";
  } else {
    document.getElementById("header").classList.add("on");
    document.getElementById("header").style.transform = "translateY(0)";
  }

  window.scrollY === 0 && document.getElementById("header").classList.remove("on");
  beforeY = window.scrollY;
});
