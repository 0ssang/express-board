# My Express Board

## 프로젝트 개요
|||
|:---|:---|
|**설명**|Express, MongoDB를 사용한 게시판 서비스|
|**개발 환경**|Node.js 20.9.0|
|**기능**| - 로그인<br>- 글 쓰기, 수정, 삭제<br> - 댓글 추가, 댓글 삭제<br> - 페이지네이션, 필터 <br> - 프로젝션, 조회수|
|**아키텍처**| **3- layered architecture (MVC)**<br>**view**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: *handlebar template*<br> **controller** : *express-router*<br> **service** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: APIs <br> **model** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: *mongodb native package*<br>**DB** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;: *MongoDB*|
|**모듈/패키지**|express@4.17.3<br> mongodb@4.13.0<br> express-handlebars@6.0.3<br>nodemon@2.0.20<br>lodash@4.17.21|

## 기획
### 1. 리스트 화면 기획
게시판의 최신 목록
+ 게시판 제목
+ 검색 창 & 버튼
+ 글쓰기 버튼
+ 글 목록 (제목, 작성자, 조회수, 등록일)
+ 페이징 기능

### 2. 글쓰기 화면 기획

### 3. 상세 화면 기획

## UI 작성

## API 작성
