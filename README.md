![header](https://capsule-render.vercel.app/api?type=waving&height=200&color=cabdeb&text=십일워%20팀프로젝트&fontColor=252031&fontAlignY=37&fontSize=50](https://capsule-render.vercel.app/api?type=venom&height=300&color=0:614385,100:516395&text=Team%20Project&section=header&reversal=false&fontSize=50&fontColor=ffffff&animation=fadeIn&desc=내일배움캠프%2011조&descAlignY=62&fontAlignY=47)

# 🎞️ let movie = null;

### let movie 변수에 검색어를 채워보세요

프로젝트 "let movie = null;"은 영화 검색사이트구현 프로젝트로,<br/>
'let movie 라는 변수에 검색어를 채워보자!'라는 의미로 프로젝트 명을 지어보았습니다.

1️⃣ 메인페이지는 인기영화의 캐러셀 구현과, 예고편, 각종 카테고리의 영화 리스트를 확인 하실 수 있습니다.

2️⃣ 목록페이지는 선택하신 카테고리에 맞춰 영화가 출력되며, 더보기 버튼을 이용하여 더 많은 영화를 확인 하실 수 있습니다.

3️⃣ 검색페이지는 입력하신 검색어에 맞는 영화가 총 몇개가 검색되었는지 출력되며, 목록페이지와 마찬가지로 더보기 버튼을 이용하여 영화를 불러올 수 있습니다.

4️⃣ 상세페이지는 각 영화에 맞는 상세정보와, 예고편, 스틸컷 등이 출력됩니다.
또한, 로그인을 했을 경우 댓글을 작성하실 수 있게됩니다.
<br/><br/>

## ⭐ 배포URL

<br/><br/>

## 🎞️ Preview

![alt text](./readme/image.png)
<br/><br/>

## 🔥 목표

- TMDB 또는 영화진흥위원회 오픈 API 이용
- vanilla JS만 사용
- 영화 리스트 및 검색 구현
- 영화정보 상세 페이지 구현
- 상세 페이지 영화 리뷰 작성 기능 구현
- github PR(=Pull Request) 사용한 협업

<br/><br/>

## 📆 작업 기간

24.07.31 ~ 24.08.06
<br/><br/>

## 📚 개발 환경

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![vscode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)
<br/><br/>

## ⚒️ 팀원 역할 분담

<details>
    <summary>이정곤</summary>

    - 상세페이지 (TMDB API)
        - 영화 정보 불러오기
        - 영화 스틸컷 불러오기

</details>

<details>
    <summary>신희범</summary>

    - 메인 페이지
        - 무한 캐러셀 기능
            - setinterval 이용하여 자동 슬라이드 구현
            - 페이지네이션 구현
        - 예고편 영상 가져오기
            - TMDB Videos api 사용
            - 영화 id값에 맞는 해당 영상 불러오기
            - youtube iframe 연결
        - 카테고리별 영화 리스트 가져오기
            - TMDB movie api 사용
            - 상영중, 상영 예정, 인기 영화 출력

</details>

<details>
    <summary>장수인</summary>
    
    - 검색페이지
        - TMDB Search API 이용
        - 검색어에 맞춰서 영화 불러오기
        - 더보기 클릭시 영화 정보 갱신
        - 검색된 영화갯수 출력
</details>

<details>
    <summary>이소미</summary>
    
    - 목록 페이지
        - TMDB API 이용하여 영화 불러오기
        - 더보기 클릭시 영화정보 갱신
</details>

<details>
    <summary>박준호</summary>
    
    - 로그인, 회원가입
        - 아이디, 비밀번호를 이용한 간단한 회원가입 기능구현
        - localStorage에 로그인 여부 저장하여 확인
    - 상세페이지 (Firebase)
        - 관련 영상
            - 각 영화별 관련 영상 최대 3개까지 출력
        - 댓글페이지 구현
            - Firebase에 각 영화별로 댓글정보 저장
            - 로그인 정보에 맞춰서 수정,삭제버튼 노출
            - 댓글별 좋아요기능 추가
</details>

<br/><br/>

## ❤️ 소감

- 이정곤
  - 처음 해보는 팀 프로젝트와 처음 맡아본 팀장이라 서투르고 미숙한 면이 많았는데, 적극적으로 참여해서 잘 따라와 주고 서로를 믿고 도와주는 팀원 분들 덕분에 좋은 결과, 좋은 프로젝트를 완성할 수 있었던 것 같고, 팀장으로서 많은 경험이 된 시간이었던 것 같습니다.
- 신희범
  - 짧은 시간이지만 좋은 팀원분들과 멋진 결과물을 만들 수 있어서 좋았고,<br/>
    협업 하는 과정에서 많이 성장했다고 생각한다 !!
    <br/>
- 장수인
  - 깃을 활용한 협업 방법과 API를 가져오는 기술도 사용해 볼 수 있는 좋은 기회였고 어려움도 많았지만 팀원분들 덕분에 무사히 잘 완성되어 좋았습니다.
    <br/>
- 이소미

  - 모르는게 많았는데 다들 도와주셔서 무사히 해낼수있었다. 그래서 배운게 많았다 너무 좋았다.더 열심히해야겠다.
    <br/>

- 박준호
  - 작업하면서 팀원들과 서로 도움을 주고받으면서 작업을 진행한게 좋은 경험이 된 것 같습니다. 다들 수고하셨고 감사했습니다.
    <br/><br/>

## 🖊️ 노션 링크

https://www.notion.so/teamsparta/11-_-752207b58baf40b18d1a55b47a8d1ca6
