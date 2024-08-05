// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyCZ-OtK67B-OoEHemSSyYtkIR_Ofq2DZp8",
  authDomain: "moviesearch-389c3.firebaseapp.com",
  projectId: "moviesearch-389c3",
  storageBucket: "moviesearch-389c3.appspot.com",
  messagingSenderId: "362158187713",
  appId: "1:362158187713:web:7367e194e8bbe69918e040",
  measurementId: "G-RXQ8FTBKVN"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginBtn = document.getElementById("login-btn");
const loginId = document.getElementById("login-id");
const loginPassword = document.getElementById("login-password");

if (localStorage.getItem("login") === "yes") {
  alert("로그인 되어있습니다.");
  window.location = "/index.html";
}

loginBtn.addEventListener("click", async function () {
  let isId = loginId.value;
  let isPassword = loginPassword.value;

  if (isId === "") {
    alert("ID를 입력해주세요.");
  } else if (isPassword === "") {
    alert("Password를 입력해주세요.");
    // } else if (){
  } else {
    let checkId = doc(db, "members", isId);
    let hasId = await getDoc(checkId);

    if (hasId.exists()) {
      if (isPassword === hasId.data().password) {
        localStorage.setItem("login", "yes");
        localStorage.setItem("id", isId);
        localStorage.setItem("password", isPassword);

        alert(`${isId}님 환영합니다!`);
        window.location = "/index.html";
      } else {
        alert("Password가 틀렸습니다.");
      }
    } else {
      alert("존재하지 않는 ID입니다.");
    }
  }
});
