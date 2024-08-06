// TMDB API
const movieId = location.search.replace("?", "");
const API_KEY = "d235a0d6390e11fb07dd3329c8492501";
const detailApi = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`; //영화 상세 API
const creditApi = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
const imgApi = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}&include_image_language=null`;
const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`;

/* Detail */
fetch(detailApi)
  .then((response) => response.json())
  .then((details) => {
    document.getElementById("video-link").href = `https://www.youtube.com/results?search_query=${details.title}+Teaser`;
    document.getElementById(
      "bg-img"
    ).innerHTML = `<img src="https://image.tmdb.org/t/p/original${details.backdrop_path}" />`;
    document.getElementById(
      "movie-poster"
    ).innerHTML = `<img src="https://image.tmdb.org/t/p/original${details.poster_path}" />`;

    const score = Math.round(details.vote_average / 2);
    let infoHtml = `
      <div class="title">${details.title}</div>
      <ul>
        <li>개봉일 : <span class="release-date">${details.release_date.replaceAll("-", ".")}</span></li>
        <li>/</li>
        <li>러닝타임 : <span class="runtime">${details.runtime}분</span></li>
      </ul>
      <div class="vote"><img src="./img/popcorn-${score}.png" alt="${score}점">(${details.vote_average})</div>
      <div class="description">${details.overview}</div>
      <ul id="genre"></ul>
      `;
    document.getElementById("movie-info").innerHTML = infoHtml;
    details.genres.map((item) => {
      let genre = document.createElement("li");
      genre.innerText = `#${item.name}`;
      document.getElementById("genre").append(genre);
    });
  })
  .catch((err) => console.error(err));

/* 스틸컷 */
fetch(imgApi)
  .then((response) => response.json())
  .then((still) => {
    still.backdrops.forEach((img) => {
      if (document.querySelectorAll("#still > .still-cut").length < 6) {
        stillCut(img.file_path);
      }
    });
  });

function stillCut(img) {
  const imgs = document.createElement("div");
  imgs.className = "still-cut";
  imgs.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${img}" alt="스틸컷 이미지"/>
  `;
  document.getElementById("still").append(imgs);
}

/* 관련 영상 */
fetch(videoUrl)
  .then((response) => response.json())
  .then((response) => {
    document.getElementById("rel-title").style.display = response.results.length === 0 && "none";
    response.results.forEach((movie) => {
      if (document.querySelectorAll("#video > .box").length < 3) {
        let playBox = document.createElement("div");
        playBox.setAttribute("class", "box");
        let player = document.createElement("div");
        player.setAttribute("id", movie.key);

        playBox.append(player);
        document.getElementById("video").append(playBox);

        onYouTubeIframeAPIReady(movie.key);
      }
    });
  })
  .catch((err) => console.error(err));

let player;
function onYouTubeIframeAPIReady(movieId) {
  player = new YT.Player(movieId, {
    videoId: movieId,
    playerVars: {
      controls: 1,
      mute: 1,
      playlist: movieId
    }
  });
}

/* Credits */
fetch(creditApi)
  .then((response) => response.json())
  .then((response) => {
    const cast = response.cast;
    cast.map((actor) => {
      if (actor.known_for_department === "Acting") {
        const actorProfile = document.createElement("div");
        actorProfile.className = "actor";
        actorProfile.innerHTML = `
          <div class="profile"><img src="https://image.tmdb.org/t/p/original${actor.profile_path}" alt="${actor.name}" onerror="this.src='https://placehold.co/400?text=no+image&font=roboto'"></div>
          <div class="character">${actor.character}</div>
          <div class="name">${actor.name}</div>
        `;

        document.getElementById("actor-list").append(actorProfile);
      }
    });
  })
  .catch((err) => console.error(err));

const actorList = document.getElementById("actor-list");
actorList.addEventListener("wheel", function (e) {
  e.preventDefault();
  actorList.scrollLeft += e.deltaY > 0 ? e.deltaY + 100 : e.deltaY - 100;
});

let isDown = false;
let startX;
let scrollLeft;
actorList.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - actorList.offsetLeft;
  scrollLeft = actorList.scrollLeft;
});
actorList.addEventListener("mouseleave", () => {
  isDown = false;
});
actorList.addEventListener("mouseup", () => {
  isDown = false;
});
actorList.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - actorList.offsetLeft;
  const walk = x - startX;
  actorList.scrollLeft = scrollLeft - walk;
});

/**************************/
/* 파이어베이스 이용한 댓글 */
/**************************/

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
  document.getElementById("is-logout").style.display = "flex";
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
  await docs.forEach((doc) => {
    let row = doc.data();
    let myComment;
    if (localStorage.getItem("login") === "yes" && row.id === userId) {
      myComment = ` 
        <button class="like">
          <img src="./img/like.png" alt="좋아요" class="off"/>
          <img src="./img/like-on.png" alt="좋아요" class="on"/>
          <span>${row.like}</span>
        </button>
        <button class="modify">수정</button>
        <button class="delete">삭제</button>
      `;
    } else {
      myComment = `
      <button class="like">
        <img src="./img/like.png" alt="좋아요" class="off"/>
        <img src="./img/like-on.png" alt="좋아요" class="on"/>
        <span>${row.like}</span>
      </button>`;
    }
    let commentHtml = `
      <li>
        <span class="hide-id">${doc.id}</span>
        <div class="comment-area">
          <div class="comment">${row.comment}</div>
          <div class="id">${row.id}</div>
        </div>

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
  let beforeComment = btn.parentElement.previousElementSibling.firstElementChild.innerText;

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
sessionStorage.removeItem("comment-scroll");
async function likeComment(btn) {
  sessionStorage.setItem("comment-scroll", document.getElementById("comment-list").scrollTop);
  let docId = btn.parentElement.parentElement.firstElementChild.innerText;
  let alreadyLike = localStorage.getItem(`${docId}like`);

  if (alreadyLike === null) {
    await updateDoc(doc(db, String(movieId), docId), {
      like: increment(1)
    });
    await localStorage.setItem(`${docId}like`, 1);
  } else {
    await updateDoc(doc(db, String(movieId), docId), {
      like: increment(-1)
    });
    await localStorage.removeItem(`${docId}like`);
  }

  await document.querySelectorAll("button.like").forEach((like) => {
    let docId = like.parentElement.parentElement.firstElementChild.innerText;
    let alreadyLike = localStorage.getItem(`${docId}like`);

    alreadyLike === null ? like.classList.remove("on") : like.classList.add("on");
  });
}

// 댓글 실시간 갱신
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
        localStorage.getItem("login") === "yes" ? modifyComment(e.target) : alert("로그인이 되어있지 않습니다.");
      });
    });
  },

  _delete: function () {
    document.querySelectorAll("button.delete").forEach((modify) => {
      modify.addEventListener("click", (e) => {
        localStorage.getItem("login") === "yes" ? deleteComment(e.target) : alert("로그인이 되어있지 않습니다.");
      });
    });
  },

  _like: function () {
    document.querySelectorAll("button.like").forEach((like) => {
      let docId = like.parentElement.parentElement.firstElementChild.innerText;
      let alreadyLike = localStorage.getItem(`${docId}like`);
      like.addEventListener("click", (e) => {
        likeComment(e.target);
      });
      alreadyLike === null ? like.classList.remove("on") : like.classList.add("on");

      const nowScroll = sessionStorage.getItem("comment-scroll");
      document.getElementById("comment-list").scrollTop = nowScroll !== null && nowScroll;
    });
  }
};

await loadComment();
controlComment._modify();
controlComment._delete();
controlComment._like();
