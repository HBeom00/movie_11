// TMDB API
const API_KEY = "d235a0d6390e11fb07dd3329c8492501";
const URL = `https://api.themoviedb.org/3/movie/533535?api_key=${API_KEY}&language=ko-KR`;

let movieId;
await fetch(URL)
  .then((response) => response.json())
  .then((response) => {
    movieId = response.id;
  })
  .catch((err) => console.error(err));

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  increment,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

const commentBtn = document.getElementById("comment-btn");
const userId = localStorage.getItem("id");
const userPassword = localStorage.getItem("password");
const userComment = document.getElementById("user-comment");

// 로그인 여부에 따라 댓글 입력창 출력
let isLogin = localStorage.getItem("login");
if (isLogin === null) {
  document.getElementById("is-login").style.display = "none";
  document.getElementById("is-logout").style.display = "block";
}

// 댓글 작성
async function commentWrite(id, password, comment) {
  let today = new Date();
  today = today.toLocaleString().replaceAll(" ", "");

  await setDoc(doc(db, String(movieId), `${today}_${id}`), {
    id: id,
    password: password,
    comment: comment,
    like: 0
  });

  userComment.value = null;

  await loadComment();
  controlComment._modify();
  controlComment._delete();
  controlComment._like();
}
userComment.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    commentBtn.click();
  }
});
commentBtn.addEventListener("click", function () {
  let isComment = userComment.value;

  isComment === "" ? alert("댓글을 입력하세요.") : commentWrite(userId, userPassword, isComment);
});

// 댓글 불러오기
async function loadComment() {
  document.getElementById("comment-list").innerHTML = "";
  let docs = await getDocs(collection(db, String(movieId)));
  docs.forEach((doc) => {
    let row = doc.data();
    let myComment;
    if (row.id === userId) {
      myComment = `
        <button class="like">${row.like}</button>
          <button class="modify">수정</button>
          <button class="delete">삭제</button>
      `;
    } else {
      myComment = `<button class="like">${row.like}</button>`;
    }
    let commentHtml = `
      <li>
        <span class="hide-id">${doc.id}</span>
        <div class="comment-area">${row.comment}</div>
        <div class="id">${row.id}</div>

        <div class="btn-area">
          ${myComment}
        </div>
      </li>
    `;

    document.getElementById("comment-list").insertAdjacentHTML("beforeend", commentHtml);
  });
}

// 댓글 수정
async function modifyComment(btn) {
  let docId = btn.parentElement.parentElement.firstElementChild.innerText;
  let beforeComment = btn.parentElement.previousElementSibling.previousElementSibling.innerText;

  const newComment = prompt("댓글을 새로 입력하세요.", beforeComment);
  if (!!newComment) {
    if (newComment === "") {
      alert("내용을 입력하세요.");
    } else {
      await updateDoc(doc(db, String(movieId), docId), {
        comment: newComment
      });
    }
  }
}

// 댓글 삭제
async function deleteComment(btn) {
  let docId = btn.parentElement.parentElement.firstElementChild.innerText;
  const delComment = confirm("댓글을 삭제하시겠습니까?");

  if (delComment) {
    await deleteDoc(doc(db, String(movieId), docId));
  }
}

// 댓글 좋아요
async function likeComment(btn) {
  let docId = btn.parentElement.parentElement.firstElementChild.innerText;
  let alreadyLike = localStorage.getItem(`${docId}like`);

  if (alreadyLike === null) {
    await updateDoc(doc(db, String(movieId), docId), {
      like: increment(1)
    });
    localStorage.setItem(`${docId}like`, 1);
  } else {
    await updateDoc(doc(db, String(movieId), docId), {
      like: increment(-1)
    });
    localStorage.removeItem(`${docId}like`);
  }
}

onSnapshot(collection(db, String(movieId)), (snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    if (change.type === "modified") {
      await loadComment();
      controlComment._modify();
      controlComment._delete();
      controlComment._like();
    }
    if (change.type === "removed") {
      await loadComment();
      controlComment._modify();
      controlComment._delete();
      controlComment._like();
    }
  });
});

let controlComment = {
  _modify: function () {
    document.querySelectorAll("button.modify").forEach((modify) => {
      modify.addEventListener("click", (e) => {
        modifyComment(e.target);
      });
    });
  },

  _delete: function () {
    document.querySelectorAll("button.delete").forEach((modify) => {
      modify.addEventListener("click", (e) => {
        deleteComment(e.target);
      });
    });
  },

  _like: function () {
    document.querySelectorAll("button.like").forEach((like) => {
      like.addEventListener("click", (e) => {
        likeComment(e.target);
      });
    });
  }
};

await loadComment();
controlComment._modify();
controlComment._delete();
controlComment._like();
