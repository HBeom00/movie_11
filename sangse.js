//api key 발급: 이정곤
const API_KEY = "609d96fd9ad77dc5f8d4e2f536aece54"

//api 받을 사이트 연결
const URL = `https://api.themoviedb.org/3/movie/533535?api_key=${API_KEY}&language=ko-KR`;

//받은 api 연결 하기
// fetch(URL)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

//상세정보 2차 시도
fetch(URL)
  .then(response => response.json())
  .then(datails => {
    console.log(datails);
      
      document.getElementById('release_date').innerText = datails.release_date;
      document.getElementById('title').innerText = datails.title;
      document.getElementById('vote_average').innerText = datails.vote_average;
      document.getElementById('overview').innerText = datails.overview;

  })

