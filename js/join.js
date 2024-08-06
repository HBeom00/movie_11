// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

const joinBtn = document.getElementById("join-btn");
const joinId = document.getElementById("join-id");
const joinPassword = document.getElementById("join-password");

joinBtn.addEventListener("click", async function () {
  let isId = joinId.value;
  let isPassword = joinPassword.value;

  if (isId === "") {
    alert("ID를 입력해주세요.");
  } else if (isPassword === "") {
    alert("Password를 입력해주세요.");
    // } else if (){
  } else {
    let checkId = doc(db, "members", isId);
    let hasId = await getDoc(checkId);

    if (hasId.exists()) {
      alert("동일한 ID가 존재합니다.");
    } else {
      await setDoc(doc(db, "members", isId), {
        id: isId,
        password: isPassword
      });

      localStorage.setItem("login", "yes");
      localStorage.setItem("id", isId);
      localStorage.setItem("password", isPassword);
      alert(`${isId}님 환영합니다!`);
      window.location = "./index.html";
    }
  }
});
