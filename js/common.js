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
