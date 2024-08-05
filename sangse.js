//api key
const API_KEY = "609d96fd9ad77dc5f8d4e2f536aece54"

//api datails
const URL = `https://api.themoviedb.org/3/movie/533535?api_key=${API_KEY}&language=ko-KR`

//상세정보 상영일,제목,평점,오버뷰
fetch(URL)
  .then(response => response.json())
  .then(datails => {
    console.log(datails);
      
      document.getElementById('release_date').innerText = datails.release_date;
      document.getElementById('title').innerText = datails.title;
      document.getElementById('vote_average').innerText = datails.vote_average;
      document.getElementById('overview').innerText = datails.overview;
  })

//상세정보 스틸컷
fetch(`https://api.themoviedb.org/3/movie/533535/images?api_key=${API_KEY}&include_image_language=null`)
    .then(response => response.json())
    .then(still => {
      console.log(still.backdrops);
      for (let i = 0; i < 5; i++) {
        stillcut(still.backdrops[i].file_path);
    }})

function stillcut(img) {
  const imggs = document.createElement('div');
  imggs.className = 'stillcut'
  imggs.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${img}" alt="스틸컷 이미지"/>
  `
  document.getElementById('still').append(imggs);
}